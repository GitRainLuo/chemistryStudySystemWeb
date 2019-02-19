// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Mock from "./mock/mock"
import axios from "axios"
import vueAxios from "vue-axios"

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(axios,vueAxios)
Mock.bootstrap()
/* eslint-disable no-new */

//路由导航守卫
//全局前置守卫
router.beforeEach((to,from,next)=>{
  //根据meta的是否登录权限限制 (meta.requireAuth)
  if(to.matched.some(res => res.meta.requireAuth)){
    //判断是否登录
    if(sessionStorage.getItem("user")){
      //有登陆
      next()
    }else {
      //未登录
      next({
        path:"/login",
        query:{redirect:to.fullPath}
      })
    }
  }else {
    next()
  }
})

//全局后置钩子
router.afterEach((to,from)=>{
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
