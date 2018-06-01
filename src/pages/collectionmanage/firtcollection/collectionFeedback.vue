<template>
	<div class="collectionFeedback">
		<basetable :basetabletitle = "basetabletitle" :basetableinfo = 'basetableinfo' :loading="loading"></basetable>
		<basepage :sunmary = "pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default{
		name : 'repaymentDetails',
		components:{basetable,basepage},
		data (){
			return{
				//列表头信息
				basetabletitle:[
					{label:'拨打电话人员',prop:'name'},
					{label:'电话',prop:'phone'},
					{label:'催收时间',prop:'ctr_createtime'},
					{label:'打通状态',prop:'ctr_flag'},
					{label:'反馈内容',prop:'ctr_detail'}
				],
				//列表信息
				basetableinfo:[],
				loading:true,
				//请求列表参数
				repayDetParams:{
					
				},
				pagesize:0,
			}
		},
		mounted(){
			console.log(this.$route);
			this.repayDetParams = this.$route.params;
			this.repayDetails();
		},
		methods:{
			repayDetails(){
				this.loading = true;
				this.$api.collectionFeedback(this.repayDetParams).then(res => {}, response => {
					this.loading = false;
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.totalCount || this.basetableinfo.length;
					for(var i=0;i<this.basetableinfo.length;i++){
						switch (this.basetableinfo[i].ctr_flag){
							case 0:
								this.basetableinfo[i].ctr_flag='未接通';
								break;
							case 1:
								this.basetableinfo[i].ctr_flag='接通';
								break;
						}
						this.$set(this.basetableinfo[i],'phone',response.data.returnObj.pd.phone);
					}
				}).catch(val => {
					//异常
				})
			},
			topage(target){
				this.repayDetParams = Object.assign(this.repayDetParams,target);
				console.log(this.repayDetParams);
				this.repayDetails();
			},
		}
	}
</script>

<style>
</style>