<template>
	<div class="ykjinfo">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-date-picker v-model="value9" style='margin: 0 20px;' type="daterange" start-placeholder="开始日期" @change="changetime" end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="primary" size="medium" @click="serviceCollection">查询</el-button>
		</el-form>

		<el-table :data="basetableinfo" loading="tableloading" :showopera="true" border style="width: 100%">
			<el-table-column type="selection" width="55" header-align="center" fixed="left"></el-table-column>
			<el-table-column type="index" width="55" header-align="center" label="序号" fixed="left"></el-table-column>
			<el-table-column prop="dcf_title" label="标题" width="">
			</el-table-column>
			<el-table-column label="图片地址" width="180">
				<template slot-scope="scope">
					<img class="banimg" :src="imgsrc+'uploadDiscoverImgs/'+scope.row.dcf_img" />
				</template>
			</el-table-column>
			<el-table-column prop="dcf_begintime" label="开始时间" width="">
			</el-table-column>
			<el-table-column prop="dcf_endtime" label="结束时间" width="">
			</el-table-column>
			<el-table-column prop="dcf_createtime" label="创建时间" width="">
			</el-table-column>
			<el-table-column prop="dcf_updatetime" label="更新时间" width="">
			</el-table-column>

			<el-table-column label="操作" width="">
				<template slot-scope="scope">
					<el-button style='padding:0' type="text" icon='iconfont icon-bianji' @click="editbanner(scope)"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="bottom">
			<div class="bottomBtn" align="left">
				<el-button type="primary" size="mini" @click="editAmount">新增</el-button>
				<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delet"></el-button>
			</div>
			<basepage :sunmary='pageSize' v-on:topage="topage"></basepage>
		</div>
		<el-dialog title="轮播图信息" :visible.sync="showdialog" width="660px" center>
			<el-form :inline="true"  label-width="80px" :model="formInline" class="demo-form-inline">
				<el-form-item label="标题">
					<el-input v-model="formInline.fblName" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				

				<el-form-item label="图片地址">
					<div v-if='formInline.blImg'>
						<img class="banimg" :src="imgsrc+'uploadBankImgs/'+formInline.blImg" />
						<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;position: relative;top: -10px;left: 10px;" @click="deletbankimg(formInline.blId)"></el-button>
					</div>
					<div v-if='!formInline.blImg'>
						<el-upload :limit="1" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handlesuccess" :on-remove="handleRemove" list-type="picture">
							<el-button v-show='showuploadbt' size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>

				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button  size="medium" @click="showdialog = false">取 消</el-button>
			    <el-button  size="medium" :loading='btloading' type="primary" @click="saveinsteredit">保存</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	import basepage from '@/components/basepage'
	import config from '@/config/index'
	export default {
		name: 'ykjinfo',
		components: {
			
			basepage
		},
		data() {
			return {
				basetabletitle: [],
				//请求列表参数
				collectionParams: {
					keywords: '',
					timeStart: '',
					timeEnd: '',
					Page: ''
				},
				value9: '',
				value3: '',
				formInline: {
					ftitle: '',
					fstarttime: '',
					fendtime: '',
					fblDayLimit: '',
					fblMonthLimit: ''
				},
				tableloading: true,
				btloading: false,
				showuploadbt: true,
				//列表信息
				basetableinfo: [],
				showdialog: false,
				pageSize:0,//总条数
				imgsrc:'',
			}
		},
		mounted() {
			this.serviceCollection()
     		this.imgsrc = config.imgsrc
		},
		methods: {
			serviceCollection() {
				this.tableloading = true;
				this.$api.getbannerlist(this.collectionParams).then(res => {}, response => {
					this.basetableinfo = response.data.returnObj.varList;
					this.pageSize =  response.data.returnObj.totalCount;
					this.tableloading = false;
				}).catch(val => {
					//异常
				})
			},
			handleRemove(file, fileList) {
				this.showuploadbt = true
			},
			handlesuccess(file) {
				this.showuploadbt = false
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			//点击页码返回参数
			topage(topage) {
				this.collectionParams = Object.assign(this.collectionParams,topage);
				this.serviceCollection();
			},
			//编辑
			editbanner(scope) {
				this.formInline = scope.row;
				this.formInline.fblName = scope.row.blName;
				this.formInline.fblType = scope.row.blType;
				this.formInline.fblSingleLimit = scope.row.blSingleLimit;
				this.formInline.fblDayLimit = scope.row.blDayLimit;
				this.formInline.fblMonthLimit = scope.row.blMonthLimit;

				this.showdialog = true;

			},
			//新增或编辑
			editAmount(index, row) {
				//				this.$router.push('/operationmanage/rechargeinfo/amountsetup/editamount')
			},
			//删除
			delet() {

			},
			deletbankimg(bankid) {
				this.$api.deletebanklogo({
					bankId: bankid
				}).then(res => {}, response => {
					this.$message({
						type: 'success',
						message: response.data.resultMsg
					});
					if(response.data.resultCode == 0) {
						this.formInline.blImg = false
					}
				}).catch(val => {
					//异常
				})
			},
			saveinsteredit() {},
			//选择时间
			changetime(value) {
				if(value && value[0] && value[1]) {
					this.backListParams.startTime = dateformat(value[0], 'yyyy-MM-dd');
					this.backListParams.endTime = dateformat(value[1], 'yyyy-MM-dd');
				} else {
					this.backListParams.startTime = '';
					this.backListParams.endTime = '';
				}
			},

		}
	}
</script>
<style type="text/css">
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
	
	.el-table th>.cell {
		text-align: center;
	}
	
	.el-button {
		padding: -12px 20px;
	}
	
	.el-upload--picture-card {
		background-color: #fbfdff;
		/* border: 1px dashed #c0ccda; */
		border-radius: 6px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 30px;
		height: 30px;
		line-height: 30px;
		vertical-align: top;
	}
	
	.el-upload--picture-card {
		border: none;
	}
	
	.el-upload-list--picture-card .el-upload-list__item {
		width: 30px;
		height: 30px;
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
	
	.banimg {
		width: 30px;
		height: 30px;
	}
</style>
<style scoped="scoped">
	.bottom {
		position: relative;
	}
	
	.bottomBtn {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
	.el-table th>.cell {
		text-align: center;
	}
</style>