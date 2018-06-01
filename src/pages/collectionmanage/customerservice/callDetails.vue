<template>
	<div class="callDetails">
		<basetable :basetabletitle = "basetabletitle" :basetableinfo = 'basetableinfo' :loading="loading"></basetable>
		<basepage :sunmary='pagesize' v-on:topage="topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default{
		name : 'callDetails',
		components:{basetable,basepage},
		data (){
			return{
				//列表头信息
				basetabletitle:[
					{label:'催收人',prop:'name'},
					{label:'催收时间',prop:'ctr_createtime'},
					{label:'催收内容',prop:'ctr_detail'},
					{label:'是否接通',prop:'ctr_flag'}
				],
				//列表信息
				basetableinfo:[],
				loading:true,
				//请求列表参数
				repayDetParams:{
					user_id:''
				},
				pagesize:0,
			}
		},
		mounted(){
			this.repayDetParams.user_id = this.$route.params.user_id;
			this.callDetailsList();
		},
		methods:{
			callDetailsList(){
	    		this.$api.callDetailsList(this.repayDetParams).then(res => {}, response => {
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.totalCount;
					for(let i = 0;i<this.basetableinfo.length;i++){
						switch(this.basetableinfo[i].ctr_flag){
							case 0:
								this.basetableinfo[i].ctr_flag = '未接通';
								break;
							case 1:
								this.basetableinfo[i].ctr_flag = '接通';
								break;
						}
					}
					this.loading = false;
				}).catch(val => {
					//异常
				})
			},
			topage(topage){
	    		this.repayDetParams = Object.assign(this.repayDetParams,topage);
	    		this.callDetailsList();
	    	}
		}
	}
</script>

<style>
</style>