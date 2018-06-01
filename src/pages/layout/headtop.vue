<template>
	<div class="header">
		<div class="lefttags">
			<div class="welcome" v-show="indexpagr">
				<span>欢迎进入后台管理界面</span>
				<img src="../../assets/img/welcome.png" alt="">
			</div>
			<levelbar v-show="!indexpagr"></levelbar>
			<tabs-view v-show="!indexpagr"></tabs-view>
		</div>
		<set></set> 
	</div>
</template>
<script>
    import set from '../../components/set'
    import  levelbar from './levelbar'
    import TabsView from './TabsView'
    import {mapState,mapMutations,mapGetters,mapActions } from 'vuex'
	export default {
        name:'headtop',
        components: { set,levelbar,TabsView },
        computed:{
          
        },
        watch:{
           $route(){
           	 this.indexpagr = this.$route.path==='/layout'?true:false
           }
        },
        mounted(){
           this.indexpagr = this.$route.path==='/layout'?true:false
        }, 
        data() {
          return {
          	indexpagr:true //是否是首页
          }
        },
        methods:{
        	
        }
	}
</script>
<style lang="less" scoped>
    .header{
    	height: 102px ;
    	display: flex ;
		display: -webkit-flex ;
		flex-direction: row;
	    justify-content: space-between;
	    align-items: center;
	    .lefttags{
	    	height: 100%;
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: flex-start;
			margin-left:15px ;
	    }
    }
    .welcome {
    	height: 100%;
    	display: flex;
		display: -webkit-flex;
		flex-direction: row;
	    justify-content: space-between;
	    align-items: center;
	    margin-left: 7px;
	    span{
		    color: #1e49a7;
			font-size: 24px;
			font-family: 'SimSun';
	    }
	    img{
	    	width: 135px;
	    }

    }
    span.el-tag{
    	cursor: pointer;
    	background-color: transparent;
    	border: none;
    }
    span.el-tag:hover{
    	color: #2bc8f3;
    }
</style>

