<template>
<section id="healthy">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class = "[nohead]"></Loading>
	<div class="H-container">
		<div class="serverDetail">
			<p>{{order.serviceName}}</p>
			<p>
				<i>服务专家</i>
				<span>{{order.serviceDocName}}</span>
				<em>{{order.proTitle.split(',')[0]}}</em>
			</p>
			<p v-if="order.timeScopeStr"><i class="server-healthy-time">服务时间</i><span class="server-healthy-time">{{order.timeScopeStr}}</span></p>
		</div>
		<div class="healthy-line"></div>
		<div class="healthy-miaoshu-box">
			<p>{{titleName}}</p>
			<p class="healthy-miaoshu">{{order.contentStr}}</p>
		</div>
		<div class="healthy-img-box" v-if="order.qImgsUrl" >
			<span v-for="item in order.qImgsUrl.split(',')">
				<img :src="item" data-preview-src="" data-preview-group="1"/>
			</span>
		</div>
	</div>
		
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				isLoading:false,
				order: this.$route.params.order,
				nohead:"nohead",
				white:"white"
			}
		},
		computed:{
			titleName:function(){
				if(this.order.serviceComponent =='图文服务'){
					return "健康现状描述"
				}else{
					return "备注"
				}
			}
		},
		mounted: function() {
			mui.previewImage();
			console.log(this.order)
		},
		components:{
			Heads,Loading
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
	　　　　
		}
	}
</script>

<style>
	#healthy{
		width: 100%;
		height: 100%;
		position: absolute;
		font-size: 0.2rem;
		color: #333;
	}
	.serverDetail{
		padding: 0 0.3rem;
	}
	.serverDetail p{
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.2rem;
		color: #333333;
		border-bottom: 1px solid #e6e6e6;
	}
	.serverDetail p:last-child{
		border-bottom: none;
	}
	.serverDetail p i{
		color: #ff5454;
		margin-right: 0.3rem;
	}
	.serverDetail p span{
		color: #ff5454;
		margin-right: 0.1rem;
	}
	.serverDetail p em{
		color: #666;
	}
	.serverDetail p .server-healthy-time{
		color: #333;
		margin-right: 0.3rem;
	}
	.healthy-line{
		height: 0.15rem;
		background: #F2F2F2;
	}
	.healthy-miaoshu-box{
		padding: 0 0.3rem;
	}
	.healthy-miaoshu-box p{
		
		line-height: 0.6rem;
		font-size: 0.2rem;
		color: #333333;
		word-wrap:break-word;
	
	}
	.healthy-miaoshu-box .healthy-miaoshu{
		border-top: 1px solid #e6e6e6;
		padding: 0.2rem 0;
		line-height: 0.28rem;
		color: #999;
	}
	.healthy-img-box{
		padding: 0.3rem 0.6rem;
	}
	.healthy-img-box span{
		float: left;
		display: inline-block;
		margin-right: 0.15rem;
		height: 1.3rem;
		width: 1.3rem;
		border: 1px solid #e6e6e6;
	}
	.healthy-img-box span img{
		width: 100%;
		height: 100%;
	}
	/*mui样式*/
	.mui-preview-image.mui-fullscreen {
		position: fixed;
		z-index: 20;
		background-color: #000;
	}
	.mui-preview-header,
	.mui-preview-footer {
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 10;
	}
	.mui-preview-header {
		height: 44px;
		bottom: 1rem;
	}
	.mui-preview-footer {
		height: 50px;
		bottom: 0px;
	}
	.mui-preview-header .mui-preview-indicator {
		display: block;
		line-height: 25px;
		color: #fff;
		text-align: center;
		margin: 15px auto 0;
		width: 70px;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 12px;
		font-size: 16px;
	}
			
	.mui-preview-image {
		display: none;
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	.mui-preview-image.mui-preview-in {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}
	.mui-preview-image.mui-preview-out {
		background: none;
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}
	.mui-preview-image.mui-preview-out .mui-preview-header,
	.mui-preview-image.mui-preview-out .mui-preview-footer {
		display: none;
	}
	.mui-zoom-scroller {
		position: absolute;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		-webkit-backface-visibility: hidden;
	}
	.mui-zoom {
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}
	.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
		width: 100%;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
		display: inline-table;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
		display: table-cell;
		vertical-align: middle;
	}
	.mui-preview-loading {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: none;
	}
	.mui-preview-loading.mui-active {
		display: block;
	}
	.mui-preview-loading .mui-spinner-white {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -25px;
		margin-top: -25px;
		height: 50px;
		width: 50px;
	}
	.mui-preview-image img.mui-transitioning {
		-webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
		transition: transform 0.5s ease, opacity 0.5s ease;
	}
	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.mui-fullscreen {
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	}
	.mui-slider {
	    position: relative;
	    z-index: 1;
	    overflow: hidden;
	    width: 100%;
	}
	.mui-fullscreen.mui-slider .mui-slider-group {
    	height: 100%;
	}
	.mui-slider .mui-slider-group {
	    font-size: 0;
	    position: relative;
	    -webkit-transition: all 0s linear;
	    transition: all 0s linear;
	    white-space: nowrap;
	}
	.mui-hidden {
	    display: none!important;
	}
	.mui-slider .mui-slider-group .mui-slider-item {
	    font-size: 14px;
	    position: relative;
	    display: inline-block;
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	    white-space: normal;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
	    width: 100%;
	}
</style>