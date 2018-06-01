<template>
	<div class="examine" v-if="params">
		<!--收起按钮-->
	    <!--<sliderright></sliderright>-->	
		    <div class="baseinfo" v-if="params[1]&&params[1].ynumPd&&params[1].ynumPd.classification">
			  	<div>
			  		<span>用户分类</span> :
			  		<span v-if="params[1].ynumPd.classification==0">未知</span>
			  		<span v-if="params[1].ynumPd.classification==1">学生</span>
			  		<span v-if="params[1].ynumPd.classification==2">上班族</span>
			  		<span v-if="params[1].ynumPd.classification==3">公务员</span>
			  		<span v-if="params[1].ynumPd.classification==4">芝麻信用</span>
			  	</div>
			  	<div>
			  		<span>完善资料时间</span> :<span v-text="params[1].ynumPd.perfect_time"></span>
			  	</div>
		    </div>
			<el-form label-position="left"  v-if="params[0]&&params[0].certifyList" :model="params[0]" ref="forminfo" >
			<el-form-item  v-for="(item,index) in params[0].certifyList" :label="(++index)+'、'+ textname(item.au_ynumauth_type)" :key="index" >
					<br/>
					<ul class="tags-top" v-if="item.au_ynumauth_type==16&&item.p"> <!-- 运营商 -->
			            <li v-if="item.p.identity_agreement"> 
			        		<span v-if="item.p.identity_agreement==0" class="authed" >已实名认证</span>
			        		<span v-if="item.p.identity_agreement==1" >未实名认证</span>
			            </li>
			        	<li> <span>等级:</span>
				        	<span>
				        		<el-rate v-model="value5" disabled prop="" text-color="#ff9900" score-template="{value}"> </el-rate>
				        	</span> 
			            </li>
			        	<li> <span>网龄:</span><span v-text="item.p.in_net_long"></span> </li>
			        	<!-- <li> <span>积分:</span><span></span> </li> -->
			        </ul>
			        <ul class="tags-top" v-if="item.au_ynumauth_type==1&&item.p"> <!-- 淘宝 -->
			            <li> 
	      		            <span v-if="item.p.identity_agreement==0" class="authed" >已实名认证</span>
			        		<span v-if="item.p.identity_agreement==1" >未实名认证</span>
			            </li>
			        	<!-- <li> <span>会员等级:</span><span></span> </li> -->
			        	<li> <span>花呗额度:</span><span v-text="item.p.ant_check_later_total"></span> </li>
			        	<li> <span>花呗余额:</span><span v-text="item.p.ant_check_later_balance"></span> </li>
			        	<li> <span>收货地址:</span><span v-text="item.p.delivery_addres"></span> </li>
			        </ul>
			        <ul class="tags-top" v-if="item.au_ynumauth_type==2&&item.p"> <!-- 京东 -->
			            <li>
			      		    <span v-if="item.p.identity_agreement==0" class="authed" >已实名认证</span>
			        		<span v-if="item.p.identity_agreement==1" >未实名认证</span>
			            </li>
			        	<!-- <li> <span>会员等级:</span><span></span> </li> -->
			        	<li> <span>京东白条额度:</span><span v-text="item.p.ious_total"></span> </li>
			        	<!-- <li> <span>收货地址:</span><span></span> </li> -->
			        </ul>
			        <ul class="tags-top" v-if="item.au_ynumauth_type==5&&item.p">
			            <li> 
			        		<span>学历</span> : <span v-text="item.p.education"></span>
			            </li>
			        </ul>
			        <ul class="tags-top" v-if="item.au_ynumauth_type==15&&item.p">
			            <li> 
			        		<span>公积金状态</span> : &nbsp; <span v-text="item.p.education"></span>
			        	</li>
			        	<li>
			        		<span>缴费基数</span> : &nbsp; <span v-text="item.p.turn_over_base"></span>
			        	</li>
			        	<li>
			        		<span>缴纳年数</span> : &nbsp; <span v-text="item.p.payment_year"></span>
			        	</li>
			        	<li>
			        		<span>贷款金额</span> :&nbsp; <span v-text="item.p.loan_money"></span>
			        	</li>
			        	<li>
			        		<span>当前余额</span> : &nbsp; <span v-text="item.p.surplus_money"></span>
			            </li>
			        </ul>
					<div class="yatagout" v-if="item&&item.sysmarks">
						<yptag key="tag.id" v-for="tag in item.sysmarks" :editable=ypedit :value="tag" v-on:editend="editend(tag)" v-on:tochoosed="tochoosed"></yptag>
						<el-input class="input-new-tag" v-if="item.isselected" v-model="item.inputValue"  :ref="item.au_id" size="small" @keyup.enter.native="handleInputConfirm(item,item.au_ynumauth_type)"  @blur="handleInputcancel(item)">
						</el-input>
						<el-button v-if="!item.isselected" class="button-new-tag" size="small" @click="showInput(item)">+ 添加标签</el-button>
					</div>
					<textarea class="form2textarea supplement" v-model="item.input" @blur="saveExplain()" type="textarea" placeholder="补充说明"  auto-complete="off"></textarea>
				</el-form-item>
                <el-form-item   label="初审建议" prop="inputcontent">
				    <textarea class="form2textarea" v-model="params[1].ynumPd.yf_advise" @blur="saveAdvise" value="params[1].ynumPd.yf_advise" type="textarea" :rows='row' placeholder="初审建议"  auto-complete="off"></textarea>
			    </el-form-item>
			    <el-form-item  label="初审额度:" :rules="rules2" prop="audit_limit">
					<el-input v-model.number="params[0].audit_limit" type="params[0].audit_limit" class="audit_limit"   placeholder="初审额度"  auto-complete="off"></el-input>
                </el-form-item>
               <!--  <el-form-item  label="初审人:" >
					<el-input  type="text" class="audit_limit"   placeholder="初审人"  auto-complete="off"></el-input>
                </el-form-item> -->
				<el-button type="primary" size="medium" :loading="btnloading" @click="onSubmit('forminfo')" class="onSubmit">提交</el-button>
			</el-form>

	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Message } from 'element-ui'
	import  yptag from '@/components/yptag'
	import  sliderright from '@/components/sliderleft'
	export default{
		name:"toexample",
		components:{
			yptag,sliderright
		},
		computed:{
			...mapGetters(['params','tagtext','chooosedtaglist'])
		},
		watch:{
            chooosedtaglist(){
            	this.chooosedlist = this.chooosedtaglist
            }
		},
		data(){
			var checkadvise = (rule, value, callback) => {
				console.log(value)
		        if (!value) {
		          return callback(new Error('初审建议不能为空'));
		        }else{
		           callback();
		        }
		    };
			var checkmoney = (rule, value, callback) => {
		        if (!value&&value!==0) {
		          return callback(new Error('初审额度不能为空'));
		        }
		        setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		            callback();
		          }
		        }, 500);
		    };
			return {
				rules1:[
                    { validator: checkadvise}
				],
				rules2:[
		            { validator: checkmoney }
		        ],
				tagtxts:[  //全部认证项
                  { ordernum:9,  label:'身份证',    key:'cheat'}, //***
                  { ordernum:12, label:'通讯录'  ,  key:'maillist'},
                  { ordernum:16, label:'运营商'  ,  key:'operator'},
                  { ordernum:3,  label:'运营商'  ,  key:'operator'},
                  { ordernum:16, label:'全息报告',  key:'holographic'},
                  { ordernum:6,  label:'央行认证',  key:'credit'},
                  { ordernum:14, label:'银行卡流水',  key:'bankflow'}, 
                  { ordernum:17, label:'信用卡账单'    ,  key:'mailbox'},
                  { ordernum:15, label:'公积金'  ,  key:'accumulationfund'},
                  { ordernum:4,  label:'公积金'  ,  key:'accumulationfund'},
                  { ordernum:7,  label:'社保'    ,  key:'social'},
                  { ordernum:1,  label:'淘宝'    ,  key:'taobao'},
                  { ordernum:2,  label:'京东'    ,  key:'jd'},
                  { ordernum:18, label:'安装应用',key:'installed'},
                  { ordernum:5,  label:'学信网'  ,  key:'academic'},
                  { ordernum:8,  label:'车辆',  key:'vehicle'},
                  { ordernum:11, label:'用户稳定性',key:'userstability'}
				],
				chooosedlist:[],
				dialogTableVisible: true,
				row:5,//textarea 行数
				value4:null,  
				value5:3.7,
				ypedit:true, //是否可编辑
				yf_report:"",//初审报告
				btnloading:false
			}
		},
		methods:{
			textname(val){
				let output = ''
            	this.tagtxts.forEach((elem)=>{
            		if(elem.ordernum == val){
            			output = elem.label
            		}
            	    if(val==16){
            	    	output ='运营商'
            	    }
            	})
            	return output
			},
			showInput(item) {
				item.isselected = true;
			},
			handleInputcancel(item){//取消编辑
                item.isselected   = false
			},
			handleInputConfirm(item,type) { //添加标签
				let inputValue = item.inputValue;
				if (inputValue) {
                    const result = item.sysmarks.some(elem=>{
                       return 	elem.text==inputValue
                    })
                    if(!result){
                        item.sysmarks.push({text:inputValue,type:type.toString()});
		                this.$api.addtag({text:inputValue,type:type}).then(res=>{},response=>{//请求数据
			            	if(response.data.resultCode=='0'){
			            	  
			                }
				        }).catch(val=>{//捕获异常

				        }) 
				        item.isselected   = false
						item.inputValue   = '';
                    }else{
                    	Message.error('请输入此项内不存在的标签内容')
                    	return
                    }
				}else{
					Message.error('请输入内容')
					return
				}
			},
			getname(id){//根据键值获取文本
                const txt = this.tagtxts.filter(elem=>{
                	if(elem.ordernum ==id){
                		if(id=='16'){
                           return '运营商'
                		}else{
                            return elem.label
                		}
                	}
                })
                if(txt[0]&&txt[0].label){
                  return txt[0].label 
                }else{
                	return ''
                }
                
			},
			getsysmarks(id){//获取正确的标签数组
				let sysmarks = ''
				this.chooosedlist.forEach(elem=>{
					if(elem.type==id){
						sysmarks +=elem.text+','
					}
				})
				sysmarks = sysmarks.substring(0, sysmarks.length - 1)
				return sysmarks
			},
			//提交补充说明
			saveExplain(formName){
				this.yf_report="";
				this.params[0].certifyList.forEach((elem,index)=>{
				    if(elem.input==""){
				    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)
				    }else{
				    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)+","+elem.input
				    }
				    this.yf_report += '\r\n';
				})
				let params = {
				    auditflag:'2',
				    ynum_id:this.$route.params.ynum_id,
				    audit_limit:this.params[0].audit_limit || '0',
				    yf_report:this.yf_report,
				    //yf_advise :this.params[0].inputcontent,
				    user_id:this.$route.params.user_id
				}
//				this.btnloading = true
				this.$api.saveAdvise(params).then(res=>{},response=>{//请求数据
//					this.btnloading = true
					if(response.data.resultCode=='0'){
//								this.$message.success('提交成功')
//								this.$store.dispatch('CLEATTAGLIST')
//								this.$router.push({ name: '初审'})//审核成功跳转至初审列表页
				    }else{
//						    	this.$message.error('提交失败')
				    }
				}).catch(val=>{//捕获异常
//                  this.btnloading = true
				}) 
			},
			//提交初审建议
			saveAdvise(){
				this.yf_report = "";
				this.params[0].certifyList.forEach((elem,index)=>{
				    if(elem.input==""){
				    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)
				    }else{
				    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)+","+elem.input
				    }
				    this.yf_report += '\r\n';
				})
				let params = {
				    ynum_id:this.$route.params.ynum_id,
				    yf_report:this.yf_report,
				    yf_advise:this.params[1].ynumPd.yf_advise,
				    action:this.$route.params.action
				}
				if(!params.yf_advise){
                    return
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
			onSubmit(formName){//保存初审报告 初审建议 提交初审额度 
		        this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	if(!this.params[1].ynumPd.yf_advise){
                           this.$message.error('初审建议不能为空')
                           return
		            	}
		            	this.yf_report = '';
				        this.params[0].certifyList.forEach((elem,index)=>{
						    if(elem.input==""){
						    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)
						    }else{
						    	this.yf_report +=(++index) +'、'+ this.getname(elem.au_ynumauth_type)+":"+this.getsysmarks(elem.au_ynumauth_type)+","+elem.input
						    }
						    this.yf_report += '\r\n';
						})
						let params = {
						    auditflag:'2',
						    ynum_id:this.$route.params.ynum_id,
						    audit_limit:this.params[0].audit_limit || '0',
						    yf_report:this.yf_report,
						    yf_advise :this.params[1].ynumPd.yf_advise,
						    user_id:this.$route.params.user_id
						}
						this.btnloading = true
						this.$api.savefirstauth(params).then(res=>{},response=>{//请求数据
							this.btnloading = true
							if(response.data.resultCode=='0'){
								this.$message.success('提交成功')
								this.$store.dispatch('CLEATTAGLIST') //置空标签数组
                                this.$store.dispatch('SHOWAUTH',false); //关闭审核列表=>审核建议弹框
								this.$router.push({ name: '初审'})//审核成功跳转至初审列表页
						    }else{
						    	this.$message.error('提交失败')
						    }
						}).catch(val=>{//捕获异常
                            this.btnloading = true
						}) 
		            } else {
		            	return false;
		            }
		        });   
			},
			tochoosed(tag){//获取当前选中项并进行存储
                this.$store.dispatch('SAVETAG',tag)
			},		
			editend(tag){//完成编辑
				if(this.tagtext){
					this.$api.edittag({text:this.tagtext,id:tag.id}).then(res=>{},response=>{//请求数据
		            	if(response.data.resultCode=='0'){
		            	   tag.text = this.tagtext
		                }
			        }).catch(val=>{//捕获异常

			        }) 
				}

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
		justify-content: space-around;
		align-items: center;
		font-size: 14px;
	}

	.el-tag + .el-tag {
		margin-left: 10px;
	}
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}



    form{
      padding: 5%;
    }
	.firstauth{
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		margin-top: 2%;
		margin-bottom: 2%;
		span{
			display: inline-block;
			flex-grow:1;
			text-align: left;
			line-height: 20px;
			span:first-child{
                line-height: 15px;
			}
			input{
			   line-height: 15px;
			   border-radius:10px;
			   outline: none; 
			   border: 1px solid #ddd;
			   padding: 5px 4px;
			   background-color:#FFF7F4 ;
		    }
		}

	}
	.tags-top{
		list-style:none;
		display: inline-block;
		flex-grow:2;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: felx-start;
		align-items: center;
		margin: 0;
		padding: 0;
		width: 100%;
		li{
			flex-grow:2;
			text-align: left;
			display: flex;
			display: -webkit-flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: felx-start;
			align-items: center;
		}
	}
	.mineinput{
		min-width: 50px;
		width: 50px;
		max-width: 180px;
		border: 2px solid #F37930;
		border-radius:13px;
		padding: 5px 10px;
		margin: 0 5px;
		outline: none;
		outline-color:#F37930 ;
		text-align: center;
	}
	.authed{
		color:#7FDBF7;
	}
	.yatagout{
		width: 100%;
		text-align: left;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: felx-start;
		align-items: felx-start;
		margin-bottom: 10px;
	}
	textarea{
		background-color:#FFF7F4 ;
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
	
	.supplement{
		height: 100px;
	}
</style>









