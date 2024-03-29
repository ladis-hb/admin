import Login from './views/Login.vue'
const Passwdreset = () => import('@/views/Passwdreset')
const Registered = () => import('@/views/Registered')
const NotFound = () => import('@/views/404.vue')
const Home = () => import('@/views/Home.vue')
const Main = () => import('@/views/Main.vue')
const Air = () => import('@/views/main/Air')
const IO = () => import('@/views/main/IO')
const TH = () => import('@/views/main/TH')
const UPS = () => import('@/views/main/UPS')
const POWER = () => import('@/views/main/POWER')
const SETTING = () => import('@/views/Setting')
const INFO = () => import('@/views/Info')
const Admin = () =>import('@/views/Admin.vue')
const onlineList = () =>import('@/views/admin/onlineList.vue')
const usersList = () =>import('@/views/admin/usersList.vue')
const devsList = () =>import('@/views/admin/devsList.vue')
const devList = () =>import('@/views/admin/devList.vue')
 
let routes = [
    //login
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    //404
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    
    ///Passwdreset重置密码
    {
        path: '/Passwdreset',
        component: Passwdreset,
        name: "Passwdreset",
        hidden: true
    },
    //Registered 注册
    {
        path: '/Registered',
        component: Registered,
        name: 'Registered',
        hidden: true

    },
    //Setting
    {
        path:'/Setting',
        component:SETTING,
        name:'Setting',
        hidden:true
    },
    //INFO
    {
        path:'/Info',
        component:INFO,
        name:'Info',
        hidden:true
    },
    //Admin
    {
        path:'/Admin',
        component:Admin,
        name:'Admin',
        children: [
            { path: '/onlineList', component:onlineList , name: 'onlineList',  },
            { path: '/usersList', component:usersList , name: 'usersList',  },
            { path: '/devsList', component:devsList , name: 'devsList',  },
            { path: '/devList/*', component:devList , name: 'devList',  },
        ]
    },
    

    // home 导航
    // UPS
    {
        path: '/',
        component: Home,
        name: 'Home',
        iconCls: ['iconfont', 'icon-upsdianyuan'],
        hidden:true,
        children: [
            { path: '/main', component: Main, name: 'main',}
        ]
    },
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
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;