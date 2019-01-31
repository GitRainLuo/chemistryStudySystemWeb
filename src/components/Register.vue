<template>
    <div>
        <!--注册页面-->
      <Form :model="registerData" :rules="registerRules" ref="register" :label-width="85" label-position="right" class="register">
        <h3>注册</h3>
        <FormItem label="账号:">
          <Input v-model="registerData.account" clearable/>
        </FormItem>
        <FormItem label="密码:">
          <Input type="password" v-model="registerData.password"/>
        </FormItem>
        <FormItem label="重复密码:">
          <Input type="password" v-model="registerData.rePassWord"/>
        </FormItem>
        <FormItem label="手机号码:">
          <Input v-model="registerData.userPhone" v-number-only clearable/>
        </FormItem>
        <FormItem label="邮箱:">
          <Input v-model="registerData.email" clearable/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitRegister">提交</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    import {ajax} from "../../src/http/ajax"
    export default{
        name:"Register",
        data () {
            return {
                registerData:{
                    account:"",
                    password:"",
                    rePassWord:"",
                    userPhone:"",
                    email:"",
                },
                registerRules:{

                }
            }
        },
        methods:{
          submitRegister(){
              alert("提交")
              let params = Object.assign({},this.registerData)
              alert(JSON.stringify(params))
              ajax.post("/user/register",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((res)=>{
                  alert(JSON.stringify(res))
                  if(res.status == 200 && res.data.code == 0){
                      alert(JSON.stringify(res.data.data))
                  }
              }).catch((error)=>{
                  alert(JSON.stringify(error))
              })
          }
        }
    }
</script>

<style lang="scss" scoped>
  .register{
    width: 500px;
    height: auto;
    margin: 10px auto;
  }
</style>
