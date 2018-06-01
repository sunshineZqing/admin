<template>
	<div class="">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keyword" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<div>
				<el-select style='width: 125px;' v-model="baseinfoParams.type" slot="prepend" placeholder="状态" clearable>
					<el-option label="成功" value="1"></el-option>
					<el-option label="失败" value="0"></el-option>
				</el-select>
			</div>
			<div>
				<el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
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
				select:'',
				keyword: '',
				value9: '',
				pagesize: 10, //分页信息
				baseinfoParams:[],//请求表格参数
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户编号',
					prop: 'user_id',
					width: 80
				}, {
					label: '姓名',
					prop: 'name',
					width: 90

				}, {
					label: '性别',
					prop: 'gender',
					width: 60

				}, {
					label: '手机号',
					prop: 'phone',
					width: 120

				}, {
					label: '银行卡号',
					prop: 'accountNo'
				}, {
					label: '订单号',
					prop: 'orderid'
				}, {
					label: '扣款状态',
					prop: 'type',
					width: 80

				}, {
					label: '状态说明',
					prop: 'reason',
					width: 500

				}, {
					label: '扣款时间',
					prop: 'creat_time'
				}]
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true
				this.$api.withholrecords(this.baseinfoParams).then(res => {}, response => {
					this.tableloading = false
					this.baseinfo = response.data.returnObj.varList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
	                    switch(elem.type){
		                    case 0: elem.type  = '失败';break;
		                    case 1: elem.type  = '成功';break;
	                    }

					})
					this.pagesize = response.data.returnObj.totalCount || this.pagesize;
				}).catch(val => { //捕获异常

				})
			},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.baseinfoParams.auditTimeStart = dateformat(value[0], 'yyyy-MM-dd');
					this.baseinfoParams.auditTimeEnd = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.baseinfoParams.auditTimeStart = '';
					this.baseinfoParams.auditTimeEnd = '';
				}
			},
			tosearch(target) { //搜索
				this.init()
			},
			//点击页码
			topage(target){
	            this.baseinfoParams = Object.assign(this.baseinfoParams,target); //对象合并
	            this.init()
			},
			sendmessage(scope) {
				console.log(scope.scope.row.create_time)
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
</style>