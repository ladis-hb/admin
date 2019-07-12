import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
const Main = () => import('@/views/Main.vue')
const Air = () => import('@/views/main/Air')
const IO = () => import('@/views/main/IO')
const TH = () => import('@/views/main/TH')
const UPS = () => import('@/views/main/UPS')
const POWER = () => import('@/views/main/POWER')

const TEST = () => import('./views/main/test')
let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //add
    {
        path: '/',
        component: Home,
        name: 'main',
        hidden: true,
        children: [
            { path: '/main', name: 'main', component: Main }
        ]
    },

    // home 导航
    // UPS
    {
        path: '/',
        component: Home,
        name: 'UPS',
        leaf: true,
        iconCls: ['iconfont', 'icon-upsdianyuan'],
        children: [
            { path: '/ups', component: UPS, name: 'UPS', iconCls: ['iconfont', 'icon-upsdianyuan'] }
        ]
    },

    /* 
    AIR cool
    */
    {
        path: '/',
        component: Home,
        name: 'Cool',
        iconCls: ['iconfont', 'icon-kongdiao'],
        leaf: true,
        children: [
            { path: '/cool', component: Air, name: 'air_conditioning', iconCls: ['iconfont', 'icon-kongdiao'] }
        ]
    },

    /* 
    电量仪
    */
    {
        path: '/',
        name: 'Power',
        component: Home,
        iconCls: ['iconfont', 'icon-dianliangyi'],
        leaf: true,
        children: [
            { path: '/power', name: 'Electricity_meter', component: POWER, iconCls: ['iconfont', 'icon-dianliangyi'] }

        ]
    },

    /* 
    IO
    */
    {
        path: '/',
        name: 'IO',
        component: Home,
        leaf: true,
        iconCls: ['iconfont', 'icon-io'],
        children: [
            { path: '/io', name: 'io', component: IO, iconCls: ['iconfont', 'icon-io'] }
        ]
    },
    /* 
    温湿度
    */
    {
        path: '/',
        name: 'Temperature humidity',
        component: Home,
        leaf: true,
        iconCls: ['iconfont', 'icon-wenshidu'],
        children: [
            { path: '/Temperature-humidity', name: 'Temperature_humidity', component: TH, iconCls: ['iconfont', 'icon-wenshidu'] }
        ]
    },


    { path: '/test', name: 'TEST', component: TEST, hidden: true, iconCls: ["fa", " fa-thermometer-empty"] },



    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;