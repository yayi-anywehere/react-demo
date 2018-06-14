import axios from 'axios'
import { Toast } from 'antd-mobile';

// 添加请求拦截器
axios.interceptors.request.use(function(config){
    Toast.loading('加载中')
    return config
})
// 添加响应拦截器
axios.interceptors.request.use(function(response){
    Toast.hide()
    return response
})