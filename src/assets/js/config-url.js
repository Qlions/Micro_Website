/*
日期 2017-9-27
应用：配置url路径，例如测试、正式url
在使用模块调用configUrl() 函数，修改url参数
问卷测试环境：http://192.168.19.187:8070
问卷正式环境：http://weixin.zgjky.cn

报告测试环境：http://192.168.19.187
报告正式环境：https://www.zgjky.cn

文章测试环境：https://localtest.zgjky.cn
文章正式环境：https://www.zgjky.cn
*/
function configUrl() {
//	var url = 'https://www.zgjky.cn';
	var url = 'http://192.168.19.187';
	return url;
}

// 问卷调用
function questionnairegUrl() {  
//	var url = 'https://weixin.zgjky.cn';
	var url = 'http://192.168.19.187:8070';
//	var url = 'http://192.168.18.69';
	return url;
}

// 文章调用
// function articleUrl() {  
// 	var url = 'https://www.zgjky.cn/iframeProxy';
// 	return url;
// }

//微网站正式地址,支付页面
function formalUrl() {
	//var url = 'https://weixin.zgjky.cn/wbchat/website/index.html#/';
	var url = 'https://weixin.zgjky.cn/wbchat/websiteTest/index.html#/serverConfirm/serverOrder/orderPayment';
	return url;
}

//机构详情正式环境地址 
function mechanismUrl() {
	var url1 = 'https://weixin.zgjky.cn/wbchat/websiteMech/index.html#/code/';
	var url2 = 'https://weixin.zgjky.cn/wbchat/websiteMech/index.html#/order/main';
	return [url1,url2];
}

//服务挂号说明
function descript_urls(){
	//测试环境
	const _urls = 'https://localtest.zgjky.cn/manageFrame/userRegistration/userRegistrationTypeInfoGettips.action?';
	//正式环境
	//const _urls = 'https://zgjky.cn/manageFrame/userRegistration/userRegistrationTypeInfoGettips.action?';
	return _urls;
}
