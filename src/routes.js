import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
const Main = ()=>import('@/views/Main.vue')
const Air = ()=>import('@/views/main/Air')
const IO = ()=>import('@/views/main/IO')
const TH = () => import('@/views/main/TH')
//import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

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
        path:'/',
        component:Home,
        name:'main',
        hidden:true,
        children:[
            {path:'/main',name:'设备概览',component:Main}
        ]
    },
    
    // home 导航
    // UPS
    {
        path: '/',
        component: Home,
        name: 'UPS',
        // iconCls: 'el-icon-message',//图标样式class
        iconCls:['fa','fa-battery-full'],
        children: [
            {path:'/ups1',component:Table,name:'单输入单输出',iconCls:['fa','fa-battery-full']},
            {path:'/ups2',component:Form,name:'三输入单输出',iconCls:['fa','fa-battery-full']},
            {path:'/ups3',component:user,name:'三输入三输出',iconCls:['fa','fa-battery-full']},
        ]
    },
    /* 
    AIR cool
    */
    {
        path:'/',
        component:Home,
        name:'Cool',
        iconCls:["fa"," fa-snowflake-o"],
        leaf:true,
        children:[
            {path:'/cool',component:Air,name:'空调',iconCls:["fa"," fa-snowflake-o"]}
        ]
    },

    /* 
    电量仪
    */
    {
        path:'/',
        name:'Power',
        component:Home,
        iconCls:["fa","fa-plug"],
        children:[
            {path:'/power1',name:'电量仪单项',component:echarts},
            {path:'/power3',name:'电量仪三项',component:echarts}
        ]
    },

    /* 
    IO
    */
    {
        path:'/',
        name:'IO',
        component:Home,
        leaf:true,
        iconCls:["fa"," fa-deaf"],
        children:[
            {path:'/io',name:'io',component:IO,iconCls:["fa"," fa-deaf"]}
        ]
    },
    /* 
    温湿度
    */
    {
        path:'/',
        name:'Temperature humidity',
        component:Home,
        leaf:true,
        iconCls:["fa"," fa-thermometer-empty"],
        children:[
            {path:'/Temperature-humidity',name:'温湿度',component:TH,iconCls:["fa"," fa-thermometer-empty"]}
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;