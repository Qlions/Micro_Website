<template>
	<div id='goTop' @click='goTop' v-show = 'toTop'>  
	  <img src="../../assets/image/my/backto-top.png">  
	</div>  
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			goTop:function(){
				clearInterval(timer);  
        		timer = setInterval(function() {
        		let curHeight = document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度  
        		}
			}
		}
	}
</script>

<style>
</style>