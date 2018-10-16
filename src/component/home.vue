<template>
	<section class="home">
		<router-view></router-view>
		
	</section>
</template>
<script>

	
	export default {
		name: 'app',
		data () {
		  return {
		    msg: '我的app'
		  }
		},
		mounted:function(){
			
		},
		components: {

		}
	}
</script>
<style>
	.home {
		width: 100%;
		height: 100%;
	}
</style>