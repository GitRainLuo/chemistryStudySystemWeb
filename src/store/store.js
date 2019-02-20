/**
 * @Auther: hmj
 * @Description:store.js
 * @Date: 2019/2/20 10:46
 * @Version:1.0
 */
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  //state 状态
  state:{
    userInfo:{
      name:"",
      account:"",
      password:"",
      phone:"",
      email:"",
      userType:""
    }
  },
  //getters
  getters:{
    userInfoGet:state =>{
      return state.userInfo
    }
  },
  //事件 更改状态 通过commit触发(this.$store.commit)  必须是同步函数
  mutations:{
    userInfoSet:(state,obj)=>{
      state.userInfo.name = obj.name
      state.userInfo.password = obj.password
      state.userInfo.phone = obj.phone
      state.userInfo.email = obj.name
    }
  },
  //actions 处理异步操作
  //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  //通过store.dispatch 触发
  actions:{
    // 如:
    // incrementAsync ({ commit }) {
    //   setTimeout(() => {
    //     commit('increment')
    //   }, 1000)
    // }
  }
})

export default store;
