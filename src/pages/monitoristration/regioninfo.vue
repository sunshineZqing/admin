<template>
	<div class="regioninfo">
		<basetable :basetabletitle="basetabletitle" :basetableinfo='basetableinfo' :loading="loading" :showopera="true">
			<template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="处理操作" placement="left">
                  <el-button type="text" icon='iconfont icon-bianji' @click="statusbtn(scope.scope.row)"></el-button>
                </el-tooltip>
            </template>
		</basetable>
		<basepage :sunmary="pageSize" v-on:topage="topage"></basepage>
	</div>
</template>

<script>
	import basetable from '@/components/basetable'
	import basepage from '@/components/basepage'
	export default{
		name:'regioninfo',
		components:{
			basetable,
			basepage
		},
		data(){
			return{
				basetableparams:{},
				basetabletitle:[
					{
						label: '用户id',
						prop: 'user_id'
					},{
						label: '地域编码',
						prop: 'regionNum'
					},{
						label: '身份证号',
						prop: 'cardId'
					},{
						label: '地址',
						prop: 'cardLocation'
					},{
						label: '是否处理',
						prop: 'statustype'// 0未处理1已处理
					},
				],
				basetableinfo:[],
				pageSize:0,
				loading:true,
				
			}
		},
		mounted(){
			this.regioninfo();
		},
		methods:{
			regioninfo(){
				this.$api.regioninfo(this.basetableparams).then(res => {}, response => {
					this.loading=false;
					console.log(response);
					this.basetableinfo = response.data.returnObj.varList;
					this.basetableinfo.forEach(elem => {
					    switch (elem.status){
					    	case 0:
					    		this.$set(elem,'statustype','未处理')
					    }
					})
					this.pageSize = response.data.returnObj.totalCount;
				}).catch(val => {
					//异常
					this.$message({message: '服务器异常',type: 'error'});
				})
			},
			topage(topage){
				this.basetableparams = Object.assign(this.basetableparams,topage);
				this.regioninfo();
			},
			//处理按钮
			statusbtn(row){
				console.log(row);
				var param = {param:row.params};
				this.$confirm('是否处理当前信息', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$api.regioninfoType(param).then(res =>{},response=>{
		        		if(response.data.resultCode == 0){
		         			this.regioninfo();
		        			this.$message({
		        			  type: 'success',
		        			  message: '操作成功!'
		        			});
		        		}else{
		        			this.$message({
		        			  type: 'info',
		        			  message: response.data.resultMsg
		        			});
		        		}
		        	})

		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消操作'
		          });          
		        });
			}
		}
	}
</script>

<style>
</style>