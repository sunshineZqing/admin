<template>
    <div class="bg" @keyup.enter="submitForm">
      <div class="login">
        <div class="login-title">
            <img src="./img/logo.png" alt="">
            <div>
              <span class="systemname">易金</span>
              <span>诚信为本,客户至上</span>
            </div>
        </div>
        <div class="form">
          <div class="username inputplace">
            <input type="text" v-model='username'>
          </div>
          <div class="inputplace password">
            <input type="password"  v-model='password' >
          </div>
          <div class="inputplace verification">
            <input type="text" v-model='code' >
            <button class="sendbtn" @click="sendmsg" :disabled='isclick'>{{infotxt}}</button>
          </div>
          <div class="remerberpassout">
            <el-checkbox v-model="checked"  @change="remerberpass"></el-checkbox> &nbsp;记住密码
          </div>
          <div class="submitForm">
            <button @click='submitForm'  id="submitForm"> 登 录 </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {mapState,mapMutations,mapGetters,mapActions } from 'vuex'
  import { randomWord } from '@/utils/index'
  import { setToken } from '@/utils/auth'
  import  config  from '@/config/index'
  import store from '@/store/index'
  export default {
    data() {
      return {
          username:'',
          password:'',
          code:'',
          checked:false,
          infotxt:'发送验证码',
          countdowntime:-1,
          isclick:false,
      }
    },
    mounted(){
      console.log(config.process_env,8)
      this.checked  = eval(localStorage.getItem('checked'))
      if(this.checked&&JSON.parse(localStorage.getItem('remerber'))){
        this.username = JSON.parse(localStorage.getItem('remerber')).username
        this.password = JSON.parse(localStorage.getItem('remerber')).password
      }
    },
    methods: {
      remerberpass(){
        localStorage.setItem('checked',this.checked)
        if(this.checked&&this.username&&this.password){
           localStorage.setItem('remerber',JSON.stringify({username:this.username,password:this.password}))
        }
      },
      submitForm() { //登录
          if(config.process_env){ //开发环境
            if(this.checked&&this.username&&this.password){
              localStorage.setItem('remerber',JSON.stringify({username:this.username,password:this.password}))
            }
            let params = {
               loginname:this.username,
               password:this.password,
               code:this.code
            }
            let loadingInstance = this.$loading({
                target:'button#submitForm',
                spinner:'el-icon-loading',
                background:'rgba(0, 0, 0, 0.8)'
            })
            this.$api.login(params).then(res=>{  // 成功返回
                 this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                 });
            },reason=>{  //捕获异常
                if(reason.status==200&&reason.data.resultCode=='0'){
                	 //登录成功 将token记录到vuex及cookie中 并且准备进行跳转
                    let  token = randomWord(false,32) //随机生成32位字母和数字的随机串 区分大小写
                    setToken(token)
                    this.$store.commit('settoken',token)

                	//判断账号是否正常 是否可以跳转路由
                	let params = {
						token: store.state.user.token
					}
                	this.$api.asyncrouters(params).then(res => {
						console.log(res)
					}, response => {
						if(response.data.resultCode == 0) {
		                    this.$router.push('/')
						}else{
							this.$message.error(response.data.resultMsg)
						 	this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
		                    	loadingInstance.close();
		                  	});
						}
					}).catch(val => {
						console.log(val);
						store.dispatch('FED_LOGOUT').then(() => {
							this.$message.error('验证失败,请重新登录')
							router.replace('/login')
						})
					})
                    
                }else{
                  this.$message({type:'error',message:'用户名或密码不正确'})
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                  });
                }
            }).catch(val=>{   // 捕获异常
                this.$message({type:'error',message:'服务器异常'})
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
            })
          }else{
            if(this.checked&&this.username&&this.password){
              localStorage.setItem('remerber',JSON.stringify({username:this.username,password:this.password}))
            }
            if(this.username&&this.password&&this.code){
              let params = {
                 loginname:this.username,
                 password:this.password,
                 code:this.code
              }
              let loadingInstance = this.$loading({
                  target:'button#submitForm',
                  spinner:'el-icon-loading',
                  background:'rgba(0, 0, 0, 0.8)'
              })
              this.$api.loginreal(params).then(res=>{  // 成功返回
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                  });
              },reason=>{  //捕获异常
                  if(reason.status==200&&reason.data.resultCode=='0'){
                       //登录成功 将token记录到vuex及cookie中 并且准备进行跳转
                      let  token = randomWord(false,32) //随机生成32位字母和数字的随机串 区分大小写
                      setToken(token)
                      this.$store.commit('settoken',token)
                      this.$router.push('/')
                  }else{
                  	this.$message({type:'error',message:reason.data.resultMsg})
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                      loadingInstance.close();
                    });
                  }
              }).catch(val=>{   // 捕获异常
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                  });
              })
            }else{
              if(this.username==''){
                  this.$message({type:'error',message:'用户名不能为空'})
              }else if(this.password==''){
                  this.$message({type:'error',message:'密码不能为空'})
              }else{
                  this.$message({type:'error',message:'验证码不能为空'})
              }
            }
          }
      },
      sendmsg(){ // 用户名密码校验
          if(config.process_env){ //开发环境
             return
          }
          if(this.countdowntime>0){
              return
          }
          if(this.username&&this.password){
            let params = {
               loginname:this.username,
               password:this.password
            }
            this.countdown()//开始倒计时
            this.isclick = true
            this.$api.capter(params).then(res=>{ },reason=>{ 
                if(reason.status==200&&reason.data.resultCode=='0'){
                    
                   
                }else{
                  this.$message({type:'error',message:reason.data.resultMsg})
                }
            }).catch(val=>{  this.$message({type:'error',message:'服务器异常'})  })
          }else{
            if(this.username==''){
                this.$message({type:'error',message:'用户名不能为空'})
            }else if(this.password==''){
                this.$message({type:'error',message:'密码不能为空'})
            }
          }
      },
      countdown(){
         this.countdowntime = 60
         let  timer =  setInterval(()=>{
            if(this.countdowntime>0){
              this.countdowntime--
              this.infotxt =this.countdowntime +'秒'
            }else{
              this.infotxt = '发送验证码'
              this.isclick = false 
              clearInterval(timer)
            }
         },1000)
      }
    }
  }
</script>
<style scoped lang="less">
  .bg{
    width: 100%;
    height: 100vh;
    position: relative;
    background: url(http://www.wangyueyun.top/img/login_bg.png);
    background-size: 100% 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
	.login{
		width: 100%;
		height: 448px;
    background: rgba(56,91,170,0.9); 
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
	}
	.login-title{
    height: 100px;
		text-align: center;
		color:#fff;
		font-size:16px ;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
	}
  .login-title>img{
    width: 85px;
    height: 85px;
  }
  .login-title>div{
    height: 100%;
    margin-left: 20px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
  }
  .systemname{
    font-size: 59.51px;
    color: #fff;
    font-weight: bold;
  }
	.form>div{
     text-align: center;
     width: 100%;
     border-radius: 20px;
     height: 40px;
     margin:10px 0; 
	}
  .form>div>input{
    border:none;
    border-radius: 20px;
    outline: none;

  }
  .inputplace{
    background: #fff;
  }

  .username>input{
    height: 100%;
    width: 80%;
    padding-left:30px ;
    background: url(./img/user.png) no-repeat 0;
  }
  .password>input{
    height: 100%;
    width: 80%;
    padding-left:30px ;
    background: url(./img/icon_password.png) no-repeat 0;
  }
  .verification>input{
    height: 100%;
    width: 43%;
    padding-left:30px ;
    background: url(./img/verification.png) no-repeat 0;
  }
  .sendbtn{
    color:#1d47a3 ;
    width:108px ;
    font-size:16px ;
    text-align: center;
    display: inline-block;
    background-color: transparent;
    border: none ; 
    border-left:1px solid #1d47a3 ;
    cursor: pointer;
    outline: none;
  }
  .remerberpassout{
    text-align: left;
    padding-left: 25px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #fff;
  }
  .remerberpassout>input{
    width: 15px;
    height:15px;
    background:transparent;
    margin:0;
    padding: 0; 
  }
  .submitForm{
    text-align: center;
  }
  .submitForm>button{
    text-align: center;
    border:none;
    border-radius: 15px;
    background: #0c74f8;
    color: #fff;
    width: 135px;
    line-height: 43px; 
    font-size: 24px;
    outline: none;
    cursor: pointer;
  }
</style>