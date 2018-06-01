<template>
	<div class="vehicle">
	<!-- 	<div class="vehicleCont" v-if="authitem">
			<div class="">
				<span>品牌：</span><span>{{authitem.vehicle_brand}}</span>
			</div>
			<div class="">
				<span>型号：</span><span>{{authitem.vehicle_model}}</span>
			</div>
			<div class="">
				<span>牌号：</span><span>{{authitem.vehicle_card}}</span>
			</div>
			<img class="vehicleCar" src="../img/car.png" />
		</div> -->
		<br>
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
		<div v-show="isshow" v-loading='contantload'>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div>
						<!-- <basetable :basetabletitle="cartitle" :basetableinfo="carinfo"   :showopera='false' ></basetable> -->
						<origintable :originTableTitel="cartitle" :originTableInfo="carinfo"   :showopera='false' ></origintable>
					</div>
				</el-tab-pane>
		    </el-tabs>
		</div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>

<script>
	import cloudsubmit from './cloudsubmit'
	import basetable from '@/components/basetable'
	import origintable from '@/components/origintable'
	import { isEmptyObject } from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default {
		name: 'vehicle',
		components: {
			cloudsubmit,basetable,origintable
		},
		props: {
			authitem: Object || Array
		},
		data() {
			return {
				contantload:false,
				infotxt: '查看原始数据',
				isshow: false,
				roleList: [{
					name: '基本信息'
				}],
				activeName:'基本信息',
				cartitle:[
				{label:'品牌',prop:'vehicle_brand'},
				{label:'型号',prop:'vehicle_model'},
				{label:'牌号',prop:'vehicle_card'},
				{label:'车辆信息认证状态',prop:'vehicle_status'},
				{label:'认证时间',prop:'vehicle_date'}
				],
				carinfo:[]
			}
		},
		methods: {
			showdetails() {
				if(!this.isshow) {
					this.isshow = true;
					this.infotxt = '关闭原始数据';
					this.contantload = true
					this.$fksh.getoriginalalvehicle({
						user_id: this.$route.params.user_id
					}).then(res => {}, response => {
						this.contantload = false
						if(response.data.resultCode == '0') {
							console.log(response.data.returnObj);
							this.carinfo=[];
							if(response.data.returnObj.js){
								this.carinfo=response.data.returnObj.js;
							}
						} else {
							this.contantload = false
							this.$message.error('查询失败')
						}
					}).catch(val => { //捕获异常
						this.contantload = false
						this.$message.error('服务器异常')
					})
				} else {
					this.isshow = false;
					this.infotxt = '查看原始数据';
				}
			},
			handleClick(tab, event) { //切换当前项
				this.activeName = tab.name
			}
		}
	}
</script>

<style lang="less" scoped>
	.vehicle {
		margin-bottom: 50px;
		padding: 0 20px 6%;
	}
	
	.vehicleCont {
		position: relative;
		width: 45%;
		margin: 50px auto;
		border: 1px solid #2ac9f3;
		border-radius: 5px;
		padding: 40px 0;
		div {
			width: 215px;
			margin: auto;
			padding: 10px 0;
			text-align: left;
		}
		.vehicleCar {
			position: absolute;
			bottom: -16px;
			right: -38px;
		}
	}
</style>