const langDefault = {
    name: {
        cn: '名称',
        en: 'Name',
    },
    Devid: {
        cn: '设备ID',
        en: 'Devid'
    },
    devid: {
        cn: '设备ID',
        en: 'Devid'
    },
    status: {
        cn: '状态',
        en: 'Status'
    },
    brand: {
        cn: '品牌',
        en: 'Brand'
    },
    type: {
        cn: '类型',
        en: 'type'
    },
    temperature: {
        en: 'temperature',
        cn: '温度'
    },
    updatetime: {
        en: 'update time',
        cn: '更新时间'
    },
    date:{
        en:'DateTime',
        cn:'时间'
    },
    Equipment_overview:{
        en:'Equipment overview',
        cn:'设备概览'
    },
    info:{
        en:'info',
        cn:'信息'
    },
    setting:{
        en:'setting',
        cn:'设置'
    },
    air_conditioning:{
        en:'air conditioning',
        cn:'空调'
    },
    air_cool:{
        en:'air conditioning',
        cn:'空调'
    },
    Electricity_meter:{
        en:'Electricity meter',
        cn:'电量仪'
    },
    power:{
        en:'Electricity meter',
        cn:'电量仪'
    },
    Temperature_humidity:{
        en:'Temperature&humidity',
        cn:' 温湿度'
    },
    th:{
        en:'Temperature&humidity',
        cn:' 温湿度'
    },
    UPS:{
        en:'UPS',
        cn:'UPS'
    },
    ups:{
        en:'UPS',
        cn:'UPS'
    },
    io:{
        en:'IO',
        cn:'IO'
    },
    login:{
        en:'login',
        cn:'登录'
    },
    language:{
        cn:'language',
        en:'中文'
    },
    high:{
        en:'high',
        cn:'上限'
    },
    low:{
        en:'low',
        cn:'下限'
    },
    now:{
        en:'now',
        cn:'当前'
    },
    loginout:{
        en:'loginout',
        cn:'退出登录'
    },
    login:{
        en:'login',
        cn:'登录'
    },
    Confirm_exit:{
        en:'Confirm your exit?',
        cn:'确认退出吗?'
    },
    tip:{
        en:'tip',
        cn:'提示'
    },
    yes:{
        en:'yes',
        cn:'是'
    },
    no:{
        en:'no',
        cn:'否'
    }


}

const ups = {
    phase: {
        cn: '相位',
        en: 'phase'
    },
    residual_capacity: {
        en: 'residual_capacity',
        cn: '剩余容量'
    },
    battery_voltage: {
        en: 'battery_voltage',
        cn: '电池电压'
    },
    battery_voltage_negative: {
        en: 'battery_voltage_negative',
        cn: '负电池电压'
    },
    smoke: {
        cn: '烟感',
        en: 'smoke'
    },
    access_contral: {
        en: 'access_contral',
        cn: '门禁'
    },
    load_ratio: {
        en: 'load_ratio',
        cn: '输出频率'
    },
    output_frequency: {
        en: 'output_frequency',
        cn: '电池电压'
    },
    input_voltage: {
        en: 'input_voltage',
        cn: '输入电压'
    },
    output_voltage: {
        en: 'output_voltage',
        cn: '输出电压'
    },
    input_voltage_l1: {
        en: 'input_voltage_l1',
        cn: '输入电压L1'
    },
    input_voltage_l2: {
        en: 'input_voltage_l1',
        cn: '输入电压L2'
    },
    input_voltage_l3: {
        en: 'input_voltage_l1',
        cn: '输入电压L3'
    },
    output_voltage_l1: {
        en: 'output_voltage_l1',
        cn: '输出电压L1'
    },
    output_voltage_l2: {
        en: 'output_voltage_l2',
        cn: '输出电压L2'
    },
    output_voltage_l3: {
        en: 'output_voltage_l3',
        cn: '输出电压L3'
    },




}

const cool = {
    refrigeration_temperature: {
        en: 'refrigeration_temperature',
        cn: "制冷温度"
    },
    refrigeration_stop_deviation: {
        cn: "制冷停止偏差",
        en: 'refrigeration_stop_deviation'
    },
    evaporation_start_temperature: {
        cn: "蒸发开启温度",
        en: 'evaporation_start_temperature'
    },
    air_change_time: {
        cn: "换气时间",
        en: 'air_change_time'
    },
    opening_delay: {
        cn: "开度延时",
        en: 'opening_delay'
    },
    high_temperature_alarm_point: {
        cn: "高温报警点",
        en: 'high_temperature_alarm_point'
    },
    return_air_temperature: {
        cn: "回风温度",
        en: 'return_air_temperature'
    },
    coil_temperature: {
        cn: "盘管温度",
        en: 'coil_temperature'
    },
    modified_return_air_temperature: {
        cn: "修正回风温度",
        en: 'modified_return_air_temperature'
    },
    Correct_air_outlet_temperature: {
        cn: "修正出风温度",
        en: 'Correct_air_outlet_temperature'
    },
    defrosting_temperature_setting: {
        cn: "除霜温度设定",
        en: 'defrosting_temperature_setting'
    },
    heating_opening_deviation: {
        cn: "加热开启偏差",
        en: 'heating_opening_deviation'
    },
    heating_stop_deviation: {
        cn: "加热停止偏差",
        en: 'heating_stop_deviation'
    },
    refrigeration_start_deviation: {
        cn: "制冷开启偏差",
        en: 'refrigeration_start_deviation'
    },
    air_outlet_temperature_deviation: {
        cn: "出风温度偏差",
        en: 'air_outlet_temperature_deviation'
    },
    Starting_temperature_setting: {
        cn: "开机温保设定",
        en: 'Starting_temperature_setting'
    },
    temperature_difference: {
        cn: "温差",
        en: 'temperature_difference'
    },
    air_supply_temperature: {
        cn: "送风温度",
        en: 'air_supply_temperature'
    },
    mode: {
        cn: '模式',
        en: 'mode'
    }
}

const power = {
    active_power: {
        cn: "有功功率",
        en: 'active_power'
    },
    reactive_power: {
        cn: "无功功率",
        en: 'reactive_power'
    },
    power_factor: {
        cn: "功率因素",
        en: 'power_factor'
    },
    quantity: {
        cn: "电量",
        en: 'quantity'
    },
    input_voltage: {
        cn: "输入电压",
        en: 'input_voltage'
    },
    input_voltage_l1: {
        cn: "输入电压_A",
        en: 'input_voltage_l1'
    },
    input_voltage_l2: {
        cn: "输入电压_B",
        en: 'input_voltage_l2'
    },
    input_voltage_l3: {
        cn: "输入电压_C",
        en: 'input_voltage_l3'
    },
    input_current: {
        cn: "输入电流",
        en: 'input_current'
    },
    input_current_l1: {
        cn: "输入电流_A",
        en: 'input_current_l1'
    },
    input_current_l2: {
        cn: "输入电流_B",
        en: 'input_current_l2'
    },
    input_current_l3: {
        cn: "输入电流_C",
        en: 'input_current_l3'
    },
    input_frequency: {
        cn: "输入频率",
        en: 'input_frequency'
    },
    input_frequency_l1: {
        cn: "输入频率_A",
        en: 'input_frequency_l1'
    },
    input_frequency_l2: {
        cn: "输入频率_B",
        en: 'input_frequency_l2'
    },
    input_frequency_l3: {
        cn: "输入频率_C",
        en: 'input_frequency_l3'
    },
}

const io = {
    power_status: {
        cn: '8路继电器状态',
        en: 'power_status'
    },
    input_status: {
        cn: '8路数字量输入状态',
        en: 'input_status'
    }
}

const th = {
    temperature: {
        cn: '温度',
        en: 'temperature'
    },
    humidity: {
        cn: '湿度',
        en: 'humidity'
    }
}

//export { langDefault } //Object.assign(Default,ups,cool,power,io,th)
const language = Object.assign(langDefault, ups, cool, power, io, th)
export { language }

var list = {
    ups: {
        ul: ["name", "devid", "brand", "status", "load_ratio", "date"],
        li: [
            "name",
            "brand",
            "status",
            "phase",
            "smoke",
            "access_contral",
            "temperature",
            "residual_capacity",
            "battery_voltage",
            "battery_voltage_negative",
            "load_ratio",
            "output_frequency",
            "input_voltage",
            "output_voltage",
            "input_voltage_l1",
            "input_voltage_l2",
            "input_voltage_l3",
            "output_voltage_l1",
            "output_voltage_l2",
            "output_voltage_l3"
        ]
    },
    cool: {
        ul: ["name", "devid", "brand", "status", "mode", "date"],
        li: [
            "name",
            "devid",
            "brand",
            "status",
            "mode",
            "date",
            "refrigeration_temperature",
            "refrigeration_stop_deviation",
            "evaporation_start_temperature",
            "air_change_time",
            "opening_delay",
            "high_temperature_alarm_point",
            "return_air_temperature",
            "coil_temperature",
            "modified_return_air_temperature",
            "Correct_air_outlet_temperature",
            "defrosting_temperature_setting",
            "heating_opening_deviation",
            "heating_stop_deviation",
            "refrigeration_start_deviation",
            "air_outlet_temperature_deviation",
            "Starting_temperature_setting",
            "temperature_difference",
            "air_supply_temperature"
        ]
    },
    power: {
        ul: ["name", "devid", "brand", "power_factor", "quantity", "date"],
        li: [
            "name",
            "devid",
            "brand",
            "status",
            "mode",
            "date",
            "active_power",
            "reactive_power",
            "power_factor",
            "quantity",
            "input_voltage",
            "input_voltage_l1",
            "input_voltage_l2",
            "input_voltage_l3",
            "input_current",
            "input_current_l1",
            "input_current_l2",
            "input_current_l3",
            "input_frequency",
            "input_frequency_l1",
            "input_frequency_l2",
            "input_frequency_l3"
        ]
    },
    io: {
        ul: [
            "name",
            "devid",
            "brand",
            "power_status",
            "input_status",
            "date"
        ],
        li: [
            "name",
            "devid",
            "brand",
            "status",
            "date",
            "power_status",
            "input_status"
        ]
    },
    th: {
        ul: ["name", "devid", "brand", "temperature", "humidity", "date"],
        li: [
            "name",
            "devid",
            "brand",
            "status",
            "date",
            "temperature",
            "humidity"
        ]
    }
}
