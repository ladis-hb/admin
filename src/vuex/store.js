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
    devs: { ups: {}, io: {}, power: {}, ac: {}, th: {} },
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
    SETDEV(state, {data}) {        
        state.dev = data        
    },
    SetDevs(state, data) {        
        state.devs = data      
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

const actions = {
    //
    Serize_dev({state,commit},{data}){
       async function Se (){
        let devs = JSON.parse(JSON.stringify(state.devs))
        let dev_all = JSON.parse(JSON.stringify(data))
        for (let key in dev_all) {
            if (key != 'power') {
                dev_all[key].map((val) => {
                    let devid = String(val.devid)
                    if (devs[key][devid] == undefined) devs[key][devid] = []
                    devs[key][devid].push(val)
                })
            } else {
                let metrics = [
                    "active_power", "reactive_power", "power_factor", "quantity", "input_voltage",
                    "input_voltage_l1", "input_voltage_l2", "input_voltage_l3",
                    "input_current", "input_current_l1", "input_current_l2", 'input_current_l3',
                    "input_frequency", "input_frequency_l1", "input_frequency_l2", "input_frequency_l3"]

                dev_all[key].map((val) => {
                    let devid = String(val.devid)
                    if (devs.power[devid] == undefined) devs.power[devid] = []
                    let p = JSON.parse(JSON.stringify(val))
                    for (let pk of metrics){
                        if (p[pk]) p[pk] = p[pk][2]
                    }
                    devs[key][devid].push(p)
                })
            }
        }
        return devs
       }
       Se().then(res=>{
        commit('SetDevs',res)
       })
       
    }
}

// 创建 store 实例
export default new Vuex.Store({
    getters,
    state,
    actions,
    mutations
})