<template>
	<div class="popularize">
		<div class="addtions">
			<el-input v-model="conditions.keywords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-input v-model="conditions.name1" placeholder="初审人" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-input v-model="conditions.name2" placeholder="复审人" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>			
			<el-input v-model="conditions.name3" placeholder="终审人" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-date-picker  v-model="timescope" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" @change="changetime">
			</el-date-picker>
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
		</div>
		<basetable :loading='taleloading' :showopera='true' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" specilletter="1" key="userinfo">
		</basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
		<el-dialog title="推广人数" :visible.sync="showdialog" width='400px'>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat,cardcheck,phonecheck } from '@/utils/index'
	export default {
		name: 'popularize',
		components: {
			basetable,basepage
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				showdialog: false, //是否显示表单弹框
				conditions:{  //搜索条件
					keywords:'',
                    name1:"",
                    name2:'',
                    name3:'',
					registerTimeStart:'',
					registerTimeEnd:''
				},
				taleloading: false,  //表格加载。。。
				timescope:'',
				pagesize: 0, //分页信息
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户编号',
					prop: 'name'
				}, {
					label: '用户姓名',
					prop: 'name'
				}, {
					label: '性别',
					prop: 'gender',
					width: 80
				},  {
					label: '电话',
					prop: 'phone',
					width: 120
				}, {
					label: '初审人',
					prop: 'ynum_count'
				}, {
					label: '复审人',
					prop: 'au_status1'
				}, {
					label: '终审人',
					prop: 'au_status3'
				},{
					label: '审批额度',
					prop: 'au_status2'
				},{
					label: '开始推广时间',
					prop: 'share_name'
				}, {
					label: '推广人数',
					prop: 'classification'
				}, {
					label: '红包总额',
					prop: 'create_time',
				}]
			}
		},
		methods: {
			//0
			init() { //初始化
				//请求初审的数据
				// this.taleloading = true
				// this.$api.popularize(this.conditions).then(res => {}, response => {
				// 	this.taleloading = false
				// 	this.baseinfo = response.data.returnObj.userList;
				// 	this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length || this.pagesize
				// 	this.baseinfo.forEach(elem=>{
				// 	   elem.gender = 	elem.gender == 0 ? '男' : '女'
				// 	})
					
				// }).catch(err => { //捕获异常
    //                 console.log(err)
				// })
			},
			//选择时间范围
			changetime(value) {
				if(value&&value[0]&&value[1]) {
					this.conditions.registerTimeStart = dateformat(value[0], 'yyyy-MM-dd');
					this.conditions.registerTimeEnd   = dateformat(value[1], 'yyyy-MM-dd');
				}else{
					this.conditions.registerTimeStart = '';
					this.conditions.registerTimeEnd   = '';		
				}
			},
			tosearch() { //搜索
				this.init()
			},
		    topage(target){//跳页
		        this.conditions = Object.assign(this.conditions,target); //对象合并
		        this.init()
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
	
	.popularize .addtions {
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