<template>
	<section>
		<Heads :title="title"></Heads>
		<iframe :src="file_url" width="100%" height="1000" border="0"></iframe>
		<!--<h2 class="titleLife">生活方式</h2>
		<hr class="hr-moreT"/>
		<div class="hr-more">您的主要生活方式评估结果</div>
		<div class="dietList">-->
			
		
			<!--<div class="dietLisImg">
				<span class="spanImg">
					<img src="../../assets/image/diet_img3.png" />
					<img src="../../assets/image/diet_img2.png" />
					<img src="../../assets/image/diet_img1.png" />
				</span>
				<span class="dietText1">
					饮食差
				</span>
				<span class="spanImg">
					<img src="../../assets/image/movement_img1.png" />
					<img src="../../assets/image/movement_img2.png" />
					<img src="../../assets/image/movement_img3.png" />
				</span>
				<span class="dietText2">
					运动充分
				</span>
			</div>
			<div class="dietLisImg">
				<span class="spanImg">
					<img src="../../assets/image/smoking_img1.png" />
					<img src="../../assets/image/smoking_img2.png" />
					<img src="../../assets/image/smoking_img3.png" />
				</span>
				<span class="dietText2">
					不吸烟
				</span>
				<span class="spanImg">
					<img src="../../assets/image/wine_img1.png" />
					<img src="../../assets/image/wine_img2.png" />
					<img src="../../assets/image/wine_img3.png" />
				</span>
				<span class="dietText3">
					饮酒
				</span>
			</div>
			<div class="dietLisImg">
				<span class="spanImg">
					<img src="../../assets/image/sleep_img1.png" />
					<img src="../../assets/image/sleep_img2.png" />
					<img src="../../assets/image/sleep_img3.png" />
				</span>
				<span class="dietText1">
					睡眠中等
				</span>
				<span class="spanImg">
					<img src="../../assets/image/psychological_img1.png" />
					<img src="../../assets/image/psychological_img2.png" />
					<img src="../../assets/image/psychological_img3.png" />
				</span>
				<span class="dietText1">
					心理中等
				</span>
			</div>
		</div>
		<h2 class="titleLife">慢病风险评估</h2>
		<hr class="hr-moreT"/>
		<div class="hr-more1">您与同年龄同性别人群相比的患病风险评估结果</div>
		<div class="dietList">
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_red">
						5年内患糖尿病：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_yello">
						10年内患缺血性心血管疾病：中风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_red">
						代谢综合征：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_green">
						4年内高血压发生风险：极低风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople">
						肥胖症：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_blue">
						尼古丁依赖成瘾：轻度依赖
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_red">
						血脂异常：已患
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_red">
						10年内主要骨质疏松性骨折：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_yello">
						乳腺增生：中风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_red">
						5年内患肺癌：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople">
						肝癌：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople_green">
						鼻咽癌：极低风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople">
						大肠癌：高风险
					</span>
				</div>
				<div class="peopleLisImg">
					<span class="spanImgPeople">
						<img src="../../assets/image/people1.png" />
						<img src="../../assets/image/people2.png" />
						<img src="../../assets/image/people3.png" />
						<img src="../../assets/image/people4.png" />
						<img src="../../assets/image/people5.png" />
					</span>
					<span class="spanTextPeople">
						10年内患乳腺癌：高风险
					</span>
				</div>
		</div>
		<h2 class="titleLife">急需改善的危险因素</h2>
		<hr class="hr-moreT"/>
		<div class="hr-more1">您与同年龄同性别人群相比的患病风险评估结果</div>
		<div class="dietList1">
			<div class="box_die">
				<div class="numBox">
					<img src="../../assets/image/num1.png" />
				</div>
				<div class="textBox">
					控制体重
				</div>
			</div>
			<div class="zx"></div>
			<div class="box_die1">
				<div class="numBox">
					<img src="../../assets/image/num2.png" />
				</div>
				<div class="textBox">
					控制血压
				</div>
			</div>
		</div>
		<div class="dietList1">
			<div class="box_die">
				<div class="numBox">
					<img src="../../assets/image/num3.png" />
				</div>
				<div class="textBox">
					控制腰围
				</div>
			</div>
			<div class="zx"></div>
			<div class="box_die1">
				<div class="numBox">
					<img src="../../assets/image/num4.png" />
				</div>
				<div class="textBox">
					戒烟
				</div>
			</div>
		</div>
		<div class="dietList1">
			<div class="box_die">
				<div class="numBox">
					<img src="../../assets/image/num5.png" />
				</div>
				<div class="textBox">
					增加身体活动
				</div>
			</div>
			<div class="zx"></div>
			<div class="box_die1">
				<div class="numBox">
					<img src="../../assets/image/num6.png" />
				</div>
				<div class="textBox">
					改善饮食
				</div>
			</div>
		</div>
		<div class="dietList1">
			<div class="box_die">
				<div class="numBox">
					<img src="../../assets/image/num7.png" />
				</div>
				<div class="textBox">
					总胆固醇
				</div>
			</div>
			<div class="zx"></div>
			<div class="box_die1">
				<div class="numBox">
					<img src="../../assets/image/num8.png" />
				</div>
				<div class="textBox">
					甘油三酯
				</div>
			</div>
		</div>
		<div class="dietList1">
			<div class="box_die">
				<div class="numBox">
					<img src="../../assets/image/num9.png" />
				</div>
				<div class="textBox">
					高密度脂蛋白胆固醇
				</div>
			</div>
		</div>-->
		
		
		</div>
		<!--底部-->
		<div class="footers" @click="complete()">
			阅读详细报告
		</div>
	</section>
</template>

<script>
	import Heads from '../../common/head.vue'
	export default {
		data (){
			return {
				title: "健康风险评估报告摘要",
				file_url: "",
				userId:this.$route.query.userId,
				userdataId:this.$route.query.userdataId,
				questType:this.$route.query.questType,
				configUrl:"", // 配置url
				questionnairegUrl:"", // 问卷配置url
			}

		},
		components:{
			Heads
		},
		methods:{
			getNewfile(){
				let userId = this.userId;
				let userdataId = this.userdataId;
				let urls = '/website/mobile/riskResultMobile.action?';
				this.file_url = this.configUrl + urls+ "userId=" + userId + "&userdataId=" + userdataId + "&fromSourse=1&colHealth=1";
				console.log(this.file_url);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				console.log(userInfo);
				let token = userInfo.token;
				console.log(token);
				let teamListData = JSON.stringify({
					userId:'40564450268317697100001',
					userdataId:'51546785511933952100001',
					fromSourse:1,
					colHealth: 1,
				});
//					debugger
//				this.$http.jsonp("https://www.zgjky.cn/website/mobile/riskResultMobile.action", {token: token, teamListData}, { emulateJSON: true })
//
//				.then( response => {
//					console.log(response);
//				})
			
		},
		complete() {
				let userId = this.userId;
				let userdataId = this.userdataId;
				window.location.href = ""+this.configUrl+"/website/mobile/riskResultMobile.action?userdataId="+userdataId+"&userId="+userId+"";

//				this.serverTabContent = ""+this.configUrl+"/website/mobile/riskResultMobile.action?userdataId="+userdataId+"&userId="+userId+"";
//				document.getElementById("theReport-iframe").onload = function() {
//					alert(1)
//					this.setIframeHeight(document.getElementById("theReport-iframe"))
//				}
			},
			
		},
		mounted: function (){
			
			this.configUrl = configUrl(); // 调用配置url函数
			this.getNewfile();
			this.questionnairegUrl = questionnairegUrl(); // 调用配置url函数
		}
	}

</script>

<style>
	.titleLife{
		margin-top: 1.6rem;
		font-size: 0.32rem;
		text-align: center;
		color: #333;
	}
	.hr-more{
	    height: 20px;
	    width: 170px;
	     background: #fff;
	    position: relative;
	    text-align: center;
	    left: 28%;
	    top: -10px;
	    font-size: 0.19rem;
	}
	.hr-more1{
	    height: 20px;
	    width: 270px;
	     background: #fff;
	    position: relative;
	    text-align: center;
	    left: 15%;
	    top: -10px;
	    font-size: 0.19rem;
	}
	.hr-moreT{
		margin-top: 0.25rem;
		width: 90%;
		margin-left: 5%;
		color: #cccccc;
	}
	.dietList{
		margin-top: 0.67rem;
	}
	.bottomReport{
		position: absolute;
		bottom: -80px;
		width: 100%;
		height: 1.28rem;
		background: #009983;
		color: #fff;
		font-size: 0.42rem;
		text-align: center;
		line-height: 1.28rem;
	}
	.dietLisImg{
		margin-top: 0.3rem;
	}
	.dietLisImg img{
		height: 0.48rem;
		width: auto;
		vertical-align: middle;
	}
	.peopleLisImg{
		margin-top: 0.3rem;
	}
	.peopleLisImg img{
		height: 0.56rem;
		width: auto;
		vertical-align: middle;
	}
	.spanTextPeople{
		display: inline-block;
		height: 0.56rem;
		width: 4.8rem;
		background: #ff9801;
		color: #fff;
		padding-left: 0.24rem;
		line-height: 0.56rem;
		border-radius: 10rem;
		font-size: 0.24rem;
	}
	.spanTextPeople_red{
		
		display: inline-block;
		height: 0.56rem;
		width: 4.8rem;
		background: #cc0001;
		color: #fff;
		padding-left: 0.24rem;
		line-height: 0.56rem;
		border-radius: 10rem;
		font-size: 0.24rem;
	}
	.spanTextPeople_blue{
		
		display: inline-block;
		height: 0.56rem;
		width: 4.8rem;
		background: #3399fe;
		color: #fff;
		padding-left: 0.24rem;
		line-height: 0.56rem;
		border-radius: 10rem;
		font-size: 0.24rem;
	}
	.spanTextPeople_green{
		
		display: inline-block;
		height: 0.56rem;
		width: 4.8rem;
		background: #99cc67;
		color: #fff;
		padding-left: 0.24rem;
		line-height: 0.56rem;
		border-radius: 10rem;
		font-size: 0.24rem;
	}
	.spanTextPeople_yello{
		
		display: inline-block;
		height: 0.56rem;
		width: 4.8rem;
		background: #ffcc01;
		color: #fff;
		padding-left: 0.24rem;
		line-height: 0.56rem;
		border-radius: 10rem;
		font-size: 0.24rem;
	}
	.dietText1{
		display: inline-block;
		height: 0.5rem;
		width: 1.5rem;
		background: #ff9801;
		color: #fff;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 10rem;
	}
	.dietText2{
		display: inline-block;
		height: 0.5rem;
		width: 1.5rem;
		background: #7fbf4a;
		color: #fff;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 10rem;
	}
	.dietText3{
		display: inline-block;
		height: 0.5rem;
		width: 1.5rem;
		background: #cc0001;
		color: #fff;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 10rem;
	}
	.spanImg{
		margin-left: 5%;
	}
	.spanImgPeople{
		margin-left: 5%;
		display: inline-block;
	}
	.dietList1{
		display: -webkit-box;
		-webkit-box-orient: horizontal;
	}
		.box_die{
		width: 3rem;
		height: 0.6rem;
		background: #ff9801;
		margin-left: 5%;
		line-height: 0.6rem;
		border-radius: 10rem;
		margin-top: 0.3rem;
	}
	.box_die1{
		width: 3rem;
		height: 0.6rem;
		background: #ff9801;
		margin-right: 5%;
		line-height: 0.6rem;
		border-radius: 10rem;
		margin-top: 0.3rem;
	}
		.numBox{
		position: relative;
		height: 0.5rem;
		width: 0.5rem;
		background: #fff;
		border-radius: 50%;
		left: 0.05rem;
		top: 0.05rem;
	}
	.numBox img{
		height: 0.26rem;
		width: auto;
		margin-left: 0.05rem;
		margin-top: 0.1rem;
	}
	.textBox{
		width: 1.8rem;
		height: 0.3rem;
		font-size: 0.24rem;
		color: #fff;
		position: relative;
		left: 0.65rem;
		top: -0.5rem;
	}
	.zx{
		 -webkit-box-flex: 1;
	}
	.footers{
		height: 0.84rem;
		background: #009983;
		text-align: center;
		line-height: 0.84rem;
		font-size: 0.38rem;
		color: #fff;
		/*margin-top: 0.5rem;*/
		position: fixed;
		bottom: 0;
		width: 100%;
	}

</style>