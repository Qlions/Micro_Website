<template>
	<section class="changePwd">
		<Heads :title="titleName"></Heads>
		<errorPopup v-if="errShow==true" :message="message"></errorPopup>
		<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
		<div class="CPD-container">
			<div class="basicData1">
				<ul class="basicData-content1 basicData-content">
					<li>
						<label>
							<span>原密码：</span>
							<input type="password" spellcheck="false" placeholder="请输入原密码" v-model="passwords.oldPwd">
						</label>
					</li>
					<li>
						<label>
							<span>新密码：</span>
							<input type="password" spellcheck="false" placeholder="密码由8-16位数字、字母、特殊符号组成" v-model="passwords.newPwdst">
						</label>
					</li>
					<li>
						<label>
							<span>确认密码：</span>
							<input type="password" spellcheck="false" placeholder="请再次输入密码" v-model="passwords.newPwded">
						</label>
					</li>
				</ul>
			</div>
			<div class="submitBtn" @click="changePwd">确定提交</div>
			<div class="goback">
				<div class="back" v-on:click="gohome">
					返回首页
				</div>
			</div>
		</div>
	</section>
	
</template>
<script>
	import Heads from '../common/head.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				passwords:{
					oldPwd:"",
					newPwdst:"",
					newPwded:""
				},
				titleName:"修改密码",
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
			}
		},
		components:{
			Heads,errorPopup,sucPopup
		},
		mounted(){
			
		},
		methods: {
			gohome: function(){
				this.$router.go(-3);
			},
			clearStorage () { //2s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	} 
                	if(this.sucShow == true){
                		this.sucShow = false
                		this.$router.go(-1);
                	}
                },2000);  
			},
			changePwd:function(){
				let reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let pwd = userInfo.pwd;
				if(!(this.passwords.oldPwd&&this.passwords.newPwdst&&this.passwords.newPwded)){
					this.errShow = true;
					this.message = "请填写完整!"
					this.clearStorage()
				}else if(this.passwords.oldPwd != pwd){
					this.errShow = true;
					this.message = "原密码输入不正确!"
					this.clearStorage()
				}else if(this.passwords.newPwdst != this.passwords.newPwded){
					this.errShow = true;
					this.message = "两次输入的新密码不一致!"
					this.clearStorage()
				}else if(this.passwords.oldPwd == this.passwords.newPwdst){
					this.errShow = true;
					this.message = "新旧密码不能一致!"
					this.clearStorage()
				}else if(reg.test(this.passwords.newPwdst)==0){
					this.errShow = true;
					this.message = "密码由8-16位数字、字母、特殊符号组成!"
					this.clearStorage()
				}else{
					let data = JSON.stringify({'userPwd':this.passwords.newPwdst,'userPwdOld':this.passwords.oldPwd})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:400001, jsonValue:data},{emulateJSON:true}).then(response => {
		    		console.log(response)
						this.response = response.body;
						this.sucShow = true;
						this.sucMessage = '修改成功';
						this.clearStorage();
						//修改cookie中的旧密码
						let userIn =  JSON.parse(this.$cookie.get('userInfo'));
						userIn.pwd = this.pwd;
						let str = JSON.stringify(userIn);
						this.$cookie.set('userInfo', str, { expires: '40m' });
						let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
						},response => {
							console.log(response)
							this.response = response.body;
							this.errShow = true;
							this.message = '修改失败';
							this.clearStorage()
						})
				}
			}
		}
	}
</script>
<style scoped>
	.changePwd{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #eee;
		padding-top: .84rem;
	}
	.basicData1{
		width: 100%;
		margin-top: 0.4rem;
		background: #fff;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData2{
		width: 100%;
		margin-top: 0.4rem;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content{
		width: 90%;
		margin:0 auto;
		font-size: 0.24rem;

	}
	.basicData-content li{
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content li label{
		width: 100%;
	}
	.basicData-content li span{
		display: inline-block;
		color: #666;
		width: 1.5rem;
		text-align: right;
	}
	.basicData-content li input{
		width: 70%;
	}
	
	.changPwd-Err,.changPwd-Suc{
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
	}
	.changPwd-Suc i {
		display: block;
		width: 1.0rem;
		height: 1.0rem;
		background: url(../../assets/image/zErr_icon.png) no-repeat center -1rem;
		background-size: 1.0rem;
		margin: 0.75rem auto 0;
		z-index: 1999;
	}
	.changPwd-Suc p {
		color: #fff;
		font-size: 14px;
		line-height: 1.25rem;
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
	.goback{
		float: left;
		box-sizing: border-box;
		padding-left: 75%;
	    width: 90%;
	    margin: 0 5%;
	    height: 1rem;
	    line-height: 1rem;
	    color: #009983;
	    font-size: 0.26rem;
	}
</style>