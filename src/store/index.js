import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getter'
import actions from './action'
import app from './modules/app'
import auth from './modules/auth'
Vue.use(Vuex)

let state = { // 状态 
    user:{
       token:'' //存储服务器返回的权限标识
    },
    menuAllList:[],//全部菜单列表
    checkedmenulist:[],//默认选中的菜单列表
    permission:[], //权限列表
    menulist:[],   //菜单列表  
    menuitem:{},   // 存储当前点击的菜单项  
    breadList:[], //存储面包屑导航的路由 及相关数据
    userinfo:'',  //登录用户信息
    searchlist:[], //搜索条件存储
    savecontent:[],
}
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
       app,
       auth
    }
})
export default store
