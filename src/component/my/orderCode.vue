<template>
<section id="orderCode">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<div class="OC-container">
		<div class="codeDetail">订单编号:{{orderCode=='null'?'':orderCode}}
			<span v-if="orderState==2">已完成</span>
			<span v-if="orderState==6">已取消</span>
			<span v-if="orderState==0">待付款</span>
			<span v-if="orderState==3">待接单</span>
			<span v-if="orderState==4">待服务</span>
			<span v-if="orderState==7">待确认</span>
			<span v-if="orderState==8">处理中</span>
		</div>
		<div class="line"></div>
		<ul class="timeLists">
			<li class="timeItem" v-for="(item,index) in order">
				<div class="listLeft"><!--时间线-->
					<div class="stepIco1" v-if="index == 0">
						<div class="stepIco1-circle">
						</div>
					</div>
					<div class="stepIco" v-if="index != 0">
					</div>
					<div class="shuLine" >	
					</div>
				</div>
				<div class="list">
					<div>
						<p class="serverType" :class="{zero:index==0}" style="float: left;">{{item.flowContent}}</p>
						<p class="typeTime" :class="{zero:index==0}" style="float: right;">{{item.createTime.substring(0,10)}}<span></span>{{item.createTime.substring(11)}}</p>
					</div>
					<div class="is-custom" style="color: #ff5454;font-size: 0.2rem;">
						{{item.remark}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				titleName:"订单记录",
				orderType:"",
				isLoading:true,
				nohead:"nohead",
				orderId:this.$route.params.orderId,
				orderCode:this.$route.params.orderCode,
				orderState:this.$route.params.orderState,
				order: [],
			}
		},
		mounted: function() {
			this.initOrderTime()
		},
		components:{
			Heads,Loading
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
	　　　　initOrderTime(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				
				let data = JSON.stringify({
					orderId: this.orderId,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660089, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					let list = response.body.rows.reverse();
					
					this.loadingClose();
					/*for(let i in list){
						if(list[i].flowState == 0){
							let obj = {};
							obj.flowContent = "订单已提交";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 3){
							let obj = {};
							obj.flowContent = "支付成功";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 4){
							let obj = {};
							obj.flowContent = "服务已接单";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 14){
							let obj = {};
							obj.flowContent = "开始服务";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 13){
							let obj = {};
							obj.flowContent = "发起完成确认";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 12){
							let obj = {};
							obj.flowContent = "客户投诉";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 2){
							let obj = {};
							obj.flowContent = "客户/系统已确认";
							obj.time = list[i].createTime;
							obj.remark = list[i].remark;
							this.order.push(obj);
						}
						if(list[i].flowState == 6){
							let obj = {};
							obj.flowContent = "服务取消";
							obj.time = list[i].createTime;
							obj.remark = list[i].remark;
							this.order.push(obj);
						}
						if(list[i].flowState == 17){
							let obj = {};
							obj.flowContent = "退款处理中";
							obj.time = list[i].createTime;
							obj.remark = list[i].remark;
							this.order.push(obj);
						}
						if(list[i].flowState == 18){
							let obj = {};
							obj.flowContent = "退款已完成";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
						if(list[i].flowState == 99){
							let obj = {};
							obj.flowContent = "订单已完成";
							obj.time = list[i].createTime;
							this.order.push(obj);
						}
					}*/
					this.order = response.body.rows.reverse() ;
					console.log(this.order)
				})
			}
		}
	}
</script>

<style scoped>
	#orderCode{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.OC-container{
		padding-top: .84rem;
	}
	.codeDetail{
		padding: 0 0.2rem;
		line-height: 0.84rem;
		height: 0.84rem;
		color: #666;
	}
	.codeDetail span{
		display: block;
		float: right;
		color: #ff5454;
	}
	.line{
		background: #F2F2F2;
		height: 0.15rem;
	}
	.timeLists{
		padding: 0 0.3rem;
		padding-left: 1.2rem;
	}
	.timeItem{
		padding: 0.3rem 0;
		border-bottom: 1px solid #F2F2F2;
		position: relative;
	}
	.list p{
		font-size: 0.24rem;
		height: 0.24rem;
		line-height: 0.24rem;
		color: #999;
	}
	.serverType{
		margin-bottom: 0.15rem;
	}
	.list .typeTime{
		color: #adadad;
		font-size: 0.2rem;
	}
	.typeTime span{
		margin-left: 0.1rem;
	}
	.stepIco1{
		position: absolute;
		top: 0.3rem;
		left: -0.78rem;
		border-radius: 50%;
	    -moz-border-radius: 50%;
	    -webkit-border-radius: 50%;
	    background: #FFFFFF;
	    z-index: 2;
	    border: 2px solid #79ba6a;
	    width: 16px;
	    height: 16px;
	    text-align: center;
	}
	.stepIco1-circle{
		height: 10px;
		width: 10px;
		position: absolute;
		margin:0 auto;
		left: 2px;
		top:2px;
		margin-left: -0.025rem;
		margin-top: -0.025rem;
		background: #79ba6a;
		border-radius: 50%;
	    -moz-border-radius: 50%;
	    -webkit-border-radius: 50%;
	}
	.stepIco{
		position: absolute;
		top: 0.3rem;
		left: -0.7rem;
		border-radius: 50%;
	    -moz-border-radius: 50%;
	    -webkit-border-radius: 50%;
	    background: #ccc;
	    width: 10px;
	    height: 10px;
	}
	.list .zero{
		color:#009983;
	}
	.shuLine{
		position: absolute;
		left:-0.614rem;
		top: 0.5rem;
		width: 1px;
		background: #ccc;
		height: 1.2rem;
	}
	li:last-child .listLeft .shuLine{
		height: 0;
	}
	li:nth-last-child(2) .listLeft .shuLine{
		height: 1.01rem;
	}
	li:first-child .listLeft .shuLine{
		top:0.54rem
	}
	.loadTop {
		background: #fff !important;
		z-index: 8;
	}
</style>