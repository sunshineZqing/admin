
export default {
	settoken:(state,token)           => state.user.token = token,      //设置存储token
    SAVECONDITION:(state,params)     => { //存储搜索条件 构造存储对象与唯一key
    	let result = state.searchlist.some(elem=>{//去重处理
    		return elem.label == params.label     //断言是否已经存储过params.label
    	})
    	if(result){ //如果存在就更新
            state.searchlist.forEach(elem=>{
              if(elem.label ==params.label){
              	 elem = params
              }
            })
    	}else{//如果不存在就插入
            state.searchlist.push(params)
    	}
    },
    savecont:(state,params)=>{
    	console.log(state,params);
    	let res = state.savecontent.some(elem=>{
    		return elem.lable == params.lable // 断言是否已经存储过params.lable
    	})
    	if(res){
    		state.savecontent.forEach(elem=>{
    			if(elem.lable == params.lable){
    				elem = params
    			}
    		})
    	}else{
    		state.savecontent.push(params);
    	}
    },
    setpermission:(state,permission) => state.permission = permission, // 设置存储权限列表 
    setmenulist:(state,menulist)     => state.menulist   = menulist,   // 设置存储菜单列表
    SET_USERINFO:(state,userinfo)    => state.userinfo   = userinfo,   // 设置存储登录用户信息
    LOGOUT:(state)                   => state.user.token = '',         // 登出
    SAVEMENUALLLIST:(state,list)     => state.menuAllList= list,       // 存储全部的菜单列表
    SAVECHECKEDMENULIST:(state,list) => state.checkedmenulist= list,   // 存储默认选中的菜单列表
} 

