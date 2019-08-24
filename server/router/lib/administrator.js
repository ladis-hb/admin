/* jshint esversion:8 */
const config = require("../../config");
const { formartBody, formatlog } = require("../../util/Format");

const admin_get_info_list = async (ctx, u) => {
  let { index } = ctx.query;
  switch (index) {
    case "usersList":
      let users = await ctx.db
        .collection(config.DB_user_users)
        .find()
        .project({
          _id: 0,
          creatTime: 1,
          name: 1,
          mail: 1,
          tel: 1,
          address: 1,
          orgin: 1
        })
        .toArray();
      ctx.body = formartBody("success", "", users);
      ctx.log = { type: config.DB_log_run, msg: "获取所有用户列表" };
      break;
    case "ups":
    case "ac":
    case "power":
    case "io":
    case "th":
      let devs = await ctx.db
        .collection(index)
        .find()
        .project({ _id: 0, generateTime: 1, name: 1, devid: 1, brand: 1 })
        .toArray();
      let devs_Set = new Set();
      let devs_serize = [];
      devs.reverse().map(val => {
        if (!devs_Set.has(val.devid)) {
          devs_Set.add(val.devid);
          devs_serize.push(val);
        }
      });
      ctx.body = formartBody("success", "", devs_serize);
      ctx.log = { type: config.DB_log_run, msg: "获取所有设备列表" };
      break;
  }
};

const modify_user_info = async (ctx, u) => {
  let { mail, name, orgin, tel } = ctx.query;
  let result = await await ctx.db
    .collection(config.DB_user_users)
    .updateOne({ mail }, { $set: { name, orgin, tel } }, { upsert: true });
  ctx.body = formartBody("success", "", result);
  ctx.log = { type: config.DB_log_run, msg: "修改用户信息" };
};

module.exports = { admin_get_info_list, modify_user_info };
