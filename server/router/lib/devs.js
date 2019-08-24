/* jshint esversion:8 */
const config = require("../../config");
const { formartBody } = require("../../util/Format");

const Dev_all_info = async ctx => {
  let { user } = ctx.query;
  let devArray = await ctx.db.collection(config.DB_user_dev).findOne({ user });
  if (devArray) {
    let devs = {};
    //遍历user_dev表，汇总分类设备
    devArray.dev.map(val => {
      if (!devs[val.type]) devs[val.type] = [];
      devs[val.type].push(val.devid);
    });

    for (let key in devs) {
      devs[key] = await ctx.db
        .collection(key)
        .find({ devid: { $in: devs[key] } }, { _id: 0 })
        .toArray();
    }
    ctx.body = formartBody("success", "", devs);
  } else {
    ctx.body = formartBody("error", "用户没有添加devs");
  }
};

const addDevid = async ctx => {
  let { devid, devType, user } = ctx.query;
  let result = await ctx.db
    .collection(config.DB_user_dev)
    .updateOne(
      { user },
      { $addToSet: { dev: { type: devType, devid, devName: devid } } },
      { upsert: true }
    );
  ctx.body = formartBody("success", "添加数据完成", result.result);
  ctx.log = { type: config.DB_log_dev, msg: `添加设备--${devid}|${devType}` };
  //添加了新的设备发送事件提醒刷新设备数组
  ctx.event.emit("adddevs", { devid, devType, user });
};

const Get_devid_list = async (ctx, u) => {
  let result = await ctx.db
    .collection(config.DB_user_dev)
    .findOne({ user: u }, { dev: 1 });
  ctx.body = formartBody("success", "", result);
};

const delete_Devid = async ctx => {
  let { devid, user } = ctx.query;
  let result = await ctx.db
    .collection(config.DB_user_dev)
    .updateOne({ user }, { $pull: { dev: { devid } } });
  ctx.body = formartBody("success", "", result.result);
  ctx.log = { type: config.DB_log_dev, msg: `删除设备--${devid}` };
  ctx.event.emit("deldevs", { devid, user });
};
//new
const Get_user_all_devs = async ctx => {
  let {
    query: { user },
    db
  } = ctx;
  let result = await db
    .collection(config.DB_user_dev)
    .find({ user })
    .project({ _id: 0, dev: 1 })
    .toArray();
  ctx.body = formartBody("success", "all devs list", result);
};
const Modify_devName = async ctx => {
  let { user, devid, devName } = ctx.query;
  let result = await ctx.db
    .collection(config.DB_user_dev)
    .updateOne(
      { user, "dev.devid": devid },
      { $set: { "dev.$.devName": devName } }
    );
  ctx.body = formartBody("success", "modify devName", result.result);
  ctx.log = {
    type: config.DB_log_dev,
    msg: `修改设备别名--${devid}|${devName}`
  };
};
module.exports = {
  Dev_all_info,
  addDevid,
  Get_devid_list,
  delete_Devid,
  Get_user_all_devs,
  Modify_devName
};
