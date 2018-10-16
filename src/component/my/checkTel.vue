<template>
<section id="checkTel">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<ul class="basicData-content1 basicData-content clearfix">
		<label v-if="mobile !='****'">
			<li>
				<span>原手机号</span>
				<input type="text" placeholder="" readonly="readonly" v-model="mobile">
			</li>
		</label>
		<label v-if="mobile !='****'">
			<li>
				<span>登录密码</span>
				<input type="password" placeholder="登录密码" v-model="password">
			</li>
		</label>
		<label v-if="mobile !='****'">
			<li>
				<span>新手机号</span>
				<input type="text" placeholder="请输入新手机号" v-model="newMobile">
			</li>
		</label>
		<label v-if="mobile =='****'">
			<li>
				<span>认证手机</span>
				<input type="text" placeholder="请输入新手机号" v-model="newMobile">
			</li>
		</label>
		<label>
			<li class="picCode">
				<span>图片验证</span>
				<input type="text" placeholder="图片验证码" v-model="rand">
				<a href="javascript:void(0);" class="reg-codetxt" @click="regCode">
					<img :src="'data:image/JPEG ;base64,'+url"/>
				</a>
			</li>
		</label>
		<label>
			<li class="mobileTest">
				<span>短信验证</span>
				<input type="text" placeholder="请输入手机验证码" v-model="mobileCode">
				<a href="javascript:void(0);" class="mobile-codetxt" :class="{'mobile-codetxt-no':isClass}" @click="clickCode">{{ codetxt }}</a>
			</li>
		</label>
	</ul>
	<div class="submitBtn" @click="checkTel()">保存</div>
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
				isClass:false,
				codetxt:"获取验证码",
				url:"",
				rand:"",
				mobile:"",
				newMobile:"",
				mobileCode:"",
				titleName:"",
				password:"",
				flag:true
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
				let mobile = userInfo.identifyMobile;
				if(mobile==''){
					this.titleName="认证手机"
				}else{
					this.titleName="更换手机"
				}
			},
			codeimg () {// 默认图片验证码
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				console.log(userInfo)
				this.mobile = userInfo.identifyMobile.substring(0,3)+"****"+userInfo.identifyMobile.substring(7,11);
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
                		this.flag = false;
                		this.mobile = "";
                		this.$router.go(-1);
                	}  
                },1500);  
			},
			clickCode(){//获取手机验证码时间
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let mobile = userInfo.identifyMobile;
				let pwd = userInfo.pwd;
				if( this.newMobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.newMobile)) ){
					this.errShow = true;
					this.message = "请输入正确手机号";
					this.clearStorage();
				}else if( this.newMobile == mobile){
					this.errShow = true;
					this.message = "新旧手机号不能一样";
					this.clearStorage();
				}else if(this.mobile !='****'&&this.password != pwd){
					this.errShow = true;
					this.message = "登录密码不正确";
					this.clearStorage();
				}else {
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
						tableName:"WtBaseUserinfo",
						mobile:this.newMobile
					})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111144,jsonValue:data},{emulateJSON:true}).then( response => {
//						this.timer();
//						console.log(response)
						if(response.body.state == "true"){
							this.errShow = true;
							this.message = "该手机号已被注册";
							this.clearStorage();
						}else{
							this.timer()
							//手机号未被注册，验证图片验证码
							let data2 = JSON.stringify({
								mobile:this.newMobile,
								rand:this.rand
							})
							this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:222203,jsonValue:data2},{emulateJSON:true}).then( response => {
//								console.log(response)
							})
						}
					})
				}	
			},
			checkTel(){//上传验证手机号
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let userInfoId = userInfo.userInfoId;
				let data = JSON.stringify({
					userId:userId,
					userInfoId:userInfoId,
					mobile: this.newMobile,
					mobileCode: this.mobileCode,
					type:"mobile",
					verfiedType:"0"
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111120, jsonValue:data},{emulateJSON:true}).then( response => {
//					console.log(response)
					if(response.body.state == '{"state":"up_suc"}'){
						this.sucShow = true;
						this.sucMessage = "绑定手机成功";
						this.flag = false;
						this.clearStorage();
						//修改cookie中的旧手机号
						let userIn =  JSON.parse(this.$cookie.get('userInfo'));
						userIn.identifyMobile = this.newMobile;
						let str = JSON.stringify(userIn);
						this.$cookie.set('userInfo', str, { expires: '40m' });
						let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
						let token = userInfo.token;
						this.mobile = userInfo.identifyMobile;
						
					}else if(response.body.state == '{"state":"3"}'){
						this.errShow = true;
						this.message = "该手机号已绑定其他账号";
						console.log(response)
						this.clearStorage();
					}else{
						this.errShow = true;
						this.message = "操作失败";
						console.log(response)
						this.clearStorage();
					}
				})
			}			
		},
		created(){
			
		},
		mounted(){
			if(this.flag){
				this.codeimg()
			};
			if(this.flag){
				this.isFirst()
			}
		}
	}
</script>

<style scoped>
	#checkTel{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #f2f2f2;
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
		font-size: 0.24rem;
		position: relative;
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content li input{
		line-height: 0.88rem;
		width: 3rem;
		color: #000;
	}
	.basicData-content li span{
		display: inline-block;
		color: #000;
		width: 1.5rem;
	}
	.basicData-content li .mobile-codetxt{
		display: block;
		float: right;
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
		width: 2rem;
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
	.mobileTest{
		position: relative;
	}
	.mobile-codetxt-no {
		background: #eee;
	}
	input{
		display: inline-block;
		color: #666;
		text-align: left;
	}
	.submitBtn{
		width: 90%;
		margin: 0.4rem auto 0.8rem;
		height: 0.8rem;
		background: #009983;
		border-radius: 5px;
		color: #fff;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.8rem;
	}
</style>