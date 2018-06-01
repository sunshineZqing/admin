<template>
	<div class="ykjsoonoverdue">
		<div class="addtions">
			<el-input v-model="collectionParams.keyWords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-select style='width: 125px;marginRight:10px' v-model="collectionParams.fil" placeholder="请选择时间" clearable>
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-date-picker v-model="value9" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" @change="changetime">
			</el-date-picker>
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
		</div>
		<basetable :showopera='true' :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="userinfo">
			<template slot-scope="scope">
				<el-button style='padding:0' type="text" icon='iconfont icon-duanxinfasong' @click="sendmessage(scope)"></el-button>
				<el-button style='padding:0' type="text" icon='iconfont icon-09dianhua' @click="takephone(scope)"></el-button>
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
		name: 'ykjsoonoverdue',
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
				tableloading: false,
				messagedata:'',
				options: [
				// {
				// 	value: '',
				// 	label: '全部'
				// }, 
				{
					value: '1',
					label: '借款时间'
				}, {
					value: '2',
					label: '应还款时间'
				}],
				value9: '',
				collectionParams:{
					keyWords:'',
					fil:'',
					startTime:'',
					endTime: ''
				},
				pagesize: 10, //分页信息
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '借款ID',
					prop: 'bId',
					width:80
				}, {
					label: '用户编号',
					prop: 'user_id'
				},{
					label: '姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'gender'
				}, {
					label: '手机号',
					prop: 'phone',
					width:120

				},{
					label: '身份证号',
					width:180,
					prop: 'cardId'
				}, {
					label: '借款订单号',
					prop: 'orderId',
					width:140
				}, {
					label: '借款流水号',
					prop: 'tradeSn',
					width:160
				}, {
					label: '借款时间',
					prop: 'borrowTime',
					width:160
				}, {
					label: '应还款时间',
					width:160,
					prop: 'repayTime'
				}, {
					label: '剩余天数',
					prop: 'remaDays'
				}, {
					label: '借款金额',
					prop: 'borrowAmount'
				}, {
					label: '已产生利息',
					prop: 'payInterest'
				}, {
					label: '待还总金额',
					prop: 'stayPayMoney'
				},{
					label: '状态',
					prop: 'os_status'
				},  {
					label: '优惠券',
					prop: 'cName'
				}, {
					label: '所属客服',
					prop: 'suName'
				}, {
					label: '所属客服登录名',
					prop: 'suUserName',
					width:120	
				},  {
					label: '最近电话提醒时间',
					prop: 'os_tel_new_time',
					width:160, 
				},  {
					label: '最近提醒情况',
					prop: 'os_tel_new_result',
					width:120 , 	
				}, {
					label: '短信提醒次数',
					prop: 'os_sms_times'	
				}, {
					label: '电话提醒次数',
					prop: 'os_tel_times'
				}, {
					label: '协议',
					prop: 'ysc_createtime2'
				}]
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true
				this.$api.getsoonborrowoverlist(this.collectionParams).then(res => {}, response => {
					this.tableloading = false
					this.messagedata = response.data.returnObj.smsContent
					this.baseinfo    = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
	                    switch(elem.os_status){
		                    case 0: elem.os_status  = '未提醒';break;
		                    case 1: elem.os_status  = '已短信提醒';break;
		                    case 2: elem.os_status  = '已电话提醒';break;
		                    case 3: elem.os_status  = '已短信、电话提醒';break;
	                    }
	                    
					})
					this.pagesize     = response.data.returnObj.totalCount || this.baseinfo.length;
				}).catch(err => { //捕获异常
					this.$message.error('服务器异常')
                    console.log(err)
				})
			},
			//页码
			topage(target) {
				this.collectionParams = Object.assign(this.collectionParams,target);
				this.init();
			},
			//选择时间
			changetime(value) {
				if(value&&value[0]&&value[1]) {
					this.collectionParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.collectionParams.endTime   = dateformat(value[1], 'yyyy-MM-dd');
				} else{
					this.collectionParams.startTime = "";
					this.collectionParams.endTime   = "";
				}
			},
			tosearch(target) { //搜索
				this.init()
			},
			sendmessage(scope) {
				//获取短信提示
				this.$api.getmsgtip({type:'31',name:scope.scope.row.name,borrow_time:scope.scope.row.borrowTime}).then(res => {}, response => {
					if(response.data.resultCode == 0) {
						this.$confirm('短信内容：'+ response.data.returnObj.sms, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'info'}).then(() => {
							var params = {
								user_id:scope.scope.row.user_id,
								param:response.data.returnObj.param,
								sst_id:response.data.returnObj.sst_id,
								phone: scope.scope.row.phone,
								order_id:scope.scope.row.orderId,
								os_id:scope.scope.row.os_id,
								msg: response.data.returnObj.sms
							}
							console.log(params,101)
							this.$api.sendborrowmessage(params).then(res => {}, response => {
								if(response.data.resultCode == 0) {
									this.$message({type: 'success',message: response.data.resultMsg})
									this.init()
								} else {
									this.$message({type: 'error',message: response.data.resultMsg})
								}
							}).catch(err => { //捕获异常
		                        this.$message({type: 'error',message: '请求超时,请重试'})
							})
						}).catch(() => {
							this.$message({type: 'info',message: '取消发送'});
						});
					} else {
						this.$message({type: 'error',message: response.data.resultMsg})
					}
				}).catch(err => { //捕获异常
                    this.$message({type: 'error',message: '请求超时,请重试'})
				})
			},
			takephone(scope){
				this.$router.push({name:'电话记录',params:{
					name:scope.scope.row.name,
					orderid:scope.scope.row.orderId,
					labelname:'订单编号',
					taketype:0,
					userid:scope.scope.row.user_id,
					aes_id:scope.scope.row.os_id, //即将逾期表主键
					au_id:'0' //认证表主键
				}})
			}
		}
	}
</script>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.el-message-box {
		border: 1px solid #eee;
		width: 577px;
	}
	
	.el-button {
		padding: 12px 20px;
	}
	
	.ykjsoonoverdue .addtions {
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