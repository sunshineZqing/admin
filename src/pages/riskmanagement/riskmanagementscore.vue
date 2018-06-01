<template>
	<div>
		<div class="info-content">
			<div class="header-info-left">
				<p class="header-info-left-top">
					<span class="username" v-text='userinfo.name'></span>
					<span v-if='userinfo.gender==0' class="gender">男</span>
					<span v-if='userinfo.gender==1' class="gender">女</span>
					<span class="age" >{{userinfo.age}}岁</span>
					<span class="idcardno">身份证号 : {{userinfo.cert_card}}</span>
				</p>
				<p>
					<span>身份证地址 : {{userinfo.detalis_address}}</span>
					<span>手机号 : {{userinfo.phone}}</span>
				</p>
			</div>
			<div class="header-info-right">
				<p class="comprehensivesorce">
					<span>认证综合评分</span> : <span v-if="score||score==0">{{score}}</span>
				</p>
				<p>
					<span>到期标识</span> : <span v-if="userinfo.month_expired>=0&&userinfo.month_expired<9999">还有{{month_expired}}个月到期</span>
					<span v-if="userinfo.month_expired<=(-9999)">无法识别</span>
					<span v-if="userinfo.month_expired>=9999">长期</span>
					<span v-if="userinfo.month_expired<0&&userinfo.month_expired>-9999">已到期</span>
				</p>
				<p>
					<span>身份证有效期</span> : <span>{{userinfo.cardValidity}}</span>
				</p>
			</div>
		</div>
		<!--<div class="opensuggest" @click="showsuggest">
			<span class="iconfont icon-gongzuotai"></span>
			<span>审核建议</span>
		</div>
		<transition name="fade">		
			<div class="authsuggestions" id="dragdiv" draggable="true" v-show="authsuggestions">
				<toexaminescore></toexaminescore>
			</div>
	    </transition>-->
		<div class="renzheng-info">
			<div class="people-renzheng">
				<div class="people-renzheng-title">用户认证</div>
				<!-- 认证状态 -->
				<el-table :data="tableData" border width="100%">
					<el-table-column prop="total"              label="总认证" align="center"></el-table-column>
					<el-table-column prop="unauthorized_num"   label="未认证" align="center"></el-table-column>
					<el-table-column prop="authentication_num" label="认证中" align="center"></el-table-column>
					<el-table-column prop="authentication_failed_num" label="认证失败" align="center"></el-table-column>
					<el-table-column prop="analysis_num"        label="分析中" align="center"></el-table-column>
					<el-table-column prop="reauthentication_num"label="重新认证" align="center"></el-table-column>
					<el-table-column prop="newadd_num"          label="新增数" align="center"></el-table-column>
					<el-table-column prop="audit_num"           label="审批通过" align="center"></el-table-column>
					<el-table-column prop="reject_num"          label="审批驳回" align="center"></el-table-column>
					<el-table-column prop="createtime"          label="创建时间" align="center" min-width="200px"></el-table-column>
					<el-table-column prop="updatetime"          label="更新时间" align="center" min-width="200px"></el-table-column>
				</el-table>
			</div>
			<div class="renzheng-content">
				<div class="content-header">
					<span v-for="item in realtags" @click="toggleclick(item.key,item.ordernum,item.au_id)" class="activenameout">
						<span :class='{"activename":item.key==currentname}' v-if='item.au_new==0'> 
							{{item.label}}
						    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
					    </span>
					    <span :class='{"activename":item.key==currentname}' v-if='item.au_new==1'>
							{{item.label}}(新增)
						    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
					    </span>
					</span>
				</div>
				<div class="renzheng-item">
					<div class="renzhengItemCont">
						<keep-alive>
						  <tabpanel :name="currentname" :action="action" :authitem="authitem"></tabpanel>
					    </keep-alive>
					</div>
					<div class="renzhengItemRight">
						<toexaminescore></toexaminescore>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import tabpanel from './risk/tabpanel'
    import toexaminescore from './toexaminescore'
    import { mapGetters } from 'vuex'
    import { isEmptyObject,isEmpty} from '@/utils/index'
	export default {
	    mounted(){
      	    this.getlist()
	    },
		data() {
			return {
				userinfo:{
                    'name':'徐湘宁',
                    'gender':'女',
                    'age':30,
                    'idcardno':'13202131211122',
                    'idcardaddress':'湖南省锦州市北湖区国庆路22号',
					'phoneno':'18232542192'
				},
				tableData: [],
				tags:[  //全部认证项
                  // { 'ordernum':'9',  'label':'欺诈信息',  'key':'cheat'}, //***
                  { 'ordernum':'12', 'label':'通讯录'  ,  'key':'maillist'},
                  { 'ordernum':'16', 'label':'运营商'  ,  'key':'operator'},
                  { 'ordernum':'3',  'label':'运营商'  ,  'key':'operator'},
                  { 'ordernum':'6',  'label':'央行认证',  'key':'credit'},
                  { 'ordernum':'14', 'label':'银行卡流水',  'key':'bankflow'}, 
                  { 'ordernum':'17', 'label':'信用卡账单'    ,  'key':'mailbox'},
                  { 'ordernum':'15', 'label':'公积金'  ,  'key':'accumulationfund'},
                  { 'ordernum':'4',  'label':'公积金'  ,  'key':'accumulationfund'},
                  { 'ordernum':'7',  'label':'社保'    ,  'key':'social'},
                  { 'ordernum':'1',  'label':'淘宝'    ,  'key':'taobao'},
                  { 'ordernum':'2',  'label':'京东'    ,  'key':'jd'},
                  { 'ordernum':'5',  'label':'学信网'  ,  'key':'academic'},
                  { 'ordernum':'8',  'label':'车辆',  'key':'vehicle'},
                  { 'ordernum':'18', 'label':'安装应用','key':'installed'},
                  { 'ordernum':'11', 'label':'用户稳定性','key':'userstability'}, //**
                  { 'ordernum':'16', 'label':'全息报告',  'key':'holographic'},
				],
				realtags:[], //该用户所认证项
				currentname:'jd',//当前认证项
				ynum_count:'', //认证综合评分
				action:'', //初复终标识
				authitem:{},//当前项的数据
				month_expired:0,//到期标识
			}
		},
        computed:{
            ...mapGetters(['score','user_id','authsuggestions'])
		},
		components:{tabpanel,toexaminescore},
		mounted(){
			/*\
			 弹框拖动事件
			 * */
//	    	var dragdiv = document.querySelector('#dragdiv');
//			var x, y;  //记录到点击时鼠标到移动框左边和上边的距离
//
//			dragdiv.addEventListener('dragstart', function (e) {
//			e.dataTransfer.effectAllowed = "move";  //移动效果
//			e.dataTransfer.setData("text", '');  //附加数据，　没有这一项，firefox中无法移动
//				x = e.offsetX || e.layerX;
//				y = e.offsetY || e.layerY;
//				return true;
//			}, false);
//
//			document.addEventListener('dragover', function (e) {//取消冒泡 ,不取消则不能触发 drop事件
//			    e.preventDefault()|| e.stopPropagation();
//			}, false);
//
//			document.addEventListener('drop', function (e) {
//				dragdiv.style.left = (e.clientX - x) + 'px';
//				dragdiv.style.top  = (e.clientY - y) + 'px';
//				e.preventDefault() || e.stopPropagation();  //不取消，firefox中会触发网页跳转到查找setData中的内容
//			}, false);


            //存储action
            this.$store.dispatch('setaction',this.$route.params.action)
      	    this.getlist()
      	    this.$store.dispatch('SETCURRENTPAGEID',this.currentpageid) //存储currentpageid
      	    
      	    //直接获取审核建议
      	    this.getauthsugg();
      	    
      	    
      	   	if(!this.user_id){
				this.$store.dispatch('SETUSERID',this.$route.params.user_id) //存储user_id
			}else if(this.user_id&&this.user_id != this.$route.params.user_id){
				if(this.currentpageid != this.pageid){
                    this.$store.dispatch('SHOWAUTH',true) //关闭建议弹框
                }else{
	                this.getauthsugg()
                }
	            this.$store.dispatch('SETUSERID',this.$route.params.user_id) //存储user_id
			}else if(this.user_id&&this.user_id == this.$route.params.user_id){ //审核同一用户访问 认证详情相互切换
                if(this.currentpageid != this.pageid){
                    this.$store.dispatch('SHOWAUTH',false) //关闭建议 弹框
                }
			}
	    },
		methods:{
			getlist(){
	            let params = {
	                user_id:this.$route.params.user_id,
	                ynum_id:this.$route.params.ynum_id,
	                alreadCertified:this.$route.params.alreadCertified,
	                auditflag:this.$route.params.auditflag,
	                action:this.$route.params.action,
	                isInvalid:'0'
	            }
	            this.$api.getriskprimaryuserinfo(params).then(res=>{},response=>{
	            	if(response.data.resultCode=='0'){
		            	this.userinfo = response.data.returnObj.sysAppUser  //用户基本信息
		            	this.month_expired = Math.abs(this.userinfo.month_expired) //到期标识
		            	if(response.data.returnObj.authPd){
		            		this.tableData.push(response.data.returnObj.authPd) //认证信息
		            	}
		                if(!isEmpty(response.data.returnObj.certifyList)){
			                this.au_id    = response.data.returnObj.certifyList.au_id
			                this.au_num   = response.data.returnObj.certifyList.au_num
			                this.tags.forEach((elem,index)=>{ // 用户认证项      
			                	for(let i=0;i<response.data.returnObj.certifyList.length;i++){
			                	    if(elem.ordernum == response.data.returnObj.certifyList[i].au_ynumauth_type){
			                	    	//为elem 设置属性并且进行传输
			                	    	this.$set(elem,'au_id',response.data.returnObj.certifyList[i].au_id)
			                	    	this.$set(elem,'au_num',response.data.returnObj.certifyList[i].au_num)
			                	    	switch(response.data.returnObj.certifyList[i].au_status){
			                	    	  case 0:this.$set(elem,'austatus','未认证');break;
			                	    	  case 1:this.$set(elem,'austatus','认证中');break;
			                	    	  case 2:this.$set(elem,'austatus','已认证');break;
			                	    	  case 3:this.$set(elem,'austatus','分析中');break;
			                	    	  case 4:this.$set(elem,'austatus','客服认证');break;
			                	    	  case 5:this.$set(elem,'austatus','已驳回');break;
			                	    	  case 6:this.$set(elem,'austatus','重新认证');break;
			                	    	  case 7:this.$set(elem,'austatus','已通过');break;
			                	    	}
			                	    	if(response.data.returnObj.certifyList[i].au_new&&response.data.returnObj.certifyList[i].au_new==1){
                                           this.$set(elem,'au_new',1);
			                	    	}else{
			                	    	   this.$set(elem,'au_new',0);
			                	    	}
			                	    	this.realtags.push(elem)
			                	    } 
			                	}
			                })
			                this.currentname = this.realtags[0].key
			                let item = this.realtags.filter(elem=>{
			                	return elem.ordernum =='12'
			                })
			                this.getauthiteminfo('12',item[0].au_id)
		                }
	            	}                                
		        }).catch(val=>{//捕获异常
	              this.$message.error('服务器异常')
		        })
		        this.action = this.$route.params.action
			},
			showsuggest(){//显示弹框
				this.$store.dispatch('SHOWAUTH',true); //显示审核列表=>审核建议弹框
				this.getauthsugg()
			},
			getauthsugg(){ //审核建议数据
				let params = {
	                user_id:this.$route.params.user_id,
	                ynum_id:this.$route.params.ynum_id,
	                action:this.$route.params.action
	            }
	            console.log(params,444)
				this.$api.authsuggests(params).then(res=>{},response=>{//请求数据
                	if(response.data.resultCode=='0'){
                		if(response.data.returnObj.certifyList){
	                		response.data.returnObj.certifyList.forEach(elem=>{
	                			this.$set(elem,'isselected',false)
	                			this.$set(elem,'inputValue','')
	                			this.$set(elem,'input','')
	                			elem.sysmarks.forEach(ele=>{
	                				this.$set(ele,'input','')
	                				this.$set(ele,'isselected',false)
	                			})
	                		})
                		}
                        let concatPd = ''
                        if(!isEmptyObject(response.data.returnObj.concatPd)){
                            concatPd = response.data.returnObj.concatPd
                        }else{
                        	concatPd = ''
                        }
                        let params3 = [
                            {
                               certifyList:response.data.returnObj.certifyList || '',
                               inputcontent:'',
                               audit_limit:''
                            },
                            {ynumPd:response.data.returnObj.ynumPd},
                            {pd:response.data.returnObj.pd},
                            {concatPd:concatPd}
                        ]
                        this.$store.dispatch('TOGETSUBMIT',params3); //存储数据
	                }else{
	                	this.$message({type:"error",message:'查询失败'})
	                }
		        }).catch(err=>{//捕获异常

		        }) 
			},
            toggleclick(name,ordernum,au_id){
            	let lastname   = this.lastname
            	this.currentname = name
            	if((lastname=='operator'||lastname=='holographic')&&ordernum=='16'){
            		return 
            	}
                this.getauthiteminfo(ordernum,au_id)
            },
            getauthiteminfo(ordernum ='12',au_id = '17'){
	            let loadingInstance = this.$loading({
	              target:'div.renzheng-item'
	            })
                let authinfo = {
                    user_id:this.$route.params.user_id,
                    ynum_id:this.$route.params.ynum_id,
                    isInvalid:'0',
                    au_ynumauth_type:ordernum,
                    action:this.$route.params.action,
                    au_id:au_id
                }
                this.$api.getauthitem(authinfo).then(res=>{},response=>{
                	if(response.data.resultCode=='0'){
	                	this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
		                    loadingInstance.close();
		                });
                		if(response.data.returnObj.p&&response.data.returnObj.p1&&response.data.returnObj.p2&&response.data.returnObj.quanxiPd){
                            response.data.returnObj.p = Object.assign(response.data.returnObj.p,response.data.returnObj.p1,response.data.returnObj.p2,response.data.returnObj.quanxiPd); //对象合并
                            //存储风控管理-》审核管理-》认证详情-》认证项信息
                            this.authitem = response.data.returnObj.p
		                	this.$store.dispatch('SETAUTHITEM',response.data.returnObj.p)
		                	this.$store.dispatch('TOPASS',authinfo)
                        }
                		if(response.data.returnObj.p&&response.data.returnObj.p1&&response.data.returnObj.p2){
                            response.data.returnObj.p = Object.assign(response.data.returnObj.p,response.data.returnObj.p1,response.data.returnObj.p2); //对象合并
                            //存储风控管理-》审核管理-》认证详情-》认证项信息
		                	this.$store.dispatch('SETAUTHITEM',response.data.returnObj.p)
		                	this.$store.dispatch('TOPASS',authinfo)
		                	this.authitem = response.data.returnObj.p
                        }else if(response.data.returnObj.p&&response.data.returnObj.p1){
                            response.data.returnObj.p = Object.assign(response.data.returnObj.p,response.data.returnObj.p1); //对象合并
                            //存储风控管理-》审核管理-》认证详情-》认证项信息
		                	this.$store.dispatch('SETAUTHITEM',response.data.returnObj.p)
		                	this.$store.dispatch('TOPASS',authinfo)
		                	this.authitem = response.data.returnObj.p
                        }else if(response.data.returnObj.p){
	                    	//存储风控管理-》审核管理-》认证详情-》认证项信息
		                	this.$store.dispatch('SETAUTHITEM',response.data.returnObj.p)
		                	this.$store.dispatch('TOPASS',authinfo)
		                	this.authitem = response.data.returnObj.p
                		}
	                }else{
	                	this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
		                    loadingInstance.close();
		                });
	                	this.$message({type:'error',message:'查询失败'})
	                }
		        }).catch(err=>{//捕获异常
		        	console.log(err)
                    this.$message({type:'error',message:'服务器异常'})
		        }) 
            }
		}
	}
</script>
<style lang="less" >
	// 个人信息
	.info-content {
		width: 100%;
		background: #fff;
		display: flex;
    	display: -webkit-flex;
    	flex-wrap:nowrap;
    	flex-direction:row;
    	justify-content:space-between;
        align-items:center;
        box-shadow: 0 0 10px 3px #e8e7e6;
		.header-info-left {
			width: 64%;
			height: 120px;
			padding-left: 50px;
			display: flex;
	    	display: -webkit-flex;
	    	flex-wrap:nowrap;
	    	flex-direction:column;
	    	justify-content:space-around;
	        align-items:flex-start;
			p {
				margin: 0;
				padding: 0;
				width: 100%;
				text-align: left;
				span{
					display: inline-block;
					color: #666;
				}
			}
			.header-info-left-top {
				.username{
					margin-right: 7%;
					color: #1f1f1f;
				}
				.gender{
					margin-right: 12.8%;
				}
				.age{
					margin-right: 16.2%;
				}
			}
			p:last-child{
				span:first-child{
                   margin-right: 9%;
				}
			}
		}
		.header-info-right {
			width: 32%;
			height: 120px;
			background: url(../../assets/img/infoheaderbg.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
	    	display: -webkit-flex;
	    	flex-wrap:nowrap;
	    	flex-direction:column;
	    	justify-content:space-around;
	        align-items:center;
			p{
				margin: 0;
				padding: 0;
				color: #c4c4c4;
				width: 100%;
				text-align: center;
				span{
					display: inline-block;
				}
			}
			.comprehensivesorce{
                span:last-child{
                   color: #f96b6b;
                }
			}
		}
	}

// 认证信息
    .el-table thead>tr{
    	background-color: #f0f9fc !important;
    }
	.renzheng-info {
		border-radius: 8px;
		background: #fff;
		margin-top: 10px;
		padding: 0 20px;
		padding-top: 10px;
		padding-bottom: 200px;
		.people-renzheng-title {
			width: 125px;
			height: 38px;
			background: #2bc8f3;
			color: #fff;
			font-size: 19px;
			line-height: 38px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
		.renzheng-content{
			width:100%;
		    margin-top: 37px;
			.content-header {
				width: 100%;
				display: flex;
				display: -webkit-flex;
				flex-driection:row;
				flex-wrap:nowarp;
				justify-content:space-around;
				aligns-item:center;
				background: #d2f3fe;	
				border-top-left-radius: 15px;
				border-top-right-radius:15px ;
				span{
					width:auto;
					/*min-width: 96px;*/
					display: inline-block;
					height: 56px;
					text-align: center;
					line-height: 56px;
					/*display: table-cell;*/	
					font-size: 18px;
					color: #333;
					/*padding: 5px 14px;*/
					cursor: pointer;
					z-index: 100;
					vertical-align: top;
				}
			}
			.renzheng-item{
				width: 100%;
				min-height: 200px;
				border: 1px solid #30c9f3;
			    box-sizing:border-box;
			    .renzhengItemCont{
			    	display: inline-block;
			    	width: 50%;
			    	vertical-align: top;
			    }
			    .renzhengItemRight{
			    	display: inline-block;
			    	width: 49%;
			    	vertical-align: top;
			    	max-height: 800px;
			    	overflow: auto;
			    	margin: 20px 0;
			    	border: 1px solid #E4E4E4;
			    }
			}
	    }
	}
	.opensuggest{
		padding: 5px;
		position: fixed;
		right: 20px;
		top: 50%;
		border: none;
		border-radius:10px;
		background-color: #F99152;
		width:69px;
		line-height: 25px;
		color: #fff;
		z-index: 1001;
		cursor: pointer;
		span{
			width: 100%;
			display: block;
			font-size:8px;
		}
	}
	.activenameout{
		position: relative;
		span{
			display: inline-block;
			min-width: 96px;
		}
	}
    .activename{
    	display: inline-block !important;
    	white-space:nowrap;
    	min-width:96px ;
    	border-bottom: 1px solid #2bc8f3;
    	background-color: #2AC9F3;
    	color: #fff !important;
    	font-size: 16px !important;
    	/*position: absolute;
    	top: -12px;*/
    	left: 0;
    	width: auto;
    	/*height: 80px !important;*/
    	line-height: 40px !important;
    	text-align: center;
    }
    /*.activename:after {
		border: solid transparent;
        content: ' ';
        height: 0;
        right: 100%;    //根据三角形的位置，可以随意更改。
        position: absolute;
        width: 0;
	    border-width: 5px;
	    border-right: 3px solid #1192B4;
        border-bottom: 5px solid #1192B4;
	    top: 0px;//根据三角的位置改变
	}

	.activename:before {
		border: solid transparent;
        content: ' ';
        height: 0;
        left: 100%;    //根据三角形的位置，可以随意更改。
        position: absolute;
        width: 0;
	    border-width: 5px;
	    border-left: 3px solid #1192B4;
        border-top: 5px solid #1192B4;
	    bottom: 0px;
	}*/
    .taginfo{
    	width: 36px !important;
    	min-width: 36px !important;
    	color: #2AC9F3 !important;
    	font-size: 12px !important;
    	border: none;
    	border-radius: 5px;
    	white-space:nowrap;
    	text-align: center;
    	line-height: 12px !important;
    	height: 12px !important;
    	padding: 3px !important;
    	background-color: #fff;
    	position: absolute;
    	bottom: 3px;
    	left: 50%;
    	margin-left: -22px;
    }
    .authsuggestions{
		width: 510px;
		position: fixed;
		right: 0;
		bottom: 0;
		height: 800px;
		z-index: 1002;
		overflow-y: scroll;
		overflow-x: hidden;
		border: 2px solid #FCE3D3;
		border-right: none;
		background-color: #fff;
        cursor: pointer;
        
	}
	.fade-enter-active, .fade-leave-active {
      transition: opacity,width .5s,.5s ;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
      width:0;
    }
</style>