<template>
    <div class="easymanage">
        <div class="addtions">
            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword" clearable></el-input>
            <el-input placeholder="请输入初审人姓名" prefix-icon="el-icon-search" v-model="conditions.oneName" clearable></el-input>
            <el-input placeholder="请输入复审人姓名" prefix-icon="el-icon-search" v-model="conditions.twoName" clearable></el-input>
            <div class="block">
                <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
                </el-date-picker>
            </div>
            <el-select v-model="conditions.fil" filterable placeholder="请选择审核时间" slot="thetrialconditions"  clearable>
                <el-option v-for="item in audittime" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            <el-select v-model="conditions.certify" filterable placeholder="请选择审核范围" slot="thetrialconditions" clearable>
                <el-option v-for="item in auditscope" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
             <el-select v-model="conditions.second_score_flag" filterable placeholder="是否评分" slot="thetrialconditions"  clearable>
                <el-option v-for="item in isscoreds" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getlist">搜索</el-button>
        </div>
        <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera="showopera" key="easymanage">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="易指数认证详情" placement="left">
                  <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope.scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip v-if="scope.scope.row.is_delay=='未延时'" class="item" effect="dark" content="延时" placement="left">
                   <el-button type="text" icon='iconfont icon-yonghu' @click="todelay(scope.scope.row)"></el-button>
                </el-tooltip>
            </template>
        </basetable>
        <basepage  :sunmary="pagesize" v-on:topage="topage" :currentp='currentpage'></basepage>
        
        <!-- <globaldialog v-on:confirmclose="confirmclose"><span>确认延时?</span></globaldialog> -->
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
    name:'easymanage',
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
            showopera:true,
            currentpage:1,//默认页码
            // 搜索条件
            conditions:{
                action:'0',
                keyword:'',         //关键词
                oneName:'',         //初审人
                twoName:'',         //复审人
                auditTimeStart:'',  //开始时间
                auditTimeEnd:'',    //结束时间
                fil:'',            //检索类型
                certify:'',         //审核流程
                second_score_flag:'',//评分状态
            }, 
            audittime: [  //审核时间
                { value: '1',label: '初审时间' }, 
                { value: '2',label: '复审时间' }, 
                { value: '3',label: '终审时间' }
            ],
            auditscope:[
                { value: '1', label: '初审' },
                { value: '2', label: '复审' },
                { value: '11',label: '复审更新' },
                { value: '6', label: '复审不通过' },
                { value: '8', label: '复审通过' },
                { value: '9', label: '复审驳回' },
                { value: '3' ,label: '终审' },
                { value: '21',label: '终审更新' },
                { value: '4', label: '终审通过' },
                { value: '5', label: '终审不通过' },
                { value: '7', label: '终审驳回' }
            ],  
            isscoreds:[
               { value:0,label:'未评分'},
               { value:1,label:'可更新评分'},
               { value:2,label:'已评分'}
            ],
            //审核流程
            auditscopecurrent:'',//当前审核范围
            value9:"",
            //分页总长度
            pagesize:10,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
                {  label:'用户编号', prop:'user_id' },          
                {  label:'用户姓名', prop:'name'    },           
                {  label:'性别',     prop:'gender'  },            
                {  label:'手机号',   prop:'phone' ,width:120  },           
                {  label:'易指数',   prop:'ynum_count'},        
                {  label:'未认证',   prop:'notCertified'},            
                {  label:'认证中',   prop:'certified'},            
                {  label:'已认证',   prop:'alreadCertified'},            
                {  label:'注册时间', prop:'create_time' ,width:160   },            
                {  label:'完善资料时间', prop:'perfect_time',width:160  },            
                {  label:'初审人',   prop:'firstname' },            
                {  label:'初审时间', prop:'first_time',width:160 },            
                {  label:'复审人',   prop:'secondname'},            
                {  label:'复审时间', prop:'second_time' ,width:160 },            
                {  label:'终审人',   prop:'thirdname'},            
                {  label:'终审时间', prop:'third_time',width:160 },            
                {  label:'是否延时', prop:'is_delay'},            
                {  label:'用户分类', prop:'classification'}, 
                {  label:'是否评分', prop:'second_score'},            
                {  label:'审核状态', prop:'auditflag'},
           ],
           userId:'',//延时操作的参数
        }
    },
    methods:{
        getlist(){//请求数据
        	this.loading  = true;
            this.$api.getriskprimary(this.conditions).then(res=>{},response=>{
                this.loading  = false;
                if(response.data.resultCode == 0){
                    let params   =  {label:this.$route.name,value:this.conditions}
                    this.$store.dispatch('SAVECONDITION',params) //存储搜索条件
                    this.baseinfo = response.data.returnObj.userList
                    this.baseinfo.forEach(elem=>{
                        elem.gender   = elem.gender == '0' ? '男':'女';
                        elem.is_delay = elem.is_delay == '1' ? '已延时':'未延时';
                        switch(elem.classification){
                           case 1: elem.classification = '学生';break;
                           case 2: elem.classification = '上班族';break;
                           case 3: elem.classification = '公务员';break;
                           case 4: elem.classification = '芝麻信用';break;
                        }
                        switch(elem.auditflag){
                           case 1: elem.auditflag  = '初审';break;
                           case 11: elem.auditflag = '复审更新';break;
                           case 2: elem.auditflag  = '复审';break;
                           case 21: elem.auditflag = '终审更新';break;
                           case 3: elem.auditflag  = '终审';break;
                           case 4: elem.auditflag  = '终审通过';break;
                           case 5: elem.auditflag  = '终审不通过';break;
                           case 6: elem.auditflag  = '复审不通过';break;
                           case 7: elem.auditflag  = '终审驳回';break;
                           case 8: elem.auditflag  = '复审通过';break;
                           case 9: elem.auditflag  = '复审驳回';break;
                        }
                        switch(elem.second_score_flag){
                           case 0: this.$set(elem,'second_score','未评分') ;    break;
                           case 1: this.$set(elem,'second_score','可更新评分') ;break;
                           case 2: this.$set(elem,'second_score','已评分') ;    break;
                        }
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
                this.conditions.auditTimeStart = dateformat(value[0],'yyyy-MM-dd')
                this.conditions.auditTimeEnd   = dateformat(value[1],'yyyy-MM-dd')
            }
        },
        todetails(row){ //认证详情
        	console.log(row)
            this.$store.dispatch('SETSCORE',row.ynum_count)
            this.$router.push({ name: '易指数认证详情',params:{ 
                user_id:row.user_id,
                ynum_id:row.ynum_id,
                alreadCertified:row.alreadCertified,
                auditflag:row.auditflag,
                action:this.conditions.action,
                isInvalid:'0'
            }})
        },
        topage(target){//跳页
            this.conditions = Object.assign(this.conditions,target); //对象合并
            this.getlist()
        },
        todelay(row){ //延时
            this.userId = row.user_id
			this.$confirm('请求延时操作, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	// 请求延时操作
                this.$api.easydelay({userId:this.userId}).then(res=>{},response=>{
                    if(response.data.resultCode=='0'){
                        Message.success('操作成功')
                        //重新请求数据
                        this.getlist()
                    }else{
                        Message.error('操作失败')
                    }
                }).catch(val=>{//捕获异常
					Message.error('服务器异常')
                })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
        },
        confirmclose(target){//监听提示dialog回调
            if(target==1){ //确认回调
                // 请求延时操作
                this.$api.easydelay({userId:this.userId}).then(res=>{},response=>{
                    if(response.data.resultCode=='0'){
                        Message.success('操作成功')
                        //重新请求数据
                        this.getlist()
                    }else{
                        Message.error('操作失败')
                    }
                }).catch(val=>{//捕获异常

                })
            }
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