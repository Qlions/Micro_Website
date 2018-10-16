<template>
<section id="mySquare">
	<Heads :title="titleName"></Heads>
	<div class="MS-container">
		<ul class="myOrdersTab">
			<li v-for="item in items" @click="selectStyle(item.code)"  v-bind:class="{'my-active': isActive == item.code}">{{item.type}}</li>
		</ul>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	export default {
		data () {
			return {
				isActive:0,
				titleName:"健康广场",
　　　　　　　　	items: [
　　　　　　　　　　{type: '我的活动',code:0},
　　　　　　　　　　{type: '我的团队',code:1}
　　　　　　　　	]
			}
		},
		components:{
			Heads
		},
		mounted: function() {
		    
		},
		methods: {
	　　　　selectStyle:function (index) {
			this.isActive=index;
	　　　　}
		}
	}
</script>

<style>
	input{
		-webkit-appearance: none; -moz-appearance: none; -o-appearance: none; appearance: none;
		border: none;
		background: none;
		outline: none;
	}
	.MS-container{
		margin-top: 50px;
	}
	.nodata{
		width: 100%;
		text-align: center;
		margin-top: 0.4rem;
		color: #999;
		font-size: 0.28rem;
	}
	.nodataImg{
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		margin: 0 auto;
	}
	.myOrdersTab{
		display: flex;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.3rem;
		border-bottom: 1px solid #eee;
	}
	.myOrdersTab li{
		flex: 1;
		text-align: center;
	}
	.my-active{
		color: #64b450;
		border-bottom: 2px solid #64b450;
	}
	.unactive{
		color: #666;
		border:none;
	}
</style>