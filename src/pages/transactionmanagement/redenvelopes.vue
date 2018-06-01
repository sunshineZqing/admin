<template>
	<div class="">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keyWords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<div>
				<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div>
				<el-select v-model="value5" multiple placeholder="交易状态" @change="changeSelect" clearable>
					<el-option label="取消" value="0"></el-option>
					<el-option label="处理中" value="1"></el-option>
					<el-option label="失败" value="2"></el-option>
					<el-option label="成功" value="3"></el-option>
					<el-option label="退款" value="4"></el-option>
					<el-option label="创单" value="5"></el-option>
				</el-select>
			</div>
			<div>
				<el-input style='width: 90px;' v-model="baseinfoParams.minMoney" placeholder="最小金额"></el-input>
				<span style="color: #8a8a8a;">--</span>
				<el-input style='width: 90px;margin-left: 0;' v-model="baseinfoParams.maxMoney" placeholder="最大金额"></el-input>
			</div>
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
			<a class="download" :href="'/ykj/red/drawexcel.do?keyWords='+baseinfoParams.keyWords+'&status='+baseinfoParams.status+'&startTime='+baseinfoParams.startTime+'&endTime='+baseinfoParams.endTime+'&minMoney='+baseinfoParams.minMoney+'&maxMoney='+baseinfoParams.maxMoney" target="_blank">下载</a>
		</div>
		<basetable :showopera='false' :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo"></basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage  from '@/components/basepage'
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
				tableloading: true,
				value5: '',
				maxmoney: '',
				minmoney: '',
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

				value5: '',
                pagesize:10,//分页信息
                baseinfoParams:{
                	keyWords:'',
                	status:'',
                	startTime:'',
                	endTime:'',
                	minMoney:'',
                	maxMoney:'',
                },//请求表格信息参数
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'gender'
				}, {
					label: '手机号',
					prop: 'phone',

				}, {
					label: '订单号',
					prop: 'orderId'
				}, {
					label: '流水号',
					prop: 'tradeSn'
				}, {
					label: '提现金额',
					prop: 'payAmount'
				}, {
					label: '银行',
					prop: 'accountNo'
				}, {
					label: '提现时间',
					prop: 'createTime'
				}, {
					label: '交易状态',
					prop: 'status'
				}]
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true
				this.$api.redenvecords(this.baseinfoParams).then(res => {}, response => {
					this.baseinfo = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
	                    switch(elem.status){
		                    case 0: elem.status  = '用户取消';break;
		                    case 1: elem.status  = '处理中';break;
		                    case 2: elem.status  = '失败';break;
		                    case 3: elem.status  = '成功';break;
		                    case 4: elem.status  = '退款';break;
		                    case 5: elem.status  = '创单';break;
	                    }
					})
					this.pagesize = response.data.returnObj.totalCount  || this.pagesize;
					this.tableloading = false
				}).catch(val => { //捕获异常
					this.$message({message: '服务器请求异常',type: 'warning'});
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
			changeSelect(value){
				this.baseinfoParams.status = value.join(',');
			},
			tosearch(target) { //搜索
				this.init()
			},
			//页码
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
		div{
			display: inline-block;
		}
		div,button {
			display: inline-block;
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