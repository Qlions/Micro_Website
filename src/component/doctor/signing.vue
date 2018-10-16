<template>
<div class="signing-page">
	<heads :title="title" id="heads" :style="{ height:activeSingTop }" v-on:child-say="listenToMyBoy"></heads>
	<!--正文-->
	<div class="signing-page-iframe" :style="{ top:activeiframeTop }">
		<iframe :src="iframeContent" style="margin-bottom: 0.8rem;"></iframe>
	</div>
	
	<!--签约按钮-->
	<!--<router-link :to='{path: "/doctor/sigingOK" }' >-->
		<div class="sigingBth" @click="goToSign">我要签约</div>
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
				signInfo:"",
				activeSingTop:"",
				activeiframeTop:''
				
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
					//测试环境地址
					let urls = 'https://localtest.zgjky.cn';
					//正式环境地址
//					let urls = 'http://www.zgjky.cn';
					this.iframeContent = urls + data.contractTeamProtocolContentViewUrl;
					console.log(data.contractTeamProtocolContentViewUrl)
					
				});
			},
			goToSign(){
				
				let data = this.signInfo;
				let signInfo = {
					teamId : data.familyContractTeamId,
					eaId : data.eaId,
					proFkId : data.proId,
					doctorId : this.$route.query.userId
				}
				console.log(data);
				console.log(signInfo);
				var that = this;
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				console.log(userInfo);
				console.log(userInfo.userName);
				this.$store.signInfo = signInfo;
//				return false;
				let token = userInfo.token;
				let res = JSON.stringify({userName:userInfo.userName,userType:1})

				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{

					that.response = JSON.parse(response.body.state)[0];
					console.log(JSON.parse(response.body.state)[0])
					this.$router.push({path : '/doctor/sigingOK'});	
					
				})	
				
				
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
			
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){
					//标题顶部没有下载
					this.activeSingTop = 0.84+'rem';
					this.activeiframeTop = 0.84+"rem";
				}else {
					//标题顶部有下载
					this.activeSingTop =0.84+'rem';
					this.activeiframeTop = 1.84+"rem";
				}
			this.init();
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeiframeTop = 0.84+"rem";
				}
			}
		}
		
	}
</script>

<style>
	#doctor{
		height: 100%;
	}
	.signing-page{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.signing-page-iframe{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.signing-page-iframe iframe{
		width: 100%;
		height: 100%;
		border: 0 none;
	}
	/*header*/
	#heads{
		height: 0rem !important;
		background: #009983;
		border-bottom: 1px solid #eee !important;
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