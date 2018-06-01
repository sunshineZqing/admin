<template>
	<div class="">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
		</div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="yfqinfo">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="修改权限" placement="left">
					<el-button type="text" icon='iconfont icon-bianji' @click="modifypower(scope)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content='删除' placement="left">
					<el-button type="text" class='el-icon-delete' @click="delself(scope)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<div class="operabtn">
			<el-button type="primary" size="mini" @click="">新增</el-button>
			<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click=""></el-button>
		</div>
		<el-dialog title="修改用户推广权限" :visible.sync="dialogTableVisible" align="left">
		</el-dialog>
		<basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: "yfqinfo",
		components: {
			basetable,basepage
		},
		mounted() {
			this.getlist()
		},
		data() {
			return {
				showopera: true,
				tableloading: false,
				dialogTableVisible: false,
				basetabletitle: [
				    {  label: '名称',prop: 'user_id'},
					{  label: '权限标识',prop: 'name'},
					{  label: '备注',  prop: 'gender'}
				],
				conditions:{
                    keyword:""
				},
				baseinfo: [],
				pagesize:10,
			}
		},
		methods: {
			getlist() {
		
			},
			tosearch() {
				this.getlist()
			},
			modifypower(scope) {
				// this.user_id = scope.scope.row.user_id
				// this.dialogTableVisible = true
			},
			delself(scope){ //删除当前行

			},
			add() { //新增

			},
			del() { //删除 获取选中数据

			},
			topage(target){//跳页
	          this.conditions = Object.assign(target,this.conditions); //对象合并
	          this.getlist()
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