<template>
	<div class="feedback">
		<Head :title="title" class="feedback_head"></Head>
		<div class="feedback-box" id="feedback-box">
			<div class="feedback-box-text">
				<textarea id="qctxt" v-model="textarea" placeholder="请输入描述内容"></textarea>
			</div>
			<uploader :src="'/webapiProxy/webapi/picAppUpload.action'" :maxNum="3" :textarea="textarea">
				
			</uploader>
		</div>
	</div>
</template>
<script>
	import Head from '../common/head.vue' // 头部
	import Uploader from './service_uploader.vue' // 头部
	export default {
		data () {
			return {
				title:this.$route.query.title,
				textarea:""
			}
		},
		components:{
			Head,
			Uploader
		},
		mounted  () {
			
		},
		methods:{
		}
	}
</script>
<style>
	.feedback-box {
		padding-top: .84rem;
	}
	.feedback-box-text textarea {
		border: none;
		resize: none;
		padding: 0.3rem;
		width: 100%;
		min-height:6rem; 
		height:auto!important; 
		height:4rem;
		font-size: 14px;
		white-space: normal;
	    word-break: break-all;
	    outline: none;
	}
	.feedback_head .head_content_box {
		position: static !important;
	}
</style>