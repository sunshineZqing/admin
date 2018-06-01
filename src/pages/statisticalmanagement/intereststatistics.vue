<template>
	<div class="intereststatistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="intereststatistics">查询</el-button>
		</el-form>
		<div class="intereststatisticsCont">
			<div class="total">
				<div class="">
					<p>{{loanstatisticsData.num1}}</p>
					<p>易快借正常利息(¥)</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.num2}}</p>
					<p>易快借逾期利息(¥)</p>
				</div>
			</div>
			<div class="FQtotal">
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>3期</span></p>
					<p>正常利息(¥):<span>{{loanstatisticsData.num3}}</span></p>
					<p>逾期利息(¥):<span>{{loanstatisticsData.num4}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>6期</span></p>
					<p>正常利息(¥):<span>{{loanstatisticsData.num5}}</span></p>
					<p>逾期利息(¥):<span>{{loanstatisticsData.num6}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>12期</span></p>
					<p>正常利息(¥):<span>{{loanstatisticsData.num7}}</span></p>
					<p>逾期利息(¥):<span>{{loanstatisticsData.num8}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dateformat } from '@/utils/index'
	export default {
		name: 'intereststatistics',
		data() {
			return {
				//请求列表参数
				collectionParams: {
					action:'5',
				},
				loanstatisticsData: '',
				total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				changeTime:[],
			}
		},
		mounted() {
			this.intereststatistics();
		},
		methods: {
			intereststatistics(){
				this.$api.loanrecoveryList(this.collectionParams).then(res => {}, response => {
					console.log(response);
					this.loanstatisticsData = response.data.returnObj.interest;
					this.total = response.data.returnObj.interest.totalmoney + response.data.returnObj.interest.money3 + response.data.returnObj.interest.money6 + response.data.returnObj.interest.money12;
					this.totalNum = response.data.returnObj.interest.count + response.data.returnObj.interest.count3 + response.data.returnObj.interest.count6 + response.data.returnObj.interest.count12;
					this.totalBalance =  response.data.returnObj.interest.remainmoney +  response.data.returnObj.interest.remainmoney3 + response.data.returnObj.interest.remainmoney6 + response.data.returnObj.interest.remainmoney12;
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
		}
	}
</script>

<style scoped="scoped" lang="less">
	.intereststatistics {
		width: 100%;
		text-align: left;
	}
	.intereststatisticsCont{
		display: block;
		width: 90%;
		margin: auto;
		border: 1px solid #2bc8f3;
	}
	.total{
		width: 100%;
		padding: 50px 0 60px;
		border-bottom: 15px solid #f0f4f7;
		div{
			display: inline-block;
			width: 24%;
			text-align: center;
			margin: 0 4%;
			background: #68e05a;
			color: #FFF;
			padding: 30px 0;
			box-shadow: 0 0 10px 3px #e8e7e6;
			border-radius: 3px;
			p:first-child{
				font-size:50px ;
				margin: 0;
			}
			p:last-child{
				font-size:25px ;
				margin: 0;
			}
		}
		div:nth-child(2){
			background: #fa7463;
		}div:nth-child(3){
			background: #ffb137;
		}
	}
	.KJtotal{
		width: 100%;
		border-bottom: 15px solid #f0f4f7;
		div{
			display: inline-block;
			width: 24%;
			text-align: center;
			padding: 30px 4%;
			margin: 50px 0;
			border-right: 1px solid #7a7a7a;
			p:first-child{
				color: #fa7463;
				font-size:36px ;
				margin: 0;
			}
			p:last-child{
				color: #555555;
				font-size:28px ;
				margin: 0;
			}
		}
		div:last-child{
			border-right: none;
		}
	}
	.FQtotal{
		width: 100%;
		padding: 50px 0 60px;
		.FQtotalQi{
			display: inline-block;
			width: 24%;
			text-align: center;
			margin: 0 4%;
			border: 1px  solid #cbcbcb;
			border-radius: 3px;
			background:#eefaff;
			p{
				font-size: 24px;
				color: #7a7a7a;
				text-align: left;
				margin: 0;
				padding: 20px;
				padding-left: 15px;
				border-bottom: 1px dashed #828282;
				span{
					padding-left:15px;
					color: #555555;
				}
			}
			p:first-child{
				border-bottom: 1px solid #cbcbcb;
				padding-left:0;
				font-size: 28px;
				color: #424242;
				text-align: center;
				span{
					padding-left:0;
					color: #40cbf4;
				}
			}
			p:last-child{
				border-bottom: none;
			}
		}
	}

</style>