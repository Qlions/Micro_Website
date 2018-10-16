<template>
	<div class="test">			
		
		<heads :title="title" ></heads>
		<Loading v-if="isLoading"></Loading>
			<!--<div class="doctor_top"></div>-->
				<div class="noData" v-if="doctorList == '' " >
					<img src="../../assets/image/doctor/no_data_img.png"/>
					<p class="noDataP">暂无相关医生</p>
				</div>
				
				<div class="doctorSection" v-for="item in doctorList">
					<router-link :to='{path:"/doctor/doctorAuthorized", query:{docuserId : item.userId , doc_distance : item.distance }}' >
						<dl class="doctorDl_list" >
							
							<!--没有头像的时候显示占位图-->
							<dt><img src="../../assets/image/index_img/serve_no_img.png" v-if="item.photosmall == '' || item.photosmall == null" class="doctorDtimg">
								<!--有头像的时候占位图消失-->
								<img :src="item.photosmall" v-else class="doctorDtimg">
								<span v-if="item.contractTeamProtocolId !== '' && item.contractTeamProtocolId !== null" class="signSpan" :class="{active:item.contractTeamProtocolId !='0'}">
									<!--<span v-if="item.contractTeamProtocolId == 0">等待签约</span>-->
									<span>{{ item.contractTeamProtocolId == '0'?'等待签约':'已签约' }}</span>
								</span>						
							</dt>
							<dd>
								<div class="doctorDdlist1">
									<p id="doctor_name_list" v-if="item.name != '' && item.name != null">{{ item.name }}<span>&nbsp;&nbsp;<i class="isattention" v-if="item.attentionId != ''">已关注</i></span></p>
									<p class="nameList"> <span class="docter_famliy" v-if="item.familyContractTeamId != null">家庭医生</span><span v-if=" item.department != ',,' && item.department != ','">{{ item.department.split(',')[0] }}</span><span v-if="item.department != '' && item.department != ',,' && item.department != ','">&nbsp;</span><span v-if="item.department != '' && item.department != ',,' && item.department != ',' && item.department == ',,,' ">&nbsp;</span>{{ item.proTitle.split(',')[0] }}</p>
									<p class="clampSearch">{{ item.hospital.split(',')[0] }}</p>
								</div>
								<p class="doctorLastp">服务<span>{{ item.userCount }}</span>人<span class="doctorRight" v-if="item.serviceScore != 0">{{ item.serviceScore.toFixed(0) }}%好评</span></p>
							</dd>
							<p class="distance_s" v-if="isLocation">{{ item.distance | getDistance }}<span v-if="item.distance != null"><img src="../../assets/image/server/posi_icon.png"/></span></p>
						</dl>
							
					</router-link>
				</div>
			
	</div>
</template>

<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import myfooter from '../common/footer.vue'
	import Loading from '../common/loading.vue'
	import seach from "./search.vue"
	export default {
		data (){
			return {
				title: "医生",
				page: 1,
				rows: 8,
				lat: "",
				lon: "",
				isLocation: true,
				isLoading: true,
				doctorList: [],
				doctorMsg: [],
				orange:"",
				doctorName:  this.$store.searchValue,
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
				}else {
					return dis.toFixed(0) + "米";
				}
				
				
			}
		},
		methods:{
		
			
			search(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				
				if(userInfo == "" || userInfo == null){
					var token = "";
					
					if(!this.lat){//未获取到经纬度
						var data = JSON.stringify({
							searchValue: this.doctorName,
							page: this.page,
							rows: this.rows,
							docType: '',
							orderType: '',
							serviceWay: '',
							"ignoreLogin" : "1" 
						})
						this.isLocation = false;
					}else{ //获取到经纬度
						var data = JSON.stringify({
							searchValue: this.doctorName,
							page: this.page,
							rows: this.rows,
							docType: '',
							orderType: '',
							serviceWay: '',
							lat:this.lat,
							lon:this.lon,
							"ignoreLogin" : "1" 
						})
						this.isLocation = true;
					}
					
					
				}else{
					var token = userInfo.token;
					
					if(!this.lat){//未获取到经纬度\
						var data = JSON.stringify({
							searchValue: this.doctorName,
							page: this.page,
							rows: this.rows,
							docType: '',
							orderType: '',
							serviceWay: '',
						})
						this.isLocation = false;
					}else{ // 获取到经纬度
						var data = JSON.stringify({
							searchValue: this.doctorName,
							page: this.page,
							rows: this.rows,
							lat:this.lat,
							lon:this.lon,
							docType: '',
							orderType: '',
							serviceWay: '',
						})
						this.isLocation = true;
					}
					
				}

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(this.doctorName)
					console.log(response.body.rows)
					this.doctorList = response.body.rows;
					
					setTimeout(() => {
						this.isLoading = false;
					}, 500)
			        
				})
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
						let localInfo = JSON.stringify({
							lat : vm.lat,
							lon : vm.lon
						})
						window.localStorage.setItem("localInfo",localInfo);
						vm.search();
				    });//返回定位信息
				    AMap.event.addListener(geolocation, 'error', function(err){
				    	console.log(err)
				    	vm.search();
				    });      //返回定位出错信息
				});
			},
			
			
		},
		
		mounted (){
			if(this.doctorName != ""){
//				this.search();
				this.getPosition();
			}
			
		}
	}
</script>

<style>
	.test{
		padding-top: .84rem;
	}
	/*列表签约状态*/
	.signSpan{
		display: block;
		text-align: center;
		margin: 0 auto;
		color: #fff;
		background: rgba(0,0,0,0.4);
		border-radius: 0.2rem;
		-webkit-border-radius: 0.2rem;
		width: 70%;
	}
	/*暂无相关服务*/
	.noDataP{
		text-align: center;
		font-size: 0.32rem;
		color: #666;
	}
	/*搜索按钮*/
	
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
	.doctor_top{
		/*height: .9rem;*/
	}
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
	}
	/*已关注*/
	.isattention{
		width: 16%;
		text-align: center;
		height: 0.25rem;
		display: inline-block;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		line-height: 0.25rem;
	}
	/*无数据*/
	.noData{
		width: 50%;
		margin: 30% auto 0 auto;
	}
	.noData img{
		width: 100%;
		
	}
	
	.docter_famliy{
		border: 1px solid green;
		border-radius: 4px;
		padding: -0.95rem 0.1rem;
		-webkit-border-radius: 4px;
		color: green;
	}
	.signSpan.active{
		background: orange;
	}
	
	.clampSearch{
		 overflow:hidden;
	    white-space:nowrap;
	    text-overflow:ellipsis;
	}
	/*
	 * 距离
	 */	
	 .distance_s{
	 	position: absolute;
	 	z-index: 1;
	 	right: 0.3rem;
	 	margin-top: 0.3rem;
	 	font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	 }
	 .distance_s img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
</style>