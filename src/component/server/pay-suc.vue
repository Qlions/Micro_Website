-<template>
	<div id="server-pay-suc">
		<header>
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<h2>{{ titleName}}</h2>
		</header>
		<div class="paySuccessPage_ly">
			<div class="successImg_ly">
				<img src="../../assets/image/server/paySucc.png"/>
			</div>
			<p class="successText_ly">您的订单支付成功</p>
			<p class="payMoney_ly">支付金额:&nbsp;<em class="money_ly">{{ money }}</em>元</p>
			<div class="choose_ly">
				<div class="checkOrders_ly" id="checkOrders" @click="checkOrder">
					<span>查看订单</span>
				</div>
				<div class="goBack_ly" id="goBack" @click="backToIndex">
					<span>返回首页</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				titleName: "支付成功",
				money:this.$route.query.money,
				type:this.$route.query.type
			}
		},
		components:{
			
		},
		methods:{
			checkOrder(){
				console.log("查看订单");
				if(!this.type){//回到微网站订单
					this.$router.push({path:"/my/myOrders"});
				}else {//回到机构订单
					location.href = mechanismUrl()[1];
				}
			},
			backToIndex(){
				console.log("回到首页")
				if(!this.type){
					this.$router.push({path:"/server/main"});	
				}else {
					let eaId = window.sessionStorage.getItem("server_relationEaId");
					location.href = mechanismUrl() + "ogDetail?eaId=" + eaId;
				}
			}
		}
	}
</script>
<style>
#server-pay-suc{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#server-pay-suc header{
	position:fixed;
	top: 0;
	z-index: 2;
	width: 100%;
	height: 0.84rem;
	background-color: #009983;
}
#server-pay-suc header b{
	text-align: center;
	width: 0.8rem;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0;
}
#server-pay-suc header img{
	width: 60%;
	margin-top: 15%;
}
#server-pay-suc header h2{
	float: left;
	text-align: center;
	width: 100%;
	margin: 0 auto;
	line-height: 0.84rem;
	font-size: 18px;
	color: #fff;
}
.paySuccessPage_ly{
	width: 100%;
	height: 100%;
}
.successImg_ly{
	width: 0.92rem;
	margin: 2rem auto;
	margin-bottom: 0;
}

.successImg_ly img{
	width: 100%;
}

.successText_ly{	
	font-family:"PingFangSC";
	font-size: 0.36rem;	
	color: #333333;
	margin-top: 0.3rem;
	text-align: center;
}

.payMoney_ly{	
	font-family:"PingFangSC";
	font-size: 0.24rem;	
	color: #333333;
	margin-top: 0.25rem;
	text-align: center;	
}

.money_ly{
	font-family:"PingFangSC";
	font-size: 0.24rem;	
	color:#ff5454;
}

.choose_ly{
	width: 85%;
	margin-left: 7.5%;
	height: 0.7rem;
	margin-top: 1rem;
	clear: both;
}

.checkOrders_ly{
	width: 2.78rem;
	height: 0.68rem;
	border: 1px solid #e6e6e6;
	float: left;
	text-align: center;
	border-radius:6px;
}
.goBack_ly{
	width: 2.78rem;
	height: 0.68rem;
	border: 1px solid #e6e6e6;
	float: right;
	text-align: center;
	border-radius: 6px;
}

.choose_ly  span{
	font-family:"PingFangSC";
	font-size: 0.24rem;	
	color: #333333;
	line-height: 0.68rem;
}
</style>