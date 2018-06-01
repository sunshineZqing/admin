<template>
	<div class="calling">
		<el-form ref="formData" :model="formData" label-width="100px" align="left" width="500px">
			<el-form-item label="是否接通：">
				<el-select v-model="formData.flag" placeholder="请选择">
					<el-option label="已接通" value="1"></el-option>
					<el-option label="未接通" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="反馈情况：" >
				<el-input type="textarea" v-model="formData.detail" style=" width：500px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(formData)"  size="medium">提交</el-button>
				<el-button  size="medium">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'calling',
		data () {
			return {
				formData:{
				},
				//参数
				callingParams:{
					
				},
			}
		},
		mounted(){
			this.callingParams = Object.assign(this.callingParams,this.$route.params);
		},
		methods:{
			onSubmit(){
				if(!this.formData.flag){
					this.$message({
			          message: '请选择是否接通',
			          type: 'warning'
			        });
				}else if(!this.formData.detail){
					this.$message({
			          message: '请填写反馈情况',
			          type: 'warning'
			        });
				}else{
					this.callingParams = Object.assign(this.callingParams,this.formData);
					this.$api.callingSubmit(this.collectionParams).then(res => {}, response => {
						if(response.data.resultCode == 0){
							this.$message({
					          message: '保存成功！',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: response.data.resultMsg,
					          type: 'warning'
					        });
						}
					}).catch(val => {
						//异常
					})
				}
					
			}
		},
	}
</script>

<style scoped="scoped">
	.calling{
		width: 500px;
	}
</style>