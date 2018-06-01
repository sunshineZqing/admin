<template>
<div class="paymoneystatistics">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="paymoneystatistics">查询</el-button>
		</el-form>
		<div class="paymoneystatisticsCont" v-loading="loading">
			<div class="total">
				<div class="">
					<p>{{total}}</p>
					<p>还款总金额(¥)</p>
				</div>
				<div class="">
					<p>{{totalNum}}</p>
					<p>还款总笔数(笔)</p>
				</div>
			</div>
			<div class="KJtotal">
				<div class="">
					<p>{{paymoneystatisticsData.act}}</p>
					<p>易快借还款金额(¥)</p>
				</div>
				<div class="">
					<p>{{paymoneystatisticsData.count}}</p>
					<p>易快借还款笔数(笔)</p>
				</div>
			</div>
			<div class="FQtotal">
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>3期</span></p>
					<p>还款金额(¥):<span>{{paymoneystatisticsData.money3}}</span></p>
					<p>还款笔数(笔):<span>{{paymoneystatisticsData.count3}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>6期</span></p>
					<p>还款金额(¥):<span>{{paymoneystatisticsData.money6}}</span></p>
					<p>还款笔数(笔):<span>{{paymoneystatisticsData.count6}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期借款<span>12期</span></p>
					<p>还款金额(¥):<span>{{paymoneystatisticsData.money12}}</span></p>
					<p>还款笔数(笔):<span>{{paymoneystatisticsData.count12}}</span></p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { dateformat } from '@/utils/index'
	export default{
		name:'paymoneystatistics',
		data(){
			return{
				//请求列表参数
	            collectionParams:{
	            },
	            paymoneystatisticsData:{
	            	act:'',
	            },
	            total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				changeTime:[],//选择日期
				loading:true,
			}
		},
		mounted(){
	    	this.paymoneystatistics();
	    },
	    methods:{
	    	paymoneystatistics(){
	    		this.$api.paymoneystatistics(this.collectionParams).then(res => {}, response => {
					console.log(response.data.resultCode );
					this.loading = false;
					if(response.data.resultCode == '0'){
						this.loading = false;
						this.paymoneystatisticsData = response.data.returnObj.varList[0];
						this.total = this.paymoneystatisticsData.act + this.paymoneystatisticsData.money3 + this.paymoneystatisticsData.money6 + this.paymoneystatisticsData.money12;
						this.totalNum = this.paymoneystatisticsData.count + this.paymoneystatisticsData.count3 + this.paymoneystatisticsData.count6 + this.paymoneystatisticsData.count12;
						this.totalBalance =  this.paymoneystatisticsData.remainmoney +  this.paymoneystatisticsData.remainmoney3 + this.paymoneystatisticsData.remainmoney6 + this.paymoneystatisticsData.remainmoney12;
					}else{
						this.$message({message: response.resultMsg,type: 'error'});
					}
	    		}).catch(val => {
					//异常
					this.$message({message: '服务器异常',type: 'error'});
				})
	    	},
	    	//选择日期
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
	.paymoneystatistics{
		width: 100%;
		text-align: left;
	}
	.paymoneystatisticsCont{
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