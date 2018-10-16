<template>
	<div class="min-popup">
		<p>{{ message }}</p>
	</div>
</template>
<script>
	export default {
		props:['message'],
	}
</script>
<style>
	.min-popup p {
		position: fixed;
		bottom: 1rem;
		width: 2.5rem;
		height: .8rem;
		background: rgba(0, 0, 0, 0.63);
		text-align: center;
		line-height: .8rem;
		color: #fff;
		border-radius: .1rem;
		left: 50%;
		margin-left: -1.25rem;
		z-index: 99999;
	}
</style>