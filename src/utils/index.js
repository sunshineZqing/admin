import Vue from 'vue'

// 模拟呢token生成 
export function randomWord(randomFlag, min, max){//是否随机位数 //最小位数 //最大位数|| 固定位数
    let str = "";
    let range = min;
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
     let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
// 日期格式化
export function dateformat(dateo,fmt) {
    var o = {
        "M+": dateo.getMonth() + 1, //月份 
        "d+": dateo.getDate(), //日 
        "h+": dateo.getHours(), //小时 
        "m+": dateo.getMinutes(), //分 
        "s+": dateo.getSeconds(), //秒 
        "q+": Math.floor((dateo.getMonth() + 3) / 3), //季度 
        "S": dateo.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateo.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//空对象检测
export function isEmptyObject(e) { //空对象检测
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  
//空数组检测
export function isEmpty(value) { //是否是个空数组 value 为数组参数
  return Array.isArray(value) && value.length === 0 || Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0;
}

export function cardcheck(value){ //身份证正则校验
    if(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)){
        return true
    }else {
        return false
    }
}

export function phonecheck(value){ //手机号正则校验
    if(/^1[3-9]\d{9}$/.test(value)){
        return true
    }else {
        return false
    }
}

export function isURL(str_url) {// 验证url

 var strRegex="^((https|http|ftp|rtsp|mms)?://)"

 + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@

 + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184

 + "|" // 允许IP和DOMAIN（域名）

 + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.

 + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名

 + "[a-z]{2,6})" // first level domain- .com or .museum

 + "(:[0-9]{1,4})?" // 端口- :80

 + "((/?)|" // a slash isn't required if there is no file name

 + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

 var re=new RegExp(strRegex);

 return re.test(str_url);
}

export function unique (arr) { //去重
  const seen = new Map()
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}


