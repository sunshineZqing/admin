<template>
	<div class="scoremanage">
        <div class="addtions">
            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>
            <!-- <el-input placeholder="评分时间" prefix-icon="el-icon-search" v-model="conditions.scoretime"></el-input> -->
            <div class="block">
                <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
                </el-date-picker>
            </div>
            <el-select v-model="conditions.fil" filterable placeholder="审核流程" slot="thetrialconditions"  clearable>
                <el-option v-for="item in auditscope" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getlist">搜索</el-button>
            <a class="download" :href="'/ykj/ynum/score/excel.do?keyword='+conditions.keyword+'&auditTimeStart='+conditions.auditTimeStart+'&auditTimeEnd='+conditions.auditTimeEnd+'&fil='+conditions.fil" target="_blank">下载</a>
        </div>
        <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :loading="loading" :showopera="showopera" key="scoremanage">
            <template slot-scope="scope">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope.scope.row)"></el-button>
            </template>
        </basetable>
		<basepage  :sunmary="pagesize" v-on:topage="topage" :currentp='currentp' key='scoremanage'></basepage>
	</div>
</template>
<script>
    import Vue from 'vue'
	import basetable from '@/components/basetable'
	import v2table from '@/components/v2table'
	import basepage  from '@/components/basepage'
	import { mapGetters } from 'vuex'
	import { dateformat } from '@/utils/index'
	import { isEmptyObject} from '@/utils/index'
	export default {
		name:'scoremanage',
		components:{ basetable,basepage,v2table },
	    created(){
            let midlist =  this.searchlist.filter(elem=>{
				return elem.label === this.$route.name
			})
			if(midlist.length!=0){
			    this.conditions = midlist[0].value
			    this.currentp  = parseInt(this.conditions.currentPage)  || 1
			}
			this.getlist()
	    },
	    computed:{
	      ...mapGetters(['searchlist'])
	    },
		data() {
            // 搜索条件
            return{
            	loading:true,  
            	showopera:true, //是否显示操作按钮
            	showconditions:true,//是否显示搜索条件
            	currentp:1,//默认页码
	            conditions:{
		    		keyword:'', //关键词
		    		// scoretime:'',     //评分时间    
		    		auditTimeStart:'',//开始时间
		    		auditTimeEnd:'',  //结束时间
		    		fil:'',          //检索类型
	    		},
	    	    auditscope:[  
	    	       { value: '1', label: '初审' },
	    	       { value: '2', label: '复审' }
	    	    ],   //审核流程
	    		value9:"",
	    		//分页总长度
	    		pagesize:10,
	            //表格基本信息
	            baseinfo:[], 
	            basetabletitle:[
	                { label:'风控姓名', prop:'name' },          
	                { label:'总评分',   prop:'score'    },           
	                { label:'职位',     prop:'role_name'  }
	           ]
	       }
		},
		methods:{
			 getlist(){//请求评分列表数据
		        this.$api.getscorelist(this.conditions).then(res=>{},response=>{
		        	this.loading  = false
		        	if(!isEmptyObject(response.data.returnObj)){
		        		let params    =  {label:this.$route.name,value:this.conditions}
                        this.$store.dispatch('SAVECONDITION',params) //存储搜索条件
		        		this.baseinfo = response.data.returnObj.scoreList
	                    this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length || 0
		        	}else{
		        		this.$message.error('查询失败')
		        	}
		        }).catch(val=>{//捕获异常
                     this.$message.error('服务器异常')   
		        })
		    },
			changetime(value){//开始时间 结束时间
				if(value&&value[0]&&value[1]){
					this.conditions.auditTimeStart = dateformat(value[0],'yyyy-MM-dd')
					this.conditions.auditTimeEnd   = dateformat(value[1],'yyyy-MM-dd')
				}
            },
            todetails(row){
		        this.$router.push({ name: '评分详情'})
	            let scoreparams = {
	            	user_id:row.su_id,
	            	auditTimeStart:this.conditions.auditTimeStart,
	            	auditTimeEnd:this.conditions.auditTimeEnd,
	            	fil:this.conditions.fil
	            }
	            this.$store.dispatch('SCOREDETAILS',scoreparams)
		    },
	        topage(target){//跳页
	            this.conditions = Object.assign(this.conditions,target); //对象合并
	            this.getlist()
	        }
		}
	}	
</script>
<style lang="less" scoped> 
    div.el-table{
    	margin-top: 15px;
    }
    .addtions{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        div,button{
            margin-left:20px; 
        }
        button{
            line-height: 32px;
        }
        div.el-input{
            width: 12%;
        }
    }
    .download{
	    color: #fff;
	    text-decoration: none;
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    font-weight: 500;
	    padding: -12px 20px;
	    font-size: 14px;
	    margin-right: 10px;
	    padding: 10px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    border-color: #409EFF;
	    background-color: #409EFF;
	}
</style>