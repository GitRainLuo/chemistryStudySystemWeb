import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/Login"
import home from "@/components/Home"
import elementsPeriodictable from "@/components/pages/elementsPeriodicTable"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
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
