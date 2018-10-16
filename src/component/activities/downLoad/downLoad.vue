<template>
	<div class="downloadDiv">
		<div class="logoDown">
			<img src="../../../assets/image/activities/logoyun.png" />
		</div>
		<div class="wordDivCH">
			<p>中国健康云 &nbsp;客户端</p>
			<p>永久贴身守护您的健康</p>
		</div>
		<btn :Ahref= "Ahref" :Atext="Atext"></btn>
		<p class="downSign">Copyright © 2018 中国健康云 All Rights Reserved.</p>
	</div>
</template>

<script>
	import Btn from "../activitiesCom/btn.vue"
	export default {
		data (){
			return {
				Ahref: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app',
				Atext: '下载应用'
			}
		},
		components:{
			Btn
		},
		methods:{
			/*
			 * Created by q on 18-1-11
			 * */
			wxshare(){
				let _url = window.location.href;
				let _wx_config_paran;
				let _title = "中国健康云";
				let _linkUrl = window.location.href;
				let _imgUrl1 = 'http://weixin.zgjky.cn/wbchat/website/dist/assets/image/logoshare.png';
				//获取nickname
				let _wxMsg = this.$cookie.get("wxMsg");
				let _desc =  JSON.parse(_wxMsg).nickname + "邀请您和他一起行动，玩转健康！与好友互动，玩出健康新高度！有现金红包领取哦~~";
				
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
						    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
						
						var vm = this;
						wx.ready(function(){
							wx.checkJsApi({
								jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
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
						}); 
					}
				})
			}
		},
		mounted(){
			//分享
			this.wxshare();	
		}
			
			
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	.downloadDiv{
		width: 100%;
		height: 100%;
		background: url(../../../assets/image/activities/bg.png) no-repeat;
		background-size: cover;
		margin:  0 auto;
		padding: 1px;
	}
	.logoDown{
		width: 2rem;
		height: 2rem;
		margin: 45% auto 0 auto;
		
	}
	.logoDown img{
		width: 100%;
		height: 100%;
	}
	.wordDivCH{
		text-align: center;
		color: #565660;
		font-size: 0.3rem;
	}
	.wordDivCH p{
		line-height: 0.6rem;
	}
	.wordDivCH p:last-of-type{
		color: #999;
		font-size: 0.28rem;
	}
	.downLoadBtn {
		width: 60%;
		text-align: center;
		background: #f93946;
		color: #fff;
		line-height: 0.8rem;
		border-radius: 0.8rem;
		margin:  0.2rem auto 0 auto;
		font-size: 0.36rem;
		
		
	}
	.downLoadBtn a{
		display: inline-block;
		color: #FFF;
		width: 100%;
		height: 100%;
	}
	.downSign{
		position: absolute;
		bottom: 0;
		color: #999;
		font-size: 0.22rem;
		width: 100%;
		text-align: center;
	}
</style>