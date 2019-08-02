/* 模拟dev数据 */
/*
 ups
1/1 单输入单输出
名称、温度、        品牌、 状态、   相位、  剩余容量、           电池电压、         负电池电压、               烟感、   门禁、          输入电压、       输出电压、        负载比率、    输出频率
name,temperature,Brand, status, phase, residual capacity, battery voltage, negative battery voltage, smoke, access control, input voltage, output voltage, load ratio, output frequency
3/1 三输入单输出
名称、温度、品牌、状态、相位、剩余容量、电池电压、负电池电压、烟感、门禁、
输入电压L1、        输入电压L2、        输入电压L3、        输出电压、      负载比率、      输出频率
Input voltage L1, input voltage L2, input voltage L3, output voltage, load ratio, output frequency

3/3 三输入三输出
名称、温度、品牌、状态、相位、剩余容量、电池电压、负电池电压、烟感、门禁、输入电压L1、输入电压L2、输入电压L3、输出频率、输出电压L1、输出电压L2、输出电压L3、输出负载L1、输出负载L2、输出负载L3、负载比率
*/


const upsDefault = {
    name: 'upsDefault',
    temperature: 1,
    brand: 'ups',
    status: 1,
    phase: 3,
    residual_capacity: 0,
    battery_voltage: 0,
    battery_voltage_negative: 8,
    smoke: 'you',
    access_contral: false,
    load_ratio: 50,
    output_frequency: 0
}
const u1 = {
    type: 1,
    input_voltage: 220,
    output_voltage: 380,
}
const u2 = {
    type: 2,
    input_voltage_l1: 0,
    input_voltage_l2: 0,
    input_voltage_l3: 0,
    output_voltage: 0
}
const u3 = {
    type: 3,
    input_voltage_l1: 220,
    input_voltage_l2: 220,
    input_voltage_l3: 380,
    output_voltage_l1: 220,
    output_voltage_l2: 240,
    output_voltage_l3: 220
}

const UPS = {
    ups1: Object.assign(u1, upsDefault),
    ups2: Object.assign(u2, upsDefault),
    ups3: Object.assign(u3, upsDefault)
}

/* 
ups1 = {
        name:'upsDefault',
        temperature:'0',
        brand:'ups',
        status:false,
        phase:0,
        residual_capacity:0,
        battery_voltage:0,
        battery_voltage_negative:0,
        smoke:fale,
        access_contral:false,
        load_ratio:0,
        output_frequency:0
        input_voltage:0,
        output_voltage:0
    }

ups2 = {
        name:'upsDefault',
        temperature:'0',
        brand:'ups',
        status:false,
        phase:0,
        residual_capacity:0,
        battery_voltage:0,
        battery_voltage_negative:0,
        smoke:fale,
        access_contral:false,
        load_ratio:0,
        output_frequency:0
        input_voltage_l1:0,
        input_voltage_l2:0,
        input_voltage_l3:0,
        output_voltage:0
    }

ups3 = {
        name:'upsDefault',
        temperature:'0',
        brand:'ups',
        status:false,
        phase:0,
        residual_capacity:0,
        battery_voltage:0,
        battery_voltage_negative:0,
        smoke:fale,
        access_contral:false,
        load_ratio:0,
        output_frequency:0
        input_voltage_l1:0,
        input_voltage_l2:0,
        input_voltage_l3:0,
        output_voltage_l1:0,
        output_voltage_l2:0,
        output_voltage_l3:0
    }
*/

/*
空调
制冷温度、                  模式（待机/运行/停机）、
Refrigeration temperature,mode (standby/operation/shutdown)
制冷停止偏差、                  蒸发开启温度、                    换气时间、        开度延时、
Refrigeration stop deviation, evaporation start temperature, air change time, opening delay,
高温报警点、                    回风温度、                盘管温度、         修正回风温度、
High temperature alarm point, return air temperature, coil temperature, modified return air temperature,
修正出风温度、                     除霜温度设定、                    加热开启偏差、
Correct air outlet temperature, defrosting temperature setting, heating opening deviation,
加热停止偏差、             制冷开启偏差、                   出风温度偏差、
Heating stop deviation, refrigeration start deviation, air outlet temperature deviation,
开机温保设定、                   温差、                   送风温度
Starting temperature setting, temperature difference, air supply temperature
*/
const AIR_COOL = {
    name: 'cool',
    devid: 1,
    brand: 'cool',
    refrigeration_temperature: 2,
    mode: ['stand', 'run', 'stop'],
    refrigeration_stop_deviation: 3,
    evaporation_start_temperature: 7,
    air_change_time: 5,
    opening_delay: 0,
    high_temperature_alarm_point: 5,
    return_air_temperature: 33,
    coil_temperature: 2,
    modified_return_air_temperature: 8,
    Correct_air_outlet_temperature: 0,
    defrosting_temperature_setting: 9,
    heating_opening_deviation: 0,
    heating_stop_deviation: 0,
    refrigeration_start_deviation: 0,
    air_outlet_temperature_deviation: 0,
    Starting_temperature_setting: 0,
    temperature_difference: 55,
    air_supply_temperature: 66
}

/*  
电量仪单项【说明，括号中代表三个值】
输入电压（上门限、下门限、当前值）、输入电流（上门限、下门限、当前值）、输入频率（上门限、下门限、当前值）、有功功率（上门限、下门限、当前值）、无功功率（上门限、下门限、当前值）、功率因素（上门限、下门限、当前值）、电量（上门限、下门限、当前值）
Input voltage,                input current,                input frequency,              active power,                 reactive power,               power factor,                 quantity 
三项电量仪
A相输入电压（上门限、下门限、当前值）、B相输入电压（上门限、下门限、当前值）、C相输入电压（上门限、下门限、当前值）、A相输入电流（上门限、下门限、当前值）、B相输入电流（上门限、下门限、当前值）、C相输入电流（上门限、下门限、当前值）、A相有功功率（上门限、下门限、当前值）、B相有功功率（上门限、下门限、当前值）、C相有功功率（上门限、下门限、当前值）、有功功率（上门限、下门限、当前值）、无功功率（上门限、下门限、当前值）、功率因素（上门限、下门限、当前值）
 */


const powerDefault = {
    name: 'power',
    devid: 0,
    brand: 'power',
    status:'true',
    active_power: [10, 1, 99],
    reactive_power: [100, 2, 3],
    power_factor: [99, 3, 5],
    quantity: [1, -1, 1]
}

const p1 = {
    type: 1,
    input_voltage: [1, -1, 0.1],
    input_current: [1, -1, .05],
    input_frequency: [1, -1, 0.8]
}

const p3 = {
    type: 3,
    input_voltage_l1: [1, -1, 0],
    input_voltage_l2: [1, -1, 0],
    input_voltage_l3: [1, -1, 0],
    input_current_l1: [1, -1, 0],
    input_current_l2: [1, -1, 0],
    input_current_l3: [1, -1, 0],
    input_frequency_l1: [1, -1, 0],
    input_frequency_l2: [1, -1, 0],
    input_frequency_l3: [1, -1, 0]
}

const POWER = {
    power1: Object.assign(p1, powerDefault),
    power3: Object.assign(p3, powerDefault)
}


/*
IO
8路继电器状态、8路数字量输入状态
*/

const IO = {
    name: 'io',
    devid: 0,
    brand: 'io',
    power_status: true,
    input_status: false
}

/*  
温湿度/Temperature humidity
温度、湿度
 */
const TH = {
    name: 'Temperature humidity',
    devid: 0,
    brand: 'th',
    temperature: 27,
    humidity: 80
}
const dev = { UPS, AIR_COOL, POWER, IO, TH }
module.exports = dev