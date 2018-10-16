<template>
   <div class="a">
   <Heads :title="titleName"></Heads>
     <div class="contBgBox">
     	 <!--按钮-->
   		<div class="thisPageBtns">
   			<!--确定-->
   			<div class="makeSure" @click="btnOkFn">确定登录电脑端</div>
   			<div class="thisCancle" @click="btnCanlFn">取消登录</div>
   		</div>
     </div>
     <upPop :message="errWordpop" v-if="iserrpop"></upPop>
     <sucpop :sucMessage="sucWordpop" v-if="issucpop"></sucpop>
   </div> 
</template>

<script>
	import Heads from '../common/head.vue'
	import upPop from "../common/error-popup.vue"
	import sucpop from "../common/suc-popup.vue"
	export default {
		data () {
			return {
				titleName:"扫码登录",
				keyQR: this.$route.query.key,
				errWordpop: '登录失败',
				iserrpop: false,
				issucpop: false,
				sucWordpop: "登录成功",
				
			}
		},
		computed:{
			
		},
		components:{
			Heads,
			upPop,
			sucpop
		},
		methods: {
			btnOkFn(){
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let OKData = JSON.stringify({
					key: this.keyQR
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:160007, jsonValue:OKData},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.status == "suc"){
						this.issucpop = true;
						setTimeout( () => {
							this.issucpop = false;
							this.$router.push("../home/main");
						}, 500)
						
					}else{
						this.iserrpop = true;
						setTimeout( () => {
							this.iserrpop = false;
						}, 500)
						console.log(response)
					}
				})
			},
			btnCanlFn(){
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let cancelData = JSON.stringify({
					key: this.keyQR
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:160008, jsonValue:cancelData},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.status == "suc"){
						
						this.$router.go(-1);
					}else{
						console.log(response)
					}
				})
			}
		},
		mounted(){
		}
	}
</script>
	
<style>
	#scanQRCode{
		width: 100%;
		height: 100%;
	}
	.a{
		height: 100%;
		width: 100%;
	}
	.contBgBox{
		width: 100%;
		height: 100%;
		background: url(../../assets/image/signin.png) no-repeat;
		background-size:cover ;
		padding-top: 1px;
	}
	.thisPageBtns{
		margin-top: 90%;
	}
	.makeSure{
		width: 6rem;
		height: 1rem;
		margin: 0 auto;
		background:#009983;
		text-align: center;
		line-height: 1rem;
		color: #FFFFFF;
		border-radius: 0.12rem;
		font-size: 0.32rem;
	}
	.thisCancle{
		width: 80%;
		height: 1rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		background:#fff;
		text-align: center;
		line-height: 1rem;
		color: #666666;
		border: 1px solid #dddddd;
		border-radius: 0.12rem;
		font-size: 0.32rem;
	}
	
	
</style>