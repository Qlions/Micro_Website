<template>
	<section>
		<Heads :title="albumName"></Heads>
		<div class="chart">
			<!-- <div class="tab-btn">
				<ul>
					<li v-for="item in list" @click="conTad(item.view,item.indexs)" :class="{'active': isActive == item.indexs }">{{ item.type }}</li>
				</ul>
			</div> -->
			<div class="tab-content">
				<component :is="currentView" :hasError="hasError" keep-alive></component>
			</div>
		</div>
	</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import tabEchart from './tab-echarts.vue'
	import tabRecord from './tab-record.vue'
	export default {
		data () {
			return {
				id:this.$route.query.id,
				title:this.$route.query.title,
				isActive:0,
				currentView:tabRecord, 
				isLoading:true,
				hasError:'',
				list:[
					{ type:'图表',view:'tabEchart',indexs:0 },
					{ type:'记录',view:'tabRecord',indexs:1 }
				]
			}
		},
		components: {
			Heads,
			Loading,
			tabEchart,
			tabRecord
		},
		computed:{
			albumName(){
				var mapAlbum = {
					weightIndex: "体重指数",
					theWaist: "腰围监测",
					pulse: "脉搏监测",
					weight: "体重监测",
					bloodsugar: "血糖监测",
					electrocardiogram: "心电图监测",
					temperature: "体温监测",
					bloodPressure: "血压监测",
					triglyceride: "甘油三酯监测",
					LDLC: "低密度脂蛋白胆固醇监测",
					HDLC: "高密度脂蛋白胆固醇监测",
					totalCholesterol: "总胆固醇监测",
					diet: "膳食监测",
					drinkWine: "饮酒监测",
					smoke: "吸烟监测",
					motion: "运动监测",
					zfhlInfo:"脂肪含量",
					spo2Info:"血氧饱和度",
				}
				return mapAlbum[this.title]
		    }   
		},
		methods:{
			conTad (view,indexs){
				this.isActive = indexs;
				this.currentView = view
			}
		},
		mounted (){
			
		},
		created (){
			
			//console.log(this.$route.query.title);
		}
	}
</script>
<style>
	.chart {
		width: 100%;
		padding-top: .84rem;
	}
	.tab-btn {
		padding: 0 0.25rem;
		border-bottom: 1px solid #eee;
	}
	.tab-btn ul li {
		width: 50%;
		float: left;
		text-align: center;
		line-height: 0.825rem;
		font-size: 14px;
	}
	.tab-btn ul li.active {
		border-bottom: 2px solid #009983;
		color: #009983;
		margin-bottom: -1px;
		z-index: 1
	}
	.tab-btn ul li a {
		display: block;
	}
</style>