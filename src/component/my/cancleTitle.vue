<template>
	<section id="cancleTitle">
		<Heads :title="titleName"></Heads>
		<div class="CT-container">
			<img src="../../assets/image/my/1.png" />
			<img src="../../assets/image/my/2.png" />
			<img src="../../assets/image/my/3.png" />
			<img src="../../assets/image/my/4.png" />
		</div>
	</section>
</template>

<script>
	import Heads from '../common/head.vue'
	export default {
		data () {
			return {
				titleName:"取消须知",
			}
		},
		components:{
			Heads
		}
	}
</script>

<style>
	#cancleTitle{
		padding-top: 0.84rem;
	}
	.CT-container img{
		width: 100%;
	}
</style>