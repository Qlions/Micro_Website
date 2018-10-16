<template>
	<div class="team-sign-mask" @touchmove.prevent>
		<div class="team-sign-wrap">
			<h2>很抱歉,您未与当前专家所在团队签约,暂无法购买该服务</h2>
			<div class="choose_ok" v-on:click="teamSign">好的</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {
				isTeam: false
			}
		},
		methods: {
			teamSign() {
				console.log(this.isTeam);
				this.$emit('team-event',this.isTeam);
			}
		}
	}
</script>
<style scoped>
	.team-sign-mask{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: rgba(0,0,0,0.3);
	}
	.team-sign-wrap{
		width: 6rem;
		background: #fff;
		margin: 0 auto;
		position: relative;
		top: 35%;
		border-radius: 12px;
	}
	.team-sign-wrap h2{
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
	.team-sign-wrap .choose_ok{
		height: 1rem;
		width: 100%;
		text-align: center;
		line-height: 1rem;
		font-size: 0.26rem;
	}
</style>