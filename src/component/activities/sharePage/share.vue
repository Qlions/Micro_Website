<template>
	<div class="sharePage">
			<div id="inputDiv">
				<div class="getBtn">
					<i class="getBtn_label">输入手机号</i>
					<input type="tel" v-model="mobileVal"/>
					<!--  @blur="blurFn"  @focus="fousFn"   -->
				</div>
				<div class="getBtns"></div>
				<div class="getBtn">
					<i class="getBtn_label">图片验证码</i>
					<input type="text" class="imgIpt" v-model="mobileCode"/>
					<a href="javascript:void(0);" class="pic-code" @click="regCode">
						<img :src="'data:image/JPEG ;base64,'+url"/>
					</a>
				</div>
				<div class="getBtns"></div>
				<div class="getBtn">
					<i class="getBtn_label">短信验证码</i>
					<input type="text" class="codeInput" @focus="fousFn" v-model="mobilePhone"/>
					<!-- <span style="	border-left: 1px solid #e6e6e6;"></span> -->
					<span class="codeBtn" v-if="clickWord" @click="clickCode">{{ codetxt }}</span>
					<span class="codeBtn" v-else>{{ num }}s</span>
				</div>
				<div class="getBtns" ></div>
				<span @click="getShareFn">
					<Getmsg id="drawbtn" :Atext="Atext" :Ahref= "Ahref" ></Getmsg>
				</span>
				<div class="getBtns"></div>
				<div class="culeDiv">
					<p class="culeTitle">活动规则</p>
					<p class="culeOne"><i>1</i><span>注册成功后(请注意查收手机短信)，需要登录中国健康云客户端APP方可使用礼包。</span></p>
					<p class="culeTwo"><i>2</i><span>使用礼包的手机号必须为领取礼包时所使用的手机号。</span></p>
					<p class="culethree"><i>3</i><span>礼包仅限中国健康云客户端APP新注册用户领取。</span></p>
					<p class="culefour"><i>4</i><span>中国健康云保留法律范围内的最终解释权，如有其他事宜请致电客服4000-990-288</span></p>
				</div>
			</div>
			<!--  -->
			<popup  :sucMessage="sucMessage" v-if="maskShow"></popup>
	</div>
</template>

<script>
	import Getmsg from "../activitiesCom/btn.vue"
	import popup from "../activitiesCom/popUp.vue"
	
	export default {
		data(){
			return {
				Ahref: "javascrit:;",
				Atext: "领取大礼包",
				sucMessage:"",
				maskShow:false,
				mobileVal: "",
				mobileCode: "",
				mobilePhone:"",
				clickWord: true,
				num: "",
				url:"",
				isImg:true,
				codetxt:"获取验证码",
				isShow:false,
				shareUserId:this.$route.query.shareUserId
			}
		},
		components:{
			Getmsg,
			popup
		},
		methods:{
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.maskShow ==  true){
                		this.maskShow = false;
                	} 
                },1500);  
			},
			fousFn(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					this.downSign = false;
					document.getElementById("bg").style.top = "-4.5rem";
				}
				
			},
			//获取验证码
			clickCode () { //获取手机验证码时间
				let vm = this; 
				if( vm.mobileVal == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.mobileVal)) ){
					vm.maskShow = true;
					vm.sucMessage = "请输入正确手机号";
					vm.clearStorage();
				}else {
					let data = JSON.stringify({
						'mobile':this.mobileVal
					})
					// 如果手机号码不存在，执行验证码
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:'',infoType:222202,jsonValue:data},{emulateJSON:true}).then( response => {
						if( response.body.state == 'err-01' ){
							vm.maskShow = true;
							vm.sucMessage = "电话为空";
							vm.clearStorage();
						}else if( response.body.state == 'err-02' ){
							vm.maskShow = true;
							vm.sucMessage = "验证码每天不得超过5条";
							vm.clearStorage();
						}else if( response.body.state == 'err-04' ){
							vm.maskShow = true;
							vm.sucMessage = "验证码发送间隔不小于1分钟";
							vm.clearStorage();
						}else {
							vm.timer();
						}
					})
				}	
			},
			timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isCalss = true;
							vm.codetxt = sec + "s重试" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isCalss = false;
							vm.codetxt = '获取';
						}
					}, i * 1000)
			    }			
			},
			//
			codeimg () { // 默认图片验证码
				let vm = this;
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetAuthServiceToken',{token:'',infoType:111103,jsonValue:{}},{emulateJSON:true}).then( response => {
					console.log(response)
					this.token = response.body.token;
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:response.body.token,infoType:111105,jsonValue:JSON.stringify({"isBase64":"yes"})},{emulateJSON:true}).then( response => {
						vm.url = response.bodyText;
					})		
				})
			},
			regCode () {
				this.codeimg();
			},
			getShareFn () {
				let vm = this;
				if(this.mobileVal != '' && this.mobilePhone != '' && this.mobileCode != ''  ){
					
					let data = JSON.stringify({
						'shareUserId':this.shareUserId,
						'mobile':this.mobileVal,
						'mobileCode':this.mobilePhone,
						'rand':this.mobileCode,
					})
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.token,infoType:111151,jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if( response.body.state == 'err_sharePrize_001' ){
							vm.sucMessage = '图片验证码错误';
							vm.maskShow = true;
							vm.clearStorage();
						}else if( response.body.state == 'err_sharePrize_002' ){
							vm.sucMessage = '验证码错误';
							vm.maskShow = true;
							vm.clearStorage();
						}else if( response.body.state == 'err_sharePrize_003' ){
							vm.sucMessage = '验证码超时';
							vm.maskShow = true;
							vm.clearStorage();
						}else if( response.body.state == 'err_sharePrize_004' ){
							vm.$router.push('/activities/share2');
						}else if(response.body.state == 'suc'){
							window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app';
						}
					})
				}else {
					vm.sucMessage = '请填写信息';
					vm.maskShow = true;
					vm.clearStorage();
				}
				
			},
			wxshare(){
				let _url = window.location.href;
				let _wx_config_paran;
				let _title = "送给你个200元大礼包，并祝您及全家健康平安！";
				let _linkUrl = 'https://weixin.zgjky.cn/wbchat/website/index.html#/activities/share';
				let _imgUrl1 = 'https://weixin.zgjky.cn/wbchat/website/dist/assets/image/logoshare.png';
				//获取nickname
				let _wxMsg = this.$cookie.get("wxMsg");
				let _desc =  '中国健康云可以给予您最靠谱的健康关怀~用心呵护，让爱久远（悄悄话：你得礼包我得豆~）';
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
		},
		created () {
			this.wxshare();	
		},
		mounted () {
			$('body').height($('body')[0].clientHeight);
			this.codeimg();
			let vm = this;
/*			let data = JSON.stringify({
				'userName':this.mobileVal,
				'rand':this.mobileCode
			})
			vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.token,infoType:111111,jsonValue:data},{emulateJSON:true}).then( response => {
				console.log(response)
				if( response.body.state == 3 ){
					vm.sucMessage = '图片验证码错误';
					vm.maskShow = true;
					vm.clearStorage();
				}else if( response.body.state == 'err_name_1' ){
					vm.sucMessage = '账户信息没有填写';
					vm.maskShow = true;
					vm.clearStorage();
				}
			})*/
		}
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	.sharePage{
		width: 100%;
		background-image: url(../../../assets/image/activities/sharebg.png);
		background-repeat:no-repeat; 
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	}
	#inputDiv{
		padding-top: 85%;
	}
	
	/*输入框*/
	.getBtn {
		width: 78%;
		background: #fff;
		border: 1px solid #e6e6e6;
		color: #565660;
		line-height: 0.8rem;
		border-radius: 0.8rem;
		margin:  0 auto 0 auto;
		font-size:14px;
		position: relative;
	}
	.getBtn i {
		width: 2rem;
		display: block;
		float: left;
		text-align: right;
	}
	.getBtn .imgIpt {
		width: 25%;
	}
	.getBtn input {
		width: 60%;
		color: #565660;		
		height: 90%;
		margin-top:3% ;
		text-indent: .1rem;
	}
	.codeInput{
		width: 25% !important;
		float: none !important;
	}
	.codeBtn{
		display: block;
	    width: 2rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    position: absolute;
	    right: 0.17rem;
	    top: 0.15rem;
	    font-size: .26rem;
	    text-align: center;
	    border-left: 1px solid #e6e6e6;
	}
	.getBtns{
		height: 0.2rem;
	}
	.downSign{
		position: fixed;
		bottom: 0;
		color: #999;
		font-size: 0.22rem;
		width: 100%;
		text-align: center;
		z-index: 1;
	}
	.activityRulesP{
		color: #999;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.6rem;
		margin-top: 0rem;
	}
	
	/*按钮渐变*/
	#drawbtn{
		background: linear-gradient(to bottom , #ff5400 0%, #ffad1e 100%);
		background:-webkit-gradient(linear, 0 0, 0 bottom, from(#ff5400), to(#ffad1e));  
	}
	
	/*规则*/
	.culeDiv{
		margin:  0 auto;
		width: 90%;
		color: #ff9600;
		font-size:12px;
		overflow-y: scroll;
		overflow: hidden;
		padding-bottom: .5rem;
		margin-top: .2rem;
	}
	.culeDiv p {
		overflow: hidden;
		padding-bottom: .1rem;
	}
	.culeDiv span {
		float: left;
		width: 90%;
		margin-left: .15rem;
	}
	.culeDiv i {
		width: 5%;
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		border: 1px solid #ff9600;;
		text-align: center;
		line-height: 12px;
		float: left;
		margin-top: .05rem;
	}
	.culeTitle{
		font-size: 13px;
		text-align: center;
		margin-bottom: .1rem;
	}
	.pic-code {
	    display: block;
	    width: 2rem;
	    height: 0.65rem;
	    line-height: 0.65rem;
	    position: absolute;
	    right: 0.17rem;
	    top: 0.08rem;
	}
	.pic-code img {
		width: 100%;
		height: 100%;
		border-radius: 0 .02rem .02rem 0;
	}
	.getBtn_label {
		display: block;
		float: left;
		width: 
	}
</style>