module.exports = {
  proxyList: {
    '/ykj': {
      target: 'http://110.249.214.179:8983',//正式服务器
//    target: 'http://110.249.214.182:8080',//测试服务器
//    target: 'http://192.168.1.140:8081',  //李君会
//    target: 'http://192.168.1.47:8080',   //谷晓琳
//		target: 'http://192.168.1.180:8080',  //魏昭迪
//    target: 'http://192.168.1.19:8080',   //张华
//  	target: 'http://192.168.1.135:8080',  //刘炯
//	target: 'http://192.168.1.29:8080',   //王安琪
      changeOrigin:true
    }
  }
}

