import axios from 'axios';

let base = '';
//登录请求
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//register
export const UserRegister = params => { return axios.post(`${base}/user/register`, params).then(res => res.data) }
//重置密码
export const Resetpasswd = params => { return axios.post(`${base}/resetpasswd`, params).then(res => res.data) }
//获取验证码
export const GetMailValidation = params => {return axios.get(`${base}/user/getmail`,params).then(res => res.data)}


//get 设备概览
export const getDevInfo = params => {
    return axios.get(`${base}/dev/all`, { params, params })
}
//get 错误信息
export const getWarringInfo = params => {
    return axios.get(`${base}/info/warring`, { params, params })
}
//get 日志
export const getLog = params => {
    return axios.get(`${base}/info/info`, { params, params })
}