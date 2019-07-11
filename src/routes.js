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
            { path: '/main', name: '设备概览', component: Main }
        ]
    },

    // home 导航
    // UPS
    {
        path: '/',
        component: Home,
        name: 'UPS',
        leaf: true,
        iconCls: ['fa', 'fa-battery-full'],
        children: [
            { path: '/ups', component: UPS, name: 'ups', iconCls: ['fa', 'fa-battery-full'] }
        ]
    },

    /* 
    AIR cool
    */
    {
        path: '/',
        component: Home,
        name: 'Cool',
        iconCls: ["fa", " fa-snowflake-o"],
        leaf: true,
        children: [
            { path: '/cool', component: Air, name: '空调', iconCls: ["fa", " fa-snowflake-o"] }
        ]
    },

    /* 
    电量仪
    */
    {
        path: '/',
        name: 'Power',
        component: Home,
        iconCls: ["fa", "fa-plug"],
        leaf: true,
        children: [
            { path: '/power', name: '电量仪', component: POWER, iconCls: ["fa", "fa-plug"] }
            /* { path: '/power1', name: '电量仪单项', component: POWER },
            { path: '/power3', name: '电量仪三项', component: POWER } */
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
        iconCls: ["fa", " fa-deaf"],
        children: [
            { path: '/io', name: 'io', component: IO, iconCls: ["fa", " fa-deaf"] }
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
        iconCls: ["fa", " fa-thermometer-empty"],
        children: [
            { path: '/Temperature-humidity', name: '温湿度', component: TH, iconCls: ["fa", " fa-thermometer-empty"] }
        ]
    },
   

    { path: '/test', name: 'TEST', component: TEST, hidden: true,iconCls: ["fa", " fa-thermometer-empty"] },



    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;