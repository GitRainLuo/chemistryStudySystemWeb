<template>
    <div>
      <p-header></p-header>
    </div>
</template>

<script>
    //引入公用头部
    import pHeader from "../components/public/Header.vue"
    export default{
        name:"HomePage",
        components:{
           pHeader
        },
        data () {
            return {
            }
        },
        mounted(){
        },
        methods:{
//
        }
    }
</script>

<style lang="scss" scoped>
  /*.container{*/
    /*position: absolute;*/
    /*top: 0;*/
    /*width: 100%;*/
    /*.header{*/
      /*position: relative;*/
      /*height: 60px;*/
      /*line-height: 60px;*/
      /*background: #ccc;*/
      /*!*color: #fff;*!*/
      /*.logo{*/
        /*text-align: center;*/
        /*!*background-color: aqua;*!*/
      /*}*/
      /*.userInfo{*/
        /*.infoContainer{*/
          /*width: 85%;*/
          /*margin: 0 auto;*/
          /*span{*/
            /*display: inline-block;*/
            /*width: 110px;*/
            /*line-height: 2;*/
          /*}*/
        /*}*/
      /*}*/
      /*.avater{*/
        /*.avaterContainer{*/
          /*width: 100px;*/
          /*position: absolute;*/
          /*right:0;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
</style>
