<template>
	<div class="set">
		<div class="opera">
			<el-badge is-dot class="item" :hidden="showmsg">
				<el-tooltip content="通知消息" placement="bottom">
					<img src="../assets/img/msg.png" alt="" class="msg">
				</el-tooltip>
			</el-badge>
			<el-tooltip content="个人设置" placement="bottom">
				<!--<img src="../assets/img/set.png" alt="" @click="toggleSideBar">-->

			</el-tooltip>
			<el-dropdown @command = "setData">
				<el-button type="text">
					<i class="el-icon-setting"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="setPersonalData">编辑资料</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>|</span>
			<el-tooltip content="退出登录" placement="bottom">
				<img src="../assets/img/quit.png" alt="" @click="logout">
			</el-tooltip>
		</div>
		<span class="closeall" @click="EmptyAll">关闭所有</span>
		<!--编辑资料弹框-->
		<el-dialog title="编辑个人资料" :visible.sync="dialogVisible" width="450px" :before-close="handleClose"> 
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="角色：" prop="role" >
			    <el-input v-model="ruleForm2.role" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="用户名：" prop="username" >
			    <el-input v-model="ruleForm2.username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：" prop="password">
			    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="chkpwd">
			    <el-input type="password" v-model="ruleForm2.chkpwd" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="name">
			    <el-input v-model="ruleForm2.name"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号：" prop="phone">
			    <el-input v-model="ruleForm2.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱：" prop="email">
			    <el-input v-model="ruleForm2.email"></el-input>
			  </el-form-item>
			  <el-form-item label="备注：" prop="su_remark">
			    <el-input v-model="ruleForm2.su_remark"></el-input>
			  </el-form-item>
			  <el-form-item style="margin: 0;">
			    <el-button type="primary" @click="submitForm('ruleForm2')" size="medium">提交</el-button>
			    <el-button @click="resetForm('ruleForm2')" size="medium">重置</el-button>
			  </el-form-item>
			</el-form>
			<!--<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>-->
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Message } from 'element-ui'
	export default {
		name: 'set',
		computed:{
        	...mapGetters(['userinfo'])
    	},
		data() {
			var unKong = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('不能为空'));
		        }else {
		          callback();
		        }
		    };
		    var validatePass = (rule, value, callback) => {
		        
		          if (this.ruleForm2.chkpwd !== '') {
		            this.$refs.ruleForm2.validateField('chkpwd');
		          }else{
		          	 callback();
		          }
		         
		    };
		    var validatePass2 = (rule, value, callback) => {
		        if (value !== this.ruleForm2.password) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };
		    var validatePhone = (rule, value, callback) => {
		      	if (value === '') {
		          callback(new Error('请输入手机号'));
		        } else if (!/^1[3-9]\d{9}$/.test(value)) {
		          callback(new Error('输入正确的手机号码!'));
		        } else {
		          callback();
		        }
		    };
		    
			return {
				showmsg: false,
				dialogVisible:false,//编辑资料弹框
				goSetPersonalDataParams:{//去编辑资料请求参数
					fx:'user',
					USER_ID:'',
				},
				ruleForm2: {//提交编辑资料信息
					sr_id:'',//角色主键
					su_id:'',//用户编号
					role:'',//角色
					username:'',//用户名
					name:'',//姓名
		          	password: '',//密码
		          	chkpwd: '',//确认密码
		          	phone: '',//手机号
		          	email:'',//邮箱
		          	su_remark:'',//备注
		        },
		        rules2: {//验证提交编辑资料内容
		        	username:[
		        		{validator: unKong,message: '请输入用户名称', trigger: 'blur' }
		        	],
		        	name:[
		        		{validator: unKong,message: '请输入姓名', trigger: 'blur' }
		        	],
		          	password: [
//		            	{ validator: validatePass, trigger: 'blur' }
		          	],
		          	chkpwd: [
		            	{ validator: validatePass2, trigger: 'blur' }
		          	],
		          	phone:[
		          		{ validator: validatePhone, trigger: 'blur' }
		          	],
		          	email:[
		          		{validator: unKong,message: '请输入邮箱', trigger: 'blur' },
		          		{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
		          	],
		          	su_remark:[
		          		{validator: unKong,message: '请输入备注信息', trigger: 'blur' },
		          	]
		        }
			}
		},
		methods: {
			logout() {
				// 退出登录
				this.$api.logout().then(res => { // 成功返回
					console.log('成功返回')
				}, reason => { //捕获异常
					if(reason.status == 200 && reason.data == '登录') {
						//退出成功  //清除token 跳转至登录页
						this.$store.dispatch('LOGOUT')
						Message.success('退出成功')
						this.$router.push({
							path: '/login'
						})
					} else {
						Message.error('退出失败')
					}
				}).catch(val => { // 捕获异常
					Message.error('退出失败')
				})
	       	},
	       	toggleSideBar() {//切换展开
			    this.$store.dispatch('ToggleSideBar',aa)
	       	},

			EmptyAll() {
				this.$store.dispatch('EmptyVisitedViews').then(() => {
					this.$router.push('/')
				})
			},
			//编辑资料
			setData(command) {
				if(command == 'setPersonalData'){//编辑资料
					this.dialogVisible = true;
					this.goSetPersonalData();
				}
			},
			//去编辑资料
			goSetPersonalData(){
				this.goSetPersonalDataParams.USER_ID = this.userinfo.USER_ID;
				this.$api.goSetPersonalData(this.goSetPersonalDataParams).then(res => {}, response => {
					this.ruleForm2.sr_id = response.data.returnObj.pd.sr_id;
					this.ruleForm2.su_id = response.data.returnObj.pd.su_id;
					this.ruleForm2.username = response.data.returnObj.pd.username;
					this.ruleForm2.role =  response.data.returnObj.pd.username
					this.ruleForm2.name = response.data.returnObj.pd.name;
					this.ruleForm2.phone = response.data.returnObj.pd.phone;
					this.ruleForm2.email = response.data.returnObj.pd.email;
					this.ruleForm2.su_remark = response.data.returnObj.pd.su_remark;
				}).catch(val => {
					//异常
				})
			},
			handleClose(done) {
		        this.$confirm('确认关闭？')
			        .then(_ => {
			            done();
			        })
		        .catch(_ => {});
		    },
		    //提交编辑资料信息
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	this.$api.goSetPersonalData(this.ruleForm2).then(res => {}, response => {
							if(response.data.resultCode == 0){
								this.dialogVisible = false;
								this.$message({message: '修改个人资料成功',type: 'success'});
							}
						}).catch(val => {
							//异常
						})
		            } else {
		                return false;
		          	}
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		}
	}
</script>
<style scoped>
	.set {
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-end;
		margin-right: 30px;
	}
	
	.opera {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.opera>img {
		width: 20px;
		height: 20px;
		margin: 0 12.5px;
		cursor: pointer;
	}
	
	.opera>span {
		margin: 0 12.5px;
		color: #c6c8ca;
		margin-top: -5px;
	}
	
	.closeall {
		color: #c8c9ca;
		font-size: 12px;
		background-color: #ecebeb;
		padding: 3px 10px;
		border-radius: 15px;
		cursor: pointer;
	}
	
	.item {
		margin-top: 10px;
		margin-right: 40px;
		cursor: pointer;
	}
	
	.el-icon-setting {
		font-size: 25px;
		color: #c6c8ca;
	}
</style>