/*
 * @Author: liangtd
 * @Date: 2023-04-12 09:16:19
 * @LastEditors: liangtd
 * @LastEditTime: 2023-06-20 09:51:55
 * @Description: Axios Http请求库配置文件
 */
import axios from "axios";
import { ElNotification } from 'element-plus'
import { getToken, setToken } from "../utils/token";

const service = axios.create({
    baseURL: "/api"
})

// 添加请求拦截器
service.interceptors.request.use(config => {
    // 对响应数据做些什么
    const token = getToken();
    // console.log(token);
    // 对后端form-data传参设置请求头
    config.headers = {

        'Content-Type': 'application/x-www-form-urlencoded'
    };
    // 设置token
    if (token !== '') {
        config.headers.token = token;
    }

    return config;
}, function (error) {
    // 通知错误
    ElNotification({
        message: error.response.data || '请求失败',
        type: 'error',
    })
    return Promise.reject(error);
})

export default service