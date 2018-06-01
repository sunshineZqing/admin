import axios from 'axios'

import qs from 'qs'  //querystring模块 用于处理字符串
import store from '../store/index'
import { Message } from 'element-ui'

// axios.defaults.retry = 4;    //重新请求次数
// axios.defaults.retryDelay = 1000; // 请求间隙
// axios.defaults.timeout = 15000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头

// axios.defaults.baseURL  = 'http://110.249.214.182';   //服务器地址
// axios.defaults.baseURL  = 'http://192.168.1.180:8080';    //魏昭迪
// axios.defaults.baseURL  = 'http://192.168.1.140:8080';    //李君会


//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    if(config.url === '/ykj/bank/savePhoto'){
        config.headers['Content-Type']  = 'multipart/form-data;charset=UTF-8'
    }
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);//序列化参数
    }
    //每次请求都为http头增加Authorization字段，其内容为token
    // if (store.state.user.token) {
    //    config.headers.Authorization = `token ${store.state.user.token}`;
    // }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    // console.log(res,556)
    if(res.data.resultCode=='100'||res.data.resultCode=='2'){
        //如果响应结果为登录失效则进行前端退出登录
        store.dispatch('FED_LOGOUT').then(() => {
            Message.error('验证失败,请重新登录')
            location.reload();// 为了重新实例化vue-router对象 避免bug
        })
    }
    // if(res.status===504){//请求超时，可能服务器已重启，请耐心等待服务器重启，或刷新页面尝试
    //     store.dispatch('FED_LOGOUT').then(() => {
    //         Message.error('验证失败,请重新登录')
    //         location.reload();// 为了重新实例化vue-router对象 避免bug
    //     })
    // }
    if(res.data.status!=200){
        return Promise.reject(res);
    }
    return res;
}, (err) => {
    console.log(err,'服务器断开错误')
    resolve(err);
    // var config = err.config;
    // // If config does not exist or the retry option is not set, reject
    // if(!config || !config.retry) return Promise.reject(err);
    
    // // Set the variable for keeping track of the retry count
    // config.__retryCount = config.__retryCount || 0;
    
    // // Check if we've maxed out the total number of retries
    // if(config.__retryCount >= config.retry) {
    //     // Reject with the error
    //     console.log(741)
    //     return Promise.reject(err);
    // }
    
    // // Increase the retry count
    // config.__retryCount += 1;
    
    // // Create new promise to handle exponential backoff
    // var backoff = new Promise(function(resolve) {
    //     setTimeout(function() {
    //         resolve();
    //     }, config.retryDelay || 1);
    // });
    
    // // Return the promise in which recalls axios to retry the request
    // return backoff.then(function() {
    //     return axios(config);
    // });
});

//返回一个Promise(发送post请求)
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response.data)
        },err=>{
            reject(err)
        }).catch(error => {
           reject(error)
        })
    })
}


