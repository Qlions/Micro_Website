<template>
	<div style="height: 100%;background: rgb(248,248,248);">
		<heads :title="title" id="heads"></heads>
		<div class="paySucMod"><!--支付成功头部-->
			<img src="../../assets/image/my/choice.png"/>
			<p>支付成功</p>
		</div>
		<div class="orderConts"><!--订单以及金额-->
			<p class="oderP">订单金额</p>
			<p class="orderMoney">￥<span>{{payMoneyNum}}</span></p>
		</div>
		<div class="merchInform"><!--订单信息-->
			<div class="merchImg">
				<img src="../../assets/image/add_meal0.png"/><!--商品图片-->
			</div>
			<p class="mechName">{{mechName}}</p><!--商品名称-->
			<div class="paySuccessTurn">
				<img class="turnNeImg" src="../../assets/image/right.png"/>
				<img class="ellipImg" src="../../assets/image/more.png"/>
			</div>
		</div>
		
		<img class="merchCodeImg" src="../../assets/image/add_meal4.png"/>
		<p class="instrP">长按图片，关注公众号，不扫码也可以下单哦~</p>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	export default {
		data(){
			return {
				title: "支付成功",
				payMoneyNum:"1.5",
				mechName:"双汇王中王优级火腿肠38g"
				
			}
		},
		components:{
			heads
		},
		methods: {
			
			
		},
		
		mounted(){
		}
	}
	

</script>

<style>
	#heads span {
		color:  #fff;
		position: absolute;
		top: 0;
		z-index: 88;
		right:0.25rem ;
		line-height: 0.84rem;
		font-size: 0.28rem;
		width: 0.8rem;
		text-align: center;
	}
	.paySucMod{
		width: 100%;
		height: 2.6rem;
		margin-top: 0.84rem;
		background: #fff;
		overflow: hidden;
	}
	.paySucMod img{
		display: block;
		width: 1rem;
		height: 1rem;
		margin: 0 auto;
		margin-top: 0.3rem;
	}
	.paySucMod p{
		margin-top: 0.1rem;
		font-size: 0.5rem;
		text-align: center;
	}
	.orderConts{
		width: 100%;
		height: 0.6rem;
		clear: both;
		background: #fff;
		margin-top: 0.16rem;
	}
	.oderP{
		line-height: 0.6rem;
		font-size: 0.3rem;
		float: left;
		margin-left: 0.5rem;
		color: rgb(146,146,146);
	}
	.orderMoney{
		line-height: 0.6rem;
		font-size: 0.3rem;
		float: right;
		margin-right: 0.5rem;
		color: rgb(146,146,146);
	}
	.merchInform{
		width: 100%;
		height: 1.2rem;
		background: #fff;
		margin-top: 0.1rem;
		overflow: hidden;
	}
	.merchImg{
		width: 0.8rem;
		height: 0.8rem;
		margin-left: 0.5rem;
		margin-top: 0.2rem;
		float: left;
	}
	.merchImg img{
		width: 100%;
		height: 100%;
	}
	.mechName{
		float: left;
	    width: 3.6rem;
	    line-height: 1.2rem;
	    margin-left: 0.4rem;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    font-size: 0.3rem;
	}
  	.paySuccessTurn{
  		width:1.8rem;
  		float: right;
  		height: 1.2rem;
  		margin-right: 0.3rem;
  	} 
  	.ellipImg{
  		width: 0.6rem;
  		float: right;
  		margin-top: 0.3rem;
  	}
  	.turnNeImg{
  		width: 0.3rem;
  		height: 0.5rem;
  		margin-top: 0.34rem;
  		margin-left: 0.2rem;
  		float: right;
  	}
  	.merchCodeImg{
  		width: 2.5rem;
  		height: 2.5rem;
  		margin: 0 auto;
  		margin-top: 1rem;
  		display: block;
  	}
  	.instrP{
  		text-align: center;
  		margin-top: 0.7rem;
  		font-size: 0.3rem;
  	}
</style>
