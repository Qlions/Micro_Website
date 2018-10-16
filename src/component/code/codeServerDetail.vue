<template>
	<div id="serverDetail">
		<!--<Heads :title="titleName"></Heads>-->
		<header>
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<h2>{{ this.titleName}}</h2>
		</header>
		<Loading v-if="isLoading"></Loading>
		<div class="serDetail_content">
			<div class="server_img">
				<img v-for="item in imgList" :src="item" alt="" data-preview-src="" data-preview-group="1"/>
				<div class="imgCount" v-if="isMore">共{{ imgCount }}张图片</div>
			</div>
			<div class="server_info">
				<p class="server-name">{{ detailObj.serviceDictName }}</p>
				<div class="server-method clearfix">
					<p class="server-way"><img src="../../assets/image/server/server_method.png"/>{{ detailObj.serviceDictComponent == "F003" ? '电话咨询' : detailObj.serviceDictWay }}</p>
					<p class="server-time" v-if="detailObj.serviceDictTime != '' && detailObj.serviceDictTime != null"><img src="../../assets/image/server/server_time.png"/>{{ detailObj.serviceDictTime }}分钟</p>
				</div>
				<div class="server-case clearfix">
					<p class="server-num">服务 <span>{{ serviceNum }}</span> 人</p>
					<p class="server-score" v-if="detailObj.serviceScore != null"><span>{{ Number(detailObj.serviceScore).toFixed(0) }}%</span>好评</p>
				</div>
				<p class="server-source" v-if="!isShow"><img src="../../assets/image/server/serviceEa.png" alt="" />由 <span>{{ detailObj.eaName }}</span> 提供服务</p>
				<div @click="servicePlace" class="server-address" v-if="isAddress"><img src="../../assets/image/server/server-address.png" alt="" />{{ detailObj.serviceDictAddress }}</div>
				<div class="server-doctor-infos" v-if="isShow">
					<div class="server-doctor-pics">
						<img :src="docInfo.photosmall"/>
					</div>
					<div class="server-doctor-contents">
						<p class="server-doctor-names">{{ docInfo.name }}</p>
						<p class="server-doctor-works"><span>{{ docInfo.department?docInfo.department.split(',')[0]:'' }} </span> <span>{{ docInfo.proTitle?docInfo.proTitle.split(',')[0]:'' }}</span></p>
						<p class="server-doctor-places">{{ docInfo.hospital?docInfo.hospital.split(',')[0]:'' }}</p>
					</div>
				</div>
			</div>
			<div class="tab-btn">
				<ul>
					<li v-for="item in list" @click='conTab(item.serviceDictInfoOrder,item.serviceDictInfoContent)' :class="{'active':isActive == item.serviceDictInfoOrder}">{{ item.serviceDictInfoName }}</li>
				</ul>
			</div>
			<div class="server-tab-content">
				<iframe :src="serverTabContent" id="external-frame" frameborder="no"></iframe>
			</div>
			<div class="server-view-more">
				<div class="server-view-bar">
					<h2>购买须知与保障</h2>
					<router-link to="/server/serverNotice">查看更多</router-link>
				</div>
			</div>
			<div class="server-notice">
				<img src="../../assets/image/server/servicedetali_warm@2x.png" alt="" />
			</div>
			<div style="width: 100%;height: 0.94rem;"></div>
		</div>
		<div class="server-pay clearfix">
			<div class="server-price server-pay-area" v-if="isEqual">¥<span>{{ Number(serviceMoney) | LegalNumber}}</span></div>
			<div class="server-price server-pay-area" v-if="!isEqual">¥<span>{{ Number(detailObj.serviceMoneyMin) | LegalNumber}}</span> ~ ¥<span>{{ Number(detailObj.serviceMoneyMax) | LegalNumber}}</span></div>
			<div class="server-buy server-pay-area" v-if='type == "0"'>
				<a @click="goToConfirm">立即购买</a>
			</div>
			<div class="server-appiont server-pay-area" v-if='type == "1"'>
				<a @click="goToConfirm">立即预约</a>
			</div>
		</div>
	</div>
</template>
<script>
//	 import Heads from '../common/head.vue'
	 import Loading from '../common/loading.vue'
	 export default {
	 	data (){
	 		return {
	 			titleName:"服务详情",
	 			isActive: "0",
	 			serviceNum: "",
	 			isLoading:true,
	 			isShow: false,
	 			isAddress: false,
	 			isMore: false,
	 			isEqual: true,
	 			serverTabContent : "",
	 			serviceMoney:"",
	 			list:[],
	 			imgList:"",
	 			imgCount:"",
	 			test:"",
	 			detailObj:"",
	 			docInfo: "",
	 			serviceDictId :this.$route.query.id,
	 			type:this.$route.query.type
	 		}
	 	},
	 	components : {
//	 		Heads,
	 		Loading
	 	},
	 	methods:{
	 		initDetail(){
	 			let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
				let data = JSON.stringify({
					serviceDictId : this.$route.query.id
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111181, jsonValue:data},{emulateJSON:true}).then( response => {
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
					let protocol = window.location.protocol;
	 				let host = window.location.host;

					//测试环境地址
//					let urls = 'https://localtest.zgjky.cn'
					//正式环境地址
					let urls = '/iframeProxy'
					this.detailObj =  response.body[0];
					
					//判断图片是否多张
					this.imgList = this.detailObj.imgUrl.split(",");
					
					if(this.imgList.length > 1){
						this.isMore = true;
						this.imgCount = this.imgList.length;
					}else {
						this.isMore = false;
					}
					if(this.detailObj.serviceDictWay == "门诊(店)服务"){
						this.isAddress = true;
					}else {
						this.isAddress = false;
					}
					console.log(this.detailObj);
					if(this.detailObj.serviceDictComponent == 'F003'){
						this.$store.serviceType = "电话咨询"
					}else {
						this.$store.serviceType = this.detailObj.serviceDictWay
					}
					
					//判断服务人数
					if(this.$route.query.serviceId){
						let vm = this;
						let serviceId = vm.$route.query.serviceId;
						let data = JSON.stringify({
							serviceId : serviceId
						})
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111182, jsonValue:data},{emulateJSON:true}).then( response => {
							console.log("111182",response);
							console.log("从地址栏那价钱",vm.$route.query.money);
							vm.serviceMoney = vm.$route.query.money;
							vm.serviceNum = response.body.rows[0].serviceOrderNum;
						})
					}else {
						console.log("我要的渲染的",this.detailObj)
						//判断价格
						if(this.detailObj.serviceMoneyMin == this.detailObj.serviceMoneyMax){
							this.isEqual = true;
							this.serviceMoney = this.detailObj.serviceDictMoney;
						}else {
							this.isEqual = false;
						}
						this.serviceNum = this.detailObj.serviceOrderNum;
					}
										
					this.list = response.body[0].infoContent;
					this.serverTabContent = urls + this.list[0].serviceDictInfoContent;
					var that = this;
					document.getElementById("external-frame").onload = function(){
						that.setIframeHeight(document.getElementById("external-frame"))
					}
					
		
				});
				
				//清空vuex里面的数据
				this.$store.textInfo = ""
				this.$store.timeInfo = ""
				this.$store.state.imgArr = []
				this.$store.state.imgList = ""
				this.$store.state.mobile = ""
	 		},
	 		initDocInfo(){
	 			if(this.$route.query.docuserId){
	 				this.isShow = true
	 			}else {
	 				this.isShow = false
	 			}
	 			let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
	 			let data = JSON.stringify({
					userId : this.$route.query.docuserId
				})
	 			this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:660101,jsonValue: data},{emulateJSON: true}).then( response =>{
	 				console.log("医生信息",response);
	 				this.docInfo = response.body
	 			})
	 		},
	 		conTab(indexs,content) {
	 			//测试环境地址
//	 			let urls = 'https://localtest.zgjky.cn';
	 			//正式环境地址
	 			let urls = 'http://www.zgjky.cn'
	 			this.isActive = indexs;
	 			this.serverTabContent = urls + content;	 			
	 		},
	 		backToIndex(){
	 			if(this.$route.query.docuserId){
	 				let docuserId = this.$route.query.docuserId
	 				console.log(docuserId);
	 				this.$router.push({path:"/doctor/doctorAuthorized",query:{docuserId:docuserId}})
	 			}else {
	 				this.$router.go(-1);
	 			}

	 		},
	 		goToConfirm(){
	 			let money = this.detailObj.serviceDictMoney;
	 			if(this.$route.query.docuserId){
	 				let docuserId = this.$route.query.docuserId;
	 				let serviceId = this.$route.query.serviceId
		 			this.$router.push({path:"/serverDetail/serverConfirm",query:{id:this.serviceDictId,type:this.detailObj.serviceDictReservation,docuserId:docuserId,serviceId:serviceId,money:money}})
	 			}else {
		 			this.$router.push({path:"/serverDetail/serverConfirm",query:{id:this.serviceDictId,type:this.detailObj.serviceDictReservation}})
	 			}
	 		},
	 		servicePlace(){
	 			let data = this.detailObj;
	 			let lat = data.latitude;
	 			let lon = data.longitude;
	 			let address = data.serviceDictAddress;
	 			let serviceName = data.eaName;
	 			let bell = data.eaTel;
	 			let addressInfo = {
	 				serviceName : serviceName,
	 				lat : lat,
	 				lon : lon,
	 				address : address,
	 				bell : bell
	 			}
	 			console.log(addressInfo);
	 			this.$store.state.serverAddress = addressInfo;
	 			this.$router.push({path:"/server/serverPlace"});
	 		},
	 		setIframeHeight(iframe){
		 		let h = document.getElementById('external-frame').contentWindow.document.body.scrollHeight;
		 		iframe.height = h;
			}	
	 	},
	 	created(){
	 		mui.previewImage();
	 	},
	 	mounted(){
	 		this.initDetail();
	 		this.initDocInfo()
	 		
    	}
	 }
</script>

<style>
	#serverDetail{
		padding-top: 0rem;
	}
	#serverDetail header{
		position:fixed;
		top: 0;
		z-index: 2;
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	#serverDetail header b{
		text-align: center;
		width: 0.8rem;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0;
	}
	#serverDetail header img{
		width: 60%;
		margin-top: 15%;
	}
	#serverDetail header h2{
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	
	.serDetail_content{
		width: 100%;
		background-color: #f3f3f3;
	}
	.server_img{
		width: 100%;
		height: 4.84rem;
		background: #fff;
		overflow: hidden;
		position: relative;
	}
	.server_img .imgCount{
		position: absolute;
		width: 2.26rem;
		border-radius: 5px;
		height: 0.47rem;
		background: url(../../assets/image/server/img_icon.png) #4c4c4c no-repeat left 0.3rem center ;
		background-size: 12%;
		right: 0.36rem;
		bottom: 0.3rem;
		z-index: 10;
		color: #fff;
		font-size: 0.24rem;
		line-height: 0.47rem;
		text-indent: 0.76rem;
	}
	.server_img img{
		display: block;
		width: 100%;
		border: 0 none;
	}
	.server_info {
		width: 100%;
		/*padding-left: 0.3rem;*/
		padding-top: 0.28rem;
		background: #fff;
	}
	.server_info .server-name{
		font-size: 0.28rem;
		color: #333;
		padding: 0 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} 
	.server_info .server-method{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.15rem;
		margin-left: 0.3rem;
	}
	
	.server-method .server-way{
		float: left;
		color: #999;
	}
	.server-method .server-way img{
		width: 0.32rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	.server-method .server-time{
		float: left;
		color: #999;
	}
	.server-method .server-time img{
		width: 0.32rem;
		vertical-align: middle;
		margin-left: 0.15rem;
		margin-right: 0.08rem;
	}
	.server_info .server-case{
		margin-top: 0.3rem;
		margin-bottom: 0.25rem;
		margin-left: 0.3rem;
	} 
	.server_info .server-num {
		color: #8c8f8f;
		font-size: 0.24rem;
		float: left;
	}
	.server_info .server-score{
		color: #8c8f8f;
		font-size: 0.24rem;
		float: right;
		margin-right: 0.3rem;
	}
	.server_info .server-score span{
		color: orange;
		margin-right: 0.04rem;
	}
	.server_info .server-num span{
		color: #555;
	}
	.server_info .server-source{
		width: 92%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-top: 0.01rem solid #efefef;
		color: #a1a1a1;
		font-size: 0.23rem;
		padding: 0.16rem 0;
		margin: 0 auto;
	}
	.server-source img{
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	.server_info .server-address{
		/*width: 96%;*/
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/*border-top: 0.01rem solid #efefef;*/
		color: #a1a1a1;
		font-size: 0.23rem;
		padding: 0.1rem 0.6rem 0.16rem 0.3rem;
		/*margin-left: 0.3rem;*/
		background: url(../../assets/image/server/server-right.png) no-repeat right 0.3rem center;
		background-size: 2%;
		display: block;
	}
	.server-address img{
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	.server-address span{
		color: #494949;
	}
	.tab-btn {
		width: 100%;
		margin-top: 0.12rem;
		background: #fff;
	}
	.tab-btn ul{
		width: 100%;
		display: -webkit-flex;
	}
	.tab-btn ul li{
		flex: 1;
		font-size: 0.28rem;
		height: 0.8rem;
		border-bottom: 0.04rem solid #fff;
		text-align: center;
		line-height: 0.8rem;
		color: #555;
	}
	.tab-btn ul li.active{
		color: #439685;
		border-bottom: 0.04rem solid #439685;
	}
	.server-tab-content{
		padding-left: 4%;
		padding-right: 4%;
		padding-top: 0.3rem;
		/*padding-bottom: 0.95rem;*/
		word-break: break-word;
		background: #fff;
	}
	.server-tab-content iframe{
		width: 100%;
		/*height: 100%;*/
		border: 0 none;
		display: block;
		/*overflow-y: scroll;*/
	}
	.server-view-more{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.7rem;
		background: #fff;
		margin-top: 0.12rem;
	}
	.server-view-more .server-view-bar{
		width: 100%;
		height: 0.7rem;
		border-bottom: 0.02rem solid #efefef;
	}
	.server-view-more h2{
		float: left;
		height: 100%;
		font-size: 0.24rem;
		color: #4a4d4a;
		line-height: 0.7rem;
	}
	.server-view-more a{
		float: right;
		height: 100%;
		padding-right: 0.3rem;
		line-height: 0.7rem;
		font-size: 0.24rem;
		color: #a3a3a3;
		background: url(../../assets/image/server/server-right.png) no-repeat right center;
		background-size: 9%;
	}
	.server-notice{
		width: 100%;
	}
	.server-notice img{
		width: 100%;
		display: block;
		border: 0 none;
	}
	.server-pay{
		width: 100%;
		height: 0.94rem;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.server-pay .server-pay-area{
		width: 50%;
		float: left;
		height: 100%;
	}
	.server-pay .server-buy{
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.94rem;
		text-align: center;
		background: #009984;
	}
	.server-pay .server-appiont{
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.94rem;
		text-align: center;
		background: #ff9600;
	}
	.server-pay .server-price{
		font-size: 0.2rem;
		color: #ff5454;
		text-align: center;
		line-height: 0.94rem;
		background: #fafafa;
	}
	.server-pay .server-price span{
		font-size: 0.36rem;
		font-weight: bold;
		margin-left: 0.1rem;
	}
	.server-pay .server-pay-area a{
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: #fff;
	}
	
	.server-doctor-infos{
		padding-left: 0.3rem;
		padding-top: 0.3rem;
		border-top: 0.1rem solid #f5f5f5;
		padding-bottom: 0.3rem;
	}
	.server-doctor-infos .server-doctor-pics{
		width: 1.3rem;
    	height: 1.3rem;
    	float: left;
	}
	.server-doctor-infos .server-doctor-pics img{
		display: block;
	    width: 100%;
	    height: 100%;
	    border: 0 none;
	    border-radius: 100%;
	}
	.server-doctor-contents{
		float: left;
    	padding-left: 0.3rem;
   		width: 80%;
	}
	.server-doctor-contents .server-doctor-names{
		font-size: 0.28rem;
	    color: #000;
	    letter-spacing: 0.02rem;
	    margin-top: 0.1rem;
	}
	.server-doctor-contents .server-doctor-works{
		font-size: 0.24rem;
	    margin-top: 0.08rem;
	    color: #777777;
	}
	.server-doctor-contents .server-doctor-places{
		font-size: 0.24rem;
    	color: #858585;
	}
	
	
	/*mui样式*/
	
	.server-topBar{
		position: absolute;
		width: 100%;
		left: 0;
		height: 44px;
		background: #000;
		background: url(../../assets/image/head-back.png) no-repeat #000 left 0.1rem center;
		background-size: 7%;
		text-align: center;
		line-height: 44px;
		color: #fff;
		font-size: 18px;
	}
	.mui-preview-image.mui-fullscreen {
		position: fixed;
		z-index: 20;
		background-color: #000;
	}
	.mui-preview-header,
	.mui-preview-footer {
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 10;
	}
	.mui-preview-header {
		height: 44px;
		bottom: 50px;
	}
	.mui-preview-footer {
		height: 50px;
		bottom: 0px;
	}
	.mui-preview-header .mui-preview-indicator {
		display: block;
		line-height: 25px;
		color: #fff;
		text-align: center;
		margin: 15px auto 0;
		width: 70px;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 12px;
		font-size: 16px;
	}
			
	.mui-preview-image {
		display: none;
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	.mui-preview-image.mui-preview-in {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}
	.mui-preview-image.mui-preview-out {
		background: none;
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}
	.mui-preview-image.mui-preview-out .mui-preview-header,
	.mui-preview-image.mui-preview-out .mui-preview-footer {
		display: none;
	}
	.mui-zoom-scroller {
		position: absolute;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		-webkit-backface-visibility: hidden;
	}
	.mui-zoom {
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}
	.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
		width: 100%;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
		display: inline-table;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
		display: table-cell;
		vertical-align: middle;
	}
	.mui-preview-loading {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: none;
	}
	.mui-preview-loading.mui-active {
		display: block;
	}
	.mui-preview-loading .mui-spinner-white {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -25px;
		margin-top: -25px;
		height: 50px;
		width: 50px;
	}
	.mui-preview-image img.mui-transitioning {
		-webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
		transition: transform 0.5s ease, opacity 0.5s ease;
	}
	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.mui-fullscreen {
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	}
	.mui-slider {
	    position: relative;
	    z-index: 1;
	    overflow: hidden;
	    width: 100%;
	}
	.mui-fullscreen.mui-slider .mui-slider-group {
    	height: 100%;
	}
	.mui-slider .mui-slider-group {
	    font-size: 0;
	    position: relative;
	    -webkit-transition: all 0s linear;
	    transition: all 0s linear;
	    white-space: nowrap;
	}
	.mui-hidden {
	    display: none!important;
	}
	.mui-slider .mui-slider-group .mui-slider-item {
	    font-size: 14px;
	    position: relative;
	    display: inline-block;
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	    white-space: normal;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
	    width: 100%;
	}
</style>