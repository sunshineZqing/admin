<template>
	<div class="amountsetup">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keyword" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="collectionParams.fil" placeholder="请选择借款类型" clearable>
					<el-option label="创建时间" value="1"></el-option>
					<el-option label="最后一次操作时间" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-button type="primary" size="medium" @click="repayDetails">查询</el-button>
		
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading" :showopera="true" v-on:selection="selection">
			<template slot-scope="scope" >
				<el-button type="text" class="el-icon-edit-outline" @click="editAmount(scope.scope.row)"></el-button>
			</template>
		</basetable>
		<div class="bottom">
			<div class="bottomBtn" align="left">
				<el-button type="primary" size="mini" @click="editAmount('1')">新增</el-button>
				<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delet"></el-button>
			</div>
			<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
		</div>
		<el-dialog title="编辑提额设置" :visible.sync="amountsetupBox" width="30%" align="left">
			<el-form ref="formData" :model="formData" status-icon :rules="rules2" label-width="130px" align="left" label-position="left">
				<el-form-item label="提额类别：" prop="m_type">
					<el-select v-model="formData.m_type" placeholder="请选择类别">
						<el-option v-for="item in m_types" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
	
				<el-form-item label="使用额度占比：" prop="use_amount_proportion">
					<el-input v-model="formData.use_amount_proportion"></el-input>
				</el-form-item>
				<el-form-item label="还款记录次数：" prop="payment_times">
					<el-input v-model.number="formData.payment_times"></el-input>
				</el-form-item>
				<el-form-item label="累计使用天数：" prop="use_days">
					<el-input v-model.number="formData.use_days"></el-input>
				</el-form-item>
				<el-form-item label="逾期程度：" prop="is_overdue">
					<el-select v-model="formData.is_overdue" placeholder="请选择">
						<el-option v-for = "item in is_overdues" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="轻微逾期次数：" prop="overdue_times">
					<el-input v-model.number="formData.overdue_times"></el-input>
				</el-form-item>
				<el-form-item label="单次提额限额：" prop="single_mention_quota">
					<el-input v-model.number="formData.single_mention_quota"></el-input>
				</el-form-item>
				<el-form-item label="每年频次：" prop="year_frequency">
					<el-input v-model.number="formData.year_frequency"></el-input>
				</el-form-item>
				<el-form-item label="使用状态：" prop="is_enabled">
					<el-select v-model="formData.is_enabled" placeholder="请选择">
						<el-option v-for="item in is_enableds" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button v-if ="formData.id" type="primary" @click="setSubmit('formData')" size="medium">提交</el-button>
					<el-button v-else type="primary" @click="addSubmit('formData')" size="medium">提交</el-button>
					<el-button size="medium" @click="amountsetupBox = false">取消</el-button>
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
		name: 'amountsetup',
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
				changeTime:[],
				collectionParams:{},//请求参数
				//列表头信息
				basetabletitle: [{
						label: '提额类别',
						prop: 'm_type',
						width:'150px'
					},
					{
						label: '使用额度占比',
						prop: 'use_amount_proportion'
					},
					{
						label: '还款记录次数',
						prop: 'payment_times'
					},
					{
						label: '累计使用天数',
						prop: 'use_days'
					},
					{
						label: '逾期程度',
						prop: 'is_overdue'
					},
					{
						label: '轻微逾期次数',
						prop: 'overdue_times'
					},
					{
						label: '单次提额限额',
						prop: 'single_mention_quota'
					},
					{
						label: '每年频次',
						prop: 'year_frequency'
					},
					{
						label: '使用状态',
						prop: 'is_enabled'
					},
					{
						label: '添加时间',
						prop: 'create_time',
						width:'160px'
					},
					{
						label: '最后一次操作人',
						prop: 'last_op_name'
					},
					{
						label: '最后一次修改时间',
						prop: 'last_op_time',
						width:'160px',
					}
				],
				//列表信息
				basetableinfo: [],
				loading: true,
				//请求列表参数
				delParams: {
					ids:[]
				},
				amountsetupBox:false,//提额设置弹框
				m_types:[
				  {value:'0',label:'只使用快借'},
				  {value:'1',label:'只是用分期'},
				  {value:'2',label:'快借、分期均未使用'},
				  {value:'3',label:'快借、分期同时使用'}
				],
				is_overdues:[
					{value:'0',label:'无'},
					{value:'1',label:'有'}
				],
				is_enableds:[
					{value:'0',label:'可用'},
					{value:'1',label:'不可用'}
				],
				formData: {
					m_type: '',
					use_amount_proportion: '',
					payment_times: '',
					use_days: '',
					is_overdue: '',
					overdue_times: '',
					single_mention_quota: '',
					year_frequency: '',
					is_enabled: ''
				},
				rules2: {
					m_type:[
		          		{required: true, message: '请选择提额类别', trigger: 'blur,change' }
		          	],
		          	use_amount_proportion:[
		          		{required: true, message: '请输入使用额度占比'},
		          	],
		          	payment_times:[
		          	    { required: true, message: '请输入还款次数'},
		          		{ type: 'number', message: '请输入数字值',trigger:'blur'}
		          	],
		          	use_days:[
		          		{ required: true, message: '请输入使用天数'},
		          		{ type: 'number', message: '请输入数字值',trigger:'blur'}
		          	],
		          	is_overdue:[
		          		{required: true,message: '请选择是否逾期', trigger: 'blur,change' },
		          	],
		          	overdue_times:[
		          		{ required: true, message: '请输入轻微逾期次数'},
		          		{ type: 'number', message: '请输入数字值',trigger:'blur'}
		          	],
		          	single_mention_quota:[
		          		{ required: true, message: '请输入单次提额限额'},
		          		{ type: 'number', message: '请输入数字值',trigger:'blur'}
		          	],
		          	year_frequency:[
		          		{ required: true, message: '请输入每年频次'},
		          		{ type: 'number', message: '请输入数字值',trigger:'blur'}
		          	],
		          	is_enabled:[
		          		{required: true,message: '请选择使用状态', trigger: 'blur,change' },
		          	]
				}
			}
		},
		mounted() {
			this.repayDetails()
		},
		methods:{
			repayDetails() {
				this.loading = true;
				this.$api.amountsetup(this.collectionParams).then(res => {}, response => {
					this.loading = false;
					this.basetableinfo = response.data.returnObj.setList;
					this.pagesize      = response.data.returnObj.totalCount || this.basetableinfo.length;
					for(var i = 0; i<this.basetableinfo.length; i++){
						switch(this.basetableinfo[i].m_type){
							case 0:this.basetableinfo[i].m_type = '只使用快借';break;
							case 1:this.basetableinfo[i].m_type = '只使用分期';break;
							case 2:this.basetableinfo[i].m_type = '快借、分期均未使用';break;
							case 3:this.basetableinfo[i].m_type = '快借分期同时使用';break;
						};
						switch(this.basetableinfo[i].is_overdue){
							case 0:this.basetableinfo[i].is_overdue = '无';break;
							case 1:this.basetableinfo[i].is_overdue = '有';break;
						};
						switch(this.basetableinfo[i].is_enabled){
							case 0:this.basetableinfo[i].is_enabled = '可用';break;
							case 1:this.basetableinfo[i].is_enabled = '不可用';break;
						};
					}
				}).catch(val => {
					//异常
				})
				
			},
			//选择日期
	    	changetime(value){
	    		if(value&&value[0]&&value[1]){
	    			this.collectionParams.auditTimeStart = dateformat(value[0],'yyyy-MM-dd');
	    			this.collectionParams.auditTimeEnd = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.collectionParams.auditTimeStart = "";
	    			this.collectionParams.auditTimeEnd = "";
	    		}
	    	},
	    	//点击页码返回参数
	    	topage(topage){
	    		this.collectionParams = Object.assign(this.collectionParams,topage);
	    		this.repayDetails();
	    	},
			//新增或编辑
			editAmount(row){
//				this.$router.push({
//					name: '编辑提额设置',
//					params: {
//						id: row.id,
//						use_days: row.use_days,
//						m_type: row.m_type,
//						use_amount_proportion: row.use_amount_proportion,
//						payment_times:row.payment_times,
//						is_overdue:row.is_overdue,
//						overdue_times:row.overdue_times,
//						single_mention_quota:row.single_mention_quota,
//						year_frequency:row.year_frequency,
//						is_enabled:row.is_enabled
//					}
//				})
				this.amountsetupBox = true;

				console.log(row)
				if(row.id){
					this.formData.id = row.id;
					this.formData.use_days = row.use_days;

                    let m_typevalue = this.m_types.filter(item=>{ return item.label == row.m_type});
                    this.formData.m_type = m_typevalue[0].value;
                    console.log(m_typevalue);
					let is_overdueval = this.is_overdues.filter(item=>{ return item.label == row.is_overdue});
                    this.formData.is_overdue = is_overdueval[0].value;
                    
                    let is_enabledval = this.is_enableds.filter(item=>{ return item.label == row.is_enabled});
                    this.formData.is_enabled = is_enabledval[0].value;
					
					this.formData.use_amount_proportion = row.use_amount_proportion;
					this.formData.payment_times = row.payment_times;
					this.formData.overdue_times = row.overdue_times;
					this.formData.single_mention_quota = row.single_mention_quota;
					this.formData.year_frequency = row.year_frequency;
//					this.formData.is_enabled = row.is_enabled;
					//this.$refs['formData'].clearValidate();
				}else{
					//this.$refs['formData'].clearValidate();
					this.formData.id ='';
					this.formData.use_days ='';
					this.formData.m_type = '';
					this.formData.use_amount_proportion = '';
					this.formData.payment_times = '';
					this.formData.is_overdue =''
					this.formData.overdue_times ='';
					this.formData.single_mention_quota = '';
					this.formData.year_frequency ='';
					this.formData.is_enabled = '';
				}
				
			},
			//新建提额设置提交
			addSubmit(formData) {
				console.log('add')
				this.$refs[formData].validate((valid) => {
					if(valid) {
						console.log(this.formData)
						this.$api.addEditamount(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode == '0'){
								this.amountsetupBox = false;
								this.repayDetails();//刷新列表
								this.$refs[formData].resetFields();//清空表单
								this.$message({message: '添加提额设置成功',type: 'success'});
							}else{
								this.$message({message: response.data.resultMsg,type: 'error'});
							}
						}).catch(val => {
							//异常
							this.$message({message: '请求服务器异常',type: 'error'});
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//编辑提额设置提交
			setSubmit(formData) {
				console.log('set')
				this.$refs[formData].validate((valid) => {
					if(valid) {
						console.log(this.formData)
						this.$api.setEditamount(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode == '0'){
								this.amountsetupBox = false;
								this.repayDetails();//刷新列表
								this.$refs[formData].resetFields();//清空表单
								this.$message({message: '修改提额设置成功',type: 'success'});
							}else{
								this.$message({message: response.data.resultMsg,type: 'error'});
							}
						}).catch(val => {
							//异常
							this.$message({message: '请求服务器异常',type: 'error'});
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//选择删除项
			selection(rows){
				this.delParams.ids=[];
				rows.forEach(row => {
					this.delParams.ids.push(row.id);
				})
				this.delParams.ids = this.delParams.ids.join(',');
			},
			//删除
			delet(){
				if(this.delParams.ids !=''){//是否有选择项
					this.$confirm('确认将当前提额设置列表删除?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.$api.deletamountsetup(this.delParams).then(res => {}, response => {
			        		if(response.data.resultCode == '0'){
			        			this.$message({message: '删除成功',type: 'success'});
			        			this.repayDetails();
			        		}else{
			        			this.$message({message: response.data.resultMsg,type: 'error'});
			        		}
			        	}).catch(val => {
			        		//异常
			        	})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
				}else{
					this.$message({message:'请选择删除项'});
				}
			}
			
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