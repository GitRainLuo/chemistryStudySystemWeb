<template>
    <div>
      <!--登录界面-->
      <Form :model="formData" :rules="formDataValidate" ref="formData"  class="loginContainer">
        <h3 class="loginTitle">登录系统</h3>
        <FormItem  prop="account">
          <Input v-model="formData.account" placeholder="请输入账号" clearable prefix="ios-person-outline"/>
        </FormItem>
        <FormItem  prop="password">
          <Input v-model="formData.password" type="password" placeholder="请输入密码" prefix="ios-lock-outline" icon="ios-eye-outline" ref="password" @on-click="isShowPassword"/>
        </FormItem>
        <FormItem prop="code">
          <Row>
            <Col span="12">
              <Input v-model="formData.code" maxlength="4" placeholder="请输入验证码" @keyup.enter.native="submitLogin"/>
            </Col>
            <Col span="5">
              <!--<span class="verificationCode" @click="createVerificationCode">{{vCode}}</span>-->
              <identify class="verificationCode" :verificationCode="verificationCode" @click.native="refreshVerification"></identify>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Checkbox v-model="isChecked" class="rememberPassword">记住密码</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 45%" :loading="loginLoading" @click="submitLogin">登录</Button>
          <Button type="primary" style="width: 45%;margin-left: 20px" @click="register">注册</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
  import {requestLogin} from "../api/api"
  import {ajax} from "../../src/http/ajax"
  //引入验证码组件
  import identify from "./public/identify"
    export default{
        name:"Login",
        components:{
          identify
        },
        data () {
            const validateCode = (rule,value,callback)=>{
                if(value == ""){
                    callback(new Error("请输入验证码"))
                }else if(value != "" && value != this.verificationCode.toLocaleLowerCase()){
                    callback(new Error("验证码输入不正确,请重新输入"))
                }else {
                    callback()
                }
            };
            return {
                formData:{
                    account:"",
                    password:"",
                    code:""
                },
                formDataValidate:{
                    account:[
                      {required:true,message:"请输入账号",trigger:"blur"}
                    ],
                    password:[
                      {required:true,message:"请输入密码",trigger:"blur"}
                    ],
                    code:[
                      {required:true,message:"请输入验证码",trigger:"blur"},
                      {
                          validator:validateCode,
                          trigger:"blur"
                      }
                    ]
                },
                isChecked:true,
                loginLoading:false,
                //验证码
//                vCode:""
                //使用组件的验证码
                verificationCodes:"0123456789abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRSTUVWXYZ",
                //生成的验证码
                verificationCode:"",
            }
        },
        mounted(){
            //生成随机验证码
//            this.createVerificationCode()
            this.createVerificationCode(this.verificationCodes,4)
            //获取cookie
            this.getCookie("account")
        },
        methods:{
          //密码框的查看明文与密文
          isShowPassword(){
              if(this.$refs.password.type == "password"){
                  this.$refs.password.type = "text"
                  this.$refs.password.icon = "ios-eye-off"
              }else {
                  this.$refs.password.type = "password"
                  this.$refs.password.icon = "ios-eye-outline"
              }
          },
          //生成随机验证码
//          createVerificationCode(){
//              const random = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i",
//              "j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F",
//              "G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
//              let code = ""
//              for(let i = 0;i<4;i++){
//                  let index = Math.floor(Math.random()*62)
//                  code += random[index]
//              }
//              this.vCode = code;
//          },
          //生成随机数
          randomNum(min,max){
              return Math.floor(Math.random()*(max-min)+min)
          },
          //使用组件生成随机验证码
          createVerificationCode(originCode,num){
              let _this = this
              //先清空上一次的验证码
              this.verificationCode = ""
              for(let i = 0;i <num;i++){
                  this.verificationCode += originCode[_this.randomNum(0,originCode.length)]
              }
          },
          //重新生成验证码
          refreshVerification(){
            let _this = this
            _this.createVerificationCode(this.verificationCodes,4)
          },
          //提交登录
          submitLogin(){
              this.$refs.formData.validate((valid)=>{
                  if(valid){
                      //是否煮密码
                      if(this.isChecked){
                          this.setCookie(this.formData.account,this.formData.password,7)
                      }else {
                          this.clearCookie()
                      }
                      this.loginLoading = true;
                      let params = Object.assign({},this.formData)
//                      requestLogin(params).then(({data})=>{
//                          let {code,msg,user} = data
////                          alert(JSON.stringify(data))
//                          this.loginLoading = false
//                          if(code == 200){
//                              //成功提示
//                              this.$Message.success(msg)
//                              //缓存user
//                              sessionStorage.setItem("user",user)
//                              this.$router.push({path:"/home"})
//                          }else {
//                              //请求失败
//                              this.$Message.error(msg)
//                          }
//                      })
                        ajax.post("/user/login",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((res)=>{
                          if(res.status == 200 && res.data){
                              let rData = res.data.data
                              if(res.data.data.code == 0){
                                this.loginLoading = false
                                this.$Message.success(rData.msg)
//                                alert(JSON.stringify(rData.user))
                                sessionStorage.setItem("user",JSON.stringify(rData.user))
//                                setTimeout(()=>{
//                                  this.$router.push({path:"/homePage"})
//                                },500)
                                //新增有些需要登录权限的页面未登录时跳转登录页面 登录成功时直接跳转指向页面
                                setTimeout(()=>{
                                  console.log(this.$route)
                                  console.log(this.$router)
                                    if(this.$route.query.redirect){
                                        let redirect = this.$route.query.redirect
                                        this.$router.push(redirect)
                                    }else {
                                        //get方式 传递 使用path query
                                        //this.$router.push({path:"/homePage",query:{id:"111"},params:{id:"222"}})
                                        //post方式 传递 使用name params
//                                        this.$router.push({name:"homePage",params:{id:"222222"}})
                                        this.$router.push({name:"homePage"})
                                    }
                                    //或者
//                                    if(this.$router.history.current.query.redirect){
//                                      let redirect = this.$router.history.current.query.redirect
//                                      this.$router.push(redirect)
//                                    }else {
//                                        this.$router.push({path:"/homePage"})
//                                    }
                                })
                              }else {
                                this.loginLoading = false
                                this.$Message.error(rData.msg)
                                //重新生成验证码
                                this.refreshVerification()
                              }
                          }
                        }).catch((error)=>{
//                          alert("err")
//                          alert(JSON.stringify(error))
                        })

                  }else {
                      this.$Message.error("请填写完所有信息")
                  }
              })
          },
          register(){
              this.$router.push({path:"/register"})
          },
          //设置cookie
          setCookie(c_account,c_pwd,expiredays){
              //获取时间
              let exdate = new Date()
              //保存时间
//              exdate.setDate(exdate.getDate()+expiredays)
              //保存天数
              exdate.setTime(exdate.getTime()+24*60*60*1000*expiredays)
              //字符串拼接cookie
              window.document.cookie = "account"+"="+c_account+";path=/;expires="+exdate.toGMTString()
              window.document.cookie = "password"+"="+c_pwd+";path=/;expires="+exdate.toGMTString()
          },
          //获取cookie
          getCookie(c_account){
//              alert(JSON.stringify(document.cookie))
              if(document.cookie.length>0){
                  //验证一下cookie 有自己设置的
                  if(document.cookie.indexOf(c_account)!= -1){
                      //初次切割
                      let cArr = document.cookie.split("; ")
                      for(let i = 0;i<cArr.length;i++){
                          //再次切割
                          let cArr2 = cArr[i].split("=")
                          //账号
                          if(cArr2[0] == "account"){
                              this.formData.account = cArr2[1]
                          }else if(cArr2[0] == "password"){
                              //密码
                              this.formData.password = cArr2[1]
                          }
                      }
                  }
              }
          },
          //清除cookie
          clearCookie(){
              this.setCookie("","",-1)
          }
        }
    }
</script>
<style lang="scss" scoped>
 .loginContainer {
   width: 400px;
   height: auto;
   padding: 15px 20px 10px 20px;
   margin: 60px auto;
   border: 1px solid #eaeaea;
   -webkit-border-radius: 15px;
   -moz-border-radius: 15px;
   border-radius: 15px;
   /*background: url('/static/image/1-140406162034.jpg') no-repeat -100px -100px;*/
   .loginTitle{
     display: block;
     padding-bottom: 15px;
     text-align: center;
     font-family: Arial,"微软雅黑";
     font-size: 15px;
     line-height: 1;
   }
   .rememberPassword{
     float: left;
   }
   .verificationCode{
     display: inline-block;
     margin-left: 10px;
     margin-top: 1px;
   }
 }
  @media screen and (max-width: 500px){
    .loginContainer{
      width: 95%;
      height: auto;
    }
  }
</style>
