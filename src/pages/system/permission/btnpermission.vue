<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" @tab-add="addTab()" addable>
    <el-tab-pane v-for="item in roleList" :label="item.ROLE_NAME" :name="item.ROLE_ID" :key="item.ROLE_ID">
      <el-table :data="activeroleList" style="width: 100%" border>
        <el-table-column prop="date" label="序号" type="index" header-align="center" width="150"></el-table-column>
        <el-table-column prop="ROLE_NAME" label="角色" header-align="center"  ></el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1',
        roleList:[],
        activeroleList:[]
      };
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
    methods: {
      handleClick(tab, event) {
      	this.activeName = tab.name
      },
      addTab() {
        let newTabName  = ++this.tabIndex + '';
        this.roleList.push({
          ROLE_NAME: 'New Tab',
        });
        this.activeName = newTabName;
      },
    }
  }
</script>