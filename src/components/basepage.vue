<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange"  :current-page='currentp' :page-sizes="[10, 20, 40, 100] " :page-size="entrysize" layout="total, sizes, prev, pager, next, jumper" :total="sunmary">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) { //每页条数改变
        // console.log(`每页 ${val} 条`);
        if(this.sunmary==1){
           return
        }
        this.$emit('topage',{ showCount:val})
      },
      handleCurrentChange(val) { //当前页改变
        // console.log(`当前页: ${val}`);
        if(this.sunmary==1){
           return
        }
        this.$emit('topage',{ currentPage:val})
      }
    },
    props:{
        sunmary:{ //总条目数
           type:Number
        },
        currentp:{ //当前页
           type:Number
        }
    },
    data() {
      return {
        entrysize:10,//每页条目数
      }
    }
  }

</script>
<style lang="less" scoped>
  .block{
     margin-top: 25px; 
  }
</style> 
</script> 
</script>
<style type="text/css">
	
	/**分页样式**/
	.el-pagination{
		margin-top: 50px;
	}
	.el-pager li {
		border: 1px solid #c6c6c8;
		/*width: 36px;*/
		height: 36px;
		margin: 0 6px;
		line-height: 36px;
	}
	
	.el-pager li.btn-quicknext,
	.el-pager li.btn-quickprev {
		border: none;
	}
	
	.el-pagination__editor.el-input .el-input__inner {
		height: 30px;
	}
	
	.el-pager li.active+li {
		border-left: 1px solid #c6c6c8;
	}
	
	.el-pagination button,
	.el-pagination span:not([class*=suffix]) {
		line-height: 36px;
	}
	
	.el-pager li.active {
		color: #fff;
		background: #409eff;
	}
	
	.el-pagination .btn-next,
	.el-pagination .btn-prev {
		height: 36px;
		border: 1px solid #c6c6c8;
		margin: 0 10px;
	}
	

	/*分页样式修改*/
	
	.el-pager li {
		border: 1px solid #c6c6c8;
		/*width: 36px;*/
		height: 36px;
		margin: 0 6px;
		line-height: 36px;
	}
	
	.el-pager li.btn-quicknext,
	.el-pager li.btn-quickprev {
		border: none;
	}
	
	.el-pagination__editor.el-input .el-input__inner {
		height: 30px;
	}
	
	.el-pager li.active+li {
		border-left: 1px solid #c6c6c8;
	}
	
	.el-pagination button,
	.el-pagination span:not([class*=suffix]) {
		line-height: 36px;
	}
	
	.el-pager li.active {
		color: #fff;
		background: #409eff;
	}
	
	.el-pagination .btn-next,
	.el-pagination .btn-prev {
		height: 36px;
		border: 1px solid #c6c6c8;
		margin: 0 10px;
	}
</style>
