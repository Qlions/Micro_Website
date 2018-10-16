<template>
	<section id="login">
		<router-view></router-view>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		components:{
			
		}
	}
</script>
<style>
	#login {
		width: 100%;
		height: 100%;
		background: #f9f9f9;
	}
	.login-head {
	    position: relative;
	    z-index: 2;
	    width: 100%;
	    height: 50px;
	    background-color: #6aac34;
	    background-color: #eee;
	}
	.login-head b {
	    text-align: center;
	    width: 50px;
	    height: 50px;
	    position: absolute;
	    left: 0px;
	    top: 0;
	}
	.login-head b a {
	    display: block;
	    width: 100%;
	    height: 100%;
	}
	.logo {
	    float: left;
	    text-align: center;
	    width: 100%;
	    margin: 0 auto;
	    line-height: 50px;
	    font-size: 18px;
	    color: #666!important;
	}
</style>