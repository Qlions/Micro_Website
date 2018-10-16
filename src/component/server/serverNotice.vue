<template>
	<div id="server-notice">
		<Heads :title="titleName"></Heads>
		<div class="freeContent">
			<img src="../../assets/image/server/1.png" alt="" />
			<img src="../../assets/image/server/2.png" alt="" />
			<img src="../../assets/image/server/3.png" alt="" />
			<img src="../../assets/image/server/4.png" alt="" />
			<img src="../../assets/image/server/5.png" alt="" />
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: "购买须知与保障"
			}
		},
		components:{
			Heads
		}
	}
</script>
<style>
	#server-notice{
		width: 100%;
		height: 100%;
		/*padding-top: 0.84rem;*/
	}
	#server-notice .freeContent{
		width: 100%;
		height: 100%;
		/*overflow-y: auto;*/
	}
	#server-notice .freeContent img{
		width: 100%;
		
	}
</style>