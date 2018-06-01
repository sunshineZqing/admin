<template>
	<div class="maillist">
		<!-- <div class="maillistCon"  v-if="authitem">
			<div class="mailConTit">
				<div>
					<span>联系人总个数：</span><span v-text="authitem.total"></span>
				</div>
				<div>
					<span>特殊标识个数：</span><span v-text="authitem.special_num"></span>
				</div>
				<div>
					<span>家人标识个数：</span><span v-text="authitem.family_num"></span>
				</div>
				<div>
					<span>自己电话号码个数：</span><span v-text="authitem.another_num"></span>
				</div>
			</div>
			<div class="mailTable">
				<el-table class="el-table" :data="authitem.list" border style="width: 100%">
					<el-table-column prop="phone_name"   label="姓名" align="center"></el-table-column>
					<el-table-column prop="phone"  label="电话" align="center"></el-table-column>
					<el-table-column prop="atd_type" label="类型" align="center"></el-table-column>
				</el-table>
			</div>
		</div> -->
		<br>
		<el-button type="primary" size="medium" @click="showdetails">{{infotxt}}</el-button>
	    <div v-show="isshow" class="origininfo" v-loading='contantload'>
	    	<div class="taginfoout">
				<el-tag class="" type="primary"><span>通讯录总量(人)：</span>{{summarypeople}}</el-tag>
			</div>
		    <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="item in roleList" :label="item.name" :name="item.name" :key="item.name">
					<div v-show="item.name=='高危联系人'">
						<div class="taginfoout">
							<el-tag class="" type="danger"><span>数量：</span>{{dangerpeople}}</el-tag>
						</div>
						<origintable  :originTableTitel = "basetabletitle" :originTableInfo = "baseinfo"></origintable>
					</div>
					<div v-show="item.name=='联系人'">
						<div class="taginfoout">
							<el-tag class="" type="danger"><span>数量：</span>{{normalpeople}}</el-tag>
						</div>
						<origintable  :originTableTitel="mailertitle" :originTableInfo="mailerinfo"></origintable>
					</div>
				</el-tab-pane>
		    </el-tabs>
	    </div>
		<cloudsubmit></cloudsubmit>
	</div>
</template>

<script>
	import cloudsubmit from './cloudsubmit'
	import origintable from '@/components/origintable'
	import { isEmptyObject} from '@/utils/index'
	import { mapGetters } from 'vuex'
	export default {
		name: 'maillist',
		components:{cloudsubmit,origintable},
		props:{
           authitem:Object || Array
		},
		data(){
			return{
                contantload:false,
                phonetypelist:[],
                infotxt:"查看原始数据",
				isshow:false,
                roleList:[
                  { name:'高危联系人'},
                  { name:'联系人'}
                ],
                activeName:'高危联系人',
                basetabletitle:[
                  {   label:'电话号码', prop:'phoneNum'},
                  {   label:'姓名', prop:'phoneName'}
                ],
                baseinfo:[],
                mailertitle:[
                  {   label:'电话号码', prop:'phoneNum'},  
                  {   label:'姓名',   prop:'phoneName'}
                ],
                mailerinfo:[],
                summarypeople:0, //总人数
                dangerpeople:0, //高危联系人
                normalpeople:0, //正常联系人
			}
		},
		 mounted(){
//		 	if(!isEmptyObject(this.authitem)&&this.authitem.list&&this.authitem.list.length>0){
//                 this.authitem.list.forEach(elem=>{
//	         		switch(elem.atd_type){
//	         			case 0:elem.atd_type = '本人手机号';break;
//	         			case 1:elem.atd_type = '备用手机号';break;
//	         			case 2:elem.atd_type = '紧急联系人手机号';break;
//	         			case 3:elem.atd_type = '家人手机号';break;
//	         			case 4:elem.atd_type = '通话前10名联系人手机号';break;
//	         		} 
//	             })
//		 	}else{
//		 		this.$watch('authitem',()=>{
//		 			if(!isEmptyObject(this.authitem)&&this.authitem.list&&this.authitem.list.length>0){
//	                     this.authitem.list.forEach(elem=>{
//		         	 	    switch(elem.atd_type){
//		 	        			case 0:elem.atd_type = '本人手机号';break;
//		 	        			case 1:elem.atd_type = '备用手机号';break;
//		 	        			case 2:elem.atd_type = '紧急联系人手机号';break;
//		 	        			case 3:elem.atd_type = '家人手机号';break;
//		 	        			case 4:elem.atd_type = '通话前10名联系人手机号';break;
//		         		    }
//		 	            })
//	                 }
//		 		})
//		 	}
		},
		methods:{
			showdetails(){//原始数据
				if(!this.isshow){
					this.isshow  = true
					this.infotxt = '关闭原始数据'
					this.contantload = true
					this.$fksh.getoriginalhighRiskMaillist({userId:this.$route.params.user_id,type:sessionStorage.getItem('newlodType')}).then(res=>{},response=>{ //高危联系人
	                	this.contantload = false
		            	if(response.data.resultCode=='0'){
			            	if(response.data.returnObj.highRiskList){
                                this.baseinfo      =   response.data.returnObj.highRiskList
                                this.dangerpeople  =   response.data.returnObj.highRiskList.length
                                this.summarypeople =   response.data.returnObj.totalCount
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
	      	    if(this.activeName == "联系人"){
                   this.getmaillist()
	      	    }
	        },
	        getmaillist(){
                this.$fksh.getoriginalMaillist({userId:this.$route.params.user_id}).then(res=>{},response=>{//联系人
                	this.contantload = false
	            	if(response.data.resultCode=='0'){
		            	if(response.data.returnObj.js){
                            this.mailerinfo    =   response.data.returnObj.js
                            this.normalpeople  =   response.data.returnObj.js.length
		            	}
	            	}else{
	            		this.contantload = false
	            		this.$message.error('查询失败')
	            	}                                
		        }).catch(val=>{//捕获异常
		        	this.contantload = false
	                this.$message.error('服务器异常')
		        })
	        }
		}
	}
</script>

<style scoped lang="less">
	.maillist {
		width: 100%;
		margin-bottom: 55px;
	}
	
	.maillistCon {
		width: 65%;
		margin-left: 250px;
		margin-top: 35px;
		font-size: 16px;
	}
	
	.mailConTit div {
		display: inline-block;
		width: 24%;
	}
	
	.mailConTit div span:last-child {
		display: inline-block;
		width: 25%;
	}
	
	.mailConTit {
		width: 100%;
		padding: 10px;
		text-align: left;
	}
	.mailTable{
		margin: 10px 0;
	}

	.origininfo{
		width: 90%;
		margin:  auto;
	}
	.taginfoout{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		/*.taginfo{
			margin: 0 10px 10px 0;
		}
		.taginfo{
			margin: 0 10px 10px 0;
			position: static;
		}*/
		.el-tag{
			margin: 0 10px 10px 0;
		}
	}
</style>