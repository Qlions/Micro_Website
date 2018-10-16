<template>
<section id="myOrders">
	<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
	<!--<Loading v-if="isLoading" :class = "[nohead2]"></Loading>-->
	<div class="myOrders-con">
		<ul class="myOrdersTab" :style="{ top:activeTop }">
			<li v-for="item in items" @click="selectStyle(item.type,item.code)"  v-bind:class="{'active': isActive == item.code}">{{item.title}}</li>
		</ul>
		<component v-bind:is="currentView" :hasError='hasError'></component>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import allOrder from './orderList/allOrder.vue'
	import noMoney from './orderList/noMoney.vue'
	import noServer from './orderList/noServer.vue'
	import finished from './orderList/finished.vue'
	import deleted from './orderList/deleted.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				titleName:"服务订单",
				white:"white",
				isLoading:true,
				nohead2:"nohead2",
				isActive:"",
				page:1,
				rows:10,
				orderType:"",
				currentView:"allOrder",
　　　　　　　　 items: [
　　　　　　　　 		{type: 'allOrder',code:0,title:"全部"},
					{type: 'noMoney',code:1,title:"待付款"},
					{type: 'noServer',code:2,title:"已付款"}, 
					{type: 'finished',code:3,title:"已完成"},
					{type: 'deleted',code:4,title:"已取消"}
　　　　　　　　 ],
				order: "",
				hasError:"",
				activeTop: ".84rem",
			}
		},
		components:{
			Heads,allOrder,deleted,finished,noMoney,noServer,Loading
		},
		methods: {
	　　　　selectStyle:function (type,index) {
				this.isActive = index;
				this.currentView = type;
	　　　　},
			goWhich(){
				
			},
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },2000);  
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
		},
	}
</script>

<style scoped>
	#myOrders{
		padding-top: 1.64rem;
		padding-bottom: 0.2rem;
	}
	.nodata{
		width: 100%;
		text-align: center;
		margin-top: 0.4rem;
		color: #999;
		font-size: 0.28rem;
	}
	.nodataImg{
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		margin: 0 auto;
	}
	.myOrdersTab{
		position: fixed;
		top:0.84rem;
		opacity: 1;
		z-index: 9;
		background: rgba(255,255,255,1);
		border-bottom:1px solid #E6E6E6;
		display: flex;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.myOrdersTab li{
		flex: 1;
		text-align: center;
		color: #999;
	}
	.active{
		color: #009983;
		border-bottom: 2px solid #009983;
		margin-bottom: -1px;
	}
	.myOrdersTab .active{
		color: #009983;
	}
	.unactive{
		color: #666;
		border:none;
	}
</style>