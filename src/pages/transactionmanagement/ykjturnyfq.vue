<template>
	<div class="">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keywords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<div>
				<el-select style='width: 125px;margin-right:10px;' v-model="baseinfoParams.name" slot="prepend" placeholder="时间" clearable>
						<el-option label="开始借款时间" value="1"></el-option>
						<el-option label="开始还款时间" value="2"></el-option>
						<el-option label="转分期时间" value="3"></el-option>
					</el-select>
			</div>

			<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>
			
			<el-input style='margin-left: 20px;width: 300px;' placeholder="请输入内容" v-model="baseinfoParams.wr_trade_sn" class="input-with-select" clearable>
				<el-select class="select" style='margin-left: 0;width: 125px;' v-model="baseinfoParams.jhtype" slot="prepend" placeholder="借款流水号" >
					<el-option label="借款流水号" value="0"></el-option>
					<el-option label="还款流水号" value="1"></el-option> 
				</el-select>
			</el-input>
			
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
			<a v-if="downloadPower == 1 || downloadPower == 24" class="download" :href="'/ykj/borrow/borrowtostage/excel.do?keywords='+baseinfoParams.keywords+'&name='+baseinfoParams.name+'&lastStart='+baseinfoParams.lastStart+'&lastEnd='+baseinfoParams.lastEnd+'&jhtype='+baseinfoParams.jhtype+'&wr_trade_sn='+baseinfoParams.wr_trade_sn" target="_blank">下载</a>
		</div>
		<basetable :showopera='false' :loading='loading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo"></basetable>
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
			basetable,basepage
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				labelPosition: 'left',
				checktype: '0',
				chooseitem: '', //选中项
				loading: true,
				input5: '',
				select: '',
				keyword: '',
				options: [{
					value: '0',
					label: '全部'
				}, {
					value: '3',
					label: '借款时间'
				}, {
					value: '4',
					label: '应还款时间'
				}, {
					value: '5',
					label: '时间还清时间'
				}],
				value9: '',
				value6: '',
				value7: '',
				value5: '',
				value8: '',
				pagesize: 10, //分页信息
				baseinfoParams:{//表格请求参数
					keywords:'',
					name:'',
					lastStart:'',
					lastEnd:'',
					wr_trade_sn:'',
					jhtype:'',
				},
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户编号',
					prop: 'user_id',
					width:80
				}, {
					label: '用户姓名',
					prop: 'name',
					width:80
				}, {
					label: '性别',
					prop: 'gender',
					width:70
				},  {
					label: '手机号码',
					prop: 'phone',
					width:120
				},{
					label: '订单号',
					prop: 'order_id',
					width:120
				}, {
					label: '借款金额',
					prop: 'borrow_amount',
					width:80
				}, {
					label: '利息',
					prop: 'pay_interest',
					width:60
				}, {
					label: '逾期利息',
					prop: 'over_due_interest_total',
					width:80
				}, {
					label: '服务费',
					prop: 'service_fee',
					width:60
				}, {
					label: '借款时间',
					prop: 'borrow_time',
					width:160
				}, {
					label: '还款时间',
					prop: 'repay_time',
					width:160
				},{
					label: '转分期时间',
					prop: 'actual_repayment_time',
					width:160
				}, {
					label: '还款流水号',
					prop: 'pr_trade_sn',
					width:160
				}, {
					label: '转分期金额',
					prop: 'payment_amount'
				},  {
					label: '是否逾期',
					prop: 'is_overdue',
					width:80
				}, {
					label: '催收员',
					prop: 'collName'
				},{
					label: '逾期天数',
					prop: 'overduedays'
				}],
				downloadPower:'',//下载权限				
			}
		},
		methods: {
			init() { //初始化
				this.loading = true;
				this.$api.kjzfqcords(this.baseinfoParams).then(res => {}, response => {
					this.loading = false
					this.downloadPower = response.data.returnObj.sr_id;
					this.baseinfo = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }						
	                    switch(elem.is_overdue){
		                    case 0: elem.is_overdue  = '未逾期';break;
		                    case 1: elem.is_overdue  = '已逾期';break;
	                    }
					})
					this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length;
				}).catch(val => { //捕获异常

				})
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