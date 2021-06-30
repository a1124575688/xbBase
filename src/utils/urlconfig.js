//默认本地环境
window.baseUrl = process.env.BASE_URL;
//api地址
window.phpApi = '/phpApi/';
const env = process.env.VUE_APP_ENVIROMENT;
console.log('process',process.env)
if (env === 'build-dev'){
  window.phpApi = 'http://jstztc.bddeve.xbcx.com.cn/dsj_jstztc_api';
	// 测试服
}
if (env === 'build'){
	// 正式服
}
