<template>
	<div class="">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keywords"></el-input>
			<el-date-picker style='margin-left: 10px;' v-model="value9" type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>

			<el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
		</div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="yfqinfo" v-on:selection="selection">
<!-- 			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="删除" placement="left">
					<el-button type="text" icon='el-icon-delete' @click="delself(scope)"></el-button>
				</el-tooltip>
			</template> -->
		</basetable>
<!-- 		<div class="operabtn">
			<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="del"></el-button>
		</div> -->
		<basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import globaldialog from '@/components/dialog'
	import { dateformat } from '@/utils/index'
	import { Message } from 'element-ui'
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
				showopera: false,//显示操作按钮
				tableloading: true,
				pagesize:10,//总条目数
				conditions: {
					keywords: '', //关键词
					lastStart: '', //开始时间
					lastEnd: ''//结束时间
				},
				selectionlist:[],
				basetabletitle: [{
						label: '用户名',
						prop: 'username'
					},
					{
						label: '姓名',
						prop: 'operate_user_name'
					},
					{
						label: '部门',
						prop: 'parent_id'
					},
					{
						label: '角色',
						prop: 'role_name'
					},
					{
						label: '操作时间',
						prop: 'operate_time'
					},
					{
						label: '事件',
						prop: 'operate_content'
					}
				],
				baseinfo: [],
				user_id:'',
				value9: '',
				scoperow: {}, //当前行信息
			}
		},
		methods: {
			getlist() {
				this.tableloading = true;
				this.$api.logmangement(this.conditions).then(res => {}, response => {
					this.baseinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.page.totalResult || this.pagesize 
					this.tableloading = false;
				}).catch(val => { //捕获异常
                    this.tableloading = false;
				})
			},
			tosearch() {
				this.getlist()
			},
			changetime(value) {
		        if(value&&value[0]&&value[1]){
		          this.conditions.lastStart = dateformat(value[0],'yyyy-MM-dd')
		          this.conditions.lastEnd   = dateformat(value[1],'yyyy-MM-dd')
		        }
			},
			delself(scope) {
			    this.$confirm('确认删除当前项, 是否继续?','提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	//执行删除
		        	this.user_id = scope.scope.row.user_id
		            this.$message({
			            type: 'success',
			            message: '删除成功!'
		            });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
				
			},
  			topage(target){//跳页
  			    this.conditions = Object.assign(this.conditions,target); //对象合并
  			    this.getlist()
  			},
  			selection(target){
  				this.selectionlist  = target
  			},
			del(){ //删除 获取选中数据
				if(this.selectionlist.length==0){
					this.$message('请选择要删除的项')
					return
				}
				this.$confirm('确认删除所有选中项, 是否继续?','提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	//执行删除
		        	console.log(this.selectionlist)
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
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