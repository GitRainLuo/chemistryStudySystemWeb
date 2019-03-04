<template>
  <!--公用头部组件-->
  <div>
    <Row class="container">
      <Col span="24" class="header">
        <Col span="12" class="logo">{{sysName}}</Col>
        <Col span="8" class="userInfo">
          <div class="infoContainer">
            <span>{{userInfo.userName}}</span>
            <span>{{userInfo.account}}</span>
            <span>{{userInfo.userType}}</span>
          </div>
        </Col>
        <Col span="4" class="avater">
          <div class="avaterContainer">
            <Dropdown>
              <span>设置<Icon type="ios-arrow-down" class="dropIcon" /></span>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="updateInfo">修改信息</DropdownItem>
                <DropdownItem @click.native="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default{
    name:"Header",
    data () {
      return {
        sysName:"xxx",
        userInfo:{
          account:"",
          userName:"",
          userType:"",
        }
      }
    },
    mounted(){
      //拿缓存
      let user = sessionStorage.getItem("user")
//          this.userName = JSON.parse(user).account
      this.userInfo = Object.assign({},JSON.parse(user))
    },
    methods:{
      updateInfo(){
        this.$router.push({path:"/updateInfo"})
      },
      logout(){
        this.$Modal.confirm({
          title:"提示",
          content:"确定要退出吗?",
          okText:"确认",
          cancelText:"取消",
          onOk:()=>{
            //退出 并清除缓存
            sessionStorage.removeItem("user")
            this.$router.push({path:"/"})
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    position: absolute;
    top: 0;
    width: 100%;
    .header{
      position: relative;
      height: 60px;
      line-height: 60px;
      background: #ccc;
      /*color: #fff;*/
      .logo{
        text-align: center;
        font-size: 24px;
        font-style: italic;
        /*background-color: aqua;*/
      }
      .userInfo{
        .infoContainer{
          width: 85%;
          margin: 0 auto;
          span{
            display: inline-block;
            width: 110px;
            line-height: 2;
          }
        }
      }
      .avater{
        .avaterContainer{
          width: 100px;
          position: absolute;
          right:0;
          z-index: 999;
          span{
            display: inline-block;
            width: 100px;
            line-height: 2;
            cursor: pointer;
            .dropIcon{
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
