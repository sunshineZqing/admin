<template>
	<div class="ykjinfo">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keyWords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-button type="primary" size="medium" @click="serviceCollection">查询</el-button>
		</el-form>
		<el-table :data="basetableinfo"  v-loading="tableloading" :showopera="true" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" header-align="center" fixed="left" ></el-table-column>
            <el-table-column type="index" width="60" header-align="center" label="序号"   fixed="left" ></el-table-column>
			<el-table-column prop="bl_name" label="银行名称" width="160" align="center">
			</el-table-column>
			<el-table-column prop="bl_type" label="银行编号" width="160"  align="center">
			</el-table-column>
			<el-table-column prop="bl_single_limit" label="单笔限额" width="160"  align="center">
			</el-table-column>
			<el-table-column prop="bl_day_limit" label="每日限额" width="160"  align="center">
			</el-table-column>
			<el-table-column prop="bl_month_limit" label="每月限额" width="160"  align="center">
			</el-table-column>
			<el-table-column label="银行图标" width="180"  align="center">
				<template slot-scope="scope">
					<img class="banimg" :src="imgsrc+scope.row.bl_img" />
				</template>
			</el-table-column>
			<el-table-column prop="type" label="银行状态" width="120" align="center">
			</el-table-column>
			<el-table-column prop="bm_type" label="维护类型" width="160px" align="center">
			</el-table-column>
			<el-table-column prop="bm_start_time" label="维护开始时间" width="180" align="center">
			</el-table-column>
			<el-table-column prop="bm_end_time"   label="维护结束时间" width="180" align="center">
			</el-table-column>			
			<el-table-column prop="bl_updatetime" label="维护创建时间" width="180" align="center">
			</el-table-column>			
			<el-table-column prop="bm_updatetime" label="维护更新时间" width="180" align="center">
			</el-table-column>
			<el-table-column prop="bl_createtime" label="银行创建时间" width="180" align="center">
			</el-table-column>					
			<el-table-column prop="bl_updatetime" label="更新时间" width="180" align="center">
			</el-table-column>			
			<el-table-column label="操作" width="160"  align="center" fixed="right">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="修改" placement="top-start">
				       <el-button style='padding:0' type="text" icon='iconfont icon-bianji' @click="editbank(scope.row)"></el-button>
				    </el-tooltip>
					<el-tooltip class="item" effect="dark" content="维护" placement="top-start">
					    <el-button style='padding:0' type="text" icon='iconfont icon-gongju' @click="maintenance(scope.row.bl_id)"></el-button>
				    </el-tooltip>
				    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
			          <el-button type="text" icon='el-icon-delete'  @click="deletbankimg(scope.row.bl_id)" size="medium"></el-button>
			        </el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom">
			<div class="bottomBtn" align="left">
				<el-button type="primary" size="mini" @click="add">新增</el-button>
				<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delet"></el-button>
			</div>
			<basepage :sunmary='pageSize' v-on:topage="topage"></basepage>
		</div>
		<el-dialog title="银行信息" :visible.sync="showdialog" width="660px" center>
			<el-form :inline="true" :label-position="poslabel" label-width="80px" :model="formInline" :rules="rules" class="demo-form-inline" ref="formInline">
				<el-form-item label="银行名称" prop="bl_name">
					<el-input v-model="formInline.bl_name" placeholder="银行名称"></el-input>
				</el-form-item>
				<el-form-item label="银行编号" prop="bl_type">
					<el-input v-model.number="formInline.bl_type" placeholder="银行编号"></el-input>
				</el-form-item>
				<el-form-item label="单笔限额" prop="bl_single_limit">
					<el-input v-model.number="formInline.bl_single_limit" placeholder="单笔限额"></el-input>
				</el-form-item>
				<el-form-item label="每日限额" prop="bl_day_limit">
					<el-input v-model.number="formInline.bl_day_limit" placeholder="每日限额"></el-input>
				</el-form-item>
				<el-form-item label="每月限额" prop="bl_month_limit">
					<el-input v-model.number="formInline.bl_month_limit" placeholder="每月限额"></el-input>
				</el-form-item>
				<el-form-item label="银行图标">
					<div v-if='formInline.bl_img'>
						<img class="banimg" :src="imgsrc+'uploadBankImgs/'+formInline.bl_img"/>
						<el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;position: relative;top: -10px;left: 10px;" @click="deletbankimg(formInline.bl_id)"></el-button>
					</div>
					<div v-if='!formInline.bl_img'>
						<el-upload :limit='1' class="upload-demo" :action="uploadUrl" :data="lotparams" :on-success="handlesuccess"   :on-remove="handleRemove" ref="upload" 
						  :before-upload="beforeAvatarUpload">
                            <el-button  size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item class="btnstyle">
				    <el-button  size="medium" @click="showdialog = false">取 消</el-button>
				    <el-button  size="medium" :loading='btloading' type="primary" @click="saveinsteredit('formInline')">保存</el-button>
				</el-form-item>
			</el-form>
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
			var checksbankid = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入银行编号'));
				}
		        setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		            callback();
		          }
		        }, 1000);
		    };
			var checksimple = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入单笔限额'));
				}
		        setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		          	if(this.formInline.bl_day_limit&&(parseInt(value)>parseInt(this.formInline.bl_day_limit))){
                        callback(new Error('单笔限额必须小于每日限额'));
		          	}else{
		          		callback();
		          	}
		          }
		        }, 1000);
		    };
		    var checkday = (rule, value, callback) => {
		    	if (!value) {
					return callback(new Error('请输入每日限额'));
				}
		        setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		          	if(parseInt(value)<parseInt(this.formInline.bl_single_limit)){
                        callback(new Error('每日限额必须大于单笔限额'));
		          	}else if(parseInt(value)>parseInt(this.formInline.bl_month_limit)){
		          		callback(new Error('每日限额必须小于每月限额'));
		          	}else{
                        callback();
		          	}
		          }
		        }, 1000);
		    };
		    var checkmouth = (rule, value, callback) => {
		    	if (!value) {
					return callback(new Error('请输入每月限额'));
				}
		        setTimeout(() => {
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          } else {
		          	if((parseInt(value)<parseInt(this.formInline.bl_day_limit))||(parseInt(value)<parseInt(this.formInline.bl_single_limit))){
                       callback(new Error('每月限额必须大于每日限额和单笔限额'));
		          	}else{
		          	   callback();
		          	}
		          }
		        }, 1000);
		    };
			return {
				lotparams:{type:'bank'},
				uploadUrl:'/ykj/photo/upPhoto',
				bankimgsrc:"", //图片地址
				poslabel:'left',
				pageSize:0,//总条数
				collectionParams: {//请求列表参数
					keywords: ''
				},
				value9:'',
				formInline: { bl_name:'',bl_type:'',bl_single_limit:'',bl_day_limit:'',bl_month_limit:'',bl_img:'',bl_id:''},
				tableloading: true,
				btloading: false,
				showuploadbt: true,
				//列表信息
				basetableinfo: [],
				showdialog: false,
				imgsrc:'',//银行图标路径
		        rules: {
		          bl_name: [
		            { required: true, message: '请输入银行名称', trigger: 'blur' }
		          ],
		          bl_type: [
		            {  validator: checksbankid, trigger: 'blur'  }
		          ],
		          bl_single_limit: [
		            { validator: checksimple, trigger: 'blur' }
		          ],
		          bl_day_limit: [
		            { validator: checkday, trigger: 'blur' }
		          ],
		          bl_month_limit: [
		            { validator: checkmouth, trigger: 'blur' }
		          ]
		        },
		        deletlist:[]
			}
		},
		mounted() {
			this.serviceCollection()
			this.imgsrc = config.imgsrc;
		},
		methods: {
			serviceCollection() {//初始化 + 搜索
				this.tableloading = true;
				this.$api.getbanklist(this.collectionParams).then(res => {}, response => {
					this.tableloading  = false;
					if(response.data.resultCode == 0 ){
						this.basetableinfo = response.data.returnObj.varList;
						this.basetableinfo.forEach(elem=>{
							switch(elem.type){
								case 0: elem.type = '正常'; break;
								case 1: elem.type = '维护中'; break;
								case 3: elem.type = '维护中'; break;
							}
							switch(elem.bm_type){
								case 0: elem.bm_type = '正常'; break;
								case 1: elem.bm_type = '提现维护(实时付)'; break;
								case 2: elem.bm_type = '还款维护(分期付)'; break;
								case 3: elem.bm_type = '全部维护'; break;
							}
						})
						this.pageSize  = response.data.returnObj.totalCount || this.basetableinfo.length || this.pageSize;
					}else{
						this.$message({type:'error',message:response.data.resultMsg})
					}
				}).catch(val => {
					this.tableloading  = false;
					this.$message({type:'error',message:"服务器异常"})
				})
			},
			topage(target) {//跳页
				this.collectionParams = Object.assign(this.collectionParams,target);
				this.serviceCollection();
			},
			editbank(row) {//编辑
				this.formInline.bl_id           = row.bl_id;
				this.formInline.bl_name         = row.bl_name;
				this.formInline.bl_type         = Number(row.bl_type)
				this.formInline.bl_single_limit = Number(row.bl_single_limit);
				this.formInline.bl_day_limit    = Number(row.bl_day_limit);
				this.formInline.bl_month_limit  = Number(row.bl_month_limit);
				this.showdialog = true;
			},
			maintenance(bl_id){//维护 -- 跳转维护页面
               this.$router.push({name:'银行维护',params:{bl_id:bl_id}})
			},
			add(index, row) {//新增
				this.formInline.bl_name         = '';
				this.formInline.bl_type         = '';
				this.formInline.bl_single_limit = '';
				this.formInline.bl_day_limit    = '';
				this.formInline.bl_month_limit  = '';
				this.showdialog = true;
			},
			deletbankimg(bankid) { //单项删除
				this.$api.deletebanklogo({bl_id: bankid}).then(res => {}, response => {
					this.$message({type: 'success',message: response.data.resultMsg})
					if(response.data.resultCode == 0){
						this.serviceCollection()
						this.formInline.bl_img = false
					}
				}).catch(val => {
					this.$message({type: 'error',message: '服务器异常'})
				})
			},
			delet() {//批量删除
				if((!this.deletlist)||this.deletlist.length==0){
                   this.$message({type: 'info',message: '请选择要删除的项'})
                   return 
				}
				this.$api.deletebankicon({bl_ids:this.deletlist}).then(res => {}, response => {
					this.$message({type: 'success',message: response.data.resultMsg})
					if(response.data.resultCode == 0){
						this.serviceCollection()
					}
				}).catch(val => {
					this.$message({type: 'error',message: '服务器异常'})
				})

			},
			beforeAvatarUpload(file){
		        const isJPG  = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG(JPEG) 或者 PNG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
                return  isJPG && isLt2M
			},
			handleRemove(file, fileList) { //删除图片
				this.showuploadbt = true
			},
			handlesuccess(file) {//上传成功
				this.bankimgsrc =  file.returnObj.photoPath
			},
			saveinsteredit(formName) { //保存操作
			    this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	if(!this.bankimgsrc){
                           this.$message({type: 'warning',message: '请添加图片'})
                           return
		            	}
		            	let params = {
		            		bl_id:this.formInline.bl_id,
		            		bl_type:this.formInline.bl_type,
		            		bl_name:this.formInline.bl_name,
		            		bl_single_limit:this.formInline.bl_single_limit,
		            		bl_day_limit:this.formInline.bl_day_limit,
		            		bl_month_limit:this.formInline.bl_month_limit,
		            		bl_img:this.bankimgsrc
		            	}
		            	//执行保存
		            	this.$api.savebankcontent(params).then(res => {}, response => {
							this.$message({type: 'success',message: response.data.resultMsg})
							if(response.data.resultCode == 0){
								this.serviceCollection()
								this.showdialog = false;
							}
						}).catch(val => {
							this.$message({type: 'error',message: '服务器异常'})
						})
		            } else {
		              return false;
		            }
		        });
			},
			handleSelectionChange(val) {
				this.deletlist = []
				val.forEach(elem=>{
					this.deletlist.push(elem.bl_id)
				})
				this.deletlist = this.deletlist.join(',')
			}
		}
	}
</script>
<style type="text/css" scoped>
	thead th {
		background: #ecf5ff;
	}
	.el-button+.el-button {
		margin-left: 0px;
	}
	.el-table td,.el-table th {
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
		height:30px;
	}
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
	.btnstyle{
		display: block;
		width: 100%;
		text-align: center;
	}
</style>