<template>
<div class="signing-page">
	<heads :title="title" id="heads" v-on:child-say="listenToMyBoy"></heads>
	<!--正文-->
	<div class="signing-page-iframe">
		<iframe :src="iframeContent"></iframe>
	</div>
	
	<!--签约按钮-->
	<!--<router-link :to='{path: "/doctor/sigingOK" }' >-->
		<!--<div class="sigingBth" @click="goToSign">我要签约</div>-->
	<!--</router-link>-->
</div>
	
</template>

<script>
	import heads from '../common/head.vue'
	export default {
		props: {
			hasError:""
		},
		data(){
			return {
				title: '签约协议书',
				iframeContent: "",
				signInfo:""
				
			}
		},
		components:{
			heads
		},
		methods:{
			init(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo);
				this.userName = userInfo.userName;
				this.userMobile = userInfo.identifyMobile;
				let token = userInfo.token;
				//服务详情
				let siginData = JSON.stringify({
//					familyContractTeamId : this.$route.query.familyContractTeamId,
					flag : 'user',
					teamId : this.$route.query.familyContractTeamId
				});
				
				console.log(JSON.parse(siginData));

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660200, jsonValue:siginData},{emulateJSON:true}).then( response => {
					console.log(response);
					let data = response.body;
					this.signInfo = data;
					let protocol = window.location.protocol;
					let host = window.location.host;
					//let urls = protocol + "//" + host;
//					let urls = 'https://localtest.zgjky.cn';
					//正式环境地址
					let urls = 'https://www.zgjky.cn';
					this.iframeContent = urls + data.contractTeamProtocolContentUrl;

				});
			}
			,
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}

		},
		mounted(){
			this.init();
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.$refs.head_null.style.height = 0+'rem';
				}
			}
		}
	}
</script>

<style>
	#doctor{
		height: 100%;
		/*overflow: hidden;*/
	}
	.signing-page{
		width: 100%;
		height: 100%;
		
		
	}
	.signing-page-iframe{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.signing-page-iframe iframe{
		width: 100%;
		height: 100%;
		border: 0 none;
	}
	/*header*/
	#heads{
		background: #009983;
		border-bottom: 1px solid #eee !important;
	}
	#heads .head_null {
		height: .84rem !important;
	}
	#heads h2{
		color: #fff !important;
	}
	
	/*签约按钮*/
	.sigingBth{
		height: 0.84rem;
		background: #009983;
		width: 100%;
		position: fixed;
		bottom: 0;
		color: #fff;
		text-align: center;
		line-height: 0.84rem;
		font-size: 0.3rem;
	}
</style>