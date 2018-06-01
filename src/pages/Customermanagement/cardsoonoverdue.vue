<template>
	<div class="cardsoonoverdue">
		<div class="addtions">
			<el-input v-model="conditions.keyWords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			
			<div class="block">
				<el-date-picker  v-model="value9"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changetime">
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
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'cardsoonoverdue',
		components: {
			basetable,basepage,
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				tableloading: false,
				value9: '',
				conditions:{ //搜索条件
	                keyWords: '',
					startTime:'',
					endTime: '',
				},
				pagesize: 10, //分页信息
				baseinfo: [], //表格基本信息
				
				basetabletitle: [{
					label: '用户ID',
					prop: 'userId'
				}, {
					label: '姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'sex'
				}, {
					label: '手机号',
					prop: 'phone',
					
				}, {
					label: '身份证号',
					prop: 'certCard',
					width:'160'
				},{
					label: '剩余到期时间',
					prop: 'months'
				},{
					label: '身份证状态',
					prop: 'status'
				}, {
					label: '提醒状态',
					prop: 'aes_status'
				},{
					label: '短信提醒次数',
					prop: 'aes_sms_times'
				},{
					label: '电话提醒次数',
					prop: 'aes_tel_times'  
				},{
					label: '最近电话提醒情况',   
					prop: 'aes_tel_new_result' ,
					width:150 
				},{
					label: '最近电话提醒时间',
					prop: 'aes_tel_new_time',
					width:160  
				}]
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true
				this.$api.getsoonstcardoverlist(this.conditions).then(res => {}, response => {
					this.tableloading = false
					this.baseinfo     = response.data.returnObj.userList;
					this.baseinfo.forEach(elem=>{
						switch(elem.sex){
		                    case 0: elem.sex  = '男';break;
		                    case 1: elem.sex  = '女';break;
	                    }							
	                    switch(elem.status){
		                    case 0: elem.status  = '未失效';break;
		                    case 1: elem.status  = '已失效';break;
	                    }						
	                    switch(elem.aes_status){
		                    case 0: elem.aes_status  = '未提醒';break;
		                    case 1: elem.aes_status  = '已短信提醒';break;
		                    case 2: elem.aes_status  = '已电话提醒';break;
		                    case 3: elem.aes_status  = '已短信、电话提醒';break;
	                    }
					})
					this.pagesize = response.data.returnObj.totalCount ||  this.baseinfo.length;
				}).catch(err => { //捕获异常
                    console.log(err)
				})
			},
			tosearch(target) { //搜索
				this.init()
			},
			//选择日期
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.conditions.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.conditions.endTime   = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.conditions.startTime = '';
					this.conditions.endTime   = '';
				}
			},
			sendmessage(scope) {
				//获取短信提示
				this.$api.getmsgtip({type:'101',name:scope.scope.row.name,au_ynumauth_type:9}).then(res => {}, response => {
					if(response.data.resultCode == 0) {
						this.$confirm('短信内容：'+ response.data.returnObj.sms, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'info'}).then(() => {
							var params = {
								user_id:scope.scope.row.user_id,
								phone: scope.scope.row.phone,
								aes_id:scope.scope.row.aes_id,
								au_id:scope.scope.row.au_id,
								param:response.data.returnObj.param,
								sst_id:response.data.returnObj.sst_id,
								msg: response.data.returnObj.sms
							}
							this.$api.sendmsgcard(params).then(res => {}, response => {
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
					orderid:scope.scope.row.certCard,  //身份证号
					labelname:'身份证号',
					taketype:2,  //身份证即将逾期
					userid:scope.scope.row.userId,
					aes_id:scope.scope.row.aes_id || '0', //即将逾期表主键
					au_id:scope.scope.row.au_id || '0'//认证表主键
				}})
			},
			topage(target) {
				this.conditions = Object.assign(this.conditions,target);
				this.init();
			}
		}
	}
</script>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	.el-button {
		padding: 12px 20px;
	}
	.cardsoonoverdue .addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,button {
			margin-left: 20px;
		}
		div.el-input {
			width: 12%;
		}
	}
</style>