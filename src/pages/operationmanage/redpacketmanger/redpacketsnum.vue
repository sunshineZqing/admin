<template>
	<div class="redpacketsnum">
		<el-form :inline="true" :model="repayDetParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="repayDetParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
				<el-button type="primary" size="medium" @click="repayDetails">查询</el-button>
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading">
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: 'redpacketsnum',
		components: {
			basetable,
			basepage
		},
		data() {
			return {
				//列表头信息
				basetabletitle: [{
						label: '用户编码',
						prop: 'user_id'
					},
					{
						label: '姓名',
						prop: 'name'
					},
					{
						label: '抢红包总次数',
						prop: 'red_times'
					},
					{
						label: '剩余次数',
						prop: 'remain_red_times'
					},
					{
						label: '红包总金额',
						prop: 'red_total_amount'
					},
					{
						label: '抽奖次数',
						prop: 'real_times'
					},
					{
						label: '剩余抽奖次数',
						prop: 'remain_real_times'
					},
					{
						label: '最后操作人',
						prop: 'last_op_id'
					},
					{
						label: '分享状态',
						prop: 'red_share_status'////0未分享,1早8点,2晚8点
					},
					{
						label: '操作时间',
						prop: 'last_op_time'
					}
				],
				//列表信息
				basetableinfo: [],
				loading: false,
				//请求列表参数
				repayDetParams:{
					
				},
				pageSize:0,//总条数
			}
		},
		mounted() {
			this.repayDetails()
		},
		methods: {
			repayDetails() {
				this.loading = true;
				this.$api.redpacketsnum(this.repayDetParams).then(res => {},response=>{
					this.loading = false;
					this.basetableinfo = response.data.returnObj.varList;
					this.pageSize = response.data.returnObj.totalCount;
					this.basetableinfo.forEach(item=>{
						switch (item.red_share_status){
							case 0:
								item.red_share_status = '未分享';
								break;
							case 1:
								item.red_share_status = '早8点';
								break;
							case 2:
								item.red_share_status = '早8点分享';
								break;
							case 3:
								item.red_share_status = '晚8点';
								break;
							case 4:
								item.red_share_status = '晚8点分享';
								break;
						}
					})
				})
			},
			//点击页码返回参数
			topage(topage) {
				this.repayDetParams = Object.assign(this.repayDetParams,topage);
				this.repayDetails();
			}
		}
	}
</script>
<style>
</style>