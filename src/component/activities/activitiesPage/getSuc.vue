<template>
	<div class="sucDiv">
		<i class="HahImg" v-if="imgShow == 1"></i>
		<i class="failImg" v-else-if="imgShow == 2"></i>
		<i class="repeatImg" v-else-if="imgShow == 3"></i>
		<p class="sucP">{{ getResWord }}</p>
		<p class="smallWord"> {{ smallWord }} </p>
		<span @click="goBack()" v-if="btnText == '返回首页'"><getsuc :Atext="btnText" :Ahref="Ahref1"  class="getsucBtn"></getsuc></span>
		<span v-else><getsuc :Atext="btnText" :Ahref="Ahref1"  class="getsucBtn"></getsuc></span>
		<p class="downSign">Copyright © 2016 中国健康云 All Rights Reserved.</p>
	</div>
</template>

<script>
	import getsuc from "../activitiesCom/btn.vue"
	export default {
		data (){
			return {
				btnText: "",
				Ahref1: "",
				sucType: this.$route.query.res,
				getResWord: '',
				imgShow: 0,
				smallWord: '',
				useBtn: false
			}
		},
		components:{
			getsuc
		},
		methods:{
			goBack(){
				setTimeout( () => {
					this.$router.push("./activitiesIndex")
				}, 100)
			}
		},
		mounted(){
			if(this.sucType == "suc"){
				this.getResWord = "领取成功"
				this.btnText = "使用优惠卷";
				this.imgShow = 1;
				this.useBtn = true;
				this.Ahref1 = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app";
				return false;
			}else if(this.sucType == "err-05"){
				this.getResWord = "已领取过该优惠券";
				this.btnText = "使用优惠卷";
				this.imgShow = 3;
				this.useBtn = true;
				this.Ahref1 = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app";
				return false;
			}else if(this.sucType == "getFail"){
				this.getResWord = "领取失败";
				this.btnText = "返回首页";
				this.Ahref1 = "javascript:;"
				this.imgShow = 2;
				return false;
			}
//			if(this.sucType == "notLength"){
//				this.getResWord = "优惠券数量不足";
//				this.btnText = "返回首页"
//				this.imgShow = 2
//				return false;
//			}
			else{
				this.getResWord = "系统错误";
				this.imgShow = 2;
				this.btnText = "返回首页";
				this.Ahref1 = "javascript:;"
				return false;
			}
		}
	}
</script>

<style>
	.smallWord{
		text-align: center;
		font-size: 0.22rem;
		color: #999;
	}
	#activities{
		height: 100%;
	}
	.downSign{
		position: absolute;
		bottom: 0;
		color: #999;
		font-size: 0.22rem;
		width: 100%;
		text-align: center;
	}
	.sucDiv{
		width: 100%;
		height: 100%;
		background: url(../../../assets/image/activities/bigbg3.png) no-repeat;
		background-size:cover ;
		padding: 1px;
	}
	.getsucBtn{
		border:1px solid #f93946;
		background: none !important;
		border-radius: 0.8rem;
		-webkit-border-radius: 0.8rem;
		color: #f93946;
		margin: 0.2rem auto 0 auto !important;
	}
	.getsucBtn a{
		color: #f93946 !important;
	}
	.HahImg{
		background: url(../../../assets/image/activities/Hah.png) no-repeat;
		background-size: contain;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		margin:55% auto 0 auto ;
		
	}
	.failImg{
		background: url(../../../assets/image/activities/fail.png) no-repeat;
		background-size: contain;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		margin:55% auto 0 auto ;
	}
	.repeatImg{
		background: url(../../../assets/image/activities/repeat.png) no-repeat;
		background-size: contain;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		margin:55% auto 0 auto ;
	}
	.sucP{
		font-size: 0.4rem;
		width: 100%;
		text-align: center;
		margin: 0.2rem 0 0 0;
	}
</style>