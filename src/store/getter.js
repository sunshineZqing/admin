import Cookies from 'js-cookie'
import router from '../router'
const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  menulist: state => state.menulist,
  userinfo: state => state.userinfo,
  addRouters: state => state.permission.addRouters,
  menuAllList:state => state.menuAllList,
  checkedmenulist:state =>{
      let checkedlist = []
      function getcheckedlist(list){
        list.forEach(elem=>{
          if(elem.subMenu.length!==0){
            getcheckedlist(elem.subMenu)
          }else{
            checkedlist.push(elem.MENU_ID)
          }
        })
      }
      getcheckedlist(state.checkedmenulist)
      return  checkedlist
  },
  authitem:state=> {
    if(!state.auth.authitem){
      return  JSON.parse(Cookies.get('authitem'))
    }else{
      return  state.auth.authitem
    }
  },
  authinfo:   state => {
    if(!state.auth.authinfo){
      return  JSON.parse(Cookies.get('authinfo'))
    }else{
       return  state.auth.authinfo
    }
  },
  score:state => state.auth.score,
  ma_id:state => state.auth.ma_id,
  user_id:state => state.auth.user_id,
  pageid:state => state.auth.pageid,
  showstatus: state => state.auth.showstatus,
  params: state => state.auth.params,
  authsuggestions: state => state.auth.authsuggestions,
  tagtext: state => state.auth.tagtext,
  chooosedtaglist: state => state.auth.chooosedtaglist,
  scoreparams: state => state.auth.scoreparams,
  action: state => state.auth.action,
  searchlist:state => state.searchlist,//获取当前搜索对象
  savecontent:state => state.savecontent
}
export default getters