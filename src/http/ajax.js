/**
 * @Auther: hmj
 * @Description:ajax请求
 * @Date: 2019/1/30 15:07
 * @Version:1.0
 */
import axios from "axios"

let urlConfig = {
  // baseURL:"http://127.0.0.1:443"
  //打包到服务器 后台接口地址
  baseURL:"http://112.74.45.191:8081"
}
let ajax = axios.create({
  baseURL:urlConfig.baseURL,
  timeout:30000,
  withCredentials:true,
  maxRedirects:5,
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  }
})
//添加请求拦截器
ajax.interceptors.request.use(function (config) {
  //在发送请求前做些什么
  return config;
},function (error) {
  //对请求错误做些什么
  return Promise.reject(error)
})

//添加响应拦截器
ajax.interceptors.response.use(function (response) {
  //对响应数据做些什么
  return response
},function (error) {
  //对响应错误做些什么
  return Promise.reject(error)
})

export {ajax}
