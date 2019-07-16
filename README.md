**demo**: [https://taylorchen709.github.io/vue-admin/](https://taylorchen709.github.io/vue-admin/)

# To start

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```

# Folder structure
* build - webpack config files
* config - webpack config files
* dist - build
* src -your app
    * api
    * assets
    * common
    * components - your vue components
    * mock
    * styles
    * views - your pages
    * vuex
    * App.vue
    * main.js - main file
    * routes.js
* static - static assets

# Theme
You can change theme by 
1. Generate theme packages by [https://elementui.github.io/theme-preview/#/](https://elementui.github.io/theme-preview/#/)


# Browser support

Modern browsers and IE 10+.

# License
[MIT](http://opensource.org/licenses/MIT)
# admin

#directory
./
目录结构

├── dist 编译的静态网页
│   ├── index.html
│   └── static
│       ├── css
│       │   
│       ├── fonts
│       │  
│       ├── img
│       │  
│       └── js
├── index.html  //编译用头文件
├── LICENSE
├── package.json
├── README.md
└── src    //开发文件夹
    ├── api  //ajax请求
    │   ├── api.js
    │   └── index.js
    ├── App.vue //
    ├── assets  //css font文件夹
    │   ├── background.png
    │   ├── bailk
    │   │   └── index.css
    │   ├── bg1.jpg
    │   ├── element-theme
    ├── common
    │   └── js
    │       └── util.js
    ├── components
    ├── main.js     //vue项目主文件
    ├── mock        //模拟请求响应配置
    │   ├── data
    │   │   ├── dev.js
    │   │   ├── info.js
    │   │   └── user.js
    │   ├── index.js
    │   └── mock.js
    ├── routes.js       //路由文件
    ├── styles
    │   └── vars.scss
    ├── views           //vue组件
    │   ├── 404.vue
    │   ├── Home.vue
    │   ├── Info.vue
    │   ├── log
    │   │   └── log.vue
    │   ├── Login.vue
    │   ├── main
    │   │   ├── Air.vue
    │   │   ├── IO.vue
    │   │   ├── POWER.vue
    │   │   ├── TH.vue
    │   │   ├── ups
    │   │   ├── UPS.vue
    │   │   └── util
    │   │       ├── head.vue
    │   │       └── Progress_dashboard.vue
    │   ├── Main.vue
    │   ├── Passwdreset.vue
    │   ├── Registered.vue
    │   └── Setting.vue
    └── vuex                //Store数据文件
        ├── language.js
        └── store.js

3410 directories, 19807 files

#数据流
home.vue =>(请求devinfo,loginfo,errorinfo)/默认更新间隔20s => 数据commit Store =>其余页面compent调用Store 
#请求格式  request format
#登录
{
    name:'admin',
    password:''+34.85@354     //密码通过base64加密
}
#预期返回格式
#success
{
    code:200,
    msg:'success',
    user:'user'    
}
#error
{
    code:500,
    msg:'error info'
}
#------------------------------------------

#注册

    {
        name: "user1",
        passwd: "123456",
        passwdck: "123456",
        mail: "123456@qq.com",
        orgin: "",
        tel: ""
      }

#--------------------------------------------------

#重置密码
 {
        name: "user1",
        passwd: "123456",
        passwdck: "123456",
        mail: "111@qq.com",
      }
#效验邮箱，返回邮箱验证码，再次请求将带上验证码
{
    Validation: 验证码,
    user: {
        name: "user1",
        passwd: "123456",
        passwdck: "123456",
        mail: "123456@qq.com",
        orgin: "",
        tel: ""
    }
}

#-------------------------------------------
#请求日志
{id:10,user:'user',token:'***',type:'getInfo'}

#resopon data:
{
    id:222,
    type:''  //类型
    info:'' //文本
    date:''  //time
}
#-------------------------------------
#请求错误日志
{id:11,user:'user',token:'***',type:'getErrorInfo'}

#resopon data:
{
    id:222,
    type:''  //类型
    info:'' //文本
    date:''  //time
}

#---------------------------


#-----------------------------------------------------
#请求设备数据

{ id: 3,user:'user','token':'***',type:'getDevInfo' }
#返回数据 //
data = {
        ups: [  //类型分类
          {
            name: 'u1',         //设备别名
            devid: md5(634585), //设备ID
            date: getdate(), //数据生成时间
            arg: u1,  //数据实体
            args: []
          },
          {
            name: 'u2',
            devid: md5(3585),
            date: getdate(),
            arg: u2,
            args: []
          }
        ],
        air_cool: [
          {
            name: 'c1',
            devid: md5(54548565),
            date: getdate(),
            arg: c1,
            args: []
          },
          {
            name: 'c2',
            devid: md5(3656525),
            date: getdate(),
            arg: c2,
            args: []
          }
        ],
        io: [
          {
            name: 'i1',
            devid: md5(35512585),
            date: getdate(),
            arg: i1,
            args: []
          },
          {
            name: 'i2',
            devid: md5(358121585),
            date: getdate(),
            arg: i2,
            args: []
          }
        ],
        power: [
          {
            name: 'p1',
            devid: md5(35552585),
            date: getdate(),
            arg: p1,
            args: []
          },
          {
            name: 'p3',
            devid: md5(35885121585),
            date: getdate(),
            arg: p3,
            args: []
          }
        ],
        th: [
          {
            name: 't1',
            devid: md5(35512893585),
            date: getdate(),
            arg: t1,
            args: []
          },
        ]
      }


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

export { UPS, AIR_COOL, POWER, IO, TH }