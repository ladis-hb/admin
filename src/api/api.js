import axios from 'axios';
import config from '../../server/config'

if(config.development) axios.defaults.baseURL = `http://127.0.0.1:${config.development_port}`;

//登录请求
export const requestLogin = params => { return axios.get(`/Get/login`, {params}).then(res => res.data); };
//register
export const UserRegister = params => { return axios.get(`/Get/register`, {params}).then(res => res.data) }
//重置密码
export const Resetpasswd = params => { return axios.get(`/Get/resetpasswd`, {params}).then(res => res.data) }
//获取验证码
export const GetMailValidation = params => {return axios.get(`/Get/getmail_Verification_code`,{params}).then(res => res.data)}

//获取用户信息
export const getUserInfo = params => {
    return axios.get('/Get/getUserInfo',{params})
}

//get 设备概览
export const getDevInfo = params => {
    return axios.get(`/Get/Dev_all_info`, { params })
}
//get 错误信息
export const getWarringInfo = params => {
    return axios.get(`/Get/Run_log_warring`, { params })
}
//get 日志
export const getLog = params => {
    return axios.get(`/Get/Run_log_info`, { params })
}

//add devid
export const addDevid = params =>{
    return axios.get("/Get/addDevid",{params})
}
//get devid_list
export const Get_devid_list = params =>{
    return axios.get('/Get/Get_devid_list',{params})
}
//del devid
export const delete_Devid = params =>{
    return axios.get("/Get/delete_Devid",{params})
}

//log info
export const Get_user_info = params =>{
    return axios.get('/Get/Get_user_info',{params})
}
//admin - user
export const admin_get_info_list = params =>{
    return axios.get('/Get/admin_get_info_list',{params})
}

//admin modify_user_info
export const modify_user_info = params =>{
    return axios.get('/Get/modify_user_info',{params})
}