<template>
	<div class="accumulationfund">
	<!-- 	<div class="accumulaCont">
			<div class="mationCont" v-if="authitem">
				<ul>
					<li><span>是否为本人：</span><span v-if="authitem.identity_agreement==0">是</span><span v-if="authitem.identity_agreement==1">不是</span><span v-if="!authitem.identity_agreement&&authitem.identity_agreement!=0"></span></li>
					<li><span>最近一家单位工作时长（按年）：</span><span v-text="authitem.recently_work_year"></span></li>
					<li><span>公积金缴纳年数：</span><span v-text="authitem.payment_year"></span></li>
					<li><span>缴纳基数：</span><span  v-text="authitem.turn_over_base"></span></li>
					<li><span>总金额：</span><span  v-text="authitem.total_money"></span></li>
					<li><span>单位性质是否良好：</span><span v-if="authitem.unit_nature==0">良好</span><span v-if="authitem.unit_nature==1">一般</span><span v-if="authitem.unit_nature==3">较差</span><span v-if="!authitem.unit_nature&&authitem.unit_nature!=0"></span></li>
					<li><span>曾就职公司数目：</span><span v-text="authitem.inaugural_company_num"></span></li>
					<li><span>现工作单位名称：</span><span v-text="authitem.present_company"></span></li>
					<li><span>公积金所在地：</span><span v-text="authitem.gra_location"></span></li>
					<li><span>公积金所在地与户口所在地是否一致：</span><span v-if="authitem.gra_location_domicile==0">一致</span><span v-if="authitem.gra_location_domicile==1">不一致</span><span v-if="!authitem.gra_location_domicile&&authitem.gra_location_domicile!=0"></span></li>
					<li><span>是否有公积金贷款：</span><span v-if="authitem.gra_loan_status==0">有</span><span v-if="authitem.gra_loan_status==1">无</span><span v-if="!authitem.gra_loan_status&&authitem.gra_loan_status!=0"></span></li>
					<li><span>公积金所在地与注册时GPS地是否一致：</span><span v-if="authitem.gra_location_register==0">一致</span><span v-if="authitem.gra_location_register==1">不一致</span><span v-if="!authitem.gra_location_register&&authitem.gra_location_register!=0"></span></li>
					<li><span>贷款金额：</span><span v-text="authitem.loan_money"></span></li>
					<li><span>剩余金额：</span><span v-text="authitem.surplus_money"></span></li>
					<li><span>是否存在逾期：</span><span v-if="authitem.is_overdue==0">未逾期</span><span v-if="authitem.is_overdue==1">逾期</span><span v-if="!authitem.is_overdue&&authitem.is_overdue!=0"></span></li>
					<li><span>逾期次数：</span><span v-text="authitem.overdue_num"></span></li>
					<li><span>用户购房地址：</span><span v-text="authitem.purchase_address"></span></li>
					<li><span>公积金是否超前存入：</span><span v-if="authitem.is_over_payment==0">是</span><span v-if="authitem.is_over_payment==1">否</span><span v-if="!authitem.is_over_payment&&authitem.is_over_payment!=0"></span></li>
				</ul>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
	    <div v-show="isshow" class="isshowBox" v-loading="detailsLoading">
	    	<!--数立-->
		    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="provider == '数立'">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name" >
					<div v-show="item.name=='基本公积金'">
						
						<div class="academicInforBottom">
							<div class="">
								<span>真实姓名：</span><span>{{basicData.name}}</span>
							</div>
							<div class="">
								<span>身份证号：</span><span>{{basicData.idCard}}</span>
							</div>
							<div class="">
								<span>单位名称：</span><span>{{basicData.company}}</span>
							</div>
							<div class="">
								<span>个人公积金卡号：</span><span>{{basicData.bizNo}}</span>
							</div>
							<div class="">
								<span>个人公积金账号 ：</span><span>{{basicData.accountNo}}</span>
							</div>
							<div class="">
								<span>公司缴费比例：</span><span>{{basicData.companyDepositRate}}</span>
							</div>
							<div class="">
								<span>个人缴费比例：</span><span>{{basicData.personalDepositRate}}</span>
							</div>
							<div class="">
								<span>公司缴费金额：</span><span>{{basicData.companyDepositAmount}}</span>
							</div>
							<div class="">
								<span>个人缴费金额：</span><span>{{basicData.personalDepositAmount}}</span>
							</div>
							<div class="">
								<span>缴费基数：</span><span>{{basicData.depositBase}}</span>
							</div>
							<div class="">
								<span>最近缴费日期：</span><span>{{basicData.lastBizTime}}</span>
							</div>
							<div class="">
								<span>余额：</span><span>{{basicData.amount}}</span>
							</div>
							<div class="">
								<span>状态：</span><span>{{basicData.depositStatus}}</span>
							</div>
							<div class="">
								<span>地区：</span><span>{{basicData.region}}</span>
							</div>
							
						</div>
					</div>
					<div v-show="item.name=='还款信息'">
						<origintable :originTableTitel="basetabletitle" :originTableInfo="baseinfo"   ></origintable>
						<!--<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"   :showopera='false' :mheight="500"></basetable>-->
					</div>
					<div v-show="item.name=='存缴明细'">
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo"   ></origintable>
						<!--<basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo"   :showopera='false' :mheight="500"></basetable>-->
					</div>
				</el-tab-pane>
		    </el-tabs>
		    <!--黑格-->
		    <el-tabs v-model="activeNameBlack" @tab-click="handleClickBlack" v-if="provider == '黑格'" >
				<el-tab-pane v-for="item in roleListBlack" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='基本公积金'">
						<div class="academicInforBottom">
							<div class="">
								<span>真实姓名：</span><span>{{basicData.name}}</span>
							</div>
							<div class="">
								<span>身份证号：</span><span>{{basicData.idCard}}</span>
							</div>
							<div class="">
								<span>单位名称：</span><span>{{basicData.companyName}}</span>
							</div>
							<div class="">
								<span>个人公积金卡号：</span><span>{{basicData.personFundCard}}</span>
							</div>
							<div class="">
								<span>个人公积金账号 ：</span><span>{{basicData.personFundAccount}}</span>
							</div>
							<div class="">
								<span>公司缴费比例：</span><span>{{basicData.companyRatio}}</span>
							</div>
							<div class="">
								<span>个人缴费比例：</span><span>{{basicData.personRatio}}</span>
							</div>
							<div class="">
								<span>公司缴费金额(元)：</span><span>{{basicData.companyDepositAmount}}</span>
							</div>
							<div class="">
								<span>个人缴费金额(元)：</span><span>{{basicData.personDepositAmount}}</span>
							</div>
							<div class="">
								<span>缴费基数：</span><span>{{basicData.baseDeposit}}</span>
							</div>
							<div class="">
								<span>最近缴费日期：</span><span>{{basicData.lastDepositDate}}</span>
							</div>
							<div class="">
								<span>余额(元)：</span><span>{{basicData.balance}}</span>
							</div>
							<div class="">
								<span>状态：</span><span>{{basicData.status}}</span>
							</div>
							<div class="">
								<span>地区：</span><span>{{cityBlack}}</span>
							</div>
							
						</div>
					</div>
					<div v-show="item.name=='贷款信息'">

						<!-- <basetable :basetabletitle="basetabletitleBlack" :basetableinfo="baseinfoBlack"   :showopera='false' :mheight="500"></basetable> -->
						<origintable :originTableTitel="basetabletitleBlack" :originTableInfo="baseinfoBlack"   ></origintable>
					</div>
					<div v-show="item.name=='存缴明细'">

						<!-- <basetable :basetabletitle="mailertitleBlack" :basetableinfo="mailerinfoBlack"   ></basetable> -->
						<origintable :originTableTitel="mailertitleBlack" :originTableInfo="mailerinfoBlack"   ></origintable>
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
	import {isEmptyObject} from '@/utils/index'
	import {mapGetters} from 'vuex'
	export default {
		name: 'operator',
		props:{
           authitem:Object || Array
		},
		components: {
			cloudsubmit,
			basetable,
			origintable
		},
		data(){
			return{
				infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'基本公积金'},
                  { name:'还款信息'},
                  { name:'存缴明细'}
                ],
                activeName:'基本公积金',
                basetabletitle:[
                  {   label:'贷款账户', prop:'accountNo'},
                  {   label:'还款日期', prop:'gmtRepaymentDate'},
                  {   label:'摘要', prop:'digest'}
                ],
                baseinfo:[],
                mailertitle:[
                  {   label:'公积金流向	', prop:'fundFlow'},  
                  {   label:'流水明细', prop:'digest'},
                  {   label:'缴费公司', prop:'company'},
                  {   label:'账户余额(元)', prop:'amountBalance'},
                  {   label:'缴费金额(元)', prop:'amount'},
                  {   label:'流水时间', prop:'bizTime'}
                ],
                mailerinfo:[],
                provider:'',
                basicData:{},//基本公积金信息
                repaymentData:{},//还款信息
                
                //黑格
                roleListBlack:[
                  { name:'基本公积金'},
                  { name:'贷款信息'},
                  { name:'存缴明细'}
                ],
                activeNameBlack:'基本公积金',
                basetabletitleBlack:[
                  {   label:'贷款账户	', prop:'loanAccNo'},  
                  {   label:'贷款期限(月)',   prop:'loanLimit'},
                  {   label:'贷款状态',   prop:'status'}
                ],
                baseinfoBlack:[],
                mailertitleBlack:[
                  {   label:'公积金流向	', prop:'fundFlow'},  
                  {   label:'流水明细',    prop:'digest'},
                  {   label:'缴费公司',    prop:'companyName'},
                  {   label:'账户余额(元)',   prop:'balance'},
                  {   label:'缴费金额(元)',   prop:'amount'},
                  {   label:'流水时间',    prop:'operatorDate'}
                ],
                mailerinfoBlack:[],
                cityBlack:'',
                detailsLoading:'true',
			}
		},
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.detailsLoading = true;
	                this.$fksh.getoriginalaccumula({user_id:this.$route.params.user_id,type:sessionStorage.getItem('newlodType')}).then(res=>{},response=>{
						this.detailsLoading = false;
		            	if(response.data.resultCode=='0'){
			            	this.provider   = response.data.returnObj.provider;
			            	if(this.provider == '黑格'){
			            		this.basicData = response.data.returnObj.sr_h_bizContent.basicInfos;
			            		this.cityBlack = response.data.returnObj.sr_h_bizContent.city;
			            		this.mailerinfoBlack = response.data.returnObj.sr_h_bizContent.flows;
			            		for(var i = 0; i<this.mailerinfoBlack.length; i++){
			            			switch(this.mailerinfoBlack[i].fundFlow){
			            				case 'INCOME':
			            					this.mailerinfoBlack[i].fundFlow = '流入';
			            					break;
			            				case 'EXPENSE':
			            					this.mailerinfoBlack[i].fundFlow = '流出';
			            					break;
			            			}
			            		}
			            		this.baseinfoBlack = response.data.returnObj.sr_h_bizContent.loans;
			            	}else if(this.provider == '数立'){
			            		this.basicData = response.data.returnObj.sr_h_bizContent.basic_info_house_accumulation_fund_type_id[0];
//			            		this.basicData.companyDepositAmount = this.basicData.companyDepositAmount/100;
//			            		this.basicData.personalDepositAmount = this.basicData.personalDepositAmount/100;
//			            		this.basicData.amount = this.basicData.amount/100;
			            		this.mailerinfo = response.data.returnObj.sr_h_bizContent.detail_info_house_accumulation_fund_type_id || [];
			            		this.baseinfo   = response.data.returnObj.sr_h_bizContent.shuli_repayment_info_house_accumlation_fund || [];
			            		for(var i = 0; i<this.mailerinfo.length; i++){
			            			this.mailerinfo[i].amountBalance = this.mailerinfo[i].amountBalance/100;
			            			this.mailerinfo[i].amount = this.mailerinfo[i].amount/100;
			            			switch(this.mailerinfo[i].fundFlow){
			            				case 'INCOME':
			            					this.mailerinfo[i].fundFlow = '流入';
			            					break;
			            				case 'EXPENSE':
			            					this.mailerinfo[i].fundFlow = '流出';
			            					break;
			            			}
			            		}
			            	}
		            	}else{
		            		this.$message.error(response.data.resultMsg)
		            	}                                
			        }).catch(val=>{//捕获异常
						this.detailsLoading = true;
		                this.$message.error('服务器异常')
			        })
				}else{
					this.isshow  = false
					this.infotxt = '查看原始数据'
				}
			},
			handleClick(tab, event) {//切换当前项
	      	    this.activeName = tab.name
	        },
	        handleClickBlack(tab, event) {//切换当前项
	      	    this.activeNameBlack = tab.name
	        }
		}
	}
</script>
<style lang="less" scoped>
	.accumulationfund {
		margin: 45px 0 55px;
	}
	
	.accumulaCont {
		margin-bottom: 55px;
	}
	.mationCont {
		width: 55%;
		margin: auto;
		margin-top: 15px;
		ul {
			margin: 0;
			padding: 0;
			width: 100%;
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: felx-start;
			align-items: center;
			overflow: hidden;
			box-sizing: border-box;
			border-bottom: 1px solid #30c9f3;
			border-right:  1px solid #30c9f3;
			li {
				width: 55%;
				box-sizing: border-box;
				list-style: none;
				text-align: left;
				padding-left: 18px;
				border-top: 1px solid #30c9f3;
				border-left: 1px solid #30c9f3;
				height: 38px;
				span {
					line-height: 38px;
				}
				span.labelname {
					display: inline-block;
					color: #333;
					font-size: 16px;
				}
			}
			li:nth-child(20) {
				border-bottom: 1px solid #30c9f3;
			}
			li:last-child {
				border-right: none;
			}
			li:nth-child(2n+1) {
				background-color: #f0f9fc;
				width: 45%;
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
		width: 1000px;
		div{
			display: inline-block;
			width: 49%;
			padding:0 10px;
			line-height: 3.5;
			box-sizing: border-box;
		}
	}
</style>