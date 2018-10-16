<template>
	<div style="height: 100%;position: relative;">
		<heads :title="title" id="heads">
			<!--<span>关注</span>-->
		</heads>
		<Loading v-if="isLoading" ></Loading>
		<div style="position: absolute;top: 0.84rem;width: 100%;">
			<ul class="organList" style="background: #fafafa; padding-bottom: 0.2rem;">
				<li class="organFrist"><!--机构简介头部-->
					<div class="organHeadImg" :style="{backgroundImage:'url('+ ogMess.shopPicUrl +')'}">
						<!--<img :src="ogMess.shopPicUrl" style="display: block;"/>-->
					</div><!--机构头像-->
					<div class="organIntrod">
						<p class="organNanme" style="margin-bottom: 0.2rem;">{{ogMess.shopName}}</p><!--机构名称-->
						<p class="organP" v-if="ogMess.shopTel" style="width: 4.8rem;height: auto;position: relative;"><!--机构电话地理位置距离-->
							<span class="organFirstL" style="width: 2rem;">
								<img style="position: absolute;top: 0rem;left: 0.3rem;" src="../../assets/image/server/bell_icon.png"/>
								<!--<span style="display:inline-block;font-size: 0.24rem;color: #a1a1a1;margin-right: 0.05rem;">电话:</span>-->
								<span style="height:0.4rem;width:2rem;line-height: 0.4rem;font-size: 0.26rem;" class="oranTel">{{ogMess.shopTel}}</span>
							</span>
							<span class="organFirstR" v-if="(ogMess.distance/1000)>1 && distanceShow " style="width: 1.6rem;text-align: right;">
								<span class="organKiloMeter" style="">{{(ogMess.distance/1000).toFixed(1)}}公里</span>
								<img style="width:0.3rem;margin-right: 0rem;margin-top: -0.1rem;" src="../../assets/image/my/local.png"/>
							</span>
							<span class="organFirstR" v-if="(ogMess.distance/1000)<1  && distanceShow " style="width: 1.6rem;text-align: right;">
								<span class="organKiloMeter">{{ogMess.distance.toFixed(1)}}米</span>
							    <img style="display:inline-block;width:0.3rem;margin-right: 0rem;margin-top: -0.1rem;" src="../../assets/image/my/local.png"/>
							</span>					
						</p>
						<p class="organP" v-if="ogMess.strDistrict" style="width: 4.8rem;height: auto;position: relative; "><!--机构地址-->
							<span class="organSecL">
								<img style="position: absolute;top: 0.05rem;left: 0.3rem;" src="../../assets/image/server/server-address.png"/>
								<!--<span style="position: absolute;top: 0.1rem;left: 0.3rem;font-size: 0.24rem;">地址</span>-->
								<span style="line-height: 0.3rem;margin-top: 0.05rem;" class="oranAddress">{{ogMess.strDistrict}}</span>
							</span>
						</p>
						<p class="organP" v-if="ogMess.shopServiceTime" style="width: 4.8rem;height:auto;position: relative;"><!--机构服务时间-->
							<span class="organSecL">
								<img style="position: absolute;top: 0.1rem;left: 0.3rem;" src="../../assets/image/serve_time_gray_2x.png"/>
								<span style="line-height: 0.3rem;margin-top: 0.1rem;" class="oranAddress">营业时间:{{ogMess.shopServiceTime}}</span>
							</span>
						</p>
					</div>		
				</li>
				<div v-if="ogMess.strScope" @click="allMessage">
					<li class="oranBriefLi">
						<p :class="{oranBriefs:oranBriefs == true}" style="color: #a1a1a1;" id="ogMs">{{ogMess.strScope}}</p><!--文本介绍-->
					</li>
					<div class="downDiv" v-if="oranBriefs ==true" v-show="ogMs" style="width:12%;height: 0.4rem;margin-left: 48%;"></div>
					<div class="upDiv" v-if="oranBriefs ==false" style="width:12%;height: 0.4rem;margin-left: 48%;"></div>
					<!--<p class="seeAllBrief" v-if="oranBriefs == true&&isShow" @click ="allMessage()">展开</p>
					<p class="seeAllBrief" v-if="oranBriefs == false&&isShow" @click ="partMessage()">收起</p>-->
				</div>
			</ul>
			<div style="width: 100%;height: 0.15rem;background: #E5E5E5;"></div>
			<!--服务列表-->
			<!--<scroller style="padding-top:4.5rem;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			v-if=""
			>-->
			<div class="gzh-addedHealth" style="margin-top: 0.3rem;position: relative;">
				
				<ul>
					<li class="clearfix" v-for="list in lists">
						<router-link :to='({path:"/doctor/codeServerDetail",query:{id:list.serviceDictId,type:list.serviceDictReservation}})'>
							<!--<img :src="list.imgUrl" class="listImg" alt="" />-->
							<div class="listImg" :style="{backgroundImage:'url('+ list.imgUrl +')'}"></div>
							<div class="listContent listContent_added">
								<p class="server-name">{{list.serviceDictName}}</p>
								<p class="server-source">由 <span class="server-point">{{list.eaName}}</span> 提供服务</p>
								<div class="server-method clearfix">
									<p class="server-way">
										<img src="../../assets/image/server/server_method.png" alt="" />
										{{list.serviceDictComponent !== null ? list.serviceDictComponent : list.serviceDictWay}}
									</p>
									<p class="server-time" v-if="list.serviceDictTime != null && list.serviceDictTime != ''">
										<img src="../../assets/image/server/server_time.png" alt="" />
										{{list.serviceDictTime}}分钟
									</p>
								</div>
								<p class="server-price"><span>{{ serviceMoney(list) }}</span></p>
								<p class="server-buy" 
									@click.prevent="toConform(list.serviceDictId,list.serviceDictReservation)" 
									v-if='list.serviceDictReservation == "0"'>
									购买<img src="../../assets/image/server/buy_icon.png"/>
								</p>
								<p class="server-appiont" 
									@click.prevent="toConform(list.serviceDictId,list.serviceDictReservation)" 
									v-if='list.serviceDictReservation == "1"'>
									预约<img src="../../assets/image/server/yuyuepic.png"/>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		<!--</scroller>-->
		</div>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	import AMap from 'AMap'
	import Loading from '../common/loading.vue'
	export default {
		data(){
			return {
				title: "机构详情",
				lists:"",
				isLoading:true,
				ogMess:'',
				oranBriefs:true,
				dataHide: 1,
				eaId:this.$route.query.eaId,
				page: 1,
				rows: 100,
				addedHealthList: [] ,
				lat:'',
				lon:'',
				nohead:'nohead',
				isShow:true,
				ogMs: false,
				distanceShow: false
			}
		},
		components:{
			heads,
			Loading
		},
		methods: {
			loadingClose(){ //进入页面时的刷新蒙版
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			showBtn(){
				var a = document.getElementById("ogMs")
//				var a = this.$refs.ogMs;
				console.log(a)
			},
			initOgMessage(){//获取机构详情
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
				let data = JSON.stringify({
					eaId : this.eaId,
					lat: this.lat,
					lon:this.lon
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111176, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.distance != -1){
						this.distanceShow = true;
					}
					
					this.ogMess = response.body;
					if(this.ogMess.shopName){
						setTimeout(() => {//去除遮罩层
			               this.isLoading = false;
			              //简介不够不显示 下拉
							 var ogMsH = document.getElementById("ogMs").offsetHeight;
							if(ogMsH >= 33){
								 this.ogMs = true;
							}
			        	}, 500)
						
						
						
					}
					
					
					
						 
				})
			},
			initHealthList(){ //获取服务列表
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//let token = userInfo.token;
				if(this.eaId){
					let token = "";
					let data = JSON.stringify({
						eaId: this.eaId,
						page: this.page,
						rows: this.rows,
						platType:"2",
					})
					console.log(this.eaId)
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
						this.lists = response.body.rows;
						console.log(response);
						if(response.body == null || response.body.rows == ""){
							this.dataHide = 0;
						}else {
							this.dataHide = 1;
							this.addedHealthList = response.body.rows;
						}
					})
				}
			},
			serviceMoney(obj){//金额区间
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				if(min == max){
					return "¥" + obj.serviceDictMoney.toFixed(2);
				}else {
					let serviceMoney = "¥" + min.toFixed(2) + "~ ¥" + max.toFixed(2);
					return serviceMoney;
				}
			},
			toConform(id,type){//下订单页
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.imgList = "";
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type}});
				
			},
			allMessage(){//机构简介展示
				if(this.oranBriefs == true){
					this.oranBriefs = false;
					return false;
					console.log(22)
				}
				if(this.oranBriefs == false){
					this.oranBriefs = true
					return false;
					console.log(33)
				}
			},
			atPosition(){//获取用户定位
				//定位到当前位置，获取地址和经纬度
				let vm = this;
				var map = new AMap.Map('container', {
		            zoom: 16,
		            scrollWheel: false
		       	});
		        map.plugin('AMap.Geolocation', function() {
			        var geolocation = new AMap.Geolocation({
			            enableHighAccuracy: true,//是否使用高精度定位，默认:true
			            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			            buttonPosition:'RB'
			        });
			        map.addControl(geolocation);
			        geolocation.getCurrentPosition();
			        AMap.event.addListener(geolocation, 'complete', function(res){
			        	console.log("成功回调",res);
			        	vm.lat = res.position.lat;
			        	vm.lon = res.position.lng;
			        	vm.initOgMessage();
			        	console.log(vm.lat)
			        })
			         AMap.event.addListener(geolocation, 'error', function(res){
			        	console.log(1)//失败回调
			        	vm.initOgMessage()
			        });
			    })
		        
//				var vm = this;
//				navigator.geolocation.getCurrentPosition(function(pos) {  
//			        // 成功回调函数，接受一个地理位置的对象作为参数。  
//			        // https://developer.mozilla.org/cn/docs/Web/API/Position 参数说明  
//			        vm.lat = pos.coords.latitude;
//			        vm.lon = pos.coords.longitude;
//			        console.log(vm)
//			        
//			        
//			    }, function(err) {
//			    	console.log(vm)
//			        // 错误的回调  
//			        // https://developer.mozilla.org/cn/docs/Web/API/PositionError 错误参数  
//			    },);  		
//			    alert(vm.lat+ '  '+vm.lon);
				
			},
//			imgIcon(str){
//				if(str.substring(0)=="\""){
//					str = str.substr(1,str.length-1)
//				}
//				if(str.substring(str.length-1)=="\""){
//					str=str.substr(0,str.length-2)
//				}
//				return str
//			}
		},
		
		mounted(){
			this.initHealthList();
			this.atPosition();
			
		}
	}
	

</script>

<style scoped="scoped">
.downDiv{
	 background: url(../../assets/image/down.png) no-repeat;
	 background-size: contain;
}
.upDiv{
	 background: url(../../assets/image/up.png) no-repeat;
	 background-size: contain;
}
	#heads span {
		color:  #fff;
		position: absolute;
		top: 0;
		z-index: 88;
		right:0.25rem ;
		line-height: 0.84rem;
		font-size: 0.28rem;
		width: 0.8rem;
		text-align: center;
	}
	.organList{
		line-height: 0.4rem;
	}
	.organList p {
		
	}
	.organFrist{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		display: -webkit-box;
		border-bottom: 1px solid #E5E5E5;
	}
	.organHeadImg{
		/*width: 1.8rem;
		height: 1.8rem;
		overflow: hidden;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;*/
		width: 2rem;
		height: 2rem;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.organNanme{
	    display: inline-block;
	    font-size: 0.26rem;
		padding-left: 0.3rem;
	}
	.organIntrod{
		width: 5rem;
		font-size: 0.28rem;
	    color: #333;
	    overflow: hidden;
	    text-overflow: ellipsis;
	   /* white-space: nowrap;*/
	}
	.organIntrod span img{
		display: inline-block;
	    width: 0.3rem;
	    height: 0.3rem;
	    vertical-align: middle;
	    margin-right: 0.08rem;
	}
	.oranTel{
		display: inline-block;
		width: 3rem;
	    font-size: 0.24rem;
    	color: #a1a1a1;
	}
	.organFirstL{
		float: left;
	}
	.organFirstR{
		float: right;
		margin-right: 0.4rem;
	}
	.organKiloMeter{
		color:#009983;
		font-size: 0.24rem;
	}
	.organFirstR img{
		width: 0.3rem;
		height: 0.3rem;
	    margin-left: 0.08rem;
	}
	.organP{
		padding-left: 0.7rem;
		clear: both;
	}
	.organSecL{
		display: block;
		width: 4rem;
	}
	.oranAddress{
		width: 4rem;
		word-break: break-all;
	    display: inline-block;
	    font-size: 0.24rem;
	    /*overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;*/
	    vertical-align: middle;
	    color: #A1A1A1;
    
	}
	.oranBriefLi{
		padding: 0.15rem 0;
	    width: 92%;
	    margin-left: 4%;
	}
	.oranBriefs{
		color: #666;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.seeAllBrief{
		width: 0.9rem;
		height: 0.4rem;
		line-height: 0.4rem;
		margin-top: 0.2rem;
		text-align: center;
		color: #666;
		border: 1px solid #eee;
		float: right;
		margin-right: 0.3rem;
		/*border-bottom: 1px solid #e5e5e5;*/
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
	}
	.gzh-addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh-addedHealth li:first-of-type{
		padding-top: 0;
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
	.server-method .server-way{
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
