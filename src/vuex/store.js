import Vue from 'vue'
import Vuex from 'vuex'
import { language } from './language'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    sysname: 'Ladis UPS',
    //language
    language,
    lang: 'cn',
    //setting
    interval_time: 20000,
    // dev data
    dev: {ups: [],air_cool: [],io: [],power: [],th: [],},
    warringinfo: [],
    loginfo: []
}
//getters
const getters = {
    //根据定义的语言返回词表
    language: (state) => {
        var { lang, language } = state
        var selang = {}
        for (var [key, val] of Object.entries(language)) {
            selang[key] = val[lang]
        }
        return selang
    }
}
// 定义所需的 mutations
const mutations = {
    //set interval
    SETinterval(state, data) {
        state.interval_time = (isNaN(data) ? 20000 : data * 1000)
    },
    //set language
    SETlanguage(state, data) {
        state.lang = data.data
    },

    // set dev
    /**
     *
     *
     * @param {*} store.state
     * @param {*} data
     */
    SETDEV(state, data) {
        var datas = data.data.data
        if (state.dev.ups.length == 0) state.dev = datas

        Object.keys(datas).map((devlist) => {
            datas[devlist].map((li, key) => {

                state.dev[devlist][key] = Object.assign(state.dev[devlist][key], {
                    arg: li.arg,
                    name: li.name,
                    mode: li.arg.mode,
                    brand: li.arg.brand,
                    devid: li.devid,
                    date: li.date,
                    titles: Object.keys(li.arg),
                })

                if (devlist != 'power') {
                    state.dev[devlist][key].args.push(li.arg)
                } else {
                    let metrics = [
                        "active_power", "reactive_power", "power_factor", "quantity", "input_voltage",
                        "input_voltage_l1", "input_voltage_l2", "input_voltage_l3",
                        "input_current", "input_current_l1", "input_current_l2", 'input_current_l3',
                        "input_frequency", "input_frequency_l1", "input_frequency_l2", "input_frequency_l3"]
                    var power_arg = { date: li.date }
                    metrics.map((ikey) => {
                        power_arg[ikey] = li.arg[ikey] ? li.arg[ikey][2] : 0
                    })
                    state.dev[devlist][key].args.push(power_arg)
                    //console.log(power_arg)
                }
            })
        })
        //state.dev = devs
        /* var datas = data.data.data
        if (state.dev.stat == false){
            state.dev = datas
            state.dev.stat = true
        }

         for (var i in array) {
            for (var ii in array[i]) {
                let dev = state.dev.data[i][ii]
                //arg = data.UPS.u1
                let arg = array[i][ii]
                let obj = {
                    arg: arg.arg,
                    name: arg.name,
                    mode: arg.arg.mode,
                    brand: arg.arg.brand,
                    devid: arg.devid,
                    date: arg.date,
                    titles: [],

                }
                //检查arg key是否收集
                if (dev.title == undefined) {
                    for (var title in arg.arg) {
                        obj.titles.push(title)
                    }

                }
                //如果i == power，序列化arg.x[1,-1,0] == arg.x[0]
                if (i == 'power') {
                    let metrics = [
                        "active_power", "reactive_power", "power_factor", "quantity", "input_voltage",
                        "input_voltage_l1", "input_voltage_l2", "input_voltage_l3",
                        "input_current", "input_current_l1", "input_current_l2", 'input_current_l3',
                        "input_frequency", "input_frequency_l1", "input_frequency_l2", "input_frequency_l3"]
                    let Powerobj = { date: arg.date }
                    for (var iii of metrics) {
                        Powerobj[iii] = arg.arg[iii] ? arg.arg[iii][2] : 0
                    }
                    //console.log(state.dev.data[i][ii].args)                  
                    //console.log(state.dev.data[i][ii])
                    state.dev.data[i][ii].args.push(Powerobj)
                } else {
                    state.dev.data[i][ii].args.push(arg.arg)
                }
                state.dev.data[i][ii] = Object.assign(dev, obj)
            } 
        } */
    },
    //set warring
    SETWARRING(state, data) {
        //console.log(data.data)
        state.warringinfo = data.data.data
    },
    //set log
    SETLOG(state, data) {
        state.loginfo = data.data.data
    }
}

// 创建 store 实例
export default new Vuex.Store({
    getters,
    state,
    mutations
})