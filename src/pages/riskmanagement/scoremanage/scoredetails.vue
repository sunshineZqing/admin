<template>
	<div class="scoredetails">
		<basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :loading="loading" :showopera="showopera" key="scoredetails">
            <template slot-scope="scope">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope)"></el-button>
            </template>
        </basetable>
		<basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
	</div>
</template>
<script>
    import { mapGetters } from 'vuex'
	import basetable from '@/components/basetable'
	import v2table from '@/components/v2table'
	import basepage  from '@/components/basepage'
	import { dateformat } from '@/utils/index'
	export default {
		name:'scoredetails',
		components:{ basetable,basepage,v2table },
		beforeRouteEnter (to, from, next) {
	      next(vm => {
	        vm.init()
	      })
	    },
	    computed:{
			...mapGetters(['scoreparams'])
		},
		data() {
            // 搜索条件
            return{
            	loading:false,
            	showopera:false,
            	conditions:{},
	    		//分页总长度
	    		pagesize:10,
	            //表格基本信息
	            baseinfo:[], 
	            basetabletitle:[
	                {  label:'评分人',   prop:'name' },          
	                {  label:'评分',     prop:'score' },           
	                {  label:'评分时间', prop:'score_time'  },            
	                {  label:'评分内容', prop:'score_remark',width:800  }            
	           ]
	       }
		},
		methods:{
			init(){
				this.conditions = this.scoreparams
                this.getlist()
			},
			getlist(){//请求数据
		        this.$api.scoredetails(this.conditions).then(res=>{},response=>{
		        	  this.loading  = false
		        	  if(response.data.resultCode == 0){
			              this.baseinfo = response.data.returnObj.detailsList
		                  this.pagesize = response.data.returnObj.page.totalResult || this.baseinfo.length || this.pagesize
		        	  }else{
                          this.$message.error('查询失败')
		        	  }
		        }).catch(val=>{//捕获异常
                    this.$message.error('服务器异常')
		        })
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
</style>