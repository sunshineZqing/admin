<template>
	<div class="customerservice">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keyWords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="collectionParams.fil" placeholder="请选择借款类型">
					<el-option label="借款时间" value="1"></el-option>
					<el-option label="应还款时间" value="2"></el-option>
					<el-option label="还清时间" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-button type="primary" size="medium" @click="collection">查询</el-button>
		
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo'  :loading="loading" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="电话催收详情" placement="top">
					<el-button type="text" icon='el-icon-tickets' v-on:click="callDetails(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="电话催收" placement="top">
					<el-button type="text" icon='iconfont icon-09dianhua' v-on:click="calling(scope.scope.row)"></el-button>
				</el-tooltip>
				<!--<el-tooltip class="item" effect="dark" content="即将逾期客服电话" >
					<el-button type="text" icon='iconfont icon-cuicushouhuotixing' v-on:click="soonOverdue(scope.scope.row)"></el-button>
				</el-tooltip>-->
				<br/>
				<!--<el-tooltip class="item" effect="dark" content="逾期后客服电话" placement="top">
					<el-button type="text" icon='iconfont icon-kefu' v-on:click="overdueAfter(scope.scope.row)"></el-button>
				</el-tooltip>-->
				
				<el-tooltip class="item" effect="dark" content="短信" placement="top">
					<el-button type="text" class='iconfont icon-duanxinfasong' v-on:click="msgShowBox(scope.scope.$index, scope.scope.row)"></el-button>
				</el-tooltip>
				<!--转交接口与催收列表不同-->
				<el-tooltip class="item" effect="dark" content="转交" placement="top">
					<el-button type="text" icon='iconfont icon-fenxiang2' v-on:click="transfer(scope.scope.row)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary='pagesize' v-on:topage="topage" :currentp='currentp'></basepage>
		<el-dialog title="发送短信：" :visible.sync="msgShow" width="600px" align="left">
			<span>{{msgShowtext}}</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="msgShow = false" size="medium">取消</el-button>
			    <el-button type="primary" @click="hairMsg" size="medium">发送</el-button>
			</span>
		</el-dialog>
		<el-dialog title="电话催收：" :visible.sync="callBox" width="600px" align="left">
			<el-form ref="formData" :model="formData" label-width="100px" align="left" width="500px">
				<el-form-item label="是否接通：">
					<el-select v-model="formData.flag" placeholder="请选择">
						<el-option label="已接通" value="1"></el-option>
						<el-option label="未接通" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="反馈情况：" >
					<el-input type="textarea" v-model="formData.detail" style=" width：500px"></el-input>
				</el-form-item>
				<!--<el-form-item>
					<el-button type="primary" @click="callSubmit()"  size="medium">提交</el-button>
					<el-button  size="medium">取消</el-button>
				</el-form-item>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="callBox = false" size="medium">取消</el-button>
			    <el-button type="primary" @click="callingSubmit" size="medium" :loading = "callingLoading">提交</el-button>
			</span>
		</el-dialog>
		<el-dialog title="转交" :visible.sync="transferBox" width="600px">
			<el-form label-width="100px" align="left">
				<el-form-item label="转交到：">
					<el-input type="input" placeholder="一级催收" style=" width：300px" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="转交原因：" >
					<el-input type="textarea" v-model="transferParams.ccstr_transfer_reason" style=" width：500px"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer transfer" align="center">
		    	<el-button  @click="transferBox = false"  size="medium">取 消</el-button>
		    	<el-button @click="onSubmit()" type="primary" size="medium">确 定</el-button>
		    </span>
        </el-dialog>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default{
		name:'customerservice',
		components:{basetable,basepage},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				switch(to.name) {
					case '快借逾期':
						vm.overdueTerm.action = '1'
						vm.msgShowParams.type = 31
						break;
					case '分期逾期':
						vm.overdueTerm.action = '2'
						vm.msgShowParams.type = 41
						break;
				}
				vm.collection();
			})
		},
		data () {
			return{
				overdueTerm:{
					action:'',
				},//逾期类型
				basetabletitle:[],
				kjBasetabletitle:[
	             {
	             	label:'借款ID	',
	             	prop:'borrowId'
	             },
	             {
	             	label:'用户ID	',
	             	prop:'userId'
	             }, 
	             {
	             	label:'用户姓名',
	             	prop:'name'
	             },
	             {
	             	label:'手机号',
	             	prop:'phone',
	             	width:'160px'
	             },
	             {
	             	label:'用户身份证号',
	             	prop:'cert_card',
	             	width:'160px'
	             },
	             {
	             	label:'订单号',
	             	prop:'orderId',
	             	width:'190px'
	             },
	             {
	             	label:'流水号',
	             	prop:'wr_trade_sn',
	             	width:'160px'
	             },
	             {
	             	label:'初审人员',
	             	prop:'firstUsername',
	             },
	             {
	             	label:'复审人员',
	             	prop:'secondUsername',
	             },
	             {
	             	label:'借款日期',
	             	prop:'borrowTime',
	             	width:'160px'
	             }, 
	             {
	             	label:'应还款日期',
	             	prop:'repayTime',
	             	width:'160px'
	             }, 
	             {
	             	label:'逾期天数',
	             	prop:'overDays'
	             },
	             {
	             	label:'借款金额',
	             	prop:'borrowAmount',
	             }, 
	             {
	             	label:'利息',
	             	prop:'payInterest'
	             }, 
	             {
	             	label:'逾期利息',
	             	prop:'overDueInterestStayPay'
	             },
//	             {
//	             	label:'已产生总利息',
//	             	prop:'allInterest'
//	             }, 
//	             {
//	             	label:'已还利息',
//	             	prop:'actualPayInterest'
//	             },
//	             {
//	             	label:'待还利息',
//	             	prop:'interestStayPay'
//	             },
//	             {
//	             	label:'已还金额',
//	             	prop:'payAmount'
//	             },
	             {
	             	label:'待还金额',
	             	prop:'stayPayAmountMoney'
	             }, 
	             {
	             	label:'客服催收人员Id',
	             	prop:'css_userId',
	             	width:'140'
	             	
	             }, 
	             {
	             	label:'优惠券名称',
	             	prop:'cuName'
	             }, 
//	             {
//	             	label:'还款次数',
//	             	prop:'paymentTimes'
//	             }, 
//	             {
//	             	label:'还款状态',
//	             	prop:'isPayOff'
//	             },
//	             {
//	             	label:'还清时间',
//	             	prop:'actualRepaymentTime',
//	             	width:'160px'
//	             }
	           ],
	            fqBasetabletitle:[
	             {
	             	label:'借款ID	',
	             	prop:'stageDetailId',
	             	width:'160px'
	             },
	             {
	             	label:'用户Id',
	             	prop:'userId'
	             },
	             {
	             	label:'用户姓名',
	             	prop:'name'
	             },
	             {
	             	label:'手机号',
	             	prop:'phone',
	             	width:'160px'
	             },
	             {
	             	label:'性别',
	             	prop:'gender',
	             },
	             {
	             	label:'身份证号码',
	             	prop:'cert_card',
	             	width:'180px'
	             },
	             {
	             	label:'订单号',
	             	prop:'orderId',
	             	width:'160px'
	             },
	             {
	             	label:'流水号',
	             	prop:'wr_trade_sn',
	             	width:'180'
	             },
	             {
	             	label:'初审人员',
	             	prop:'firstUsername',
	             },
	             {
	             	label:'复审人员',
	             	prop:'secondUsername',
	             },
	             {
	             	label:'借款日期',
	             	prop:'borrow_time',
	             	width:'160px'
	             },
	             {
	             	label:'应还款时间',
	             	prop:'repay_time',
	             	width:'160px'
	             },
	             {
	             	label:'借款金额',
	             	prop:'amount_count'
	             },
	             {
	             	label:'月供本金',
	             	prop:'yue_gong_amount'
	             },
	              {
	             	label:'利息',
	             	prop:'interest'
	             },
	              {
	             	label:'逾期利息',
	             	prop:'over_due_interest_total'
	             },
	              {
	             	label:'逾期天数',
	             	prop:'overDays'
	             },
//	             {
//	             	label:'总期数',
//	             	prop:'qishu'
//	             },
//	             {
//	             	label:'当前期数',
//	             	prop:'qishu_no'
//	             },
//	             {
//	             	label:'还款截止时间',
//	             	prop:'repay_time',
//	             	width:'160px'
//	             },
//	             {
//	             	label:'已产生的逾期利息',
//	             	prop:'over_due_interest_total'
//	             },
//	             {
//	             	label:'待还剩余利息',
//	             	prop:'interest_stay_pay'
//	             },
//	             {
//	             	label:'逾期待还利息',
//	             	prop:'over_due_interest_stay_pay'
//	             },
//	             {
//	             	label:'待还剩余本金',
//	             	prop:'yue_gong_amount_stay_pay'
//	             },
	             {
	             	label:'待还总金额',
	             	prop:'stayPayAmountMoney'
	             },
	             {
	             	label:'优惠券名称',
	             	prop:'cuName'
	             },
	             {
	             	label:'客服催收人员Id',
	             	prop:'css_userId',
	             	width:'140'
	             },
	             
	           ],
	           pagesize:0,//总条数
	           currentp:1,
	           //请求列表参数
	           collectionParams:{
	           		startTime:'',
	           		endTime:'',
	           },
	           loading:true,
	           //列表信息
	           basetableinfo:[],
	           //选择日期
	           changeTime:[],
	           msgShow: false, //短信弹框
	           msgShowParams:{
	           	 type:'',
	           },//发送短信参数
	           msgShowtext:'',
	           transferBox:false,//转交弹框
	           transferParams:{},//转交请求参数
	           callBox:false,//打电话催收弹框
	           formData:{},//打电话表单参数
	           callingLoading:false,//提交表单按钮
	           
	    	}
		},
		computed:{
			...mapGetters(['searchlist'])
		},
	    created(){
	    	let ress = this.searchlist.filter(elem =>{
    			return elem.lable === this.$route.name
    		})
    		if(ress.length !=0){
    			this.collectionParams = ress[0].value;
    			this.currentp = parseInt(this.collectionParams.currentPage)  || 1;
    		}
    		if(this.overdueTerm.action=="1"){
	    		this.basetabletitle = this.kjBasetabletitle;
	    		this.KJserviceCollection();
	    	}else if(this.overdueTerm.action=="2"){
	    		this.basetabletitle = this.fqBasetabletitle;
	    		this.FQserviceCollection();
	    	}
	    },
	    methods:{
	    	collection(){
	    		let ress = this.searchlist.filter(elem =>{
	    			return elem.lable === this.$route.name
	    		})
	    		if(ress.length !=0){
	    			this.collectionParams = ress[0].value;
	    			this.currentp = parseInt(this.collectionParams.currentPage)  || 1;
	    		}
	    		if(this.overdueTerm.action==1){
		    		this.KJserviceCollection();
		    	}else{
		    		this.FQserviceCollection();
		    	}
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
	    	//快借逾期列表
	    	KJserviceCollection(){
	    		this.basetabletitle = this.kjBasetabletitle;
	    		this.loading=true;
	    		this.$api.callingkjoverdue(this.collectionParams).then(res => {}, response => {
	    			let params = {lable:this.$route.name,value:this.collectionParams};
	    			this.$store.dispatch('SAVECONDITION',params);
	    			
	    			this.loading = false;
	    			console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.totalCount;
					for(let i = 0;i<this.basetableinfo.length;i++){
						
						switch(this.basetableinfo[i].gender){
							case 0:
								this.basetableinfo[i].gender = '男';
								break;
							case 1:
								this.basetableinfo[i].gender = '女';
								break;
						}
						
					}
				}).catch(val => {
					//异常
				})
	    	},
	    	//分期逾期列表
	    	FQserviceCollection(){
	    		this.basetabletitle = this.fqBasetabletitle;
	    		this.loading=true;
	    		this.$api.callingfqoverdue(this.collectionParams).then(res => {}, response => {
	    			let params = {lable:this.$route.name,value:this.collectionParams};
	    			this.$store.dispatch('SAVECONDITION',params);
	    			this.loading = false;
					this.basetableinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.page.totalResult;
					for(let i = 0;i<this.basetableinfo.length;i++){
						this.$set(this.basetableinfo[i],'ykjtype','易分期');
						switch(this.basetableinfo[i].gender){
							case 0:
								this.basetableinfo[i].gender = '男';
								break;
							case 1:
								this.basetableinfo[i].gender = '女';
								break;
						}
					}
				}).catch(val => {
					//异常
				})
	    	},
	    	//点击页码返回参数
	    	topage(topage){
	    		this.collectionParams = Object.assign(this.collectionParams,topage);
	    		if(this.overdueTerm.action==1){
		    		this.KJserviceCollection();
		    	}else{
		    		this.FQserviceCollection();
		    	}
	    		
	    	},
	    	//电话详情
	    	callDetails(row){
	    		this.$router.push({
	    			name:'电话催收详情',
		    		params:{
		    			user_id:row.userId
		    		}
		    	})
	    	},
	    	//打电话去
	    	calling(row){
	    		this.callBox = true;
	    		this.formData.user_id = row.userId;
	    		this.formData.atd_id = row.atd_id;
	    		this.formData.order_id = row.orderId;
	    		
	    	},
	    	//电话提交
	    	callingSubmit(){
	    		this.callingLoading = true;
	    		if(!this.formData.flag){
	    			this.callingLoading = false;
					this.$message({
			          message: '请选择是否接通',
			          type: 'warning'
			        });
				}else if(!this.formData.detail){
	    			this.callingLoading = false;
					this.$message({
			          message: '请填写反馈情况',
			          type: 'warning'
			        });
				}else{
					console.log(this.formData);
					this.$api.callingkfSubmit(this.formData).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == 0){
	    					this.callingLoading = false;
							this.callBox = false;
							this.formData.detail = '';
							this.$message({
					          message: '保存成功！',
					          type: 'success'
					        });
						}else{
	    					this.callingLoading = false;
							this.$message({
					          message: response.data.resultMsg,
					          type: 'warning'
					        });
						}
					}).catch(val => {
						//异常
	    				this.callingLoading = false;
						this.$message({
				          message: '服务器异常',
				          type: 'warning'
				        });
					})
				}
	    	},
	    	//即将逾期客服电话
	    	soonOverdue(row){
	    		this.$router.push({
					name:'即将逾期电话记录',
					params:{
						user_id:row.userId
					}})
	    	},
	    	//逾期后客服电话
	    	overdueAfter(row){
	    		this.$router.push({
					name:'逾期后电话记录',
					params:{
						user_id:row.user_id
					}})
	    	},
	    	//短信
		    msgShowBox(index,row){
		    	this.msgShow = true;
//		    	this.msgShowtext = row.sms;
	    		this.msgShowParams.user_id = row.userId;
	    		this.msgShowParams.phone=row.phone;
	    		this.msgShowParams.name=row.name;
	    		if(this.overdueTerm.action=="2"){//fq
	    			this.msgShowParams.qishuNo = row.qishuNo;
	    			this.msgShowParams.borrow_time = row.borrow_time;
	    		}else if(this.overdueTerm.action=="1"){//kj
	    			this.msgShowParams.borrow_time = row.borrowTime;
	    		}
	    		console.log(this.msgShowParams);
		    	this.$api.msgCont(this.msgShowParams).then(res => {}, response => {
					console.log(response);
					this.msgShowtext = response.data.returnObj.sms;
				}).catch(val => {
					//异常
				})
		    },
		    //发送短信
		    hairMsg(){
		    	this.$api.msgShow(this.msgShowParams).then(res => {}, response => {
					console.log(response);
					if(response.data.resultCode==0){
						//关闭弹框
						this.msgShow = false;
						this.$message({
				          message: '发送成功',
				          type: 'success'
				        });
					}else{
						this.$message({
				          message: '发送失败',
				          type: 'warning'
				       });
					}
				}).catch(val => {
					//异常
				})
		    },
	    	//转交
	    	transfer(row){
	    		console.log(row)
	    		this.transferBox = true;
	    		this.transferParams.ccs_id = row.ccs_id;
	    		this.transferParams.user_id = row.userId;
	    		this.transferParams.order_id = row.orderId;
	    		this.transferParams.ccs_type = row.ccs_type;
//	    		this.$router.push({
//					name:'转交',
//					params:{
//						c_id:row.borrowId,
//						action:0,
//					}
//				})
	    	},
	    	onSubmit(){
	    		if(this.transferParams.ccstr_transfer_reason==''){
					this.$message({
			          message: '请填写备注',
			          type: 'warning'
			        });
				}else{
					console.log(this.transferParams);
					this.$api.transferKFSubmit(this.transferParams).then(res => {}, response => {
						if(response.data.resultCode==0){
							this.transferBox = false;
							this.transferParams.ccstr_transfer_reason = '';
							this.collection();
							this.$message({
					          message: '转交成功！',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: response.data.resultMsg,
					          type: 'warning'
					        });
						}
						console.log(response);
						
					}).catch(val => {
						//异常
					})
				}
	    	},
	    }
	}
</script>
<style lang="less" scoped>
	.el-button--text{
		width: 20px;
	}
	.transfer{
		display: block;
		text-align: center;
	}
</style>