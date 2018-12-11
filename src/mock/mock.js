/**
 * @Auther: hmj
 * @Description:
 * @Date: 2018/12/10 16:09
 * @Version:1.0
 */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {loginUsers} from "./data/user";

export default {
  bootstrap(){
    //定义一个mock adapter的实例
    let mock = new MockAdapter(axios)
    mock.onGet('/success').reply(200,{
      msg:"success"
    });
    mock.onGet('/error').reply(500,{
      msg:"error"
    });
    mock.onPost("/login").reply(config=>{
      // alert(JSON.stringify(config))
      //post过来的是转义了的 相当于是JSON字符串  => JSON.parse 转换为对象
      let {account,password} = JSON.parse(config.data)
      return new Promise((resolve,reject)=>{
        let user = null;
        setTimeout(()=>{
          let hasUser = loginUsers.some(u=>{
            if(u.account == account && u.password == password){
              // alert(JSON.stringify(u))
              user = u;
              user.password = undefined
              return true
            }else {
              return false
            }
          });
          if(hasUser){
            resolve([200,{
              code:200,
              msg:"登录成功",
              user:user
            }])
          }else {
            resolve([200,{
              code:500,
              msg:"账号或密码错误"
            }])
          }
        },500)
      })
    });
  }
}
