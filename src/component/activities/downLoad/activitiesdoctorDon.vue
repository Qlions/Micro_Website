<template>
	<div class="downloadDiv">
		<div class="logoDown">
			<img src="../../../assets/image/activities/logoyun.png" />
		</div>
		<div class="wordDivCH">
			<p>中国健康云 &nbsp;医生端</p>
			<p>永久贴身守护您的健康</p>
		</div>
		<btn :Ahref= "Ahref" :Atext="Atext"></btn>
		<p class="downSign">Copyright © 2018 中国健康云 All Rights Reserved.</p>
	</div>
</template>

<script>
	import Btn from "../activitiesCom/btn.vue"
	export default {
		data (){
			return {
				Ahref: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.zgjky.app.doctor',
				Atext: '下载应用'
			}
		},
		components:{
			Btn
		}
			
			
	}
</script>

<style>
	#activities{
		height: 100%;
	}
	.downloadDiv{
		width: 100%;
		height: 100%;
		background: url(../../../assets/image/activities/bg.png) no-repeat;
		background-size: cover;
		margin:  0 auto;
		padding: 1px;
	}
	.logoDown{
		width: 2rem;
		height: 2rem;
		margin: 45% auto 0 auto;
		
	}
	.logoDown img{
		width: 100%;
		height: 100%;
	}
	.wordDivCH{
		text-align: center;
		color: #565660;
		font-size: 0.3rem;
	}
	.wordDivCH p{
		line-height: 0.6rem;
	}
	.wordDivCH p:last-of-type{
		color: #999;
		font-size: 0.28rem;
	}
	.downLoadBtn {
		width: 60%;
		text-align: center;
		background: #f93946;
		color: #fff;
		line-height: 0.8rem;
		border-radius: 0.8rem;
		margin:  0.2rem auto 0 auto;
		font-size: 0.36rem;
		
		
	}
	.downLoadBtn a{
		display: inline-block;
		color: #FFF;
		width: 100%;
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
</style>