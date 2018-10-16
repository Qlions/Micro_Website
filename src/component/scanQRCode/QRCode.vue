<template>

		
</template>

<script>
	export default {
		data (){
			return {
				WXopenId: "",
				configInfo: "",
			}
		},
		methods:{
			getOpenIdCode(){
				//获取openid
//				alert("getOpenIdCode")
				let Request = {
					QueryString : function(item){
						var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
						return svalue ? svalue[1] : svalue;
					}
				}
				var wxCode = Request.QueryString("code");
				this.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxAccountInfo",{wxCode : wxCode},{emulateJSON: true}).then( response =>{
					if(response.body != ""){
						var str = JSON.stringify(response.body);
						var openId = response.body.openid;
						this.WXopenId = openId;
						return openId;
						}
					})
				
			},
			
			scanQRCodeFn(){
				
				let urlBase = window.location.href;
				
				this.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxSignatureInfo",{visitUrl : urlBase},{emulateJSON: true}).then( response =>{
					console.log(response);
					if(response.body != ""){
						this.configInfo = response.body;
						var that = this;
						wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: this.configInfo.appid, // 必填，公众号的唯一标识
						    timestamp: this.configInfo.timestamp, // 必填，生成签名的时间戳
						    nonceStr: this.configInfo.nonceStr, // 必填，生成签名的随机串
						    signature: this.configInfo.signature,// 必填，签名，见附录1
						    jsApiList: ['checkJsApi','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
						
						var vm = this;
						wx.ready(function(){
							wx.checkJsApi({
								jsApiList: ['scanQRCode'],
								success: function(res) {
								  let checkResult = res.checkResult; 
								  console.log(res)
								  if(null == checkResult || checkResult=="" || checkResult.length == 0 && checkResult.chooseImage==false){
			//						    openMessageAlert("当前客户端不支持指定JS接口","2");
										console.log("当前客户端不支持")
									    wx.closeWindow();
								  }
								}
							});
							
							wx.scanQRCode({
							    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							    //desc:'scanQRCode desc',
							    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							    success: function (res) {
								    var result = res.resultStr + ""; // 当needResult 为 1 时，扫码返回的结果
								   	vm.scanUrl(result)
								    
								   
							 	},
							 	fail: function (res) {
							 		//扫描失败
//							 		alert("fail")
							 		
							 	},
							 	cancel: function(res) {
					              	// 取消扫描
					              	
							 	}
							});
						}); 
					}
				})
				
			},
			scanUrl(result){
//				let Request = {
//					QueryString : function(item){
//						var svalue = result.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
//						return svalue ? svalue[1] : svalue;
//					}
//					};
//				   
//					var wxCode1 = Request.QueryString("key");
					var svalue = result.match(new RegExp("[\?\&]" + "key" + "=([^\&]*)(\&?)","i"))[1];
					 
					 
				    let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				    
					let token = userInfo.token;
					
					let keyData = JSON.stringify({
						key: svalue
					})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:160006, jsonValue:keyData},{emulateJSON:true}).then( response => {
						if(response.body.status == "suc"){
							
							this.$router.push({path: "./MakeSureLoginCode", query: { key: svalue}});
						}else{
							console.log(response)
						}
					})
			}
			
		},
		mounted(){
			
			let userInfo = JSON.parse(this.$cookie.get("userInfo"));
			let token = userInfo.token;
			
			if(token != null && token != ""){
				this.scanQRCodeFn();
				console.log(this.configInfo)
				
				
			}
		}
	}
</script>

<style>
</style>