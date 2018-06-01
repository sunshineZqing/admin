<template>
  <div class="">
      <div class="addtions">
          <el-select  filterable placeholder="请选择审核时间" slot="thetrialconditions" v-model="conditions.flag" clearable>
              <el-option v-for="item in flags" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
          <div class="block">
              <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
              </el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
      </div>
      <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera="showopera" key="usertie"></basetable>
      <basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
  </div>
</template>
<script>
  import basetable from '@/components/basetable'
  import basepage  from '@/components/basepage'
  import { dateformat } from '@/utils/index'
  export default{
    name:'thetrial',
    components:{ basetable,basepage },
    mounted(){
       this.getlist()
       this.conditions.user_id = this.$route.params.user_id
    },
    data(){
      return {
            loading:false,
            showopera:false,
            // 搜索条件
            conditions:{
              user_id:'',
              auditTimeStart:'',  //开始时间
              auditTimeEnd:'',    //结束时间
              flag:''            //检索类型
            }, 
            flags:[
              {label:'复审待确认',value:'0'},
              {label:'复审待审',value:'1'},
              {label:'终审待审 ',value:'2'},
              {label:'复审不通过',value:'3'},
              {label:'复审通过',value:'4'},
              {label:'终审不通过',value:'5'},
              {label:'终审通过',value:'6'},
              {label:'客户暂无提额需求',value:'7'},
            ],
            value9:"",
            //分页条数总长度
            pagesize:10,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
            		{   label:'提额时间',     prop:'ma_createtime'  },            
                {   label:'提额类别',     prop:'m_type' },          
                {   label:'单次提额限额', prop:'single_mention_quota' },           
                {   label:'本次提额额度', prop:'this_mention_amount' },           
                {   label:'是否通过', prop:'ma_status' }, //0复审待确认、1复审待审、2、终审待审 3复审不通过、4复审通过、5、终审不通过 6、终审通过7、客户暂无提额需求
				
				
           ]
      }
    },
    methods:{
      getlist(){//请求初审的数据
          this.$api.usermentiondetails(this.conditions).then(res=>{},response=>{
              this.loading  = false
              if(response.data.resultCode == 0){
                this.baseinfo = response.data.returnObj.mentionDetails
                  //格式化处理
                  this.baseinfo.forEach(elem=>{
                      switch(elem.m_type){
                         case 0: elem.m_type = '只使用快借';break;
                         case 1: elem.m_type = '只使用分期';break;
                         case 2: elem.m_type = '快借、分期均未使用';break;
                         case 3: elem.m_type = '快借分期同时使用';break;
                      }
                      switch(elem.ma_status){
                         case 0: elem.ma_status  = '复审待确认';break;
                         case 1: elem.ma_status  = '复审待审';break;
                         case 2: elem.ma_status  = '终审待审';break;
                         case 3: elem.ma_status  = '复审不通过';break;
                         case 4: elem.ma_status  = '复审通过';break;
                         case 5: elem.ma_status  = '终审不通过 ';break;
                         case 6: elem.ma_status  = '终审通过';break;
                         case 7: elem.ma_status  = '客户暂无提额需求 ';break;
                      }
                 })
                 this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length || this.pagesize
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
      tosearch(){//搜索
            this.getlist()
      },
      topage(target){//跳页
          this.conditions = Object.assign(target,this.conditions); //对象合并
          this.getlist()
      },
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