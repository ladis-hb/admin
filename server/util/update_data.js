/* 
请求类型：post；
格式json={

  type: 'ups',  设备类型可选['io', 'th', 'ac', 'ups','power']

  updateTime: Date(), post上传时间

  dataType: 'One',  数据组装类型，data是单条json还是Array ，例子：data:[{},{},{}] or data: {}
  
  data:{}  数据正文 
  例子：data: {
    generateTime: Date(),
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

const axios = require('axios')

var simulate_ups = {
  type: 'ups',
  updateTime: Date(),
  dataType: 'One',
  data: {
    generateTime: Date(),
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

var simulate_col = {
  type: 'ac',
  updateTime: Date(),
  dataType: 'One',
  data: {
    generateTime: Date(),
    name: 'ac-007',
    devid: 1,
    brand: 'ladis',
    refrigeration_temperature: getRndInteger(),
    mode: ['stand', 'run', 'stop'],
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
}

var simulate_io = {
  type: 'io',
  updateTime: Date(),
  dataType: 'Many',
  data: [
    {
      generateTime: Date(),
      name: 'io-007',
      devid: 1,
      brand: 'ladis',
      power_status: true,
      input_status: false
    },
    {
      generateTime: Date(),
      name: 'io-007',
      devid: 1,
      brand: 'ladis',
      power_status: true,
      input_status: false
    },
    {
      generateTime: Date(),
      name: 'io-007',
      devid: 1,
      brand: 'ladis',
      power_status: true,
      input_status: false
    },
  ]
}

var simulate_th = {
  type: 'th',
  updateTime: Date(),
  dataType: 'Many',
  data: [
    {
      generateTime: Date(),
      name: 'th-007',
      devid: 1,
      brand: 'ladis',
      temperature: getRndInteger(),
      humidity: getRndInteger()
    },
    {
      generateTime: Date(),
      name: 'th-007',
      devid: 1,
      brand: 'ladis',
      temperature: getRndInteger(),
      humidity: getRndInteger()
    },
    {
      generateTime: Date(),
      name: 'th-007',
      devid: 1,
      brand: 'ladis',
      temperature: getRndInteger(),
      humidity: getRndInteger()
    },
  ]
}

var simulate_power = {
  type: 'power',
  updateTime: Date(),
  dataType: 'One',
  data: {
    generateTime: Date(),
    name: 'power-007',
    devid: 1,
    brand: 'ladis',
    active_power: [10, 1, getRndInteger()],
    reactive_power: [100, 2, getRndInteger()],
    power_factor: [99, 3, getRndInteger()],
    quantity: [1, -1, getRndInteger()]
  }
}


function getRndInteger() {
  return Math.floor(Math.random() * (100 - 0)) + 0;
}

var simulate_dev = [simulate_col, simulate_io, simulate_power, simulate_th, simulate_ups]
maps()
setInterval(maps, 50000)

function maps() {
  console.log('setInterval 5000')
  simulate_dev.map(val => {
    //axios.post('http://127.0.0.1:3000/Api/dev', val).then(res => {
      axios.post('http://116.62.48.175:81/Api/dev', val).then(res => {
      //console.log(res.data)
    }).catch(err => {
      console.log({err:err.data,val:val})
    })
  })
}