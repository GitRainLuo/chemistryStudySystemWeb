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
        <FormItem>
          <Checkbox v-model="isChecked" class="rememberPassword">记住密码</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 100%" :loading="loginLoading" @click="submitLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
  import {requestLogin} from "../api/api"
    export default{
        name:"Login",
        data () {
            return {
                formData:{
                    account:"",
                    password:"",
                },
                formDataValidate:{
                    account:[
                      {required:true,message:"请输入账号",trigger:"blur"}
                    ],
                    password:[
                      {required:true,message:"请输入密码",trigger:"blur"}
                    ]
                },
                isChecked:true,
                loginLoading:false
            }
        },
        mounted(){},
        methods:{
          isShowPassword(){
              if(this.$refs.password.type == "password"){
                  this.$refs.password.type = "text"
                  this.$refs.password.icon = "ios-eye-off"
              }else {
                  this.$refs.password.type = "password"
                  this.$refs.password.icon = "ios-eye-outline"
              }
          },
          submitLogin(){
              this.$refs.formData.validate((valid)=>{
                  if(valid){
                      this.loginLoading = true;
                      let params = Object.assign({},this.formData)
                      requestLogin(params).then(({data})=>{
                          let {code,msg,user} = data
//                          alert(JSON.stringify(data))
                          this.loginLoading = false
                          if(code == 200){
                              //成功提示
                              this.$Message.success(msg)
                              //缓存user
                              sessionStorage.setItem("user",user)
                              this.$router.push()
                          }else {
                              //请求失败
                              this.$Message.error(msg)
                          }
                      })

                  }else {
                      this.$Message.error("请填写完所有信息")
                  }
              })
          }
        }
    }
</script>
<style lang="scss" scoped>
 .loginContainer {
   width: 400px;
   height: 300px;
   padding: 15px 15px 10px 15px;
   margin: 0 auto;
   border: 1px solid #eaeaea;
   -webkit-border-radius: 15px;
   -moz-border-radius: 15px;
   border-radius: 15px;
   /*background: url('/static/image/1-140406162034.jpg') no-repeat -100px -100px;*/
   .loginTitle{
     display: block;
     padding-bottom: 10px;
     text-align: center;
     font-family: Arial,"微软雅黑";
     font-size: 15px;
     line-height: 1;
   }
   .rememberPassword{
     float: left;
   }
 }
</style>
