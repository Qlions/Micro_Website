<template>
	<div class="a" style="position: relative;">
		
		<div class="getCoupon" :style="{backgroundImage: 'url(' +extensionSiteBgFileUrl2+ ')'}" id="bg" style="width: 100%; height: 100%; position: fixed; top: 0;z-index: 1;">
			
			<div class="couponImg" >
				<!--<img src="../../../assets/image/activities/getPage.png"/>-->
				<p class="percentGet">已领取&nbsp;<i>{{ percentNum }}%</i></p>
			</div>
			<div class="inputDv" :style="{backgroundImage: 'url(' +extensionSiteBgFileUrl2+ ')'}">
				<div class="getBtn">
					<i>手机号</i>
					<input type="tel"  @blur="blurFn"  @focus="fousFn"  v-model="mobileVal"/>
				</div>
				<div class="getBtns"></div>
				<div class="getBtn" >
					<i>验证码</i>
					<input type="text" @blur="blurFn" @focus="fousFn" class="codeInput" v-model="mobileCode"/>
					<span style="	border-left: 1px solid #e6e6e6;"></span>
					<span class="codeBtn" v-if="clickWord" @click="getMobileCode">{{ CWord }}</span>
					<span class="codeBtn" v-else>{{ num }}s</span>
				</div>
				<div class="getBtns" ></div>
				<span @click="getCouponFn">
					<Getmsg class="" :Atext="Atext" :Ahref= "Ahref" ></Getmsg>
				</span>
				<div class="getBtns"></div>
				<p class="activityRulesP" @click="oNOffRules">活动规则</p>
				
			</div>
			<!--<span class="getCoupon"  style="background: red;">
				<img src="../../../assets/image/activities/getBG.png" alt="" />
			</span>-->
		
		</div>
		
		<p class="downSign" v-if="downSign">Copyright © 2016 中国健康云 All Rights Reserved.</p>
		
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
		<popup :sucMessage= "sucMessage" v-show="maskShow"></popup>
	</div>
</template>

<script>
	import Getmsg from "../activitiesCom/btn.vue"
	import popup from "../activitiesCom/popUp.vue"
	export default {
		data(){
			return {
				Ahref: "javascrit:;",
				Atext: "免费领取",
				CWord: '获取',
				sucMessage: '',
				rulesShow: false,
				downSign: true,
				num: 60 ,
				clickWord: true,
				mobileVal: "",
				mobileCode: "",
				couponMsg: '',
				percentNum: this.$route.query.percentNum,
				resCouponId: '',
				maskShow: false,
				couponId: this.$route.query.couponId,
				extensionSiteBgFileUrl2: ""
			}
		},
		components:{
			Getmsg,
			popup
		},
		methods:{
			oNOffRules() {
				if(!this.rulesShow){
					this.rulesShow = true;
				}else{
					this.rulesShow = false;
				}
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
			blurFn(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					this.downSign = true;
				 	document.getElementById("bg").style.top = "0%";
				}
			},
			numCode(){
				this.clickWord = false;
				var numccode = setInterval( () => {
					this.num--
					if(this.num < 0){
						clearInterval(numccode);
						this.CWord = "重发";
						this.num = 60;
						this.clickWord = true;
						return false;
					}
				}, 1000);
				return false;
			},
			//获取验证码
			getMobileCode(){
				if(this.mobileVal == "" || this.mobileVal == null || this.mobileVal.length != 11 ){
					console.log(this.mobileVal.length != 11)
					this.maskShow = true;
					this.sucMessage = "您输入的手机号有误";
					setTimeout( () => {
						this.maskShow = false;
					}, 800)
					return false;
				}
				
				let mobileData = JSON.stringify({
					mobile: this.mobileVal,
					msgType: 2,
					couponId: this.couponId
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "1",jsonValue: mobileData, infoType: 660118},{emulateJSON:true}).then( response => {
					console.log(response.body.state);
					this.maskShow = true;
					switch (response.body.state){
						case 'suc':
							this.sucMessage = "发送成功";
							this.numCode();
							break;
						case 'err-01':
							this.sucMessage = "电话为空";
							break;
						case 'err-02':
							this.sucMessage = "验证码每天不得超过5条";
							break;
						case 'err-04':
							this.sucMessage = "验证码发送间隔不小于1分钟";
							break;
						case 'err-05':
							this.sucMessage = "已领取过该优惠券";
							setTimeout( () => {
								this.$router.push({ path: "./getSuc", query: { res: response.body.state}})
							}, 200)
							break;
						default:
							
							break;
					}
					setTimeout( () => {
						this.maskShow = false;
					}, 800)
				})
				
			},
			//领取优惠劵
			getCouponFn(){
				if(this.mobileVal == "" || this.mobileVal == null || this.mobileVal.length != 11){
					console.log(this.mobileVal.length != 11)
					this.maskShow = true;
					this.sucMessage = "您输入的手机号有误";
					setTimeout( () => {
						this.maskShow = false;
					}, 800)
					return false;
				}
				let mobileData = JSON.stringify({
					username: this.mobileVal,
					mobileCode: this.mobileCode,
					couponId: this.couponId
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "1",jsonValue: mobileData, infoType: 660119},{emulateJSON:true}).then( response => {
					console.log(response);
					
					
					console.log(response.body.message.indexOf('手机验证码错误'))
					
					if(response.body.state == "suc"){
						setTimeout( () => {
							this.$router.push({ path: "./getSuc", query: { res: "suc"}})
						}, 200)
					}else if(response.body.message.indexOf('领取失败') >= 0){
						setTimeout( () => {
							this.$router.push({ path: "./getSuc", query: { res: "getFail"}})
						}, 200)
						
					}else if(response.body.message.indexOf('已领取过该优惠券') >= 0){
						setTimeout( () => {
							this.$router.push({ path: "./getSuc", query: { res: "err-05"}})
						}, 200)
						
					}else if(response.body.message.indexOf('优惠券数量不足') >= 0){
//						setTimeout( () => {
//							this.$router.push({ path: "./getSuc", query: { res: "notLength"}})
//						}, 200)
						
					}else if(response.body.message.indexOf('手机验证码错误') >= 0){
						this.maskShow = true;
						this.sucMessage = '手机验证码错误';
					}else if(response.body.message.indexOf('手机验证码超时') >= 0){
						this.maskShow = true;
						this.sucMessage = '手机验证码错误';
						
					}
					setTimeout( () => {
						this.maskShow = false;
					}, 800)
				})
			},
			//获取优惠券信息
			couponMsgFn(){
				console.log(this.couponId)
				let couponMsgStr = JSON.stringify({
					serviceType: 1,
					opType: 1,
					couponId: this.couponId
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "1",jsonValue: couponMsgStr, infoType: 660301},{emulateJSON:true}).then( response => {
					console.log(response);
					this.couponMsg = response.body.rows;
					for(var i = 0; i < this.couponMsg.length; i++){
						this.extensionSiteBgFileUrl2 = this.couponMsg[i].extensionSiteBgFileUrl2;
					}
					
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
			
			
		},
		mounted (){
			this.couponMsgFn();
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			
			//处理安卓 input
			if(isAndroid){
				var winHeight = $(window).height();   //获取当前页面高度
				$(window).resize(function(){
				   var thisHeight=$(this).height();
				    if(winHeight - thisHeight >50){
				         //当软键盘弹出，在这里面操作
				         this.downSign = false;
						document.getElementById("bg").style.top = "-4.5rem";
				    }else{
				        //当软键盘收起，在此处操作
				        this.downSign = false;
						document.getElementById("bg").style.top = "0%";
				    }
				})
			}
			
			
		}
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	html{
		/*background: url(../../../assets/image/activities/bigbg2.png) no-repeat;*/
		background-size: cover;
	}
	.a{
		width: 100%;
		height: 100%;
	}
	.inputDv{
		background:  no-repeat;
		background-position-y: 60% ;
		background-size:cover ;
		
	}
	.getCoupon{
		/*background: url(../../../assets/image/activities/bigbg2.png) no-repeat;*/
		width: 100%;
		height: 100%;
		background-size: cover;
		margin:  0 auto;
		display: inline-block;
		position: absolute;
		bottom: 0;
		z-index: -1;
	}
	.getCoupon img{
		width: 100%;
		height: 100%;
	}
	.couponImg{
		margin: 0 auto 0 auto;
		padding-top: 76%;
		width: 60%;
	}
	.couponImg img{
		width: 100%;
	}
	.percentGet{
		text-align: center;
		font-size: 0.32rem;
		position: relative;
		top: -0.45rem;
		width: 100%;
		color: #56565d;
	}
	.percentGet i{
		color: #f93946;
	}
	/*输入框*/
	.getBtn {
		width: 72%;
		text-align: center;
		background: #fff;
		border: 1px solid #e6e6e6;
		color: #565660;
		line-height: 0.8rem;
		border-radius: 0.8rem;
		margin:  0 auto 0 auto;
		font-size: 0.36rem;
		
	}
	.getBtn input {
		width: 60%;
		color: #565660;		
		height: 90%;
		margin-top:3% ;
	}
	.codeInput{
		width: 40% !important;
		float: none !important;
	}
	.codeBtn{
		font-size: 0.26rem;
		float: right;
		display: inline-block;
		width: 19%;
		text-align: left;
		color: #565660;
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
</style>