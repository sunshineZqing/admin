<template>
	<div class="callCollection">
		<!--认证详情-->
		<div class="info-content" v-if="action == 1">
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
					<!-- <span>认证综合评分</span> : <span v-if="score||score==0">{{score}}</span> -->
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
		<div class="renzheng-info" v-if="action == 1">
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
						<span id="tabname" :class='{"activename":item.key==currentname}' v-if='item.au_new==0'> 
							{{item.label}}
						    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
					    </span>
					    <span id="tabname" :class='{"activename":item.key==currentname}' v-if='item.au_new==1'>
							{{item.label}}(新增)
						    <span class="taginfo" v-show="item.key==currentname">{{item.austatus}}</span>
					    </span>
					</span>
				</div>
				<div class="renzheng-item">
					<tabpanel :name="currentname" :action="action" :authitem="authitem"></tabpanel>
				</div>
			</div>
		</div>
		
		<!--待还款情况-->
		<div class="stayRepayment">
			<div class="tabTitle">
				<span v-on:click="onTab(1)" :class="{'tabTitCur':tabCur}">快借逾期待还情况</span>
				<span v-on:click="onTab(2)" :class="{'tabTitCur':!tabCur}">分期逾期待还情况</span>
			</div>
			<div class="stayRepaymentCont">
				<!--快借逾期-->
				<div v-show="tabCur">
					<origintable :originTableTitel = "kjbasetabletitle" :originTableInfo = 'kjtableData' :loading="kjloading" :showopera="showopera">
						<template slot-scope="scope">
								<el-button type="text" @click="repaymentsDetails(scope.scope.item)">还款详情</el-button>
								<el-button type="text"  style="margin-left: 0;" @click="newKJRepayments(scope.scope.item)">新增还款</el-button>
						</template>
					</origintable>
					<basepage :sunmary='kjtableDataPage' v-on:topage="topage"></basepage>
				</div>
				<!--分期逾期-->
				<div v-show="!tabCur">
					<origintable :originTableTitel = "fqbasetabletitle" :originTableInfo = 'fqtableData' :loading="fqloading" :showopera="showopera">
						<template slot-scope="scope">
							<el-button type="text" @click="repaymentsSituation(scope.scope.item)">还款情况</el-button>
							<el-button type="text" style="margin-left: 0;" @click="newFQRepayments(scope.scope.item)">新增还款</el-button>
						</template>
					</origintable>
					<basepage :sunmary='pageSize2' v-on:topage="topage2"></basepage>
				</div>
			</div>
		</div>
		<!--弹分期逾期还款-->
		<el-dialog title="新增分期还款" :visible.sync="bombToggle" width="1000px" :before-close="handleClose">
			<div class="bomb">
				<div class="bombCont">
					<div class="bombContTop">
						<div class="">
							<span>最大金额：</span><span>{{newfqRepaymentsData.max}}</span>
						</div>
						<div class="">
							<span>最小金额：</span><span>{{newfqRepaymentsData.min}}</span>
						</div>
					</div>
					<div class="bombData">
						<origintable :originTableTitel = "XFQbasetabletitle" :originTableInfo = 'XFQbasetableinfo' :loading="fqloading" :showopera="showopera">
							<template slot-scope="scope">
								<el-button type="text" @click ="XFQbasetableDetails(scope.scope.item)" >详情</el-button>
							</template>
						</origintable>
						
					</div>
				</div>
				<div class="bombBottom">
					<div class="bombBack">
						<span class="bombBackTit">选择银行卡</span>
						<el-radio-group v-model="fqcardListNum" v-for="(item,index) in newfqRepaymentsData.cardList" :key = "item.account">
						    <el-radio :label="item.account">{{item.bankName}}({{item.accountNo}})</el-radio><span v-if="index==0" class="backmor">默认</span><br/>
						    <!--<el-radio :label="item.account+'1'">{{item.bankName}}({{item.accountNo}})</el-radio>-->
						</el-radio-group>
						<!--<div v-for="(item,index) in newfqRepaymentsData.cardList">
							<input type="radio" name="backRadio" :id="'backRadio'+index" :value="index" v-model="FQbomBackRadioIndex" :checked="index==0" :class="FQbomBackRadioIndex==index ? 'iconfont icon-xuanzhong' : 'iconfont icon-weixuanzhong'">
							<label v-bind:for="'backRadio'+index" :class="FQbomBackRadioIndex==index ? 'checkedSpan' : ''">{{item.bankName}}({{item.accountNo}})</label>
							<span v-if="index==0" class="backmor">默认</span>
						</div>-->
					</div>
					<div class="bombPut">
						<div class="bombmoney">
							<span class="bombmoneyTit">还款金额：</span>
							<input type="text" name="" id="" value="" v-model="FQrechargeMoney"/>
							<span class="bombmoneyPrompt"><span>*</span>（额度范围为{{newfqRepaymentsData.min}}~{{newfqRepaymentsData.max}}）</span>
						</div>
						<div class="bombRemark">
							<span class="bombmoneyTit">备注：</span><textarea name="" rows="" cols=""></textarea>
						</div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" v-on:click="newFQSubmit" size="medium" :loading = 'newkjSubmit'>提交</el-button>
			</span>
		</el-dialog>
		<!--新增分期还款列表   详情列表-->
		<el-dialog title="新增分期还款" :visible.sync="bombToggleDetails" width="1000px">
			<origintable :originTableTitel = "XFQtabletitleDetails" :originTableInfo = 'XFQtableinfoDetails' :loading="XFQloading">
			</origintable>
			<basepage :sunmary = "XFQpagesize" v-on:topage="XFQtopage"></basepage>
		</el-dialog>
		<!--弹新增快借还款-->
		<el-dialog title="新增还款" :visible.sync="repaymentSituation" width="400px" algin="left">
			<div class="repaymentS">
				<div class="bombCont">
					<div class="bombContTop">
						<div class="">
							<span>最大金额：</span><span>{{newKJRepaymentsData.max}}</span>
						</div>
						<div class="">
							<span>最小金额：</span><span>{{newKJRepaymentsData.min}}</span>
						</div>
					</div>
				</div>
				<div class="bombBottom">
					<div class="bombBack">
						<span class="bombBackTit">选择银行卡</span>
						<el-radio-group v-model="kjcardListNum" v-for="(item,index) in newKJRepaymentsData.cardList" :key = "item.account">
						    <el-radio :label="item.account">{{item.bankName}}({{item.accountNo}})</el-radio><span v-if="index==0" class="backmor">默认</span><br/>
						</el-radio-group>
					</div>
					<div class="bombPut">
						<div class="bombmoney">
							<span class="bombmoneyTit">还款金额</span>
							<input type="text" name="" id="" value="" v-model="KJrechargeMoney"/>
							<span class="bombmoneyPrompt"><span>*</span>（额度范围为{{newKJRepaymentsData.min}}~{{newKJRepaymentsData.max}}）</span>
						</div>
						<div class="bombRemark">
							<span class="bombmoneyTit">备注</span><textarea name="" rows="" cols=""></textarea>
						</div>
					</div>
					<div class="bombBtn">
						<el-button type="primary" size="medium" v-on:click = "newKJSubmit" :loading = "newfqSubmit">提交</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
		<!--电话催收-->
		<origintable  :originTableTitel="origintabletitle" :originTableInfo="origintableinfo" :showopera="showopera">
			<template slot-scope="scope" ><br />
				<el-button type="text" v-on:click="btnFeedback(scope.scope.item)">催收反馈详情</el-button>
				<br/>
				<el-button v-if="action==1" type="text" v-on:click="newFeedback(scope.scope.item)">新增催收反馈</el-button>
			</template>
		</origintable>
		<!--<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading" :showopera="true" :key="1">
			<template slot-scope="scope" >
				<el-button type="text" v-on:click="btnFeedback(scope.scope.row)">催收反馈详情</el-button>
				<el-button v-if="action==1" type="text" v-on:click="newFeedback(scope.scope.row)">新增催收反馈</el-button>
			</template>

		</basetable>-->
		<el-dialog title="新增催收" :visible.sync="dialogVisible" width="540px" :before-close="btnNewFeedback" align="left" >
			<div class="newFeedback">
				<p>反馈内容</p>
				<textarea v-model="submitParams.ctr_detail" name="" rows="" cols=""></textarea>
				<p>备注</p>
				<textarea class="remarkInput" v-model="submitParams.ctr_remark" name="" rows="" cols=""></textarea>
				<p class="callStart">打通状态:</p>
				<el-select v-model="submitParams.ctr_flag" clearable placeholder="请选择" style="width:100px">
					<el-option :key="1" label="已接通" :value="1">
					</el-option>
					<el-option :key="0" label="未接通" :value="0">
					</el-option>
				</el-select>
				<el-select v-if="submitParams.ctr_flag == 0" v-model="submitParams.atd_status" clearable placeholder="请选择" style="width:100px" >
					<el-option :key="0" label="无人接听" :value="0">
					</el-option>
					<el-option :key="1" label="停机" :value="1">
					</el-option>
					<el-option :key="2" label="空号" :value="2">
					</el-option>
					<el-option :key="3" label="销户" :value="3">
					</el-option>
				</el-select>
			</div>
			<span slot="footer" class="dialog-footer" style="display:block;text-align: center;">
			    <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
			    <el-button type="primary" @click="submitFk" size="medium">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import origintable from '@/components/origintable'
	import tabpanel from './risk/tabpanel'
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
    import { mapGetters } from 'vuex'
    import { isEmptyObject,isEmpty} from '@/utils/index'
	export default {
		name: 'repaymentDetails',
		components: {basetable,basepage,tabpanel,origintable},
		computed:{
            ...mapGetters(['score','authsuggestions'])
		},
		data() {
			return {
				userinfo:{
                    'name':'',
                    'gender':'',
                    'age':0,
                    'idcardno':'',
                    'idcardaddress':'',
					'phoneno':''
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
				currentpageid:1,//当前页标识 审核1 提额2
				action:"0", //初复终标识
				authitem:{},//当前项的数据
				month_expired:0,//到期标识
				/**d电话催收*/
				//列表头信息
				showopera:true,
				origintabletitle:[
                	{
						label: '姓名',
						prop: 'phoneName',
					},
					{
						label: '电话',
						prop: 'phoneNum',
					},
					{
						label: '与客户关系',
						prop: 'atdType',
					},
					{
						label: '备注',
						prop: 'remark',
						width:'200'
					},
					{
						label: '最新电话催收记录',
						prop: 'ctr_detail',
						width:'200'
					},
					{
						label: '电话催收次数',
						prop: 'totle',
						width:'200'
					},
					{
						label: '电话催收未接通次数',
						prop: 'success',
						width:'200'
					}
				],
				origintableinfo:[],
				basetabletitle: [
					{
	                    field: 'custome',
	                    title:'序号',
	                    width: 60,
	                    titleAlign: 'center',
	                    columnAlign: 'center',
	                    formatter: function (rowData,rowIndex,pagingIndex,field) {
	                        return rowIndex + 1
	                    },
	                    isFrozen: true,
	                    isResize:true
                	},{
						title: '姓名',
						field: 'phoneName',
						width:'180'
					},
					{
						title: '电话',
						field: 'phoneNum',
						width:'200'
					},
					{
						title: '与客户关系',
						field: 'atdType',
						width:'200'
					},
					{
						title: '备注',
						field: 'remark',
						width:'200'
					},
					{
						title: '最新电话催收记录',
						field: 'ctr_detail',
						width:'200'
					},
					{
						title: '电话催收次数',
						field: 'totle',
						width:'200'
					},
					{
						title: '电话催收未接通次数',
						field: 'success',
						width:'200'
					},
					{
						field: 'custome-adv',
						title:'操作',
						width: 200, 
						titleAlign: 'center',
						columnAlign:'center',
						componentName:'callCollection',
						isResize:true,
					}
				],
				//列表信息
				basetableinfo: [],
				//列表请求参数
				basetableinfoParams:[],
				loading: true,
				//提交反馈请求参数
				submitParams: {
					ctr_remark:'',
					ctr_detail:'',
					ctr_flag:'',
				},
				//新增催收反馈弹框
				dialogVisible: false,
				
				
				/**
				 * 待还情况
				 */
				
				//快借逾期列表头
				kjbasetabletitle:[
					{label:'借款ID',prop:'borrowId'},
					{label:'用户ID',prop:'userId'},
					{label:'借款日期',prop:'borrowTime',width:'160px'},
					{label:'借款金额',prop:'borrowAmount'},
					{label:'应还款日期',prop:'repayTime',width:'160px'},
					{label:'利息',prop:'payInterest'},
					{label:'逾期利息',prop:'overDueInterestTotal'},
					{label:'逾期天数',prop:'overDays'},
					{label:'已产生总利息',prop:'allInterest'},
					{label:'已还利息',prop:'actualPayInterest'},
					{label:'待还利息',prop:'interestStayPay'},
					{label:'已还金额',prop:'payAmount'},
					{label:'待还金额',prop:'satyPayAmount'},
					{label:'还款次数',prop:'paymentTimes'},
					{label:'还款状态',prop:'isPayOff'},//还款状态 0：未还清 1：已还清
					{label:'还清时间',prop:'actualRepaymentTime',width:'160px'},
				],
				kjloading:true,//快借loading
				//快借逾期列表
				kjtableData:[],
				kjtableDataparams:{},
				kjtableDataPage:1,//总条数
				pageSize2:0,//总条数2
				//用户信息
				userId:'',
				name:'',
				phone:'',
				cert_card:'',//身份证号
				gender:'',//性别
				//新增快借还款
				newKJRepaymentsParams:{},
				newKJRepaymentsData:'',
				
				//新增快借还款提交信息
				newKJSubmitParams:{
					money:'',
				},


				//选中银行卡索引
				KJBomBackRadioIndex:'0',
				kjcardListNum:'',
				newkjSubmit:false,
				//还款金额
				KJrechargeMoney:'',
				
				//分期逾期列表
				fqbasetabletitle:[
					{label:'借款ID',prop:'stage_id'},
					{label:'用户ID',prop:'user_id'},
					{label:'借款日期',prop:'borrow_time',width:'160px'},
					{label:'借款金额',prop:'amount_count'},
					{label:'总期数',prop:'qishu'},
					{label:'剩余期数',prop:'remain_qishu'},
					{label:'逾期天数',prop:'over_days'},
					{label:'该笔借款全部到期时间',prop:'repay_time',width:'160px'},
					{label:'预计产生的总利息',prop:'sum_interest'},
					{label:'已产生逾期利息',prop:'over_due_interest_total'},
					{label:'逾期待还本金',prop:'yue_gong_amount_stay_pay'},
					{label:'待还剩余利息',prop:'interest_stay_pay'},
					{label:'逾期待还利息',prop:'over_due_interest_stay_pay'},
					{label:'待还总金额',prop:'stay_pay_amount'},
					{label:'还款次数',prop:'payment_times'},
					{label:'还款状态',prop:'is_pay_off'},//还款状态 0：未还清 1：已还清
					{label:'还清时间',prop:'actual_repayment_time',width:'160px'},
				],
				fqtableData:[],
				fqtableDataparams:[],
				fqloading:true,//分期loading
				
				//新增分期还款
				newfqRepaymentsParams:[],//新增分期还款页面参数
				newfqRepaymentsData:[],//新增分期还款页面
				//分期银行卡选中
				fqcardListNum:'',//选中银行卡号
				newfqSubmit:false,//提交按钮 
				FQbomBackRadioIndex:'0',
				//还款金额
				FQrechargeMoney:'',
				
				//分期账单列表
				XFQbasetabletitle:[
					{label:'本金',prop:'yue_gong_amount'},
					{label:'期数',prop:'qishu_no'},
					{label:'利息',prop:'interest' },
					{label:'逾期天数',prop:'overdays'},
					{label:'逾期利息',prop:'over_due_interest_total'},
					{label:'已还总利息',prop:'actual_pay_interest_total'},
					{label:'待还逾期利息',prop:'over_due_interest_stay_pay' },
					{label:'还款次数',prop:'payment_times'},
					{label:'已还本金',prop:'actual_yue_gong_amount'},
					{label:'待还本金',prop:'yue_gong_amount_stay_pay'},
					{label:'本期待还总额',prop:'pay_stay_total'},
				],
				XFQbasetableinfo: [],
				bomBackRadio: '',
				//选择银行卡
				bomBack: [{
						back: '建设银行（1234）'
					},
					{
						back: '建设银行（1234）'
					},
					{
						back: '建设银行（1234）'
					}
				],
				tabCur:true,
				
				bombToggle: false,//弹分期逾期还款
				XFQloading:true,//弹分期逾期还款 详情弹框
				bombToggleDetails:false,//弹分期逾期还款 详情弹框
				//弹分期逾期还款 详情弹框
				XFQtabletitleDetails:[
					{label:'还款时间',prop:'payment_time'},
					{label:'还款类别',prop:'payment_way'},//还款方式 0：主动还款 1：系统自动扣款 2：催收代扣 3:线下还款
					{label:'还款金额(¥)',prop:'payment_amount'},
					{label:'还款流水号',prop:'pr_trade_sn',width:'150px'},
					{label:'还款银行',prop:'bankName'},
					{label:'还款银行卡号',prop:'accountNo',width:'170px'},
					{label:'备注',prop:''},
				],
				XFQtableDataparams:{},
				XFQtableinfoDetails:[],
				XFQpagesize:0,
				repaymentSituation: false,
			}
		},
		mounted() {
			/*电话催收*/
			this.action = this.$route.params.action.toString();
			if(this.action == 1){
                this.getlist()
			}
			this.basetableinfoParams = Object.assign(this.basetableinfoParams,this.$route.params);
			this.callCollectionList();
			
			/**
			 * 待还情况
			 */
			//个人信息
			this.userId = this.$route.params.user_id;
			//快借逾期列表
			this.kjtableDataparams.userId = this.userId;
			this.kjtableList();
			//分期逾期列表
			this.fqtableDataparams.userId = this.userId;
			this.fqtableList();
		},
		methods: {
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
		                }
		                let item = this.realtags.filter(elem=>{
		                	return elem.ordernum =='12'
		                })
		                this.getauthiteminfo('12',item[0].au_id)
	            	}                                
		        }).catch(val=>{//捕获异常
	                this.$message.error('服务器异常')
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
                    action:'1',
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
                    this.$message({type:'error',message:'服务器异常'})
		        }) 
            },
            /*电话催收*/
			callCollectionList(){
				this.loading = true;
				this.$api.callCollection(this.basetableinfoParams).then(res => {}, response => {
					this.loading = false;
					if(response.data.resultCode == 0){
						this.basetableinfo = response.data.returnObj.js;
						this.submitParams.user_id = response.data.returnObj.pd.user_id;
						for(let i =0; i<this.basetableinfo.length;i++){
							this.$set(this.basetableinfo[i],'action',this.action);
							switch (this.basetableinfo[i].atd_type){
								case '0':
									this.$set(this.basetableinfo[i],'atdType','本人手机号');
									break;
								case '1':
									this.$set(this.basetableinfo[i],'atdType','备用手机号');
									break;
								case '2':
									this.$set(this.basetableinfo[i],'atdType','紧急联系人手机号');
									break;
								case '3':
									this.$set(this.basetableinfo[i],'atdType','家人手机号');
									break;
								case '4':
									this.$set(this.basetableinfo[i],'atdType','通话前10名联系人手机号');
									break;
								case "5":
									this.$set(this.basetableinfo[i],'atdType','其他');
									break;
							}
							this.basetableinfo[i].totle = this.basetableinfo[i].totle || 0;
							this.basetableinfo[i].success = this.basetableinfo[i].success || 0;
						}
						this.origintableinfo = this.basetableinfo
					}else{
						this.$message({type:"error",message:'电话催收详情查询失败'})
					}
				}).catch(val => {
					this.loading = false;
					this.$message({type:"error",message:"服务器异常"})
				})
			},
			repayDetails() {
				this.loading = false;
			},
			//新增反馈
			newFeedback(row){
				console.log(row)
				this.dialogVisible = true;
//				this.submitParams.user_id = row.user_id;
//				this.submitParams.atd_id = row.atd_id;
				this.submitParams.ctr_flag = row.ctr_flag;
				this.submitParams.atd_type = row.atd_type;
				this.submitParams.phone = row.phoneNum;
				this.submitParams.name = row.phoneName;
				
			},
			//提交反馈信息
			submitFk(){
				if(this.submitParams.ctr_detail === ''){
					this.$message({
			           message: '请输入反馈内容',
			           type: 'warning'
			        });
				}else if(!this.submitParams.ctr_flag && this.submitParams.ctr_flag != 0){
					this.$message({
			           message: '请选择是否接通',
			           type: 'warning'
			        });
				}else{
					if(this.submitParams.ctr_flag == 1){
						this.submitParams.atd_status=0;
						this.$api.submitFeedback(this.submitParams).then(res => {}, response => {
							if(response.data.resultCode==0){
								this.dialogVisible = false;
								this.callCollectionList();
								this.submitParams={
									ctr_remark:'',
									ctr_detail:'',
									ctr_flag:'',
								};
								this.$message({
						           message: '新建反馈信息成功',
						           type: 'success'
						        });
							}else{
								this.$message({
						           message:response.data.resultMsg,
						           type: 'error'
						        });
							}
						
						}).catch(val => {
							//异常
						})
					}else if(!this.submitParams.atd_status && this.submitParams.atd_status != 0){
						this.$message({
				           message: '请选择未接通原因',
				           type: 'warning'
				        });
					}else{
						this.$api.submitFeedback(this.submitParams).then(res => {}, response => {
							if(response.data.resultCode==0){
								this.dialogVisible = false;
								this.callCollectionList();
								this.submitParams={
									ctr_remark:'',
									ctr_detail:'',
									ctr_flag:'',
								};
								this.$message({
						           message: '新建反馈信息成功',
						           type: 'success'
						        });
							}else{
								this.$message({
						           message:response.data.resultMsg,
						           type: 'error'
						        });
							}
						
						}).catch(val => {
							//异常
						})
					}
				}
			},
			btnFeedback(row) {
				this.$router.push({
					name:'催收反馈详情',
					params:{
						user_id:this.submitParams.user_id,
						phone:row.phoneNum
					},
				})
			},
			btnNewFeedback(done){
				this.$confirm('确认关闭？')
	          	.then(_ => {
	            	done();
	          	})
	          	.catch(_ => {});
			},
			//v-table点击
			customCompFunc(e){
		    	console.log(e)
		    	this[e.type](e.rowData);
		    },
		    
		    /**
		     * 待还情况
		     */
		    //快借逾期列表
			kjtableList(){
				this.kjtableDataparams.is_pay_off = 2;
				this.kjloading = true;
				this.$api.kjOverdue(this.kjtableDataparams).then(res => {}, response => {
					this.kjloading = false;
					console.log(response)
					
					if(response.data.resultCode==0){
						console.log(123)
						this.kjtableData = response.data.returnObj.varList;
						this.kjtableDataPage =  response.data.returnObj.totalCount;
						console.log(this.kjtableData);
						for(let i=0; i<this.kjtableData.length; i++){
							if(this.kjtableData[i].isPayOff == 0){
								this.kjtableData[i].isPayOff = '未还清'
							}else if(this.kjtableData[i].isPayOff == 1){
								this.kjtableData[i].isPayOff = '已还清'
							}else if(this.kjtableData[i].isPayOff == 4){
								this.kjtableData[i].isPayOff = '部分还款'
							}
						}
					}
				}).catch(val => {
					//异常
				})
			},
			//快借逾期页码
			topage(target) {
				this.kjtableDataparams = Object.assign(this.kjtableDataparams,target);
				console.log(this.kjtableDataparams);
				this.kjtableList();
			},
			onTab(num) {
				if(num === 1) {
					this.tabCur = true
				} else {
					this.tabCur = false
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//还款详情
			repaymentsDetails(row) {
				console.log(row)
				if(row.borrowId){
					this.$router.push({
						name:'还款详情',
						params:{
							action:0,
							stage_id:0,
							borrowId:row.borrowId,
						}
					});
				}else{
					this.$message({
			           message: '查询失败',
			           type: 'error'
			        });
				}
			},
			//新增快借还款
			newKJRepayments( row) {
				//设置参数请求数据
				this.newKJRepaymentsParams.user_id = row.userId;
				this.newKJRepaymentsParams.borrow_id = row.borrowId;
				this.$api.newKJRepayments(this.newKJRepaymentsParams).then(res => {}, response => {
					console.log(response);
					if(response.data.resultCode==0){
						//显示弹框
						this.repaymentSituation = true;
						this.newKJRepaymentsData = response.data.returnObj;
						this.kjcardListNum = this.newKJRepaymentsData.cardList[0].account;
					}else{
						this.$message({
				          message: '新增失败',
				          type: 'error'
				        });
					}
				}).catch(val => {
					//异常
					this.$message({
			          message: '服务器异常',
			          type: 'error'
			        });
				})
			},
			//新增快借还款提交
			newKJSubmit(){
				this.newkjSubmit = true;
				var this1 = this;
				this.newKJSubmitParams = {
					borrow_id:this1.newKJRepaymentsParams.borrow_id,
					min:this1.newKJRepaymentsData.min,
					max:this1.newKJRepaymentsData.max,
					orderids:this1.newKJRepaymentsData.orderids,
					user_id:this1.userId,
					card:this1.kjcardListNum,
					money:this1.KJrechargeMoney,
				};
				console.log(this.KJrechargeMoney);
				if(this.newKJSubmitParams.money == ''){
					this.newkjSubmit = false;
					this.$message({
			          message: '请输入金额',
			          type: 'warning'
			        });
				}else if(!Number(this.KJrechargeMoney)){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入正确金额',
			          type: 'warning'
			        });
				}else{
					console.log(this.KJrechargeMoney);
					console.log(this.newKJSubmitParams);
					this.$api.newKJRepaymentsSubmit(this.newKJSubmitParams).then(res =>{},response => {
						console.log(response);
						this.newkjSubmit = false;
						if(response.data.resultCode==0){
							//关闭弹框
							this.newKJSubmitParams.money = '';
							this.repaymentSituation = false;
							this.$message({
					          message: '恭喜你，还款成功',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '还款失败',
					          type: 'error'
					       });
						}
					}).catch(val=>{
						this.newkjSubmit = false;
						//异常
						this.$message({
				          message: '服务器异常',
				          type: 'error'
				        });
					})
				}
					
			},
			//分期逾期列表
			fqtableList(){
				this.fqloading = true;
				this.$api.fqOverdue(this.fqtableDataparams).then(res => {}, response => {
					this.fqloading = false;
					this.fqtableData = response.data.returnObj.varList;
					this.pageSize2 = response.data.returnObj.totalCount
					console.log(this.fqtableData);
					for(let i=0;i<this.fqtableData.length;i++){
						switch(this.fqtableData[i].is_pay_off){
							case 0:
								this.fqtableData[i].is_pay_off = '未还清';
								break;
							case 3:
								this.fqtableData[i].is_pay_off = '部分还款';
								break;
						}
					}
				}).catch(val => {
					//异常
				})
			},
			topage2(target){
				this.fqtableDataparams = Object.assign(this.fqtableDataparams,target);
				console.log(this.fqtableDataparams);
				this.fqtableList();
			},
			//新增分期还款
			newFQRepayments(row){
				
				console.log(row);
				//设置参数请求数据
				
				this.newfqRepaymentsParams.user_id = row.user_id;
				this.newfqRepaymentsParams.stage_id = row.stage_id;
				this.$api.newfqRepayments(this.newfqRepaymentsParams).then(res => {}, response => {
					console.log(response);
					//显示弹框
					if(response.data.resultCode==0){
						this.bombToggle = true;
						this.newfqRepaymentsData = response.data.returnObj;
						this.XFQbasetableinfo = response.data.returnObj.stageList;
						this.fqcardListNum = this.newfqRepaymentsData.cardList[0].account;
					}else{
						this.$message({
				          message: '新增失败',
				          type: 'error'
				        });
					}
				}).catch(val => {
					//异常
					this.$message({
			          message: '服务器异常',
			          type: 'error'
			        });
				})
			},
			//新增分期还款提交
			newFQSubmit(){
				this.newfqSubmit=true;
				var newFQSubmitParams = {
					stage_id:this.newfqRepaymentsParams.stage_id,
					min:this.newfqRepaymentsData.min,
					money:this.FQrechargeMoney,
					max:this.newfqRepaymentsData.max,
					user_id:this.newfqRepaymentsParams.user_id,
//					card:this.newfqRepaymentsData.cardList[this.FQbomBackRadioIndex].account,
					card:this.fqcardListNum,
					orderids:this.newfqRepaymentsData.orderids,
				};
				console.log(this.FQrechargeMoney);
				
				if(this.FQrechargeMoney==""){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入金额',
			          type: 'warning'
			        });
				}else if(!Number(this.FQrechargeMoney)){
					this.newfqSubmit=false;
					this.$message({
			          message: '请输入正确金额',
			          type: 'warning'
			        });
				}else{
					this.$api.newfqRepaymentsSubmit(newFQSubmitParams).then(res=> {}, response => {
						this.newfqSubmit=false;
						console.log(response);
						if(response.data.resultCode==0){
							//关闭弹框
							this.bombToggle = false;
							this.FQrechargeMoney ="";
							this.$message({
					          message: '恭喜你，还款成功',
					          type: 'success'
					        });
						}else{
							this.$message({
					          message: '还款失败',
					          type: 'error'
					       });
						}
						
						
					}).catch(val => {
						this.newfqSubmit=false;
						//异常
						this.$message({
				          message: '服务器异常',
				          type: 'error'
				        });
					})
				}
			},
			//新增分期还款列表   详情列表
			XFQbasetableDetails(row){
				this.bombToggleDetails = true;
				this.XFQloading = true;
				this.XFQtableDataparams.stage_detail_id = row.stage_detail_id;
				this.$api.fqOverdueDetails(this.XFQtableDataparams).then(res => {}, response => {
					this.XFQloading = false;
					console.log(response)
					if(response.data.resultCode == 0){
						this.XFQtableinfoDetails = response.data.returnObj.varList;
						this.XFQpagesize =  response.data.returnObj.totalCount || this.XFQtableinfoDetails.length;
						for(let i=0;i<this.XFQtableinfoDetails.length;i++){
							switch(this.XFQtableinfoDetails[i].payment_way)
							{
								case 0:
									this.XFQtableinfoDetails[i].payment_way = '主动还款';
									break;
								case 1:
									this.XFQtableinfoDetails[i].payment_way = '系统自动扣款';
									break;
								case 2:
									this.XFQtableinfoDetails[i].payment_way = '催收代扣';
									break;
								case 3:
									this.XFQtableinfoDetails[i].payment_way = '线下还款';
									break;
							}
						}
					}
				}).catch(val => {
					//异常
				})
			
			},
			XFQtopage(target){
				this.XFQtableDataparams = Object.assign(this.XFQtableDataparams,target);
				this.XFQbasetableDetails();
			},
			//还款情况
			repaymentsSituation(row) {
				if(row.stage_id){
					this.$router.push({
						name:'还款详情',
						params:{
							action:1,
							borrowId:0,
							stage_id:row.stage_id,
						}
					});
				}else{
					this.$message({
			           message: '查询失败',
			           type: 'error'
			        });
				}
			},
		    
		    
		}
	}
</script>

<style lang="less" scoped>
	.newFeedback{
		width: 100%;
		textarea{
			display: inline-block;
			width: 95%;
			height: 130px;
			background:#fff7f3;
			border: none;
			outline: none;
			padding: 10px;
		}
		.remarkInput{
			height: 50px !important;
		}
		p span{
			color: #34caf3;
		}
		.callStart{
			display: inline-block;
		}
	}
	/*认证信息*/
	.info-content {
		// position: fixed;
		// top: 120px;
		// z-index: 1000;
		// height: 120px;
		// width: 86%;
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
			background: url(../../../assets/img/infoheaderbg.png) no-repeat;
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
		padding-bottom: 50px;
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
			    	width: 70%;
			    	vertical-align: top;
			    }
			    .renzhengItemRight{
			    	display: inline-block;
			    	width: 29%;
			    	vertical-align: top;
			    	max-height: 800px;
			    	overflow: auto;
			    	margin: 20px 0;
			    	border: 1px solid #8a8a8a;
    				background: #eee;
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
	
	/*待还款情况*/
	.stayRepayment {
		margin: 50px 0 100px;
		.tabTitle {
			background: #d2f3fe;
			border-radius: 20px 20px 0 0;
			padding-left: 65px;
			text-align:left;
			span {
				cursor: pointer;
				display: inline-block;
				padding: 0 15px;
				line-height: 45px;
			}
		}
		.tabTitCur {
			background: #2ac9f3;
			color: #FFFFFF;
		}
		.stayRepaymentCont {
			border-top: 2px solid #30c9f3;
			border: 1px solid #30c9f3;
			div {
				margin: 60px 0 80px;
				text-align: center;
			}
			.elBtn {
				display: inline-block;
			}
		}
	}
	.bomb {
		.bombTop {
			text-align: left;
			padding: 15px 25px;
			border-bottom: 1px solid #fff7f3;
			i {
				cursor: pointer;
				float: right;
				font-size: 25px;
			}
		}
		.bombCont {
			/*padding: 5px 30px;*/
		}
		.bombContTop {
			text-align: left;
			padding: 0px 0 20px;
			div {
				display: inline-block;
				width: 240px;
			}
		}
		.bombData {
			width: 100%;
		}
		.bombBottom {
			text-align: left;
			.bombBackTit {
				display: inline-block;
				padding: 15px 0;
			}
			.bombBack {
				div {
					margin-bottom: 15px;
					input {
						background: #FFFFFF;
						appearance: none;
						-webkit-appearance: none;
						border-style: none;
						outline: none;
					}
					.icon-xuanzhong {
						color: #30c9f3;
					}
					.checkedSpan {
						color: #30c9f3;
					}
					.backmor {
						display: inline-block;
						background: #30c9f3;
						color: #FFFFFF;
						line-height: 18px;
						padding: 0 8px;
						border-radius: 5px;
					}
				}
			}
			.bombPut {
				div {
					margin-bottom: 15px;
					.bombmoneyTit {
						width: 80px;
						display: inline-block;
						text-align: right;
						vertical-align: bottom;
					}
					.bombmoneyPrompt {
						color: #868686;
						span {
							color: #f83030;
						}
					}
					input {
						width: 190px;
						border: none;
						border-bottom: 1px solid #333333;
						outline: none;
						font-size: 30px;
						color: #f27420;
					}
					textarea {
						margin: 0 15px;
						outline: none;
						border: none;
						background: #fff7f3;
						width: 740px;
						height: 72px;
					}
				}
				.bombRemark .bombmoneyTit {
					vertical-align: top;
				}
			}
		}
		.bombBtn {
			text-align: center;
			padding: 15px 0 30px;
		}
	}
	
	.dialog-footer {
		display: block;
		text-align: center;
	}
	
	.repaymentS {
		width: 100%;
		margin: auto;
		background: #FFFFFF;
		.bombTop {
			text-align: left;
			padding: 10px 10px;
			border-bottom: 1px solid #fff7f3;
			i {
				cursor: pointer;
				float: right;
				font-size: 25px;
			}
		}
		.bombCont {
			padding: 5px 15px;
		}
		.bombContTop {
			text-align: left;
			padding: 10px 0;
			div {
				display: inline-block;
				width: 150px;
			}
		}
		.bombBottom {
			text-align: left;
			padding: 0 15px;
			.bombBackTit {
				display: inline-block;
				padding: 10px 0;
			}
			.bombBack {
				div {
					margin-bottom: 10px;
					input {
						background: #FFFFFF;
						appearance: none;
						-webkit-appearance: none;
						border-style: none;
						outline: none;
					}
					.icon-xuanzhong {
						color: #30c9f3;
					}
					.checkedSpan {
						color: #30c9f3;
					}
					.backmor {
						display: inline-block;
						background: #30c9f3;
						color: #FFFFFF;
						line-height: 18px;
						padding: 0 8px;
						border-radius: 5px;
					}
				}
			}
			.bombPut {
				div {
					margin-bottom: 15px;
					.bombmoneyTit {
						width: 80px;
						display: inline-block;
						vertical-align: bottom;
					}
					.bombmoneyPrompt {
						display: block;
						padding-left: 80px;
						color: #868686;
						span {
							color: #f83030;
						}
					}
					input {
						width: 190px;
						border: none;
						border-bottom: 1px solid #333333;
						outline: none;
						font-size: 30px;
						color: #f27420;
					}
					textarea {
						width: 100%;
						outline: none;
						border: none;
						background: #fff7f3;
						height: 72px;
						margin-top: 15px;
					}
				}
				.bombRemark {
					vertical-align: top;
				}
			}
			.bombBtn {
				text-align: center;
				padding: 0px 0 20px;
			}
		}
	}
	.el-radio-group{
		display: block;
		font-size: 14px;
		.el-radio{
			line-height: 2;
		}
	}
</style>