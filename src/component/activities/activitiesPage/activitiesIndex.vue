<template>
	<div style="height: 100%; width: 100%;">
		<div class="activeIndexs" :style="{backgroundImage: 'url(' +extensionSiteBgFileUrl1+ ')'}" v-show="openShow">
		<div style="display: none;">
			<img src="../../../assets/image/activities/logoshare.png"/>
		</div>
		<!--<div class="activeImg">
			<img src="../../../assets/image/activities/officeDom.png"/>
			<p class="activityTime"></p>
		</div>-->
		<div class="getBtnRules">
			<p class="getTime">活动日期：<span>{{ starDate1 }}</span> 至 <span>{{ endDate1 }}</span></p>
			<span @click="touchGet"  v-if="btnShow == 1" >
				<GetBtn :Atext="Atext1" :Ahref="Ahref" class="Getbtn" ></GetBtn>
			</span>
			<GetBtn :Atext="Atext2"  :Ahref="Ahref" v-else-if="btnShow == 2" class="Getbtn" style="background: #999;"></GetBtn>
			<GetBtn :Atext="Atext3"  :Ahref="Ahref" v-else-if= "btnShow == 3" class="Getbtn" style="background: #999;"></GetBtn>
			<p class="activityRulesP"  @click="oNOffRules" >活动规则</p>
		</div>
		<p class="downSign">Copyright © 2016 中国健康云 All Rights Reserved.</p>
		
		
		<div class="rulesDiv" v-show="rulesShow">
			<div class="wordRulesDiv" >
				<p class="rulesHeadP" >活动规则</p>
				<ul class="rulesUl">
					<li>1.本优惠券每个用户只能领取一次，且只能在有效期内使用；</li>
					<li>2.优惠券只限领用者当前账号使用，不可售卖或转让；</li>
					<li>3.活动中每张优惠券仅限被使用一次，该“使用”指用户在该优惠券的有效期内完成交易、并成功付款的行为，超出有效期仍未付款的，该优惠券失效；</li>
					<li>4.使用优惠券的订单一经下单，则视为优惠券已使用。如退单，则退款金额仅限于用户实际付款的金额，不包括优惠券部分的金额；</li>
					<li>5.由于帐户盗用等非常规原因或用户自身原因造成不能使用优惠券的，与中国健康云无关；</li>
					<li>6. 中国健康云有权随时调整、更新、修改本规则；</li>
					<li>7.本活动最终解释权归中国健康云所有。</li>
				</ul>
			</div>
			<i @click="oNOffRules"> </i>
		</div>
		<div class="shadeDiv" v-show="rulesShow"></div>
			
			
		</div>
		<div  class="noOpen" v-show="noOpenShow">
			<div class="noOpenimg"><img src="../../../assets/image/activities/nocoupon.png"/></div>
			<p class="noOpenword">暂无活动</p>
			<!--<p class="goHome">去首页看看</p>-->
		</div>
		
		<!--//列表-->
		<div v-show="OpenListShow">
			<ul class="listCoupon" v-for="list in listMsg">
				<li @click="goCoupon(list.extensionLinkH5 + Hroute)">
					<!--<a :href=" list.extensionLinkH5 + Hroute" target="_blank">--> 
						<p class="listImg"><img :src=" list.extensionSiteFileUrl "/></p>
						<p class="couponName">{{ list.couponName }}</p>
						<p class="couponDate">活动日期： <span>2017-11-01</span>至<span>2017-15-02</span></p>
					<!--</a>-->
				</li>
				
			</ul>
		</div>
		
	</div>
</template>

<script>
	import GetBtn from "../activitiesCom/btn.vue"
	export default {
		data (){
			return {
				Atext1: "免费领取",
				Atext2: "敬请期待",
				Atext3: "活动已结束",
				Ahref: 'javascript:;',
				rulesShow: false,
				btnShow: "",
				starDate1: "?",
				endDate1: "?",
				num: 1,
				couponId: this.$route.query.couponId,
				extensionSiteBgFileUrl1: '',
				extensionSiteBgFileUrl2: "",
				couponAmount: '',
				configInfo: "",
				noOpenShow: false,
				openShow: false,
				OpenListShow: false,
				listMsg: '',
				Hroute: "&typeUrl=H5"
			}
		},
		components: {
			GetBtn,
		},
		watch:{
			
			couponId: function (val){
				console.log(val)
				this.couponMsgFn();
			}
		},
		beforeUpdate(){
			this.couponId = this.$route.query.couponId;
			this.couponMsgFn();
		},
		methods:{
			oNOffRules() {
				if(!this.rulesShow){
					this.rulesShow = true;
				}else{
					this.rulesShow = false;
				}
			},
			touchGet(){
				if(this.percentNum != null){
					if(this.urlType() != 'app'){
						this.$router.push({ path:  "./activitiesGet", query:{ percentNum: this.percentNum, couponId: this.couponId}});
						return;
					}else{
						window.AA.getCouponId(this.couponId);
					}
					
				}
				
			
			},
			goCoupon(url){
				this.openShow = true;
				this.OpenListShow = false;
//				this.couponMsgFn();
				this.$forceUpdate()
				window.location.href = url;
			},
			
			couponMsgFn(){
				if( this.couponId == "" || this.couponId == null || this.couponId == undefined){
					return false
				}

				let couponMsgStr = JSON.stringify({
					serviceType: 1,
					opType: 1,
					couponId: this.couponId
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "1",jsonValue: couponMsgStr, infoType: 660301},{emulateJSON:true}).then( response => {
					console.log(response);
					this.couponMsg = response.body.rows;
					for(var i = 0; i < this.couponMsg.length; i++){
						this.percentNum = this.couponMsg[i].percentNum;
						this.resCouponId = this.couponMsg[i].couponId;
						this.starDate1 = this.couponMsg[i].couponTimeStart.split('T')[0];
						this.endDate1 = this.couponMsg[i].couponTimeEnd.split("T")[0];
						this.extensionSiteFileUrl = this.couponMsg[i].extensionSiteFileUrl;
						this.extensionSiteBgFileUrl1 = this.couponMsg[i].extensionSiteBgFileUrl1;
						this.extensionSiteBgFileUrl2 = this.couponMsg[i].extensionSiteBgFileUrl2;
						this.couponAmount = this.couponMsg[i].couponAmount;
					}
					console.log(this.extensionSiteFileUrl)
					
//					this.ShareFn();
					
					let dateStr = JSON.stringify({
						starDate: this.starDate1,
						endDate : this.endDate1
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "1",jsonValue: dateStr, infoType: 222211},{emulateJSON:true}).then( response => {
						console.log(response);
						let curDate = response.body.curDate;
						let isValid = response.body.isValid;
						if(curDate >= this.starDate1  && curDate <= this.endDate1){
							this.btnShow = 1;
						}else if(curDate <= this.starDate1){
							this.btnShow = 2;
						}else if(curDate >= this.endDate1){
							this.btnShow = 3
						}
					})
				})
			},
			urlType(){
				let devType = this.$route.query.devType;
				console.log(devType)
				return devType;
			},
			typeH5(){
				let typeUrl = this.$route.query.typeUrl;
//				console.log(devType)
				return typeUrl;
			},
			// 分享
			ShareFn(){
				let urlBase = window.location.href;
				console.log(this.couponAmount);
				if(this.couponAmount != ""){
					var title = this.couponAmount +'元优惠劵开抢啦！';
				}else if(this.couponDiscount != ""){
					var title = this.couponDiscount +'折优惠劵开抢啦！';
				}else{
					var title = '优惠劵开抢啦！';	
				}
				
				
				var linkUrl = 'http://weixin.zgjky.cn/wbchat/website/index.html#/activities/activitiesPage/main?couponId=' + this.couponId;
//				var imgUrl1 = 'http://weixin.zgjky.cn/wbchat/websiteTest/dist/assets/image/logoshare.png';
				var imgUrl1 = 'http://weixin.zgjky.cn/wbchat/website/dist/assets/image/logoshare.png';
				
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
							    title: title, // 分享标题
							    link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: imgUrl1, // 分享图标
							    success: function () { 
							        // 用户确认分享后执行的回调函数
							    },
							    cancel: function () { 
							        // 用户取消分享后执行的回调函数
							    }
							});
							
							
							wx.onMenuShareAppMessage({
							    title: title, // 分享标题
							    desc: '我在中国健康云发现了一个不错的服务，赶快来看看吧，有优惠！一般人我不告诉他^_^', // 分享描述
							    link:  linkUrl,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: imgUrl1, // 分享图标
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
		beforeCreate(){
			let typeUrl = this.$route.query.typeUrl;
			if(typeUrl == "H5"){
//				this.couponMsgFn();
				this.openShow = true;
				 console.log("aaaaaaa")
				return;
			}  	
			
			this.$forceUpdate()
			
		},
		mounted(){
			//获取优惠劵信息
//			console.log(this.backgroundDiv1)
			if(this.urlType() == 'app' && this.couponId != ""){
				this.couponMsgFn();
				this.openShow = true;
				return;
			}
//			if(this.typeH5() == "H5" && this.couponId != ""){
//				this.couponMsgFn();
//				this.openShow = true;
//				return;
//			}
			this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "",jsonValue: '', infoType: 660305},{emulateJSON:true}).then( response => {
				var listLenth = response.body.couponExtensList.length;
				this.listMsg = response.body.couponExtensList;
				console.log(response.body)
				if(listLenth == 1){
					this.openShow = true;
					this.couponId = response.body.couponExtensList[0].couponId;
					this.couponMsgFn();
				}else if(listLenth == 0){
					this.noOpenShow = true;
				}else if(listLenth >= 2){
					this.OpenListShow = true;
					this.couponMsgFn();
				}
				
		    })
			
			
			
			
			
		}
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	.activeIndexs{
		background:  no-repeat;
		width: 100%;
		height: 100%;
		background-size: cover;
		margin:  0 auto;
		padding: 1px;
		background-position-y: -.6rem;
	}
	.activeImg{
		margin: 15% auto 0 auto;
		width: 80%;
		
	}
	.activeImg img{
		width: 100%;
	}
	.downSign{
		position: absolute;
		bottom: 0;
		color: #999;
		font-size: 0.22rem;
		width: 100%;
		text-align: center;
	}
	.activityRulesP{
		color: #999;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.6rem;
		margin-top: 0.2rem;
	}
	.getBtnRules{
		margin-top: 110% ;
	}
	/*活动时间*/
	.activityTime{
		text-align: center;
		font-size: 0.3rem;
		color: #565660;
		font-family: '微软雅黑';
		line-height: 0.8rem;
	}
	/*领取时间*/
	.getTime{
		text-align: center;
		font-size: 0.24rem;
		color: #565660;
		font-family: '微软雅黑';
		/*line-height: 0.5rem;*/
	}
	
	/*活动规则*/
	.rulesDiv{
		width: 90%;
		height: 80%;
		background: #fff;
		position: absolute;
		top: 10%;
		left: 5%;
		z-index: 3;
		border-radius: 10px;
		-webkit-border-radius: 10px;
		box-shadow: 0 0.1rem 5px #999;
	}
	.rulesDiv i{
		background: url(../../../assets/image/activities/close.png) no-repeat;
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		background-size:contain ;
		position: absolute;
		bottom: -0.3rem;
		left: 45%;
	}
	.shadeDiv{
		background: rgba(0,0,0,0.2);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		
	}
	.wordRulesDiv{
		width: 85%;
		height: 85%;
		margin: 7% auto 0 auto;
	}
	.rulesHeadP{
		font-size: 0.32rem;
		color: #56565d;
		text-align: center;
		line-height: 0.7rem;
	}
	.rulesUl{
		font-size: 0.26rem;
		color: #56565d;
		line-height: 0.5rem;
		height: 94%;
		overflow-y: scroll;
		
	}
	.noOpenimg{
		width: 20%;
		margin: 40% auto 0 auto;
	}
	.noOpenimg img{
		width: 100%;
	}
	.noOpenword{
		text-align: center;
		font-size: 0.4rem;
		margin: 0.1rem auto 0 auto;
		color: #333;
	}
	.goHome{
		font-size: 0.3rem;
		text-align: center;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		border: 1px solid #EFEFEF;
		width: 30%;
		line-height: 0.7rem;
		height: 0.7rem;
		margin: 0.1rem auto 0 auto;
		color: #666;
	}
	.noOpen{
		padding: 0.1rem;
	}
	/*list*/
	.listCoupon{
		width: 94%;
		margin: 0 auto;
	}
	.listCoupon li{
		margin: 3% auto 0 auto;
	}
	.listImg{
		width: 100%;
		margin: 0 auto;
	}
	.listImg img{
		width: 100%;
	}
	.couponDate{
		color: #333;
		font-size: 0.26rem;
	}
	.couponName{
		color: #666;
		font-size: 0.3rem;
	}
	.listCoupon a {
		width: 100%;
		height: 100%;
	}
</style>