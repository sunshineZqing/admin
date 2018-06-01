<template>
	<div class="academic">
		<!-- <div class="academicBox">
			<div class='academicCont' v-if="authitem">
				<div class="">
					<span>身份证与姓名是否一致：</span><span v-if="authitem.identity_agreement==0">一致</span><span v-if="authitem.identity_agreement==1">不一致</span><span v-if="!authitem.identity_agreement&&authitem.identity_agreement!=0"></span>
				</div>
				<div class="">
					<span>学历：</span><span v-text="authitem.education"></span>
				</div>
				<div class="">
					<span>学校离校时间：</span><span v-text="authitem.leave_school_time"></span>
				</div>
				<div class="">
					<span>专业：</span><span v-text="authitem.major"></span>
				</div>
				<div class="">
					<span>状态：</span><span v-if="authitem.xra_status==0">在籍</span><span v-if="authitem.xra_status==1">不在籍</span><span v-if="!authitem.xra_status&&authitem.xra_status!=0"></span>
				</div>
			</div>
		</div> -->
		<br />
		<el-button type="primary" size="medium" @click="details">{{infotxt}}</el-button>
	    <div v-show="isshow" class="isshowBox" v-loading='detailsLoading'>
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='学历信息'" >
						<div class="academicInfor" v-if="educationalBackground">
							<div class="academicInforTop">
								<div class="academicInforTopL">
									<div class="">
										<span>姓名：</span><span>{{educationalBackground.name}}</span>
									</div>
									<div class="">
										<span>性别：</span><span>{{educationalBackground.sex}}</span>
									</div>
									<div class="">
										<span>出生日期：</span><span>{{educationalBackground.birthData}}</span>
									</div>
								</div>
								<div class="academicInforTopR">
									<div class="">
										<span>入学时间：</span><span>{{educationalBackground.enrollmentYear}}</span>
									</div>
									<div class="">
										<span>毕业时间：</span><span>{{educationalBackground.graduationYear}}</span>
									</div>
									<div class="">
										<span>学历类型：</span><span>{{educationalBackground.degreeCategory}}</span>
									</div>
								</div>
								<div class="academicInforTopImg" v-if="schoolRoll.graduationPhoto">
									<img :src="imgsrc+schoolRoll.graduationPhoto"/>
								</div>
							</div>
							<div class="academicInforBottom">
								<div class="">
									<span>学历层次：</span><span>{{educationalBackground.educationLevel}}</span>
								</div>
								<div class="">
									<span>毕业学校：</span><span>{{educationalBackground.school}}</span>
								</div>
								<div class="">
									<span>证书编号：</span><span>{{educationalBackground.certificateNumber}}</span>
								</div>
								<div class="">
									<span>学校所在地 ：</span><span>{{educationalBackground.seat}}</span>
								</div>
								<div class="">
									<span>专业名称：</span><span>{{educationalBackground.specialities}}</span>
								</div>
								<div class="">
									<span>学习形式：</span><span>{{educationalBackground.learningForm}}</span>
								</div>
							</div>
						</div>
						<div v-else>暂无数据</div>
					</div>
					<div v-show="item.name=='学籍信息'">
						<div class="academicInfor"  v-if="schoolRoll">
							<div class="academicInforTop">
								<div class="academicInforTopL">
									<div class="">
										<span>姓名：</span><span>{{schoolRoll.name}}</span>
									</div>
									<div class="">
										<span>性别：</span><span>{{schoolRoll.sex}}</span>
									</div>
									<div class="">
										<span>证件号码：</span><span>{{schoolRoll.certificateNumber}}</span>
									</div>
								</div>
								<div class="academicInforTopR">
									<div class="">
										<span>民族：</span><span>{{schoolRoll.nations}}</span>
									</div>
									<div class="">
										<span>出生日期：</span><span>{{schoolRoll.birthDate}}</span>
									</div>
									<div class="">
										<span>学号 ：</span><span>{{schoolRoll.studentLD}}</span>
									</div>
								</div>
								<div class="academicInforTopImg" v-if="schoolRoll.graduationPhoto">
									<img :src="imgsrc+schoolRoll.graduationPhoto"/>
								</div>
							</div>
							<div class="academicInforBottom">
								<div class="">
									<span>学习形式：</span><span>{{schoolRoll.learningForm}}</span>
								</div>
								<div class="">
									<span>班级：</span><span>{{schoolRoll.certificateNumber}}</span>
								</div>
								<div class="">
									<span>院校名称：</span><span>{{schoolRoll.school}}</span>
								</div>
								<div class="">
									<span>入校时间：</span><span>{{schoolRoll.admissionDate}}</span>
								</div>
								<div class="">
									<span>学制 ：</span><span>{{schoolRoll.educationalSystem}}</span>
								</div>
								<div class="">
									<span>专业名称：</span><span>{{schoolRoll.specialities}}</span>
								</div>
								<div class="">
									<span>离校时间：</span><span>{{schoolRoll.leaveDate}}</span>
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
		    </el-tabs>
	    </div>
		<cloudsubmit></cloudsubmit>
		
	</div>
</template>
<script>
	import cloudsubmit from './cloudsubmit'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	import config from '@/config/index'
	export default{
		name:'academic',
		components:{cloudsubmit},
		props:{
           authitem:Object || Array
		},
		data(){
			return{
				infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'学历信息'},
                  { name:'学籍信息'},
                ],
                activeName:'学历信息',
                educationalBackground:{},
                schoolRoll:{},//学信网信息
                imgsrc:'',
                detailsLoading:true,
			}
		},
		mounted(){
			this.imgsrc = config.imgsrc;
		},
		methods:{
			details(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据';
					this.detailsLoading=true;
	                this.$fksh.getoriginalacademic({userId:this.$route.params.user_id}).then(res=>{},response=>{//
						this.detailsLoading=false;
		            	if(response.data.resultCode == '0'){
		            		if(response.data.returnObj.js.educationalBackground&&response.data.returnObj.js.schoolRoll){
		            			this.educationalBackground = response.data.returnObj.js.educationalBackground[0];
		            			this.schoolRoll = response.data.returnObj.js.schoolRoll[0];
		            		}else{
		            			this.$message.warning('暂无信息')
		            		}
		            	}else{
		            		this.$message.error('查询失败')
		            	}                                
			        }).catch(val=>{//捕获异常
			        	console.log(val)
			        	this.detailsLoading=false;
		                this.$message.error('服务器异常')
			        })
				}else{
					this.isshow = false
					this.infotxt = '查看原始数据'
				}

			},
			handleClick(tab, event) {//切换当前项
	      	    this.activeName = tab.name
	        },
		}
	}
</script>
<style lang="less" scoped>
	.academic{
		margin-bottom: 50px;
	}
	.academicBox{
		margin: 60px auto 30px;
		width: 800px;
		border: 1px solid #30c9f3;
	}
	.academicCont{
		text-align: left;
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		background: #f0f9fc;
		div{
			flex-grow:2.5;
			display: inline-block;
			width: 50%;
			padding:30px 0 30px 15px ;
			box-sizing: border-box;
		}
	}
	.isshowBox{
		width: 90%;
		margin: auto;
	}
	.academicInfor{
		margin: 60px auto 30px;
		width: 1000px;
		border: 2px solid #eee;
		text-align: left;
		.academicInforTopL,.academicInforTopR,.academicInforTopImg{
			display: inline-block;
			width: 30%;
			vertical-align: top;
			div{
				padding:0 10px;
				line-height: 3.5;
			}
			img{
				width: 120px;
				padding: 10px;
			}
		}
		.academicInforBottom{
			width: 100%;
			div{
				display: inline-block;
				width: 30%;
				padding:0 10px;
				line-height: 3.5;
				box-sizing: border-box;
			}
		}
		
	}
</style>