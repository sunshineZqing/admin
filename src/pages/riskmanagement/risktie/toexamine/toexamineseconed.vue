<template>
	<div class="examine" v-if="params">
		<!--<sliderright></sliderright>-->
			
		<div class="examinepad">

			<div class="baseinfo" v-if="params[1]&&params[1].ynumPd">
			  	<div>
			  		<span>用户分类</span> :
			  		<span v-if="params[1].ynumPd.classification==0">未知</span>
			  		<span v-if="params[1].ynumPd.classification==1">学生</span>
			  		<span v-if="params[1].ynumPd.classification==2">上班族</span>
			  		<span v-if="params[1].ynumPd.classification==3">公务员</span>
			  		<span v-if="params[1].ynumPd.classification==4">芝麻信用</span>
			  	</div>
			  	<div>
			  		<span>注册时间</span> :<span v-text="params[1].ynumPd.create_time"></span>
			  	</div>
		    </div>
		    <div class="title" v-if="params[1]&&params[1].ynumPd">
		    	<div><span>初审时间：</span><span v-text="params[1].ynumPd.first_time"></span></div>
		    	<div v-if="params[1].ynumPd.onetimes"><span>初审用时：</span><span v-text="params[1].ynumPd.onetimes"></span>天</div>
		    	<!-- <div><span>风控经理：</span><span v-text="params[1].ynumPd.create_time"></span></div> -->
		    </div>
		    <div class="showinfo" v-if="params[1]&&params[1].ynumPd">
		    	<span>初审报告</span>
		    	<el-input v-model="params[1].ynumPd.yf_report"   :disabled="true" type="textarea" :rows='row' placeholder="初审报告"></el-input>
		    </div>
		    <div class="showinfo" v-if="params[1]&&params[1].ynumPd">
		    	<span>初审建议</span>
		    	<el-input v-model="params[1].ynumPd.yf_advise"   :disabled="true" type="textarea" :rows='row' placeholder="初审建议"></el-input>
		    </div>
		    <div class="endfirst showinfo" v-if="params[1]&&params[1].ynumPd">
		    	<span>初审额度: <span v-text="params[1].ynumPd.audit_limit1"></span ></span>
		    	<span>初审人:   <span v-text="params[1].ynumPd.name1"></span ></span>
		    </div>
		    <el-form ref="form1" :model="form1" label-width="80px">
			    <el-form-item label="备用电话" prop="reservephone">
		    	    <el-input v-model="form1.reservephone"    type="text"  placeholder="备用电话"></el-input>
			    </el-form-item>
			    <p class="urgent">紧急联系人</p>
			    <el-form-item label="姓名"  prop="name">
		    	    <el-input v-model="form1.name"      type="text"  placeholder="姓名"></el-input>
			    </el-form-item>
			 <!--    <el-form-item label="性别" prop="gender">
		    	    <el-input v-model="form1.gender"    type="text"  placeholder="性别"></el-input>
			    </el-form-item>		 -->	    
			    <el-form-item label="电话" prop="phone">
		    	    <el-input v-model="form1.phone" type="text"  placeholder="电话"></el-input>
			    </el-form-item>			    
			    <el-form-item label="关系" prop="relationship">
		    	    <el-input v-model="form1.relationship"    type="text"  placeholder="关系"></el-input>
			    </el-form-item>
				<el-form-item>
				    <el-button  @click="onSubmit" type="warning" plain size="medium">保存</el-button>
				</el-form-item>
		    </el-form>
		    <el-form ref="form2" :model="form2" label-width="80px" :rules="rules" >
		    	<el-form-item label="复审建议"  prop="advise" >
		    	    <textarea class="form2textarea" v-model="form2.advise"  :disabled='isedit' @blur="saveAdvise"  type="textarea" :rows='row' placeholder="复审建议"></textarea>
			    </el-form-item>
			    <el-form-item label="复审额度"  prop="money"  >
		    	    <el-input v-model.number="form2.money" :disabled='isedit'    type="text"  placeholder="复审额度"></el-input>
			    </el-form-item>
			    <el-form-item label="初审评分"  prop="score">
		    	    <el-input v-model.number="form2.score" :disabled='isedit'  type="text"  placeholder="初审评分"></el-input>
			    </el-form-item>
			    <el-form-item >
		    	    <textarea class="form2textarea" v-model="form2.mark" type="textarea" :disabled='isedit'   :rows='row' placeholder="评分备注"></textarea>
			    </el-form-item>
			    <el-form-item v-if="!isedit">
					<el-button  type="primary" @click="finallyonSubmit(8)" size="medium" :loading="btnloading">同意授信</el-button>
				    <el-button  type="danger" size="medium" @click="finallyonSubmit(9)">驳回</el-button>
			    </el-form-item>
			</el-form>
			
		</div>
			
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Message }    from 'element-ui'
	import { isEmptyObject} from '@/utils/index'
	import  sliderright   from '@/components/sliderleft'
	export default{
		name:'toexamineseconed',
		components:{
			sliderright
		},
		props:['params'],
		computed:{
//			...mapGetters(['params'])
		},
		watch:{
            params(){
        		if(!isEmptyObject(this.params)){
					this.form1.reservephone = this.params[3].concatPd.spaphone || ''
					this.form1.name         = this.params[3].concatPd.phone_name || ''
					this.form1.phone        = this.params[3].concatPd.phone || ''
					this.form1.relationship = this.params[3].concatPd.atd_remark || ''
		        }
            }
		},
		data(){
			var validateAdvise = (rule, value, callback) => {
				if (!value) {
				  return callback(new Error('复审建议不能为空'));
				}else{
					callback()
				}
			};
						
			var validateMoney = (rule, value, callback) => {
				if (!value&&value!=0) {
				  return callback(new Error('复审额度不能为空'));
				}
				setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		            callback();
		          }
		        }, 500);
			};
			var validateScore = (rule, value, callback) => {
				if (!value&&value!=0) {
				  return callback(new Error('评分不能为空'));
				}
                setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		            callback();
		          }
		        }, 500);
			};	
			var validateMark = (rule, value, callback) => {
				if (!value) {
				  return callback(new Error('评分备注不能为空'));
				}else{
					callback()
				}
			};	
			return {
				row:15,
				btnloading:false,
				inputcontent:'',
                form1:{
                	reservephone: '',
                	name: '',
                	gender:'',
                	phone: '',
                	relationship: ''
                },
				form2:{
					advise:'',
					money:'',
					score:'',
                    mark:''
				},
				rules:{
                  advise:[{ validator: validateAdvise}],
                  money:[{  validator: validateMoney}],
                  score:[{  validator: validateScore}],
                  mark:[{   validator: validateMark,trigger:'change'}]
				},
				isedit:false
			}
		},
		mounted(){
			console.log(this.params)
			if(!isEmptyObject(this.params)){
				this.form1.reservephone = this.params[3].concatPd.spaphone
				this.form1.name         = this.params[3].concatPd.phone_name
				this.form1.phone        = this.params[3].concatPd.phone
				this.form1.relationship = this.params[3].concatPd.atd_remark || ''

				this.form2.advise       = this.params[1].ynumPd.ysc_advise || ''
				this.form2.money        = this.params[1].ynumPd.audit_limit2 || ''
				this.form2.score        = this.params[1].ynumPd.first_score || ''
				this.form2.mark         = this.params[1].ynumPd.first_score_remark || ''
			}else{
				this.$watch('params',()=>{
			        if(!isEmptyObject(this.params)){
						this.form1.advise       = this.params[3].concatPd.spaphone
						this.form1.name         = this.params[3].concatPd.phone_name
						this.form1.phone        = this.params[3].concatPd.phone
						this.form1.relationship = this.params[3].concatPd.atd_remark || ''

						this.form2.advise       = this.params[1].ynumPd.ysc_advise || ''
						this.form2.money        = this.params[1].ynumPd.audit_limit2 || ''
						this.form2.score        = this.params[1].ynumPd.first_score || ''
						this.form2.mark         = this.params[1].ynumPd.first_score_remark || ''
			        }
				})
			}
			if(!isEmptyObject(this.params)&&this.params[1].ynumPd&&this.params[1].ynumPd.auditflag){
            	if(this.params[1].ynumPd.auditflag==8 || this.params[1].ynumPd.auditflag==9){
            		this.isedit = true
				    this.form2.advise       = this.params[1].ynumPd.ysc_advise || ''
					this.form2.money        = this.params[1].ynumPd.audit_limit2 || ''
					this.form2.score        = this.params[1].ynumPd.phone || ''
					this.form2.mark         = this.params[1].concatPd.first_score_remark || '' 
            	}else{
            		this.isedit = false
            	}
			}else{
				this.$watch('params',()=>{
					if(!isEmptyObject(this.params)&&this.params[1].ynumPd&&this.params[1].ynumPd.auditflag){
		                if(this.params[1].ynumPd.auditflag==8 || this.params[1].ynumPd.auditflag==9){
		            		this.isedit = true
				            this.form2.advise       = this.params[1].ynumPd.ysc_advise || ''
							this.form2.money        = this.params[1].ynumPd.audit_limit2 || ''
							this.form2.score        = this.params[1].ynumPd.phone || ''
							this.form2.mark         = this.params[1].concatPd.first_score_remark || ''
		            	}else{
		            		this.isedit = false
		            	}
					}
				})
			}
		},
		methods:{
            onSubmit(){//保存紧急联系人 /备用电话
                let params = {
                	user_id:this.$route.params.user_id,
                	spare_phone:this.form1.reservephone,
                	phone:this.form1.phone,
                	phone_name:this.form1.name || '',
                	atd_remark:this.form1.relationship || '', 
                }
            	this.$api.saveContact(params).then(res=>{},response=>{//请求数据
	            	if(response.data.resultCode=='0'){
	            		this.$message.success('保存成功')
	                }else{
	                	this.$message.error('保存失败')
	                }
		        }).catch(val=>{//捕获异常
		        	this.$message.error('服务器异常')
		        }) 
            },
            saveAdvise(){
				let params = {
				    ynum_id:this.$route.params.ynum_id,
				    ysc_advise :this.form2.advise,
				    action:this.$route.params.action
				}
				if(!this.form2.advise){
                    return
				}
				this.$api.saveAdvise(params).then(res=>{},response=>{//请求数据
					if(response.data.resultCode=='0'){
						 
				    }else{
				    	 
				    }
				}).catch(val=>{//捕获异常
                    
				}) 
			},
			finallyonSubmit(operatype){//提交复审及复审额度
				if(operatype=='8'&&parseInt(this.form2.money)>=3000){
					this.$message('复审额度大于3000时将会移交终审');
				}
				this.$refs.form2.validate((valid) => { 
					if (valid) {
		                let params = {
		                	user_id:this.$route.params.user_id,
		                    auditflag:operatype,
		                    ynum_id:this.$route.params.ynum_id,
		                    audit_limit:this.form2.money,
		                    score :this.form2.score,
		                    score_remark :this.form2.mark,
		                    ysc_advise :this.form2.advise
		                }
		                this.btnloading = true
						this.$api.savesecondauth(params).then(res=>{},response=>{//请求数据
							this.btnloading = false
			            	if(response.data.resultCode=='0'){
			            		this.$message.success('操作成功')
			            		this.$store.dispatch('SHOWAUTH',false); //关闭审核列表=>审核建议弹框
			            		this.$router.push({ name: '复审'})//审核成功跳转至复审列表页
			                }else{
			                    this.$message.error('操作失败')
			                }
				        }).catch(val=>{//捕获异常
				        	this.btnloading = false
				        	this.$message.error('服务器异常')
				        }) 
					}
				}); 

			}
		}

	}
</script>
<style lang="less" scoped>
	.baseinfo{
		margin: 0;
		padding: 0;
		margin-top:2%;
		margin-bottom: 2.5%;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		div{
			flex:1;
			text-align: left;
		}
	}
	.examine{
		width: 100%;
		height: 100%;
		position:static;
		transform:translate(0,0);
	}

	.examinepad{
		padding: 5%;
		font-size: 14px;
	}
	.urgent{
		text-align: left;
		padding: 0 10px;
	}
	.title{
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		div{
			flex:1;
			text-align: left;
		}
	}
	.showinfo{
		text-align: left;
		margin: 3% 0;
		span{
			display: inline-block;
			margin-bottom: 3%;
		}
	}
	.endfirst{
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;	
		border-bottom:1px dotted #FBB388; 
		span{
			flex:1;
		}
	}
	textarea.el-textarea__inner{
		color: #000 !important;
	}
	.form2textarea{
		width: 100%;
		height: 300px;
		border-radius: 4px;
	    border: 1px solid #d8dce5;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
        padding: 15px;
        font-size: 14px;
        line-height: 1.5;
	}
</style>