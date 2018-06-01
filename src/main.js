// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import * as axiosconfig from './service/config'
import axiosall from './service/ajax' 
import fksh from './service/fksh' 
import store from './store/index'

//基础UI库
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 图标字体
import './assets/fonts/iconfont.css'
// 图表支持
// import echarts from 'echarts'
// Vue.prototype.$echarts= echarts 

//表格2
import 'v2-table/dist/index.css';
import V2Table from 'v2-table';
Vue.use(V2Table);

Vue.prototype.$http   = axiosconfig
Vue.prototype.$api    = axiosall
Vue.prototype.$fksh   = fksh

Vue.use(Element)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
