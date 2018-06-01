<template>
	<div class="cloudcontent">
		<div class="contentsorce" v-if="authitem">
	        <p v-if="authitem"><span class="addsorcename">易指数加分:</span> <input class="addsorce"  v-model="authitem.au_num" type="text"></p>
			<div v-if="action==1"> <!-- 初审显示 -->
				<button class="pass" @click="pass()" :loading="btnloading">通过</button>
				<button class="reject" @click="pass(1)">驳回</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { isEmptyObject} from '@/utils/index'
	import {mapGetters } from 'vuex'
	export default{
		name:"cloudsubmit",
		computed:{
            ...mapGetters(['authitem','authinfo','action'])
		},
		data(){
			return{
				btnloading:false,
			    quota:'', //参考额度
			    authenticationinfo:{} //请求参数
			}
		},
		methods:{
			pass(status){//通过
				if(!isEmptyObject(this.authinfo)){
                    if(status==1){ //驳回
                    	this.authenticationinfo  = {
                    		user_id:this.authinfo.user_id,
                    		au_ynumauth_type:this.authinfo.au_ynumauth_type,
                    		ynum_id:this.authinfo.ynum_id,
                    		au_id:this.authinfo.au_id,
                    		num:this.authitem.au_num,
                    		status:status
                    	}
                    }else{ //通过
                    	this.authenticationinfo  = {
                    		user_id:this.authinfo.user_id,
                    		au_ynumauth_type:this.authinfo.au_ynumauth_type,
                    		ynum_id:this.authinfo.ynum_id,
                    		au_id:this.authinfo.au_id,
                    		num:this.authitem.au_num
                    	}
                    }
                    this.btnloading = true
	                this.$api.authentication(this.authenticationinfo).then(res=>{},response=>{
	                	this.btnloading = false
	                	if(response.data.resultCode=='0'){
	                		this.$message({ type: 'success',message: '操作成功!'});
                			if(response.data.returnObj.pd&&response.data.returnObj.pd.ynum_count){
                                this.$store.dispatch('SETSCORE',response.data.returnObj.pd.ynum_count)
		                    }
		                }else{
		                	this.$message({ type: 'error',message: '操作失败!'});
		                }
			        }).catch((error)=>{//捕获异常
                        this.btnloading = false
                        this.$message.error('服务器异常')
			        }) 
				}else{
					this.$watch('authinfo',()=>{
						if(status==1){ //驳回
	                    	this.authenticationinfo  = {
	                    		user_id:this.authinfo.user_id,
	                    		au_ynumauth_type:this.authinfo.au_ynumauth_type,
	                    		ynum_id:this.authinfo.ynum_id,
	                    		au_id:this.authinfo.au_id,
	                    		num:this.authitem.au_num,
	                    		status:status
	                    	}
	                    }else{ //通过
	                    	this.authenticationinfo  = {
	                    		user_id:this.authinfo.user_id,
	                    		au_ynumauth_type:this.authinfo.au_ynumauth_type,
	                    		ynum_id:this.authinfo.ynum_id,
	                    		au_id:this.authinfo.au_id,
	                    		num:this.authitem.au_num
	                    	}
	                    }
	                    this.btnloading = true
						this.$api.authentication(this.authenticationinfo).then(res=>{},response=>{
							this.btnloading = false
		                	if(response.data.resultCode=='0'){
			                    this.$message.success('操作成功')
			                    if(response.data.returnObj.pd&&response.data.returnObj.pd.ynum_count){
                                    this.$store.dispatch('SETSCORE',response.data.returnObj.pd.ynum_count)
			                    }
			                }else{
                                this.$message.error('操作失败')
			                }
				        }).catch((error)=>{//捕获异常
				        	console.log(error)
                            this.btnloading = false
                            this.$message.error('服务器异常')
				        }) 
					})
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.cloudcontent{
       margin-top:20px;
	}
	.contentsorce{
		width:300px ;
		margin:0 auto;
		display: flex;
		display: -webkit-flex;
    	flex-wrap:nowrap;
    	flex-direction:column;
    	justify-content:space-around;
        align-items:flex-start;
        p{
        	margin:0;
        	padding: 0;
        	margin-bottom: 30px;
        }
        div{
        	width: 100%;
        	display: flex;
			display: -webkit-flex;
	    	flex-wrap:nowrap;
	    	flex-direction:row;
	    	justify-content:space-between;
	        align-items:center;
	        button{
	        	width: 125px;
	        	border-radius: 8px;
	        	text-align: center;
	        	font-size:16px ;
	        	color: #fff;
	        	line-height:30px ;
	        	background-color:#30c9f3 ;
	        	border: none;
	        	outline: none;
	        	cursor: pointer;
	        }
	        button:last-child{
                background-color:#f86b6b;
	        }
        }
	}
	.addsorcename,.quotaname{
        color: #555555;
        font-size: 14px;
	}
	.addsorce{
        color: #fb4242;
        font-size: 21px;
        border: none;
        width: 60%;
        outline: none;
	}
	.quota{
		width: 100px;
		border: none;
		border-bottom:1px solid #333333; 
		text-align: center;
		color: #b1b1b1;
		font-size: 21px;
		outline: none;
	}
	.quotatip{
		color: #999999;
		font-size: 16px;
	}
	::input-placeholder{
		color: #b1b1b1;
		font-size: 21px;
	}
	::-webkit-input-placeholder {
		color: #b1b1b1;
		font-size: 21px;
	}
</style>