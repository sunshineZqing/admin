<template>
  <div class="customerservice">
      <div class="addtions">
          <div>
          	 <span>拨打总次数</span><span>{{calltimes.sunmarytime}}</span>
          </div>
          <div>
          	  <span>打通次数</span><span>{{calltimes.passtime}}</span>
          </div>
          <div>
          	 <span>打不通次数</span><span>{{calltimes.balancetime}}</span>
          </div>
      </div>
      <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera="showopera" key="customerservice"></basetable>
  </div>
</template>
<script>
	import {isEmptyObject} from '@/utils/index'
  import basetable from '@/components/basetable'
  export default{
    name:'customerservice',
    components:{ basetable },
    mounted(){
       this.getlist()
       this.conditions.user_id = this.$route.params.user_id
    },
    data(){
      return {
            loading:false,
            showopera:false,
            //条件
            conditions:{
              user_id:'' 
            }, 
            baseinfo:[], 
            calltimes:{
            	sunmarytime:'',
            	passtime:'',
            	balancetime:''
            },
            basetabletitle:[
                {   label:'拨打时间', prop:'cstr_createtime' },          
                {   label:'客服人员', prop:'name' },           
                {   label:'打通状态', prop:'cstr_flag'  },            
                {   label:'反馈',     prop:'cstr_detail'   }           
           ]
      }
    },
    methods:{
      getlist(){//请求数据
          this.$api.customerservice({user_id:this.conditions.user_id}).then(res=>{},response=>{
              this.loading  = false
              if(response.data.resultCode == 0){
              	if(!isEmptyObject(response.data.returnObj.kfDetailsList)){
              		this.baseinfo = response.data.returnObj.kfDetailsList
              		//格式化处理
              		this.baseinfo.forEach(elem=>{
              		    switch(elem.cstr_flag){
              		       case 0: elem.cstr_flag = '未打通';break;
              		       case 1: elem.cstr_flag = '打通';break;
              		    }
              		})
              		this.calltimes.sunmarytime = response.data.returnObj.kfCount.num
              		this.calltimes.passtime    = response.data.returnObj.kfCount.num0
              		this.calltimes.balancetime = (parseInt(this.calltimes.sunmarytime) -  parseInt(this.calltimes.passtime)) || 0
              	}else{
                  this.$message.error('暂无数据')
              	}
              }else{
                 this.$message.error('查询失败')
              }
          }).catch(val=>{//捕获异常
              this.$message.error('服务器异常')
          })
      }
    }
  }
</script>
<style lang="less" scoped>
    div.el-table{
      margin-top: 15px;
    }
    .addtions{
    	width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border:1px solid #30c9f3;
        border-right: none;
        div{
        	text-align: center;
        	width: 100%;
	        display: flex;
	        display: -webkit-flex;
	        flex-direction: row;
	        justify-content: space-between;
	        align-items: center;
	        span{
	        	display: inline-block;
	        	padding: 5px 10px;
	        	text-align: center;
	        	border-right:1px solid #30c9f3;
	        }
	        span:first-child{
	        	flex-grow:3;
	        }
	        span:last-child{
	        	flex-grow:1;
	        }

        }
    }
</style>