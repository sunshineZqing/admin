<template>
	<div class="userstability">
		<div class="userstabilityCont">
			<div class="stable1">
				<div class="addressStable">
					<span class="stableTitle"><i class="iconfont icon-dizhi"></i>地址稳定性</span>
					<div class=""><span>户籍地址：</span><span></span></div>
					<div class=""><span>注册GPS：</span><span></span></div>
					<div class=""><span>淘宝收货地址：</span><span></span></div>
					<div class=""><span>京东收货地址：</span><span></span></div>
					<div class=""><span>手机号归属地：</span><span></span></div>
					<div class=""><span>公积金上缴地址：</span><span></span></div>
				</div>
				<div class="consumptionStable">
					<span class="stableTitle"><i class="iconfont icon-xiaofei"></i>消费稳定性</span>
					<div class=""><span>淘宝每月消费金额：</span><span></span></div>
					<div class=""><span>京东每月消费金额：</span><span></span></div>
					<div class=""><span>信用卡每月平均账单：</span><span></span></div>
					<div class=""><span>手机平均价格：</span><span></span></div>
				</div>
			</div>
				
			<div class="capitalStable">
				<span class="stableTitle"><i class="iconfont icon-zijin"></i>资金稳定性</span>
				<div class=""><span>借款应用数量：</span><span></span></div>
				<div class=""><span>小额流入总金额：</span><span></span></div>
				<div class=""><span>购房贷款总笔数：</span><span></span></div>
				<div class=""><span>购房贷款期间逾期次数：</span><span></span></div>
				<div class=""><span>其他贷款总金额：</span><span></span></div>
				<div class=""><span>近半年贷款审批次数：</span><span></span></div>
				<div class=""><span>近半年信用卡审批次数：</span><span></span></div>
				<div class=""><span>花呗总额和余额：</span><span></span></div>
				<div class=""><span>京东白条总额和余额：</span><span></span></div>
				<div class=""><span>银行卡余额：</span><span></span></div>
				<div class=""><span>定期余额：</span><span></span></div>
				<div class=""><span>余额宝余额：</span><span></span></div>
			</div>
			<div class="stable2">
				<div class="workStable">
					<span class="stableTitle"><i class="iconfont icon-gongzuotai"></i>工作稳定性</span>
					<div class=""><span>社保和公积金缴存年数：</span><span></span></div>
					<div class=""><span>曾就职单位平均工作时间：</span><span></span></div>
					<div class=""><span>现在工作状态：</span><span></span></div>
					<div class=""><span>最近一家单位的工作年限：</span><span></span></div>
				</div>
				<div class="incomeStable">
					<span class="stableTitle"><i class="iconfont icon-iconfontqitashouru"></i>收入稳定性</span>
					<div class=""><span>近半年流入金额是否大于流出金额：</span><span></span></div>
					<div class=""><span>月工资：</span><span></span></div>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	export default{
		name:'userstability'
	}
</script>

<style lang="less" scoped>
	.userstabilityCont{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		margin-bottom: 35px;
		.stable1,.stable2{
			display: block;
			width:100%;
			padding: 0px 30px;
			.addressStable,.consumptionStable,.workStable,.incomeStable{
				width: 100%;
				border: 1px solid #93ccce;
				position: relative;
				margin-top: 80px;
				padding: 10px;
				box-sizing:border-box;
				div{
					padding: 9px;
					text-align: left;
				}
			}
			.incomeStable{
				min-height: 250px;
			}
		}
		.capitalStable{
			display: block;
			margin: 80px 30px 0 30px;
			width: 100%;
			border: 1px solid #93ccce;
			position: relative;
			padding: 10px;
			box-sizing:border-box;
			div{
				padding: 10px;
				text-align: left;
			}
		}
		.stableTitle{
			position: absolute;
			top: -47px;
			left: -20px;
			background: #93ccce;
			border-radius: 30px;
			color: #FFFFFF;
			font-size: 18.67px;
			width: 190px;
			padding-left: 20px;
			text-align: left;
			line-height: 45px;
			box-sizing: border-box;
			i{
				vertical-align: middle;
				font-size: 25px;
				padding-right: 10px;
			}
		}
	}
	.userstability{
		margin-bottom: 22px;
	}
</style>