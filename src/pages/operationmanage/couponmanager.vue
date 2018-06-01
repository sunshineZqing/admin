<template>
	<div class="couponmanager">
		<div class="addtions">
			<el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keywords"></el-input>

			<el-select style='width: 150px;' v-model="conditions.coupon_type" filterable placeholder="请选择使用类型" slot="thetrialconditions" clearable>
				<el-option v-for="item in discount" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>			
			<el-select style='width: 150px;' v-model="conditions.coupon_status" filterable placeholder="请选择检状态" slot="thetrialconditions" clearable>
				<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>			
			<el-select style='width: 150px;' v-model="conditions.coupon_free_interest" filterable placeholder="请选择免息类型" slot="thetrialconditions" clearable>
				<el-option v-for="item in free_interest" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>			
			<el-select style='width: 150px;' v-model="conditions.coupon_free_interest_stage" filterable placeholder="请选择免息期数" slot="thetrialconditions"  clearable>
				<el-option v-for="item in interest_stage" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>			
			<el-date-picker style='margin-left: 15px;' v-model="value9" type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>

			<el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
		</div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="couponmanager">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="系统发放" placement="left">
					<el-button type="text" icon='iconfont icon-xitongfafang' @click="providestyle(scope,1)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="大厅发放" placement="left">
					<el-button type="text" icon='iconfont icon-datingfafang' @click="providestyle(scope,2)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
		<el-dialog title="发放优惠券" :visible.sync="dialogTableVisible"  width="60%">
			<el-radio-group v-model="type" v-if="wayprovide==1">
				<el-radio :label="1">短信</el-radio>
				<el-radio :label="2">推送</el-radio>
			</el-radio-group>
			<basetable  :basetabletitle="couponusertitle"   :basetableinfo="couponuserlist" :showopera='false' key="couponuserlist" v-on:selection="seltion"></basetable>
			<div class="savebtn" align="left">
				<el-button size="small" :loading='btloading' type="primary" @click="provide">发放</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import globaldialog from '@/components/dialog'
	import { dateformat } from '@/utils/index'
	export default {
		name: "couponmanager",
		components: {
			basetable,
			basepage,
			globaldialog
		},
		mounted() {
			this.getlist()
		},
		data() {
			return {
				showopera: true,
				tableloading: true,
				btloading:false,
				dialogTableVisible: false,
				conditions: {
					keywords: '', //关键词
					coupon_type:'',  //使用类型
					coupon_status:'',//状态
					coupon_free_interest:'',//是否免息
					coupon_free_interest_stage:'',//免息期数
					auditTimeStart: '', //开始时间
					auditTimeEnd: '' //结束时间
				},
				type:1,// 发放方式
				wayprovide:"",
				discount: [ //discount
					{   value: '0',label: '金额'},
					{   value: '1',label: '折扣'},
					{   value: '2',label: '免息'}
				],
				status: [ //status
					{   value: '0',label: '有效'},
					{   value: '1',label: '无效'}
				],			
				free_interest:[ 
					{   value: '0',label: '不免息'},
					{   value: '1',label: '免息(正常利息)'},
					{   value: '2',label: '免罚息'},
					{   value: '3',label: '免息且免罚息'}
				],	
				interest_stage:[ 
					{   value: '0',label: '无'},
					{   value: '1',label: '一期'},
					{   value: '3',label: '三期'},
					{   value: '6',label: '六期'},
					{   value: '12',label: '十二期'}
				],
				basetabletitle: [{
						label: '优惠券名称',
						prop: 'coupon_name'
					},
					{
						label: '优惠券使用通道',
						prop: 'coupon_channel'
					},
					{
						label: '优惠券使用类型',
						prop: 'coupon_type'
					},
					{
						label: '金额',
						prop: 'coupon_value'
					},
					{
						label: '是否免息',
						prop: 'coupon_free_interest'
					},
					{
						label: '免息期数',
						prop: 'coupon_free_interest_stage'
					},
					{
						label: '使用限制',
						prop: 'coupon_limit_money'
					},
					{
						label: '总数量',
						prop: 'coupon_total'
					},
					{
						label: '发放数量',
						prop: 'coupon_putout'
					},
					{
						label: '状态',
						prop: 'coupon_status'
					}
				],
				couponusertitle:[{
						label: '用户姓名',
						prop: 'name',
					
					},{
						label: '性别',
						prop: 'gender',
					
					},{
						label: '手机号',
						prop: 'phone',
					
					},{
						label: '身份证号',
						prop: 'cert_card',
				
					},{
						label: '注册时间',
						prop: 'create_time',
					
					}
				],
				baseinfo: [],
				couponuserlist:[],//优惠券用户列表
				pageSize:10,
				value9: '',
				scoperow:{}, //当前行信息
				DATA_IDS:[], //用户数组
			}
		},
		methods: {
			getlist() {
				this.tableloading = true;
				this.$api.getcouponlist(this.conditions).then(res => {}, response => {
					this.baseinfo = response.data.returnObj.couponList;
					this.baseinfo.forEach(elem=>{
						switch(elem.coupon_channel){
		                    case 10: elem.coupon_channel  = '易快借借款';break;
		                    case 11: elem.coupon_channel  = '易快借还款';break;
		                    case 20: elem.coupon_channel  = '易分期借款';break;
		                    case 21: elem.coupon_channel  = '易分期还款';break;
	                    }						
	                    switch(elem.coupon_type){
		                    case 0: elem.coupon_type  = '金额';break;
		                    case 1: elem.coupon_type  = '折扣';break;
		                    case 2: elem.coupon_type  = '免息';break;
	                    }						
	                    switch(elem.coupon_free_interest){
		                    case 0: elem.coupon_free_interest  = '不免息';break;
		                    case 1: elem.coupon_free_interest  = '免息(正常利息)';break;
		                    case 2: elem.coupon_free_interest  = '免罚息';break;
		                    case 3: elem.coupon_free_interest  = '免息且免罚息';break;
	                    }						
	                    switch(elem.coupon_free_interest_stage){
		                    case 0: elem.coupon_free_interest_stage  = '无';break;
		                    case 1: elem.coupon_free_interest_stage  = '一期';break;
		                    case 3: elem.coupon_free_interest_stage  = '三期';break;
		                    case 6: elem.coupon_free_interest_stage  = '六期';break;
		                    case 12: elem.coupon_free_interest_stage  = '十二期';break;
	                    }                   
	                    switch(elem.coupon_status){
		                    case 0: elem.coupon_status  = '有效';break;
		                    case 1: elem.coupon_status  = '无效';break;
	                    }
					})
					this.pageSize = response.data.returnObj.totalCount || this.baseinfo.length || this.pageSize
					this.tableloading = false;
				}).catch(val => { //捕获异常

				})
			},
			tosearch() {
				this.getlist()
			},
			changetime(value) {
				if(value && value[0] && value[1]){
					this.conditions.auditTimeStart = dateformat(value[0], 'yyyy-MM-dd')
					this.conditions.auditTimeEnd   = dateformat(value[1], 'yyyy-MM-dd')
				}else{
					this.conditions.auditTimeStart = ''
					this.conditions.auditTimeEnd   = ''
				}

			},
			providestyle(scope,wayprovide){
				this.wayprovide = wayprovide
                this.dialogTableVisible = true 
                this.getuserlist(scope)
			},
			getuserlist(scope){
				this.scoperow = scope.scope.row
                this.$api.getcouponuserlist({
					coupon_id:scope.scope.row.coupon_id, //优惠券ID
					action:this.wayprovide,  //1系统发放 2大厅发放
					coupon_total:scope.scope.row.coupon_total, // 总数量
					coupon_putout:scope.scope.row.coupon_putout //发放数量
				}).then(res => {}, response => {
					this.btloading = false;
					if(response.data.resultCode == 0) { //修改成功
						this.couponuserlist = response.data.returnObj.userList
					} else if(response.data.resultCode == 1) { //修改失败
						 
					}
				}).catch(val => { //捕获异常

				})
			},
			provide() { //发放
				if(this.DATA_IDS.length == 0){
					this.$message({type:'info',message:'请选择要发放优惠券的用户'})
					return
				}
				this.btloading = true;
				let params =null
				if(this.wayprovide == 1 ){
					params = {
						coupon_id:this.scoperow.coupon_id, //优惠券ID
						action:this.wayprovide,  //1系统发放 2大厅发放
						type:this.type, //1 短信 2推送
						coupon_total:this.scoperow.coupon_total, // 总数量
						coupon_putout:this.scoperow.coupon_putout, //发放数量
						DATA_IDS:this.DATA_IDS       // 用户id组成的数组  
					}
				}else if (this.wayprovide == 2){
					params = {
						coupon_id:this.scoperow.coupon_id, //优惠券ID
						action:this.wayprovide,  //1系统发放 2大厅发放
						coupon_total:this.scoperow.coupon_total, // 总数量
						coupon_putout:this.scoperow.coupon_putout, //发放数量
						DATA_IDS:this.DATA_IDS        // 用户id组成的数组  
					}
				}
				this.$api.providecoupon(params).then(res => {}, response => {
					this.btloading = false;
					if(response.data.resultCode == 0) { //修改成功
						 this.$message({type:'success',message:'发放成功'})
					} else { //修改失败
						 this.$message({type:'error',message:'发放失败'})
					}
				}).catch(val => { //捕获异常
                    this.$message({type:'error',message:'服务器异常'})
				})
			},
			topage(target){
				this.conditions = Object.assign(this.conditions,target);
				this.getlist();
			},
			seltion(target){
				this.DATA_IDS = []
				target.forEach(elem=>{
					this.DATA_IDS.push(elem.user_id)
				})
				this.DATA_IDS = this.DATA_IDS.join(',')
			}
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
	
	.savebtn {
		margin-top: 15px;
	}
</style>