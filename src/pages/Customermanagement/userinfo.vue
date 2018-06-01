<template>
	<div class="userinfo">
		<div class="addtions">
			<el-input v-model="conditions.keywords" placeholder="请输入关键字" clearable>
				<i class=" el-icon-search el-input__icon" slot="prefix"></i>
			</el-input>
			<el-select class="select" v-model="conditions.time" placeholder="时间" clearable>
				<el-option v-for="item in authtype" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-date-picker  v-model="value9" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" @change="changetime">
			</el-date-picker>
			<el-select class="select" v-model="conditions.approvalStatus" placeholder="审核状态" clearable>
				<el-option v-for="item in authstatus" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select class="select" v-model="conditions.STATUS" placeholder="用户状态" clearable>
				<el-option v-for="item in auditedlist" :key="item.value" :label="item.label" :value="item.value" >
				</el-option>
			</el-select>
			<el-select class="select" v-model="conditions.registered_source" placeholder="请选择注册源" clearable>
				<el-option v-for="item in registered_sources" :key="item.value" :label="item.label" :value="item.value" >
				</el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
		</div>
		<basetable  :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="taleloading" :showopera='true' key="userinfo">
	        <template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
			      <el-button style='padding:0' type="text" icon='iconfont icon-unie620' @click="showdialogchange(scope.scope.row)"></el-button>
			    </el-tooltip>
				<!--<el-tooltip class="item" effect="dark" content="推广" placement="top-start">
			      <el-button style='padding:0' type="text" icon='iconfont icon-tuiguang-copy'  @click="popularize(scope.scope.row)"></el-button>
			    </el-tooltip>-->
			    <el-tooltip class="item" effect="dark" content="注销" placement="top-start">
			      <el-button v-if="scope.scope.row.is_cancel=='未注销'"  icon='iconfont icon-zhuxiao' style='padding:0' type="text"  @click="logoff(scope.scope.row)"></el-button>
			    </el-tooltip>
			    <el-tooltip class="item" effect="dark" content="用户认证详情" placement="top-start" v-if="showdetails">
			      <el-button style='padding:0' type="text" icon='iconfont icon-details' @click="authdetails(scope.scope.row)"></el-button>
			    </el-tooltip>
			</template>
        </basetable>
		<basepage :sunmary="pagesize" v-on:topage="topage"></basepage>
		<el-dialog :title="formtitle" :visible.sync="showdialog" width='400px'>
			<el-radio-group v-model="checktype" size="small">
				<el-radio-button label="0">身份证验证</el-radio-button>
				<el-radio-button label="1">原手机号验证</el-radio-button>
			</el-radio-group>
			<div style="margin: 20px;"></div>
			<el-form status-icon v-show='checktype==0' :rules='rules' ref="cardcheckparam" label-position='left' label-width="80px" :model="cardcheckparam">
				<el-form-item prop='identity'  label="身份证">
					<el-input auto-complete="off" v-model="cardcheckparam.identity"></el-input>
				</el-form-item>
				<el-form-item prop='newphone' label="新手机号">
					<el-input auto-complete="off" style='width: 190px;' v-model="cardcheckparam.newphone"></el-input>
					<el-button style='margin-right: 0;margin-left: 10px;' @click.prevent="getnewphonecode(cardcheckparam.newphone)">发送</el-button>
				</el-form-item>
				<el-form-item prop='newnum' label="验证码">
					<el-input auto-complete="off" v-model="cardcheckparam.newnum"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="btloding" style='margin-left: -40px;position: relative;top: 10px;' type="primary" @click="submit(cardcheckparam,'cardcheckparam')">提交</el-button>
				</el-form-item>
			</el-form>
			<el-form v-show='checktype==1' label-position="left" label-width="80px" ref="phonecheckparam" :model="oldphonecheckparam" :rules='rules'>
				<el-form-item label="原手机号">
					<el-input style='width: 190px;' v-model.number="oldphonecheckparam.oldphone" :disabled='true'></el-input>
					<el-button style='margin-right: 0;margin-left: 10px;' @click.prevent="getloadphonecode(oldphonecheckparam.oldphone)">发送</el-button>
				</el-form-item>
				<el-form-item prop='oldcheck' label="验证码" >
					<el-input v-model="oldphonecheckparam.oldnum"></el-input>
				</el-form-item>
				<el-form-item label="新手机号" prop="newphone">
					<el-input style='width: 190px;' v-model="oldphonecheckparam.newphone"></el-input>
					<el-button style='margin-right: 0;margin-left: 10px;' @click.prevent="getnewphonecode(oldphonecheckparam.newphone)">发送</el-button>
				</el-form-item>
				<el-form-item label="验证码" prop='newcheck'>
					<el-input v-model="oldphonecheckparam.newnum"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="btloding" style='margin-left: -40px;position: relative;top: 10px;' type="primary" @click="submit(oldphonecheckparam,'phonecheckparam')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import v2table from '@/components/v2table'
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat,cardcheck,phonecheck } from '@/utils/index'
	export default {
		name: 'userinfo',
		components: {
			basetable,basepage,v2table
		},
		created() {
			this.init();
		},
		data() {
			 var validateIdentity = (rule, value, callback) => {
		        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
		          callback(new Error('身份证格式错误'));
		        } else {
		          callback();
		        }
		      };
		      var validatephone = (rule, value, callback) => {
		        if (!phonecheck(value)) {
		          callback(new Error('手机号格式错误'));
		        } else {
		          callback();
		        }
		      };
		      var validateoldcheck = (rule, value, callback) => {
		      	if(this.oldphonecheckparam.oldnum != ''){
			      	this.$api.checkloadphonecode({phone:this.oldphonecheckparam.oldphone,code:this.oldphonecheckparam.oldnum}).then(res => {}, response => {
	                    if(response.data.resultCode=='1'){ 
	                        callback(new Error('旧手机号验证码错误'));
	                    }else{
	                    	callback();
	                    }
					}).catch(err => { //捕获异常
	                    console.log(err)
					})
		      		
		      	}else{
                    callback(new Error('请输入旧手机号验证码'));
		      	}
		      };		      
		      var validatenewcheck = (rule, value, callback) => {
		      	if(this.oldphonecheckparam.newnum !=''){
			      	this.$api.checknewphonecode({phone:this.oldphonecheckparam.newphone,code:this.oldphonecheckparam.newnum}).then(res => {}, response => {
	                    if(response.data.resultCode=='1'){ 
	                        callback(new Error('新手机号验证码错误'));
	                    }else{
	                    	callback();
	                    }
					}).catch(err => { //捕获异常
	                    console.log(err)
					})
		      	}else{
                    callback(new Error('请输入新手机号验证码'));
		      	}
		      };
			return {
				showdetails:false, //是否显示详情
				checktype: '0', //表单类型 0身份证验证 1手机号验证
				showdialog: false, //是否显示表单弹框
				btloding: false,  //表单内按钮加载
				formtitle:'手机号修改', // 表单标题
				loadingContent:'<span>加载中...</span>',
				errorContent:'<a href="javascript:void(0);">刷新重试</a>',
				cardcheckparam: {  //身份证编辑表单参数
					oldphone: '',
					user_id: '',
					oldnum: '',
					identity: '',
					newnum: '',
					newphone: '',
					type: '2'
				},
				oldphonecheckparam: { //手机号编辑表单参数
					oldphone: '',
					user_id: '',
					oldnum: '',
					identity: '',
					newnum: '',
					newphone: '',
					type: '1'
				},
				rules: {  //身份证/手机号验证规则
					identity: [
						{  required: true,message: '请输入身份证号',trigger: 'change'},
					    {  min: 18, max: 18,validator:validateIdentity,  trigger: 'change' }
				    ],
					newphone: [
						{   required: true,message: '请输入手机号码',trigger: 'change'}, 
						{ min: 11, max: 11, validator:validatephone, message: '手机号码格式错误', trigger: 'change' }
					],
					newnum: [
					    { required: true,message: '请输入手机验证码',trigger: 'change'}
					],
					oldcheck:[
//                      { required: true,message: '请输入手机验证码',trigger: 'change'},
                        { validator:validateoldcheck, trigger: 'blur' }
					],
					newcheck:[
//                      { required: true,message: '请输入手机验证码',trigger: 'change'},
                        { validator:validatenewcheck, trigger: 'blur' }
					]
				},
				conditions:{  //搜索条件
					keywords:'',
					STATUS:'', //用户状态
					registered_source:'',//注册源
					registerTimeStart:'',
					registerTimeEnd:'',
					time:'',  //审核类型
					approvalStatus: '', //审核状态
					shareCode: ''
				},
				taleloading: true,  //表格加载。。。
				keyword: '',  //关键词
				authtype: [ //审核类型
					// {value: '', label: '全部'},
					{value: '1', label: '注册时间'},
					{value: '2', label: '完善资料时间'},
					{value: '3',label: '初审时间'}, 
					{value: '4',label: '复审时间'},
					{value: '5',label: '终审时间'}
				],
				auditedlist: [ //用户状态 
					// { value: '', label: '全部' }, 
					{ value: '0',label: '正常' }, 
					{ value: '1',label: '已注销'}, 
					{ value: '2',label: '已冻结'}
				],
				registered_sources:[
                    {value: 0,label:'安卓注册'},
                    {value: 1,label: 'iphone注册'},
                    {value: 2,label: 'PC注册'},
                    {value: 3,label: '微信注册'},
                    {value: 4,label: '后台'},
                    {value: 5,label: '安卓今日头条'},
                    {value: 6,label: '二维码'},
                    {value: 7,label: '活动页'},
                    {value: 10,label: '陌陌'},
                    {value: 11,label: '天下信用'},
                    {value: 14,label: '微博'},
                    {value: 15,label: 'app分享'},
                    {value: 16,label: 'oppo'},
                    {value: 17,label: 'vivo'},
                    {value: 19,label: 'UC'},
                    {value: 20,label: 'app推广链接'},
                    {value: 21,label: '快票分期游'},
                    {value: 22,label: '东方头条'},
                    {value: 23,label: '小米商店'},
                    {value: 24,label: '爱奇艺'},
                    {value: 25,label: '腾讯广电通'},
                    {value: 26,label: '趣头条1'},
                    {value: 27,label: '趣头条2'},
                    {value: 28,label: '趣头条3'},
                    {value: 30,label: '爱奇艺落地页'},
                    {value: 99,label: '未知'},
				],
				authstatus: [ //审核状态
				    // {value: '',label: '全部'},
				    {value: '1',label: '初审'},
				    {value: '11',label: '复审更新'},
				    {value: '2',label: '复审'},
				    {value: '21',label: '终审更新'},
				    {value: '3',label: '终审'},
				    {value: '4',label: '终审通过'},
				    {value: '5',label: '终审不通过'},
				    {value: '6',label: '复审不通过'},
				    {value: '7',label: '终审驳回'},
				    {value: '8',label: '复审通过'},
				    {value: '9',label: '复审驳回'},
				    {value: '10',label: '机械驳回'}
				],
				value9:'',
				pagesize: 0, //分页信息
				baseinfo: [], //表格基本信息
				basetabletitle: [
					{  label: '用户姓名', prop: 'name' },
					{  label: '性别',     prop: 'gender'},
					{  label: '年龄',     prop: 'age'}, 
					{  label: '手机号',   prop: 'phone',width:'120'},
					{  label: '身份证号', prop: 'cert_card',width:'180'},
					{  label: '身份证地址',prop: 'card_location',width:'200'},
					
					{  label: '易指数',   prop: 'ynum_count'       }, 
					{  label: '未认证',   prop: 'au_status1'       },
					{  label: '已认证',   prop: 'au_status3'       },
					{  label: '分析中',   prop: 'au_status2'       },
					{  label: '推广人',   prop: 'share_name'       }, 
					{  label: '用户所属分类', prop: 'classification'},
					{  label: '注册时间', prop: 'create_time',width:'150'}, 
					{  label: '注册源', prop: 'registered_source'  }, 
					{  label: '完善资料时间', prop: 'perfect_time',width:'150'},
					{  label: '初审人', prop: 'su1name'}, 
					{  label: '初审时间', prop: 'ysc_createtime1',width:'150'},
					{  label: '复审人', prop: 'su2name'}, 
					{  label: '复审时间', prop: 'ysc_createtime2',width:'150'}, 
					{  label: '终审人', prop: 'su3name'}, 
					{  label: '终审时间', prop: 'ysc_createtime3',width:'150'}, 
					{  label: '授权额度', prop: 'authorized_amount'}, 
					{  label: '可用额度', prop: 'available_amount'},
					{  label: '审核状态', prop: 'auditflag'}, 
					{  label: '用户状态', prop: 'status'},
					{  label: '是否注销', prop: 'is_cancel'},
				]
			}
		},
		methods: {
			//0
			init() { //初始化
				//请求初审的数据
				this.taleloading = true
				this.$api.getcustomeruser(this.conditions).then(res => {}, response => {
					this.taleloading = false
					this.showdetails = response.data.returnObj.pd.show =='NO' ? false : true
					this.baseinfo    = response.data.returnObj.userList ;
					this.pagesize    = response.data.returnObj.totalCount || this.baseinfo.length || 0
					for(var i = 0; i < this.baseinfo.length; i++) {
						this.$set(this.baseinfo[i],'showdetails',this.showdetails)
						if(this.baseinfo[i].gender == 0) {
							this.baseinfo[i].gender = '男'
						} else {
							this.baseinfo[i].gender = '女'
						}
                        switch(this.baseinfo[i].classification){
                        	case 0:this.baseinfo[i].classification = '未分类';    break;
							case 1:this.baseinfo[i].classification = '学生'  ;    break;
							case 2:this.baseinfo[i].classification = '上班族' ;   break;
							case 3:this.baseinfo[i].classification = '公务员' ;   break;
							case 4:this.baseinfo[i].classification = '芝麻信用';  break;
                        }
						//注册源
						switch(this.baseinfo[i].registered_source) {
							case  0:this.baseinfo[i].registered_source  = '安卓注册'     ;break;
							case  1:this.baseinfo[i].registered_source  = 'iPhone注册'   ;break;
							case  2:this.baseinfo[i].registered_source  = 'PC注册'       ;break;
							case  3:this.baseinfo[i].registered_source  = '微信注册'     ;break;
							case  4:this.baseinfo[i].registered_source  = '后台'         ;break;
							case  5:this.baseinfo[i].registered_source  = '安卓今日头条' ;break;
							case  6:this.baseinfo[i].registered_source  = '二维码'       ;break;
							case  7:this.baseinfo[i].registered_source  = '活动页'       ;break;
							case 10:this.baseinfo[i].registered_source  = '陌陌'         ;break;
							case 11:this.baseinfo[i].registered_source  = '天下信用'     ;break;
							case 14:this.baseinfo[i].registered_source  = '微博'         ;break;
							case 15:this.baseinfo[i].registered_source  = 'app分享'      ;break;
							case 16:this.baseinfo[i].registered_source  = 'oppo'         ;break;
							case 17:this.baseinfo[i].registered_source  = 'vivo'         ;break;
							case 19:this.baseinfo[i].registered_source  = 'UC'           ;break;
							case 20:this.baseinfo[i].registered_source  = 'app推广链接'  ;break;
							case 21:this.baseinfo[i].registered_source  = '快票分期游'   ;break;
							case 22:this.baseinfo[i].registered_source  = '东方头条'       ;break;
							case 23:this.baseinfo[i].registered_source  = '小米商店'     ;break;
							case 24:this.baseinfo[i].registered_source  = '爱奇艺'       ;break;
							case 25:this.baseinfo[i].registered_source  = '腾讯广电通'   ;break;
							case 26:this.baseinfo[i].registered_source  = '趣头条1'      ;break;
							case 27:this.baseinfo[i].registered_source  = '趣头条2'      ;break;
							case 28:this.baseinfo[i].registered_source  = '趣头条3'      ;break;
							case 30:this.baseinfo[i].registered_source  = '爱奇艺落地页' ;break;
							case 99:this.baseinfo[i].registered_source  = '未知'         ;break;
						}
						//审核状态
						switch(this.baseinfo[i].auditflag) {
							case 1:this.baseinfo[i].auditflag = '初审'       ;break;
							case 11:this.baseinfo[i].auditflag = '复审更新'  ;break;
							case 2:this.baseinfo[i].auditflag = '复审'       ;break;
							case 21:this.baseinfo[i].auditflag = '终审更新'  ;break;
							case 3:this.baseinfo[i].auditflag = '终审'       ;break;
							case 4:this.baseinfo[i].auditflag = '终审通过'   ;break;
							case 5:this.baseinfo[i].auditflag = '终审不通过' ;break;
							case 6:this.baseinfo[i].auditflag = '复审不通过' ;break;
							case 7:this.baseinfo[i].auditflag = '终审驳回'   ;break;
							case 8:this.baseinfo[i].auditflag = '复审通过'   ;break;
							case 9:this.baseinfo[i].auditflag = '复审驳回'   ;break;
							case 10:this.baseinfo[i].auditflag = '机械驳回'  ;break;
						};
						//用户状态
						switch(this.baseinfo[i].status) {
							case 0:this.baseinfo[i].status = '注册用户'       ;break;
							case 2:this.baseinfo[i].status = '审核中'         ;break;
							case 3:this.baseinfo[i].status = '审核成功'       ;break;
							case 4:this.baseinfo[i].status = '审核时失败'     ;break;
							case 5:this.baseinfo[i].status = '冻结用户'       ;break;
							case 8:this.baseinfo[i].status = '用户已完善资料' ;break;
							case 9:this.baseinfo[i].status = '审核驳回'       ;break;
						}
						switch(this.baseinfo[i].is_cancel) {
							case 0:this.baseinfo[i].is_cancel = '未注销'         ;break;
							case 1:this.baseinfo[i].is_cancel = '已注销'         ;break;
						}
					}
				}).catch(err => { //捕获异常
					this.taleloading = false
                    console.log(err)
				})
			},
			//选择时间范围
			changetime(value) {
				if(value&&value[0]&&value[1]) {
					this.conditions.registerTimeStart = dateformat(value[0], 'yyyy-MM-dd');
					this.conditions.registerTimeEnd   = dateformat(value[1], 'yyyy-MM-dd');
				}else{
					this.conditions.registerTimeStart = '';
					this.conditions.registerTimeEnd   = '';		
				}
			},
			tosearch() { //搜索
				this.init()
			},
			customCompFunc(params){
                if(params.type=='details'){ //跳转用户认证详情
	                this.$store.dispatch('SETSCORE',params.rowData.ynum_count) //存储分数
		            this.$router.push({ name: '用户认证详情',params:{ 
		                user_id:params.rowData.user_id
		            }})
                }else if(params.type=='logoff'){//注销
	                this.$confirm('此操作将注销该用户, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.$api.logoffuser({userId: params.rowData.user_id}).then(res => {}, response => {
		                	if(response.data.resultCode == 0) {
		                		this.$message({message: '注销成功',duration: '4000',type: 'success'});
		                		this.init()
		                	}else{
		                        this.$message({message: '注销失败',duration: '4000',type: 'error'});
		                	}
						}).catch(val => { this.$message({type:'error',message:'服务器繁忙,请稍后再试'})})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消注销'
			          });
			        });
                }else if(params.type=='showdialogchange'){//点击编辑用户信息
		            this.oldphonecheckparam.oldphone = params.rowData.phone
					this.oldphonecheckparam.user_id  = params.rowData.user_id
					this.cardcheckparam.user_id      = params.rowData.user_id
					this.showdialog = true
                }
			},
			authdetails(row){ //跳转用户认证详情
	            this.$store.dispatch('SETSCORE',row.ynum_count) //存储分数
	            this.$router.push({ name: '用户认证详情',params:{ 
	                user_id:row.user_id
	            }})
			},
			popularize(row){ //推广  //页面跳转
                this.$router.push({name:'推广',params:{}})
			},
			logoff(row){ //注销
				this.$confirm('此操作将注销该用户, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$api.logoffuser({userId: row.user_id}).then(res => {}, response => {
	                	if(response.data.resultCode == 0) {
	                		this.$message({message: '注销成功',duration: '4000',type: 'success'});
	                		this.init()
	                	}else{
	                        this.$message({message: '注销失败',duration: '4000',type: 'error'});
	                	}
					}).catch(val => { this.$message({type:'error',message:'服务器繁忙,请稍后再试'})})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消注销'
		          });
		        });
                
			},
			showdialogchange(row) {//点击编辑用户信息
				this.oldphonecheckparam.oldphone = row.phone
				this.oldphonecheckparam.user_id  = row.user_id
				this.cardcheckparam.user_id      = row.user_id
				this.showdialog = true
			},
			//给新手机发送验证码
			getnewphonecode(phonenum) {
				if((this.checktype == 1)&&(phonenum==this.oldphonecheckparam.oldphone)){ //手机号验证
                    this.$message({message:'新旧手机号一样，无需更改',type:'info'})
                    return 
  				}
				this.$api.getnewphonecode({phone: phonenum}).then(res => {}, response => {
					this.$message({message: response.data.resultMsg,duration: '4000',type: 'success'});
				}).catch(val => { this.$message({type:'error',message:'服务器繁忙,请稍后再试'})})
			},
			//给旧手机发送验证码
			getloadphonecode(phonenum) {
				this.$api.getloadphonecode({phone: phonenum }).then(res => {}, response => {
					this.$message({ message: response.data.resultMsg, duration: '4000',type: 'success'})
				}).catch(val => { this.$message({type:'error',message:'服务器繁忙,请稍后再试'})})
			},
			submit(params,formName) { //提交认证
				this.$refs[formName].validate((valid) => {
					console.log(valid);
					if(valid) {
						this.btloding = true;
						this.$api.changuserphonenum(params).then(res => {}, response => {
							if(response.data.resultCode == 0) {
								this.showdialog = false;
								this.$message({message: response.data.resultMsg,duration: '4000',type: 'success'})
							    this.btloding   = false;
							    this.init();
							}else{
								this.showdialog = false;
								this.btloding   = false;
								this.$message({message: response.data.resultMsg,duration: '4000',type: 'error'})
							}
						}).catch(val => { this.$message({message: '短信验证码要钱的,哥们儿,悠着点',duration: '4000',type: 'error'})})
					}
				})
			},
			//3
		    topage(target){//跳页
		        this.conditions = Object.assign(this.conditions,target); //对象合并
		        this.init()
		    }
		}
	}

</script>
<style lang="less" scoped>
	
	div.el-table {
		margin-top: 15px;
	}
	
	.el-button {
		padding: 12px 20px;
	}
	
	.userinfo .addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,
		button {
			margin-left: 20px;
		}
		button {}
		div.el-input {
			width: 12%;
		}
		div.select{
			width: 12%;
			.el-input{
				width: 100% !important;
			}
		}
	}
</style>