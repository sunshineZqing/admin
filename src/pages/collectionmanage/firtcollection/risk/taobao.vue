<template>
	<div class="taobao">
		<!-- <div class="taobaoCont"  v-if="authitem">
			<div class="mationCont">
				<ul>
					<li><span>身份证与姓名是否一致</span><span v-if="authitem.identity_agreement==0">一致</span><span v-if="authitem.identity_agreement==1">不一致</span><span v-if="!authitem.identity_agreement"></span></li>
					<li><span>花呗总额度</span><span v-text="authitem.ant_check_later_total"></span></li>
					<li><span>余额宝余额</span><span v-text="authitem.yu_e_bao_balance"></span></li>
					<li><span>订单总额</span><span v-text="authitem.order_total_money"></span></li>
					 
					<li><span>手机号与注册手机号是否一致</span><span v-if="authitem.phone_agreement==0">一致</span><span v-if="authitem.phone_agreement==1">不一致</span><span v-if="!authitem.phone_agreement"></span></li>
					<li><span>花呗余额</span><span v-text="authitem.ant_check_later_balance"></span></li>
					<li><span>订单总量</span><span v-text="authitem.order_total"></span></li>
					<li><span>平均每笔消费</span><span v-text="authitem.average_consumption"></span></li>
				</ul>
			</div>
			<div class="taobaoInfor">
				<div class="taobaoInforPie">
					<div id="taobaoInforPie"></div>
				</div>
				<div class="taobaoInforBar">
					<div id="taobaoInforBar"></div>
				</div>
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
	    <div v-show="isshow" v-loading='contantload'>
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='基本信息'">
						<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"   :showopera='false' ></basetable>
					</div>
					<div v-show="item.name=='收货地址'">
						<div class="tbtaginfoout">
							<el-tag class="" type="danger"><span>数量：</span>{{addressnum}}</el-tag>
						</div>
						<basetable :basetabletitle="addresstitle" :basetableinfo="addressinfo" :mheight='800'  :showopera='false' ></basetable>
					</div>
					<div v-show="item.name=='订单详情'">
						<div class="tbtaginfoout">
							<el-tag class="" type="danger"><span>订单总量：</span>{{orderNum}}</el-tag>
							<el-tag class="" type="danger"><span>有效订单总量：</span>{{validOrderSize}}</el-tag>
							<el-tag class="" type="danger"><span>有效订单总额：</span>{{orderPriceAll}}</el-tag>
							<el-tag class="" type="danger"><span>平均每笔消费：</span>{{orderPriceAVG}}</el-tag>
						</div>
						<br />
						<div class="tableStyle">
							<div class="tablestyleTitle">
								<div class="tablestyleTitleItem" style="width:50px">
									<span>序号</span>
								</div><div v-for="item in ordertitle" class="tablestyleTitleItem" :style="{width:item.width}">
									<span>{{item.label}}</span>
								</div>
							</div>
							<div class="tablestyleBody"  v-if="orderinfo.length != 0">
								<div class="tablestyleBodyLine" v-for="(item,index) in orderinfo">
									<div class="tablestyleBodyLineItem">
										<div class="" style="width:50px">
											<span>{{++index}}</span>
										</div><div class="" v-for="item2 in ordertitle" :style="{width:item2.width}">
											<span>{{item[item2.prop]}}</span>
										</div>
									</div><div class="tablestyleBodyLinedetail">
										<div class="" v-for="item3 in item.orderProducts">
											<span>商品名称：{{item3.productName}} | 商品价格：{{item3.productPrice}}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="tablestyleBody" v-else>
								暂无数据
							</div>
						</div>
						<!--<basetable :basetabletitle="ordertitle" :basetableinfo="orderinfo" :showopera='false' :expandshow='true' :mheight='800' :isexpand="isexpand">
							<template slot-scope="props" slot="expand">
								<div>
									<p  v-for="(item,index) in props.scope.row.orderProducts" :key="index" class="products">
										<span>商品名称：</span><span>{{item.productName}}</span> <span style="color:red;">|</span>
										<span>商品价格：</span><span>{{item.productPrice}}</span> 
									</p>
								</div>
					        </template>
						</basetable>
						<basepage  :sunmary="orderinfopagesize" v-on:topage="topage"></basepage>-->
					</div>
				</el-tab-pane>
		    </el-tabs>
		    
	    </div>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage  from '@/components/basepage'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default{
		name:'taobao',
		components:{basetable,basepage},
		props:{
           authitem:Object || Array
		},
		data(){
            return {
            	isexpand:true,
            	contantload:false,
            	infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'基本信息'},
                  { name:'收货地址'},
                  { name:'订单详情'}
                ],
                activeName:'基本信息',
                basetabletitle:[
                  {   label:'真实姓名', prop:'name'},  
                  {   label:'姓名校验', prop:'name_flag'}, 
                  {   label:'身份证号', prop:'certCard'},  
                  {   label:'身份校验', prop:'certCard_flag'},  
                  {   label:'淘宝信用等级', prop:'taobaoLevel'},  
                  {   label:'手机号',   prop:'phone'},  
                  {   label:'手机号校验',   prop:'phone_flag'},  
                  {   label:'花呗总额度',   prop:'huabeiTotalAmount'},  
                  {   label:'淘宝信用分',   prop:'buyerCreditPoint'},  
                  {   label:'会员等级',   prop:'creditLevel'},  
                  {   label:'花呗余额',   prop:'huabeiCanUseMoney'},
                  {   label:'余额宝余额',   prop:'aliPaymFund'}
                ],
                baseinfo:[],
                addresstitle:[
                  {   label:'收货人', prop:'addres_name'},  
                  {   label:'电话',   prop:'addres_phone'},  
                  {   label:'收货地址', prop:'addres_addrs'}
                ],
                addressinfo:[],
                addressnum:0,
                ordertitle:[
                  {   label:'订单编号', prop:'orderid',width:'400px'},  
                  {   label:'订单日期', prop:'businessDate',width:'400px'},  
                  {   label:'订单总额', prop:'orderTotalPrice',width:'400px'},
                  {   label:'订单状态', prop:'orderStatus',width:'390px'}
                ],
                orderinfo:[],
                orderinfosave:[],
                orderinfopagesize:0,
                orderNum:0, //订单总数
                validOrderSize:0,//有效订单总量
                orderPriceAVG:0,//订单均价
                orderPriceAll:0//总金额
            }
		},
		// mounted(){
		// 	if(!isEmptyObject(this.authitem)){
		// 		this.taobaoInforPie();
		// 		this.taobaoInforBar();
		// 	}else{
		// 		this.$watch('authitem',()=>{
		// 			this.taobaoInforPie();
		// 			this.taobaoInforBar();
		// 		})
		// 	}
		// },
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
	                this.$fksh.getoriginaltaobao({user_id:this.$route.params.user_id}).then(res=>{},response=>{
	                	this.contantload = false
		            	if(response.data.resultCode=='0'){
			            	//基本信息
			            	if(response.data.returnObj.personInfo){
			            		switch(response.data.returnObj.personInfo.name_flag){ //姓名校验
	                               case '0':response.data.returnObj.personInfo.name_flag = '一致';break;
	                               case '1':response.data.returnObj.personInfo.name_flag = '不一致';break;
			            		}
			            		switch(response.data.returnObj.personInfo.certCard_flag){//身份校验
	                               case '0':response.data.returnObj.personInfo.certCard_flag = '一致';break;
	                               case '1':response.data.returnObj.personInfo.certCard_flag = '不一致';break;
			            		}
			            		switch(response.data.returnObj.personInfo.phone_flag){//手机号校验
	                               case '0':response.data.returnObj.personInfo.phone_flag = '一致';break;
	                               case '1':response.data.returnObj.personInfo.phone_flag = '不一致';break;
			            		}
                                this.baseinfo.push(response.data.returnObj.personInfo)
			            	}
			            	//收货地址
		            		if(response.data.returnObj.addressList){
			            		this.addressinfo = response.data.returnObj.addressList
			            		this.addressnum  = response.data.returnObj.addressList[response.data.returnObj.addressList.length-1]
			            		this.addressinfo.length = this.addressinfo.length-1
		            		}
		            		//订单详情
		            		
		            		if(response.data.returnObj.newOrderList){
			            		this.orderNum           = response.data.returnObj.newOrderList[response.data.returnObj.newOrderList.length-1].orderNum
			            		this.validOrderSize     = response.data.returnObj.newOrderList[response.data.returnObj.newOrderList.length-1].validOrderSize
			            		this.orderPriceAVG      = response.data.returnObj.newOrderList[response.data.returnObj.newOrderList.length-1].orderPriceAVG
			            		this.orderPriceAVG      = this.orderPriceAVG.toFixed(2)
			            		this.orderPriceAll      = response.data.returnObj.newOrderList[response.data.returnObj.newOrderList.length-1].orderPriceAll
			            		this.orderPriceAll      = this.orderPriceAll.toFixed(2)
			            		this.orderinfosave      = response.data.returnObj.newOrderList
//			            		this.orderinfo          = response.data.returnObj.newOrderList.slice(0,9)
			            		this.orderinfo          = response.data.returnObj.newOrderList;
			            		this.orderinfo.length   = response.data.returnObj.newOrderList.length-1
			            		this.orderinfopagesize  = this.orderinfosave.length
		            		}
			            	
		            	}else{
		            		this.contantload = false
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
			        	console.log(val,45)
			        	this.contantload = false
		                this.$message.error('服务器异常')
			        })
				}else{
					this.isshow  = false
					this.infotxt = '查看原始数据'
				}
			},
			handleClick(tab, event) {//切换当前项
	      	    this.activeName = tab.name
	        },
	        topage(target){//跳页 通话详情
	        	this.orderinfo = this.slicepage(this.orderinfosave,target)
		    },
		    slicepage(alldata,target){//分页
                 return alldata.slice((target.currentPage-1)*target.showCount,target.currentPage*target.showCount-1)
		    },
			// taobaoInforPie(){
			// 	let reveiceadddressdata = [
   //                  {value:this.authitem.delivery_address_self_num, name:'本人收货地址个数'},
	  //               {value:this.authitem.delivery_address_other_num, name:'他人收货地址个数'},
	  //               {value:this.authitem.delivery_address_domicile_num, name:'与户籍匹配个数'},
	  //               {value:this.authitem.delivery_address_register_num, name:'注册后GPS匹配个数'}
			// 	]
			// 	let taobaoInforPie = this.$echarts.init(document.getElementById('taobaoInforPie'));
			// 	let option1 = {
			// 		title:{
			// 			text:'收货地址分析',
			// 			bottom:'0',
			// 			x:'center',
			// 			textStyle:{
			// 				fontSize:'18',
			// 				fontWeight:'normal'
			// 			}
			// 		},
			// 		color:['#f8e367','#e18197','#8abe6e','#93ccce','#7ababc'],
			// 	    tooltip: {
			// 	        trigger: 'item',
			// 	        formatter: "{a} <br/>{b}: {c} ({d}%)"
			// 	    },
			// 	    legend: {
			// 	        orient: 'horizontal',
			// 	        x: 'center',
			// 	        top:'0',
			// 	        width:'100%',
			// 	        itemGap:10,
			// 	        data:['本人收货地址个数','他人收货地址个数','与户籍匹配个数','注册后GPS匹配个数'],
			// 	    },
			// 	    series: [
			// 	        {
			// 	            name:'访问来源',
			// 	            type:'pie',
			// 	            radius: ['55%', '85%'],
			// 	            data:reveiceadddressdata,
			// 	            label:{
			// 	            	normal:{
			// 	            		show:false
			// 	            	}
			// 	            },
			// 	            center:['50%','60%']
			// 	        }
			// 	    ]
			// 	}
			// 	taobaoInforPie.setOption(option1);
			// },
			// taobaoInforBar(){
			// 	let nearly_a_month = [ //近1个月
			// 	     this.authitem.nearly_a_month_order_total,
			// 	     this.authitem.nearly_a_month_order_total_money
			// 	]
			// 	let nearly_three_month = [ //近3个月
			// 	     this.authitem.nearly_three_month_order_total,
			// 	     this.authitem.nearly_three_month_order_total_money
			// 	]
			// 	let nearly_sex_month = [ //近6个月
			// 	     this.authitem.nearly_sex_month_order_total,
			// 	     this.authitem.nearly_sex_month_order_total_money
			// 	]
			// 	let  taobaoInforBar = this.$echarts.init(document.getElementById('taobaoInforBar'))
			// 	let  option0  = {
			// 		title:{
	  //                   text:"订单消费分析",
	  //                   bottom:'0',
			// 			x:'center',
			// 			textStyle:{
			// 				fontSize:'18',
			// 				fontWeight:'normal'
			// 			}
			// 		},
			// 		color:['#f8e367','#8abe6e','#93ccce','#7ababc'],
			// 	    tooltip: {
			// 	        trigger: 'axis',
			// 	        axisPointer: {
			// 	            type: 'shadow'
			// 	        }
			// 	    },
			// 	    legend: {
			// 	        data: ['近1个月', '近3个月','近6个月']
			// 	    },
			// 	    calculable: true,
			// 	    grid:{
	  //                   show:false
			// 	    },
			// 	    xAxis: [
			// 	        {
			// 	            type: 'category',
			// 	            axisTick: {show: false},
			// 	            data: ['订单数', '订单总额'],
			// 	            axisLine:{
			// 	            	show:false
			// 	            }
			// 	        }
			// 	    ],
			// 	    yAxis: [
			// 	        {   
	
			// 	            type: 'value',
			// 	            axisLine:{
			// 	            	show:false
			// 	            },
			// 	            splitLine:{
			// 	            	show:false
			// 	            },
			// 	            splitArea:{
			// 	            	show:false
			// 	            }
			// 	        }
			// 	    ],
			// 	    series: [
			// 	        {
			// 	            name: '近1个月',
			// 	            type: 'bar',
			// 	            barGap: '31%',
			// 	            barWidth:13,
			// 	            itemStyle:{
			// 	            	normal:{
			// 	            	    color:'#59ceff'
			// 	            	}  
			// 	            },
			// 	            data: nearly_a_month
			// 	        },
			// 	        {
			// 	            name: '近3个月',
			// 	            type: 'bar',
			// 	            barWidth:13,
			// 	            itemStyle:{
			// 	            	normal:{
			// 	            	    color:'#ff686b'
			// 	            	}  
			// 	            },
			// 	            data: nearly_three_month
			// 	        },
			// 	        {
			// 	            name: '近6个月',
			// 	            type: 'bar',
			// 	            barWidth:13,
			// 	            itemStyle:{
			// 	            	normal:{
			// 	            	    color:'#ff686b'
			// 	            	}  
			// 	            },
			// 	            data: nearly_sex_month
			// 	        }
			// 	    ]
			// 	}
			// 	taobaoInforBar.setOption(option0)
			// }
		}
	}
</script>

<style lang="less" scoped>
	.taobao{
		margin: 45px 20px 55px;
	}
	.taobaoCont{
		margin-bottom: 55px;
		text-align: left;
	}
	.mationCont {
		display: inline-block;
		width: 55%;
		box-sizing: border-box;
		vertical-align: middle;
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
			li{
				width: 100%;
				box-sizing: border-box;
				list-style: none;
				text-align: left;
				/*padding-left: 18px;*/
				height: 38px;
				span{
					width: 50%;
					height: 38px;
					vertical-align: top;
					display: inline-block;
					box-sizing: border-box;
					text-align: center;
					line-height: 38px;
					border-top: 1px solid #30c9f3;
					border-left: 1px solid #30c9f3;
				}
				span.labelname {
					display: inline-block;
					color: #333;
					font-size: 16px;
					
				}
				span:nth-child(20) {
					border-bottom: 1px solid #30c9f3;
				}
				span:last-child {
					border-right:1px solid #30c9f3;
				}
				span:nth-child(2n+1) {
					background-color: #f0f9fc;
				}
			}
			li:last-child{
				span{
					border-bottom:1px solid #30c9f3;
				}
			}
		}
	}
	.taobaoInfor{
		display: inline-flex;
		display: -webkit-inline-flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		width: 44%;
		vertical-align: middle;
		box-sizing: border-box;
		#taobaoInforPie{
			width: 190px;
			height: 350px;
		}
		#taobaoInforBar{
			width: 220px;
			height: 350px;
		}
	}
	.tbtaginfoout{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.taginfo{
			margin: 0 10px 10px 0;
			position: static;
		}
		.el-tag{
			margin: 0 10px 10px 0;
		}
	}
	.products{
		span{
			font-size: 16px;

		}
	}
	.tableStyle{
		width: 100%;
		border: 1px solid #30c9f3;
		font-size: 15px;
		display: table;
		box-sizing: border-box;
		.tablestyleTitle{
			display:table;
			text-align: left;
			width: 100%;
			background:rgb(236, 245, 255);
			.tablestyleTitleItem{
				display:table-cell;
				text-align: center;
				border-bottom: 1px solid #30c9f3;
				border-right: 1px solid #30c9f3;
				line-height: 2.5;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
		}
		.tablestyleBody{
			max-height: 800px;
			overflow-y: auto;
			width: 100%;
			line-height: 2.5;
			.tablestyleBodyLine{
				display: table;
				.tablestyleBodyLineItem{
					width: 100%;
					text-align:left;
					div{
						display: table-cell;
						vertical-align: middle;
						text-align: center;
						box-sizing: border-box;
						border-bottom: 1px solid #30c9f3;
						border-right: 1px solid #30c9f3;
						line-height:2.5;
						margin: 0;
						padding: 0;
					}
				}
				.tablestyleBodyLinedetail{
					border-bottom: 1px solid #30c9f3;
					border-right: 1px solid #30c9f3;
					line-height: 2.5;
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}
			}
		}
	}
</style>