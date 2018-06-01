<template>
	<div class="redenvelopes">
		<el-form :inline="true" :model="collectionParams" class="demo-form-inline" align="left">
			<el-form-item label="关键字">
				<el-input v-model="collectionParams.keywords" placeholder="关键字"></el-input>
			</el-form-item>
			<el-button type="primary" size="medium" @click="serviceCollection">查询</el-button>
		</el-form>
        <el-table :data="basetableinfo"  v-loading="loading" :showopera="true" border style="width: 100%" v-on:selection="selection">
			<el-table-column type="selection" width="55" header-align="center" fixed="left" ></el-table-column>
            <el-table-column type="index" width="55" header-align="center" label="序号"   fixed="left" ></el-table-column>

			<el-table-column prop="share_title" label="标题"  align="center">
			</el-table-column>
			<el-table-column label="图片"   align="center" prop="share_img">
				<template slot-scope="scope">
					<img class="banimg" :src="imgsrc+scope.row.share_img" />
				</template>
			</el-table-column>
			<el-table-column prop="share_src" label="链接地址"  align="center">
			</el-table-column>
			<el-table-column prop="share_summary" label="描述"  align="center">
			</el-table-column>
			<el-table-column prop="share_addtime" label="创建时间" width="180" align="center">
			</el-table-column>
			<el-table-column prop="share_updatetime"   label="更新时间" width="180" align="center">
			</el-table-column>			
			<el-table-column prop="shareType" label="分享类型" width="180" align="center">
			</el-table-column>			
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="编辑" placement="top">
						<el-button type="text" icon='iconfont icon-bianji' v-on:click="callDetails(scope)"></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom">
			<div class="bottomBtn" align="left">
				<el-button type="primary" size="mini" @click="editAmount">新增</el-button>
				<!-- <el-button type="danger" size="mini" class="el-icon-delete" style="margin: 0;" @click="delet"></el-button> -->
			</div>
			<basepage :sunmary='pageSize' v-on:topage="topage"></basepage>
		</div>
		<el-dialog title="分享详情" :visible.sync="dialogVisible" width="30%">
			<el-form ref="form" :model="form" label-width="90px" :rules="rules">
				<el-form-item label="分享类型" prop="share_type">
					<el-select style='float: left;' v-model="form.share_type" placeholder="分享类型">
						<el-option label="推广分享" value="1"></el-option>
						<el-option label="红包分享" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题" prop="share_title">
					<el-input type="textarea" v-model="form.share_title"></el-input>
				</el-form-item>
				<el-form-item label="图片地址">
					<el-upload class="upload-demo" :limit='1' :action="uploadUrl" :data="lotparams" :before-upload="beforeAvatarUpload" :on-success="handlesuccess" :on-remove="handleRemove" list-type="picture" ref="upload">
						<el-button v-show='showuploadbt' size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="链接地址" prop="share_src">
					<el-input type="textarea" v-model="form.share_src"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="share_summary">
					<el-input type="textarea" v-model="form.share_summary"></el-input>
				</el-form-item>
				<el-button size="medium" @click="dialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="saveshareinfo('form')">保 存</el-button>
			</el-form>

		</el-dialog>
	</div>
</template>
<script>
	import basepage from '@/components/basepage'
	import { isURL } from '@/utils/index'
	import config from '@/config/index'
	export default {
		name: 'redenvelopes',
		components: {
			basepage
		},
		mounted() {
			this.serviceCollection()
			this.imgsrc = config.imgsrc
		},
		data() {
			var checkaddress = (rule,value,callback)=>{
				if (!value) {
					return callback(new Error('请输入链接地址'));
				}
		        setTimeout(() => {
		          if (!isURL(value)) {
		            callback(new Error('请输入正确格式的网址'));
		          } else{
                    callback()
		          }
		        }, 1000);
			}
			return {
				imgsrc:'',
				lotparams:{type:'share'},
				uploadUrl:'/ykj/photo/upPhoto',
				form: {
					share_id:'',//分享编号
					share_img:'',//分享图片
					share_type: '',  //分享类型
					share_title: '', //分享标题
					share_src : '',   //图片地址
					share_summary: '', //分享内容
				},
				dialogVisible: false,
				showuploadbt: true,
				//请求列表参数
				collectionParams: {
					keywords: '',
				},
				loading: false,
				//列表信息
				basetableinfo: [],
				pageSize:0,//总条数
				selectionlist:'',
				rules: {
		          share_type: [
		            { required: true, message: '请选择分享类型', trigger: 'blur' },
		          ],
		          share_title: [
		            { required: true, message: '请填写分享标题',trigger: 'blur'}
		          ],
		          share_src: [
		            { validator: checkaddress, trigger: 'blur' }
		          ],
		          share_summary: [
		            { required: true, message: '请填写分享内容',trigger: 'blur'}
		          ]
		        },
			}
		},
		methods: {
			serviceCollection() {
				this.loading = true;
				this.$api.redenvelopes(this.collectionParams).then(res => {}, response => {
					this.loading = false;
					if(response.data.resultCode == 0){
	                    this.basetableinfo = response.data.returnObj.shareList;
	                    this.basetableinfo.forEach(item => {
							switch (item.share_type) {
								case '1':this.$set(item,'shareType','推广分享');break;
								case '2':this.$set(item,'shareType','红包分享');break;
							}
						})
						this.pageSize = response.data.returnObj.totalCount;
						this.basetableinfo.forEach(item => {
							console.log(item.share_type)
							switch (item.share_type) {
								case '1':
									this.$set(item,'shareType','推广分享');
									break;
								case '2':
									this.$set(item,'shareType','红包分享');
									break;
							}
							
						})
					}else{
						this.$message.error({message:'查询失败'})
					}
				}).catch(val => {
					this.$message.error({message:'服务器异常'})
				})
			},
			handleRemove(file, fileList) {
				
			},
			handlesuccess(file) {
				this.form.share_img =  file.returnObj.photoPath
			},
			beforeAvatarUpload(file) {
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
			//点击页码返回参数
			topage(topage) {
				this.collectionParams = Object.assign(this.collectionParams,topage);
				this.serviceCollection();
			},
			//编辑
			callDetails(scope) {
				this.showuploadbt        = true
				this.dialogVisible       = true
				this.form.share_id       = scope.row.share_id
				this.form.share_type     = scope.row.share_type
				this.form.share_src      = scope.row.share_src
				this.form.share_summary  = scope.row.share_summary
				this.form.share_title    = scope.row.share_title
			},
			//新增
			editAmount() {
				this.showuploadbt        = true
				this.dialogVisible       = true
				this.form.share_type     = '';
				this.form.share_src      = '';
				this.form.share_summary  = '';
				this.form.share_title    = '';
			},
			saveshareinfo(formName){//保存分享信息
				 this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	if(!this.form.share_img){
                           this.$message({type: 'warning',message: '请添加图片'})
                           return
		            	}
		            	//执行保存
		            	this.$api.saveshareinfo(this.form).then(res => {}, response => {
		            		this.loading = false;
							this.$message({type: 'success',message: response.data.resultMsg})
							if(response.data.resultCode == 0){
								this.dialogVisible = false
								this.serviceCollection()
							}
						}).catch(val => {
							this.$message({type: 'error',message: '服务器异常'})
						})
		            } else {
		              return false;
		            }
		        })
			},
			delet(){//删除 获取选中数据
				if(!this.selectionlist){
				  this.$message('请选择要删除的项')
				  return
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.$message({ type: 'success',message: '删除成功!'});
				    // this.$api.shareitemdelAll({share_ids:this.selectionlist}).then(res=>{},response=>{
				    //     if(response.data.resultCode==0){ 
				    //       this.$message({ type: 'success',message: '删除成功!'});
				    //       this.serviceCollection()
				    //     }else if (response.data.resultCode==1) {
				    //       this.$message({ type: 'error',message: '删除失败!'});
				    //     }
				    // }).catch(()=>{//捕获异常
				    //     this.$message({ type: 'error',message: '服务器异常!'});
				    // })
				}).catch(() => {
				      this.$message({type: 'info',message: '已取消删除'});          
				});
			},
			selection(target){//获取选中的share_id
			  this.selectionlist = ''
			  target.forEach((elem,index)=>{
			     if(index==0){
			      this.selectionlist += elem.share_id 
			     }else{
			      this.selectionlist  +=  ','+elem.share_id 
			     }
			  })
			}
		}
	}
</script>
<style type="text/css">
	.el-upload--picture-card {
		border: none;
		width: 0;
		height: 0;
		line-height: 0;
	}
</style>
<style lang="less" scoped="scoped">
	.bottom {
		position: relative;
	}
	.bottomBtn {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.banimg {
		width: 40px;
		height:40px;
	}
</style>