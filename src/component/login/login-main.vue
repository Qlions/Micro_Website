<template>
	<section id="login-main">
		<Heads :title="title" :class="{clear:isClass}"></Heads>
		<div class="zlogo"></div>
		<LoginForm></LoginForm>
	</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import LoginForm from './login-form.vue'
	export default {
		data () {
			return {
				title:"中国健康云",
				isClass:true
			}
		},
		components:{
			LoginForm,
			Heads
		}
	}
</script>
<style>
	#login-main {
		padding-top: .84rem;
	}
	.zlogo {
	    width: 100%;
	    height: 3.3rem;
	    text-align: center;
	    background: #009983 url(../../assets/image/login-new.png) no-repeat scroll 50% 50%;
	    background-size: 2.2rem auto;
	}
	.clear {
		position: relative;
	}
</style>