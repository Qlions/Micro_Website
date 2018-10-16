<template>
	<section id="pass-mobile">
		<Heads :title="title"></Heads>
		<div class="pass-mobile-content">
			<!-- <div class="pass-mobile-img">
				<img src="../../assets/image/login-loog.png" alt="">
			</div> -->
			<div class="pass-mobile-input">
				<ul>
					<li>
						<label for="">
							<span>填新密码：</span>
							<input type="password" placeholder="设置登录密码由(8-16位数字+字母+符号)" v-model="passA">
						</label>
					</li>
					<li>
						<label for="">
							<span>确认密码：</span>
							<input type="password" placeholder="请再次输入密码" v-model="passB">
		
						</label>
					</li>
				</ul>
			</div>
			<div class="zReg-sub">
				<a href="javascript:void(0);" class="passRet-btn" @click="passRet">确认提交</a>
				<a href="javascript:void(0);" class="zLogin-dpw" @click="loginBack"><<返回登录</a>
			</div>
		</div>
		<popup v-show="isPopup" :message="message"></popup>
		<Loading v-show="isLoading"></Loading>
	</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import popup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				title:"忘记密码",
				isPopup:false,
				isLoading:false,
				message:"", // 弹出框文本
				passA:"",
				passB:""
			}
		},
		components:{
			Heads,
			popup,
			Loading
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
                },5000);  
			},		
			passRet () {
				let vm = this;
				let data = JSON.stringify({
					'userName':this.$route.query.userName,
					'rand':this.$route.query.rand,
					'mobile':this.$route.query.mobile,
					'mobileCode':this.$route.query.mobileCode,
					'userPwd':this.passA
				})
				if(!(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/.test(vm.passA)) ){
					vm.isPopup = true;
					vm.message = "密码由8-16位数字、字母、特殊符号组成";
					vm.clearStorage();
				}else if( this.passA != this.passB ){
					vm.isPopup = true;
					vm.message = "两次密码不一致";
					vm.clearStorage();
				}else {
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.$route.query.token,infoType:111111,jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if( response.body.state == 'err_emptyPwd_001' ){
							vm.isPopup = true;
							vm.message = "输入新密码为空";
							vm.clearStorage();
						}else if( response.body.state == 'suc_pwd' ){
							vm.isPopup = true;
							vm.message = "找回密码成功";
							let obj = {'flag':'找回'}
							obj = JSON.stringify(obj);
							localStorage.setItem("temp", obj);
							vm.clearStorage();
							setTimeout(() => {
				               this.$router.push({ path: '/login/main' })
				            }, 1500);
						}
					})
				}
				
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
		width: 75%;
		outline: none;
		border: none;
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