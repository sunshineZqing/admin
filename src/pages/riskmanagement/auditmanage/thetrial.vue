<template>
	<div class="thetrial">
      <div class="addtions">
          <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keyword" clearable></el-input>
          <el-input v-if="showauth" placeholder="请输入初审人姓名" prefix-icon="el-icon-search" v-model="conditions.oneName" clearable></el-input>
          <el-input v-if="showauth" placeholder="请输入复审人姓名" prefix-icon="el-icon-search" v-model="conditions.twoName" clearable></el-input>
          <div class="block">
              <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
              </el-date-picker>
          </div>
          <el-select class="select" v-model="conditions.fil" filterable placeholder="请选择审核时间" slot="thetrialconditions"  clearable>
              <el-option v-for="item in audittime" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
          <el-select class="select" v-model="conditions.certify" filterable placeholder="请选择审核范围" slot="thetrialconditions"  clearable>
              <el-option v-for="item in auditscope" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
      </div>
	   <!--  <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera='true' key="thetrial">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="认证详情" placement="left">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope)"></el-button>
            </el-tooltip>
          </template>
      </basetable> -->
      <basetable  :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera='true' key="thetrial">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="认证详情" placement="left">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope.scope.row)"></el-button>
            </el-tooltip>
          </template>
      </basetable>
	    <basepage  :sunmary="pagesize" v-on:topage="topage" :currentp='currentpage'></basepage>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import basetable from '@/components/basetable'
  import v2table from '@/components/v2table'
  import basepage  from '@/components/basepage'
  import { dateformat } from '@/utils/index'
  export default{
    name:'thetrial',
    components:{ basetable,basepage,v2table },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        switch(to.name){
            case '初审':vm.conditions.action = '1';
                        vm.auditscope        = [
                           { value: '1',label: '初审' }
                        ];
                        vm.showauth = false;
                        break;
            case '复审':vm.conditions.action = '2';
                        vm.auditscope        = [
                           { value: '2', label: '复审' },
                           { value: '11',label: '复审更新' },
                           { value: '8', label: '复审通过' },
                           { value: '9', label: '复审驳回' },
                        ];
                        vm.showauth = false;
                        break;
            case '终审':vm.conditions.action = '3';
                        vm.auditscope        = [
                           { value: '3' ,label: '终审' },
                           { value: '21',label: '终审更新' },
                           { value: '8', label: '复审通过' },
                           { value: '9', label: '复审驳回' },
                           { value: '4', label: '终审通过' },
                           { value: '7', label: '终审驳回' },
                        ];
                        break;
        }
        vm.loading = true
        vm.getlist()
      })
    },
    computed:{
      ...mapGetters(['searchlist'])
    },
    created(){
      let midlist =  this.searchlist.filter(elem=>{
        return elem.label === this.$route.name
      })
      if(midlist.length!=0){
            this.conditions = midlist[0].value
            this.currentpage  = parseInt(this.conditions.currentPage)  || 1
      }
    },
    data(){
    	return {
        loading:true,
        showauth:true,  //是否显示搜索初审人 复审人姓名
        currentpage:1,//默认页码
        // 搜索条件
    		conditions:{
          action:'1', //1初审
          oneName:'',
          twoName:'',
	    		keyword:'',         //关键词
	    		auditTimeStart:'',  //开始时间
	    		auditTimeEnd:'',    //结束时间
	    		fil:'',             //检索类型
	    		certify:'',         //审核流程
    		}, 
    		audittime: [  //审核时间
                { value: '1',label: '初审时间' }, 
                { value: '2',label: '复审时间' }, 
                { value: '3',label: '终审时间' }
            ],
            auditscope:[],   //审核流程
            value9:"",
            //分页条数总长度
    		pagesize:10,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
                {   label:'用户编号', prop:'user_id',fixed:'left',width:'120px'},          
                {   label:'用户姓名', prop:'name',fixed:'left',width:'120px' },           
                {   label:'性别',     prop:'gender'  },            
                {   label:'手机号',   prop:'phone',width:'120px'   },           
                {   label:'易指数',   prop:'ynum_count'},        
                {   label:'未认证',   prop:'notCertified'},            
                {   label:'认证中',   prop:'certified'},            
                {   label:'已认证',   prop:'alreadCertified'},            
                {   label:'注册时间', prop:'create_time',width:'160px'},            
                {   label:'完善资料时间', prop:'perfect_time',width:'160px'},            
                {   label:'初审人',   prop:'firstname' },            
                {   label:'初审时间', prop:'first_time',width:'160px'}, 
                {   label:'复审人',   prop:'secondname'},            
                {   label:'复审时间', prop:'second_time',width:'160px'}, 
                {   label:'初审评分状态', prop:'first_score_flag',width:'120px'},            
                {   label:'终审人',   prop:'thirdname'},            
                {   label:'终审时间', prop:'third_time',width:'160px'},   
                {   label:'复审评分状态', prop:'second_score_flag',width:'120px'},          
                {   label:'是否延时', prop:'is_delay'},            
                {   label:'用户分类', prop:'classification'},            
                {   label:'审核状态', prop:'audittxt'}
           ]       
    	}
    },
    methods:{
	    getlist(){//请求初审的数据
          this.loading  = true
	        this.$api.getriskprimary(this.conditions).then(res=>{},response=>{
                this.loading  = false
                if(response.data.resultCode == '0'){
                  let params   =  {label:this.$route.name,value:this.conditions}
                  this.$store.dispatch('SAVECONDITION',params) //存储搜索条件
	                this.baseinfo = response.data.returnObj.userList
                    //格式化处理
                    this.baseinfo.forEach(elem=>{
                        elem.gender   = elem.gender == '0' ? '男':'女';
                        elem.is_delay = elem.is_delay == '0' ?'未延时':'已延时';
                        switch(elem.classification){
                           case 1: elem.classification = '学生';break;
                           case 2: elem.classification = '上班族';break;
                           case 3: elem.classification = '公务员';break;
                           case 4: elem.classification = '芝麻信用';break;
                        }
                        switch(elem.auditflag){
                           case 1:  this.$set(elem,'audittxt','初审');break;
                           case 11: this.$set(elem,'audittxt','复审更新');break;
                           case 2:  this.$set(elem,'audittxt','复审');break;
                           case 21: this.$set(elem,'audittxt','终审更新');break;
                           case 3:  this.$set(elem,'audittxt','终审');break;
                           case 4:  this.$set(elem,'audittxt','终审通过');break;
                           case 5:  this.$set(elem,'audittxt','终审不通过');break;
                           case 6:  this.$set(elem,'audittxt','复审不通过');break;
                           case 7:  this.$set(elem,'audittxt','终审驳回');break;
                           case 8:  this.$set(elem,'audittxt','复审通过');break;
                           case 9:  this.$set(elem,'audittxt','复审驳回');break;
                        }
                        switch(elem.first_score_flag){
                           case 0: elem.first_score_flag  = '未评分';break;
                           case 1: elem.first_score_flag  = '可更新评分';break;
                           case 2: elem.first_score_flag  = '已评分';break;
                        }                        
                        switch(elem.second_score_flag){
                           case 0: elem.second_score_flag  = '未评分';break;
                           case 1: elem.second_score_flag  = '可更新评分';break;
                           case 2: elem.second_score_flag  = '已评分';break;
                        }
                        
                   })
                   this.pagesize = response.data.returnObj.totalCount || this.baseinfo.length;
                  }else{
                    this.$message({type:'error',message:'查询失败'})
                  }
	        }).catch(val=>{//捕获异常
              this.$message({type:'error',message:'查询失败'})
	        })
	    },
      changetime(value){//开始时间 结束时间
        if(value&&value[0]&&value[1]){
          this.conditions.auditTimeStart = dateformat(value[0],'yyyy-MM-dd')
          this.conditions.auditTimeEnd   = dateformat(value[1],'yyyy-MM-dd')
        }else{
          this.conditions.auditTimeStart = '';
          this.conditions.auditTimeEnd   = '';
        }
      },
	    tosearch(){//搜索
            this.getlist()
	    },
      todetails(row){//认证详情
          this.$store.dispatch('SETSCORE',row.ynum_count)
          this.$router.push({ name: '认证详情',params:{ 
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