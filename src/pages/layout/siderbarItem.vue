<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">
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
</template>

<script>
export default {
  name: 'siderbarItem',
  props: {
    routes: {
      type: Array
    },
    isCollapse:Boolean,
  },
  mounted(){
  	console.log(this.isCollapse);
  	
  },
  methods:{
    handleOpen(item){
      item.isselect = true
    },
    handleClose(item){
      item.isselect = false
    }
  }
}
</script>

<style lang="less" scoped >
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
  .inone + .el-submenu__icon-arrow{
  	display: none !important;
  }
</style>