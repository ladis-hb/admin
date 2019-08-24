/* jshint esversion:8 */
const config = require("../../config");
const { formartBody,ObjectId } = require("../../util/Format");
const GetAlarms = async ctx => {
  let { user } = ctx.query;
  /* get user`s all devs */
  let [{ dev: userDevsArray }] = await ctx.db
    .collection(config.DB_user_dev)
    .find({ user })
    .project({ _id: 0, dev: 1 })
    .toArray();

  let userDevs = userDevsArray.map(val => {
    return val.devid;
  });
  let result = await ctx.db
    .collection(config.DB_Alarm)
    .find({ DeviceId: { $in: userDevs } })
    .sort({ _id: -1 })
    .limit(200)
    .toArray();
  ctx.body = formartBody("success", "alarm", result);
};
/* confirm_alarm */
const confirm_alarm = async ctx => {
  let { user, alarmId } = ctx.query;
  let result = await ctx.db
    .collection(config.DB_Alarm)
    .updateOne(
      { _id: ObjectId(alarmId) },
      { $set: { confirm: true, confirm_user: user, confirm_time: new Date() } }
    );
  ctx.body = formartBody("success", "报警消息已确认", result.result);
  ctx.log = { type: config.DB_log_dev, msg: "确认报警消息" };
};

module.exports = { GetAlarms, confirm_alarm };
