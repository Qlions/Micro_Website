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
				<div class="server_img_box_content" v-for="item in imgList">
					<img :src="item" alt="" data-preview-src="" data-preview-group="1" />
				</div>
				<div class="imgCount" v-if="isMore">共{{ imgCount }}张图片</div>
			</div>
			<div class="server_info">
				<p class="server-name">{{ detailObj.serviceDictName }}</p>
				<div class="server-method clearfix">
					<p class="server-way"><img src="../../assets/image/server/server_method.png" />{{ detailObj.serviceDictComponent == "F003" ? '电话咨询' : detailObj.serviceDictWay }}</p>
					<p class="server-time" v-if="detailObj.serviceDictTime != '' && detailObj.serviceDictTime != null"><img src="../../assets/image/server/server_time.png" />{{ detailObj.serviceDictTime }}分钟</p>
				</div>
				<div class="server-case clearfix">
					<p class="server-num">服务 <span>{{ serviceNum }}</span> 人</p>
					<p class="server-score" v-if="detailObj.serviceScore != null" @click="server_eva">好评度<span>{{ Number(detailObj.serviceScore).toFixed(0) }}%</span><img src="../../assets/image/server/ARROW.png"></p>
				</div>
				<p class="server-source" v-if="!isShow"><img src="../../assets/image/server/serviceEa.png" alt="" />由 <span>{{ detailObj.eaName }}</span> 提供服务</p>
				<div @click="servicePlace" class="server-address" v-if="isAddress">
					<img src="../../assets/image/server/server-address.png" class="img-icon" />
					{{ addressName }}
					<img src="../../assets/image/server/server-right.png" v-if="isMoreAddr" class="server-right"/>
				</div>
				<div class="server-doctor-infos" v-if="isShow">
					<div class="server-doctor-pics">
						<img :src="docInfo.photosmall" />
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
				<a @click="goToConfirm" v-if="serviceDictJu == 0">立即购买</a>
				<a v-if="serviceDictJu == 1" class="serviceDictIsDel">立即购买</a>
			</div>
			<div class="server-appiont server-pay-area" v-if='type == "1"'>
				<a @click="goToConfirm" v-if="serviceDictJu == 0">立即预约</a>
				<a v-if="serviceDictJu == 1" class="serviceDictIsDel">立即预约</a>
			</div>
		</div>
		<sign-mask v-on:sign-event="signEvent" v-if="isSign"></sign-mask>
		<wait-audit v-on:wait-event="waitEvent" v-if="isWait"></wait-audit>
		<team-sign v-on:team-event="teamEvent" v-if="isTeam"></team-sign>
	</div>
</template>
<script>
	//	 import Heads from '../common/head.vue'
	import AMap from 'AMap'
	import Loading from '../common/loading.vue'
	import signMask from '../common/serviceSignTip.vue'
	import waitAudit from '../common/waitAudit.vue'
	import teamSign from '../common/teamSign.vue'
	export default {
		data() {
			return {
				titleName: "服务详情",
				isActive: "0",
				serviceNum: "",
				addressName: "",
				isSign: false,
				isWait: false,
				isTeam: false,
				isLoading: true,
				isShow: false,
				isAddress: false,
				isMoreAddr:false,
				isMore: false,
				isEqual: true,
				lat: "",
				lon: "",
				serverTabContent: "",
				serviceMoney: "",
				list: [],
				imgList: "",
				imgCount: "",
				test: "",
				detailObj: "",
				docInfo: "",
				doctorInfo: "",
				serviceDictId: this.$route.query.id,
				type: this.$route.query.type,
				serviceDictIsDel:"",
				serviceDictState:"",
				serviceState:"",
				serviceIsDel:"",
				serviceDictJu:""
			}
		},
		components: {
			Loading,
			signMask,
			waitAudit,
			teamSign
		},
		methods: {
			initDetail() {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				let data = JSON.stringify({
					serviceDictId: this.$route.query.id,
					isDel:"1"
				})
				console.log(this.$route.query.id)
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111181,jsonValue: data}, {emulateJSON: true}).then(response => {
					console.log(response)
					setTimeout(() => {
						this.isLoading = false;
					}, 500)
					let protocol = window.location.protocol;
					let host = window.location.host;
					//判断是否锁定与删除
					this.serviceDictIsDel = response.body[0].serviceDictIsDel;

					this.serviceDictState = response.body[0].serviceDictState;
					if ( this.serviceDictIsDel == 0 && this.serviceDictState == 1 ) {
						this.serviceDictJu = 0;	
					}else if( this.serviceDictIsDel == 0 && this.serviceDictState == 0 ){
						this.serviceDictJu = 1;	
					}else {
						this.serviceDictJu = 0;	
					}
					//测试环境地址
					//let urls = 'https://localtest.zgjky.cn'
					//正式环境地址
					let urls = '/iframeProxy'
					this.detailObj = response.body[0];
					console.log("this.detailObj",this.detailObj);

					//判断图片是否多张
					this.imgList = this.detailObj.imgUrl.split(",");

					if(this.imgList.length > 1) {
						this.isMore = true;
						this.imgCount = this.imgList.length;
					} else {
						this.isMore = false;
					}
					if(this.detailObj.serviceDictWay == "门诊(店)服务" || this.detailObj.serviceDictWay == "综合服务") {
						this.isAddress = true;
						let vm = this;
						let eaId = window.sessionStorage.getItem("server_eaId");
						let addressData = JSON.stringify({
							serviceDictId : this.$route.query.id,
							lat: this.lat,
							lon: this.lon,
							opType: "1"
						})
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111177,jsonValue: addressData}, {emulateJSON: true}).then(response => {
							console.log(response);
							if(response.body.rows.length > 1){
								vm.isMoreAddr = true;
							}else {
								vm.isMoreAddr = false;
							}
							if(eaId == null){
								vm.addressName = response.body.rows[0].eaAddressDetail;
							}else {
								let arr = response.body.rows;
								let num = 0;
								for(var i = 0;i < arr.length;i ++){
									if(eaId == arr[i].eaId){
										vm.addressName = response.body.rows[i].eaAddressDetail;
										break;
									}else {
										num ++;
									}
								}
								if(num == arr.length){
									vm.addressName = response.body.rows[0].eaAddressDetail;
								}
								
							}
						})
					} else {
						this.isAddress = false;
					}
//					console.log(this.detailObj);
					if(this.detailObj.serviceDictComponent == 'F003') {
						this.$store.serviceType = "电话咨询"
					} else {
						this.$store.serviceType = this.detailObj.serviceDictWay
					}

					//判断服务人数
					if(this.$route.query.serviceId) {
						let vm = this;
						let serviceId = vm.$route.query.serviceId;
						let data = JSON.stringify({
							serviceId: serviceId,
							isDel:"1"
						})
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {
							token: token,
							infoType: 111182,
							jsonValue: data
						}, {
							emulateJSON: true
						}).then(response => {
							console.log(response);
							this.doctorInfo = response.body;
							let relationEaId = response.body.rows[0].relationEaId;
							sessionStorage.setItem("server_relationEaId",relationEaId)
							this.serviceIsDel = response.body.rows[0].serviceIsDel;
							this.serviceState = response.body.rows[0].serviceState;
							if ( this.serviceDictIsDel == 0 && this.serviceDictState == 1 ) {
								if(this.serviceIsDel == 1 && this.serviceState == 1 ){
									this.serviceDictJu = 1;
								}else {
									this.serviceDictJu = 0;
								}	
							}else {
								if(this.serviceIsDel == 1 && this.serviceState == 0 ){
									this.serviceDictJu = 1;
								}else {
									this.serviceDictJu = 0;
								}
							}
				//							console.log("111182", response);
//							console.log("从地址栏那价钱", vm.$route.query.money);
							vm.serviceMoney = vm.$route.query.money;
							vm.serviceNum = response.body.rows[0].serviceOrderNum;
						})
					} else {
//						console.log("我要的渲染的", this.detailObj)
						//判断价格
						if(this.detailObj.serviceMoneyMin == this.detailObj.serviceMoneyMax) {
							this.isEqual = true;
							this.serviceMoney = this.detailObj.serviceDictMoney;
						} else {
							this.isEqual = false;
						}
						this.serviceNum = this.detailObj.serviceOrderNum;
					}

					this.list = response.body[0].infoContent;
					this.serverTabContent = urls + this.list[0].serviceDictInfoContent;
//					console.log(this.serverTabContent);
					var that = this;
					document.getElementById("external-frame").onload = function() {
						that.setIframeHeight(document.getElementById("external-frame"))
					}

				});
				

				//清空vuex里面的数据
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.imgArr = [];
				this.$store.state.imgList = "";
				this.$store.state.mobile = "";
				window.localStorage.removeItem("passValue");
			},
			getPosition(){
				let vm = this;
				var mapObj = new AMap.Map('iCenter');
				mapObj.plugin('AMap.Geolocation', function () {
				    var geolocation = new AMap.Geolocation({
				        enableHighAccuracy: true,//是否使用高精度定位，默认:true
				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				    });
				    mapObj.addControl(geolocation);
				    geolocation.getCurrentPosition();
				    AMap.event.addListener(geolocation, 'complete', function(res){
				    	console.log(res);
				    	vm.lat = res.position.lat;
						vm.lon = res.position.lng;
						vm.initDetail();
						vm.initDocInfo();
						vm.saveInfo(vm.lat,vm.lon);
				    });//返回定位信息
				    AMap.event.addListener(geolocation, 'error', function(err){
				    	console.log(err)
				    	vm.initDetail();
						vm.initDocInfo()
				    });      //返回定位出错信息
				});
			},
			getPositions(){
				let vm = this;
				let data = JSON.parse(window.sessionStorage.getItem("localInfo"));
				if(data == null){
					vm.getPosition();
				}
				vm.lat = data.lat;
				vm.lon = data.lon;
				vm.initDetail();
				vm.initDocInfo();
			},
			initDocInfo() {
				if(this.$route.query.docuserId) {
					this.isShow = true
				} else {
					this.isShow = false;
					
				}
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				let data = JSON.stringify({
					userId: this.$route.query.docuserId,
					'ignoreLogin': '1'
				})
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {
					token: token,
					infoType: 660101,
					jsonValue: data
				}, {
					emulateJSON: true
				}).then(response => {
					console.log("医生信息", response);
					if(response.body.returnState == 'err_userDoctor_003'){
						this.isShow = false;
					}else {
						this.docInfo = response.body;
					}
				})
			},
			conTab(indexs, content) {
				let vm = this;
				//测试环境地址
				//	 			let urls = 'https://localtest.zgjky.cn';
				//正式环境地址
				let urls = '/iframeProxy';
				this.isActive = indexs;
				this.serverTabContent = urls + content;
				document.getElementById("external-frame").onload = function() {
					vm.setIframeHeight(document.getElementById("external-frame"))
				}
			},
			backToIndex() {
				this.$router.go(-1);
				window.sessionStorage.removeItem("server_eaId");
			},
			goToConfirm() {
				const isSign = this.detailObj.reservationValid;
				const signState = this.detailObj.signState;
				console.log(isSign);
				console.log(signState);
				console.log(this.isShow);
				if(isSign.includes('yyyz6')){
					if(this.isShow){
						if(signState == '0') {//未签约
							this.isSign = true;
							return false;
						}
						if(signState == '1'){
							if(this.$route.query.docuserId) {
								this.isTeam = true;
								return false;
							}
						}
						if(signState == '3'){//等待审核
							this.isWait = true;
							return false;
						}
					}
				}
				let money = this.detailObj.serviceDictMoney;
				if(this.$route.query.docuserId) {
					if(this.type == 1 ){
						let docuserId = this.$route.query.docuserId;
						let serviceId = this.$route.query.serviceId
						this.$router.push({
							path: "/serverDetail/serverConfirm",
							query: {
								id: this.serviceDictId,
								type: this.detailObj.serviceDictReservation,
								docuserId: docuserId,
								serviceId: serviceId,
								money: money
							}
						})
					}else {
						let docuserId = this.$route.query.docuserId;
						let serviceId = this.$route.query.serviceId
						this.$router.push({
							path: "/serverDetail/serverConfirm",
							query: {
								id: this.serviceDictId,
								type: this.detailObj.serviceDictReservation,
								docuserId: docuserId,
								serviceId: serviceId,
								money: money
							}
						})
					}
					
				} else {
					this.$router.push({
						path: "/serverDetail/serverConfirm",
						query: {
							id: this.serviceDictId,
							type: this.detailObj.serviceDictReservation,
							money: money
						}
					})
				}
			},
			servicePlace() {
				let vm = this;
				let id = vm.$route.query.id;
				let lat = vm.lat;
				let lon = vm.lon;
				
				console.log(id);
				console.log(lat);
				console.log(lon);
				this.$router.push({
					path: "/server/serverPlace",
					query:{id:id,lat:lat,lon:lon}
				});
			},
			server_eva(){
				this.$router.push({
					path: "/serverDetail/serverEva",
					query:{id:this.serviceDictId}
				});
			},
			saveInfo(lat,lon){
				//存储经纬度到本地
				let local = window.sessionStorage;
				let data = JSON.stringify({
					lat:lat,
					lon:lon
				});
				local.setItem("localInfo",data);
			},
			setIframeHeight(iframe) {
				let iframeImg = document.getElementById('external-frame').contentWindow.document.body.getElementsByTagName("img");
				for(let i = 0; i < iframeImg.length; i++) {

					iframeImg[i].src = "/iframeProxy/upload" + iframeImg[i].src.split("/upload")[1];
				}
				let h = document.getElementById('external-frame').contentWindow.document.body.scrollHeight;
				//		 		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
				//					if (iframeWin.document.body) {
				//						iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
				//					}
				iframe.height = h;

			},
			signEvent(data) {
				this.isSign = data;
			},
			waitEvent(data){
				this.isWait = data;
			},
			teamEvent(data){
				this.isTeam = data;
			}
		},
		created() {
			mui.previewImage();
		},
		mounted() {
			this.getPositions();
//			this.getPosition();
		},
		destroyed(){
			mui.previewImage().close();
		}
	}
</script>

<style>
	#serverDetail {
		padding-top: 0rem;
	}
	#serverDetail .loading{
		z-index: 9;
	}	
	#serverDetail header {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	
	#serverDetail header b {
		text-align: center;
		width: 0.8rem;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0;
	}
	
	#serverDetail header img {
		width: 60%;
		margin-top: 24%;
	}
	
	#serverDetail header h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	
	.serDetail_content {
		width: 100%;
		background-color: #f3f3f3;
		/*margin-top: .84rem;*/
	}
	
	.server_img {
		width: 100%;
		height: 4.84rem;
		background: #fff;
		overflow: hidden;
		position: relative;
	}
	
	.server_img .imgCount {
		position: absolute;
		width: 2.26rem;
		border-radius: 5px;
		height: 0.47rem;
		background: url(../../assets/image/server/img_icon.png) #4c4c4c no-repeat left 0.3rem center;
		background-size: 12%;
		right: 0.36rem;
		bottom: 0.3rem;
		z-index: 10;
		color: #fff;
		font-size: 0.24rem;
		line-height: 0.47rem;
		text-indent: 0.76rem;
	}
	
	.server_img_box_content {
		width: 100%;
		height: 100%; 
	}

	.server_img_box_content img {
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
	
	.server_info .server-name {
		font-size: 0.28rem;
		color: #333;
		padding: 0 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.server_info .server-method {
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.15rem;
		margin-left: 0.3rem;
	}
	
	#serverDetail .server-method .server-way {
		float: left;
		color: #616161;
	}
	
	.server-method .server-way img {
		width: 0.32rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	
	.server-method .server-time {
		float: left;
		color: #999;
	}
	
	.server-method .server-time img {
		width: 0.32rem;
		vertical-align: middle;
		margin-left: 0.15rem;
		margin-right: 0.08rem;
	}
	
	.server_info .server-case {
		margin-top: 0.3rem;
		margin-bottom: 0.25rem;
		margin-left: 0.3rem;
	}
	
	.server_info .server-num {
		color: #565656;
		font-size: 0.24rem;
		float: left;
	}
	
	.server_info .server-score {
		color: #8c8f8f;
		font-size: 0.24rem;
		float: right;
		margin-right: 0.3rem;
	}
	.server-score img {
    width: 0.32rem;
    vertical-align: middle;
}
	
	.server_info .server-score span {
		color: orange;
		margin-right: 0.04rem;
	}
	.server_info .server-score img{
		height: 0.3rem;
	}
	.server_info .server-num span {
		color: #555;
	}
	
	.server_info .server-source {
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
	.server_info .server-source span{
		color: #646464;
	}
	.server-source img {
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	
	.server_info .server-address {
		/*width: 96%;*/
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-top: 0.01rem solid #efefef;
		color: #8b8b8b;
		font-size: 0.23rem;
		padding: 0.1rem 0.6rem 0.16rem 0.3rem;
		/*margin-left: 0.3rem;*/
		/*background: url(../../assets/image/server/server-right.png) no-repeat right 0.3rem center;
		background-size: 2%;*/
		display: block;
		position: relative;
	}
	
	.server-address .img-icon {
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	
	.server_info .server-address .server-right{
		position: absolute;
		right: 0.3rem;
		width: 0.14rem;
		top: 0;
	}
	
	.server-address span {
		color: #494949;
	}
	
	.tab-btn {
		width: 100%;
		margin-top: 0.12rem;
		background: #fff;
	}
	
	.tab-btn ul {
		width: 100%;
		display: -webkit-flex;
	}
	
	.tab-btn ul li {
		flex: 1;
		font-size: 0.28rem;
		height: 0.8rem;
		border-bottom: 0.04rem solid #fff;
		text-align: center;
		line-height: 0.8rem;
		color: #555;
	}
	
	.tab-btn ul li.active {
		color: #439685;
		border-bottom: 0.04rem solid #439685;
	}
	
	.server-tab-content {
		padding-left: 4%;
		padding-right: 4%;
		padding-top: 0.3rem;
		/*padding-bottom: 0.95rem;*/
		word-break: break-word;
		background: #fff;
	}
	
	.server-tab-content iframe {
		width: 100%;
		/*height: 100%;*/
		border: 0 none;
		display: block;
		/*overflow-y: scroll;*/
	}
	
	.server-view-more {
		width: 100%;
		padding: 0 0.3rem;
		height: 0.7rem;
		background: #fff;
		margin-top: 0.12rem;
	}
	
	.server-view-more .server-view-bar {
		width: 100%;
		height: 0.7rem;
		border-bottom: 0.02rem solid #efefef;
	}
	
	.server-view-more h2 {
		float: left;
		height: 100%;
		font-size: 0.24rem;
		color: #4a4d4a;
		line-height: 0.7rem;
	}
	
	.server-view-more a {
		float: right;
		height: 100%;
		padding-right: 0.3rem;
		line-height: 0.7rem;
		font-size: 0.24rem;
		color: #a3a3a3;
		background: url(../../assets/image/server/server-right.png) no-repeat right center;
		background-size: 9%;
	}
	
	.server-notice {
		width: 100%;
	}
	
	.server-notice img {
		width: 100%;
		display: block;
		border: 0 none;
	}
	
	.server-pay {
		width: 100%;
		height: 0.94rem;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	
	.server-pay .server-pay-area {
		width: 50%;
		float: left;
		height: 100%;
	}
	
	.server-pay .server-buy {
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.94rem;
		text-align: center;
		background: #009984;
	}
	
	.server-pay .server-appiont {
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.94rem;
		text-align: center;
		background: #ff9600;
	}
	
	.server-pay .server-price {
		font-size: 0.2rem;
		color: #ff5454;
		text-align: center;
		line-height: 0.94rem;
		background: #fafafa;
	}
	
	.server-pay .server-price span {
		font-size: 0.36rem;
		font-weight: bold;
		margin-left: 0.1rem;
	}
	
	.server-pay .server-pay-area a {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: #fff;
	}
	
	.server-doctor-infos {
		padding-left: 0.3rem;
		padding-top: 0.3rem;
		border-top: 0.1rem solid #f5f5f5;
		padding-bottom: 0.3rem;
	}
	
	.server-doctor-infos .server-doctor-pics {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
	}
	
	.server-doctor-infos .server-doctor-pics img {
		display: block;
		width: 100%;
		height: 100%;
		border: 0 none;
		border-radius: 100%;
	}
	
	.server-doctor-contents {
		float: left;
		padding-left: 0.3rem;
		width: 80%;
	}
	
	.server-doctor-contents .server-doctor-names {
		font-size: 0.28rem;
		color: #000;
		letter-spacing: 0.02rem;
		margin-top: 0.1rem;
	}
	
	.server-doctor-contents .server-doctor-works {
		font-size: 0.24rem;
		margin-top: 0.08rem;
		color: #777777;
	}
	
	.server-doctor-contents .server-doctor-places {
		font-size: 0.24rem;
		color: #858585;
	}
	/*mui样式*/
	
	.server-topBar {
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
	.serviceDictIsDel {
		background: #aaa;
	}
</style>