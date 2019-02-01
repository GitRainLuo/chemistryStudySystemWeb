<template>
    <div>
        <!--注册页面-->
      <Form :model="registerData" :rules="registerRules" ref="registerForm" :label-width="85" label-position="right" class="register">
        <h3>注册</h3>
        <Row>
          <Col span="24">
            <FormItem label="账号:" prop="account">
              <Input v-model="registerData.account"  maxlength="11" placeholder="请输入账号(限数字)" clearable/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="密码:" prop="password">
              <Input type="password" v-model="registerData.password" maxlength="16" placeholder="请输入密码" clearable/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="重复密码:" prop="rePassWord">
              <Input type="password" v-model="registerData.rePassWord" maxlength="16" placeholder="请重复输入密码" clearable/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
            <FormItem label="账号类型:" prop="userType">
              <Select v-model="registerData.userType" placeholder="请选择账户类型" clearable>
                <Option v-for="item in userTypeList" :key="item.code" :value="item.code">{{item.description}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="手机号码:" prop="userPhone">
              <Input v-model="registerData.userPhone" placeholder="请输入手机号码" maxlength="11" v-number-only clearable/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="邮箱:" prop="email">
              <Input v-model="registerData.email" placeholder="请输入邮箱" clearable/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem>
              <Button type="primary" @click="submitRegister" style="position: absolute;right: 0;">提交</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
</template>

<script>
    import {ajax} from "../../src/http/ajax"
    export default{
        name:"Register",
        data () {
            //验证限制账号长度
            const accountValidate = (rule,value,callback)=>{
                let reg = /^(admin|([1-9][0-9]{7,10}))$/
                if(value != ""){
                  if(value != "admin" && (value.length<8 || value.length>11)){
                    callback(new Error("请输入8-11位数字账号"))
                  }else if(!reg.test(value)){
                    callback(new Error("账号格式不正确"))
                  }
                }else {
                    callback()
                }
            }
            //验证重复输入密码与密码是否一致
            const confirmRePassWord = (rule,value,callback)=>{
              if(value == "" && this.registerData.password != ""){
                    callback(new Error("重复输入密码不能为空!"))
              }else if(value != "" && value != this.registerData.password){
                  callback(new Error("两次输入密码不一样,请重新输入"))
              }
            };
            return {
                registerData:{
                    account:"",
                    password:"",
                    rePassWord:"",
                    userPhone:"",
                    email:"",
                    userType:"",
                },
                registerRules:{
                    account:[
                      {required:true,message:"请输入账号",trigger:"blur"},
//                      {
//                          pattern:/^(admin|([1-9][0-9]{7,10}))$/,
//                          message:"账号格式不正确",
//                          trigger:"blur"
//                      },
                      {
                          validator:accountValidate,
                          trigger:"blur"
                      }
                    ],
                    password:[
                      {required:true,message:"请输入密码",trigger:"blur"}
                    ],
                    rePassWord:[
                      {required:true,message:"请重复输入密码",trigger:"blur"},
                      //验证重复输入密码与密码是否一样
                      {
                          validator:confirmRePassWord,
                          trigger:"blur"
                      }
                    ],
                    userType:[
                      {required:true,message:"请选择账号类型",trigger:"change"}
                    ],
                    userPhone:[
                      {required:true,message:"请输入电话号码",trigger:"blur"},
                      {
                          type:"string",
                          pattern:/^1[3-9][0-9]{9}$/,
                          message:"手机号码格式不正确",
                          trigger:"blur"
                      }
                    ],
                    email:[
                      {required:true,message:"请输入邮箱",trigger:"blur"},
                      {
                          type:"string",
                          pattern:/^\w+@[a-zA-Z0-9]+\.[a-z]{2,4}$/,
                          message:"邮箱格式不正确",
                          trigger:"blur"
                      }
                    ]
                },
                userTypeList:[
                  {
                      code:"teacher",
                      description:"老师"
                  },
                  {
                      code:"student",
                      description:"学生"
                  }
                ]
            }
        },
        watch:{
            "registerData.rePassWord":function (val) {
                if(val != this.registerData.password){
                  this.registerRules.rePassWord[0].message = "两次密码输入不一样,请重新输入"
                }
            }
        },
        methods:{
          submitRegister(){
//              alert("提交")
              this.$refs.registerForm.validate((valid)=>{
                  if(valid){
                      let params = Object.assign({},this.registerData)
//                      alert(JSON.stringify(params))
                      ajax.post("/user/register",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((res)=>{
//                        alert(JSON.stringify(res))
                        if(res.status == 200 && res.data){
                          let rData = res.data.data
                          if(rData.code == 0){
                              this.$Message.success(rData.msg)
                              setTimeout(()=>{
                                  this.$router.push({path:"/"})
                              },500)
                          }else {
                              this.$Message.error(rData.msg)
                          }
                        }
                      }).catch((error)=>{
                        alert(JSON.stringify(error))
                      })
                  }else {
                      this.$Message.error("请完善信息")
                  }
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
    padding: 10px 40px 20px 20px;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    h3{
      display: block;
      width: 100%;
      height: 30px;
      margin:5px 0;
      line-height: 30px;
      text-align: center;
    }
  }
</style>
