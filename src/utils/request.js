// /**
//  * 封装axios
//  */
//
// import axios from "axios";
//
// //引入 element-ui 的 Notification
// import {Notification} from 'element-ui'
//
//
// //创建axios
// const instance = axios.create({
//     baseURL: 'http://localhost:8989/',
//     timeout: 3000,
// });
//
//
//
// instance.interceptors.request.use(function (config) {
//
//     return config;
// }, function (error) {
//
//
//     return Promise.reject(error);
// });
//
//
// axios.interceptors.response.use(function (response) {
//
//     let {status, message, data} = response.data;
//
//     if (status==20000){
//         return data;
//     } else {
//         Notification.error(message);
//
//         return Promise.reject(false);
//
//     }
// }, function (error) {
//
//     return Promise.reject(error);
// });
//
// export  default instance;

/*
* 封装axios
* */
import axios from "axios";

//引入elementUI中的Notification
import {Notification} from 'element-ui'

//创建axios
/*
* instance对象 就是我们之前在项目中使用 axios
*
* */
const instance = axios.create({
    baseURL: 'http://localhost:8989/',
    timeout: 30000,
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    let {status, message, data} = response.data;
    if (status == 20000) {
        return data;
    } else {
        Notification.error(message)
        return Promise.reject(false);
    }
}, function (error) {

    return Promise.reject(error);
});

export default instance;

