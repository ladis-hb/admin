import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//get 设备概览
export const getDevInfo = params => {
    return axios.get(`${base}/dev/all`,{params,params})
}
//get 错误信息
export const getWarringInfo = params =>{
    return axios.get(`${base}/info/warring`,{params,params})
}
//get 日志
export const getLog = params => {
    return axios.get(`${base}/info/info`,{params,params})
}