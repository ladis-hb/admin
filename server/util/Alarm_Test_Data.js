/* 
简要描述：
   工控告警提交接口

请求URI：
    http://116.62.48.175:81/Api/Alarm

请求类型：
    POST

参数：
    Alarm_msg:
        必选:true
        类型:String
        说明：告警文字说明

    Alarm_type:
        必选:true
        类型:String
        说明：告警类型
        类型：...[告警恢复,超下限,...]

    Alarm_device:
        必选:true
        类型:String
        说明：告警设备
        类型：['io', 'th', 'ac', 'ups','power']

    Alarm_level：
        必选:true
        类型:Number
        说明：告警等级
        {
            0:"一般告警",
            1:"重要告警",
            2:"紧急告警"
        }
        

    Alarm_time：
        必选:true
        类型:Date
        说明：告警时间
    

输入示例：

json={
    Alarm_msg: "输出频率,超下限,值:4.00",
  Alarm_type: "超下限",
  Alarm_device: "ups",
  Alarm_level: 1,
  Alarm_time: new Date()
}


返回数据：
 后台收到post一定会响应，有返回status：200

{ code: 201,                            ||code返回200，201,202，203
  msg: 'Alarm submission successful',    ||返回处理消息
  res:                                  ||res 包含数据库返回的消息
   { insertedCount: 3,                  || 影响的行数
     insertedIds:                        || 数据库为每条insert数据生成的_id
      { '0': '5d43e984cac69347f792f7b6',
        '1': '5d43e984cac69347f792f7b7',
        '2': '5d43e984cac69347f792f7b8' } } }
OR
{ code: 200,
  msg: 'Alarm submission successful',
  res:
   { insertedCount: 1,
     insertedIds: { '0': '5d43e984cac69347f792f7b5' } } }

*/
/* jshint esversion:8 */

const axios = require("axios");
const { formatDate } = require("./Format");
const config = require("../config");

const Alarm = () => {
  return {
    DeviceId:"1a24d35sa",
    Alarm_msg: getRndInteger(msg),
    Alarm_type: getRndInteger(type),
    Alarm_device: getRndInteger(dev),
    Alarm_level: getRndInteger(level),
    Alarm_time: formatDate()
    /* confirm:false,
    confirm_user:"",
    confirm_time:new Date(), */
  };
};

const msg = [
  "站点机房,电量仪,B相频率,告警恢复",
  "站点机房,电量仪,B相频率,超下限,值:25.02",
  "站点机房,UPS,电池测试,告警",
  "站点机房,UPS,市电状态,告警"
];
const type = ["超下限", "告警恢复", "告警"];
const dev = ["ups", "ac", "power", "io", "th"];
const level = [0, 1, 2];
function getRndInteger(arr) {
  let len = arr.length;
  let random = Math.random() * len;
  let intr = Math.ceil(random);
  return arr[intr - 1];
}

function maps() {
  axios
    .post(config.Alarm_api, Alarm())
    .then(res => {
      console.log(config.Alarm_api);

      console.log(res.data);
    })
    .catch(err => {
      console.log({ err: err, val: JSON.stringify(err) });
    });
}
maps();
setInterval(maps, 500000);
