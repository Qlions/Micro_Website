<template>
	<div id="server-order">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading"></Loading>
		<p class="server-order-top">请核实您的订单信息，确认无误后进行支付购买</p>
		<div class="server-order-userInfo">
			<p class="order-userName">{{ name }}</p>
			<p class="order-userMobile">{{ mobile }}</p>
			<p class="order-marryInfo" v-if="hasMarryInfo">{{ marryInfo }}</p>
		</div>
		<div class="server-order-idCard" v-if="hasIdCard">身份证号： {{ idCard }}</div>
		<div class="service-address-info" v-if="hasAddress">{{ address }}</div>
		<p class="server-order-title">订单详情</p>
		<div class="server-order-info">
			<div class="server-order-wrap clearfix">
				<div class="server-order-img" :style="{backgroundImage:'url('+ imgIcon(orderInfo.detail.imgUrl) +')'}"></div>
				<div class="server-order-content">
					<p class="order-name">{{ orderInfo.detail.serviceDictName }}</p>
					<p class="order-source">由 <span>{{ orderInfo.detail.eaName }}</span> 提供</p>
					<p class="order-method"><img src="../../assets/image/doctor/server_method1.png" /><span>{{ serviceWay }}</span>
						<p class="newNum">￥<span>{{this.pic_num}}</span><span v-if="this.pic_num == ''">{{ this.pic_basis }}</span></p>
					</p>
				</div>
			</div>
			<div class="server_detail_pic">	
				<!--<div class="detail_top">
					<i>合计</i>
					<p>¥<span>{{this.pic_num}}</span><span v-if="this.pic_num == ''">{{ this.pic_basis }}</span></p>
				</div>-->
				<div class="detail_content">
					<ul>
						<li v-if="this.pic_basis != 0">
							<i>基础服务费</i>
							<span>¥{{this.pic_basis}}</span>
						</li>
						<li v-if="this.pic_registered != ''">
							<i>挂号费</i>
							<span>¥{{this.pic_registered}}</span>
						</li>
						<li v-if="this.pic_ser != ''">
							<i>服务费</i>
							<span>¥{{this.pic_ser}}</span>
						</li>
						<li v-for="item in itemsList" v-if="item.state">
							<i>{{ item.serviceDictItemName }}</i>
							<span>¥{{ item.serviceItemMoney | LegalNumber }}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="server-docInfo" v-if="!isAppoint">
				<p class="server-docInfo-bar">服务专家</p>
				<div class="server-docInfos">
					<p>{{ orderInfo.name }}<span>{{ orderInfo.department?orderInfo.department.split(',')[0]:'' }} {{ orderInfo.proTitle ? orderInfo.proTitle.split(',')[0]:'' }}</span></p>
				</div>
			</div>
			<div class="server-docInfo" v-if="isAppoint">
				<p class="server-docInfo-bar">预约专家</p>
				<div class="server-docInfos">
					<p>{{ orderInfo.appoint_name }}<span>{{ orderInfo.appoint_department?orderInfo.appoint_department.split(',')[0]:'' }} {{ orderInfo.appoint_proTitle ? orderInfo.appoint_proTitle.split(',')[0]:'' }}</span></p>
				</div>
			</div>
			<div class="server-order-time" v-if="type == '1'">
				<p class="server-time-bar">服务时间</p>
				<div class="server-time-info">
					<p>{{ timeInfo }}</p>
				</div>
			</div>
			<div class="server-docInfo" v-if="isAppoint">
				<p class="server-docInfo-bar">服务人员</p>
				<div class="server-docInfos">
					<p>{{ orderInfo.name }}<span>{{ orderInfo.department?orderInfo.department.split(',')[0]:'' }} {{ orderInfo.proTitle ? orderInfo.proTitle.split(',')[0]:'' }}</span></p>
				</div>
			</div>
			<div class="server-order-address" v-if="isAddress">
				<p class="server-address-bar">服务地址</p>
				<div class="server-address-info">
					<p>{{ addressInfo.eaAddressDetail }}</p>
				</div>
			</div>
			<div class="server-order-time" v-if="isAddress">
				<p class="server-time-bar">服务电话</p>
				<div class="server-time-info">
					<p>{{ addressInfo.eaTel }}</p>
				</div>
			</div>
			<div class="server-order-time" v-if="isAddress && addressInfo.shopServiceTime != null && addressInfo.shopServiceTime != ''">
				<p class="server-time-bar">营业时间</p>
				<div class="server-time-info">
					<p>{{ addressInfo.shopServiceTime }}</p>
				</div>
			</div>
			<div class="server-healthText" v-if="message != ''">
				<p class="server-healthText-bar" v-if="serviceWay=='图文咨询'">健康现状描述</p>
				<p class="server-healthText-bar" v-if="serviceWay!=='图文咨询'">备注</p>
				<input type="text" v-model="message" disabled="disabled"/>
			</div>
		</div>
		<p class="server-order-pay">支付</p>
		<div class="server-order-payInfo clearfix">
			<p class="server-pay-methodBar">支付方式</p>
			<p class="server-pay-method" @click="selectPayMethod">{{ payMethod }}</p>
		</div>
		<div class="server-order-price clearfix">
			<p class="order-price-left">服务价格</p>
			<p class="order-price-right"><span>¥ {{ Number(orderInfo.serverMoney) | LegalNumber}}</span></p>
		</div>
		<div class="server-price-true">
			<p>实付:<span>¥ {{ Number(orderInfo.serverMoney) | LegalNumber}}</span></p>
		</div>
		<div class="submitOrder" @click="submitOrder">提交订单</div>
		<popup v-show="isPopup" :message="messInfo"></popup>

		<!-- 新版弹出框 -->
		<div class="server-order-popup" v-if="isOrderPopup">
			<div class="server-order-popup-model" id="footTalk">
				<div class="server-order-popup-content">
					<i @click="codeOrderPopup"><img src="../../assets/image/closePro.png" alt=""></i>
					<div class="server-order-popup-model-content-prompt">
						<img src="../../assets/image/icon_deng.png" alt="">
						<p>您今日累计取消预约类服务已达上限（3次），您可于{{GetDateStr(1)}}继续购买此类服务或选择非预约类服务购买</p>
						<a href="javascript:void(0)" @click="getTo">选择其他服务</a>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 如果未付款订超过3个或者预约类未处理订单有1个弹出框 -->
		<div class="server-popupBox" v-if="isOrderPopup_2">
			<div class="server-popupItem">
				<p>由于您今日还有1个预约类订单未处理，无法继续购买预约类服务！快去处理吧</p>
				<div class="server-bottom_box">
					<span @click="close()">取消</span>
					<i @click="sureOut()">确定</i>
					<em></em>
				</div>
			</div>
		</div>
		<!-- 线下支付提示 -->
		<div class="server-popupBox" v-if="isUnderPay">
			<div class="server-popupItem">
				<p>订单已经提交，请前往服务订单查看</p>
				<div class="server-bottom_box_pay">
					<i @click="toOrder()">确定</i>
					<em></em>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import popup from '../common/error-popup.vue'
	export default {
		data (){
			return {
				titleName:"确认订单",
				isLoading:true,
				isPopup: false,
				isAddress:false,
				isAppoint: false,
				hasAddress: false,
				isUnderPay: false,
				type:this.$route.query.type,
				payMethod: "",
				payType: "",
				message: "",
				idCard: "",
				serviceWay:"",
				messInfo: "",
				timeInfo: "",
				marryInfo: "",
				hasMarryInfo: false,
				hasIdCard: false,
				addressInfo: "",
				address: "",
				orderInfo : this.$store.orderInfo,
				name : "",
				mobile:"",
				isOrderPopup:false,
				isOrderPopup_2:false,
				pic_num:this.$route.query.pic_num,
				pic_basis:this.$route.query.pic_basis,
				pic_registered:this.$route.query.pic_registered,
				pic_ser:this.$route.query.pic_ser,
				itemsList: [],
			}
		},
		components:{
			Heads,
			Loading,
			popup
		},
		methods:{
			initInfo(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo);
				this.name = this.$store.orderInfo.userName;
				this.payType = this.$store.orderInfo.payType; 
				if(!this.orderInfo.appoint_name){
					this.isAppoint = false;
				}else {
					this.isAppoint = true;
				}
				if(!this.$route.query.payType){
					if(this.payType.includes('1')){
						this.payMethod = '在线支付';
					}else {
						this.payMethod = '线下支付';
					}
				}else {
					let _payType = this.$route.query.payType;
					if(_payType == '0'){
						this.payMethod = '在线支付';
					}else {
						this.payMethod = '线下支付';
					}
				}
				if(this.$store.orderInfo){
					this.message = this.$store.orderInfo.text;
				}else {
					this.message = "";
				}
				
				//渲染手机号
				this.mobile = this.$store.orderInfo.mobile;
				
				this.timeInfo = this.$store.orderInfo.time;
				
				//渲染婚姻状况
				if(this.$store.orderInfo.customerMaritalState == ""){
					this.hasMarryInfo = false;
				}else {
					this.marryInfo = this.$store.orderInfo.customerMaritalState;
					this.hasMarryInfo = true
				}
				
				//渲染身份证号
				if(this.$store.orderInfo.idCard == ""){
					this.hasIdCard = false;
				}else {
					this.hasIdCard = true;
					this.idCard = this.$store.orderInfo.idCard;
				}
				
				if(this.$store.orderInfo.detail.serviceDictWay == '上门服务'){
					this.address = this.orderInfo.address;
					this.hasAddress = true;
				}
				if(this.orderInfo.detail.serviceDictComponent == 'F003'){
					this.serviceWay = "电话咨询"
				}else {
					this.serviceWay = this.orderInfo.detail.serviceDictWay
					if(this.serviceWay == '门诊(店)服务' || this.serviceWay == '综合服务'){
						this.isAddress = true;
					}else {
						this.isAddress = false;
					}
				}
				
			},
			initAddr(){
				let vm = this;
				let id = vm.$route.query.id;
				vm.itemsList = vm.$store.state.itemsList;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let localInfo = JSON.parse(window.sessionStorage.getItem("localInfo"));
				console.log("1",localInfo);
				let token = userInfo.token;
				let lat = localInfo.lat;
				let lon = localInfo.lon;	
				let eaId = window.sessionStorage.getItem("server_eaId");
				let data = JSON.stringify({
					serviceDictId : id,
					lat: lat,
					lon: lon,
					opType: "1"
				})
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111177, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					let arr = response.body.rows;
					if(eaId == null){
						vm.addressInfo = arr[0];
					}else {
						let num = 0;
						for(var i = 0;i < arr.length;i ++){
							if(eaId == arr[i].eaId){
								vm.addressInfo = arr[i];
								break;
							}else {
								num ++;
							}
						}
						if(num == arr.length){
							vm.addressInfo = arr[0];
						}
					}
					setTimeout(() => {
		            	vm.isLoading = false;
		        	}, 100)
				})
				
			},
			selectPayMethod(){
				let id = this.$route.query.id;
				let type = this.$route.query.type;
				let payType = this.payType;
				console.log(payType);
				if(payType.includes(',')){					
					this.$router.push({path: '/serverOrder/selectPayMethod',query:{id:id,type:type}});
				}
			},
			submitOrder(){//提交订单
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let dateStr = "";
				let time = "";
				let payType;
				let serviceType = this.$route.query.type;
				let token = userInfo.token;
				let userId = userInfo.userId;
				let vData = this.$store.orderInfo;
				let payMethod = this.payMethod;
				if(payMethod == '在线支付'){
					payType = '0'
				}else {
					payType = '2'
				}
				let customerMaritalState;
//				let customerMailAddress;
				if(vData.customerMaritalState == '未婚'){
					customerMaritalState = '1';
				}else if(vData.customerMaritalState == '已婚'){
					customerMaritalState = '2';
				}else if(vData.customerMaritalState == '丧偶'){
					customerMaritalState = '3';
				}else if(vData.customerMaritalState == '离婚'){
					customerMaritalState = '4';
				}else {
					customerMaritalState = '5';
				}
				
				if(this.$store.timeInfo){
					let day = this.$store.timeInfo.dates.split('-');
					time = this.$store.timeInfo.time;
					for(var i in day){
						dateStr += day[i];
					}
				}else{
					dateStr = "";
					time = "";
				}
				//判断订单类型
				if(serviceType == '0'){
					var orderData = {
						userId : userId,
						payType: payType,
						customerMaritalState: customerMaritalState,
						customerCartNo: this.idCard,
						serviceDictId : this.$route.query.id,
						content : vData.text,
						serviceId:vData.serviceId,
						customerName : userInfo.name,
						customerMobile : vData.mobile,
						serviceItemIds: vData.serviceItemIds
					}
					if(this.serviceWay == '上门服务'){
						orderData.customerAddress = this.address;
					}
					
				}else {
					var orderData = {
						userId : userId,
						payType: payType,
						customerMaritalState: customerMaritalState,
						customerCartNo: this.idCard,
						serviceDictId : this.$route.query.id,
						serviceId:vData.serviceId,
						dataDay : dateStr,
						content : vData.text,
						customerName : userInfo.name,
						customerMobile : vData.mobile,
						serviceItemIds: vData.serviceItemIds
					}
					if(this.serviceWay == '上门服务'){
						orderData.customerAddress = this.address;
					}
					if(time == '上午'){
						orderData.timeScope = 1;
					}else if(time == '下午'){
						orderData.timeScope = 2;
					}else {
						orderData.timeScope = time;
					}
					
				}
				
				//邮寄地址
				if(vData.customerMailAddress != ""){
					orderData.customerMailAddress = JSON.stringify({
						address: vData.customerMailAddress
					});
				}
				
				//绿色通道必要参数
				if(vData.registerDate != ""){
					orderData.serviceDoctorId = vData.serviceId;
					orderData.registerDate = vData.registerDate;
					orderData.doctorScheduleId = vData.doctorScheduleId;
					orderData.unitType = vData.unitType;
					orderData.isServiceFlag = '1';
				}
				
				console.log("下订单参数",orderData);
				
//				return false;
				
				//下单接口
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660085, jsonValue:JSON.stringify(orderData)},{emulateJSON:true}).then( response => {
					console.log(response);
					let state = response.body.state;
					//console.log(state);
					let vm = this;
					if(state == 'err_01'){
						vm.isOrderPopup = true;
						vm.messInfo = "订单取消超过3次";
						vm.clearStorage();
					}
					if(state == 'err_02'){
						vm.isOrderPopup_2 = true;
					}
					if(state == 'err_03'){
						vm.isPopup = true;
						vm.messInfo = "该服务不可预约";
						vm.clearStorage();
					}
					if(state == 'err_04'){
						vm.isPopup = true;
						vm.messInfo = "购买的服务不存在";
						vm.clearStorage();
					}
					if(state == 'err_05'){
						vm.isPopup = true;
						vm.messInfo = "预约时间为空";
						vm.clearStorage();
					}
					if(state == 'err_06'){
						vm.isPopup = true;
						vm.messInfo = "参数异常";
						vm.clearStorage();
					}
					if(state == 'err_10'){
						vm.isOrderPopup_2 = true;
					}
					if(state == 'suc'){//成功回调
						console.log(response);
						vm.$store.state.orderObj = response;
						let orderId = response.body.orderId;
						console.log("数据",vData.detail);
						let imgArr = this.$store.state.imgList;
						console.log("图片数组",imgArr);
						if(imgArr.length > 0){
							let userId = userInfo.userId;
	                		let userCode = userInfo.userCode;
	                		let eaId = userInfo.eaId;
	                		let type = response.body.moduletype;
	                		console.log("660085type",type);
	                		let moduletypeId;
	                		if(response.body.questionId){
	                			moduletypeId = response.body.questionId;
	                		}else {
	                			moduletypeId = response.body.orderId;
	                		}
	                		
	                		//上传图片，表单格式
	                		const data = new FormData();
	                		
	                		for(var i = 0;i < imgArr.length;i ++){
	                			data.append('picArrayFile',imgArr[i].file);
		                		data.append('userId',userId);
		                		data.append('userCode',userCode);
		                		data.append('eaId',eaId);
		                		data.append('type','service_order_attached_pic');
		                		data.append('moduletypeId',moduletypeId);
	                			
	                		}
	                		
	                		const xhr = new XMLHttpRequest();
			                xhr.open('POST', '/webapiProxy/webapi/picAppUpload.action', true)
			                xhr.send(data);
			                xhr.onload = () => {
			                	let judeg = xhr.response;
			                	let jsonObj = JSON.parse(judeg);
			                	let vm = this;
			                	console.log(jsonObj);
			                	if(jsonObj.picUploadState == 'add_suc'){
			                		console.log('upload success!')
			                		if(payType == '2'){//线下支付
			                			vm.isUnderPay = true;
			                		}else {
				                		let money = Number(vm.orderInfo.serverMoney);
				                		if(money == 0){
					                		vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}});
				                		}else {
					                		vm.$router.push({"path":"/serverConfirm/serverOrder/orderPayment",query:{orderId:orderId}});
				                		}
			                		}
			                	}else {
			                		console.log("提交订单失败");
			                	}
			                }

						}else{
							console.log("下单成功");
							if(payType == '2'){//线下支付
								vm.isUnderPay = true;
							}else {
								let money = Number(vm.orderInfo.serverMoney);
								if(money == 0){
									vm.$router.push({path:"/orderPayment/paySuccess",query:{money:money}});
								}else {
									vm.$router.push({"path":"/serverConfirm/serverOrder/orderPayment",query:{orderId:orderId}});
								}
								
							}
						}
						
					}	
					
				})
				
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },3000);  
			},
			codeOrderPopup () {
				this.isOrderPopup = false;
			},
			getTo () {
				this.$router.push('/server/main');
			},
			GetDateStr(AddDayCount) {
			    var dd = new Date();
			    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
			    var m = dd.getMonth()+1;//获取当前月份的日期
			    var d = dd.getDate();
			    return m+"月"+d+'日';
			},
			close () {
				this.isOrderPopup_2 = false;
			},
			sureOut () {
				this.isOrderPopup_2 = false;
				this.$router.push('/my/myOrders');
			},
			toOrder(){
				console.log("去订单");
				this.$router.push('/my/myOrders');
			},
			imgIcon(path){
				if(path){
					return path.split(",")[0]
				}
			}

		},
		mounted(){
			this.initInfo();
			this.initAddr();
		}
		
	}
</script>
<style>
	#server-order{
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		padding-top: 0.84rem;
	}
	#server-order .server-order-top{
		width: 100%;
		height: 0.7rem;
		background: #faf5e8;
		font-size: 0.26rem;
		color: #f59746;
		line-height: 0.7rem;
		text-align: center;
	}
	.server-order-userInfo{
		width: 100%;
		height: 0.82rem;
		background: #fff;
		color: #333;
		padding-left: 0.3rem;
	}
	.server-order-userInfo .order-userName{
		float: left;
		font-size: 0.26rem;
		margin-right: 0.34rem;
		line-height: 0.82rem;
	}
	.server-order-userInfo .order-userMobile{
		float: left;
		font-size: 0.23rem;
		line-height: 0.82rem;
	}
	.server-order-userInfo .order-marryInfo{
		float: left;
		font-size: 0.23rem;
		line-height: 0.82rem;
		margin-left: 0.2rem;
	}
	.server-address-info{
		float: left;
    	margin-left: 0.35rem;
    	height: 100%;
	}
	.server-order-title{
		width: 100%;
		height: 0.82rem;
		background: #f5f5f5;
		padding-left: 0.3rem;
		color: #4a4c4a;
		font-size: 0.26rem;
		line-height: 0.82rem;
	}
	#server-order .server-order-info{
		padding: 0.3rem;
		padding-bottom: 0;
		background: #fff;
	}
	.server-order-wrap{
		width: 100%;
		border-bottom: 0.19rem solid #f5f5f5;
		padding-bottom: 0.3rem;
	}
	.server-order-info .server-order-img{
		width: 1.4rem;
		height: 1.4rem;
		float: left;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;  
	}
	.server-order-info .server-order-content{
		float: left;
		margin-left: 0.3rem;
		width: 74%;
	}
	.server-order-content .order-name{
		font-size: 0.26rem;
		color: #333;
		font-weight: bold;
	}
	.server-order-content .order-source{
		font-size: 0.26rem;
		color: #a8a8ab;
		margin-top: 0.12rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.server-order-content .order-source span{
		color: #777979;
	}

	.server-order-content .order-method img{
		float: left;
		border: 0 none;
		height: 0.28rem;
		margin-top: 0.08rem;
		margin-right: 0.12rem;
	}
	.server-order-content .order-method span{
		font-size: 0.26rem;
		color: #a8a8ab;
		float: left;
	}
	.server-docInfo{
		width: 100%;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-docInfo .server-docInfo-bar{
		width: 1.56rem;
		float: left;
		font-size: 0.26rem;
		line-height: 0.68rem;
	}
	.server-docInfo .server-docInfos{
		width: 70%;
		margin-left: 0.35rem;
		height: 100%;
		float: left;
	}
	.server-docInfo .server-docInfos p{
		height: 100%;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 0.68rem;
		color: #fc9912;
		font-size: 0.26rem;
	}
	.server-docInfo .server-docInfos span{
		color: #b7b7b9;
		font-size: 0.26rem;
		margin-left: 0.16rem;
	}
	.server-order-time{
		width: 100%;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-order-address{
		width: 100%;
		height: 0.68rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	.server-order-address .server-address-bar{
		width: 1.56rem;
		float: left;
		font-size: 0.26rem;
		color: #4a4c4a;
		line-height: 0.68rem;
	}
	.server-order-address .server-address-info p{
	  	height: 0.5rem;
	  	margin-top: 0.09rem;
	   	width: 4.6rem;
	   	line-height: 0.34rem;
	   	display: flex;
	   	justify-content: space-around;
		flex-direction: column;
	    color: #4a4c4a;
	    font-size: 0.25rem;
	}
	.server-order-time .server-time-bar{
		width: 1.56rem;
		float: left;
		font-size: 0.26rem;
		color: #4a4c4a;
		line-height: 0.68rem;
	}
	.server-order-time .server-time-info{
		float: left;
		margin-left: 0.35rem;
		height: 100%;
	}
	.server-order-time .server-time-info p{
		width: 4.6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 100%;
	    line-height: 0.68rem;
	    color: #4a4c4a;
	    font-size: 0.26rem;
	}
	.server-healthText{
		width: 100%;
		height: 0.68rem;
	}
	.server-healthText .server-healthText-bar{
		width: 1.56rem;
		float: left;
		font-size: 0.26rem;
		color: #4a4c4a;
		line-height: 0.68rem;
		margin-right: 0.35rem;
		
	}
	.server-healthText input{
		float: left;
		display: block;
		border: 0 none;
		outline: none;
		height: 100%;
		width: 68%;
		line-height: 0.68rem;
		color: #b0b0b2;
		font-size: 0.26rem;
		background: #fff;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.server-healthText input[disabled]{
		color: #b0b0b2;
		opacity: 1;
	}
	.server-order-pay{
		width: 100%;
		height: 0.82rem;
		background: #f5f5f5;
		padding-left: 0.3rem;
		color: #4a4c4a;
		font-size: 0.26rem;
		line-height: 0.82rem;
	}
	.server-order-payInfo{
		padding: 0 0.3rem;
		/*border-bottom: 0.02rem solid #e6e6e6;*/
		height: 0.7rem;
		line-height: 0.7rem;
		background: #fff;
	}
	.server-pay-methodBar{
		float: left;
		color: #666;
		font-size: 0.26rem;
	}
	.server-pay-method{
		float: right;
		padding-right: 0.32rem;
		font-size: 0.26rem;
		color: #4b4e4b;
		background: url(../../assets/image/server/server-right.png) no-repeat right center;
		background-size: 10%;
	}
	.server-order-price{
		padding: 0 0.3rem;
		height: 0.7rem;
		line-height: 0.7rem;
		margin-top: 0.11rem;
		background: #fff;
		border-bottom: 0.02rem solid #f5f5f5;
	}
	.server-order-price .order-price-left{
		font-size: 0.26rem;
		float: left;
		color: #4a4d4a;
		/*font-weight: bold;*/
	}
	.server-order-price .order-price-left span{
		color: #ff5454;
		font-size: 0.21rem;
		font-weight: bold;
		margin-left: 0.08rem;
	}
	.server-order-price .order-price-right{
		font-size: 0.3rem;
		color: #4a4d4a;
		float: right;
		font-weight: bold;
	}
	.server-order-price .order-price-right span{
		color: #ff5454;
		font-size: 0.26rem;
		margin-left: 0.08rem;
		font-weight: bold;
	}
	.server-price-true{
		width: 100%;
		padding: 0.6rem 0.3rem 0;
		
		height: 2.8rem;
		
		background: #fff;
	}
	.server-price-true p{
		font-size: 0.28rem;
		color: #4b4e4b;
		float: right;
	}
	.server-price-true span{
		font-size: 0.32rem;
		color: #ff5454;
		font-weight: bold;
		margin-left: 0.2rem;
	}
	#server-order .submitOrder{
		width: 100%;
		height: 0.94rem;
		background: #009984;
		color: #fff;
		font-size: 0.36rem;
		text-align: center;
		line-height: 0.94rem;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	#server-order .service-address-info{
		padding-left: 0.3rem;
		width: 100%;
		height: 0.6rem;
		line-height: 0.35rem;
		background: #fff;
	}
	#server-order .server-order-idCard{
		padding-left: 0.3rem;
		width: 100%;
		height: 0.6rem;
		line-height: 0.35rem;
		background: #fff;
	}

	/* 弹出框样式 */
	.server-order-popup-model {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.22);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.server-order-popup-content {
		position: relative;
	}
	.server-order-popup-content i img {
		position: absolute;
		width: 0.5rem;
		top: -0.8rem;
		right: 0.1rem; 
	}
	.server-order-popup-content {
		width: 7rem;
		background: #fff;
		border-radius: .1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -3rem 0 0 -3.5rem;
	}
	.server-order-popup-model-content-title {
		text-align: center;
		font-size: .38rem;
		padding: .3rem 0;
	}
	.server-order-popup-model-content-prompt {
		padding: .8rem;
		text-align: center;
	}
	.server-order-popup-model-content-prompt img {
		padding-bottom: .2rem;
	}
	.server-order-popup-model-content-prompt p {
		color: #999;
		font-size: .28rem;
		text-align: center;
	}
	.server-order-popup-model-content-prompt a {
		width: 80%;
		height: .8rem;
		margin: 0 auto;
		background: #009983;
		display: block;
		text-align: center;
		line-height: .8rem;
		font-size: .28rem;
		color: #fff;
		border-radius: .1rem;
		margin-top: .3rem;
	}

	.server-popupBox {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.server-popupItem {
		color: #666;
		width: 80%;
		position: absolute;
		top:35%;
		left: 10%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.server-popupItem p {
		text-align: center;
		padding: .5rem;
	}
	.server-bottom_box {
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.server-bottom_box_pay {
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.server-bottom_box span {
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.server-bottom_box i {
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.server-bottom_box_pay i{
		float: left;
		display: inline-block;
		width: 100%;
		text-align: center;
		color: #666;
	}
	.server-bottom_box em {
		height: 0.5rem;
		width: 1px;
		background: #e6e6e6;
		position: absolute;
		top: 0.25rem;
		left: 50%;
	}
	.server_detail_pic{
		width: 100%;
		/*height: 3.1rem;*/
		background: #fff;
	}
	.server_detail_pic .detail_top i{
		font-size: 0.28rem;
		color: #333;
		line-height: 0.9rem;
		font-weight: bold;
	}
	.server_detail_pic .detail_top p{
		font-size: 0.25rem;
		color: #f02828;
		line-height: 0.9rem;
		display: inline-block;
		float: right;
	}
	.server_detail_pic .detail_top span{
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
	.newNum{
		float: right;
		font-size: 0.3rem;
	    color: #f02828;
	}
	.newNum span{
		font-size: 0.3rem;
	    color: #f02828;
	}
</style>
