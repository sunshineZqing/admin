<template>
	<div class="badmanagemen">
		<el-table v-loading="loading" ref="multipleTable" :data="basetableinfo" tooltip-effect="dark" border style="width: 100%">
			<el-table-column type="index" width="715" header-align="center" label="基本信息" fixed="left">
				<el-table-column type="index" prop="" label="序号" header-align="center" width="60"></el-table-column>
				<el-table-column prop="name" label="姓名" header-align="center"></el-table-column>
				<el-table-column prop="gender" label="性别" header-align="center" width="60"></el-table-column>
				<el-table-column prop="phone" label="手机号" header-align="center" width="130"></el-table-column>
				<el-table-column prop="cert_card" label="身份证号" header-align="center" width="185"></el-table-column>
				<el-table-column prop="" label="转交时间" header-align="center" width="120"></el-table-column>
				<el-table-column prop="csname" label="催收人" header-align="center"></el-table-column>
			</el-table-column>
			<el-table-column type="index" header-align="center" label="易快借">
				<el-table-column prop="borrow_amount_stay_pays" label="借款总金额" header-align="center"></el-table-column>
				<el-table-column prop="borrow_amount_stay_pays" label="待还总金额" header-align="center"></el-table-column>
				<el-table-column prop="overnum" label="借款总次数" header-align="center"></el-table-column>
				<el-table-column prop="payment_times" label="逾期总次数" header-align="center"></el-table-column>
				<el-table-column prop="payment_times" label="待还总次数" header-align="center"></el-table-column>
			</el-table-column>
			<el-table-column type="index" header-align="center" label="易分期">
				<el-table-column prop="yue_gong_amount_stay_pay" label="借款总金额" header-align="center"></el-table-column>
				<el-table-column prop="sdovernum" label="待还总金额" header-align="center"></el-table-column>
				<el-table-column prop="spayment_times" label="借款总期数" header-align="center"></el-table-column>
				<el-table-column prop="sdovernum" label="逾期总期数" header-align="center"></el-table-column>
				<el-table-column prop="spayment_times" label="待还总期数" header-align="center"></el-table-column>
			</el-table-column>
			<el-table-column type="index" header-align="center" label="其他信息">
				<el-table-column prop="fname" label="初审人" header-align="center"></el-table-column>
				<el-table-column prop="sname" label="复审人" header-align="center"></el-table-column>
				<el-table-column prop="thname" label="终审人" header-align="center"></el-table-column>
				<el-table-column prop="scname" label="推广员" header-align="center"></el-table-column>
				<el-table-column prop="scname" label="最大逾期天数" header-align="center"></el-table-column>
				<el-table-column prop="c_remark" width="500" label="转交原因" header-align="center"></el-table-column>
			</el-table-column>
			<el-table-column style="margin:0" prop="phone" width="141" label="" header-align="center" fixed="right">
				<el-table-column width="140" label="操作" header-align="center">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="短信" placement="top">
							<el-button type="text" class='iconfont icon-yonghu' v-on:click=""></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="转交" placement="top">
							<el-button type="text" icon='iconfont icon-guanbiad' v-on:click=""></el-button>
						</el-tooltip>

					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<basepage :sunmary='basetableinfo.length' v-on:topage=""></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default {
		name: 'badmanagemen',
		components: {
			basetable,
			basepage
		},
		data() {
			return {
				//列表信息
				basetableinfo: [{
					time: '2017年8月8日 18:28:56',
					type: 'other',
					money: '20000'
				}],
				loading: false,
				//请求列表参数
				repayDetParams: {

				},
				//新增催收反馈弹框
				dialogVisible: false,
			}
		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>
<style>
</style>