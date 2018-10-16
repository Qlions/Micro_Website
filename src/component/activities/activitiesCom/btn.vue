<template>
	<div class="downLoadBtn">
			<a :href="Ahref">{{ Atext }}</a>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				
			}
		},
		props:{
				Ahref: String,
				Atext: String
			}
	}
</script>

<style>
	.downLoadBtn {
		width: 72%;
		text-align: center;
		background: #f93946;
		color: #fff;
		line-height: 0.8rem;
		border-radius: 0.8rem;
		margin:  0.2rem auto 0 auto;
		font-size: 0.36rem;
		
		
	}
	.downLoadBtn a{
		display: inline-block;
		color: #FFF;
		width: 100%;
		height: 100%;
	}
</style>