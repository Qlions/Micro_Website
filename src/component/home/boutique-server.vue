<template>
	<div class="boutique-server-list">
		<Heads :title="titleName" class="headIndex">
			<!-- <router-link :to='{ path:"/server/serverSearch",query:filterDatas}'>
				<div class="search_btn"></div>
			</router-link> -->
			<div id="address-point" @click="addressPoint" :style="{ top:activeSearchTop }">
				<p>{{ adName }}</p>
			</div>
		</Heads>
		<!--筛选tab切换-->
		<!-- <ul class="tab-bar">
			<li v-for="(item,index) in tabList" @click="tabView(index,item)" :class="{active : index == isActive}">
				<a>
					<span>{{ item.txt }}</span>
					<img :src="item.src" v-if="index == isActive" alt="" />
					<img :src="fixSrc" v-if="index != isActive" alt="" />
				</a>
			</li>
		</ul> -->
		<div class="tab-panel" v-if="isPanel" @touchmove.prevent @click="hideTabPanel">
			<!--<ul>
				<li v-for="item in optionList">{{ item.options }}</li>
			</ul>-->
		</div>
		<ul class="tab-panels" v-if="isPanel" :style="{ top:activeTabTop }">
			<li v-for="(item,index) in optionList" :class="item.className" @click="filterTips(item)">{{ item.options }}</li>
		</ul>
		<Loading v-if="isLoading" class="loading"></Loading>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
		</div>
		<div v-if="dataHide == 1">
			<scroller style="width:100%;background: #fff;position: absolute;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			ref="my_scroller"
			v-if='isLoading == false'
			:style="{ 'padding-top':activeTop }"
			>
				<div class="gzh-addedHealth">
					<ul>
						<li class="clearfix" v-for="list in addedHealthList">
							<a @click.stop="toDetail(list)">
							<!--<router-link :to='({path:"/server/serverDetail",query:{id:list.serviceDictId,type:list.serviceDictReservation}})'>-->
								<div class="listImg" :style="{backgroundImage:'url('+ imgIcon(list.imgUrl) +')'}"></div>
								<div class="listContent listContent_added">
									<p class="server-name">{{list.serviceDictName}}</p>
									<p class="server-source">由 <span class="server-point">{{list.eaName}}</span> 提供服务</p>
									<div class="server-method clearfix">
										<p class="server-way">
											<img src="../../assets/image/server/server_method.png" alt="" />											
											{{ list.serviceDictComponent !== null ? list.serviceDictComponent : list.serviceDictWay }}
										</p>
										<p class="server-time" v-if="list.serviceDictTime != null && list.serviceDictTime != ''">
											<img src="../../assets/image/server/server_time.png" alt="" />
											{{list.serviceDictTime}}分钟
										</p>
									</div>
									<p class="server-price"><span v-html="serviceMoney(list)"></span></p>
									<p class="server-buy" 
										@click.stop="toConform(list)" 
										v-if='list.serviceDictReservation == "0"'>
										购买<img src="../../assets/image/server/buy_icon.png"/>
									</p>
									<p class="server-appiont" 
										@click.stop="toConform(list)" 
										v-if='list.serviceDictReservation == "1"'>
										预约<img src="../../assets/image/server/yuyuepic.png"/>
									</p>
									<p class="server-posi" v-if="list.distance != '-1' && list.distance != null">{{ list.distance | getDistance}}<img src="../../assets/image/server/posi_icon.png"/></p>
								</div>
							</a>	
							<!--</router-link>-->
						</li>
					</ul>
				</div>
			</scroller>
		</div>
		<div id="iCenter"></div>
		<myFooter></myFooter>
	</div>	
		
</template>
<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import myFooter from '../common/footer.vue'
	export default {
		data (){
			return {
				titleName : "精品服务",
				isLoading: true,
				isPanel: false,
				isFirst:true,
				isActive: -1,
				dataHide: 1,
				page: 1,
				rows: 8,
				fixSrc: './src/assets/image/server/arrow-down.png',
				addedHealthList: [],
				lat: "",
				lon: "",
				adCode: "",
				addrCode: "",
				adName: "",
				addrName: "",
				adLevel: "",
				sequence: "",
				optionList: "",
				filterA: "",
				filterB: "",
				filterC: "",
				filterD: "",
				index: -1,
				dataItem: "",
				filterDatas: "",
				activeTop: ".84rem",
				activeSearchTop: "",
				activeTabTop: "",
				hasError: "",
				tabList: [
					{
						txt: '综合',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '综合排序',
								txt: '综合',
								index: 0,
								value: '1',
								className: 'left'
							},
							{
								options: '离我最近',
								txt: '距离',
								index: 0,
								value: '2',
								className: 'left'
							},
							{
								options: '销量最多',
								txt: '销量',
								index: 0,
								value: '4',
								className: 'left'
							},
							{
								options: '评价优先',
								txt: '评价',
								index: 0,
								value: '5',
								className: 'left'
							}
						]
					},
					{
						txt: '价格',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: ""
					},
					{
						txt: '类型',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '全部',
								txt: '全部',
								index: 2,
								className: 'middle'
							},
							{
								options: '图文服务',
								txt: '图文',
								index: 2,
								value: '2',
								className: 'middle'
							},
							{
								options: '门诊(店)服务',
								txt: '门诊(店)',
								index: 2,
								value: '3',
								className: 'middle'
							},
							{
								options: '上门服务',
								txt: '上门',
								index: 2,
								value: '2',
								className: 'middle'
							}
						]
					},
					{
						txt: '全部',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '全部',
								txt: '全部',
								index: 3,
								className: 'right'
							},{
								options: '医护上门',
								txt: '医护上门',
								index: 3,
								value: 'ST001',
								className: 'right'
							},{
								options: '口腔健康',
								txt: '口腔健康',
								index: 3,
								value: 'ST002',
								className: 'right'
							},{
								options: '就医陪诊',
								txt: '就医陪诊',
								index: 3,
								value: 'ST003',
								className: 'right'
							},{
								options: '中医调理',
								txt: '中医调理',
								index: 3,
								value: 'ST004',
								className: 'right'
							},{
								options: '产后母婴',
								txt: '产后母婴',
								index: 3,
								value: 'ST005',
								className: 'right'
							},{
								options: '健康体检',
								txt: '健康体检',
								index: 3,
								value: 'ST006',
								className: 'right'
							},{
								options: '健康管理',
								txt: '健康管理',
								index: 3,
								value: 'ST007',
								className: 'right'
							},{
								options: '运动健身',
								txt: '运动健身',
								index: 3,
								value: 'ST008',
								className: 'right'
							},{
								options: '康复理疗',
								txt: '康复理疗',
								index: 3,
								value: 'ST009',
								className: 'right'
							},{
								options: '专家咨询',
								txt: '专家咨询',
								index: 3,
								value: 'ST010',
								className: 'right'
							}
						]
					}
				]
			}
		},
		components:{
			Heads,
			myFooter,
			Loading
		},
		created(){
			mui.previewImage().close();
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
			initHealthList(){
				let token = "";
				if(!this.lat){//未获取到经纬度
					if(this.filterDatas == ""){
						var data = JSON.stringify({
							page: 1,
							rows: 8,
							platType:"2",
							boutiqueService:"1",
							ignoreLogin: 1
						});
					}else {
						var data = JSON.stringify(this.filterDatas);
					}
				}else{//获取到经纬度
					if(this.filterDatas == ""){
						var data = JSON.stringify({
							page: 1,
							rows: 8,
							platType:"2",
							sortDictType:"2",
							ignoreLogin: "1",
							boutiqueService:"1",
							lat:this.lat,
							lon:this.lon,
							serviceDictScopeLevel: this.adLevel,
							"d.serviceDictScopeCode": this.adCode
						});
					}else {
						var data = JSON.stringify(this.filterDatas);
					}
				}
				this.filterDatas = JSON.parse(data);
				//服务列表接口
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body == null){
						this.dataHide = 0;
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
					}else {
						this.dataHide = 1;
						this.addedHealthList = response.body.rows;
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
	
					}
					
				})
			},
			getPosition(){
				let vm = this;	
				if(vm.$store.state.addressInfo != ""){//不是第一次进入服务
					console.log("vuex存的数据",vm.$store.state.addressInfo);
					let addressInfo = JSON.parse(vm.$store.state.addressInfo);
					vm.lat = addressInfo.lat;
					vm.lon = addressInfo.lon;
					vm.adName = addressInfo.adName;
					vm.adCode = addressInfo.adCode;
					vm.adLevel = addressInfo.adLevel;
					vm.initHealthList();
				}else {//第一次进入服务
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
							if(res.addressComponent.building == ""){
								vm.adName = res.addressComponent.street;
							}else {
								vm.adName = res.addressComponent.building;
							}
							vm.addrName = res.addressComponent.building;
							vm.adCode = res.addressComponent.adcode + "00";
							vm.addrCode = res.addressComponent.adcode + "00";
							vm.adLevel = '3';
							let localInfo = JSON.stringify({
								lat : vm.lat,
								lon : vm.lon,
								adName: vm.adName,
								addrName: vm.addrName,
								adCode: vm.adCode,
								adLevel: vm.adLevel
							});
							vm.$store.state.addressInfo = localInfo;
							window.sessionStorage.setItem("localInfo",localInfo);
							vm.initHealthList();
					    });//返回定位信息
					    AMap.event.addListener(geolocation, 'error', function(err){
					    	console.log(err)
					    	vm.adName = "北京市";
					    	vm.adCode = '11000000';
					    	vm.adLevel = '1';
					    	vm.lat = "";
					    	vm.lon = "";
					    	let localInfo = JSON.stringify({
								lat : "",
								lon : "",
								adName: vm.adName,
								addrName: vm.addrName,
								adCode: vm.adCode,
								adLevel: vm.adLevel
							});
							vm.$store.state.addressInfo = localInfo;
							window.sessionStorage.setItem("localInfo",localInfo);
					    	vm.initHealthList();
					    });      //返回定位出错信息
					});
				}
				
			},
			toDetail(item){//跳入服务详情
				let id = item.serviceDictId;
				let type = item.serviceDictReservation;
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				console.log(relationEaId);
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.marryInfo = "";
				this.$store.state.idCard = "";
				sessionStorage.setItem("server_relationEaId",relationEaId);
				this.$router.push({path:"/server/serverDetail",query:{id:id,type:type}});
			},
			toConform(item){//跳入服务填写
				let id = item.serviceDictId;
				let type = item.serviceDictReservation;
				let money = item.serviceDictMoney;
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				sessionStorage.setItem("server_relationEaId",relationEaId)
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.marryInfo = "";
				this.$store.state.idCard = "";
				window.localStorage.removeItem("passValue");
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type,money:money}});
				
			},
			refresh (done) {
				setTimeout(() => {
					if(this.filterDatas == ""){
						this.rows = 8;
					}else {
						this.filterDatas.rows = 8;
					}
					this.initHealthList();
					done();
				}, 1000)
			},
			infinite (done) {
				let token = "";
				if(!this.lat){//未获取到经纬度
					if(this.filterDatas == ""){
						var data = JSON.stringify({
							page:this.page,
							rows:this.rows+8,
							boutiqueService:"1",
							platType:"2"
						});
					}else {
						this.filterDatas.rows = this.rows+8;
						var data = JSON.stringify(this.filterDatas);
					}
				}else {//已经获取到经纬度
					if(this.filterDatas == ""){
						var data = JSON.stringify({
							page:this.page,
							rows:this.rows+8,
							platType:"2",
							sortDictType:"2",
							boutiqueService:"1",
							lat:this.lat,
							lon:this.lon
						});
					}else {
						this.filterDatas.rows = this.rows+8;
						var data = JSON.stringify(this.filterDatas);
					}
				}
				//服务列表接口
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
				
					console.log(this.addedHealthList);
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1000)
			          return;
			        }
					setTimeout(() => {
						this.addedHealthList = response.body.rows;
						done();					
					}, 1000)
					this.rows+=8
				})
			},
			serviceMoney(obj){//服务money,filter
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				if(min == max){
					return "<i>¥</i>" + obj.serviceDictMoney.toFixed(2);
				}else {
					let serviceMoney = "<i>¥</i>" + min.toFixed(2) + "~ <i>¥</i>" + max.toFixed(2);
					return serviceMoney;
				}
			},
			tabView(index,item){//筛选栏点击
				let vm = this;
				let userInfo = JSON.parse(vm.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
				vm.index = index;
				vm.dataItem = item;
				vm.isActive = index;
				for(var i in vm.tabList){
					if(i == index){
						continue;
					}
					vm.tabList[i].isShow = false;
				}
				if(!item.isShow){//未展开
					item.src = './src/assets/image/server/arrow-up.png';
					item.isShow = true;
					if(index == 1){
						console.log("升序")
						console.log("vm.filterDatas",vm.filterDatas);
						let request = "";
						if(vm.filterDatas != ""){
							vm.filterDatas.sortDictType = '3';
							vm.filterDatas.sortDictMoney = '1';
							request = vm.filterDatas;
						}else {
							let filterData = {
								page: vm.page,
								rows: vm.rows,
								platType:"2"
							}
							filterData.sortDictType = '3';
							filterData.sortDictMoney = '1';
							request = filterData;
							vm.filterDatas = filterData;
						}
						console.log("帅选数据",request);
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:JSON.stringify(request)},{emulateJSON:true}).then( response => {
							console.log(response);
							vm.addedHealthList = response.body.rows;
							setTimeout(() => {
			               		vm.isLoading = false;
			            	}, 500)
						})
						return false;
					}else if(index == 0){
						
					}
					
					vm.optionList = item.tabSelect;
					vm.isPanel = true;
				}else{//已经展开
					item.src = './src/assets/image/server/arrow-down.png';
					item.isShow = false;
					if(index == 1){
						console.log("降序")
						let request = "";
						if(vm.filterDatas != ""){
							vm.filterDatas.sortDictType = '3';
							vm.filterDatas.sortDictMoney = '2';
							request = vm.filterDatas;
						}else {
							let filterData = {
								page: vm.page,
								rows: vm.rows,
								platType:"2"
							}
							filterData.sortDictType = '3';
							filterData.sortDictMoney = '2';
							request = filterData;
							vm.filterDatas = filterData;
						}
						console.log("帅选数据",request);
						vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:JSON.stringify(request)},{emulateJSON:true}).then( response => {
							console.log(response);
							vm.addedHealthList = response.body.rows;
							setTimeout(() => {
			               		vm.isLoading = false;
			            	}, 500)
						})
						return false;
					}
					vm.isPanel = false;
				}
			},
			filterTips(item){//筛选条件点击
				let vm = this;
				vm.isLoading = true;
				let userInfo =  JSON.parse(vm.$cookie.get('userInfo'));
				let token = "";
				let index = vm.index;
				let data = vm.dataItem;
				console.log("全局筛选数据",this.filterDatas);
				console.log("是否获取到经纬度",vm.lat);
				vm.rows = 8;
				if(!vm.lat){//未获取到经纬度
					var filterData = {
						page: "1",
						rows: "10",
						platType:2,
						sortDictType:1,
						ignoreLogin: 1,
						serviceDictScopeLevel: vm.adLevel,
						"d.serviceDictScopeCode": vm.adCode
					}
				}else {//获取到经纬度
					console.log("获取到经纬度了，，，，，，，，，，，，，")
					var filterData = {
						page: vm.page,
						rows: vm.rows,
						platType:"2",
						lat: vm.lat,
						lon: vm.lon,
						sortDictType:"1",
						serviceDictScopeLevel: vm.adLevel,
						"d.serviceDictScopeCode": vm.adCode
					}
				}
				vm.tabView(index,data);
				data.txt = item.txt;
				if(index == 0){ //filterA
					vm.filterA = item.value;
				}
				if(index == 2){ //filterC
					vm.filterC = item.value;
				}
				if(index == 3){ //filterD
					vm.filterD = item.value;
				}
				
				//筛选信息
				if(vm.filterA != ""){
					filterData.sortDictType = vm.filterA;
				}
				if(vm.filterC != ""){
					console.log(item.options)
					if(item.options == '图文服务'){
						filterData.serviceDictType = vm.filterC;
					}else{
						filterData.serviceDictWay = vm.filterC;
					}
				}
				if(vm.filterD != ""){
					if(item.options != '全部'){
						filterData.typeCode = vm.filterD;
					}
				}
				
				console.log(filterData);
				
				vm.filterDatas = filterData;
				
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
					console.log(response);
					vm.addedHealthList = response.body.rows;
					setTimeout(() => {
			            vm.isLoading = false;
			        }, 500)
				})
			},
			addressPoint(){//点击事件，进入地址选择页面
				let vm = this;
				let adCode = vm.adCode;
				let adName = vm.adName;
				let lat = vm.lat;
				let lon = vm.lon;
				console.log(vm.$route.query.lat);
				console.log(lat);
				if(vm.$route.query.lat == "" || lat == ""){
					console.log("进入地点时为空");
					vm.$router.push({path:"/server/addressPoint",query:{code:adCode,addrName:"",lat:lat,lon:lon}});
					
				}else {
					console.log("进入地点时有值");
					vm.$router.push({path:"/server/addressPoint",query:{code:adCode,addrName:adName,lat:lat,lon:lon}});
				}
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
			hideTabPanel () {//隐藏tab切换
				let vm = this;
				let index = vm.index;
				let data = vm.dataItem;
				vm.tabView(index,data);
			},
		},
		mounted(){
			this.getPosition();
		},
		deactivated(){
			this.$refs.my_scroller.finishInfinite(2);
		},
		activated(){
			let vm = this;
			let token = "";
			let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
			vm.isLoading = true;
			window.sessionStorage.removeItem("server_eaId");
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = 1.64 + "rem";
				this.activeSearchTop = 0.12 + "rem";
				this.activeTabTop = 0;
			}else {
				this.activeTop = 2.84+'rem';
				this.activeSearchTop = 1.24 + "rem";
				this.activeTabTop = 1.16 + "rem";
			}
			if(vm.$route.query.code){//从选择地址页面跳转至此
				if(this.filterDatas != ""){
					this.filterDatas.lat = vm.$route.query.lat;
					this.filterDatas.lon = vm.$route.query.lon;
					this.filterDatas.serviceDictScopeLevel = vm.$route.query.level;
					this.filterDatas["d.serviceDictScopeCode"] = vm.$route.query.code;
				}else {
					this.filterDatas = {
						page: 1,
						rows: 8,
						platType:"2",
						sortDictType:"2",
						boutiqueService:"1",
						lat:vm.$route.query.lat,
						lon:vm.$route.query.lon,
						serviceDictScopeLevel: vm.$route.query.level,
						"d.serviceDictScopeCode": vm.$route.query.code
					}
				}
				vm.lat = vm.$route.query.lat;
				vm.lon = vm.$route.query.lon;
				console.log("最终filterDatas",this.filterDatas);
				vm.$http.post(api,{token:token, infoType:111180, jsonValue:JSON.stringify(vm.filterDatas)},{emulateJSON:true}).then( response => {
					console.log("根据地点筛选",response);
					vm.addedHealthList = response.body.rows;
					vm.adCode = vm.$route.query.code;
					vm.adName = vm.$route.query.adName;
					vm.adLevel = vm.$route.query.level;
					let addressInfo = {
						lat: vm.lat,
						lon: vm.lon,
						adName: vm.adName,
						addrName: vm.adName,
						adCode: vm.adCode,
						adLevel: vm.adLevel
					}
					vm.$store.state.addressInfo = JSON.stringify(addressInfo);
					window.sessionStorage.setItem("localInfo",vm.$store.state.addressInfo);
					setTimeout(() => {
			            vm.isLoading = false;
			        }, 100)
				})
			}else {//底部tab切换或者后退到服务列表
				console.log("22222222222222222")
				if(vm.$store.state.addressInfo != ""){
					window.sessionStorage.setItem("localInfo",vm.$store.state.addressInfo);
					let data = JSON.parse(vm.$store.state.addressInfo);
					vm.adName = data.adName;
					vm.adCode = data.adCode;
					vm.lat = data.lat;
					vm.lon = data.lon;
					vm.adLevel = data.adLevel;
					if(vm.filterDatas == ""){
						vm.filterDatas = {
							page: 1,
							rows: 8,
							platType:"2",
							sortDictType:"2",
							boutiqueService:"1",
							lat:vm.lat,
							lon:vm.lon,
							serviceDictScopeLevel: vm.adLevel,
							"d.serviceDictScopeCode": vm.adCode
						}
					}else {
						vm.filterDatas.lat = vm.lat;
						vm.filterDatas.lon = vm.lon;
						vm.filterDatas.serviceDictScopeLevel = vm.adLevel;
						vm.filterDatas["d.serviceDictScopeCode"] = vm.adCode;
					}
					
					console.log("切换筛选数据",vm.filterDatas);
					vm.$http.post(api,{token:token, infoType:111180, jsonValue:JSON.stringify(vm.filterDatas)},{emulateJSON:true}).then( response => {
						console.log(response);
						vm.addedHealthList = response.body.rows;
						setTimeout(() => {
			               	vm.isLoading = false;
			            }, 100)
					})
					
				}

			}
			
		}
		
	}
</script>

<style>
	#server{
		height: 100%;
	}
	.loading{
		background: #fff !important;
	}
	.boutique-server-list #address-point{
		width: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 0.58rem;
		right: 0.4rem;
		top: 0.13rem;
		text-indent: 0.28rem;
		line-height: 0.58rem;
		font-size: 0.26rem;
		border-radius: 0.58rem;
		color: #fff;
		background: url(../../assets/image/server/address-point.png) no-repeat #05917d;
		background-position: right 0.24rem center; 
		background-size: 12%;
		position: fixed;
		
	}
	.boutique-server-list #address-point p{
		width: 1.4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search_btn{
		background: url(../../assets/image/doctor/sear.png) no-repeat;
		width: 0.5rem;
		height: 100%;
		background-size: contain;
		position: relative;
		left: 90.5%;
		background-position-y: center;
	}
	.boutique-server-list .server-data-null{
		width: 90%;
		margin: 0.84rem 5%;
	}
	.boutique-server-list .server-data-null i {
		display: block;
		width: 3.5rem;
		height: 3.5rem;
		position: relative;
		top: 2.5rem;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center ;
		background-size: 3.5rem;
		margin: 0 auto;
	}
	.server-data-null p{
		float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.35rem;
	}
	.boutique-server-list{
		height: 100%;
	}
	.boutique-server-list .gzh-basicHealth-title {
		font-size: 0.28rem;
		color: #009985;
		width: 100%;
		height: 0.9rem;
		background: #f5f5f5;
		line-height: 0.9rem;
		text-indent: 0.32rem;
	}
	.boutique-server-list .tab-bar{
		width: 100%;
		background: #f4f5f6;
		position: fixed;
		left: 0;
		/*top: 0.84rem;*/
		z-index: 99;
	}
	.boutique-server-list .tab-bar li{
		width: 25%;
		padding: 0.2rem 0;
		float: left;
	}
	.boutique-server-list .tab-bar img{
		width: 0.2rem;
		border: 0 none;
		margin-left: 0.1rem;
		vertical-align: middle;
	}
	.boutique-server-list .tab-bar li.active a{
		color: #12a08d;
		/*background: url(../../assets/image/server/arrow-up.png) no-repeat right 0.52rem center;*/
		/*background-size: 10%;*/
	}
	.boutique-server-list .tab-bar a{
		display: block;
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
		color: #7f7f7f;
		/*text-indent: 0.52rem;*/
		text-align: center;
		font-size: 0.24rem;
		border-right: 0.02rem solid #eaeaea;
		/*background: url(../../assets/image/server/arrow-down.png) no-repeat right 0.52rem center;*/
		/*background-size: 10%;*/
	}
	.boutique-server-list .tab-bar li:last-child a{
		border: 0 none;
	}
	.tab-panel{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
		background: rgba(0,0,0,0.3);
		/*display: none;*/
	}
	.tab-panels{
		width: 100%;
		max-height: 7rem;
		background: #fff;
		margin-top: 1.64rem;
		padding: 0 0.35rem;
		position: fixed;
		top: 0;
		z-index: 3;
		overflow-y: scroll;
	}
	.tab-panels li{
		width: 100%;
		height: 0.9rem;
		text-align: center;
		font-size: 0.27rem;
		line-height: 0.9rem;
		border-bottom: 0.02rem solid #f3f3f3;
	}
	.tab-panels li.left{
		text-align: left;
	}
	.tab-panels li.middle{
		text-align: center;
	}
	.tab-panels li.right{
		text-align: right;
	}
	.tab-panels li:last-child{
		border: 0 none;
	}
	.gzh-basicHealth{
		width: 100%;
	}
	.gzh-basicHealth li{
		padding: 0.3rem;
		
	}
	.gzh-basicHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
	}
	.gzh-basicHealth li .listImg{
		width: 2rem;
		height: 2rem;
		vertical-align: top;
		border: 0 none;
		display: inline-block;
		float: left;
	}
	.gzh-basicHealth li .listContent_basic{
		float: left;
		padding-left: 0.3rem;
	}
	.listContent_basic .server-name{
		font-size: 0.28rem;
		color: #333;
		margin-top: 0.28rem;
	}
	.listContent_basic .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.1rem;
	}
	.listContent_basic .server-source .server-point{
		color: #494949;
	}
	.listContent_basic .server-place{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.1rem;
	}
	.listContent_basic .server-place img{
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	
	.gzh-addedHealth{
		width: 100%;
		/*padding-top: 0.8rem;*/
	}
	.gzh-addedHealth ul{
		padding-bottom: 0.5rem;
	}
	.gzh-addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh-addedHealth li:last-child{
		border: 0 none;
	}
	.gzh-addedHealth li .listImg{
		width: 2rem;
		height: 2rem;
		float: left;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.gzh-addedHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
		text-decoration: none;
	}
	.gzh-addedHealth li .listContent_added{
		float: left;
		padding-left: 0.3rem;
		width: 70%;
		position: relative;
	}
	.listContent_added .server-name{
		font-size: 0.28rem;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source .server-point{
		color: #494949;
	}
	.listContent_added .server-method{
		margin-top: 0.02rem;
	}
	.boutique-server-list .server-method .server-way{
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
	.listContent_added .server-price{
		margin-top: 0.08rem;
		color: #ff5454;
		font-size: 0.2rem;
	}
	.listContent_added .server-price span{
		font-size: 0.3rem;
		font-weight: bold;
		margin-left: 0.1rem;
	}
	.listContent_added .server-price i{
		font-style: normal;
		font-size: 0.2rem;
		margin-right: 0.06rem;
	}
	.listContent_added .server-buy{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-buy img{
		width: 0.4rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.listContent_added .server-posi{
		position: absolute;
		right: 0;
		top: 0.4rem;
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	}
	.listContent_added .server-posi img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.listContent_added .server-appiont{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-appiont img{
		width: 0.38rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}

	
</style>