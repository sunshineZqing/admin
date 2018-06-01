<template>
    <div class="">
        <basetable :basetabletitle="basetabletitle" :basetableinfo="baseinfo"  :loading="loading" :showopera="showopera" key="thetrial">
            <template slot-scope="scope">
              <el-button type="text" icon='iconfont icon-bianji' @click="todetails(scope.scope.row)"></el-button>
            </template>
        </basetable>
    </div>
</template>
<script>
  import basetable from '@/components/basetable'
  import basepage  from '@/components/basepage'
  export default{
    name:'recertification',
    components:{ basetable,basepage },
    data(){
        return {
            loading:true,
            showopera:true,
            //表格基本信息
            baseinfo:[], 
            basetabletitle:[
                {   label:'用户编号', prop:'user_id' },          
                {   label:'认证类型', prop:'auynumauthtype'    },           
                {   label:'完成认证获得的易指数',     prop:'au_num'  },            
                {   label:'认证状态',   prop:'au_status'},        
                {   label:'是否为新增',   prop:'au_new'},            
                {   label:'是否失效',   prop:'isInvalid'}
           ]
        }
    },
    mounted(){
    	this.getlist();
    },
    methods:{
        getlist(){//请求初审的数据
            this.loading  = true;
            this.$api.certificationList({user_id:this.$route.params.user_id}).then(res=>{},response=>{
            	console.log(response);
                this.loading  = false;
                if(response.data.resultCode == 0 ){
                  this.baseinfo = response.data.returnObj.auList;
                  this.baseinfo.forEach(elem=>{
                      elem.au_new   = elem.au_new == '0' ? '新增':'正常';
                      elem.isInvalid = elem.isInvalid == '0' ? '未失效':'已失效';
                      switch(elem.au_ynumauth_type){//认证类型:1淘宝/2京东/3运营商/4公积金/5学信网/6征信/7社保/8车辆/9身份/12通讯录/13芝麻信用/14银行卡/15数立公积金/16数立运营商/17数立邮箱/18手机应用
                         case 1: this.$set(elem,'auynumauthtype','淘宝');break;
                         case 2: this.$set(elem,'auynumauthtype','京东');break;
                         case 3: this.$set(elem,'auynumauthtype','运营商');break;
                         case 4: this.$set(elem,'auynumauthtype','公积金');break;
                         case 5: this.$set(elem,'auynumauthtype','学信网');break;
                         case 6: this.$set(elem,'auynumauthtype','征信');break;
                         case 7: this.$set(elem,'auynumauthtype','社保');break;
                         case 8: this.$set(elem,'auynumauthtype','车辆');break;
                         case 9: this.$set(elem,'auynumauthtype','身份');break;
                         case 12: this.$set(elem,'auynumauthtype','通讯录');break;
                         case 13: this.$set(elem,'auynumauthtype','芝麻信用');break;
                         case 14: this.$set(elem,'auynumauthtype','银行卡');break;
                         case 15: this.$set(elem,'auynumauthtype','数立公积金');break;
                         case 16: this.$set(elem,'auynumauthtype','数立运营商');break;
                         case 17: this.$set(elem,'auynumauthtype','数立邮箱');break;
                         case 18: this.$set(elem,'auynumauthtype','手机应用');break;
                      }
                      switch(elem.au_status){//:0未认证/1认证中/2已认证(无用)/3分析中/4客服认证/5已驳回/6重新认证/7已通过
                         case 0: elem.au_status  = '未认证';break;
                         case 1: elem.au_status  = '认证中';break;
                         case 2: elem.au_status  = '已认证（无用）';break;
                         case 3: elem.au_status  = '分析中';break;
                         case 4: elem.au_status  = '客服认证';break;
                         case 5: elem.au_status  = '已驳回';break;
                         case 6: elem.au_status  = '重新认证';break;
                         case 7: elem.au_status  = '已通过';break;
                      }
                  })
                }else{
                   this.$message.error('查询失败')
                }
            }).catch(val=>{//捕获异常
               this.$message.error('服务器异常')
            })
        },
        todetails(row){ //
			console.log(row)
			this.$confirm('是否重新认证', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.$api.recertification({au_ynumauth_type:row.au_ynumauth_type,user_id:this.$route.params.user_id}).then(res=>{},response=>{
	            	console.log(response);
	                if(response.data.resultCode == 0 ){
	                	this.getlist();
	                  this.$message({
			            type: 'success',
			            message: '成功!'
			          });
	                }else{
	                   this.$message.error('设置失败')
	                }
	            }).catch(val=>{//捕获异常
	               this.$message.error('服务器异常')
	            })
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          });          
	        });
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