<template>
	<div class="">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>
			<el-radio-group v-model="conditions.ma_status">
				<el-radio v-for="item in auditscope" :key="item.value" :label="item.value">{{item.label}}</el-radio>
			</el-radio-group>
			<el-button type="primary" icon="el-icon-search" @click="getlist" class="searchbtn">搜索</el-button>
		</div>
		<basetable :basetabletitle="basetitle" :basetableinfo="baseinfo" :loading="loading" :showopera="showopera" key="sysyemlastauth">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="用户提额详情" placement="bottom">
					<el-button type="text" icon='iconfont icon-tongji' @click="usermention(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="客服催收详情" placement="bottom">
					<el-button type="text" icon='iconfont icon-kefu' @click="customerservice(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="审批" placement="bottom">
					<el-button type="text" icon='iconfont icon-yonghu' @click="userauth(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="重新认证" placement="bottom">
					<el-button type="text" icon='iconfont icon-bianji' @click="reCertification(scope.scope.row)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage" :currentp='currentpage'></basepage>
		<globaldialog v-on:confirmclose="confirmclose">
			<span>你确定要放弃删除操作么?</span>
		</globaldialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import v2table from '@/components/v2table'
	import basepage from '@/components/basepage'
	import globaldialog from '@/components/dialog'
	import { dateformat } from '@/utils/index'
	import { mapGetters } from 'vuex'
	import { Message } from 'element-ui'
	export default {
		name: "yfqinfo",
		components: {
			basetable,
			basepage,
			globaldialog,
			v2table
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				switch(to.name) {
					case '系统提额复审':
						vm.conditions.action = '2';
						vm.auditscope = [{
								value: '0',
								label: '复审待确认'
							},
							{
								value: '1',
								label: '复审未通过'
							},
							{
								value: '2',
								label: '复审通过'
							},
							{
								value: '3',
								label: '转交终审审核'
							}
						];
						vm.showauth = false;
						vm.basetitle = vm.basetabletitle;
						break;
					case '系统提额终审':
						vm.conditions.action = '3';
						vm.auditscope = [{
								value: '3',
								label: '终审待审核'
							},
							{
								value: '4',
								label: '终审未通过'
							},
							{
								value: '5',
								label: '终审通过'
							}
						];
						vm.basetitle = vm.lastbasetabletitle;
						console.log(vm.lastbasetabletitle)
						break;
				}
				vm.loading = true
				vm.getlist()
			})
		},
		created() {
			let midlist = this.searchlist.filter(elem => {
				return elem.label === this.$route.name
			})
			if(midlist.length != 0) {
				this.conditions = midlist[0].value
				this.currentpage = parseInt(this.conditions.currentPage) || 1
			}
			this.getlist()
		},
		computed: {
			...mapGetters(['searchlist'])
		},
		data() {
			return {
				showopera: true,
				loading: false,
				currentpage: 1, //默认页码
				auditscope: [],
				checklist: [], //选中状态的值
				dialogFormVisible: false,
				conditions: {
					keyword: '', //关键词
					action: '2', //审核流程  复审  终审
					ma_status: '', //状态
				},
				basetitle: [],
				//复审
				basetabletitle: [{
						label: '用户编号',
						prop: 'user_id'
					},
					{
						label: '姓名',
						prop: 'name'
					},
					{
						label: '性别',
						prop: 'gender'
					},
					{
						label: '年龄',
						prop: 'age'
					},
					{
						label: '注册地',
						prop: 'registered_address'
					},
					{
						label: '户籍地',
						prop: 'card_location'
					},
					{
						label: '初审人',
						prop: 'first_ynum_name'
					},
					{
						label: '初审时间',
						prop: 'first_ynum_time'
					},
					{
						label: '复审人',
						prop: 'second_ynum_name'
					},
					{
						label: '复审时间',
						prop: 'second_ynum_time'
					},
					{
						label: '终审时间',
						prop: 'last_ynum_time'
					},
					{
						label: '提额次数',
						prop: 'mention_times'
					},
					{
						label: '提额总额度',
						prop: 'mention_sum_amount'
					},
					{
						label: '最近一次提额时间',
						prop: 'last_mention_time'
					},
					{
						label: '最近一次提额额度',
						prop: 'last_mention_amount'
					},
					{
						label: '提额待审人',
						prop: 'mention_pending_name'
					},
					{
						label: '快借借款次数',
						prop: 'borrow_times'
					},
					{
						label: '快借逾期次数',
						prop: 'borrow_overdue_tims'
					},
					{
						label: '快借借款总金额',
						prop: 'borrow_sum_amount'
					},
					{
						label: '快借待还金额',
						prop: 'borrow_staypay_amount'
					},
					{
						label: '快借借款逾期总金额',
						prop: 'borrow_overdue_amount'
					},
					{
						label: '快借借款逾期待还金额',
						prop: 'borrow_overdue_staypay_amount'
					},
					{
						label: '快借逾期率',
						prop: 'borrow_overdue_rate'
					}, /**/
					{
						label: '分期借款总金额',
						prop: 'stage_sum_amount'
					},
					{
						label: '分期借款总期数',
						prop: 'stage_sum_times'
					},
					{
						label: '分期借款待还总金额',
						prop: 'stage_staypay_amount'
					},
					{
						label: '分期借逾期期数',
						prop: 'stage_overdue_times'
					},
					{
						label: '分期借款逾期待还总金额',
						prop: 'stage_overdue_staypay_amount'
					},
					{
						label: '分期逾期率',
						prop: 'stage_overdue_rate'
					}, /**/
					//	            { label:'状态',   prop:'ma_status'}
				],
				//终审数据
				lastbasetabletitle: [{
						label: '用户编号',
						prop: 'user_id'
					},
					{
						label: '姓名',
						prop: 'name'
					},
					{
						label: '性别',
						prop: 'gender'
					},
					{
						label: '年龄',
						prop: 'age'
					},
					{
						label: '注册地',
						prop: 'registered_address'
					},
					{
						label: '户籍地',
						prop: 'card_location'
					},
					{
						label: '初审人',
						prop: 'first_ynum_name'
					},
					{
						label: '初审时间',
						prop: 'first_ynum_time'
					},
					{
						label: '复审人',
						prop: 'second_ynum_name'
					},
					{
						label: '复审时间',
						prop: 'second_ynum_time'
					},
					{
						label: '终审时间',
						prop: 'last_ynum_time'
					},
					{
						label: '提额次数',
						prop: 'mention_times'
					},
					{
						label: '提额总额度',
						prop: 'mention_sum_amount'
					},
					{
						label: '最近一次提额时间',
						prop: 'last_mention_time'
					},
					{
						label: '最近一次提额额度',
						prop: 'last_mention_amount'
					},
					{
						label: '提额待审人',
						prop: 'mention_pending_name'
					},
					{
						label: '快借借款次数',
						prop: 'borrow_times'
					},
					{
						label: '快借逾期次数',
						prop: 'borrow_overdue_tims'
					},
					{
						label: '快借借款总金额',
						prop: 'borrow_sum_amount'
					},
					{
						label: '快借待还金额',
						prop: 'borrow_staypay_amount'
					},
					{
						label: '快借借款逾期总金额',
						prop: 'borrow_overdue_amount'
					},
					{
						label: '快借借款逾期待还金额',
						prop: 'borrow_overdue_staypay_amount'
					},
					{
						label: '快借逾期率',
						prop: 'borrow_overdue_rate'
					}, /**/
					{
						label: '分期借款总金额',
						prop: 'stage_sum_amount'
					},
					{
						label: '分期借款总期数',
						prop: 'stage_sum_times'
					},
					{
						label: '分期借款待还总金额',
						prop: 'stage_staypay_amount'
					},
					{
						label: '分期借逾期期数',
						prop: 'stage_overdue_times'
					},
					{
						label: '分期借款逾期待还总金额',
						prop: 'stage_overdue_staypay_amount'
					},
					{
						label: '分期逾期率',
						prop: 'stage_overdue_rate'
					}, /**/
					//	            { label:'状态',   prop:'ma_status'}
				],
				pagesize: 10,
				baseinfo: [],
				scoperow: {}, //当前行信息
			}
		},
		methods: {
			getlist() {
				this.loading = false
				this.$api.getamountlist(this.conditions).then(res => {}, response => {
					this.baseinfo = response.data.returnObj.userlist
					let params = {
						label: this.$route.name,
						value: this.conditions
					}
					this.$store.dispatch('SAVECONDITION', params) //存储搜索条件
					this.baseinfo.forEach(elem => {
						let fast_overduerate = elem.boverTimes == 0 ? 0 : (parseInt(elem.boverTimes) / parseInt(elem.borrowTimes) || 0)
						let stage_overduerate = elem.stage_over_qishu == 0 ? 0 : (parseInt(elem.stage_over_qishu) / parseInt(elem.stage_qishu) || 0)
						this.$set(elem, 'fast_overduerate', fast_overduerate)
						this.$set(elem, 'stage_overduerate', stage_overduerate)
						switch(elem.ma_status) {
							case 1:
								elem.ma_status = '初审';
								break;
							case 11:
								elem.ma_status = '复审更新';
								break;
							case 2:
								elem.ma_status = '复审';
								break;
							case 21:
								elem.ma_status = '终审更新';
								break;
							case 3:
								elem.ma_status = '终审';
								break;
							case 4:
								elem.ma_status = '终审通过';
								break;
							case 5:
								elem.ma_status = '终审不通过';
								break;
							case 6:
								elem.ma_status = '复审不通过';
								break;
							case 7:
								elem.ma_status = '终审驳回';
								break;
							case 8:
								elem.ma_status = '复审通过';
								break;
							case 9:
								elem.ma_status = '复审驳回';
								break;
						}
						switch(elem.gender) {
							case 0:
								elem.gender = '男';
								break;
							case 1:
								elem.gender = '女';
								break;
						}
					})
					this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length

				}).catch(val => { //捕获异常

				})
			},
			changechoose() {
				this.conditions.ma_status = this.checklist.join(',')
			},
			usermention(row) { //用户提额详情
				this.$router.push({
					name: '用户提额详情',
					params: {
						user_id: row.user_id
					}
				})
			},
			customerservice(row) { //客服催收详情
				this.$router.push({
					name: '客服催收详情',
					params: {
						user_id: row.user_id
					}
				})
			},
			userauth(row) { //用户认证详情
				let ynum_count = row.ynum_count || 205
				this.$store.dispatch('SETSCORE', ynum_count)
				this.$router.push({
					name: '提额认证详情',
					params: {
						user_id: row.user_id,
						ynum_id: row.ynum_id || '0',
						alreadCertified: row.alreadCertified || '0',
						auditflag: row.auditflag || '0',
						action: this.conditions.action,
						isInvalid: '0'
					}
				})
				//提额表主键存储
				this.$store.dispatch('SETMA_ID', row.ma_id)
			},
			//重新认证
			reCertification(row) {
				this.$router.push({
					name: '重新认证',
					params: {
						user_id: row.user_id,
					}
				})
			},
			confirmclose(target) { //监听提示dialog回调
				// this.$store.dispatch('DIALOGTIP',true)//显示弹框提示
				if(target == 1) { //确认回调
				}
			},
			topage(target) { //跳页
				this.conditions = Object.assign(this.conditions, target); //对象合并
				this.getlist()
			},

		}
	}
</script>
<style lang="less" scoped>
	div.el-table {
		margin-top: 15px;
	}
	
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		div,
		button {
			margin-left: 20px;
		}
		button.searchbtn {
			line-height: 32px;
		}
		div.el-input {
			width: 12%;
		}
	}
	
	.operabtn {
		margin-top: 20px;
		text-align: left;
		i {
			cursor: pointer;
		}
	}
</style>