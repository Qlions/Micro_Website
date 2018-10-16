<template>
	<section id="register_paw">
		<Heads :title="title"></Heads>
		<div class="reg-form-content">
			<div class="reg-form-input-paw">
				<ul>
					<li>
						<label for="">
							<span>用户昵称：</span>
							<input type="text" placeholder="ID号/手机号/昵称/邮箱" v-model="userName">
						</label>
					</li>
					<li>
						<label for="">
							<span>图片验证：</span>
							<input type="text" placeholder="图片验证码" v-model="rand">
							<a href="javascript:void(0);" class="pic-code" @click="regCode">
								<img :src="'data:image/JPEG ;base64,'+url"/>
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
				password:'',
				url:"",
				userName:"",
				rand:"",
				token:""
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
                },5000);  
			},
			codeimg () { // 默认图片验证码
				let vm = this;
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetAuthServiceToken',{token:'',infoType:111103,jsonValue:{}},{emulateJSON:true}).then( response => {
					this.token = response.body.token;
					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:response.body.token,infoType:111105,jsonValue:JSON.stringify({"isBase64":"yes"})},{emulateJSON:true}).then( response => {
						vm.url = response.bodyText;
					})		
				})
			},
			regCode () {
				this.codeimg();
			},
			passRet () {
				let vm = this;
				let data = JSON.stringify({
					'userName':this.userName,
					'rand':this.rand
				})
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:this.token,infoType:111111,jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if( response.body.state == 3 ){
						vm.message = '图片验证码错误';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_name_1' ){
						vm.message = '账户信息没有填写';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_name_2' ){
						vm.message = '用户不存在';
						vm.isPopup = true;
						vm.clearStorage();
					}else if( response.body.state == 'err_name_3' ){
						vm.message = '没有认证手机';
						vm.isPopup = true;
						vm.clearStorage();
					}else {
						this.$router.push({ path: '/login/main/passRetrievalMobile',query:{token:this.token,userName:this.userName,rand:this.rand} }) 
					}
				})
			}
		},
		mounted () {
			this.codeimg();		
		},
		created () {
			
		}
	}
</script>
<style>
	#register_paw {
		padding-top: .84rem;
	}
	.reg-form-content {
		width: 100%;
	}
	.reg-form-img {
		width: 3rem;
		height: 3rem;
		margin: 0 auto;
		margin-bottom: 1rem;
	}
	.reg-form-img img {
		width: 100%;
	}
	.reg-form-input-paw {
		width: 100%;
		border: 1px solid #f0f0f0;
		border-left: none;
		border-right: none;
		background: #fff;
		overflow: hidden;
	}
	.reg-form-input-paw ul {
		width: 95%;
		margin: 0 auto;
	}
	.reg-form-input-paw ul li label {
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
	.reg-form-input-paw ul li:last-child label {
		border-bottom:none;

	}
	.reg-form-input-paw ul li label span {
		display: block;
		float: left;
	}
	.reg-form-input-paw ul li label input {
		outline: none;
		border: none;
	}
	.pic-code {
		display: block;
		width: 2rem;
		height: 0.65rem;
		line-height: 0.65rem;
		position: absolute;
		right: 0;
		top: 0.11rem;
	}
	.pic-code img {
		width: 100% !important;
		height: 100% !important;
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