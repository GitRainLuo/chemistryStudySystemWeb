import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/Login"
import home from "@/components/Home"
import elementsPeriodictable from "@/components/pages/elementsPeriodicTable"
import register from "@/components/Register"
import updateInfo from "@/components/personal/UpdateInfo"
import homePage from "@/components/HomePage"
import chemicalEquation from "@/components/pages/ChemicalEquation"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/login",
    },
    {
      path: '/login',
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
      path:"/homePage",
      name:"homePage",
      component:homePage
    },
    {
      path:"/elementsPeriodicTable",
      name:"elementsPeriodicTable",
      component:elementsPeriodictable
    },
    {
      path:"/ChemicalEquation",
      name:"ChemicalEquation",
      component:chemicalEquation
    }
  ]
})
