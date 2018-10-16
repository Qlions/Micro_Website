<template>
	<section class="basicData">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<errorPopup v-if="errShow==true" :message="message"></errorPopup>
		<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
		<div class="BD-container clearfix">
			<div class="basicData1 clearfix">
				<ul class="basicData-content1 basicData-content clearfix">
					<!--<label>
						<li>
						<span>真实姓名：</span>
						<input type="text" placeholder="请输入真实姓名" v-model="userInfo.name">
						</li>
					</label>-->
					<label>
						<li>
							<span>UID：</span>
							<input class="bd-gray" type="text" readonly="readonly" placeholder="" v-model="userInfo.userCode">
						</li>
					</label>
					<label>
						<li>
							<span>昵称：</span>
							<input type="text" placeholder="请输入昵称" v-model="userInfo.username">
						</li>
					</label>
					<label>
						<li>
							<div class="sex_box" style="position: relative;">
								<span>性别：</span>
								<input type="text" placeholder="请输入性别" v-model="gender">
								<div class="sex_btn" style="position: absolute;top:0.2rem;right: 0;float: left;">
									<a href="javascript:void(0);" @click="man_on()" id="man" class="sex" :class='[userInfo.sex==1?"green":""]'>男</a>
									<a href="javascript:void(0);" @click="woman_on()" id="woman" class="sex" :class='[userInfo.sex==2?"green":""]'>女</a>
								</div>
							</div>
						</li>
					</label>
					<label for="n_birth">
						<li>
							<span>出生日期：</span>
							<input class="bd-gray" type="text" placeholder="输入日期" name="appDate" id="appDate"  @click="birthdayList" v-model="userInfo.birthDate">
						</li>
					</label>
					<label>
						<li>
							<span>所在省份：</span>
							<div class="point1" name="province" readonly="readonly" @click="provinceList()" v-text="userInfo.provinceName"> </div>
						</li>
					</label>
					<label>
						<li>
							<span>所在城市：</span>
							<div class="point1" name="city" readonly="readonly" @click="cityList()" v-text="userInfo.cityName"> </div>
						</li>
					</label>
					<label>
						<li>
							<span>所在区县：</span>
							<div class="point1" name="area" readonly="readonly" @click="areaList()" v-text="userInfo.areaName"> </div>
						</li>
					</label>
				</ul>
			</div>
			<div class="basicData2">
				<ul class="basicData-content2 basicData-content">
					<!--<label>
						<li>
							<span>手机号码：</span>
							<input type="text" placeholder="请输入手机号码" v-model="userInfo.mobile">
						</li>
					</label>-->
					<!--<label>
						<li>
							<span>电子邮箱：</span>
							<input type="text" placeholder="请输入电子邮箱" v-model="userInfo.Email">
						</li>
					</label>-->
					<label>
						<li>
							<span>工作单位：</span>
							<input class="bd-gray" type="text" placeholder="请输入工作单位" v-model="userInfo.ROrgName">
						</li>
					</label>
					<label>
						<li>
							<span>通信地址：</span>
							<input class="bd-gray" type="text" placeholder="请输入通信地址" v-model="userInfo.address">
						</li>
					</label>
					<label>
						<li>
							<span>邮编：</span>
							<input class="bd-gray" type="text" placeholder="请输入邮编" v-model="userInfo.postCode">
						</li>
					</label>
				</ul>
			</div>
			<div class="submitBtn" @click="postUserInfo">确定</div>
			<!--错误信息提示框
			<div class="changPwd-Err" v-if="showUp">
				<i></i>
				<p>{{ errWord }}</p>
			</div>-->
			
			<!--点击弹出省地址列表-->
			<div v-show='isShow_pro' style="width: 6rem;">
				
				<div class="my-address" style="background: #000000; opacity: 0.5;width: 100%;position: fixed;left: 0;top: 0;height: 100%;z-index: 999;overflow: hidden;">		
				</div>
				<div class="myprovinceTitle" style="position: fixed;top: 20%; left: 10%; z-index:9999;width:6rem;height: 1rem;line-height: 1rem;background:#fff;opacity:1;text-align: center;font-size: 0.32rem;color: #6aac34;border-bottom: 2px solid #6AAC34;">{{addressType}}</div>
				<div class="my-province-container" style=" width: 80%;height: 50%;background: #fff;opacity: 1;position: fixed;top: 20%;left: 10%;z-index:999;border-radius: 3px;overflow:auto;">
					
					<ul class="add_list">
						<li class="add" v-for = "item in list" @click="closeList_pro(item.nodeName,item.nodeCode)">{{item.nodeName}}</li>
					</ul>
				</div>
			</div>
			<!--点击弹出市地址列表-->
			<div v-show='isShow_city' style="width: 6rem;" > 
				<!--蒙版-->
				<div class="my-address" style="background: #000000; opacity: 0.5;width: 100%;position: fixed;left: 0;top: 0;height: 100%;z-index: 999;overflow: hidden;">		
				</div>
				<div class="myprovinceTitle" style=" position:fixed; top:20%; left:10%;z-index:1000;width:80%;height: 1rem;line-height: 1rem;background:#fff;opacity:1;text-align: center;font-size: 0.32rem;color: #6aac34;border-bottom: 2px solid #6AAC34;">{{addressType}}</div>
				<div class="my-province-container"  style="width: 80%;height: 50%;background: #fff;position: fixed;top: 20%;left: 50%;z-index:999;margin-left: -40%;border-radius: 3px;overflow:auto;">
					
					<ul class="add_list">
						<li class="add" v-for = "item in list" @click="closeList_city(item.nodeName,item.nodeCode)">{{item.nodeName}}</li>
					</ul>
				</div>
			</div>
			<!--点击弹出地区列表-->
			<div v-show='isShow_area' style="width: 6rem;">
				<!--蒙版-->
				<div class="my-address" style="background: #000000; opacity: 0.5;width: 100%;position: fixed;left: 0;top: 0;height: 100%;z-index: 999;overflow: hidden;">		
				</div>
				<div class="myprovinceTitle" style=" position:fixed; top:20%; left:10%;z-index:1000;width:80%;height: 1rem;line-height: 1rem;background:#fff;opacity:1;text-align: center;font-size: 0.32rem;color: #6aac34;border-bottom: 2px solid #6AAC34;">{{addressType}}</div>
				<div class="my-province-container" style="width: 80%;height: 50%;background: #fff;position: fixed;top: 20%;left: 50%;z-index:999;margin-left: -40%;border-radius: 3px;overflow:auto;">
					
					<ul class="add_list">
						<li class="add" v-for = "item in list" @click="closeList_area(item.nodeName,item.nodeCode)">{{item.nodeName}}</li>
					</ul>
				</div>
			</div>

		</div>
			
	</section>
	
</template>
<script>
	import $ from 'jquery'
	import '../../assets/js/mobiscroll.core-2.5.2.js' 
	import '../../assets/js/mobiscroll.core-2.5.2-zh.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1-zh.js'
	import '../../assets/js/mobiscroll.android-ics-2.5.2.js'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				isLoading:true,
				nohead:"nohead",
				test:1111,
				titleName:"个人资料",
				userNameFlag:false,
				isShow_pro:false,
				isShow_city:false,
				isShow_area:false,
//				errWord:"",
//				showUp:false,
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				addressType:"",
				addName:"",
				proCode:"",
				list:"",
				response:"",
				userInfo:{
					name:"",
					userCode:"",
					username:"",
					sex:"",
					birthDate:"",
					provinceCode:"",
					cityCode:"",
					areaCode:"",
					provinceName:"选择所在省份",
					cityName:"选择所在城市",
					areaName:"选择所在区县",
					mobile:"",
					Email:"",
					ROrgName:"",
					address:"",
					postCode:""
				}
			}
		},
		computed:{
			gender:function(){
				if(this.userInfo.sex==1){
					return "男"
				}else if(this.userInfo.sex==2){
					return "女"
				}
			}
		},
		components:{
			Heads,errorPopup,sucPopup,Loading
		},
		created: function(){	
		},
		mounted: function(){		
			//进入页面后首先判断用户是否已填写过信息
			this.watchUser();
			this.birthdayList();
			$(function(){
			    // 阻止蒙版后页面滑动
			    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			    //移动端
			        $(".add_list").on('touchmove',function(e){
			            e.stopPropagation();
//			            e.preventDefault();
						$(".basicData").on('touchmove',function(e){
				            e.stopPropagation();
				            e.preventDefault();
			        	})
						$(".BD-container").on('touchmove',function(e){
				            e.stopPropagation();
				            e.preventDefault();
			        	})
						$("body").on('touchmove',function(e){
				            e.stopPropagation();
				            e.preventDefault();
			        	})
						$("html").on('touchmove',function(e){
				            e.stopPropagation();
				            e.preventDefault();
			        	})
			        })
//			        $(".myprovinceTitle").on('touchmove',function(e){
//			            e.stopPropagation();
//			            e.preventDefault();
//			        })
//			        $(".my-province-container").on('touchmove',function(e){
//			            e.stopPropagation();
//			            e.preventDefault();
//			        })
			        $(".my-address").on('touchmove',function(e){
			            e.stopPropagation();
			            e.preventDefault();
			        })
			    }
			})
		},
		methods: {
			//性别按钮点击事件
			man_on:function(){
				$("#man").addClass("sex_on" );
				$("#woman").removeClass("sex_on" );
			},
			woman_on:function(){
				$("#woman").addClass("sex_on" );
				$("#man").removeClass("sex_on" );
			},
			//省份地址弹出
			provinceList:function(){
				document.getElementsByTagName('input')[4].style.marginLeft = '-10rem';
				this.isShow_pro = true;
				this.addressType = "选择所在省/直辖市";
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
					this.list=response.body.dictAreaCacheList;
				})				
			},
			//市地址弹出
			cityList:function(){
				document.getElementsByTagName('input')[5].style.marginLeft = '-10rem';
				if(this.userInfo.provinceCode){
					this.isShow_city = true;
				}
				this.addressType = "选择所在城市";
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':this.userInfo.provinceCode
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111134, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					this.list=response.body.dictAreaCacheList;
				})				
			},
			//地区地址弹出
			areaList:function(){
				document.getElementsByTagName('input')[6].style.marginLeft = '-10rem';
				if(this.userInfo.cityCode){
					this.isShow_area = true;
				}	
				this.addressType = "选择所在地区";
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'nodeParent':this.userInfo.cityCode
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
						token:token, 
						infoType:111134, 
						jsonValue:data 
					},{emulateJSON:true}).then( response =>{
						this.list=response.body.dictAreaCacheList;
					})				
			},

			//省地址关闭
			closeList_pro:function(name,code){
				document.getElementsByTagName('input')[4].style.marginLeft = '0';
				this.isShow_pro = false;
				this.userInfo.provinceName = name;
				this.userInfo.provinceCode = code;
				this.userInfo.cityName = "选择所在城市";
				this.userInfo.areaName = "选择所在区县";
				this.list = ""
			},
			//市地址关闭
			closeList_city:function(name,code){
				document.getElementsByTagName('input')[5].style.marginLeft = '0';
				this.isShow_city = false;
				this.userInfo.cityName = name;
				this.userInfo.cityCode = code;
				this.userInfo.areaName = "选择所在区县";
				this.list = ""
			},
			//区地址关闭
			closeList_area:function(name,code){
				document.getElementsByTagName('input')[6].style.marginLeft = '0';
				this.isShow_area = false;
				this.userInfo.areaName = name;
				this.userInfo.areaCode = code;
				this.list = ""
			},
			
			birthdayList:function(){
				var currYear = (new Date()).getFullYear();	
				var opt={};
				opt.date = {preset : 'date'};
				opt.datetime = {preset : 'datetime'};
				opt.time = {preset : 'time'};
				opt.default = {
					theme: 'android-ics light', //皮肤样式
			        display: 'modal', //显示方式 
			        mode: 'scroller', //日期选择模式
					lang:'zh',
					dateFormat: 'yyyy-mm-dd',
			        startYear:currYear - 50, //开始年份
			        endYear:currYear + 0 //结束年份
				};
				$("#appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));		    
			},
		    //错误提示框
		    errMask:function(txt){
				var that = this;
				that.message = txt;
				that.errShow = true;
				setTimeout(function(){
					that.errShow = false;
				},1000)
				
			},
		    //根据昵称判断用户是否已填写信息
		    watchUser:function(){
		    	var that = this;
		    	let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
//		    	console.log(userInfo)
				let token = userInfo.token;
				let res = JSON.stringify({userName:userInfo.userName,userType:1})
				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
					that.response = JSON.parse(response.body.state)[0];
					console.log(that.response)
					that.userInfo.userCode = that.response.userCode;
					that.userInfo.provinceCode = that.response.provinceCode;
					that.userInfo.cityCode = that.response.cityCode;
					that.userInfo.areaCode = that.response.areaCode;
					setTimeout(() => {
		               that.isLoading = false;
		            }, 500)
					//判断用户是否已填写过姓名
//					if (that.response.name) {
//						that.userInfo.name = that.response.name
//						document.getElementsByTagName('input')[0].disabled = 'true';
//					}
					//判断用户是否已添加昵称
					if (that.response.userName != userInfo.userCode) {
						that.userInfo.username = that.response.userName;
						document.getElementsByTagName('input')[1].disabled = 'true';
						this.userNameFlag = true;
					}
					if (that.response.userName == userInfo.userCode) {
						that.userInfo.username = "";
					}
					//判断是否有性别
					if (that.response.gender) {
						that.userInfo.sex = that.response.gender;
						document.getElementsByTagName('input')[2].disabled = 'true';
					}
					//判断是否有地址
					if (that.response.provinceCode){
						//遍历省列表得到省份名称
						let dataPro = JSON.stringify({
							'nodeParent':0
						});
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111114, 
							jsonValue:dataPro 
						},{emulateJSON:true}).then( response =>{
							let proArray=response.body.dictAreaCacheList;
//							console.log(proArray)
							for( let i in proArray){
								if(proArray[i].nodeCode == that.response.provinceCode){
									that.userInfo.provinceName = proArray[i].nodeName;
								}
							}
						})				
//						that.userInfo.provinceName = that.response.provinceCode;
//						that.userInfo.cityName = that.response.cityCode;
//						that.userInfo.areaName = that.response.areaCode;
						//遍历市列表得到市名称
						let dataCity = JSON.stringify({
							'nodeParent': that.response.provinceCode
						});
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111114, 
							jsonValue:dataCity 
						},{emulateJSON:true}).then( response =>{
							let cityArray=response.body.dictAreaCacheList;
							for( let i in cityArray){
								if(cityArray[i].nodeCode == that.response.cityCode){
									that.userInfo.cityName = cityArray[i].nodeName;
								}
							}
						})
						//遍历区列表得到区名称
						let dataArea = JSON.stringify({
							'nodeParent': that.response.cityCode
						});
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111114, 
							jsonValue:dataArea 
						},{emulateJSON:true}).then( response =>{
							let areaArray=response.body.dictAreaCacheList;
							for( let i in areaArray){
								if(areaArray[i].nodeCode == that.response.areaCode){
									that.userInfo.areaName = areaArray[i].nodeName;
								}
							}
						})
					}
					//生日
					if (that.response.birthDate) {
						let day_res = that.response.birthDate
						let day = day_res.substring(0,10)
						that.userInfo.birthDate = day;
					}
//					//手机号码
//					if (that.response.mobile) {
//						that.userInfo.mobile = that.response.mobile;
//					}
//					//电子邮件
//					if (that.response.email) {
//						that.userInfo.Email = that.response.email;
//					}
					//工作单位
					if (that.response.ROrgName) {
						that.userInfo.ROrgName = that.response.ROrgName;
					}
					//通信地址
					if (that.response.address) {
						that.userInfo.address = that.response.address;
					}
					//邮编
					if (that.response.postCode) {
						that.userInfo.postCode = that.response.postCode;
					}
				})
		    },
		    //提交用户修改
		    postUserInfo:function(){
		    	var that = this;
		    	let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
				let token = userInfo.token;
		    	var reg_mobile = /^1\d{10}$/;
		    	var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		    	var reg_postCode= /^[1-9][0-9]{5}$/;
		    	var reg_userName = /(^[A-Za-z0-9]{3,20}$)|^[\u4e00-\u9fa5]{2,10}$/;
//		    	if (!reg_mobile.test(that.userInfo.mobile)) {
//					that.errMask('手机号格式不正确!')
//		    	}else if (!reg_email.test(that.userInfo.Email)) {
//					that.errMask("邮箱格式不正确!")
		    	if (!reg_postCode.test(that.userInfo.postCode)) {
					that.errMask("邮编格式不正确!")
		    	}else if(!reg_userName.test(that.userInfo.username)){
		    		that.errMask("昵称不能同时包含字母与汉字或数字与汉字!")
		    	}else if (!(that.userInfo.username)||
		    			  !(that.userInfo.sex)||
		    			  !(that.userInfo.provinceName)||
		    			  !(that.userInfo.cityName)||
		    			  !(that.userInfo.areaName)||
		    			  !(that.userInfo.birthDate)||
		    			  !(that.userInfo.ROrgName)||
		    			  !(that.userInfo.address)||
		    			  !(that.userInfo.postCode)){
					that.errMask("请补全信息!")
		    	}else if(that.userInfo.username&&that.userInfo.username != userInfo.userCode&&that.userNameFlag ==false){
		    		console.log(1)
					let str = JSON.stringify({'userName':that.userInfo.username})
					that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:113026, jsonValue:str},{emulateJSON:true}).then(response => {
			    		console.log(response)
			    		if(response.body.state =='err_userName_002'){
			    			that.errShow = true;
			    			that.message = "该昵称已存在"
			    			setTimeout(function(){
								that.errShow = false;
							},1000)
			    		}else{
		    		let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
//						'name':that.userInfo.name,
						'userName':that.userInfo.username,
						'gender':that.userInfo.sex,
						'provinceCode':that.userInfo.provinceCode,
						'cityCode':that.userInfo.cityCode,
						'areaCode':that.userInfo.areaCode,
						'birthDate':that.userInfo.birthDate,
//						'mobile':that.userInfo.mobile,
//						'Email':that.userInfo.Email,
						'ROrgName':that.userInfo.ROrgName,
						'address':that.userInfo.address,
						'postCode':that.userInfo.postCode
					});
//					console.log(data)
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111119, jsonValue:data},{emulateJSON:true}).then(response => {
			    		console.log(response)
						that.sucMessage = "提交成功";
						//修改cookie中的旧昵称
						let userIn =  JSON.parse(that.$cookie.get('userInfo'));
						userIn.userName = that.userInfo.username;
						let str2 = JSON.stringify(userIn);
						that.$cookie.set('userInfo', str2, { expires: '40m' });
						console.log(1)
						console.log(JSON.parse(that.$cookie.get('userInfo')))
						that.sucShow = true;
						setTimeout(function(){
							that.sucShow = false;
							that.$router.go(-1);
						},1000)
					})	
		    	}
					})	
		    	}else{
		    		let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
//						'name':that.userInfo.name,
						'userName':that.userInfo.username,
						'gender':that.userInfo.sex,
						'provinceCode':that.userInfo.provinceCode,
						'cityCode':that.userInfo.cityCode,
						'areaCode':that.userInfo.areaCode,
						'birthDate':that.userInfo.birthDate,
//						'mobile':that.userInfo.mobile,
//						'Email':that.userInfo.Email,
						'ROrgName':that.userInfo.ROrgName,
						'address':that.userInfo.address,
						'postCode':that.userInfo.postCode
					});
//					console.log(data)
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111119, jsonValue:data},{emulateJSON:true}).then(response => {
			    		console.log(response)
						that.sucMessage = "提交成功";
						//修改cookie中的旧昵称
//						let userIn =  JSON.parse(that.$cookie.get('userInfo'));
//						userIn.userName = that.userInfo.username;
//						let str2 = JSON.stringify(userIn);
//						this.$cookie.set('userInfo', str2, { expires: '40m' });
						that.sucShow = true;
						setTimeout(function(){
							that.sucShow = false;
							that.$router.go(-1);
						},1000)
					})	
		    	}
		    	
		    }
		    
		}
	}
</script>
<style scoped>
	.basicData{
		width: 100%;
		position: absolute;
		background: #f2f2f2;
		padding-top: .84rem;
	}
	.basicData1{
		width: 100%;
		margin-top: 0.4rem;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
		background: #fff;
	}
	.basicData2{
		width: 100%;
		margin-top: 0.4rem;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
		background: #fff;
	}
	.basicData-content{
		width: 90%;
		margin:0 auto;
		font-size: 0.28rem;

	}
	.basicData-content li{
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content li span{
		display: inline-block;
		color: #666;
		width: 1.5rem;
		text-align: left;
	}
	.basicData-content li .point1{
		display: inline-block;
		color: #999;
		width:70%;
		text-align: left;
	}
	.basicData-content li .bd-gray{
		color: #999;
	}
	input{
		display: inline-block;
		color: #333;
		width:70%;
		text-align: left;
		outline: none;
	}
	.submitBtn{
		width: 90%;
		margin: 0.4rem auto 0;
		height: 0.8rem;
		background: #009983;
		border-radius: 5px;
		color: #fff;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.8rem;
	}
	/*.changPwd-Err{
		width: 90%;
		margin: 0 5%;
		height: 3.25rem;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -1.625rem;
		background: #000;
		border-radius: 0.25rem;
		-moz-border-radius: 10px;
		-webkit-border-radius: 10px;
		filter: alpha(opacity=65);
		-moz-opacity: 0.65;
		-khtml-opacity: 0.65;
		opacity: 0.65;
		text-align: center;
		z-index: 999;
	}
	.changPwd-Err i {
		display: block;
		width: 1.0rem;
		height: 1.0rem;
		background: url(../../assets/image/zErr_icon.png) no-repeat center top;
		background-size: 1.0rem;
		margin: 0.75rem auto 0;
		z-index: 1999;
	}
	.changPwd-Err p {
		color: #fff;
		font-size: 14px;
		line-height: 1.25rem;
	}*/
	.add_list{
		overflow: hidden;
		margin-top:1rem;
	}
	.add{
		float: left;
		border-bottom: 1px dotted #e6e6e6;
		padding: 10px 0;
		float: left;
    	width: 100%;
	    line-height: 30px;
	    color: #333;
	    font-size: 16px;
	    text-align: center;
	}
	.sex{
		float: left;
		width: 1rem;
		height:0.5rem;
		line-height: 0.5rem;
		text-align: center;background: #f2f2f2;
		color: #7b7b7b;
		margin-left: 1px;
	}
	.green{
		background: #009983;
    	color: #fff;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>