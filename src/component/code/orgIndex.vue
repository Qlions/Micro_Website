<template>
	<div class="server-list">
		<Heads :title="titleName" id="headIndex" v-on:child-say="listenToMyBoy">
			<router-link :to='{ path:"/org/orgSearch",query:filterDatas}' >
				<div class="search_btn"></div>
			</router-link>
			<div id="address-point" @click="addressPoint" :style="{ top:pointTop }">
				<p>{{ adName }}</p>
			</div>
		</Heads>
		<!--筛选tab切换-->
		<ul class="tab_bar" :style="{ top:activeTop }">
			<li v-for="(item,index) in tabList" @click="tabView(index,item)" :class="{active : index == isActive}">
				<a>
					<span>{{ item.txt }}</span>
				</a>
			</li>
		</ul>
		<!--筛选tab选择面板-->
		<div class="tab-panel" v-if="isPanel" @touchmove.prevent @click="hideTabPanel">
			<!--<ul>
				<li v-for="item in optionList">{{ item.options }}</li>
			</ul>-->
		</div>
		<ul class="tab-panels" v-if="isPanel">
			<li v-for="(item,index) in optionList" :class="item.className" @click="filterTips(item)">{{ item.options }}</li>
		</ul>
		<Loading v-if="isLoading" class="loading" :class="{loadTop:true}"></Loading>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
		</div>
		<div v-if="dataHide == 1">
			<scroller style ="padding-top: 0.84rem;"
			:style="{ top:activeTop }"
			:on-refresh="refresh"
			:on-infinite="infinite"
			ref="my_scroller"
			v-if='isLoading == false'
			>
				<div class="gzh_addedHealth">
					<ul style="padding-bottom: 1.7rem;">
						<li class="clearfix" v-for="list in addedHealthList">
							<router-link :to='({path:"/org/orgDetail",query:{eaId:list.eaId,type:"Eadetil"}})'>
								<div class="listImg" :style="{backgroundImage:'url(https://localtest.zgjky.cn'+ imgIcon(list.logoImg) +')'}"></div>
								<div class="listContent listContent_added">
									<p class="server-name">{{list.eaName}}</p>
									<p class="server-source">
										
									</p>
									<div class="server_method clearfix">
										<p class="server-way">
											<img src="../../assets/image/server/server-address.png" alt="" />											
											<span style="float:left;width: 4rem;">{{ list.eaAddress }}</span>
										</p>
									</div>
									<div class="server_method clearfix" style="margin-top: 0.2rem;">
										<p class="server-time">
											<img src="../../assets/image/server/bell_icon.png" alt="" />
											<span>{{list.eaTel}}</span>
										</p>
									</div>
									<p class="server-posi" v-if="isLocation && list.distance != '-1'&& list.distance != null">{{ list.distance | getDistance}}<img src="../../assets/image/server/posi_icon.png"/></p>
								</div>
							</router-link>
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
				titleName : "健康机构",
				isLoading: true,
				isPanel: false,
				isLocation: true,
				isFirst:true,
				isActive: 0,
				dataHide: 1,
				page: 1,
				rows: 8,
				orderType:1,   //机构首页筛选顺序1.距离最近2销量最高3优惠促销
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
				tabList: [
					{
						txt: '距离最近',
						isShow: false,
					},
					{
						txt: '销量最高',
						isShow: false,
					},
					{
						txt: '优惠促销',
						isShow: false,
					}
				],
				hasError:"",
				activeTop:"",//iscroll
				pointTop:""
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
		watch:{
			hasError:function(val){//iscroll
				if(val == true){
					this.activeTop = .84+'rem';
					this.pointTop = 0.13+'rem'
				}
			}
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
				if(this.$route.query.searchValue){
					this.adName = this.$route.query.searchValue;
					var data = JSON.stringify({
							page: this.$route.query.page,
							rows: this.$route.query.rows,
							lat:this.$route.query.lat,
							lon:this.$route.query.lon,
							searchValue:'',
							orderType:1,
							orderNum:1,
							adCode:'',
							level:'',
							ignoreLogin: 1
					});
				}else{
					if(!this.lat){//未获取到经纬度
						if(this.filterDatas == ""){
							var data = JSON.stringify({
								page: this.page,
								rows: this.rows,
								lat:'',
								lon:'',
								searchValue:"",
								orderType:this.orderType,
								orderNum:1,
								adCode:'',
								level:'',
								ignoreLogin: 1
							});
						}else {
							var data = JSON.stringify(this.filterDatas);
						}
						this.isLocation = false;
					}else{//获取到经纬度
						if(this.filterDatas == ""){
							var data = JSON.stringify({
								page: this.page,
								rows: this.rows,
								lat: this.lat,
								lon: this.lon,
								searchValue:"",
								orderType:this.orderType,
								orderNum:1,//正反序
								adCode:'',
								level:'',
								ignoreLogin: 1
							});
						}else {
							var data = JSON.stringify(this.filterDatas);
						}
						this.isLocation = true;
					}
				}
				this.filterDatas = JSON.parse(data);
				console.log(this.filterDatas)
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111222, jsonValue:data},{emulateJSON:true}).then( response => {
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
				if(vm.$store.state.addressInfo != ""){
					console.log("vuex存的数据",vm.$store.state.addressInfo);
					let addressInfo = JSON.parse(vm.$store.state.addressInfo);
					vm.lat = addressInfo.lat;
					vm.lon = addressInfo.lon;
					vm.adName = addressInfo.adName;
					vm.adCode = addressInfo.adCode;
					vm.adLevel = addressInfo.adLevel;
					vm.initHealthList();
				}else {
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
					    	vm.initHealthList();
					    });      //返回定位出错信息
					});
				}
				
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
							page: this.page,
							rows: this.rows+8,
							lat:'',
							lon:'',
							searchValue:"",
							orderType:this.orderType,
							orderNum:1,
							adCode:'',
							level:'',
							ignoreLogin: 1
						});
					}else {
						this.filterDatas.rows = this.rows+8;
						var data = JSON.stringify(this.filterDatas);
					}
				}else {//已经获取到经纬度
					if(this.filterDatas == ""){
						var data = JSON.stringify({
							page: this.page,
							rows: this.rows+8,
							lat:'',
							lon:'',
							searchValue:"",
							orderType:this.orderType,
							orderNum:1,
							adCode:'',
							level:'',
							ignoreLogin: 1
						});
					}else {
						this.filterDatas.rows = this.rows+8;
						var data = JSON.stringify(this.filterDatas);
					}
				}
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111222, jsonValue:data},{emulateJSON:true}).then( response => {

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
			serviceMoney(obj){
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				if(min == max){
					return "<i>¥</i>" + obj.serviceDictMoney.toFixed(2);
				}else {
					let serviceMoney = "<i>¥</i>" + min.toFixed(2) + "~ <i>¥</i>" + max.toFixed(2);
					return serviceMoney;
				}
			},
			tabView(index,item){
				let vm = this;
				vm.isLoading = true;
				let userInfo = JSON.parse(vm.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
				vm.index = index;
				vm.dataItem = item;
				vm.isActive = index;
				vm.orderType = index+1; //设置筛选条件切换
//				for(var i in vm.tabList){
//					if(i == index){
//						continue;
//					}
//					vm.tabList[i].isShow = false;
//				}
				console.log(vm.orderType)
				//根据条件重新渲染页面
				if(vm.$route.query.searchValue){
					var data = JSON.stringify({
						page: vm.$route.query.page,
						rows: vm.$route.query.rows,
						lat:vm.$route.query.lat,
						lon:vm.$route.query.lon,
						searchValue:'',
						orderType:vm.orderType,
						orderNum:1,
						adCode:'',
						level:'',
						ignoreLogin: 1
					});
				}else{
					if(!vm.lat){//未获取到经纬度
						var data = JSON.stringify({
							page: vm.page,
							rows: vm.rows,
							lat:'',
							lon:'',
							searchValue:"",
							orderType:vm.orderType,
							orderNum:1,
							adCode:'',
							level:'',
							ignoreLogin: 1
						});
						vm.isLocation = false;
					}else{//获取到经纬度
						var data = JSON.stringify({
							page: vm.page,
							rows: vm.rows,
							lat: vm.lat,
							lon: vm.lon,
							searchValue:"",
							orderType:vm.orderType,
							orderNum:1,//正反序
							adCode:'',
							level:'',
							ignoreLogin: 1
						});
						vm.isLocation = true;
					}
				}
				vm.filterDatas = JSON.parse(data);
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111222, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body == null){
						vm.dataHide = 0;
						setTimeout(() => {
			               vm.isLoading = false;
			            }, 500)
					}else {
						vm.dataHide = 1;
						vm.addedHealthList = response.body.rows;
						setTimeout(() => {
			               vm.isLoading = false;
			            }, 500)
	
					}
					
				})
			},
			filterTips(item){
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
			addressPoint(){
				let vm = this;
				let adCode = vm.adCode;
				let adName = vm.adName;
				let lat = vm.lat;
				let lon = vm.lon;
				console.log(vm.$route.query.lat);
				console.log(lat);
				if(vm.$route.query.lat == "" || lat == ""){
					console.log("进入地点时为空");
					vm.$router.push({path:"/org/orgLocate",query:{code:adCode,addrName:adName,lat:lat,lon:lon}});
					
				}else {
					console.log("进入地点时有值");
					vm.$router.push({path:"/org/orgLocate",query:{code:adCode,addrName:adName,lat:lat,lon:lon}});
				}
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
			hideTabPanel () {
				let vm = this;
				let index = vm.index;
				let data = vm.dataItem;
				vm.tabView(index,data);
			},
			listenToMyBoy (somedata) {//监听头部叉号点击事件
				this.hasError = somedata;
			}
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){//iscroll
				this.activeTop = 0.84 +'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			if(sessionStorage.getItem('key_head') == 1){//iscroll
				this.pointTop = 0.13 +'rem';
			}else {
				this.pointTop = 1.29+'rem'
			}
			this.getPosition();
		},
		deactivated(){
			this.$refs.my_scroller.finishInfinite(2);
		},
		activated(){
			let vm = this;
			let token = "";
			let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
			window.sessionStorage.removeItem("server_eaId");
			if(vm.$route.query.code){
				vm.isLoading = true;
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
					setTimeout(() => {
			            vm.isLoading = false;
			        }, 500)
				})
			}else {
				if(vm.$store.state.addressInfo != ""){
					let data = JSON.parse(vm.$store.state.addressInfo);
					console.log(data);
					console.log(vm.filterDatas);
					console.log(data);
					console.log(vm.adCode);
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
						vm.addedHealthList = response.body.rows;
						setTimeout(() => {
			               	vm.isLoading = false;
			            }, 500)
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
	.server-list #headIndex b{
		display: none;
	}
	.server-list #address-point{
		width: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 0.58rem;
		left: 0.3rem;
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
	.server-list #address-point p{
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
	.server-data-null{
		width: 90%;
		margin: 0.84rem 5%;
	}
	.server-data-null i {
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
	.server-list{
		height: 100%;
	}
	.server-list .gzh-basicHealth-title {
		font-size: 0.28rem;
		color: #009985;
		width: 100%;
		height: 0.9rem;
		background: #f5f5f5;
		line-height: 0.9rem;
		text-indent: 0.32rem;
	}
	.server-list .tab_bar{
		width: 100%;
		background: #f4f5f6;
		position: fixed;
		left: 0;
		top: 0.84rem;
		z-index: 3;
	}
	.server-list .tab_bar li{
		width: 33.3%;
		padding: 0.2rem 0;
		float: left;
	}
	.server-list .tab_bar img{
		width: 0.2rem;
		border: 0 none;
		margin-left: 0.1rem;
		vertical-align: middle;
	}
	.server-list .tab_bar li.active a{
		color: #12a08d;
		/*background: url(../../assets/image/server/arrow-up.png) no-repeat right 0.52rem center;*/
		/*background-size: 10%;*/
	}
	.server-list .tab_bar a{
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
	.server-list .tab_bar li:last-child a{
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
	
	.gzh_addedHealth{
		width: 100%;
		/*padding-top: 0.8rem;*/
	}
	.gzh_addedHealth ul{
		padding-bottom: 0.5rem;
	}
	.gzh_addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh_addedHealth li:last-child{
		border: 0 none;
	}
	.gzh_addedHealth li .listImg{
		width: 2rem;
		height: 2rem;
		float: left;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.gzh_addedHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
		text-decoration: none;
	}
	.gzh_addedHealth li .listContent_added{
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
	.listContent_added .server_method{
		margin-top: 0.02rem;
	}
	.server-list .server_method .server-way{
		float: left;
		color: #999;
	}
	.server_method .server-way img{
		width: 0.32rem;
		float: left;
		vertical-align: middle;
		margin-right: 0.08rem;
	} 
	.server_method .server-time{
		float: left;
		color: #999;
	}
	.server_method .server-time img{
		width: 0.32rem;
		float: left;
		vertical-align: middle;
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
		bottom: 0.02rem;
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
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	
</style>