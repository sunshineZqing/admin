<template>
	<div class="authorizedstatistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="init">查询</el-button>
		</el-form>
		<basetable :showopera='false' :loading='loading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo">
			
		</basetable>

	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	//	import searchcondition from '@/components/searchcondition'
	export default {
		name: 'authorizedstatistics',
		components: {
			basetable,
			basepage,
			//			searchcondition
		},
		data() {
			return {
				loading: true,
				changeTime:[],//选择日期
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '复审人',
					prop: 'name'
				}, {
					label: '复审通过数',
					prop: 'num8'
				}, {
					label: '复审驳回数',
					prop: 'num9'
				}, {
					label: '复审总数',
					prop: 'allnum',

				}, {
					label: '复审总额度',
					prop: 'allmonery'
				}, {
					label: '复审平均额度',
					prop: 's'
				}],
				collectionParams:{
					action:'10',
				},//请求参数
			}
		},
		mounted() {
			this.init();

		},
		methods: {
			init() { //初始化
				this.$api.secondPowerTrial(this.collectionParams).then(res => {}, response => {
					console.log(response);
					this.baseinfo = response.data.returnObj.interest;
					this.loading = false;
					
				}).catch(val => {
					//异常
				})
			},
			//选择日期
	    	changetime(value){
	    		if(value&&value[0]&&value[1]){
	    			this.collectionParams.lastStart = dateformat(value[0],'yyyy-MM-dd');
	    			this.collectionParams.lastEnd = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.collectionParams.lastStart = "";
	    			this.collectionParams.lastEnd = "";
	    		}
	    	},
			
		}
	}
</script>
<style type="text/css">
	.el-message-box {
		border: 1px solid #eee;
		width: 577px;
	}
</style>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.el-message-box {}
	
	.el-button {
		padding: 12px 20px;
	}
	
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,
		button {
			margin-left: 20px;
		}
		button {}
		div.el-input {
			width: 12%;
		}
	}
</style>