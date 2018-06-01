<template>
    <div class="">
        <div class="addtions">
            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword"></el-input>
            <div class="block">
                <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
                </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
        </div>
        <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera="showopera" key="thetrial">
            <template slot-scope="scope">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope)"></el-button>
            </template>
        </basetable>
        <basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
    </div>
</template>
<script>
  import basetable from '@/components/basetable'
  import basepage  from '@/components/basepage'
  import { dateformat } from '@/utils/index'
  import { isEmptyObject} from '@/utils/index'
  export default{
    name:'thetrial',
    components:{ basetable,basepage },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        switch(to.name){
            case '初审':vm.conditions.action = '1';
                        break;
            case '复审':vm.conditions.action = '2';
                        break;
            case '终审':vm.conditions.action = '3';
                        break;
        }
        vm.loading = true
        vm.getlist()
      })
    },
    data(){
        return {
            loading:true,
            showopera:true,
            // 搜索条件
            conditions:{
                action:'1', //1初审
                keyword:'',         //关键词
                auditTimeStart:'',  //开始时间
                auditTimeEnd:'',    //结束时间
                fil:'0',            //检索类型
                certify:'',         //审核流程
            }, 
            value9:"",
            //分页总长度
            pagesize:10,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
                {   label:'用户编号', prop:'user_id' },          
                {   label:'用户姓名', prop:'name'    },           
                {   label:'性别',     prop:'gender'  },   
                {   label:'年龄',     prop:'age'  },             
                {   label:'手机号',   prop:'phone'    },           
                {   label:'注册地',   prop:'location' },           
                {   label:'户籍所在地',   prop:'detalis_address' },           
                {   label:'易指数',   prop:'ynum_count'}, 
                {   label:'授权额度',   prop:'authorized_amount'}, 
                {   label:'可用额度',   prop:'available_amount'}, 
                {   label:'初审人',   prop:'name1' },            
                {   label:'初审时间', prop:'createtime1',width:'160px' },            
                {   label:'复审人',   prop:'name2'},            
                {   label:'复审时间', prop:'createtime2',width:'160px' },            
                {   label:'终审人',   prop:'name3'},            
                {   label:'终审时间', prop:'createtime3',width:'160px' }, 
                {   label:'催收人',   prop:'csname'}, 
                {   label:'用户状态',   prop:'status'}, 
                {   label:'快借借款次数',   prop:'bnum'}, 
                {   label:'快借逾期次数',   prop:'bionum'}, 
                {   label:'快借借款总金额',   prop:'borrow_amount'}, 
                {   label:'快借待还金额',   prop:'borrow_amount_stay_pay'}, 
                {   label:'快借借款逾期总金额',   prop:'ioborrow_amount'}, 
                {   label:'快借借款逾期待还金额',   prop:'borrow_amountstay_pay'}, 
                {   label:'快借逾期率',prop:'ci'},            
                {   label:'分期借款总金额',   prop:'amount_count'},            
                {   label:'分期借款总期数',   prop:'qishu'},            
                {   label:'分期借款待还总金额', prop:'yue_gong_amount_stay_pay'},            
                {   label:'分期借款逾期期数', prop:'over_qishu'},   
                {   label:'分期借款逾期待还总金额', prop:'yue_gongamount_stay_pay'},            
                {   label:'分期逾期率', prop:'fci'}           
           ]
        }
    },
    methods:{
        getlist(){//请求初审的数据
            this.$api.overanalysis(this.conditions).then(res=>{},response=>{
                this.loading  = false
                if(!isEmptyObject(response.data.returnObj)){
                    this.baseinfo = response.data.returnObj.userList
                    this.baseinfo.forEach(elem=>{
                        elem.gender   = elem.gender == '0' ? '男':'女';
                        switch(elem.classification){
                           case 1: elem.classification = '学生';break;
                           case 2: elem.classification = '上班族';break;
                           case 3: elem.classification = '公务员';break;
                           case 4: elem.classification = '芝麻信用';break;
                        }
                    })
                    this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length
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
        todetails(scope){ //认证详情
        	//需要一个易指数分数 
        	let score  =   scope.scope.row.ynum_count || '0'
        	this.$store.dispatch('SETSCORE',score)
            this.$router.push({ name: '认证详情',params:{ 
                user_id:scope.scope.row.user_id || '0',
                ynum_id:scope.scope.row.ynum_id || '0',
                alreadCertified:scope.scope.row.alreadCertified || '0',
                auditflag:scope.scope.row.auditflag || '0',
                action:this.conditions.action || '0',
                isInvalid:'0',
                ynum_count:scope.scope.row.ynum_count
            }})
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