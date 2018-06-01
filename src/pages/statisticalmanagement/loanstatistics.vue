<template>
	<div class="loanstatistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker  style='margin-left: 0;'  @change="changetime" v-model = "value2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="loanstatistics">查询</el-button>
		</el-form>
		<div class="loanstatisticsCont" v-loading = "loading">
			<div class="total">
				<div class="">
					<p>{{total}}</p>
					<p>借款总金额(¥)</p>
				</div>
				<div class="">
					<p>{{totalNum}}</p>
					<p>借款总笔数(笔)</p>
				</div>
				<div class="">
					<p>{{totalBalance}}</p>
					<p>借款总余额(¥)</p>
				</div>
			</div>
			<div class="KJtotal">
				<div class="">
					<p>{{loanstatisticsData.totalmoney}}</p>
					<p>易快借借款金额(¥)</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.count}}</p>
					<p>易快借借款笔数(笔)</p>
				</div>
				<div class="">
					<p>{{loanstatisticsData.remainmoney}}</p>
					<p>易快借借款余额(¥)</p>
				</div>
			</div>
			<div class="FQtotal">
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>3期</span></p>
					<p>借款金额(¥):<span>{{loanstatisticsData.money3}}</span></p>
					<p>借款笔数(笔):<span>{{loanstatisticsData.count3}}</span></p>
					<p>借款余额(¥):<span>{{loanstatisticsData.remainmoney3}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>6期</span></p>
					<p>借款金额(¥):<span>{{loanstatisticsData.money6}}</span></p>
					<p>借款笔数(笔):<span>{{loanstatisticsData.count6}}</span></p>
					<p>借款余额(¥):<span>{{loanstatisticsData.remainmoney6}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>12期</span></p>
					<p>借款金额(¥):<span>{{loanstatisticsData.money12}}</span></p>
					<p>借款笔数(笔):<span>{{loanstatisticsData.count12}}</span></p>
					<p>借款余额(¥):<span>{{loanstatisticsData.remainmoney12}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dateformat } from '@/utils/index'
	export default {
		name: 'loanstatistics',
		data() {
			return {
				//请求列表参数
				collectionParams: {
				},
				value2:'',
				loanstatisticsData: '',
				total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				loading:true,
			}
		},
		mounted() {
			this.loanstatistics();
		},
		methods: {
			loanstatistics() {
				this.loading = true;
				this.$api.loanstatistics(this.collectionParams).then(res => {}, response => {
					console.log(response);
					this.loading = false;
					if(response.data.returnObj.varList[0] != undefined && response.data.returnObj.varList[0] != ''){
						this.loading = false;
						this.loanstatisticsData = response.data.returnObj.varList[0];
						this.total = this.loanstatisticsData.totalmoney + this.loanstatisticsData.money3 + this.loanstatisticsData.money6 + this.loanstatisticsData.money12;
						this.totalNum = this.loanstatisticsData.count + this.loanstatisticsData.count3 + this.loanstatisticsData.count6 + this.loanstatisticsData.count12;
						this.totalBalance =  this.loanstatisticsData.remainmoney +  this.loanstatisticsData.remainmoney3 + this.loanstatisticsData.remainmoney6 + this.loanstatisticsData.remainmoney12;
					}else{
						this.$message({message: response.resultMsg,type: 'error'});
						this.loading = false;
					}
				}).catch(val => {
					//异常
					this.$message({message: '服务器异常',type: 'error'});
				})
			},
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.collectionParams.auditTimeStart = dateformat(value[0], 'yyyy-MM-dd');
					this.collectionParams.auditTimeEnd = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.collectionParams.auditTimeStart = '';
					this.collectionParams.auditTimeEnd = '';
				}
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
	.loanstatistics {
		width: 100%;
		text-align: left;
	}
	.loanstatisticsCont{
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
			background: #fa7463;
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
			background: #68e05a;
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