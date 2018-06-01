import axios from 'axios'
import * as $http from './config'


export default { //认证各项原始数据
	getoriginaljd(params){//京东
		return $http.fetch('/ykj/ynum/JDAuthenticationJson',params)
	},
	getoriginalacademic(params){//学信
		return $http.fetch('/ykj/ynum/xueXinH5',params)
	},
	getoriginalbank(params){//银行流水
		return $http.fetch('/ykj/ynum/bankAuthentication',params)
	},
	getoriginaltaobao(params){//淘宝
		return $http.fetch('/ykj/ynum/TBAuthenticationJson',params)
	},
	getoriginalMaillist(params){//通讯录
		return $http.fetch('/ykj/ynum/telAnH5',params)
	},
	getoriginalhighRiskMaillist(params){ //通讯录 高危联系人
        return $http.fetch('/ykj/ynum/certify/highRisk',params)
	},
	getoriginalallreport(params){//全息报告
		return $http.fetch('/ykj/ynum/qxauthenticationDataJson',params)
	},
	getoriginalalinstall(params){//已安装应用
		return $http.fetch('/ykj/ynum/AppAuthentication',params)
	},
	getoriginalalvehicle(params){//车辆认证
		return $http.fetch('/ykj/ynum/carAnH5',params)
	},
	getoriginalaccumula(params){//公积金
		return $http.fetch('/ykj/ynum/accfundListJson',params)
	},
	getoriginalsocial(params){//社保
		return $http.fetch('/ykj/ynum/shebaoListJson',params)
	},
	getoriginalOperator(params){//运营商
		return $http.fetch('/ykj/ynum/yyauthenticationDataJson',params)
	},	
	getoriginalmailbox(params){//邮箱
		return $http.fetch('/ykj/ynum/mailAuthentication',params)
	},
	getoriginalcredit(params){//征信
		return $http.fetch('/ykj/ynum/zxauthenticationDataJson',params)
	}
}