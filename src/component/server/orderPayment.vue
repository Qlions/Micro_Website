<template>
	<div id="order-pay">
		<Heads :title="titleName" v-if="isServer"></Heads>
		<header v-if="!isServer" class="headers">
			<b @click="backToIndex" class="nidaye"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<h2>{{ this.titleName }}</h2>
		</header>
		<Loading v-if="isLoading"></Loading>
		<div class="order-pay">
			<p class="order-pay-title">支付金额</p>
			<h2 class="order-pay-price">¥<span>{{ Number(orderInfo.payMoney) | LegalNumber }}</span></h2>
		</div>
		<div class="order-pay-method" v-if="channel == 0">
			<div class="pay-method clearfix" :class="[{isActive:isActive == index},list.className]" @click="tabMthods(index)"  v-for="(list,index) in lists">
				<p>{{ list.name }}</p>
				<span></span>
			</div>
		</div>
		<div class="order-pay-method" v-if="channel == 1">
			<div class="pay-method clearfix" :class="[list.className]" v-for="list in lists_two">
				<p>{{ list.name }}</p>
				<span></span>
			</div>
		</div>
		<div class="pay-sure" @click.once="paySure" v-if="channel == 0">
			<a href="javascript:;">确认支付</a>
		</div>
		
		<div class="pay-sure1" v-if="channel == 1">
			<a href="javascript:;">确认支付</a>
		</div>
		
		<div class="pay-new" v-if="channel == 1" @click="goApp">
			<a>下载APP</a>
		</div>
		
	    <!--<input @change="fileChanged" accept="image/*" multiple="multiple" type="file" ref="file">-->
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data (){
			return {
				titleName: "订单支付",
				isActive: 0,
				isLoading: true,
				isServer: true,
				wxCode:"",
				openId:"",
				configInfo:"",
				orderInfo:"",
				channel:"",
				lists:[
					{
						name:"微信支付",
						imgUrl:"./src/assets/image/server/pay-cancel.png",
						className:"pay-weixin"
					}
//					{
//						name:"支付宝支付",
//						imgUrl:"./src/assets/image/server/pay-cancel.png",
//						className:"pay-zhifubao"
//					}
				],
				lists_two:[
					{
						name:"微信支付",
						imgUrl:"./src/assets/image/server/pay-cancel.png",
						className:"pay-weixin"
					}

				]
				
			}
		},
		methods:{
			initData(){
				//获取orderInfo
				let vm = this;
				let token;
				let _token = vm.$route.query.token;
				if(!_token){//_token不存在
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					token = userInfo.token;
				}else {
					token = _token;
				}
				let proType = vm.$route.query.type;
				let orderId = vm.$route.query.orderId;
				let data = JSON.stringify({
					orderId: orderId
				});
				if(proType == 'mech'){
					vm.isServer = false;
				}
				//订单详情接口
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660088, jsonValue:data},{emulateJSON:true}).then( response => {
					if(response.body != ""){
						vm.orderInfo = response.body;
						vm.channel = response.body.paymentChannel;
						console.log(vm.channel);
						console.log(response)
						//获取openId
						let wxMsg = JSON.parse(this.$cookie.get("wxMsg"));
						if(!wxMsg){
							//重新获取openId
							//alert("需要重新获取openId")
							vm.getOpenId();
						}
						setTimeout(() => {
			               vm.isLoading = false;
			            }, 300)
					}
				})
			},
			tabMthods(index){
				this.isActive = index;
			},
			paySureH5(){
				let vm = this;
				let orderInfo = vm.orderInfo;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let price = Number(orderInfo.servicePayMoney).toFixed(2);
				let userId = userInfo.userId;
				let baseUrl = 'https://www.zgjky.cn';
				//获取微信config信息
				vm.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxSignatureInfo",{visitUrl : 'http://weixin.zgjky.cn/wbchat/shop/ShopPayMent/ShopPayMentTo.action'},{emulateJSON: true}).then( response =>{
					console.log(response);
					if(response.body != ""){
						vm.configInfo = response.body;
						//获取支付信息接口，获取chooseWXPay所需数据
						let obj = JSON.stringify({
							'userId' : userId,
							'payFrom' : '63'
						});
						let data = {
							'WIDout_trade_no' : orderInfo.orderCode,
							'WIDsubject' : orderInfo.serviceName,
							'WIDtotal_fee' : price,
							'systemName' : '100005',
							'callBackUrl' : baseUrl + '/manageFrame/userServiceOrderPay/userServiceOrderPayCallback.action',
							'attach' : obj
						};
						//获取微信支付签名
						vm.$http.post("/wechatPayProxy/unifiedPay/getPaySign",{jsonValue: JSON.stringify(data)},{emulateJSON: true}).then( response =>{
							console.log(response);
							if(response.body.state == 'suc'){
								data.sign = response.body.result;
								vm.getWxData(data,price);
							}
						});
					}
				});
			},
			getWxData(data,price) {
				let vm = this;
				console.log(data);
				vm.$http.post("/wechatPayH5Proxy/wechatPay/wxH5/wxH5Pay",{jsonValue: JSON.stringify(data)},{emulateJSON: true}).then( response =>{
					console.log("获取chooseWXPay所需数据",response);
					let datas = response.body;
					let state = datas.state;
					if(state == 'suc'){
						wx.config({
							debug: false,
							appId: vm.configInfo.appid,
							timestamp: vm.configInfo.timestamp,
							nonceStr: vm.configInfo.nonceStr,
							signature: vm.configInfo.signature,
							jsApiList: ['chooseWXPay']
						});
						wx.ready(function(){
							wx.chooseWXPay({
								appId: datas.appId,
								timestamp: datas.timeStamp,
								nonceStr: datas.nonceStr,
								package: datas.package,
								signType: 'MD5',
								paySign: datas.sign,
								success:function(res){
									console.log(res);
									let money = price;
									if(!proType){
    									vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}});				    										
									}else {
										vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money,type:"mech"}});
									}
								},
								cancel:function(){
									if(!proType){
    									vm.$router.push({path:"/orderPayment/payFail"});
									}else {
										vm.$router.push({path:"/orderPayment/payFail",query:{type:"mech"}});
									}
								},
								error:function(){
									if(!proType){
    									vm.$router.push({path:"/orderPayment/payFail"});
									}else {
										vm.$router.push({path:"/orderPayment/payFail",query:{type:"mech"}});
									}
								}
								
							})
							
						})
					}
				});
			},
			paySure(){
				let vm = this;
				let orderInfo = vm.orderInfo;
				let eaId = orderInfo.eaId;
				let paymentChannel = orderInfo.paymentChannel;
				let proType = vm.$route.query.type;
				let wxMsg = JSON.parse(this.$cookie.get("wxMsg"));
				let wxOpenId = wxMsg.openid;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let userId = userInfo.userId;
				let price = Number(orderInfo.servicePayMoney).toFixed(2);
				let baseUrl = 'https://www.zgjky.cn';
				if(vm.isActive == 0){//微信支付
					if(paymentChannel == '0'){//平台支付
						//获取微信config信息
						vm.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxSignatureInfo",{visitUrl : 'http://weixin.zgjky.cn/wbchat/shop/ShopPayMent/ShopPayMentTo.action'},{emulateJSON: true}).then( response =>{
							console.log(response);
							if(response.body != ""){
								vm.configInfo = response.body;
								//获取支付信息接口，获取chooseWXPay所需数据
								const baseUrl = 'https://www.zgjky.cn';
								var obj = JSON.stringify({
									'userId' : userId,
									'payFrom' : '63'
								})
								var data = {
									'WIDout_trade_no' : orderInfo.orderCode,
									'WIDsubject' : orderInfo.serviceName,
									'WIDtotal_fee' : price,
									'systemName' : '100005',
									'callBackUrl' : baseUrl + '/manageFrame/userServiceOrderPay/userServiceOrderPayCallback.action',
									'attach' : obj,
									'openid' : wxOpenId
								};
								//获取支付签名
								vm.$http.post("/wechatPayProxy/unifiedPay/getPaySign",{jsonValue: JSON.stringify(data)},{emulateJSON: true}).then( response =>{
									console.log("获取签名",response);
									data.sign = response.body.result;
									console.log(data);
									//获取支付信息接口，获取chooseWXPay所需数据
									vm.$http.post("/wechatPayProxy/wechatPay/wxJsapiPay",{jsonValue: JSON.stringify(data)},{emulateJSON: true}).then( response =>{
										console.log("获取chooseWXPay所需数据",response)
										let datas = response.body;
										let state = datas.state;
										if(state == 'suc'){
											wx.config({
												debug: false,
				    							appId: vm.configInfo.appid,
				    							timestamp: vm.configInfo.timestamp,
				    							nonceStr: vm.configInfo.nonceStr,
				    							signature: vm.configInfo.signature,
				    							jsApiList: ['chooseWXPay']
											});
											
											wx.ready(function(){
												wx.chooseWXPay({
													appId: datas.appId,
				    								timestamp: datas.timeStamp,
				    								nonceStr: datas.nonceStr,
				    								package: datas.package,
				    								signType: 'MD5',
				    								paySign: datas.sign,
				    								success:function(res){
				    									console.log(res);
				    									let money = price;
				    									if(!proType){
					    									vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}});				    										
				    									}else {
				    										vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money,type:"mech"}});
				    									}
				    								},
				    								cancel:function(){
				    									if(!proType){
					    									vm.$router.push({path:"/orderPayment/payFail"});
				    									}else {
				    										vm.$router.push({path:"/orderPayment/payFail",query:{type:"mech"}});
				    									}
				    								},
				    								error:function(){
				    									if(!proType){
					    									vm.$router.push({path:"/orderPayment/payFail"});
				    									}else {
				    										vm.$router.push({path:"/orderPayment/payFail",query:{type:"mech"}});
				    									}
				    								}
				    								
												})
												
											})
											
										}
										
									})
								})
								
							}else {//未获取到微信config信息
								
							}
							
						})
								
							
						
						
					}else {//第三方支付
						console.log("第三方支付")
						const baseUrl = 'https://www.zgjky.cn';
						const payUrl = 'http://219.142.225.69:8083';
						const payChannel = 'wp'; //微信H5						
						//签名所需字符串
						let allStr = "";
						
						const textUrl = '/wechatPayProxy/shengPay/payTo/directGzhAccount';
						const signUrl = '/wechatPayProxy/unifiedPay/getPaySign';
						let urlElse = baseUrl + '/manageFrame/userServiceOrderPay/userServiceOrderPayCallback.action';
						let pageUrl = 'http://192.168.19.187:8070/pay/paySuccess.html';
						let notifyUrl = payUrl + '/shengPay/directAccountBackByApp';
						let sendTime = vm.currentTime();
						let orderTime = vm.currentTime();
						let orderAmount = price;
						let productName = orderInfo.serviceName;
						let orderNo = orderInfo.orderCode;
						let obj = JSON.stringify({
							'userId' : userId,
							'payFrom' : '67'
						})
						let textData = {
							system_name : '100008',
							out_trade_no : orderNo,
							subject : '服务',
							total_fee : orderAmount,
							extra_common_param : obj,
							call_back_url : urlElse,
							open_id : wxOpenId
						}
						//获取签名所需数据接口
						vm.$http.post(signUrl,{jsonValue: JSON.stringify(textData)},{emulateJSON: true}).then( response =>{
							console.log("签名所需数据",response);
							let state = response.body.state;
							if(state == 'suc'){
								let sign = response.body.result;
								textData.sign = sign;
								console.log(textData);					
								vm.$http.post(textUrl,{jsonValue: JSON.stringify(textData)},{emulateJSON: true}).then( response =>{
									console.log("拉起微信所需数据",response)
									let data = JSON.parse(response.body.result);
									console.log(data);
									if (typeof WeixinJSBridge == "undefined"){
									   if( document.addEventListener ){
									       document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
									   }else if (document.attachEvent){
									       document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data)); 
									       document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data));
									   }
									}else{
									   vm.onBridgeReady(data);
									}
										
								});
								
							}else {
								
							}
						})
								
							
						
						
					}
					
				}
				
			},
			onBridgeReady(data){
				let vm = this;
				let orderInfo = vm.orderInfo;
				let proType = vm.$route.query.type;
				WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":data.appId,     //公众号名称，由商户传入     
			           "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":data.nonceStr, //随机串     
			           "package":data.package,     
			           "signType":data.signType,         //微信签名方式：     
			           "paySign":data.paySign //微信签名 
			       },
			       function(res){
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			           		//支付成功回调
			           		let money = Number(orderInfo.servicePayMoney).toFixed(2);
				    		//vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}})
				    		if(!proType){
								vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}});				    										
							}else {
								vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money,type:"mech"}});
							}
			           }else {//支付失败回调
			           		//vm.$router.push({path:"/orderPayment/payFail"});
			           		if(!proType){
								vm.$router.push({path:"/orderPayment/payFail"});
							}else {
								vm.$router.push({path:"/orderPayment/payFail",query:{type:"mech"}});
							}
			           }
			       }
			   ); 
			},
			currentTime(){
				var date = new Date();
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    var strHours = date.getHours();
			    var strMinutes = date.getMinutes();
			    var strSeconds = date.getSeconds();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    if(strHours >= 0 && strHours <= 9){
			    	strHours = "0" + strHours;
			    }
			    if(strMinutes >= 0 && strMinutes <= 9){
			    	strMinutes = "0" + strMinutes;
			    }
			    if(strSeconds >= 0 && strSeconds <= 9){
			    	strSeconds = "0" + strSeconds;
			    }
			   var currentdate = date.getFullYear() + "" + month + strDate + strHours + strMinutes + strSeconds;
			   console.log(currentdate);
			   return currentdate;
			},
			backToIndex(){
				let vm = this;
				let data = vm.orderInfo;
				let id = data.serviceDictId;
				let type = data.serviceReservation?'1':'0';
				location.href = mechanismUrl()[0] + "codeServerDetail?id="+id+"&type="+type;
			},
			goApp(){
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app"
			},
			getOpenId(){
				//alert("进入getOpenId方法");
				//获取openid
				let Request = {
					QueryString : function(item){
						var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
						return svalue ? svalue[1] : svalue;
					}
				}
				var wxCode = Request.QueryString("code");
				//alert("wxcode");
				//alert(wxCode);
				this.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxAccountInfo",{wxCode : wxCode},{emulateJSON: true}).then( response =>{
					if(response.body != ""){
						var str = JSON.stringify(response.body);
						var openId = response.body.openid;
						//alert("openId");
						//alert(openId);
						this.$cookie.set('wxMsg', str);
						return false;
					}
				})
			}
		},
		mounted(){
			this.initData();
		},
		components:{
			Heads,
			Loading
		}
	}
</script>
<style>
	#order-pay{
		width: 100%;
		height: 100%;
		background: #fff;
		padding-top: 0.84rem;
	}
	#order-pay .headers {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	
	#order-pay .headers b {
		text-align: center;
		width: 0.8rem;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0;
	}
	
	#order-pay .headers img {
		width: 60%;
		margin-top: 24%;
	}
	
	#order-pay .headers h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	#order-pay .order-pay{
		width: 100%;
	}
	.order-pay .order-pay-title{
		font-size: 0.26rem;
		color: #666;
		margin-top: 1.11rem;
		text-align: center;
	}
	.order-pay .order-pay-price{
		font-size: 0.42rem;
		text-align: center;
		color: #eb615b;
		margin-top: 0.15rem;
		font-weight: bold;
	}
	.order-pay .order-pay-price span{
		margin-left: 0.15rem;
		font-weight: bold;
	}
	#order-pay .order-pay-method{
		width: 100%;
		padding: 0 0.3rem;
		margin-top: 0.75rem;
		border-top: 0.02rem solid #efefef;
		border-bottom: 0.02rem solid #efefef;
	}
	#order-pay .order-pay-method .pay-method{
		width: 100%;
		height: 0.92rem;
	}
	.order-pay-method .pay-method:first-child{
		border-bottom: 0.02rem solid #efefef;
	}
	.pay-method.pay-weixin{
		background: url(../../assets/image/server/pay-weixin.png) no-repeat left center;
		background-size: 6%;
	}
	.pay-method.pay-zhifubao{
		background: url(../../assets/image/server/pay-zhifubao.png) no-repeat left center;
		background-size: 6%;
	}
	#order-pay .pay-method p{
		color: #545654;
		font-size: 0.27rem;
		line-height: 0.92rem;
		padding-left: 0.66rem;
		float: left;
	}
	#order-pay .pay-method span{
		display: block;
		float: right;
		height: 100%;
		width: 10%;
		background: url(../../assets/image/server/pay-cancel.png) no-repeat right center;
		background-size: 55%;
	}
	#order-pay .pay-method.isActive span{
		height: 100%;
		width: 10%;
		background: url(../../assets/image/server/pay-sure.png) no-repeat right center;
		background-size: 55%;
	}
	#order-pay .pay-method img{
		display: block;
		height: 100%;
		width: auto;
	}
	#order-pay .pay-sure{
		padding: 0 0.3rem;
		margin-top: 0.48rem;
	}
	#order-pay .pay-sure a{
		width: 100%;
		height: 0.82rem;
		display: block;
		background: #439685;
		/*background: #b3b3b3;*/
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.82rem;
		text-align: center;
		border-radius: 5px;
		
	}
	#order-pay .pay-sure1{
		padding: 0 0.3rem;
		margin-top: 0.48rem;
	}
	#order-pay .pay-sure1 a{
		width: 100%;
		height: 0.82rem;
		display: block;
		/*background: #439685;*/
		background: #b3b3b3;
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.82rem;
		text-align: center;
		border-radius: 5px;
		
	}
	#order-pay .pay-new{
		padding: 0 0.3rem;
		margin-top: 0.48rem;
	}
	#order-pay .pay-new a{
		width: 100%;
		height: 0.82rem;
		display: block;
		background: #439685;
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.82rem;
		text-align: center;
		border-radius: 5px;
		
	}
</style>