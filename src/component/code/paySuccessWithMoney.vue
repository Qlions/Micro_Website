<template>
	<div style="height: 100%;">
		<heads :title="title" id="heads"></heads>
		<div class="paySucImg">
			<img  class="payRightImg" src="../../assets/image/my/choice.png"/>
			<p class="paySuccP">支付成功</p>
			<p class="ourName">中国健康云</p>
			<p class="goodsPriceP">￥<span class="goodsPrice">{{goodsPrice}}</span></p>
			<div class="havdSucc">
				<p>完成</p>
			</div>
		</div>	
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	export default {
		data(){
			return {
				title: "支付成功",
				goodsPrice:"3.00"
			
				
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
	.paySucImg{
		margin-top: 0.84rem;
		overflow: hidden;
	}
	.payRightImg{
		width: 1rem;
		height: 1rem;
		display: block;
		margin: 0 auto;
		margin-top: 1rem;
	}
	.paySuccP{
		text-align: center;
		margin-top: 0.2rem;
		color: #009983;
		font-size: 0.4rem;
	}
	.ourName{
		text-align: center;
		margin-top: 0.8rem;
		font-size: 0.34rem;
	}
	.goodsPriceP{
		text-align: center;
		font-size: 0.4rem;
		margin-top: 0.2rem;
	
	}
	.goodsPrice{
		font-size: 0.64rem;
		margin-top: 0.3rem;
		font-family: "microsoft yahei";
	}
	.havdSucc{
		width: 3.4rem;
		height: 0.7rem;
		border: 1px solid #009983;
		margin: 0 auto;
		margin-top: 2rem;
		border-radius: 2px;
	}
	.havdSucc p{
		text-align: center;
		line-height: 0.7rem;
		color: #009983;
		font-size: 0.3rem;
	}
	
</style>
