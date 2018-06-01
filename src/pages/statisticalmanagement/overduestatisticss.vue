<template>
	<div class="overudeStatis">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="">
				<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-button type="primary" size="medium" @click="overudeStatis">查询</el-button>
		</el-form>
		<div class="overudeStatisCont" v-loading = "loading">
			<div class="total">
				<div class="">
					<p>{{total}}</p>
					<p>逾期总金额(¥)</p>
				</div>
				<div class="">
					<p>{{totalNum}}</p>
					<p>逾期总笔数(笔)</p>
				</div>
			</div>
			<div class="KJtotal">
				<div class="">
					<p>{{overudeStatisData.amount}}</p>
					<p>易快借逾期金额(¥)</p>
				</div>
				<div class="">
					<p>{{overudeStatisData.num}}</p>
					<p>易快借逾期笔数(笔)</p>
				</div>
			</div>
			<div class="FQtotal">
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期逾期<span>3期</span></p>
					<p>逾期金额(¥):<span>{{overudeStatisData.amount3}}</span></p>
					<p>逾期笔数(笔):<span>{{overudeStatisData.num3}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期逾期<span>6期</span></p>
					<p>逾期金额(¥):<span>{{overudeStatisData.amount6}}</span></p>
					<p>逾期笔数(笔):<span>{{overudeStatisData.num6}}</span></p>
				</div>
				<div class="FQtotalQi">
					<p class="FQtotalQiTit">易分期逾期<span>12期</span></p>
					<p>逾期金额(¥):<span>{{overudeStatisData.amount12}}</span></p>
					<p>逾期笔数(笔):<span>{{overudeStatisData.num12}}</span></p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { dateformat } from '@/utils/index'
	export default{
		name:'overudeStatis',
		data(){
			return{
				//请求列表参数
	            collectionParams:{
	            	action:'3',
	            },
	            overudeStatisData:'',
	            total:0,//总金额
				totalNum:0,//总笔数
				totalBalance:0,//总余额
				changeTime:[],//选择日期
				loading:true,
			}
		},
		mounted(){
	    	this.overudeStatis();
	    },
	    methods:{
	    	overudeStatis(){
	    		this.$api.loanrecoveryList(this.collectionParams).then(res => {}, response => {
					console.log(response);
					this.overudeStatisData = response.data.returnObj.interest;
					this.total = response.data.returnObj.interest.amount3 + response.data.returnObj.interest.amount6 + response.data.returnObj.interest.amount12 +response.data.returnObj.interest.amount;
					this.totalNum = response.data.returnObj.interest.num3 + response.data.returnObj.interest.num6 + response.data.returnObj.interest.num12 + response.data.returnObj.interest.num;
					this.$nextTick(function(){
						this.loading = false;
					})
					
	    		}).catch(val => {
					//异常
				})
	    	},
	    	//选择日期
	    	changetime(value){
	    		if(value&&value[0]&&value[1]){
	    			this.collectionParams.startTime = dateformat(value[0],'yyyy-MM-dd');
	    			this.collectionParams.endTime = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.collectionParams.startTime = "";
	    			this.collectionParams.endTime = "";
	    		}
	    	},
	    }
	}	
				
</script>

<style scoped="scoped" lang="less">
	.overudeStatis{
		width: 100%;
		text-align: left;
	}
	.overudeStatisCont{
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