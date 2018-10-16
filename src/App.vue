<template>
  <div id="app">
    <keep-alive><router-view  v-if="$route.meta.keepAlive"></router-view></keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: '我的app',
        isShow:true
      }
    },
    methods: {
    	getOpenId(){
				//获取openid
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
//						var test = JSON.stringify({
//							openid: 'oqNXBweJGWbswkUN84H4LNFgQgH4',
//							unionid: 'oGXBVw-chAjFh9ESReo-oASndL7c'
//						})

						this.$cookie.set('wxMsg', str);
						return false;
						}
					})
			},
			
			autoLogin(){
				//获取cookie 里的  openid
				let wxMsg = JSON.parse(this.$cookie.get("wxMsg"));
				let wxOpenId = wxMsg.openid;
				let wxUnionid = wxMsg.unionid;
				//选择自动登陆
				if(wxOpenId != ""){
					//验证第三方
					let voilData = {
						openId: wxOpenId,
						thirdSource: '1',
						weChatSys: '561D5D57512C70E58C7A661A14014334'
					}
					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetAuthServiceThirdInfo",voilData , {emulateJSON: true}).then( response => {
						
						console.log(response.body)
						var response = response.body;
						// err 未认证   需要绑定
						if( response.state == "err"){
							this.$router.push("./main");
							return;
						}else if(response.state == "suc") {
							//已经绑定   自动登陆
							let str = JSON.stringify(response);
							this.$cookie.set('userInfo', str, { expires: '40m' });
							//向cookie中添加手机号,userInfoId,头像
							let userIn =  JSON.parse(this.$cookie.get('userInfo'));
							let token = userIn.token;
							let res = JSON.stringify({userName:userIn.userName,userType:1});
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
								console.log(response)
								this.response = JSON.parse(response.body.state)[0];
								userIn.identifyMobile = this.response.identifyMobile;
								userIn.identifyEmail = this.response.identifyEmail;
								userIn.photomiddle = this.response.photomiddle;
								userIn.userInfoId = this.response.userinfoId;
								userIn.name = this.response.name;
								userIn.pwd = this.userpws;
								let str = JSON.stringify(userIn);
								this.$cookie.set('userInfo', str, { expires: '40m' });
								this.$cookie.set('gender', this.response.gender, { expires: '40m' }); // 储存男女
								let userInfo = JSON.parse(this.$cookie.get('userInfo')); 
							})
							if(localStorage.getItem("temp")){
								var obj=JSON.parse(localStorage.getItem("temp"));
								if(obj.flag ==1 ){//先注册再登录时的跳转
									this.$router.go(-3);
									let ojj = {'flag':0}
									ojj = JSON.stringify(ojj);
									localStorage.setItem("temp", ojj);
									console.log('先注册')
								}else if(obj.flag ==3){
									this.$router.push({"path":'/my'});
									let ojj = {'flag':0}
									ojj = JSON.stringify(ojj);
									localStorage.setItem("temp", ojj);
									console.log('微信个人中心')
								}else{
									this.$router.go(-1);
									console.log('游客')
								}
							}else{//直接登录时的跳转
								this.$router.go(-1);
								console.log('wode')
								return;
							}
						}
					})
			}
				
		},
		isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
		//微信分享
		wxshare(){
				let _url = window.location.href;
				let _wx_config_paran;
				let _title = "中国健康云";
				let _linkUrl = window.location.href;
				let _imgUrl1 = "https://weixin.zgjky.cn/wbchat/website/dist/assets/image/logoshare.png";
				//获取nickname
//				let _wxMsg = this.$cookie.get("wxMsg");
				let _desc = '让您和家人离健康近一点，离疾病远一点！';
				// 获取签名等参数
				this.$http.post("/wbchatProxy/wbchat/Api/wbChatApi/wxSignatureInfo",{visitUrl : _url},{emulateJSON: true}).then( response =>{
					console.log(response);
					if(response.body != ""){
						_wx_config_paran = response.body;
						var that = this;
						wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: _wx_config_paran.appid, // 必填，公众号的唯一标识
						    timestamp: _wx_config_paran.timestamp, // 必填，生成签名的时间戳
						    nonceStr: _wx_config_paran.nonceStr, // 必填，生成签名的随机串
						    signature: _wx_config_paran.signature,// 必填，签名，见附录1
						    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
						
						var vm = this;
						wx.ready(function(){
							wx.checkJsApi({
								jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'],
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

							wx.onMenuShareQQ({
								title: _title, // 分享标题
								desc: _desc, // 分享描述
								link: _linkUrl, // 分享链接
								imgUrl:_imgUrl1, // 分享图标
								success: function () {
								// 用户确认分享后执行的回调函数
								},
								cancel: function () {
								// 用户取消分享后执行的回调函数
								}
							});

							wx.onMenuShareTimeline({
							    title: _title, // 分享标题
							    link: _linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: _imgUrl1, // 分享图标
							    success: function () { 
							        // 用户确认分享后执行的回调函数
							    },
							    cancel: function () { 
							        // 用户取消分享后执行的回调函数
							    }
							});
							
							
							wx.onMenuShareAppMessage({
							    title: _title, // 分享标题
							    desc: _desc, // 分享描述
							    link:  _linkUrl,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: _imgUrl1, // 分享图标
							    success: function () { 
							        // 用户确认分享后执行的回调函数
							       
							    },
							    cancel: function () { 
							        // 用户取消分享后执行的回调函数
							    }
							});

							wx.onMenuShareQZone({
								title: _title, // 分享标题
								desc: _desc, // 分享描述 
								link: _linkUrl, // 分享链接
								imgUrl:  _imgUrl1, // 分享图标
								success: function () {
								// 用户确认分享后执行的回调函数
								},
								cancel: function () {
								// 用户取消分享后执行的回调函数
								}
							});

						}); 
					}
				})
			}
		/*content_51_x () {
			this.isShow = false;
			localStorage.setItem('key',1)
		}*/
   },
   mounted(){
   	/*if(localStorage.getItem('key')){
   		this.isShow = false;
   	}else {
   		this.isShow = true;
   	}
	$(window).scroll(function() {
		var scrollY = $(document).scrollTop();
		if (scrollY == 0 ){ 
			$('.content_51_div').show();
			$('header').css({'position':"relative"});
			return false;
		}else {
			$('.content_51_div').hide();
			$('header').css({'position':"fixed"});
		}          
	});*/
   	let userInfo = JSON.parse(this.$cookie.get("userInfo"));
		if(userInfo != null ){
			return false;
		}
   	if(this.isWeiXin() && !this.getOpenId()){
   		this.autoLogin();
   	}
   	
  
   },
   created(){
   	this.wxshare();
   }
  }
</script>

<style>
  
  #app {
    width: 100%;
    height:100%;
  }
  h1, h2 {
    font-weight: normal;
  }
  input {
      border: none;
      background: none;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: #42b983;
  }
</style>
