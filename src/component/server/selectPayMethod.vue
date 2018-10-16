<template>
	<div id="selectPay">
		<Heads :title="titleName"></Heads>
		<ul>
			<li v-for="item in payList" @click="selectMethod(item)">{{ item.txt }}</li>
		</ul>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: '选择支付方式',
				payList: [
					{
						txt: '在线支付',
						payType: '0'
					},
					{
						txt: '线下支付',
						payType: '2'
					}
				]
			}
		},
		components: {
			Heads
		},
		methods: {
			selectMethod(item){
				let id = this.$route.query.id;
				let type = this.$route.query.type;
				this.$router.push({path:'/serverConfirm/serverOrder',query:{id:id,type:type,payType:item.payType}});
			}
		}
	}
</script>
<style scoped>
	#selectPay{
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		padding-top: 0.84rem;
	}
	#selectPay ul{
		width: 100%;
	}
	#selectPay li{
		width: 100%;
		display: block;
		height: 0.9rem;
		line-height: 0.9rem;
		background: #fff;
		text-align: center;
		font-size: 0.26rem;
		border-bottom: 0.01rem solid #e5e5e5;
	}
	#selectPay li:last-child {
		border: 0 none;
	}
</style>