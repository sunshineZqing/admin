<template>
	<div class="bankflow">
		<!-- <div class="bankflowCont">
			<div class="mationCont" v-if="authitem">
				<ul>
					<li><span>是否为工资卡</span><span v-if="authitem.is_salary_card==0">是</span><span v-if="authitem.is_salary_card==1">否</span><span v-if="!authitem.is_salary_card&&authitem.is_salary_card!=0"></span></li>
					<li><span>月工资(最大)</span><span v-text="authitem.salary_max"></span></li>
					<li><span>银行卡活期余额</span><span v-text="authitem.bank_current_balance"></span></li>
					<li><span>工资发放日</span><span v-text="authitem.salary_payment_date"></span></li>
					<li><span>银行卡定期余额</span><span v-text="authitem.bank_regular_balance"></span></li>
				</ul>
			</div>
			<div class="inOut">
				<div class="inOutTotal">
					<div id="inOutTotal"><echart :echartsData="inOutTotalData"></echart></div>
				</div>
				<div class="specialIn">
					<div id="specialIn"><echart :echartsData="specialInData"></echart></div>
				</div>
				<div class="specialOut">
					<div id="specialOut"><echart :echartsData="specialOutData"></echart></div>
				</div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
	    <div v-show="isshow" class="origininfo" v-loading="detailsLoading">
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='基本信息'">
						<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"   :showopera='false' ></basetable>
					</div>
					<div v-show="item.name=='流水信息'">
						<div class="taginfoout">
							<el-tag class="taginfo1" type="danger"><span>流入总额：</span>{{income}}</el-tag>
							<el-tag class="taginfo1" type="danger"><span>流出总额：</span>{{expense}}</el-tag>
						</div>
						<origintable :originTableTitel = "watertitle" :originTableInfo = "waterinfo" :classname="classname"></origintable>
						
						<!--<basetable :basetabletitle="watertitle" :basetableinfo="waterinfo"   :showopera='false'></basetable>
						<basepage  :sunmary="converinfopagesize" v-on:topage="topage"></basepage>-->
					</div>
				</el-tab-pane>
		    </el-tabs>
	    </div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>

<script>
	import cloudsubmit from './cloudsubmit'
	import origintable from '@/components/origintable'
	import basetable from '@/components/basetable'
	import basepage  from '@/components/basepage'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	// import echart from '@/components/charts/echart'
	export default{
		name:'bankflow',
		components:{cloudsubmit,basetable,basepage,origintable},
		props:{
           authitem:Object || Array
		},
		data(){
			return{
				inOutTotalData:{},
				specialInData:{},
				specialOutData:{},
				infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'基本信息'},
                  { name:'流水信息'}
                ],
                activeName:'基本信息',
                basetabletitle:[
                  {   label:'姓名',     prop:'name'},  
                  {   label:'用户账号', prop:'userName',width:180},  
                  {   label:'银行卡号', prop:'bankAccountNo',width:180},  
                  {   label:'银行缩写', prop:'bankId'},  
                  {   label:'账户余额', prop:'accountBalance'},  
                  {   label:'活期余额', prop:'currentAccountBalance'},  
                  {   label:'定期余额', prop:'fixedAccountBalance'},  
                  {   label:'创建时间', prop:'gmtCreate',width:160},
                  {   label:'修改时间', prop:'gmtModified',width:160} 
                ],
                baseinfo:[],
                watertitle:[
                  {   label:'银行缩写', prop:'bankId'},  
                  {   label:'交易类型', prop:'tradeType'},  
                  {   label:'交易金额', prop:'tradeAmount'},  
                  {   label:'账户余额', prop:'accountBalance'},
                  {   label:'交易地址', prop:'tradeAddress'},
                  {   label:'资金流向', prop:'fundFlow'},
                  {   label:'对方名称', prop:'targetUsername'},
                  {   label:'交易描述', prop:'tradeDescription'},
                  {   label:'交易时间', prop:'tradeTime',width:160}
                ],
                waterinfototal:[],
                waterinfo:[],
                income:0,//流入总额
                expense:0,//流出总额
                detailsLoading:true,
                converinfopagesize:0,
                
                classname:'bkClassname'
			}
		},
		// watch:{
  //           authitem:()=>{
  //           	if(!isEmptyObject(this.authitem)){
		// 			this.inOutTotal();
		// 			this.specialIn();
		// 			this.specialOut();
		// 		}
  //           }
		// },
		// mounted(){
		// 	if(!isEmptyObject(this.authitem)){
	 // 			this.inOutTotal();
		// 		this.specialIn();
		// 		this.specialOut();
		// 	}else{
		// 		this.$watch('authitem',()=>{
		//  			this.inOutTotal();
		// 			this.specialIn();
		// 			this.specialOut();
		// 		})
		// 	}
		// },
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据';
					this.detailsLoading = true;
	                this.$fksh.getoriginalbank({user_id:this.$route.params.user_id,type:sessionStorage.getItem('newlodType')}).then(res=>{},response=>{
						this.detailsLoading = false;
		            	if(response.data.resultCode=='0'){
			            	//基本信息
			            	if(response.data.returnObj.bankPd&&response.data.returnObj.bankPd.basicInfo){
                                this.baseinfo = response.data.returnObj.bankPd.basicInfo
			            	}
			            	if(response.data.returnObj.bankPd&&response.data.returnObj.bankPd.flowPd){
			            		this.converinfopagesize = response.data.returnObj.bankPd.flowPd.flowInfo.length;
                                this.waterinfototal = response.data.returnObj.bankPd.flowPd.flowInfo;
//                              this.waterinfo = response.data.returnObj.bankPd.flowPd.flowInfo.slice(0,9);
                                this.waterinfo = response.data.returnObj.bankPd.flowPd.flowInfo;
                                this.income    = response.data.returnObj.bankPd.flowPd.income
                                this.expense   = response.data.returnObj.bankPd.flowPd.expense
                                
                                this.waterinfototal.forEach(elem=>{
                                	elem.tradeAmount    = parseFloat(parseInt(elem.tradeAmount)/100);
                                	elem.accountBalance = parseInt(elem.accountBalance)/100;
                                	var lxreg = RegExp(/工资/);
                                	console.log(lxreg.test(elem.tradeDescription));
									if(lxreg.test(elem.tradeDescription)){
                                       this.$set(elem,'classname','warning-row');
			            		    }
                                    switch(elem.fundFlow){
                                       case 'INCOME': elem.fundFlow  = '流入';break;
                                       case 'EXPENSE': elem.fundFlow = '流出';break;
			            		    }
                                })
			            	}
		            	}else{
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
						this.detailsLoading = false;
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
	        topage(target){//跳页 通话详情
	        	this.waterinfo = this.slicepage(this.waterinfototal,target)
		    },
		    slicepage(alldata,target){//分页
                 return alldata.slice((target.currentPage-1)*target.showCount,target.currentPage*target.showCount-1)
		    },
			inOutTotal:function (){ //近半年
				let sumflow  = [
                    {value:this.authitem.nearly_helf_year_inflow_total, name:'银行卡流入'},
	                {value:this.authitem.nearly_helf_year_outflow_total, name:'银行卡流出'}
				]
				this.inOutTotalData = {
					id:'inOutTotal',
					echartstyle:{
						width: '170px',
						height: '200px'
					},
					echartsCont:{
						title:{
							text:'近半年总流入流出比例',
							bottom:'0',
							x:'center',
							textStyle:{
								fontSize:'16',
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
					            data:sumflow,
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
					            data:sumflow,
					            label:{
					            	normal:{
					            		show:false
					            	}
					            },
					            center:['50%','45%']
					        }
					    ]
					},
				}
			},
			specialIn:function (){
				let specialflowIn  = [
                    {value:this.authitem.nearly_helf_year_salary_inflow_total, name:'工资流入'},
	                {value:this.authitem.special_categories_inflow_total, name:'特殊类别流入'},
	                {value:this.authitem.credit_card_cash_total_money, name:'套现'},
				]
				this.specialInData = {
					id:'specialIn',
					echartstyle:{
						width: '170px',
						height: '200px'
					},
					echartsCont:{
						title:{
							text:'特殊流入比例',
							top:'bottom',
							x:'center',
							textStyle:{
								fontSize:'16',
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
					            data:specialflowIn,
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
					            data:specialflowIn,
					            label:{
					            	normal:{
					            		show:false
					            	}
					            },
					            center:['50%','45%']
					        }
					    ]
					},
				}
			},
			specialOut:function (){
				let specialflowOut  = [
                    {value:this.authitem.credit_card_repayment_money, name:'信用卡还款'},
	                {value:this.authitem.third_party_repayment_money, name:'第三方支付公司还款'},
	                {value:this.authitem.alipay_repayment_money, name:'支付宝还款'},
				]
				this.specialOutData = {
					id:'specialOut',
					echartstyle:{
						width: '170px',
						height: '200px'
					},
					echartsCont:{
						title:{
							text:'特殊流出比例',
							top:'bottom',
							x:'center',
							textStyle:{
								fontSize:'16',
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
					            data:specialflowOut,
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
					            data:specialflowOut,
					            label:{
					            	normal:{
					            		show:false
					            	}
					            },
					            center:['50%','45%']
					        }
					    ]
					},
				}
			}
		},
		
		
	}
</script>

<style lang="less" scoped>
	.el-table .warning-row {
        background: oldlace;
        color: red;
    }

  	.el-table .success-row {
    	background: #f0f9eb;
  	}
	.bankflow{
		padding: 45px 0 55px;
	}
	.bankflowCont{
		margin-bottom: 55px;
	}
	.mationCont {
		display: inline-block;
		width: 35%;
		box-sizing: border-box;
		vertical-align: top;
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
			li{
				width: 100%;
				box-sizing: border-box;
				list-style: none;
				text-align: left;
				padding-left: 18px;
				height: 38px;
				span{
					width: 50%;
					height: 38px;
					vertical-align: top;
					display: inline-block;
					box-sizing: border-box;
					text-align: center;
					line-height: 38px;
					border-top: 1px solid #30c9f3;
					border-left: 1px solid #30c9f3;
				}
				span.labelname {
					display: inline-block;
					color: #333;
					font-size: 16px;
					
				}
				span:nth-child(20) {
					border-bottom: 1px solid #30c9f3;
				}
				span:last-child {
					border-right:1px solid #30c9f3;
				}
				span:nth-child(2n+1) {
					background-color: #f0f9fc;
				}
			}
			li:last-child{
				span{
					border-bottom:1px solid #30c9f3;
				}
			}
		}
	}
	.inOut{
		display: inline-flex;
		display: -webkit-inline-flex;
		flex-wrap:nowrap;
		justify-content:space-around;
		width: 64%;
		vertical-align: top;
		padding: 0 90px;
		box-sizing: border-box;
		.inOutTotal,.specialOut,.specialIn{
			display: inline-block;
			/*width: 30%;*/
			div{
				width: 170px;
				height: 200px;
			}
		}
	}
	.origininfo{
		width: 90%;
		margin:  auto;
	}
	.taginfoout{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.taginfo1{
			position: static;
			margin: 0 10px 10px 0;
		}
	}
</style>