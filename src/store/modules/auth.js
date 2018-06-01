import Cookies from 'js-cookie'

const auth = {
  state: {
      score:'', //易指数评分
      authitem:{},  //认证项信息
      authinfo:{},   //通过与驳回的请求参数
      ma_id:'',//提额表主键
      showstatus:'',//是否显示建议弹框
      authsuggestions:'',
      params:{},//请求参数
      tagtext:'',//当前编辑的标签内容
      chooosedtaglist:[],//选中的标签内容
      user_id:'',  //用户id 用于审核建议弹框切换
      pageid:'',//页面id
      scoreparams:{}, //评分管理页面传送请求参数
      action:'',//
  },
  mutations: {
      SETAUTHITEM:(state,authitem)=>{
        state.authitem = authitem
        Cookies.set('authitem', authitem)
      },
      TOPASS:(state,authinfo)=>{
        state.authinfo = authinfo
        Cookies.set('authinfo', authinfo)
      },
      SETSCORE:(state,score)=>{
        state.score = score
        Cookies.set('score', score)
      },
      SETMA_ID:(state,ma_id)=>{
        state.ma_id = ma_id
        Cookies.set('ma_id', ma_id)
      },
      SHOWSUGGEST:(state,showstatus)=> {   state.showstatus = showstatus},
      TOGETSUBMIT:(state,params)=> {   state.params = params;},
      SHOWAUTH:(state,authsuggestions)=> {   state.authsuggestions = authsuggestions},
      SAVETAGTEXT:(state,tagtext) =>  state.tagtext = tagtext,
      SAVETAG:(state,tag) => {
        if(tag[1]){
          if(state.chooosedtaglist.length>0){ //去重
              state.chooosedtaglist.forEach((elem,index)=>{
                if((elem.text ==tag[0].text)&&(elem.type==tag[0].type)){
                  state.chooosedtaglist.splice(index,1) 
                }
              })
          }
          state.chooosedtaglist.push(tag[0])
        }else{//删除
          state.chooosedtaglist.forEach((elem,index)=>{
            if((elem.text ==tag[0].text)&&(elem.type==tag[0].type)){
              state.chooosedtaglist.splice(index,1) 
            }
          })
        }
      },
      CLEATTAGLIST:state=> state.chooosedtaglist = [],
      SETUSERID:(state,user_id)=> state.user_id  = user_id,
      SETCURRENTPAGEID:(state,pageid)=> state.pageid  = pageid,
      SCOREDETAILS:(state,params)=> state.scoreparams = params,
      setaction:(state,action)=> state.action = action,
  },
  actions: {
      SETAUTHITEM({commit},authitem){  
        commit('SETAUTHITEM',authitem)
      },
      TOPASS({commit},authinfo){
        commit('TOPASS',authinfo)
      },
      SETSCORE({commit},score){
        commit('SETSCORE',score)
      },
      SETMA_ID({commit},ma_id){
        commit('SETMA_ID',ma_id)
      },
      TOGETSUBMIT({commit},params){
        commit('TOGETSUBMIT',params)
      },      
      SHOWSUGGEST({commit},showstatus){
        commit('SHOWSUGGEST',showstatus)
      },
      SHOWAUTH({commit},authsuggestions){
        commit('SHOWAUTH',authsuggestions)
      },
      SAVETAGTEXT({ commit},tagtext){
        commit('SAVETAGTEXT',tagtext)
      },
      SAVETAG({ commit},tag){
        commit('SAVETAG',tag)
      },
      CLEATTAGLIST({commit}){
        commit('CLEATTAGLIST')
      },
      SETUSERID({commit},user_id){
        commit('SETUSERID',user_id)
      },
      SETCURRENTPAGEID({commit},pageid){
        commit('SETCURRENTPAGEID',pageid)
      },
      SCOREDETAILS({commit},params){//评分管理-评分详情
        commit('SCOREDETAILS',params)
      },
      setaction({commit},params){//存储action
        commit('setaction',params)
      }
  }
}

export default auth
