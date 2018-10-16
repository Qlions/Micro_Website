<template>
	<section id="register">
		<Heads :title="title"></Heads>
		<div class="reg-form">
			<div class="reg-form-input">
				<ul>
					<li>
						<label for="" class="phone">
							<span class="phone"><img src="../../assets/image/main_registerPhone@2x.png" alt=""></span>
							<input type="text" placeholder="请输入手机号码" v-model="mobile">
						</label>
					</li>
					<li>
						<label for="" class="code">
							<span class="code"><img src="../../assets/image/main_registerCode@2x.png" alt=""></span>
							<input type="text" placeholder="填写验证码" v-model="mobileCode">
							<a href="javascript:void(0);" class="reg-codetxt" :class="{'reg-codetxt-no':isCalss}" @click="clickCode">{{ codetxt }}</a>
						</label>
					</li>
					<li>
						<label for="" class="pwd">
							<span class="pwd"><img src="../../assets/image/main_registerPwd@2x.png" alt=""></span>
							<input v-model="password" v-if="seen == true" type="password" placeholder="设置登录密码由(8-16位数字+字母+符号)">
							<input v-model="password" v-if="seen == false" type="text" placeholder="设置登录密码由(8-16位数字+字母+符号)">
							<img :src="seen ? unseenImg : seenImg" alt="" @click="changeSeen">
						</label>
					</li>
				</ul>
			</div>
			<div class="zReg-sub">
				<a href="javascript:void(0);" class="reg-btn" @click="register">立即注册</a>
			</div>
			<div class="reg-agr">
				<p @click="isHide">注册即表示您已同意<span>中国健康云用户服务协议</span></p>
			</div>
		</div>
		<RserverJump v-if="isShow" :isShow="isShow" :jump="isShow" v-on:child-event="test"></RserverJump>
		<loading v-if="isLoading"></loading>
		<popup v-if="isPopup" :message="message"></popup>
	</section>

</template>
<script>
/*	import $ from 'jquery'
	import '../../assets/js/mobiscroll.core-2.5.2.js' 
	import '../../assets/js/mobiscroll.core-2.5.2-zh.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1-zh.js'
	import '../../assets/js/mobiscroll.android-ics-2.5.2.js'*/

	import Heads from '../common/head.vue'
	import popup from '../common/error-popup.vue'
	import loading from '../common/loading.vue'
	import RserverJump from './register-service-jump.vue'
	export default {
		data () {
			return {
				title:"用户注册",
				message:"",
				isActive:0,
				isCalss:false,
				isPopup:false,
				isShow:false,
				gender:"男",
				sex:1,
				password:'',
				codetxt:"获取验证码",
				year:"",
				mobile:"",
				mobileCode:"",
				token:"",
				seen:true,
				isLoading:false,
				unseenImg:"./src/assets/image/pwd_close.png",
				seenImg:"./src/assets/image/pwd_show.png",
				regSexSet:[
					{ gender:'男',index:0,sex:1 },
					{ gender:'女',index:1,sex:2 }
				]
			}
		},
		components:{
			Heads,
			RserverJump,
			popup,
			loading
		},
		methods:{
			changeSex (index,gender,sex){
				this.isActive = index;
				this.gender = gender;
				this.sex = sex;
			},
			loginBack (){
				this.$router.push({ path: '/login/main' });
			},
			isHide (){
				if (this.isShow != true) {
					this.isShow = true;
				}
			},
			test (data) {
				this.isShow = data;
			},
			timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isCalss = true;
							vm.codetxt = sec + "秒重新发送" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isCalss = false;
							vm.codetxt = '获取验证码';
						}
					}, i * 1000)
			    }			
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },3000);  
			},
			clickCode () { //获取手机验证码时间
				let vm = this; 
				
				if( vm.mobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.mobile)) ){
					vm.isPopup = true;
					vm.message = "请输入正确手机号";
					vm.clearStorage();
				}else {
					let data = JSON.stringify({
						'mobile':this.mobile,
						'tableName':'WtBaseUserinfo'
					})	
					// 获取一次性token
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetAuthServiceToken',{token:'',infoType:111103,jsonValue:{}},{emulateJSON:true}).then( response => {
						vm.token = response.body.token;	
					})
					// 判断手机号号码是否存在
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:vm.token,infoType:111144,jsonValue:data},{emulateJSON:true}).then( response => {
						if( response.body.state == "true" ){
							vm.isPopup = true;
							vm.message = "手机信息已存在";
							vm.clearStorage();
						} else if( response.body.state == "false" ){
							let data = JSON.stringify({
								'mobile':this.mobile
							})
							// 如果手机号码不存在，执行验证码
							vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:'',infoType:222202,jsonValue:data},{emulateJSON:true}).then( response => {
								if( response.body.state == 'err-01' ){
									vm.isPopup = true;
									vm.message = "电话为空";
									vm.clearStorage();
								}else if( response.body.state == 'err-02' ){
									vm.isPopup = true;
									vm.message = "验证码每天不得超过5条";
									vm.clearStorage();
								}else if( response.body.state == 'err-04' ){
									vm.isPopup = true;
									vm.message = "验证码发送间隔不小于1分钟";
									vm.clearStorage();
								}else {
									vm.timer();
								}
							})
						}	
					})
				}	
			},
			register () { // 提交注册
				let vm = this;
				this.isLoading = true;
				if( vm.mobile == '' ){
					vm.isPopup = true;
					vm.isLoading = false;
					vm.message = "请输入手机号";
					vm.clearStorage();
				}else {
					//let birthDate = sessionStorage.getItem('year');
					//let birthYear = birthDate.substring(0,4);
					//let thisDate = new Date();
					//let thisYear=thisDate.getFullYear();
					//let endYear = thisYear-birthYear;
					if( !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.mobile)) ){
						vm.isPopup = true;
						vm.isLoading = false;
						vm.message = "手机号格式不正确";
						vm.clearStorage();
					}else if(!(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/.test(vm.password)) ){
						vm.isPopup = true;
						vm.isLoading = false;
						vm.message = "密码由8-16位数字、字母、特殊符号组成";
						vm.clearStorage();
					}else {
						if(sessionStorage.getItem('eid')){
							let data = JSON.stringify({
								'identifyMobile':'mobile',
								'mobile':this.mobile,
								'mobileCode':this.mobileCode,
								'userPwd':this.password,
								'eaId':"56329367465265152100001",
								'regSource':8,
							})
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:'',infoType:111150,jsonValue:data},{emulateJSON:true}).then( response => {
								console.log(response)
								if( response.body.state == 1 ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "验证码错误";
									vm.clearStorage();
								}else if( response.body.state == 2 ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "验证码超时";
									vm.clearStorage();
								}else if( response.body.state == 3 ) {
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "手机号码重复";
									vm.clearStorage();
								}else if( response.body.state == 4 ) {
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "密码不合法";
									vm.clearStorage();
								}else if( response.body.name ||  response.body.userCode ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "注册成功";
									vm.clearStorage();	
									let obj = {'flag':1}
									obj = JSON.stringify(obj);
									localStorage.setItem("temp", obj);
									let time = setTimeout(()=>{		
										this.$router.push({ path: '/login/main' }) 
					                },1500);
								}
							})
						}else {
							let data = JSON.stringify({
								'identifyMobile':'mobile',
								'mobile':this.mobile,
								'mobileCode':this.mobileCode,
								'userPwd':this.password,
								'eaId':"",
								'regSource':8,
							})
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:'',infoType:111150,jsonValue:data},{emulateJSON:true}).then( response => {
								console.log(response)
								if( response.body.state == 1 ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "验证码错误";
									vm.clearStorage();
								}else if( response.body.state == 2 ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "验证码超时";
									vm.clearStorage();
								}else if( response.body.state == 3 ) {
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "手机号码重复";
									vm.clearStorage();
								}else if( response.body.state == 4 ) {
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "密码不合法";
									vm.clearStorage();
								}else if( response.body.name ||  response.body.userCode ){
									vm.isPopup = true;
									vm.isLoading = false;
									vm.message = "注册成功";
									vm.clearStorage();	
									let obj = {'flag':1}
									obj = JSON.stringify(obj);
									localStorage.setItem("temp", obj);
									let time = setTimeout(()=>{		
										this.$router.push({ path: '/login/main' }) 
					                },1500);
								}
							})
						}	
					}
				}

			},
			changeSeen () {
				this.seen = !this.seen;
			},
			noClickReg(){//用户未注册，点击返回时路由处理
				let ojj = {'flag':0}
				ojj = JSON.stringify(ojj);
				localStorage.setItem("temp", ojj);
			}
		},
		mounted () {	
			this.noClickReg()
			/*let currYear = (new Date()).getFullYear();	
			let opt = {};
			let yearDate = '';
			opt.date = {preset : 'date'};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'scroller', //日期选择模式
				lang:'zh',
				dateFormat: 'yyyy-mm-dd',
		        startYear:currYear-100, //开始年份
		        endYear:currYear + 10,//结束年份
		        onSelect:function(valueText,inst){
			    	sessionStorage.year = valueText;
			    }
			};
			$("#appDate").mobiscroll($.extend(opt['date'], opt['default']));*/
		}
	}
</script>
<style>
	#register {
		width: 100%;
		height: 100%;
		background: #fff;
		padding-top: .84rem;
	}
	.reg-form {
		width: 100%;
	}
	.reg-form-input {
		width: 100%;
		border-left: none;
		border-right: none;
		background: #fff;
		overflow: hidden;
		margin-top: .3rem;
	}
	.reg-form-input ul {
		width: 95%;
		margin: 0 auto;
	}
	.reg-form-input ul li label {
		position: relative;
		display: block;
		width: 100%;
		height: 1.18rem;
		line-height:1.18rem;
		overflow: hidden;
		background-color: #fff;
		border-bottom: 1px solid #d7d7d7;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: .28rem;
		color: #666;
	}
	.reg-form-input ul li label span {
		width: .7rem;
		float: left;
		margin-right: .2rem;
	}
 	.reg-form-input ul li label span.phone img {
 		width: 0.3rem;
		height: 0.4rem;
		display: block;
		float: left;
		margin-left: .2rem;
		margin-top: .35rem;
	}
	.reg-form-input ul li label span.code img {
 		width: 0.45rem;
		height: 0.3rem;
		display: block;
		float: left;
		margin-left: .15rem;
		margin-top: .42rem;
	}
	.reg-form-input ul li label span.pwd img {
 		width: 0.35rem;
		height: 0.4rem;
		display: block;
		float: left;
		margin-left: .2rem;
		margin-top: .35rem;
	}
	.reg-form-input ul li label input {
		width: 75%;
		outline: none;
		border: none;
	}
	.reg-codetxt {
		display: block;
		width: 2.5rem;
		height: 0.85rem;
		text-align: center;
		color: #009983;
		line-height: 0.85rem;
		font-size: 14px;
		border-radius: 0.125rem;
		-moz-border-radius: 0.125rem;
		-webkit-border-radius: 0.125rem;
		position: absolute;
		right: 0;
		top: 0.15rem;
		border: 1px solid #009983;
	}
	.reg-sex-set {
	    position: absolute;
		right: 0;
		top: 0.18rem;
	}
	.reg-sex-set a {
	    float: left;
	    width: 1rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    text-align: center;
	    background: #f2f2f2;
	    color: #7b7b7b;
	    margin-left: 1px;
	}
	.reg-sex-set .active-reg {
		background: #009983;
		color: #fff;
	}
	.reg-agr i {
		float: left;
		background: url(../../assets/image/rad_icon.png) no-repeat scroll center -0.4rem;
		width: 0.4rem;
		height: 0.4rem;
		background-position: center 0px;
		background-size: 100%;
	}
	.reg-agr p {
		font-size: .28rem;
		color: #999;
		text-align: center;
	}
	.reg-agr p span {
		color: #009983;
	}
	.zReg-sub {
		width: 95%;
	    margin: .3rem auto;
	}
	.zReg-sub a.reg-btn {
		display: block;
		width: 100%;
		height: 1.0rem;
		line-height: 1.0rem;
		background: #009983;
		color: #fff;
		text-align: center;
		border-radius: 0.125rem;
		-moz-border-radius: 0.125rem;
		-webkit-border-radius: 0.125rem;
		font-size: 16px;
	}
	.zLogin-dpw {
		color: #009983;
		text-align: right;
		font-size: 14px;
		display: block;
		margin-top: 0.25rem;
	}
	.reg-form-input ul li label img {
		float: right;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: .32rem;
		margin-right: .2rem;
	}
</style>