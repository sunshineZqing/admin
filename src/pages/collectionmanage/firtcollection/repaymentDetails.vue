<template>
	<div class="repaymentDetails">
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
				basetabletitle:[],
				kjbasetabletitle:[
					{label:'还款时间',prop:'paymentTime'},
					{label:'还款类别',prop:'paymentWay'},//还款方式 0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
					{label:'还款金额(¥)',prop:'paymentAmount'},
					{label:'还款流水号',prop:'prTradeSn'},
					{label:'还款银行',prop:'bankName'},
					{label:'还款银行卡号',prop:'accountNo'},
					{label:'备注',prop:''},
				],
				fqbasetabletitle:[
					{label:'还款时间',prop:'payment_time'},
					{label:'还款类别',prop:'payment_way'},//还款方式 0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
					{label:'还款金额(¥)',prop:'payment_amount'},
					{label:'还款流水号',prop:'pr_trade_sn'},
					{label:'还款银行',prop:'bankName'},
					{label:'还款银行卡号',prop:'accountNo'},
					{label:'备注',prop:''},
				],
				//列表信息
				basetableinfo:[],
				loading:true,
				//请求列表参数
				repayDetParams:[],
				pagesize:0,//总条数
			}
		},
		mounted(){
			if(this.$route.params.action == 0 ){
				this.basetabletitle =this.kjbasetabletitle;
				this.kjRepayDetails();
				this.repayDetParams.borrowId = this.$route.params.borrowId;
			}else{
				this.basetabletitle =this.fqbasetabletitle;
				this.fqRepayDetails();
				this.repayDetParams.stage_id = this.$route.params.stage_id;
			}
		},
		methods:{
			//详情列表
			kjRepayDetails(){
				this.loading = true;
				this.$api.repaymentDetails(this.repayDetParams).then(res => {}, response => {
					console.log(response)
					this.loading = false;
					if(response.data.resultCode == 0){
						this.basetableinfo = response.data.returnObj.varList;
						this.pagesize =  response.data.returnObj.totalCount || this.basetableinfo.length;
						for(let i=0;i<this.basetableinfo.length;i++){
							switch(this.basetableinfo[i].paymentWay)
							{
								case 0:
									this.basetableinfo[i].paymentWay = '主动还款';
									break;
								case 1:
									this.basetableinfo[i].paymentWay = '系统自动扣款';
									break;
								case 2:
									this.basetableinfo[i].paymentWay = '催收代扣';
									break;
								case 3:
									this.basetableinfo[i].paymentWay = '线下还款';
									break;
							}
						}
						
					}else{
						
					}
				}).catch(val => {
					//异常
				})
			},
			fqRepayDetails(){
				this.loading = true;
				console.log(this.repayDetParams)
				this.$api.fqOverdueDetails(this.repayDetParams).then(res => {}, response => {
					this.loading = false;
					console.log(response)
					if(response.data.resultCode == 0){
						this.basetableinfo = response.data.returnObj.varList;
						this.pagesize =  response.data.returnObj.totalCount || this.basetableinfo.length;
						for(let i=0;i<this.basetableinfo.length;i++){
							switch(this.basetableinfo[i].payment_way)
							{
								case 0:
									this.basetableinfo[i].payment_way = '主动还款';
									break;
								case 1:
									this.basetableinfo[i].payment_way = '系统自动扣款';
									break;
								case 2:
									this.basetableinfo[i].payment_way = '催收代扣';
									break;
								case 3:
									this.basetableinfo[i].payment_way = '线下还款';
									break;
							}
						}
					}
				}).catch(val => {
					//异常
				})
			},
			//页码
			topage(target) {
				this.repayDetParams = Object.assign(this.repayDetParams,target);
				if(this.$route.params.action == 0 ){
					this.kjRepayDetails();
				}else{
					this.fqRepayDetails();
				}
			},
		}
	}
</script>

<style>
</style>