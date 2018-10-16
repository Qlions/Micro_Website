<template>
	<div class="sharePage_2">
		<div class="culeDiv_2">
			<h2>邀请好友<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>稳赢奖励</h2>
			<div class="sharePage_content">
				<p>您已经是我们的老朋友了，该礼包仅限新用户领取</p>
				<p>您可通过邀请好友，赚取健康豆奖励！</p>
			</div>
			<div @click="getShareFn">
				<Getmsg id="drawbtn" :Atext="Atext" :Ahref= "Ahref" ></Getmsg>
			</div>
			<div class="culeDiv">
				<p class="culeTitle">活动规则</p>
				<p class="culeOne"><i>1</i><span>注册成功后(请注意查收手机短信)，需要登录中国健康云客户端APP方可使用礼包。</span></p>
				<p class="culeTwo"><i>2</i><span>使用礼包的手机号必须为领取礼包时所使用的手机号。</span></p>
				<p class="culethree"><i>3</i><span>礼包仅限中国健康云客户端APP新注册用户领取。</span></p>
				<p class="culefour"><i>4</i><span>中国健康云保留法律范围内的最终解释权，如有其他事宜请致电客服4000-990-288</span></p>
			</div>
		</div>
		<div class="guide_congent" v-if="isGuide">
			<div class="guide_congent_img">
				<img src="../../../assets/image/activities/guide_congent_img.png" alt="">
			</div>
			<div class="guide_congent_txt">
				<p>点击右上角</p>
				<p>将他发送给指定好友与分享到朋友圈</p>
				<a href="javascrit:void(0)" @click="codeGuide">我知道了</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Getmsg from "../activitiesCom/btn.vue"
	import popup from "../activitiesCom/popUp.vue"
	
	export default {
		data(){
			return {
				Ahref: "javascrit:;",
				Atext: "立即邀请",
				CWord: '获取',
				mobileVal: "",
				mobileCode: "",
				clickWord: true,
				num: "",
				isGuide:false
			}
		},
		components:{
			Getmsg,
			popup
		},
		methods:{
			fousFn(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					this.downSign = false;
					document.getElementById("bg").style.top = "-4.5rem";
				}
				
			},
			blurFn(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					this.downSign = true;
				 	document.getElementById("bg").style.top = "0%";
				}
			},
			
			//
			getShareFn () {
				this.isGuide = true;
			},
			codeGuide () {
				this.isGuide = false;
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
		}
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	.sharePage_2{
		width: 100%;
		background-image: url(../../../assets/image/activities/sharebg.png);
		background-repeat:no-repeat; 
		background-size:cover;
		-moz-background-size:100% 100%;
	}
	.culeDiv_2{
		padding-top: 82%;
	}
	.culeDiv_2 h2 {
		font-size: 18px;
		color: #fff;
		padding-bottom: .25rem;
		text-align: center;
	}
	.sharePage_content {
		padding-bottom: .4rem;
		font-size: 14px;
		color: #fff;
		text-align: center;
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
		margin-top: .2rem;
		padding-bottom: .5rem;
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
	/* 指引 */
	.guide_congent {
		background: #000;
		opacity: .9;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
	}
	.guide_congent_img img {
		width: 3.3rem;
		height: 4rem;
		margin-left: 3.8rem;
		margin-top: 0.2rem;
	}
	.guide_congent_txt p {
		font-size: 16px;
		color: #fff;
		text-align: center;
		margin-top: .1rem;
	}
	.guide_congent_txt a {
		width: 2.5rem;
		height: .8rem;
		border: 1px dashed #fff;
		border-radius: .1rem;
		text-align: center;
		line-height: .8rem;
		color: #fff;
		display: block;
		margin: .3rem auto;
		font-size: 14px;
	}
</style>