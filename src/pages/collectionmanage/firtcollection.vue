<template>
	<div class="firtcollection">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left" >
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keywords" placeholder="关键字" clearable :key='pagename'></el-input>
			</el-form-item>
			<el-form-item label="催收人">
				<el-input v-model="collectionParams.name" placeholder="催收人" clearable :key='pagename'></el-input>
			</el-form-item>
			<el-select style='width: 150px;border-radius: none;margin-right:10px;' v-model="collectionParams.type" placeholder="时间" clearable>
				<el-option v-for="item in changeTimeType" :key="item.value" :label="item.text" :value="item.value">
				</el-option>
			</el-select>
			<el-date-picker v-model="changeTime"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
			</el-date-picker>
			<el-button type="primary" size="medium" @click="collection">查询</el-button>
		</el-form>
		<!--class="addtions"-->
		<div class="firtcollectionTable">
			<el-table v-loading="loading" ref="multipleTable" :data="basetableinfo" tooltip-effect="dark" border style="width: 100%">
				<el-table-column type="index" width="955" header-align="center" label="基本信息" fixed="left">
					<el-table-column type="index" prop="" label="序号" header-align="center" width="60"></el-table-column>
					<el-table-column prop="name" label="姓名" header-align="center"></el-table-column>
					<el-table-column prop="gender" label="性别" header-align="center" width="60"></el-table-column>
					<el-table-column prop="phone" label="手机号" header-align="center" width="130"></el-table-column>
					<el-table-column prop="cert_card" label="身份证号" header-align="center" width="185"></el-table-column>
					<el-table-column prop="c_createtime" label="首次转交时间" header-align="center" width="180"></el-table-column>
					<el-table-column prop="ccs_updatetime" label="最近转交时间" header-align="center" width="180"></el-table-column>
					<el-table-column prop="csname" label="催收人" header-align="center"></el-table-column>
				</el-table-column>
				<el-table-column type="index" header-align="center" label="易快借">
					<el-table-column prop="borrow_amount_stay_pays" label="待还总金额" header-align="center"></el-table-column>
					<el-table-column prop="overnum" label="逾期总次数" header-align="center"></el-table-column>
					<el-table-column prop="payment_times" label="待还总次数" header-align="center"></el-table-column>
				</el-table-column>
				<el-table-column type="index" header-align="center" label="易分期">
					<el-table-column prop="yue_gong_amount_stay_pay" label="待还总金额" header-align="center"></el-table-column>
					<el-table-column prop="sdovernum" label="逾期总次数" header-align="center"></el-table-column>
					<el-table-column prop="spayment_times" label="待还总次数" header-align="center"></el-table-column>
				</el-table-column>
				<el-table-column type="index" header-align="center" label="其他信息">
					<el-table-column prop="fname" label="初审人" header-align="center"></el-table-column>
					<el-table-column prop="sname" label="复审人" header-align="center"></el-table-column>
					<el-table-column prop="thname" label="终审人" header-align="center"></el-table-column>
					<el-table-column prop="scname" label="推广员" header-align="center"></el-table-column>
					<el-table-column prop="c_remark" width="500" label="转交原因" header-align="center"></el-table-column>
					<el-table-column v-if="collectionParams.action == '5'" prop="ti" width="200" label="借款未还最长逾期时间" header-align="center"></el-table-column>
				</el-table-column>
				<el-table-column  style="margin:0" prop="phone" width="130" label="" header-align="center" fixed="right" class="collection">
					<el-table-column v-if="collectionParams.action != '5'" width="129" label="操作" header-align="center" >
						<template slot-scope="scope">
							<el-tooltip class="collectionIcon item" effect="dark" content="即将逾期客服电话" >
								<el-button type="text" icon='iconfont icon-cuicushouhuotixing' v-on:click="soonOverdue(scope.row)"></el-button>
							</el-tooltip>
							<el-tooltip class="collectionIcon item" effect="dark" content="逾期后客服电话" placement="top">
								<el-button type="text" icon='iconfont icon-kefu' v-on:click="overdueAfter(scope.row)"></el-button>
							</el-tooltip>
							<el-tooltip class="collectionIcon item" effect="dark" content="逾期待还" placement="top">
								<el-button type="text" icon='iconfont icon-bianji' v-on:click="overdue(scope.$index, scope.row)"></el-button>
							</el-tooltip>
							
							<el-tooltip class="collectionIcon item" effect="dark" content="电话催收" placement="top">
								<el-button style="" type="text" icon='iconfont icon-09dianhua' v-on:click="callCollection(scope.$index, scope.row)"></el-button>
							</el-tooltip>
							<br/>
							<el-tooltip class="collectionIcon item" effect="dark" content="短信" placement="top">
								<el-button type="text" class='iconfont icon-duanxinfasong' v-on:click="msgShowBox(scope.$index, scope.row)"></el-button>
							</el-tooltip>
							<el-tooltip class="collectionIcon item" effect="dark" content="转交" placement="top">
								<el-button type="text" icon= 'iconfont icon-fenxiang2' v-on:click="transfer(scope.row)"></el-button>
							</el-tooltip>
							<el-tooltip v-if = "scope.row.bl_status != 0" class="collectionIcon item" effect="dark" content="加入黑名单" placement="top">
								<el-button type="text" icon='iconfont icon-guanbiad' v-on:click="addBack(scope.row)"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
			<basepage :sunmary='pagesize' v-on:topage="topage" :currentp='currentp' :key='pagename'></basepage>
		</div>
		<!--短信弹框-->
		<el-dialog title="发送短信：" :visible.sync="msgShow" width="30%" align="left">
			<span>{{msgShowtext}}</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="msgShow = false" size="medium">取消</el-button>
			    <el-button type="primary" @click="hairMsg" size="medium" :loading = msgLoading>发送</el-button>
			</span>
		</el-dialog>
		<!--转交弹框-->
		<el-dialog title="转交：" :visible.sync="transferBox" width="30%" align="left">
			<el-form ref="transferForm" :model="transferForm" label-width="100px" align="left" width="500px">
				<el-form-item label="转交到：">
					<el-select v-model="transferForm.ctr_collection_type" placeholder="请选择活动区域">
						<el-option label="一级催收" value="1"></el-option>
						<el-option label="二级催收" value="2"></el-option>
						<el-option label="三级催收" value="3"></el-option>
						<el-option label="呆账管理" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="转交原因：" >
					<el-input type="textarea" v-model="transferForm.ctr_transfer_reason" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="transferSubmit()"  size="medium"  :loading = transferLoading>立即创建</el-button>
					<el-button @click="transferBox = false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!--黑名单弹框-->
		<el-dialog title="黑名单操作" :visible.sync="backListBox" width="30%" align="left">
			<el-form ref="backListParams" :model="backListParams" label-width="150px" align="left" width="500px">
				<el-form-item label="用户姓名：" >
					<el-input type="input" v-model="backListParams.name" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户电话：" >
					<el-input type="input" v-model="backListParams.phone" style=" width：500px" disabled></el-input>
				</el-form-item>
				<el-form-item label="加入黑名单原因：" >
					<el-input type="textarea" v-model="backListParams.reason" style=" width：500px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="backSubmit()"  size="medium" :loading = backLoading>提交</el-button>
					<el-button @click = "backListBox = false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import basepage from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default {
		name: 'firtcollection',
		components: {
			basepage
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.pagename = to.name
				switch(to.name) {
					case '一级催收':
						vm.collectionParams.action = '1';
						break;
					case '二级催收':
						vm.collectionParams.action = '2';
						break;
					case '三级催收':
						vm.collectionParams.action = '3';
						break;
					case '呆账管理':
						vm.collectionParams.action = '5';
						break;
				}
				vm.collection();
			})
		},
		data() {
			return {
				pagename:'', //页面标识
				//请求列表参数
				collectionParams: {
					keywords: '',
					action: '1',
				},
				currentp:1,//默认当前页
				//列表信息
				basetableinfo: [],
				changeTime:'',
				changeTimeType:[
					{
						text:'首次转交时间',
						value:'1'
					},
					{
						text:'最近转交时间',
						value:'2'
					},
				],
				changeTime2:'',
				loading: true,
				msgShow: false, //短信弹框
				msgShowtext:'',//短信内容
				msgShowParams:'',//发送短信参数
				pagesize:1,//总条数
				transferBox:false,//转交框
				transferForm:{},//提交转交参数
				backListBox:false,//黑名单框
				backListParams:{
					reason:'',
				},//黑名单请求参数
				msgLoading:false,//发送短信按钮
				transferLoading:false,//转交按钮
				backLoading:false,//加入黑名单按钮
			}
		},
		computed:{
            ...mapGetters(['searchlist'])
		},
		mounted(){
			let midlist =  this.searchlist.filter(elem=>{
				return elem.label === this.$route.name
			})
			if(midlist.length!=0){
              this.collectionParams = midlist[0].value
              this.currentp         = parseInt(this.collectionParams.currentPage)  || 1
			}
		},
		methods: {
			//催收列表
			collection() {
				this.loading     = true;
				this.$api.collection(this.collectionParams).then(res => {}, response => {
					this.loading = false;
					let params   =  {label:this.$route.name,value:this.collectionParams}
					this.$store.dispatch('SAVECONDITION',params) //存储搜索条件
					
					this.basetableinfo = response.data.returnObj.varList;
					this.pagesize = response.data.returnObj.totalCount;
					for(let i = 0;i<this.basetableinfo.length;i++){
						switch(this.basetableinfo[i].gender){
							case 0:
								this.basetableinfo[i].gender = '男';
								break;
							case 1:
								this.basetableinfo[i].gender = '女';
								break;
						}
					}
				}).catch(val => {//异常
					this.$message.error('服务器异常')
				})
			},
			//选择时间
			changetime(value){
				if(value&&value[0]&&value[1]){
					this.collectionParams.startTime = dateformat(value[0],'yyyy-MM-dd');
		    		this.collectionParams.endTime = dateformat(value[1],'yyyy-MM-dd');
				}else{
					this.collectionParams.startTime = '';
		    		this.collectionParams.endTime = '';
				}
					
			},
			//页码
			topage(target) {
				this.collectionParams = Object.assign(this.collectionParams,target);
				this.collection();
			},
			//逾期催收
			overdue(index,row) {
				var available_amount = row.available_amount || 0;
				var authorized_amount = row.authorized_amount || 0;
				this.$router.push({name:'催收还款',params:{
					user_id:row.user_id,
					cert_card:row.cert_card,
					name:row.name,
					phone:row.phone,
					gender:row.gender,
					available_amount,
					authorized_amount,
				}});
				
			},
			//电话
			callCollection(index,row) {
				this.$router.push({
					name:'电话催收',
					params:{
						user_id:row.user_id,
						user_name:row.name,
						phoneNum:row.phone,
						action:1,
					}})
			},
			//转交
			transfer(row){
				this.transferBox = true;
				this.transferForm.c_id = row.c_id;
				this.transferForm.action = this.collectionParams.action;
//				this.$router.push({
//					name:'转交',
//					params:{
//						c_id:row.c_id,
//						action:this.collectionParams.action
//					}
//				})
			},
			//提交转交表单
			transferSubmit(){
				this.transferLoading = true;
				if(!this.transferForm.ctr_collection_type){
					this.transferLoading = false;
					this.$message({
			          message: '请选择转交类型',
			          type: 'warning'
			        });
				}else if(!this.transferForm.ctr_transfer_reason){
					this.transferLoading = false;
					this.$message({
			          message: '请填写备注',
			          type: 'warning'
			        });
				}else{
					this.$api.transferSubmit(this.transferForm).then(res => {}, response => {
						if(response.data.resultCode==0){
							this.transferLoading = false;
							this.transferBox = false;
							this.collection();
							this.transferForm.ctr_transfer_reason = '';
							this.transferForm.ctr_collection_type = '';
							this.$message({
					          message: '转交成功！',
					          type: 'success'
					        });
						}else{
							this.transferLoading = false;
							this.$message({
					          message: '转交失败！',
					          type: 'warning'
					        });
						}
					}).catch(val => {
						//异常
						this.transferLoading = false;
						this.$message({
				          message: '服务器异常',
				          type: 'warning'
				        });
					})
				}
			},
				
			//即将逾期客服电话
			soonOverdue(row) {
				this.$router.push({
					name:'即将逾期电话记录',
					params:{
						user_id:row.user_id
					}})
			},
			//逾期后客服电话
			overdueAfter(row){
				this.$router.push({
					name:'逾期后电话记录',
					params:{
						user_id:row.user_id
					}
				})
			},
		    //短信
		    msgShowBox(index,row){
		    	this.msgShow = true;
//		    	this.msgShowtext = row.sms;
		    	this.msgShowParams = {
		    		user_id:row.user_id,
		    		phone:row.phone,
		    		name:row.name,
		    		type:'7',
		    		total_amount:row.borrow_amount_stay_pays + row.yue_gong_amount_stay_pay
		    	};
		    	this.$api.msgCont(this.msgShowParams).then(res => {}, response => {
					this.msgShowtext = response.data.returnObj.sms;
					this.msgShowParams.msg = response.data.returnObj.sms;
				}).catch(val => {
					//异常
				})
		    },
		    //发送短信
		    hairMsg(){
		    	this.msgLoading = true;
		    	this.$api.msgShow(this.msgShowParams).then(res => {}, response => {
					if(response.data.resultCode==0){
						//关闭弹框
		    			this.msgLoading = false;
						this.msgShow = false;
						this.$message({
				          message: '发送成功',
				          type: 'success'
				        });
					}else{
		    			this.msgLoading = false;
						this.$message({
				          message: '发送失败',
				          type: 'warning'
				       });
					}
				}).catch(val => {
					//异常
					this.msgLoading = false;
					this.$message({
			          	message: '服务器异常',
			          	type: 'warning'
			        });
				})
		    },
		    //加入黑名单
		    addBack(row){
		    	this.backListBox = true;
		    	this.backListParams.bl_status = '0';
		    	this.backListParams.name = row.name;
				this.backListParams.phone = row.phone;
				this.backListParams.user_id = row.user_id;
//		    	this.$router.push({
//					name:'黑名单原因',
//					params:{
//						user_id:row.user_id,
//						phone:row.phone,
//						name:row.name,
//						action:'0',
//					}
//				})
		    },
		    //提交黑名单信息
		    backSubmit(){
		    	this.backLoading = true;
		    	if(this.backListParams.reason !=''){
					this.$api.addCSBack(this.backListParams).then(res => {}, response => {
						if(response.data.resultCode == '0'){
		    				this.backLoading = false;
							this.backListBox = false;
							this.backListParams.reason = '';
							this.collection();
							this.$message({
					          message: '操作成功',
					          type: 'success'
					        });
						}else{
		    				this.backLoading = false;
							this.$message({
					          message: '操作失败',
					          type: 'warning'
					       	});
						}
					}).catch(val => {
						//异常
	    				this.backLoading = false;
						this.$message({
				            message: '服务器异常',
				            type: 'warning'
				       	});
					})
				}else{
	    			this.backLoading = false;
					this.$message({
			          message: '请填写原因',
			          type: 'warning'
			       	});
				}
		    }
		}
	}
</script>

<style lang="less" scoped="scoped">
	.addtions{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
        div,button{
            margin-left:20px; 
        }
        div.el-input{
            width: 12%;
        }
    }
	.people {
		margin: 0;
		padding: 1% 1%;
		background-color: #f0f4f7;
	}
	.peoplebox {
		text-align: left;
	}
	.personnel {
		display: inline-block;
		padding-left: 1.5%;
		input{
			width: 127px;
			background-color: #fff;
			border-radius: 3px;
			border: #2bc8f3 1px solid;
			height: 23px;
			font-size: 14px;
			padding-left: 10px;
		}
		span {
			font-family: "microsoft yahei";
			font-size: 14px;
			color: #333;
		}
	}
	.cell .collectionIcon{
		margin:0;
		width: 20px;
	}
	.fristTrial {
		padding-left: 2%;
	}
	.search {
		display: inline-block;
		background: #f86b6b;
		border-radius: 8px;
		padding: 5px 30px;
		color: #fff;
		font-size: 13px;
		cursor: pointer;
		margin-left: 2%;
	}
	.eInput {
		width: 130px;
		margin-right: 20px;
	}
    /*文字居中 暂无数据*/
	.el-table__empty-block{
		position: static;
	}
	.el-table__body-wrapper{
		transform:translate(0,0);
	}
	.el-table__empty-text{
        position: fixed;
	}
	
	
</style>