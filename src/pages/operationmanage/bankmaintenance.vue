<template>
	<div class="bankmaintenance">
		<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :showopera='true' key="bankmaintenance" >
		    <template slot-scope="scope">
		        <el-tooltip class="item" effect="dark" content="编辑" placement="left">
		          <el-button type="text" class='iconfont icon-bianji' @click="editbank(scope.scope.row)" size="medium"></el-button>
		        </el-tooltip>
	        </template>
	    </basetable>
		<div class="bottomBtn" align="left">
			<el-button type="primary" size="mini" @click="add">新增</el-button>
		</div>
		<basepage :sunmary='pageSize' v-on:topage="topage"></basepage>
		<el-dialog title="银行信息" :visible.sync="showdialog" width="23%" center>
			<el-form  label-position='left' label-width="120px" :model="formInline"  class="demo-form-inline" ref="formInline">
				<el-form-item label="维护类型" prop="bm_type">
					<el-select v-model="formInline.bm_type" placeholder="维护类型">
					    <el-option v-for="item in bm_types" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
					 </el-select>
				</el-form-item>
				<el-form-item label="维护开始时间" prop="bm_start_time">
					<el-date-picker  v-model="formInline.bm_start_time" type="date" @change="changetime" placeholder="维护开始时间" ></el-date-picker>
				</el-form-item>
				<el-form-item label="维护结束时间" prop="bm_end_time">
					<el-date-picker   v-model="formInline.bm_end_time" type="date" @change="changetime0" placeholder="维护结束时间" ></el-date-picker>
				</el-form-item>
				<el-form-item class="btnstyle">
					<el-button  size="medium" :loading='btloading' type="primary" @click="saveinsteredit('formInline')">保存</el-button>
				    <el-button  size="medium" @click="showdialog = false">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
    import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'bankmaintenance',
		components: {
			basetable,basepage
		},
		data() {
			return {
				pageSize:0,//总条数
				conditions:{
                    bl_id:''
				},
				basetabletitle:[
				  { prop:'bl_name',label:'银行名称'},
				  { prop:'type',label:'银行状态'},
				  { prop:'bm_type',label:'维护类型'},
				  { prop:'bm_start_time',label:'维护开始时间'},
				  { prop:'bm_end_time',label:'维护结束时间'}
				],
				baseinfo:[],
				formInline: {bm_type:'',bm_start_time:'',bm_end_time:'',bm_id:'',bl_id:''},
				bm_types:[
				   { value:0,label:'正常'}, 
                   { value:1,label:'提现维护'}, 
                   { value:2,label:'还款维护'},
                   { value:3,label:'全部维护'}
				],
				tableloading: true,
				btloading: false,
				//列表信息
				showdialog: false,
		        deletlist:[]
			}
		},
		mounted() {
			this.getlist()
			this.conditions.bl_id = this.$route.params.bl_id
		},
		methods: {
			getlist(){
                this.tableloading = true;
                this.$api.getbankmiantenance(this.conditions).then(res => {}, response => {
					this.tableloading  = false;
					if(response.data.resultCode == 0 ){
						this.baseinfo = response.data.returnObj.varList;
						this.baseinfo.forEach(elem=>{
							switch(elem.type){
								case 0: elem.type = '正常'; break;
								case 1: elem.type = '维护中'; break;
							}
							switch(elem.bm_type){
								case 0: elem.bm_type = '正常'; break;
								case 1: elem.bm_type = '提现维护'; break;
								case 2: elem.bm_type = '还款维护'; break;
								case 3: elem.bm_type = '全部维护'; break;
							}
						})
						this.pageSize  = response.data.returnObj.totalCount || this.baseinfo.length || this.pageSize;
					}else{
						this.$message({type:'error',message:response.data.resultMsg})
					}
				}).catch(val => {
					this.$message({type:'error',message:"服务器异常"})
				})
			},
			topage(target) {//跳页
				this.conditions = Object.assign(this.conditions,target);
				this.getlist();
			},
			editbank(row) {//编辑
				this.formInline.bl_id           = row.bl_id;
				this.formInline.bm_id           = row.bm_id;
                let bm_type = this.bm_types.filter(item=>{ return item.label == row.bm_type})
				this.formInline.bm_type         = bm_type[0].value
				this.formInline.bm_start_time   = row.bm_start_time;
				this.formInline.bm_end_time     = row.bm_end_time;
				this.showdialog = true;
			},
			changetime(value){//开始时间
		        if(value){
                    this.formInline.bm_start_time = dateformat(value,'yyyy-MM-dd')
		        }else{
		          this.formInline.bm_start_time = ''
		        }
		    },
		    changetime0(value){//结束时间
		        if(value){
                   this.formInline.bm_end_time   = dateformat(value,'yyyy-MM-dd')
		        }else{
		           this.formInline.bm_end_time   = ''
		        }
		    },
			add() {//新增
				this.formInline.bl_id           = this.$route.params.bl_id;
				this.formInline.bm_id           = '';
				this.formInline.bm_type         = '';
				this.formInline.bm_start_time   = '';
				this.formInline.bm_end_time     = '';
				this.showdialog = true;
			},
			saveinsteredit(formName) { //保存操作
            	let params = {
            		bm_id:this.formInline.bm_id,
            		bl_id:this.formInline.bl_id,
            		bm_type:this.formInline.bm_type,
            		bm_start_time:this.formInline.bm_start_time,
            		bm_end_time:this.formInline.bm_end_time
            	}
            	//执行保存
            	this.$api.savebankmiantenance(params).then(res => {}, response => {
					this.$message({type: 'success',message: response.data.resultMsg})
					if(response.data.resultCode == 0){
						this.showdialog = false
						this.getlist()
					}
				}).catch(val => {
					this.$message({type: 'error',message: '服务器异常'})
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.bottomBtn{
		margin-top: 15px;
	}
</style>