<template>
	<div class="mailbox">
		<!-- <div class="mailboxCont" v-if="authitem">
			<div class="mationCont">
				<ul>
					<li><span>邮箱认证的姓名与注册信息是否一致</span><span v-if="authitem.name_agreement==0">一致</span><span v-if="authitem.name_agreement==1">不一致</span><span v-if="!authitem.name_agreement&&authitem.name_agreement!=0"></span></li>   
					<li><span>平均月账单金额</span><span v-text="authitem.month_avge_bill_amount"></span></li>
					<li><span>信用卡还款日</span><span v-text="authitem.credit_card_payment_dates"></span></li>
					<li><span>利息总金额</span><span v-text="authitem.interest_total_amount"></span></li>
					<li><span>最大的账单月金额</span><span v-text="authitem.month_max_bill_amount"></span></li>
					<li><span>取现总金额</span><span v-text="authitem.enchashment_total_amount"></span></li>
					<li><span>取现总次数</span><span v-text="authitem.enchashment_total_num"></span></li>
					<li><span>信用卡张数</span><span v-text="authitem.credit_card_num"></span></li>
				</ul>
			</div>
			<div class="mailboxInfor">
				<div id="mailboxInfor"></div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
		<br/><br/>
	    <div v-show="isshow" v-loading='contantload'>
	    	<el-tabs v-model="activeName" @tab-click="handleClickBank">
				<el-tab-pane v-for="bankitem in roleList" :label="bankitem.bankname" :name="bankitem.bankname" :key="bankitem.bankname">
					<div>
						<el-tabs v-model="activeNameTwo" @tab-click="handleClickMounth" :tab-position="tabPosition">
							<el-tab-pane v-for="(monthitem,index) in bankitem.monthList" :label="monthitem.month" :name="monthitem.month" :key="monthitem.month">
								<div>
									<basetable :basetabletitle="basetabletitle" :basetableinfo="monthitem.basic"   :showopera='false' :mheight="500" :shownumber='true' :key='index'></basetable>
									<br />
									<!--<basetable :basetabletitle="bankflowtitle" :basetableinfo="monthitem.flowList"   :showopera='false' :shownumber='false' :mheight="500" :key='(++index)'></basetable>-->
									<origintable :originTableTitel = "bankflowtitle" :originTableInfo = "monthitem.flowList" :classname="classname"></origintable>
									
								</div>
							</el-tab-pane>
					    </el-tabs>
						
					</div>
				</el-tab-pane>
				<div style="border-top: 2px solid #dfe4ed; padding: 5px 0;" v-if="roleList">暂无数据</div>
		    </el-tabs>
	    </div>
	    <!--<el-dialog title="银行流水" :visible.sync="showdialog" width="1000px">
			<basetable :basetabletitle="bankflowtitle" :basetableinfo="bankflowtinfo" :showopera='false' :mheight='400'></basetable>
		</el-dialog>-->
	</div>
</template>

<script>
	import origintable from '@/components/origintable'
	import basetable from '@/components/basetable'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default{
		name:'mailbox',
		components:{basetable,origintable},
		props:{
           authitem:Object || Array
		},
		data(){
			return {
				contantload:false,
                infotxt:"查看原始数据",
				isshow:false,
				roleList:[
                  { name:'工商银行'},
                  { name:'信息摘要'},
                  { name:'信用卡记录'},
                  { name:'购房贷款记录'},
                  { name:'其他贷款记录'},
                  { name:'查询记录'},
                ],
                activeName:'',
                
                tabPosition:'left',
                roleListTwo:[
                  { name:'一月'},
                  { name:'二月'},
                  { name:'三月'},
                  { name:'四月'},
                  { name:'五月'},
                  { name:'六月'}
                ],
                activeNameTwo:'',
				showdialog:false,
                basetabletitle:[
                  {   label:'姓名',     prop:'userName'},  
                  {   label:'银行名称', prop:'bankName'},  
                  {   label:'银行简称', prop:'bankCode'},  
                  {   label:'银行卡号', prop:'cardNo'},  
                  {   label:'账单总金额', prop:'oweAmount'},  
                  {   label:'创建时间',   prop:'gmtCreate',width:160},  
                  {   label:'账单月',     prop:'billDate'},  
                  {   label:'还款日',     prop:'payDueDate',width:160},  
                  {   label:'邮箱账号',   prop:'email',width:160},  
                  {   label:'发件邮箱',   prop:'sendEmail',width:240},  
                  {   label:'发件区域',   prop:'sendIp',width:120} 
                ],
                baseinfo:[],
                bankflowtitle:[
                  {   label:'金额',     prop:'amt'},  
                  {   label:'创建时间', prop:'gmtCreate'},  
//                {   label:'修改时间', prop:'gmtModified'},  
                  {   label:'记账日期', prop:'posDate'},  
                  {   label:'交易日期', prop:'transDate'}, 
                  {   label:'交易名称', prop:'des'}
                ],
                bankflowtinfo:[],
                
                classname:'mbClassname',
			}
		},
		mounted(){
//			if(!isEmptyObject(this.authitem)){
//              this.mailboxInfor()
//			}else{
//				this.$watch('authitem',()=>{
//                  this.mailboxInfor()
//				})
//			}
		},
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
//	                this.$fksh.getoriginalmailbox({user_id:this.$route.params.user_id}).then(res=>{},response=>{
//	                	this.contantload = false
//		            	if(response.data.resultCode=='0'){
//		            		//基本信息
//		            		this.baseinfo = response.data.returnObj.mailPd.list
//		            		this.baseinfo.forEach(elem=>{
//		            			elem.basic.oweAmount = parseInt(elem.basic.oweAmount)/100
//		            		})	
//		            	}else{
//		            		this.contantload = false
//		            		this.$message.error('查询失败')
//		            	}                                
//			        }).catch(val=>{//捕获异常
//			        	this.contantload = false
//		                this.$message.error('服务器异常')
//			        })
					
					this.$api.mailBack({user_id:this.$route.params.user_id}).then(res=>{},response=>{
						this.contantload = false
						if(response.data.resultCode == 0){
							if(!(isEmptyObject(response.data.returnObj.mailPd)) && !(isEmptyObject(response.data.returnObj.mailPd.bankList))){
								//敏感字
								var fqreg = RegExp(/分期/);
								var lxreg = RegExp(/利息/);
								var njreg = RegExp(/滞纳金/);
								var wyjreg = RegExp(/违约金/);
								var yjreg = RegExp(/预借现金/);
								var sxfreg = RegExp(/手续费/);
								
								this.roleList = response.data.returnObj.mailPd.bankList;
								this.activeName = response.data.returnObj.mailPd.bankList[0].bankname;
								this.activeNameTwo = this.roleList[0].monthList[0].month;
								for(var i =0 ; i<this.roleList.length; i++){
									for(var j = 0;j<this.roleList[i].monthList.length;j++){
										var a = [];
										a.push(this.roleList[i].monthList[j].basic);
										this.roleList[i].monthList[j].basic = a;
										
									    this.roleList[i].monthList[j].flowList.forEach(elem=>{
									    	if(fqreg.test(elem.des) || lxreg.test(elem.des) || njreg.test(elem.des) || wyjreg.test(elem.des) || yjreg.test(elem.des) || sxfreg.test(elem.des)){
									    		this.$set(elem,'classname','warning-row');
									    	}
									    	
									    })
									}
								}
							}else{
								this.$message.warning(response.data.resultMsg)
							}
						}
					}).catch(val=>{//捕获异常
			        	this.contantload = false
		                this.$message.error('服务器异常')
						
					})
					
				}else{
					this.isshow  = false
					this.infotxt = '查看原始数据'
				}
			},
			//切换银行卡标签
			handleClickBank(tab, event){
				this.activeName = tab.name;
				for(var i = 0; i < this.roleList.length; i++){
					if(this.activeName == this.roleList[i].bankname){
						if(this.roleList[i].monthList[0]){
							this.activeNameTwo = this.roleList[i].monthList[0].month;
						}
					}
				}
			},
			//切换月份信息
			handleClickMounth(tab, event){
				this.activeNameTwo = tab.name;
			},
			
			todetails(row,index){//查看银行流水
				this.showdialog    = true
				this.bankflowtinfo =  this.baseinfo[index].flowList  		
			},
			mailboxInfor:function (){
			    let costtype = [
                    {value:this.authitem.credit_card_hotel_consumption_amount, name:'酒店'},
	                {value:this.authitem.credit_card_restaurant_consumption_amount, name:'餐饮'},
	                {value:this.authitem.credit_card_electric_appliance_consumption_amount, name:'电器'},
	                {value:this.authitem.credit_card_trip_consumption_amount, name:'旅游'},
	                {value:this.authitem.credit_card_supermarket_consumption_amount, name:'超市'},
	                {value:this.authitem.credit_card_train_consumption_amount, name:'铁路'},
				]
				let mailboxInfor = this.$echarts.init(document.getElementById('mailboxInfor'));
				let option1 = {
					title:{
						text:'信用卡消费类型分析',
						top:'0',
						x:'left',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
					color:['#f8e367','#e18197','#8abe6e','#93ccce','#7ababc'],
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        right: '0',
				        top:'30%',
				        itemGap:15,
				        data:['酒店','餐饮','电器','旅游','超市','铁路'],
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['45%', '70%'],
				            data:costtype,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['40%','60%']
				        }
				    ]
				}
				mailboxInfor.setOption(option1);
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-table .warning-row {
        background: oldlace;
        color: red;
    }
	.mailbox{
		margin: 45px 20px 55px;
	}
	.mailboxCont{
		margin-bottom: 55px;
		text-align: left;
	}
	.mationCont {
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
		vertical-align: middle;
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
				/*padding-left: 18px;*/
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
	.mailboxInfor{
		display: inline-block;
		width: 49%;
		vertical-align: middle;
		padding-left: 8%;
		box-sizing: border-box;
		div{
			width: 350px;
			height: 250px;
		}
	}
	.taginfoout{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.taginfo{
			margin: 0 10px 10px 0;
			position: static;
		}
	}
</style>