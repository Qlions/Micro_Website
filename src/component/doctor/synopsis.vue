<template>
	<div>
		<heads :title="title" class="header"></heads>
		<div style="height: 0.84rem; width: 0.1rem;"></div>
		<dl class="doctorDl1">
				<dt><img v-bind:src="msg.photosmall" class="doctorDtimg1"></dt>
				<dd>
					<div class="doctorDdlist_1">
						<p>{{ msg.name }}</p>
						<p style="color: #999;"><span v-if=" msg.department != ',,' && msg.department != ',' ">{{ msg.department.split(",")[0] }}&nbsp;</span>{{ msg.proTitle.split(",")[0] }}</p>
						<p style="color: #999;" class="clampSearch2">{{ msg.hospital.split(",")[0] }}</p>
					</div>
				</dd>
		</dl>
		<!--隔断-->
		<div style="height: 0.2rem; width: 100%; background: #eee;"></div>
		<!--擅长-->
		<ul class="doc_ul" v-if="msg.docSpecialty!=''">
			<li class="doc_li_H">
				<p class="doc_long">擅<span class="space_span"></span>长</p>
				<p class="doc_word2"  v-if="msg.docSpecialty == '' || msg.docSpecialty == null">无</p>
				<p class="doc_word2">{{ msg.docSpecialty }}</p>
			</li>
			<li class="doc_li_H">
				<p class="doc_long">简<span class="space_span"></span>介</p>
				<p class="doc_word2" v-if="msg.docResume == '' || msg.docResume == null" >无</p>
				<p class="doc_word2" >{{ msg.docResume }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import Heads from '../common/head.vue'
	
	export default {
		data (){
			return {
			title: '专家介绍',
			msg: JSON.parse(this.$route.query.msg)
			}
		},
		components: {
			Heads
		},
		methods: {
		
		},
		mounted() {
				console.log(this.msg)
		}
	}
</script>

<style>
	/*头部背景颜色*/
	.header{
		background: #fff !important;
		border-bottom: 1px solid #eee !important;
	}
	.header h2{
		color: #009983 !important;
	}
	.doctorDtimg1{
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		
	}
	.doctorDdlist_1{
		color: #333;
	}
	.doctorDl1{
		width: 94%;
		margin: 0 auto;
		height: 1.5rem;
	}
	.doctorDl1 dt{
		width: 25%;
		float: left;
		height: 100%;
		padding-top: 0.11rem;
		
	}
	.doctorDl1 dd{
		width: 75%;
		float: right;
		height: 100%;
		padding-top: 0.11rem;
		/*border-bottom: 1px solid #eee;*/
	}
	.doc_ul{
		width: 94%;
		margin: 0 auto;
		
	}
	.doc_long{
		color: #333;
		margin-top:0.2rem ;
		
	}
	.doc_word2{
		color: #999;
		padding-bottom: 0.2rem;
		padding-top: 0.1rem;
	}
	.doc_li_H{
		border-bottom: 1px solid #eee;
	}
	.space_span{
		display: inline-block;
		width: 0.25rem;
	}
	.clampSearch2{
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis
	}
</style>