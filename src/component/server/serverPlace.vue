<template>
	<div id="server-place">
		<Heads :title="titleName">
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
		</Heads>
		<Loading v-if="isLoading"></Loading>
		<div id="container"></div>
		<div class="address-list" id="address-list" v-show="isShow">
			<div class="address-Info" v-for="(item,index) in serviceList" @click="serverAdder(item.eaId)">
				<div class="address-title clearfix">
					<span class="address_icon" v-if="!isZoom">{{index+1}}</span>
					<span class="address_icon" v-if="isZoom">●</span>
					<p class="address_name">{{ item.eaName }}</p>
				</div>
				<p class="server_address">{{ item.eaAddressDetail }}</p>
				<p class="server_bell">{{ item.eaTel }}</p>
				<p class="server_time" v-if="item.shopServiceTime != null">营业时间：{{ item.shopServiceTime }}</p>
				<p class="server_distance" v-if="isDistance && item.distance != '-1' && item.distance != null">{{ item.distance | getDistance }}</p>
			</div>
		</div>
		<div id="address-num" v-show="!isHide" @click="backToIndex">共{{ serverNum }}个服务网点</div>
	</div>
</template>
<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data(){
			return {
				titleName: "服务地址",
				isLoading: true,
				isDistance: true,
				isShow: true,
				isHide: true,
				isZoom: false,
				serverNum: "",
				serviceList:"",
				serviceName: "",
				address: "",
				bell: "",
				addrData:"",
				lat: "",
				lon: ""
			}
		},
		components:{
			Heads,
			Loading
		},
		filters:{
			getDistance(val){
				let dis = Number(val);
				if(dis >= 1000){
					return (dis/1000).toFixed(1) + "公里";
				}else {
					return dis.toFixed(0) + "米";
				}
			}
		},
		methods:{
			init(){
				let vm = this;
				let id = vm.$route.query.id;
				let token = "";
				let lat = vm.$route.query.lat;
				if(!lat){//未获取到经纬度，需要重新定位(从服务订单进入)
					console.log("重新定位");
					let shopId = vm.$route.query.shopId;
					var mapObj = new AMap.Map('container');
					mapObj.plugin('AMap.Geolocation', function () {
				    var geolocation = new AMap.Geolocation({
				        enableHighAccuracy: true,//是否使用高精度定位，默认:true
				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        				showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
        				panToLocation: false,
        				showMarker: false
				    });
				    mapObj.addControl(geolocation);
				    geolocation.getCurrentPosition();
				    AMap.event.addListener(geolocation, 'complete', function(res){
				    	console.log(res);
				    	vm.lat = res.position.lat;
						vm.lon = res.position.lng;
						//eaId
						let addressData = JSON.stringify({
							serviceDictId : id,
							lat: vm.lat,
							lon: vm.lon,
							opType: "2",
							shopId: shopId
						});
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111177,jsonValue: addressData}, {emulateJSON: true}).then(response => {
							console.log(response);
							let data = response.body.rows;
							vm.initData(data);
							vm.showList(data);
						})
				    });//返回定位信息
				    AMap.event.addListener(geolocation, 'error', function(err){
				    	console.log(err)
				    	vm.lat = "39.91837";
				    	vm.lon = "116.41534";
				    	vm.isDistance = false;
				    	let addressData = JSON.stringify({
							serviceDictId : id,
							lat: vm.lat,
							lon: vm.lon,
							opType: "1"
						});
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111177,jsonValue: addressData}, {emulateJSON: true}).then(response => {
							console.log(response);
							let data = response.body.rows;
							vm.initData(data);
							vm.showList(data);
						})
				    	
				    });//返回定位出错信息
				});
				}else {
					console.log("不需要重新定位");
					let id = vm.$route.query.id;
					vm.lat = vm.$route.query.lat;
					vm.lon = vm.$route.query.lon;
					let addressData = JSON.stringify({
						serviceDictId : id,
						lat: vm.lat,
						lon: vm.lon,
						opType: "1"
					});
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111177,jsonValue: addressData}, {emulateJSON: true}).then(response => {
						let data = response.body.rows;
						vm.addrData = data;
						vm.initData(data);
						vm.showList(data);
						setTimeout(() => {
							vm.isLoading = false;
						},400)
					})
				}
			},
			initData(data){
				let vm = this;
				if(data.length > 1){
					document.getElementById("container").style.height = '50%';
					document.getElementById("address-list").style.height = '50%';
				}else {
					document.getElementById("container").style.height = '80%';
					document.getElementById("address-list").style.height = '20%';
				}
				let lat = vm.lat;
				let lon = vm.lon;
				let arr = [{latitude:lat,longitude:lon}];
				var markers = [];
				for(var i = 0;i < data.length;i ++){
					arr.push(data[i]);
				}
				var mapObj = new AMap.Map('container',{
					resizeEnable: true,
      				zoom:15
				});
				for(var j = 0;j < arr.length;j ++){
					var marker;
					var index = j;
					let a = arr[j].latitude;
					let b = arr[j].longitude;
					if(j == 0){
						marker = new AMap.Marker({
		    				position: [b,a],
		    				//icon: '../../../src/assets/image/server/my_location.png',
		    				zIndex: 101,
		    				map: mapObj,
		    				icon:new AMap.Icon({
		    					size: new AMap.Size(30, 36),  //图标大小
//		    					image: 'http://192.168.18.71:8080/src/assets/image/server/my_location.png'
//		    					image: 'http://192.168.19.187:8070/website/src/assets/image/server/my_location.png'
		    					image: 'http://weixin.zgjky.cn/wbchat/website/src/assets/image/server/my_location.png'
		    				})
						})
					}else {
						if(arr.length <= 2){
							marker = new AMap.Marker({
				    			position: [b,a],
				    			zIndex: 101,
				    			map: mapObj,
				    			content:"●"
							});
							vm.isZoom = true;
						}else {
							marker = new AMap.Marker({
				    			position: [b,a],
				    			zIndex: 101,
				    			map: mapObj,
				    			content:""+(j)
							});
						}
						markers.push(marker)
					}
					
				}
				
				for(var m = 0;m < markers.length;m ++){
					markers[m].index = m;
					markers[m].on("click",function(){
						let index = this.index;
						console.log(this)
						let h = document.getElementById("container").style.height;
						if(data.length <= 1){
							return false;
						}
						if(h == '50%'){
							document.getElementById("container").style.height = '90%';
							document.getElementById("address-list").style.height = '10%';
							vm.isHide = false;
							vm.isShow = false;
							vm.serverNum = data.length;
						}else {	
							vm.isZoom = true;
							document.getElementById("container").style.height = '80%';
							document.getElementById("address-list").style.height = '20%';
							let maplat = data[index].latitude;
							let maplon = data[index].longitude;
							let a = maplon + "," + maplat;
							mapObj.setZoom(16);
							mapObj.setCenter([maplon,maplat]);
							vm.isHide = true;
							vm.isShow = true;
							vm.serviceList = [];
							vm.serviceList.push(data[index]);
							for(var n = 0;n < markers.length;n ++){
								if(n == index){
									markers[n].setContent("●")
								}else {
									markers[n].setContent(n+1+"")
								}
							}
							
						}
					})
				}
				mapObj.setFitView();
				mapObj.on("click",function(){
					if(data.length <= 1){
						return false;
					}
					document.getElementById("container").style.height = '90%'
					vm.isShow = false;
					vm.serverNum = data.length;
					vm.isHide = false;
				})
			},
			showList(data){
				let vm = this;
				console.log(data);
				vm.serviceList = data;
				vm.isLoading = false;
			},
			serverAdder(id){
				let vm = this;
				let shopId = vm.$route.query.shopId;
				if(!shopId){
					let loc = window.sessionStorage;
					loc.setItem("server_eaId",id);
					vm.$router.go(-1);
				}
			},
			backToIndex(){
				let vm = this;
				let shopId = vm.$route.query.shopId;
				if(shopId){
					console.log("该退ddd出了")
					vm.$router.go(-1);
					return false;
				}
				let data = vm.addrData;
				let l = data.length;
				if(l == 1){
					console.log("该退dd出了")
					vm.$router.go(-1);
					return false;
				}
				let h = document.getElementById("container").style.height;
				console.log("h",h)
				if(h == '90%' || h == '80%'){//地图放大状态
					console.log("90%")
					if(l > 1){//多网点服务
						document.getElementById("container").style.height = '50%'
						document.getElementById("address-list").style.height = '50%'
						vm.isShow = true;
						vm.showList(data);
					}else {
						vm.$router.go(-1);
						return false;
					}
				}else {
					console.log("该退出了")
					vm.$router.go(-1);
				}
				vm.isHide = true;
				vm.isZoom = false;
				vm.initData(data);
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style>
	#server{
		width: 100%;
		height: 100%;
	}
	#server-place{
		width: 100%;
		height: 100%;
	}
	#server-place .head_null{
		position: fixed;
	}
	#server-place #container{
		width: 100%;
		height: 80%;
		padding-top: 0.84rem;
	}
	#server-place #container .amap-marker-content{
		width: 19px;
		height: 33px;
		line-height: 25px;
		text-align: center;
		color: #fff;
		background:url(../../assets/image/server/mark_a.png) no-repeat center center;
		background-size: contain;
	}
	
	#server-place .address-list{
		width: 100%;
		/*height: 4.5rem;*/
		height: 20%;
		overflow-y: scroll;
	}
	#server-place #address-num{
		width: 100%;
		height: 10%;
		font-size: 0.28rem;
		line-height: 1.2rem;
		text-align: center;
	}
	#server-place .address-Info{
		background: #fff;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		padding-bottom: 0.15rem;
		position: relative;
		border-bottom: 0.02rem solid #E1E1E1;
	}
	#server-place .address-Info:last-child{
		border: 0 none;
	}
	#server-place .address-Info .address_icon{
		width: 19px;
		height: 28px;
		color: #fff;
		float: left;
		line-height: 22px;
		text-align: center;
		margin-right: 0.12rem;
		display: inline-block;
		font-size: 0.26rem;
		background: url(../../assets/image/server/mark_a.png);
		background-size: 100%;
	}
	#server-place .amap-icon img{
		width: 100%;
	}
	#server-place .address-Info .address_name{
		float: left;
		width: 75%;
	}
	.address-Info .address-title{
		font-size: 0.35rem;
		color: #4a4c4a;
		padding: 0.2rem 0;
		line-height: 28px;
		width: 76%;
	}
	.address-Info .server_address{
		font-size: 0.24rem;
		color: #777;
		/*background: url(../../assets/image/server/server-address.png) no-repeat left center;*/
		/*background-size: 4%;*/
		padding-left: 0.5rem;
		width: 75%;
	}
	.address-Info .server_bell{
		font-size: 0.24rem;
		margin-top: 0.25rem;
		color: #777;
		background: url(../../assets/image/server/bell_icon.png) no-repeat left center;
		background-size: 4%;
		padding-left: 0.5rem;
	}
	.address-Info .server_time{
		width: 75%;
		font-size: 0.24rem;
		margin-top: 0.25rem;
		color: #777;
		background: url(../../assets/image/server/server_time.png) no-repeat left center;
		background-size: 4%;
		padding-left: 0.5rem;
		margin-bottom: 0.15rem;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.address-Info .server_distance{
		position: absolute;
		font-size: 0.28rem;
		color: #4a4c4a;
		top: 0.2rem;
		right: 0.5rem;
	}
	.address-Info .server-address-btn{
		width: 1.17rem;
		height: 1.17rem;
		position: absolute;
		color: #fff;
		font-size: 0.26rem;
		background: #ff5454;
		border-radius: 50%;
		text-align: center;
		line-height: 1.17rem;
		top: 0.58rem;
		right: 0.3rem;
		text-decoration: none;
	}
</style>