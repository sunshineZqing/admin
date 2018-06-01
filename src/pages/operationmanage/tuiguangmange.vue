<template>
	<div class="tuiguangmange">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>

			<el-select style='width:150px;margin-right:15px;' v-model="conditions.fil" filterable placeholder="请选择检索类型" slot="thetrialconditions" clearable>
				<el-option v-for="item in generalize" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-date-picker style='margin-left: 0;' v-model="value9" type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
		</div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="tuiguangmange" v-on:selection="selection">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="修改权限" placement="left">
					<el-button type="text" icon='iconfont icon-bianji' @click="modifypower(scope)"></el-button>
				</el-tooltip>
				<!-- <el-tooltip class="item" effect="dark" content="关闭权限" placement="left">
					<el-button type="text" icon='iconfont icon-guanbiad' @click="closepower(scope.scope.row)"></el-button>
				</el-tooltip> -->
			</template>
		</basetable>
		<div class="operabtn">
			<el-button type="primary" size="mini" @click="add">新增</el-button>
			<!-- <el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="del"></el-button> -->
		</div>
		<el-dialog title="修改用户推广权限" :visible.sync="dialogTableVisible" align="left">
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
		name: "yfqinfo",
		components: {
			basetable,
			basepage,
			globaldialog
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
				dialogTableVisible: false,
				dialogFormVisible: false,
				conditions: {
					keyword: '', //关键词
					auditTimeStart: '', //开始时间
					auditTimeEnd: '', //结束时间
					fil: '1' //检索类型
				},
				generalize: [ //审核时间
					{
						value: '1',
						label: '开始推广时间'
					},
					{
						value: '2',
						label: '推广创建时间'
					}
				],
				generalizecurrent: '', //当前审核时间
				basetabletitle: [{
						label: '用户编号',
						prop: 'user_id',
						width: 80
					},
					{
						label: '用户姓名',
						prop: 'name',
						width: 80
					},
					{
						label: '性别',
						prop: 'gender',
						width: 80
					},
					{
						label: '手机号',
						prop: 'phone',
						width: 120
					},
					{
						label: '审批额度',
						prop: 'authorized_amount',
						width: 80
					},
					{
						label: '开始推广时间',
						prop: 'createtime',
						width: 160
					},
					{
						label: '推广权限',
						prop: 'flag',
						width: 80
					},
					{
						label: '推广人数',
						prop: 'popularize_register_num',
						width: 80
					},
					{
						label: '推广红包',
						prop: 'promoter_get_red_amount',
						width: 80
					},
					{
						label: '账户余额',
						prop: 'account_balance, width:80'
					},
					{
						label: '推广后快借逾期率',
						prop: 'popularize_overdue_borrow_ratio',
						width: 160
					},
					{
						label: '推广后分期逾期率',
						prop: 'popularize_overdue_stage_ratio',
						width: 160
					},
					{
						label: '被推广所有人快借逾期率',
						prop: 'popularized_overdue_borrow_ratio',
						width: 170
					},
					{
						label: '被推广所有人分期逾期率',
						prop: 'popularized_overdue_stage_ratio',
						width: 170
					},
					{
						label: '创建时间',
						prop: 'createtime',
						width: 160
					},
					{
						label: '修改时间',
						prop: 'updatetime',
						width: 160
					}
				],
				baseinfo: [],
				user_id:'',
				value9: '',
				scoperow: {}, //当前行信息
				selectionlist:''
			}
		},
		methods: {
			getlist() {
				this.tableloading = true;
				this.$api.getgeneralize(this.conditions).then(res => {}, response => {
					this.tableloading = false;
					if(response.data.resultCode == 0){
						this.baseinfo = response.data.returnObj.perList;
						this.baseinfo.forEach(elem=>{
							switch(elem.gender){
			                    case 0: elem.gender  = '男';break;
			                    case 1: elem.gender  = '女';break;
		                    }
						})
					}else{
						this.$message.error('查询失败')
					}
				}).catch(val => { //捕获异常
                    this.$message.error('服务器异常')
				})
			},
			tosearch() {
				this.getlist()
			},
			changetime(value) {
				this.conditions.auditTimeStart = dateformat(value[0], 'yyyy-MM-dd')
				this.conditions.auditTimeEnd = dateformat(value[1], 'yyyy-MM-dd')
			},
			closepower(row){ //关闭用户退关权限
               this.$confirm('确认关闭用户推广权限？','提示',{confirmButtonText: '确定', cancelButtonText: '取消',type: 'warning'}).then(()=>{
               	    this.$message({ type: 'success', message: '关闭成功!' });
               }).catch(()=>{
                    this.$message({ type: 'info', message: '已取消关闭!' });
               })
			},
			modifypower(scope) { //修改用户推广权限
				this.user_id = scope.scope.row.user_id
				this.dialogTableVisible = true
			},
			openpower(scope) { //开启/关闭权限
				this.scoperow = scope.scope.row
				this.$store.dispatch('DIALOGTIP', true)
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
			},
			add() { //新增---去新增页面
	            this.$router.push({ name: '添加推广用户'})
			},
			del() { //批量删除 获取选中数据
			   if(!this.selectionlist){
			      this.$message('请选择要删除的项')
			      return
			    }
			    this.$confirm('此操作将永久删除, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
			        // this.$api.systemusersdelAll({userIds:this.selectionlist}).then(res=>{},response=>{
			        //     if(response.data.resultCode==0){ 
			        //       this.$message({ type: 'success',message: '删除成功!'});
			        //       this.getlist()
			        //     }else if (response.data.resultCode==1) {
			        //       this.$message({ type: 'error',message: '删除失败!'});
			        //     }
			        // }).catch(()=>{//捕获异常
			        //     this.$message({ type: 'error',message: '网络异常!'});
			        // })
			    }).catch(() => {
			          this.$message({type: 'info',message: '已取消删除'});          
			    });
			},
			selection(target){//获取选中的id
				  console.log(target)
		          this.selectionlist = ''
		          target.forEach((elem,index)=>{
		             if(index==0){
		                this.selectionlist += elem.user_id 
		             }else{
		                this.selectionlist  +=  ','+elem.user_id 
		             }
		          })
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