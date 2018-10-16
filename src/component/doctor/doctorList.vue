<template>
	<div class="test">				
		<heads :title="title" class="headerCom" style="" v-on:child-say="listenToMyBoy">
			<router-link :to='{path:"/doctor/search"}'><div class="search_btn" ></div></router-link>
			<div id="address-point" @click="addressPoint" :style="{ top:activeSearchTop }">
				<p>{{ adName }}</p>
			</div>
		</heads>
		<!--筛选tab切换-->
		<ul class="doctor_top1">
			<li v-for="(item,index) in tabList" @click="tabView(index,item)" :class="{active : index == isActive}">
				<a>
					<span>{{ item.txt }}</span>
					<img :src="item.src" alt="" />
				</a>
			</li>
		</ul>
		<!--筛选tab选择面板-->
		<div class="tab-panel" v-if="isPanel" @touchmove.prevent @click="hideTabPanel">
			<!--<ul>
				<li v-for="item in optionList">{{ item.options }}</li>
			</ul>-->
		</div>
		<ul class="tab-panels tabPen" v-if="isPanel">
			<li v-for="(item,index) in optionList" :class="[item.comple]" @click="filterTips(item)">{{ item.options }}</li>
		</ul>
		<Loading v-if="isLoading"></Loading>
		<!--<div class="doctor_top">
				<ul>
					<li>专家类别</li>
					<li>综合排序</li>
					<li>联系方式</li>
				</ul>
			</div>-->
		<scroller style="width:100%;margin:0 auto;background: #fff;position: fixed;top: 1.74rem;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			:on-snapping="true"
			v-if='isLoading == false'
			ref="a"
			:style="{ top:activeTop }"
			
			>
			
			<div>
				
			</div>
			
			
				<div class="doctorSection" v-for="item in doctorList" id="a">
					<router-link :to='{path:"/doctor/doctorAuthorized", query:{docuserId : item.userId}}' >
						<dl class="doctorDl_list" >
							
							<!--没有头像的时候显示占位图-->
							<dt><img src="../../assets/image/index_img/serve_no_img.png" v-if="item.photosmall == '' || item.photosmall == null" class="doctorDtimg">
								<!--有头像的时候占位图消失-->
								<img :src="item.photosmall" v-else class="doctorDtimg">
								
								<!--等待签约&已签约-->
								<span v-if="item.contractTeamProtocolId !== '' && item.contractTeamProtocolId !== null" class="signSpan1" :class="{active:item.contractTeamProtocolId !='0'}">
									<!--<span v-if="item.contractTeamProtocolId == 0">等待签约</span>-->
									<span>{{ item.contractTeamProtocolId == '0'?'等待签约':'已签约' }}</span>
								</span>
							</dt>
							<dd>
								<div class="doctorDdlist1">
									<p id="doctor_name_list" v-if="item.name != '' && item.name != null">{{ item.name }}<span>&nbsp;&nbsp;<i class="isattention" v-if="item.attentionId != ''">已关注</i></span></p>
									<p class="nameList"><span class="docter_famliy" v-if="item.familyContractTeamId != null">家庭医生</span> <span v-if=" item.department != ',,' && item.department != ',' ">{{ item.department.split(',')[0] }}</span><span v-if="item.department != '' && item.department != ',,' && item.department != ',' && item.department != ',,,,'">&nbsp;</span>{{ item.proTitle.split(',')[0] }}</p>
									<p class="clampSearch1">{{ item.hospital.split(',')[0] }}</p>
								</div>
								<p class="doctorLastp">服务<span>	{{ item.userCount }}</span>人<span class="doctorRight" v-if="item.serviceScore != 0">{{ item.serviceScore.toFixed(0) }}%好评</span></p>
							</dd>
							<p class="distance" v-if="isLocation && item.distance != '-1' && item.distance != null"><span v-if="item.distance == 0">0米</span>{{ item.distance | getDistance }}<span v-if="item.distance != null"><img src="../../assets/image/server/posi_icon.png"/></span></p>
						</dl>
					</router-link>
				</div>
			</scroller>
			<div id="iCenter"></div>
			<myfooter></myfooter>
	</div>
</template>

<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import myfooter from '../common/footer.vue'
	import Loading from '../common/loading.vue'
	import seach from "./search.vue"
	export default {
		name: 'lists',
//		props: {
//			hasError:""
//		},
		data (){
			return {
				title: "医生",
				page: 1,
				rows: 8,
				isLoading: true,
				isPanel: false,
				isLocation: true,
				isFirst:true,
				isActive: -1,
				doctorList: [],
				doctorMsg: [],
				filterDatas: "",
				optionList: "",
				adCode: "",
				adName: "",
				addrName:"",
				adLevel: "",
				filterA: "",
				filterB: "",
				filterC: "",
				hasError: "",
				lat: "",
				lon: "",
				index: -1,
				dataItem: "",
				dictCode: "",
				activeTop:"",
				activeSearchTop:"",
				tabList: [
					{
						txt: '专家类别',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '医师',
								txt: '医师',
								index: 0,
								value: 'DOC001',
								comple: 'left'
							},
							{
								options: '护理',
								txt: '护理',
								index: 0,
								value: 'DOC999',
								comple: 'left'
							},
							{
								options: '健康管理师',
								txt: '健康管理师',
								index: 0,
								value: 'DOC003',
								comple: 'left'
							},
							{
								options: '公共营养师',
								txt: '公共营养师',
								index: 0,
								value: 'DOC004',
								comple: 'left'
							},
							{
								options: '心理咨询师',
								txt: '心理咨询师',
								index: 0,
								value: 'DOC002',
								comple: 'left'
							},
							{
								options: '保健调理师',
								txt: '保健调理师',
								index: 0,
								value: 'DOC888',
								comple: 'left'
							},
							{
								options: '健身教练',
								txt: '健身教练',
								index: 0,
								value: 'DOC888',
								comple: 'left'
							},
							{
								options: '科研人员',
								txt: '科研人员',
								index: 0,
								value: 'DOC777',
								comple: 'left'
							},
							{
								options: '全部',
								txt: '全部',
								index: 0,
								value: '',
								comple: 'left'
							}
						]
					},
					{
						txt: '综合排序',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '服务次数',
								txt: '服务次数',
								index: 1,
								value: '1',
								comple: 'center'
							},
							{
								options: '综合排序',
								txt: '综合排序',
								index: 1,
								value: '2',
								comple: 'center'
							},
							{
								options: '离我最近',
								txt: '离我最近',
								index: 1,
								value: '3',
								comple: 'center'
							},
							{
								options: '销量最多',
								txt: '销量最多',
								index: 1,
								value: '4',
								comple: 'center'
							},
							{
								options: '评价优先',
								txt: '评价优先',
								index: 1,
								value: '5',
								comple: 'center'
							}
						]
					},
					{
						txt: '服务方式',
						isShow: false,
						src: './src/assets/image/server/arrow-down.png',
						tabSelect: [
							{
								options: '全部',
								txt: '全部',
								index: 2,
								value: '',
								comple: 'right'
							},
							{
								options: '图文咨询',
								txt: '图文咨询',
								index: 2,
								value: '134603',
								comple: 'right'
							},
							{
								options: '门诊(店)服务',
								txt: '门诊(店)服务',
								index: 2,
								value: '134605',
								comple: 'right'
							},
							{
								options: '上门服务',
								txt: '上门服务',
								index: 2,
								value: '134604',
								comple: 'right'
							}
						]
					},
				],
			}
		},
		components:{
			Heads,
			Loading,
			myfooter
		},
		filters:{
			getDistance(val){
				let dis = Number(val);
				if(dis == ""){
					return '';
				}
				if(dis >= 1000){
					return (dis/1000).toFixed(1) + "公里";
					
				}else{
					return dis.toFixed(0) + "米";
				}
			}
		},
		methods:{
		initHealthList(){
					this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo);
				if(userInfo == "" || userInfo == null){
					var token = "";							
								/*
								 * 判断是否获取到经纬度
								 */
								if(!this.lat){//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											"ignoreLogin" : "1" 
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = false;
								}else{//获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:this.lat,
											lon:this.lon,
											ignoreLogin: '1'
//											serviceDictScopeCode: this.adCode
										});
									}else {
										
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = true;
									
								}
													
							
				}else{
					var token = userInfo.token;
								/*
								 * 判断是否获取到经纬度
								 */
								if(!this.lat){//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:''
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = false;
								}else{//获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:this.lat,
											lon:this.lon,
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = true;
								}
				}
				

				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(response);
					this.doctorList = response.body.rows;
					console.log(this.doctorList);
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
					
				})
			},
			getPosition(){

//				console.log(localInfo);
				let vm = this;
				
				if(vm.$store.state.addressInfo != ""){
					let addressInfo = JSON.parse(vm.$store.state.addressInfo);
						vm.lat = addressInfo.lat;
						vm.lon = addressInfo.lon;
						vm.adName = addressInfo.adName;
						vm.adCode = addressInfo.adCode;
						vm.adLevel = addressInfo.adLevel;
						
						console.log(vm.lat);
						console.log(vm.lon);
						console.log(vm.adName);
						console.log(vm.adCode);
//						vm.initHealthList();
				}else{
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
								console.log(vm.adCode);
								vm.adLevel = '3';

								let localInfo = JSON.stringify({
									lat : vm.lat,
									lon : vm.lon,
									adName: vm.adName,
									addrName: vm.addrName,
									adCode: vm.adCode,
									adLevel: "3"
								});
								console.log(localInfo);
								vm.$store.state.addressInfo = localInfo;
		//						window.localStorage.getItem("localInfo",localInfo);
								window.localStorage.setItem("localInfo",localInfo);
								vm.initHealthList();
						    });//返回定位信息
						    AMap.event.addListener(geolocation, 'error', function(err){
						    	
						    	console.log(err);
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
			tabView(index,item){
				let vm = this;
				console.log(index)
				var userInfo =  JSON.parse(vm.$cookie.get('userInfo'));
				vm.index = index;
				vm.dataItem = item;
				vm.isActive = index;
				if(index == 0){
					if(userInfo == "" || userInfo == null){
						var token = "";
						var filterData = {
							page: vm.page,
							rows: vm.rows,
							"ignoreLogin" : "1" 
						}
					}else{
						var token = userInfo.token;
						var filterData = {
							page: vm.page,
							rows: vm.rows,
						}
					}
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660104, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response.body);
						this.doctor_type = response.body.data;

					})
				}else if(index == 1){
					console.log("111111")
				}else {
					console.log("222222")
					
				}

				for(var i in vm.tabList){
					if(i == index){
						continue;
					}
					vm.tabList[i].isShow = false;
				}
				if(!item.isShow){//未展开
					item.src = './src/assets/image/server/arrow-up.png';
					item.isShow = true;
					vm.optionList = item.tabSelect;
					vm.isPanel = true;
				}else{//已经展开
					item.src = './src/assets/image/server/arrow-down.png';
					item.isShow = false;
					vm.isPanel = false;
				}
			},
			filterTips(item){
				let vm = this;
				var userInfo =  JSON.parse(vm.$cookie.get('userInfo'));

				let index = vm.index;
				let data = vm.dataItem;

				vm.tabView(index,data);
				data.txt = item.txt;
				if(index == 0){
					vm.filterA = item.value;
				}
				if(index == 1){
					vm.filterB = item.value;
				}
				if(index == 2){
					vm.filterC = item.value;
				}
				console.log(vm.filterC);
				
			
				/*
				 * 服务方式
				 */
				if(index == 2 && item.value == ''){
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					serviceWay:'',
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 2 && item.value == '134603'){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					serviceWay:'134603',
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 2 && item.value == '134605'){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					serviceWay:'134605',
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 2 && item.value == '134604'){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					lat:this.lat,
					lon:this.lon,
					serviceWay:'134604',
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
			
				
				if(index == 0 && item.value == "DOC001"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					searchValue:'1',
					docType: "DOC001",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC999"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC999",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC003"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC003",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC004"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC004",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC002"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC002",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC888"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC888",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC777"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					docType: "DOC777",
					lat:this.lat,
					lon:this.lon,
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				if(index == 0 && item.value == "DOC005"){
					this.isLoading = true;
					let filterData = {
					page: vm.page,
					rows: vm.rows,
					lat:this.lat,
					lon:this.lon,
					docType: "DOC005",
					"ignoreLogin" : "1" 
					}
					if(vm.filterB != ""){
							filterData.orderType = vm.filterB;
					}
					console.log(filterData);
				
					vm.filterDatas = filterData;
					
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
						console.log(response);
						this.isLoading = false;
						vm.doctorList = response.body.rows;
					})
				}
				
				
				/*
				 * 判断 销量 下面的 排序
				 */
				if(index == 1 && item.value == 4){
					console.log("aa");
					this.isLoading = true;
					if(!vm.lat){
						//未获得经纬度
						if(userInfo == "" || userInfo == null){
						var token = "";
						var filterData = {
							page: vm.page,
							rows: vm.rows,
							orderType:'4',
	//						serviceWay:'',
							"ignoreLogin" : "1" 
						}
						this.isLocation = false;
					}else{
						var token = userInfo.token;
						var filterData = {
						page: vm.page,
						rows: vm.rows,
						orderType:'4',
//						serviceWay:'',
						
						}
						this.isLocation = false;
					}
					}else{
						//获得经纬度
						if(userInfo == "" || userInfo == null){
						var token = "";
						var filterData = {
							page: vm.page,
							rows: vm.rows,
							orderType:'4',
							lat:this.lat,
							lon:this.lon,
	//						serviceWay:'',
							"ignoreLogin" : "1" 
						}
						this.isLocation = true;
					}else{
						var token = userInfo.token;
						var filterData = {
						page: vm.page,
						rows: vm.rows,
						orderType:'4',
						lat:this.lat,
						lon:this.lon
//						serviceWay:'',
						
						}
						this.isLocation = true;
					}
					}
					
					
					
					vm.filterDatas = filterData;
					console.log("数据",filterData);
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
							console.log(response);
							this.isLoading = false;
							vm.doctorList = response.body.rows;
						})
						return false;
				}
				
				/*
				 * 判断 服务评价 下面的 排序
				 */
				
				if(index == 1 && item.value == 5){
					this.isLoading = true;
					console.log("bb");
					let data = {
						page: vm.page,
						rows: vm.rows,
						orderType:'5',
						lat:this.lat,
						lon:this.lon,
						"ignoreLogin" : "1" 
					}
						if(vm.filterC != ""){
								if(item.options != '全部'){
								data.serviceWay = vm.filterC;
								}
						}
						if(vm.filterA != ""){
								data.docType = vm.filterA;
						}
						vm.filterDatas = data;
					console.log("数据",data);
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(data)},{emulateJSON:true}).then( response => {
							console.log(response);
							this.isLoading = false;
							vm.doctorList = response.body.rows;
						})
						return false;
				}
				
				/*
				 * 判断 服务次数 下面的 排序
				 */
				
				if(index == 1 && item.value == 1){
					this.isLoading = true;
					console.log("bb");
					let data = {
						page: vm.page,
						rows: vm.rows,
						orderType:'1',
						lat:this.lat,
						lon:this.lon,
						"ignoreLogin" : "1" 
					}
						if(vm.filterC != ""){
								if(item.options != '全部'){
								data.serviceWay = vm.filterC;
								}
						}
						if(vm.filterA != ""){
								data.docType = vm.filterA;
						}
						vm.filterDatas = data;
					console.log("数据",data);
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(data)},{emulateJSON:true}).then( response => {
							console.log(response);
							this.isLoading = false;
							vm.doctorList = response.body.rows;
						})
						return false;
				}
				
				/*
				 * 判断 综合排序 下面的 排序
				 */
				
				if(index == 1 && item.value == 2){
					this.isLoading = true;
					console.log("bb");
					let data = {
						page: vm.page,
						rows: vm.rows,
						orderType:'2',
						lat:this.lat,
						lon:this.lon,
						"ignoreLogin" : "1" 
					}
						if(vm.filterC != ""){
								if(item.options != '全部'){
								data.serviceWay = vm.filterC;
								}
						}
						if(vm.filterA != ""){
								data.docType = vm.filterA;
						}
						vm.filterDatas = data;
					console.log("数据",data);
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(data)},{emulateJSON:true}).then( response => {
							console.log(response);
							this.isLoading = false;
							vm.doctorList = response.body.rows;
						})
						return false;
				}
				
				/*
				 * 离我最近 排序
				 */			
				if(index == 1 && item.value == 3){
					console.log("aa");
					this.isLoading = true;
					if(!vm.lat){
						if(userInfo == "" || userInfo == null){
						var token = "";
						var filterData = {
							page: vm.page,
							rows: vm.rows,
							orderType:'3',
							"ignoreLogin" : "1" 
						}
						this.isLocation = false;
					}else{
						var token = userInfo.token;
						var filterData = {
						page: vm.page,
						rows: vm.rows,
						orderType:'3',
						
						}
						this.isLocation = false;
					}
					}else{
						if(userInfo == "" || userInfo == null){
						var token = "";
						var filterData = {
							page: vm.page,
							rows: vm.rows,
							orderType:'3',
							lat:this.lat,
							lon:this.lon,
							"ignoreLogin" : "1" 
						}
						this.isLocation = true;
					}else{
						var token = userInfo.token;
						var filterData = {
						page: vm.page,
						rows: vm.rows,
						orderType:'3',
						lat:this.lat,
						lon:this.lon
						
						}
						this.isLocation = true;
					}
					}
					
					
					
							if(vm.filterC != ""){
								if(item.options != '全部'){
								filterData.serviceWay = vm.filterC;
								}
						}
							if(vm.filterA != ""){
								filterData.docType = vm.filterA;
						}
							vm.filterDatas = filterData;
					console.log("数据",filterData);
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:JSON.stringify(filterData)},{emulateJSON:true}).then( response => {
							console.log(response);
							this.isLoading = false;
							vm.doctorList = response.body.rows;
						})
						return false;
				}
				
				
				
				
			},
			hideTabPanel () {
				let vm = this;
				let index = vm.index;
				let data = vm.dataItem;
				vm.tabView(index,data);

//				this.isActive = "-1"

			},
			addressPoint(){
				let vm = this;
				let adCode = vm.adCode;
				let adName = vm.adName;
				console.log(adCode);
				console.log(adName);
				let lat = vm.lat;
				let lon = vm.lon;
				console.log(vm.$route.query.lat);
				if(vm.$route.query.lat == ""){
					console.log("进入地点时为空");
					vm.$router.push({path:"/doctor/doctorLocate",query:{code:adCode,addrName:"",lat:lat,lon:lon}});
					
				}else {
					console.log("进入地点时有值");
					vm.$router.push({path:"/doctor/doctorLocate",query:{code:adCode,addrName:adName,lat:lat,lon:lon}});
				}
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 8;
					this.initHealthList();
					done();
				}, 1000)
				console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				
				if(userInfo == "" || userInfo == null){
					var token = "";
						if(this.filterDatas == ""){
							var data = JSON.stringify({
							page: this.page,
							rows: this.rows+8,
							doctorName:'',
							lat: this.lat,
							lon: this.lon,
							"ignoreLogin" : "1" 
						})
						}else {
							var data = JSON.stringify(this.filterDatas)
						}
				}else{
					var token = userInfo.token;
					if(this.filterDatas == ""){
					var data = JSON.stringify({
						page: this.page,
						rows: this.rows+8,
						doctorName:'',
						lat: this.lat,
						lon: this.lon
					})
					}else{
						this.filterDatas.rows = this.rows+8;
						var data = JSON.stringify(this.filterDatas)
					}
				}
				
				

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(response);
					this.doctorList = response.body.rows;
					console.log(this.doctorList);
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
			          setTimeout(() => {
			            done()
			          }, 1500)
					this.rows+=8;
					
				})
//				this.$refs.a.finishInfinite(2);
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
			
			
			
		},
		
		mounted (){
			this.getPosition();
			
		},
		deactivated(){
			this.$refs.a.finishInfinite(2);
//			this.$refs.a.scrollTo(x:0, y: 0, animate: false)
		},
		activated(){
			
			if(sessionStorage.getItem('key_head') == 1){
					this.activeTop = 1.8+'rem';
					this.activeSearchTop = 0.12 + "rem";
				}else {
					this.activeTop = 1.8+'rem';
					this.activeSearchTop = 0.12 + "rem";
//					this.activeTop = 2.8+'rem';
//					this.activeSearchTop = 1.24 + "rem";
				}
			
			
			this.isLoading = true;
			let vm = this;
//			let token = "";
//			let api = '/webserviceProxy/webservice/wtWebApiH/GetServerData';
//			window.sessionStorage.removeItem("server_eaId");
			if(vm.$route.query.lat){
				console.log("111111111111111111111")
				this.adName = vm.$route.query.adName;
				console.log(this.adName);
				this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo);
				if(userInfo == "" || userInfo == null){
					
					var token = "";							
								/*
								 * 判断是否获取到经纬度
								 */
								if(!this.lat){//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											lat:vm.$route.query.lat,
											lon:vm.$route.query.lon,
											doctorName:'',
											"ignoreLogin" : "1" 
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
//									this.isLocation = false;
								}else{//获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:vm.$route.query.lat,
											lon:vm.$route.query.lon,
											ignoreLogin: '1'
//											serviceDictScopeCode: this.adCode
										});
									}else {
										
										var data = JSON.stringify(this.filterDatas);
									}
//									this.isLocation = true;
									
								}
													
							
				}else{
					var token = userInfo.token;
								/*
								 * 判断是否获取到经纬度
								 */
								if(!this.lat){//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											lat:vm.$route.query.lat,
											lon:vm.$route.query.lon,
											doctorName:''
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
//									this.isLocation = false;
								}else{//获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:vm.$route.query.lat,
											lon:vm.$route.query.lon,
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
//									this.isLocation = true;
								}
				}
				

				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {
					this.isLocation = true;
					console.log(response);
					this.doctorList = response.body.rows;
					console.log(this.doctorList);
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
					let addressInfo = {
							lat:vm.$route.query.lat,
							lon:vm.$route.query.lon,
							adName:vm.$route.query.adName,
							addrName:vm.$route.query.addrName,
							adCode:vm.$route.query.code,
							adLevel:"3",
					}
					console.log(addressInfo);
					vm.$store.state.addressInfo = JSON.stringify(addressInfo);
					
				})
			}else {
				console.log("222222222222222222222")
				console.log("根本没有-医生");
				if(vm.$store.state.addressInfo != ""){
					let data = JSON.parse(vm.$store.state.addressInfo);
					console.log(data);
					vm.adName = data.adName;
					vm.lat = data.lat;
					vm.lon = data.lon;
					
			
//				this.isLoading = true;
//				this.initHealthList();
				this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo);
				if(userInfo == "" || userInfo == null){
					var token = "";							
								//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:vm.lat,
											lon:vm.lon,
											"ignoreLogin" : "1" 
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
//									this.isLocation = false;
									vm.adName = vm.adName;
									if(!this.lat){
										this.isLocation = false;
									}else{
										this.isLocation = true;
									}
													
							
				}else{
					var token = userInfo.token;
								/*
								 * 判断是否获取到经纬度
								 */
								if(!this.lat){//未获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:vm.lat,
											lon:vm.lon,
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = false;
								}else{//获取到经纬度
									if(this.filterDatas == ""){
										var data = JSON.stringify({
											page:this.page,
											rows:this.rows,
											doctorName:'',
											lat:vm.lat,
											lon:vm.lon,
										});
									}else {
										var data = JSON.stringify(this.filterDatas);
									}
									this.isLocation = true;
								}
				}
				

				console.log(data);
//				this.adName = vm.$route.query.adName;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					this.doctorList = response.body.rows;
					if(!this.lat){
						this.isLocation = false;
					}else{
						this.isLocation = true;
					}
					console.log(this.doctorList);
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
					
				})
			

			}
//			
				}
			
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeTop = 1.84+'rem';
					this.activeSearchTop = 0.12+"rem";
				}
			}
		}
		
	}
</script>

<style>
	/*列表签约状态*/
	.signSpanList{
		display: block;
		text-align: center;
		margin: 0 auto;
		color: #fff;
		background: rgba(0,0,0,0.4);
		border-radius: 0.2rem;
		-webkit-border-radius: 0.2rem;
		width: 70%;
	}
	
	
	/*搜索按钮*/
	.search_btn{
		background: url(../../assets/image/doctor/sear.png) no-repeat;
		width: 0.5rem;
		height: 100%;
		background-size: contain;
		position: relative;
		left: 90.5%;
		background-position-y: center;
	}
	div.doctorDdlist1 p#doctor_name_list{
		color: #333;
		font-size: 0.28rem;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    width: 80%;
	}
	.nameList{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    width: 80%;
	}
	/*.doctor_top{
		height: .9rem;
		background: #f4f5f6;
		color: #7f7f7f;
		width: 100%;
		position: fixed;
		top: .84rem;
		z-index: 999;
	}*/
	/*
	 * 头部筛选
	 */
	/*.doctor_top ul{
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-flex: 1;
	}
	.doctor_top ul li{
		height: .9rem;
		border: 1px solid #eee;
		width: 33.3%;
		text-align: center;
		line-height: .9rem;
	}*/
	.doctor_little{
		position: fixed;
		z-index: 999;
		color: #fff;
		font-size: .38rem;
		top: .2rem;
		left: 3rem;
	}
	.doctorHeader{
		position: fixed;
		width: 100%;
		top: 0;
		background: #009983;
		height: .9rem;
		text-align: center;
		line-height: .9rem;
		font-size: .28rem;
		color: #fff;

	}
	.doctorDtimg{
		height: 1.28rem;
		width: 1.28rem;
		border-radius: 50px;
	}
	.doctorDl_list{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		height: 2.3rem;
 		font-size: .22rem;
 		border-bottom: 0.15rem solid #eee;
 		background: #fff;
	}
	.doctorDl_list dd p{
		height: .38rem;
		line-height: .38rem;
		color: #999;
	}
	.doctorDl_list dd p:first-child{
		height: .38rem;
		line-height: .38rem;
		color: #666;
		margin-top: .3rem;
	}
	.doctorDdlist1{
		height: 1.3rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		color: red;
	}
	.doctorDl_list dt{
		height: 2.1rem;
		width: 2rem;
	}
	.doctorDl_list dd{
		height: 2.1rem;
		width: 70%;
	}
	.doctorDl_list dt img{
		margin-left: .3rem;
		margin-top: .3rem;
	}
	.doctorRight{
		display: block;
		float: right;
	}
	.doctorLastp{
		margin-top: .1rem;
		color: #333 !important;
	}
	/*已关注*/
	.isattention{
		width: 16%;
		text-align: center;
		height: 0.28rem;
		display: inline-block;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		line-height: 0.28rem;
	}
	.headerCom b{
		display: none;
	}
	.docter_famliy{
		border: 1px solid green;
		border-radius: 4px;
		padding: -1rem 0.1rem;
		-webkit-border-radius: 4px;
		color: green;
	}
	
	.signSpan1{
		display: block;
		height: 0.4rem;
		width: 1.2rem;
		text-align: center;
		border-radius: 5px;
		margin-left: 0.35rem;
		background: rgba(0,0,0,0.4);
		color: #fff;
	}
	.signSpan1.active{
		background: orange;
	}
	.clampSearch1{
		 overflow:hidden;
	    white-space:nowrap;
	    text-overflow:ellipsis;
	}
	
	/*
	 * 新
	 */
	
	.doctor_top1{
		width: 100%;
		background: #f4f5f6;
		position: fixed;
		left: 0;
		top: 0.84rem;
		z-index: 99;
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-flex: 1;
	}
	.doctor_top1 li{
		width: 33.3%;
		padding: 0.2rem 0;
	}
	.doctor_top1 img{
		width: 0.2rem;
		border: 0 none;
		margin-left: 0.1rem;
		vertical-align: middle;
	}
	.doctor_top1 li.active a{
		color: #009983;
		/*color: green;*/
		/*background: url(../../assets/image/server/arrow-up.png) no-repeat right 0.52rem center;*/
		/*background-size: 10%;*/
	}
	.doctor_top1 a{
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
	.doctor_top1 li:last-child a{
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
	.tab_paenls_left{
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
	.tab_paenls_right{
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
	.tab-panels li.center{
		text-align: center;
	}
	.tab-panels li.right{
		text-align: right;
	}
	.tab_paenls_left li{
		width: 100%;
		height: 0.9rem;
		text-align: left;
		font-size: 0.27rem;
		line-height: 0.9rem;
		border-bottom: 0.02rem solid #f3f3f3;
	}
	.tab_paenls_right li{
		width: 100%;
		height: 0.9rem;
		text-align: right;
		font-size: 0.27rem;
		line-height: 0.9rem;
		border-bottom: 0.02rem solid #f3f3f3;
	}
	.tab-panels li:last-child{
		border: 0 none;
	}
	/*
	 * 距离
	 */	
	 .distance{
	 	position: absolute;
	 	z-index: 9999;
	 	right: 0.3rem;
	 	/*top: 1.3rem;*/
	 	/*margin-right: 1rem;*/
	 	margin-top: 0.3rem;
	 	font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	 }
	 .distance img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	
	 #address-point{
		width: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 0.58rem;
		left: 0.4rem;
		top: 1.24rem;
		text-indent: 0.28rem;
		line-height: 0.58rem;
		font-size: 0.26rem;
		border-radius: 0.58rem;
		color: #fff;
		background: url(../../assets/image/server/address-point.png) no-repeat #05917d;
		background-position: right 0.24rem center; 
		background-size: 12%;
		position: fixed;
		z-index: 999;	
	}
	
	#address-point p{
		width: 1.4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
</style>