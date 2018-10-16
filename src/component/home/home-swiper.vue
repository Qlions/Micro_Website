<template>
	<div class="swiper">
		<div class="home-head-top">
			<div class="home-head-top-news">
				<router-link :to="{ name:'myMessage' }">
					<img src="../../assets/image/index_img/icon_home_news.png" alt="">
				</router-link>
			</div>
			<div class="home-head-top-my">
				<router-link :to="{ name:'myIndex' }">
					<img src="../../assets/image/index_img/icon_home_my.png" alt="">
				</router-link>
			</div>
		</div>

		<div class="swiper-container" v-if="imgUrl != ''">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="url in imgUrl">
					<a :href="url.extensionLinkH5">
						<img :src="url.extensionSiteFileUrl">
					</a>	
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		<div class="swiper-container" v-else-if="imgUrl.length == 1">
			<div class="swiper-wrapper">
				<div class="swiper-slide-1" v-for="url in imgUrl">
					<a :href="url.extensionLinkH5">
						<img :src="url.extensionSiteFileUrl">
					</a>	
				</div>
			</div>
		</div>
		<div class="swiper-container" v-else>
			<div class="swiper-wrapper">
				<div class="swiper-slide-1">
					<img src="../../assets/image/index_img/BANNER1@3x1.png" alt="首页图1">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/js/swiper-3.4.2.min.js'
	export default {
		data () {
			return {
				imgUrl:'',
				jupage:''
			}
		},
		methods:{

		
		},
		mounted(){

			this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData', {token: "",jsonValue: '', infoType: 660305},{emulateJSON:true}).then( response => {			
				this.jupage = response.body;
				this.imgUrl = response.body.couponExtensList;
		    })
		},
		updated () {
			var mySwiper = new Swiper('.swiper-container', {
				autoplay : 3000,
				direction: 'horizontal',
				loop: true,
				pagination: '.swiper-pagination',			
		    })
		}
	}
</script>
<style>
	.swiper {
		position: relative;
	}
	.home-head-top {
		padding: .3rem;
		position: absolute;
		width: 100%;
		z-index: 9;
	}
	.home-head-top div {
		width: .6rem;
		height: .6rem;
	}
	.home-head-top-news {
		float: left;
	}
	.home-head-top-my {
		float: right;
	}
	.home-head-top div img {
		width: 100%;
		height: 100%;
	}
	.swiper img {
		width: 100%;
	}
	.swiper-pagination-bullet {
		background: #fff !important;
		opacity:.5 !important;
	}
	.swiper-pagination-bullet-active {
		background: #fff !important;
		opacity:1 !important;
	}
	.swiper-slide a {
		display: block;
		width: 100%;
		height: 3rem;
	}
	.swiper-slide-1 a {
		display: block;
		width: 100%;
		height: 3rem;
	}

</style>