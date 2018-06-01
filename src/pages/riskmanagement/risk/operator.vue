<template>
	<div class="operator">
		<!-- <div class="operatorMation" v-if="authitem">
			<div class="mationTitle">
				<div>
					<span>实名情况：</span>
					<span v-if="authitem.identity_agreement==0">已实名</span>
					<span v-if="authitem.identity_agreement==1">未实名</span>
					<span v-if="!authitem.identity_agreement&&authitem.identity_agreement!=0"></span>
				</div>
				<div>
					<span>归属地：</span><span v-text="authitem.attribution"></span>
				</div>
				<div>
					<span>余额：</span><span v-text="authitem.balance"></span>
				</div>
				<div>
					<span>平均月消费：</span><span v-text="authitem.consumption_avge_amount"></span>
				</div>
				<div>
					<span>入网时间：</span><span v-text="authitem.in_net_time"></span>
				</div>
			</div>
			<div class="mationCont">
				<ul>
					<li><span>账单开始时间：</span><span v-text="authitem.bill_start_date"></span></li>
					<li><span>账单结束时间：</span><span v-text="authitem.bill_end_date"></span></li>
					<li><span>最近一个月账单金额：</span><span v-text="authitem.recently_month_bill_amount"></span></li>
					<li><span>最大月账单金额：</span><span v-text="authitem.bill_max_amount"></span></li>
					<li><span>是否经常与注册地通话：</span><span v-text="authitem.recently_month_bill_amount"></span></li>
					<li><span>是否经常在注册地通话：</span><span v-text="authitem.recently_month_bill_amount"></span></li>
					<li><span>是否经常与户籍所在地通话：</span><span v-text="authitem.recently_month_bill_amount"></span></li>
					<li><span></span><span></span></li>
				</ul>
			</div>
		</div> -->
<!-- 		<div class="callDetails">
			<span class="callDetailsName">通话详单</span>
			<div class="detailsChartsTit">
				<div>
					<span>与通讯录匹配度 （%标识）：</span><span v-text="authitem.address_list_match_degree"></span>
				</div>
				<div>
					<span>家人通话次数：</span><span v-text="authitem.family_call_num"></span>
				</div>
				<div>
					<span>特殊标识的通话次数：</span><span v-text="authitem.special_identification_num"></span>
				</div>
			</div>
			<div id="detailsCharts">
				<echart :echartsData="detailsCharts"></echart>
			</div>
		</div>
		<div class="callNumber">
			<div><span class="callName">联系人通话次数</span></div>
			<div class="callNumCont">
				<el-table :data="mergemonth(authitem.oneMonth,authitem.threeMonth,authitem.sixMonth)" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
					<el-table-column prop="id"   label="月份" width="180" align="center"></el-table-column>
					<el-table-column prop="name" label="排名"  align="center">
					</el-table-column>
					<el-table-column prop="contacts_name" label="姓名" align="center"></el-table-column>
					<el-table-column prop="contacts_phone" label="电话" align="center"></el-table-column>
					<el-table-column prop="call_num" label="通话次数" align="center"></el-table-column>
				</el-table>
			</div>
		</div>
		<div class="callTypeMail">
			<div class="callType">
				<div><span class="callName">联系人通话类型分布</span></div>
				<div class="callCharts">
					<div id="maxCall"><echart :echartsData="maxCall"></echart></div>
					<div id="callCalling"><echart :echartsData="callCalling"></echart></div>
					<div id="callCalled"><echart :echartsData="callCalled"></echart></div>
				</div>
			</div>
			<div class="mailPosition">
				<div><span class="callName">联系人地理位置</span></div>
				<div class="positionChartsBox">
					<div id="positionCharts"><echart :echartsData="positionCharts"></echart></div>
				</div>
			</div>
		</div>
		<div class="callAnalysis">
			<div><span class="callName">通话详单饼状图分析</span></div>
			<div class="analysisCharts">
				<div id="analysisCharts1">
					<echart :echartsData="analysisChartsOne"></echart>
				</div>
				<div id="analysisCharts2">
					<echart :echartsData="analysisChartsTow"></echart>
				</div>
				<div id="analysisCharts3">
					<echart :echartsData="analysisChartsThree"></echart>
				</div>
				<div id="analysisCharts4">
					<echart :echartsData="analysisChartsFire"></echart>
				</div>
				<div id="analysisCharts5">
					<echart :echartsData="analysisChartsFive"></echart>
				</div>
				<div id="analysisCharts6">
					<echart :echartsData="analysisChartsSix"></echart>
				</div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
	    <div v-show="isshow" class="origininfo" v-loading="contantload">
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='基本信息'">
						<!-- <basetable v-if="usertype==0"  :basetabletitle="basetabletitle" :basetableinfo="baseinfo"   :showopera='false' ></basetable>
						<basetable v-if="usertype==1"  :basetabletitle="basetabletitle2" :basetableinfo="baseinfo"   :showopera='false' ></basetable> -->
						<origintable v-if="usertype==0" :originTableTitel = "basetabletitle" :originTableInfo = "baseinfo" ></origintable>
						<origintable v-if="usertype==1" :originTableTitel = "basetabletitle2" :originTableInfo = "baseinfo" ></origintable>
					</div>
					<div v-show="item.name=='通话记录分析'">
						<div class="taginfoout">
							<el-tag  type="danger"><span>与通讯录匹配比:</span>{{bookMatching}}</el-tag>
						</div>
						<origintable v-if="usertype==0" :originTableTitel = "mailertitle" :originTableInfo = "mailerinfo" ></origintable>
						<origintable v-if="usertype==1" :originTableTitel = "mailertitle2" :originTableInfo = "mailerinfo" ></origintable>
						<!--<basetable v-if="usertype==0" :basetabletitle="mailertitle" :basetableinfo="mailerinfo"   :showopera='false' :mheight='800'></basetable>
						<basetable v-if="usertype==1" :basetabletitle="mailertitle2" :basetableinfo="mailerinfo"   :showopera='false' :mheight='800'></basetable>-->
					</div>
					<div v-show="item.name=='消费分析'" style="width:100%;">
						<origintable :originTableTitel = "costtitle" :originTableInfo = "costinfo"></origintable>
						
						<!--<basetable :basetabletitle="costtitle" :basetableinfo="costinfo"   :showopera='false' :mheight='800' ></basetable>-->
					</div>
					<div v-show="item.name=='通话详情'" style="width:100%;">
						<origintable v-if="usertype==0" :originTableTitel = "convertitle" :originTableInfo = "converinfo"></origintable>
						<origintable v-if="usertype==1" :originTableTitel = "convertitle2" :originTableInfo = "converinfo"></origintable>
						
						<!--<basetable v-if="usertype==0" :basetabletitle="convertitle" :basetableinfo="converinfo"   :showopera='false' :mheight='800'></basetable>
						<basetable v-if="usertype==1" :basetabletitle="convertitle2" :basetableinfo="converinfo"   :showopera='false' :mheight='800'></basetable>
						<basepage  :sunmary="converinfopagesize" v-on:topage="topage"></basepage>-->
					</div>
					<div v-show="item.name=='通话详情统计'" style="width:100%;">
						<origintable :originTableTitel = "conver_detailtitle" :originTableInfo = "conver_detitlinfo"></origintable>
						
						<!--<basetable :basetabletitle="conver_detailtitle" :basetableinfo="conver_detitlinfo"   :showopera='false' :mheight='800'></basetable>-->
					</div>
					<div v-show="item.name=='通话偏好统计'" v-if="usertype==0">
						<origintable :originTableTitel = "conver_pretitle" :originTableInfo = "conver_preinfo"></origintable>
						
						<!--<basetable :basetabletitle="conver_pretitle" :basetableinfo="conver_preinfo"   :showopera='false' :mheight='800'></basetable>-->
					</div>
					<div v-show="item.name=='通话统计'" style="width:100%;" v-if="usertype==0">
						<origintable :originTableTitel = "conversattitle" :originTableInfo = "conversatinfo"></origintable>
						
						<!--<basetable :basetabletitle="conversattitle" :basetableinfo="conversatinfo"   :showopera='false' :mheight='800'></basetable>-->
					</div>
					<div v-show="item.name=='联系人区域分析'">
						<origintable v-if="usertype==0" :originTableTitel = "contactstitle" :originTableInfo = "contactsinfo"></origintable>
						<origintable v-if="usertype==1" :originTableTitel = "contactstitle2" :originTableInfo = "contactsinfo"></origintable>
						
						<!--<basetable v-if="usertype==0" :basetabletitle="contactstitle" :basetableinfo="contactsinfo"   :showopera='false' :mheight='800'></basetable>
						<basetable v-if="usertype==1" :basetabletitle="contactstitle2" :basetableinfo="contactsinfo"   :showopera='false' :mheight='800'></basetable>-->
					</div>
					<!--<div v-show="item.name=='特定需求分析'">
						<basetable :basetabletitle="specifictitle" :basetableinfo="specificinfo"   :showopera='false' ></basetable>
					</div>-->
				</el-tab-pane>
		    </el-tabs>
	    </div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>

<script>
	import cloudsubmit from './cloudsubmit'
	import basetable from '@/components/basetable'
	import basepage  from '@/components/basepage'
	import origintable from '@/components/origintable'
	import { mapGetters } from 'vuex'
	import { isEmptyObject} from '@/utils/index'
	// import echart from '@/components/charts/echart'
	export default {
		name: 'operator',
		// components: { cloudsubmit,echart,basetable },
		components: { cloudsubmit,basetable,basepage,origintable },
		props:{
           authitem:Object || Array
		},
		data(){
			return {
				contantload:false,
				//通话详单
				// detailsCharts:{},
				// //联系人通话类型
				// maxCall:{},
				// callCalling:{},
				// callCalled:{},
				// //地理位置
				// positionCharts:{},
				// //电话详单
				// analysisChartsOne:{},
				// analysisChartsTow:{},
				// analysisChartsThree:{},
				// analysisChartsFire:{},
				// analysisChartsFive:{},
				// analysisChartsSix:{},

				infotxt:"查看原始数据",
				isshow:false,
				usertype:0,//0数立 1黑格
                roleList:[
                  { name:'基本信息'},
                  { name:'通话记录分析'},
                  { name:'消费分析'},
                  { name:'通话详情'},
                  { name:'通话详情统计'},
                  { name:'通话偏好统计'},
                  { name:'通话统计'},
                  { name:'联系人区域分析'}
                ],
                roleList2:[
                  { name:'基本信息'},
                  { name:'通话记录分析'},
                  { name:'消费分析'},
                  { name:'通话详情'},
                  { name:'通话详情统计'},
                  { name:'联系人区域分析'}
                ],
                activeName:'基本信息',
                //基本信息
                basetabletitle:[
                  {   label:'实名认证', prop:'user_name'},
                  {   label:'身份证号', prop:'user_card'},
                  {   label:'手机号', prop:'user_tel'},
                  {   label:'入网时间', prop:'inNetDate'},
                  {   label:'等级', prop:'vipLevel'},
                  {   label:'网龄', prop:'netAge'},
                  {   label:'积分', prop:'pointValue'},
                  {   label:'运营商类型', prop:'type'},
                  {   label:'通讯录匹配比', prop:'bookMatching'}
                ],
                basetabletitle2:[
                  {   label:'实名认证', prop:'realName'},
                  {   label:'身份证号', prop:'certNo'},
                  {   label:'手机号', prop:'phoneNo'},
                  {   label:'入网时间', prop:'inNetDate'},
                  {   label:'等级', prop:'vipLevel'},
                  {   label:'网龄', prop:'netAge'},
                  {   label:'积分', prop:'pointValue'},
                  {   label:'运营商类型', prop:'operator'},
                  {   label:'通讯录匹配比', prop:'bookMatching'}
                ],
                baseinfo:[],
                //通话记录分析
                //与通讯录匹配比
                bookMatching:'',
                mailertitle:[//数立
                  { label:'电话号码',  prop:'phone'},  
                  { label:'姓名',      prop:'phoneName'},
                  { label:'通话时长',  prop:'alltimes'},
                  { label:'通话次数',  prop:'allcounts'},
                  { label:'号码归属地',prop:'area'},
                  { label:'主叫次数',  prop:'dialingcount'},
                  { label:'被叫次数',  prop:'calledcount'},
                ],
                mailertitle2:[//黑格
                  { label:'电话号码',  prop:'phoneNo'},  
                  { label:'姓名',      prop:'name'},
                  { label:'通话时长',  prop:'connTime'},
                  { label:'通话次数',  prop:'connTimes'},
                  { label:'号码归属地',prop:'belongArea'},
                  { label:'主叫次数',  prop:'calledTimes'},
                  { label:'被叫次数',  prop:'callTimes'},
                ],
                mailerinfo:[],
                //消费记录
                costtitle:[
                	{label:'账单时间', prop:'month'},
                	{label:'账单金额', prop:'billMonthAmt'}
                ],
                costinfo:[],
                //通话详情
                convertitle:[//数立
                 { label:'对方电话', prop:'voiceToNumber'},
                 { label:'对方姓名', prop:'phoneName'},
                 { label:'通话类型', prop:'voiceType'},
                 { label:'通话时长', prop:'voiceDuration'},
                 { label:'通话时间', prop:'voiceDate'},
                 { label:'主叫地址', prop:'voicePlace'}
                ],
                convertitle2:[ //黑格
                 { label:'对方电话', prop:'othernum'},
                 { label:'对方姓名', prop:'name'},
                 { label:'通话类型', prop:'calltypeName'},
                 { label:'通话时长', prop:'calllonghour'},
                 { label:'通话时间', prop:'calltime'},
                 { label:'主叫地址', prop:'calledhome'}
                ],
                converinfo:[],
                converinfopagesize:0, //
                //通话详情统计
                conver_detailtitle:[
                 {label:'电话',prop:'phone'},
                 {label:'姓名',prop:'name'},
                 {label:'次数',prop:'times'}
                ],
                conver_detitlinfo:[],
                //通话偏好统计
                conver_pretitle:[
                	{label:'双向通话人数比例',prop:'rsm_tel_sta_vc_both_num_per'},
                	{label:'时段1（0-7）通话次数比例',prop:'tel_in_0_7_cnt_ratio'},
                	{label:'时段2（7-11）通话次数比例',prop:'tel_in_7_11_cnt_ratio'},
                	{label:'时段3（11-14）通话次数比例',prop:'tel_in_11_14_cnt_ratio'},
                	{label:'时段4（14-19）通话次数比例',prop:'tel_in_14_19_cnt_ratio'},
                	{label:'时段5（19-24）通话次数比例',prop:'tel_in_19_24_cnt_ratio'},
                	{label:'周中通话次数比例',prop:'rsm_tel_sta_vc_wd_cnt_per'},
                	{label:'周末通话次数比例',prop:'rsm_tel_sta_vc_hd_cnt_per'}
                ],
                conver_preinfo:[],
                //通话统计
                conversattitle:[
                	{label:'数据项',prop:'desc'},
                	{label:'值',prop:'value'},
                ],
                conversatinfo:[],
                //联系人区域分析
                contactstitle:[//数立
	                {label:'省份',prop:'prov1'},
	                {label:'通话次数',prop:'cnt1'},
	                {label:'通话次数比例',prop:'cnt_per1'},
	                {label:'联系人数',prop:'num1'},
	                {label:'联系人数比例',prop:'num_per1'},
	                {label:'高频联系人数',prop:'high_num1'},
	                {label:'高频联系人数比例',prop:'high_num_per1'},
	                {label:'城市',prop:'city1'}
                ],
                contactstitle2:[//黑格
	                {label:'地区',prop:'area'},
	                {label:'通话次数',prop:'totalNumber'},
	                {label:'主叫次数',prop:'callTimes'},
	                {label:'主叫时间',prop:'callTime'},
	                {label:'被叫次数',prop:'calledTimes'},
	                {label:'被叫时间',prop:'calledTime'},
	                {label:'占比',prop:'percent'}
                ],
                contactsinfo:[],
                converinfosave:[],
                //运营商总数据
                totalData:[]
			}
		},
		// mounted() {
		// 	if(!isEmptyObject(this.authitem)){
		// 		this.ECharts();
		// 	}else{
		// 		this.$watch('authitem',()=>{
		// 			if(!isEmptyObject(this.authitem)){
		// 				this.ECharts();
		// 			}
		// 		})
		// 	}
		// },
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
	                this.$fksh.getoriginalOperator({user_id:this.$route.params.user_id}).then(res=>{},response=>{
	                	this.contantload = false
		            	if(response.data.resultCode=='0'){
			                if((!response.data.returnObj)||(isEmptyObject(response.data.returnObj))){
			                	this.$message.warning(response.data.resultMsg)
                                return
			                }
			                this.usertype = response.data.returnObj.type ;
			                this.totalData = response.data.returnObj;
			                if(response.data.returnObj.type == 0){//数立 0 
			                	//基本信息
			                	this.baseinfo = []
	                            if(response.data.returnObj.consumptionInfo){
					                this.baseinfo.push(response.data.returnObj.consumptionInfo);
				                }
				                //通话记录分析
				                this.bookMatching = response.data.returnObj.consumptionInfo.bookMatching;
				                this.mailerinfo   = [];
				                if(response.data.returnObj.consumptionInfo.callLogAnalysis){
				                	this.mailerinfo = response.data.returnObj.consumptionInfo.callLogAnalysis;
				                }
				                //消费记录
				                this.costinfo=[];
				                if(response.data.returnObj.consumptionInfo.consumptionAnalysis){
				                	this.costinfo =response.data.returnObj.consumptionInfo.consumptionAnalysis;
				                }
				                //通话详情
//				                this.converinfo=[];
//				                if(response.data.returnObj.consumptionInfo.callDetails){
//				                	this.converinfopagesize = response.data.returnObj.consumptionInfo.callDetails.length
////				                	this.converinfo = response.data.returnObj.consumptionInfo.callDetails.slice(0,9);
//				                	this.converinfo = response.data.returnObj.consumptionInfo.callDetails;
//				                	this.converinfosave = response.data.returnObj.consumptionInfo.callDetails
//				                }
				                //通话详情统计
				                this.conver_detitlinfo=[];
				                if(response.data.returnObj.consumptionInfo.callDetailsStatistics){
				                	this.conver_detitlinfo = response.data.returnObj.consumptionInfo.callDetailsStatistics;
				                }
				                //通话偏好统计
				                this.conver_preinfo=[];
				                if(response.data.returnObj.th){
				                	this.conver_preinfo.push(response.data.returnObj.th)
				                	this.conver_preinfo.forEach(elem=>{
				                		elem.rsm_tel_sta_vc_both_num_per = (parseFloat(elem.rsm_tel_sta_vc_both_num_per)*100).toFixed(2)+'%'
				                		elem.tel_in_0_7_cnt_ratio        = (parseFloat(elem.tel_in_0_7_cnt_ratio)*100).toFixed(2)+'%'
				                		elem.tel_in_7_11_cnt_ratio       = (parseFloat(elem.tel_in_7_11_cnt_ratio)*100).toFixed(2)+'%'
				                		elem.tel_in_11_14_cnt_ratio      = (parseFloat(elem.tel_in_11_14_cnt_ratio)*100).toFixed(2)+'%'
				                		elem.tel_in_14_19_cnt_ratio      = (parseFloat(elem.tel_in_14_19_cnt_ratio)*100).toFixed(2)+'%'
				                		elem.tel_in_19_24_cnt_ratio      = (parseFloat(elem.tel_in_19_24_cnt_ratio)*100).toFixed(2)+'%'
				                		elem.rsm_tel_sta_vc_wd_cnt_per   = (parseFloat(elem.rsm_tel_sta_vc_wd_cnt_per)*100).toFixed(2)+'%'
				                		elem.rsm_tel_sta_vc_hd_cnt_per   = (parseFloat(elem.rsm_tel_sta_vc_hd_cnt_per)*100).toFixed(2)+'%'

				                	})
				                }
				                //通话统计
				                this.conversatinfo=[];
				                if(response.data.returnObj.liz){
				                	response.data.returnObj.liz.forEach(elem=>{
				                		elem.forEach(ele=>{
				                			this.conversatinfo.push(ele)
				                		})
				                	})
				                }
				                //联系人区域分析
				                this.contactsinfo=[];
				                if(response.data.returnObj.lxlist){
				                	response.data.returnObj.lxlist.forEach(elem=>{
				                		let mid = {}
				                		elem.forEach(ele=>{
				                		   if(ele.city2){
	                                           this.$set(ele,'city1',ele.city2)
	                                           this.$set(ele,'prov1',ele.prov2)
	                                           this.$set(ele,'cnt1',ele.cnt2)
	                                           this.$set(ele,'high_num1',ele.high_num2)
	                                           this.$set(ele,'cnt_per1',ele.cnt_per2)
	                                           this.$set(ele,'high_num_per1',ele.high_num_per2)
	                                           this.$set(ele,'num_per1',ele.num_per2)
	                                           this.$set(ele,'num1',ele.num2)
				                		   }else if(ele.city3){
	                                           this.$set(ele,'city1',ele.city3)
	                                           this.$set(ele,'prov1',ele.prov3)
	                                           this.$set(ele,'cnt1',ele.cnt3)
	                                           this.$set(ele,'high_num1',ele.high_num3)
	                                           this.$set(ele,'num1',ele.num3)
	                                           this.$set(ele,'cnt_per1',ele.cnt_per3)
	                                           this.$set(ele,'num_per1',ele.num_per3)
	                                           this.$set(ele,'high_num_per1',ele.high_num_per3)
				                		   }
	                                       mid = Object.assign(mid,ele)
				                		})
				                		this.contactsinfo.push(mid)
				                	})
				                	this.contactsinfo.forEach(elem=>{
				                		elem.cnt_per1      = (elem.cnt_per1*100).toFixed(2)+'%';
				                		elem.num_per1      = (elem.num_per1*100).toFixed(2)+'%';
				                		elem.high_num_per1 = (elem.high_num_per1*100).toFixed(2)+'%';
				                	})
			            		}
			                }else if(response.data.returnObj.type == 1){ //黑格
			                	this.roleList = this.roleList2
                                //基本信息
                                this.baseinfo = []
	                            if(response.data.returnObj.consumptionInfo){
					                this.baseinfo.push(response.data.returnObj.consumptionInfo);
				                }
				                //通话记录分析
				                this.bookMatching=response.data.returnObj.bookMatching;
				                this.mailerinfo=[];
				                if(response.data.returnObj.callLogAnalysis){
				                	this.mailerinfo = response.data.returnObj.callLogAnalysis;
				                }
				                //通话详情
//				                this.converinfo=[];
//				                if(response.data.returnObj.callDetail){
//				                	this.converinfopagesize = response.data.returnObj.callDetail.length
////				                	this.converinfo         = response.data.returnObj.callDetail.slice(0,9);
//				                	this.converinfo         = response.data.returnObj.callDetail;
//				                	this.converinfosave     = response.data.returnObj.callDetail
//				                }
				                //通话详情统计
				                this.conver_detitlinfo=[];
				                if(response.data.returnObj.statphone){
				                	this.conver_detitlinfo = response.data.returnObj.statphone;
				                }
				                //消费分析
				                this.costinfo=[];
				                if(response.data.returnObj.consumeInfo){
				                	this.costinfo =response.data.returnObj.consumeInfo;
				                	this.costinfo.forEach(elem=>{
				                		this.$set(elem,'billMonthAmt',elem.payMoney)
				                	})
				                }
				                //联系人区域分析
				                this.contactsinfo=[];
				                if(response.data.returnObj.contactAreaInfo){
				                    this.contactsinfo = response.data.returnObj.contactAreaInfo
				                    this.contactsinfo.forEach(elem=>{
				                		elem.percent = (elem.percent*100).toFixed(2)+'%';
				                	})
			            		}
			                }
		            	}else{
		            		this.contantload = false
		            		this.$message.error(response.data.resultMsg)
		            	}                                
			        }).catch(val=>{//捕获异常
			        	this.contantload = false
		                this.$message.error('服务器异常')
			        })
				}else{
					this.isshow  = false;
					this.infotxt = "查看原始数据";
				}
			},
			handleClick(tab, event) {//切换当前项
	      	    this.activeName = tab.name;
	      	    if(tab.name == '通话详情'){
	      	    	if(this.totalData.type == 0){//数立 0 
	      	    		 //通话详情
		                this.converinfo=[];
		                if(this.totalData.consumptionInfo.callDetails){
		                	this.converinfopagesize = this.totalData.consumptionInfo.callDetails.length
//				            this.converinfo = this.totalData.consumptionInfo.callDetails.slice(0,9);
		                	this.converinfo = this.totalData.consumptionInfo.callDetails;
		                	this.converinfosave = this.totalData.consumptionInfo.callDetails
		                }
	      	    	}else{   //黑格
	      	    		//通话详情
		                this.converinfo=[];
		                if(this.totalData.callDetail){
		                	this.converinfopagesize = this.totalData.callDetail.length
//				            this.converinfo         = this.totalData.callDetail.slice(0,9);
		                	this.converinfo         = this.totalData.callDetail;
		                	this.converinfosave     = this.totalData.callDetail
		                }
	      	    	}
	      	    }
	        },
	        topage(target){//跳页 通话详情
	        	this.converinfo = this.slicepage(this.converinfosave,target)
		    },
		    slicepage(alldata,target){//分页
                 return alldata.slice((target.currentPage-1)*target.showCount,target.currentPage*target.showCount-1)
		    },
			// mergemonth(one,three,six){
			// 	if(one&&three&&six&&one.length>0&&three.length>0&&six.length>0){
			// 		one.forEach((elem,index)=>{
			// 			this.$set(elem,'id','1')
			// 			this.$set(elem,'name',++index)
			// 		})
			// 		three.forEach(elem=>{
			// 			this.$set(elem,'id','3')
			// 			this.$set(elem,'name',++index)
			// 		})
			// 		six.forEach(elem=>{
			// 			this.$set(elem,'id','6')
			// 			this.$set(elem,'name',++index)
			// 		})
	  //              return Object.assign(one,three,six);
			// 	}
			// },
			// ECharts() {
			// 	// 通话详单
			// 	this.detailsCharts = {
			// 		id:'detailsCharts',
			// 		echartstyle:{
			// 			width: '670px',
			// 			height: '125px'
			// 		},
			// 		echartsCont:{
			// 			tooltip: {
			// 				trigger: 'axis',
			// 				axisPointer: {
			// 					type: 'shadow'
			// 				}
			// 			},
			// 			grid: {
			// 				left: '3%',
			// 				right: '4%',
			// 				top: '0%',
			// 				height: '90%',
			// 				width: '85%',
			// 				containLabel: true
			// 			},
			// 			xAxis: {
			// 				type: 'value',
			// 				axisLine: {
			// 					lineStyle: {
			// 						color: '#0d867c'
			// 					}
			// 				},
			// 				boundaryGap: ['20%', '20%'],
			// 				axisLabel: {
			// 					formatter(value) {
			// 						return value + '%'
			// 					}
			// 				}
			// 			},
			// 			yAxis: {
			// 				type: 'category',
			// 				axisLine: {
			// 					lineStyle: {
			// 						color: '#0d867c',
			// 						fontSize: '16',
			// 					}
			// 				},
			// 				data: [{
			// 						value: 'Top10联系人通话次数占比',
			// 						textStyle: {
			// 							color: "#333",
			// 						}
			// 					},
			// 					{
			// 						value: 'Top10联系人通话时间占比',
			// 						textStyle: {
			// 							color: "#333",
			// 						}
			// 					}
			// 				]
			// 			},
			// 			series: [{
			// 				type: 'bar',
			// 				barWidth: 24,
			// 				itemStyle: {
			// 					normal: {
			// 						color(params) {
			// 							let colorList = ['#919bcd', '#83d0f4']
			// 							return colorList[params.dataIndex]
			// 						}
			// 					}
			// 				},
			// 				data: [this.authitem.top10_contacts_call_num_proportion,this.authitem.top10_contacts_call_long_proportion],
			// 				label: {
			// 					normal: {
			// 						show: true,
			// 						position: 'right',
			// 						formatter: '{c}%'
			// 					}
			// 				}
			// 			}]
			// 		},
			// 	}
			// 	//联系人通话类型
			// 	this.maxCall = {
			// 		id:'maxCall',
			// 		echartstyle:{
			// 			width: '220px',
			// 			height: '315px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '通话次数最多城市比例',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '18',
			// 					fontWeight: 'normal'
			// 				}
	
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#0cbeb4', '#30c9f3'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			legend: {
			// 				orient: 'horizontal',
			// 				x: 'center',
			// 				width: '180',
			// 				data: ['北京', '上海', '深圳', '其他']
			// 			},
			// 			series: [
	
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['40%', '55%'],
			// 					data: [{
			// 							value: 335,
			// 							name: '北京'
			// 						},
			// 						{
			// 							value: 310,
			// 							name: '上海'
			// 						},
			// 						{
			// 							value: 234,
			// 							name: '深圳'
			// 						},
			// 						{
			// 							value: 234,
			// 							name: '其他'
			// 						}
			// 					],
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.callCalling = {
			// 		id:'callCalling',
			// 		echartstyle:{
			// 			width: '220px',
			// 			height: '315px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '主叫次数最多城市比例',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '18',
			// 					fontWeight: 'normal'
			// 				}
	
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#0cbeb4', '#30c9f3'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			legend: {
			// 				orient: 'horizontal',
			// 				x: 'center',
			// 				width: '180',
			// 				data: ['北京', '上海', '深圳', '其他']
			// 			},
			// 			series: [
	
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['40%', '55%'],
			// 					data: [{
			// 							value: 335,
			// 							name: '北京'
			// 						},
			// 						{
			// 							value: 310,
			// 							name: '上海'
			// 						},
			// 						{
			// 							value: 234,
			// 							name: '深圳'
			// 						},
			// 						{
			// 							value: 234,
			// 							name: '其他'
			// 						}
			// 					]
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.callCalled = {
			// 		id:'callCalled',
			// 		echartstyle:{
			// 			width: '220px',
			// 			height: '315px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '被叫次数最多城市比例',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '18',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#0cbeb4', '#30c9f3'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			legend: {
			// 				orient: 'horizontal',
			// 				x: 'center',
			// 				width: '180',
			// 				data: ['北京', '上海', '深圳', '其他']
			// 			},
			// 			series: [{
			// 				name: '访问来源',
			// 				type: 'pie',
			// 				radius: ['40%', '55%'],
			// 				data: [{
			// 						value: 335,
			// 						name: '北京'
			// 					},
			// 					{
			// 						value: 310,
			// 						name: '上海'
			// 					},
			// 					{
			// 						value: 234,
			// 						name: '深圳'
			// 					},
			// 					{
			// 						value: 234,
			// 						name: '其他'
			// 					}
			// 				],
			// 				top: '50',
			// 			}]
			// 		}
			// 	}
			// 	//通话详单饼状图分析
			// 	this.analysisChartsOne = {
			// 		id:'analysisChartsOne',
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title:{
			// 				text: '呼入、呼出平均时长',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color:['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip:{
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series:[
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [
			// 						{
			// 							value: this.authitem.avge_call_in_long,
			// 							name: '呼入平均时长'
			// 						},
			// 						{
			// 							value: this.authitem.avge_call_out_long,
			// 							name: '呼出平均时长'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.avge_call_in_long,
			// 							name: '呼入平均时长'
			// 						},
			// 						{
			// 							value: this.authitem.avge_call_out_long,
			// 							name: '呼出平均时长'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			],
			// 		},
			// 	};
			// 	this.analysisChartsTow = {
			// 		id:"analysisChartsTow",
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '呼入、呼出电话数',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series: [{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [{
			// 							value: this.authitem.call_in_num,
			// 							name: '呼入电话数'
			// 						},
			// 						{
			// 							value: this.authitem.call_out_num,
			// 							name: '呼出电话数'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.call_in_num,
			// 							name: '呼入电话数'
			// 						},
			// 						{
			// 							value: this.authitem.call_out_num,
			// 							name: '呼出电话数'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.analysisChartsThree = {
			// 		id:'analysisChartsThree',
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '呼入、呼出时长一分钟',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series: [{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [{
			// 							value: this.authitem.call_out_than60s_num,
			// 							name: '时长1分钟以上'
			// 						},
			// 						{
			// 							value:  this.authitem.call_out_under60s_num,
			// 							name: '时长1分钟以下'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.call_out_than60s_num,
			// 							name: '时长1分钟以上'
			// 						},
			// 						{
			// 							value:  this.authitem.call_out_under60s_num,
			// 							name: '时长1分钟以下'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.analysisChartsFire = {
			// 		id:'analysisChartsFire',
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '工作时段、晚间、夜间',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series: [{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [{
			// 							value: this.authitem.work_call_ratio,
			// 							name: '工作时段'
			// 						},
			// 						{
			// 							value: this.authitem.evening_call_ratio,
			// 							name: '晚间'
			// 						},
			// 						{
			// 							value: this.authitem.night_call_ratio,
			// 							name: '夜间'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.work_call_ratio,
			// 							name: '工作时段'
			// 						},
			// 						{
			// 							value: this.authitem.evening_call_ratio,
			// 							name: '晚间'
			// 						},
			// 						{
			// 							value: this.authitem.night_call_ratio,
			// 							name: '夜间'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.analysisChartsFive = {
			// 		id:'analysisChartsFive',
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '本地、省内、省外',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series: [{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [{
			// 							value: this.authitem.local_call_num,
			// 							name: '本地'
			// 						},
			// 						{
			// 							value:  this.authitem.province_call_num,
			// 							name: '省内'
			// 						},
			// 						{
			// 							value:  this.authitem.outside_province_call_num,
			// 							name: '省外'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.local_call_num,
			// 							name: '本地'
			// 						},
			// 						{
			// 							value:  this.authitem.province_call_num,
			// 							name: '省内'
			// 						},
			// 						{
			// 							value:  this.authitem.outside_province_call_num,
			// 							name: '省外'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.analysisChartsSix = {
			// 		id:'analysisChartsSix',
			// 		echartstyle:{
			// 			width:'170px',
			// 			height:'212px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '呼入、呼出人数',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '16',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			color: ['#e60012', '#f86b6b', '#f39a30'],
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			series: [{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['60%', '82%'],
			// 					data: [{
			// 							value: this.authitem.call_in_people_num,
			// 							name: '呼出'
			// 						},
			// 						{
			// 							value: this.authitem.call_out_people_num,
			// 							name: '呼入'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					},
			// 				},
			// 				{
			// 					name: '访问来源',
			// 					type: 'pie',
			// 					radius: ['0', '35%'],
			// 					data: [{
			// 							value: this.authitem.call_in_people_num,
			// 							name: '呼出'
			// 						},
			// 						{
			// 							value: this.authitem.call_out_people_num,
			// 							name: '呼入'
			// 						}
			// 					],
			// 					label: {
			// 						normal: {
			// 							show: false
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 	}
			// 	this.positionCharts = {
			// 		id:'positionCharts',
			// 		echartstyle:{
			// 			width: '700px',
			// 			height: '300px'
			// 		},
			// 		echartsCont:{
			// 			title: {
			// 				text: '被叫次数最多城市比例',
			// 				top: 'bottom',
			// 				x: 'center',
			// 				textStyle: {
			// 					fontSize: '18',
			// 					fontWeight: 'normal'
			// 				}
			// 			},
			// 			grid: {
			// 				show: true,
			// 			},
			// 			tooltip: {
			// 				trigger: 'item',
			// 				formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 			},
			// 			legend: {
			// 				orient: 'horizontal',
			// 				x: 'center',
			// 				width: '138px',
			// 				data: ['北京', '上海', '深圳', '其他']
			// 			},
			// 			xAxis: {
			// 				show: false,
			// 				data: ['墨脱县', '米林县', '察隅县', '巴宜区', '波密县', '工布达江县', '朗县'],
			// 				axisLabel: {
			// 					textStyle: {
			// 						color: '#999999',
			// 						//fontSize:'16'
			// 					},
			// 				},
			// 				axisLine: {
			// 					show: false
			// 				}
			// 			},
			// 			yAxis: {
			// 				show: false,
			// 				axisLabel: {
			// 					textStyle: {
			// 						color: '#999999',
			// 						//fontSize:'16'
			// 					},
			// 				},
			// 				axisLine: {
			// 					show: false
			// 				}
			// 			},
			// 			series: [{
			// 					type: 'bar',
			// 					barWidth: '20%',
			// 					data: [7000, 1200, 5000, 3000, 2000, 6000, 5600],
			// 					color: ['#91c7ae']
			// 				},
			// 				{
			// 					type: 'line',
			// 					data: [7000, 1200, 5000, 3000, 2000, 6000, 5600],
			// 					symbolSize: 5, //设置折现圆点的大小
			// 					color: ['#d48265'],
			// 				}
			// 			],
			// 		}
					
			// 	}
			// },
			// arraySpanMethod({
			// 	row,
			// 	column,
			// 	rowIndex,
			// 	columnIndex
			// }) {
			// 	if(rowIndex % 5 === 0) {
			// 		if(columnIndex === 0) {
			// 			return [1, 5];
			// 		} else if(columnIndex === 1) {
			// 			return [0, 0];
			// 		}
			// 	}
			// },
			// objectSpanMethod({
			// 	row,
			// 	column,
			// 	rowIndex,
			// 	columnIndex
			// }) {
			// 	if(columnIndex === 0) {
			// 		if(rowIndex % 5 === 0) {
			// 			return {
			// 				rowspan: 5,
			// 				colspan: 1
			// 			};
			// 		} else {
			// 			return {
			// 				rowspan: 0,
			// 				colspan: 0
			// 			};
			// 		}
			// 	}
			// },
		}
	}
</script>

<style lang="less" scoped>
	.operator {
		margin: 20px 20px 55px;
		box-sizing: border-box;
	}
	
	.operatorMation,
	.callDetails,
	.callNumber,
	.callTypeMail {
		display: inline-block;
		width: 47%;
		margin-right: 2%;
		vertical-align: top;
	}
	
	.operatorMation,
	.callNumber {
		margin-right: 3%;
	}
	
	.mationTitle {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-left: 18px;
		padding-top: 20px;
		font-size: 16px;
		div{
			width: 33%;
			text-align: left;
			margin-bottom: 5px;
			span:last-child {
				display: inline-block;
			}
		}
	}
	.mationCont {
		width: 100%;
		margin-top: 15px;
	}
	
	ul {
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: felx-start;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #30c9f3;
		border-right: 1px solid #30c9f3;
		li {
			width: 50%;
			box-sizing: border-box;
			list-style: none;
			text-align: left;
			padding-left: 18px;
			border-top: 1px solid #30c9f3;
			border-left: 1px solid #30c9f3;
			height: 38px;
			span {
				line-height: 38px;
			}
			span.labelname {
				display: inline-block;
				color: #333;
				font-size: 16px;
			}
		}
		li:nth-child(20) {
			border-bottom: 1px solid #30c9f3;
		}
		li:last-child {
			border-right: none;
		}
		li:nth-child(2n+1) {
			background-color: #f0f9fc;
		}
	}
	
	.callDetailsName {
		display: inline-block;
		font-size: 21.33px;
		border: 1px solid #30C9F3;
		padding: 0px 34px;
		line-height: 37px;
		border-radius: 5px;
		background: #f0f9fc;
	}
	
	#detailsCharts {
		width: 670px;
		height: 125px;
	}
	
	.detailsChartsTit {
		width: 100%;
		padding: 16px 0;
		padding-left: 2.5%;
	}
	
	.detailsChartsTit div {
		display: inline-block;
	}
	
	.callName {
		display: inline-block;
		font-size: 21.33px;
		border: 1px solid #30C9F3;
		padding: 0px 34px;
		line-height: 37px;
		border-radius: 5px;
		background: #f0f9fc;
		margin: 25px 0 10px;
	}
	
	.callCharts {
		margin: 20px 0;
		width: 100%;
	}
	
	.callCharts div {
		display: inline-block;
		width: 220px;
		height: 315px;
	}
	
	.positionChartsBox {
		width: 100%;
	}
	
	#positionCharts {
		width: 700px;
		height: 300px;
	}
	
	.analysisCharts {
		width: 96%;
		border: 2px solid #f9f9f9;
		margin: 1% 2% 0;
	}
	
	.callAnalysis {
		margin-bottom: 60px;
	}
	
	.analysisCharts div {
		display: inline-block;
		width: 170px;
		height: 212px;
		margin: 25px 30px;
		margin-top: 0;
		vertical-align: top;
	}
	.taginfoout{
		height: 50px;
		text-align: left;
	}
	.extable{
		overflow: auto;
		border-bottom:1px solid #30c9f3;
	}
	.extable table{
	}
	.extable thead{
		width: 100%;
	}
	.tab{
		/*border: none;*/
		border-collapse:collapse;
		th{
			border:1px solid #30c9f3;
			color: #5a5e66;
			line-height: 2;
			font-family: "微软雅黑";
			font-weight: 500;
		}
		td{
			border:1px solid #30c9f3;
			color: #5a5e66;
			font-size: 14px;
			padding: 7px 0;
			/*border-right: 0px;*/
		}
	}
</style>