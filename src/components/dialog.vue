<template>
	<div class="dialog">
    <el-dialog  title="提示"  :visible.sync="dialogstatus"   width="30%" >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closedialog">取 消</el-button>
        <el-button type="primary" @click="closedialogconfirm">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
  export default {
    data() {
      return {
         dialoghandle:false
      }
    },
    computed:{
        dialogstatus(){
           return this.$store.state.dialogstatus
        }
    },
    methods: {
      closedialog(){//取消
          this.$store.dispatch('DIALOGTIP',false)
      },
      closedialogconfirm(){//确定
          this.$store.dispatch('DIALOGTIP',false)
          this.$emit('confirmclose',1)
      }
    }
  };
</script>
<style lang="less" scoped>
   .dialog-footer{
      button{
        padding: 12px 20px;
      }
   }
</style>




