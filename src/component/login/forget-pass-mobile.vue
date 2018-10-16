<template>
	<section id="pass-mobile">
		<Heads :title="title"></Heads>
		<div class="pass-mobile-content">
			<div class="pass-mobile-input">
				<ul>
					<li>
						<label for="">
							<span>手机号码：</span>
							<input type="text" placeholder="请输入手机号码" v-model="mobile">
						</label>
					</li>
					<li>
						<label for="">
							<span>短信验证：</span>
							<input type="text" placeholder="短信验证码" v-model="mobileCode">
							<a href="javascript:void(0);" class="pass-mobile-reg" @click="regCode">
								{{ codetxt }}
							</a>
						</label>
					</li>
				</ul>
			</div>
			<div class="zReg-sub">
				<a href="javascript:void(0);" class="passRet-btn" @click="passRet">下一步</a>
				<a href="javascript:void(0);" class="zLogin-dpw" @click="loginBack"><<返回登录</a>
			</div>
		</div>
		<popup v-show="isPopup" :message="message"></popup>
	</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import popup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				title:"忘记密码",
				isPopup:false,
				message:"", // 弹出框文本
				mobileCode:"",
				mobile:"",
				codetxt:"获取验证码"
			}
		},
		components:{
			Heads,
			popup
		},
		methods:{
			loginBack () {
				this.$router.push({ path: '/login/main' });
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },3000);  
			},
			timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isCalss = true;
							vm.codetxt = sec + "秒" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isCalss = false;
							vm.codetxt = '获取验证码';
						}
					}, i * 1000)
			    }			
			},
			regCode () {
				let vm = this; 
				if( vm.mobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.mobile)) ){
					vm.isPopup = true;
					vm.message = "请输入正确手机号";
					vm.clearStorage();
				}else {
					let data = JSON.stringify({
						'userName':this.$route.query.userName,
						'mobile':this.mobile,
						'msgType':6
					})
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.$route.query.token,infoType:222202,jsonValue:data},{emulateJSON:true}).then( response => {
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
			},
			passRet () {
				let vm = this;
				let data = JSON.stringify({
					'userName':this.$route.query.userName,
					'rand':this.$route.query.rand,
					'mobile':this.mobile,
					'mobileCode':this.mobileCode
				})
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.$route.query.token,infoType:111111,jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if( vm.mobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.mobile)) ){
						vm.isPopup = true;
						vm.message = "请输入正确手机号";
						vm.clearStorage();
					}else if( response.body.state == 'err_mobile_1' ){
						vm.message = '手机没有填写';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_mobile_2' ){
						vm.message = '与认证手机不匹配';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_mobileCode_1' ){
						vm.message = '手机验证码没有填写';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_mobileCode_2' ){
						vm.message = '手机验证码错误';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_mobileCode_3' ){
						vm.message = '手机验证码超时';
						vm.isPopup = true;
						vm.clearStorage();
					}else {
						this.$router.push({ path: '/login/main/confirmPass',query:{
								token:this.$route.query.token,
								userName:this.$route.query.userName,
								rand:this.$route.query.rand,
								mobile:this.mobile,
								mobileCode:this.mobileCode
							} 
						}) 
					}
				})
			}
		},
		mounted () {
				
		},
		created () {
			
		}
	}
</script>
<style>
	#pass-mobile {
		padding-top: .84rem;
	}
	.pass-mobile-content {
		width: 100%;
	}
	.pass-mobile-img {
		width: 3rem;
		height: 3rem;
		margin: 0 auto;
		margin-bottom: 1rem;
	}
	.pass-mobile-img img {
		width: 100%;
	}
	.pass-mobile-input {
		width: 100%;
		border: 1px solid #f0f0f0;
		border-left: none;
		border-right: none;
		background: #fff;
		overflow: hidden;
	}
	.pass-mobile-input ul {
		width: 95%;
		margin: 0 auto;
	}
	.pass-mobile-input ul li label {
		position: relative;
		display: block;
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		overflow: hidden;
		background-color: #fff;
		border-bottom: 1px solid #f0f0f0;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 14px;
		color: #666;
	}
	.pass-mobile-input ul li:last-child label {
		border-bottom:none;

	}
	.pass-mobile-input ul li label span {
		display: block;
		float: left;
	}
	.pass-mobile-input ul li label input {
		outline: none;
		border: none;
	}
	.pass-mobile-reg {
		display: block;
		width: 2rem;
		height: 0.65rem;
		text-align: center;
		color: #333;
		line-height: 0.65rem;
		font-size: .28rem;
		position: absolute;
		right: 0;
		top: 0.11rem;
		background: #009983;
	}
	.pass-mobile-reg img {
		width: 100%;
		height: 100%;
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
	.reg-agr {
	    width: 90%;
	    margin: 0.25rem auto;
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
		font-size: 14px;
		color: #999;
		float: left;
		margin-left: 0.25rem;
	}
	.zReg-sub {
		width: 90%;
	    margin: 0 auto;
	}
	.zReg-sub a.passRet-btn {
		display: block;
		width: 100%;
		height: 1.0rem;
		line-height: 1.0rem;
		background-color: #009983;
		color: #fff;
		text-align: center;
		border-radius: 0.125rem;
		-moz-border-radius: 0.125rem;
		-webkit-border-radius: 0.125rem;
		font-size: 16px;
		margin: 0.6rem 0;
	}
	.zLogin-dpw {
		color: #009983;
		text-align: right;
		font-size: 14px;
		display: block;
	}
</style>