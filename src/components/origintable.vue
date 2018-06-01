<template>
	<div class="origintable">
		<table class="tab el-table__body-wrapper" border cellspacing="0" cellpadding="0" v-loading="loading">
			<thead>
				<tr>
					<th class="titletxt0">
						<div>序号</div>
					</th>
					<th v-for="(item,index) in originTableTitel" key="index"  >
						<div class="titletxt" v-bind:style="{width:item.width}">{{item.label}}</div>
					</th>
					<th v-if="showopera" class="operabtn">
						<div class="titletxt">操作</div>
				   </th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in originTableInfo" key="index" v-if="originTableInfo&&originTableInfo.length>0">
					<td>
						{{++index}}
					</td>
					<td v-for="(item2,index) in originTableTitel" :class="index==classitem ? item.classname : '' ">{{item[item2.prop]}}</td>
					<td v-if="showopera">
						<div>
							<slot :scope="{item,index}"></slot>
						</div>
					</td>
				</tr>
				<tr  v-if="originTableInfo.length==0||(!originTableInfo)">
					<td class="emptyinfo" :colspan="originspan">
						<div>暂无数据</div>
				    </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default{
		name:'origintable',
		data(){
			return{
                classitem:0,
			}
		},
		computed:{
           originspan(){
              return this.originTableTitel.length+1
           }
		},
		props:{
            originTableTitel:Array, // 表头数组
            originTableInfo:Array,// 内容数组
            loading:{
            	type:Boolean,
            	default:false
            },// 是否显示loading
            showopera:{
            	type:Boolean,
            	default:false
            }, // 是否显示操作按钮 
            showselection:{
            	type:Boolean,
            	default:false
            },//是否显示checkbox
            classname:'',
           
		},
		mounted(){
			if(this.classname == 'bkClassname'){
				this.classitem = 7;
			}else if(this.classname == 'mbClassname'){
				this.classitem = 4;
			}
		}
	}
</script>
<style lang="less">
	.origintable{
		margin-top: 20px;
		max-height: 600px;
		overflow: auto;
		border: 1px solid #30c9f3;
		position: relative;
		box-sizing: border-box;
	}
	.tab{
		border-collapse:collapse;
		overflow: scroll;
		box-sizing: border-box;
		border-right: 1px solid #30c9f3;
		.titletxt0{
			width:50px;
			text-align: center;
			word-wrap:normal;
			vertical-align:middle;
			box-sizing:border-box;
			text-overflow:ellipsis;
			white-space: nowrap;
			padding: 0 2px;
			line-height: 40px;
			font-size: 14px;
			font-weight: bold;
			font-family: '微软雅黑';
			color: #878d99;
		}
		.titletxt{
			min-width: 100px;
			width: 100%;
			text-align: center;
			word-wrap:normal;
			vertical-align:middle;
			box-sizing:border-box;
			text-overflow:ellipsis;
			white-space: nowrap;
			padding: 0 2px;
			line-height: 40px;
			font-size: 14px;
			font-weight: bold;
			font-family: '微软雅黑';
			color: #878d99;
		}
		/*// th.operabtn{
  //           position: relative;
  //           right: 0;
		// }*/
		
		th{
			border:1px solid #30c9f3;
			color: #5a5e66;
			line-height: 2;
			font-family: "微软雅黑";
			font-weight: 500;
		}
		td{
			display: table-cell;
			border:1px solid #30c9f3;
			color: #5a5e66;
			font-size: 14px;
			padding: 10px 0;
		}
		.warning-row{
			color:red;
		}
	}
</style>