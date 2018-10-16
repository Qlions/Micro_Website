<template>
	<div id="server-confirm" :class="{'isFixed':hasPanel}">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading"></Loading>
		<div class="server-detail">
			<div class="clearfix">
				<div class="server-detail-pic" :style="{backgroundImage:'url('+ imgIcon(serverDetail.imgUrl) +')'}"></div>
				<div class="server-detail-info">
					<p class="server-detail-name">{{ serverDetail.serviceDictName }}</p>
					<p class="server-detail-source">由<span> {{ serverDetail.eaName }} </span>提供服务</p>
					<div class="server-detail-price">
						<!--<div class="detail_price_left" v-if="moreFee">-->
							<!--<span>基础服务费</span>-->
							<!--<img src="../../assets/image/server/icon_wenhao.png" @click="servDescript('1')"/>-->
						<!--</div>-->
						<div style="float: left;">
							<span class="_price">¥ {{ Number(serviceMoney) | LegalNumber }}</span>
						</div>
						<div class="detail_price_right">
							<img src="../../assets/image/server/server_method.png"/>
							{{ serviceWay }}
						</div>
					</div>
				</div>
			</div>
			<!--<div class="serPlace-Info" v-if="serviceWay=='门诊(店)服务'" @click="gotoPlace(id,lat,lon)">-->
			<div class="serPlace-Info" v-if="serviceWay=='门诊(店)服务' || serviceWay=='综合服务'">
				<p><img src="../../assets/image/server/server-address.png"/>{{ locationInfo.eaAddressDetail }}</p>
				<p><img src="../../assets/image/server/bell_icon.png"/>{{ locationInfo.eaTel }}</p>
				<p v-if="locationInfo.shopServiceTime != null && locationInfo.shopServiceTime != ''"><img src="../../assets/image/server/server_time.png"/>营业时间：{{ locationInfo.shopServiceTime }}</p>
				<!--<span class="server-distance" v-if="locationInfo.distance != '-1' && locationInfo.distance != null">{{ locationInfo.distance | getDistance }}</span>-->
			</div>
		</div>
		<div class="server-contact-info">
			<div class="server-info-title server_select_info" v-if="isAppoint">请选择医院专家</div>
			<div class="server-appiont-info" v-if="isAppoint">
				<a @click="appointInfo">
					<div class="server-appoint-icon">
						<img src="../../assets/image/server/icon_appoint.png"/>
					</div>
					<input type="text" v-model="appointInfos" placeholder="请选择预约信息" disabled="disabled"/>
				</a>
			</div>
			<div class="server-info-title server_detail_info" v-if="hasFee">多点服务多点健康</div>
			<div class="server_fee_detail" v-if="hasFee">
				<ul v-if="appointFee">
					<li>
						<div class="fee_tips">
							<span>挂号费</span><i>¥{{ registerFee }}</i><img src="../../assets/image/server/icon_wenhao.png" @click="servDescript('2')"/>
						</div>
						<p class="fee_ins">顺治副主任医师(胸外科)首都医科大学附属北京天坛医院</p>
					</li>
					<li>
						<div class="fee_tips">
							<span>服务费</span><i>¥{{ serviceFee }}</i>
							<!--<div class="fee_isCheck">
								<toggle-button @change="switchTap"
									v-model="hasServiceFee"
									:sync="true"></toggle-button>
							</div>-->
						</div>
						<p class="fee_ins">护士全程陪同，导医导诊</p>
					</li>
				</ul>
				<ul v-if="normalFee">
					<li v-for="item in itemsList">
						<div class="fee_tips">
							<span>{{ item.serviceDictItemName }}</span><i>¥{{ item.serviceItemMoney | LegalNumber}}</i>
							<div class="fee_isCheck">
								<toggle-button @change="switchTap(item)" 
									v-model="item.state"
									:sync="true"
									></toggle-button>
							</div>
						</div>
						<p class="fee_ins" v-if="item.serviceDictItemContent != null && item.serviceDictItemContent != 'null'">{{ item.serviceDictItemContent }}</p>
					</li>
				</ul>
			</div>
			<div class="server-info-title server_user_info">享受该服务的人员真实信息</div>
			<div class="server-info-name server-info clearfix">
				<div class="server-icon_box">
					<img src="../../assets/image/server/serve_head_icon.png"/>
				</div>
				<input type="text" id="" placeholder="真实姓名" v-model="userName"/>
			</div>
			<div class="server-info-phone server-info clearfix">
				<div class="server-icon_box">
					<img src="../../assets/image/server/serve_phone.png"/>
				</div>
				
				<input v-on:blur="blurMobile" class="" type="tel" id="" placeholder="手机号" v-model="userMobile"/>
			</div>
			<div class="server-info-idcard" v-if="isIdCard">
				<div class="server-idcard-icon">
					<img src="../../assets/image/server/idCard_icon.png"/>
				</div>
				<input v-on:blur="blurIdCard" type="text" placeholder="请输入身份证号" v-model="idCard"/>
			</div>
			<div class="server-info-marry" v-if="isMarry">
				<a @click="chooseMarr">
					<div class="server-marry-icon">
						<img src="../../assets/image/server/marry_icon.png"/>
					</div>
					<input type="text" placeholder="请选择婚姻状况" v-model="marryInfo" disabled="disabled"/>
				</a>
			</div>
			<div class="server-info-address server-info" v-if="dataType == 0">
				<!--<router-link to="/serverConfirm/serverAddress">-->
				<a @click="choosePlace">	
					<div class="server-icon_box">
						<img src="../../assets/image/server/server_address.png"/>
					</div>
					<input type="text" :class="{'isForbid':isForbid}" v-model="address" name="" placeholder="请选择地址" disabled="disabled" style="color: #000"/>
					<img src="../../assets/image/server/server-right.png" class="icon_box_right" />
				</a>	
				<!--</router-link>-->
			</div>
			<div class="server-info-time server-info clearfix" v-if='type=="1"&&!isAppoint'>
				<!--<router-link :to='({path:"/serverConfirm/appointTime",query:{id:this.$route.query.id,userId:this.userId}})'>-->
				<a @click="chooseTime">	
					<div class="server-icon_box">
						<img src="../../assets/image/server/server_time.png"/>
					</div>
					<input type="text" v-model="time" name="" placeholder="请选择服务时间" disabled="disabled"/>
				</a>
				<!--</router-link>-->
			</div>
			<div class="server-info-text server-info clearfix">
				<!--<router-link to="/serverConfirm/healthDescribe">-->
				<a @click="chooseDescribe">
					<div class="server-icon_box">
						<img src="../../assets/image/server/serve_beizhu.png"/>	
					</div>
					<input v-if="serviceWay=='图文咨询'" type="text" v-model="message" name="" placeholder="健康现状描述" disabled="disabled"/>
					<input v-if="serviceWay!='图文咨询'" type="text" v-model="message" name="" placeholder="备注" disabled="disabled"/>
				</a>
					
				<!--</router-link>-->
			</div>
			<div class="server-info-mail server-info clearfix" v-if="hasMail">
				<a>	
					<div class="server-icon_box">
						<img src="../../assets/image/server/server_mail.png"/>
					</div>
					<input type="text" name="" placeholder="请选择报告领取方式" disabled="disabled" style="width: 55%;float: left;"/>
					<div class="report_receive">
						<div :class="{active:isActive == index}" v-for="(item,index) in reportWay" @click="receiveMode(item,index)">
							{{ item.methods }}
						</div>
					</div>
				</a>
				<input type="text" v-if="isMail_address" v-model="mail_address" key="a" id="mail_address" @click="selectAddress" placeholder="请选择邮寄地址"/>
			</div>
			<!--<div class="mail_address" v-if="mail_address" @click="selectAddress">请选择邮寄地址</div>-->
		</div>
		<div class="server_doctor_info" v-if="isBlank">
			<div class="server-doctor-top clearfix">
				<h2>TA为您服务</h2>		
				<div class="server-moreChoose" v-if="isMore">
					<a @click="chooseMore">更多</a>
				</div>
			</div>
			<div class="server-doctor" v-if="!isBeyond">
				<div class="server-doctor-info" @click="introInfo">
					<div class="server-doctor-pic">
						<!--<img src="../../assets/image/DefaultAvatar.png"/>-->
						<img :src="doctorDetail.photosmall"/>
					</div>
					<div class="server-doctor-content">
						<p class="server-doctor-name">{{ doctorDetail.name }}</p>
						<p class="server-doctor-work"><span>{{ doctorDetail.department?doctorDetail.department.split(',')[0]:'' }}</span> {{ doctorDetail.proTitle?doctorDetail.proTitle.split(',')[0]:'' }}</p>
						<p class="server-doctor-place">{{ doctorDetail.hospital?doctorDetail.hospital.split(',')[0]:'' }}</p>
					</div>
					<p class="server-doctor-distance" v-if="doctorDetail.distance != '-1' && doctorDetail.serviceWay == '上门服务'">{{ doctorDetail.distance | getDistance }}<img src="../../assets/image/server/location_icon.png"/></p>
				</div>
				<div class="server-doctor-bottom clearfix">
					<div class="server-doctor-foucs" @click="focusOn">{{ isFocus ? '已关注':'+关注' }}</div>
					<div class="server-feedback clearfix">
						<p class="server-num">已服务 <span>{{ serviceNum }}</span> 次</p>
						<p class="server-score" v-if="doctorDetail.serviceScore != null && doctorDetail.serviceScore != '0'"><span> {{ parseInt(doctorDetail.serviceScore) }}% </span>好评</p>
					</div>
				</div>
				<p class="server-issued" :class="{'authorized':authorized}" @click="authorise" v-if="!authorize"> 签发授权 （请务必仔细阅读所购买服务相关内容，慎重选择） </p>
			</div>
		</div>
		<!--<p class="server-doctor-beyond" v-if="isBeyond">您的签约医生团队未开通服务</p>-->
		<p class="server-doctor-beyond" v-if="isBeyond">您的服务地址超出服务范围</p>
		<div class="service_price" v-if="!fee_isSelect">
			¥ <span>{{ Number(serviceMoney) | LegalNumber }}</span>
		</div>
		<div class="service_price_detail" v-if="fee_isSelect">
			<div class="service_price_detail_price">
				¥ <span>{{ Number(serviceAllMoney) | LegalNumber }}</span>
			</div>
			<div class="service_price_detail_info" @click="showDetails">
				<span>明细</span>
				<img src="../../assets/image/server/icon_up_arrow.png"/>
			</div>
		</div>
		<div class="server-opera server-opera-buy" @click="nextTips" :class="{'isForbid':isForbid || isBeyond}" v-if="!isRelax">
			<!--<a>{{ this.$route.query.type == '1'? '立即预约':'立即购买' }}</a>-->
			<a>去结算</a>
		</div>
		<div class="server-relax" @click="nextTips" v-if="isRelax">
			<a>专业人员休息中</a>
		</div>
		<popup v-show="isPopup" :message="messInfo"></popup>
		<sucpopup v-show="isSucPopup" :sucMessage="messSucInfo"></sucpopup>
		<div id="container"></div>
		<div id="errInfo" v-if="beyondRange">抱歉, 超出服务范围</div>
		<div id="expert-info" v-if="showInfo" @click="hidePanel">
			<div class="expert-info-panel">
				<div class="expert-info-name">{{ doctorDetail.name }}</div>
				<div class="expert-info-content">
					<p class="expert-good">擅长：{{ skill }}</p>
					<p class="expert-profile">简介：{{ profile }}</p>
				</div>
				<div class="expert-panel-close"></div>
			</div>
		</div>
		<div id="detail-panel" @touchmove.prevent v-if="showDetail" @click="closeDetail"></div>
		<div id="descript-panel" v-if="hasPanel" @click="closePanel" @touchmove.prevent></div>
		<div class="des_box" v-if="hasPanel" @touchmove.prevent>
			<h2>说明</h2>
			<div class="des_content">
				<ul v-if="!isIframe">
					<li>①享受中国健康云终身免费慢性病风险评估;</li>
					<li>②独立享受中国健康云将康档案存储空间10G;</li>
					<li>③优先享受中国健康云健康咨询优先服务权。</li>
				</ul>
				<iframe v-if="isIframe" :src="iframeUrl" width="" height=""></iframe>
			</div>
			<div class="close_des" @click="closePanel"></div>
		</div>
		<div class="server_detail_fee" v-if="showDetail">
			<div class="detail_top">
				<i>合计</i>
				<p>¥<span>{{ Number(serviceAllMoney) | LegalNumber }}</span></p>
			</div>
			<div class="detail_content">
				<ul>
					<li v-if="serviceMoney != 0">
						<i>基础服务费</i>
						<span>¥{{ Number(serviceMoney) | LegalNumber}}</span>
					</li>
					<li v-if="registerFee != ''">
						<i>挂号费</i>
						<span>¥{{ Number(registerFee) | LegalNumber}}</span>
					</li>
					<li v-if="serviceFee != ''">
						<i>服务费</i>
						<span>¥{{ Number(serviceFee) | LegalNumber}}</span>
					</li>
					<li v-for="item in itemsList" v-if="item.state">
						<i>{{ item.serviceDictItemName }}</i>
						<span>¥{{ item.serviceItemMoney | LegalNumber }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import popup from '../common/error-popup.vue'
	import sucpopup from '../common/suc-popup.vue'
	import AMap from 'AMap'
	export default {
		data (){
			return {
				titleName : "",
				serverDetail: "",
				doctorDetail: "",
				serviceFee: "",
				registerFee: "",
				receiveAddress: "",
				itemsList: [],
				isMail_address: false,
				mail_address: "",
				hasPanel: false,
				hasMail: false,
				moreFee: false,
				showDetail: false,
				appointFee: false,
				normalFee: false,
				hasFee: false,
				isActive: 1,
				hasServiceFee: false,
				fee_isSelect: false,
				isIframe: true,
				isLoading: true,
				isIdCard: false,
				isMail: false,
				isMarry: false,
				isMore: false,
				isPopup: false,
				isBlank: false,
				isSucPopup: false,
				isRelax: false,
				isBeyond: false,
				isForbid: false,
				isAppoint: false,
				beyondRange: false,
				showInfo: false,
				authorized: false,
				authorize: true,
				isFocus: -1,
				iframeUrl: '',
				payType: "",
				unitType: "",
				serviceNum:"",
				items:'',
				userName: "",
				registerDate: "",
				idCard: "",
				marryInfo: "",
				appointInfos: "",
				userMobile: "",
				messInfo: "",
				messSucInfo: "",
				locationInfo:"",
				type: this.$route.query.type,
				id:this.$route.query.id,
				dataType: -1,
				serviceMoney: "",
				serviceAllMoney: "",
				attentionId: "",
				doctorScheduleId: "",
				serviceId: "",
				serviceWay: "",
				relationEaId:"",
				userId: "",
				message: "",
				time: "",
				address: "",
				lat:"",
				lon:"",
				areaCode: "",
				skill:"",
				profile: "",
				reportWay: [
					{
						methods: '邮寄'
					},
					{
						methods: '自取'
					}
				]
			}
		},
		components:{
			Heads,
			Loading,
			popup,
			sucpopup
		},
		filters:{
			getDistance(val){//服务距离filter
				let dis = parseInt(val);
				if(dis >= 1000){
					return (dis/1000).toFixed(1) + "公里";
				}else {
					return dis.toFixed(0) + "米";
				}
			}
		},
		methods:{
			initData(){
				let vm = this;
				if(this.$route.query.type == '1'){//预约服务
					this.titleName = '预约服务'
				}else {//购买服务
					this.titleName = '购买服务'
				}
				//从vuex中获取存储的健康描述
				if(!this.$store.textInfo){
					this.message = '';
				}else {
					this.message = this.$store.textInfo;
				}
				//从vuex中获取存储的预约时间
				if(!this.$store.timeInfo){
					this.time = '';
				}else {
					this.time = this.$store.timeInfo.dates + " " + this.$store.timeInfo.time;
				}
				
				if(!this.$store.state.idCard){
					this.idCard = "";
				}else {
					this.idCard = this.$store.state.idCard;
				}
				
				if(!this.$store.state.mailInfo){
					this.isActive = 1;
					this.isMail_address = false;
				}else {
					const areaLoca = this.$store.state.mailInfo;
					console.log("areaLoca",areaLoca);
					this.isActive = 0;
					this.isMail_address = true;
					this.mail_address = areaLoca;
				}
				
				sessionStorage.removeItem("isServer");
				
				//渲染授权按钮勾选状态
				this.authorized = this.$store.state.authorize;
				
				//登录基本数据
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				
				let token = userInfo.token;
				//获取服务详情，111181接口
				let serverData = JSON.stringify({
					serviceDictId : this.$route.query.id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111181, jsonValue:serverData},{emulateJSON:true}).then( response => {
					console.log(response);
					//获取支付方式   0：在线支付   2：线下支付
					this.payType = response.body[0].payType;
					//获取服务详情数据
					this.serverDetail =  response.body[0];
					//判断是否输入身份证号
					if(this.serverDetail.reservationValid.includes('yyyz3')){
						this.isIdCard = true;
					}else {
						this.isIdCard = false;
					}
					//判断是否显示婚姻状况
					if(this.serverDetail.reservationValid.includes('yyyz4')){
						this.isMarry = true;
						this.marryInfo = this.$store.state.marryInfo;
					}else {
						this.isMarry = false;
					}
					//判断是否显示邮寄
					if(this.serverDetail.reservationValid.includes('yyyz5')){
						this.hasMail = true;
					}else {
						this.hasMail = false;						
					}
					//判断是否显示预约信息,是否为挂号服务
					if(this.serverDetail.reservationMode == 2){
						this.isAppoint = true;
						this.isBlank = true;
					}else {
						this.isAppoint = false;
						this.isBlank = true;
					}
					//区分服务
					//console.log(response.body[0]);
					this.relationEaId = sessionStorage.getItem("server_relationEaId");
					if(response.body[0].serviceDictComponent == "F003"){
						this.serviceWay = "电话咨询"
					}else {
						this.serviceWay = response.body[0].serviceDictWay;
					}
					if(this.serviceWay == '门诊(店)服务' || this.serviceWay == '综合服务'){
						let vm = this;
						let locData = JSON.parse(window.sessionStorage.getItem("localInfo"));
						let eaId = window.sessionStorage.getItem("server_eaId");
						let id = vm.$route.query.id;
						let lat = locData.lat;
						vm.lat = lat;
						let lon = locData.lon;
						vm.lon = lon;
						let data = JSON.stringify({
							serviceDictId : id,
							lat: lat,
							lon: lon,
							opType: "1"
						})
						//网点接口
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111177, jsonValue:data},{emulateJSON:true}).then( response => {
							let arr = response.body.rows;
							console.log(arr);
							this.shop = response.body.rows[0].shopServiceTime;
							if(eaId == null){
								vm.locationInfo = arr[0];
							}else {
								let num = 0;
								for(var i = 0;i < arr.length;i ++){
									if(eaId == arr[i].eaId){
										vm.locationInfo = arr[i];
										break;
									}else {
										num ++;
									}
								}
								if(num == arr.length){
									vm.locationInfo = arr[0];
								}
							}
						})
						
						
					}
					//上门服务
					if(this.serviceWay == '上门服务'){
						this.dataType = 0;
						if(this.$route.query.docuserId){//从医生进入
							//console.log("上门服务，从医生进入");
							let vm = this;
							let adData = JSON.stringify({
								addressType: '2',
								state: '1'
							});
							//默认地址接口
							vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:112000, jsonValue:adData},{emulateJSON:true}).then( response => {
								//console.log(response);
								let res = response.body.addressAll;
								let saveInfo = JSON.parse(window.localStorage.getItem("passValue"));
								if(saveInfo == null){
									if(res.length > 0){
										vm.lat = res[0].latitude;
										vm.lon = res[0].longitude;
										vm.areaCode = res[0].areaCode;
										vm.address = res[0].address + res[0].addressInfo;
										vm.userMobile = res[0].tel;
										vm.userName = res[0].name;
									}else {
										vm.lat = "";
										vm.lat = "";
										vm.areaCode = "";
										vm.address = "";
										vm.userMobile = userInfo.identifyMobile;
										vm.userName = userInfo.name;
									}
									
								}else {
									vm.lat = saveInfo.latitude;
									vm.lon = saveInfo.longitude;
									vm.areaCode = saveInfo.areaCode;
									vm.address = saveInfo.address + saveInfo.addressInfo;
									vm.userMobile = saveInfo.tel;
									vm.userName = saveInfo.name;
								}
								if(vm.serverDetail.reservationMode == 2){
									vm.moreFee = true;
									let saveAppoint = vm.$store.state.appointInfo;
									if(!saveAppoint){//vuex数据为空
										vm.appointInfos = "";
										vm.time = "";
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
										vm.fee_isSelect = false;
									}else {
										let data = JSON.parse(saveAppoint);
										vm.appointInfos = data.registerDate+" "+data.timeSlot+data.title;
										vm.time = data.registerDate+" "+data.timeSlot;
										vm.registerDate = data.registerDate;
										vm.doctorScheduleId = data.doctorSchedualId;
										vm.iframeUrl = descript_urls() + "eaId=" + data.eaId + "&ignoreLogin=1";
										vm.fee_isSelect = true;
										vm.hasFee = true;
										vm.appointFee = true;
										vm.normalFee = false;
										vm.registerFee = Number(data.costMoney).toFixed(2);
										vm.serviceFee = Number(data.hospitalServiceMoney).toFixed(2);
										if(data.timeSlot == '上午'){
											vm.unitType = 1;
										}else {
											vm.unitType = 2;
										}
									}
								}else {
									if(vm.serverDetail.items.length > 0){//是否有详细服务项目
										vm.moreFee = true;
										vm.hasFee = true;
										vm.appointFee = false;
										vm.normalFee = true;
										if(!vm.$store.state.itemsList){
											vm.fee_isSelect = false;
											vm.serverDetail.items.forEach(item => {
												const itemData = {};
												itemData.serviceDictItemContent = item.serviceDictItemContent;
												itemData.serviceDictItemId = item.serviceDictItemId;
												itemData.serviceDictItemName = item.serviceDictItemName;
												itemData.serviceItemMoney = item.serviceItemMoney;
												itemData.state = false;
												vm.itemsList.push(itemData);
											})
											
										}else {
											vm.fee_isSelect = true;
											vm.itemsList = vm.$store.state.itemsList;
											let serviceAllMoney = vm.serverDetail.serviceDictMoney;
											for(var i = 0;i < vm.itemsList.length;i ++){
												if(vm.itemsList[i].state){
													serviceAllMoney += vm.itemsList[i].serviceItemMoney
												}
											}
											vm.serviceAllMoney = serviceAllMoney;
										}
									}else {
										vm.moreFee = false;
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
									}
								}
								let userId = vm.$route.query.docuserId;
					        	let doctorData = JSON.stringify({
					        		userId : userId,
					        		lat : vm.lat,
					        		lon : vm.lon,
					        		serviceDictId: vm.$route.query.id,
					        		areaCode: vm.areaCode
					        	});
					        	//医生详情接口
								vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660101, jsonValue:doctorData},{emulateJSON:true}).then( response => {
									console.log("医生进入服务",response);
									//判断当前地址是否超出服务范围
									if(response.body.serviceRadiusState != '0'){//超出范围
										//弹出信息
							        	vm.beyondRange = true;
							        	//按钮置灰
							        	vm.isForbid = true;
							        	vm.clearBeyondInfo();
									}
									let list = response.body;
									let data = JSON.stringify({
										userId : userId
									});
									//医生部分信息接口
									vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660102, jsonValue:data},{emulateJSON:true}).then( response => {
										//拼接服务人数
					        			list.serverCount = response.body.serverCount;
					        			//拼接服务好评率
					        			list.serviceScore = response.body.serviceScore;
					        			
					        			console.log("渲染数据",list)
					        			//渲染价格
					        			vm.serviceMoney = vm.$route.query.money;
					        			if(!vm.registerFee){
											vm.serviceAllMoney = vm.serviceMoney;
										}else {
											vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
										}
					        			//渲染服务人数
					        			vm.serviceNum = list.memberCount;
					        			//渲染数据
					        			vm.doctorDetail = list;
					        			
					        			vm.isBlank = true;
					        			
					        			//判断该医生是否被关注
					        			if(list.attentionId == ""){//当前医生未被关注
					        				vm.isFocus = false;
					        			}else{//当前医生已经被关注
					        				vm.isFocus = true;
					        			}
					        			//调111189接口，查看当前医生是否在休息中
					        			if(vm.serverDetail.reservationMode != 2){
						        			if(vm.type == '1'){
						        				let data = JSON.stringify({
													userId : vm.doctorDetail.userId,
													userType : 1,
													serviceDictId : vm.$route.query.id
												});
												vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111189, jsonValue:data},{emulateJSON:true}).then( response => {
													//console.log("111189",response)
													if(response.body.length > 0){
														vm.isRelax = false;
													}else {
														vm.isRelax = true;
													}
												});
						        			}else {
						        				vm.isRelax = false;
						        			}
					        			}
					        			setTimeout(() => {
               								vm.isLoading = false;
            							}, 200);
					        			//赋值ID,实现关注与取消关注
				  						vm.userId = vm.doctorDetail.userId;
										vm.attentionId = vm.doctorDetail.attentionId;
										vm.serviceId = vm.$route.query.serviceId;
										console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",vm.serviceId)
										if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
											vm.authorize = false;
										}else {
											vm.authorize = true;
										}
									});
								});
							});
						}else {//从服务进入
							console.log(this.serverDetail);
							let vm = this;
							let adData = JSON.stringify({
								addressType: '2',
								state: '1'
							})
							vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:112000, jsonValue:adData},{emulateJSON:true}).then( response => {
								let res = response.body.addressAll;
								console.log("服务地址",res);
								let saveInfo = JSON.parse(window.localStorage.getItem("passValue"));
								if(saveInfo == null){
									if(res.length > 0){
										vm.lat = res[0].latitude;
										vm.lon = res[0].longitude;
										vm.areaCode = res[0].areaCode;
										vm.address = res[0].address + res[0].addressInfo;
										vm.userMobile = res[0].tel;
										vm.userName = res[0].name;
									}else {
										vm.lat = "";
										vm.lat = "";
										vm.areaCode = "";
										vm.address = "";
										vm.userMobile = userInfo.identifyMobile;
										vm.userName = userInfo.name;
									}
									
								}else {
									vm.lat = saveInfo.latitude;
									vm.lon = saveInfo.longitude;
									vm.areaCode = saveInfo.areaCode;
									vm.address = saveInfo.address + saveInfo.addressInfo;
									vm.userMobile = saveInfo.tel;
									vm.userName = saveInfo.name;
								}
								
								if(vm.serverDetail.reservationMode == 2){
									vm.moreFee = true;
									let saveAppoint = vm.$store.state.appointInfo;
									vm.serviceMoney = vm.$route.query.money;
									if(!saveAppoint){//vuex数据为空
										vm.appointInfos = "";
										vm.time = "";
										vm.isBlank = true;
										vm.isLoading = false;
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
									}else {
										let data = JSON.parse(saveAppoint);
										vm.appointInfos = data.registerDate+" "+data.timeSlot+" ("+ data.name +"-"+data.title+")";
										vm.time = data.registerDate+" "+data.timeSlot;
										vm.registerDate = data.registerDate;
										vm.doctorScheduleId = data.doctorSchedualId;
										vm.iframeUrl = descript_urls() + "eaId=" + data.eaId + "&ignoreLogin=1";
										vm.fee_isSelect = true;
										vm.hasFee = true;
										vm.appointFee = true;
										vm.normalFee = false;
										vm.registerFee = Number(data.costMoney).toFixed(2);
										vm.serviceFee = Number(data.hospitalServiceMoney).toFixed(2);
										if(data.timeSlot == '上午'){
											vm.unitType = 1;
										}else {
											vm.unitType = 2;
										}
									}
									let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
									let appointData = JSON.stringify({
										serviceDictId : vm.$route.query.id,
										page : 1,
										rows : 30,
										lat: vm.lat,
										lon: vm.lon,
										areaCode: vm.areaCode
									});
									vm.$http.post(api,{token:token, infoType:111183, jsonValue:appointData},{emulateJSON:true}).then( response => {
										console.log(response);
										let data = response.body.rows;
										if(data.length > 0){//能筛选出专家
											if(data.length > 1){//筛选出多个专家
							  					vm.isMore = true;
							  				}else {//只筛选出一个专家
							  					vm.isMore = false;
							  				}
							  				vm.isBeyond = false;
										}else {//超出筛选范围
											vm.isBeyond = true;
								  			vm.serviceMoney = vm.$route.query.money;
											if(!vm.registerFee){
												vm.serviceAllMoney = vm.serviceMoney;
											}else {
												vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
											}
								  			setTimeout(() => {
			               						vm.isLoading = false;
			            					}, 200)
								  			return false;
										}
										if(vm.$route.query.userId){//选择的另外一个专家
											let uId = vm.$route.query.userId;
				  							for(var i = 0;i < data.length;i ++){
				  								if(uId == data[i].userId){
				  									vm.doctorDetail = data[i];
				  									vm.isBlank = true;
				  									break;
				  								}
				  							}
										}else {//当前专家，未选择更多专家
											vm.doctorDetail = data[0];
											vm.isBlank = true;
										}
										console.log("最终数据",vm.doctorDetail);
										vm.isLoading = false;
						  				vm.serviceMoney = vm.doctorDetail.serviceMoney;
						  				if(!vm.registerFee){
											vm.serviceAllMoney = vm.serviceMoney;
										}else {
											vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
										}
						  				vm.serviceNum = vm.doctorDetail.serverCount;
					  					if(vm.doctorDetail.attentionCount == '1'){//当前医生未被关注
					  						vm.isFocus = true;
					  					}else {//当前医生被关注
					  						vm.isFocus = false;
					  					}
					  					vm.userId = vm.doctorDetail.userId;
										vm.attentionId = vm.doctorDetail.attentionId;
										vm.serviceId = vm.doctorDetail.serviceId;
										if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
											vm.authorize = false;
										}else {
											vm.authorize = true;
										}
									});
									return false;
								}
								if(vm.serverDetail.items.length > 0){
									vm.moreFee = true;
									vm.hasFee = true;
									vm.appointFee = false;
									vm.normalFee = true;
									if(!vm.$store.state.itemsList){
										vm.fee_isSelect = false;
										vm.serverDetail.items.forEach(item => {
											const itemData = {};
											itemData.serviceDictItemContent = item.serviceDictItemContent;
											itemData.serviceDictItemId = item.serviceDictItemId;
											itemData.serviceDictItemName = item.serviceDictItemName;
											itemData.serviceItemMoney = item.serviceItemMoney;
											itemData.state = false;
											vm.itemsList.push(itemData);
										})
									}else {
										vm.fee_isSelect = true;
										vm.itemsList = vm.$store.state.itemsList;
										let serviceAllMoney = vm.serverDetail.serviceDictMoney;
										for(var i = 0;i < vm.itemsList.length;i ++){
											if(vm.itemsList[i].state){
												serviceAllMoney += vm.itemsList[i].serviceItemMoney
											}
										}
										vm.serviceAllMoney = serviceAllMoney;
									}
									
								}else {
									vm.moreFee = false;
									vm.hasFee = false;
									vm.appointFee = false;
									vm.normalFee = false;
								}
								if(!vm.$store.timeInfo){//无预约时间
									if(vm.lat == "" || vm.lat == null){
										var doctorData = JSON.stringify({
											serviceDictId : vm.$route.query.id,
											page : 1,
											rows : 30
										});
										console.log("无预约时间数据,无经纬度",JSON.parse(doctorData));
									}else {
										var doctorData = JSON.stringify({
											serviceDictId : vm.$route.query.id,
											page : 1,
											rows : 30,
											lat: vm.lat,
											lon: vm.lon,
											areaCode: vm.areaCode
										});
										console.log("无预约时间数据,有经纬度",JSON.parse(doctorData));
									}
									var portNum = 111183;
								}else {//有预约时间
									let datesArr = vm.$store.timeInfo.dates.split("-");
									let time = vm.$store.timeInfo.time;
									let dates = "";
									for(var i in datesArr){
										dates += datesArr[i];
									}
									if(time == '上午' || time == '下午'){//预约上下午服务
										if(vm.lat == "" || vm.lat == null){
											var doctorData = JSON.stringify({
												serviceDictId : vm.$route.query.id,
												page : 1,
												rows : 30,
												registerDate: dates,
												isAPMService: 1
											})
										}else {
											var doctorData = JSON.stringify({
												serviceDictId : vm.$route.query.id,
												page : 1,
												rows : 30,
												registerDate: dates,
												isAPMService: 1,
												lat : vm.lat,
												lon : vm.lon,
												areaCode: vm.areaCode,
											})
										}
										var portNum = 111183;
									}else {
										if(vm.lat == "" || vm.lat == null){
											var doctorData = JSON.stringify({
												serviceDictId : vm.$route.query.id,
												page : 1,
												rows : 30,
												lat : vm.lat,
												lon : vm.lon,
												areaCode: vm.areaCode,
												pointOfTime : time,
												pointOfDay : dates
											});
											console.log("有预约时间数据，有经纬度",JSON.parse(doctorData));
										}else {
						  					var doctorData = JSON.stringify({
												serviceDictId : vm.$route.query.id,
												page : 1,
												rows : 30,
												pointOfTime : time,
												pointOfDay : dates
											});
											console.log("有预约时间数据，无经纬度",JSON.parse(doctorData));
										}
										var portNum = 111199;
										
									}
								}
								
								//调111183、111199接口筛选专家
								vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:portNum, jsonValue:doctorData},{emulateJSON:true}).then( response => {
									console.log("筛选出的专家",response);
									let data = response.body.rows;
									if(data.length > 0){//能筛选出专家
										if(data.length > 1){//筛选出多个专家
						  					vm.isMore = true;
						  				}else {//只筛选出一个专家
						  					vm.isMore = false;
						  				}
						  				vm.isBeyond = false;
									}else {//超出筛选范围
										vm.isBeyond = true;
						  				vm.serviceMoney = Number(vm.$route.query.money).toFixed(2);
						  				setTimeout(() => {
	               							vm.isLoading = false;
	            						}, 200)
						  				return false;
									}
									if(vm.$route.query.userId){//选择的另外一个专家
										let uId = vm.$route.query.userId;
				  						for(var i = 0;i < data.length;i ++){
				  							if(uId == data[i].userId){
				  								vm.doctorDetail = data[i];
				  								vm.isBlank = true;
				  								break;
				  							}
				  						}
									}else {//当前专家，未选择更多专家
										vm.doctorDetail = data[0];
										vm.isBlank = true;
									}
										console.log("最终数据",vm.doctorDetail);
						  				vm.serviceMoney = vm.doctorDetail.serviceMoney;
						  				vm.serviceNum = vm.doctorDetail.serverCount;
					  					if(vm.doctorDetail.attentionCount == '1'){//当前医生未被关注
					  						vm.isFocus = true;
					  					}else {//当前医生被关注
					  						vm.isFocus = false;
					  					}
					  					//调111189接口，查看当前医生是否在休息中
//					  					if(vm.type == '1'){
//											let data = JSON.stringify({
//												userId : vm.doctorDetail.userId,
//												userType : 1,
//												serviceDictId : vm.$route.query.id
//											});
//											vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111189, jsonValue:data},{emulateJSON:true}).then( response => {
//												//console.log("111189",response)
//												if(response.body.length > 0){
//													vm.isRelax = false;
//												}else {
//													vm.isRelax = true;
//												}
//											})
//										}else {
//											vm.isRelax = false;
//										}
					  					setTimeout(() => {
	               							vm.isLoading = false;
	            						}, 200)
						  				//赋值ID,实现关注与取消关注
						  				vm.userId = vm.doctorDetail.userId;
										vm.attentionId = vm.doctorDetail.attentionId;
										vm.serviceId = vm.doctorDetail.serviceId;
										console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",vm.serviceId)
										if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
											vm.authorize = false;
										}else {
											vm.authorize = true;
										}
					  						
									});
								});
								
						
						}
						
					}else {//其他服务
						//console.log("其他服务")
						let vm = this;
						let userId = vm.$route.query.docuserId;
						if(vm.$route.query.docuserId){//从医生进入
							let adData = JSON.stringify({
								addressType: '2',
								state: '1'
							});
								vm.userMobile = userInfo.identifyMobile;
								vm.userName = userInfo.name;
								if(vm.serverDetail.reservationMode == 2){
									let saveAppoint = vm.$store.state.appointInfo;
									vm.moreFee = true;
									if(!saveAppoint){//vuex数据为空
										vm.appointInfos = "";
										vm.time = "";
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
									}else {
										let data = JSON.parse(saveAppoint);
										vm.appointInfos = data.registerDate+" "+data.timeSlot+" ("+ data.name +"-"+data.title+")";
										vm.time = data.registerDate+" "+data.timeSlot;
										vm.registerDate = data.registerDate;
										vm.doctorScheduleId = data.doctorSchedualId;
										vm.iframeUrl = descript_urls() + "eaId=" + data.eaId + "&ignoreLogin=1";
										vm.hasFee = true;
										vm.appointFee = true;
										vm.normalFee = false;
										vm.fee_isSelect = true;
										vm.registerFee = Number(data.costMoney).toFixed(2);
										vm.serviceFee = Number(data.hospitalServiceMoney).toFixed(2);
										if(data.timeSlot == '上午'){
											vm.unitType = 1;
										}else {
											vm.unitType = 2;
										}
									}
								}else {
									if(vm.serverDetail.items.length > 0){//是否有详细服务项目
										vm.moreFee = true;
										vm.hasFee = true;
										vm.appointFee = false;
										vm.normalFee = true;
										if(!vm.$store.state.itemsList){
											vm.fee_isSelect = false;
											vm.serverDetail.items.forEach(item => {
												const itemData = {};
												itemData.serviceDictItemContent = item.serviceDictItemContent;
												itemData.serviceDictItemId = item.serviceDictItemId;
												itemData.serviceDictItemName = item.serviceDictItemName;
												itemData.serviceItemMoney = item.serviceItemMoney;
												itemData.state = false;
												vm.itemsList.push(itemData);
											})
											
										}else {
											vm.fee_isSelect = true;
											vm.itemsList = vm.$store.state.itemsList;
											let serviceAllMoney = vm.serverDetail.serviceDictMoney;
											for(var i = 0;i < vm.itemsList.length;i ++){
												if(vm.itemsList[i].state){
													serviceAllMoney += vm.itemsList[i].serviceItemMoney
												}
											}
											vm.serviceAllMoney = serviceAllMoney;
										}
									}else {
										vm.moreFee = false;
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
									}
								}
								
								let doctorData = JSON.stringify({
									userId : userId
								});
								vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660101, jsonValue:doctorData},{emulateJSON:true}).then( response => {
									console.log("其他服务，医生信息",response)
									let list = response.body;
									if(list.returnState == 'err_userDoctor_003'){
										vm.isBeyond = true;
										setTimeout(() => {
	           								vm.isLoading = false;
	        							}, 200)
										return false;
									}
									vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660102, jsonValue:doctorData},{emulateJSON:true}).then( response => {
										//拼接服务人数
										list.serverCount = response.body.serverCount;
										//拼接好评率
										list.serviceScore = response.body.serviceScore;
										
										console.log("最终渲染数据",list);
										//渲染价格
										vm.serviceMoney = vm.$route.query.money;
										if(!vm.registerFee){
											vm.serviceAllMoney = vm.serviceMoney;
										}else {
											vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
										}
										vm.serviceNum = list.memberCount;
										vm.doctorDetail = list;
										vm.isBlank = true;
										//判断该医生是否被关注
					        			if(list.attentionId == ""){//当前医生未被关注
					        				vm.isFocus = false;
					        			}else{//当前医生已经被关注
					        				vm.isFocus = true;
					        			}
										if(vm.serverDetail.reservationMode != 2){
											//判断医生是否休息中
											if(vm.type == '1'){
												let data = JSON.stringify({
													userId : vm.doctorDetail.userId,
													userType : '1',
													serviceDictId : vm.$route.query.id
												});
											vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111189, jsonValue:data},{emulateJSON:true}).then( response => {
												//console.log("111189",response)
												if(response.body.length > 0){
													vm.isRelax = false;
												}else {
													vm.isRelax = true;
												}
											})
											}else {
												vm.isRelax = false;
											}
										}
										setTimeout(() => {
	           								vm.isLoading = false;
	        							}, 200)
										//赋值ID,实现关注与取消关注
					  					vm.userId = vm.doctorDetail.userId;
										vm.attentionId = vm.doctorDetail.attentionId;
										vm.serviceId = vm.$route.query.serviceId;
										console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",vm.serviceId)
										if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
											vm.authorize = false;
										}else {
											vm.authorize = true;
										}
										
									})
								})
								
							
						}else {//从服务进入
							let vm = this;
							//console.log("非上门预约服务");
							let adData = JSON.stringify({
								addressType: '2',
								state: '1'
							});
								vm.userMobile = userInfo.identifyMobile;
								vm.userName = userInfo.name;
								if(vm.serverDetail.reservationMode == 2){
									vm.moreFee = true;
									let saveAppoint = vm.$store.state.appointInfo;
									vm.serviceMoney = vm.$route.query.money;
									if(!saveAppoint){//vuex数据为空
										vm.appointInfos = "";
										vm.time = "";
										vm.isBlank = true;
										vm.isLoading = false;
										vm.hasFee = false;
										vm.appointFee = false;
										vm.normalFee = false;
										vm.fee_isSelect = false;
									}else {
										let data = JSON.parse(saveAppoint);
										console.log("6666688888",data)
										vm.appointInfos = data.registerDate+" "+data.timeSlot+" ("+ data.name +"-"+data.title+")";
										vm.time = data.registerDate+" "+data.timeSlot;
										vm.registerDate = data.registerDate;
										vm.doctorScheduleId = data.doctorSchedualId;
										vm.iframeUrl = descript_urls() + "eaId=" + data.eaId + "&ignoreLogin=1";
										vm.hasFee = true;
										vm.appointFee = true;
										vm.normalFee = false;
										vm.fee_isSelect = true;
										vm.registerFee = Number(data.costMoney).toFixed(2);
										vm.serviceFee = Number(data.hospitalServiceMoney).toFixed(2);
										if(data.timeSlot == '上午'){
											vm.unitType = 1;
										}else {
											vm.unitType = 2;
										}
									}
									let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
									let appointData = JSON.stringify({
										serviceDictId : vm.$route.query.id,
										page : 1,
										rows : 30,
										lat: vm.lat,
										lon: vm.lon,
										areaCode: vm.areaCode
									});
									vm.$http.post(api,{token:token, infoType:111183, jsonValue:appointData},{emulateJSON:true}).then( response => {
										let data = response.body.rows;
										if(data.length > 0){//能筛选出专家
											if(data.length > 1){//筛选出多个专家
							  					vm.isMore = true;
							  				}else {//只筛选出一个专家
							  					vm.isMore = false;
							  				}
							  				vm.isBeyond = false;
										}else {//超出筛选范围
											vm.isBeyond = true;
								  			vm.serviceMoney = Number(vm.$route.query.money).toFixed(2);
								  			if(!vm.registerFee){
												vm.serviceAllMoney = vm.serviceMoney;
											}else {
												vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
											}
								  			setTimeout(() => {
			               						vm.isLoading = false;
			            					}, 200)
								  			return false;
										}
										if(vm.$route.query.userId){//选择的另外一个专家
											let uId = vm.$route.query.userId;
				  							for(var i = 0;i < data.length;i ++){
				  								if(uId == data[i].userId){
				  									vm.doctorDetail = data[i];
				  									vm.isBlank = true;
				  									break;
				  								}
				  							}
										}else {//当前专家，未选择更多专家
											vm.doctorDetail = data[0];
											vm.isBlank = true;
										}
										console.log("最终数据",vm.doctorDetail);
						  				vm.serviceMoney = vm.doctorDetail.serviceMoney;
						  				if(!vm.registerFee){
											vm.serviceAllMoney = vm.serviceMoney;
										}else {
											vm.serviceAllMoney = Number(vm.registerFee) + Number(vm.serviceMoney) + Number(vm.serviceFee);
										}
						  				vm.serviceNum = vm.doctorDetail.serverCount;
					  					if(vm.doctorDetail.attentionCount == '1'){//当前医生未被关注
					  						vm.isFocus = true;
					  					}else {//当前医生被关注
					  						vm.isFocus = false;
					  					}
					  					vm.isLoading = false;
					  					vm.userId = vm.doctorDetail.userId;
										vm.attentionId = vm.doctorDetail.attentionId;
										vm.serviceId = vm.doctorDetail.serviceId;
										if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
											vm.authorize = false;
										}else {
											vm.authorize = true;
										}
									});
									return false;
								}
								if(vm.serverDetail.items.length > 0){//是否有详细服务项目
									vm.moreFee = true;
									vm.hasFee = true;
									vm.appointFee = false;
									vm.normalFee = true;
									if(!vm.$store.state.itemsList){
										vm.fee_isSelect = false;;
										vm.serverDetail.items.forEach(item => {
											const itemData = {};
											itemData.serviceDictItemContent = item.serviceDictItemContent;
											itemData.serviceDictItemId = item.serviceDictItemId;
											itemData.serviceDictItemName = item.serviceDictItemName;
											itemData.serviceItemMoney = item.serviceItemMoney;
											itemData.state = false;
											vm.itemsList.push(itemData);
										})
										
									}else {
										vm.fee_isSelect = true;
										vm.itemsList = vm.$store.state.itemsList;
										let serviceAllMoney = vm.serverDetail.serviceDictMoney;
										for(var i = 0;i < vm.itemsList.length;i ++){
											if(vm.itemsList[i].state){
												serviceAllMoney += vm.itemsList[i].serviceItemMoney
											}
										}
										vm.serviceAllMoney = serviceAllMoney;
									}
								}else {
									vm.moreFee = false;
									vm.hasFee = false;
									vm.appointFee = false;
									vm.normalFee = false;
								}
								console.log("vm.$store.timeInfo",vm.$store.timeInfo);
								if(!vm.$store.timeInfo){//无预约时间
				  					var doctorData = JSON.stringify({
										serviceDictId : vm.$route.query.id,
										page : 1,
										rows : 30
									});
									console.log("无预约时间数据",JSON.parse(doctorData));
									var portNum = 111183;
				  				}else{//有预约时间
				  					let datesArr = vm.$store.timeInfo.dates.split("-");
									let time = vm.$store.timeInfo.time;
									let dates = "";
									if(time == '上午' || time == '下午') {//预约上下午服务
										for(var i in datesArr){
											dates += datesArr[i];
										}
										var doctorData = JSON.stringify({
											serviceDictId : vm.$route.query.id,
											page : 1,
											rows : 30,
											isAPMService: 1,
											registerDate: dates
										})
										var portNum = 111183;
									}else {//普通预约时间服务
										for(var i in datesArr){
											dates += datesArr[i];
										}
					  					var doctorData = JSON.stringify({
											serviceDictId : vm.$route.query.id,
											page : 1,
											rows : 30,
											pointOfTime : time,
											pointOfDay : dates
										});
										console.log("有预约时间数据",JSON.parse(doctorData));
										var portNum = 111199;
									}
				  				}
//								let doctorData = JSON.stringify({
//									serviceDictId : vm.$route.query.id,
//									page : 1,
//									rows : 30,
//								})
								//let portNum = 111183;
								//调111183/111199接口筛选专家
								//console.log("真正数据",JSON.parse(doctorData))
				  				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:portNum, jsonValue:doctorData},{emulateJSON:true}).then( response => {
				  					console.log("筛选数据",response);
				  					//console.log(portNum)
				  					let data = response.body.rows;
				  					console.log("有预约时间筛选出来的数据",data);
	
				  					
									
//									console.log(data[0].items);
				  					if(data.length > 0){//能筛选出专家
				  						if(data.length > 1){//筛选出多个专家
				  							vm.isMore = true;
				  						}else {//只筛选出一个专家
				  							vm.isMore = false;
				  						}
				  						vm.isBeyond = false;
				  					}else {//超出筛选范围
				  						vm.isBeyond = true;
				  						setTimeout(() => {
	           								vm.isLoading = false;
	        							}, 200)
				  						return false;
				  					}
				  					if(vm.$route.query.userId){//选择的另外一个专家
				  						let uId = vm.$route.query.userId;
				  						for(var i = 0;i < data.length;i ++){
				  							if(uId == data[i].userId){
				  								vm.doctorDetail = data[i];
				  								vm.isBlank = true;
				  								break;
				  							}
				  						}
				  					}else {//当前专家，未选择更多专家
				  						vm.doctorDetail = data[0];
				  						vm.isBlank = true;
				  					}
				  					//console.log("渲染数据",vm.doctorDetail)
				  					vm.serviceMoney = vm.doctorDetail.serviceMoney;
				  					vm.serviceNum = vm.doctorDetail.serverCount;
				  					//console.log("最终数据",vm.doctorDetail);
				  					
				  					if(vm.doctorDetail.attentionCount == '1'){//当前医生未被关注
				  						vm.isFocus = true;
				  					}else {//当前医生被关注
				  						vm.isFocus = false;
				  					}
				  					
				  					//调111189接口，查看当前医生是否在休息中
//				  					if(vm.type == '1'){
//										let data = JSON.stringify({
//											userId : vm.doctorDetail.userId,
//											userType : 1,
//											serviceDictId : vm.$route.query.id
//										});
//									vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111189, jsonValue:data},{emulateJSON:true}).then( response => {
//										console.log("111189",response)
//										if(response.body.length > 0){
//											vm.isRelax = false;
//										}else {
//											vm.isRelax = true;
//										}
//									})
//								}else {
//									vm.isRelax = false;
//								}
			  						setTimeout(() => {
	       								vm.isLoading = false;
	    							}, 200)
				  					//赋值ID,实现关注与取消关注
				  					vm.userId = vm.doctorDetail.userId;
									vm.attentionId = vm.doctorDetail.attentionId;
									vm.serviceId = vm.doctorDetail.serviceId;
									//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",vm.serviceId)
			  						if(vm.doctorDetail.authorizeId == null || vm.doctorDetail.authorizeId == ""){
										vm.authorize = false;
									}else {
										vm.authorize = true;
									}
									
												  					/*
				  					 * 多点服务是否必选
				  					 */
			  					
//				  					if(this.normalFee = true){
//				  						var items = data[0].items;
//				  						for(var i = 0;i < items.length;i ++){
//				  							console.log(items[i].defaultItem);
//				  							if(items[i].defaultItem == 1){
//				  								console.log(this.itemsList);
//				  								for(var i = 0;i < this.itemsList.length;i ++){
//				  									console.log(this.itemsList[i].state);
//				  									this.itemsList[i].state = true;
//				  								}
//				  							}
//				  						}

//				  					}
				  					
			  					});
								
						}
						
					}
				});
			},
			focusOn(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//console.log("userId",userInfo.userId);
				let token = userInfo.token;
				if(!this.isFocus){ //当前未被关注
					this.isFocus = true;
					let focusData = JSON.stringify({
						attentionId : this.userId
					});
					//调关注医生接口
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111125, jsonValue:focusData},{emulateJSON:true}).then( response => {
						console.log("调取关注医生接口",response);
					})
				}else { //当前已经被关注
					this.isFocus = false;
					let focusData = JSON.stringify({
						id : this.attentionId
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111126, jsonValue:focusData},{emulateJSON:true}).then( response => {
						console.log("调取取消关注接口",response);
					})
				}
				
			},
			gotoPlace(id,lat,lon){
				console.log(id);
				console.log(lat);
				console.log(lon);
				let vm = this;
				vm.$router.push({
					path: "/server/serverPlace",
					query:{id:id,lat:lat,lon:lon}
				});
			},
			chooseTime(){
				const type = this.serverDetail.reservationMode;
				if(type == 3){ //上下午时间
					this.$router.push({path:"/serverConfirm/appointTimeList",query:{id:this.$route.query.id,userId:this.userId}});
				}else {
					if(this.$route.query.docuserId){
						this.$router.push({path:"/serverConfirm/appointTimeDoc",query:{id:this.$route.query.id,userId:this.userId}});
						
					}else {
						this.$router.push({path:"/serverConfirm/appointTime",query:{id:this.$route.query.id,userId:this.userId}});
					}
				}
			},
			choosePlace(){
				console.log("选择地址")
//				this.$router.push({path:"/serverConfirm/serverAddress"});
				this.$router.push({path:"/serverConfirm/addrManage",query:{type:1}});
			},
			chooseMarr(){
				console.log("选择婚姻")
				this.$router.push({path:"/serverConfirm/serverMarriage"});
			},
			chooseDescribe(){
				console.log("健康描述")
				var serviceType;
				if(this.serviceWay == '图文咨询'){
					serviceType = '0';
				}else {
					serviceType = '1';
				}
				
				this.$router.push({path:"/serverConfirm/healthDescribe",query:{serviceType:serviceType}});
			},
			appointInfo(){
				let vm = this;
				let depCode = vm.depCode;
				let doctorId = vm.$route.query.docuserId;
				sessionStorage.setItem("isServer","1");
				console.log(this.relationEaId);
				if(vm.$route.query.docuserId){//从医生进入
					vm.$router.push({path:"/serverConfirm/departSelect",query:{relationEaId:vm.relationEaId}});
					
					//vm.$router.push({path:"/serverConfirm/departmentDeta",query:{eaId:vm.relationEaId,depCode:depCode,doctorId:doctorId}});
					
				}else {//从服务进入
					vm.$router.push({path:"/serverConfirm/departSelect",query:{relationEaId:vm.relationEaId}});
					
				}
			},
			chooseMore(){
				let lat = this.lat;
				let lon = this.lon;
				this.$router.push({path:"/serverConfirm/serverExperts",query:{id:this.$route.query.id,type:this.type,userId:this.userId,lat:lat,lon:lon}});
			},
			blurMobile(){
				let mobile = this.userMobile;
				this.$store.state.mobile = mobile;
			},
			blurIdCard(){
				let idCard = this.idCard;
				this.$store.state.idCard = idCard;
			},
			listenToMyBoy(somedata){
		    	this.hasError = somedata;
		   },
		   showDetails(){
		   		console.log("展示明细");
		   		let vm = this;
		   		vm.showDetail = true;
		   		//let detailArr = this.itemsList;
		   		//console.log(detailArr)
		   },
		   closeDetail(){
		   		let vm = this;
		   		vm.showDetail = false;
		   },
		   receiveMode(item,index){
		   		this.isActive = index;
		   		if(index == 0) {
		   			this.isMail_address = true;
		   		}else {
		   			this.isMail_address = false;
		   		}
		   },
		   switchTap(item){
		   		let vm = this;
		   		console.log(item);
		   		vm.fee_isSelect = true;
		   		if(!vm.itemsList.length){
		   			console.log(vm.hasServiceFee);
		   			if(vm.hasServiceFee){
		   				vm.serviceAllMoney += Number(vm.serviceFee);
		   			}else {
		   				vm.serviceAllMoney -= Number(vm.serviceFee);
		   			}
		   		}else {
			   		//vm.fee_isSelect = true;
			   		if(!this.serviceAllMoney){
			   			this.serviceAllMoney = Number(this.serviceMoney);
			   			if(item.state){
			   				this.serviceAllMoney += item.serviceItemMoney;
			   			}else {
			   				this.serviceAllMoney -= item.serviceItemMoney;
			   			}
			   		}else {
			   			if(item.state){
			   				this.serviceAllMoney = Number(this.serviceAllMoney);
			   				this.serviceAllMoney += item.serviceItemMoney;
			   			}else {
			   				this.serviceAllMoney -= item.serviceItemMoney;
			   			}
			   		}
		   		}
		   },
			nextTips(){
				let vm = this;
				let type = vm.$route.query.type;
				let id = vm.$route.query.id;
				let pic_num = vm.serviceAllMoney;
				let pic_basis = vm.serviceMoney;
				let pic_registered = vm.registerFee;
				let pic_ser = vm.serviceFee;
				if(vm.isForbid){
					console.log('vm.isForbid');
					return false;
				}
				if(vm.isRelax){
					console.log('vm.isRelax');
					return false;
				}
				if(vm.isBeyond){
					console.log('vm.isBeyond');
					return false;
				}
				if(vm.userMobile == ''){
					vm.isPopup = true;
					vm.messInfo = "请填写手机号码";
					vm.clearStorage();
					return false;
				}
				if(vm.appointInfos == "" && vm.isAppoint){
					vm.isPopup = true;
					vm.messInfo = "请选择预约信息";
					vm.clearStorage();
					return false;
				}
				if(vm.isIdCard){
					if(vm.idCard == ""){
						vm.isPopup = true;
						vm.messInfo = "请输入有效身份证";
						vm.clearStorage();
						return false;
					}else {
						var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
						if(!reg.test(vm.idCard)){
							vm.isPopup = true;
							vm.messInfo = "请输入合法身份证号";
							vm.clearStorage();
							return false;
						}
					}
				}
				if(vm.isMarry){
					if(vm.marryInfo == ""){
						vm.isPopup = true;
						vm.messInfo = "请输入婚姻状况";
						vm.clearStorage();
						return false;
					}
				}
				if(vm.serviceWay == '上门服务'){
					if(vm.address == ""){
						vm.isPopup = true;
						vm.messInfo = "请选择地址";
						vm.clearStorage();
						return false;
					}
				}
				//预约服务判断是否选择服务时间
				if(vm.type == '1'){
					if(vm.time == '' && !vm.isAppoint){
						vm.isPopup = true;
						vm.messInfo = "请选择预约时间";
						vm.clearStorage();
						return false;
					}
				}
				
				//根据服务方式判断输入框选填还是必填
				if(vm.serviceWay == '图文咨询'){
					if(vm.message == ""){
						vm.isPopup = true;
						vm.messInfo = "请输入健康描述";
						vm.clearStorage();
						return false;
					}
				}
				let serverMoney;
				if(!this.serviceAllMoney){//serviceAllMoney为空
					serverMoney = this.serviceMoney;
				}else {
					serverMoney = this.serviceAllMoney;
				}
				
				let customerMailAddress = "";
				
				if(vm.hasMail){
					if(vm.isActive == 0){//邮寄
						if(vm.mail_address != ""){
							customerMailAddress = vm.mail_address;
						}else {//未选择邮寄地址
							vm.isPopup = true;
							vm.messInfo = "请选择邮寄地址";
							vm.clearStorage();
							return false;
						}
					}else {
						customerMailAddress = '自取';
					}
				}
				
				
				let detailInfo = {
					time : this.time,
					text : this.message,
					userName: this.userName,
					mobile : this.userMobile,
					idCard: this.idCard,
					payType: this.payType,
					unitType: this.unitType,
					detail : this.serverDetail,
					serviceId : this.serviceId,
					eaId : this.relationEaId,
					serverMoney: serverMoney,
					registerDate: this.registerDate,
					name : this.doctorDetail.name,
					proTitle : this.doctorDetail.proTitle,
					doctorScheduleId: this.doctorScheduleId,
					department : this.doctorDetail.department,
					customerMaritalState: this.marryInfo,
					customerMailAddress: customerMailAddress
				}
				
				//console.log(detailInfo);
				
				if(vm.serverDetail.reservationMode == 2){
					let obj = JSON.parse(vm.$store.state.appointInfo);
					detailInfo.appoint_name = obj.name;
					detailInfo.appoint_department = obj.department;
					detailInfo.appoint_proTitle = obj.proTitle;
					detailInfo.serviceItemIds = "";
					if(this.hasServiceFee){
						detailInfo.isServiceFlag = 1;
					}else {
						detailInfo.isServiceFlag = 0;
					}
				}else {
					let serviceItemIds = [];
					let itemsList;
					if(!this.$store.state.itemsList){
						itemsList = this.itemsList;
					}else {
						itemsList = this.$store.state.itemsList
					}
					for(var i = 0;i < itemsList.length;i ++){
						if(itemsList[i].state){
							serviceItemIds.push(itemsList[i].serviceDictItemId);
						}
//						if(!serviceItemIds.length){//未选任何服务项目
//							vm.isPopup = true;
//							vm.messInfo = "需至少选择一个服务项目";
//							vm.clearStorage();
//							return false;
//						}
						
					}
					//console.log(serviceItemIds);
					if(!serviceItemIds.length){
						detailInfo.serviceItemIds = "";
					}else {
						detailInfo.serviceItemIds = serviceItemIds.join(",");
					}
				}
				console.log(detailInfo);
				
				//return false;

				//该服务位上门服务
				if(vm.serviceWay = '上门服务'){
					detailInfo.address = vm.address;
				}
				//存储到vuex
				this.$store.orderInfo = detailInfo;
				
				if(vm.authorized){//确认签约授权
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = vm.userId;
					let spliceStr = 'UA001_UA002_UA003_UA004_UA005_UA006_UA007_UA008_UA009';
					let data = JSON.stringify({
						docId : userId,
						type : '1',
						attention : spliceStr
					})
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660037, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response);
						let state = response.body.state;
						if(state == 'add_suc'){
							vm.messSucInfo = '授权成功，请等待确定'
							vm.isSucPopup = true;
							setTimeout(() =>{
								vm.isSucPopup = false;	
								this.$router.push({"path":'/serverConfirm/serverOrder',query:{id:id,type:type}});
							},1000)
						}
					});
					
				}else {//未签约授权
					//跳转到确认订单页面
					this.$router.push({"path":'/serverConfirm/serverOrder',query:{id:id,type:type,pic_num:pic_num,pic_basis:pic_basis,pic_registered:pic_registered,pic_ser:pic_ser}});
				}
				
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },3000);  
			},
			clearBeyondInfo(){
				let time = setTimeout(()=>{
					if( this.beyondRange ==  true){
                		this.beyondRange = false;
                	} 
                },3000); 
			},
			introInfo(){
				console.log("专家介绍");
				console.log(this.doctorDetail);
				let data = this.doctorDetail;
				console.log(data.docSpecialty);
				if(data.docSpecialty == "" || data.docSpecialty == null){
					this.skill = '暂无擅长';
				}else {
					this.skill = data.docSpecialty;
				}
				if(data.docResume == "" || data.docResume == null){
					this.profile = '暂无简介';
				}else {
					this.profile = data.docResume;
				}
				
				this.showInfo = true
			},
			hidePanel(){
				this.showInfo = false;
			},
			authorise(){
				this.authorized = !this.authorized;
				this.$store.state.authorize = this.authorized;
			},
			imgIcon(path){
				if(path){
					return path.split(",")[0]
				}
			},
			closePanel(){
				this.hasPanel = false;
			},
			servDescript(item){
				this.hasPanel = true;
				if(item == '1'){//基础服务费说明
					this.isIframe = false;
				}else {
					this.isIframe = true;
				}
			},
			selectAddress(){
				localStorage.removeItem('areaLoca');
				this.$router.push({name: 'mailAddress'});
			}
		},
		mounted(){
			this.initData();
			//this.initConfirm();
			//this.initDocDetail();
		},
		destroyed(){
			this.$store.state.itemsList = this.itemsList;
			//console.log("vuex",this.$store.state.itemsList);
		}
	}
</script>
<style>
	#server{
		height: 100%;
	}
	#server-confirm{
		width: 100%;
		/*height: 100%;*/
		padding-bottom: 0.94rem;
		background: #fff;
		padding-top: 0.84rem;
	}
	#server-confirm.isFixed{
		position: fixed;
	}
	#server-confirm .loading{
		z-index: 5;
	}
	#server-confirm .server-detail{
		padding: 0.3rem;
		background: #fff;
		border-bottom: 0.12rem solid #f5f5f5;
	}
	#server-confirm .server-detail .serPlace-Info{
		position: relative;
		/*background: url(../../assets/image/server/server-right.png) no-repeat;*/
		/*background-position: right center;*/
		/*background-size: 3%;*/
	}
	.serPlace-Info p{
		width: 6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 0.45rem;
		font-size: 0.22rem;
		color: #5a5a5a;
	}
	.serPlace-Info span{
		position: absolute;
		display: inline-block;
		margin-top: -0.15rem;
		height: 0.3rem;
		right: 0.5rem;
		color: #ff5454;
		top: 50%;
	}
	.serPlace-Info p:first-child{
		margin-top: 0.2rem;
	}
	.serPlace-Info img{
		width: 0.3rem;
		border: 0 none;
		vertical-align: middle;
		margin-right: 0.16rem;
	}
	#server-confirm .server-detail-pic{
		float: left;
		width: 1.64rem;
		height: 1.64rem;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat; 
	}
	#server-confirm .server-detail-info{
		width: 76%;
		padding-left: 0.3rem;
		float: left;
	}
	#server-confirm .server-detail-name{
		color: #333;
		font-size: 0.28rem;
		margin-top: 0.12rem;
	}
	#server-confirm .server-icon_box{
		width: 0.37rem;
		height: 100%;
		float: left;
		background: #fff;
	}
	#server-confirm .server-detail-source{
		color: #b3b3b3;
		font-size: 0.25rem;
		margin-top: 0.25rem;
	}
	#server-confirm .server-detail-source span{
		color: #555;
	}
	.server-detail-price{
		color: #ff5454;
		font-size: 0.18rem;
		margin-top: 0.04rem;
	}
	.server-detail-price ._price{
		font-size: 0.28rem;
		margin-left: 0.08rem;
		font-weight: bold;
	}
	.server-contact-info{
		/*padding: 0 0.3rem;*/
		margin-top: 0.12rem;
		background: #fff;
		border-bottom: 0.12rem solid #f5f5f5;
	}
	.server-contact-info .server-info:last-child{
		border-color: #e6e6e6;
	}
	.server-info-title{
		width: 100%;
		font-size: 0.28rem;
		padding: 0 0.95rem;
		height: 0.68rem;
		line-height: 0.68rem;
		color: #3fa420;
		background-color: #e5fae9;
		letter-spacing: 1px;
		border-bottom: 0.01rem solid #e6e6e6;
		border-top: 0.01rem solid #e6e6e6;
	}
	.server_select_info{
		background-image: url(../../assets/image/server/icon_a.png);
		background-repeat: no-repeat;
		background-position: left 0.26rem center;
		background-size: 5.4%;
	}
	.server_user_info{
		background-image: url(../../assets/image/server/icon_b.png);
		background-repeat: no-repeat;
		background-position: left 0.26rem center;
		background-size: 5.4%;
	}
	.server_detail_info{
		background-image: url(../../assets/image/server/icon_d.png);
		background-repeat: no-repeat;
		background-position: left 0.26rem center;
		background-size: 5%;
	}
	.server_fee_detail{
		width: 100%;
		padding: 0 0.3rem;
		background: #fff;
	}
	.server_fee_detail li{
		width: 100%;
		padding: 0.15rem 0;
	}
	.server_fee_detail .fee_tips{
		width: 100%;
		position: relative;
	}
	.fee_isCheck{
		width: 52px;
		height: 24px;
		position: absolute;
		/*background: red;*/
		top: 0.06rem;
		right: 0;
	}
	.server_fee_detail .fee_ins{
		font-size: 0.23rem;
		color: #999;
		margin-top: 0.2rem;
	}
	.fee_tips span{
		color: #1e1e1e;
		font-size: 0.27rem;
	}
	.fee_tips i{
		color: #f02828;
		font-size: 0.25rem;
		margin-left: 0.2rem;
	}
	.fee_tips img{
		width: 0.3rem;
		border: 0 none;
		vertical-align: middle;
		margin-left: 0.12rem;
	}
	.server-info-name{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-name1{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.68rem;
	}
	.server-info-name1 img{
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	.server-info-name img{
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	.server-contact-info input{
		height: 100%;
		width: 92%;
		display: block;
		float: left;
		border: 0 none;
		outline: none;
		padding-left: 0.3rem;
		font-size: 0.26rem;
		color: #494d4b;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.server-contact-info input.isForbid[disabled]{
		color: red;
	}
	.server-contact-info input[disabled]{
		color: #494d4b;
		opacity: 1;
	}
	.server-info-phone{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-phone img{
		display: block;
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
		margin-left: 0.08rem;
	}
	
	.server-info-time{
		width: 100%;
		height: 0.68rem;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-time a{
		width: 100%;
		height: 100%;
		display: block;
		text-decoration: none;
	}
	.server-info-time img{
		display: block;
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	.server-info-mail{
		width: 100%;
		height: 0.68rem;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-mail a{
		width: 100%;
		height: 100%;
		display: block;
		text-decoration: none;
	}
	.server-info-mail img{
		display: block;
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	.server-info-address{
		width: 100%;
		height: 0.68rem;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-icon_box img{
		display: block;
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	
	.server-info-text{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-text a{
		width: 100%;
		height: 100%;
		display: block;
		text-decoration: none;
	}
	.server-info-text img{
		display:block;
		height: 0.35rem;
		border: 0 none;
		margin-top: 0.17rem;
	}
	.server-doctor{
		padding: 0 0.3rem 1.84rem;
		background: #fff;
	}
	/*超出服务范围*/
	.server-doctor-beyond{
		/*margin-top: 1.1rem;*/
		padding: 1.1rem 0;
		color: #787878;
		width: 100%;
		text-align: center;
		font-size: 0.32rem;
	}
	.server-doctor-top{
		width: 100%;
		height: 0.68rem;
		padding-right: 0.3rem;
		background-color: #e5fae9;
		margin-top: 0.12rem;
		border-bottom: 0.01rem solid #e6e6e6;
		border-top: 0.01rem solid #e6e6e6;
		background-image: url(../../assets/image/server/icon_c.png);
		background-repeat: no-repeat;
		background-position: left 0.26rem center;
		background-size: 5.2%;
		/*width: 92%;
		margin-left: 4%;
		margin-top: 0.12rem;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;*/
	}
	.server-doctor-top h2{
		color: #3fa420;
		font-size: 0.28rem;
		padding-left: 0.95rem;
		height: 100%;
		float: left;
		font-weight: normal;
		line-height: 0.68rem;
		
	}
	.server-doctor-top .server-moreChoose{
		float: right;
		height: 100%;
	}
	.server-doctor-top .server-moreChoose a{
		display: block;
		padding-right: 0.32rem;
		height: 100%;
		font-size: 0.26rem;
		color: #787878;
		line-height: 0.68rem;
		background: url(../../assets/image/server/ARROW.png) no-repeat right -0.1rem center;
		background-size: 45%;
	}
	.server-doctor-info{
		padding: 0.3rem 0;
		position: relative;
	}
	.server-doctor-info .server-doctor-distance{
		position: absolute;
		top: 0.3rem;
		right: 0;
		color: #7a7a7a;
		font-size: 0.24rem;
		line-height: 0.24rem;
	}
	.server-doctor-distance img{
		border: 0 none;
		height: 0.24rem;
		vertical-position: middle;
		margin-left: 0.1rem
	}
	.server-doctor-info .server-doctor-pic{
		width: 1.3rem;
		height: 1.3rem;
		float: left;
	}
	.server-doctor-info .server-doctor-pic img{
		display: block;
		width: 100%;
		height: 100%;
		border: 0 none;
		border-radius: 100%;
	}
	.server-doctor-info .server-doctor-content{
		float: left;
		padding-left: 0.3rem;
		width: 80%;
	}
	.server-doctor-content .server-doctor-name{
		font-size: 0.28rem;
		color: #000;
		letter-spacing: 0.02rem;
		margin-top: 0.1rem;
	}
	.server-doctor-content .server-doctor-work{
		font-size: 0.24rem;
		margin-top: 0.08rem;
		color: #777777;
	}
	.server-doctor-content .server-doctor-place{
		font-size: 0.24rem;
		color: #858585;
	}
	.server-doctor-bottom{
		background: #fff;
		border-bottom: 0.02rem solid #f3f3f3;
	}
	.server-doctor-bottom .server-doctor-foucs{
		width: 1.3rem;
		height: 0.55rem;
		border: 0.02rem solid #e6e6e6;
		background: #f3f3f3;
		float: left;
		color: #069b87;
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.55rem;
		border-radius: 6px;
	}
	.server-doctor-bottom .server-feedback{
		float: left;
		margin-left: 0.3rem;
		width: 76%;
		height: 0.75rem;
		border-top: 0.01rem solid #f3f3f3;
	}
	.server-feedback .server-num{
		color: #7a7a7a;
		font-size: 0.24rem;
		float: left;
		line-height: 0.75rem;
	}
	.server-feedback .server-num span{
		color: #555;
	}
	.server-feedback .server-score{
		float: right;
		line-height: 0.75rem;
		color: #858585;
		font-size: 0.24rem;
	}
	.server-feedback .server-score span{
		color: #4b4e4b;
	}
	#server-confirm .server-opera{
		width: 50%;
		height: 0.94rem;
		background: #009984;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 4;
		border-top: 0.01rem solid #e5e5e5;
	}
	#server-confirm .server-opera.isForbid {
		background: #aaa;
		color: #fff;
	}
	#server-confirm .server-relax{
		width: 50%;
		height: 0.94rem;
		background: #aaa;
		position: fixed;
		z-index: 4;
		right: 0;
		bottom: 0;
		border-top: 0.01rem solid #e5e5e5;
	}
	#server-confirm .server-opera a{
		width: 100%;
		height: 100%;
		display: block;
		color: #fff;
		text-decoration: none;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.94rem;
	}
	#server-confirm .server-relax a{
		width: 100%;
		height: 100%;
		display: block;
		color: #fff;
		text-decoration: none;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.94rem;
	}
	#server-confirm #container{
		
	}
	#errInfo{
		width: 3rem;
		height: 0.8rem;
		position: fixed;
		font-size: 0.24rem;
		line-height: 0.8rem;
		border-radius: 10px;
		color: #fff;
		text-align: center;
		left: 50%;
		margin-left: -1.5rem;
		bottom: 1.1rem;
		background: rgba(0,0,0,0.65);
	}
	#expert-info{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.3);
		z-index: 99;
	}
	#expert-info .expert-info-panel{
		width: 90%;
		position: relative;
		height: 6.2rem;
		top: 50%;
		margin-top: -3.1rem;
		background: #fff;
		margin-left: 5%;
		border-radius: 8px;
	}
	.expert-info-panel .expert-panel-close{
		position: absolute;
		width: 0.4rem;
		height: 0.8rem;
		right: 0.2rem;
		top: -0.8rem;
		background: url(../../assets/image/server/closePro.png) no-repeat center center;
		background-size: 100%;
	}
	.expert-info-panel .expert-info-name{
		width: 100%;
		height: 0.9rem;
		border-bottom: 0.02rem solid #f4f4f4;
		color: #009783;
		font-size: 0.28rem;
		line-height: 0.9rem;
		text-align: center;
	}
	.expert-info-content{
		width: 100%;
		padding: 0.25rem 0.18rem 0;
		font-size: 0.2rem;
		color: #787878;
		max-height: 5rem;
		overflow-y: scroll;
	}
	.expert-info-content .expert-good{
		line-height: 0.32rem;
   		 margin-top: 0.4rem;
	}
	.expert-info-content .expert-profile{
		line-height: 0.32rem;
		margin-top: 0.4rem;
	}
	.server-issued{
		height: 0.28rem;
		line-height: 0.28rem;
		color: #ff5a5a;
		font-size: 0.21rem;
		margin-top: 0.24rem;
		padding-left: 0.45rem;
		background: url(../../assets/image/server/icon-unauthorized.png) no-repeat left center;
		background-size: 4%;
	}
	.server-issued.authorized{
		background: url(../../assets/image/server/icon-anthorize.png) no-repeat left center;
		background-size: 4%;	
	}
	.icon_box_right{
		position: absolute;
		width: 0.2rem;
		height: 0.65rem;
   		left: 6.8rem;
	}
	#server-confirm .server-appiont-info{
		width: 100%;
		padding: 0 0.3rem;
		height: 0.68rem;
		/*border-bottom: 0.02rem solid #e6e6e6;*/
	}
	.server-appiont-info .server-appoint-icon{
		width: 0.37rem;
	    height: 100%;
	    float: left;
	    background: #fff;
	}
	.server-appoint-icon img{
		display: block;
	    width: 0.3rem;
	    border: 0 none;
	    margin-top: 0.17rem;
	}
	#server-confirm .server-info-idcard{
		width: 100%;
		height: 0.68rem;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-idcard .server-idcard-icon{
		width: 0.37rem;
	    height: 100%;
	    float: left;
	    background: #fff;
	}
	.server-idcard-icon img{
		display: block;
	    height: 0.25rem;
	    border: 0 none;
	    margin-top: 0.18rem;
	}
	#server-confirm .server-info-marry{
		width: 100%;
		height: 0.68rem;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-info-marry .server-marry-icon{
		width: 0.37rem;
	    height: 100%;
	    float: left;
	    background: #fff;
	}
	.server-marry-icon img{
		display: block;
	    height: 0.25rem;
	    border: 0 none;
	    margin-top: 0.18rem;
	}
	.detail_price_left{
		float: left;
	}
	.detail_price_left span{
		color: #555;
		font-size: 0.23rem;
	}
	.detail_price_left img{
		width: 0.3rem;
		border: 0 none;
		vertical-align: middle;
		margin-top: -0.04rem;
		margin-left: 0.08rem;
	}
	.detail_price_right{
		float: right;
		color: #999;
		font-size: 0.24rem;
	}
	.detail_price_right img{
		width: 0.36rem;
		border: 0 none;
		vertical-align: middle;
	}
	#server-confirm .service_price{
		width: 50%;
		height: 0.94rem;
		position: fixed;
		z-index: 4;
		background: #fff;
		left: 0;
		bottom: 0;
		font-size: 0.25rem;
		color: #f02828;
		text-align: center;
		line-height: 0.94rem;
		border-top: 0.01rem solid #e5e5e5;
	}
	#server-confirm .service_price span{
		font-size: 0.36rem;
		font-weight: bold;
	}
	#server-confirm .service_price_detail{
		width: 50%;
		height: 0.94rem;
		position: fixed;
		background: #fff;
		z-index: 4;
		left: 0;
		bottom: 0;
		font-size: 0.25rem;
		color: #f02828;
		line-height: 0.94rem;
		border-top: 0.01rem solid #e5e5e5;
	}
	.service_price_detail_price{
		width: 60%;
		height: 100%;
		float: left;
		font-size: 0.25rem;
		color: #f02828;
		line-height: 0.94rem;
		text-align: center;
	}
	.service_price_detail_price span{
		font-size: 0.36rem;
		font-weight: bold;
	}
	.service_price_detail_info{
		width: 40%;
		height: 100%;
		float: left;
		color: #999;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.94rem;
	}
	.service_price_detail_info img{
		border: 0 none;
		width: 0.3rem;
		vertical-align: middle;
		margin-top: -0.06rem;
	}
	#detail-panel{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 3;
		background: rgba(0,0,0,0.3);
	}
	#server-confirm .server_detail_fee{
		width: 100%;
		/*height: 4.1rem;*/
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0.94rem;
		z-index: 4;
		padding: 0 0.5rem;
	}
	.server_detail_fee .detail_top{
		width: 100%;
		height: 0.9rem;
		border-bottom: 0.02rem solid #ebebeb;
	}
	.detail_top i{
		font-size: 0.28rem;
		color: #333;
		line-height: 0.9rem;
		font-weight: bold;
	}
	.detail_top p{
		font-size: 0.25rem;
		color: #f02828;
		line-height: 0.9rem;
		display: inline-block;
		float: right;
	}
	.detail_top span{
		font-size: 0.3rem;
		color: #f02828;
	}
	.detail_content{
		width: 100%;
		/*height: 3.15rem;*/
	}
	.detail_content ul{
		width: 100%;
		max-height: 3.15rem;
		min-height: 0rem;
		padding-bottom: 0.5rem;
		overflow-y: scroll;
	}
	.detail_content ul li{
		line-height: 0.3rem;
		height: 0.3rem;
		border-bottom: 0.03rem dotted #666;
		position: relative;
		margin-top: 0.4rem;
	}
	.detail_content ul li:first-child{
		margin-top: 0.28rem
	}
	.detail_content ul li i{
		font-size: 0.28rem;
		color: #666;
		position: absolute;
		left: 0;
		top: 0;
		height: 0.3rem;
		line-height: 0.3rem;
		background: #fff;
	}
	.detail_content ul li span{
		font-size: 0.28rem;
		color: #666;
		position: absolute;
		right: 0;
		top: 0;
		height: 0.3rem;
		background: #fff;
	}
	#descript-panel{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.2);
		z-index: 4;
	}
	.des_box{
		width: 6.4rem;
		height: 4.85rem;
		left: 50%;
		margin-left: -3.2rem;
		position: fixed;
		top: 50%;
		z-index: 5;
		margin-top: -2.42rem;
		background: #fff;
		border-radius: 8px;
	}
	.des_box h2{
		font-weight: normal;
		height: 1.25rem;
		text-align: center;
		font-size: 0.32rem;
		color: #009983;
		line-height: 1.25rem;
		border-bottom: 0.02rem solid #eee;
	}
	.des_box .close_des{
		width: 0.6rem;
		height: 0.6rem;
		position: absolute;
		background: url(../../assets/image/server/close.png) no-repeat;
		background-size: contain;
		left: 50%;
		margin-left: -0.3rem;
		bottom: -0.8rem;
	}
	.des_box .des_content{
		width: 100%;
		height: 3.6rem;
		padding: 0 0.3rem 0.3rem;
		-webkit-overflow-scrolling: touch; 
  		overflow-y: scroll; 
	}
	.des_content ul{
		width: 100%;
		padding-top: 0.3rem;
	}
	.des_content ul li{
		font-size: 0.26rem;
		color: #666;
		line-height: 0.5rem;
	}
	.des_content iframe{
		width: 100%;
		height: 100%;
		border: 0 none;
	}
	.report_receive{
		height: 100%;
		width: 38%;
		float: left;
		display: flex;
	}
	.report_receive div{
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: flex-end;
		font-size: 0.26rem;
		color: #999;
		background-image: url(../../assets/image/server/receive_mail.png);
		background-repeat: no-repeat;
		background-position-x: 30%;
		background-position-y: center;
		background-size: 24%;
	}
	.report_receive div.active{
		color: #666;
		background-image: url(../../assets/image/server/receive_self.png);
	}
	#mail_address{
		width: 100%;
		height: 1.2rem;
		display: block;
		border: 0 none;
		outline: none;
		background: url(../../assets/image/server/server-right.png) no-repeat;
		background-position: right 0.3rem center;
		background-size: 2%;
		line-height: 1.2rem;
		font-size: 0.26rem;
		color: #494d4b;
		padding-left: 0.7rem;
	}
	#server-confirm .mask-all{
		position: fixed;
	}
	.sercer_box{
		padding: 0.3rem;
	}
	.sercer_box p{
		width: 100%;
	    padding: 0 0.3rem;
	    height: 0.68rem;
	}
	.sercer_box img{
		display: block;
	    height: 0.35rem;
	    border: 0 none;
	    margin-top: 0.17rem;
	    float: left;
	    vertical-align: middle;
	}
	.sercer_box span{
		display: block;
		float:  left;
	}
	.server-info-name1 span{
		float: left;
		width: 80%;
		overflow: hidden;
		display: block;
		margin-left: 0.3rem;
		margin-top: 0.17rem;
		font-size: 0.26rem;
		color: #494d4b;
	}
</style>