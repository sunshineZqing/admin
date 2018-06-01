<template>
	<div class="jd">
		<!-- <div class="jdCont" v-if="authitem">
			<div class="mationCont">
				<ul >
					<li>
						<span>身份证与姓名是否一致</span><span v-if="authitem.identity_agreement==0">一致</span><span v-if="authitem.identity_agreement==1">不一致</span><span v-if="!authitem.identity_agreement&&authitem.identity_agreement!=0"></span>
					</li>
					<li>
						<span>白条类型</span><span>{{authitem.ious_type}}</span>
					</li>
					<li>
						<span>消费额度</span><span v-text="authitem.consumption"></span>
					</li>
					<li>
						<span>是否开通</span><span v-if="authitem.ious_status==0">开通</span><span v-if="authitem.ious_status==1">未开通</span><span v-if="!authitem.ious_status"></span>
					</li>
					<li>
						<span>近两年单笔最高消费</span><span v-text="authitem.recent_two_years_max_consumption"></span>
					</li>
					<li>
						<span>订单总量</span><span v-text="authitem.order_total"></span>
					</li>
					<li>
						<span>平均每笔消费</span><span v-text="authitem.average_consumption"></span>
					</li>
					<li>
						<span>手机号与注册手机号是否一致</span><span v-if="authitem.phone_agreement==0">一致</span><span v-if="authitem.phone_agreement==1">不一致</span><span v-if="!authitem.phone_agreement"></span>
					</li>
					<li>
						<span>白条总额度</span><span v-text="authitem.ious_total"></span>
					</li>
					<li>
						<span>每月还款金额</span><span v-text="authitem.monthly_repayment_amount"></span>
					</li>
					<li>
						<span>已还款金额</span><span v-text="authitem.repayment_amount"></span>
					</li>
					<li>
						<span>本人收货地址</span><el-tooltip class="item" effect="dark" :content="authitem.delivery_address_self" placement="top-start">
						   <span  v-text="authitem.delivery_address_self"></span>
						</el-tooltip>
					</li>
					<li>
						<span>订单总额</span><span v-text="authitem.order_total_money"></span>
					</li>
				</ul>
			</div>
			<div class="jdInfor">
				<div class="jdInforBar1">
					<div id="jdInforBar1"></div>
				</div>
				<div class="jdInforBar2">
					<div id="jdInforBar2"></div>
				</div>
				<div class="jdInforPie">
					<div id="jdInforPie"></div>
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
					<div v-show="item.name=='京东白条'">
						<basetable :basetabletitle="jdbaitiaotitle" :basetableinfo="jdbaitiaoinfo"   :showopera='false' ></basetable>
					</div>
					<div v-show="item.name=='收货地址'">
						<div class="taginfoout">
							<el-tag class="" type="danger"><span>数量：</span>{{addressnum}}</el-tag>
						</div>
						<basetable :basetabletitle="addresstitle" :basetableinfo="addressinfo"   :showopera='false' ></basetable>
					</div>
					<div v-show="item.name=='今年订单记录'">
						<div class="taginfoout">
							<el-tag class="" type="danger"><span>有效订单总量：</span>{{reOrderSize}}</el-tag>
							<el-tag class="" type="danger"><span>有效订单总额：</span>{{reOrderPriceAll}}</el-tag>
							<el-tag class="" type="danger"><span>平均每笔消费：</span>{{reOrderPriceAVG}}</el-tag>
						</div>
						<div class="tableStyle">
							<div class="tablestyleTitle">
								<div class="tablestyleTitleItem" style="width:50px">
									<span>序号</span>
								</div><div v-for="item in newReOrderListtitle" class="tablestyleTitleItem" :style="{width:item.width}">
									<span>{{item.label}}</span>
								</div>
							</div>
							<div class="tablestyleBody"  v-if="newReOrderListinfo.length != 0">
								<div class="tablestyleBodyLine" v-for="(item,index) in newReOrderListinfo">
									<div class="tablestyleBodyLineItem">
										<div class="" style="width:50px">
											<span>{{++index}}</span>
										</div><div class="" v-for="item2 in newReOrderListtitle" :style="{width:item2.width}">
											<span>{{item[item2.prop]}}</span>
										</div>
									</div><div class="tablestyleBodyLinedetail">
										<div class="" v-for="item3 in item.bindProNames">
											<span>商品名称：{{item3.name}} | 商品类型：{{item3.type}}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="tablestyleBody" v-else>
								暂无数据
							</div>
						</div>
						<!--<basetable :basetabletitle="newReOrderListtitle" :basetableinfo="newReOrderListinfo" :showopera='false' :expandshow='true' :mheight='500' :isexpand="isexpand">
							<template slot-scope="props" slot="expand" >
								<el-form  label-position="left" inline class="demo-table-expand" v-for="(item,index) in props.scope.row.bindProNames" :key="index" key="0">
						          <el-form-item label="商品名称："> <span>{{item.name}}</span> </el-form-item>
						          <el-form-item label="商品类型："> <span>{{item.type}}</span> </el-form-item>
						        </el-form>
					        </template>
						</basetable>-->
					</div>
					<div v-show="item.name=='去年订单记录'">
						<div class="taginfoout">
							<el-tag class="" type="danger"><span>有效订单总量：</span>{{perOrderSize}}</el-tag>
							<el-tag class="" type="danger"><span>有效订单总额：</span>{{preOrderPriceAll}}</el-tag>
							<el-tag class="" type="danger"><span>平均每笔消费：</span>{{preOrderPriceAVG}}</el-tag>
						</div>
						<div class="tableStyle">
							<div class="tablestyleTitle">
								<div class="tablestyleTitleItem" style="width:50px">
									<span>序号</span>
								</div><div v-for="item in newPreOrderListtitle" class="tablestyleTitleItem" :style="{width:item.width}">
									<span>{{item.label}}</span>
								</div>
							</div>
							<div class="tablestyleBody"  v-if="newPreOrderListinfo.length != 0">
								<div class="tablestyleBodyLine" v-for="(item,index) in newPreOrderListinfo">
									<div class="tablestyleBodyLineItem">
										<div class="" style="width:50px">
											<span>{{++index}}</span>
										</div><div class="" v-for="item2 in newPreOrderListtitle" :style="{width:item2.width}">
											<span>{{item[item2.prop]}}</span>
										</div>
									</div><div class="tablestyleBodyLinedetail">
										<div class="" v-for="item3 in item.bindProNames">
											<span>商品名称：{{item3.name}} | 商品类型：{{item3.type}}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="tablestyleBody" v-else>
								暂无数据
							</div>
						</div>
						<!--<basetable :basetabletitle="newPreOrderListtitle" :basetableinfo="newPreOrderListinfo"  :expandshow='true' :showopera='false' :mheight='500' :isexpand="isexpand">
							<template slot-scope="props" slot="expand" >
								<el-form  label-position="left" inline class="demo-table-expand" v-for="(item,index) in props.scope.row.bindProNames" :key="index" key="1">
						          <el-form-item label="商品名称："> <span>{{item.name}}</span> </el-form-item>
						          <el-form-item label="商品类型："> <span>{{item.type}}</span> </el-form-item>
						        </el-form>
					        </template>
						</basetable>-->
					</div>
					<div v-show="item.name=='消费统计'">
						<basetable :basetabletitle="statisticstitle" :basetableinfo="statisticsinfo"   :showopera='false' ></basetable>
					</div>
				</el-tab-pane>
		    </el-tabs>
	    </div>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default{
		name:'jd',
		components:{basetable},
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
                  { name:'京东白条'},
                  { name:'收货地址'},
                  { name:'今年订单记录'},
                  { name:'去年订单记录'},
                  { name:'消费统计'}
                ],
                activeName:'基本信息',
                basetabletitle:[
                  {   label:'真实姓名', prop:'realName_jd'},  
                  {   label:'姓名校验', prop:'realNameFlag_jd'},  
                  {   label:'身份证号', prop:'certCard',width:160},  
                  {   label:'身份校验', prop:'certCard_flag'},  
                  {   label:'会员等级', prop:'userLevel'},  
                  {   label:'手机号',   prop:'phone'},  
                  {   label:'手机号校验', prop:'phone_flag'},  
                  {   label:'绑卡数量', prop:'bindBank_num'},  
                  {   label:'信用卡',   prop:'x_num'},  
                  {   label:'储蓄卡',   prop:'c_num'},  
                  {   label:'成长值',   prop:'growthValue'} 
                ],
                baseinfo:[],

                jdbaitiaotitle:[
                  {   label:'总额度', prop:'totalAmount'},  
                  {   label:'小白信用', prop:'xiaobaixinyong'},  
                  {   label:'是否开启', prop:'isOpen'},
                  {   label:'白条消费', prop:'consumeAmount'},
                  {   label:'月还', prop:'monthPending'},
                  {   label:'可用额度', prop:'avaliableAmount'},
                  {   label:'未开通时有未开通提醒', prop:'baiTiao'}
                ],
                jdbaitiaoinfo:[],

                addresstitle:[
                  {   label:'收货人', prop:'addres_name'},  
                  {   label:'电话', prop:'addres_phone'},  
                  {   label:'收货地址', prop:'addres_addrs'}
                ],
                addressinfo:[],
                addressnum:0, //收货地址数量

                newReOrderListtitle:[
                  { label:'订单总金额', prop:'amount',width:'300px'},  
                  { label:'消费时间',   prop:'businessTime',width:'220px'},  
                  { label:'消费者姓名', prop:'customerName',width:'220px'},
                  { label:'订单地址', prop:'orderAddr',width:'220px'},
                  { label:'订单电话', prop:'orderPhone',width:'220px'},
                  { label:'订单状态', prop:'orderStatus',width:'220px'},
                  { label:'支付方式', prop:'payType',width:'220px'}
                ],
                newReOrderListinfo:[],
                reOrderSize:'',//订单总量
                reOrderPriceAVG:'',//每笔订单均价
                reOrderPriceAll:'',//总金额

                newPreOrderListtitle:[
                  { label:'订单总金额', prop:'amount',width:'200px'},  
                  { label:'消费时间', prop:'businessTime',width:'220px'},  
                  { label:'消费者姓名', prop:'customerName',width:'220px'},
                  { label:'订单地址', prop:'orderAddr',width:'220px'},
                  { label:'订单电话', prop:'orderPhone',width:'220px'},
                  { label:'订单状态', prop:'orderStatus',width:'220px'},
                  { label:'支付方式', prop:'payType',width:'220px'}
                ],
                newPreOrderListinfo:[],
                perOrderSize:'',//订单总量
                preOrderPriceAVG:'',//每笔订单均价
                preOrderPriceAll:'',//总金额

                statisticstitle:[
                  {   label:'近两年订单总数', prop:'orderSize'},  
                  {   label:'近两年有效订单总数', prop:'validOrderSize'},  
                  {   label:'近两年有效消费累计', prop:'TwoYearsCons'},  
                  {   label:'每笔订单均价',   prop:'averageMoney'},
                  {   label:'平均每笔消费',   prop:'averageMoney'},
                  {   label:'商品总数',       prop:'goodsNum'},
                  {   label:'最大商品价格',   prop:'maxPrice'}
                ],
                statisticsinfo:[]
			}
		},
		// mounted(){
		// 	if(!isEmptyObject(this.authitem)){
		// 		this.jdInforPie();
		// 		this.jdInforBar1();
		// 		this.jdInforBar2();
		// 	}else{
		// 		this.$watch('authitem',()=>{
		// 			this.jdInforPie();
		// 			this.jdInforBar1();
		// 			this.jdInforBar2();
		// 		})
		// 	}
		// },
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
	                this.$fksh.getoriginaljd({user_id:this.$route.params.user_id}).then(res=>{},response=>{
	                	this.contantload = false
		            	if(response.data.resultCode=='0'){
		            		if(!isEmptyObject(response.data.returnObj)){
			            		//基本信息
			            		this.baseinfo = []
			            		if(response.data.returnObj.personInfo&&response.data.returnObj.personInfo.realNameFlag_jd){
		                            switch(response.data.returnObj.personInfo.realNameFlag_jd){ //姓名校验
		                               case '0':response.data.returnObj.personInfo.realNameFlag_jd = '不一致';break;
		                               case '1':response.data.returnObj.personInfo.realNameFlag_jd = '一致';break;
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
			            		//京东白条
			            		this.jdbaitiaoinfo = []
			            		if(response.data.returnObj.jdBaiTiaoPd){
				            		this.jdbaitiaoinfo.push(response.data.returnObj.jdBaiTiaoPd)
			            		}
			            		//收货地址
			            		if(response.data.returnObj.addressList){
				            		this.addressinfo = response.data.returnObj.addressList
				            		this.addressnum  = response.data.returnObj.addressList[response.data.returnObj.addressList.length-1]
				            		this.addressinfo.length = this.addressinfo.length-1
			            		}
			            		//今年订单记录
			            		if(response.data.returnObj.newReOrderList){
				            		this.newReOrderListinfo = response.data.returnObj.newReOrderList
				            		this.reOrderSize        = this.newReOrderListinfo[this.newReOrderListinfo.length-1].reOrderSize
				            		this.reOrderPriceAVG    = this.newReOrderListinfo[this.newReOrderListinfo.length-1].reOrderPriceAVG.toFixed(2)
				            		this.reOrderPriceAll    = this.newReOrderListinfo[this.newReOrderListinfo.length-1].reOrderPriceAll.toFixed(2)
				            		this.newReOrderListinfo.length = this.newReOrderListinfo.length-1
			            		}
			            		//去年订单记录
	                            if(response.data.returnObj.newPreOrderList){
				            		this.newPreOrderListinfo = response.data.returnObj.newPreOrderList
	
				            		this.perOrderSize        = this.newPreOrderListinfo[this.newPreOrderListinfo.length-1].perOrderSize
				            		this.preOrderPriceAVG    = this.newPreOrderListinfo[this.newPreOrderListinfo.length-1].preOrderPriceAVG.toFixed(2)
				            		this.preOrderPriceAll    = this.newPreOrderListinfo[this.newPreOrderListinfo.length-1].preOrderPriceAll.toFixed(2)
				            		this.newPreOrderListinfo.length = this.newPreOrderListinfo.length-1
			            		}
			            		//消费统计
			            		if(response.data.returnObj.consumePd){
			            			response.data.returnObj.consumePd.TwoYearsCons = response.data.returnObj.consumePd.TwoYearsCons.toFixed(2)
			            			response.data.returnObj.consumePd.averageMoney = response.data.returnObj.consumePd.averageMoney.toFixed(2)
				            		this.statisticsinfo.push(response.data.returnObj.consumePd)
			            		}
			            	}
		            	}else{
		            		this.contantload = false
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
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
			jdInforBar2(){
				let nowyeardata = [ //近一年
				     this.authitem.nearly_a_year_order_total,
				     this.authitem.nearly_a_year_order_total_money,
				     this.authitem.nearly_a_year_average_consumption
				]
				let lastyeardata = [ //去年
				     this.authitem.last_year_order_total,
				     this.authitem.last_year_order_total_money,
				     this.authitem.last_year_average_consumption
				]
				let jdInforBar2 = this.$echarts.init(document.getElementById('jdInforBar2'));
				let option1 = {
					title:{
	                    text:"消费分析",
	                    bottom:'0',
						x:'center',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data: ['近一年', '去年'],
				        align:'auto',
				        left:'20%'

				    },
				    calculable: true,
				    grid:{
	                    show:false
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {show: false},
				            data: ['订单数','订单总额','平均消费'],
				            axisLine:{
				            	show:false
				            }
				        }
				    ],
				    yAxis: [
				        {   
	
				            type: 'value',
				            axisLine:{
				            	show:false
				            },
				            splitLine:{
				            	show:false
				            },
				            splitArea:{
				            	show:false
				            },
				            axisLabel:{
                            	margin:6,
                            	width:200,
                            	rich:{}
                            },
                            axisTick:{
						        show:false
						    }
				        }
				    ],
				    series: [
				        {
				            name: '近一年',
				            type: 'bar',
				            barGap: '31%',
				            barWidth:13,
				            itemStyle:{
				            	normal:{
				            	    color:'#59ceff'
				            	}  
				            },
				            data: nowyeardata
				        },
				        {
				            name: '去年',
				            type: 'bar',
				            barWidth:15,
				            itemStyle:{
				            	normal:{
				            	    color:'#ff686b'
				            	}  
				            },
				            data: lastyeardata
				        }
				    ]
				}
				jdInforBar2.setOption(option1);
			},
			jdInforBar1(){
				let bindcardsdata = [
				     this.authitem.bind_card_total,
				     this.authitem.credit_card_total,
				     this.authitem.savings_card_total
				]
				let  jdInforBar1 = this.$echarts.init(document.getElementById('jdInforBar1'))
				let  option0  = {
					title:{
	                    text:"绑卡分析",
	                    bottom:'0',
						x:'center',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    calculable: true,
				    grid:{
	                    show:false
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {show: false},
				            data: ['绑卡总张数', '信用卡总张数', '储蓄卡总张数'],
				            axisLine:{
				            	show:false
				            }
				        }
				    ],
				    yAxis: [
				        {   
				            type: 'value',
				            axisLine:{
				            	show:false
				            },
				            splitLine:{
				            	show:false
				            },
				            splitArea:{
				            	show:false
				            },
                            axisLabel:{
                            	margin:6,
                            	showMinLabel:true

                            },
                            axisTick:{
						        show:false
						    }
				        }
				    ],
				    series: [
				        {
				            type: 'bar',
				            barWidth:13,
				            itemStyle:{
				            	normal:{
				            	    color:'#ff686b'
				            	}  
				            },
				            data:bindcardsdata
				        }
				    ]
				}
				jdInforBar1.setOption(option0)
			},
			jdInforPie(){
				let reveiceadddressdata = [
                    {value:this.authitem.delivery_address_self_num, name:'本人收货地址个数'},
	                {value:this.authitem.delivery_address_other_num, name:'他人收货地址个数'},
	                {value:this.authitem.delivery_address_domicile_num, name:'与户籍匹配个数'},
	                {value:this.authitem.delivery_address_register_num, name:'注册后GPS匹配个数'}
				]
				let jdInforPie = this.$echarts.init(document.getElementById('jdInforPie'))
				let option0    = {
					title:{
						text:'收货地址分析',
						bottom:'0',
						x:'50%',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal'
						}
					},
					color:['#f8e367','#e18197','#8abe6e','#93ccce','#7ababc'],
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        y: 'center',
				        right:'0',
				        itemGap:10,
				        data:['本人收货地址个数','他人收货地址个数','与户籍匹配个数','注册后GPS匹配个数'],
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['45%', '70%'],
				            data:reveiceadddressdata,
				            label:{
				            	normal:{
				            		show:false
				            	}
				            },
				            center:['40%','50%']
				        }
				    ]
				}
				jdInforPie.setOption(option0)
			}
		}
	}
</script>

<style lang="less" scoped>
	.jd{
		margin: 45px 20px 55px;
	}
	.jdCont{
		margin-bottom: 55px;
		text-align: left;
	}
	.mationCont {
		display: inline-block;
		width: 45%;
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
				height: 40px;
				span{
					width: 50%;
					height:  40px;
					vertical-align: top;
					display: inline-block;
					box-sizing: border-box;
					text-align: center;
					line-height:  40px;
					border-top: 1px solid #30c9f3;
					border-left: 1px solid #30c9f3;
				}
				span.dropreceive{
                    overflow: hidden;
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
				span:nth-child(2n) {
					padding: 0 10px;
					white-space: nowrap;
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
	.jdInfor{
		display: inline-block;
		width: 54%;
		text-align: left;
		vertical-align: middle;
		box-sizing: border-box;
		#jdInforPie{
			width: 440px;
			height: 238px;
		}
		.jdInforPie{
			display: inline-block;
			padding-left: 15%;
			
		}
		#jdInforBar1,#jdInforBar2{
			width: 365px;
			height: 275px;
		}
		.jdInforBar1,.jdInforBar2{
			display: inline-block;
			text-align: center;
			padding-left: 2%;
		}
	}
	.taginfoout{
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
	.tableStyle{
		width: 100%;
		border: 1px solid #30c9f3;
		font-size: 15px;
		overflow-x:auto ;
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