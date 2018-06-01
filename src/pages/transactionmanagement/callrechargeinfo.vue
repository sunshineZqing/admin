<template>
	<div class="callrechargeinfo">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keywords" placeholder="关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-input v-model="baseinfoParams.collectionPeople" placeholder="催收人" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<div>
				<el-select style='width: 125px;margin-right:10px;' v-model="baseinfoParams.fil" slot="prepend" placeholder="时间" clearable>
					<el-option label="实际还款时间" value="1"></el-option>
					<el-option label="应还款时间" value="2"></el-option>
					<el-option label="开始借款时间" value="3"></el-option>
				</el-select>
			</div>

			<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>

			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
			<a class="download" :href="'/ykj/collectionRepayment/cssPayOffExcel/excel.do?keywords='+baseinfoParams.keywords+'&collectionPeople='+baseinfoParams.collectionPeople+'&fil='+baseinfoParams.fil+'&startTime='+baseinfoParams.startTime+'&endTime='+baseinfoParams.endTime" target="_blank">下载</a>
			
		</div>
		<basetable :loading='loading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo">
			<!--<template slot-scope="scope">
				<el-tooltip class="" effect="dark" content="电话催收" placement="top">
					<el-button style="" type="text" icon='iconfont icon-09dianhua' v-on:click="callCollection(scope.scope.row)"></el-button>
				</el-tooltip>
			</template>-->
		</basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>

	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'callrechargeinfo',
		components: {
			basetable,
			basepage,
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				loading: true,
				select: '',
				keyword: '',
				value9: '',
				pagesize: 10, //分页信息
				baseinfoParams:{
					keywords:'',
					collectionPeople:'',
					fil:'',
					startTime:'',
					endTime:'',
				},
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户编号',
					prop: 'user_id',
					width: 80
				}, {
					label: '用户姓名',
					prop: 'user_name'
				}, {
					label: '分类',
					prop: 'classify',

				}, {
					label: '手机号码',
					prop: 'phone',
					width: 120
				}, {
					label: '借款金额',
					prop: 'borrow_amount'
				}, {
					label: '利息',
					prop: 'pay_interest',
					width: 80
				}, {
					label: '逾期利息',
					prop: 'over_due_interest_stay_pay',
					width: 80
				}, {
					label: '实际还款金额',
					prop: 'sums'
				}, {
					label: '优惠券',
					prop: 'coupon_name',
					width: 80
				}, {
					label: '订单号',
					prop: 'order_id',
					width: 130
				}, {
					label: '开始借款时间',
					prop: 'borrow_time',
					width:160
				}, {
					label: '预计还款时间',
					prop: 'repay_time',
					width:160
				}, {
					label: '实际还款时间',
					prop: 'actual_repayment_time',
					width:160
				},{
					label: '催收人',
					prop: 's_username',
					width: 80
				}, {
					label: '复审人',
					prop: 'second_name',
					width: 80
				}, {
					label: '备注',
					prop: 'c_remark'
				}]
			}
		},
		methods: {
			init() { //初始化
				this.loading = true;
				this.$api.callrechargerecords(this.baseinfoParams).then(res => {}, response => {
					this.loading = false
					this.baseinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.totalCount || this.pagesize;
				}).catch(val => { //捕获异常

				})
				
			},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.baseinfoParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.baseinfoParams.endTime = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.baseinfoParams.startTime = '';
					this.baseinfoParams.endTime = '';
				}
			},
			tosearch(target) { //搜索
				this.init()
			},
			topage(target){
	            this.baseinfoParams = Object.assign(this.baseinfoParams,target); //对象合并
	            this.init()
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
			},
			//电话催收详情
			callCollection(row) {
				console.log(row);
				this.$router.push({
					name:'电话催收',
					params:{
						user_id:row.user_id,
						user_name:row.user_name,
						phoneNum:row.phone,
						action:2,
					}
				})
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
	
	.el-message-box {}
	
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
</style>