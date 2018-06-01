<template>
	<div class="sliderright">
		<el-tooltip content="收起" placement="top">
			<i class="myclose iconfont icon-gongzuotai" @click="beforeclose"></i>
	    </el-tooltip>
		<slot></slot>	
	</div>
</template>
<script>
	export default{
		name:'sliderright',
		methods:{
           beforeclose(){
             	this.$store.dispatch('SHOWAUTH',false) //关闭建议弹框
           }
		}
	}
</script>
<style scoped lang="less">
	/*.sliderright{
		padding: 5%;
	}*/
	.sliderright{
		position: fixed;
    	left: 0;
    	bottom: 50%;
    	cursor: pointer;
	}
    /*.myclose{
    	position: fixed;
    	left: 0;
    	bottom: 50%;
    	cursor: pointer;
    }*/
</style>