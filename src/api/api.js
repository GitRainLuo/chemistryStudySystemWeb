/**
 * @Auther: hmj
 * @Description:
 * @Date: 2018/12/10 16:14
 * @Version:1.0
 */
import axios from "axios"
let base = "";
// 登录请求
export const requestLogin = params =>{return axios.post(`${base}/login`,params)}
