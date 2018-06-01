<template>
	<div class="installed">
		<!-- <div class="installedCont">
			<div class="mationCont" v-if="authitem">
				<ul>
					<li>
						<span>最近借贷应用<span>（{{authitem.loan_num1}}个）</span></span>
						<span>平安普惠、钱包、块钱借钱宝、招联金融</span>
					</li>
					<li>
						<span>最近理财应用<span>（{{authitem.financing_num1}}个）</span></span>
						<span></span>
					</li>
					<li>
						<span>最近其他应用<span>（{{authitem.other_num1}}个）</span></span>
						<span></span>
					</li>
					<li>
						<span>注册借贷应用<span>（{{authitem.loan_num}}个）</span></span>
						<span></span>
					</li>
					<li>
						<span>注册理财应用<span>（{{authitem.financing_num}}个）</span></span>
						<span></span>
					</li>
					<li>
						<span>注册其他应用<span>（{{authitem.other_num}}个）</span></span>
						<span></span>
					</li>
				</ul>
			</div>
			<div class="installedImg">
				<img src="../img/fkInstalled.png" />
			</div>
		</div> -->
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
		<div v-show="isshow" v-loading='contantload'>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name+'(数量:'+item.num+')'" :name="item.name" :key="item.name">
					<div v-show="item.name=='贷款'">
						<span class="fina_project" v-for="(list,i) in loanApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='理财'">
						<span class="fina_project" v-for="(list,i) in financingApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='银行'">
						<span class="fina_project" v-for="(list,i) in bankApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='生活服务'">
						<span class="fina_project" v-for="(list,i) in lifeApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='购物优惠'">
						<span class="fina_project" v-for="(list,i) in shoppingApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='系统工具'">
						<span class="fina_project" v-for="(list,i) in systemApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='通讯社交'">
						<span class="fina_project" v-for="(list,i) in gamsApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='健康美容'">
						<span class="fina_project" v-for="(list,i) in healthApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='游戏'">
						<span class="fina_project" v-for="(list,i) in gameApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='实用工具'">
						<span class="fina_project" v-for="(list,i) in utilitiesApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='视频音乐'">
						<span class="fina_project" v-for="(list,i) in videoMusicApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='育儿母婴'">
						<span class="fina_project" v-for="(list,i) in babyApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='教育学习'">
						<span class="fina_project" v-for="(list,i) in educationApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='效率办公'">
						<span class="fina_project" v-for="(list,i) in officeApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='摄影美图'">
						<span class="fina_project" v-for="(list,i) in shootApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='新闻阅读'">
						<span class="fina_project" v-for="(list,i) in newsReadingApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='旅游出行'">
						<span class="fina_project" v-for="(list,i) in travelApp" v-show="i>0">{{list}}</span>
					</div>
					<div v-show="item.name=='其他'">
						<span class="fina_project" v-for="(list,i) in otherApp" v-show="i>0">{{list}}</span>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'installed',
		props: {
			authitem: Object || Array
		},
		data() {
			return {
				contantload:false,
				infotxt: '查看原始数据',
				isshow: false,
				activeName:'生活服务',
				roleList: [
				    {
						name: '贷款',num:0
					},
					{
						name: '理财',num:0
					},
					{
						name: '银行',num:0
					},
				    {
						name: '生活服务',num:0
					},
					{
						name: '购物优惠',num:0
					},
					{
						name: '系统工具',num:0
					},
					{
						name: '通讯社交',num:0
					},
					{
						name: '健康美容',num:0
					},
					{
						name: '游戏',num:0
					},
					{
						name: '实用工具',num:0
					},
					{
						name: '视频音乐',num:0
					},
					{
						name: '育儿母婴',num:0
					},
					{
						name: '教育学习',num:0
					},
					{
						name: '效率办公',num:0
					},
					{
						name: '摄影美图',num:0
					},
					{
						name: '新闻阅读',num:0
					},
					{
						name: '旅游出行',num:0
					},
					{
						name: '其他',num:0
					}
				],
				lifeApp:[],
				shoppingApp:[],
				systemApp:[],
				gamsApp:[],
				healthApp:[],
				gameApp:[],
				utilitiesApp:[],
				videoMusicApp:[],
				babyApp:[],
				bankApp:[],
				educationApp:[],
				financingApp:[],
				officeApp:[],
				shootApp:[],
				newsReadingApp:[],
				travelApp:[],
				loanApp:[],
				otherApp:[]
			}
		},
		methods: {
			showdetails() { //原始数据
				if(!this.isshow) {
					this.isshow = true;
					this.infotxt = '关闭原始数据';
					this.contantload = true
					this.$fksh.getoriginalalinstall({
						user_id: this.$route.params.user_id
					}).then(res => {}, response => {
						this.contantload = false
						if(response.data.resultCode == '0') {
							if(!response.data.returnObj.listAllApp){
								this.$message.error('数据异常,请联系管理员')
                                return
							}else{
								//贷款
								this.loanApp         = response.data.returnObj.listAllApp.loanApp;
								this.roleList[0].num= this.loanApp[0]
								//理财
								this.financingApp    = response.data.returnObj.listAllApp.financingApp;
								this.roleList[1].num = this.financingApp[0]
								//银行
								this.bankApp         = response.data.returnObj.listAllApp.bankApp;
								this.roleList[2].num = this.bankApp[0]
								//生活服务
								this.lifeApp         = response.data.returnObj.listAllApp.lifeApp;
								this.roleList[3].num = this.lifeApp[0]
                                //购物优惠
                                this.shoppingApp     = response.data.returnObj.listAllApp.shoppingApp;
                                this.roleList[4].num = this.shoppingApp[0]
                                //系统工具
                                this.systemApp       = response.data.returnObj.listAllApp.systemApp;
                                this.roleList[5].num = this.systemApp[0]
                                //通讯社交
                                this.gamsApp         = response.data.returnObj.listAllApp.gamsApp;
                                this.roleList[6].num = this.gamsApp[0]
                                 //健康美容
								this.healthApp       = response.data.returnObj.listAllApp.healthApp;
								this.roleList[7].num = this.healthApp[0]
								//游戏
								this.gameApp         = response.data.returnObj.listAllApp.gameApp;
								this.roleList[8].num = this.gameApp[0]
                                //实用工具
                                this.utilitiesApp    = response.data.returnObj.listAllApp.utilitiesApp;
                                this.roleList[9].num = this.utilitiesApp[0]
                                //视频音乐
                                this.videoMusicApp   = response.data.returnObj.listAllApp.videoMusicApp;
                                this.roleList[10].num = this.videoMusicApp[0]
                                //母婴育儿
								this.babyApp         = response.data.returnObj.listAllApp.babyApp;
								this.roleList[11].num = this.babyApp[0]
                                //教育学习
								this.educationApp    = response.data.returnObj.listAllApp.educationApp;
								this.roleList[12].num = this.educationApp[0]
								//效率办公
								this.officeApp       = response.data.returnObj.listAllApp.officeApp;
                                this.roleList[13].num= this.officeApp[0]
                                //摄影美图
                                this.shootApp        = response.data.returnObj.listAllApp.shootApp;
                                this.roleList[14].num= this.shootApp[0]
								//新闻阅读
								this.newsReadingApp  = response.data.returnObj.listAllApp.newsReadingApp;
								this.roleList[15].num= this.newsReadingApp[0]
								//旅游出行
								this.travelApp       = response.data.returnObj.listAllApp.travelApp;
								this.roleList[16].num= this.travelApp[0]
								//其他
								this.otherApp        = response.data.returnObj.listAllApp.otherApp;
								this.roleList[17].num= this.otherApp[0]
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
					this.infotxt= '查看原始数据';
				}
			},
			handleClick(tab, event) {//切换当前项
			    this.activeName = tab.name
			},
		}
	}
</script>

<style lang="less" scoped>
	.installed {
		padding: 7% 20px 6%;
		position: relative;
	}
	
	.installedCont {
		text-align: left;
		margin-bottom: 55px;
		position: relative;
	}
	
	.mationCont {
		display: inline-block;
		width: 68%;
		box-sizing: border-box;
		vertical-align: top;
		padding-left: 5%;
		ul {
			margin: 0;
			padding: 0;
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
			li {
				width: 100%;
				box-sizing: border-box;
				list-style: none;
				text-align: left;
				height: 40px;
				display: flex;
				display: -webkit-flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: felx-start;
				align-items: center;
				span {
					height: 40px;
					vertical-align: top;
					display: inline-block;
					box-sizing: border-box;
					text-align: center;
					line-height: 40px;
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
					border-right: 1px solid #30c9f3;
					width: 75%;
					text-align: left;
					padding-left: 15px;
				}
				span:nth-child(2n+1) {
					width: 25%;
					background-color: #f0f9fc;
				}
				span span {
					width: auto !important;
					color: #2bc8f3;
					background: none;
					border: none;
					border-right: none !important;
				}
				;
			}
			li:last-child {
				span {
					border-bottom: 1px solid #30c9f3;
				}
				span span {
					background: none;
					border-bottom: 1px solid #30c9f3;
				}
			}
		}
	}
	
	.installedImg {
		position: absolute;
		bottom: -60px;
		right: 0;
		width: 30%;
		img {
			width: 100%;
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
		}
	}
	.fina_project{
		display: inline-block;
		float: left;
		margin-right: 20px;
	}
</style>