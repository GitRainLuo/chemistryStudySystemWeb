import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/Login"
import home from "@/components/Home"
import elementsPeriodicTable from "@/components/pages/elementsPeriodicTable"
import register from "@/components/Register"
import updateInfo from "@/components/personal/UpdateInfo"
// import homePage from "@/components/HomePage"
import chemicalEquation from "@/components/pages/ChemicalEquation"
import notFound from "@/components/NotFound"
import examQuestion from "@/components/pages/onlineTest/ExamQuestion"
import testTable from "@/components/pages/testTable"

//进行页面按需加载的引入方式
const homePage = r => require.ensure([],() => r(require("@/components/HomePage")))

const test = m => require.ensure([],()=>m(require("@/components/test/test")))
//路由懒加载
// const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
// import('./Foo.vue') // 返回 Promise
// const login = () =>import("@/components/Login")
// const home = () =>import("@/components/Home")
// const homePage = () =>import("@/components/HomePage")
// const elementsPeriodicTable = () =>import("@/components/pages/elementsPeriodicTable")
// const register = () =>import("@/components/Register")
// const updateInfo = () =>import("@/components/personal/UpdateInfo")
// const chemicalEquation = () =>import("@/components/pages/ChemicalEquation")

Vue.use(Router)

export default new Router({
  //打包发布服务器用 base:"/自定义" 一般为项目名称 可以为/dist
  // base:"/dist",
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
      path:"/home",
      name:"Home",
      component:home
    },
    {
      path:"/updateInfo",
      name:"updateInfo",
      component:updateInfo,
      meta:{
        //表示进入该路由是否需要登录权限 配合路由守卫拦截路由
        requireAuth:true
      }
    },
    {
      path:"/homePage",
      name:"homePage",
      component:homePage,
      meta:{
        requireAuth:true
      }
    },
    {
      path:"/elementsPeriodicTable",
      name:"elementsPeriodicTable",
      component:elementsPeriodicTable,
      meta:{
        requireAuth:true
      }
    },
    {
      path:"/ChemicalEquation",
      name:"ChemicalEquation",
      component:chemicalEquation,
      //单独路由独享组件
      beforeEnter:(to,from,next)=>{
        console.log("即将进入...")
        next()
      },
      meta:{
        requireAuth:true
      }
    },
    {
      path:"/examQuestion",
      name:"ExamQuestion",
      component:examQuestion
    },
    {
      path:"/testTable",
      name:"testTable",
      component:testTable
    },
    {
      path:"/test",
      name:"Test",
      component:test
    },
    //404 notfound
    {
      path:"*",
      component:notFound
    }
  ],
  //滚动行为
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition
    }else {
      const position = {}
      if(to.hash){
        position.selector = to.hash
        if(to.hash == "#"){
          position.offset = {y:100}
        }
        if(document.querySelector(to.hash)){
          return position
        }
        return false
      }

      return new Promise(resolve =>{
        if(to.matched.some(m => m.meta.scrollToTop)){
          position.x = 0
          position.y = 0
        }
        this.app.$root.$once("triggerScroll",()=>{
          resolve(position)
        })
      })
    }
  }
})

// const routes = [
//   {}
// ]
// routes.push({
//   path:"*",
//   component:notFound
// })
// export default routes

// const router = new Router({
//   routes:[
//     {}
//   ]
// })
// router.beforeEach((to,from,next)=>{
//   if(to.matched.length == 0){
//     if(from.name){
//       next({
//         name:from.name
//       })
//     }else {
//       next("/notFound")
//     }
//   }
// })
// export default  router
