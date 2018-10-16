<template>
	<div id="serverMap">
		<div class="map-title">
			<b @click="backBtn">
				<img src="../../assets/image/head-back.png" alt="返回图标">
			</b>
			<div class="map-serach">
				<span></span>
				<input type="text" v-model="txt" @keyup="get" id="keyword" name="keyword" placeholder="请输入关键字：(选定后搜索)"/>
			</div>
		</div>
		<div class="map-serach-list" v-show="isShow">
			<ul>
				<li v-for="item in list" @click="getName(item.name,item.location)">
					<p class="list-name">{{ item.name }}</p>
					<p class="list-address">{{ item.district+item.address }}</p>
				</li>
			</ul>
		</div>
		<div id='container'></div>
		<div class="periphery-list">
			<ul>
				<li v-for="item in peripheryList" @click="getName(item.name,item.location)">
					<p class="list-name">{{ item.name }}</p>
					<p class="list-address">{{ item.address }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import AMap from 'AMap'	
	export default {
		data () {
			return {
				txt:"",
				list:[],
				isShow:false,
				peripheryList:[],
//				lat:'39.91838',
//				lon:'116.41535',
				lat: this.$route.query.lat,
				lon: this.$route.query.lon,
			}
		},
		methods:{
			backBtn () {
				this.$router.go(-1);
			},
			get () {
				let vm = this;
				var map, geolocation,autocomplete;
				AMap.plugin('AMap.Autocomplete',function(){//回调函数
				    var autoOptions = {
				        city: "", //城市，默认全国
				    };
				    autocomplete= new AMap.Autocomplete(autoOptions);
				    autocomplete.search(vm.txt, function(status, result){
				    	console.log(result)
				        vm.list = result.tips;
				        vm.isShow = true;
				    });
				})
			},
			getName (name,loc) {
//				let addressInfo = {
//					addressName : name,
//					lat : loc.O,
//					lon : loc.M
//				}
				let addressInfo = JSON.stringify({
					addressName : name,
					lat : loc.O,
					lon : loc.M
				});
//				this.$store.state.addressInfo = addressInfo;
				window.localStorage.setItem("areaLoca",addressInfo);
				this.$router.go(-1);
				this.isShow = false;
			}
		},
		mounted () {
			let vm = this;
			let onComplete;
			let woven = "";
	
			var map = new AMap.Map('container', {
				center: [116.41535,39.91838],
	            zoom: 16,
	            scrollWheel: false,
        	})
			
			if(localStorage.areaLoca){
				let aa = JSON.parse(localStorage.getItem("areaLoca"));
				vm.txt = aa.addressName;
				vm.lat = aa.lat;
				vm.lon = aa.lon;
				console.log(vm.lat);
				console.log(vm.lon);
				var map = new AMap.Map('container', {
					center: [vm.lon,vm.lat],
		            zoom: 16,
		            scrollWheel: false,
	       		 })
			}else if(this.lat != ''){
				var map = new AMap.Map('container', {
					center: [vm.lon,vm.lat],
		            zoom: 16,
		            scrollWheel: false,
	        	})
			}
				
			
			AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {    
		        var positionPicker = new PositionPicker({
		            mode: 'dragMap',
		            map: map
		        });
		        positionPicker.on('success', function(positionResult) {
		            vm.peripheryList = positionResult.regeocode.pois;
		            //console.log(vm.peripheryList);
		        });    
		        positionPicker.start();
		   });
//		    map.plugin('AMap.Geolocation', function() {
//		        var geolocation = new AMap.Geolocation({
//		            enableHighAccuracy: true,//是否使用高精度定位，默认:true
//		            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//		            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//		            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//		            buttonPosition:'RB'
//		        });
//		        console.log(geolocation);
//		        map.addControl(geolocation);
//		        geolocation.getCurrentPosition();
//		        AMap.event.addListener(geolocation, 'complete', function(res){
//		        	console.log(res)
//		        });//返回定位信息
//		    });	    
		}
	}
</script>
<style>
	#serverMap #container {
		width:100%; 
		height: 7.0rem; 
		padding-top: .84rem;
	}
	.map-title {
		width: 100%;
		height: .84rem;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 99999999;
	}
	.map-title b {
		display: block;
		width: 0.85rem;
		height: .85rem;
		float: left;
	}
	.map-title img {
		width: 60%;
		margin-top: 15%;
	}
	.map-serach {
		width: 80%;
		height: .65rem;
		background: #e6e6e6;
		border-radius: 1rem;
		float: left;
		margin-top: .1rem;
	}
	.map-serach span {
		width: .45rem;
		height: .5rem;
		display: block;
		float: left;
		background: url(../../assets/image/my/search.png) no-repeat center;
		background-size: 100%;
		margin: .07rem .1rem 0 .2rem;
	}
	
	.map-serach input {
		line-height:.65rem; 
		margin-left: 50xz;
		width: 75%;
		color: #b2b1b7;
		font-size: .28rem;
		float: left;
	}
	.map-serach-list {
		position: fixed;
		z-index: 9999999;
		background: #fff;
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-top: .84rem;
	}
	.map-serach-list ul li {
		border-bottom: 1px solid #d7d7d7;
		margin-left: 0.3rem;
		padding: 0.2rem 0;
	}
	.list-name {
		color: #333;
		font-size: .32rem;
	}
	.list-address {
		color: #4a4a4a;
		font-size: .28rem;
	}
	.periphery-list {
		width: 100%;
		height: 5.2rem;
		background: #fff;
		overflow: hidden;
		overflow-y: auto;
		position: relative;
		bottom: 0;
		-webkit-overflow-scrolling: touch;
	}
	.periphery-list ul li {
		border-bottom: 1px solid #d7d7d7;
		margin-left: 0.3rem;
		padding: 0.2rem 0;
	}
	.amap-copyright {
		display: none !important;
	}
</style>