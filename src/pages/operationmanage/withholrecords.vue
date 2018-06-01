<template>
	<div class="withholrecords">
		<div class="addtions">
			<el-input v-model="baseinfoParams.keyWords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-select v-model="value6" placeholder="请选择时间" clearable>
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
				</el-option>
			</el-select>
			<div class="block">
				<el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
				</el-date-picker>
			</div>

			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
		</div>
		<basetable :showopera='true' :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" key="withholrecords">
			<template slot-scope="scope">
				<el-button style='padding:0' type="text" icon='iconfont icon-bianji' @click="changinsterstra(scope)"></el-button>

			</template>
		</basetable>
		<div class="addlist">
			<el-button style='float: left;' @click="addinsteredit(0)" size="small" type="primary">新增</el-button>

		</div>
		<basepage :sunmary='pageSize' v-on:topage="topage"></basepage>
		
		<el-dialog title="利率信息" :visible.sync="showdialog" width="660px" center>
			<el-form :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
				<el-form-item  label="用户等级">
				  <el-select v-model="formInline.grade" placeholder="用户等级" style='width:202px;'>
				    <el-option  v-for="item in usergradelist" :key="item.value" :label="item.value"  :value="item.value"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="借款期数">
					<el-select v-model="formInline.qnum" placeholder="借款期数" style='width:202px;'>
					    <el-option  v-for="item in Loanperiodslist" :key="item.value" :label="item.value"  :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="正常利率">
					<el-input v-model="formInline.normalRate" placeholder="正常利率"></el-input>
				</el-form-item>
				<el-form-item label="违约利率">
					<el-input v-model="formInline.defaultRate" placeholder="违约利率"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="showdialog = false">取 消</el-button>
			    <el-button :loading='btloading' type="primary" @click="saveinsteredit">保存</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'withholrecords',
		components: {
			basetable,
			basepage,
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
				showdialog: false,
				btloading:false,
				keyword: '',
				instertype:'',
				formInline: {
					
				},
				options: [ {
					value: '3',
					label: '借款时间'
				}, {
					value: '4',
					label: '应还款时间'
				}],

				value9: '',
				value6: '',
				baseinfoParams:{
					keyWords:'',
				},
				pageList: [], //分页信息
				baseinfo: [], //表格基本信息
				basetabletitle: [{
					label: '用户等级',
					prop: 'grade'
				}, {
					label: '借款期数',
					prop: 'qnum'
				}, {
					label: '正常利率',
					prop: 'normalRate'
				}, {
					label: '违约利率',
					prop: 'defaultRate',

				}, {
					label: '创建时间',
					prop: 'createTime'
				}, {
					label: '更新时间',
					prop: 'updateTime'
				}],
				pageSize:0,//总条数
				usergradelist:[ //用户等级
                   {value:'A'},
                   {value:'B'},
                   {value:'C'},
                   {value:'D'},
                   {value:'A+'}
				],
				Loanperiodslist:[
                   {value:1},
                   {value:3},
                   {value:6},
                   {value:12}
				]
			}
		},
		methods: {
			init() { //初始化
				//请求初审的数据
				this.tableloading = true				
				this.$api.getsterlist(this.baseinfoParams).then(res => {}, response => {
					this.tableloading = false
					if(response.data.resultCode == 0){
	                    this.baseinfo = response.data.returnObj.interestList;
						this.pageSize = response.data.returnObj.totalCount || this.baseinfo.length || this.pageSize;
					}else{
						this.$message({message:response.data.resultMsg,type: 'error'});
					}
				}).catch(val => { //捕获异常
                    this.$message({message:'服务器异常',type: 'error'});
				})
			},
			//选择日期
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.baseinfoParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.baseinfoParams.endTime = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.baseinfoParams.startTime = '';
					this.baseinfoParams.endTime = '';
				}
			},
			//点击页码返回参数
			topage(topage) {
				this.baseinfoParams = Object.assign( this.baseinfoParams,topage);
				this.init();
			},
			tosearch(target) { //搜索
				this.init()
			},
			changinsterstra(scope) {
				this.instertype = 1;
				this.formInline = scope.scope.row
				this.showdialog = true
			},
			addinsteredit(){
				this.instertype = 0;
				this.formInline = {}
				this.showdialog = true
			},
			saveinsteredit(){
				this.btloading=true
				var params = {
					saugId:this.formInline.saugId,
					grade:this.formInline.grade,
					qnum:this.formInline.qnum,
					normalRate:this.formInline.normalRate,
					defaultRate:this.formInline.defaultRate,
					type:this.instertype
				}
				this.$api.saveedietinster(params).then(res => {}, response => {
					this.showdialog = false;
					if(response.data.resultCode == 0){
						this.$message({message: '修改成功',type: 'success'})
					}else{
						this.$message({message:response.data.resultMsg,type: 'error'});
					}
					this.btloading=false;
				}).catch(val => { //捕获异常
                    this.$message({message:'服务器异常',type: 'error'});
				})
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
	.addlist{
		width: 100%;
		margin-top: 25px;
		margin-bottom: 20px;
		height: 3px;
	}
	.addtions {
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