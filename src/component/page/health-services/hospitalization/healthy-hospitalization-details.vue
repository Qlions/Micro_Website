<template>
	<div class="healthy-hospitalization-details">
		<Heads :title="title"></Heads>
		<div class="healthy-hospitalization-details-content">
			<div class="hospitalization-details-time styname">
				<ul>
					<li>
						<p>机构名称</p>
						<textarea readonly="readonly">{{ details.hosName }}</textarea>
					</li>
					<li>
						<p>入院原因</p>
						<textarea readonly="readonly">{{ details.reason }}</textarea>
					</li>
				</ul>
			</div>
			<div class="hospitalization-details-time">
				<ul>
					<li>
						<span>入院时间</span>
						<input type="text" v-model="admissionDate" readonly="readonly" class="right">
					</li>
					<li>
						<span>出院时间</span>
						<input type="text" v-model="dischargeDate" readonly="readonly" class="right">
					</li>
					<li>
						<span>病案号码</span>
						<input type="text" v-model="details.recordNo" readonly="readonly" class="right">
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../../../common/head.vue'
	export default {
		data () {
			return {
				list:this.$store.state.medication,
				name:this.$route.query.name,
				details:"",
				title:'住院病史',
				admissionDate:"", // 住院时间
				dischargeDate:""  // 出院时间
			}
		},
		mounted () {
			// 获取对象ID的详情数据
			let data = this.list.body.rows;
			console.log(data)
			for (var i = 0; i < data.length; i++) {
				if( this.name == data[i].hosName ){
					this.details = data[i];
					this.admissionDate = this.details.admissionDate.replace('T',' ').substring(0,16);
					this.dischargeDate = this.details.dischargeDate.replace('T',' ').substring(0,16);
					console.log(this.details)
				}
			}
			mui.previewImage();
		},
		methods:{
			
		},
		components: {
			Heads
		}
	}
</script>
<style>
	.healthy-hospitalization-details {
		width: 100%;
		height: 100%;
		font-size: .28rem;
		background: #f3f3f3;
		position: relative;
		padding-top: .84rem;
	}
	.healthy-hospitalization-details-content {
		margin-top: 0.3rem;
	}
	.healthy-hospitalization-details-content .right {
		float: right;
	}
	.healthy-hospitalization-details-content input {
		text-align: right;
		font-size: .28rem;
	}
	.hospitalization-details-time {
		padding: 0 0.15rem;
		background: #fff;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-time ul li {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-time ul li:last-child {
		border-bottom: none;
	}
	.hospitalization-details-time ul li p {
		padding-bottom: .2rem;
	}
	.hospitalization-details-time textarea {
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
	    border-radius: 0;
		
	}
	.hospitalization-details-record {
		padding: 0.15rem;
		background: #fff;
	}
	.hospitalization-details-record-title {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-record-content p {
		padding: .2rem 0;
	}
	.hospitalization-details-record-img {
		width: 1.6rem;
		height: 1.6rem;
		float: left;
		margin-left: 0.1rem;
	}
	.hospitalization-details-record-img img {
		width: 100%;
		height: 100%;
	}
	.caseInfoValue {
		width: 100%;
		height: 0.8rem;
		line-height: .9rem;
		color: #999;
	}
</style>