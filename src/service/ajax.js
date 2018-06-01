import axios from 'axios'
import * as $http from './config'


export default {
	// 综合
	capter(params){ //验证并发送验证码
		return $http.fetch('/ykj/login/userLogin_H5',params)
	},
	loginreal(params){ // 登录 ...
		return $http.fetch('/ykj/login/volidateSmsCode_H5',params)
	},
	login(params){ // 登录 不要验证码
		return $http.fetch('/ykj/login/userLogin_H5',params)
	},
	logout(params){ // 登出 
        return $http.fetch('/ykj/login/logoutH5',params)
    },
	asyncrouters(params){ // 获取异步路由表 
		return $http.fetch('/ykj/login/main/index_H5',params)
	},
	getmsgtip(params){ //获取短信提示
        return $http.fetch('/ykj/sms/template/details',params)
	},
	//设置
	goSetPersonalData(params){//设置->去编辑个人资料
		return $http.fetch('/ykj/user/goEditMyUJson',params)
	},
	setPersonalData(params){//设置->提交编辑个人资料
		return $http.fetch('/ykj/user/editUJson',params)
	},
	// 系统管理
	getbasepemission(params){ // 获取基础角色权限 
        return $http.fetch('/ykj/role/roleH5',params)
	},
	getmenupemission(params){ // 菜单权限 
        return $http.fetch('/ykj/role/menuqx_H5',params)
	},
	savemenulist(params){
        return $http.fetch('/ykj/role/saveMenuqx_H5',params)
	},
	modifyrolename(params){//修改角色/组名称  
        return $http.fetch('/ykj/role/edit_H5',params)
	},
	delselfrole(params){//删除角色
        return $http.fetch('/ykj/role/delete_H5',params)
	},	
	addrole(params){//添加角色 /组
        return $http.fetch('/ykj/role/add_H5',params)
	},
	delselfgroup(params){ //删除当前组
        return $http.fetch('/ykj/role/delete_H5',params)
	},
	btnmanagement(params){ // 按钮管理 
      
	},
	onlinemanagement(params){//在线管理 
          
	},
	logmangement(params){ //日志管理列表  
       return $http.fetch('/ykj/fhlog/listJson',params)
	},
	systemusers(params){//系统用户列表 
       return $http.fetch('/ykj/user/listUsersJson',params)
	},
	systemusersdelsimple(params){//系统用户列表=>单项删除 
       return $http.fetch('/ykj/user/deleteUJson',params)
	},
	systemusersdelAll(params){//系统用户列表=>批量删除 
       return $http.fetch('/ykj/user/deleteAllU_H5',params)
	},
	systemuserssave(params){//系统用户列表=>保存新增和编辑 
       return $http.fetch('/ykj/user/saveU_H5',params)
	},
	//风控管理
	getriskprimary(params){//审核管理=>表格数据 
		return $http.fetch('/ykj/ynum/listJson',params)
	},
	getriskprimaryuserinfo(params){//审核管理=>认证详情用户基本信息 
		return $http.fetch('/ykj/ynum/certify/goCertifyJson',params)
	},
	getauthitem(params){//审核管理=>认证详情各项信息 
        return $http.fetch('/ykj/ynum/certify/listJson',params)
	},
    authentication(params){//审核管理=>通过/驳回 
        return $http.fetch('/ykj/ynumauthentication/authenticationJson',params)
	},
	authsuggests(params){//审核管理=>审核建议 
        return $http.fetch('/ykj/ynum/certify/auditReportJson',params)
	},
	addtag(params){//审核管理=>添加标签 
        return $http.fetch('/ykj/sysmark/save',params)
	},
	edittag(params){//审核管理=>编辑标签 
        return $http.fetch('/ykj/sysmark/edit',params)
	},
	savefirstauth(params){//审核管理=>保存初审建议 初审额度。。。 
        return $http.fetch('/ykj/ynum/certify/auditFirst',params)
	},	
	savesecondauth(params){//审核管理=>保存复审建议 复审额度。。。 
        return $http.fetch('/ykj/ynum/certify/auditSecond',params)
	},	
	saveContact(params){//保存紧急联系人和备用电话  
        return $http.fetch('/ykj/ynum/certify/saveContact',params)
	},
	savelastauth(params){//审核管理=>保存终审建议 终审额度。。。 
        return $http.fetch('/ykj/ynum/certify/auditThird',params)
	},	
	saveAdvise(params){//审核管理=>初审 复审 终审 建议（额度）提交
        return $http.fetch('/ykj/ynum/certify/saveAdvise',params)
	},
	easydelay(params){//易指数管理=>延时 
        return $http.fetch('/ykj/ynum/delayJson',params)
	},
	saveScore(params){//易指数管理=>提交评分 
        return $http.fetch('/ykj/ynum/certify/saveScore',params)
	},
    getscorelist(params){//评分管理=>评分列表 
        return $http.fetch('/ykj/ynum/score/listJson',params)
	},
	scoredetails(params){//评分管理=>评分详情 
        return $http.fetch('/ykj/ynum/score/detailsJson',params)
	},
	overanalysis(params){//逾期分析列表 
        return $http.fetch('/ykj/ynum/overListH5',params)
	},
    getamountlist(params){//提额列表 
        return $http.fetch('/ykj/mention/amount/userlistJson',params)
    },
    addamountlist(params){//提额列表->新增 
        
    },
    delamountlist(params){//提额列表->删除 
        
    },
    usermentiondetails(params){//提额列表->用户提额详情 
        return $http.fetch('/ykj/mention/amount/detailsJson',params)
    },
    customerservice(params){//提额列表->客服催收详情 
        return $http.fetch('/ykj/mention/amount/kfdetailsJson',params)
    },
    userauthdetails(params){//提额列表->用户认证详情详情 
        return $http.fetch('/ykj/mention/amount/openAdviceJson',params)
    },
    submitsuggestions(params){//提额列表->提交提额意见 
        return $http.fetch('/ykj/mention/amount/saveAdviceJson',params)

    },
    bhsuggestions(params){//提额列表->驳回提额
        return $http.fetch('/ykj/mention/amount/downAdviceJson',params)
    },
    certificationList(params){//提额列表->重新认证 
        return $http.fetch('/ykj/mention/amount/authenticationAgainList',params)
    },
    recertification(params){//提额列表->重新认证 
        return $http.fetch('/ykj/mention/amount/authenticationAgain',params)
    },
    mailBack(params){
    	return $http.fetch('/ykj/ynum/mailAuthentication',params)
    },
    
    //成功提额用户
    successrateuser(params){
    	return $http.fetch('/ykj/mention/amount /successList',params)
    },
	//运营管理
	getbanklist(params){//运营管理->银行管理  
		return $http.fetch('/ykj/bank/bankListJson',params)
	},
	deletebanklogo(params){//运营管理->单项删除银行图标  
		return $http.fetch('/ykj/bank/delBankPhotoJson',params)
	},
	deletebankicon(params){//运营管理->批量删除银行图标  
		return $http.fetch('/ykj/bank/deleteBank',params)
	},
	savebankcontent(params){//保存银行内容
        return $http.fetch('/ykj/bank/saveBankJson',params)
	},
	getbankmiantenance(params){//银行维护列表
        return $http.fetch('/ykj/bank/bankMaintainListJson',params)
	},
	savebankmiantenance(params){//保存银行维护信息
        return $http.fetch('/ykj/bank/saveMainBankJson',params)
	},
	getbannerlist(params){//运营管理->轮播图管理  
		return $http.fetch('/ykj/discovercarouselfigure/listJson',params)
	},
	getgeneralize(params){//运营管理->推广管理  
		return $http.fetch('/ykj/permissions/listJson',params)
	},
	modifygeneralizepower(params){//运营管理->推广管理->是否开启用户推广权限   
		return $http.fetch('/ykj/permissions/editJson',params)
	},
	getnogeneralize(params){//运营管理->获取未推广用户列表  
		return $http.fetch('/ykj/permissions/toaddlistJson',params)
	},
	redpacketsnum(params){//运营管理->红包领取次数
		return $http.fetch('/ykj/red/redTimesJson',params)
	},
	redpacketrecorde(params){//运营管理->红包领取记录
		return $http.fetch('/ykj/red/redRecordJson',params)
	},
	redenvelopes(params){//运营管理->分享管理
		return $http.fetch('/ykj/share/listJson',params)
	},
	saveshareinfo(params){ // 保存新增/修改分享
        return $http.fetch('/ykj/share/saveShare',params)
	},
	shareitemdelAll(params){// 分享 批量删除
        
	},
	saveedietinster(params){//利率管理编辑后保存
		return $http.fetch('/ykj/happuser/saveInterestFormTypeJson',params)
	},
	getcouponlist(params){ // 优惠券列表
        return $http.fetch('/ykj/coupon/listJson',params)
	},
	getcouponuserlist(params){ // 优惠券用户列表
        return $http.fetch('/ykj/coupon/putoutJson',params)
	},
	providecoupon(params){//发放优惠券
        return $http.fetch('/ykj/coupon/saveJson',params)
	},
	pushuserlist(params){ //推送用户列表 
        return $http.fetch('/ykj/push/getUserListJson',params)
	},
	savepushmsg(params){ // 保存消息推送
        return $http.fetch('/ykj/push/savePushInfo',params)
	},
	ykjturnyfq(params){//推送管理列表
		return $http.fetch('/ykj/push/pushListJson',params)
	},
	amountsetup(params){//提额设置列表
		return $http.fetch('/ykj/mention/amount/setlistJson',params)
	},
	deletamountsetup(params){//删除提额设置列表项
		return $http.fetch('/ykj/mention/amount/deleteAllJson',params)
	},
	addEditamount(params){//提交 新建提额设置
		return $http.fetch('/ykj/mention/amount/addJson',params)
	},
	setEditamount(params){//提交编辑提额设置页面
		return $http.fetch('/ykj/mention/amount/editJson',params)
	},
	amounteshenpisetup(params){//提额审批流程配置
		return $http.fetch('/ykj/mention/audit/setListJson',params)
	},
	addPromoteMoney(params){//提额审批流程-> 新增
		return $http.fetch('/ykj/mention/audit/setListInsert',params)
	},
	setPromoteMoney(params){//提额审批流程-> 设置
		return $http.fetch('/ykj/mention/audit/setListUpdate',params)
	},
	deletPromoteMoney(params){//提额审批流程-> 删除
		return $http.fetch('/ykj/mention/audit/setListDelete',params)
	},
	
	//客服管理
	getcustomeruser(params){//获取用户信息
		return $http.fetch('/ykj/happuser/callUsersH5.do',params)
	},
	logoffuser(params){ //注销用户
        return $http.fetch('/ykj/happuser/cancel',params)
	},
	changuserphonenum(params){//修改用户手机号
		return $http.fetch('/ykj/change/phone/saveJson',params)
	},
	getloadphonecode(params){//客服修改手机号 给旧手机号发送验证码
		return $http.fetch('/ykj/change/phone/sendOldMsgJson',params)
	},
	checkloadphonecode(params){//客服修改手机号 验证旧手机号是否正确
		return $http.fetch('/ykj/change/phone/checkOldnumJson',params)
	},	
	checknewphonecode(params){//客服修改手机号 验证新手机号是否正确
		return $http.fetch('/ykj/change/phone/checkNewnumJson',params)
	},
	getnewphonecode(params){//修改用户手机号 给新手机发送验证码
		return $http.fetch('/ykj/change/phone/sendNewMsgJson',params)
	},
	popularize(params){ //用户信息 =>推广列表
        
	},
	popularizepeople(params){ //用户信息 =>推广人数列表
        
	},
	sendborrowmessage(params){//快借逾期发送短信
		return $http.fetch('/ykj/borrow/sendSmsJson',params)
	},
	sendstagmessage(params){//分期逾期发送短信
		return $http.fetch('/ykj/stage/sendSmsJson',params)
	},
	sendmsgcard(params){//身份证即将逾期发送短信
		return $http.fetch('/ykj/appuserIdentity/saveSms',params)
	},
	getsoonborrowoverlist(params){//快借即将逾期列表
		return $http.fetch('/ykj/borrow/borrowOverdueSoonJson',params)
	},
	getsoonstageoverlist(params){//分期即将逾期列表
		return $http.fetch('/ykj/stage/stageOverdueSoonJson',params)
	},
	getsoonstcardoverlist(params){//身份证即将逾期列表
		return $http.fetch('/ykj/appuserIdentity/userIdentityOverdueJson',params)
	},
	getsterlist(params){//利率管理happuser/saveInterestFormTypeJson
		return $http.fetch('/ykj/happuser/gradeInterestListJson',params)
	},
	serviceCollection(params){//客服催收列表
		return $http.fetch('/ykj/collection/kflistH5',params)
	},
	fqtakephone(params){//分期保存电话记录
		return $http.fetch('/ykj/stage/saveCallRecordJson',params)
	},
	kjtakephone(params){//快借保存电话记录
		return $http.fetch('/ykj/borrow/saveCallRecordJson',params)
	},
	cardtakephone(params){//身份证保存电话记录
		return $http.fetch('/ykj/appuserIdentity/saveCall',params)
	},
	getlistdata(){
		return axios.get('/ykj/borrow/borrowOverdueJosn?userId=24')
	},
	getkflistdata(params){
		return $http.fetch('/ykj/collection/kflistH5',params)
	},
	//催收管理
	collection(params){//催收列表
		return $http.fetch('/ykj/collection/listH5',params)
	},
	overdue(params){//逾期列表
		return $http.fetch('/ykj/borrow/borrowOverdueJson',params)
	},
	overdueSituation(params){//逾期待还情况
		return $http.fetch('/ykj/collection/borrowingSituation',params)
	},
	kjOverdue(params){//催收->快借逾期
		return $http.fetch('/ykj/borrow/borrowOverdueJson',params)
	},
	repaymentDetails(params){//催收-> 快借逾期->还款详情
		return $http.fetch('/ykj/borrow/goDetailsJson',params)
	},
	newKJRepayments(params){//催收-> 快借逾期 ->新增还款
		return $http.fetch('/ykj/collection/toAddBorrowJson',params)
	},
	newKJRepaymentsSubmit(params){//催收-> 快借逾期 ->新增还款提交
		return $http.fetch('/ykj/collection/addBorrow',params)
	},
	fqOverdue(params){//催收-> 分期逾期 
		return $http.fetch('/ykj/collection/stageNotPayListJson',params)
	},
	fqOverdueDetails(params){//催收-> 分期逾期 ->还款详情
		return $http.fetch('/ykj/collection/stageNotAllPayDetileJson',params)
	},
	newfqRepayments(params){//催收-> 分期逾期-> 新增还款页面 
		return $http.fetch('/ykj/collection/toAddStageJson',params)
	},
	newfqRepaymentsSubmit(params){//催收-> 分期逾期-> 新增还款提交
		return $http.fetch('/ykj/collection/addStage',params)
	},
	callCollection(params){//催收->电话催收
		return $http.fetch('/ykj/collection/telCollectionListJson',params)
	},
	collectionFeedback(params){ //催收->电话催收->催收反馈详情列表
		return $http.fetch('/ykj/collection/telCollectionRecordJson',params)
	},
	submitFeedback(params){//催收->电话催收->提交电话催收反馈信息
		return $http.fetch('/ykj/collection/addCollectionJson',params)
	},
	soonOverdue(params){//催收->即将逾期电话记录
		return $http.fetch('/ykj/collection/becomingOverRecordJson',params)
	},
	overdueAfter(params){//催收->即将逾期电话记录
		return $http.fetch('/ykj/collection/overRecordJson',params)
	},
	msgCont(params){//催收->获取短信内容
		return $http.fetch('/ykj/sms/template/details',params)
	},
	msgShow(params){//催收->发送短信+客服催收->发送短信
		return $http.fetch('/ykj/collection/sendSms',params)
	},
	transferCont(params){//催收->转交
		return $http.fetch('/ykj/collection/goForwardJson',params)
	},
	transferSubmit(params){//催收->转交提交
		return $http.fetch('/ykj/collection/forwardJson',params)
	},
	addCSBack(params){//催收->加入黑名单
		return $http.fetch('/ykj/collection/edit',params)
	},
	frozenaccount(params){//冻结账户
		return $http.fetch('/ykj/Frozen/listJson',params)
	},
	frozenaccountDetails(params){//冻结账户->详情信息
		return $http.fetch('/ykj/Frozen/frozenzRecordJson',params)
	},
	frozenDelete(params){ //冻结账户->解除冻结
		return $http.fetch('/ykj/Frozen/frozenJson',params)
	},
	frozenDj(params){ //冻结账户->冻结
		return $http.fetch('/ykj/Frozen/djJson',params)
	},
	backList(params){//黑名单列表
		return $http.fetch('/ykj/collection/BlacklistH5',params)
	},
	deleteBack(params){//黑名单列表->删除按钮
		return $http.fetch('/ykj/collection/deleteBlack',params)
	},
	setPowerBack(params){//黑名单列表->用户权限设置
		return $http.fetch('/ykj/collection/goLimitJson',params)
	},
	setPowerBackSubmit(params){//黑名单列表->用户权限设置提交
		return $http.fetch('/ykj/collection/limitJson',params)
	},
	callingkjoverdue(params){//客服催收->快借逾期
		return $http.fetch('/ykj/collection/borrowOverdueJson',params)
	},
	callingfqoverdue(params){//客服催收->分期逾期
		return $http.fetch('/ykj/collection/stageOverdueJson',params)
	},
	callDetailsList(params){//客服催收->电话催收详情
		return $http.fetch('/ykj/collection/teldetailsJson',params)
	},
	callDetailsCallBtn(params){//客服催收->打电话按钮
		return $http.fetch('/ykj/collection/tocallJson',params)
	},
//	callingSubmit(params){//客服催收->打电话->提交
//		return $http.fetch('/ykj/collection/editsJson',params)
//	},
	callingkfSubmit(params){//客服催收->打电话->提交
		return $http.fetch('/ykj/collection/editskfJson',params)
	},
	transferKFSubmit(params){//客服催收->转交->提交
		return $http.fetch('/ykj/collection/forwardkfJson',params)
	},
	//统计管理
	firstTrial(params){//统计管理->风控统计->初审统计
		return $http.fetch('/ykj/statistics/firstTrialH5',params)
	},
	secondTrial(params){//统计管理->风控统计->复审统计
		return $http.fetch('/ykj/statistics/secondTrialH5',params)
	},
	secondPowerTrial(params){//统计管理->风控统计->复审授权统计
		return $http.fetch('/ykj/statistics/loanH5',params)
	},
	loanstatistics(params){//统计管理->借款统计
		return $http.fetch('/ykj/statistics/loanH5.do?action=1',params)
	},
	paymoneystatistics(params){//统计管理->还款统计
		return $http.fetch('/ykj/statistics/loanH5.do?action=2',params)
	},
	loanrecoveryList(params){//统计管理->归还利息统计 + 逾期统计 + 贷后追回统计
		return $http.fetch('/ykj/statistics/loanH5',params)
	},
	callrecoveryList(params){//统计管理->归还利息统计 + 逾期统计 + 客服追回统计
		return $http.fetch('/ykj/statistics/customerH5',params)
	},
	regioninfo(params){//统计管理->地域信息补录
		return $http.fetch('/ykj/region/collectionRecordingJson',params)
	},
	regioninfoType(params){//统计管理->地域信息补录->处理操作
		return $http.fetch('/ykj/region/identitys',params)
	},
	
	//交易管理
	kjinfo(params){//快借信息
		return $http.fetch('/ykj/borrow/borrowListStatusH5',params)
	},
	kjDetails(params){//快借信息->借款详情
		return $http.fetch('/ykj/borrow/godetailsJson',params)
	},
	kjdownloadPro(params){//快借信息->下载协议
		return $http.fetch('/ykj/borrow/protocol',params)
	},
	kjrepaySubmit(params){//借款信息->借款详情
		return $http.fetch('/ykj/borrow/line',params)
	},
	fqDetails(params){//分期信息->借款详情
		return $http.fetch('/ykj/stage/godetailsJson',params)
	},
	fqdownloadPro(params){//快借信息->下载协议
		return $http.fetch('/ykj/stage/protocol',params)
	},
	fqinfo(params){//分期信息
		return $http.fetch('/ykj/stage/listH5',params)
	},
	fqrepaySubmit(params){//分期信息
		return $http.fetch('/ykj/stage/line',params)
	},
	withholrecords(params){//自动扣款交易及记录
		return $http.fetch('/ykj/automaticDeduction/listJson',params)
	},
	repaymentrecords(params){//还款交易记录
		return $http.fetch('/ykj/borrow/repayment/listJson',params)
	},
	borrowmoneycords(params){//借款交易记录
		return $http.fetch('/ykj/borrow/borrowdeal/listJson',params)
	},
	kjzfqcords(params){//快借转分期记录
		return $http.fetch('/ykj/borrow/borrowtostage/listJson',params)
	},
	rechargerecords(params){//催收还款记录
		return $http.fetch('/ykj/collectionRepayment/information/listJson',params)
	},
	callrechargerecords(params){//客服催收还款记录
		return $http.fetch('/ykj/collectionRepayment/cssPayOff/listJson',params)
	},
	redenvecords(params){//红包记录
		return $http.fetch('/ykj/red/redWithdrawListJson',params)
	},
}