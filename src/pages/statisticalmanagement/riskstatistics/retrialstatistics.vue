<template>
	<div class="retrialstatistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="retrialstatistics">查询</el-button>
			<a class="download" :href="'/ykj/statistics/secondTrialExcel.do?auditTimeStart='+collectionParams.auditTimeStart+'&auditTimeEnd='+collectionParams.auditTimeEnd" target="_blank">下载</a>
		</el-form>
		<div class="retrialstatisticsCont" v-loading="loading">
			<div class="peopleNum">
				<div class="">
					<p>{{loanstatisticsData.total_num}}</p>
					<p>注册用户数量</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.first_num}}</p>
					<p>进入初审总数量</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.second_num}}</p>
					<p>进入复审的用户总数量</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.second_pas_rate}}</p>
					<p>复审通过率</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.second_people}}</p>
					<p>复审待审人数</p>
				</div>
				<!--<div class="">
					<p>{{averageNum}}</p>
					<p>每人平均数量</p>
				</div>-->
				
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
		name: 'retrialstatistics',
		components:{basetable,basepage},
		data() {
			return {
				//表头
				basetabletitle:[
					{label:'复审人编号',  prop:'su_id'    },
	                {label:'复审人',   prop:'NAME'  },            
	                {label:'审核客户总量',prop:'total_num'},           
	                {label:'授权总额度',prop:'total_money'},        
	                {label:'复审待审数量',prop:'flag2_num'},
	                {label:'复审通过数量',prop:'flag8_num'},
	                {label:'复审驳回数量',prop:'flag9_num'},
	                {label:'复审更新数量',prop:'flag11_num'},
	                {label:'出错单量',   prop:'error_num'},
	                {label:'逾期率',    prop:'overrate'},
	                {label:'审批平均额度',prop:'average_amount'},
	                
				],
				//表数据
				baseinfo:[],
				//请求列表参数
				collectionParams: {
					action:'5',
					auditTimeStart:'',
					auditTimeEnd:''
				},
				loanstatisticsData: '',
				total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				changeTime:[],
				loading:true,
				pagesize:0,
				adoptlv:0,//通过率
				averageNum:0,//平均数量
			}
		},
		mounted() {
			this.retrialstatistics();
		},
		methods: {
			retrialstatistics() {
				this.loading = true;
				this.$api.secondTrial(this.collectionParams).then(res => {}, response => {
					console.log(response);
					this.loading = false;
					if(response.data.returnObj.secondTrial != undefined && response.data.returnObj.secondTrial != ''){
//						this.response.data.returnObj.secondTrial.second_pas_rate = this.response.data.returnObj.secondTrial.second_pas_rate.toFixed(2) + '%';
						this.loanstatisticsData = response.data.returnObj.secondTrial;
						this.loanstatisticsData.second_pas_rate = this.loanstatisticsData.second_pas_rate.toFixed(2) + '%'
						this.baseinfo = response.data.returnObj.secondTrials;
						this.pagesize = response.data.returnObj.secondTrials.length;
						this.baseinfo.forEach(item=>{
							item.overrate = item.overrate.toFixed(2) + '%';
						})
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
	.retrialstatistics {
		width: 100%;
		text-align: left;
	}
	.retrialstatisticsCont{
		display: block;
		width: 100%;
		margin: auto;
		border: 1px solid #2bc8f3;
	}
	.peopleNum{
		width: 92%;
		margin: 50px 4% 60px;
		box-shadow: 0 0 10px 3px #e8e7e6;
		display: flex;
		justify-content: space-around;
		flex-wrap: nowrap;
		div{
			text-align: center;
			margin: 30px 0;
			padding: 0 20px;
			border-right: 1px solid #e8e7e6;
			border-radius: 3px;
			flex-grow:1;
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