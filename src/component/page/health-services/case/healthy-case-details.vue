<template>
	<div class="healthy-case-details">
		<Heads :title="title"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<div class="healthy-case-details-content">
			<div class="case-details-time">
				<ul>
					<li>
						<span>病历名称</span>
						<input type="text" v-model="details.caseName" disabled="disabled" class="right">
					</li>
					<li>
						<span>就诊时间</span>
						<input type="text" v-model="referralTime" disabled="disabled" class="right">
					</li>
					<li>
						<span>门诊/病历号</span>
						<input type="text" v-model="details.outpatientNum" disabled="disabled" class="right">
					</li>
					<li>
						<span>所属医院</span>
						<input type="text" v-model="details.orgName" disabled="disabled" class="right">
					</li>
				</ul>
			</div>
			<div class="case-details-record" v-for="(item,index) in details.dictInfo">
				<ul>
					<li>
						<div class="case-details-record-title">
							<span>{{ item.dictName }}</span>
							<span class="right">
								<router-link :to="{ path: '/child/case/update/details' }">
									修改					
								</router-link>	
							</span>
						</div>
						<div class="caseInfoValuetxt">
							<div v-for="(content,index) in item.caseDetail" v-if="content.caseInfoValue !== null">
								<div v-if="content.caseInfoType != 2">
									{{ content.caseInfoValue }}
								</div>
							</div>
						</div>
						<div class="case-details-record-img" v-for="imgList in item.caseDetail" v-if="imgList.imageUrl != ''">
							<img :src="imgList.imageUrl" alt="" data-preview-src="" data-preview-group="1"/>
						</div>
					</li>
	
				</ul>
			</div>	
		</div>
	</div>
</template>
<script>
	import Heads from '../../../common/head.vue'
	import Loading from '../../../common/loading.vue'
	export default {
		data () {
			return {
				list:this.$store.state.medication,
				name:this.$route.query.name,
				details:"",
				title:'病历记录',
				referralTime:"",
				isLoading:true,
			}
		},
		mounted () {
			this.$store.state.icdName = '';
			this.$store.state.icdId = "";
			this.$store.state.orgName = "";
			this.$store.state.orgCode = "";
			this.$store.state.createTime = "";
			this.$store.state.caseNum = "";
			// 获取对于ID的详情数据
			this.$store.state.caseDetails = [];
			let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
			let userId = userInfo.userId;
			let token = userInfo.token;
			let data = JSON.stringify({
	    		'userId' : userId
	    	})
	    	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
				token:token, 
				infoType:530000, 
				jsonValue:data 
			},{emulateJSON:true})
			.then(response => {
				console.log(response)
				let data2 = response.body.listInfo;
				for (var i = 0; i < data2.length; i++) {
					if( this.name == data2[i].caseManageId ){
						this.details = data2[i];
						console.log(this.details)
						this.referralTime = this.details.referralTime.replace('T',' ');
						this.$store.state.caseDetails = this.details;
					}
				}
				setTimeout(() => {
		               this.isLoading = false;
		        }, 1500);
			},response => {
				
			})
			mui.previewImage();
		},
		methods:{
			
		},
		components: {
			Heads,
			Loading
		}
	}
</script>
<style>
	.healthy-case-details { 
		font-size: .28rem;
		background: #f3f3f3;
		padding-top: .84rem;
	}
	.healthy-case-details-content {
		width: 100%;
		height: 100%;
		position: relative;
		background: #f3f3f3;
	}
	.healthy-case-details-content>div {
		margin-top: 0.3rem;
	}
	.healthy-case-details-content>div:last-child {
		margin-bottom: .3rem;
	}
	.healthy-case-details-content .right {
		float: right;
	}
	.healthy-case-details-content input {
		text-align: right;
		font-size: .28rem;
		width: 70%;
	}
	.case-details-time {
		padding: 0.15rem;
		background: #fff;
	}
	.case-details-time ul li {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.case-details-time ul li:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.case-details-time ul li p {
		padding-bottom: .2rem;
	}
	.case-details-time textarea {
	    resize: none;
	    border: 0 none;
	    outline: none;
	    display: block;
	    width: 100%;
	    height: 1.65rem;
	    color: #333;
	    font-size: 0.24rem;
	    overflow: hidden;
	    background: #f3f3f3;
	    font-size: .28rem;	 
	}
	.case-details-record {
		padding: 0.15rem;
		background: #fff;
	}
	.case-details-record-title {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.case-details-record-title span.right {
		color: #009983;
	}
	.case-details-record-content p {
		padding: .2rem 0;
	}
	.case-details-record-img {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
		border: .01rem dashed #f0f0f0;
		margin-left: .1rem;
	}
	.case-details-record-img img {
		width: 100%;
		height: 100%;
	}
	.caseInfoValuetxt {
		width: 100%;
		height: 0.8rem;
		color: #999;
		margin: .1rem 0;
	}
	/* 
   图片预览CSS
	*/
	.server-topBar{
		position: absolute;
		width: 100%;
		left: 0;
		height: 44px;
		background: #000;
		background: url(../../../../assets/image/head-back.png) no-repeat #000 left 0.1rem center;
		background-size: 7%;
		text-align: center;
		line-height: 44px;
		color: #fff;
		font-size: 18px;
	}
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
		bottom: 50px;
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