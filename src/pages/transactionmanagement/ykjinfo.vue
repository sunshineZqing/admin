<template>
	<div class="">
		<div class="addtions">
			<el-input v-model="kjinfoParams.keywords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-select class="select" style='width: 125px;border-radius: none;margin-right:10px;' v-model="kjinfoParams.time" placeholder="时间" clearable>
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>

			<el-input style='margin-left: 20px;width: 300px;' placeholder="请输入内容" v-model="kjinfoParams.wr_trade_sn" class="input-with-select" clearable>
				<el-select class="select" style='margin-left: 0;width: 125px;' v-model="kjinfoParams.jhtype" slot="prepend" placeholder="借款流水号" >
					<el-option label="借款流水号" value="0"></el-option>
					<el-option label="还款流水号" value="1"></el-option> 
				</el-select>
			</el-input>
			
			<el-select class="select" style='width: 125px;border-radius: none;' v-model="kjinfoParams.is_pay_off" placeholder="还款情况" clearable>
				<el-option label="未还清" value="0"></el-option>
				<el-option label="已还清" value="1"></el-option>
				<el-option label="提前还清" value="2"></el-option>
				<el-option label="转分期" value="3"></el-option>
				<el-option label="部分还款" value="4"></el-option>

			</el-select>
			<el-select class="select" style='width: 125px;border-radius: none;' v-model="kjinfoParams.overdue" placeholder="是否逾期" clearable>
				<el-option label="已逾期" value="1"></el-option>
				<el-option label="未逾期" value="0"></el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-search" @click="init" size="medium">搜索</el-button>
			<a v-if="downloadPower == 1 || downloadPower == 24" class="download" :href="'/ykj/borrow/excel.do?keywords='+kjinfoParams.keywords+'&time='+kjinfoParams.time+'&jhtype='+kjinfoParams.jhtype+'&wr_trade_sn='+kjinfoParams.wr_trade_sn+'&is_pay_off='+kjinfoParams.is_pay_off+'&overdue='+kjinfoParams.overdue+'&borrow_time_start='+kjinfoParams.borrow_time_start+'&borrow_time_end='+kjinfoParams.borrow_time_end" target="_blank">下载</a>
		</div>

		<basetable  :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="还款详情" placement="top">
					<el-button type="text" class="" icon='el-icon-tickets' v-on:click="repayDetails(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if="scope.scope.row.is_pay_off == '未还清'" class="item" effect="dark" content="还款" placement="top">
					<el-button type="text" class="" icon='iconfont icon-bianji' v-on:click="repayText(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="下载" placement="top">
					<a :href="'/ykj/borrow/protocol.do?id='+scope.scope.row.order_id"><el-button type="text" icon='el-icon-download'></el-button></a>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
		<!--还款详情-->
		<el-dialog title="还款详情" :visible.sync="dialogVisible" width="900px">
			<basetable :basetabletitle="basetableDetailstitle" key="qq" :basetableinfo='basetableDetailsinfo' :loading="loading2">
			</basetable>
			<basepage :sunmary="pageSize2" v-on:topage="topageDetails"></basepage>
		</el-dialog>
		<!--还款-->
		<el-dialog title="还款" :visible.sync="dialogVisibleText" width="30%" align="left"  :before-close="handleClose">
			<el-form ref="repayTextParams" :model="repayTextParams" label-width="100px" align="left" width="500px">
				<el-form-item label="还款金额：" >
					<el-input type="input" v-model="repayTextParams.stay_pay_amount_1" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item label="备注：" >
					<el-input type="textarea" v-model="repayTextParams.pr_msg" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item label="还款时间：" >
					<el-date-picker v-model="repayTextParams.actual_repayment_time_new" type="datetime" placeholder="选择日期时间"></el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="repayTextSubmit()"  size="medium">提交</el-button>
					<el-button @click = "handleClose" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'thetrial',
		components: {
			basetable,basepage
		},
		mounted() {
			this.init();
			if(!this.dialogVisibleText){
				this.repayTextParams.stay_pay_amount = '';
				this.repayTextParams.pr_msg = '';
			}
		},
		data() {
			return {
				labelPosition: 'left',
				checktype: '0',
				chooseitem: '', //选中项
				tableloading: true,
				input5: '',
				select: '',
				keyword: '',
				options: [ {
					value: '0',
					label: '借款时间'
				}, {
					value: '1',
					label: '应还款时间'
				}, {
					value: '2',
					label: '实际还清时间'
				}],

				value9: '',
				value6: '',
				value7: '',
				value8: '',
				pagesize: 0, //分页信息
				baseinfo: [], //表格基本信息
				kjinfoParams:{//表格请求参数
					keywords:'',
					time:'',
					jhtype:'',
					wr_trade_sn:'',
					is_pay_off:'',
					overdue:'',
					borrow_time_start:'',
					borrow_time_end:'',
				},
				basetabletitle: [{
					label: '用户ID',
					prop: 'user_id'
				}, {
					label: '姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'gender'
				}, {
					label: '手机号',
					prop: 'phone',
					width:120
				}, {
					label: '借款订单号',
					prop: 'order_id',
					width:120
				}, {
					label: '借款时间',
					prop: 'borrow_time',
					width:160
				},  {
					label: '应还款时间',
					prop: 'repay_time',
					width:160
				},{
					label: '还清时间',
					prop: 'actual_repayment_time',
					width:160
				},{
					label: '借款金额',
					prop: 'borrow_amount'
				}, {
					label: '借款流水号',
					prop: 'wr_trade_sn',
					width:160
				}, {
					label: '利息',
					prop: 'pay_interest'
				}, {
					label: '待还逾期利息',
					prop: 'over_due_interest_total'
				}, {
					label: '已还逾期利息',
					prop: 'actual_pay_over_due_interest'
				}, {
					label: '已还金额',
					prop: 'borrow_amount_pay'
				}, {
					label: '待还金额',
					prop: 'stay_pay_amount'
				}, {
					label: '已还次数',
					prop: 'payment_times'
				},  {
					label: '是否逾期',
					prop: 'isOverdue'
				}, {
					label: '是否还清',
					prop: 'is_pay_off'
				}, {
					label: '逾期天数',
					prop: 'over_time'
				}, {
					label: '优惠券',
					prop: 'coupon_money'
				}],
				//还款详情框
				dialogVisible:false,
				//详情头信息
				basetableDetailstitle: [{
						label: '还款方式',
						prop: 'payment_way' //  0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
					},{
						label: '还款时间',
						prop: 'payment_time'
					},
					{
						label: '还款金额',
						prop: 'payment_amount'
					},
					{
						label: '流水号',
						prop: 'pr_trade_sn'
					},
					{
						label: '还款银行',
						prop: 'bankName'
					},
					{
						label: '银行卡号',
						prop: 'accountNo'
					}
				],
				loading2:true,
				//详情信息
				basetableDetailsinfo: [],
				//请求详情信息参数
				DetailsParams:{
					user_id:'',
				},
				pageSize2:0,
				//还款
				dialogVisibleText:false,
				repayTextParams:{
					pr_msg:'',
					actual_repayment_time_new:'',
				},
				repayTextMoney:{
					minMoney:0,
					maxMoney:0,
				},
				downloadPower:'',//下载权限
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true
				if(this.value9){
					var params = {
						keywords: this.keyword,
						borrow_time_start: this.value9[0],
						time: this.value6,
						borrow_time_end: this.value9[1],
						jhtype:this.input5,
						is_pay_off:this.value7,
						overdu:this.value8,
					}
				}else{
					var params = {
						keywords: this.keyword,
						borrow_time_start: '',
						time: this.value6,
						borrow_time_end: '',
						jhtype:this.input5,
						is_pay_off:this.value7,
						overdu:this.value8,
					}
				}
				this.$api.kjinfo(this.kjinfoParams).then(res => {}, response => {
					this.tableloading = false
					this.downloadPower = response.data.returnObj.sr_id;
					this.baseinfo = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
						switch(elem.is_overdue){
		                    case 0: this.$set(elem,'isOverdue','未逾期');break;
		                    case 1: this.$set(elem,'isOverdue','逾期');break;
	                    }
						switch(elem.is_pay_off){
		                    case 0: elem.is_pay_off  = '未还清';break;
		                    case 1: elem.is_pay_off  = '已还清';break;
		                    case 2: elem.is_pay_off  = '提前还清';break;
		                    case 3: elem.is_pay_off  = '转分期';break;
		                    case 4: elem.is_pay_off  = '部分还款';break;
	                    }
						
					})
					this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length;
				}).catch(val => { //捕获异常
					this.tableloading = false
					this.$message({
			          message: '服务器异常',
			          type: 'error'
			       	});
				})
			},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.kjinfoParams.borrow_time_start = dateformat(value[0], 'yyyy-MM-dd');
					this.kjinfoParams.borrow_time_end = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.kjinfoParams.borrow_time_start = '';
					this.kjinfoParams.borrow_time_end = '';
				}
			},
			//页码
			topage(target) {
				this.kjinfoParams = Object.assign(this.kjinfoParams,target);
				this.init();
			},
			
			//还款详情
			repayDetails(row) {
				this.dialogVisible = true;
				this.loading2 = true;
				console.log(row);
				this.DetailsParams.orderId = row.order_id;
				this.DetailsList();
			},
			DetailsList(){
				this.$api.kjDetails(this.DetailsParams).then(res => {}, response => {
					this.loading2 = false;
					this.basetableDetailsinfo = response.data.returnObj.varList;
					this.pageSize2 = response.data.returnObj.totalCount;
					this.basetableDetailsinfo.forEach(elem=>{
						switch(elem.payment_way){  //  0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
							case 0:
								elem.payment_way = '主动还款';
								break;
							case 1:
								elem.payment_way = '系统自动扣款';
								break;
							case 2:
								elem.payment_way = '催收代扣';
								break;
							case 3:
								elem.payment_way = '催收代扣';
								break;
						}
					})
				}).catch(val => {
					//异常
				})
			},
			//页码
			topageDetails(target) {
				this.DetailsParams = Object.assign(this.DetailsParams,target);
				console.log(this.DetailsParams);
				this.DetailsList();
			},
			//还款
			repayText(row){
				console.log(row);
				this.dialogVisibleText = true;
				this.repayTextMoney.minMoney = row.borrow_amount;
				this.repayTextMoney.maxMoney = row.stay_pay_amount;
				console.log(row);
				this.repayTextParams = Object.assign(this.repayTextParams,row);
				this.repayTextParams.remain_amount = row.borrow_amount_stay_pay;

			},
			//关闭按钮
			handleClose(){
				this.dialogVisibleText = false;
				this.repayTextParams.actual_repayment_time_new = '';
				this.repayTextParams.stay_pay_amount_1 = '';
				this.repayTextParams.pr_msg = '';
			},
//			提交还款信息
			repayTextSubmit(){
				if(this.repayTextParams.stay_pay_amount_1 == '' || this.repayTextParams.stay_pay_amount_1 == 0 || isNaN(this.repayTextParams.stay_pay_amount_1)){
					this.$message({
			          message: '请输入金额',
			          type: 'warning'
			       	});
				}else if(this.repayTextMoney.maxMoney < this.repayTextParams.stay_pay_amount_1){
					this.$message({
			          message: '请输入正确的还款金额',
			          type: 'warning'
			       	});
				}else if(this.repayTextParams.pr_msg == ''){
					this.$message({
			          message: '请输入备注信息',
			          type: 'warning'
			       	});
				}else if(!this.repayTextParams.actual_repayment_time_new){
					this.$message({
			          message: '请选择还款时间',
			          type: 'warning'
			       	});
				}else{
					this.repayTextParams.actual_repayment_time_new = dateformat(this.repayTextParams.actual_repayment_time_new, 'yyyy-MM-dd hh:mm:ss');
					this.repayTextParams.borrow_amount_stay_pay = this.repayTextParams.stay_pay_amount - this.repayTextParams.stay_pay_amount_1;
					console.log(this.repayTextParams)
					this.$api.kjrepaySubmit(this.repayTextParams).then(res => {}, response => {
						console.log(response)
						if(response.data.resultCode == '0'){
							this.init();
							this.dialogVisibleText = false;
							this.$message({
					          message: '还款成功',
					          type: 'success'
					       	});
							this.repayTextParams.stay_pay_amount_1 = '';
							this.repayTextParams.actual_repayment_time_new = '';
							this.repayTextParams.pr_msg = '';
						}else{
							this.$message({
					          message: '还款失败',
					          type: 'warning'
					       	});
						}
						this.repayTextParams.stay_pay_amount_1 = '';
						this.repayTextParams.actual_repayment_time_new = '';
						this.repayTextParams.pr_msg = '';
					}).catch(val => {
						//异常
					})
				}
			},
		}
	}
</script>
<style type="text/css">
	.el-message-box {
		border: 1px solid #eee;
		width: 577px;
	}
	.el-input-group__append,
	.el-input-group__prepend {
		padding-left: 0px;
	}
</style>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.el-select .el-input {
		width: 130px;
	}
	
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,button {
			margin-left: 20px;
		}
	}
	.addtions>div.el-select,div.el-input{
		width: 12%;
	}
	.download{
	    color: #fff;
	    text-decoration: none;
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    font-weight: 500;
	    padding: -12px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    margin-right: 10px;
	    padding: 10px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    border-color: #409EFF;
	    background-color: #409EFF;
	}
	.el-dialog__body form .el-form-item .el-form-item__content .el-input{
		width: 50%;
	}
</style>