<template> 
  <el-table v-loading="loading" ref="multipleTable" :data="basetableinfo" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange" @cell-mouse-enter="hovershow" @cell-mouse-leave="hoverhide" :max-height="mheight" :default-expand-all="isexpand" :cell-class-name='qwe'>
    <el-table-column type="selection" width="55" header-align="center" fixed="left" v-if="!shownumber"></el-table-column>
    <el-table-column type="index" width="55" header-align="center" label="序号"   fixed="left" v-if="!shownumber"></el-table-column>

    <el-table-column v-for="item in basetabletitle" :prop="item.prop" :width='item.width' :key="item.prop"   :label="item.label" show-overflow-tooltip   min-width="98px" header-align="center" align="center">
    </el-table-column>
    <el-table-column type="expand" label="查看更多" width="80px" v-if="expandshow">
      <template slot-scope="props">
      	 <slot  :scope="props"  name="expand"></slot>
      </template>
    </el-table-column>
    <el-table-column  fixed="right" label="操作" header-align="center" width="130" v-if="showopera">
        <template slot-scope="scope">
       	    <slot  :scope="scope" ></slot>  
				</template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    data() {
      return {
        multipleSelection:[]
      }
    },
    props:['basetabletitle','basetableinfo','loading','showopera','specilletter','expandshow','mheight','isexpand','shownumber'], //specilletter页面特殊需求  mheight最大高度 
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('selection',this.multipleSelection)
		},
		hovershow(row, column, cell, event){
			if(this.specilletter==1&&column&&column.property){
	            if(column.property =='name'&&row.cert_card){
	            	if(cell.lastChild.className == 'creatspantiphide'){
                        cell.lastChild.className = 'creatspantip'
	            	}else{
		            	var op = document.createElement("span"); 
					    op.className = 'creatspantip'
					    var oText = document.createTextNode(row.cert_card); 
					    op.appendChild(oText); 
					    cell.className = cell.className + " parenttip"
					    cell.appendChild(op); 
	            	}
	            }
			}
		},
		hoverhide(row, column, cell, event){
            if(this.specilletter==1&&column&&column.property){
	            if(column.property =='name'&&row.cert_card){
					if(cell&&cell.lastChild&&cell.lastChild.className&&cell.lastChild.className=='creatspantip'){
		               cell.lastChild.className = 'creatspantiphide'
		            }
	            }
			}
		},
		qwe({row, column, rowIndex, columnIndex}){
			if(row.bkClassname && columnIndex == 9){//运营商  银行敏感字检测
				return row.bkClassname
			}else if(row.mbClassname && columnIndex == 6){//运营商  邮箱敏感字检测
				return row.mbClassname
			}
			return ''
		}
	}
}
</script>
<style type="text/css">
	.el-table .warning-row{
		color: red;
	}
	.el-main {
		padding: 10px;
	}
	.parenttip{
		position: relative;
		cursor: pointer;
	}
	.creatspantip{
		display: block;
        background:#303133;
        color: #fff;
        border: 1px solid #333;
        border-radius: 3px;
        width: 160px;
        line-height: 32px;
        position: absolute;
        top: -25px;
        left: -30px;
        z-index: 1000;
	}
	.creatspantiphide{
		display: none;
	}
	.el-table th>.cell {
		text-align: center;
	}
	
	thead th {
		background: #ecf5ff;
	}
	
	.el-button+.el-button {
		margin-left: 0px;
	}
	
	.el-table td,
	.el-table th {
		padding: 7px 0;
	}
	
	.el-button {
		padding: -12px 20px;
	}
	
	.el-table .cell,
	.el-table th div,
	.el-table--border td:first-child .cell,
	.el-table--border th:first-child .cell {
		padding-left: 0px;
	}
	
	.el-table .cell,
	.el-table th div {
		padding-right: 0px;
	}

    /*更改暂无数据的位置*/
	.el-table__empty-block{
		position: static;
	}
	.el-table__body-wrapper{
		transform:translate(0,0);
	}
	.el-table__empty-text{
        position: fixed;
	}
</style>