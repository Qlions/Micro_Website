<template>
	<div class="healthy-medication-add-details">
		<Heads :title="title"></Heads>
		<div class="healthy-medication-details-content">
			<div class="healthy-medication-details-content-list">
				<div class="details">
					<ul>
						<li>
							<div class="details-drugs-data-txt">
								<input placeholder="输入药品名称" v-model="details.medicineName">
							</div>
						</li>
						<li>
							<div class="medication-drugs-title-item">用药日期</div>
							<div class="details-drugs-date down-data">
								<input placeholder="选择用药日期" class="" readonly="readonly" name="appDateTime" id="appDateTime" type="text" v-model="medicineTime">
							</div>
						</li>
						<li>
							<div class="medication-drugs-title-item">
								用法
							</div>
							<div class="details-data-drugs-usage-item">
								<p class="togglePop">{{ drugUsageName }}</p>
							</div>
							<div class="details-data-drugs-date-item">
								<p class="togglePop">{{ medicationDateName }}</p>
							</div>
						</li>
						<li>
							<div class="medication-drugs-title-item">
								频率
							</div>
							<div class="details-data-drugs-usage-item">
								<p class="togglePop">{{ consumptionName }}</p>
							</div>
							<div class="details-data-drugs-date-item">
								<p class="togglePop">{{ frequencyName }}</p>
							</div>
						</li>
						<li>
							<div class="medication-drugs-title-item">
								<p>剂量</p>
							</div>
							<div class="details-data-drugs-usage-item down-item">
								<p>{{ dosage }}</p>
							</div>
							<div class="details-data-drugs-date-item">
								<p class="togglePop">{{ companyName }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>
	import Heads from '../../../common/head.vue'
	export default {
		data () {
			return {
				listnum:[1],
				list:this.$store.state.medication,
				name:this.$route.query.name,
				details:"",
				title:'用药记录',
				medicineTime:"",
				timesDay:"",
				drugUsageName:"药品用法",
				medicationDateName:"用药时间",
				consumptionName:"药品用量",
				frequencyName:"用药次数",
				companyName:"剂量单位",
				dosage:"每次剂量",

			}
		},
		mounted () {
			let data = this.list.body.rows;
			for (var i = 0; i < data.length; i++) {
				if( this.name == data[i].medicineName ){
					this.details = data[i];
					if(this.details.usageType == '外用' || this.details.usageType == '静脉点滴'){
						this.medicationDateName = '---';
					}else {
						this.medicationDateName = this.details.usageTime;
					}
					this.medicineTime = this.details.medicineTime.replace('T',' ');
					this.timesDay = this.details.timesDay+"次";
					this.frequencyName = this.details.timesDay+"次";
					this.companyName = this.details.unit;
					this.dosage = "每次"+this.details.dosage;
					this.consumptionName = this.details.timesType;
					this.drugUsageName = this.details.usageType;
					
				}
			}
		},
		methods:{
			
		},
		components: {
			Heads
		}
	}
</script>
<style>
	#tc-wrapper1 {
		height: 4.3rem;
		overflow: scroll;
		position: relative;
	}
	#tc-wrapper1 ol {
		padding: 0;
	}
	#tc-wrapper1 ol li {
		text-align: center;
		margin-left: 0;
	}
	.ui-line {
		border-top: .01rem solid #D6DDE7;
		border-bottom: .01rem solid #D6DDE7;
		width: 100%;
		height: .8rem;
		position: absolute;
    	top: 1.6rem;
	}
	.healthy-medication-add-details {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: absolute;
		padding-top: .84rem;
	}
	.healthy-medication-add-details-content {
		background: #f5f5f5;
	}
	.healthy-medication-details-content-list {
		background: #fff;
		padding:0 0.3rem;
		position: relative;
		margin-bottom: .2rem;
	}
	.healthy-medication-details-content .drugs {
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 0.3rem;
		margin-top: .3rem;
	}
	.healthy-medication-details-content .details>ul>li {
		border-bottom: 1px solid #f3f3f3;
		width: 100%;
		height: .9rem;
	}
	.details-data-usage {
		float: right;
	}
	.details-data-drugs-usage-item {
		margin-left: 1.5rem;
	    text-align: right;
	    width: 2rem;
	}
	.details-data-drugs-date-item {
		float: right !important;
	}
	.details-data-drugs-usage-item p {
		background: url('../../../../assets/image/expert_info_down@3x.png') no-repeat right;
		background-size: .25rem;
		padding-right: .3rem;
	}
	.down p,
	.down-data {
		background: url('../../../../assets/image/expert_info_right@3x.png') no-repeat right !important;
		background-size: .15rem !important;
	    padding-right: .3rem !important;
	}
	.details-data-drugs-date-item p {
		background: url('../../../../assets/image/expert_info_down@3x.png') no-repeat right;
		background-size: .25rem;
		padding-right: .3rem;
	}
	.details-drugs-date {
		width: 4rem !important;
		float: right !important;
		text-align: right !important;
	}
	.details-data-usage div {
		float: left;
		line-height: 0.9rem;
		font-size: 0.28rem;
	}
	.details-data-drugs-date-item p,
	.details-data-drugs-date-item input {
		text-align: right;
	}
	.healthy-medication-details-content .details>ul>li>div {
		float: left;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #333;
	}
	.details-drugs-data-txt {
		width: 100% !important;
	}
	.details-drugs-date {
		float: right !important;
	}
	.details-drugs-date input {
		text-align: right;
	}
	.healthy-medication-details-content .details>ul>li>div>input {
		width: 100%;
		height: 0.54rem;
		border: 1px solid #f3f3f3;
		font-size: 0.28rem;
		-webkit-appearance: none;
		border-radius: 0;
		border: none;
		margin-top: .18rem;
	}
	.increase a {
		text-align: center;
		display: block;
		font-size: .28rem;
		padding-bottom: .2rem;
	}
	.preservation {
		width: 100%;
		height: 1rem;
		background-color: #009983;
		position: fixed;
		bottom: 0;
		font-size: .32rem;
		text-align: center;
		line-height: 1rem;
	}
	.preservation a {
		color: #fff;
	}
	.close-drugs img {
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: .25rem;
		right: 0.3rem;
	}
	.model-usageType-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.49);
		top: 0;
		left: 0;
		z-index: 9;
	}
	.model-usageType-mask-content {
		width: 5rem;
		height: 6rem;
		background: #fff;
		margin: -2.5rem -3rem; 

	}
	.details-data-drugs-usage-pop {
		width: 100% !important;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 9999;
	}
	.details-data-drugs-usage-pop-content {
		width: 7rem;
		height: 6.5rem;
		background: #fff;
		position: relative;
		top: 50%;
		left: 50%;
		margin: -3.25rem 0 0 -3.5rem;
		border-radius: .1rem;
		padding: 0 .3rem;
	}
	.details-data-drugs-usage-pop-content h2 {
		text-align: center;
		font-size: .32rem;
		border-bottom: .05rem solid #e6e6e6;
	}
	.details-data-drugs-usage-pop-content ol {
		padding: .1rem 0;
	}
	.details-data-drugs-usage-pop-content ol li {
		line-height: .8rem;
		height: .8rem;
		font-size: .28rem;
		margin-left: 2.2rem;
	}
	.details-data-drugs-usage-pop-content ol li.last {
		height: 1.1rem;
	}
	.details-data-drugs-usage-pop-content ol li input {
		margin-right: .15rem;
	}
	.details-data-drugs-usage-pop-content a {
		width: 100%;
		height: .84rem;
		display: block;
		background: #64b551;
		text-align: center;
		border-radius: .1rem;
		color: #fff;
		font-size: .32rem;
	}
</style>