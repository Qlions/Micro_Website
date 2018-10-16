<template>
	<div id="server-pay-fail">
		<header>
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<h2>{{ titleName}}</h2>
		</header>
		<div class="payPage_ly">
			<div class="payImg_ly">
				<img src="../../assets/image/server/failImg.png"/>
			</div>
			<p class="payFail_ly">支付失败</p>
			
			<div class="rePay_ly" id="rePayH" @click="checkOrder">
				<span>查看订单</span>
			</div>
		</div>	
	</div>
	
</template>
<script>
	export default {
		data(){
			return {
				titleName: "支付失败",
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
				if(!this.type){
					this.$router.push({path:"/server/main"});	
				}else {
					let eaId = window.sessionStorage.getItem("server_relationEaId");
					location.href = mechanismUrl()[0] + "ogDetail?eaId=" + eaId;
				}
			}
		}
	}
</script>
<style>
#server-pay-fail header{
	position:fixed;
	top: 0;
	z-index: 2;
	width: 100%;
	height: 0.84rem;
	background-color: #009983;
}
#server-pay-fail header b{
	text-align: center;
	width: 0.8rem;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0;
}
#server-pay-fail header img{
	width: 60%;
	margin-top: 15%;
}
#server-pay-fail header h2{
	float: left;
	text-align: center;
	width: 100%;
	margin: 0 auto;
	line-height: 0.84rem;
	font-size: 18px;
	color: #fff;
}
.payPage_ly{
	width: 100%;	
	overflow: hidden;
}

.payImg_ly{
	width: 1.5rem;
	margin: 2.5rem auto;
	margin-bottom: 0;
	
}

.payImg_ly img{
	width: 100%;
}

.payFail_ly{
	font-size: 0.36rem;
	font-family: "PingFangSC";
	margin-top: 0.32rem;
	text-align: center;
}

.rePay_ly{
	width: 6.9rem;s
	height: 0.8rem;
	margin: 0.62rem auto;
	background: #009983;
	text-align: center;
	border-radius:6px;
	margin-bottom: 0;
}

.rePay_ly span{
	font-family:"PingFangSC";
	font-size: 0.36rem;
	line-height: 0.8rem;	
	color: #ffffff;
	
}

.checkOrder{
	text-align: center;	
	font-family:"PingFangSC";
	font-size: 0.24rem;	
	color: #a9a9a9;
	margin-top: 0.3rem;
}

</style>