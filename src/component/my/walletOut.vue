<template>
<section id="myWallet">
	<Heads :title="titleName"></Heads>
	<errorPopup v-if="errShow" :message="message"></errorPopup>
	<div class="WO-container">
		<div class="walletOut-type">
			<span>余额转出到</span>
			<em @click="toWalletTo()">{{toType}}</em>
		</div>
		<div class="walletOut-cont">
			<p>转出金额</p>
			<div class="walletOut-num">
				￥<input type="number" placeholder="请输入转出金额" v-model="moneyNum"/>
			</div>
			<div class="wallet-rest">可用余额{{myMoney}}元</div>
		</div>
		<div class="record-data-form-btn" @click="postMoney()">
			<a href="javascript:void(0);">确定转出</a>
		</div>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				titleName:"红包转出",
				moneyNum:"",
				myMoney:'',
				message:"",
				errShow:false,
			}
		},
		computed:{
				toType(){
					if($.isEmptyObject(this.$route.query)){
						return '微信零钱'
					}else{
						return '支付宝余额'
					}
				}
		},
		components:{
			Heads,errorPopup
		},
		methods: {
			getMyMoney(){
				this.myMoney = sessionStorage.getItem("myMoney")
			},
			postMoney(){
				if(this.moneyNum ==''){
					this.errShow = true;
					this.message = "请输入转出金额";
					this.clearStorage()
				}else if(this.moneyNum>this.myMoney){
					this.errShow = true;
					this.message = "余额不足请重新输入";
					this.clearStorage()
				}else if(this.moneyNum<5){
					this.errShow = true;
					this.message = "提现金额要大于10元";
					this.clearStorage()
				}else{
					var myDate = new Date();
					var time = myDate.getTime();
					console.log(time)
					if($.isEmptyObject(this.$router.query)){
						var data = JSON.stringify({
							userId:'',
							totalMoney:'',
							thirdSource:'ios_1',
							routePay:'',
							account:this.$router.query.num,
							toRealName:this.$router.query.name,
							remark:'领红包-'
						});
						console.log('支付宝')
					}
				}
			},
			//错误提示框
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}
                },1500);  
			},
			toWalletTo(){
				this.$router.push({ name: 'walletTo'})
			}
		},
		mounted:function(){
			this.getMyMoney()
		}
	}
</script>

<style scoped>
#myWallet{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #F2F2F2;
}
.WO-container{
	font-size: 0.24rem;
}
.walletOut-type{
	padding: 0 0.3rem;
	background: #fff;
	height: 0.84rem;
	line-height: 0.84rem;
	margin-bottom: 0.15rem;
}
.walletOut-type span{
	display: inline-block;
	color: #333333;
	float: left;
}
.walletOut-type em{
	display: inline-block;
	color: #999;
	float: right;
	padding-right: 0.4rem;
	background: url(../../assets/image/head-back-right.png) no-repeat right center;
	background-size: 0.4rem 0.4rem;
}
.walletOut-cont{
	background: #fff;
	padding: 0 0.3rem;
	font-size: 0.2rem;
}
.walletOut-cont p{
	height: 0.8rem;
	line-height: 0.8rem;
}
.walletOut-num{
	font-size: 0.32rem;
	font-weight: 600;
	color: #ff5454;
	height: 1rem;
	line-height: 1rem;
	border-bottom: 1px solid #e6e6e6;
}
.walletOut-num input{
	border: none;
	text-indent: 0.2rem;
}
::-webkit-input-placeholder{
    color: #999;
    font-size: 0.24rem;
    font-weight: 100;
}
.wallet-rest{
	height: 1rem;
	line-height: 1rem;
	color: #999;
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