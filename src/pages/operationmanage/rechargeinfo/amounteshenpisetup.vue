<template>
	<div class="amounteshenpisetup">
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading" :showopera="true" v-on:selection="handleSelectionChange">
			<template slot-scope="scope" >
				<el-button type="text" class="el-icon-edit-outline" @click="editAmount(scope.scope.row)"></el-button>
			</template>
		</basetable>
		<!--<basepage :sunmary="basetableinfo.length"></basepage>-->
		<div class="bottom">
			<div class="bottomBtn" align="left">
				<el-button type="primary" size="mini" @click="editAmount('1')">新增</el-button>
				<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delet"></el-button>
			</div>
			<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
		</div>
		
		<!--新增或修改-->
		<el-dialog title="提额设置" :visible.sync="dialogedit" width="30%" :before-close="handleClose">
		  	<el-form ref="formData" :model="formData" status-icon :rules="rules2" label-width="150px" align="left" label-position="left">
				<el-form-item label="是否需主管审批：" prop="mas_audit_falg">
					<el-radio-group v-model="formData.mas_audit_falg">
				      <el-radio v-for="item in my_mas_audit_falg" :label="item.label" :value="item.value" :key="item.value"></el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item label="提额额度限制：" prop="mas_audit_amount">
					<el-input v-model.number="formData.mas_audit_amount"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="mas_status">
					<el-radio-group v-model="formData.mas_status">
				      <el-radio label="有效" value="0"></el-radio>
				      <el-radio label="失效" value="1"></el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button v-if ="formData.mas_id" type="primary" @click="setSubmit('formData')" size="medium">提交</el-button>
					<el-button v-else type="primary" @click="addSubmit('formData')" size="medium">提交</el-button>
					<el-button size="medium" @click="handleClose">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: 'amounteshenpisetup',
		components: {
			basetable,
			basepage
		},
		data() {
			var unKong = (rule, value, callback) => {
		        if (value == '' && value != 0) {
		          return callback(new Error('不能为空'));
		        }else{
		          callback();
		        }
		    };
		    var checknumber =  (rule, value, callback) => {
		        if (value == '' && value != 0) {
		          return callback(new Error('不能为空'));
		        }
 				setTimeout(() => {
		            if (!Number.isInteger(value)) {
		            	callback(new Error('请输入数字值'));
		          	} else {
		                callback();
		            }
		        }, 1000);
		        
		    };
			return {
				pagesize:0,
				//列表头信息
				basetabletitle: [{
						label: '是否需要主管审批',
						prop: 'mas_audit_falg'
					},
					{
						label: '提额额度限制',
						prop: 'mas_audit_amount'
					},
					{
						label: '状态',
						prop: 'mas_status'
					},
					{
						label: '创建时间',
						prop: 'mas_creattime',
					}
				],
				//列表信息
				basetableinfo: [],
				loading: true,
				//请求列表参数
				repayDetParams: {
				},
				//新增弹框
				dialogedit:false,
				formData:{
					mas_audit_falg:'',
					mas_audit_amount:'',
					mas_status:'',
				},
				my_mas_audit_falg:[
					{value:'0',label:'需要'},
					{value:'1',label:'不需要'}
				],
				rules2:{
					mas_audit_falg:[
		          		{required: true, message: '请选择提额类别', trigger: 'change' }
		          	],
		          	mas_audit_amount:[
		          		{required: true, message: '请输入额度限制', trigger: 'blur' }
		          	],
		          	mas_status:[
		          		{required: true, message: '请选择是否有效', trigger: 'change' }
		          	]
				},
				ids:[],
			}
		},
		mounted() {
			this.repayDetails();
		},
		methods: {
			repayDetails() {
				this.loading = true;
				this.$api.amounteshenpisetup(this.repayDetParams).then(res => {}, response => {
					console.log(response);
					this.loading = false;
					this.basetableinfo = response.data.returnObj.setList;
					this.pagesize = response.data.returnObj.totalCount || this.basetableinfo.length;
					for(var i = 0; i<this.basetableinfo.length; i++){
						this.basetableinfo[i].mas_status = this.basetableinfo[i].mas_status ? "失效" : "有效";
						this.basetableinfo[i].mas_audit_falg = this.basetableinfo[i].mas_audit_falg ? "不需要" : "需要"
					}
					
				}).catch(val => {
					//异常
				})
			},
			//点击页码返回参数
	    	topage(topage){
	    		this.repayDetParams = Object.assign(this.collectionParams,topage);
	    		this.repayDetails();
	    	},
	    	//关闭新增弹框
	    	handleClose(){
	    		this.dialogedit = false;
	    		this.formData={
					mas_audit_falg:'',
					mas_audit_amount:'',
					mas_status:'',
				};
	    	},
	    	//新增/设置
	    	editAmount(row){
	    		this.dialogedit = true;
	    		if(row == 1){
	    			this.formData={
						mas_audit_falg:'',
						mas_audit_amount:'',
						mas_status:'',
					};
	    		}else{
	    			this.formData = row;
	    		}
	    	},
	    	//设置提交
	    	setSubmit(formData){
	    		this.$refs[formData].validate((valid) => {
	    			if(valid){
	    				if(this.formData.mas_status == '失效'){
	    					this.formData.mas_status = '1';
	    				}else{
	    					this.formData.mas_status = '0';
	    				}
	    				if(this.formData.mas_audit_falg == '不需要'){
	    					this.formData.mas_audit_falg = '1';
	    				}else{
	    					this.formData.mas_audit_falg = '0';
	    				}
	    				this.$api.setPromoteMoney(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode==0){
								this.dialogedit = false;
								this.$message({
						          message: '修改成功',
						          type: 'success'
						        });
								this.repayDetails()
							}else{
								this.$message({
						          message: '修改失败',
						          type: 'error'
						        });
							}
						}).catch(val => {
							//异常
							this.$message({
					          message: '服务器异常',
					          type: 'error'
					        });
						})
	    				
	    				
	    			}else{
	    				console.log('error submit!!');
						return false;
	    			}
	    		})
	    	},
	    	//新增 提交
	    	addSubmit(formData){
	    		this.$refs[formData].validate((valid) => {
	    			if(valid){
	    				if(this.formData.mas_status == '失效'){
	    					this.formData.mas_status = '1';
	    				}else{
	    					this.formData.mas_status = '0';
	    				}
	    				if(this.formData.mas_audit_falg == '不需要'){
	    					this.formData.mas_audit_falg = '1';
	    				}else{
	    					this.formData.mas_audit_falg = '0';
	    				}
	    				this.$api.addPromoteMoney(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode==0){
								this.dialogedit = false;
								this.$message({
						          message: '添加成功',
						          type: 'success'
						        });
								this.repayDetails()
							}else{
								this.$message({
						          message: '添加失败',
						          type: 'error'
						        });
							}
						}).catch(val => {
							//异常
							this.$message({
					          message: '服务器异常',
					          type: 'error'
					        });
						})
	    			}else{
	    				console.log('error submit!!');
						return false;
	    			}
	    		})
	    	},
	    	handleSelectionChange(val){
	    		this.ids = [];
	    		val.forEach(elem=>{
	    			this.ids.push(elem.mas_id);
	    		})
	    		this.ids = this.ids.join(',');
	    	},
	    	delet(){
	    		if(this.ids != ''){
	    			this.$confirm('是否删除选中项', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.$api.deletPromoteMoney({ids:this.ids}).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode==0){
								this.$message({
						          message: '删除成功',
						          type: 'success'
						        });
								this.repayDetails()
							}else{
								this.$message({
						          message: '删除失败',
						          type: 'error'
						        });
							}
						}).catch(val => {
							//异常
							this.$message({
					          message: '服务器异常',
					          type: 'error'
					        });
						})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
		    		
	    		}else{
	    			this.$message({
			          message: '请选择删除项',
			          type: 'warning'
			        });
	    		}
	    	},
			
		}
	}
</script>

<style scoped="scoped">
	.bottom{
		position: relative;
	}
	.bottomBtn{
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>