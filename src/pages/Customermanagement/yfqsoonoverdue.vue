<template>
	<div class="yfqsoomuverdue">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keyWords" placeholder="请输入关键字" clearable class="addtionInput">
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-select v-model="baseinfoParams.fil" placeholder="请选择时间" clearable>
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<div class="block">
				<el-date-picker v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
				</el-date-picker>
			</div>
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
	import { dateformat } from '@/utils/index'
	import basepage from '@/components/basepage'
	export default {
		name: 'yfqsoomuverdue',
		components: {
			basetable,basepage,
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				labelPosition: 'left',
				checktype: '0',
				chooseitem: '', //选中项
				tableloading: true,
				keyword: '',
				options: [ {
					value: '1',
					label: '借款时间'
				}, {
					value: '2',
					label: '应还款时间'
				}],
				value9: '',
				messagedata:'',
				pagesize: 10, //分页信息
				baseinfoParams:{//请求信息
					keyWords: '',
					fil: '',
					startTime:'',
					endTime: ''
				},
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '借款ID',
					prop: 'stageDetailId', 
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
					prop: 'cert_card'
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
					prop: 'repayTime',
					width:120
				}, {
					label: '总期数',
					prop: 'qishu'
				}, {
					label: '当前期数',
					prop: 'qishuNo'
				}, {
					label: '借款金额',
					prop: 'amountCount'
				}, {
					label: '等额本金',
					prop: 'yueGongAmount'
				}, {
					label: '本期利息',
					prop: 'interest'
				},  {
					label: '待还总金额',
					prop: 'stayMoney'
				}, {
					label: '优惠券',  
					prop: 'cName'
				},  {
					label: '所属客服',
					prop: 'suName'
				}, {
					label: '所属客服登录名',
					prop: 'suUserName',
					width:120	
				},  {
					label: '状态',
					prop: 'os_status'
				}, {
					label: '剩余天数',
					prop: 'remaDays'  
				}, {
					label: '最近提醒情况',
					prop: 'os_tel_new_result'
				}, {
					label: '最近电话提醒时间',
					prop: 'os_tel_new_time',
					width:160
				}, {
					label: '短信提醒次数',
					prop: 'os_sms_times'
				}, {
					label: '电话提醒次数',
					prop: 'os_tel_times'
				},  {
					label: '协议',
					prop: 'ysc_createtime2'
				}]
			}
		},
		methods: {
			init() { //初始化
				this.tableloading = true
				this.$api.getsoonstageoverlist(this.baseinfoParams).then(res => {}, response => {
					this.tableloading = false
					this.messagedata  = response.data.returnObj.smsContent
					this.baseinfo     = response.data.returnObj.varList;
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
					this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length;
				}).catch(err => { //捕获异常
                    console.log(err)
				}) 
			},
			//选择日期
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.baseinfoParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.baseinfoParams.endTime   = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.baseinfoParams.startTime = '';
					this.baseinfoParams.endTime   = '';
				}
			},
			tosearch(target) { //搜索
				this.init()
			},
			sendmessage(scope){
	            this.$api.getmsgtip({type:'41',name:scope.scope.row.name,borrow_time:scope.scope.row.borrowTime,qishuNo:scope.scope.row.qishuNo}).then(res => {}, response => {
					if(response.data.resultCode == 0) {
						this.$confirm('短信内容：'+ response.data.returnObj.sms, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'info'}).then(() => {
							var params = {
								param:response.data.returnObj.param,
								sst_id:response.data.returnObj.sst_id,
								user_id:scope.scope.row.user_id,
								phone: scope.scope.row.phone,
								order_id:scope.scope.row.orderId,
								os_id:scope.scope.row.os_id,
								msg:response.data.returnObj.sms,
							}
							this.$api.sendstagmessage(params).then(res => {}, response => {
								if(response.data.resultCode == 0) {
									this.$message({type: 'success',message: response.data.resultMsg});
									this.init()
								} else {
									this.$message.error(response.data.resultMsg);
								}

							}).catch(val => { //捕获异常

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
					taketype:1,
					userid:scope.scope.row.user_id,
					aes_id:scope.scope.row.os_id,//即将逾期表主键
					au_id:'0' //认证表主键
				}});
			},
			topage(target) {
				this.baseinfoParams = Object.assign(this.baseinfoParams,target);
				this.init();
			}
		}
	}
</script>
<style type="text/css">
	.el-message-box {
		border: 1px solid #eee;
		width: 577px;
	}
</style>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.el-message-box {}
	
	.el-button {
		padding: 12px 20px;
	}
	
	.yfqsoomuverdue .addtions {
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
		.addtionInput{
			width: 12%;
		}
	}
</style>