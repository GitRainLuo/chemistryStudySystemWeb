<template>
    <div>
      <p-header></p-header>
      <!--撑开高度60px-->
      <div style="margin-top: 60px"></div>
      <!--<div style="padding: 30px 0"></div>-->
      <nav-header></nav-header>
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
        mounted(){
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
</style>
