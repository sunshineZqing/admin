<template>
	<div class="redpacketrecorde">
		<el-form :inline="true" :model="repayDetParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="repayDetParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
				<el-button type="primary" size="medium" @click="repayDetails">查询</el-button>
			</el-form-item>
			<a class="download" :href="'/ykj/red/getexcel.do?keywords='+repayDetParams.keywords" target="_blank">下载</a>
			
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading">
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage = "topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: 'redpacketrecorde',
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
						label: '红包金额',
						prop: 'red_amount'
					},
					{
						label: '红包类型',
						prop: 'red_share_status'//1:早8点,2:早8点分享,3:晚8点,4:晚8点分享
					},
					{
						label: '时间',
						prop: 'create_time'
					},
					{
						label: '当前余额',
						prop: 'red_balance'
					}
				],
				//列表信息
				basetableinfo: [{
					time: '2017年8月8日',
					type: 'other',
					money: '20000'
				}],
				loading: true,
				//请求列表参数
				repayDetParams:{
					keywords:''
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
				this.$api.redpacketrecorde(this.repayDetParams).then(res => {},response=>{
					this.loading = false;
					this.basetableinfo = response.data.returnObj.varList;
					this.pageSize = response.data.returnObj.totalCount;
					this.basetableinfo.forEach(item=>{
						switch (item.red_share_status){
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
			topage(target) {
				this.repayDetParams = Object.assign(this.repayDetParams,target);
				this.repayDetails();
			}
		}
	}
</script>
<style scoped="scoped">
	.download{
	    color: #fff;
	    text-decoration: none;
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    font-weight: 500;
	    padding: -12px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    margin-right: 10px;
	    padding: 10px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    border-color: #409EFF;
	    background-color: #409EFF;
	}
</style>