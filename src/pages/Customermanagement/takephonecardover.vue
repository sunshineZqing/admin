<template>
	<el-form style='width: 600px;margin: auto;' ref="form" :model="form" label-width="80px">
		<el-form-item label="用户姓名">
			<el-input :disabled="true" v-model="form.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item :label="this.$route.params.labelname">
			<el-input :disabled="true" v-model="form.order_id" placeholder=""></el-input>
		</el-form-item>

		<el-form-item label="是否接通">
			<el-radio-group v-model="form.cstr_flag">
				<el-radio :label="1">接通</el-radio>
				<el-radio :label="0">未接通</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="详情">
			<el-input type="textarea" v-model="form.cstr_detail"></el-input>
		</el-form-item>
		<el-form-item label="备注">
			<el-input type="textarea" v-model="form.cstr_remark"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button :loading='btloading' type="primary" @click="onSubmit">提交</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: this.$route.params.name,
					order_id: this.$route.params.orderid, //订单编号/身份证号
					cstr_flag: 1,  
					cstr_remark: '',
					cstr_detail: '',
					user_id: this.$route.params.userid, 
				},
				taketype: this.$route.params.taketype, //0快借1分期2身份证
				btloading: false
			}
		},
		methods: {
			onSubmit() {
				this.btloading = true
				if(this.taketype == 0) { //快借
					let params = {
						name: this.$route.params.name,
						user_id:this.form.user_id,
						order_id: this.$route.params.orderid,
						cstr_flag: this.form.cstr_flag, //是否接通
						os_id:this.$route.params.aes_id,
						cstr_remark:this.form.cstr_remark,//详情
						cstr_detail:this.form.cstr_detail,//备注
					}
					this.$api.kjtakephone(params).then(res => {}, response => {
						this.btloading = false
						if(response.data.resultCode == 0) {
							this.$message({type: 'success',message: response.data.resultMsg});
						} else {
							this.$message({type:'error',message:response.data.resultMsg});
						}
					}).catch(val => { //捕获异常
						this.$message({type:'error',message:response.data.resultMsg});
					})
				} else if(this.taketype == 1) { //分期
					let params = {
						name: this.$route.params.name,
						user_id:this.form.user_id,
						order_id: this.$route.params.orderid,
						cstr_flag: this.form.cstr_flag, //是否接通
						os_id:this.$route.params.aes_id,
						cstr_remark:this.form.cstr_remark,//详情
						cstr_detail:this.form.cstr_detail,//备注
					}
					this.$api.fqtakephone(params).then(res => {}, response => {
						this.btloading = false
						if(response.data.resultCode == 0) {
							this.$message({type: 'success',message: response.data.resultMsg});
						} else {
							this.$message({type:'error',message:response.data.resultMsg});
						}
					}).catch(val => { //捕获异常
						this.$message({type:'error',message:response.data.resultMsg});
					})
				}else if (this.taketype == 2) { //身份证
					let params = {
						aes_id:this.$route.params.aes_id,     //即将逾期表主键
						user_id:this.form.user_id,
						aestr_flag: this.form.cstr_flag, //是否接通
						au_id:this.$route.params.au_id, //认证表主键
						aestr_remark:this.form.cstr_remark,//详情
						aestr_detail:this.form.cstr_detail,//备注
					}
					this.$api.cardtakephone(params).then(res => {}, response => {
						this.btloading = false
						if(response.data.resultCode == 0) {
							this.$message({type: 'success',message: response.data.resultMsg});
						} else {
							this.$message({type:'error',message:response.data.resultMsg});
						}
					}).catch(val => { //捕获异常
						this.$message({type:'error',message:response.data.resultMsg});
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-button {
		padding: 12px 20px;
	}
</style>