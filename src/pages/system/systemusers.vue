<template>
  <div class="">
    <div class="addtions">
        <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="conditions.keywords" clearable></el-input>
        <div class="block">
            <el-date-picker  v-model="value9"  type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期" >
            </el-date-picker>
        </div>
        <el-select v-model="curaudittime" filterable placeholder="请选择角色" slot="thetrialconditions" @input="getchoose" clearable>
            <el-option v-for="item in audittime" :key="item.ROLE_ID" :label="item.ROLE_NAME" :value="item.ROLE_ID" ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="tosearch" class="searchbtn">搜索</el-button>
    </div>
    <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :showopera="showopera" key="systemusers" v-on:selection="selection">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="编辑" placement="left">
          <el-button type="text" class='iconfont icon-bianji' @click="openpower(scope)" size="medium"></el-button>
        </el-tooltip>
        <!--<el-tooltip class="item" effect="dark" content="删除" placement="left">
          <el-button type="text" icon='el-icon-delete'  @click="delself(scope)" size="medium"></el-button>
        </el-tooltip>-->
        </template>
    </basetable>
    <div class="operabtn">
      <el-button type="success" size="mini" @click="add">新增</el-button>
      <!--<i class="el-icon-delete" @click="del"></i>-->
    </div>
    <basepage  :sunmary="pagesize" v-on:topage="topage"></basepage>
    <el-dialog :title="titlename" :visible.sync="dialogTableVisible" width="25%">
      <el-form :model="form" label-position="right" label-width="80px" :rules="rules" ref="ruleForm" >
          <el-form-item label="角色" align="left" prop="role_id">
            <el-select v-model="form.role_id" placeholder="请选择角色" >
              <el-option v-for="item in audittime"  :key="item.ROLE_ID" :label="item.ROLE_NAME" :value="item.ROLE_ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" auto-complete="off" :disabled="isreadonly" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-if="!isedit">
            <el-input v-model="form.password" type="password" auto-complete="off" placeholder="请输入密码,长度大于等于6"></el-input>
          </el-form-item>          
          <el-form-item label="确认密码" prop="repassword" v-if="!isedit">
            <el-input v-model="form.repassword" type="password" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>   

          <!-- 编辑 -->
          <el-form-item label="密码" v-if="isedit" >
            <el-input v-model="form.password" type="password" auto-complete="off" placeholder="请输入密码,长度大于等于6"></el-input>
          </el-form-item>          
          <el-form-item label="确认密码" v-if="isedit" >
            <el-input v-model="form.repassword" type="password" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <!-- 编辑 -->
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>          
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>          
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item> 
           <el-form-item label="地址" prop="area_id" align="left" >
              <el-cascader  :options="areainfo" size="medium"  v-model="form.area_id"  @change="handleChange" :clearable="true" :filterable="true"></el-cascader >
          </el-form-item> 
          <el-form-item label="是否在职" prop="isworker" align="left">
            <el-select v-model="form.isworker" placeholder="请选择在职状态">
              <el-option v-for="item in workers"  :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>              
          <el-form-item label="备注" prop="su_remark">
            <el-input v-model="form.su_remark" auto-complete="off" placeholder="备注"></el-input>
          </el-form-item>   
          <el-form-item >
             <el-button type="primary" size="medium" @click="submitForm('ruleForm')">保存</el-button>
             <el-button type="danger"  size="medium" @click="resetForm()">取消</el-button>
          </el-form-item>          
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import basetable from '@/components/basetable'
  import basepage  from '@/components/basepage'
  import { dateformat,isEmpty } from '@/utils/index'
  import { CityInfo }   from '../../utils/areainfo.js'
  export default{
    name:"yfqinfo",
    components:{basetable,basepage},
    mounted(){
        this.getlist()
        this.areainfo = CityInfo
    },
    data(){
      var validatePass = (rule, value, callback) => {
        console.log(value,this.form.password,this.form.repassword,25)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      

      
      var validatephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if(!(/^1[3-9]\d{9}$/.test(value))){
          callback(new Error('手机号格式不正确!'));
        } else {
          callback();
        }
      }
      return {
        showopera:true,
        dialogTableVisible:false,
        formLabelWidth:'120',
        form:{
          role_id:'',
          suId:'',
          username:'',
          password:'',
          repassword:'',
          name:'',
          phone:'',
          email:'',
          area_id:[],
          area_name:'',
          isworker:'',//在职状态
          su_remark:''
        },
        titlename:'',
        isedit:false,//是否是编辑  默认不是
        isreadonly:false,
        audittime:[],
        areainfo:[],
        areaid:'', //地址id
        areaname:'', //地址
        workers:[
          { value:0,label:'在职'},
          { value:1,label:'请假'},
          { value:8,label:'离职'},
          { value:9,label:'退休'}
        ],
        curaudittime:'',//当前选中项
        selectionlist:[],
        pagesize:10,
        conditions:{
          keywords:'',         //关键词
          lastLoginStart:'',   //开始时间
          lastLoginEnd:'',     //结束时间
          roleId:''            //角色
        }, 
        basetabletitle:[
          {  label:'编号',    prop:'su_id' },          
          {  label:'用户名',  prop:'username'},           
          {  label:'姓名',    prop:'name'  },            
          {  label:'手机号',  prop:'phone' ,width:120  }, 
          {  label:'地区',    prop:'area_name',width:180},     
          {  label:'邮箱',    prop:'email',width:180},            
          {  label:'密码',    prop:'password',width:340},            
          {  label:'角色',    prop:'role_name'},            
          {  label:'在职状态',prop:'state'},            
          {  label:'最近登录时间',prop:'last_login_time',width:160},            
          {  label:'最近登录IP', prop:'last_login_ip',width:120 },            
          {  label:'备注',    prop:'su_remark'}        
        ],
        baseinfo:[],
        value9:'',
        scoperow:{},//当前行信息
        rules: {
          role_id:[
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '长度最少6字符', trigger: 'blur' },
          ],
          repassword:[
             { required: true,validator: validatePass, trigger: 'blur'}
          ],

          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true,validator: validatephone, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          isworker:[
            { required: true, message: '请选择在职状态', trigger: 'change' }
          ],
          area_id:[
            { required: true, message: '请选择地址', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      getlist(){
          this.$api.systemusers(this.conditions).then(res=>{},response=>{
                this.baseinfo = response.data.returnObj.userList;
                this.baseinfo.forEach(elem=>{
                      switch(elem.status){
                        case 0: this.$set(elem,'state','在职');break;
                        case 1: this.$set(elem,'state','请假');break;
                        case 8: this.$set(elem,'state','离职');break;
                        case 9: this.$set(elem,'state','退休');break;
                      } 
                      if(elem.area_id){
                        let result = ''
                        for(let i =0,len = elem.area_id.length;i<len;i++){
                          result += elem.area_id[i];
                          if((i % 2 == 1)&& elem.area_id[i+1]) {
                            result += '-'
                          }
                        }
                        elem.area_id = result.split("-")
                        elem.area_id.forEach((elem,index,arr)=>{
                          if(index==1){
                             arr[index] = arr[0]+arr[1]
                          }
                          if(index==2){
                             arr[index] = arr[1]+arr[2]
                          }
                        })
                      }else{
                        elem.area_id = []
                      }
                })
                this.pagesize  = response.data.returnObj.page.totalResult || this.pagesize
                this.audittime =  response.data.returnObj.roleList
          }).catch(val=>{//捕获异常

          })
      },
      tosearch(){
          this.getlist()
      },
      changetime(value){
        if(value&&value[0]&&value[1]){
          this.conditions.lastLoginStart = dateformat(value[0],'yyyy-MM-dd');
          this.conditions.lastLoginEnd   = dateformat(value[1],'yyyy-MM-dd');
        }else{
        	this.conditions.lastLoginStart = "";
          this.conditions.lastLoginEnd   = "";
        }
      },
      getchoose(value){
         this.conditions.roleId = value
      },
      myAddressCity(value){
        for(let y in this.areainfo){
          if(this.areainfo[y].value == value){
            return  this.areainfo[y].label
          }
        }
      },
      myAddressErae(value){
        for(let y in this.areainfo){
          for(let z in this.areainfo[y].children){
            if(this.areainfo[y].children[z].value == value && value!=undefined){
              return  this.areainfo[y].children[z].label;
            }
          }
        }
      },
      myAddressMinerae(value){
        for(let y in this.areainfo){
          for(let z in this.areainfo[y].children){
            for(let i in this.areainfo[y].children[z].children){
              if(this.areainfo[y].children[z].children[i].value == value && value!=undefined){
                return  this.areainfo[y].children[z].children[i].label
              }
            }
          }
        }
      },
      handleChange(value) {
        this.areaid   = value[2]
        this.areaname = ''
        this.areaname += this.myAddressCity(value[0])+this.myAddressErae(value[1])+this.myAddressMinerae(value[2])
      },
      openpower(scope){//编辑
        if(scope.scope.row.sr_id==1){
           return 
        }
        this.isedit    = true
        this.titlename = "编辑"
        this.dialogTableVisible = true
        this.isreadonly = true

        this.audittime.forEach(elem=>{
          if(elem.ROLE_ID == scope.scope.row.sr_id){
            this.form.role_id = elem.ROLE_ID 
          }
        })
        this.form.suId      = scope.scope.row.su_id
        this.form.username  = scope.scope.row.username
        this.form.password  = ''
        this.form.repassword= ''
        this.form.name      = scope.scope.row.name
        this.form.phone     = scope.scope.row.phone
        this.form.email     = scope.scope.row.email
        this.form.area_id   = scope.scope.row.area_id 
        this.form.area_name = scope.scope.row.area_name

        this.form.isworker  = scope.scope.row.status
        this.form.su_remark = ''
      },
      add(){//新增
        this.isedit    = false
        this.titlename = "新增"
        this.dialogTableVisible = true
        this.isreadonly     = false

        this.form.role_id   = '' 
        this.form.suId      = ''
        this.form.username  = '' 
        this.form.password  = ''
        this.form.repassword= ''
        this.form.name      = ''
        this.form.phone     = ''
        this.form.email     = ''
        this.form.area_id   = []
        this.form.area_name = ''
        this.form.su_remark = ''
      },
      submitForm(formName){//保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              role_id   :this.form.role_id   ,  
              suId      :this.form.suId      ,
              username  :this.form.username  ,  
              password  :this.form.password  ,
              repassword:this.form.repassword,
              name      :this.form.name      ,
              phone     :this.form.phone     ,
              email     :this.form.email     ,
              area_id   :this.areaid || this.form.area_id[2],
              area_name :this.areaname || this.form.area_name,
              status    :this.form.isworker,
              su_remark :this.form.su_remark 
            }
            this.$api.systemuserssave(params).then(res=>{},response=>{
                if(response.data.resultCode==0){ 
                  this.$message({ type: 'success',message: '保存成功!'});
                  this.getlist()
                  this.dialogTableVisible = false
                }else if (response.data.resultCode==1) {
                  this.$message({ type: 'error',message: response.data.resultMsg});
                }
            }).catch(()=>{//捕获异常
                this.$message({ type: 'error',message: '网络异常!'});
            })
          } else { return false }
        });

      },
      resetForm(){//取消
        this.dialogTableVisible = false
      },
      topage(target){//跳页
          this.conditions = Object.assign(this.conditions,target); //对象合并
          this.getlist()
      },
      delself(scope){//删除当前项
          this.$confirm('确认删除当前项, 是否继续?','提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //执行删除
                this.$api.systemusersdelsimple({su_id:scope.scope.row.su_id}).then(res=>{},response=>{
                    if(response.data.resultCode==0){ 
                      this.$message({ type: 'success',message: '删除成功!'});
                      this.getlist()
                    }else if (response.data.resultCode==1) {
                      this.$message({ type: 'error',message: '删除失败!'});
                    }
                }).catch(val=>{//捕获异常
                    this.$message({ type: 'error',message: '网络异常!'});
                })
            }).catch(() => {
               this.$message({type: 'info',message: '已取消删除'});          
            });
      },
      del(){//删除 获取选中数据
        if(!this.selectionlist){
          this.$message('请选择要删除的项')
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
            this.$api.systemusersdelAll({userIds:this.selectionlist}).then(res=>{},response=>{
                if(response.data.resultCode==0){ 
                  this.$message({ type: 'success',message: '删除成功!'});
                  this.getlist()
                }else if (response.data.resultCode==1) {
                  this.$message({ type: 'error',message: '删除失败!'});
                }
            }).catch(()=>{//捕获异常
                this.$message({ type: 'error',message: '网络异常!'});
            })
        }).catch(() => {
              this.$message({type: 'info',message: '已取消删除'});          
        });
      },
      selection(target){//获取选中的id
          this.selectionlist =  target.map((elem,index)=>{
              return elem.su_id
          })
          this.selectionlist = this.selectionlist.toString()
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
        button.searchbtn{
            line-height: 32px;
        }
        div.el-input{
            width: 12%;
        }
    }
    .operabtn{
      margin-top: 20px;
      text-align: left;
      i{
           cursor: pointer;
      }
    }
</style>



