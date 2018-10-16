<template>
	<section id="reviseAddress">
		<Heads :title="titleName"></Heads>
		<div class="RA-container">
			<div class="zApp-Add-adsw">
				<ul class="zApp-Add-adsl clear">
					<li>
						<label>
							<em>收件人姓名</em>
							<div class="zApp-Add-adint clear">
								<input type="text" id="name" v-model="name">
							</div>
						</label>
					</li>
					<li>
						<label>
							<em>联系方式</em>
							<div class="zApp-Add-adint clear">
								<input type="tel" id="tel" v-model="tel">
							</div>
						</label>
					</li>
					<li @click="changeAddress()">
						<label>
							<em>所在地区</em>
							<div class="zApp-Add-adint clear">
								<input type="text" id="addressName" value="" readonly="readonly" v-model="address">
							</div>
						</label>
					</li>
					<li>
						<label>
							<em>详细地址</em>
							<div class="zApp-Add-adint clear">
								<input type="text" id="address" v-model="detail">
							</div>
						</label>
					</li>
				</ul>
			</div>
			<div class="record-data-form-btn">
				<a class="post-btn" href="javascript:void(0);" @click="postNewAddress">确定保存</a>
			</div> 
			<div class="zApp-Add-CityBox" id="addressDivDisPlay" v-if="listShow == true">
				<div class="zApp-Add-Citymask"></div>
				<div class="zApp-Add-Cityinfo">
					<div class="zApp-Add-Cityhead">
						<h4>所在地区</h4>
						<a href="javascript:void();" @click="close();"></a>
					</div>
					<div class="zApp-Add-Citywrap">
						<div class="zApp-Add-Citytit clear">
							<input type="button" value="请选择" id="provinceName" @click="proviceBtn();" v-model="proName">
							<input type="button" value="请选择" id="cityName" @click="cityBtn();" v-model="cityName">
							<input type="button" value="请选择" id="areaName" @click="areaBtn();" v-model="areaName">
							<input class="zon" type="button" value="请选择" id="townName" @click="townBtn();" v-model="townName">
						</div>
						<div class="zApp-Add-Cityname proBox" id="addressDiv" v-show="proShow == true">
							<ul class="zApp-Add-Citynamelist clear" style="left:0;" id="proviceDiv">
								<li v-for="(item,index) in proList">
									<label>
										<a href="javascript:void(0);" @click="optedPro(item.nodeName,item.nodeCode,index)">
											<b :class="{textRed: index == preP}">{{item.nodeName}}</b>
											<i v-if="index == preP"></i>
										</a>
									</label>
								</li>
							</ul>
						</div>
						<div class="zApp-Add-Cityname cityBox" id="addressDiv" v-show="cityShow==true">
							<ul class="zApp-Add-Citynamelist clear" style="left:0;" id="cityDiv">
								<li v-for="(item,index) in cityList">
									<label>
										<a href="javascript:void(0);" @click="optedCity(item.nodeName,item.nodeCode,index)">
											<b :class="{textRed: index == preC}">{{item.nodeName}}</b>
											<i v-if="index == preC"></i>
										</a>
									</label>
								</li>
							</ul>
						</div>
						<div class="zApp-Add-Cityname areaBox" id="addressDiv" v-show="areaShow==true">
							<ul class="zApp-Add-Citynamelist clear" style="left:0;" id="areaDiv">
								<li v-for="(item,index) in areaList">
									<label>
										<a href="javascript:void(0);" @click="optedArea(item.nodeName,item.nodeCode,index)">
											<b :class="{textRed: index == preA}">{{item.nodeName}}</b>
											<i v-if="index == preA"></i>
										</a>
									</label>
								</li>
							</ul>
						</div>
						<div class="zApp-Add-Cityname townBox" id="addressDiv" v-show="townShow==true">
							<ul class="zApp-Add-Citynamelist clear" style="left:0;" id="townDiv">
								<li v-for="(item,index) in townList">
									<label>
										<a href="javascript:void(0);" @click="optedTown(item.nodeName,item.nodeCode,index)">
											<b :class="{textRed: index == preT}">{{item.nodeName}}</b>
											<i v-if="index == preT"></i>
										</a>
									</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<errorPopup v-if="errShow==true" :message="message"></errorPopup>
		<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	</section>
</template>

<script>
	import $ from 'jquery'
	import Heads from '../common/head.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				titleName:"地址修改",
				listShow:false,
				proShow:true,
				cityShow:false,
				areaShow:false,
				townShow:false,
				address:"",
				proName:this.$route.query.msg.provinceName,
				cityName:this.$route.query.msg.cityName,
				areaName:this.$route.query.msg.areaName,
				townName:this.$route.query.msg.nodeName,
				proList:[],
				cityList:[],
				areaList:[],
				townList:[],
				proCode:this.$route.query.msg.province,
				cityCode:this.$route.query.msg.cityCode,
				areasCode:this.$route.query.msg.areaCode,
				townCode:this.$route.query.msg.town,
				province:this.$route.query.msg.provinceName,
				city:this.$route.query.msg.cityName,
				areas:this.$route.query.msg.areaName,
				town:this.$route.query.msg.townName,
				oldTownName:"",
				name:this.$route.query.msg.name,
				tel:this.$route.query.msg.tel,
				detail:this.$route.query.msg.address,
				id:this.$route.query.msg.id,
				preP:-1,
				preC:-1,
				preA:-1,
				preT:-1,
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				state:this.$route.query.msg.state,
				flagP:false,//用来判断是否重新选择了地址
				flagC:false,
				flagA:false,
				flagT:false,
			}
		},
		computed: {
//			address() {
//				return this.$route.params.provinceName+this.$route.params.cityName+this.$route.params.areaName+this.$route.params.townName
//			}
		},
		components:{
			Heads,errorPopup,sucPopup
		},
		mounted:function(){
			this.initAddress();
			
		},
		methods:{
			//根据镇编码获取镇名称
			initTownName(){
				let that = this;
				let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
				let token = userInfo.token;
				let dataArea = JSON.stringify({
					'nodeParent': that.areasCode
				});
				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:dataArea 
				},{emulateJSON:true}).then( response =>{
					console.log(response)
					let areaArray=response.body.dictAreaCacheList;
					for( let i in areaArray){
						if(areaArray[i].nodeCode == that.townCode){
							that.oldTownName = areaArray[i].nodeName;
							
						}
					}
				})
//				setTimeout(()=>{
//					console.log(this.oldTownName);
//				}, 500)
			},
			//获取详细地址信息
			initAddress () {
//				this.initTownName();
//				console.log(this.oldTownName)
				this.address = this.$route.query.msg.provinceName+this.$route.query.msg.cityName+this.$route.query.msg.areaName+this.$route.query.msg.nodeName;
			},
			//点击地址，弹出选择列表（镇）
			changeAddress () {
				$('#townName').addClass("zon").siblings().removeClass("zon");
				this.listShow = true;
				this.townShow = true;
				let code = this.areasCode;
//				this.proName = this.$route.query.msg.provinceName;
//				this.cityName = this.$route.query.msg.cityName;
//				this.areaName = this.$route.query.msg.areaName;
//				this.townName = this.$route.query.msg.nodeName;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{	
					console.log(response)
					this.townList = response.body.dictAreaCacheList;
					if(this.flagT == false){
						for(let i = 0; i < this.townList.length; i++){
							console.log(this.townList[i])
							if(this.townList[i].nodeName == this.$route.query.msg.nodeName){
								this.preT = i;
							}
						}
					}
				})				
			},
			close () {
				this.listShow = false;
				this.cityShow = false;
				this.areaShow = false;
				this.townShow = false;
			},
			//选择省份，弹出市列表
			optedPro (name,code,index) {
				$('#cityName').addClass("zon").siblings().removeClass("zon");
				this.proShow = false;
				this.cityShow = true;
				this.province = name;
				this.proName = name;
				this.proCode = code;
				this.preP = index;
				this.cityList = [];
				this.areaList = [];
				this.townList = [];
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{					
					this.cityList = response.body.dictAreaCacheList;
					this.cityName = '请选择';
					this.areaName = '请选择';
					this.townName = '请选择';
					this.flagP = true;
					this.flagC = true;
					this.flagA = true;
					this.flagT = true;
					this.preC = -1;
					this.preA = -1;
					this.preT = -1;
				})				
			},
			//选择市，弹出区列表
			optedCity (name,code,index) {
				$('#areaName').addClass("zon").siblings().removeClass("zon");
				this.cityShow = false;
				this.areaShow = true;
				this.city = name;
				this.cityName = name;
				this.cityCode = code;
				this.preC = index;
				this.areaList = [];
				this.townList = [];
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{					
					this.areaList = response.body.dictAreaCacheList;
					this.areaName = '请选择';
					this.townName = '请选择';
					this.flagC = true;
					this.flagA = true;
					this.flagT = true;
					this.preA = -1;
					this.preT = -1;
				})				
			},
			//选择区，弹出镇列表
			optedArea (name,code,index) {
				$('#townName').addClass("zon").siblings().removeClass("zon");
				this.areaShow = false;
				this.townShow = true;
				this.areas = name;
				this.areaName = name;
				this.areasCode= code;
				this.preA = index;
				this.townList = [];
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{	
					console.log(response)
					this.townList = response.body.dictAreaCacheList;
					this.townName = '请选择';
					this.flagA = true;
					this.flagT = true;
					this.preT = -1;
				})				
			},
			//选择镇
			optedTown (name,code,index) {
				this.townShow = false;
				this.listShow = false;
				this.town = name;
				this.townName = name;
				this.townCode = code;
				this.preT = index;
				this.address = this.province+this.city+this.areas+this.town
				this.flagT = true;
			},
			//上传新地址
			postNewAddress () {
				var reg_mobile = /^1\d{10}$/;
				if(!this.name||!this.tel||!this.proCode||!this.cityCode||!this.areasCode||!this.townCode||!this.detail){
					this.errShow = true;
					console.log(this.proCode )
					this.message = "请填写完整";
					setTimeout(() => {
						this.errShow = false	
					}, 1000)
				}else if(!reg_mobile.test(this.tel)){
					this.errShow = true;
					this.message = "手机号码格式不正确";
					setTimeout(() => {
						this.errShow = false	
					}, 1000)
				}else{
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let id = userInfo.userId;
					let data = JSON.stringify({
						'id' : this.id,
						'state' : this.state,
						'name' : this.name,
						'tel' : this.tel,
						'province' : this.proCode,
						'city' : this.cityCode,
						'area' : this.areasCode,
						'town' : this.townCode,
						'address' : this.detail,
						'phone' : "",
						'email' : ""					
					});
					console.log(data)
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
						token:token, 
						infoType:112012, 
						jsonValue:data 
					},{emulateJSON:true}).then( response =>{	
						this.sucShow = true;
						this.sucMessage = "修改成功"
						setTimeout(() => {
			                this.sucShow = false;
			                this.$router.go(-1);
			            }, 1500)
						
					},response =>{
						this.errShow = true;
						this.message = "修改失败";
						setTimeout(() => {
							this.errShow = false	
						}, 1000)
					})				
				}
			},
			proviceBtn () {
				$("#provinceName").addClass("zon").siblings().removeClass("zon");
				this.proShow = true;
				this.cityShow = false;
				this.areaShow = false;
				this.townShow = false;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':0
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					if(this.flagP == false){
						this.proList = response.body.dictAreaCacheList;
						for(let i = 0; i < this.proList.length; i++){
							if(this.proList[i].nodeName == this.$route.query.msg.provinceName){
								this.preP = i;
							}
						}
					}
				})				
			},
			cityBtn () {
				$("#cityName").addClass("zon").siblings().removeClass("zon");
				this.proShow = false;
				this.cityShow = true;
				this.areaShow = false;
				this.townShow = false;
				let code = this.proCode;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					if(this.flagC == false){
						this.cityList = response.body.dictAreaCacheList;
						for(let i = 0; i < this.cityList.length; i++){
							if(this.cityList[i].nodeName == this.$route.query.msg.cityName){
								this.preC = i;
							}
						}
					}
				})				
			},
			areaBtn () {
				$("#areaName").addClass("zon").siblings().removeClass("zon");
				this.proShow = false;
				this.cityShow = false;
				this.areaShow = true;
				this.townShow = false;
				let code = this.cityCode;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					if(this.flagA == false){
						this.areaList = response.body.dictAreaCacheList;
						for(let i = 0; i < this.areaList.length; i++){
							if(this.areaList[i].nodeName == this.$route.query.msg.areaName){
								this.preA = i;
							}
						}
					}
				})				
			},
			townBtn () {
				$("#townName").addClass("zon").siblings().removeClass("zon");
				this.proShow = false;
				this.cityShow = false;
				this.areaShow = false;
				this.townShow = true;
				let code = this.areasCode;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':code
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{	
					if(this.flagT == false){
						this.townList = response.body.dictAreaCacheList;
					}
				})				
			}
		}
	}
</script>

<style scoped>
	.record-data-form-btn{
		width: 100%;
		margin-top: 0.2rem;
	}
	.record-data-form-btn .post-btn {
		display: block;
		width: 93%;
		height: 0.8rem;
		margin: 0 auto;
		text-align: center;	
		vertical-align: middle;
		line-height: 0.8rem;
		background: #009983;
		color: #fff;
		font-size: 16px;
	}
	.clear{
		zoom: 1;
	}
	.clear:after{
		content:""; 
		display:block;
		clear:both;
	}
	#reviseAddress{
		padding-top: 0.84rem;
	}
	.zApp-Add-adsw{
		width: 100%;
	    margin: 0 auto;
	    background: #fff;
	    border-bottom: 1px solid #dedede;
	    overflow: hidden;
	}
	.zApp-Add-adsl{
		width: 100%;
	    margin: 0 auto;
	    padding: 0 0.2rem;
	    margin-bottom: -1px;
	}
	.zApp-Add-adsl li {
	    padding: 10px 0;
	    border-bottom: 1px solid #f0f0f0;
	    position: relative;
	    float: left;
    	width: 100%;
	}
	.zApp-Add-adsl li label {
	    float: left;
	    width: 100%;
	}
	.zApp-Add-adsl li em {
	    float: left;
	    width: 80px;
	    color: #a0a0a0;
	}
	.zApp-Add-adsl li .zApp-Add-adint {
	    margin-left: 80px;
	}
	.zApp-Add-adsl li .zApp-Add-adint input {
	    float: left;
	    width: 100%;
	    padding: 1px 0 1px 5px;
	    text-align: right;
	    color: #595959;
	}
	.zApp-Add-CityBox {
	    width: 100%;
	    margin: 0 auto;
	    height: 100%;
	}
	.zApp-Add-Citymask {
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 1000rem;
	    margin: 0 auto;
	    background: #000;
	    filter: alpha(opacity=20);
	    -moz-opacity: 0.2;
	    opacity: 0.2;
	    z-index: 9;
	}
	.zApp-Add-Cityinfo {
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 6rem;
	    background: #fff;
	    z-index: 10;
	    box-shadow: 0 0px 10px rgba(0,0,0,0.6);
   		-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,0.6);
    	-moz-box-shadow: 0px 0px 10px rgba(0,0,0,0.6);
	}
	.zApp-Add-Cityhead {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 0.8rem;
	    background: #fff;
	    border-bottom: 1px solid #dedede;
	}
	.zApp-Add-Cityhead h4 {
	    float: left;
	    width: 100%;
	    height: 0.8rem;
	    line-height: 0.8rem;
	    text-indent: 1em;
	    color: #595959;
	}
	.zApp-Add-Cityhead a {
	    position: absolute;
	    right: 0.2rem;
	    top: 0px;
	    width: 0.8rem;
	    height: 0.8rem;
	    background: url(../../assets/image/my/close_icon.png) no-repeat center;
	    background-size: 0.6rem;
	}
	.zApp-Add-Citywrap {
	    position: absolute;
	    top: 0.8rem;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    overflow: hidden;
	}
	.zApp-Add-Citytit {
	    width: 100%;
	    margin: 0 auto;
	    border-bottom: 1px solid #f0f0f0;
	}
	.zApp-Add-Citytit .zon {
	    border-bottom: 1px solid #ff5454;
	    position: relative;
	    line-height: 0.7rem;
	    height: 0.7rem;
	    bottom: -1px;
	    color: #ff5454;
	}
	.zApp-Add-Citytit input {
	    float: left;
	    width: 23%;
	    margin: 0 1%;
	    height: 0.7rem;
	    line-height: 0.7rem;
	    text-align: center;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    color: #a0a0a0;
	}
	.zApp-Add-Cityname {
	    position: absolute;
	    top: 0.72rem;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    overflow-x: hidden;
	    overflow-y: auto;
	}
	.zApp-Add-Citynamelist {
	    width: 100%;
	    margin: 0 auto;
	    padding: 0 0.2rem;
	    background: #fff;
	    position: absolute;
	    left: 0;
	    top: 0;
	    transition: all 0.2s ease-in-out;
	    -webkit-transition: all 0.2s ease-in-out;
	    -moz-transition: all 0.2s ease-in-out;
	    -ms-transition: all 0.2s ease-in-out;
	    -o-transition: all 0.2s ease-in-out;
	}
	.zApp-Add-Citynamelist li {
	    float: left;
	    width: 100%;
	    height: 0.8rem;
	    line-height: 0.8rem;
	    border-bottom: 1px dotted #f0f0f0;
	}
	.zApp-Add-Citynamelist li label {
	    float: left;
	    width: 100%;
	}
	.zApp-Add-Citynamelist li label a {
	    float: left;
	    width: 100%;
	    height: 0.8rem;
	    line-height: 0.8rem;
	    color: #595959;
	}
	.zApp-Add-Citynamelist li b {
	    float: left;
	}
	.textRed{
		color: #ff5454;
	}
	.zApp-Add-Citynamelist li i {
	    float: left;
	    width: 16px;
	    height: 16px;
	    margin: 12px 10px;
	    background: url(../../assets/image/my/opt_icon.png) no-repeat center 0;
	    background-size: 16px 30px;
	}
</style>