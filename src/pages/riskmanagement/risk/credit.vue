<template>
	<div class="credit">
		<!-- div class="creditpic" v-if="authitem">
			<ul>
				<li><span class="labelname">身份证与姓名是否一致</span>:<span v-if="authitem.identity_agreement==0">一致</span><span v-if="authitem.identity_agreement==1">不一致</span><span v-if="!authitem.identity_agreement&&authitem.identity_agreement!=0"></span></li>
				<li><span class="labelname">婚姻状况</span>:
					<span v-if="authitem.marital_status==0">未婚</span>
					<span v-if="authitem.marital_status==1">已婚</span>
					<span v-if="authitem.marital_status==2">离婚</span>
					<span v-if="!authitem.marital_status&&authitem.marital_status!=0"></span>
				</li>
				<li><span class="labelname">信用卡现拥有数量</span>:<span v-text="authitem.credit_card_num"></span></li>
				<li><span class="labelname">信用卡逾期超过90天账户数</span>:<span v-text="authitem.credit_card_overdue90_num"></span></li>
				<li><span class="labelname">信用卡近一年发生过逾期的账户数</span>:<span></span></li>
				<li><span class="labelname">购房贷款超过90天的账户数</span>:<span v-text="authitem.home_loan_overdue90_num"></span></li>
				<li><span class="labelname">是否有房贷</span>:<span></span></li>
				<li><span class="labelname">是否有其他贷款</span>:<span></span></li>
				<li><span class="labelname">购房贷款近一年发生过逾期的账户数</span>:<span></span></li>
				<li><span class="labelname">其他贷款逾期超过90天账户数</span>:<span v-text="authitem.other_loan_overdue90_num"></span></li>
				<li><span class="labelname">其他贷款近一年发生过逾期的账户数</span>:<span></span></li>
				<li><span class="labelname">信用卡平均额度</span>:<span v-text="authitem.credit_card_avge_line"></span></li>
				<li><span class="labelname">几乎全额使用信用卡张数</span>:<span v-text="authitem.credit_card_filluse_num"></span></li>
			</ul>
			<div class="charts">
				<div class="credittitle"><span>信用卡拒批占比</span></div>
				<div id="chartcredit" :style="{width:'618px',height:'250px'}"><echart :echartsData="chartcredit"></echart></div>
			</div>
		</div>
		<div class="creditpic2">
			<div class="creditpicInfor">
				<el-table :data="creditpicInforData" border style="width: 100%">
					<el-table-column prop="usernumber" label="名称" width="180" align="center"></el-table-column>
					<el-table-column prop="xiny"  label="信用卡" width="180" align="center"></el-table-column>
					<el-table-column prop="home"  label="购房贷款" align="center"></el-table-column>
					<el-table-column prop="other" label="其他贷款" align="center"></el-table-column>
				</el-table>
				<div class="inforTableFooter">
					<div><span>认证时间：</span><span>2017-01-01</span></div>
					<div><span>总笔数：</span><span></span></div>
					<div><span>未还清总金额：</span><span></span></div>
				</div>
			</div>
			<div class="creditpicEcharts">
				<div class="credittitle"><span>查询记录</span></div>
				<div class="echartsBox">
					<div class="echartsLeft">
						<span v-on:click="onTab(1)" :class="{'echartsLeftCur':tabCur}" >近一年机构查询</span>
						<span v-on:click="onTab(2)" :class="{'echartsLeftCur':!tabCur}">近半年机构查询</span>
					</div>
					<div class="echartsCont">
						<div v-show="tabCur">
							<div id="echarts1"><echart :echartsData="echarts1"></echart></div>
						</div>
						<div v-show="!tabCur">
							<div id="echarts2"><echart :echartsData="echarts2"></echart></div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="details">{{infotxt}}</el-button>
	    <div v-show="isshow" class="isshowBox" v-loading="detailsLoading">
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='个人信息'">
						<div class="academicInforBottom" v-if="userInfor">
							<div class="">
								<span>真实姓名：</span><span>{{userInfor.name}}</span>
							</div>
							<div class="">
								<span>身份证号：</span><span>{{userInfor.cardNo}}</span>
							</div>
							<div class="">
								<span>查询时间：</span><span>{{setTime}}</span>
							</div>
							<div class="">
								<span>婚姻状况：</span><span>{{userInfor.isMarried}}</span>
							</div>
						</div>
						<div v-else>
							暂无信息
						</div>
					</div>
					<div v-show="item.name=='信息摘要'">
						<!-- <basetable :basetabletitle="mailertitle1" :basetableinfo="mailerinfo1"   :showopera='false' :mheight="500"></basetable> -->
						<origintable :originTableTitel="mailertitle1" :originTableInfo="mailerinfo1"   :showopera='false' ></origintable>
					</div>
					<div v-show="item.name=='信用卡记录'">
						<!-- <basetable :basetabletitle="mailertitle2" :basetableinfo="mailerinfo2"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle2" :originTableInfo="mailerinfo2"   :showopera='false' ></origintable>
					</div>
					<div v-show="item.name=='购房贷款记录'">
						<!-- <basetable :basetabletitle="mailertitle3" :basetableinfo="mailerinfo3"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle3" :originTableInfo="mailerinfo3"   :showopera='false' ></origintable>
						 
					</div>
					<div v-show="item.name=='其他贷款记录'">
						<!-- <basetable :basetabletitle="mailertitle4" :basetableinfo="mailerinfo4"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle4" :originTableInfo="mailerinfo4"   :showopera='false' ></origintable>
						 
					</div>
					<div v-show="item.name=='查询记录'">
						<!-- <basetable :basetabletitle="mailertitle5" :basetableinfo="mailerinfo5"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle5" :originTableInfo="mailerinfo5"   :showopera='false' ></origintable>
						 
					</div>
				</el-tab-pane>
		    </el-tabs>
	    </div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>

<script>
    import basetable from '@/components/basetable'
    import origintable from '@/components/origintable'
	import cloudsubmit from './cloudsubmit'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	// import echart from '@/components/charts/echart'
	export default {
		name: 'credit',
		components:{cloudsubmit,basetable,origintable},
		// components:{cloudsubmit,echart,basetable},
		props:{
           authitem:Object || Array
		},
		data() {
			return {
				tabCur:true,
				creditpicInforData: [{
					usernumber: '账户数量',
					xiny: '1',
					home: '2',
					other:'3'
				}, {
					usernumber: '未销户账户数量',
					xiny: '1',
					home: '2',
					other:'3'
				}, {
					usernumber: '发上过逾期的账户数',
					xiny: '1',
					home: '2',
					other:'3'
				}, {
					usernumber: '总额度',
					xiny: '1',
					home: '2',
					other:'3'
				}, {
					usernumber: '已使用总额度',
					xiny: '1',
					home: '2',
					other:'3'
				}, {
					usernumber: '月供',
					xiny: '1',
					home: '2',
					other:'3'
				}],
				
				//信用卡拒批占比
				chartcredit:{},
				//查询记录
				echarts1:{},
				echarts2:{},
				
				
				infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'个人信息'},
                  { name:'信息摘要'},
                  { name:'信用卡记录'},
                  { name:'购房贷款记录'},
                  { name:'其他贷款记录'},
                  { name:'查询记录'},
                ],
                activeName:'个人信息',
                mailertitle1:[
                  {   label:'名称	',   prop:'name'},  
                  {   label:'信用卡',   prop:'creditCard'},
                  {   label:'购房贷款',   prop:'purchaseLoan'},
                  {   label:'其他贷款',   prop:'otherLoans'}
                ],
                mailertitle2:[
                  {   label:'信息	',prop:'tet'},
                ],
                mailertitle3:[
                  {   label:'信息	',   prop:'tet'},
                ],
                mailertitle4:[
                  {   label:'时间	',    prop:'time'},  
                  {   label:'贷款机构',  prop:'name'},
                  {   label:'贷款金额',  prop:'money'},
                  {   label:'类型	',    prop:'type'},
                  {   label:'到期时间',prop:'endtime'},
                  {   label:'状态',    prop:'status'},
                  {   label:'余额',    prop:'balance'},
                  {   label:'备注',    prop:'content'},
                ],
                mailertitle5:[
                  {   label:'查询日期	',   prop:'queryDate'},  
                  {   label:'查询操作员',   prop:'queryMan'},
                  {   label:'查询原因',   prop:'queryReason'},
                ],
                userInfor:{},
                setTime:'',
                mailerinfo1:[],
                mailerinfo2:[],
                mailerinfo3:[],
                mailerinfo4:[],
                mailerinfo5:[],
				detailsLoading:true,
			}
		},
		// mounted() {
		// 	if(!isEmptyObject(this.authitem)){
	 // 			this.echart();
		// 	}else{
		// 		this.$watch('authitem',()=>{
	 // 				this.echart();
		// 		})
		// 	}

		// },
		methods: {
			echart(){
				//信用卡拒批占比
				this.chartcredit = {
					id:'chartcredit',
					echartstyle:{
						width:'618px',
						height:'250px'
					},
					echartsCont:{
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							axisLine: {
								lineStyle: {
									color: '#0d867c'
								}
							},
							boundaryGap: ['20%', '20%'],
							axisLabel: {
								formatter(value) {
									return value + '%'
								}
							}
						},
						yAxis: {
							type: 'category',
							axisLine: {
								lineStyle: {
									color: '#0d867c'
								}
							},
							data: [{
									value: '近一年信用卡拒批占比',
									textStyle: {
										color: "#333"
									}
								},
								{
									value: '近半年信用卡拒批占比',
									textStyle: {
										color: "#333"
									}
								}
							]
						},
						series: [{
							type: 'bar',
							barWidth: 24,
							itemStyle: {
								normal: {
									color(params) {
										let colorList = ['#919bcd', '#83d0f4']
										return colorList[params.dataIndex]
									}
								}
							},
							data: [this.authitem.nearly_half_year_credit_card_adopt_num,this.authitem.nearly_a_year_credit_card_adopt_num],
							label: {
								normal: {
									show: true,
									position: 'right',
									formatter: '{c}%'
								}
							}
						}]
					},
				},
				//查询记录
				this.echarts1 = {
					id:'echarts1',
					echartstyle:{
						width: '480px',
						height: '270px'
					},
					echartsCont:{
						color:['#f8e367','#e18197','#8abe6e','#93ccce','#7ababc'],
					    tooltip: {
					        trigger: 'item',
					        formatter: "{a} <br/>{b}: {c} ({d}%)"
					    },
					    legend: {
					        orient: 'vertical',
					       	right:'100px',
					        top:'center',
					        itemGap:15,
					        data:['北京','上海','深圳','广州','天津'],
					    },
					    series: [
					        {
					            name:'访问来源',
					            type:'pie',
					            radius: ['45%', '70%'],
					            data:[
					                {value:335, name:'北京'},
					                {value:310, name:'上海'},
					                {value:234, name:'深圳'},
					                {value:310, name:'广州'},
					                {value:234, name:'天津'}
					            ],
					            label:{
					            	normal:{
					            		show:false
					            	}
					            },
					            center:['30%','50%']
					        }
					    ]
					},
				}
				this.echarts2 = {
					id:'echarts2',
					echartstyle:{
						width: '480px',
						height: '270px'
					},
					echartsCont:{
						color:['#f8e367','#e18197','#8abe6e','#93ccce','#7ababc'],
					    tooltip: {
					        trigger: 'item',
					        formatter: "{a} <br/>{b}: {c} ({d}%)"
					    },
					    legend: {
					        orient: 'vertical',
					       	right:'100px',
					        top:'center',
					        itemGap:15,
					        data:['北京','上海','深圳','广州'],
					    },
					    series: [
					        {
					            name:'访问来源',
					            type:'pie',
					            radius: ['45%', '70%'],
					            data:[
					                {value:335, name:'北京'},
					                {value:310, name:'上海'},
					                {value:234, name:'深圳'},
					                {value:310, name:'广州'}
					            ],
					            label:{
					            	normal:{
					            		show:false
					            	}
					            },
					            center:['30%','50%']
					        }
					    ]
					},
				}
			},
			onTab(num) {
				if(num===1){
					this.tabCur=true;
				}else{
					this.tabCur=false;
				}
			},
			details(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据';
					this.detailsLoading = true;
	                this.$fksh.getoriginalcredit({user_id:this.$route.params.user_id}).then(res=>{},response=>{
						this.detailsLoading = false;
		            	if(response.data.resultCode=='0'){
			            	console.log(response.data.returnObj);
			            	
			            	if(response.data.returnObj.pd.json){
				            	this.userInfor = response.data.returnObj.pd.json.userInfo;
				            	if(response.data.returnObj.pd.json.reportInfo){
				            		this.setTime = response.data.returnObj.pd.json.reportInfo.queryTime || '';
				            	}
				            	if(response.data.returnObj.pd.json.credit){
					            	this.mailerinfo1 =[
					            		{
					            			name:'账户数量',
					            			creditCard:response.data.returnObj.pd.json.credit.creditCard.accountNumber,
					            			purchaseLoan:response.data.returnObj.pd.json.credit.purchaseLoan.accountNumber,
					            			otherLoans:response.data.returnObj.pd.json.credit.otherLoans.accountNumber,
					            		},
					            		{
					            			name:'未销户账户数量',
					            			creditCard:response.data.returnObj.pd.json.credit.creditCard.unSettlement,
					            			purchaseLoan:response.data.returnObj.pd.json.credit.purchaseLoan.unSettlement,
					            			otherLoans:response.data.returnObj.pd.json.credit.otherLoans.unSettlement,
					            		},
					            		{
					            			name:'发生过逾期的账户数',
					            			creditCard:response.data.returnObj.pd.json.credit.creditCard.delayAccountNumber,
					            			purchaseLoan:response.data.returnObj.pd.json.credit.purchaseLoan.delayAccountNumber,
					            			otherLoans:response.data.returnObj.pd.json.credit.otherLoans.delayAccountNumber,
					            		},
					            		{
					            			name:'逾期超过 90 天账户数',
					            			creditCard:response.data.returnObj.pd.json.credit.creditCard.delayOver90DayAccountNumber,
					            			purchaseLoan:response.data.returnObj.pd.json.credit.purchaseLoan.delayOver90DayAccountNumber,
					            			otherLoans:response.data.returnObj.pd.json.credit.otherLoans.delayOver90DayAccountNumber,
					            		},
					            	]; 
				            	}else{
				            		this.mailerinfo1 = [];
				            		console.log('123')
				            	}
	
								this.mailerinfo2 = response.data.returnObj.pd.json.creditCardInfo || [];
				            	for(let i = 0;i<this.mailerinfo2.length;i++){
									let texty = {};
									texty.tet = this.mailerinfo2[i];
									this.mailerinfo2[i] = texty;
				            	}
				            	this.mailerinfo3 = response.data.returnObj.pd.json.purchaseLoanInfo || [];
				            	for(let i = 0;i<this.mailerinfo3.length;i++){
									let texty = {};
									texty.tet = this.mailerinfo3[i];
									this.mailerinfo3[i] = texty;
				            	}
				            	this.mailerinfo4 = response.data.returnObj.pd.otherLoanInfo || [];
				            	this.mailerinfo5 = response.data.returnObj.pd.json.providerQueryRecord || [];
			            	}else{
		            			this.$message.error('暂无数据')
			            		
			            	}
			            	
		            	}else{
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
			        	console.log(val)
			        	this.detailsLoading = false;
		                this.$message.error('服务器异常')
			        })
				}else{
					this.isshow = false
					this.infotxt = '查看原始数据'
				}

			},
			handleClick(tab, event) {//切换当前项
	      	    this.activeName = tab.name
	        },
		}
	}
</script>

<style lang="less" scoped>
	.credit {
		width: 100%;
		padding-top: 53px;
		padding-bottom: 35px;
	}
	
	.creditpic {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: felx-start;
		align-items: strench;
		padding:0 15px;
	}
	
	ul {
		margin: 0;
		padding: 0;
		width: 50%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: felx-start;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #3bc3cd;
		border-right: 1px solid #3bc3cd;
		li {
			width: 50%;
			box-sizing: border-box;
			list-style: none;
			text-align: left;
			padding: 13px 0 13px 18px;
			border-top: 1px solid #3bc3cd;
			border-left: 1px solid #3bc3cd;
			span.labelname {
				color: #333;
				font-size: 16px;
			}
		}
		li:nth-last-child(2) {
			border-bottom: 1px solid #3bc3cd;
		}
		li:last-child {
			border-right: 1px solid #3bc3cd;
		}
		li:nth-child(2n+1) {
			background-color: #f0f9fc;
		}
	}
	
	.charts {
		margin-left: 54px;
		.credittitle {
			text-align: left;
			span {
				display: inline-block;
				color: #333;
				font-size: 14px;
				background-color: #f0f9fc;
				border: 1px solid #30c9f3;
				border-radius: 3px;
				line-height: 40px;
				padding:0 40px;
			}
		}
	}
	.creditpic2{
		text-align: left;
		padding:80px 15px 40px;
	}
	.creditpicInfor {
		display: inline-block;
		width: 52%;
	}
	.inforTableFooter{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		border: 1px solid #30c9f3;
		border-top: none;
		box-sizing: border-box;
		padding-left: 15px;
		div{
			display: inline-block;
			width: 100%;
			height: 67px;
			text-align: left;
			span{
				line-height: 67px;
			}
		}
	}
	.creditpicEcharts{
		display: inline-block;
		margin-left: 55px;
		vertical-align: top;
		.credittitle {
			text-align: left;
			span {
				display: inline-block;
				color: #333;
				font-size: 14px;
				background-color: #f0f9fc;
				border: 1px solid #30c9f3;
				border-radius: 3px;
				line-height: 40px;
				padding:0 40px;
			}
		}
		.echartsBox{
			margin-top: 30px;
			.echartsLeft{
				display: inline-block;
				text-align: right;
				width: 140px;
				margin-top:45px;
				span{
					/*width: 130px;*/
					display: block;
					line-height: 55px;
					text-align: center;
					padding: 0 ;
					font-size: 16px;
					cursor: pointer;
				}
				.echartsLeftCur{
					background: #19afde;
					box-shadow: 0 0 10px 3px #d1d6da;
					font-size: 18.67px;
					color: #FFFFFF;
				}			
			}
			.echartsCont{
				display: inline-block;
				border: 1px solid #30c9f3;
				vertical-align: top;
				width: 480px;
				height: 270px;
				margin-left: -5px;
				#echarts1{
					width: 480px;
					height: 270px;
				}
				#echarts2{
					width: 480px;
					height: 270px;
				}
			}
			
		}
	}
	.isshowBox{
		width: 90%;
		margin: auto;
	}
	.academicInforBottom{
		margin: 60px auto 30px;
		border: 2px solid #eee;
		text-align: left;
		width: 900PX;
		div{
			display: inline-block;
			width: 49%;
			padding:0 10px;
			line-height: 3.5;
			box-sizing: border-box;
		}
	}
</style>