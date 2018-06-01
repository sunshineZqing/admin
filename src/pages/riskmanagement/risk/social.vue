<template>
	<div class="social">
		<!-- <div class="socialCont" v-if="authitem">
			<div class="socialTitle">
				<div class=""><span>平均花费金额：</span><span v-text="authitem.avge_spent_amount"></span></div>
				<div class=""><span>是否患有特殊病：</span><span v-text="authitem.specific_disease"></span></div>
				<div class=""><span>在本单位上社保的用户数量：</span><span></span></div>
				<div class=""><span>维护社保上缴单位名称：</span><span v-text="authitem.avge_spent_amount">></span></div>
				<div class=""><span>统计各单位上缴人数：</span><span v-text="authitem.avge_spent_amount">></span></div>
			</div>
			<div class="socialInfor">
				<div class="mationCont">
					<ul>
						<li><span>是否为本人：</span><span v-if="authitem.avge_spent_amount==0">是</span><span v-if="authitem.avge_spent_amount==1">否</span><span v-if="!authitem.avge_spent_amount&&authitem.avge_spent_amount!=0"></span></li>
						<li><span>参保人手机号是否为注册手机：</span><span v-if="authitem.phone_agreement==0">是</span><span v-if="authitem.phone_agreement==1">否</span><span v-if="!authitem.phone_agreement&&authitem.phone_agreement!=0"></span></li>
						<li><span>省市：</span><span v-text="authitem.sra_province_city"></span></li>
						<li><span>是否患有特殊病：</span><span v-text="authitem.specific_disease"></span></li>
						<li><span>参加工作年数：</span><span v-text="authitem.attend_work_age_limit"></span></li>
						<li><span>离退休日期：</span><span v-text="authitem.retire_date"></span></li>
						<li><span>上缴保险种类数目：</span><span v-text="authitem.turned_over_insurance_num"></span></li>
						<li><span>社保上缴基数：</span><span v-text="authitem.turn_over_base"></span></li>
						<li><span>是否为最低标准：</span><span v-if="authitem.is_minimum_standard==0">是</span><span v-if="authitem.is_minimum_standard==1">否</span><span v-if="!authitem.is_minimum_standard&&authitem.is_minimum_standard!=0"></span></li>
						<li><span>申报月工资：</span><span v-text="authitem.monthly_wages"></span></li>
						<li><span>平均花费金额：</span><span v-text="authitem.avge_spent_amount"></span></li>
						<li><span>最近一次就医机构：</span><span v-text="authitem.lately_medical_institution"></span></li>
						<li><span>最近一次就医日期：</span><span v-text="authitem.lately_medical_date"></span></li>
						<li><span>最近一次共花费金额：</span><span v-text="authitem.lately_spent_amount"></span></li>
						<li><span>用户曾就职公司个数：</span><span v-text="authitem.inaugural_company_num"></span></li>
						<li><span>目前社保上缴状态是否正常：</span ><span v-if="authitem.sra_status==0">正常</span><span v-if="authitem.sra_status==1">异常</span><span v-if="!authitem.sra_status&&authitem.sra_status!=0"></span></li>
					</ul>
				</div>
			</div>
			<div class="socialAnalysis">
				<div class="socialAnalysisMoney">
					<div id="socialAnalysisMoney"></div>
				</div>
				<div class="socialAnalysisNumber">
					<div id="socialAnalysisNumber"></div>
				</div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="details">{{infotxt}}</el-button>
	    <div v-show="isshow" class="isshowBox" v-loading='contantload'>
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='个人信息'">
						<div class="academicInforBottom" v-if="inforData">
							<div class="">
								<span>真实姓名：</span><span>{{inforData.name}}</span>
							</div>
							<div class="">
								<span>身份证号：</span><span>{{inforData.identityCards}}</span>
							</div>
							<div class="">
								<span>户口所在地：</span><span>{{inforData.residenceAddr}}</span>
							</div>
							<div class="">
								<span>性别：</span><span>{{inforData.sex}}</span>
							</div>
							<div class="">
								<span>申报月平均工资收入(元) ：</span><span>{{inforData.income}}</span>
							</div>
							<div class="">
								<span>居住地(联系)地址：</span><span>{{inforData.contactAddress}}</span>
							</div>
							<div class="">
								<span>个人身份：</span><span>{{inforData.personalIdentity}}</span>
							</div>
							<div class="">
								<span>参加工作时间：</span><span>{{inforData.workDate}}</span>
							</div>
						</div>
					</div>
					<div v-show="item.name=='工伤保险缴费记录'">
						<!-- <basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo1"   :showopera='false' :mheight="500"></basetable> -->
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo1"   :showopera='false' ></origintable>

					</div>
					<div v-show="item.name=='医疗保险缴费记录'">
						<!-- <basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo2"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo2"   :showopera='false' ></origintable>
					</div>
					<div v-show="item.name=='生育保险缴费记录'">
						<!-- <basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo3"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo3"   :showopera='false' ></origintable>
					</div>
					<div v-show="item.name=='失业保险缴费记录'">
						<!-- <basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo4"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo4"   :showopera='false' ></origintable>
					</div>
					<div v-show="item.name=='养老保险缴费记录'">
						<!-- <basetable :basetabletitle="mailertitle" :basetableinfo="mailerinfo5"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="mailertitle" :originTableInfo="mailerinfo5"   :showopera='false' ></origintable>
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
	export default{
		name:'social',
		components:{cloudsubmit,basetable,origintable},
		props:{
           authitem:Object || Array
		},
		data(){
			return{
				contantload:false,
				infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'个人信息'},
                  { name:'工伤保险缴费记录'},
                  { name:'医疗保险缴费记录'},
                  { name:'生育保险缴费记录'},
                  { name:'失业保险缴费记录'},
                  { name:'养老保险缴费记录'},
                ],
                activeName:'个人信息',
                mailertitle:[
                  {   label:'月份	',   prop:'month'},  
                  {   label:'月数',   prop:'month_count'},
                  {   label:'公司名称',   prop:'company_name'},
                  {   label:'缴费基数',   prop:'base_number'},
                  {   label:'单位缴存',   prop:'monthly_company_income'},
                  {   label:'个人缴存',   prop:'monthly_personal_income'},
                  {   label:'缴费状态',   prop:'type'},
                  {   label:'单位缴存比例',   prop:'company_percentage'},
                  {   label:'个人缴存比例',   prop:'personal_percentage'},
                  {   label:'缴存日期',   prop:'last_pay_date'},
                ],
                mailerinfo1:[],
                mailerinfo2:[],
                mailerinfo3:[],
                mailerinfo4:[],
                mailerinfo5:[],
                inforData:{},//个人信息数据
                accidentInsurance:{},//工伤保险缴费记录
                medicalInsurance:{},//医疗保险缴费记录
                maternityInsurance:{},//生育保险缴费记录
                unemploymentInsurance:{},//失业保险缴费记录
			}
		},
		// mounted(){
		// 	if(!isEmptyObject(this.authitem)){
		// 		this.socialAnalysisMoney();
		// 		this.socialAnalysisNumber();
		// 	}else{
		// 		this.$watch('authitem',()=>{
		// 			this.socialAnalysisMoney();
		// 			this.socialAnalysisNumber();
		// 		})
		// 	}
		// },
		methods:{
			socialAnalysisMoney:function(){
				let socialAnalysisMoney = this.$echarts.init(document.getElementById('socialAnalysisMoney'));
				let costmoney = [
                    {value:this.authitem.total_spent_amount, name:'总花费'},
	                {value:this.authitem.personal_expenditure_amount, name:'个人支出'},
	                {value:this.authitem.overall_expenditure_amount, name:'统筹支出'}
				]
				let option1 = {
					title:{
						text:'花费金额分析',
						bottom:'0',
						x:'center',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
					color:['#e60012','#f86b6b','#f39a30'],
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['65%', '87%'],
				            data:costmoney,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['50%','45%']
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['0', '40%'],
				            data:costmoney,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['50%','45%']
				        }
				    ]
				}
				socialAnalysisMoney.setOption(option1);
			},
			socialAnalysisNumber:function(){
				let socialAnalysisNumber = this.$echarts.init(document.getElementById('socialAnalysisNumber'));
				let medicaltimes = [
                    {value:this.authitem.medical_total, name:'共就医次数'},
	                {value:this.authitem.hospitalize_num, name:'住院次数'},
	                {value:this.authitem.outpatient_department_num, name:'门诊次数'}
				]
				let option1 = {
					title:{
						text:'就医次数分析',
						bottom:'0',
						x:'center',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
					color:['#e60012','#f86b6b','#f39a30'],
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['65%', '87%'],
				            data:medicaltimes,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['50%','45%']
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['0', '40%'],
				            data:medicaltimes,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['50%','45%']
				        }
				    ]
				}
				socialAnalysisNumber.setOption(option1);
			},
			details(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
	                this.$fksh.getoriginalsocial({user_id:this.$route.params.user_id}).then(res=>{},response=>{
	                	this.contantload = false
		            	if(response.data.resultCode=='0'){
			            	console.log(response.data.returnObj);
			            	this.inforData = response.data.returnObj.pd.pd.personalInfo;//个人信息
			            	this.mailerinfo1 = response.data.returnObj.pd.pd.accidentInsurance;//工伤保险缴费记录
			            	this.mailerinfo2 = response.data.returnObj.pd.pd.medicalInsurance;//医疗保险缴费记录
			            	this.mailerinfo3 = response.data.returnObj.pd.pd.maternityInsurance;//生育保险缴费记录
			            	this.mailerinfo4 = response.data.returnObj.pd.pd.unemploymentInsurance;//失业保险缴费记录
			            	this.mailerinfo5 = response.data.returnObj.pd.pd.endowmentInsurance;//养老保险缴费记录
		            	}else{
		            		this.contantload = false
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
			        	this.contantload = false
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
	.social{
		margin: 45px 20px 55px;
	}
	.socialCont{
		text-align: left;
		margin-bottom: 50px;
	}
	.socialTitle{
		width: 100%;
		text-align: left;
		div{
			display: inline-block;
			span{
				display: inline-block;
			}
			span:last-child{
				width: 60px;
			}
		}
	}
	.socialInfor{
		display: inline-block;
		width: 56%;
		vertical-align: middle;
	}
	.mationCont {
		width: 100%;
		margin-top: 30px;
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
			border-right: 1px solid #30c9f3;
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
	.socialAnalysis{
		display: inline-flex;
		display: -webkit-inline-flex;
		flex-wrap:nowrap;
		justify-content: space-around;
		vertical-align: middle;
		width: 42%;
		margin-top: 30px;
		div{
			width: 180px;
			height: 230px;
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