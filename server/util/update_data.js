/* 
简要描述：
   工控数据提交接口

请求URI：
    http://116.62.48.175:81/Api/dev

请求类型：
    POST

参数：
    type:
        必选:true
        类型:String
        说明：设备类型说明
        可选项：['io', 'th', 'ac', 'ups','power']

    updateTime:
        必选:true
        类型:Date
        说明：数据生成时间

    dataType:
        必选:true
        类型:String
        说明：数据打包格式
        可选项：['One','Many'] 
              One:单条数据
              Many:多条json合成的数组

    data：
        必选:true
        类型:Object
        说明：数据正文

    Arg：
        必选:false
        类型:Object
        说明：预留参数
    

输入示例：

json={
  type: 'ups',
  updateTime: new Date(),
  dataType: 'One',  
  data:{  
    generateTime: formatDate(),
    name: 'ups-007',
    devid: 1,
    brand: 'ladis',
    temperature: '25',

    status: 1,
    phase: 'd7',
    residual_capacity: getRndInteger(3),
    battery_voltage: getRndInteger(4),
    battery_voltage_negative: getRndInteger(9),
    smoke: false,
    access_contral: false,
    load_ratio: getRndInteger(21),
    output_frequency: getRndInteger(25),
    input_voltage_l1: getRndInteger(2),
    input_voltage_l2: getRndInteger(),
    input_voltage_l3: getRndInteger(),
    output_voltage_l1: getRndInteger(),
    output_voltage_l2: getRndInteger(),
    output_voltage_l3: getRndInteger()
  }  
}

返回数据：
 后台收到post一定会响应，有返回status：200

{ code: 201,                            ||code返回200，201,202，203
  msg: 'Data submission successful',    ||返回处理消息
  res:                                  ||res 包含数据库返回的消息
   { insertedCount: 3,                  || 影响的行数
     insertedIds:                        || 数据库为每条insert数据生成的_id
      { '0': '5d43e984cac69347f792f7b6',
        '1': '5d43e984cac69347f792f7b7',
        '2': '5d43e984cac69347f792f7b8' } } }
OR
{ code: 200,
  msg: 'Data submission successful',
  res:
   { insertedCount: 1,
     insertedIds: { '0': '5d43e984cac69347f792f7b5' } } }

*/
/* jshint esversion:8 */
const axios = require("axios");
const { formatDate } = require("./Format");
const config = require("../config");

var simulate_ups = () => {
  return {
    type: "ups",
    updateTime: formatDate(),
    dataType: "One",
    data: {
      generateTime: formatDate(),
      name: "ups-00787",
      devid: "1a24d35sa",
      brand: "ladis",
      temperature: "25",

      status: 1,
      phase: "d73a52s",
      residual_capacity: getRndInteger(3),
      battery_voltage: getRndInteger(4),
      battery_voltage_negative: getRndInteger(9),
      smoke: false,
      access_contral: false,
      load_ratio: getRndInteger(21),
      output_frequency: getRndInteger(25),
      input_voltage_l1: getRndInteger(2),
      input_voltage_l2: getRndInteger(),
      input_voltage_l3: getRndInteger(),
      output_voltage_l1: getRndInteger(),
      output_voltage_l2: getRndInteger(),
      output_voltage_l3: getRndInteger()
    }
  };
};

var simulate_col = () => {
  return {
    type: "ac",
    updateTime: formatDate(),
    dataType: "One",
    data: {
      generateTime: formatDate(),
      name: "ac-007",
      devid: "21s5a8d41",
      brand: "ladis",
      refrigeration_temperature: getRndInteger(),
      mode: ["stand", "run", "stop"],
      refrigeration_stop_deviation: getRndInteger(),
      evaporation_start_temperature: getRndInteger(),
      air_change_time: getRndInteger(),
      opening_delay: getRndInteger(),
      high_temperature_alarm_point: getRndInteger(),
      return_air_temperature: getRndInteger(),
      coil_temperature: getRndInteger(),
      modified_return_air_temperature: getRndInteger(),
      Correct_air_outlet_temperature: getRndInteger(),
      defrosting_temperature_setting: getRndInteger(),
      heating_opening_deviation: getRndInteger(),
      heating_stop_deviation: getRndInteger(),
      refrigeration_start_deviation: getRndInteger(),
      air_outlet_temperature_deviation: getRndInteger(),
      Starting_temperature_setting: getRndInteger(),
      temperature_difference: getRndInteger(),
      air_supply_temperature: getRndInteger()
    }
  };
};

var simulate_io = () => {
  return {
    type: "io",
    updateTime: formatDate(),
    dataType: "Many",
    data: [
      {
        generateTime: formatDate(),
        name: "io-007777",
        devid: "15awx3233",
        brand: "ladis",
        power_status: true,
        input_status: false
      },
      {
        generateTime: formatDate(),
        name: "io-007",
        devid: "a35d453x4",
        brand: "ladis",
        power_status: true,
        input_status: false
      },
      {
        generateTime: formatDate(),
        name: "io-007",
        devid: "dcsc42545615",
        brand: "ladis",
        power_status: true,
        input_status: false
      }
    ]
  };
};

var simulate_th = () => {
  return {
    type: "th",
    updateTime: formatDate(),
    dataType: "Many",
    data: [
      {
        generateTime: formatDate(),
        name: "th-007",
        devid: "csd654c5d6",
        brand: "ladis",
        temperature: getRndInteger(),
        humidity: getRndInteger()
      },
      {
        generateTime: formatDate(),
        name: "th-007",
        devid: "7cxse5c45",
        brand: "ladis",
        temperature: getRndInteger(),
        humidity: getRndInteger()
      },
      {
        generateTime: formatDate(),
        name: "th-007",
        devid: "cdscfdsrf8",
        brand: "ladis",
        temperature: getRndInteger(),
        humidity: getRndInteger()
      }
    ]
  };
};

var simulate_power = () => {
  return {
    type: "power",
    updateTime: formatDate(),
    dataType: "One",
    data: {
      generateTime: formatDate(),
      name: "power-007",
      devid: "9sdd",
      brand: "ladis",
      active_power: [10, 1, getRndInteger()],
      reactive_power: [100, 2, getRndInteger()],
      power_factor: [99, 3, getRndInteger()],
      quantity: [1, -1, getRndInteger()],
      input_voltage: [10, 1, getRndInteger()],
      input_voltage_l1: [10, 1, getRndInteger()],
      input_voltage_l2: [10, 1, getRndInteger()],
      input_voltage_l3: [10, 1, getRndInteger()],
      input_current: [10, 1, getRndInteger()],
      input_current_l1: [10, 1, getRndInteger()],
      input_current_l2: [10, 1, getRndInteger()],
      input_current_l3: [10, 1, getRndInteger()],
      input_frequency: [10, 1, getRndInteger()],
      input_frequency_l1: [10, 1, getRndInteger()],
      input_frequency_l2: [10, 1, getRndInteger()],
      input_frequency_l3: [10, 1, getRndInteger()]
    }
  };
};

function getRndInteger() {
  return Math.floor(Math.random() * (100 - 0)) + 0;
}

var simulate_dev = [
  simulate_col,
  simulate_io,
  simulate_power,
  simulate_th,
  simulate_ups
];
maps();
setInterval(maps, 5000);

function maps() {
  console.log("setInterval 1000");
  simulate_dev.map(val => {
    axios
      .post(config.dev_api, val())
      .then(res => {
        console.log(config.dev_api);

        console.log(res.data);
      })
      .catch(err => {
        console.log({ err: err, val: JSON.stringify(err) });
      });
  });
}
