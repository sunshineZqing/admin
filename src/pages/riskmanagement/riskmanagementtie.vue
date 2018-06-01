<template>
	<div>
		<div class="info-content">
			<div class="header-info-left">
				<p class="header-info-left-top">
					<span class="username" v-text='userinfo.name'></span>
					<span v-if='userinfo.gender==0' class="gender">男</span>
					<span v-if='userinfo.gender==1' class="gender">女</span>
					<span class="age">{{userinfo.age}}岁</span>
					<span class="idcardno">身份证号 : {{userinfo.cert_card}}</span>
				</p>
				<p>
					<span>身份证地址 : {{userinfo.detalis_address}}</span>
					<span>手机号 : {{userinfo.phone}}</span>
				</p>
			</div>
			<div class="header-info-right">
				<p class="comprehensivesorce">
					<span>认证综合评分</span> : <span v-if="score||score==0">{{score}}</span>
				</p>
				<p>
					<span>到期标识</span> : <span v-if="userinfo.month_expired>=0&&userinfo.month_expired<9999">还有{{month_expired}}个月到期</span>
					<span v-if="userinfo.month_expired<=(-9999)">无法识别</span>
					<span v-if="userinfo.month_expired>=9999">长期</span>
					<span v-if="userinfo.month_expired<0&&userinfo.month_expired>-9999">已到期</span>
				</p>
				<p>
					<span>身份证有效期</span> : <span>{{userinfo.cardValidity}}</span>
				</p>
			</div>
		</div>
		<div class="opensuggest" @click="gettiesugg">
			<span class="iconfont icon-gongzuotai"></span>
			<span>提额意见</span>
		</div>
		<div class="mentionamount" v-if="showstatus">
			<mentionamount></mentionamount>
		</div>
		<div class="renzheng-info">
			<div class="people-renzheng">
				<div class="people-renzheng-title">用户认证</div>
				<!-- 认证状态 -->
				<el-table :data="tableData" border width="100%">
					<el-table-column prop="total" label="总认证" align="center"></el-table-column>
					<el-table-column prop="unauthorized_num" label="未认证" align="center"></el-table-column>
					<el-table-column prop="authentication_num" label="认证中" align="center"></el-table-column>
					<el-table-column prop="authentication_failed_num" label="认证失败" align="center"></el-table-column>
					<el-table-column prop="analysis_num" label="分析中" align="center"></el-table-column>
					<el-table-column prop="reauthentication_num" label="重新认证" align="center"></el-table-column>
					<el-table-column prop="newadd_num" label="新增数" align="center"></el-table-column>
					<el-table-column prop="audit_num" label="审批通过" align="center"></el-table-column>
					<el-table-column prop="reject_num" label="审批驳回" align="center"></el-table-column>
					<el-table-column prop="createtime" label="创建时间" align="center" min-width="200px"></el-table-column>
					<el-table-column prop="updatetime" label="更新时间" align="center" min-width="200px"></el-table-column>
				</el-table>
			</div>
			<div class="renzheng-content">
				<div class="content-header">
					<span v-for="item in realtags" @click="toggleclick(item.key,item.currentname,item.ordernum,item.au_id,item.type)" class="activenameout">
						<span v-if="item.currentname == item.key">
							<span :class='{"activename":item.key==currentname}' v-if='item.au_new==0'> 
								{{item.label}}
							    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
							</span>
							<span :class='{"activename":item.key==currentname}' v-if='item.au_new==1'>
								{{item.label}}(新增)
							    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
							</span>
							<span :class='{"activename":item.key==currentname}' v-if='item.au_new==2'>
								{{item.label}}(重新认证)
							    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
							</span>
						</span>
						
						<span class="renzheng2" :class='{"activename2":item.currentname==currentname,}' v-if="item.currentname != item.key">
							{{item.label}}(重新认证)
						    <span class="taginfo" v-show="item.currentname==currentname">{{item.austatus}}</span>
						</span>
					</span>
				</div>
				<div class="renzheng-item">
					<tabpanel :name="currenttag" :action="action" :authitem="authitem"></tabpanel>
				</div>
			</div>
		</div>
		<!--审核框-->
		<el-dialog title="提额意见" :visible.sync="dialogTableVisible" :before-close="handleclose">
			<el-form :model="scenmoney" status-icon :rules="paramsAction == 3 ? rules2 : rules" ref="scenmoney" label-width="140px" class="demo-ruleForm" label-position="left">
				<el-form-item label="复审提额额度" prop="this_mention_amount">
					<el-input type="text" v-model.number="scenmoney.this_mention_amount" auto-complete="off" class="mentionMoney" :disabled="paramsAction==3"></el-input>
				</el-form-item>
				<div class="maillist">
					<el-form-item label="备用手机号" prop="beiyongphone">
						<el-input type="text" v-model="scenmoney.beiyongphone" auto-complete="off" :disabled="paramsAction==3" clearable placeholder="手机号"></el-input>
					</el-form-item>
				</div>
				<div class="maillist">
					<el-form-item label="紧急联系人" prop="phone_name">
						<el-input type="text" v-model="scenmoney.phone_name" auto-complete="off" :disabled="paramsAction==3" clearable placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item label="" prop="phone" label-width="40px">
						<el-input type="text" v-model="scenmoney.phone" auto-complete="off" :disabled="paramsAction==3" clearable placeholder="手机号"></el-input>
					</el-form-item>
					<el-form-item label="" prop="atd_remark" label-width="40px">
						<el-input type="text" v-model="scenmoney.atd_remark" auto-complete="off" :disabled="paramsAction==3" clearable placeholder="请输入关系"></el-input>
					</el-form-item>
				</div>

				<el-form-item label="复审提额意见" prop="second_advise">
					<el-input type="textarea" v-model="scenmoney.second_advise" auto-complete="off" :disabled="paramsAction==3" clearable></el-input>
				</el-form-item>
				<div v-if="paramsAction==3">
					<el-form-item label="终审提额额度" prop="last_mention_amount">
						<el-input type="text" v-model.number="scenmoney.last_mention_amount" auto-complete="off" class="mentionMoney"></el-input>
					</el-form-item>
					<el-form-item label="终审提额意见" prop="third_advise">
						<el-input v-model="scenmoney.third_advise" type="textarea" clearable></el-input>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button class="submitbutton" size="medium" type="primary" @click="submitForm('scenmoney',1)">提交</el-button>
					<el-button class="submitbutton" size="medium" type="danger" @click="submitForm('scenmoney',0)">驳回</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>
<script>
	import tabpanel from './risktie/tabpanel'
	import { mapGetters } from 'vuex'
	import { isEmptyObject, isEmpty, phonecheck } from '@/utils/index'
	import mentionamount from './risktie/mention/mentionamount'
	export default {

		data() {
			var validateseconenopinion = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						callback();
					}
				}, 1000);
			};
			var contactsPhone = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('不能为空'));
				}
				setTimeout(() => {
					if(!phonecheck(value)) {
						callback(new Error('请输入正确的手机号码'));
					} else {
						callback();
					}
				}, 1000);
			}
			return {
				paramsAction: '',
				userinfo: {
					'name': '徐湘宁',
					'gender': '女',
					'age': 30,
					'idcardno': '13202131211122',
					'idcardaddress': '湖南省锦州市北湖区国庆路22号',
					'phoneno': '18232542192'
				},
				tableData: [],
				tags: [ //全部认证项
					// { 'ordernum':'9',  'label':'欺诈信息',  'key':'cheat'}, //***
					{
						'ordernum': '12',
						'label': '通讯录',
						'key': 'maillist'
					},
					{
						'ordernum': '16',
						'label': '运营商',
						'key': 'operator'
					},
					{
						'ordernum': '3',
						'label': '运营商',
						'key': 'operator'
					},
					{
						'ordernum': '6',
						'label': '央行认证',
						'key': 'credit'
					},
					{
						'ordernum': '14',
						'label': '银行卡流水',
						'key': 'bankflow'
					},
					{
						'ordernum': '17',
						'label': '信用卡账单',
						'key': 'mailbox'
					},
					{
						'ordernum': '15',
						'label': '公积金',
						'key': 'accumulationfund'
					},
					{
						'ordernum': '4',
						'label': '公积金',
						'key': 'accumulationfund'
					},
					{
						'ordernum': '7',
						'label': '社保',
						'key': 'social'
					},
					{
						'ordernum': '1',
						'label': '淘宝',
						'key': 'taobao'
					},
					{
						'ordernum': '2',
						'label': '京东',
						'key': 'jd'
					},
					{
						'ordernum': '5',
						'label': '学信网',
						'key': 'academic'
					},
					{
						'ordernum': '8',
						'label': '车辆',
						'key': 'vehicle'
					},
					{
						'ordernum': '18',
						'label': '安装应用',
						'key': 'installed'
					},
					{
						'ordernum': '11',
						'label': '用户稳定性',
						'key': 'userstability'
					}, //**
					{
						'ordernum': '16',
						'label': '全息报告',
						'key': 'holographic'
					},
				],
				tags2:[ //全部认证项
					// { 'ordernum':'9',  'label':'欺诈信息',  'key':'cheat'}, //***
					{
						'ordernum': '12',
						'label': '通讯录',
						'key': 'maillist'
					},
					{
						'ordernum': '16',
						'label': '运营商',
						'key': 'operator'
					},
					{
						'ordernum': '3',
						'label': '运营商',
						'key': 'operator'
					},
					{
						'ordernum': '6',
						'label': '央行认证',
						'key': 'credit'
					},
					{
						'ordernum': '14',
						'label': '银行卡流水',
						'key': 'bankflow'
					},
					{
						'ordernum': '17',
						'label': '信用卡账单',
						'key': 'mailbox'
					},
					{
						'ordernum': '15',
						'label': '公积金',
						'key': 'accumulationfund'
					},
					{
						'ordernum': '4',
						'label': '公积金',
						'key': 'accumulationfund'
					},
					{
						'ordernum': '7',
						'label': '社保',
						'key': 'social'
					},
					{
						'ordernum': '1',
						'label': '淘宝',
						'key': 'taobao'
					},
					{
						'ordernum': '2',
						'label': '京东',
						'key': 'jd'
					},
					{
						'ordernum': '5',
						'label': '学信网',
						'key': 'academic'
					},
					{
						'ordernum': '8',
						'label': '车辆',
						'key': 'vehicle'
					},
					{
						'ordernum': '18',
						'label': '安装应用',
						'key': 'installed'
					},
					{
						'ordernum': '11',
						'label': '用户稳定性',
						'key': 'userstability'
					}, //**
					{
						'ordernum': '16',
						'label': '全息报告',
						'key': 'holographic'
					},
				],
				realtags: [], //该用户所认证项
				currentname: 'jd', //当前认证项
				currenttag:'jd',//当前显示组件项
				ynum_count: '', //认证综合评分
				currentpageid: 1, //当前页标识 审核1 提额2
				action: '', //初复终标识
				authitem: {}, //当前项的数据
				month_expired: 0, //到期标识

				dialogTableVisible: false, //复审框
				scenmoney: {}, //复审额度信息

				rules: {
					this_mention_amount: [{
						required: true,
						validator: validateseconenopinion,
						trigger: 'blur,change'
					}],
					beiyongphone: [{
						required: true,
						validator: contactsPhone,
						trigger: 'blur'
					}],
					phone_name: [{
						required: true,
						message: '请填写姓名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: contactsPhone,
						trigger: 'blur'
					}],
					atd_remark: [{
						required: true,
						message: '请输入关系',
						trigger: 'blur'
					}],
					second_advise: [{
						required: true,
						message: '请输入意见',
						trigger: 'blur'
					}],
					last_mention_amount: [{
						required: true,
						validator: validateseconenopinion,
						trigger: 'blur,change'
					}],
					third_advise: [{
						required: true,
						message: '请输入意见',
						trigger: 'blur'
					}],

				},
				rules2: {
					last_mention_amount: [{
						required: true,
						validator: validateseconenopinion,
						trigger: 'blur,change'
					}],
					third_advise: [{
						required: true,
						message: '请输入意见',
						trigger: 'blur'
					}],

				},
				mailistrela: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],

				//终审
				dialogTableVisible2: false,
			}
		},
		computed: {
			...mapGetters(['score', 'ma_id', 'user_id', 'pageid', 'showstatus'])
		},
		components: {
			tabpanel,
			mentionamount
		},
		mounted() {
			this.getlist()
			this.paramsAction = this.$route.params.action;
		},
		methods: {
			getlist() {
				let params = {
					user_id: this.$route.params.user_id,
					ynum_id: this.$route.params.ynum_id,
					alreadCertified: this.$route.params.alreadCertified,
					auditflag: this.$route.params.auditflag,
					action: this.$route.params.action,
					isInvalid: '0',
					type:'1'
				}
				this.$api.getriskprimaryuserinfo(params).then(res => {}, response => {
					if(response.data.resultCode == '0') {
						this.userinfo = response.data.returnObj.sysAppUser //用户基本信息
						this.month_expired = Math.abs(this.userinfo.month_expired) //到期标识
						if(response.data.returnObj.authPd) {
							this.tableData.push(response.data.returnObj.authPd) //认证信息
						}
						if(!isEmpty(response.data.returnObj.certifyList)) {
							this.au_id = response.data.returnObj.certifyList.au_id
							this.au_num = response.data.returnObj.certifyList.au_num
							var certifyList = response.data.returnObj.certifyList
							var increaseList = response.data.returnObj.increaseList
							var tags1 = this.tags;
							console.log(this.tags);
							tags1.forEach((elem, index) => { // 用户认证项      
								for(let i = 0; i < certifyList.length; i++) {
									if(elem.ordernum == certifyList[i].au_ynumauth_type) {
										//为elem 设置属性并且进行传输
										this.$set(elem, 'currentname', elem.key)
										this.$set(elem, 'au_id', certifyList[i].au_id)
										this.$set(elem, 'au_num', certifyList[i].au_num)
										switch(certifyList[i].au_status) {
											case 0:
												this.$set(elem, 'austatus', '未认证');
												break;
											case 1:
												this.$set(elem, 'austatus', '认证中');
												break;
											case 2:
												this.$set(elem, 'austatus', '已认证');
												break;
											case 3:
												this.$set(elem, 'austatus', '分析中');
												break;
											case 4:
												this.$set(elem, 'austatus', '客服认证');
												break;
											case 5:
												this.$set(elem, 'austatus', '已驳回');
												break;
											case 6:
												this.$set(elem, 'austatus', '重新认证');
												break;
											case 7:
												this.$set(elem, 'austatus', '已通过');
												break;
										}
										if(certifyList[i].au_new && certifyList[i].au_new == 1) {
											this.$set(elem, 'au_new', 1);
										} else {
											this.$set(elem, 'au_new', 0);
										}
										this.realtags.push(elem)
									}
								}
								console.log(this.realtags);
								
							})
							this.tags2.forEach(item=>{
								for(let i = 0; i < increaseList.length; i++) {
									if(item.ordernum == increaseList[i].au_ynumauth_type) {
										//为elem 设置属性并且进行传输
										this.$set(item, 'currentname', item.key+'old');
										
										this.$set(item, 'au_id', increaseList[i].au_id)
										this.$set(item, 'au_num', increaseList[i].au_num)
										switch(increaseList[i].au_status) {
											case 0:
												this.$set(item, 'austatus', '未认证');
												break;
											case 1:
												this.$set(item, 'austatus', '认证中');
												break;
											case 2:
												this.$set(item, 'austatus', '已认证');
												break;
											case 3:
												this.$set(item, 'austatus', '分析中');
												break;
											case 4:
												this.$set(item, 'austatus', '客服认证');
												break;
											case 5:
												this.$set(item, 'austatus', '已驳回');
												break;
											case 6:
												this.$set(item, 'austatus', '重新认证');
												break;
											case 7:
												this.$set(item, 'austatus', '已通过');
												break;
										}
										if(increaseList[i].au_new && increaseList[i].au_new == 1) {
											this.$set(item, 'au_new', 1);
										} else {
											this.$set(item, 'au_new', 0);
										}
										this.realtags.push(item)
									}
								}
							})
							for(let i=0;i<=certifyList.length;i++){
								let numtes = 0;
								this.realtags.forEach(elem2=>{
									if(this.realtags[i].label == elem2.label){
										if(numtes > 0){
											this.$set(this.realtags[i],'type','1');
										}else{
											numtes++;
										}
									}
								})
							}
							console.log(this.realtags);
							this.currentname = this.realtags[0].currentname;
							this.currenttag = this.realtags[0].key;
							let item = this.realtags.filter(elem => {
								return elem.ordernum == '12'
							})
							this.getauthiteminfo('12', item[0].au_id)
						}
					}
				}).catch(val => { //捕获异常
					console.log(val)
					this.$message({
						message: '请求服务器异常',
						type: 'error'
					});
				})
				this.action = this.$route.params.action
			},
			
			toggleclick(key,name, ordernum, au_id, type) {
				this.currenttag = key
				console.log(name, ordernum, au_id)
				
				let lastname = this.lastname
				this.currentname = name
				if((lastname == 'operator' || lastname == 'holographic') && ordernum == '16') {
					return
				}
				sessionStorage.setItem('newlodType',type || 0);
				this.getauthiteminfo(ordernum, au_id)
			},
			getauthiteminfo(ordernum = '12', au_id = '17') {
				let loadingInstance = this.$loading({
					target: 'div.renzheng-item'
				})
				let authinfo = {
					user_id: this.$route.params.user_id,
					ynum_id: this.$route.params.ynum_id,
					isInvalid: '0',
					au_ynumauth_type: ordernum,
					action: this.$route.params.action,
					au_id: au_id
				}
				this.$api.getauthitem(authinfo).then(res => {}, response => {
					if(response.data.resultCode == '0') {
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
							loadingInstance.close();
						});
						console.log(response.data.returnObj.p);
						if(response.data.returnObj.p && response.data.returnObj.p1 && response.data.returnObj.p2 && response.data.returnObj.quanxiPd) {
							response.data.returnObj.p = Object.assign(response.data.returnObj.p, response.data.returnObj.p1, response.data.returnObj.p2, response.data.returnObj.quanxiPd); //对象合并
							//存储风控管理-》审核管理-》认证详情-》认证项信息
							this.authitem = response.data.returnObj.p
							this.$store.dispatch('SETAUTHITEM', response.data.returnObj.p)
							this.$store.dispatch('TOPASS', authinfo)
						}
						if(response.data.returnObj.p && response.data.returnObj.p1 && response.data.returnObj.p2) {
							response.data.returnObj.p = Object.assign(response.data.returnObj.p, response.data.returnObj.p1, response.data.returnObj.p2); //对象合并
							//存储风控管理-》审核管理-》认证详情-》认证项信息
							this.$store.dispatch('SETAUTHITEM', response.data.returnObj.p)
							this.$store.dispatch('TOPASS', authinfo)
							this.authitem = response.data.returnObj.p
						} else if(response.data.returnObj.p && response.data.returnObj.p1) {
							response.data.returnObj.p = Object.assign(response.data.returnObj.p, response.data.returnObj.p1); //对象合并
							//存储风控管理-》审核管理-》认证详情-》认证项信息
							this.$store.dispatch('SETAUTHITEM', response.data.returnObj.p)
							this.$store.dispatch('TOPASS', authinfo)
							this.authitem = response.data.returnObj.p
						} else if(response.data.returnObj.p) {
							//存储风控管理-》审核管理-》认证详情-》认证项信息
							this.$store.dispatch('SETAUTHITEM', response.data.returnObj.p)
							this.$store.dispatch('TOPASS', authinfo)
							this.authitem = response.data.returnObj.p
						}

					} else {
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
							loadingInstance.close();
						});
						this.$message({
							type: 'error',
							message: '查询失败'
						})
					}
				}).catch(err => { //捕获异常
					console.log(err)
					this.$message({
						type: 'error',
						message: '服务器异常'
					})
				})
			},
			showsuggest() { //显示弹框
				this.$store.dispatch('SHOWSUGGEST', true); //显示提额弹框
				this.gettiesugg();
				this.dialogTableVisible = true;
			},
			gettiesugg() { // 提额数据
				this.dialogTableVisible = true;
				let params = {
					user_id: this.$route.params.user_id,
					ma_id: this.ma_id, //提额表主键
					action: this.$route.params.action,
					isInvalid: '0',
					type:this.$route.params.action == 2 ? "1" :"",
				}
				this.$api.userauthdetails(params).then(res => {}, response => { //请求数据
					console.log(response);
					if(response.data.resultCode == '0') {
						if(!isEmptyObject(response.data.returnObj)){
							//存储提额意见所需数据
//							let params2 = {
//								ma_status: response.data.returnObj.mentionPd.ma_status,
//								single_mention_quota: response.data.returnObj.mentionPd.single_mention_quota,
//								user_id: response.data.returnObj.mentionPd.user_id,
//								second_advise: response.data.returnObj.mentionPd.second_advise,
//								third_advise: response.data.returnObj.mentionPd.third_advise,
//								this_mention_amount: response.data.returnObj.this_mention_amount || '3000',
//								ma_id: response.data.returnObj.mentionPd.ma_id,
//								action: this.$route.params.action
//							}
//							this.$store.dispatch('TOGETSUBMIT', params2); //存储数据
							this.scenmoney = response.data.returnObj.pd;
						}
					} else {
						this.$message({
							type: 'error',
							message: '查询失败'
						})
					}
				}).catch(val => { //捕获异常
					this.$message({
						type: 'error',
						message: '服务器异常'
					})
				})
			},
			//提交复审审核信息
			submitForm(scenmoney, operatype) {
				this.$refs[scenmoney].validate((valid) => {
					if(valid) { //通过验证
						this.scenmoney.user_id = this.$route.params.user_id;
						if(operatype == 1) { //提交
//							let params = {
//								user_id: this.params.user_id,
//								this_mention_amount: this.mentionmoney,
//								single_mention_quota: this.params.single_mention_quota,
//								third_advise: this.params.third_advise || '',
//								second_advise: this.params.second_advise,
//								action: this.params.action,
//								ma_id: this.params.ma_id,
//								ma_status: this.params.ma_status = this.params.action == '2' ? '4' : '6',
//							}
							if(this.$route.params.action == 2){
								this.scenmoney.type = 1;
							}
				            this.$api.submitsuggestions(this.scenmoney).then(res=>{},response=>{
				            	console.log(response);
				            	if(response.data.resultCode=='0'){
				                    this.$message({
										type: 'success',
										message: '提交成功'
									})
				                    this.dialogTableVisible = false;
				                    this.scenmoney = {};
				            	}else{
				            		this.$message({
										type: 'error',
										message: '提交失败'
									})
				            	}                                
					        }).catch(val=>{//捕获异常
								this.$message({
									type: 'error',
									message: '服务器异常'
								})
					        })
						} else if(operatype == 0) { //驳回
//							let params = {
//								user_id: this.params.user_id,
//								this_mention_amount: this.mentionmoney,
//								single_mention_quota: this.params.single_mention_quota,
//								third_advise: this.params.third_advise || '',
//								second_advise: this.params.second_advise,
//								action: this.params.action,
//								ma_id: this.params.ma_id,
//								ma_status: this.params.ma_status = this.params.action == '2' ? '3' : '5',
//							}
							if(this.$route.params.action == 2){
								this.scenmoney.type = 1;
							}
							this.$api.bhsuggestions(this.scenmoney).then(res => {}, response => {
								console.log(response);
				            	if(response.data.resultCode=='0'){
				                    this.$message({
										type: 'success',
										message: '驳回成功'
									})
				                    this.dialogTableVisible = false;
				                    this.scenmoney = {};
				            	}else{
				            		this.$message({
										type: 'error',
										message: '驳回失败'
									})
				            	}                
							}).catch(val => { //捕获异常
								this.$message({
									type: 'error',
									message: '服务器异常'
								})
							})
						}
					} else { //未通过
						this.$message({
							message: '格式不正确',
							type: 'error'
						});
						return false;
					}
				})
			},
			handleclose() {
				this.dialogTableVisible = false;
				this.scenmoney = {};
			},
			//终审
			gettiesuggzs() {

			},
		}
	}
</script>
<style lang="less" scoped="scoped">
	// 个人信息
	.info-content {
		// position: fixed;
		// top: 120px;
		// z-index: 1000;
		// height: 120px;
		// width: 86%;
		width: 100%;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 10px 3px #e8e7e6;
		.header-info-left {
			width: 64%;
			height: 120px;
			padding-left: 50px;
			display: flex;
			display: -webkit-flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content: space-around;
			align-items: flex-start;
			p {
				margin: 0;
				padding: 0;
				width: 100%;
				text-align: left;
				span {
					display: inline-block;
					color: #666;
				}
			}
			.header-info-left-top {
				.username {
					margin-right: 7%;
					color: #1f1f1f;
				}
				.gender {
					margin-right: 12.8%;
				}
				.age {
					margin-right: 16.2%;
				}
			}
			p:last-child {
				span:first-child {
					margin-right: 9%;
				}
			}
		}
		.header-info-right {
			width: 32%;
			height: 120px;
			background: url(../../assets/img/infoheaderbg.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			display: -webkit-flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			p {
				margin: 0;
				padding: 0;
				color: #c4c4c4;
				width: 100%;
				text-align: center;
				span {
					display: inline-block;
				}
			}
			.comprehensivesorce {
				span:last-child {
					color: #f96b6b;
				}
			}
		}
	}
	
	// 认证信息
	.el-table thead>tr {
		background-color: #f0f9fc !important;
	}
	
	.renzheng-info {
		border-radius: 8px;
		background: #fff;
		margin-top: 10px;
		padding: 0 20px;
		padding-top: 10px;
		padding-bottom: 200px;
		.people-renzheng-title {
			width: 125px;
			height: 38px;
			background: #2bc8f3;
			color: #fff;
			font-size: 19px;
			line-height: 38px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
		.renzheng-content {
			width: 100%;
			margin-top: 37px;
			.content-header {
				width: 100%;
				display: flex;
				display: -webkit-flex;
				flex-driection: row;
				flex-wrap: nowarp;
				justify-content: space-around;
				aligns-item: center;
				background: #d2f3fe;
				border-top-left-radius: 15px;
				border-top-right-radius: 15px;
				span {
					width: auto;
					/*min-width: 96px;*/
					display: inline-block;
					height: 56px;
					text-align: center;
					line-height: 56px;
					/*display: table-cell;*/
					font-size: 18px;
					color: #333;
					/*padding: 5px 14px;*/
					cursor: pointer;
					z-index: 100;
					vertical-align: top;
				}
			}
			.renzheng-item {
				width: 100%;
				min-height: 200px;
				border: 1px solid #30c9f3;
				box-sizing: border-box;
				.renzhengItemCont {
					display: inline-block;
					width: 70%;
					vertical-align: top;
				}
				.renzhengItemRight {
					display: inline-block;
					width: 29%;
					vertical-align: top;
					max-height: 800px;
					overflow: auto;
					margin: 20px 0;
					border: 1px solid #8a8a8a;
					background: #eee;
				}
			}
		}
	}
	
	.opensuggest {
		padding: 5px;
		position: fixed;
		right: 20px;
		top: 50%;
		border: none;
		border-radius: 10px;
		background-color: #F99152;
		width: 69px;
		line-height: 25px;
		color: #fff;
		z-index: 1001;
		cursor: pointer;
		span {
			width: 100%;
			display: block;
			font-size: 8px;
		}
	}
	
	.activenameout {
		position: relative;
		span {
			display: inline-block;
			min-width: 96px;
		}
	}
	
	.activename {
		display: inline-block !important;
		white-space: nowrap;
		min-width: 96px;
		border-bottom: 1px solid #2bc8f3;
		background-color: #2AC9F3;
		color: #fff !important;
		font-size: 16px !important;
		/*position: absolute;
    	top: -12px;*/
		left: 0;
		width: auto;
		/*height: 80px !important;*/
		line-height: 40px !important;
		text-align: center;
	}
	.activename2 {
		display: inline-block !important;
		white-space: nowrap;
		min-width: 96px;
		border-bottom: 1px solid #2bc8f3;
		background-color: #2AC9F3;
		color: red !important;
		font-size: 16px !important;
		/*position: absolute;
    	top: -12px;*/
		left: 0;
		width: auto;
		/*height: 80px !important;*/
		line-height: 40px !important;
		text-align: center;
	}
	.renzheng2{
		color: red !important;
	}
	/*.activename:after {
		border: solid transparent;
        content: ' ';
        height: 0;
        right: 100%;    //根据三角形的位置，可以随意更改。
        position: absolute;
        width: 0;
	    border-width: 5px;
	    border-right: 3px solid #1192B4;
        border-bottom: 5px solid #1192B4;
	    top: 0px;//根据三角的位置改变
	}

	.activename:before {
		border: solid transparent;
        content: ' ';
        height: 0;
        left: 100%;    //根据三角形的位置，可以随意更改。
        position: absolute;
        width: 0;
	    border-width: 5px;
	    border-left: 3px solid #1192B4;
        border-top: 5px solid #1192B4;
	    bottom: 0px;
	}*/
	
	.taginfo {
		width: 36px !important;
		min-width: 36px !important;
		color: #2AC9F3 !important;
		font-size: 12px !important;
		border: none;
		border-radius: 5px;
		white-space: nowrap;
		text-align: center;
		line-height: 12px !important;
		height: 12px !important;
		padding: 3px !important;
		background-color: #fff;
		position: absolute;
		bottom: 3px;
		left: 50%;
		margin-left: -22px;
	}
	
	.authsuggestions {
		width: 510px;
		position: fixed;
		right: 0;
		bottom: 0;
		height: 800px;
		z-index: 1002;
		overflow-y: scroll;
		overflow-x: hidden;
		border: 2px solid #FCE3D3;
		border-right: none;
		background-color: #fff;
		cursor: pointer;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity, width .5s, .5s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
		width: 0;
	}
	/*提额意见框*/
	
	.maillist {
		text-align: left;
	}
	
	.maillist .el-input {
		width: 100%;
	}
	
	.el-form-item {
		text-align: left;
	}
	
	.maillist .el-form-item {
		display: inline-block;
	}
	
	.mentionMoney {
		width: 30% !important;
	}
</style>