<template>
	<div id="login-form">
		<load v-if="isLoad" style="z-index: 99999;background: rgba(0,0,0,0.4) !important;"></load>
		<div class="zLogin-wrap">
			<ul class="zLogin-l clear">
				<li>
					<label for="">
						<span class="zLogin-name"></span>
						<div class="int zLogin-us">
							<input type="text" placeholder="ID号/手机号/昵称/邮箱" v-model="username">
						</div>	
					</label>
				</li>
				<li>
					<label for="">
						<span class="zLogin-pw"></span>
						<div class="int zLogin-us">
							<input v-model="userpws" v-if="seen == true" type="password" placeholder="登录密码">
							<input v-model="userpws" v-if="seen == false" type="text" placeholder="登录密码">
							<img :src="seen ? unseenImg : seenImg" alt="" @click="changeSeen">
						</div>
					</label>
				</li>
			</ul>
		</div>
		<div class="zLogin-sub clear">
			<a href="javascript:void(0)" @click="login" >登录</a>
			<p :class="{ 'loginAutoNo': isNoAuto}" v-show= "isAutoShow != 1" @click="loginFn()" class="loginAuto">下次自动登录</p>
		</div>
		<div class="zLogin-userset">
			<router-link to='/login/main/passRetrieval'>忘记密码</router-link>
			<router-link to='/login/main/register'>立即注册</router-link>	
		</div>
		<ErrorPopup :message="message" v-if="showUp"></ErrorPopup>
	</div>
</template>
<script>
	import ErrorPopup from '../common/error-popup.vue'
	import load from "../common/loading.vue"
	export default {
		data () {
			return {
				username:"",
				userpws:"",
				errNull:"",
				showUp:false,
				message:"",
				seen:true,
				unseenImg:"./src/assets/image/pwd_close.png",
				seenImg:"./src/assets/image/pwd_show.png",
				isNoAuto: false,
				wxOpenId: '',
				isLoad: false,
				isAutoShow: this.$route.query.share
			}
		},
		components:{
			ErrorPopup,
			load
		},
		methods:{
			login () {
				
				let userName = this.username;
				let password = this.userpws;
				if( userName == '' || password == "" ){
					this.showUp = true;
					this.message = "请输入用户名或密码";
					this.clearStorage();
					return;
				}else {
					if(this.isAutoShow == 1){
						this.isNoAuto = true;
					}	
					if(!this.isNoAuto){
						//获取cookie 里的  openid
						let wxMsg = JSON.parse(this.$cookie.get("wxMsg"));
						let wxOpenId = wxMsg.openid;
						let wxUnionid = wxMsg.unionid;
					
						//选择自动登陆
						var vm = this;
						// 登陆
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetAuthService', {userName:userName,password:password,userType:'1'},{emulateJSON:true}).then(response => {
							var loginRes = response.body;
							this.isLoad = false;
							console.log(response);
							var userId = loginRes.userId;
							var loginToken = loginRes.token;
							if( loginToken == 'err_login_003' ){
								this.showUp = true;
								this.message = "登录失败,账号或密码错误";
								this.clearStorage();
								return;
							}else if( loginToken == 'err_login_001' ){
								this.showUp = true;
								this.message = "登录失败,账号或密码错误";
								this.clearStorage();
								return;
							}else if( loginToken == 'err_login_004' ){
								this.showUp = true;
								this.message = "登录失败,账号或密码错误";
								this.clearStorage();
								return;
							}else if( loginToken == 'err_login_002' ){
								this.showUp = true;
								this.message = "登录失败,账号或密码错误";
								this.clearStorage();
								return;
							}else{
								//蒙版
								this.isLoad = true;
								// 绑定第三方
								let voilData = JSON.stringify({
									isMain: 0,
									thirdId: wxOpenId,
									thirdSource: 1,
									unionId: wxUnionid,
									userId: userId
								})
								vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{jsonValue: voilData, infoType: 160001, token: loginToken}, {emulateJSON: true} ).then( response =>{
									console.log(response.body.resultState)
									setTimeout ( () =>{
										vm.isLoad = false;
									},200)
										let str = JSON.stringify(loginRes);
										this.$cookie.set('userInfo', str, { expires: '40m' });
										//向cookie中添加手机号,userInfoId,头像
										let userIn =  JSON.parse(this.$cookie.get('userInfo'));
										let token = userIn.token;
										let res = JSON.stringify({userName:userIn.userName,userType:1});
										this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
											console.log(response)
											this.response = JSON.parse(response.body.state)[0];
											userIn.identifyMobile = this.response.identifyMobile;
											userIn.identifyEmail = this.response.identifyEmail;
											userIn.photomiddle = this.response.photomiddle;
											userIn.userInfoId = this.response.userinfoId;
											userIn.name = this.response.name;
											userIn.pwd = this.userpws;
											let str = JSON.stringify(userIn);
											this.$cookie.set('userInfo', str, { expires: '40m' });
											this.$cookie.set('gender', this.response.gender, { expires: '40m' }); // 储存男女
											let userInfo = JSON.parse(this.$cookie.get('userInfo')); 
										})
										if(sessionStorage.getItem("eid")){//健康应用无返回按钮时的跳转
											this.$router.push({"path":'/apply',query:{eaId:1}});
											console.log(sessionStorage.getItem("eid"))
										}else{
											if(localStorage.getItem("temp")){
												var obj=JSON.parse(localStorage.getItem("temp"));
												if(obj.flag ==1 ){//先注册再登录时的跳转
													this.$router.go(-3);
													let ojj = {'flag':0}
													ojj = JSON.stringify(ojj);
													localStorage.setItem("temp", ojj);
													console.log('先注册')
												}else if(obj.flag ==3){
													this.$router.push({"path":'/my'});
													let ojj = {'flag':0}
													ojj = JSON.stringify(ojj);
													localStorage.setItem("temp", ojj);
													console.log('微信个人中心')
												}else if(obj.flag =='找回'){
													this.$router.push({"path":'/home/main'});
													let ojj = {'flag':0}
													ojj = JSON.stringify(ojj);
													localStorage.setItem("temp", ojj);
												}else{
													this.$router.go(-1);
													console.log('游客')
												}
											}else{//直接登录时的跳转
												this.$router.push({"path":'/my'});
												console.log('wode')
											}
										}
										
									})
								}
						
						})
					}else{
						//未选 自动登陆
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetAuthService', {userName:userName,password:password,userType:'1'},{emulateJSON:true}).then(response => {
						this.response = response.body;
						if( this.response.token == 'err_login_003' ){
							this.showUp = true;
							this.message = "密码不对";
							this.clearStorage();
							return;
						}else if( this.response.token == 'err_login_001' ){
							this.showUp = true;
							this.message = "未知异错误";
							this.clearStorage();
						}else if( this.response.token == 'err_login_004' ){
							this.showUp = true;
							this.message = "已被加入黑名单";
							this.clearStorage();
						}else if( this.response.token == 'err_login_002' ){
							this.showUp = true;
							this.message = "用户不存在";
							this.clearStorage();
						}else {
							let str = JSON.stringify(this.response);
							this.$cookie.set('userInfo', str, { expires: '40m' });
							//向cookie中添加手机号,userInfoId,头像
							let userIn =  JSON.parse(this.$cookie.get('userInfo'));
							let token = userIn.token;
							let res = JSON.stringify({userName:userIn.userName,userType:1});
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
								this.response = JSON.parse(response.body.state)[0];
								userIn.identifyMobile = this.response.identifyMobile;
								userIn.identifyEmail = this.response.identifyEmail;
								userIn.photomiddle = this.response.photomiddle;
								userIn.userInfoId = this.response.userinfoId;
								userIn.name = this.response.name;
								userIn.pwd = this.userpws;
								let str = JSON.stringify(userIn);
								this.$cookie.set('userInfo', str, { expires: '40m' });
								this.$cookie.set('gender', this.response.gender, { expires: '40m' }); // 储存男女
								let userInfo = JSON.parse(this.$cookie.get('userInfo')); 
							})
							if(sessionStorage.getItem("eid")){
								this.$router.push({"path":'/apply',query:{eaId:1}});
								console.log(sessionStorage.getItem("eid"))
							}else{
								if(localStorage.getItem("temp")){
									var obj=JSON.parse(localStorage.getItem("temp"));
									if(obj.flag ==1 ){//先注册再登录时的跳转
										this.$router.go(-3);
										let ojj = {'flag':0}
										ojj = JSON.stringify(ojj);
										localStorage.setItem("temp", ojj);
										console.log('先注册')
									}else if(obj.flag ==3){
										this.$router.push({"path":'/my'});
										let ojj = {'flag':0}
										ojj = JSON.stringify(ojj);
										localStorage.setItem("temp", ojj);
										console.log('微信个人中心')
									}else if(obj.flag =='找回'){
										this.$router.push({"path":'/home/main'});
										let ojj = {'flag':0}
										ojj = JSON.stringify(ojj);
										localStorage.setItem("temp", ojj);
									}else{
										this.$router.go(-1);
										console.log('游客')
									}
								}else{//直接登录时的跳转
									this.$router.push({"path":'/my'});
									console.log('wode')
								}
							}
						
						}
					}, response => {
						console.log(response)
					});
				}
						
					}
					
			},
			
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.showUp ==  true){
                		this.showUp = false;
                	} 
                },3000);  
			},
			changeSeen () {
				this.seen = !this.seen;
			},
			// 自动登陆切换
			loginFn (){
				this.isNoAuto = !this.isNoAuto;
			},
//			noClickLog(){//用户未点击登录，直接点击返回时路由处理
//				let ojj = {'flag':0}
//				ojj = JSON.stringify(ojj);
//				localStorage.setItem("temp", ojj);
//			}
		},
		created (){
			
			

		},
		mounted(){
//			this.noClickLog();
			console.log(!this.isNoAuto)
		}
	}
</script>
<style>
	#login-form {
		width: 100%;
		margin: 0 auto;
	}
	.zLogin-wrap {
	    width: 100%;
	    margin: 0 auto;
	    border: 1px solid #f0f0f0;
	    border-left: none;
	    border-right: none;
	    background: #fff;
	    overflow: hidden;
	}
	.zLogin-l {
	    width: 90%;
	    margin: 0 auto;
	    margin-bottom: -1px;
	}
	.zLogin-l li {
	    float: left;
	    width: 100%;
	}
	.zLogin-l li label {
	    float: left;
	    width: 100%;
	    border-bottom: 1px solid #f0f0f0;
	    padding: 0.15rem 0;
	}
	.zLogin-l li span {
	    float: left;
	    width: 0.7rem;
	    height: 0.7rem;
	    background: url(../../assets/image/login_user_icon.png) no-repeat scroll center;
	    background-size: 0.7rem auto;
	}
	.zLogin-us img {
		float: right;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: .1rem;
	}
	.int {
		width: 85%;
	    float: left;
	    background: #fff;
	    border: none;
	}
	.int input {
	    float: left;
	    border: none;
	    background: none;
	    outline: none;
	    -webkit-tap-highlight-color: rgba(0,0,0,0);
		color: #333;
		font-size: 16px;
		margin-top: .14rem;
		text-indent: .075rem;
	}
	.zLogin-sub {
	    width: 100%;
	    margin: 0px auto;
	    margin: 0.5rem 0;
	}
	.zLogin-sub a {
	    display: block;
	    width: 95%;
	    margin: 0 auto;
	    height: 1.0rem;
	    line-height: 1.0rem;
	    background: #009983;
	    color: #fff;
	    text-align: center;
	    border-radius: 0.125rem;
	    -moz-border-radius: 0.125rem;
	    -webkit-border-radius: 0.125rem;
	    font-size: .34rem;
	}
	.zLogin-l li .zLogin-name {
	    background-position: center 0;
	}
	.zLogin-l li span.zLogin-pw {
	    background-position: center -0.63rem;
	}
	.zLogin-userset {
	    width: 46%;
	    margin: 0 auto;
	}
	.zLogin-userset a {
	    color: #bdbdbd;
	    font-size: .3rem;
	    padding: 0 0.2rem;
	}
	.zLogin-userset a:last-child {
		border-left: 1px solid #bdbdbd;
	}
	/*自动登陆*/
	.loginAuto{
		float: right;
		text-align: right;
		line-height: 0.7rem;
		font-size: 0.28rem;
		background: url(../../assets/image/login/checked.png) no-repeat;
		background-size:0.28rem;
		background-position: 24% center;
		width: 35%;
		margin-right:2.5% ;
		color: #009983;
	}
	.loginAutoNo{
		float: right;
		text-align: right;
		line-height: 0.7rem;
		color: #bdbdbd;
		font-size: 0.28rem;
		background: url(../../assets/image/login/check.png) no-repeat;
		background-size:0.28rem;
		background-position: 24% center;
		width: 35%;
		margin-right:2.5% ;
		color: #bdbdbd;
	}
</style>