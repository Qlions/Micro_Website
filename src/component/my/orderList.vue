<template>
<section id="orderList">
	<div class="O-container">
		<div class="O-content" v-for="(item,index) in order" key="index">
			
			<div class="order-title">
				<p class="order-title-num">
					<span class="txt">服务单号:&nbsp;</span>
					<span class="num">{{item.orderCode}}</span>
				</p>
				<p class="order-title-type" v-show="item.orderState == 0">
					待付款
				</p>
				<p class="order-title-type" v-show="item.orderState ==3">
					待服务
				</p>
				<p class="order-title-type" v-show="item.orderState ==4">
					待服务
				</p>
				<p class="order-title-type" v-show="item.orderState == 2">
					已完成
				</p>
				<p class="order-title-type" v-show="item.orderState == 6">
					已取消
				</p>
			</div>
			<div class="order-content">
				<router-link :to="'/my/orderDetail/'+item.orderId" class="content1">
					<dt><img :src="item.imgUrl" style="width: 1.2rem; height: 1.2rem;"/></dt>
					<dd>
						<p class="dd-p dd-p1">{{item.serviceName}}</p>
						<p class="dd-p dd-p2">由<span>{{item.medicalOrgName}}</span>提供服务</p>
						<div class="dd-p dd-p3">
							<p class="dd-p3-left"><img src="../../assets/image/my/serviceWay.png"/><span>{{item.serviceWay}}</span></p>
							<p class="dd-p3-left"><img src="../../assets/image/my/serviceTime.png" style="width: 0.32rem;"/><span>{{item.serviceTime}}</span></p>
							<p class="dd-p3-right"><span>￥{{item.payMoney}}</span></p>
						</div>
					</dd>
				</router-link>
				<div class="z_myService_box">
					<div class="z_myService_peo1">服务专家
						<span class="z_myService_peo1_1">{{item.serviceDocName}}
							<span class="z_myService_peo1_2" style="margin-left:0.1rem;">{{item.docType.split(',')[0]}}</span>
						</span>
					</div>
					<!--<div class="z_myService_peo2">服务时间
						<span class="z_myService_peo1_2">{{item.createTime | replace('T',' ') | substring(0,16)}}</span>
					</div>-->
				</div>
			</div>
			<div class="order-bottom" v-show="item.orderState == 0" @click="delOrder(item.orderId)">
				<p>取消服务</p>
			</div>	
			<div class="order-bottom" v-show="item.orderState == 3" @click="delOrder(item.orderId)">
				<p>取消服务</p>
			</div>
			<div class="order-bottom" v-show="item.orderState == 4" @click="delOrder(item.orderId)">
				<p>取消服务</p>
			</div>
			<div class="order-bottom del-order" v-show="item.orderState == 6">
				<p>删除</p>
			</div>		
			<div class="order-bottom post-talk" v-show="item.orderState == 2">
				<p>发表评价</p>
			</div>	
			
		</div>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	export default {
		data () {
			return {
				titleName:"服务订单",
				page:1,
				rows:100,
				order: ""
			}
		},
		props:['orderType'],
		mounted: function() {
			this.serverList();
		},
		components:{
	
		},
		methods: {
			serverList () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page: this.page,
					rows: this.rows,
					orderState: this.orderType,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data},{emulateJSON:true}).then( response => {
					this.order = response.body.rows
				})
			},
			//取消订单
			delOrder(orderId){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					orderId: orderId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data},{emulateJSON:true}).then( response => {

					this.serverList()
				})
			}
		}
	}
</script>

<style scoped>
	
	
	.O-container{
		width: 100%;
		padding-top: 0.2rem;	
	}
	.O-content{
		width: 96%;
		margin: 0 auto;
		color: #333;
	}
	.order-title{
		width: 95%;
		margin: 0 auto;
		border-bottom: 1px solid #E6E6E6;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.21rem;
		overflow: hidden;
	}
	.order-title-num{
		float: left;
		overflow: hidden;
		color: #999;
	}
	.order-title-num .txt{
		float: left;
		display: inline-block;
	}
	.order-title-num .num{
		float: left;
		display: inline-block;
	}
	.order-title-type{
		float: right;
		width: 1rem;
		text-align: right;
		color: #ff5454;
	}
	/*订单内容区*/
	.order-content{
		width: 95%;
		margin: 0 auto;
		border-bottom: 1px solid #e6e6e6;
		font-size: 0.2rem;
	}
	.order-content .content1{
		display: block;
		padding: 0.28rem 0;
		position: relative;
		overflow: hidden;
		color: #333;
		border-bottom: 1px dotted #e6e6e6;
	}
	.order-content .content1 .dd-p2{
		color: #999;
	}
	.order-content .content1 .dd-p2 span{
		color: #333;
	}
	.order-content dt{
		float: left;
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.3rem;
	}
	.order-content dd{
		float: left;
	}
	.dd-p {
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.order-content dd .dd-p1{
		font-size: 0.22rem;
	}
	.order-content dd div span{
		color: #999;
	}
	.order-content dd .dd-p3{
		overflow: hidden;
	}
	.dd-p3-left{
		float: left;
		margin-right: 0.15rem;
	}
	.dd-p3-left img{
		width: 0.4rem;
		height: 0.3rem;
	    position: relative;
	    margin-right: 0.1rem;
	    top: 0.06rem;		
	}
	.content1 dd .dd-p3 .dd-p3-right span{
		position: absolute;
		right: 0;
		bottom: 0.3rem;
		color: #333
	}
	.z_myService_box{
		width: 95%;
	}
	.z_myService_peo1 {
	    width: 90%;
	     height: 0.5rem;
	    line-height: 0.5rem;
	    background: none;
	    font-size: .20rem;
	    color: #333;
	}
	.z_myService_peo1_1 {
	    margin-left: .55rem;
	}
	.z_myService_peo1 .z_myService_peo1_1 .z_myService_peo1_2 {
	    color: #999;
	}
	.z_myService_peo2 {
	    width: 90%;
	   
	    background: none;
	    margin-top: .1rem;
	    font-size: .20rem;
	    color: #333;
	}
	.z_myService_peo2 .z_myService_peo1_2 {
	    margin-left: .55rem;
	}
	.order-bottom{
		width: 100%;
		padding: 0.1rem 0;
		border-bottom: 0.15rem solid #f5f5f5;
	}
	.del-order p{
		background: #ff5454;
		color: #fff;
	}
	.post-talk p{
		background: #64b450;
		color: #fff;
	}
	.order-bottom p{
		float: right;
		margin-right: 0.1rem;
		padding: 0.1rem;
		width: 1.5rem;
		font-size: 0.23rem;
		border: 1px solid #999;
		border-radius: 3px;
		text-align: center;
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
		display: flex;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.myOrdersTab li{
		flex: 1;
		text-align: center;
	}
	.active{
		color: #64b450;
		border-bottom: 1px solid #64b450;
	}
	.unactive{
		color: #666;
		border:none;
	}
</style>