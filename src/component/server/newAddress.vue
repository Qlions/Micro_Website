<template>
	<div id="new-address">
		<Heads :title="titleName"></Heads>
		<loading v-if='isLoading'></loading>
		<div class="con">
			<div class="Box_address" v-if="topName">
			<p>联系人</p>
			</div>
			<div class="Ul_address" v-if="topName">
				<div class="Input_address">姓名：<input v-model="name_address" type="text" placeholder="请填写联系人姓名" style="width: 5rem;"/></div>
				<div class="Input_address" style="border-bottom: none;">手机：<input v-model="tel" type="tel" placeholder="请填写手机号码" @blur="checkIsPhoneNum()" style="width: 5rem;"/></div>
			</div>
			
			<div class="Box_address">
				<p>地址</p>
			</div>
			<div class="Ul_address" @click="saveMess()">
				<router-link :to="{ name: 'serverMap', query:{ lat : this.lat , lon : this.lon } }">
					<div class="Input_address" style="border-bottom: 1px solid #E6E6E6;">
						<span class="buildingAndSchool">小区/大厦/学校：</span><img src="../../assets/image/server/icon_dist@3x.png" class="Input_address_one"><textarea  v-model="Detailed_address" type="text" placeholder="点击选择" class="Detailed_newline1"></textarea><img src="../../assets/image/server/server-right.png" class="Input_address_two" >
					</div>
				</router-link>
				
				<div class="Input_address1" style="border-bottom: none;"><span class="buildingAndSchool">楼号-门牌号：</span><textarea v-model="brand_address" type="text" placeholder="例16号楼201室" @focus="doorNumFocue()" @blur="doorNumBlur()" class="Detailed_newline"></textarea></div>
			</div>
			<div class="Box_address1">
				<!--<p>地址</p>-->
			</div>
		</div>
		
		<!--<router-link :to='{path:"/serverConfirm/addrManage"}'>-->
		<div class="Btn_address" :class="[relative?'relative':'']"  v-on:click.once="btnAddress" v-if="Btn_address">
			保存
		</div>
		<!--</router-link>-->
		<err :message="errMsg" v-if="isErr"></err>
		<suc :sucMessage="sucMsg" v-if="isSuc"></suc>
	</div>
</template>
<script>
	import Loading from '../common/loading.vue'
	import Heads from '../common/head.vue'
	import err from "../common/error-popup.vue"
	import suc from "../common/suc-popup.vue"
	export default {
		data(){
			return {
				titleName: '新增地址',
//				address:this.$store.state.addressInfo.addressName,
				userId:this.$route.query.userId,
				state:this.$route.query.state,
				isId:this.$route.query.isId,
				type: this.$route.query.type,
				isLoading: false,
				isErr:false,
				isSuc:false,
				errMsg:'',
				sucMsg:'',
				name_address:'',
				brand_address:'',
				Detailed_address:"",
				addressName: "",
				tel:'',
				lat:'',
				lon:'',
				id:'',
				Btn_address:true,
				relative:false,
				topName:true,
			}
		},
		components:{
			Heads,
			Loading,
			err,
			suc,
		},
		methods:{
			modification(){
					
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));

					var token = userInfo.token;
					var data = JSON.stringify({
						deliveryId: this.userId,
					});
					
					console.log(data);
					
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:  112050, jsonValue:data},{emulateJSON:true}).then( response => {
	
						console.log(response.body);
						this.name_address = response.body.name;
						this.tel = response.body.tel;
						
						//获取经纬度传入地图
						this.lat = response.body.latitude;
						this.lon = response.body.longitude;
						console.log(this.lat);
						console.log(this.lon);
						
						if(localStorage.areaLoca){
							let aa = JSON.parse(localStorage.getItem("areaLoca"));
							console.log(aa);
							this.Detailed_address = aa.addressName;
						}else{
							this.Detailed_address = response.body.addressName;
							this.Detailed_address = response.body.address;
							this.brand_address = response.body.addressInfo;
						}
						
						this.id = response.body.id;
					})
				
				
				
			},
//			getPositions(){
//				let vm = this;
//				let data = JSON.parse(window.sessionStorage.getItem("localInfo"));
//				if(data){
//					console.log(data);
//					vm.lat = data.lat;
//					vm.lon = data.lon;
//				}
//				
////				vm.initDetail();
////				vm.initDocInfo();
//			},
			doorNumFocue(){
//				this.Btn_address = false;
				this.relative = true
			},
			doorNumBlur(){
//				this.Btn_address = true;

			},
			keep () {
				let address = this.address + this.doorplate;
				this.$store.state.address = address;
				console.log(this.$store.state.address);
				this.$router.back(-2);
			},
//			saveInfo(lat,lon){
//				//存储经纬度到本地
//				let local = window.localStorage;
//				let data = JSON.stringify({
//					lat:lat,
//					lon:lon
//				});
//				local.setItem("localInfo1",data);
//				
//				
//			},
			btnAddress(){
				localStorage.removeItem("saveMessDate");
				let aa = JSON.parse(localStorage.getItem("areaLoca"));
				console.log(this.isId);
				if(this.isId == 1){//修改
					this.isLoading = true;
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
	//				console.log(userInfo);
					var token = userInfo.token;
					var data = JSON.stringify({
						address: this.Detailed_address,
						addressInfo:this.brand_address,
						addressType:2,
						area:"11010600",
						city:"11010000",
						email:"1",
						id:this.userId,
						latitude:this.lat,
						longitude:this.lon,
						name:this.name_address,
						phone:this.tel,
						province:"11000000",
						state: this.state,
						tel:this.tel,
						town:"2854"
					
				});
				console.log(data);
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 112012, jsonValue:data},{emulateJSON:true}).then( response => {
					
					console.log(response);
					console.log(response.body.state);
					if(this.brand_address == ""){
						this.isErr = true;
								this.errMsg = "门牌号为空"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
					       return false;
					}
					switch (response.body.state){
							case "suc":
								this.isSuc = true;
								this.sucMsg = "修改成功"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isSuc = false;
					            }, 500)
								window.localStorage.removeItem("areaLoca");
								this.$router.go(-1);
							break;
							
				            case "err_delAdd_001":
					            this.isErr = true;
								this.errMsg = "地址数量大于10"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;

							case "err_delAdd_002":
					            this.isErr = true;
								this.errMsg = "异常错误"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;

						}
				})
					
		}else{//新增
				this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log('新增');
				var token = userInfo.token;
				var data = JSON.stringify({
					address: this.Detailed_address,
					addressInfo:this.brand_address,
					addressType:2,
					area:"11010600",
					city:"11010000",
					email:"1",
					id:"",
					latitude:aa.lat,
					longitude:aa.lon,
					name:this.name_address,
					phone:this.tel,
					province:"11000000",
					state: 0,
					tel:this.tel,
					town:"2854"
					
				});
				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 112012, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					console.log(response.body.state);
						if(this.brand_address == ""){
						this.isErr = true;
								this.errMsg = "门牌号为空"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
					       return false;
					}
					switch (response.body.state){
							case "suc":
							console.log(data)
								this.isSuc = true;
								this.sucMsg = "保存成功"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isSuc = false;
					            }, 500);
								window.localStorage.removeItem("areaLoca");
								this.$router.go(-1);
							break;
							
				            case "err_delAdd_001":
					            this.isErr = true;
								this.errMsg = "地址数量大于10"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;

//							case "err_delAdd_002":
//					            this.isErr = true;
//								this.errMsg = "异常错误"
//								setTimeout(() => {
//					               this.isLoading = false;
//					               this.isErr = false;
//					            }, 500);
//				            break;

						}
				})
			}
		
			/*
			 * 现居住地
			 */
			if(this.type == 1){
				//新增
				this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log('新增');
				var token = userInfo.token;
				var data = JSON.stringify({
					address: this.Detailed_address,
					addressInfo:this.brand_address,
					addressType:2,
					area:"11010600",
					city:"11010000",
					email:"1",
					id:"",
					latitude:aa.lat,
					longitude:aa.lon,
					name:this.name_address,
					phone:this.tel,
					province:"11000000",
					state: 0,
					tel:this.tel,
					town:"2854"
					
				});
				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 112012, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					console.log(response.body.state);
//					this.$router.go(-1);
					this.$router.push({
						path: "/doctor/sigingOK",
						query: {
							Detailed_address: this.Detailed_address,
							brand_address:this.brand_address,
							area:"11010600",
							city:"11010000",
							latitude:aa.lat,
							longitude:aa.lon,
						}
				})
			
				})
			
			}
				
				
				
			},
//			changeMap(){
////				alert(1)
//				
//				let vm = this;
//				var mapObj = new AMap.Map('iCenter');
//				mapObj.plugin('AMap.Geolocation', function () {
//				    var geolocation = new AMap.Geolocation({
//				        enableHighAccuracy: true,//是否使用高精度定位，默认:true
//				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//				        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
//      				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//				    });
//				    mapObj.addControl(geolocation);
//				    geolocation.getCurrentPosition();
//				    AMap.event.addListener(geolocation, 'complete', function(res){
//				    	console.log(res);
//				    	vm.lat = res.position.lat;
//						vm.lon = res.position.lng;
//						vm.saveInfo(vm.lat,vm.lon);
//						let localInfo = JSON.stringify({
//							lat : vm.lat,
//							lon : vm.lon
//						})
//						console.log(localInfo);
//						window.localStorage.setItem("localInfo1",localInfo);
////						vm.initHealthList();
//				    });//返回定位信息
//				    AMap.event.addListener(geolocation, 'error', function(err){
//				    	console.log(err)
////				    	vm.initHealthList();
//				    });      //返回定位出错信息
//				});
//				
//
//			},	
			checkIsPhoneNum(){	
				if( this.tel == '' || !(/^1[34578]\d{9}$/.test(this.tel)) ){
					this.isErr = true;
					this.errMsg = "请输入正确手机号"
					setTimeout(() => {
		               this.isLoading = false;
		               this.isErr = false;
		            }, 1500);
					this.tel = ""
				}

			},
			saveMess(){
//				let addressInfo = JSON.stringify({
//							addressName : this.Detailed_address,
//							lat : loc.O,
//							lon : loc.M
//						})
//				window.localStorage.setItem("areaLoca",addressInfo);
				this.brand_address = "";
				if(this.name_address != "" && this.tel != ""){				
					let saveMessDate = JSON.stringify({
							name : this.name_address,
							tel : this.tel,
							brand_address : this.brand_address,
						})
					window.localStorage.setItem("saveMessDate",saveMessDate);
				}
			},
			created(){		
						if (localStorage.saveMessDate) {
							let datas = JSON.parse(localStorage.getItem("saveMessDate"))
							this.name_address = datas.name;
							this.tel = datas.tel;
							this.brand_address = datas.brand_address;
						}
					}
			
			
			
		},
		mounted (){
//			this.changeMap();
//			this.getPositions();
			this.created();
			if(this.type == 1){
				this.titleName = "现居住地";
				this.topName = false;
			}
			if(this.isId == 1){

					this.modification();	
				
				this.titleName = "修改地址";
			}else{
				let aa = JSON.parse(localStorage.getItem("areaLoca"));
				console.log(aa);
				
				if(localStorage.areaLoca){
					this.Detailed_address = aa.addressName;
				}
				return false;
			}
			
			
		},
	}
</script>
<style>
	#new-address{
		position: absolute;
		background: #F5F5F5;
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.Box_address{
		height: 0.9rem;
		background: #f5f5f5;
	}
	/*.Box_address1{
		height: 6.1rem;
		background: #f5f5f5;
	}*/
	.Box_address p{
		width: 90%;
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.27rem;
		color: #333;
		margin: 0 auto;
	}
	.con{
		position: relative;
		z-index: 2;
	}
	.Ul_address{
		height: 1.8rem;
		width: 100%;
		margin: 0 auto;
		padding: 0 0.3rem;
		background: #fff;
	}
	.Input_address{
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.25rem;
		color: #333;
		border-bottom: 1px solid #e6e6e6;
	}
	.Input_address input{
		margin-left: 0.2rem;
	}

	.Input_address1{
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.25rem;
		color: #333;
		border-bottom: 1px solid #e6e6e6;
	}
	.Input_address1 input{
		margin-left: 0.4rem;
	}
	.Btn_address{
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
		line-height: 1rem;
		background: #009983;
		height: 1rem;
		font-size: 0.35rem;
		color: #fff;
	}
	.Input_address_two{
		float: right;
		height: 0.7rem;
		vertical-align: middle;
		margin-top: 0.1rem;
	}
	.buildingAndSchool{
		float: left;
	}
	.Detailed_newline1{
		width: 56%;
	    height: 0.8rem !important;
	    border: none;
	    outline: none;
	    /* margin-top: 0.1rem !important; */
	    /* padding: 0 0 0.2rem 0.2rem !important; */
	    /* vertical-align: middle; */
	    resize: none;
	    border-bottom: none !important;
	    /* line-height: 0.9rem; */
	    font-size: 0.24rem;
	    padding-top: 0.2rem;

	}
.Detailed_newline{
		width: 70%;
	    height: 0.8rem !important;
	    border: none;
	    outline: none;
	    /* margin-top: 0.1rem !important; */
	    /* padding: 0 0 0.2rem 0.2rem !important; */
	    /* vertical-align: middle; */
	    resize: none;
	    border-bottom: none !important;
	    /* line-height: 0.9rem; */
	    font-size: 0.24rem;
	    padding-top: 0.22rem;
	}
.Input_address_one{
		height: 0.4rem;
		vertical-align: middle;
		margin-left: 0.2rem;
		float: left;
		margin-top: 0.2rem;
	}

</style>