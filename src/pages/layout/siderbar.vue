<template>
	<div class="">
      	<div class="" v-show="!isCollapse">
	      <div class="logo" >
	        <img src="../../assets/img/logo.png" alt="">
	        <span>易金</span>
	      </div>
	      <div class="userheader" >
	        <div class="userheaderimg">
	          <img src="../../assets/img/user.png" alt="">
	        </div>
	      </div>
	      <p class="role">
	         <span class="">
	          <!-- <span>市场部</span>/ -->
	          <span v-if="userinfo&&userinfo.NAME">{{userinfo.NAME}}</span>
	        </span>
	         <span class="" v-if="userinfo&&userinfo.USERNAME">{{userinfo.USERNAME}}</span>
	      </p>
      	</div>
	    <el-menu mode="vertical" unique-opened  background-color="#1A3E8B" text-color="#fff" active-text-color="#409EFF" :default-active="$route.path" class="el-menu-vertical-demo"  :collapse="isCollapse">
		    <div class="menulistbox">
		      	<!--<siderbar-item :routes='menulist' :isCollapse = "isCollapse"></siderbar-item>-->
		      	
		      	<div class='menu-wrapper'>
				    <template v-for="item in menulist">
				      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
				        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
				          <span v-if="item.role==1" class="iconfont firsrmenu" :class="[{bluesle:item.isselect},item.icon]" ></span>
				          <span v-if="item.role==2"  class="iconfont icon-kongxinyuan" :class='{"color-fff":!item.isselect,"bluesle":item.isselect}' ></span>
				          <span v-if="item.role==3"  class="iconfont icon-kongxinyuan" :class='{"color-fff":!item.isselect,"bluesle":item.isselect}' ></span>
				         <span>{{item.children[0].name}}</span>
				        </el-menu-item>
				      </router-link>
				      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" @open="handleOpen(item)">
				        <template slot="title" @close="handleClose(item)">
				        	<i v-if="item.role==1" class="iconfont firsrmenu" :class="[{bluesle:item.isselect},item.icon]" ></i>
				        	<i v-if="item.role==2"  class="iconfont icon-kongxinyuan" :class='{"color-fff":!item.isselect,"bluesle":item.isselect}' ></i>
				        	<span :class='{"bluesle":item.role!=3&&item.isselect,"textnone":isCollapse}'>{{item.name}}</span>
				        	<span class="inone"></span>
				        </template>
				        <template v-for="child in item.children" v-if='!child.hidden'>
				          <siderbar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' > </siderbar-item>
				          <router-link v-else :to="item.path+'/'+child.path">
				            <el-menu-item :index="item.path+'/'+child.path" >
				               <span>
				                  <span v-if="item.role==1"  class="iconfont icon-kongxinyuan" :class='{"color-fff":!item.isselect,"bluesle":item.isselect}' ></span>
				                  <span :class='{"bluesle":item.role==2&&item.isselect}'>{{child.name}}</span>
				               </span>
				            </el-menu-item>
				          </router-link>
				        </template>
				      </el-submenu>
				    </template>
				</div>
		    </div>
	    </el-menu>
		
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import siderbarItem from './siderbarItem'
export default {
  components: { siderbarItem },
  props:['isCollapse'],
  computed: {
    ...mapGetters([
      'menulist',
      'sidebar',
      'userinfo'
    ]),
  },
  data(){
  	return{
  		
  	}
  },
  mounted(){
       	console.log(this.isCollapse);
       }
}
</script>
<style type="text/css">
	.el-submenu__title i{
		color: #fff;
	}
	/*.el-menu-vertical-demo:not(.el-menu--collapse) {
	  width:14.5% ;
	  max-width: 220px;
	  min-height: 400px;
	}*/
</style>
<style lang="less" scoped>
  .el-menu{
  	border: none;
  }
  .siderbar{
  	width: 100%;
  }
  
  .logo{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 80px;
    img{
      width: 40px;
    }
    span{
      color: #fff;
        display: inline-block;
        margin-left: 15px;
        font-size: 25.88px; 
    }
  }
  .userheader{
    margin:0;
    padding: 0;
    width: 100%; 
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
      justify-content: center;
      align-items: center;
  }
  .userheaderimg{
    background: url(http://www.wangyueyun.top/img/headercircle.png) no-repeat;
    background-size: 100% 100%;
    width:  130px;
    height: 130px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
      justify-content: center;
      align-items: center;
      img{
        width: 55px;
          height: 64px;
      }
  }
  .role{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
      justify-content: center;
      align-items: center;
      /*padding: 20px 0;*/
     padding-bottom: 20px;
      border-bottom: 1px solid #1e47a1;
      line-height: 30px;
      span{
        color: #c6c8ca;
        font-size: 16px;
      }
  }
  .menulistbox{
  	padding-bottom: 50px;
  }
  
  
  a{
      text-decoration: none;
  }
  .el-submenu .el-menu-item{
     width: 100%;
     min-width: 100% !important;
  }
  .el-submenu__title{
    font-size: 16px;
    padding: 0 27px 0 45px !important;
  }
  .menu-wrapper>li{
    text-align: left;

      ul.el-menu{
          border: none;
          padding-left: 33px !important;
          background-color:#0b3081 !important;
          border-radius: 13px;
          a{
            display: inline-block;
            width: 100%;
            li{
              background-color:#0b3081 !important;
            }
          }
          div{
            background-color:#0b3081 !important;
            .el-submenu__title{
              padding-left: 40px !important;
            }
          }
      }
  }
  .el-menu{
     border: none;
  }
	
  span{
     font-size: 16px;
  }
  /*动态class*/
  // .color-fff{
  //     color: #fff;
  // }
  .bluesle{
      color: #2bc8f3 !important;
  }
  .bgopen{
      background-color:#0b3081 !important;
      border-radius:10px ;
      border: none;
  }
  .bgchoose{
      background-color:#052673 !important;
  }
  .textnone{
  	display: none;
  }
  .inone + i{
  	display: none !important;
  }
</style>