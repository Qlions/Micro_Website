<template>
	<section id="checkedName">
		<Heads :title="titleName"></Heads>
		<div class="CedN-container">
			<div class="imgBox">
				<img src="../../assets/image/my/choice.png" />
			</div>
			<p class="checkedNameTxt">您已通过实名认证</p>
			<p class="checkedNameMain checkedNameMain1">
				<span class="checkedNameL">姓名</span>
				<i class="checkedNameR">{{name}}</i>
			</p>
			<p class="checkedNameMain">
				<span class="checkedNameL">身份证</span>
				<i class="checkedNameR">{{cerNo}}</i>
			</p>
		</div>
	</section>
</template>

<script>
	import Heads from '../common/head.vue'
	export default {
		data () {
			return {
				item:{},
				name:"",
				cerNo:"",
				titleName:"实名认证"
			}
		},
		components:{Heads},
		mounted(){
			this.item = JSON.parse(this.$route.query.item);
			this.name = this.item.name;
			this.cerNo = this.item.iscertNo;
			console.log(this.item)
		}
	}
</script>

<style>
	#checkedName{
		height: 100%;
	}
	.CedN-container{
		padding: 0 0.3rem;
	}
	.CedN-container .imgBox{
		margin-top: 1.2rem;
		width: 100%;
		height: 1rem;
	}
	.CedN-container .imgBox img{
		margin: 0 auto;
		width: 1rem;
		height: 1rem;
		display: block;
	}
	.checkedNameTxt{
		width: 100%;
		font-size: 0.3rem;
		text-align: center;
		line-height: 1rem;
	}
	.checkedNameMain{
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.28rem;
		color: #666;
	}
	.checkedNameMain1{
		border-bottom:1px solid #f0f0f0 ;
	}
	.checkedNameL{
		float: left;
	}
	.checkedNameR{
		float: right;
		color: #999;
	}
</style>