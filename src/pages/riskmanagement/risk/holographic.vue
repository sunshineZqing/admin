<template>
	<div class="holographic" >
		<!-- v-if="authitem" -->
		<!-- <div class="phoneRisk" v-if="authitem.analysePd">
			<div class="phoneRiskHeader">
				<div class="">
					<span>手机号风险</span>
				</div>
				<div class="">
					<span>风险评分</span>
					<span v-text="authitem.analysePd.phone_risk_score"></span>
					<span v-if="authitem.analysePd.risk_level==1" class="low">低风险</span>
					<span v-if="authitem.analysePd.risk_level==2" class="high">中风险</span>
					<span v-if="authitem.analysePd.risk_level==3" class="higher">较高风险</span>
					<span v-if="authitem.analysePd.risk_level==4" class="highest">极高风险</span>
				</div>
			</div>
			<el-table :data="authitem.phoneRiskList" :show-header='false' :span-method="objectSpanMethod" border style="width: 100%;">
				<el-table-column width="" align='center'>
					<template slot-scope="scope">
						<span>手机号风险原因</span>
					</template>
				</el-table-column>
				<el-table-column prop="risk_identification" width="" align='center'></el-table-column>
				<el-table-column prop="risk_detailed_description" width="450" align='center'></el-table-column>
				<el-table-column width="" align='center'>
					<template slot-scope="scope">
						<span v-text="scope.row.risk_score"></span> |
						<span v-if="scope.row.risk_level==1" class="low">低风险</span>
						<span v-if="scope.row.risk_level==2" class="high">中风险</span>
						<span v-if="scope.row.risk_level==3" class="higher">较高风险</span>
						<span v-if="scope.row.risk_level==4" class="highest">极高风险</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="holographicFactor">
			<div class="holographicFactorHeader">
				<div class="">
					<span>全息因子</span>
				</div>
			</div>
			<el-table :data="authitem.connectionRiskList" :show-header='false' border style="width: 100%;">
				<el-table-column label="全息因子" width="" align='center'>
					<el-table-column prop="index_type" width="" align='center'></el-table-column>
					<el-table-column prop="analysis_result" width="450" align='center'></el-table-column>
					<el-table-column width="" align='center'>
						<template slot-scope="scope">
							<span v-text="scope.row.risk_score"></span> |
							<span v-if="scope.row.risk_level==1" class="low">低风险</span>
							<span v-if="scope.row.risk_level==2" class="high">中风险</span>
							<span v-if="scope.row.risk_level==3" class="higher">较高风险</span>
							<span v-if="scope.row.risk_level==4" class="highest">极高风险</span>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div> -->
		<!-- <br/> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
		<div v-show="isshow" class="origininfo" v-loading="detailsLoading">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='信息核实'">
						<div class="academicInforBottom" v-if="userInfor">
							<div class="">
								<span>真实姓名：</span><span>{{userInfor.name}}</span>
							</div>
							<div class="">
								<span>身份证号：</span><span>{{userInfor.idCard}}</span>
							</div>
							<div class="">
								<span>性别：</span><span>{{userInfor.sex}}</span>
							</div>
							<div class="">
								<span>姓名是否与运营商匹配：</span><span>{{userInfor.name_status}}</span>
							</div>
							<div class="">
								<span>身份证号是否与运营商匹配：</span><span>{{userInfor.card_status}}</span>
							</div>
							<div class="">
								<span>芝麻分：</span><span>{{userInforPd.ssc_score}}</span>
							</div>
						</div>
					</div>
					<div v-show="item.name=='手机号风险'">
						<table class="tab el-table__body-wrapper tab1" border="" cellspacing="0" cellpadding="0">
							<tr>
								<td colspan="2">手机号风险评估</td>
								<td>3.953</td>
								<td>低风险</td>
							</tr>
							<tr>
								<td>手机号风险原因</td>
								<td v-if="userInforPd.riskFactorName0">{{userInforPd.riskFactorName0}}</td>
								<td v-if="!userInforPd.riskFactorName0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
								<td>{{userInforPd.riskDescription0}}</td>
								<td v-if = "!userInforPd.riskMagnitude0"></td>
								<td v-if = "userInforPd.riskMagnitude0 < 3">{{userInforPd.riskMagnitude0}} | 低</td>
								<td v-if = "userInforPd.riskMagnitude0 >=3 && userInforPd.riskMagnitude0 < 6">{{userInforPd.riskMagnitude0}} | 较低</td>
								<td v-if = "userInforPd.riskMagnitude0 >6 && userInforPd.riskMagnitude0 < 8">{{userInforPd.riskMagnitude0}} | 较高</td>
								<td v-if = "userInforPd.riskMagnitude0 >= 8">{{userInforPd.riskMagnitude0}} | 高</td>
							</tr>
							<tr>
								<td>手机号风险原因</td>
								<td>{{userInforPd.riskFactorName1}}</td>
								<td>{{userInforPd.riskDescription1}}</td>
								<td v-if = "!userInforPd.riskMagnitude1"></td>
								<td v-if = "userInforPd.riskMagnitude1 < 3">{{userInforPd.riskMagnitude1}} | 低</td>
								<td v-if = "userInforPd.riskMagnitude1 >=3 && userInforPd.riskMagnitude1 < 6">{{userInforPd.riskMagnitude1}} | 较低</td>
								<td v-if = "userInforPd.riskMagnitude1 >6 && userInforPd.riskMagnitude1 < 8">{{userInforPd.riskMagnitude1}} | 较高</td>
								<td v-if = "userInforPd.riskMagnitude1 >= 8">{{userInforPd.riskMagnitude1}} | 高</td>
							</tr>
							<tr>
								<td>手机号风险原因</td>
								<td>{{userInforPd.riskFactorName2}}</td>
								<td>{{userInforPd.riskDescription2}}</td>
								<td v-if = "!userInforPd.riskMagnitude2"></td>
								<td v-if = "userInforPd.riskMagnitude2 < 3">{{userInforPd.riskMagnitude2}} | 低</td>
								<td v-if = "userInforPd.riskMagnitude2 >=3 && userInforPd.riskMagnitude2 < 6">{{userInforPd.riskMagnitude2}} | 较低</td>
								<td v-if = "userInforPd.riskMagnitude2 >6 && userInforPd.riskMagnitude2 < 8">{{userInforPd.riskMagnitude2}} | 较高</td>
								<td v-if = "userInforPd.riskMagnitude2 >= 8">{{userInforPd.riskMagnitude2}} | 高</td>
							</tr>
						</table>
					</div>
					<div v-show="item.name=='全息因子'">
						<table class="tab el-table__body-wrapper tab2" border="" >
							<tr>
								<td>人脉圈消费资产指数</td>
								<td>根据人脉圈的资产消费水平进行预测，包括一些细粒度分析，例如消费档次，消费场景等，也包括车、房等固定资产的预测分析。</td>
								<td>人脉圈近6个月资产水平，人脉圈平均信用历史水平，人脉圈平均消费水平，人脉圈平均消费档次，人脉圈平均信用卡数量，人脉圈平均还款时长，人脉圈平均信用卡使用比例等。</td>
								<td v-if = "userInforPd.consume_fund_index <50">{{userInforPd.consume_fund_index}} | 低</td>
								<td v-if = "userInforPd.consume_fund_index >=50 && userInforPd.consume_fund_index <60">{{userInforPd.consume_fund_index}} | 较低</td>
								<td v-if = "userInforPd.consume_fund_index >=60 && userInforPd.consume_fund_index <70">{{userInforPd.consume_fund_index}} | 中</td>
								<td v-if = "userInforPd.consume_fund_index >=70 && userInforPd.consume_fund_index <=75">{{userInforPd.consume_fund_index}} | 较高</td>
								<td v-if = "userInforPd.consume_fund_index >=75">{{userInforPd.consume_fund_index}} | 高</td>
							</tr>
							<tr>
								<td>人脉圈风险指数</td>
								<td>根据人脉圈身份标识信息（文本分析），金融机构的授权次数，逾期次数，征信水平，多类型风险等综合预测。</td>
								<td>人脉圈平均地址稳定天数，人脉圈平均社交影响力指数，人脉圈平均好友数量，人脉圈平均亲友数量，人脉圈平均同事数量，人脉圈平均同学数量，人脉圈平均社交关系强度等。</td>
								<td v-if = "userInforPd.indentity_risk_index <45">{{userInforPd.indentity_risk_index}} | 低</td>
								<td v-if = "userInforPd.indentity_risk_index >=45 && userInforPd.indentity_risk_index <65">{{userInforPd.indentity_risk_index}} | 较低</td>
								<td v-if = "userInforPd.indentity_risk_index >=65 && userInforPd.indentity_risk_index <85">{{userInforPd.indentity_risk_index}} | 中</td>
								<td v-if = "userInforPd.indentity_risk_index >=85 && userInforPd.indentity_risk_index <=95">{{userInforPd.indentity_risk_index}} | 较高</td>
								<td v-if = "userInforPd.indentity_risk_index >=95">{{userInforPd.indentity_risk_index}} | 高</td>
							</tr>
							<tr>
								<td>人脉圈社交稳定性指数</td>
								<td>根据人脉圈人员的变化，活动范围的变化，社交强度，其在社交群体的地位，以及地址稳定性等综合预测。</td>
								<td>通讯录昵称黑词概率，通讯录昵称白词概率，通讯录平均昵称黑词概率，通讯录平均昵称白词概率，通讯录平均标记次数等。</td>
								<td v-if = "userInforPd.social_stability_index <55">{{userInforPd.social_stability_index}} | 低</td>
								<td v-if = "userInforPd.social_stability_index >=55 && userInforPd.social_stability_index <60">{{userInforPd.social_stability_index}} | 较低</td>
								<td v-if = "userInforPd.social_stability_index >=60 && userInforPd.social_stability_index <65">{{userInforPd.social_stability_index}} | 中</td>
								<td v-if = "userInforPd.social_stability_index >=65 && userInforPd.social_stability_index <=70">{{userInforPd.social_stability_index}} | 较高</td>
								<td v-if = "userInforPd.social_stability_index >=70">{{userInforPd.social_stability_index}} | 高</td>
							</tr>
						</table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import basetable from '@/components/basetable'
	export default {
		name: 'holographic',
		components: {
			basetable
		},
		props: {
			authitem: Object || Array
		},
		data() {
			return {
				infotxt: "查看原始数据",
				isshow: false,
				roleList: [{
						name: '信息核实'
					},
					{
						name: '手机号风险'
					},
					{
						name: '全息因子'
					}
				],
				activeName: '信息核实',
				basetabletitle: [{
						label: '姓名',
						prop: 'addres_addrs'
					},
					{
						label: '身份证号',
						prop: 'ma_status'
					},
					{
						label: '性别',
						prop: 'ma_statu'
					},
					{
						label: '姓名与运营商是否匹配',
						prop: 'ma_stat'
					},
					{
						label: '身份证号与运营商是否匹配',
						prop: 'ma_sta'
					},
					{
						label: '芝麻分',
						prop: 'm'
					}
				],
				userInfor:{},
				userInforPd:{},
				detailsLoading:true,
			}
		},
		methods: {
			showdetails() { //原始数据
				if(!this.isshow) {
					this.isshow = true
					this.infotxt = '关闭原始数据';
					this.detailsLoading = true;
					this.$fksh.getoriginalallreport({user_id: this.$route.params.user_id}).then(res => {}, response => {//
						this.detailsLoading = false;
						if(response.data.resultCode == '0') {
							console.log(response.data.returnObj);
							this.userInfor = response.data.returnObj.quanxi;
							this.userInforPd = response.data.returnObj.pd;
							
						} else {
							this.$message.error('查询失败')
						}
					}).catch(val => { //捕获异常
						this.detailsLoading = false;
						this.$message.error('服务器异常')
					})
				} else {
					this.isshow = false;
					this.infotxt = '查看原始数据';
				}
			},
			handleClick(tab, event) { //切换当前项
				this.activeName = tab.name
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					if(rowIndex % this.authitem.phoneRiskList.length === 0) {
						return {
							rowspan: this.authitem.phoneRiskList.length,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			},
			objectSpanMethod2({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					if(rowIndex % this.authitem.connectionRiskList.length === 0) {
						return {
							rowspan: this.authitem.connectionRiskList.length,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.holographic {
		margin: 45px 10px 55px;
	}
	
	.phoneRisk {
		width: 80%;
		margin: auto;
	}
	
	.holographicFactor {
		width: 80%;
		margin: auto;
		table {
			width: 100%;
		}
	}
	
	.phoneRiskHeader {
		width: 100%;
		div {
			width: 100%;
			height: 45px;
			display: flex;
			display: -webkit-flex;
			flex-wrap: nowrap;
			justify-content: space-around;
			border: 1px solid #30c9f3;
			box-sizing: border-box;
			background: #f0f9fc;
			span {
				display: inline-block;
				width: 100%;
				line-height: 45px;
			}
		}
		div:last-child {
			background: none;
			height: 36px;
			border-top: 0;
			border-bottom: 0;
			span {
				line-height: 36px;
			}
			span:nth-child(2) {
				border-left: 1px solid #30c9f3;
				border-right: 1px solid #30c9f3;
			}
		}
	}
	
	.holographicFactor {
		margin-top: 25px;
	}
	
	.holographicFactorHeader {
		border: 1px solid #30c9f3;
		height: 45px;
		border-bottom: none;
		box-sizing: border-box;
		background: #f0f9fc;
		span {
			line-height: 45px;
		}
	}
	
	.low {
		color: #8BDDF7;
	}
	
	.high {
		color: #EE9934;
	}
	
	.higher {
		color: #E62315;
	}
	
	.highest {
		color: red;
	}
	
	.origininfo {
		width: 90%;
		margin: auto;
	}
	
	.taginfoout {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.taginfo {
			margin: 0 10px 10px 0;
		}
	}
	.tab{
		/*border: none;*/
		border-collapse:collapse;
		td{
			border:1px solid #30c9f3;
			color: #5a5e66;
			font-size: 14px;
			padding: 7px 0;
			/*border-right: 0px;*/
		}
	}
	.tab1{
		tr{
			td:last-child{
				width: 200px;
			}
		}
	}
	.tab2{
		tr{
			td:first-child{
				width: 180px;
			}
			td:last-child{
				width: 300px;
			}
		}
	}
	.academicInforBottom{
		margin: 60px auto 30px;
		border: 2px solid #eee;
		text-align: left;
		width: 98%;
		div{
			display: inline-block;
			width: 49%;
			padding:0 10px;
			line-height: 3.5;
			box-sizing: border-box;
		}
		
	}
</style>