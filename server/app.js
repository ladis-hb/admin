/* jshint esversion:8 */
const Koa = require("koa");
const IO = require("koa-socket-2");
const KoaStatic = require("koa-static");
const path = require("path");
const Logger = require("koa-logger");
const cors = require("koa-cors");
const mongo = require("koa-mongo");
const CM = require("./util/MongoDB");
const body = require("koa-body");
const error = require("koa-error");
const EventEmitter = require("events").EventEmitter;

const config = require("./config");
const router = require("./router/index");
const saveLog = require("./util/SaveLog");
const format = require("./util/Format");

const app = new Koa();
const io = new IO();
const cm = new CM();
const event = new EventEmitter();

//存取所有设备devid:[user]
const devsMap = new Map();
//存取所有连接socket user:socket.id
const userMap = new Map();
//存取所有连接socket socket.id:user,方便删除使用
const socketIdMap = new Map();

app.context.event = event;
/* 
最后拦截error
*/
//app.use(error())

/* 
简单实现log记录
通过委托log属性在ctx.log，实现在链路最后端检查log
async实现，不阻塞resopen,
*/
app.context.log = {};

app.use(saveLog());
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});
//app.use(Logger())
//app.use(cors());
app.use(mongo({ db: config.DB_dev }));
app.use(body());

/* 
Socket.io
*/
io.attach(app);
/* 
监听连接事件，
*/
app.io.on("connection", async socket => {
  infoStream(1, "onlien", `新的Socket用户连接，Socket.id: ${socket.id}`);
  socket.on("register", ({ user, token }) => {
    infoStream(
      1,
      "register",
      `Socket用户:（${user}）已连接，Socket.id: ${socket.id}`,
      [user]
    );
    userMap.set(user, socket.id);
    socketIdMap.set([socket.id], user);
  });
  socket.on("disconnect", () => {
    infoStream(
      1,
      "offlien",
      `Socket用户:（${socketIdMap.get(socket.id)}）已离线，Socket.id: ${
        socket.id
      }`
    );
    userMap.delete(socketIdMap.get(socket.id));
    socketIdMap.delete(socket.id);
  });
});
/**
 *输出日志，socket发送消息
 *
 * @param {*} infoType 日志类型 infoType = ['Device', 'Socket'][infoType]
 * @param {*} line  状态
 * @param {*} msg   消息体
 * @param {*} toID  发送用户 Array
 */
async function infoStream(infoType, line, msg, toID) {
  infoType = ["Device", "Socket"][infoType];
  msg = JSON.stringify(msg);
  let User = toID ? ["admin", ...[toID]] : ["admin"];
  let generateTime = format.formatDate();
  console.log(`Socket.IO  ${generateTime}   ${infoType}  ${line}  ${msg}`);

  let db = await cm.Connect();
  db.db(config.DB_log)
    .collection(config.DB_log_socket)
    .insertOne({
      infoType,
      line,
      msg,
      generateTime,
      user: toID || "no record"
    });
  let online_user = [];
  userMap.forEach((val, key) => {
    online_user.push({ user: key, socketId: val });
  });
  let online_devs = [];
  devsMap.forEach((val, key) => {
    online_devs.push({
      devid: key,
      devType: val.devType,
      user: val.user.join("/")
    });
  });
  User.map(async u => {
    if (userMap.has(u))
      io.to(userMap.get(u)).emit("infoStream", {
        info: { infoType, line, msg, generateTime },
        onlinelist: {
          devs: online_devs,
          user: online_user
        }
      });
  });
}

event.on("devs", async data => {
  let { devs, type } = data;
  let id = devs.devid;
  if (devsMap.has(id)) {
    let { user, devType } = devsMap.get(id);
    //console.log(user)
    user.map(async u => {
      if (userMap.has(u))
        io.to(userMap.get(u)).emit("newDevs", { devType, devs });
    });
  } else {
    let db = await cm.Connect();
    let devs_list = await db
      .db(config.DB_dev)
      .collection(config.DB_user_dev)
      .find({ "dev.devid": id })
      .project({ _id: 0, user: 1 })
      .toArray();
    let user = devs_list.map(u => {
      return u.user;
    });
    infoStream(
      0,
      "offlien",
      `(${type})设备已上线，设备id：${id}， 设备所属用户：${user}`,
      user
    );
    devsMap.set(id, { devType: type, user });
  }
});

event.on("adddevs", async data => {
  console.log(`add设备::${JSON.stringify(data)}`);
  let { devid, devType, user } = data;
  let { user: devUser } = devsMap.get(devid);
  /* if user 还没有用户登录，user会获取一个空值 */
  devUser = Array.from(new Set([...devUser, user]));
  devsMap.set(devid, { devType, user: devUser });
  console.log(devsMap.get(devid));
});
event.on("deldevs", async data => {
  console.log(`del设备::${JSON.stringify(data)}`);
  let { devid, user: deluser } = data;
  let D = devsMap.get(devid);
  if (!D) return console.log(`设备：${devid} 不在线，无需在devmap中删除`);
  let { user: devUser, devType } = D;
  let devUserMap = new Set();
  for (let u of devUser) {
    if (u != deluser) devUserMap.add(u);
  }
  let newUser = Array.from(devUserMap);
  devsMap.set(devid, { devType, user: newUser });
});

/* 
挂载路由
*/
app.use(router.routes()).use(router.allowedMethods());

/* 
SPA网站挂载
*/
app.use(KoaStatic(path.join(__dirname, config.dist)));

let port = config.development ? config.development_port : config.port;
console.log(`static is run port:${port}`);

app.listen(port, () => {
  console.log(`App listening on http:\/\/127.0.0.1:${port}`);
  console.log("App listening on router /api!");
  console.log("App listening on router /get");
  console.log("App listening on static");
});
