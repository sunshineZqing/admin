<template>
	<div :id="echartsData.id" :style="echartsData.echartstyle" :key = 'echartsData.id'></div>
</template>

<script>
	import { isEmptyObject} from '@/utils/index'
	export default{
		name:'echart',
		data(){
			return{
				
			}
		},
		props:['echartsData'],
		mounted(){
			if(!isEmptyObject(this.echartsData)){
				this.echarts()
			}else{
				this.$watch('echartsData',()=>{
					this.echarts()
				})
			}
		},
		methods:{
			echarts(){
				let analysisCharts = this.$echarts.init(document.getElementById(this.echartsData.id));
				let option = this.echartsData.echartsCont;
				analysisCharts.setOption(option);
			}
		},
	}
</script>

<style>
</style>