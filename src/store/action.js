import $api from '@/service/ajax'
import { removeToken } from '@/utils/auth'

export default { //异步修改状态  actions是可以调用Mutations里的方法的
	getuserinfo({commit},data){//获取用户信息 
		commit('SET_USERINFO',data)
	},
	FED_LOGOUT({ commit}){ //前端异步登出
	  return new Promise(resolve => {
   		commit('settoken', '')
   		removeToken()
        resolve()
      })
	},
	LOGOUT({commit,state}){//退出登录
		// 请求退出登录
		return new Promise((resolve, reject) => {
			const params = ''
			$api.logout(params).then(res=>{  // 成功返回
			},reason=>{  //捕获异常
			  if(reason.status==200){ //退出登录
				commit('settoken', '')
				removeToken()
			    commit('SET_USERINFO', [])
			    commit('setmenulist', [])
			    commit('setpermission', [])
			    resolve()
			  }
			}).catch(val=>{   // 捕获异常
			  reject(val)
			})
	    })
	},
	SAVEMENUALLLIST({commit},list){ //存储全部的菜单列表
        commit('SAVEMENUALLLIST',list)
	},
	SAVECHECKEDMENULIST({commit},list){//存储默认选中的菜单列表
		
        commit('SAVECHECKEDMENULIST',list)
	},
	SAVECONDITION({commit},params){//保存搜索条件
        commit('SAVECONDITION',params)
	},
	savecont({commit},params){
		commit('savecont',params)
	},

}