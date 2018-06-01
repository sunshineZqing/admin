<template>
	<div class="overdueAfter">
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading">
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import {isEmptyObject} from '@/utils/index'
	export default {
		name: 'overdueAfter',
		components: {
			basetable,basepage
		},
		data() {
			return {
				pageSize:0,
				//列表头信息
				basetabletitle: [{
						label: '订单号',
						prop: 'order_id'
					},
					{
						label: '客服人员',
						prop: 'name'
					},
					{
						label: '时间',
						prop: 'cstr_createtime'
					},
					{
						label: '是否接通',
						prop: 'cstr_flag'
					},
					{
						label: '通话备注',
						prop: 'cstr_remark'
					},
				],
				//列表信息
				basetableinfo: [{
					time: '2017年8月8日 18:28:56',
					type: 'other',
					money: '20000'
				}],
				//列表请求参数
				basetableinfoParams:[],
				loading: true,
			}
		},
		mounted() {
			this.basetableinfoParams.user_id = this.$route.params.user_id;
			this.callCollectionList();
		},
		methods: {
			callCollectionList(){
				console.log(this.basetableinfoParams);
				this.loading = true;
				this.$api.overdueAfter(this.basetableinfoParams).then(res => {}, response => {
					this.loading = false;
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.pageSize = response.data.returnObj.totalCount || this.basetableinfo.length;
					for(let i=0;i<this.basetableinfo.length;i++){
						switch(this.basetableinfo[i].cstr_flag){
							case 0:
								this.basetableinfo[i].cstr_flag = '未接通';
								break;
							case 1:
								this.basetableinfo[i].cstr_flag = '接通';
								break;
						}
					}
					
				}).catch(val => {
					//异常
				})
			},
			//页码
			topage(target) {
				this.basetableinfoParams = Object.assign(this.basetableinfoParams, target);
				console.log(this.basetableinfoParams);
				this.callCollectionList();
			},
		}
	}
</script>

<style>
</style>