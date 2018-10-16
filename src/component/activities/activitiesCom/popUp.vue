<template>
	<div class="mask">
		<p>{{ sucMessage }}</p>	
	</div>
</template>
<script>
	export default {
		props:['sucMessage']
	}
</script>
<style scoped>
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 2;
		
	}
	.mask p{
		width: 85%;
		height: 1.5rem;
		background: rgba(0,0,0,0.7);
		position: fixed;
		top: 40%;
		left: 7.5%;
		border-radius: 0.2rem;
		-webkit-border-radius: 0.2rem;
		text-align: center;
		line-height: 1.5rem;
		font-size: 0.36rem;
		color: #fff;
		font-family: "微软雅黑";
	}
</style>