<template>
    <div>
      <p-header></p-header>
      <!--撑开高度60px-->
      <div style="margin-top: 60px"></div>
      <!--<div style="padding: 30px 0"></div>-->
      <nav-header></nav-header>
      <!--<div>-->
        <!--<button @click="goTest">test</button>-->
      <!--</div>-->
    </div>
</template>

<script>
    //引入公用头部
    import pHeader from "./public/Header.vue"
    //公用导航条
    import navHeader from "./public/NavHeader";
    export default{
        name:"HomePage",
        components:{
          navHeader,
          pHeader,
        },
        data () {
            return {
            }
        },
        beforeRouteEnter(to,from,next){
            console.log("form")
            console.log(from)
            console.log("to")
            console.log(to)
            next(vm=>{
              console.log("vm.$router.currentRoute")
              console.log(vm.$router.currentRoute)
              console.log("vm.$route")
              console.log(vm.$route)
            })
        },
        mounted(){
            console.log("mounted")
            console.log(this.$router,"$router")
            console.log("this.$router.currentRoute")
            console.log(this.$router.currentRoute)
            console.log("this.$route")
            console.log(this.$route)

        },
        methods:{
//          goTest(){
//              this.$router.push({path:"/test"})
//          }
        }
    }
</script>

<style lang="scss" scoped>
</style>
