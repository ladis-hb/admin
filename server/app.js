const Koa = require('koa')
const IO = require('koa-socket-2')
const KoaStatic = require('koa-static')
const path = require('path')
const Logger = require('koa-logger')
const cors = require('koa-cors')
const mongo = require('koa-mongo')
const CM = require('./util/MongoDB')
const body = require('koa-body')
const error = require('koa-error')
const EventEmitter = require('events').EventEmitter;


const config = require('./config')
const router = require('./router/index')
const saveLog = require('./util/SaveLog')

const app = new Koa()
const io = new IO()
const cm = new CM(null,config.DB_user,config.DB_user_dev)
const event = new EventEmitter();

const devsMap = new Map()

app.context.event = event
/* 
最后拦截error
*/
app.use(error())

/* 
简单实现log记录
通过委托log属性在ctx.log，实现在链路最后端检查log
async实现，不阻塞resopen,
*/
app.context.log = {}
app.use(saveLog())
//app.use(Logger())
app.use(cors())
app.use(mongo({ db: 'ladis', }))
app.use(body())

/* 
Socket.io
*/
io.attach(app)
app.io.on('connection', async socket => {
    socket.on('registerRoom', data => {
        socket.join(data.room)
    })    
})

event.on('devs', async devs => {      
    if (devsMap.has(devs.devid)) {
       let { user, devType } = devsMap.get(devs.devid)
       let to = io.to(user).emit('newDevs', { devType, devs })
   } else {
       let devs_list = await cm.find({})
       for (let m of devs_list){
           for (let m1 of m.dev){
               devsMap.set(m1.devid,{user:m.user,devType:m1.type})
           }
       }
   } 
})



/* 
挂载路由
*/
app.use(router.routes()).use(router.allowedMethods());

/* 
SPA网站挂载
*/
app.use(KoaStatic(path.join(__dirname, config.dist)))

let port = config.development ? config.development_port : config.port

app.listen(port, () => {
    console.log(`App listening on http:\/\/127.0.0.1:${port}`);
    console.log('App listening on router /api!');
    console.log('App listening on router /get');
    console.log('App listening on static');
})