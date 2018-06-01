<template>
	<div class="cheatmsg">
		<div class="cheatmsgpic">
			<ul>
	         	<li v-for="item in cheatlist">
	         		<span class="labelname">{{item.label}}</span>:<span>{{item.val}}</span>
	         	</li>
	        </ul>
	        <div class="charts">
	         	<div id="chart" :style="{width:'618px',height:'250px'}"></div>
	         	<div class="seconedchart">
                    <p class="seconedtitle">联系人通话类型分布</p>
	         	 	<div id="circlechart" style="width:309px;height:250px;"></div>
	         	</div>
	        </div>
		</div>
		<div class="cheattype">
		 	<div>
		 		<p>wifi和ip(移动ip)欺诈</p>
		 		<div>
			 		<p><span>使用同一个wifi(通过地理位置和wifi名称确认是否为同一个人)或者移动ip的人数:</span><span>200</span></p>
			 		<p><span>注册人数:</span><span>200</span></p>
		 		</div>

		 	</div>
		 	<div>
		 		<p>地理位置欺诈</p>
		 		<div>
			 		<p><span>使用同一个wifi(通过地理位置和wifi名称确认是否为同一个人)或者移动ip的人数:</span><span>200</span></p>
			 		<p><span>注册人数:</span><span>200</span></p>
		 		</div>
		 	</div>
		 	<div>
		 		<p>设备欺诈</p>
		 		<div>
			 		<p><span>使用同一个wifi(通过地理位置和wifi名称确认是否为同一个人)或者移动ip的人数:</span><span>200</span></p>
			 		<p><span>注册人数:</span><span>200</span></p>
		 		</div>
		 	</div>
		</div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>
<script>
    import cloudsubmit from './cloudsubmit'
    import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default{
		name:'cheatmsg',
		components:{cloudsubmit},
		props:{
           authitem:Object || Array
		},
		mounted(){
			if(!isEmptyObject(this.authitem)){
	 
			}else{
				this.$watch('authitem',()=>{
		 
				})
			}
		},
        data(){
        	return{
        		cheatlist:[
        		   { label:'手机号输入速度',val:'200' },
        		   { label:'地区违约率',val:'200' },
        		   { label:'地理位置违约率',val:'200' },
        		   { label:'年龄段',val:'200' },
        		   { label:'身份证有效期',val:'200' },
        		   { label:'信用卡拒皮占比',val:'200' },
        		   { label:'购房贷款发生过逾期的账户数',val:'200' },
        		   { label:'机构查询贷款审批次数',val:'200' },
        		   { label:'个人查询次数',val:'200' },
        		   { label:'几乎全额使用信用卡张数占比',val:'200' },
        		   { label:'是否患有特殊病',val:'200' },
        		   { label:'离退休日期',val:'200' },
        		   { label:'就医次数',val:'200' },
        		   { label:'社保状态',val:'200' },
        		   { label:'社保提现就职单位个数',val:'200' },
        		   { label:'公积金剩余余额',val:'200' },
        		   { label:'公积金贷款逾期次数',val:'200' },
        		   { label:'公积金是否超前存入',val:'200' },
        		   { label:'注册GPS是否在联系人分布中',val:'200' },
        		   { label:'夜间时段通话比例',val:'200' },
        		   { label:'户籍地址是否在联系人分布中',val:'200' }
        		]
        	}
        },
        mounted(){
        	let  myChart  = this.$echarts.init(document.getElementById('chart'))
			let  option   = {
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'value',
			        axisLine:{
	                    lineStyle:{
	                       color:'#0d867c'
	                    }
	                },
	                boundaryGap: ['20%', '20%'],
	                axisLabel:{
	                	formatter(value){
                             return value+'%'
	                	}
	                }
			    },
			    yAxis: {
			        type: 'category',
			        axisLine:{
	                    lineStyle:{
	                       color:'#0d867c'
	                    }
	                },
			        data: [
			            {
				           	value:'3个月Top10联系人通话次数占比',
				           	textStyle:{
	                           color:"#333"
				           	}
			            },
			            {
				           	value:'3个月Top10联系人通话时间占比',
				           	textStyle:{
	                           color:"#333"
				           	}
			            }]
			    },
			    series: [
			        {
			            type: 'bar',
			            barWidth:24,
			            itemStyle:{
			            	normal:{
			            	    color(params){
			                        let colorList = ['#919bcd','#83d0f4']
			                        return colorList[params.dataIndex]
			                    }
			            	}  
			            },
			            data:[87, 76],
			            label:{ 
							normal:{ 
								show: true, 
								position: 'right',
								formatter: '{c}%'
						    } 
					    }
			        }
			    ]
			}
			myChart.setOption(option)

			let  myChart0 = this.$echarts.init(document.getElementById('circlechart'))
			let  option0  = {
				title:{
                    // text:"联系人通话类型分布"
				},
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    legend: {
			        data: ['华夏', '海外']
			    },
			    calculable: true,
			    grid:{
                    show:false
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {show: false},
			            data: ['一月', '三月', '六月'],
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
			            }
			        }
			    ],
			    series: [
			        {
			            name: '华夏',
			            type: 'bar',
			            barGap: '31%',
			            barWidth:13,
			            itemStyle:{
			            	normal:{
			            	    color:'#59ceff'
			            	}  
			            },
			            data: [320, 332, 301]
			        },
			        {
			            name: '海外',
			            type: 'bar',
			            barWidth:13,
			            itemStyle:{
			            	normal:{
			            	    color:'#ff686b'
			            	}  
			            },
			            data: [220, 182, 191]
			        }
			    ]
			}
			myChart0.setOption(option0)
        },
        methods:{

        }
	}
</script>

<style lang="less" scoped>
	.cheatmsg{
		width: 100%;
		padding-top: 53px;
		padding-bottom: 35px;
	}
	.cheatmsgpic{
		width: 100%;
		display: flex;
    	display: -webkit-flex;
    	flex-wrap:nowrap;
    	flex-direction:row ;
    	justify-content:felx-start;
        align-items:center;
	}
    ul {
    	margin: 0;
    	padding: 0;
    	margin-left:15px; 
    	width: 50%;
    	display: flex;
    	display: -webkit-flex;
    	flex-wrap:wrap;
    	flex-direction:row ;
    	justify-content:felx-start;
        align-items:center;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom:  1px solid #3bc3cd;
        border-right: 1px solid #3bc3cd;
    	li{
    		width: 50%;
    		box-sizing: border-box;
    		list-style: none;
    	    text-align: left;
    	    padding: 13px 0 13px 18px ;
    	    border-top:   1px solid #3bc3cd;
    	    border-left:  1px solid #3bc3cd;
    	    span.labelname{
    	    	color: #333;
    	    	font-size: 16px;
    	    }
    	}
    	li:nth-child(20){
    		 border-bottom:  1px solid #3bc3cd;
    	}
    	li:last-child{
		    border-right:  1px solid #3bc3cd;
    	}
    	li:nth-child(2n+1){
    		background-color: #f0f9fc;
    	}
    }
	.charts{
	    padding-left:38px; 
	    height: 100%;
	    #chart{
	    	border-bottom: 1px solid #ededed;
	    }
	    .seconedchart{
	    	width: 100%;
		    display: flex;
	    	display: -webkit-flex;
	    	flex-wrap:nowrap;
	    	flex-direction:row ;
	    	justify-content:space-around;
	        align-items:strech;
	        padding-top: 20px;
		    .seconedtitle{
		    	border-left: 4px solid #f48e20;
		    	text-align: left;
		    	padding-left: 6px;
		    	height: 100%;
		    }
		    #circlechart{ }
	    }
    }
    // 欺诈类型
    .cheattype{
    	display: flex;
    	display: -webkit-flex;
    	flex-wrap:nowrap;
    	flex-direction:row ;
    	justify-content:space-around;
        align-items:center;
        padding:15px; 
        div{
        	margin: 0 25px;
	        p{
	        	margin: 0;
	        	padding:9px 7px;
	        	border: 1px solid #30c9f3;
	        	border-bottom: none;
	        	border-radius: 3px;
	        	display: inline-block; 
	        	background-color:#f0f9fc ;
	        }
        	div{
        		border: 1px solid #30c9f3;
        		padding: 15px 27px;
	        	p{
	        		display: block;
	        		text-align: left;
	        		border: none;
	        		padding: 0;
	        		background-color: #fff;
	        	}
	        	p:last-child{
	        		margin-top: 24px;
	        	}
        	}
        }
    }
</style>