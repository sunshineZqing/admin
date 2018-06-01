import Vue from 'vue'
import routers from 'vue-router'
import $axios from '../service/ajax'
import store from '../store/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '../utils/auth'
import { isEmpty } from '../utils/index'
import { Message } from 'element-ui'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(routers)

//根组件
import layout from '@/pages/layout/layout'
/*主页*/
import home from '@/pages/home/home'
/**
 * icon : 菜单图标
 * hidden : true不显示在菜单栏
 * redirect : noredirect 为不重定向
 * noDropdown : true 不显示子菜单
 * meta : { role: ['admin'] }  will control the page role
 **/
//默认路由表
const routes = [{
		path: '/login',
		name: '登录',
		hidden: true,
		component: _import('login/login')
	},
	{
		path: '/error',
		name: '错误',
		hidden: true,
		component: layout,
		children: [{
				path: '401',
				name: '错误401',
				hidden: true,
				component: _import('error/401')
			},
			{
				path: '403',
				name: '错误403',
				hidden: true,
				component: _import('error/403')
			},
			{
				path: '404',
				name: '错误404',
				hidden: true,
				component: _import('error/404')
			}
		]
	},
	{
		path: '/',
		name: '首页',
		icon: 'icon-zhuye',
		isopen: false,
		role: 1,
		redirect: '/layout',
		component: layout,
		hidden: true,
		children: [{
			path: 'layout',
			component: home,
			name: '首页'
		}]
	}
]
//异步路由表 (需要权限)
const asyncRouter = [{
		path: '/system',
		name: '系统管理',
		icon: 'icon-guanli',
		role: 1,
		redirect: 'noredirect',
		MENU_ID: 1,
		noDropdown: false,
		component: layout,
		children: [{
				path: '/system/permission',
				name: '权限管理',
				MENU_ID: 2,
				redirect: '/system/permission/basepermission',
				role: 2,
				component: _import('system/permission/index'),
				children: [{
						path: 'basepermission',
						name: '角色(基础权限)',
						MENU_ID: 36,
						role: 3,
						component: _import('system/permission/basepermission')
					},
					{
						path: 'btnpermission',
						name: '按钮权限',
						MENU_ID: 37,
						role: 3,
						component: _import('system/permission/btnpermission')
					}
				]
			},
			{
				path: 'btnmanagement',
				MENU_ID: 39,
				name: '按钮管理',
				role: 2,
				component: _import('system/btnmanagement')
			},
			// { path: 'menumanagement', MENU_ID:38, name:'菜单管理',role:2,component: _import('system/menumanagement')  },
			{
				path: 'onlinemanagement',
				MENU_ID: 20,
				name: '在线管理',
				role: 2,
				component: _import('system/onlinemanagement')
			},
			{
				path: 'logmanagement',
				MENU_ID: 3,
				name: '日志管理',
				role: 2,
				component: _import('system/logmanagement')
			},
			{
				path: 'systemusers',
				MENU_ID: 93,
				name: '系统用户',
				role: 2,
				component: _import('system/systemusers')
			}
		]
	},
	{
		path: '/statisticalmanagement',
		name: '统计管理',
		icon: 'icon-tongji',
		isopen: false,
		MENU_ID: 72,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: '/statisticalmanagement/riskstatistics',
				redirect: '/statisticalmanagement/riskstatistics/firsttistics',
				name: '风控统计',
				MENU_ID: 75,
				icon: 'icon-tixian',
				role: 2,
				component: _import('statisticalmanagement/riskstatistics/index'),
				children: [{
						path: 'firsttistics',
						MENU_ID: 76,
						name: '初审统计',
						role: 3,
						component: _import('statisticalmanagement/riskstatistics/firsttistics')
					},
					{
						path: 'retrialstatistics',
						MENU_ID: 135,
						name: '复审统计',
						role: 3,
						component: _import('statisticalmanagement/riskstatistics/retrialstatistics')
					},
					//{ path: 'authorizedstatistics', MENU_ID:123, name:'复审授权统计', role:3,component:_import('statisticalmanagement/riskstatistics/authorizedstatistics') },
				]
			},
			{
				path: 'loanstatistics',
				name: '借款统计',
				MENU_ID: 118,
				icon: 'icon-tixian',
				role: 2,
				component: _import('statisticalmanagement/loanstatistics')
			},
			{
				path: 'paymoneystatistics',
				MENU_ID: 119,
				name: '还款统计',
				icon: 'icon-tixian',
				role: 2,
				component: _import('statisticalmanagement/paymoneystatistics')
			},
			{
				path: 'intereststatistics',
				MENU_ID: 145,
				name: '归还利息统计',
				role: 2,
				component: _import('statisticalmanagement/intereststatistics')
			},
			{
				path: 'overduestatisticss',
				MENU_ID: 146,
				name: '逾期统计',
				role: 2,
				component: _import('statisticalmanagement/overduestatisticss')
			},
			{
				path: 'loanrecoverystatistics',
				MENU_ID: 147,
				name: '贷后追回统计',
				role: 2,
				component: _import('statisticalmanagement/loanrecoverystatistics')
			},
			{
				path: 'callrecoverystatistics',
				MENU_ID: 150,
				name: '客服追回统计',
				role: 2,
				component: _import('statisticalmanagement/callrecoverystatistics')
			}
		]
	},
	{
		path: '/Customermanagement',
		name: '客服管理',
		icon: 'icon-kefu',
		isopen: false,
		MENU_ID: 71,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: 'userinfo',
				name: '用户信息',
				MENU_ID: 137,
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/userinfo')
			},
			{
				path: 'ykjsoonoverdue',
				name: '易快借即将逾期',
				MENU_ID: 79,
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/ykjsoonoverdue')
			},
			{
				path: 'yfqsoonoverdue',
				name: '易分期即将逾期',
				MENU_ID: 80,
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/yfqsoonoverdue')
			},
			{
				path: 'cardsoonoverdue',
				MENU_ID: 81,
				name: '身份证即将逾期',
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/cardsoonoverdue')
			},
			{
				path: 'takephonecardover/:name/:orderid/:labelname/:taketype/:userid/:aes_id/:au_id',
				MENU_ID: 71,
				hidden: true,
				name: '电话记录',
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/takephonecardover')
			},
			{
				path: 'popularize',
				MENU_ID: 71,
				hidden: true,
				name: '推广',
				icon: 'icon-tixian',
				role: 2,
				component: _import('Customermanagement/popularize')
			},
			{
				path: 'riskdetail/:user_id',
				MENU_ID: 71,
				name: '用户认证详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 2,
				component: _import('Customermanagement/riskmanagement')
			},
		]
	},
	{
		path: '/transactionmanagement',
		name: '交易管理',
		icon: 'icon-jiekuan',
		MENU_ID: 77,
		isopen: false,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: 'ykjinfo',
				name: '易快借信息',
				MENU_ID: 78,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/ykjinfo'),
			},
			{
				path: 'yfqinfo',
				name: '易分期信息',
				MENU_ID: 103,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/yfqinfo')
			},
			{
				path: 'ykjturnyfq',
				name: '快借转分期',
				MENU_ID: 95,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/ykjturnyfq')
			},
			{
				path: 'borrowhistory',
				name: '借款交易记录',
				MENU_ID: 105,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/borrowhistory')
			},
			{
				path: 'paymenthistory',
				name: '还款交易记录',
				MENU_ID: 106,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/paymenthistory')
			},
			{
				path: 'withholrecords',
				name: '自动扣款记录',
				MENU_ID: 134,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/withholrecords')
			},
			{
				path: 'rechargeinfo',
				name: '催收还款信息',
				MENU_ID: 141,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/rechargeinfo')
			},
			{
				path: 'callrechargeinfo',
				name: '客服催收还款信息',
				MENU_ID: 151,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/callrechargeinfo')
			},
			{
				path: 'redenvelopes',
				name: '红包提现',
				MENU_ID: 94,
				icon: 'icon-tixian',
				role: 2,
				component: _import('transactionmanagement/redenvelopes')
			},
		]
	},
	{
		path: '/riskmanagement',
		name: '风控管理',
		icon: 'icon-renzheng',
		role: 1,
		redirect: 'noredirect',
		MENU_ID: 86,
		component: layout,
		noDropdown: false,
		children: [{
				path: '/riskmanagement/auditmanage',
				name: '审核管理',
				MENU_ID: 87,
				icon: 'icon-tuisong',
				role: 2,
				redirect: '/riskmanagement/auditmanage/thetrial',
				component: _import('riskmanagement/auditmanage/index'),
				children: [{
						path: 'thetrial',
						MENU_ID: 88,
						name: '初审',
						role: 3,
						component: _import('riskmanagement/auditmanage/thetrial')
					},
					{
						path: 'toeviewacase',
						MENU_ID: 89,
						name: '复审',
						role: 3,
						component: _import('riskmanagement/auditmanage/thetrial')
					},
					{
						path: 'finaljudgment',
						MENU_ID: 90,
						name: '终审',
						role: 3,
						component: _import('riskmanagement/auditmanage/thetrial')
					}
				]
			},
			{
				path: 'scoremanage',
				MENU_ID: 91,
				name: '评分管理',
				icon: 'icon-tuisong',
				role: 2,
				component: _import('riskmanagement/scoremanage/scoremanage')
			},
			{
				path: 'scoredetails',
				MENU_ID: 91,
				name: '评分详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 2,
				component: _import('riskmanagement/scoremanage/scoredetails')
			},
			{
				path: 'easymanage',
				MENU_ID: 104,
				name: '易指数管理',
				icon: 'icon-tuisong',
				role: 2,
				component: _import('riskmanagement/easymanage')
			},
			{
				path: 'systemseconedauth',
				MENU_ID: 102,
				name: '系统提额复审',
				icon: 'icon-tuisong',
				role: 2,
				component: _import('riskmanagement/systemlastauth')
			},
			//{ path: 'overdueanalysis', MENU_ID:125, name:'逾期分析',icon:'icon-tuisong',role:2,component: _import('riskmanagement/overdueanalysis') },
//			{ path: 'recertification', MENU_ID:142, name:'重新认证',icon:'icon-tuisong',role:2,component: _import('riskmanagement/recertification') },
			{
				path: 'systemlastauth',
				MENU_ID: 121,
				name: '系统提额终审',
				icon: 'icon-tuisong',
				role: 2,
				component: _import('riskmanagement/systemlastauth')
			},
			{ 
				path: 'recertification/:user_id', 
				MENU_ID:142, 
				name:'重新认证',
				icon:'icon-tuisong',
				hidden: true,
				role:2,
				component: _import('riskmanagement/recertification')
			},
			{
				path: 'usermentiondetail/:user_id',
				MENU_ID: 90,
				name: '用户提额详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 3,
				component: _import('riskmanagement/usertie')
			},
			{
				path: 'customerservice/:user_id',
				MENU_ID: 90,
				name: '客服催收详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 3,
				component: _import('riskmanagement/customerservice')
			},
			{
				path: 'riskdetail/:user_id/:ynum_id/:alreadCertified/:auditflag/:action/:isInvalid',
				MENU_ID: 87,
				name: '认证详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 3,
				component: _import('riskmanagement/riskmanagement')
			},
			{
				path: 'riskdetailscore/:user_id/:ynum_id/:alreadCertified/:auditflag/:action/:isInvalid',
				MENU_ID: 104,
				name: '易指数认证详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 3,
				component: _import('riskmanagement/riskmanagementscore')
			},
			{
				path: 'riskdetailtie/:user_id/:ynum_id/:alreadCertified/:auditflag/:action/:isInvalid',
				MENU_ID: 102,
				name: '提额认证详情',
				icon: 'icon-tuisong',
				hidden: true,
				role: 3,
				component: _import('riskmanagement/riskmanagementtie')
			},
			{
				path: 'successrate',
				MENU_ID: 155,
				name: '成功提额',
				icon: 'icon-tuisong',
				role: 2,
				component: _import('riskmanagement/successrate')
			}
		]
	},
	{
		path: '/collectionmanage',
		name: '贷后管理',
		icon: 'icon-cuicushouhuotixing',
		isopen: false,
		MENU_ID: 96,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: '/collectionmanage',
				MENU_ID: 138,
				name: '客服催收',
				icon: 'icon-tixian',
				role: 2,
				redirect: 'collectionmanage/customerservice',
				component: _import('collectionmanage/customerservice/index'),
				children: [{
						path: 'KJcustomerservice',
						MENU_ID: 143,
						name: '快借逾期',
						icon: 'icon-tixian',
						role: 3,
						component: _import('collectionmanage/customerservice')
					},
					{
						path: 'FQcustomerservice',
						MENU_ID: 144,
						name: '分期逾期',
						icon: 'icon-tixian',
						role: 3,
						component: _import('collectionmanage/customerservice')
					},
				]
			},
			{
				path: 'customerservice/callDetails/:user_id',
				MENU_ID: 96,
				name: '电话催收详情',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/customerservice/callDetails')
			},
			{
				path: 'customerservice/calling/:user_id/:atd_id/:sys_user_id',
				MENU_ID: 96,
				name: '客服电话催收',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/customerservice/calling')
			},
			{
				path: 'firtcollection',
				MENU_ID: 128,
				name: '一级催收',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/firtcollection')
			},
			{
				path: 'secondcollection',
				MENU_ID: 129,
				name: '二级催收',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/firtcollection')
			},
			{
				path: 'threecollection',
				MENU_ID: 130,
				name: '三级催收',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/firtcollection')
			},
			//催收列表操作页面
			{
				path: 'firtcollection/recharge/:user_id/:cert_card/:name/:phone/:gender/:available_amount/:authorized_amount',
				MENU_ID: 96,
				name: '催收还款',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/recharge')
			},
			{
				path: 'firtcollection/repaymentDetails/:borrowId/:stage_id/:action',
				MENU_ID: 96,
				name: '还款详情',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/repaymentDetails')
			},
			{
				path: 'firtcollection/callCollection/:user_id/:phoneNum/:user_name/:action',
				MENU_ID: 96,
				name: '电话催收',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/callCollection')
			},
			{
				path: 'firtcollection/collectionFeedback/:user_id/:phone',
				MENU_ID: 96,
				name: '催收反馈详情',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/collectionFeedback')
			},
			//        { path: 'firtcollection/transfer/:c_id/:action', MENU_ID:96, name:'转交',icon:'icon-tixian',role:2,hidden:true,component: _import('collectionmanage/firtcollection/transfer')},
			{
				path: 'firtcollection/soonOverdue/:user_id',
				MENU_ID: 96,
				name: '即将逾期电话记录',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/soonOverdue')
			},
			{
				path: 'firtcollection/overdueAfter/:user_id',
				MENU_ID: 96,
				name: '逾期后电话记录',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/firtcollection/overdueAfter')
			},
			//        { path: 'firtcollection/backReason/:user_id/:name/:phone/:action', MENU_ID:96, name:'黑名单原因',icon:'icon-tixian',role:2,hidden:true,component: _import('collectionmanage/firtcollection/backReason')},

			{
				path: 'badmanagemen',
				MENU_ID: 131,
				name: '呆账管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/firtcollection')
			},
			{
				path: 'frozenaccount',
				MENU_ID: 132,
				name: '冻结账户',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/frozenaccount')
			},
			//冻结账户认证详情
			{
				path: 'frozenaccount/riskdetail/:user_id/:ynum_id',
				MENU_ID: 132,
				name: '冻结账户认证信息',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('collectionmanage/frozenaccount/riskdetail')
			},
			{
				path: 'blacklist',
				MENU_ID: 136,
				name: '黑名单',
				icon: 'icon-tixian',
				role: 2,
				component: _import('collectionmanage/blacklist')
			},
		]
	},
	{
		path: '/operationmanage',
		name: '运营管理',
		icon: 'icon-yunying',
		isopen: false,
		MENU_ID: 98,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: 'bankmanage',
				MENU_ID: 99,
				name: '银行管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/bankmanage')
			},
			{
				path: 'bankmaintenance/:bl_id',
				MENU_ID: 99,
				name: '银行维护',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('operationmanage/bankmaintenance')
			},
			{
				path: 'tuiguangmange',
				MENU_ID: 101,
				name: '推广管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/tuiguangmange')
			},
			{
				path: 'addtuiguangusere',
				MENU_ID: 101,
				name: '添加推广用户',
				icon: 'icon-tixian',
				role: 2,
				hidden: true,
				component: _import('operationmanage/weituiguang')
			},
			{
				path: 'redenvelopes',
				MENU_ID: 102,
				name: '分享管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/redenvelopes')
			},
			{
				path: 'withholrecords',
				MENU_ID: 110,
				name: '利率管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/withholrecords')
			},
			{
				path: 'paymenthistory',
				MENU_ID: 111,
				name: '轮播图详情',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/paymenthistory')
			},
			{
				path: 'ykjturnyfq',
				MENU_ID: 124,
				name: '推送管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/ykjturnyfq')
			},
			{
				path: '/operationmanage/rechargeinfo',
				MENU_ID: 115,
				name: '提额管理',
				icon: 'icon-tixian',
				redirect: '/operationmanage/rechargeinfo/amountsetup',
				role: 2,
				component: _import('operationmanage/rechargeinfo/index'),
				children: [{
						path: 'amountsetup',
						MENU_ID: 116,
						name: '提额设置',
						icon: 'icon-tixian',
						role: 3,
						component: _import('operationmanage/rechargeinfo/amountsetup')
					},
					// { path: 'amountsetup/editamount/:id/:use_days/:m_type/:use_amount_proportion/:payment_times/:is_overdue/:overdue_times/:single_mention_quota/:year_frequency/:is_enabled', MENU_ID:116, name:'编辑提额设置',icon:'icon-tixian',role:3,hidden:true,component:  _import('operationmanage/rechargeinfo/editamount') },
					{
						path: 'amounteshenpisetup',
						MENU_ID: 122,
						name: '提额审批流程配置',
						icon: 'icon-tixian',
						role: 3,
						component: _import('operationmanage/rechargeinfo/amounteshenpisetup')
					},
				]
			},
			{
				path: '/operationmanage/redpacketmanger',
				MENU_ID: 149,
				name: '红包管理',
				icon: 'icon-tixian',
				redirect: '/operationmanage/redpacketmanger/redpacketsnum',
				role: 2,
				component: _import('operationmanage/redpacketmanger/index'),
				children: [{
						path: 'redpacketsnum',
						MENU_ID: 126,
						name: '红包领取次数',
						icon: 'icon-tixian',
						role: 3,
						component: _import('operationmanage/redpacketmanger/redpacketsnum')
					},
					{
						path: 'redpacketrecorde',
						MENU_ID: 127,
						name: '红包领取记录',
						icon: 'icon-tixian',
						role: 3,
						component: _import('operationmanage/redpacketmanger/redpacketrecorde')
					},
				]
			},
			{
				path: 'couponmanager',
				MENU_ID: 139,
				name: '优惠券管理',
				icon: 'icon-tixian',
				role: 2,
				component: _import('operationmanage/couponmanager')
			},
		]
	},
	{
		path: '/monitoristration',
		name: '监控管理',
		icon: 'icon-zhuangtaijiankong',
		isopen: false,
		MENU_ID: 152,
		role: 1,
		redirect: 'noredirect',
		component: layout,
		noDropdown: false,
		children: [{
				path: 'regioninfo',
				MENU_ID: 153,
				name: '地域信息补录',
				role: 2,
				icon: 'icon-tixian',
				component: _import('monitoristration/regioninfo')
			}
		]
	}
]

let menu = [] //菜单列表 

// 注册路由
let router = new routers({
	// mode: 'history',
	routes
})

const whiteList = ['/login'] // 不重定向白名单
//var routerResponse;
//编写导航钩子   router为vue-router路由对象
router.beforeEach((to, from, next) => {
	NProgress.start() // 开启Progress
	// 判断用户是否登录
	if(getToken()) {
		// 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页   // 这种情况出现在手动修改地址栏地址时
		if(to.path === '/login') {
			next('/')
			NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
		} else {
			// 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次

			if(store.state.permission.length === 0 && !store.state.userinfo) { //
				// 获取权限列表，如果失败则跳回登录页重新登录
				let params = {
					token: store.state.user.token
				}
				$axios.asyncrouters(params).then(res => {
					console.log(res)
				}, response => {
					console.log(response);
					if(response.data.resultCode == 0) {
						var mounlist = response.data.returnObj.menuList
						// 存储user信息在状态机中
						// 判断是否存在登录者信息 不存在则进行存储
						store.dispatch('getuserinfo', response.data.returnObj.user)
						store.dispatch('SAVEMENUALLLIST', mounlist)
						// 匹配权限列表生成完整的路由
						routerMatch(mounlist, asyncRouter).then((res) => {
							// 将匹配到的新路由添加到现在的router对象中
							// 存储权限列表到store中
							console.log(res);
							store.commit('setpermission', res[0])
							store.commit('setmenulist', res[1])
							router.addRoutes(res[1])
							// 跳转到对应页面
							next(to.path)
						})
					}else{
						Message.error(response.data.resultMsg)
						store.dispatch('FED_LOGOUT').then(() => {
							router.replace('/login')
						})
							
					}

				}).catch(val => {
					console.log(val);
					store.dispatch('FED_LOGOUT').then(() => {
						Message.error('验证失败,请重新登录')
						router.replace('/login')
					})
				})
			} else {
				// 如果跳转页面存在于路由中则进入，否则跳转到404
				// 因为可以通过改变url值进行访问，所以必须有该判断
				if(to.matched.length) {
					next()
				} else {
					router.replace('/error/404')
					NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
				}
			}
		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next() //直接进入
		} else {
			next('/login')
		}
	}
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})

/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */

function routerMatch(permission, asyncRouter) {
	return new Promise((resolve) => {

		// 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
		// const routers = asyncRouter[0]
		// 创建路由
		var accessedRouterList = []
		function hasPermission(permission) { //把符合用户角色的路由取出
			if(permission == undefined) {
				return;
			}
//			console.log(permission)
//			permission.forEach(ele=>{
//				if(ele.hasMenu && ('1' === ele.MENU_STATE)) { //权限匹配
//					if(ele.subMenu.length !== 0) { //子路由判断
//						ele.subMenu = hasPermission(ele.subMenu)
//					}
//					return true
//				}
//				return false
//			})
			const accessedRouters = permission.filter((ele) => {
				if(ele.hasMenu && ('1' === ele.MENU_STATE)) { //权限匹配
					if(ele.subMenu.length !== 0) { //子路由判断
						ele.subMenu = hasPermission(ele.subMenu)
					}
					return true
				}
				return false
			})
			return accessedRouters
		}

		const realPermission = hasPermission(permission)
		console.log(realPermission);
		store.dispatch('SAVECHECKEDMENULIST', realPermission) //存储默认选中的菜单列表
		function inPermission(MENU_ID, realPermission) {
			const result = realPermission.some(elem => {
				if(elem.MENU_ID == MENU_ID) {
					return true
				} else if(elem.subMenu && elem.subMenu.length !== 0) {
					return inPermission(MENU_ID, elem.subMenu)
				}
			})
			return result
		}
		function createRouter(asyncRouter) {
			//递归匹配符合用户角色的权限列表并返回
			const fianlPermission = asyncRouter.filter(ele => { //匹配所有的路由 和 菜单
				const except = inPermission(ele.MENU_ID, realPermission)
				if(except) {
					if(ele.children && ele.children.length !== 0) {
						ele.children = createRouter(ele.children)
					}
					return true
				}
				return false
			})
			return fianlPermission
		}
		const fianllyPermission = createRouter(asyncRouter)
		let con = []
		con.push(fianllyPermission)
		con.push(fianllyPermission)
		resolve(con)
	})
}

export {
	router as
	default
}