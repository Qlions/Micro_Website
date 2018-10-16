<template>

	<div class="shareVideo">
		<Loading v-if="isLoading"></Loading>
		<div class="doctor_info">
			<img :src="apiInfo.photosmall" alt="" />
			<div class="doctor_info_content">
				<p><span>{{ apiInfo.name }}</span>&#8194;<span>{{ apiInfo.department }}<span v-if="apiInfo.department && apiInfo.departmentInfo">/</span>{{ apiInfo.departmentInfo }}</span>&#8194;<span>{{ apiInfo.proTitle}}</span> </p>
				<p><span>{{ apiInfo.eaName }}</span></p>
			</div>
			<a class="openApp" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app">打开APP</a>
		</div>
		<h2 class="video_name"><span v-if="apiInfo.videoType == 2" class="video_topic">#{{ videoTitle }}#</span><span>{{ apiInfo.liveStreamingDesp || videoTitle }}</span></h2>
		<div class="video_box">
			<video 
				id="myVideo" 
				v-show="isShow" 
				:poster="posterUrl" 
				controls 
				playsinline 
				:src="mp4Url"
				webkit-playsinline="true"
			    x-webkit-airplay="true"
			    playsinline="true"
			    x5-video-player-type="h5"
			    x5-video-orientation="h5"
			    x5-video-player-fullscreen="true"
				>
	  			您的浏览器不支持Video标签。
			</video>
			<div id="video_poster" class="video_poster" v-show="!isShow" :style="{backgroundImage: 'url(' + posterUrl + ')'}">
				<div class="video_btn" @click="playVideo"></div>
			</div>
			
		</div>
		<div class="comment">
			<p class="comment_count">新鲜评论({{ apiInfo.commentCount }})</p>
			<ul class="comment_list">
				<li v-for="item in commentList">
					<div class="comment_info">
						<img :src="item.commentUserPhoto" alt="" />
						<div class="comment_userInfo">
							<span class="userName">{{ item.commentUserName }}</span>
							<span class="comment_date"><i>{{ item.commentTime }}</i></span>
						</div>
					</div>
					<p class="comment_text">{{ item.commentContent }}</p>
					<div class="author_view" v-if="!!item.adviceContent">
						<div class="author">
							<p>作者回复</p>
							<span>{{ item.adviceTime }}</span>
						</div>
						<div class="author_content">{{ item.adviceContent }}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="payPanel" v-if="isPanel">
			<div class="pay_box">
				<div class="pay_box_view">
					<div class="pay_box_top">
						<img :src="apiInfo.photosmall" alt="" />
						<div class="pay_box_top_info">
							<h2>{{ apiInfo.name }} &#8194;<span>{{ apiInfo.department }}<span v-if="apiInfo.department && apiInfo.departmentInfo">/</span>{{ apiInfo.departmentInfo }}</span>&#8194;<span>{{ apiInfo.proTitle}}</span></h2>
							<p>{{ apiInfo.eaName }}</p>
						</div>
					</div>
					<div class="pay_box_content">
						<h2>{{ apiInfo.liveStreamingName}}</h2>
						<p class="pay_box_price">¥{{ apiInfo.liveStreamingCost | LegalNumber }}/人</p>
						<p class="pay_box_explain">
							注意：您支付的款项正常情况下，不支持退费！特殊情况除外(如遇专家原因不能直播或其他原因取消直播，系统将自动进行退费)
						</p>
					</div>
				</div>
				<div class="pay_box_bottom">
					<p class="cancel" @click="cancelPay">取消</p>
					<p class="pay" @click="payMoney">去支付</p>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
	</div>
</template>
<script>
	import Loading from '../../common/loading.vue'
	import myfooter from "../../common/footer.vue"
	export default {
		name: 'shareVideo',
		data(){
			return {
				_dom: '',
				apiInfo: '',
				isLoading: true,
				isShow: false,
				isPanel: false,
				videoTitle: '',
				mp4Url: '',
				posterUrl: '',
				commentList:''
			}
		},
		mounted(){
			this.initData();
		},
		methods: {
			initData() {
				let vm = this;
				let id = vm.$route.query.liveStreamingId;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				let data = JSON.stringify({
					liveStreamingId: id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660602, jsonValue:data},{emulateJSON:true}).then(response => {
					if(response.status == 200){
						console.log(response);
						vm.apiInfo = response.body;
						vm.videoTitle = response.body.liveStreamingName;
						vm.posterUrl = response.body.fileUrl;
						vm.mp4Url = response.body.shdMp4Url;
						const video_poster = document.getElementById("video_poster");
						const width = document.documentElement.clientWidth;
						//const _height = (response.body.resolutionRatioY) / 100 + "rem";
						const _height = parseInt((width * response.body.resolutionRatioY) / response.body.resolutionRatioX) + "px";
						const n_height = parseInt((width * response.body.resolutionRatioY) / response.body.resolutionRatioX);
						console.log(_height);
						let _myVideo = document.getElementById("myVideo");
						_myVideo.setAttribute("height", n_height)
						video_poster.style.height = _height;
						vm.initComment(id);
					}
				})
			},
			initComment(id){
				let vm = this;
				//let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = "";
				let data = JSON.stringify({
					liveId: id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211303, jsonValue:data},{emulateJSON:true}).then(response => {
					if(response.body.row.length > 0){
						console.log(response);
						vm.commentList = response.body.row;
					}
					vm.isLoading = false;	
				});
			},
			playVideo(){
				const isFree = this.apiInfo.isFree;
				this._dom = document.getElementById('myVideo');
				if(isFree == 1){//视频免费播放
					console.log("免费视频");
					this.isShow = true;
					this._dom.play();
				}else {//视频不免费
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					if(!userInfo){//用户未登录
						console.log("用户未登录");
						this.$router.push({path: '/login', query:{share: 1}})
					}else {//用户登录
						const isBuy = this.apiInfo.isBuy;
						if(isBuy == 0){//未购买
							console.log("未购买，弹出支付窗口");
							this.isPanel = true;
						}else {//已经购买
							console.log("用户已经购买");
							this.isShow = true;
							this._dom.play();
						}
					}
				}
			},
			cancelPay(){
				this.isPanel = false;
				this.isShow = false;
			},
			payMoney(){
				//跳支付页
				let vm = this;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				const id = vm.$route.query.liveStreamingId;
				let data = JSON.stringify({
					liveStreamingId: id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660085, jsonValue:data},{emulateJSON:true}).then(response => {
					console.log(response);
					if(response.body.state == 'suc'){
						const orderId = response.body.orderId;
						const isWeiXin = vm.isWeiXin();
						const appId = 'wx753f3d589dd2a3c0';
						if(isWeiXin){
							let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appId +"&redirect_uri=http%3a%2f%2fweixin.zgjky.cn%2fwbchat%2fwebsite%2findex.html%3f%23%2fserverConfirm%2fserverOrder%2forderPayment%3forderId%3d"+ orderId +"&response_type=code&scope=snsapi_userinfo&state=jkjh#wechat_redirect";  
							location.href = _url;
						}else {
							vm.$router.push({"path":"/serverConfirm/serverOrder/orderPayH5",query:{orderId:orderId}});
						}
					}
				});
			},
			isWeiXin(){
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
					return true;
				}else {
					return false;
				}
			}
		},
		components: {
			Loading,
			myfooter
		}
	}
</script>
<style>
	.shareVideo{
		width: 100%;
	}
	.doctor_info{
		width: 100%;
		padding: 0.12rem 0.3rem;
		background: #333;
	}
	.doctor_info img{
		width: 0.64rem;
		height: 0.64rem;
		border-radius: 50%;
		float: left;
	}
	.openApp{
		float: right;
		width: 1.48rem;
		height: 0.48rem;
		line-height: 0.48rem;
		border: 0.01rem solid #fff;
		border-radius: 5px;
		margin-top: 0.08rem;
		text-align: center;
		font-size: 0.24rem;
		color: #fff;
	}
	.doctor_info_content{
		float: left;
		margin-left: 0.2rem;
		color: #fff;
		font-size: 0.2rem;
	}
	.doctor_info_content p{
		line-height: 0.3rem;
	}
	.video_name{
		width: 100%;
		height: 1.14rem;
		color: #333;
		text-align: left;
		padding-left: 0.3rem;
		line-height: 1.14rem;
		font-size: 0.34rem;
	}
	.video_box{

		width: 100%;
		position: relative;
	}
	.video_box video {
		width: 100%;
		/*height: 100%;*/
		object-fit: fill;
		over-flow: auto;     /* winphone8和android4+ */
-webkit-overflow-scrolling: touch;    /* ios5+ */
	}
	.comment{
		width: 100%;
		padding: 0 0.3rem;
	}
	.comment_count{
		font-size: 0.29rem;
		color: #666;
		margin-top: 0.4rem;
	}
	.comment_list{
		width: 100%;
		word-spacing: normal;
	}
	.comment_list li{
		padding: 0.3rem 0 0;
		border-bottom: 0.01rem solid #e6e6e6;
	}
	.comment_info img{
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		float: left;
	}
	.comment_userInfo{
		float: left;
		line-height: 0.6rem;
		width: 90%;
	}
	.comment_userInfo .userName{
		float: left;
		margin-left: 0.3rem;
	}
	.comment_userInfo .comment_date{
		float: right;
	}
	.comment_text{
		font-size: 0.28rem;
		color: #333;
		margin-left: 0.9rem;
		padding-bottom: 0.3rem;
	}
	.author{
		margin-left: 0.9rem;
		width: 86%;
		padding: 0.2rem 0;
		border-top: 0.01rem solid #e6e6e6;
	}
	.author p{
		float: left;
		color: #649663;
		padding-left: 0.2rem;
		border-left: 0.1rem solid #649663;
		height: 0.4rem;
		font-size: 0.26rem;
		line-height: 0.4rem;
	}
	.author span{
		float: right;
	}
	.author_content{
		font-size: 0.28rem;
		color: #333;
		margin-left: 1.2rem;
		padding-bottom: 0.6rem;
	}
	video::-webkit-media-controls-start-playback-button{
		display: none;
	}
	.playVideoBtn{
		width: 1.24rem;
		height: 1.24rem;
		color: #fff;
		line-height: 50px;
		margin: 0 auto;
		margin-top: 25px;
		text-align: center;
		border-radius: 50%;
		position: absolute;
		z-index: 99;
		top: 50%;
		margin-top: -0.62rem;
		left: 50%;
		margin-left: -0.62rem;
	}
	.playVideoBtn img{
		width: 100%;
		height: 100%;
		border: 0 none;
		vertical-align: top;
	}
	.payPanel{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.3);
		z-index: 100;
	}
	.pay_box{
		margin: 0 auto;
		width: 6.65rem;
		position: relative;
		top: 20%;
		/*top: 20%;*/
		background: #fff;
		border-radius: 5px;
	}
	.pay_box_view{
		padding: 0 0.3rem;
	}
	.pay_box_top{
		padding: 0.35rem 0;
		width: 100%;
		border-bottom: 0.02rem solid #e9e9e9;
	}
	.pay_box_top img{
		width: 0.95rem;
		vertical-align: top;
		border-radius: 50%;
		float: left;
	}
	.pay_box_top_info{
		float: left;
		margin-left: 0.26rem;
	}
	.pay_box_top_info h2{
		color: #4e4e4e;
		font-size: 0.24rem;
		line-height: 0.42rem;
	}
	.pay_box_top_info p{
		color: #969696;
		font-size: 0.24rem;
	}
	.pay_box_content{
		width: 100%;
	}
	.pay_box_content h2{
		padding: 0.4rem 0;
		font-size: 0.35rem;
		color: #333;
	}
	.pay_box_content p.pay_box_price{
		line-height: 1.7rem;
		border-bottom: 0.02rem solid #e9e9e9;
		text-align: center;
		color: #d6555c;
		font-size: 0.28rem;
	}
	.pay_box_content p.pay_box_explain{
		padding: 0.26rem 0 0.45rem;
		color: #a2a2a2;
		line-height: 0.3rem;
		font-size: 0.24rem;
	}
	.pay_box_bottom{
		width: 100%;
		height: 1.05rem;
	}
	.pay_box_bottom p{
		width: 50%;
		height: 100%;
		line-height: 1.05rem;
		float: left;
		text-align: center;
		font-size: 0.3rem;
	}
	.pay_box_bottom p.cancel{
		color: #666;
		background: #e6e6e6;
		border-radius: 0 0 0 5px;
	}
	.pay_box_bottom p.pay{
		color: #fff;
		background: #65b34e;
		border-radius: 0 0 5px 0;
		
	}
	.video_poster{
		width: 100%;
		height: 100%;
		position: relative;
		background: #000;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.video_poster .video_btn{
		width: 1.24rem;
		height: 1.24rem;
		color: #fff;
		text-align: center;
		border-radius: 50%;
		position: absolute;
		z-index: 99;
		top: 50%;
		margin-top: -0.62rem;
		left: 50%;
		margin-left: -0.62rem;
		background: url(../../../assets/image/activities/play@3x.png) no-repeat;
		background-size: 100%;
	}
	.video_topic{
		color: #ff5454;
		margin-right: 0.1rem;
	}
</style>