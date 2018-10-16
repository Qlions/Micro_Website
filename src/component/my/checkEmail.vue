<template>
<section id="checkEmail">
	<Heads :title="titleName" id="cancleHead"></Heads>
	<Loading v-if="isLoading"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<ul class="basicData-content clearfix">
		<!--<label v-if="oldEmail != ''">
			<li>
				<span>原邮箱</span>
				<input type="text" spellcheck="false" placeholder="原邮箱" v-model="oldEmail">
			</li>
		</label>-->
		<!--<label v-if="oldEmail != ''">
			<li>
				<span>新邮箱</span>
				<input type="text" spellcheck="false" placeholder="请输入新邮箱" v-model="newEmail">
			</li>
		</label>-->
		<label>
			<li>
				<span>认证邮箱</span>
				<input type="text" spellcheck="false" placeholder="请输入新邮箱" v-model="newEmail">
			</li>
		</label>
		<label>
			<li class="picCode">
				<span>图片验证</span>
				<input type="text" spellcheck="false" placeholder="图片验证码" v-model="rand">
				<a href="javascript:void(0);" class="reg-codetxt" @click="regCode">
					<img :src="'data:image/JPEG ;base64,'+url"/>
				</a>
			</li>
		</label>
		<label>
			<li class="emailTest">
				<span>验证码</span>
				<input type="text" placeholder="邮箱验证码" v-model="emailCode">
				<a href="javascript:void(0);" class="email-codetxt" :class="{'mobile-codetxt-no':isClass}" @click="clickCode">{{ codetxt }}</a>
			</li>
		</label>
	</ul>
	<div class="submitBtn" @click=" checkEmail()">保存</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				isLoading:false,
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				codetxt:"获取验证码",
				oldEmail:"",
				newEmail:"",
				rand:"",
				url:"",
				emailCode:"",
				isClass:false,
				titleName:"认证邮箱"
			}
		},
		computed:{

		},
		components:{
			Heads,
			Loading,
			errorPopup,
			sucPopup
		},
		methods: {
			isFirst(){//判断是否初次认证
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let email = userInfo.identifyEmail;
				if(email==''){
					this.titleName="认证邮箱"
				}else{
					this.titleName="更换邮箱"
				}
			},
			codeimg () {// 默认图片验证码
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
//				console.log(userInfo)
				let token = userInfo.token;
				this.newEmail = userInfo.identifyEmail;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111105,jsonValue:JSON.stringify({"isBase64":"yes"})},{emulateJSON:true}).then( response => {
					this.url = response.bodyText;
				})
			},
			regCode(){
				this.codeimg()
			},
			timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isClass = true;
							vm.codetxt = sec + "秒" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isClass = false;
							vm.codetxt = '获取验证码';
						}
					}, i * 1000)
			    }			
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}if( this.sucShow ==  true){
                		this.sucShow = false;
                		this.$router.go(-1);
                	}  
                },2000);  
			},
			clickCode(){//获取邮箱验证码时间
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let email = userInfo.identifyEmail;
				if( this.newEmail == '' || !(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.newEmail)) ){
					this.errShow = true;
					this.message = "邮箱格式不正确";
					this.clearStorage();
				}else if(this.newEmail ==email){
					this.errShow = true;
					this.message = "新旧邮箱不能一样";
					this.clearStorage();
				}else {
					let data = JSON.stringify({
						tableName:"WtBaseUserinfo",
						email:this.newEmail
					})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111144,jsonValue:data},{emulateJSON:true}).then( response => {
//						console.log(response)
						if(response.body.state == "true"){
							this.errShow = true;
							this.message = "该邮箱已绑定其他账号";
							this.clearStorage();
						}else{
							this.timer()
							//手机号未被注册，验证图片验证码
							let data2 = JSON.stringify({
								email:this.newEmail,
								rand:this.rand
							})
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:222204,jsonValue:data2},{emulateJSON:true}).then( response => {
//								console.log(response)
							})
						}
					})
				}	
			},
			checkEmail(){//上传验证邮箱
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let userInfoId = userInfo.userInfoId;
				let data = JSON.stringify({
					userId:userId,
					userInfoId:userInfoId,
					email: this.newEmail,
					emailCode: this.emailCode,
					type:"email",
					verfiedType:"0"
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111120, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.state == '{"state":"up_suc"}'){
						this.sucShow = true;
						this.sucMessage = "绑定邮箱成功";
						this.clearStorage();
						//修改cookie中的旧邮箱
						let userIn =  JSON.parse(this.$cookie.get('userInfo'));
						userIn.identifyEmail = this.newEmail;
						let str = JSON.stringify(userIn);
						this.$cookie.set('userInfo', str, { expires: '40m' });
						let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
						let token = userInfo.token;
						this.oldEmail = userInfo.identifyEmail;
						
					}else if(response.body.state == '{"state":"4"}'){
						this.errShow = true;
						this.message = "该邮箱已绑定其他账号";
						this.clearStorage();
					} else{
						this.errShow = true;
						this.message = "操作失败";
						console.log(response)
						this.clearStorage();
					}
				})
			}			
		},
		mounted:function(){
			this.codeimg()
			this.isFirst()
		}
	}
</script>

<style scoped>
	#checkEmail{
		width: 100%;
		height: 100%;
		background: #f2f2f2;
		position: absolute;
		font-size: 0.24rem;
		padding-top: .84rem;
	}
	.basicData-content{
		width: 100%;
		padding: 0 0.3rem;
		margin-top: 0.4rem;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
		background: #fff;
	}
	.basicData-content li{
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content li span{
		display: inline-block;
		color: #000;
		width: 1.5rem;
	}
	.basicData-content li input{
		line-height: 0.88rem;
		color: #000;
		width: 3.2rem;
	}
	.basicData-content li .email-codetxt{
		display: block;
		float: right;
		text-align: center;
		width: 1.8rem;
		line-height: 0.3rem;
		padding: 0.2rem 0.3rem;
		background: #009983;
		margin-top: 0.1rem;
		color: #fff;
		border-radius: 2px;
	}
	.picCode{
		position: relative;
	}
	.reg-codetxt {
		display: block;
		width: 2rem;
		height: 0.65rem;
		line-height: 0.65rem;
		position: absolute;
		right: 0;
		top: 0.11rem;
	}
	.reg-codetxt img {
		width: 100%;
		height: 100%;
	}
	.emailTest{
		position: relative;
	}
	.email-codetxt-no {
		background: #eee;
	}
	input{
		display: inline-block;
		color: #666;
		text-align: left;
	}
	.submitBtn{
		width: 90%;
		margin: 0.4rem auto 0.1rem;
		height: 0.8rem;
		background: #009983;
		border-radius: 5px;
		color: #fff;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.8rem;
	}
	#cancleHead b {
		
	}
</style>