<template>
    <div class="successrate">
        <div class="addtions">
            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keywords" clearable></el-input>
            
            <el-select v-model="conditions.time" filterable placeholder="请选择提额时间" slot="thetrialconditions"  clearable>
                <el-option v-for="item in audittime" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            <div class="block">
                <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
                </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="getlist">搜索</el-button>
        </div>
        <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" key="successrate">
        </basetable>
        <basepage  :sunmary="pagesize" v-on:topage="topage" :currentp='currentpage'></basepage>
    </div>
</template>
<script>
  import Vue from 'vue'
  import basetable from '@/components/basetable'
  import v2table from '@/components/v2table'
  import globaldialog   from '@/components/dialog'
  import basepage  from '@/components/basepage'
  import { mapGetters } from 'vuex'
  import { dateformat } from '@/utils/index'
  import { Message } from 'element-ui'
  export default{
    name:'successrate',
    components:{ basetable,basepage,globaldialog,v2table },
    created(){
        let midlist =  this.searchlist.filter(elem=>{
            return elem.label === this.$route.name
        })
        if(midlist.length!=0){
            this.conditions = midlist[0].value
            this.currentpage = parseInt(this.conditions.currentPage)  || 1
        }
        this.getlist()
    },
    computed:{
      ...mapGetters(['searchlist'])
    },
    data(){
        return {
            loading:true,
            currentpage:1,//默认页码
            // 搜索条件
            conditions:{
                keywords:'',         //关键词
                time_start:'',  //开始时间
                time_end:'',    //结束时间
                time:'',            //检索类型
            }, 
            audittime:[
            	{ value: '0', label: '最近一次提额时间'},
                { value: '1', label: '注册时间'}
            ], 
            value9:"",
            //分页总长度
            pagesize:0,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
                {  label:'用户编号', prop:'user_id' },          
                {  label:'用户姓名', prop:'name'    },           
                {  label:'性别',     prop:'gender'  },            
                {  label:'年龄',   prop:'age'},           
                {  label:'注册地',   prop:'location'},        
                {  label:'户籍地',   prop:'card_location'},            
                {  label:'初审人',   prop:'usernameFirst'},            
                {  label:'已认证',   prop:'alreadCertified'},            
                {  label:'初审时间', prop:'first_time' ,width:160   },            
                {  label:'复审人', prop:'usernameSecond' },      
                {  label:'复审时间', prop:'second_time' ,width:160 },  
                {  label:'终审时间', prop:'third_time',width:160 },            
                {  label:'提额次数', prop:'countm'},            
                {  label:'提额总额度', prop:'authorized_amount'},            
                {  label:'最近一次提额时间', prop:'ma_createtime',width:160 }, 
                {  label:'提额待审人', prop:'usernameNo'},
                {  label:'快借借款次数', prop:'countb'},
                {  label:'快借逾期次数', prop:'countbOver'},
                {  label:'快借借款总金额', prop:'sumBorrowAmount',width:160 },
                {  label:'快借待还金额', prop:'sumStayPay'},
                {  label:'快借借款逾期总金额', prop:'sumBorrowAmountOver',width:160 },
                {  label:'快借借款逾期待还金额', prop:'sumStayPayOver',width:160 },
                {  label:'快借逾期率', prop:'kjoverder'},
                {  label:'提额后快借逾期次数', prop:'countbOverAfter',width:160 },
                {  label:'分期借款总金额', prop:'sumStaAmount',width:160 },
                {  label:'分期借款总期数', prop:'sumStaqishu',width:160 },
                {  label:'分期借款待还总金额', prop:'sumStageStayPay',width:160 },
                {  label:'分期借款逾期期数', prop:'StageOverCount',width:160 },
                {  label:'分期借款逾期待还总金额', prop:'sumStageOverStayPay',width:160 },
                {  label:'分期逾期率', prop:'fqoverder'},
                {  label:'提额后分期逾期次数', prop:'countsOverAfter',width:160 },
//              
//				countbOver /countb			
//				StageOverCount/ sumStaqishu					
           ],
           userId:'',//延时操作的参数
        }
    },
    methods:{
        getlist(){//请求数据
        	this.loading  = true;
            this.$api.successrateuser(this.conditions).then(res=>{},response=>{
                this.loading  = false;
                if(response.data.resultCode == 0){
                    let params   =  {label:this.$route.name,value:this.conditions}
                    this.$store.dispatch('SAVECONDITION',params) //存储搜索条件
                    this.baseinfo = response.data.returnObj.successList;
                    this.baseinfo.forEach(elem=>{
                       elem.gender   = elem.gender == '0' ? '男':'女';
                       this.$set(elem,'kjoverder',elem.countbOver/elem.countd);
                       this.$set(elem,'fqoverder',elem.StageOverCount/elem.sumStaqishu);
                    })
                    this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length || 0
                }else{
                    this.$message.error('查询失败')
                } 
            }).catch(val=>{//捕获异常
                this.loading  = false
                this.$message.error('服务器异常')
            })
        },
        changetime(value){//开始时间 结束时间
            if(value&&value[0]&&value[1]){
                this.conditions.time_start = dateformat(value[0],'yyyy-MM-dd')
                this.conditions.time_end   = dateformat(value[1],'yyyy-MM-dd')
            }else{
            	this.conditions.time_start = ''
                this.conditions.time_end   = ''
            }
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