/*
* 封装axios
* */
import axios from "axios";

//引入elementUI中的Notification
import {Notification} from 'element-ui'
import auth from "./auth";
//创建axios
/*
* instance对象 就是我们之前在项目中使用 axios
*
* */
import baseURL from "./baseURL";

const instance = axios.create({
    baseURL: baseURL.baseURL,
    timeout: 30000,
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {

    config.headers.Authorization = "Bearer " + auth.getToken()

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    let {status, massage, data} = response.data;
    if (status === 20000) {
        return data;
    } else {
        Notification.error(massage)
        return Promise.reject(false);
    }

}, function (error) {

    return Promise.reject(error);
});

export default instance;

