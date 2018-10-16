<template>
<section id="myWallet">
	<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
	<Loading v-if="isLoading"></Loading>
	<div class="MW-container">
		<div class="walletPic">
			<img src="../../assets/image/my/red_balan.png"/>
		</div>
		<p class="p1">红包余额</p>
		<p class="p2">￥<i>{{myMoney}}</i></p>
		<p class="p3">领取红包金额+鼓励金额=红包余额</p>
		<p class="p3">超过 10 元可提现到微信零钱、支付宝余额</p>
		<div class="record-data-form-btn" @click="postMoney(myMoney)">
			<a href="javascript:void(0);">转出</a>
		</div>
		<router-link to="/my/walletDetail" class="p4" :style="{ top:activeTop }">红包明细</router-link>
	</div>
	<errorPopup v-if="errShow" :message="message"></errorPopup>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				isLoading:false,
				titleName:"红包余额",
				message:"",
				errShow:false,
				myMoney:this.$route.params.myMoney,
				hasError:"",
				activeTop:""//iscroll
			}
		},
		computed:{
			
		},
		components:{
			Heads,
			Loading,
			errorPopup
		},
		methods: {
			initMoneyNum(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					userId: userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771010, jsonValue:data},{emulateJSON:true}).then( response => {
					
					this.myMoney = response.body.totalMoney;
				})
			},
			//错误提示框
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}
                },1500);  
			},
			postMoney(myMoney){
				if(this.myMoney<10){
					this.errShow = true;
					this.message = "红包余额不足10元";
					sessionStorage.setItem("myMoney", this.myMoney);//测试用，一会删
					this.clearStorage()
				}else{
					sessionStorage.setItem("myMoney", this.myMoney);
					this.$router.push({ name: 'walletOut' }) 
				}
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
		},
		mounted:function(){
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = .0+'rem';
			}else {
				this.activeTop = 1.16+'rem'
			}
			this.initMoneyNum()
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeTop = .0+'rem';
				}
			}
		}
	}
</script>

<style scoped>
#myWallet{
	position: absolute;
	background: #f2f2f2;
	width: 100%;
	height: 100%;
	padding-top: 50px;
}
.MW-container{
	padding-top: 0.8rem;
}
.walletPic{
	margin: 0 auto;
	height: 1.5rem;
	width: 1.5rem;
	border: 1px solid #E6E6E6;
	border-radius: 50%;
	overflow: hidden;
}
.walletPic img{
	width: 100%;
	height: 100%;
}
.p1{
	font-size: 0.2rem;
	line-height: 0.2rem;
	height: 0.2rem;
	color: #222;
	text-align: center;
	margin-top: 0.4rem;
}
.p2{
	font-size: 0.4rem;
	line-height: 0.4rem;
	height: 0.4rem;
	color: #000;
	text-align: center;
	margin-top: 0.4rem ;
}
.p3{
	font-size: 0.2rem;
	line-height: 0.2rem;
	height: 0.2rem;
	color: #999;
	text-align: center;
	margin-top: 0.4rem ;
}
.p4{
	position: absolute;
	top:0;
	right: 0.3rem;
	color: #fff;
	font-size: 0.2rem;
	height: 0.84rem;
	line-height: 0.84rem;
	z-index: 10;
}
.record-data-form-btn a {
	display: block;
	width: 90%;
	height: 0.8rem;
	margin: 0.8rem auto;
	text-align: center;	
	line-height: 0.8rem;
	background: #009983;
	color: #fff;
	border-radius: 0.125rem;
	-moz-border-radius: 0.125rem;
	-webkit-border-radius: 0.125rem;
	font-size: 16px;
}
</style>