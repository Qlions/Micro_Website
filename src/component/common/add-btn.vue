<template>
	<section id="assess">
		<div class="new-risk-btn">
			<div class="new-risk">
				<router-link :to="{ name:title,query:{
						id: uid,  
						dicCode:diccode,
						title:title,
						type:1
					}}">
					<i>
						<img src="../../assets/image/new-great.png" alt="">
					</i>
					添加记录
				</router-link>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		props:[
			'uid',
			'diccode', 
			'title'
		],
		data () {
			return {
				
			}
		}
	}
</script>
<style>
	.new-risk-btn {
	    background: #fff;
	    height: 60px;
	    width: 100%;
	    position: fixed;
	    left: 0;
	    right: 0;
	    text-align: center;
	    z-index: 1;
	    bottom: 0;
	}
	.new-risk {
	    margin-top: 8px;
	}
	.new-risk a {
	    display: inline-block;
	    width: 95%;
	    height: 40px;
	    line-height: 40px;
	    margin-top: 0;
	    background: #009983;
	    color: #fff;
	    font-size: 14px;
	    text-align: center;
	    border-radius: 0.1rem;
	}
	.new-risk a i {
	    width: 16px;
	    height: 16px;
	    display: inline-block;
	    margin-right: 10px;
	    position: relative;
	}
	.new-risk a i img {
	    display: block;
	    position: absolute;
	    width: 18px;
	    height: 18px;
	    top: 1px;
	}
</style>