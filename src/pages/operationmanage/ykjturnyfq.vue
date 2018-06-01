<template>
	<div class="ykjturnyfq">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-button type="primary" size="medium" @click="msgpush">消息推送</el-button>
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keyWords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="collectionParams.pushType" placeholder="请选择借款类型" clearable>
					<el-option label="借款成功" value="15"></el-option>
					<el-option label="还款成功" value="1"></el-option>
					<el-option label="自动扣款结果" value="2"></el-option>
					<el-option label="余额提现" value="3"></el-option>
					<el-option label="红包到账" value="4"></el-option>
					<el-option label="推广权限" value="5"></el-option>
					<el-option label="被推广人审批" value="6"></el-option>
					<el-option label="即将到期-定时" value="7"></el-option>
					<el-option label="已经逾期-定时" value="8"></el-option>
					<el-option label="自动扣款提醒-定时" value="9"></el-option>
					<el-option label="领红包提醒-定时" value="10"></el-option>
					<el-option label="银行卡维护" value="11"></el-option>
					<el-option label="新活动通知" value="12"></el-option>
					<el-option label="推广结果统计-定时" value="13"></el-option>
					<el-option label="发放优惠券" value="14"></el-option>
				</el-select>
			</el-form-item>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-button type="primary" size="medium" @click="collection">查询</el-button>
		</el-form>
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo'  :loading="loading" :showopera="true">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="复用" placement="top">
					<el-button type="text" icon='iconfont icon-fenxiang2' v-on:click="complex(scope.scope.row)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<basepage :sunmary='pagesize' v-on:topage="topage"></basepage>
		<el-dialog title="消息推送" :visible.sync="dialogTableVisible" align="center" width="34%">
	        <el-form :inline="true"  label-width="80px" :model="formInline" class="demo-form-inline" ref="formInline">
				<el-form-item  label="消息类型" prop="msgtype" align="left" >
				  <el-select v-model="formInline.msgtype" placeholder="消息类型" style="width:202px">
				    <el-option  v-for="item in msgtypelist" :key="item.value" :label="item.label"  :value="item.value"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="消息描述" prop="msgdes">
					<el-input v-model="formInline.msgdes" placeholder="消息描述"></el-input>
				</el-form-item>
				<el-form-item label="标题" prop="msgtitle">
					<el-input v-model="formInline.msgtitle" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="msgcontext">
					<el-input v-model="formInline.msgcontext" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item  prop="msgcontext"  label="目标用户"  style="width:100%;text-align:left;">
					 <el-radio-group v-model="formInline.isall" >
					    <el-radio :label="0">全部人</el-radio>
					    <el-radio :label="1">部分人</el-radio>
					  </el-radio-group>
					<el-transfer v-show="formInline.isall==1" filterable  :titles="['选择人员', '推送人员']"  filter-placeholder="请输入关键字" v-model="pushed" :data="alllist" @change="getpushuserlist"></el-transfer>
				</el-form-item>
				<el-form-item  prop="msgcontext"    style="width:100%;text-align:center;">
					<el-button size="medium" type="primary" @click="onSubmit('formInline')">保存并推送</el-button>
			        <el-button size="medium" @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default{
		name:'ykjturnyfq',
		components:{basetable,basepage},
		data(){
			return{
				changeTime:[],
				loading:true,
				pagesize:0,
				collectionParams:{},//请求参数
				basetableinfo:[],//table值
				basetabletitle:[
				 {
	             	label:'消息标题',
	             	prop:'title'
	             },
	             {
	             	label:'消息内容',
	             	prop:'content'
	             }, 
	             {
	             	label:'消息类型',
	             	prop:'pushType'
	             },
	             {
	             	label:'消息描述',
	             	prop:'messageDesc'
	             }, 
	             {
	             	label:'推送成功数',
	             	prop:'pushsuccess'
	             }, 
	             {
	             	label:'推送失败数',
	             	prop:'pushfailure'
	             }, 
	             {
	             	label:'已阅数',
	             	prop:'alreadyread'
	             }, 
	             {
	             	label:'未阅数',
	             	prop:'notread'
	             },
	             {
	             	label:'人群',
	             	prop:'crowd'
	             },
	             {
	             	label:'发送时间',
	             	prop:'pushDate',
	             	width:160
	             },
				],
				dialogTableVisible:false,
				formInline:{
                   msgtype:'',//消息类型
                   msgdes:'',//消息描述
                   msgtitle:'',//标题
                   msgcontext:'',//内容
                   isall:1,//是否是全部人
				},
				msgtypelist:[
                   { value:0,label:'银行卡维护'},
                   { value:1,label:'新活动通知'},
                   { value:2,label:'发放优惠券'}
				],
				alllist: [],
		        pushed: [],
		        pushusers:'',
		        push_id:'',//当前复用推送id
			}
		},
		mounted(){
			this.collection();
		},
		methods:{
			collection(){
				this.$api.ykjturnyfq(this.collectionParams).then(res => {}, response => {
					this.loading = false;
					if(response.data.resultCode == 0 ){
					    this.basetableinfo = response.data.returnObj.varList;
						this.pagesize = response.data.returnObj.totalCount;
						for(let i = 0;i<this.basetableinfo.length;i++){
							switch(this.basetableinfo[i].push_type){
								case 1:
									this.basetableinfo[i].pushType = '还款成功';
									break;
								case 2:
									this.basetableinfo[i].pushType = '自动扣款结果';
									break;
								case 3:
									this.basetableinfo[i].pushType = '余额提现';
									break;
								case 4:
									this.basetableinfo[i].pushType = '红包到账';
									break;
								case 5:
									this.basetableinfo[i].pushType = '推广权限';
									break;
								case 6:
									this.basetableinfo[i].pushType = '被推广人审批';
									break;
								case 7:
									this.basetableinfo[i].pushType = '即将到期-定时';
									break;
								case 8:
									this.basetableinfo[i].pushType = '已经逾期-定时';
									break;
								case 9:
									this.basetableinfo[i].pushType = '自动扣款提醒-定时';
									break;
								case 10:
									this.basetableinfo[i].pushType = '领红包提醒-定时';
									break;
								case 11:
									this.basetableinfo[i].pushType = '银行卡维护';
									break;
								case 12:
									this.basetableinfo[i].pushType = '新活动通知';
									break;
								case 13:
									this.basetableinfo[i].pushType = '推广结果统计-定时';
									break;
								case 14:
									this.basetableinfo[i].pushType = '发放优惠券';
									break;
								case 15:
									this.basetableinfo[i].pushType = '借款成功';
									break;
							}
					    }
					}else{
						this.$message({message:response.data.resultMsg,type: 'error'});
					}
				}).catch(val => {
					this.$message({message:'服务器异常',type: 'error'});
				})
			},
			msgpush(){//消息推送
				this.push_id              = '';
			    this.formInline.msgtype   = '';
                this.formInline.msgdes    = '';
                this.formInline.msgtitle  = '';
                this.formInline.msgcontext= '';
                this.formInline.isall     = 0  //是否是全部人  默认是
                this.pushusers            = ''
                this.dialogTableVisible   = true
                this.getalllist()
			},
			complex(row){//复用
				console.log(row)
				this.push_id              = row.push_id
			    this.formInline.msgtype   = row.push_type 
                this.formInline.msgdes    = row.messageDesc
                this.formInline.msgtitle  = row.title
                this.formInline.msgcontext= row.content
                this.formInline.isall     = row.crowd  //是否是全部人
                this.pushusers            = ''
				this.dialogTableVisible   = true
				this.getalllist()
			},
			getalllist(){//消息推送的待选择人员信息
                this.$api.pushuserlist({push_id:this.push_id}).then(res => {}, response => {
					if(response.data.resultCode == 0 ){	
						//待选择列表
					    response.data.returnObj.users.myArrayList.forEach((elem,index)=>{
					    	let mid       = {} 
					    	mid.label     = elem.map.userName + '-' +  elem.map.userPhone
					    	mid.usertoken = elem.map.usertoken
					    	mid.key       = index
					    	this.alllist.push(mid)
					    })	
                        // 推送人员列表
					}else{
						this.$message({message:response.data.resultMsg,type: 'error'});
					}
				}).catch(val => {
					this.$message({message:'服务器异常',type: 'error'});
				})
			},
	    	changetime(value){//选择日期
	    		if(value&&value[0]&&value[1]){
	    			this.collectionParams.lastStart = dateformat(value[0],'yyyy-MM-dd');
	    			this.collectionParams.lastEnd   = dateformat(value[1],'yyyy-MM-dd');
	    		}else{
	    			this.collectionParams.lastStart = "";
	    			this.collectionParams.lastEnd   = "";
	    		}
	    	},
	    	topage(topage){//点击页码返回参数
	    		this.collectionParams = Object.assign(this.collectionParams,topage);
	    		this.collection();
	    	},
	    	getpushuserlist(current,direction,movedata){
				let mid = []
				this.alllist.forEach((elem,index,arr)=>{
					if(current.length>index){
						console.log(arr[current[index]],558)
						if(arr[current[index]]){
							let linshi = ''
                            if(arr[current[index]].usertoken){
                            	linshi += arr[current[index]].usertoken+'-'
                            }else{
                            	linshi +=''+'-'
                            }
                            if(arr[current[index]].label){
                            	linshi += arr[current[index]].label
                            }else{
                            	linshi +=''
                            }
                            mid.push(linshi)
						}
					}
				})
				this.pushusers = mid.join(',')
	    	},
	    	cancel(){
                this.dialogTableVisible = false
	    	},
	    	onSubmit(formName){ //保存并推送
                let params = {
                    push_id:this.push_id, //推送id
                    msgtype:this.formInline.msgtype,//消息类型
                    msgdes:this.formInline.msgdes,//消息描述
                    msgtitle:this.formInline.msgtitle,//标题
                    msgcontext:this.formInline.msgcontext,//内容
                    isall:this.formInline.isall,//是否是全部人
                    pushusers:this.pushusers //推送用户群体
                }
                this.$api.savepushmsg(params).then(res => {}, response => {
					if(response.data.resultCode == 0 ){
					    this.$message({message:response.data.resultMsg,type: 'success'});
					    this.dialogTableVisible = false		
					    this.collection()			
					}else{
						this.$message({message:response.data.resultMsg,type: 'error'});
					}
				}).catch(val => {
					this.$message({message:'服务器异常',type: 'error'});
				})
	    	}
		}
	}
</script>