<template>
  <div id="app">
    <transition>
      <router-view v-if="isRouterActive"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
        reload:this.reload
    }
  },
  data(){
      return {
          isRouterActive:true
      }
  },
  methods:{
      reload(){
          let _this = this
          this.isRouterActive = false
        _this.$nextTick(()=>{
              this.isRouterActive = true
        })
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  /*用到公共头部 将此margin-top改为0*/
  margin-top: 0;
}
</style>
