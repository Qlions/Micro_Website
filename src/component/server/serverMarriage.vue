<template>
	<div id="expert_Marr">
		<Heads :title="titleName"></Heads>
		<div class="marrList" @click="selectInfo(item)" v-for="item in dataList">
			{{ item.info }}
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: '婚姻状况',
				dataList: [
					{
						info: '未婚',
						value: '1'
					},
					{
						info: '已婚',
						value: '2'
					},
					{
						info: '丧偶',
						value: '3'
					},
					{
						info: '离婚',
						value: '4'
					},
					{
						info: '其他',
						value: '5'
					}
				]
			}
		},
		components:{
			Heads
		},
		methods:{
			selectInfo(item){
				let vm = this;
				vm.$store.state.marryInfo = item.info;
				console.log(vm.$store.state.marryInfo)
				vm.$router.go(-1);
			}
		}
	}
</script>
<style>
	#expert_Marr{
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		padding-top: 0.84rem;
	}
	.marrList{
		height: 0.9rem;
		background: #fff;
		border-bottom: 1px solid #E6E6E6;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.25rem;
		color: #666;
	}
</style>