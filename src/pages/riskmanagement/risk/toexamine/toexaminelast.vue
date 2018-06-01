<template>
	<div class="examine" v-if="params&&params[1]&&params[1].ynumPd">
		<!--<sliderright></sliderright>-->
		<div  calss="examinepad">
			<div class="titleinfo">
				<span>用户分类：
					<span v-if="params[1].ynumPd.classification==0">未知</span>
			  		<span v-if="params[1].ynumPd.classification==1">学生</span>
			  		<span v-if="params[1].ynumPd.classification==2">上班族</span>
			  		<span v-if="params[1].ynumPd.classification==3">公务员</span>
			  		<span v-if="params[1].ynumPd.classification==4">芝麻信用</span>
			  	</span>	
			  	<span class="fkmanger">风控经理：<span>***</span></span>
				<span>注册时间：<span>{{params[1].ynumPd.create_time}}</span></span>
				
			</div>
			<div class="first">
				<div class="baseinfo" v-if="params[1].ynumPd.first_time">
					<div><span>初审时间:</span><span v-text="params[1].ynumPd.first_time"></span> </div>
					<div v-if="params[1].ynumPd.onetimes"> <span>初审用时:</span><span v-text="params[1].ynumPd.onetimes"> </span>天 </div>
				</div>
				<el-form ref="form0" :model="params[1]" label-width="80px">
			    	<el-form-item label="初审报告"  >
			    	    <el-input v-if="params[1].ynumPd.yf_report" v-model="params[1].ynumPd.yf_report"  :disabled="true"  type="textarea"  :rows="row1" placeholder="初审报告"></el-input>
				    </el-form-item>
				    <el-form-item label="初审建议">
			    	    <el-input v-model="params[1].ynumPd.yf_advise"  :disabled="true"  type="textarea"  :rows='11' placeholder="初审建议"></el-input>
				    </el-form-item>
				    <el-form-item label="初审额度" >
			    	    <el-input v-model="params[1].ynumPd.audit_limit1"  :disabled="true"   type="text"  placeholder="初审额度"></el-input>
				    </el-form-item>
				    <el-form-item label="初审人" >
			    	    <el-input v-model="params[1].ynumPd.name"  :disabled="true"  type="text"  placeholder="初审人"></el-input>
				    </el-form-item>
				   <!--  <el-form-item label="初审评分">
			    	    <el-input v-model="lastform.score"   :disabled="true"  type="text"  placeholder="初审评分"></el-input>
				    </el-form-item>
				    <el-form-item >
			    	    <el-input v-model="lastform.remark"   :disabled="true" type="textarea" :rows='row' placeholder="评分备注"></el-input>
				    </el-form-item> -->
				</el-form>
			</div>
			<div class="seconed">
				<div class="baseinfo">
					<div>  <span>复审时间:</span><span v-text="params[1].ynumPd.second_time"> </span> </div>
					<div  v-if="params[1].ynumPd.twotimes">  <span>复审用时:</span><span v-text="params[1].ynumPd.twotimes"> </span>天</div>
				</div>
				<el-form ref="form1" :model="params[1]" label-width="80px">
			    	<el-form-item label="复审建议"  >
			    	    <el-input v-model="params[1].ynumPd.ysc_advise"  :disabled="true"  type="textarea"  :rows="row" placeholder="复审建议"></el-input>
				    </el-form-item>
				    <el-form-item label="复审额度">
			    	    <el-input v-model="params[1].ynumPd.audit_limit2"  :disabled="true"   type="text"  placeholder="复审额度"></el-input>
				    </el-form-item>
				    <el-form-item label="复审人">
			    	    <el-input v-model="params[1].ynumPd.name"  :disabled="true"  type="text"  placeholder="复审人"></el-input>
				    </el-form-item>
				   <!--  <el-form-item label="初审评分">
			    	    <el-input v-model="lastform.score"   :disabled="true"  type="text"  placeholder="初审评分"></el-input>
				    </el-form-item>
				    <el-form-item >
			    	    <el-input v-model="lastform.remark"   :disabled="true" type="textarea" :rows='row' placeholder="评分备注"></el-input>
				    </el-form-item> -->
				</el-form>
			</div>
			<el-form ref="form" :model="lastform" label-width="80px" :rules="rules">
		    	<el-form-item label="终审建议"  prop="advise"  v-if="params[1].ynumPd.auditflag!=8&&params[1].ynumPd.auditflag!=9">
		    	    <el-input v-model="lastform.advise"  :disabled='isedit'  type="textarea"  :rows="row" placeholder="终审建议" @blur="saveAdvise"></el-input>
			    </el-form-item>
			    <el-form-item label="终审额度"  prop="money"  v-if="params[1].ynumPd.auditflag!=8&&params[1].ynumPd.auditflag!=9">
		    	    <el-input v-model.number="lastform.money"  :disabled='isedit'   type="text"  placeholder="终审额度"></el-input>
			    </el-form-item>
			    <el-form-item label="复审评分"  prop="score"  v-if="params[1].ynumPd.second_score_flag!=2">
		    	    <el-input v-model.number="lastform.score"   :disabled='isedit'  type="text"  placeholder="复审评分"></el-input>
			    </el-form-item>
			    <el-form-item  v-if="params[1].ynumPd.second_score_flag!=2">
		    	    <el-input v-model="lastform.remark"  :disabled='isedit'  type="textarea" :rows='10' placeholder="评分备注"></el-input>
			    </el-form-item>
			    <el-form-item v-if="!isedit">
					<el-button v-if="params[1].ynumPd.auditflag!=8&&params[1].ynumPd.auditflag!=9"  type="primary" @click="finallyonSubmit(4,'form')" size="medium" :loading="btnloading">同意授信</el-button>

				    <el-button v-if="params[1].ynumPd.auditflag!=8&&params[1].ynumPd.auditflag!=9"  type="danger" size="medium" @click="finallyonSubmit(7,'form')"  :loading="btnloading">驳回</el-button>
    
				    <el-button v-if="(params[1].ynumPd.auditflag==8||params[1].ynumPd.auditflag==9) && params[1].ynumPd.second_score_flag!=2"  type="primary" @click="finallyonSubmit(4,'form')" size="medium" :loading="btnloading">提交</el-button>
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
	export default {
		name:'toexaminelast',
		components:{
			sliderright
		},
		computed:{
			...mapGetters(['params'])
		},
		data(){
			var validateAdvise = (rule, value, callback) => {
				if (!value) {
				  return callback(new Error('终审建议不能为空'));
				}else{
					callback()
				}
			};			
			var validateMoney = (rule, value, callback) => {
				if (!value && value!=0) {
				  return callback(new Error('终审额度不能为空'));
				}
				setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		              callback();
		          	
//		            if (value < 1000) {
//		              callback(new Error('必须大于1000'));
//		            } else {
//
//		            }
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
				row:9,
				btnloading:false,
				row1:10,
				lastform:{
					advise:"",
					money:'',
					person:'',
					score:'',
					remark:''
				},
				rules:{
                  advise:[{ validator: validateAdvise}],
                  money: [{ validator: validateMoney }],
                  score: [{ validator: validateScore }],
                  remark:[{ validator: validateMark  }]
				},
				isedit:false,//是否可编辑
			}
		},
		mounted(){
            if(!isEmptyObject(this.params)&&this.params[1].ynumPd&&this.params[1].ynumPd.auditflag){
            	if(this.params[1].ynumPd.auditflag==4 || this.params[1].ynumPd.auditflag==7){
            		this.isedit = true
            		this.lastform.advise       = this.params[1].ynumPd.ysc_advise 
					this.lastform.money        = this.params[1].ynumPd.audit_limit3
					this.lastform.score        = this.params[1].ynumPd.second_score
					this.lastform.remark       = this.params[1].concatPd.second_score_remark
            	}else{
            		this.isedit = false
            	}
			}else{
				this.$watch('params',()=>{
					if(!isEmptyObject(this.params)&&this.params[1].ynumPd&&this.params[1].ynumPd.auditflag){
		                if(this.params[1].ynumPd.auditflag==4 || this.params[1].ynumPd.auditflag==7){
		            		this.isedit = true
				            this.lastform.advise       = this.params[1].ynumPd.ysc_advise
							this.lastform.money        = this.params[1].ynumPd.audit_limit3
							this.lastform.score        = this.params[1].ynumPd.second_score
							this.lastform.remark       = this.params[1].concatPd.second_score_remark
		            	}else{
		            		this.isedit = false
		            	}
					}
				})
			}
		},
		methods:{
			saveAdvise(){
				let params = {
				    ynum_id:this.$route.params.ynum_id,
				    yt_advise :this.lastform.advise,
				    action:this.$route.params.action
				}
				this.$api.saveAdvise(params).then(res=>{},response=>{//请求数据
					if(response.data.resultCode=='0'){
						// this.$message.success('提交成功') 
				    }else{
				    	// this.$message.error('提交失败')
				    }
				}).catch(val=>{//捕获异常
                    
				}) 
			},
            finallyonSubmit(operatype,formName){
            	this.$refs[formName].validate((valid) => { 
					if (valid) {
		            	let params = {
		                    auditflag:operatype,
		                    ynum_id :this.$route.params.ynum_id,
		                    user_id :this.$route.params.user_id,
		                    audit_limit :this.lastform.money,
		                    score :this.lastform.score,
		                    score_remark :this.lastform.remark,
		                    yt_advise :this.lastform.advise
		            	}
		            	this.btnloading = true
		            	this.$api.savelastauth(params).then(res=>{},response=>{//请求数据
		            		this.btnloading = false
			            	if(response.data.resultCode=='0'){
			            		this.$message.success('操作成功')
			            		this.$store.dispatch('SHOWAUTH',false); //关闭审核列表=>审核建议弹框
			            		this.$router.push({ name: '终审'})//审核成功跳转至终审列表页
			                }else{
			                	this.$message.error('操作失败')
			                }
				        }).catch(val=>{//捕获异常
				        	this.btnloading = false
				        	this.$message.error('服务器异常')
				        })
				    }else{
                       return false
					}
			    }); 
            }
		}
	}	
</script>
<style lang="less" scoped>
	.examine{
		width: 100%;
		height: 100%;
		position:static;
		transform:translate(0,0);
		.examinepad{
			padding: 5%;
			font-size: 14px;
		}
		.titleinfo{
			margin: 0;
			padding: 0;
			margin-top:2%;
			margin-bottom: 2.5%;
			padding-bottom: 2.5%;
			padding-left: 10px;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px dotted #FBB388;
			span{
				text-align: left;
				font-size: 14px;
			}
			.fkmanger{
				margin:5px 15px;
			}
		}
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
				font-size: 14px;
				box-sizing: border-box;
				padding-left: 10px;
			}
		}
		.first,.seconed{
			border-bottom: 1px dotted #FBB388;
		}
		.seconed{
			margin-bottom: 5%;
		}
	}
</style>