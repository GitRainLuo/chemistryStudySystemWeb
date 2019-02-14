<template>
    <div>
      <p-header></p-header>
      <div style="margin-top: 60px"></div>
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
