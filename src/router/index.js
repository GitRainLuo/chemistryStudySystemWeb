import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/Login"
import home from "@/components/Home"
import elementsPeriodictable from "@/components/pages/elementsPeriodicTable"
import register from "@/components/Register"

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
