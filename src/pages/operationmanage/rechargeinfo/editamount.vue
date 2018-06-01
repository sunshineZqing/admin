<template>
	<div class="editAmount">
		<el-form ref="formData" :model="formData" status-icon :rules="rules2" label-width="120px" align="left" label-position="left">
			<el-form-item label="提额类别：" prop="m_type">
				<el-select v-model="formData.m_type" placeholder="请选择类别">
					<el-option label="只使用快借" value="0"></el-option>
					<el-option label="只是用分期" value="1"></el-option>
					<el-option label="快借、分期均未使用" value="2"></el-option>
					<el-option label="快借、分期同时使用" value="3"></el-option>
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
					<el-option label="无" value="0"></el-option>
					<el-option label="有" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="轻微逾期次数：" prop="overdue_times">
				<el-input v-model.number="formData.overdue_times"></el-input>
			</el-form-item>
			<el-form-item label="单次提额限额：" prop="single_mention_quota">
				<el-input v-model="formData.single_mention_quota"></el-input>
			</el-form-item>
			<el-form-item label="每年频次：" prop="year_frequency">
				<el-input v-model="formData.year_frequency"></el-input>
			</el-form-item>
			<el-form-item label="使用状态：" prop="is_enabled">
				<el-select v-model="formData.is_enabled" placeholder="请选择">
					<el-option label="可用" value="0"></el-option>
					<el-option label="不可用" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button v-if ="formData.id" type="primary" @click="setSubmit('formData')" size="medium">提交</el-button>
				<el-button v-else type="primary" @click="addSubmit('formData')" size="medium">提交</el-button>
				<el-button size="medium" @click="resetForm('formData')">取消</el-button>
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
	export default {
		name: 'editAmount',
		data() {
			var unKong = (rule, value, callback) => {
		        if (value == '' && value != 0) {
		          return callback(new Error('不能为空'));
		        }else{
		          callback();
		        }
		    };
			return {
				
				formData: {
					m_type: '',
					use_amount_proportion: '',
					payment_times: '',
					use_days: '',
					is_overdue: '',
					overdue_times: '',
					single_mention_quota: '',
					year_frequency: '',
					is_enabled: '',
				},
				rules2: {
					m_type:[
		          		{required: unKong, message: '请选择提额类别', trigger: 'change' }
		          	],
		          	use_amount_proportion:[
		          		{validator: unKong,message: '请输入内容', trigger: 'blur,change' },
		          	],
		          	payment_times:[
		          		{validator: unKong,message: '请输入还款次数', trigger: 'blur,change' },
		          	],
		          	use_days:[
		          		{validator: unKong,message: '请输入天数', trigger: 'blur,change' },
		          	],
		          	is_overdue:[
		          		{validator: unKong,message: '请选择是否逾期', trigger: 'change' },
		          	],
		          	overdue_times:[
		          		{validator: unKong,message: '请输入轻微逾期次数', trigger: 'blur,change' },
		          	],
		          	single_mention_quota:[
		          		{validator: unKong,message: '请输入提额限额', trigger: 'blur,change' },
		          	],
		          	year_frequency:[
		          		{validator: unKong,message: '请输入每年频次', trigger: 'blur,change' },
		          	],
		          	is_enabled:[
		          		{validator: unKong,message: '请选择使用状态', trigger: 'change' },
		          	],
				},
			}
		},
		mounted(){
			if(this.$route.params.id){
				this.formData = this.$route.params;
			}
		},
		methods: {
			//新建提额设置提交
			addSubmit(formData) {
				this.$refs[formData].validate((valid) => {
					if(valid) {
						console.log(this.formData)
						this.$api.addEditamount(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode == '0'){
								this.$message({message: '添加提额设置成功',type: 'success'});
							}else{
								this.$message({message: response.data.resultMsg,type: 'error'});
							}
						}).catch(val => {
							//异常
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//编辑提额设置提交
			setSubmit(formData) {
				this.$refs[formData].validate((valid) => {
					if(valid) {
						console.log(this.formData)
						this.$api.setEditamount(this.formData).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode == '0'){
								this.$message({message: '修改提额设置成功',type: 'success'});
							}else{
								this.$message({message: response.data.resultMsg,type: 'error'});
							}
						}).catch(val => {
							//异常
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formData) {
				this.$refs[formData].resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	.editAmount {
		width: 400px;
	}
</style>