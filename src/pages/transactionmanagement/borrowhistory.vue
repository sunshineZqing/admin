<template>
	<div class="">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keywords" placeholder="请输入关键字" clearable>
				<i class="el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<div style="color: #8a8a8a;">
				交易时间：
				<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
		</div>
		<basetable :showopera='false' :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo">
			<template slot-scope="scope">

			</template>
		</basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'thetrial',
		components: {
			basetable,
			basepage,
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				tableloading: true,
				keyword: '',
				value9: '',
				pagesize: 10, //分页信息
				baseinfoParams:[],
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户编号',
					prop: 'user_id'
				}, {
					label: '用户姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'gender',

				}, {
					label: '手机号码',
					prop: 'phone',
					width: 120
				}, {
					label: '订单号',
					prop: 'order_id',
					width: 120
				}, {
					label: '银行卡号',
					prop: 'accountNo',
					width:180
				}, {
					label: '交易金额',
					prop: 'amount'
				}, {
					label: '流水号',
					prop: 'wr_trade_sn',
					width: 160
				}, {
					label: '支付状态',
					prop: 'wr_status'
				}, {
					label: 'code',
					prop: 'wr_ret_code'
				}, {
					label: '说明',
					prop: 'wr_ret_msg'
				}, {
					label: '服务费',
					prop: 'fee'
				}, {
					label: '交易时间',
					prop: 'create_time',
					width:160
				}, {
					label: '优惠券金额',
					prop: 'coupon_money'
				}, {
					label: '优惠券类型',
					prop: 'coupon_type'//0金额/1折扣/2免息
				},
				{
					label: '借款金额',
					prop: 'amount'
				}, 
				{
					label: '借款类型',
					prop: 'wr_type'//1：快借借款、2：分期借款、3：余额提现
				},
//				{
//					label: '借款期数',
//					prop: 'qishu'
//				},

				]
			}
		},
		methods: {
			init() { //初始化
				this.tableloading = true
				this.$api.borrowmoneycords(this.baseinfoParams).then(res => {}, response => {
					this.tableloading = false
					this.baseinfo = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
						switch(elem.wr_type){
		                
		                	case 1: elem.wr_type  = '1期（快借）';break;
		                    case 2: 
		                    	if(elem.qishu == 3){
		                    		elem.wr_type  = '3期';
		                    	}else if(elem.qishu == 6){
		                    		elem.wr_type  = '6期';
		                    	}else if(elem.qishu == 12){
		                    		elem.wr_type  = '12期';
		                    	}
		                    	break;
		                    case 3: elem.wr_type  = '余额提现';break;
	                    }
						switch(elem.coupon_type){
		                    case 0: elem.coupon_type  = '金额';break;
		                    case 1: elem.coupon_type  = '折扣';break;
		                    case 2: elem.coupon_type  = '免息';break;
	                    }
	                    switch(elem.wr_status){
		                    case 0: elem.wr_status  = '用户取消';break;
		                    case 1: elem.wr_status  = '处理中';break;
		                    case 2: elem.wr_status  = '失败';break;
		                    case 3: elem.wr_status  = '成功';break;
		                    case 4: elem.wr_status  = '退款';break;
		                    case 5: elem.wr_status  = '创单';break;
	                    }
						
					})
					this.pagesize = response.data.returnObj.totalCount || this.pagesize
					
				}).catch(val => { //捕获异常

				})
			},
			//页码
			topage(target) {
				this.baseinfoParams = Object.assign(this.baseinfoParams,target);
				this.init();
			},
			tosearch(target) { //搜索
				this.init()
			},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.baseinfoParams.lastStart = dateformat(value[0], 'yyyy-MM-dd');
					this.baseinfoParams.lastEnd = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.baseinfoParams.lastStart = '';
					this.baseinfoParams.lastEnd = '';
				}
			},
			sendmessage(scope) {
				this.$confirm('短信内容：尊敬的谷宗益您好，您在易快借' + scope.scope.row.create_time + '的分期借款，第1期即将逾期，请及时登录客户端查看！如已还款，请忽略，祝您生活愉快！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {

					this.$message({
						type: 'success',
						message: '发送成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消发送'
					});
				});
			}
		}
	}
</script>
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
	.el-button {
		padding: 12px 20px;
	}
	
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,
		button {
			margin-left: 20px;
		}
		button {}
		div.el-input {
			width: 12%;
		}
	}
</style>