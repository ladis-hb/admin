/* jshint esversion:8 */
const config = require("../config");
module.exports = async (ctx, next) => {
  let {
    params: { id }
  } = ctx;
  if (["dev", "Alarm"].includes(id)) {
    switch (id) {
      case "dev":
        {
          var { type, updateTime, data, dataType } = ctx.request.body;

          if (["io", "phase", "th", "ac", "ups", "power"].includes(type)) {
            if (dataType == "One") {
              //针对文档更新Array，$push or $addToSet
              ctx.event.emit("devs", { devs: data, type });
              data.DateTime = Date.now();
              ctx.db.collection(type).insertOne(data);

              //let res = await ctx.db.collection(type).replaceOne({devid: data.devid},data,{upsert:true})
              ctx.status = 200;
              ctx.body = {
                code: 200,
                msg: `Data submission successful`
              };
            } else if (dataType == "Many") {
              //如果后期data为同一devid的数组，取消for,改语句为 ,
              //updateOne({ devid: val.devid }, { $addToSet: { dataArray: {$each:[data]} } }, { upsert: true })
              for (let val of data) {
                val.DateTime = Date.now();
                ctx.db.collection(type).insertOne(val);
                ctx.event.emit("devs", { devs: val, type });
              }
              //await ctx.db.collection(type).deleteMany({ devid: { $in: devid_list } })
              //let res = await ctx.db.collection(type).insertMany(data)
              ctx.status = 200;
              ctx.body = {
                code: 201,
                msg: `Data submission successful`
                //res: { insertedCount: res.insertedCount, insertedIds: res.insertedIds }
              };
              ctx.log = ctx.body;
            } else {
              ctx.status = 200;
              ctx.body = {
                code: 202,
                msg: `dataType参数只接受/One/Many,区分大小写`,
                req: ctx.request.body
              };
              ctx.log = ctx.body;
            }
          } else {
            ctx.status = 200;
            ctx.body = {
              code: 203,
              msg: `type参数只接受'io', 'phase', 'th', 'ac', 'ups',区分大小写`,
              req: ctx.request.body
            };
            ctx.log = ctx.body;
          }
        }
        break;
      case "Alarm":
        {
          let {
            DeviceId,
            Alarm_msg,
            Alarm_type,
            Alarm_device,
            Alarm_level,
            Alarm_time
          } = ctx.request.body;
          //console.log(ctx.request.body);
          //
          const type = ["超下限", "告警恢复", "告警"];
          const dev = ["ups", "ac", "power", "io", "th"];
          const level = [0, 1, 2];
          //
          let Alarms = {
            DeviceId,
            Alarm_time,
            Alarm_msg,
            Alarm_device,
            Alarm_level,
            Alarm_type,
            DateTime: Date.now(),
            confirm: false,
            confirm_user: "",
            confirm_time: null
          };
          //
          ctx.event.emit("Alarm", Alarms);
          //
          let result = await ctx.db
            .collection(config.DB_Alarm)
            .insertOne(Alarms);
          ctx.status = 200;
          ctx.body = {
            code: 200,
            msg: `Alarm submission successful`,
            req: result.result
          };
        }
        break;
    }
  }
  await next();
};
