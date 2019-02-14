import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/Login"
import home from "@/components/Home"
import elementsPeriodictable from "@/components/pages/elementsPeriodicTable"
import register from "@/components/Register"
import updateInfo from "@/components/personal/UpdateInfo"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path:"/register",
      name:"register",
      component:register
    },
    {
      path:"/updateInfo",
      name:"updateInfo",
      component:updateInfo
    },
    {
      path:"/home",
      name:"Home",
      component:home
    },
    {
      path:"/elementsPeriodicTable",
      name:"elementsPeriodicTable",
      component:elementsPeriodictable
    }
  ]
})
