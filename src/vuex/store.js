import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    sysname:'Ladis UPS',
    random:Math.random()*Math.random(),
    // dev data
    dev:{},
    warringinfo:[],
    loginfo:[]
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    // set dev
    SETDEV(state,data){
        if(state.dev.data == undefined){
            state.dev = data.data
            //console.log(state.dev.data)
        } else{            
            let array = data.data.data
            for (var i in array){
                //console.log(i)
                for(var ii in array[i]){
                    //console.log(ii)
                    state.dev.data[i][ii].arg.unshift(array[i][ii].arg[0])
                    state.dev.data[i][ii].date = array[i][ii].date
                }
            }
        }
        
        
    },
    //set warring
    SETWARRING(state,data){        
        state.warringinfo = data.data
        //console.log(state.warringinfo.data)
    },
    //set log
    SETLOG(state,data){
        state.loginfo = data.data
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})