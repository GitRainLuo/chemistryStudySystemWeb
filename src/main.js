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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
