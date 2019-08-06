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
    //user
    user: {},
    token: '',
    //setting
    interval_time: 20000,
    // dev data
    dev: 0,
    devs:{ups:{},io:{},th:{},ac:{},th:{}},
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
    //set user
    SETuser(state, data) {
        state.user.name = data.user
        state.token = data.token
    },
    //set user pic
    SETuserInfo(state, data) {
        state.user.pic = data.pic
        //console.log(state.user.pic)
    },
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
     * @param {*} store.state
     * @param {*} data
     */
    SETDEV(state, data) {
        let dev_all = JSON.parse(JSON.stringify(data.data))
        let d = JSON.parse(JSON.stringify(data.data))
        state.dev = d
        for (let key in dev_all) {
            if (key != 'power') {
                dev_all[key].map((val) => {
                    let devid = String(val.devid)
                    if (state.devs[key][devid ] == undefined) state.devs[key][devid ] = []
                    state.devs[key][devid ].push(val)
                })
                console.log(state.devs[key])
            } else {
                let metrics = [
                    "active_power", "reactive_power", "power_factor", "quantity", "input_voltage",
                    "input_voltage_l1", "input_voltage_l2", "input_voltage_l3",
                    "input_current", "input_current_l1", "input_current_l2", 'input_current_l3',
                    "input_frequency", "input_frequency_l1", "input_frequency_l2", "input_frequency_l3"]

               /*  dev_all[key].map((val, n) => {
                    if (state.devs[key][n].arg == undefined) state.devs[key][n].arg = []
                    let value = JSON.parse(JSON.stringify(val))

                    state.devs[key][n].arg.push(val)
                }) */

            }

        }

        //state.dev = dev_all
        /* var datas = data.data
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
        }) */

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