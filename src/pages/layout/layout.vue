<template>
	<div class="main">
		<!--菜单收缩按钮-->
		<div class="onswitch" :class="{'unswitch':isCollapse}" v-on:click="isCollapse=!isCollapse;">
	      	<span v-if="!isCollapse"></span><i class="iconfont" :class="isCollapse ? 'icon-07jiantouxiangyou' : 'icon-07jiantouxiangzuo'"></i><span v-if="!isCollapse"></span>
	    </div>
		<el-container class="mainbox">
			<div :class="isCollapse ? 'unleftNav' : 'leftNav'">
				<siderbar class="menutree" :isCollapse="isCollapse"></siderbar>
			</div>
			<div class="mainCont">
				<el-container class='maincontent'>
				    <el-header>
		               <headtop></headtop>
				    </el-header>
				    <el-main>
				    	<appmain></appmain>
				    </el-main>
				</el-container>
			</div>
		</el-container>
	</div>
</template>
<script>
    import headtop  from './headtop'
    import siderbar from './siderbar'
    import appmain  from './appmain'
    import {mapState,mapMutations,mapGetters,mapActions } from 'vuex';
	export default {
	   	data(){
          return {
	        defaultProps: {
	          children: 'children',
	          label: 'name'
	        },
	        isCollapse:false,
          }
	   	},
       	name: 'layout',
       	components: { headtop, appmain ,siderbar},
       	computed:{
           ...mapState(['permission']),
       	},
       	mounted(){
		
       	},
       	methods:{
			
       	}
	}
</script>

<style lang="less"  scoped>
	.main{
		width: 100%;
		height: 100%;
	}
    header{
    	height: 102px !important;
    	background-color: #E9EEF3 !important;
    	padding: 0;
    }
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
	}
	.el-main {
		background-color: #fff;
		color: #333;
		text-align: center;
		padding: 10px;
		padding-top: 15px;
		overflow: initial;
	}
	body > .el-container {
	    margin-bottom: 40px;
	}
	.el-container:nth-child(5) .el-aside,.el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	}
	.el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	}
	.el-tree{
		background-color:#1A3E8B ;
		color: #fff;
        margin: 0 auto;
        width: 100%;
   		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	    justify-content: center;
	    align-items: flex-start;
	}
	.menutree{
		padding-bottom: 50px;
		transition: width 0.28s ease-out;
		width:100%;
	    height: 100%;
	    /*position: fixed;
	    top: 0;
	    bottom: 0;
	    left: 0;*/
	    z-index: 1001;
	    /*overflow-x: hidden;*/
        /*overflow-y: auto;*/
        box-sizing: border-box;
	}
	
	.menutree::scrollbar{
		display: none;
	}
	.menutree::-webkit-scrollbar {
	    display: none;
	}
	.maincontent{
        /*margin-left: 14.5%;*/
	    min-height: 100%;
	}
	.unmaincontent{
		margin-left: 64px;
	    min-height: 100%;
	}
	
	.mainbox{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-content: flex-start;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.leftNav{
		display:-webkit-box;
		height: 100%;
		transition: width 0.28s ease-out;
		width: 335px;
		min-width: 220px;
		max-width: 221px;
		overflow: auto;
		padding-bottom: 30px;
		background-color:rgb(26, 62, 139) ;
		box-sizing: border-box;
	}
	.leftNav::scrollbar{
		display: none;
	}
	.leftNav::-webkit-scrollbar {
	    display: none;
	}
	.unleftNav{
		display:-webkit-box;
		height: 100%;
		transition: width 0.28s ease-out;
		width: 64px;
		min-width: 64px;
    	max-width: 64px;
		background-color:rgb(26, 62, 139) ;
		padding-bottom: 30px;
		box-sizing: border-box;
	}
	.unleftNav::scrollbar{
		display: none;
	}
	.unleftNav::-webkit-scrollbar {
	    display: none;
	}
	.mainCont{
		display:-webkit-box;
		flex-grow:1;
		height: 100%;
		overflow: auto;
	}
	
	.onswitch{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10001;
		width: 220px;
		height: 30px;
		text-align: center;
		padding-top: 10px;
		background: rgb(26, 62, 139);
		span{
			display: inline-block;
	  		width: 45%;
	  		border-top: 1px solid #bbb;
	  		vertical-align: middle;
		}
		i{
			vertical-align: middle;
			line-height: 22px;
		}
	}
	.unswitch{
		width: 64px;
	}
</style>
