<template>
	<div class="wait-audit-mask" @touchmove.prevent>
		<div class="wait-audit-wrap">
			<h2>请耐心等待家庭医生的审核，审核后方可购买</h2>
			<div class="choose_ok" v-on:click="waitForAudit">好的</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {
				isWait: false
			}
		},
		methods: {
			waitForAudit() {
				console.log(this.isWait);
				this.$emit('wait-event',this.isWait);
			}
		}
	}
</script>
<style scoped>
	.wait-audit-mask{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: rgba(0,0,0,0.3);
	}
	.wait-audit-wrap{
		width: 6rem;
		background: #fff;
		margin: 0 auto;
		position: relative;
		top: 35%;
		border-radius: 12px;
	}
	.wait-audit-wrap h2{
		width: 100%;
		display: flex;
		padding: 0 0.2rem;
		height: 1.6rem;
		text-align: center;
		align-items: center;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 0.01rem solid #f2f2f2;
	}
	.wait-audit-wrap .choose_ok{
		height: 1rem;
		width: 100%;
		text-align: center;
		line-height: 1rem;
		font-size: 0.26rem;
	}
</style>