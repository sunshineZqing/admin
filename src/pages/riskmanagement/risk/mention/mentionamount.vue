<template>
	<div class="">
		<el-dialog title="提额意见" :visible.sync="dialogTableVisible" :before-close="handleclose">
			<el-form :model="params" status-icon :rules="rules" ref="params" label-width="140px" class="demo-ruleForm" label-position="left">
			  <el-form-item label="提额额度" prop="mentionmoney" >
			    <el-input type="text" v-model="params.amount" auto-complete="off" class="mentionMoney"></el-input>
			  </el-form-item>
			  
			  <div class="maillist">
			  	  <el-form-item label="备用联系人" prop="seconenopinion"  >
				    <el-input type="text" v-model="params.spareContactsName" auto-complete="off" :disabled="params.action==3" clearable placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="seconenopinion"  label-width="40px">
				    <el-input type="text" v-model="params.spareContactsPhone" auto-complete="off" :disabled="params.action==3" clearable placeholder="手机号"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="seconenopinion"  label-width="40px">
				    <el-select v-model="params.spareContactsRela" placeholder="请选择关系">
					    <el-option v-for="item in mailistrela" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
					</el-select>
				  </el-form-item>
			  </div>
			  <div class="maillist">
			  	  <el-form-item label="紧急联系人" prop="seconenopinion"  >
				    <el-input type="text" v-model="params.urgentContactsName" auto-complete="off" :disabled="params.action==3" clearable placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="seconenopinion"  label-width="40px">
				    <el-input type="text" v-model="params.urgentContactsPhone" auto-complete="off" :disabled="params.action==3" clearable placeholder="手机号"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="seconenopinion"  label-width="40px">
				    <el-select v-model="params.urgentContactsRela" placeholder="请选择关系">
					    <el-option v-for="item in mailistrela" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
					</el-select>
				  </el-form-item>
			  </div>
			  
			 
			  
			  <!--<el-form-item label="终审提额意见" prop="third_advise" v-if="params.action==3">
			    <el-input v-model="params.third_advise" type="textarea" clearable></el-input>
			  </el-form-item>-->
			  <el-form-item label="复审提额意见" prop="seconenopinion" >
			    <el-input type="textarea" v-model="params.second_advise" auto-complete="off" :disabled="params.action==3" clearable></el-input>
			  </el-form-item>
			  
			  <el-form-item>
			    <el-button class="submitbutton"  size="medium" type="primary" @click="submitForm('params',1)">提交</el-button>
			    <el-button class="submitbutton"  size="medium" type="danger"  @click="submitForm('params',0)">驳回</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  export default {
  	name:'mentionamount',
	computed:{
		...mapGetters(['params'])
	},
    data() {
		var validateseconenopinion = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入复审意见'));
			} else {
				callback();
			}
		};
		var validatelastopinion = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入复审意见'));
			} else {
				callback();
			}
		};
		return {
			dialogTableVisible: true,
			rules: {
				seconenopinion: [
						{ validator: validateseconenopinion, trigger: 'blur' }
					],
					lastopinion: [
						{ validator: validatelastopinion, trigger: 'blur' }
				    ]
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
		};
		
    },
    mounted(){
    	console.log(this.mentionmoney);
    	
    },
    methods: {
      handleclose(){
          this.$store.dispatch('SHOWSUGGEST',false) //关闭建议弹框
      },
      submitForm(formName,operatype) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//通过验证
          	if(operatype==1){ //提交
          		let  params = {
          			user_id:this.params.user_id,
          			amount:this.mentionmoney,
          			single_mention_quota:this.params.single_mention_quota,
          			third_advise:this.params.third_advise || '',
          			second_advise:this.params.second_advise,
          			action:this.params.action,
          			ma_id:this.params.ma_id,
          			ma_status:this.params.ma_status = this.params.action=='2'? '4' : '6',
          		}
          		console.log(params);
//	            this.$api.submitsuggestions(params).then(res=>{},response=>{
//	            	if(response.data.resultCode=='0'){
//	                    Message.success('提交成功')
//	            	}else{
//	            		Message.error('提交失败')
//	            	}                                
//		        }).catch(val=>{//捕获异常
//
//		        })
          	}else if(operatype==0){  //驳回
          		let  params = {
          			user_id:this.params.user_id,
          			amount:this.mentionmoney,
          			single_mention_quota:this.params.single_mention_quota,
          			third_advise:this.params.third_advise || '',
          			second_advise:this.params.second_advise,
          			action:this.params.action,
          			ma_id:this.params.ma_id,
          			ma_status:this.params.ma_status = this.params.action=='2'? '3' : '5',
          		}
	            this.$api.submitsuggestions(params).then(res=>{},response=>{
	            	if(response.data.resultCode=='0'){
	                    Message.success('驳回成功')
	            	}else{
	            		Message.error('驳回失败')
	            	}                                
		        }).catch(val=>{//捕获异常

		        })
          	}
          } else { //未通过
          	Message.error('提交了格式不正确的数据')
            return false;
          }
        })
      }
    }
  }
</script>
<style type="text/css" scoped="scoped">
	.maillist{
		text-align: left;
	}
	.maillist .el-input{
		width: 100%;
	}
	.el-form-item{
		text-align: left;
	}
	.maillist .el-form-item{
		display: inline-block;
	}
	.mentionMoney {
		width: 30% !important;
	}
</style>



