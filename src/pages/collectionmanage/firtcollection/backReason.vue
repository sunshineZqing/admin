<template>
	<div class="backReason">
		<el-form ref="form" :model="form" label-width="150px" align="left" width="500px">
			<el-form-item label="用户姓名：" >
				<el-input type="input" v-model="form.name" style=" width：500px" disabled></el-input>
			</el-form-item>
			<el-form-item label="用户电话：" >
				<el-input type="input" v-model="form.phone" style=" width：500px" disabled></el-input>
			</el-form-item>
			<el-form-item v-if="action != 2" label="加入黑名单原因：" >
				<el-input type="textarea" v-model="form.reason" style=" width：500px"></el-input>
			</el-form-item>
			<el-form-item v-else label="移除黑名单原因：" >
				<el-input type="textarea" v-model="form.reason" style=" width：500px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(form)"  size="medium">提交</el-button>
				<el-button  size="medium">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'backReason',
		data () {
			
			return {
				action:'',//0：催收列表点击加入黑名单，1：黑名单列表点击加入加入黑名单，2：黑名单列表点击移除
				form:{
					name:'',
					user_id:'',
					phone:'',
					bl_status:'',//状态
					reason:'',//原因
				},
				formParams:[],
				
			}
		},
		mounted(){
			this.action = this.$route.params.action;
			this.form.name = this.$route.params.name;
			this.form.phone = this.$route.params.phone;
			this.form.user_id = this.$route.params.user_id;
			
		},
		methods:{
			onSubmit(){
				if(this.action == '0' || this.action == '1'){
					//催收列表点击加入黑名单 || 黑名单列表点击加入加入黑名单
					this.form.bl_status = '0';
					this.addCSList();
				}else if(this.action == '2'){
					//黑名单列表点击移除
					this.form.bl_status = '1';
					this.addCSList()
				}
			},
			//催收列表点击加入黑名单
			addCSList(){
				console.log(this.form,this.action);
				if(this.form.reason !=''){
					this.$api.addCSBack(this.form).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == '0'){
							this.$message({
					          message: '操作成功',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '操作失败',
					          type: 'warning'
					       	});
						}
					}).catch(val => {
						//异常
					})
				}else{
					this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}
					
			},
			
		},
	}
</script>

<style scoped="scoped">
.backReason{
	width: 500px;
}
</style>