<template>
	<div class="callrecoverystatistics">
		<el-form :inline="true" :model="loanrecoveryParams" class="demo-form-inline" align="left">
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-form-item>
				<el-button type="primary" size="medium" @click="callrecoveryList">查询</el-button>
			</el-form-item>
			<a class="download" :href="'/ykj/statistics/customerExcel.do?wantday='+loanrecoveryParams.wantday+'&Today='+loanrecoveryParams.Today" target="_blank">下载</a>
		</el-form>
		<basetable :basetabletitle="loanrecoveryTitle" :basetableinfo='loanrecoveryData' :loading="loading">
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default{
		name:'callrecoverystatistics',
		components: {
			basetable,
			basepage
		},
		data(){
			return{
				//列表请求参数
				loanrecoveryParams:{
					action:'6',
					wantday:'',
					Today:'',
				},
				//列表头
				loanrecoveryTitle:[
					{
						label: '客服人员',
						prop: 'username'
					},{
						label: '追回数量',
						prop: 'backNum'
					},{
						label: '追回金额',
						prop: 'backAmount'
					},
				],
				//列表数据
				loanrecoveryData:[],
				pageSize:0,//总页码
				changeTime:[],//选择时间
				loading:false,
			}
		},
		mounted(){
			this.callrecoveryList();
		},
		methods:{
			callrecoveryList(){
				this.$api.callrecoveryList(this.loanrecoveryParams).then(res => {}, response => {
					console.log(response);
					this.loanstatisticsData = response.data.returnObj.varList;
					this.loanrecoveryData = response.data.returnObj.varList;
					this.pageSize = response.data.returnObj.totalCount;
//					this.total = response.data.returnObj.interest.totalmoney + response.data.returnObj.interest.money3 + response.data.returnObj.interest.money6 + response.data.returnObj.interest.money12;
//					this.totalNum = response.data.returnObj.interest.count + response.data.returnObj.interest.count3 + response.data.returnObj.interest.count6 + response.data.returnObj.interest.count12;
//					this.totalBalance =  response.data.returnObj.interest.remainmoney +  response.data.returnObj.interest.remainmoney3 + response.data.returnObj.interest.remainmoney6 + response.data.returnObj.interest.remainmoney12;
				}).catch(val => {
					//异常
				})
			},
			//选择日期
			changetime(value){
				if(value&&value[0]&&value[1]){
	    			this.loanrecoveryParams.wantday = dateformat(value[0],'yyyy-MM-dd');
	    			this.loanrecoveryParams.Today = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.loanrecoveryParams.wantday = '';
	    			this.loanrecoveryParams.Today = '';
	    		}
			},
			topage(topage){
				this.loanrecoveryParams = Object.assign(this.loanrecoveryParams,topage);
				console.log(this.loanrecoveryParams);
				this.loanrecoveryList();
			}
		}
	}
</script>

<style scoped="scoped">
	.download{
	    color: #fff;
	    text-decoration: none;
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    font-weight: 500;
	    padding: -12px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    margin-right: 10px;
	    padding: 10px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    border-color: #409EFF;
	    background-color: #409EFF;
	}
</style>