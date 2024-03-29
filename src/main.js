import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme7-13/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import VeLine from 'v-charts/lib/line'
import routes from './routes'
import './assets/iconfont/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component(VeLine.name, VeLine)

const router = new VueRouter({
  //mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user')
  }

  if (!JSON.parse(sessionStorage.getItem('user')) 
    && to.path != '/login' && to.path != '/Registered' 
    && to.path != '/Passwdreset') {
    console.log('true')
    next({ path: '/login' })
  } else {
    next()
  }


})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

