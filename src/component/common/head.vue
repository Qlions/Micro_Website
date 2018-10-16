<template>
	<div class="header_content">	
		<!-- <div class="if_jupage" v-if="!eaId">
			<div class="head_null" style="width:100%;height:2rem;" ref="head_null"></div>
			<div class="head_content_box">
				<div class="content_51_div" v-if="isHead">
					<div class="content_51_div-left">
						<div class="content_51_div_x" @click="head_x">
							<img src="../../assets/image/content_51_div_x.png" alt="">
						</div>
						<div class="content_51_div_box">
							<div class="content_51_div_box_logo">
								<img src="../../assets/image/content_51_div_logo.png" alt="">
							</div>
							<div class="content_51_div_box_txt">
								<p>使用中国健康云App有优惠</p>
							</div>
						</div>
					</div>
					<div class="content_51_div_btn">
						<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app">下载</a>
					</div>
				</div>
				<header>
					<b :class='{active}' @click="backBtn">
						<img src="../../assets/image/head-back.png" alt="返回图标">
					</b>
					<h2 v-text="title"></h2>
					<slot></slot>
				</header>
			</div>
		</div>
		<div v-else>
			<div class="head_null" style="width:100%;height:.84rem;" ref="head_null"></div>
			<div class="head_content_box">
				<header>
					<b :class='{active}' @click="backBtn">
						<img src="../../assets/image/head-back.png" alt="返回图标">
					</b>
					<h2 v-text="title"></h2>
					<slot></slot>
				</header>
			</div>
		</div> -->
		<div class="head_content_box">
			<header>
				<b :class='{active}' @click="backBtn">
					<img src="../../assets/image/head-back.png" alt="返回图标">
				</b>
				<h2 v-text="title"></h2>
				<slot></slot>
			</header>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			title:String
		},
		data () {
			return {
				active:"",
			}
		},
		methods:{
			backBtn: function(){
				active:true;
				var obj=JSON.parse(localStorage.getItem("temp"));
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(obj){
					if(obj.flag ==3){
						this.$router.push({"path":'/home/main'});
					}else{
						this.$router.go(-1);
					}
				}else{
					this.$router.go(-1);
				}
			},
		}
	}
</script>
<style>
	.head_content_box {
		width: 100%;
		position: fixed;
		top: 0;	
		z-index: 9;
	}
	header {
		position: absolute;
		z-index: 3;
		width: 100%;
		height: .84rem;
		background-color: #009983;
	}
	header b {
		text-align: center;
		width: 0.8rem;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0;
	}
	header img {
		width: 60%;
		margin-top: 24%;
	}
	header h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	.white{
		background: #fff;
		border-bottom: 1px solid #e6e6e6;
	}
	.white h2{
		color: #009983;
	}
	.leftTitle h2{
		text-align: left;
		padding-left: 0.8rem;
	}
	.noBack b{
		width: 0;
	}
</style>