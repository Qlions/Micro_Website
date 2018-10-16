<template>
<section id="myWallet">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<div class="MW-container">
		<ul class="wallet-list">
			<router-link :to="'/my/walletRest/' + myMoney" class="lis gotoImg">
				<span class="Myicon1"></span>红包余额<em><i>{{this.myMoney}}</i>元</em>
			</router-link>
			<li to="/my/myConsult" class="lis"><span class="Myicon2"></span>健康豆<em><i>{{beansNum}}</i>粒</em></li>
		</ul>
		
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				isLoading:true,
				myMoney:"",
				beansNum:"0",
				titleName:"钱包",
				nohead:"nohead"
			}
		},
		computed:{

		},
		components:{
			Heads,
			Loading
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			initMoneyNum(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					userId: userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771010, jsonValue:data},{emulateJSON:true}).then( response => {
					this.myMoney = response.body.totalMoney;
					this.loadingClose()
				})
			},
			initBeansNum(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					page:1,
					rows:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111117, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.rows.length!=0){
						this.beansNum = response.body.rows[0].userBeans;
					}else{
						this.beansNum = 0
					}
					
				})
			}
		},
		mounted:function(){
			this.initMoneyNum()
			this.initBeansNum()
		}
	}
</script>

<style scoped>
#myWallet{
	position: absolute;
	background: #f2f2f2;
	width: 100%;
	height: 100%;
	padding-top: .84rem;
}
.wallet-list{
	width: 100%;
}
.wallet-list .lis{
	display: block;
}
.wallet-list .lis{
	margin-top: 0.3rem;
	padding: 0 0.2rem 0 1rem;
	position: relative;
	color: #999;
	height: 1rem;
	line-height: 1rem;
	background-color: #fff;
}
.Myicon1,.Myicon2{
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	position: absolute;
	left: 0.3rem;
	top: 0.3rem;
	background-position: 0 0 !important;
}
.Myicon1{
	background: url(../../assets/image/my/red_balance.png) no-repeat right top;
	background-size: 0.35rem 0.4rem;
}
.Myicon2{
	background: url(../../assets/image/my/health_wbeans.png) no-repeat;
	background-size: 0.4rem 0.4rem;
}
.wallet-list .lis em{
	float: right;
	padding-right: 0.5rem;
}
.wallet-list .lis em i{
	color: #666;
	padding: 0 0.1rem;
}
.gotoImg{
	background: url(../../assets/image/head-back-right.png) no-repeat center right ;
	background-size: 0.5rem;
}
.loadTop {
	background: #fff !important;
	z-index: 2;
}
</style>