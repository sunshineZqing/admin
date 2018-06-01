<template>
	<div class="transfer">
		<el-form ref="form" :model="form" label-width="100px" align="left" width="500px">
			<el-form-item label="转交到：">
				<el-select v-model="form.ctr_collection_type" placeholder="请选择活动区域" clearable>
					<el-option label="一级催收" value="1"></el-option>
					<el-option label="二级催收" value="2"></el-option>
					<el-option label="三级催收" value="3"></el-option>
					<el-option label="呆账管理" value="5"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="转交原因：" >
				<el-input type="textarea" v-model="form.ctr_transfer_reason" style=" width：500px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(form)"  size="medium">立即创建</el-button>
				<el-button  size="medium">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'transfer',
		data () {
			return {
				form:{
					ctr_transfer_reason:'',//原因
					ctr_collection_type:'',//类型
					c_id:'',
					action:'',
				},
				
			}
		},
		mounted(){
			this.transferCont();
		},
		methods:{
			transferCont(){
				var transferContParams = {
					c_id:this.$route.params.c_id,
					action:this.$route.params.action,
				};
				
//				this.$api.transferCont(transferContParams).then(res => {}, response => {
//					console.log(response);
//				}).catch(val => {
//					//异常
//				})
			},
			onSubmit(data){
				console.log(data);
				this.form.c_id = this.$route.params.c_id;
				//this.form.action = this.$route.params.action;
				if(this.form.ctr_collection_type==''){
					this.$message({
			          message: '请选择转交类型',
			          type: 'warning'
			        });
				}else if(this.form.ctr_transfer_reason==''){
					this.$message({
			          message: '请填写备注',
			          type: 'warning'
			        });
				}else{
					this.$api.transferSubmit(this.form).then(res => {}, response => {
						if(response.data.resultCode==0){
							this.form.ctr_transfer_reason = '';
							this.form.ctr_collection_type = '';
							this.$message({
					          message: '转交成功！',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '转交失败！',
					          type: 'warning'
					        });
						}
						console.log(response);
						
					}).catch(val => {
						//异常
					})
				}
				
			},
		},
	}
</script>

<style scoped="scoped">
.transfer{
	width: 500px;
}
</style>