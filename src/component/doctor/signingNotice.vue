<template>
	<div style="height: 100%; overflow: hidden;">
		<heads :title="title"></heads>
		<div style="height: 0.84rem;"></div>
			<div class="noticeContent" style="height: 94%; ">
	
				<p class="stepsExplain">
					1、在手机端签约时请使用您的真实姓名、身份证号、手机号，避免因不实信息造成签约失败。
				</p>
				
				
				
				<p class="stepsExplain">
				2、在部分地区，手机端签约申请仅作为方便居民申请签约的渠道之一，不能代替申请人到医院进行纸质签约。
				</p>
					
				
				<p class="stepsExplain">
					3、如所在社区医院需要居民线下签约，请在规定时间内到所在医院完成签约手续，才能正式成为该医院、医生签约关注的对象。
				</p>
				
				
				<p class="stepsExplain">
					4、在您签字完成并提交申请后，须家庭医生审核及签字确认。
				</p>
				
			</div>
	</div>
		
</template>

<script>
	import heads from "../common/head.vue"
	export default {
		data(){
			return {
				title: '签约须知'
			}
		},
		components:{
			heads
		}
	}
</script>

<style>
	.noticeTitle{
	position: fixed;
	top: 0;
	width: 100%;
	height: 0.85rem;
	background: #217fc4;
	padding:  0 0.3rem;
	clear: both;
	display: none;
}

.needP{
	font-size: 0.36rem;
	font-family: "PingFangSC";
	text-align: center;
	line-height: 0.85rem;
	color: #ffffff;
	float: left;
	margin-left: 2.56rem;
	
}
.y-noticeGoBack{
	width: 0.2rem;
	display: block;
	float: left;
	margin-top: 0.25rem;
}

.noticeContent{
	width: 100%;
	background: url(../../assets/image/doctor/bgiMG.png) no-repeat;
	background-size:100% 100%;
	overflow: hidden;
	/*margin-top: 0.85rem;*/
	padding: 0 0.2rem;
	height: 100%;
}

.noticeTit{
	font-size: 0.4rem;
	font-family: "PingFangSC";
	text-align: center;
	color: #333333;
	margin-top: 0.4rem;
	font-weight: bold;
}
.chinaHeal{
	font-size: 0.24rem;
	font-family: "PingFangSC";
	text-align: center;
	color: #999999;
	margin-top: 0.28rem;
}

.downLoadLink{
	
	color:#217fc4;
	
}
.welcomeAndSteps{
	font-size: 0.3rem;
	font-family: "PingFangSC";
	text-align: left;
	color: #333333;
	margin-top: 0.56rem;
}

.noticeFirst, .noticeSecond, .noticeThird{
	width: 100%;
	height: 0.8rem;
	margin-top: 0.6rem;
}
.stepsExplain{
	font-size: 0.3rem;
	font-family: "PingFangSC";
	text-align: left;
	color: #333333;
	margin-top: 0.2rem;
}

.noticeFirst img,.noticeSecond img, .noticeThird img {
	width: 100%;
}

.turnNext{
	width: 0.64rem;
	height: 0.64rem;
	margin: 0 auto;
	margin-top: 1rem;
}

.turnNext img{
width: 100%;	
}

.succeedDredge{
	font-size: 0.36rem;
	font-family: "PingFangSC";
	text-align: center;
	color: #14b464;
	margin-top: 0.4rem;
	font-weight: bold;
}
.beginServe{
	font-size: 0.36rem;
	font-family: "PingFangSC";
	text-align: center;
	color: #14b464;
	margin-top: 0.26rem;
	font-weight: bold;
}
.introduceUs{
	font-size: 0.26rem;
	font-family: "PingFangSC";
	text-align: left;
	color: #999999;
	margin-top: 1rem;
}
.noticeContUs{
	width: 4.25rem;
	margin: 0 auto;
	margin-top: 1rem;
	text-align: center;
	padding-bottom: 1rem;
}

.contactUS{
	font-size: 0.26rem;
	font-family: "PingFangSC";
	text-align: center;
	color: #333333;
	margin-top: 0.24rem;
	
	
	
}



</style>