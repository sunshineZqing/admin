<template>
  <v2-table :data="basetableinfo" border  style="width: 100%;margin-top:15px;"  :loading="loading"  @select-change='handleSelectionChange' empty-text='暂无数据' >
     <!-- 多选框 -->
    <v2-table-column type="selection" width="55" align="center" fixed="left" v-if="!shownumber"></v2-table-column> 
    <!-- 序号 -->
    <!-- <v2-table-column type="index" width="55" align="center" label="序号"   fixed="left" v-if="!shownumber"></v2-table-column>  -->

    <v2-table-column :label="item.label" :prop="item.prop" :width='item.width' :fixed='item.fixed' :key="item.prop" v-for="item in basetabletitle" align="center"></v2-table-column>
   
    <v2-table-column  fixed="right" label="操作" align="center" width="130" v-if="showopera">
      <template slot-scope="scope">
         <slot :scope="scope" ></slot>  
      </template>
    </v2-table-column>
  </v2-table>  
</template>
<script>
  export default {
    data() {
      return {
        multipleSelection:[]
      }
    },
    props:['basetabletitle','basetableinfo','loading','showopera','specilletter','expandshow','mheight','isexpand','shownumber'],
    methods: {
    handleSelectionChange(val) { //选中项发生变化v
      this.multipleSelection = val;
      this.$emit('selection',this.multipleSelection)
    }
  }
}
</script>
<style>
   /*表格边框颜色*/
   .v2-table__table-container{
     border:1px solid #30c9f3;
   }
  .v2-table__body.v2-table__border .v2-table__cell, .v2-table__footer.v2-table__border .v2-table__cell, .v2-table__header.v2-table__border .v2-table__cell{
    border-right: 1px solid #30c9f3;
    border-bottom: 1px solid #30c9f3;
    border-collapse: collapse;
  }
  /*x轴滚动条高度问题*/
  .v2-scroll__x-thumb{
    height: 20px;
    bottom: -10px;
  }
</style>