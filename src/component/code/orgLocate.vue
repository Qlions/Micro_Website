<template>
	<div id="addr-point-doctor">
		<!--<Heads :title="titleName"></Heads>-->
		<header>
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<h2>{{titleName}}</h2>
		</header>
		<Loading v-if="isLoading" class="loading"></Loading>
		<div class="addr-search-wrap">
			<div class="addr-searchBar1">
				<!--<div class="addr-choose clearfix">
					<img src="../../assets/image/server/search_l.png"/>
					<div class="addr-search-input" @click="choseAdd">{{ addressName }}</div>
				</div>-->
				<div class="addr-search">
					<div class="addr-search-left clearfix">
						<img class="addr-fangdajing" src="../../assets/image/server/fangdajing.png"/>
						<div class="search-addr">
							<input
								ref="inputVal"
								type="text"
								@keyup="inputAddr"
								v-model="needReceipt"
								placeholder="搜索地点/地标"/>
						</div>
						<img 
							class="addr-delete"
							v-show="isDelete"
							@click="deleteTxt"
							src="../../assets/image/server/delete_addr.png"/>
					</div>
					<div class="addr-search-right" @click="myAddress">
						<img src="../../assets/image/server/img_mylocation.png"/>
						<p>我的位置</p>
					</div>
				</div>
				<div class="addr-search-btn1" @click="searchInfo">
					<a>开始搜索</a>
				</div>
			</div>
		</div>
		<div class="addr-search-record">
			<div class="history-record1 clearfix">
				<img src="../../assets/image/server/img_his.png"/>
				<p>历史搜索记录</p>
			</div>
			<ul>
				<li v-for="item in historyList" @click="chooseHistory(item)">{{ item.adName }}</li>
			</ul> 
			<div class="addr-clear-record clearfix"  v-if="isRecord && historyList != null">
				<img src="../../assets/image/server/serve_del.png"/>
				<p @click="clearHistory">清空历史记录</p>
			</div>
		</div>
		<div class="adddr-search-list" v-if="isList">
			<ul>
				<li v-for="item in addrList" @click="getAddress(item.name,item.location.lat,item.location.lng,item.adcode)" v-if="item.address != ''">
					<p class="adddr-name">{{ item.name }}</p>
					<p class="adddr-detail">{{ item.address }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data(){
			return {
				titleName: "位置信息",
				isAddress: false,
				isDelete: false,
				isShow: false,
				isLoading: false,
				isRecord: true,
				isList: false,
				lat: "",
				lon: "",
				adNewCode: "",
				adName: "",
				adCode: "",
				adLevel: "",
				needReceipt: "北京市",
				inputName: "",
				addressName: "",
				addrSelectName: "",
				addrList: "",
				addrInfo: "",
				historyList: "",
				showChose: false,
		        showProvince: true,
		        showCity: false,
		        showDistrict: false,
		        showCityList: false,
		        showDistrictList: false,
		        provinceTitle: true,
		        cityTitle: true,
		        districtTitle: true,
		        province: 1,
		        city: 1,
		        district: 1,
		        GetProvinceId: 2,
		        District: false,
		        Province: false,
		        City: false,
      			// v-for循环判断是否为当前
      			selected: false,
      			info: ""
			}
		},
		components:{
			Heads,
			Loading
		},
		methods:{
			init(){
				let vm = this;
				vm.adCode = vm.$route.query.code;
				vm.adName = vm.$route.query.addrName;
				console.log("namenameneme",vm.adName);
				if(vm.adName ==''){
					vm.needReceipt = '北京市';
				}else{
					vm.needReceipt = vm.adName;
				}
				vm.inputName = vm.adName;
				let pcode = vm.adCode.substring(0,2) + "000000";
				let ccode = vm.adCode.substring(0,4) + "0000";
				let dcode = vm.adCode;
				vm.initHistoryList();
				vm.initData(pcode,ccode,dcode);
			},
			initHistoryList(){
				let vm = this;
				let list = JSON.parse(window.localStorage.getItem("addr_Point_Info"));
				vm.historyList = list;
			},
			initData(p,c,d){
				let vm = this;
				let token = "";
				let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
				let data = JSON.stringify({
					nodeParent: '0'
				});
				vm.$http.post(api, {token: token,infoType: 111114,jsonValue: data}, {emulateJSON: true}).then(response => {
					vm.info = response.body.dictAreaCacheList;
//					for(var i = 0;i < vm.info.length;i ++){
//						if(p == vm.info[i].nodeCode){
//							let data = JSON.stringify({
//								nodeParent: p
//							});
//							vm.info.map( a => a.selected = false );
//							vm.info[i].selected = true;
//							vm.Province = vm.info[i].nodeName;
//							vm.province = vm.info[i].nodeCode;
//							vm.$http.post(api, {token: token,infoType: 111114,jsonValue: data}, {emulateJSON: true}).then(response => {
//								vm.showCityList = response.body.dictAreaCacheList;
//								var cnum = 0;
//								for(var j = 0;j < vm.showCityList.length;j ++){
//									if(c == vm.showCityList[j].nodeCode){
//										vm.showCityList.map( a => a.selected = false );
//										vm.showCityList[j].selected = true;
//										vm.City = vm.showCityList[j].nodeName;
//										vm.city = vm.showCityList[j].nodeCode;
//										let data = JSON.stringify({
//											nodeParent: c
//										});
//										vm.$http.post(api, {token: token,infoType: 111114,jsonValue: data}, {emulateJSON: true}).then(response => {
//											let list = response.body.dictAreaCacheList;
//											list.splice(0,0,{nodeSname:"全城",nodeName:"全城",nodeCode:"-1"});
//										 	vm.showDistrictList = list;
//										 	var dnum = 0;
//											for(var m = 0;m < vm.showDistrictList.length;m ++){
//												if(d == vm.showDistrictList[m].nodeCode){
//													vm.showDistrictList.map( a => a.selected = false );
//													vm.showDistrictList[m].selected = true;
//													vm.District = vm.showDistrictList[m].nodeName;
//													vm.district = vm.showDistrictList[m].nodeCode;
//													vm.adLevel = vm.judgeLevel(vm.Province,vm.City,vm.District);
//													vm.addressName = vm.showText(vm.Province,vm.City,vm.District);
//													vm.showProvince = false;
//											    	vm.showCity = false;
//											    	vm.showDistrict = true;
//											    	vm.provinceTitle = true;
//											    	vm.cityTitle = true;
//											    	vm.districtTitle = false;
//											    	vm.isLoading = false;
//												}else {
//													dnum ++;
//												}
//											}
//											if(dnum == vm.showDistrictList.length){
//												vm.addressName = vm.showText(vm.Province,vm.City,vm.District);
//												vm.isLoading = false;
//												return false;
//											}
//										})
//									}else {
//										cnum ++;
//										console.log(cnum)
//									}
//								}
//								if(cnum == vm.showCityList.length){
//									console.log("b");
//									vm.addressName = vm.showText(vm.Province,vm.City,vm.District);
//									vm.isLoading = false;
//									return false;
//								}
//							})
//						}
//					}
				})
			},
			chooseHistory(data,index){
				console.log(data);
				let vm = this;
				vm.isAddress = true;
				let code = data.code;
				let pcode = code.substring(0,2) + "000000";
				let ccode = code.substring(0,4) + "0000";
				let dcode = code;
				console.log(pcode);
				console.log(ccode);
				console.log(dcode);
				vm.lat = data.lat;
				vm.lon = data.lon;
				vm.addrSelectName = data.adName;
				vm.adLevel = data.level;
				vm.initData(pcode,ccode,dcode);
				vm.needReceipt = data.adName;
			},
			inputAddr(){
				let vm = this;
				vm.isRecord = false;
				vm.historyList = "";
				vm.isList = true;
				let adCode = vm.adCode;
				let val = vm.needReceipt;
				if(!val){
					vm.isDelete = false;
				}else {
					vm.isDelete = true;
				}
				var map, geolocation,autocomplete;
				AMap.plugin('AMap.Autocomplete',function(){//回调函数
				    var autoOptions = {
				        city: adCode, //城市，默认全国
				        citylimit: true
				    };
				    autocomplete= new AMap.Autocomplete(autoOptions);
				    autocomplete.search(val, function(status, result){
						vm.addrList = result.tips;
						console.log(vm.addrList)
				    });
				})
			},
			searchInfo(){
				let vm = this;
				let data;
				if(vm.needReceipt == ""){
					let arr = vm.addressName.split("-");
					data = {
						page: 1,
						rows: 8,
						lat:'',
						lon:'',
						searchValue:vm.needReceipt,
						orderType:1,
						orderNum:1,
						adCode:'',
						level:'',
						ignoreLogin: 1
					}
					console.log("data-1",data);
				}
				if(vm.needReceipt != "" && vm.isAddress){
					data = {
						page: 1,
						rows: 8,
						lat:vm.lat,
						lon:vm.lon,
						searchValue:vm.needReceipt,
						orderType:1,
						orderNum:1,
						adCode:'',
						level:'',
						ignoreLogin: 1
					}
					console.log("data-2",data);
				}
				if(vm.needReceipt != "" && vm.isAddress == false){
					data = {
						page: 1,
						rows: 8,
						lat:vm.lat,
						lon:vm.lon,
						searchValue:vm.needReceipt,
						orderType:1,
						orderNum:1,
						adCode:'',
						level:'',
						ignoreLogin: 1
					}
					console.log("data-3",data);
				}
				
				if(vm.needReceipt != ""){
					let localAddrInfo = window.localStorage.getItem("addr_Point_Info");
					if(localAddrInfo == null){
						let info = JSON.stringify([data]);
						window.localStorage.setItem("addr_Point_Info",info);
					}else {
						let oldInfo = JSON.parse(window.localStorage.getItem("addr_Point_Info"));
						oldInfo.splice(0,0,data);
						var hash = {};
						oldInfo = oldInfo.reduce(function(item, next) {
					    hash[next.adName] ? '' : hash[next.adName] = true && item.push(next);
					    return item
					}, [])

						let newInfo = JSON.stringify(oldInfo);
						window.localStorage.setItem("addr_Point_Info",newInfo);
					}
				}
				
				vm.$router.push({path:"/org",query:data})
			},
			deleteTxt(){
				let vm = this;
				vm.needReceipt = "";
				vm.$refs.inputVal.focus();
			},
			getAddress(txt,lat,lon,code){
				let vm = this;
				vm.lat = lat;
				vm.lon = lon;
				vm.adCode = code + "00";
				vm.isAddress = true;
				vm.needReceipt = txt;
				vm.addrSelectName = txt;
				vm.inputAddr();
			},
			judgeLevel(p,c,d){
				let level = "";
				if(c == '市辖区' || c == '县'){
					if(d == '全城'){
						level = "1";
					}else {
						level = "3"
					}
				}else {
					if(d == '全城'){
						level = "2"						
					}else {
						level = "3"
					}
				}
				return level;
			},
			myAddress(){
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
				    	let data = res.addressComponent;
				    	let lat = res.position.lat;
				    	let lon = res.position.lng
						vm.adName = data.building;
						vm.adCode = data.adcode + "00";
						console.log("datatatatatatata",data);
						vm.addressName = vm.showText(data.province,data.city,data.district);
						vm.getAddress(vm.adName,lat,lon,data.adcode);
				    });//返回定位信息
				    AMap.event.addListener(geolocation, 'error', function(err){
				    	console.log(err)
				    });      //返回定位出错信息
				});
			},
			choseAdd(){
      			this.showChose = true;
    		},
		    closeAdd() {
		    	this.showChose = false;
		    },
		    getProvinceId(code,input,index) {
		    	let vm = this;
		    	let token = "";
		    	if(vm.City){
      				// 清除市级和区级选项
			        vm.City = false;
			        vm.District = false;
		    	}
		    	let data = JSON.stringify({
		    		nodeParent: code
		    	})
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111114,jsonValue: data}, {emulateJSON: true}).then(response => {
					vm.showCityList = response.body.dictAreaCacheList;
					// 点击选择当前
					vm.info.map( a => a.selected = false );
					vm.info[index].selected = true;
					vm.province = code;
					vm.Province = input;
					vm.showProvince = false;
					vm.showCity = true;
					vm.showDistrict = false;
					vm.provinceTitle = true;
					vm.cityTitle = false;
					vm.districtTitle = true;
				})
		    },
		    provinceSelected() {
		      // 选项页面的切换
		    	this.showProvince = true;
		    	this.showCity = false;
		    	this.showDistrict = false;
		    	this.provinceTitle = false;
		    	this.cityTitle = true;
		    	this.districtTitle = true;
		    },
		    getCityId(code, input, index) {
		    	let vm = this;
		    	let token = "";
		    	if(vm.District){
		    		//清除区级选项
		    		this.District = false;
		    	}
		    	let data = JSON.stringify({
		    		nodeParent: code
		    	})
			    vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: token,infoType: 111114,jsonValue: data}, {emulateJSON: true}).then(response => {
					let list = response.body.dictAreaCacheList;
					list.splice(0,0,{nodeSname:"全城",nodeName:"全城",nodeCode:"-1"})
					vm.showDistrictList = list;
					// 点击选择当前
					vm.showCityList.map( a => a.selected = false );
					vm.showCityList[index].selected = true;
					vm.city = code;
				    vm.City = input;
				    vm.showDistrict = true;
				    vm.showProvince = false;
				    vm.showCity = false;
				    vm.provinceTitle = true;
					vm.cityTitle = true;
					vm.districtTitle = false;
				})
		    },
		    citySelected() {
		    	this.showProvince = false;
		    	this.showCity = true;
		    	this.showDistrict = false;
		    	this.provinceTitle = true;
		    	this.cityTitle = false;
		    	this.districtTitle = true;
		    },
		    getDistrictId(code, input, index) {
		    	let vm = this;
		    	vm.needReceipt = "";
		    	vm.$refs.inputVal.focus();
		    	vm.district = code;
		    	vm.District = input;
		    	// 选择当前添加active
		    	vm.showDistrictList.map( a => a.selected = false );
		    	vm.showDistrictList[index].selected = true;
		    	// 选取市区选项之后关闭弹层
		    	vm.showChose = false;
		    	
		    	this.addressName = this.showText(vm.Province,vm.City,vm.District);
		    	this.adLevel = this.judgeLevel(vm.Province,vm.City,vm.District);
		    	this.adCode = this.getAdCode(vm.Province,vm.City,vm.District);
		    	console.log(this.adCode);
		    },
		    districtSelected() {
		    	this.showProvince = false;
		    	this.showCity = false;
		    	this.showDistrict = true;
		    	this.provinceTitle = true;
		    	this.cityTitle = true;
		    	this.districtTitle = false;
		    },
		    showText(p,c,d){
		    	let vm = this;
		    	vm.provinceTitle = true;
		    	vm.cityTitle = true;
		    	vm.districtTitle = true;
		    	let txt = "";
		    	let addrCode = "";
		    	if(!d){//未选择县级单位
		    		if(!c){//未选择市级单位
		    			txt = p;
		    		}else {//选择了市级单位
		    			if(c == '市辖区' || c == '县'){
		    				txt = p;
		    				vm.provinceTitle = false;
		    			}else {
		    				txt = p+"-"+c;
		    				vm.cityTitle = false;
		    			}
		    		}
		    	}else {//选择了县级单位
		    		if(d == '全城'){
		    			if(c == '市辖区' || c == '县'){
		    				txt = p;
		    				vm.provinceTitle = false;
		    			}else {
		    				txt = p+"-"+c;
		    				vm.cityTitle = false;
		    			}
		    		}else {
		    			if(c == '市辖区' || c == '县'){
		    				txt = p + "-" + d;
		    				vm.districtTitle = false;
		    			}else {
		    				txt = p+"-"+c+"-"+d;
		    				vm.districtTitle = false;
		    			}
		    		}
		    	}
		    	return txt
		    },
		    getAdCode(p,c,d){
		    	let code = "";
		    	let vm = this;
		    	if(c == '市辖区' || c == '县'){
		    		if(d == '全城'){
		    			code = vm.province;
		    		}else {
		    			code = vm.district;
		    		}
		    	}else {
		    		if(d == '全城'){
		    			code = vm.city;
		    		}else {
		    			code = vm.district;
		    		}
		    	}
		    	return code;
		    },
		    clearHistory(){
		    	let vm = this;
		    	vm.historyList = "";
		    	vm.isRecord = false;
		    	window.localStorage.removeItem("addr_Point_Info")
		    },
		    backToIndex(){
		    	let vm = this;
		    	vm.$router.push({path:"/org"});
		    }
		},
		mounted(){
			this.init()
		}
	}
</script>
<style>
	::-webkit-scrollbar{width:0px;display: none;}
	#addr-point-doctor{
		width: 100%;
		padding-top: 0.84rem;
	}
	#addr-point-doctor .loading{
		z-index: 2;
	}
	#addr-point-doctor header {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	
	#addr-point-doctor header b {
		text-align: center;
		width: 0.8rem;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0;
	}
	
	#addr-point-doctor header img {
		width: 60%;
		margin-top: 24%;
	}
	
	#addr-point-doctor header h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	#addr-point-doctor .addr-search-wrap{
		width: 100%;
		position: fixed;
		left: 0;
	}
	#addr-point-doctor .addr-searchBar1{
		padding: 0 0.3rem;
		background: #009983;
	}
	#addr-point-doctor .addr-searchBar1 .addr-choose{
		width: 100%;
		height: 1rem;
		background: url(../../assets/image/server/whit_arrow_right.png) no-repeat right center;
		background-size: 2.5%;
		border-bottom: 0.01rem solid #19b09d;
	}
	#addr-point-doctor .addr-choose img{
		width: 0.3rem;
		border: 0 none;
		margin-top: 0.3rem;
		float: left;
	}
	#addr-point-doctor .addr-choose .addr-search-input{
		height: 100%;
		width: 80%;
		float: left;
		margin-left: 0.3rem;
		font-size: 0.27rem;
		color: #fff;
		line-height: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	#addr-point-doctor .addr-searchBar1 .addr-search{
		width: 100%;
		height: 1rem;
		border-bottom: 0.01rem solid #19b09d;
		display: flex;
	}
	#addr-point-doctor .addr-search .addr-search-left{
		height: 100%;
		width: 82.4%;
		flex: none;
	}
	#addr-point-doctor .addr-search .addr-fangdajing{
		width: 0.3rem;
		border: 0 none;
		margin-top: 0.33rem;
		float: left;
	}
	#addr-point-doctor .addr-search .addr-delete{
		width: 0.25rem;
		float: right;
		border: 0 none;
		margin-top: 0.35rem;
		margin-right: 0.25rem;
	}
	#addr-point-doctor .addr-search .search-addr{
		height: 100%;
		float: left;
		width: 80%;
	}
	#addr-point-doctor .addr-search .search-addr input{
		width: 100%;
		padding: 0.3rem 0;
		color: #fff;
		border: 0 none;
		outline: none;
		font-size: 0.27rem;
		padding-left: 0.3rem;
		display: inline-block;
	}
	#addr-point-doctor .addr-search .addr-search-right{
		height: 100%;
		flex: 1;
		border-left: 0.01rem solid #19b09d;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#addr-point-doctor .addr-search-right img{
		width: 0.32rem;
		border: 0 none;
	}
	#addr-point-doctor .addr-search-right p{
		font-size: 0.22rem;
		margin-top: 0.1rem;
		color: #fff;
	}
	#addr-point-doctor .addr-searchBar1 .addr-search-btn1{
		padding: 0.3rem 0;
		width: 100%;
	}
	#addr-point-doctor .addr-searchBar1 .addr-search-btn1 a{
		width: 100%;
		display: inline-block;
		height: 0.8rem;
		background: #fff;
		color: #666;
		font-size: 0.27rem;
		text-align: center;
		line-height: 0.8rem;
		border-radius: 6px;
	}
	#addr-point-doctor .addr-search-record{
		width: 100%;
		padding: 0 0.3rem;
		position: fixed;
		left: 0;
		top: 3.26rem;
		bottom: 0;
		border-top: 0.15rem solid #f5f5f5;
	}
	#addr-point-doctor .addr-search-record .history-record1{
		width: 100%;
		/*padding: 0 0.3rem;*/
		height: 0.8rem;
		border-bottom: 0.01rem solid #f5f5f5;
	}
	#addr-point-doctor .history-record1 img{
		width: 0.32rem;
		border: 0 none;
		margin-top: 0.25rem;
		float: left;
	}
	#addr-point-doctor .history-record1 p{
		font-size: 0.24rem;
		color: #666;
		float: left;
		line-height: 0.8rem;
		text-indent: 0.12rem;
	}
	#addr-point-doctor .addr-search-record ul{
		width: 100%;
	}
	#addr-point-doctor .addr-search-record li{
		width: 100%;
		height: 0.8rem;
		font-size: 0.23rem;
		color: #999;
		line-height: 0.8rem;
		border-bottom: 0.01rem solid #f5f5f5;
	}
	#addr-point-doctor .addr-clear-record{
		height: 0.8rem;
		line-height: 0.8rem;
		width: 30%;
		margin: 0 auto;
	}
	#addr-point-doctor .addr-clear-record img{
		width: 0.32rem;
		border: 0 none;
		float: left;
		margin-top: 0.22rem;
		margin-right: 0.1rem;
	}
	#addr-point-doctor .addr-clear-record p{
		float: left;
		color: #999;
	}
	#addr-point-doctor .adddr-search-list{
		width: 100%;
		position: fixed;
		left: 0;
		top: 4.26rem;
		bottom: 0;
		z-index: 1;
		/*max-height: 8rem;*/
		overflow-y: scroll;
		padding: 0 0.3rem;
	}
	#addr-point-doctor .adddr-search-list ul{
		width: 100%;
	}
	#addr-point-doctor .adddr-search-list li{
		padding-left: 0.74rem;
		width: 100%;
		overflow: hidden;
		height: 1.39rem;
		border-bottom: 0.01rem solid #e6e6e6;
		background: url(../../assets/image/server/server_address.png) no-repeat;
		background-position: left 0.1rem center;
		background-size: 5.4%;
		background-color: #fff;
	}
	#addr-point-doctor .adddr-search-list li .adddr-name{
		color: #333;
		font-size: 0.34rem;
		margin-top: 0.2rem;
	}
	#addr-point-doctor .adddr-search-list li .adddr-detail{
		color: #6a6a6a;
		font-size: 0.27rem;
		margin-top: 0.1rem;
		overflow: hidden;
    	text-overflow: ellipsis;
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 1;
	}
	#addr-point-doctor .myAddress{
		width: 100%;
		background-color: white;
		border-top: 4px solid rgba(245,245,245,1);
		color:#333;
	}
	#addr-point-doctor .myAddress .cont{
	  border-bottom: 1px solid rgba(245,245,245,0.8);
	}
	#addr-point-doctor .myAddress .cont span{
	  display: inline-block;
	  font-size: 0.28rem;
	  color: #333;
	  line-height: 0.88rem;
	  margin-left: 0.32rem;
	}
	#addr-point-doctor .myAddress .cont section{
	  float:left;
	}
	#addr-point-doctor .myAddress .cont p{
	  display: inline-block;
	  font-size: 0.28rem;
	  color: #333333;
	  line-height: 0.88rem;
	  margin-left: 1rem;
	}
	#addr-point-doctor .myAddress .cont .pic2{
	  float: right;
	  width: 0.14rem;
	  height: 0.24rem;
	  margin: 0.32rem 0.32rem 0.32rem 0;
	}
	#addr-point-doctor .myAddress .cont p.text{
	  margin-left: 0.72rem;
	}
	#addr-point-doctor .showChose{
	  width:100%;
	  height:100%;
	  position:fixed;
	  top:0;
	  left:0;
	  z-index:120;
	  background:rgba(0,0,0,0.5);
	}
	#addr-point-doctor .address{
	  position:absolute;
	  bottom:0;
	  left:0;
	  z-index:121;
	  background:#fff;
	  width:100%;
	}
	#addr-point-doctor .titles {
		background: #f5f5f5;
		border-bottom: 0.01rem solid #d2d2d2;
	}
	#addr-point-doctor .titles h4{
	  display:inline-block;
	  margin-left:3.2rem;
	  font-size:0.33rem;
	  line-height:1.2rem;
	  font-weight:normal;
	  color:#333;
	}
	#addr-point-doctor .titles span{
	  margin:0.42rem 0 0 2.26rem;
	  font-size:0.45rem;
	  line-height:0.34rem;
	  color:#b4b4b4;
	}
	#addr-point-doctor .title{
		border-bottom: 0.01rem solid #d2d2d2;
		overflow: hidden;
	}
	#addr-point-doctor .area{
	  /*display:inline-block;*/
	  font-size:0.3rem;
	  float: left;
	  line-height:0.78rem;
	  margin-left:0.42rem;
	  color:#5a5a5a;
	  max-width: 2.4rem;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  overflow: hidden;
	}
	#addr-point-doctor .addList{
	  width:100%;
	  /*margin-top: 0.1rem;*/
	  padding-left:0.4rem;
	  font-size:0.26rem;
	  line-height:0.65rem;
	  color:#5c5c5c;
	}
	/* 修改的格式 */
	#addr-point-doctor .address ul{
	  padding-top: 0.18rem;
	  width:95%;
	  /*height:100%;*/
	  height: 8.4rem;
	  overflow:auto;
	}
	#addr-point-doctor .address .title .active{
	  color:#009983;
	  border-bottom:0.04rem solid #009983;
	}
	#addr-point-doctor .address ul .active{
	  color:#009983;
	}
	#addr-point-doctor .address ul .active img{
		width: 0.34rem;
		margin-left: 0.2rem;
		border: 0 none;
		vertical-align: middle;
		margin-top: -0.02rem;
		
	}
</style>