<template>
	<div>
		<div class="onlinenum">在线人数： <span v-text="onlinenum"></span></div>
		<basetable :loading='tableloading' :basetabletitle="basetabletitle" :basetableinfo="baseinfo" :showopera="showopera" key="onlinemanagement">
			<template slot-scope="scope">
				<el-tooltip class="item" effect="dark" content="修改权限" placement="left">
					<el-button type="text" icon='iconfont icon-bianji' @click="modifypower(scope)"></el-button>
				</el-tooltip>
			</template>
		</basetable>
		<div class="operabtn">
			<el-button type="danger" size="mini" @click="" >强制下线</el-button>
		</div>
	</div>
</template>
<script>
	import basetable from '@/components/basetable'
	export default{
		name:'onlinemanagement',
		data(){
			return{
               tableloading:false,
               showopera:true,
               onlinenum:0,
               basetabletitle:[
                   { label: '用户名',prop: 'username'}
               ],
               baseinfo:[]
			}
		},
		components: { basetable },
		mounted() {
			this.getlist()
		},
		methods:{
			getlist(){ 

			},
            compulsorydownline(){ //批量强制下线

            }
		}
	}
</script>
<style lang="less" scoped>
    .onlinenum{
    	text-align: left;
    	margin:10px ; 
    }
	.operabtn {
		margin-top: 20px;
		text-align: left;
		i {
			cursor: pointer;
		}
	}
</style>