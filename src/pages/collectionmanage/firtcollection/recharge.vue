<template>
	<div class="recharge">
		<div>
			<div class="repayment">
				<!--<span class="repaymentTitlt">催收还款</span>-->
				<div class="userCont">
					<span class="userTitle">用户基本信息</span>
					<div class="userInfor">
						<div class="userInfor1">
							<span>{{name}}</span>
							<span>{{gender}}</span>
						</div>
						<div class="userInfor1">
							<span>电话：</span>
							<span>{{phone}}</span>
						</div>
						<div class="userInfor2">
							<span>身份证号：</span>
							<span>{{cert_card}}</span>
						</div>
						<div class="userInforRight">
							<div class="">
								<span>{{available_amount}}</span>
								<span>可用额度(¥)</span>
							</div>
							<div class="">
								<span>{{authorized_amount}}</span>
								<span>授信额度(¥)</span>
							</div>
						</div>
					</div>
				</div>
				<div class="loanCont">
					<span class="userTitle">借款情况</span>
					<div class="loanInfor">
						<el-table :data="borrowSituationData" border style="width: 100%" align='center'>
							<el-table-column prop="name" label="" align='center'>
							</el-table-column>
							<el-table-column prop="borrow_amount" label="借款总金额" align='center'>
							</el-table-column>
							<el-table-column prop="num" label="借款次数" align='center'>
							</el-table-column>
							<el-table-column prop="actual_borrow_amount" label="已还金额" align='center'>
							</el-table-column>
							<el-table-column prop="borrow_amount_stay_pay" label="待还金额" align='center'>
							</el-table-column>
							<el-table-column prop="is_overdue" label="逾期次数" align='center'>
							</el-table-column>
							<el-table-column prop="vor_borrow_amount_stay_pay" label="逾期代还本金" align='center'>
							</el-table-column>
							<el-table-column prop="overnum" label="逾期待还次数" align='center'>
							</el-table-column>
							<el-table-column prop="amountIs_overdue" label="总逾期率" align='center'>
							</el-table-column>
							<el-table-column prop="proportion" label="追回百分比" align='center'>
							</el-table-column>
						</el-table>
					</div>
					<div class="stayRepayment">
						<div class="tabTitle">
							<span v-on:click="onTab(1)" :class="{'tabTitCur':tabCur}">快借逾期待还情况</span>
							<span v-on:click="onTab(2)" :class="{'tabTitCur':!tabCur}">分期逾期待还情况</span>
						</div>
						<div class="stayRepaymentCont">
							<!--快借逾期-->
							<div v-show="tabCur">
								<basetable :basetabletitle = "kjbasetabletitle" :basetableinfo = 'kjtableData' :loading="kjloading" :showopera="true">
									<template slot-scope="scope">
											<el-button type="text" @click="repaymentsDetails(scope.scope.$index, scope.scope.row)">还款详情</el-button>
											<el-button type="text"  style="margin-left: 0;" @click="newKJRepayments(scope.scope.$index, scope.scope.row)">新增还款</el-button>
									</template>
								</basetable>
								<basepage :sunmary='kjtableDataPage' v-on:topage="topage"></basepage>
							</div>
							<!--分期逾期-->
							<div v-show="!tabCur">
								<basetable :basetabletitle = "fqbasetabletitle" :basetableinfo = 'fqtableData' :loading="fqloading" :showopera="true">
									<template slot-scope="scope">
										<el-button type="text" @click="repaymentsSituation(scope.scope.$index, scope.scope.row)">还款情况</el-button>
										<el-button type="text" style="margin-left: 0;" @click="newFQRepayments(scope.scope.$index, scope.scope.row)">新增还款</el-button>
									</template>
								</basetable>
								<basepage :sunmary='pageSize2' v-on:topage="topage2"></basepage>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--弹分期逾期还款-->
			<el-dialog title="新增分期还款" :visible.sync="bombToggle" width="1000px" :before-close="handleClose">
				<div class="bomb">
					<div class="bombCont">
						<div class="bombContTop">
							<div class="">
								<span>最大金额：</span><span>{{newfqRepaymentsData.max}}</span>
							</div>
							<div class="">
								<span>最小金额：</span><span>{{newfqRepaymentsData.min}}</span>
							</div>
						</div>
						<div class="bombData">
							<basetable :basetabletitle = "XFQbasetabletitle" :basetableinfo = 'XFQbasetableinfo' :loading="fqloading" :showopera="true">
								<template slot-scope="scope">
									<el-button type="text" @click ="XFQbasetableDetails(scope.scope.row)" >详情</el-button>
								</template>
							</basetable>
							
						</div>
					</div>
					<div class="bombBottom">
						<div class="bombBack">
							<span class="bombBackTit">选择银行卡</span>
							<el-radio-group v-model="fqcardListNum" v-for="(item,index) in newfqRepaymentsData.cardList" :key = "item.account">
							    <el-radio :label="item.account">{{item.bankName}}({{item.accountNo}})</el-radio><span v-if="index==0" class="backmor">默认</span><br/>
							    <!--<el-radio :label="item.account+'1'">{{item.bankName}}({{item.accountNo}})</el-radio>-->
							</el-radio-group>
							<!--<div v-for="(item,index) in newfqRepaymentsData.cardList">
								<input type="radio" name="backRadio" :id="'backRadio'+index" :value="index" v-model="FQbomBackRadioIndex" :checked="index==0" :class="FQbomBackRadioIndex==index ? 'iconfont icon-xuanzhong' : 'iconfont icon-weixuanzhong'">
								<label v-bind:for="'backRadio'+index" :class="FQbomBackRadioIndex==index ? 'checkedSpan' : ''">{{item.bankName}}({{item.accountNo}})</label>
								<span v-if="index==0" class="backmor">默认</span>
							</div>-->
						</div>
						<div class="bombPut">
							<div class="bombmoney">
								<span class="bombmoneyTit">还款金额：</span>
								<input type="text" name="" id="" value="" v-model="FQrechargeMoney"/>
								<span class="bombmoneyPrompt"><span>*</span>（额度范围为{{newfqRepaymentsData.min}}~{{newfqRepaymentsData.max}}）</span>
							</div>
							<div class="bombRemark">
								<span class="bombmoneyTit">备注：</span><textarea name="" rows="" cols=""></textarea>
							</div>
						</div>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
				    <el-button type="primary" v-on:click="newFQSubmit" size="medium" :loading = 'newkjSubmit'>提交</el-button>
				</span>
			</el-dialog>
			<!--新增分期还款列表   详情列表-->
			<el-dialog title="新增分期还款" :visible.sync="bombToggleDetails" width="1000px">
				<basetable :basetabletitle = "XFQtabletitleDetails" :basetableinfo = 'XFQtableinfoDetails' :loading="XFQloading">
				</basetable>
				<basepage :sunmary = "XFQpagesize" v-on:topage="XFQtopage"></basepage>
			</el-dialog>
			<!--弹新增快借还款-->
			<el-dialog title="新增还款" :visible.sync="repaymentSituation" width="400px" algin="left">
				<div class="repaymentS">
					<div class="bombCont">
						<div class="bombContTop">
							<div class="">
								<span>最大金额：</span><span>{{newKJRepaymentsData.max}}</span>
							</div>
							<div class="">
								<span>最小金额：</span><span>{{newKJRepaymentsData.min}}</span>
							</div>
						</div>
					</div>
					<div class="bombBottom">
						<div class="bombBack">
							<span class="bombBackTit">选择银行卡</span>
							<el-radio-group v-model="kjcardListNum" v-for="(item,index) in newKJRepaymentsData.cardList" :key = "item.account">
							    <el-radio :label="item.account">{{item.bankName}}({{item.accountNo}})</el-radio><span v-if="index==0" class="backmor">默认</span><br/>
							</el-radio-group>
						</div>
						<div class="bombPut">
							<div class="bombmoney">
								<span class="bombmoneyTit">还款金额</span>
								<input type="text" name="" id="" value="" v-model="KJrechargeMoney"/>
								<span class="bombmoneyPrompt"><span>*</span>（额度范围为{{newKJRepaymentsData.min}}~{{newKJRepaymentsData.max}}）</span>
							</div>
							<div class="bombRemark">
								<span class="bombmoneyTit">备注</span><textarea name="" rows="" cols=""></textarea>
							</div>
						</div>
						<div class="bombBtn">
							<el-button type="primary" size="medium" v-on:click = "newKJSubmit" :loading = "newfqSubmit">提交</el-button>
						</div>
					</div>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: 'recharge',
		components: {
			basetable,
			basepage
		},
		data() {
			return {
				loading:true,
				available_amount:0,//可用额度
				authorized_amount:0,//授信额度
				//借款情况请求参数
				borrowSituationParams:{},
				//借款情况数据
				borrowSituationData: [{
					name:'易快借',
				},{
					name:'易分期',
				}],
				amountIs_overdue:0,//总逾期率
				//快借逾期列表头
				kjbasetabletitle:[
					{label:'借款ID',prop:'borrowId'},
					{label:'用户ID',prop:'userId'},
					{label:'借款日期',prop:'borrowTime',width:'160px'},
					{label:'借款金额',prop:'borrowAmount'},
					{label:'应还款日期',prop:'repayTime',width:'160px'},
					{label:'利息',prop:'payInterest'},
					{label:'逾期利息',prop:'overDueInterestTotal'},
					{label:'逾期天数',prop:'overDays'},
					{label:'已产生总利息',prop:'allInterest'},
					{label:'已还利息',prop:'actualPayInterest'},
					{label:'待还利息',prop:'interestStayPay'},
					{label:'已还金额',prop:'payAmount'},
					{label:'待还金额',prop:'satyPayAmount'},
					{label:'还款次数',prop:'paymentTimes'},
					{label:'还款状态',prop:'isPayOff'},//还款状态 0：未还清 1：已还清
					{label:'还清时间',prop:'actualRepaymentTime',width:'160px'},
				],
				kjloading:true,//快借loading
				//快借逾期列表
				kjtableData:[],
				kjtableDataparams:{},
				kjtableDataPage:1,//总条数
				pageSize2:0,//总条数2
				//用户信息
				userId:'',
				name:'',
				phone:'',
				cert_card:'',//身份证号
				gender:'',//性别
				//新增快借还款
				newKJRepaymentsParams:{},
				newKJRepaymentsData:'',
				
				//新增快借还款提交信息
				newKJSubmitParams:{
					money:'',
				},


				//选中银行卡索引
				KJBomBackRadioIndex:'0',
				kjcardListNum:'',
				newkjSubmit:false,
				//还款金额
				KJrechargeMoney:'',
				
				//分期逾期列表
				fqbasetabletitle:[
					{label:'借款ID',prop:'stage_id'},
					{label:'用户ID',prop:'user_id'},
					{label:'借款日期',prop:'borrow_time',width:'160px'},
					{label:'借款金额',prop:'amount_count'},
					{label:'总期数',prop:'qishu'},
					{label:'剩余期数',prop:'remain_qishu'},
					{label:'逾期天数',prop:'over_days'},
					{label:'该笔借款全部到期时间',prop:'repay_time',width:'160px'},
					{label:'预计产生的总利息',prop:'sum_interest'},
					{label:'已产生逾期利息',prop:'over_due_interest_total'},
					{label:'逾期待还本金',prop:'yue_gong_amount_stay_pay'},
					{label:'待还剩余利息',prop:'interest_stay_pay'},
					{label:'逾期待还利息',prop:'over_due_interest_stay_pay'},
					{label:'待还总金额',prop:'stay_pay_amount'},
					{label:'还款次数',prop:'payment_times'},
					{label:'还款状态',prop:'is_pay_off'},//还款状态 0：未还清 1：已还清
					{label:'还清时间',prop:'actual_repayment_time',width:'160px'},
				],
				fqtableData:[],
				fqtableDataparams:[],
				fqloading:true,//分期loading
				
				//新增分期还款
				newfqRepaymentsParams:[],//新增分期还款页面参数
				newfqRepaymentsData:[],//新增分期还款页面
				//分期银行卡选中
				fqcardListNum:'',//选中银行卡号
				newfqSubmit:false,//提交按钮 
				FQbomBackRadioIndex:'0',
				//还款金额
				FQrechargeMoney:'',
				
				//分期账单列表
				XFQbasetabletitle:[
					{label:'本金',prop:'yue_gong_amount'},
					{label:'期数',prop:'qishu_no'},
					{label:'利息',prop:'interest' },
					{label:'逾期天数',prop:'overdays'},
					{label:'逾期利息',prop:'over_due_interest_total'},
					{label:'已还总利息',prop:'actual_pay_interest_total'},
					{label:'待还逾期利息',prop:'over_due_interest_stay_pay' },
					{label:'还款次数',prop:'payment_times'},
					{label:'已还本金',prop:'actual_yue_gong_amount'},
					{label:'待还本金',prop:'yue_gong_amount_stay_pay'},
					{label:'本期待还总额',prop:'pay_stay_total'},
				],
				XFQbasetableinfo: [],
				bomBackRadio: '',
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
				tabCur:true,
				
				bombToggle: false,//弹分期逾期还款
				XFQloading:true,//弹分期逾期还款 详情弹框
				bombToggleDetails:false,//弹分期逾期还款 详情弹框
				//弹分期逾期还款 详情弹框
				XFQtabletitleDetails:[
					{label:'还款时间',prop:'payment_time'},
					{label:'还款类别',prop:'payment_way'},//还款方式 0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
					{label:'还款金额(¥)',prop:'payment_amount'},
					{label:'还款流水号',prop:'pr_trade_sn',width:'150px'},
					{label:'还款银行',prop:'bankName'},
					{label:'还款银行卡号',prop:'accountNo',width:'170px'},
					{label:'备注',prop:''},
				],
				XFQtableDataparams:{},
				XFQtableinfoDetails:[],
				XFQpagesize:0,
				repaymentSituation: false,
			}
		},
		mounted() {
			//个人信息
			this.userId = this.$route.params.user_id;
			this.name = this.$route.params.name;
			this.phone = this.$route.params.phone;
			this.cert_card = this.$route.params.cert_card;
			this.gender = this.$route.params.gender;
			
			this.available_amount = this.fmoney(this.$route.params.available_amount,2);
			this.authorized_amount = this.fmoney(this.$route.params.authorized_amount,2);

			//借款情况
			this.borrowSituation();
			
			//快借逾期列表
			this.kjtableDataparams.userId = this.userId;
			this.kjtableList();
			//分期逾期列表
			this.fqtableDataparams.userId = this.userId;
			this.fqtableList();
		},
		methods: {
			//借款情况
			borrowSituation(){
				this.$api.overdueSituation({user_id:this.userId}).then(res => {}, response => {
					this.borrowSituationData = response.data.returnObj.list;
					console.log(this.borrowSituationData);
					this.$set(this.borrowSituationData[0],'name','易快借');
					this.$set(this.borrowSituationData[1],'name','易分期');
					
					this.borrowSituationData.forEach((item,index) => {
						if(!item.borrow_amount){
							item.borrow_amount = 0;
						}
						if(!item.actual_borrow_amount){
							item.actual_borrow_amount = 0;
						}
						if(!item.borrow_amount_stay_pay){
							item.borrow_amount_stay_pay = 0;
						}
						if(!item.is_overdue){
							item.is_overdue = 0;
						}
						if(!item.vor_borrow_amount_stay_pay){
							item.vor_borrow_amount_stay_pay = 0;
						}
						if(!item.overnum){
							item.overnum = 0;
						}
						switch (index){
							case 0:
								this.$set(item,'name','易快借');
								break;
							case 1:
								this.$set(item,'name','易分期');
								break;
						}
						this.$set(item,'amountIs_overdue',(Math.floor(item.is_overdue/item.num*10000)/100 || 0) + '%');
						this.$set(item,'proportion',(Math.floor(item.Proportion/item.is_overdue*10000)/100 || 0) + '%');
					})
					console.log(this.borrowSituationData)
				}).catch(val => {
					//异常
				})
			},
			//快借逾期列表
			kjtableList(){
				this.kjtableDataparams.is_pay_off = 2;
				this.$api.kjOverdue(this.kjtableDataparams).then(res => {}, response => {
					this.kjtableData = response.data.returnObj.varList;
					this.kjtableDataPage =  response.data.returnObj.totalCount;
					console.log(this.kjtableData);
					for(let i=0; i<this.kjtableData.length; i++){
						if(this.kjtableData[i].isPayOff == 0){
							this.kjtableData[i].isPayOff = '未还清'
						}else if(this.kjtableData[i].isPayOff == 1){
							this.kjtableData[i].isPayOff = '已还清'
						}else if(this.kjtableData[i].isPayOff == 4){
							this.kjtableData[i].isPayOff = '部分还款'
						}
					}
					this.kjloading = false;
				}).catch(val => {
					//异常
				})
			},
			//快借逾期页码
			topage(target) {
				this.kjtableDataparams = Object.assign(this.kjtableDataparams,target);
				console.log(this.kjtableDataparams);
				this.kjtableList();
			},
			onTab(num) {
				if(num === 1) {
					this.tabCur = true
				} else {
					this.tabCur = false
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//还款详情
			repaymentsDetails(index,row) {
				console.log(row)
				if(row.borrowId){
					this.$router.push({
						name:'还款详情',
						params:{
							action:0,
							stage_id:0,
							borrowId:row.borrowId,
						}
					});
				}else{
					this.$message({
			           message: '查询失败',
			           type: 'error'
			        });
				}
			},
			//新增快借还款
			newKJRepayments(index, row) {
				//设置参数请求数据
				this.newKJRepaymentsParams.user_id = row.userId;
				this.newKJRepaymentsParams.borrow_id = row.borrowId;
				this.$api.newKJRepayments(this.newKJRepaymentsParams).then(res => {}, response => {
					console.log(response);
					if(response.data.resultCode==0){
						//显示弹框
						this.repaymentSituation = true;
						this.newKJRepaymentsData = response.data.returnObj;
						this.kjcardListNum = this.newKJRepaymentsData.cardList[0].account;
					}else{
						this.$message({
				          message: '新增失败',
				          type: 'error'
				        });
					}
				}).catch(val => {
					//异常
					this.$message({
			          message: '服务器异常',
			          type: 'error'
			        });
				})
			},
			//新增快借还款提交
			newKJSubmit(){
				this.newkjSubmit = true;
				var this1 = this;
				this.newKJSubmitParams = {
					borrow_id:this1.newKJRepaymentsParams.borrow_id,
					min:this1.newKJRepaymentsData.min,
					max:this1.newKJRepaymentsData.max,
					orderids:this1.newKJRepaymentsData.orderids,
					user_id:this1.userId,
					card:this1.kjcardListNum,
					money:this1.KJrechargeMoney,
				};
				console.log(this.KJrechargeMoney);
				if(this.newKJSubmitParams.money == ''){
					this.newkjSubmit = false;
					this.$message({
			          message: '请输入金额',
			          type: 'warning'
			        });
				}else if(!Number(this.KJrechargeMoney)){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入正确金额',
			          type: 'warning'
			        });
				}else{
					console.log(this.KJrechargeMoney);
					console.log(this.newKJSubmitParams);
					this.$api.newKJRepaymentsSubmit(this.newKJSubmitParams).then(res =>{},response => {
						console.log(response);
						this.newkjSubmit = false;
						if(response.data.resultCode==0){
							//关闭弹框
							this.newKJSubmitParams.money = '';
							this.repaymentSituation = false;
							this.$message({
					          message: '恭喜你，还款成功',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '还款失败',
					          type: 'error'
					       });
						}
					}).catch(val=>{
						this.newkjSubmit = false;
						//异常
						this.$message({
				          message: '服务器异常',
				          type: 'error'
				        });
					})
				}
					
			},
			//分期逾期列表
			fqtableList(){
					this.fqloading = true;
					this.$api.fqOverdue(this.fqtableDataparams).then(res => {}, response => {
					this.fqloading = false;
					this.fqtableData = response.data.returnObj.varList;
					this.pageSize2 = response.data.returnObj.totalCount
					console.log(this.fqtableData);
					for(let i=0;i<this.fqtableData.length;i++){
						switch(this.fqtableData[i].is_pay_off){
							case 0:
								this.fqtableData[i].is_pay_off = '未还清';
								break;
							case 3:
								this.fqtableData[i].is_pay_off = '部分还款';
								break;
						}
					}
				}).catch(val => {
					//异常
				})
			},
			topage2(target){
				this.fqtableDataparams = Object.assign(this.fqtableDataparams,target);
				console.log(this.fqtableDataparams);
				this.fqtableList();
			},
			//新增分期还款
			newFQRepayments(index, row){
				
				console.log(row);
				//设置参数请求数据
				
				this.newfqRepaymentsParams.user_id = row.user_id;
				this.newfqRepaymentsParams.stage_id = row.stage_id;
				this.$api.newfqRepayments(this.newfqRepaymentsParams).then(res => {}, response => {
					console.log(response);
					//显示弹框
					if(response.data.resultCode==0){
						this.bombToggle = true;
						this.newfqRepaymentsData = response.data.returnObj;
						this.XFQbasetableinfo = response.data.returnObj.stageList;
						this.fqcardListNum = this.newfqRepaymentsData.cardList[0].account;
					}else{
						this.$message({
				          message: '新增失败',
				          type: 'error'
				        });
					}
				}).catch(val => {
					//异常
					this.$message({
			          message: '服务器异常',
			          type: 'error'
			        });
				})
			},
			//新增分期还款提交
			newFQSubmit(){
				this.newfqSubmit=true;
				var newFQSubmitParams = {
					stage_id:this.newfqRepaymentsParams.stage_id,
					min:this.newfqRepaymentsData.min,
					money:this.FQrechargeMoney,
					max:this.newfqRepaymentsData.max,
					user_id:this.newfqRepaymentsParams.user_id,
//					card:this.newfqRepaymentsData.cardList[this.FQbomBackRadioIndex].account,
					card:this.fqcardListNum,
					orderids:this.newfqRepaymentsData.orderids,
				};
				console.log(this.FQrechargeMoney);
				
				if(this.FQrechargeMoney==""){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入金额',
			          type: 'warning'
			        });
				}else if(!Number(this.FQrechargeMoney)){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入正确金额',
			          type: 'warning'
			        });
				}else{
					this.$api.newfqRepaymentsSubmit(newFQSubmitParams).then(res=> {}, response => {
						this.newfqSubmit=false;
						console.log(response);
						if(response.data.resultCode==0){
							//关闭弹框
							this.bombToggle = false;
							this.FQrechargeMoney ="";
							this.$message({
					          message: '恭喜你，还款成功',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '还款失败',
					          type: 'error'
					       });
						}
						
						
					}).catch(val => {
						this.newfqSubmit=false;
						//异常
						this.$message({
				          message: '服务器异常',
				          type: 'error'
				        });
					})
				}
			},
			//新增分期还款列表   详情列表
			XFQbasetableDetails(row){
				this.bombToggleDetails = true;
				this.XFQloading = true;
				this.XFQtableDataparams.stage_detail_id = row.stage_detail_id;
				this.$api.fqOverdueDetails(this.XFQtableDataparams).then(res => {}, response => {
					this.XFQloading = false;
					console.log(response)
					if(response.data.resultCode == 0){
						this.XFQtableinfoDetails = response.data.returnObj.varList;
						this.XFQpagesize =  response.data.returnObj.totalCount || this.XFQtableinfoDetails.length;
						for(let i=0;i<this.XFQtableinfoDetails.length;i++){
							switch(this.XFQtableinfoDetails[i].payment_way)
							{
								case 0:
									this.XFQtableinfoDetails[i].payment_way = '主动还款';
									break;
								case 1:
									this.XFQtableinfoDetails[i].payment_way = '系统自动扣款';
									break;
								case 2:
									this.XFQtableinfoDetails[i].payment_way = '催收代扣';
									break;
								case 3:
									this.XFQtableinfoDetails[i].payment_way = '线下还款';
									break;
							}
						}
					}
				}).catch(val => {
					//异常
				})
			
			},
			XFQtopage(target){
				this.XFQtableDataparams = Object.assign(this.XFQtableDataparams,target);
				this.XFQbasetableDetails();
			},
			//还款情况
			repaymentsSituation(index, row) {
				if(row.stage_id){
					this.$router.push({
						name:'还款详情',
						params:{
							action:1,
							borrowId:0,
							stage_id:row.stage_id,
						}
					});
				}else{
					this.$message({
			           message: '查询失败',
			           type: 'error'
			        });
				}
			},
			fmoney(s, n) {
				n = n > 0 && n <= 20 ? n : 2;
				s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
				var l = s.split(".")[0].split("").reverse(),
					r = s.split(".")[1];
				var t = "";
				for(let i = 0; i < l.length; i++) {
					t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
				}
				return t.split("").reverse().join("") + "." + r;
			}
			
		}
	}
</script>

<style lang="less" scoped='scoped'>
	.backTop {
		width: 100%;
		text-align: left;
		span {
			color: #999999;
		}
	}
	
	.repayment {
		text-align: left;
	}
	
	.repaymentTitlt {
		display: inline-block;
		background: #FFFFFF;
		border-radius: 10px 10px 0 0;
		line-height: 45px;
		padding: 0 35px;
		margin-left: 25px;
		margin-top: 25px;
		margin-bottom: -1px;
	}
	
	.userCont {
		background: #FFFFFF;
		border: 1px solid #ececec;
		padding: 30px 15px;
		border-bottom: none;
		.userTitle {
			display: inline-block;
			border: 1px solid #30c9f3;
			background: #f0f9fc;
			line-height: 37px;
			padding: 0 25px;
			border-radius: 3px;
		}
		.userInfor {
			margin: 0 15px;
			margin-top: 20px;
			box-shadow: 0 0 10px 3px #e8e7e6;
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			height: 100px;
			line-height: 100px;
			text-align: center;
			.userInfor1 {
				flex-grow: 1;
				vertical-align: middle;
			}
			.userInfor1:first-child {
				span:first-child {
					display: inline-block;
					vertical-align: bottom;
					font-size: 30px;
				}
				span:last-child {
					display: inline-block;
					padding-left: 20px;
					vertical-align: bottom;
				}
			}
			.userInfor2 {
				flex-grow: 1.5;
			}
			.userInforRight {
				text-align: right;
				flex-grow: 5;
				background: url(../../../assets/img/infoheaderbg.png) no-repeat;
				background-size: 60% 100%;
				background-position: right;
				line-height: 30px;
				padding: 17px 0;
				span {
					font-size: 24px;
					display: inline-block;
					width: 70%;
					text-align: center;
					line-height: 30px;
					color: #c4c4c4;
				}
				span:first-child {
					font-size: 30px;
					color: #f96b6b;
				}
				div{
					text-align: center;
					display: inline-block;
					width: 25%;
				}
			}
		}
	}
	
	.loanCont {
		background: #FFFFFF;
		border: 1px solid #ececec;
		padding: 30px 15px;
		border-top: none;
		.userTitle {
			display: inline-block;
			border: 1px solid #30c9f3;
			background: #f0f9fc;
			line-height: 37px;
			padding: 0 25px;
			border-radius: 3px;
		}
		.loanInfor {
			padding: 18px 15px;
		}
	}
	
	.stayRepayment {
		margin: 15px;
		.tabTitle {
			background: #d2f3fe;
			border-radius: 20px 20px 0 0;
			padding-left: 65px;
			span {
				cursor: pointer;
				display: inline-block;
				padding: 0 15px;
				line-height: 45px;
			}
		}
		.tabTitCur {
			background: #2ac9f3;
			color: #FFFFFF;
		}
		.stayRepaymentCont {
			border-top: 2px solid #30c9f3;
			border: 1px solid #30c9f3;
			div {
				margin: 60px 0 80px;
				text-align: center;
			}
			.elBtn {
				display: inline-block;
			}
		}
	}
	
	.bombBox {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		z-index: 10;
	}
	
	.bomb {
		.bombTop {
			text-align: left;
			padding: 15px 25px;
			border-bottom: 1px solid #fff7f3;
			i {
				cursor: pointer;
				float: right;
				font-size: 25px;
			}
		}
		.bombCont {
			/*padding: 5px 30px;*/
		}
		.bombContTop {
			text-align: left;
			padding: 0px 0 20px;
			div {
				display: inline-block;
				width: 240px;
			}
		}
		.bombData {
			width: 100%;
		}
		.bombBottom {
			text-align: left;
			.bombBackTit {
				display: inline-block;
				padding: 15px 0;
			}
			.bombBack {
				div {
					margin-bottom: 15px;
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
						text-align: right;
						vertical-align: bottom;
					}
					.bombmoneyPrompt {
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
						margin: 0 15px;
						outline: none;
						border: none;
						background: #fff7f3;
						width: 740px;
						height: 72px;
					}
				}
				.bombRemark .bombmoneyTit {
					vertical-align: top;
				}
			}
		}
		.bombBtn {
			text-align: center;
			padding: 15px 0 30px;
		}
	}
	
	.dialog-footer {
		display: block;
		text-align: center;
	}
	
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
	.el-radio-group{
		display: block;
		font-size: 14px;
		.el-radio{
			line-height: 2;
		}
	}
</style>