<template>
	<div class="weituiguang">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
		</div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="weituiguang" >
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="添加推广用户" placement="left">
					<el-button type="text" icon='iconfont icon-bianji' @click="adduser(scope.scope.row)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<el-dialog title="添加推广用户" :visible.sync="dialogTableVisible" align="left">
			<el-table :data="gridData" border>
				<el-table-column label="是否开启权限" align="center">
					<template slot-scope="scope">
						<el-radio v-model="radio" label="1">开启</el-radio>
						<el-radio v-model="radio" label="0">关闭</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="generalizetype" label="推广类型" align="center"></el-table-column>
				<el-table-column prop="rewards" label="推广人奖励" align="center"></el-table-column>
			</el-table>
			<div class="savebtn" align="center">
				<el-button size="small" :loading='btloading' type="primary" @click="save">保存</el-button>
				<el-button size="small" type="danger" @click="cancel">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import globaldialog from '@/components/dialog'
	import { dateformat } from '@/utils/index'
	export default {
		name: "weituiguang",
		components: {
			basetable,basepage,globaldialog
		},
		mounted() {
			this.getlist()
		},
		data() {
			return {
				showopera: true,
				tableloading: true,
				btloading:false,
				radio: '1',
				dialogTableVisible: false,
				gridData: [{
					generalizetype: '现金奖',
					rewards: '200'
				}],
				conditions: {
					keyword: '' //关键词
				},
				basetabletitle: [{
						label: '用户编号',
						prop: 'user_id'
					},
					{
						label: '用户姓名',
						prop: 'name'
					},
					{
						label: '性别',
						prop: 'gender'
					},
					{
						label: '手机号',
						prop: 'phone'
					},
					{
						label: '授信额度',
						prop: 'authorized_amount'
					}
				],
				baseinfo: [],
				user_id:'',
				scoperow: {} //当前行信息
			}
		},
		methods: {
			getlist() {
				this.tableloading = true;
				this.$api.getnogeneralize(this.conditions).then(res => {}, response => {
					this.tableloading = false;
					this.baseinfo = response.data.returnObj.peruserList;
					this.baseinfo.forEach(elem=>{
						switch(elem.gender){
		                    case 0: elem.gender  = '男';break;
		                    case 1: elem.gender  = '女';break;
	                    }
					})
				}).catch(val => { //捕获异常
                    this.$message({type:"error",message:'查询失败'})
				})
			},
			tosearch() {
				this.getlist()
			},
			adduser(row) { //添加用户推广权限
				this.user_id = row.user_id
				this.dialogTableVisible = true
			},
			save() { //保存
				let user_id = this.user_id.toString()
				this.btloading = true;
				this.$api.modifygeneralizepower({flag: this.radio,user_id:user_id}).then(res => {}, response => {
					this.btloading = false;
					if(response.data.resultCode == 0) { //修改成功
						this.$message({ type: 'success', message:response.data.resultMsg});
						this.dialogTableVisible = false
					} else if(response.data.resultCode == 1) { //修改失败
						this.$message({ type: 'error', message:response.data.resultMsg});
					}
				}).catch(val => { //捕获异常
                    this.$message({ type: 'error', message:response.data.resultMsg});
				})

			},
			cancel() { //取消
				this.dialogTableVisible = false
			}
		}
	}
</script>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		div,
		button {
			margin-left: 20px;
		}
		button.searchbtn {
			line-height: 32px;
		}
		div.el-input {
			width: 12%;
		}
	}
	
	.operabtn {
		margin-top: 20px;
		text-align: left;
		i {
			cursor: pointer;
		}
	}
	
	.savebtn {
		margin-top: 15px;
	}
</style>