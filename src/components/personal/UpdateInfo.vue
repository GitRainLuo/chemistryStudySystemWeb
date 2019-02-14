<template>
    <div>
        <Form :model="updateData" ref="updateData" :rules="updateRules" class="updateContainer" :label-width="85" label-position="right">
          <h3>修改个人信息</h3>
          <Row>
            <Col span="24">
              <FormItem label="账号:">
                <Input v-model="updateData.account"  readonly/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="密码:" prop="password">
                <Input v-model="updateData.password"  placeholder="请输入修改的密码" clearable/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="重复密码:" prop="rePassWord">
                <Input v-model="updateData.rePassWord" placeholder="请重复输入密码" clearable/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="手机号码:">
                <Input v-model="updateData.userPhone" placeholder="请输入手机号码:" clearable/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="邮箱:">
                <Input v-model="updateData.email" placeholder="请输入邮箱:" clearable/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem>
                <Button type="primary" @click="updateSubmit" class="updateBtn" :loading="loading">提交</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
    </div>
</template>

<script>
    import {ajax} from "../../http/ajax"
    export default{
        name:"UpdateInfo",
        data () {
            const rePassValidate = (rule,value,callback)=>{
                if(this.updateData.password == ""){
                    callback(new Error("请先输入密码"))
                }else {
                    if(value == ""){
                      callback(new Error("请重复输入密码"))
                    }else if(this.updateData.password!= "" && value != this.updateData.password){
                      callback(new Error("两次输入密码不相同，请重新输入"))
                    }else {
                      callback()
                    }
                }
            }
            return {
                updateData:{
                    account:"",
                    password:"",
                    rePassWord:"",
                    userPhone:"",
                    email:""
                },
                loading:false,
                updateRules:{
                    password:[
                      {required:true,message:"请输入密码",trigger:"blur"}
                    ],
                    rePassWord:[
                      {required:true,message:"请输入重复密码",trigger:"blur"},
                      {
                          validator:rePassValidate,
                          trigger:"blur"
                      }
                    ]
                }
            }
        },
        methods:{
          updateSubmit(){
              let params = Object.assign({},this.updateData)
              this.$refs.updateData.validate((valid)=>{
                  if(valid){
                      this.loading = true
                      ajax.post("/user/update",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((res)=>{
                        if(res.status == 200 && res.data){
                          let rData = res.data.data
                          if(rData.code == 0){
                            this.loading = false
                            this.$Message.success(rData.msg)
                            setTimeout(()=>{
                              this.$router.push({path:"/"})
                            },500)
                          }
                        }
                      })
                  }else {
                      this.$Message.error("请完善必填信息")
                  }
              })
          },
        },
        mounted(){
            //获取缓存
            this.updateData = Object.assign({},JSON.parse(sessionStorage.getItem("user")))
        }
    }
</script>

<style lang="scss" scoped>
  .updateContainer{
    width: 500px;
    height: auto;
    margin: 10px auto;
    padding: 10px 25px 20px 10px;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    h3{
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin: 5px 0;
    }
    .updateBtn{
      position: absolute;
      right: 0;
      width: 100px;
    }
  }
</style>
