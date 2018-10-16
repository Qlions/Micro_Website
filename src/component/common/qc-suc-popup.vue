<template>
	<div class="mask-all">
		<div class="popup">
			<i></i>
			<p>{{ sucMessage }}</p>	
		</div>
	</div>
</template>
<script>
	export default {
		props:['sucMessage']
	}
</script>
<style scoped>
	.mask-all{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0,0,0,0.1);
	}
	.popup {
		width: 90%;
		margin: 0 5%;
		height: 3.25rem;
		position: fixed;
		top: 50%;
		left: 0;
		margin-top: -1.625rem;
		background: #000;
		border-radius: 0.25rem;
		-moz-border-radius: 10px;
		-webkit-border-radius: 10px;
		filter: alpha(opacity=65);
		-moz-opacity: 0.65;
		-khtml-opacity: 0.65;
		opacity: 0.65;
		text-align: center;
		z-index: 999;
	}
	.popup i {
		display: block;
		width: 1.0rem;
		height: 1.0rem;
		background: url(../../assets/image/zErr_icon.png) no-repeat center -1rem;
		background-size: 1.0rem;
		margin: 0.75rem auto 0;
		z-index: 1999;
	}
	.popup p {
		color: #fff;
		font-size: 14px;
		line-height: 1.25rem;
	}
</style>