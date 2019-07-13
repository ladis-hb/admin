import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme7-13/index.css'
//import './assets/element-theme/index.css'
//import './assets/theme/theme-green/index.css'
//import './assets/theme/theme-darkblue/theme/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import Vcharts from 'v-charts'
import VeLine from 'v-charts/lib/line'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
//import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfont/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
//Vue.use(Vcharts)
Vue.component(VeLine.name, VeLine)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') sessionStorage.removeItem('user')
  if (to.path == '/Registered' || to.path == '/Passwdreset') {
    console.log(to.path)
    next()
  }
  if (!JSON.parse(sessionStorage.getItem('user')) && to.path != '/login') {
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

