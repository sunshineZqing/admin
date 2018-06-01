<template>
	<div class="firsttistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="firsttistics">查询</el-button>
			<a class="download" :href="'/ykj/statistics/firstTrialExcel.do?auditTimeStart='+collectionParams.auditTimeStart+'&auditTimeEnd='+collectionParams.auditTimeEnd" target="_blank">下载</a>
		
		</el-form>
		<div class="firsttisticsCont" v-loading="loading">
			<div class="peopleNum">
				<div class="">
					<p>{{loanstatisticsData.num}}</p>
					<p>注册用户数量</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.num1}}</p>
					<p>进入初审的用户总数量</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.num2}}</p>
					<p>初审待审人员</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.num3}}</p>
					<p>每人平均人数</p>
				</div>
			</div>
			<div class="basetable">
				<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo">
		        </basetable>
		        <basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
			</div>
				
		</div>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'firsttistics',
		components:{basetable,basepage},
		data() {
			return {
				//表头
				basetabletitle:[        
	                {label:'用户编号',    prop:'su_id' },           
	                {label:'用户姓名',    prop:'name' },            
	                {label:'审核客户总量', prop:'totalnum'},           
	                {label:'初审待审数量', prop:'onenum'},        
	                {label:'出错单量',    prop:'errornum'},            
//	                {label:'逾期率',     prop:'overrate'},            
	            ],
				//表数据
				baseinfo:[],
				pagesize:0,//总条数
				//请求列表参数
				collectionParams: {
					auditTimeStart:'',
					auditTimeEnd:''
				},
				loanstatisticsData: '',
				loanstatisticsDataPJ:'',//平均人数
				total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				changeTime:[],
				loading:true,
			}
		},
		mounted() {
			this.firsttistics();
		},
		methods: {
			firsttistics() {
				this.loading = true;
				this.$api.firstTrial(this.collectionParams).then(res => {}, response => {
					console.log(response.data.returnObj.firstTrial);
					this.loading = false;
					if(response.data.returnObj.firstTrial != undefined && response.data.returnObj.firstTrial != ''){
						this.loanstatisticsData = response.data.returnObj.firstTrial;
						this.pagesize = response.data.returnObj.totalCount;
						console.log(this.loanstatisticsData);
						if(this.loanstatisticsData.num2/this.loanstatisticsData.num3 == Infinity){
							this.loanstatisticsDataPJ =0;
						}else{
							this.loanstatisticsDataPJ = this.loanstatisticsData.num2/this.loanstatisticsData.num3 || 0;
						}
						this.baseinfo = response.data.returnObj.firstTrials;
						
					}else{
						this.loading = false;
					}
					
					
				}).catch(val => {
					//异常
				})
			},
			//选择日期
	    	changetime(value){
	    		if(value&&value[0]&&value[1]){
	    			this.collectionParams.auditTimeStart = dateformat(value[0],'yyyy-MM-dd');
	    			this.collectionParams.auditTimeEnd = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.collectionParams.auditTimeStart = "";
	    			this.collectionParams.auditTimeEnd = "";
	    		}
	    	},
	    	topage(target){//跳页
	            this.collectionParams = Object.assign(this.collectionParams,target); //对象合并
	            this.firsttistics();
	        }
		}
	}
</script>

<style scoped="scoped" lang="less">
	.firsttistics {
		width: 100%;
		text-align: left;
	}
	.firsttisticsCont{
		display: block;
		width: 100%;
		margin: auto;
		border: 1px solid #2bc8f3;
	}
	.peopleNum{
		width: 92%;
		margin: 50px 4% 60px;
		box-shadow: 0 0 10px 3px #e8e7e6;
		
		div{
			display: inline-block;
			width: 24%;
			text-align: center;
			margin: 30px 0;
			border-right: 1px solid #e8e7e6;
			border-radius: 3px;
			p:first-child{
				font-size:35px ;
				color: #555555;
				margin: 0;
			}
			p:last-child{
				font-size:25px ;
				margin: 0;
				color: #7A7A7A;
			}
		}
		div:last-child{
			border-right:none;
		}
	}
	.basetable{
		margin: 0 4% 30px;
		text-align: center;
	}
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