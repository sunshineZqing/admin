<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" @tab-add="addTab(1,4)" addable>
    <el-tab-pane v-for="item in roleList" :label="item.ROLE_NAME" :name="item.ROLE_ID" :key="item.ROLE_ID">
      <el-table :data="activeroleList" style="width: 100%" border>
        <el-table-column prop="date" label="序号" type="index" header-align="center" width="150"></el-table-column>
        <el-table-column prop="ROLE_NAME" label="角色" header-align="center"  ></el-table-column>
        <el-table-column  fixed="right" label="操作" header-align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text " @click="distributemenu(scope.row)">菜单权限</el-button> 
            <el-tooltip class="item" effect="dark" content="修改名称" placement="top">
              <el-button type="primary" size="mini" class='el-icon-edit' @click="modifyname(scope.row,1)"></el-button>
            </el-tooltip>
            <el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delself(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="operabtn" align="left" style="marginTop:10px">
        <el-button type="primary" size="mini" @click="addTab(1,4)">新增组</el-button>
        <el-button type="primary" size="mini" @click="addrole(2,3)">新增角色</el-button>
        <el-button type="primary" size="mini" @click="momdifygroupname('item',2)">修改组名称</el-button>
        <el-button type="primary" size="mini" @click="distributemenu(item)" v-if="item.ROLE_ID==1">admin菜单权限</el-button>
        <el-button type="primary" size="mini" @click="distributemenu(item)" v-if="item.ROLE_ID!=1">组菜单权限</el-button>
        <el-button type="danger"  size="mini" class="el-icon-delete" style="margin: 0;" v-show="item.ROLE_ID!=1" @click="delselfgroup(item)"></el-button>
      </div>
    </el-tab-pane>
    <el-dialog id="dia" title="菜单权限" :visible.sync="dialogFormVisible" width="16%" >
      <el-tree :data="menuAllList" show-checkbox   :default-checked-keys="choosedmenulist" node-key="MENU_ID" ref="tree" highlight-current :props="defaultProps"></el-tree>
      <div slot="footer" class="dialog-footer"  align="center">
        <el-button type="primary" @click="save" size="medium">保 存</el-button>
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogeditVisible" width="15%" >
      <el-input type="text" v-model="inputcontent" placeholder="请输入名称"></el-input>
      <div slot="footer" class="dialog-footer"  align="center">
        <el-button type="primary" @keyup.enter="savesimple"  @click="savesimple" size="medium">保 存</el-button>
        <el-button @click="dialogeditVisible = false" size="medium">取 消</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { unique } from '@/utils/index'
  export default {
    computed:{
        ...mapGetters(['menuAllList','checkedmenulist'])
    },
    data() {
      return {
        activeName: '1',
        roleList:[],
        activeroleList:[],
        dialogFormVisible:false,
        dialogeditVisible:false,
        defaultProps: {
          children: 'subMenu',
          label: 'MENU_NAME'
        },
        choosedmenulist:[],
        inputcontent:'',
        item:{},
        flag:0,
        role_ID:'',

      }
    },
    watch:{
        activeName(){
	        this.$api.getbasepemission({ ROLE_ID:this.activeName}).then(res=>{  // 成功返回
	        },response=>{  //捕获异常
    			  if(response.status==200&&response.data.resultCode==0){ //更新数据
    			  	this.activeroleList = response.data.returnObj.roleList_z
    			  }
    			}).catch(val=>{   // 捕获异常
    			
    			})
        }
    },
    mounted(){
    	console.log(this.menuAllList);
      this.getlist()

    },
    methods: {
      getlist(){
        this.$api.getbasepemission({ ROLE_ID: this.$store.state.userinfo.role.ROLE_ID }).then(res=>{  // 成功返回
        },response=>{  //捕获异常
          if(response.status==200&&response.data.resultCode==0){
            this.roleList   = response.data.returnObj.roleList
            this.activeName = this.roleList[0].ROLE_ID
            this.activeroleList = response.data.returnObj.roleList_z
          }
        }).catch(val=>{   // 捕获异常
          console.log(val,9)
        })
      },
      regetlist(){
          this.$api.getbasepemission({ ROLE_ID:this.activeName}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
            if(response.status==200&&response.data.resultCode==0){ //更新数据
              this.activeroleList = response.data.returnObj.roleList_z
            }
          }).catch(val=>{   // 捕获异常
          
          })
      },
      handleClick(tab, event) {//切换当前项
      	this.activeName = tab.name
      },
      distributemenu(item){//菜单权限
        this.role_ID = item.ROLE_ID
        this.dialogFormVisible = true
        let loadingInstance = this.$loading({
            target:'div.el-dialog',
            spinner:'el-icon-loading'
        })
        if(item==1){//admin
          this.choosedmenulist = this.checkedmenulist
        }else{
          //请求当前项（组/角色）菜单权限
          this.loading = true
          this.$api.getmenupemission({ ROLE_ID:item.ROLE_ID}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
              this.$refs.tree.setCheckedKeys([]); //清空默认选中
              let realPermission     = this.getcorretpermisson(response.data.returnObj.menuList)
              this.choosedmenulist   = this.getcorretpermissonlast(realPermission)
              this.$refs.tree.setCheckedKeys(this.choosedmenulist);
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
          }).catch(val=>{ })
        }
      },
      save(){//保存分配的菜单权限
        let loadingInstance = this.$loading({
            target:'div.el-dialog',
            spinner:'el-icon-loading',
            text:'正在保存。。。'
        })
        let menulist    = unique(this.$refs.tree.getCheckedNodes());  //去重
        let menuchecked = ''
        menulist.forEach((elem,index)=>{
          if(index==0){
             menuchecked += elem.MENU_ID
          }else{
             menuchecked +=','+elem.MENU_ID
          }
        })
        this.$api.savemenulist({ ROLE_ID:this.role_ID,menuIds:menuchecked}).then(res=>{  // 成功返回
        },response=>{  //捕获异常
            if(response.data.resultCode==0){
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              this.$message({type: 'success',message: '分配成功!'});
              this.dialogFormVisible = false
            }else{
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              this.dialogFormVisible = false
              this.$message({type: 'error',message: '分配失败!'});
            }
        }).catch(val=>{ })
      },
      addrole(item,flag){//添加角色 3
        this.dialogeditVisible = true
        this.item = item
        this.flag = flag
      },
      momdifygroupname(item,flag){//修改当前组名称 2
        this.dialogeditVisible = true
        this.item = item
        this.flag = flag
      },
      modifyname(item,flag){//修改当前角色名称 1
        this.dialogeditVisible = true
        this.item = item
        this.flag = flag
      },
      addTab(item,flag) { //添加组 4
        this.dialogeditVisible = true
        this.item = item
        this.flag = flag
      },
      savesimple(){//保存
        if(this.flag==1){//修改当前角色名称 1
          this.$api.modifyrolename({ sr_id:this.item.ROLE_ID,parent_id:this.item.PARENT_ID,ROLE_NAME:this.inputcontent}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
            if(response.data.resultCode==0){
              this.$message({type: 'success',message: '修改成功!'});
              this.dialogeditVisible = false
              this.regetlist()
            }else{
              this.$message({type: 'error',message: '修改失败!'});
            }
          }).catch(val=>{ })
        }else if(this.flag == 2){ //修改当前组名称 2
          let mid = this.activeName
          this.$api.modifyrolename({ sr_id:this.activeName,parent_id:'0',ROLE_NAME:this.inputcontent}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
            if(response.data.resultCode==0){
              this.$message({type: 'success',message: '修改成功!'});
              this.dialogeditVisible = false
              this.getlist()
              this.activeName = mid
            }else{
              this.$message({type: 'error',message: '修改失败!'});
            }
          }).catch(val=>{ })
        }else if(this.flag ==3){ //添加角色 3 
          this.$api.addrole({parent_id:this.activeName,role_name:this.inputcontent}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
            if(response.data.resultCode==0){
              this.$message({type: 'success',message: '添加成功!'});
              this.dialogeditVisible = false
              this.regetlist()
            }else{
              this.$message({type: 'error',message: '添加失败!'});
            }
          }).catch(val=>{ })
        }else if(this.flag ==4){ //添加组 4
          this.$api.addrole({parent_id:'0',role_name:this.inputcontent}).then(res=>{  // 成功返回
          },response=>{  //捕获异常
            if(response.data.resultCode==0){
              this.$message({type: 'success',message: '添加成功!'});
              this.dialogeditVisible = false
              this.getlist()
            }else{
              this.$message({type: 'error',message: '添加失败!'});
            }
          }).catch(val=>{ })
        }
        this.inputcontent = ''
      },
      delself(item){//删除当前角色
        this.$confirm('确认删除当前角色, 是否继续?','提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
            this.$api.delselfrole({ROLE_ID:item.ROLE_ID}).then(res=>{  // 成功返回
            },response=>{  //捕获异常
              if(response.data.resultCode==0){
                this.$message({type: 'success',message: '删除成功!'});
                this.regetlist()
              }else{
                this.$message({type: 'error',message: '删除失败!'});
              }
            }).catch(val=>{ })
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});          
        })
      },
      delselfgroup(item){//删除当前组
        this.$confirm('将要删除当前组及其下的角色, 是否继续执行此操作?','提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
            this.$api.delselfgroup({ROLE_ID:this.activeName}).then(res=>{  // 成功返回
            },response=>{  //捕获异常
              if(response.data.resultCode==0){
                this.$message({type: 'success',message: '删除成功!'});
                this.getlist()
              }else{
                this.$message({type: 'error',message: '删除失败!'});
              }
            }).catch(val=>{ })
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});          
        });
      },
      getcorretpermisson(permission){//获取权限内菜单
        if(permission==undefined){
            return ;
        }
        const accessedRouters =  permission.filter((ele)=>{
            if(ele.hasMenu&&('1'===ele.MENU_STATE)){//权限匹配
              if(ele.subMenu.length!==0){//子路由判断
                 ele.subMenu =  this.getcorretpermisson(ele.subMenu)
              }
              return true
            }
            return false
        })
        return accessedRouters
      },
      getcorretpermissonlast(realPermission){//获取权限内菜单的MENU_ID
          let checkedlist = []
          function getcheckedlist(list){
            list.forEach(elem=>{
              if(elem.subMenu.length!==0){
                getcheckedlist(elem.subMenu)
              }else{
                checkedlist.push(elem.MENU_ID)
              }
            })
          }
          getcheckedlist(realPermission)
          return  checkedlist
      }
    }
  }
</script>