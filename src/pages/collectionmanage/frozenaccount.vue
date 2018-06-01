<template>
	<div class="frozenaccount">
		<el-form :inline="true" :model="frozenaccountParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="frozenaccountParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-form-item>
				<el-button type="primary" size="medium" @click="frozenaccountList">查询</el-button>
			</el-form-item>
		</el-form>
		<!--<basetable :basetabletitle="basetabletitle"  key="qqw" :basetableinfo='basetableinfo' :loading="loading" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="冻结历史" placement="top">
					<el-button type="text" icon='el-icon-tickets' @click="frozenaccountDetails(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.fr_type != '解冻' " class="item" effect="dark" content="移除冻结" placement="top">
					<el-button type="text" icon='el-icon-delete' @click="frozenaccountDel(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.fr_type == '解冻' " class="item" effect="dark" content="冻结" placement="top">
					<el-button type="text" icon='iconfont icon-bianji' @click="frozenaccountDj(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.bl_status != 0" class="item" effect="dark" content="转黑名单" placement="top">
					<el-button type="text" icon='iconfont icon-guanbiad' @click="addBackList(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="认证详情" placement="left">
	                <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope)"></el-button>
	            </el-tooltip>
			</template>
		</basetable>-->
		
		
		<basetable  :basetabletitle="basetabletitle" :basetableinfo="basetableinfo"  :loading="loading" :showopera='true' key="frozenaccount">
	        <template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="冻结历史" placement="top">
					<el-button type="text" icon='el-icon-tickets' @click="frozenaccountDetails(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.fr_type != '解冻' " class="item" effect="dark" content="移除冻结" placement="top">
					<el-button type="text" icon='el-icon-delete' @click="frozenaccountDel(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.fr_type == '解冻' " class="item" effect="dark" content="冻结" placement="top">
					<el-button type="text" icon='iconfont icon-bianji' @click="frozenaccountDj(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip v-if = "scope.scope.row.bl_status != 0" class="item" effect="dark" content="转黑名单" placement="top">
					<el-button type="text" icon='iconfont icon-guanbiad' @click="addBackList(scope.scope.row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="认证详情" placement="left">
	                <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope.scope.row)"></el-button>
	            </el-tooltip>
			</template>
        </basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
		
		<!--弹冻结历史-->
		<el-dialog title="冻结历史" :visible.sync="dialogVisible" width="900px">
			<basetable :basetabletitle="basetableDetailstitle" key="qq" :basetableinfo='basetableDetailsinfo' :loading="loading2">
			</basetable>
			<basepage :sunmary="pageSize2" v-on:topage="topageDetails"></basepage>
		</el-dialog>
		
		<!--移除冻结弹框-->
		<el-dialog title="冻结账户操作" :visible.sync="frozenacBox" width="30%" align="left">
			<el-form ref="frozenacSetParams" :model="frozenacSetParams" label-width="100px" align="left" width="500px">
				<el-form-item label="用户姓名：" >
					<el-input type="input" v-model="frozenacSetParams.name" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户电话：" >
					<el-input type="input" v-model="frozenacSetParams.phone" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="原因：" >
					<el-input type="textarea" v-model="frozenacSetParams.fr_content" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="frozenacSubmit()"  size="medium">提交</el-button>
					<el-button @click = "frozenacBox = false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		<!--冻结弹框-->
		<el-dialog title="冻结账户操作" :visible.sync="frozenacBoxDj" width="30%" align="left">
			<el-form ref="frozenacSetParamsDj" :model="frozenacSetParamsDj" label-width="100px" align="left" width="500px">
				<el-form-item label="用户姓名：" >
					<el-input type="input" v-model="frozenacSetParamsDj.name" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户电话：" >
					<el-input type="input" v-model="frozenacSetParamsDj.phone" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="原因：" >
					<el-input type="textarea" v-model="frozenacSetParamsDj.fr_content" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="frozenacSubmitDj()"  size="medium">提交</el-button>
					<el-button @click = "frozenacBoxDj = false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		<!--黑名单弹框-->
		<el-dialog title="黑名单操作" :visible.sync="backListBox" width="30%" align="left">
			<el-form ref="backListParams" :model="backListParams" label-width="150px" align="left" width="500px">
				<el-form-item label="用户姓名：" >
					<el-input type="input" v-model="backListParams.name" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户电话：" >
					<el-input type="input" v-model="backListParams.phone" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="加入黑名单原因：" >
					<el-input type="textarea" v-model="backListParams.reason" style=" width：500px"></el-input>
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
	import v2table from '@/components/v2table'
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name: 'frozenaccount',
		components: {
			basetable,
			basepage,
			v2table
		},
		data() {
			return {
				//列表头信息
				basetabletitle: [
					{
						label: '用户编码',
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
						label: '手机号码',
						prop: 'phone'
					},
					{
						label: '当前状态',
						prop: 'fr_type'//0解冻、1自然冻结、2转交冻结、3逾期冻结、4转灰名单、5转黑名单
					},
					{
						label: '原因',
						prop: 'fr_content'
					},
					{
						label: '操作时间',
						prop: 'frozen_time'
					},
					{
						label: '操作人',
						prop: 'sysname'
					},
				],
				//列表信息
				basetableinfo: [{
					time: '2017年8月8日 18:28:56',
					type: 'other',
					money: '20000'
				}],
				loading: true,
				loading2:true,
				//请求列表参数
				frozenaccountParams: {
					keywords: '',
					borrow_time_end: '',
					borrow_time_start: '',
				},
				//冻结详情框
				dialogVisible:false,
				//详情头信息
				basetableDetailstitle: [{
						label: '用户编码',
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
						label: '手机号码',
						prop: 'phone',
						width:'120px'
					},
					{
						label: '状态',
						prop: 'fr_type'
					},
					{
						label: '原因',
						prop: 'fr_content'
					},
					{
						label: '操作时间',
						prop: 'fr_createtime',
						width:'160px'
					},
					{
						label: '操作人',
						prop: 'sysname'
					},
				],
				//详情信息
				basetableDetailsinfo: [],
				//请求详情信息参数
				frozenaccountDetailsParams:{
					user_id:'',
				},
				//选择日期
				changeTime:[],
				//总条数
				pageSize:0,
				pageSize2:0,//历史总条数
				frozenacBox:false,//移除冻结框
				frozenacBoxDj:false,//冻结框
				frozenacSetParams:{
					fr_content:'',
				},
				frozenacSetParamsDj:{
					fr_content:'',
				},
				backListBox:false,//黑名单框
				backListParams:{
					reason:'',
				},//黑名单请求参数
			}
		},
		mounted() {
			this.frozenaccountList();
		},
		methods: {
			frozenaccountList() {
				this.loading = true;
				this.$api.frozenaccount(this.frozenaccountParams).then(res => {}, response => {
					this.loading = false;
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.pageSize =  response.data.returnObj.totalCount;
					for(let i = 0; i < this.basetableinfo.length; i++) {
						switch(this.basetableinfo[i].gender) {
							case 0:
								this.basetableinfo[i].gender = '男';
								break;
							case 1:
								this.basetableinfo[i].gender = '女';
								break;
						}
						switch(this.basetableinfo[i].fr_type) {
							case 0:
								this.basetableinfo[i].fr_type = '解冻';
								break;
							case 1:
								this.basetableinfo[i].fr_type = '自然冻结';
								break;
							case 2:
								this.basetableinfo[i].fr_type = '转交冻结';
								break;
							case 3:
								this.basetableinfo[i].fr_type = '逾期冻结';
								break;
							case 4:
								this.basetableinfo[i].fr_type = '转灰名单';
								break;
							case 5:
								this.basetableinfo[i].fr_type = '转黑名单';
								break;
							
						}
					}
				}).catch(val => {
					//异常
				})

			},
			//选择日期
			changetime(value){
				if(value&&value[0]&&value[1]){
					this.frozenaccountParams.borrow_time_start = dateformat(value[0],'yyyy-MM-dd');
		    		this.frozenaccountParams.borrow_time_end = dateformat(value[1],'yyyy-MM-dd');
				}else{
					this.frozenaccountParams.borrow_time_start = '';
		    		this.frozenaccountParams.borrow_time_end = '';
				}
					
			},
			//页码
			topage(target) {
				this.frozenaccountParams = Object.assign(this.frozenaccountParams,target);
				this.frozenaccountList();
			},
			//移除冻结
			frozenaccountDel(row){
				this.frozenacBox = true;
				this.frozenacSetParams.name = row.name;
				this.frozenacSetParams.phone = row.phone;
				this.frozenacSetParams.user_id = row.user_id;
			},
			frozenacSubmit(){
				if(this.frozenacSetParams.fr_content !=''){
					this.$api.frozenDelete(this.frozenacSetParams).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == '0'){
							this.frozenacBox = false;
							this.frozenacSetParams.fr_content = '';
							this.frozenaccountList();
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
				            message: '服务器异常',
				            type: 'warning'
				       	});
					})
				}else{
					this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}
			},
			//冻结
			frozenaccountDj(row){
				this.frozenacBoxDj = true;
				this.frozenacSetParamsDj.name = row.name;
				this.frozenacSetParamsDj.phone = row.phone;
				this.frozenacSetParamsDj.user_id = row.user_id;
			},
			frozenacSubmitDj(){
				if(this.frozenacSetParamsDj.fr_content !=''){
					this.$api.frozenDj(this.frozenacSetParamsDj).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == '0'){
							this.frozenacBoxDj = false;
							this.frozenacSetParamsDj.fr_content = '';
							this.frozenaccountList();
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
				            message: '服务器异常',
				            type: 'warning'
				       	});
					})
				}else{
					this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}
			},
			//冻结历史
			frozenaccountDetails(row) {
				this.dialogVisible = true;
				this.loading2 = true;
				this.frozenaccountDetailsParams.user_id = row.user_id;
				this.frozenaccountDetailsList();
			},
			frozenaccountDetailsList(){
				this.$api.frozenaccountDetails(this.frozenaccountDetailsParams).then(res => {}, response => {
					this.loading2 = false;
					console.log(response);
					this.basetableDetailsinfo = response.data.returnObj.varList;
					this.pageSize2 = response.data.returnObj.totalCount;
					for(let i = 0; i < this.basetableDetailsinfo.length; i++) {
						switch(this.basetableDetailsinfo[i].gender) {
							case 0:
								this.basetableDetailsinfo[i].gender = '男';
								break;
							case 1:
								this.basetableDetailsinfo[i].gender = '女';
								break;
						}
						switch(this.basetableDetailsinfo[i].fr_type) {
							case 0:
								this.basetableDetailsinfo[i].fr_type = '解冻';
								break;
							case 1:
								this.basetableDetailsinfo[i].fr_type = '自然冻结';
								break;
							case 2:
								this.basetableDetailsinfo[i].fr_type = '转交冻结';
								break;
							case 3:
								this.basetableDetailsinfo[i].fr_type = '逾期冻结';
								break;
							case 4:
								this.basetableDetailsinfo[i].fr_type = '转灰名单';
								break;
							case 5:
								this.basetableDetailsinfo[i].fr_type = '转黑名单';
								break;
							
						}
					}
				}).catch(val => {
					//异常
				})
			},
			//页码
			topageDetails(target) {
				this.frozenaccountDetailsParams = Object.assign( this.frozenaccountDetailsParams,target);
				this.frozenaccountDetailsList();
			},
			//加入黑名单
		    addBackList(row){
		    	this.backListBox = true;
		    	this.backListParams.bl_status = '0';
		    	this.backListParams.name = row.name;
				this.backListParams.phone = row.phone;
				this.backListParams.user_id = row.user_id;
//		    	this.$router.push({
//					name:'黑名单原因',
//					params:{
//						user_id:row.user_id,
//						phone:row.phone,
//						name:row.name,
//						action:'0',
//					}
//				})
		    },
		    //提交黑名单信息
		    backSubmit(){
		    	if(this.backListParams.reason !=''){
					this.$api.addCSBack(this.backListParams).then(res => {}, response => {
						console.log(response);
						if(response.data.resultCode == '0'){
							this.backListBox = false;
							this.backListParams.reason = '';
							this.frozenaccountList();
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
					})
				}else{
					this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}
		    },
		    todetails(row){
		    	 //认证详情
		    	 console.log(row)
//	            this.$store.dispatch('SETSCORE',scope.scope.row.ynum_count)
	            this.$router.push({ name: '冻结账户认证信息',params:{ 
	                user_id:row.user_id,
	                ynum_id:row.ynum_id,
//	                alreadCertified:scope.scope.row.alreadCertified,
//	                auditflag:scope.scope.row.auditflag,
//	                action:this.conditions.action,
//	                isInvalid:'0'
	            }})
	    
		    }

		}
	}

</script>

<style>

</style>