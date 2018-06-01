<template>
	<div class="overdue">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keyWords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="还款状态">
				<el-select v-model="collectionParams.is_pay_off" placeholder="是否还清" clearable>
					<el-option label="已还清" value="1"></el-option>
					<el-option label="未还清" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="检索类型">
				<el-select v-model="collectionParams.fil" placeholder="检索类型" clearable>
					<el-option label="借款时间" value="1"></el-option>
					<el-option label="应还款时间" value="2"></el-option>
					<el-option label="还清时间" value="3"></el-option>
					
				</el-select>
			</el-form-item>
			<el-date-picker  v-model="collectionParams.endTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="primary" size="medium" @click="overdueList">查询</el-button>
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo'  :loading="loading" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="详情" placement="top">
					<el-button type="text" icon='iconfont icon-guanbiad' v-on:click="handleDetails"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="新增快借逾期还款" placement="top">
					<el-button type="text" icon='iconfont icon-bianji' v-on:click="handleEdit"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary='basetableinfo.length' v-on:topage="topage"></basepage>
		<el-dialog title="新增还款" :visible.sync="repaymentSituation" width="400px" align="left">
			<div class="repaymentS">
				<div class="bombCont">
					<div class="bombContTop">
						<div class="">
							<span>最大金额：</span><span></span>
						</div>
						<div class="">
							<span>最小金额：</span><span></span>
						</div>
					</div>
				</div>
				<div class="bombBottom">
					<div class="bombBack">
						<span class="bombBackTit">选择银行卡</span>
						<div v-for="(item,index) in bomBack">
							<input type="radio" name="xbackRadio" v-bind:id="'xbackRadio'+index" :value="'xbackRadio'+index" v-model="bomBackRadio" v-bind:checked="index==0" :class="bomBackRadio=='xbackRadio'+index ? 'iconfont icon-xuanzhong' : 'iconfont icon-weixuanzhong'">
							<label v-bind:for="'xbackRadio'+index" :class="bomBackRadio=='xbackRadio'+index ? 'checkedSpan' : ''">{{item.back}}</label>
							<span v-if="index==0" class="backmor">默认</span>
						</div>
					</div>
					<div class="bombPut">
						<div class="bombmoney">
							<span class="bombmoneyTit">还款金额</span>
							<input type="text" name="" id="" value="" />
							<span class="bombmoneyPrompt"><span>*</span>（额度范围为1,000.00~50,000.00）</span>
						</div>
						<div class="bombRemark">
							<span class="bombmoneyTit">备注</span><textarea name="" rows="" cols=""></textarea>
						</div>
					</div>
					<div class="bombBtn">
						<el-button type="primary" size="medium">提交</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import searchcondition from '@/components/searchcondition'
	import basepage from '@/components/basepage'
	export default{
		name:'overdue',
		components:{basetable,searchcondition,basepage},
		data () {
			return{
	            basetabletitle:[
	             {
	             	label:'借款ID',
	             	prop:'borrowId'
	             },            {
	             	label:'用户ID',
	             	prop:'userId'
	             },            {
	             	label:'用户姓名',
	             	prop:'name'
	             },            {
	             	label:'手机号',
	             	prop:'phone'
	             },            {
	             	label:'借款日期',
	             	prop:'borrowTime'
	             },            {
	             	label:'应还款日期',
	             	prop:'repayTime'
	             },            {
	             	label:'逾期天数',
	             	prop:'overDays'
	             },            {
	             	label:'借款金额',
	             	prop:'borrowAmount'
	             },            {
	             	label:'利息',
	             	prop:'payInterest'
	             },            {
	             	label:'逾期利息',
	             	prop:'overDueInterestTotal'
	             },            {
	             	label:'已产生总利息',
	             	prop:'allInterest'
	             },            {
	             	label:'已还利息',
	             	prop:'actualPayInterest'
	             },            {
	             	label:'待还利息',
	             	prop:'interestStayPay'
	             },            {
	             	label:'已还金额',
	             	prop:'payAmount'
	             },            {
	             	label:'待还金额',
	             	prop:'satyPayAmount'
	             },            {
	             	label:'还款次数',
	             	prop:'paymentTimes'
	             },            {
	             	label:'还款状态',
	             	prop:'isPayOff'//还款状态：是否还清 0:未还清 1:已还清 2:提前还清4:部分还款
	             },            {
	             	label:'还清时间',
	             	prop:'actualRepaymentTime'
	             }
	           ],
	           //请求列表参数
	           collectionParams:{
	           		keyWords:'',
	           		endTime:'',//结束时间
	           		startTime:'',//开始时间
	           		fil:'',//检索类型：1借款时间，2应还款时间，3还清时间
	           		is_pay_off:'',//还款状态:1:已还清,2:未还清
	           		
	           },
	           loading:false,
	           //列表信息
	           basetableinfo:[],
	           //新增还款
	           repaymentSituation:false,
	           //选择银行卡
				bomBack: [{
						back: '建设银行（1234）'
					},
					{
						back: '建设银行（1234）'
					},
					{
						back: '建设银行（1234）'
					}
				],
				//银行卡选中项
				bomBackRadio:'',
	    	}
		},
	    mounted(){
	    	this.overdueList();
	    	
	    },
	    methods:{
	    	//逾期列表
			overdueList() {
				this.loading = true;
				this.$api.kjOverdue(this.collectionParams).then(res => {}, response => {
					this.loading = false;
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
				}).catch(val => {
					//异常
				})
			},
			//页码
			topage(target) {
				this.collectionParams = Object.assign(target, this.collectionParams);
				this.overdueList();
			},
			//还款详情
			handleDetails() {
				this.$router.push('/collectionmanage/firtcollection/repaymentDetails')
			},
			//新增还款
			handleEdit(index, row) {
				this.repaymentSituation = true;
				console.log(index);
				console.log(row);
			}
	    }
	}
</script>

<style lang="less" scoped="scoped">
	.repaymentS {
		width: 100%;
		margin: auto;
		background: #FFFFFF;
		.bombTop {
			text-align: left;
			padding: 10px 10px;
			border-bottom: 1px solid #fff7f3;
			i {
				cursor: pointer;
				float: right;
				font-size: 25px;
			}
		}
		.bombCont {
			padding: 5px 15px;
		}
		.bombContTop {
			text-align: left;
			padding: 10px 0;
			div {
				display: inline-block;
				width: 150px;
			}
		}
		.bombBottom {
			text-align: left;
			padding: 0 15px;
			.bombBackTit {
				display: inline-block;
				padding: 10px 0;
			}
			.bombBack {
				div {
					margin-bottom: 10px;
					input {
						background: #FFFFFF;
						appearance: none;
						-webkit-appearance: none;
						border-style: none;
						outline: none;
					}
					.icon-xuanzhong {
						color: #30c9f3;
					}
					.checkedSpan {
						color: #30c9f3;
					}
					.backmor {
						display: inline-block;
						background: #30c9f3;
						color: #FFFFFF;
						line-height: 18px;
						padding: 0 8px;
						border-radius: 5px;
					}
				}
			}
			.bombPut {
				div {
					margin-bottom: 15px;
					.bombmoneyTit {
						width: 80px;
						display: inline-block;
						vertical-align: bottom;
					}
					.bombmoneyPrompt {
						display: block;
						padding-left: 80px;
						color: #868686;
						span {
							color: #f83030;
						}
					}
					input {
						width: 190px;
						border: none;
						border-bottom: 1px solid #333333;
						outline: none;
						font-size: 30px;
						color: #f27420;
					}
					textarea {
						width: 100%;
						outline: none;
						border: none;
						background: #fff7f3;
						height: 72px;
						margin-top: 15px;
					}
				}
				.bombRemark {
					vertical-align: top;
				}
			}
			.bombBtn {
				text-align: center;
				padding: 0px 0 20px;
			}
		}
	}
</style>