<template>
	<div id="service_sign_mask" @touchmove.prevent>
		<div class="sign_wrap">
			<h2>该服务需要您先签约家庭医生</h2>
			<div class="choose_tip">
				<div class="choose_btn" v-on:click="giveUpSign">取消</div>
				<div class="choose_btn" v-on:click="startSign">下载</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'service_mask',
		data() {
			return {
				isSign: false,
			}
		},
		methods: {
			startSign() {
				this.isSign = true;
				this.$emit('sign-event',this.isSign);
				console.log("跳转链接");
				location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app';
			},
			giveUpSign() {
				this.isSign = false;
				this.$emit('sign-event',this.isSign);
			}
		}
	}
</script>
<style scoped>
	#service_sign_mask{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: rgba(0,0,0,0.3);
	}
	.sign_wrap{
		width: 6rem;
		background: #fff;
		margin: 0 auto;
		position: relative;
		top: 35%;
		border-radius: 12px;
	}
	.sign_wrap h2{
		width: 100%;
		height: 1.6rem;
		text-align: center;
		line-height: 1.6rem;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 0.01rem solid #f2f2f2;
	}
	.sign_wrap .choose_tip{
		display: flex;
		height: 1rem;
	}
	.choose_btn{
		line-height: 1rem;
		flex: 1;
		font-size: 0.26rem;
		text-align: center;
	}
	.choose_btn:first-child{
		border-right: 0.01rem solid #f2f2f2;
	}
</style>