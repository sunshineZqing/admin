<template>
	<div class="blackList">
		<el-form :inline="true" :model="backListParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="backListParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>
			<el-select v-model="backListParams.status" clearable placeholder="请选择">
				<el-option :key="0" label="在黑名单内" :value="0">
				</el-option>
				<el-option :key="1" label="不在黑名单内" :value="1">
				</el-option>
			</el-select>
			<el-form-item>
				<el-button type="primary" size="medium" @click="backList">查询</el-button>
			</el-form-item>
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="限制" placement="top">
					<el-button type="text" class="" icon='el-icon-edit-outline' v-on:click="setPower(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if="scope.scope.row.bl_status != 0" class="item" effect="dark" content="加入黑名单" placement="top">
					<el-button type="text" class="" icon='iconfont icon-guanbiad' v-on:click="setBack(scope.scope.row,'0')"></el-button>
				</el-tooltip>
				<el-tooltip v-else class="item" effect="dark" content="移除黑名单" placement="top">
					<el-button type="text" class="" icon='el-icon-delete' v-on:click="setBack(scope.scope.row,'1')"></el-button>
				</el-tooltip>

			</template>

		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
		<!--限制-->
		<el-dialog title="限制" :visible.sync="dialogVisible" width="300px" :before-close="handleClose" align="left">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				<div v-for="item in powerForm.ids">
					<el-checkbox :label="item.name" :key="item.name">{{item.porp}}</el-checkbox>
				</div>
			</el-checkbox-group>
			<span slot="footer" class="dialog-footer" style="display: block;text-align: center;">
			    <el-button @click="powerNUSubmit" size="medium">取 消</el-button>
			    <el-button type="primary" @click="powerSubmit" size="medium">确 定</el-button>
			</span>
		</el-dialog>
		<!--操作黑名单-->
		<!--黑名单弹框-->
		<el-dialog title="黑名单操作" :visible.sync="backListBox" width="30%" align="left">
			<el-form ref="backListBoxParams" :model="backListBoxParams" label-width="150px" align="left" width="500px">
				<el-form-item label="用户姓名：" >
					<el-input type="input" v-model="backListBoxParams.name" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户电话：" >
					<el-input type="input" v-model="backListBoxParams.phone" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="原因：" >
					<el-input type="textarea" v-model="backListBoxParams.reason" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="backSubmit()"  size="medium">提交</el-button>
					<el-button @click = "backListBox = false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'blackList',
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
						label: '手机号码',
						prop: 'phone'
					},
					{
						label: '黑名单状态',
						prop: 'blStatus'
					},
					{
						label: '最后操作时间',
						prop: 'bl_in_time'
					},
					{
						label: '最后操作原因',
						prop: 'bl_in_reason'
					}
				],
				//列表信息
				basetableinfo: [{
					time: '2017年8月8日 18:28:56',
					type: 'other',
					money: '20000'
				}],
				loading: false,
				//请求列表参数
				backListParams: {

				},
				//选择日期
				changeTime: [],
				//总页码
				pageSize: 0,
				dialogVisible: false, //显示限制弹框
				checkAll: false,
				checkedCities: [],
				powerCont: ['borrow_rigths', 'payment_rigths', 'redpocket_rigths', 'withdraw_rigths'],
				powerForm: {
					saur_id: '',
					ids: [{
							porp: '借款权限',
							name: 'borrow_rigths',
						},
						{
							porp: '还款权限',
							name: 'payment_rigths',
						},
						{
							porp: '红包权限',
							name: 'redpocket_rigths',
						},
						{
							porp: '现金提现',
							name: 'withdraw_rigths',
						}
					],
				}, //选框内容

				isIndeterminate: true,
				setPowerParams: [], //点击设置权限请求参数
				setPowerSubmitParams: { //提交设置权限参数
					user_id: '',
					ids: [],
				},
				backListBox:false,//黑名单操作框
				backListBoxParams:{},//提交黑名单操作信息
			}
		},
		mounted() {
			this.backList();
		},
		methods: {
			backList() {
				this.loading = true;
				this.$api.backList(this.backListParams).then(res => {}, response => {
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					for(let i = 0; i < this.basetableinfo.length; i++) {
						switch(this.basetableinfo[i].bl_status) {
							case 0:
								this.basetableinfo[i].blStatus = '客户在黑名单';
								break;
							case 1:
								this.basetableinfo[i].blStatus = '客户不在黑名单';
								break;
						}

					}
					this.pageSize = response.data.returnObj.totalCount;
					this.loading = false;
				}).catch(val => {
					//异常
				})
			},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.backListParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.backListParams.endTime = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.backListParams.startTime = '';
					this.backListParams.endTime = '';
				}
			},
			btnFeedback() {
				this.$router.push('/collectionmanage/firtcollection/collectionFeedback')
			},
			btnNewFeedback(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//页码
			topage(target) {
				this.backListParams = Object.assign(this.backListParams, target);
				console.log(this.backListParams);
				this.backList();
			},
			//删除弹框
			deleteBox(row) {
				console.log(row);
				var deleteBackParams = {
					user_id: row.user_id
				}
				this.$confirm('确认关闭？')
					.then(_ => {
						//		            done();
						this.$api.deleteBack(deleteBackParams).then(res => {}, response => {
							console.log(response);
							if(response.data.resultCode == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
							} else {
								this.$message({
									message: '删除失败',
									type: 'warning'
								});
							}
						}).catch(val => {
							//异常
						})
					}).catch(_ => {
						console.log("取消")
						this.$message({
							message: '取消成功',
							type: 'warning'
						});
					});
			},
			//设置权限
			setPower(row) {
				console.log(row);
				this.dialogVisible = true;
				this.setPowerParams = {
					user_id: row.user_id,
				}
				this.$api.setPowerBack(this.setPowerParams).then(res => {}, response => {
					this.powerForm.spd = response.data.returnObj.spd;
					console.log(this.powerForm.spd);
					if(this.powerForm.spd) {
						if(this.powerForm.spd.borrow_rigths == 1) {
							this.checkedCities.push('borrow_rigths');
							console.log(this.checkedCities);
						}
						if(this.powerForm.spd.payment_rigths == 1) {
							this.checkedCities.push('payment_rigths');
							console.log(this.checkedCities);
						}
						if(this.powerForm.spd.redpocket_rigths == '1') {
							this.checkedCities.push('redpocket_rigths');
						}
						if(this.powerForm.spd.withdraw_rigths == '1') {
							this.checkedCities.push('withdraw_rigths');
						}
					} else {
						this.checkedCities = [];
					}

				}).catch(val => {
					//异常
				})

			},
			//权限全选
			handleCheckAllChange(val) {
				this.checkedCities = val ? this.powerCont : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				console.log(this.checkedCities);
				let checkedCount = value.length;
				this.checkAll = checkedCount === 4;
				this.isIndeterminate = checkedCount > 0 && checkedCount < 4;
			},
			//提交设置权限
			powerSubmit() {
				this.setPowerSubmitParams.user_id = this.setPowerParams.user_id;
				if(this.powerForm.spd.saur_id) {
					this.setPowerSubmitParams.saur_id = this.powerForm.spd.saur_id;
				}
				console.log(this.checkedCities)
				var this1 = this;
				this.setPowerSubmitParams.ids = [];
				for(let i = 0; i < this.checkedCities.length; i++) {
					switch(this1.checkedCities[i]) {
						case 'borrow_rigths':
							this1.setPowerSubmitParams.ids[i] = 0;
							break;
						case 'payment_rigths':
							this1.setPowerSubmitParams.ids[i] = 1;
							break;
						case 'redpocket_rigths':
							this1.setPowerSubmitParams.ids[i] = 2;
							break;
						case 'withdraw_rigths':
							this1.setPowerSubmitParams.ids[i] = 3;
							break;
					}
				}
				this.setPowerSubmitParams.ids = this.setPowerSubmitParams.ids.toString();
				
				console.log(this.setPowerSubmitParams);
				this.$api.setPowerBackSubmit(this.setPowerSubmitParams).then(res => {}, response => {
					this.dialogVisible = false;
					this.checkedCities = [];
					console.log(response);
				}).catch(val => {
					//异常
				})

			},
			powerNUSubmit() {
				this.dialogVisible = false;
				this.checkedCities = [];
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
						this.checkedCities = [];
					})
					.catch(_ => {});
			},
			//加入黑名单
			setBack(row,action) {
				this.backListBox = true;
				this.backListBoxParams.name = row.name;
				this.backListBoxParams.phone = row.phone;
				this.backListBoxParams.user_id = row.user_id;
				this.backListBoxParams.bl_status = action;
//				this.$router.push({
//					name: '黑名单原因',
//					params: {
//						user_id: row.user_id,
//						phone: row.phone,
//						name: row.name,
//						action: '1',
//					}
//				})
			},
			//提交黑名单信息
		    backSubmit(){
		    	console.log(this.backListBoxParams.reason)
		    	if(!this.backListBoxParams.reason){
		    		this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}else{
					this.$api.addCSBack(this.backListBoxParams).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == '0'){
							this.backListBox = false;
							this.backListBoxParams.reason='';
							this.backList();
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
						this.$message({
				          message: '操作失败',
				          type: 'warning'
				       	});
					})
					
					
				}
		    },
		}
	}
</script>

<style scoped="scoped">
	.dialog-footer {
		text-align: center;
	}
</style>