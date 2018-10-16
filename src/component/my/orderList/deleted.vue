<template>
<section id="orderList">
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<!--点击删除时的弹出框-->
		<div class="popupBox" v-if="sure" @touchmove.prevent>
			<div class="popup">
				<div class="imgBox">
					<img src="../../../assets/image/my/red-gantanhao.png"/>
				</div>
				<p>您确定要删除该服务订单吗</p>
				<div class="bottom_box">
					<span @click="close()">考虑一下</span>
					<i @click="delOrder()">确定</i>
					<em></em>
				</div>
			</div>
		</div>
		<!--点击取消时的弹出框-->
		<div class="popupBox" v-if="isCancle" @touchmove.prevent>
			<div class="popup2">
				<div class="imgBox">
					<img src="../../../assets/image/my/red-gantanhao.png"/>
				</div>
				<p>预约类服务每天累计只能取消3次，超过3次当日不能继续预约！</p>
				<div class="bottom_box2">
					<span @click="cancleClose()">考虑一下</span>
					<em class="boxem" @click="showMessage">取消须知</em>
					<i @click="isCancleOrder()">确定</i>
				</div>
			</div>
		</div>
		<div class="show-cancle-message" v-if="showCancle">
			<div class="show-cancle-message-header">
				<b @click="closeMessage">
					<img src="../../../assets/image/head-back.png" alt="返回图标">
				</b>
				<h2>服务须知与保障</h2>
			</div>
			<div class="show-cancle-message-main">
				<img src="../../../assets/image/my/1.png" />
				<img src="../../../assets/image/my/2.png" />
				<img src="../../../assets/image/my/3.png" />
				<img src="../../../assets/image/my/4.png" />
			</div>
		</div>
		<!--确定取消原因的弹出框-->
		<div class="reason-mask" v-if="reason" @touchmove.prevent>
			<div class="cancle-reason">
				<div class="reason-title">
					<div class="reason-title-main">
						<span>请选择取消原因(必选)</span>
						<i @click="closeReason"><img src="../../../assets/image/server/close_img.png"/></i>
					</div>
				</div>
				<div class="reason-main" style="line-height: 0.7rem;">
					<div class="reason" v-for="(item,index) in reasonTxt" @click="choiceReason(index,item)" v-bind:class="{'blue': isActive == index}">
						<!--<img :src='src' style="float:left;width: 0.3rem;height: 0.3rem;margin-top: 0.2rem;margin-left: 0.2rem;"/>-->
						<i class="isreason"></i>
						<span style="float: left;margin-left: 0.2rem;color: #999;">
							{{item.txt}}
						</span>
					</div>
					<input id="reasonSelf" class="reason-other" type="text" v-model="reasonSelf" placeholder="请输入取消原因" disabled/>
				</div>
				<div class="reason-bottom" @click="cancleOrder">
					<p>确认提交</p>
				</div>
			</div>
		</div>
	<noBata v-if="order ==''"></noBata>
	<scroller :style="{ top:activeTop }"
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if="order!=''"
	>
	<div class="O-container">
		<div class="li_box" v-for="(item,index) in order">
			<div class="O-content" >
				<div class="order-title">
					<router-link :to="'/my/orderCode/' + item.orderId +'/'+item.orderCode + '/' +item.orderState" class="codeDetail">
						<p class="order-title-num">
							<span class="txt">订单单号:&nbsp;</span>
							<span class="num">{{item.orderCode}}</span>
						</p>
						<p class="order-title-type" v-if="item.orderState == 0&&timeOverState==false">
							待付款
						</p>
						<p class="order-title-type" v-if="item.orderState ==3">
							待确认
						</p>
						<p class="order-title-type" v-if="item.orderState ==4">
							已确认
						</p>
						<p class="order-title-type" v-if="item.orderState == 2" @click="open(item.orderId)">
							<i></i>
						</p>
						<p class="order-title-type" v-if="item.orderState == 6">
							已取消
						</p>
						<p class="order-title-type" v-if="item.orderState == 0&&timeOverState">
							已取消
						</p>
					</router-link>	
				</div>
				<div class="order-content">
					<router-link :to="'/my/orderDetail/'+item.orderId" class="content1">
						<dt :style="{backgroundImage:'url('+ item.imgUrl +')'}"><!--<img :src="item.imgUrl"/>--></dt>
						<dd>
							<p class="dd-p dd-p1">{{item.serviceName}}</p>
							<p class="dd-p dd-p2">由<span>{{item.eaName}}</span>提供服务</p>
							<div class="dd-p dd-p3">
								<p class="dd-p3-left"><img src="../../../assets/image/my/serviceWay.png"/><span>{{item.serviceComponent?item.serviceComponent:item.serviceWay}}</span></p>
								<p class="dd-p3-left" v-if="item.serviceTime"><img src="../../../assets/image/my/serviceTime.png" style="width: 0.32rem;"/><span>{{item.serviceTime}}分钟</span></p>
								<p class="dd-p3-right"><span>￥{{item.payMoney | doubleZero}}</span></p>
							</div>
						</dd>
					</router-link>
					<div class="z_myService_box">
						<div class="z_myService_peo1">服务专家
							<span class="z_myService_peo1_1">{{item.serviceDocName}}
								<span class="z_myService_peo1_2" style="margin-left:0.1rem;">{{item.proTitle.split(',')[0]}}</span>
							</span>
						</div>
						<div class="z_myService_peo2" v-if="item.reservationMode == 3">服务时间
							<span class="z_myService_peo1_2">{{item.timeScopeStr | substring(0,4)}}-{{item.timeScopeStr | substring(5,7)}}-{{item.timeScopeStr | substring(8,10)}}&nbsp;{{item.timeScope == "08:00" ? '上午' : '下午' }}</span>
						</div>
						<div class="z_myService_peo2" v-else-if="item.timeScopeStr">服务时间
							<span class="z_myService_peo1_2">{{item.timeScopeStr | substring(0,4)}}-{{item.timeScopeStr | substring(5,7)}}-{{item.timeScopeStr | substring(8,10)}}&nbsp;{{item.timeScope}}</span>
						</div>
					</div>
				</div>
				<div class="order-bottom" v-if="item.orderState == 3">
					<p @click="cancle(item.orderId,item.serviceReservation)">取消服务</p>
				</div>
				<div v-if="item.orderState == 4&&item.serviceComponent !='图文服务'" style="height: 0.2rem; width: 100%;">
					
				</div>
				<div class="order-bottom" v-show="item.orderState == 4&&item.serviceComponent == '图文服务'">
					<router-link :to="'/my/myConsult/consultDetail/' +item.QId" class="zixun" style="background: #009983;color: #fff;border: none;">立即咨询</router-link>
				</div>
				<div class="order-bottom" v-if="item.orderState == 0&&timeOver" style="width: 95%;margin: 0 auto;">
					<i v-if="timeOver" style="font-size:0.24rem;display: inline-block;height: 0.8rem; line-height: 0.8rem;margin-top: -0.1rem;color: #ff5454;" id="timer1">
						<!--{{ countDown(time) }} -->
					 </i>
					<p v-if="timeOver" @click="goPay" style="background: #ff5454;border: 1px solid #ff5454;color: #fff;margin-right: 0;">支付</p>
					<p v-if="timeOver" @click="cancle(item.orderId,item.serviceReservation)">取消服务</p>
				</div>
				<div class="order-bottom del-order" v-if="item.orderState == 0&&timeOverDel">
					<p @click="open(item.orderId)">删除</p>
				</div>
				<div class="order-bottom del-order" v-if="item.orderState == 6">
					<p @click="open(item.orderId)">删除</p>
					<router-link class="buy-again" :to='({path:"myServerDetail",query:{id:item.serviceDictId,type:(item.serviceReservation==true?"1":"0"),docuserId:item.docId,serviceId:(item.serviceId == null ? item.serviceDictId : item.serviceId),money:Number(item.payMoney).toFixed(2)}})'>再次购买</router-link>
				</div>		
				<div class="order-bottom post-talk" v-if="item.orderState == 2"><!--已完成底部样式-->
					<div v-if="item.startLevel == 4" class="starBox">
						<span>已评价</span>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
					</div>
			
					<div v-if="item.startLevel == 1" class="starBox">
						<span>已评价</span>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 2" class="starBox">
						<span>已评价</span>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 3" class="starBox">
						<span>已评价</span>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 5" class="starBox">
						<span>已评价</span>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../../assets/image/my/red_star.png"/>
						</i>
					</div>
					<p v-if="item.startLevel ==''" @click="toAssess(item)">发表评价</p>
				</div>	
				
			</div>
		</div>
	</div>
	</scroller>
</section>
</template>

<script>
	import $ from 'jquery'
	import noBata from '../../common/noBata.vue'
	import Loading from '../../common/loading.vue'
	import errorPopup from '../../common/error-popup.vue'
	import sucPopup from '../../common/suc-popup.vue'
	import makeSure from '../../common/makeSure.vue'
	export default {
		props: {
			hasError:""
		},
		data () {
			return {
				titleName:"服务订单",
				page:1,
				rows:8,
				order: "",
				orderId:"",
				sure:false,
				isCancle:false,
				isLoading:true,
				nohead2:"nohead2",
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				showCancle:false,
				time:'',
				txt:"",
				timer:"",
				timeOverState:false,
				timeOver:true,
				timeOverDel:false,
				reason:false,
				reasonTxt:[
					{txt: '不想买了'},
					{txt: '价格较贵'},
					{txt: '重复下单'}, 
					{txt: '订单无法支付'},
					{txt: '预约时间有误'},
					{txt: '其他原因'}
				],
				isActive:9,
				reasonSelf:"",
				remark:"",
				src:'../src/assets/image/server/pay-cancel.png',
				activeTop: "1.64rem",
			}
		},
		mounted() {
			this.serverList();
		},
		destroyed(){
			clearInterval( this.timer );
		},
		components:{
			errorPopup,
			sucPopup,
			makeSure,
			Loading,
			noBata
		},
		methods: {
//			A () {
//		        let that = this;
//		        setInterval(function(){ 
//		            that.B();
//		        },1000)
//		    },
//		    B () {
//		    	this.time--;
//		    	console.log(this.time)
//		    	if(this.time>0){
//		    		
//		    	}
//		    	
//		    },
			countDown () { 
				var that = this;
				var maxtime = this.time;
				clearInterval( that.timer );
				if(maxtime>0){
					that.timer = setInterval(function() {  
				        if(maxtime>=0){   
				       		//console.log(maxtime)
				            let minutes = Math.floor(maxtime/60-1);     
				            let seconds = Math.floor(maxtime%60);
				            if(minutes<10){
				            	minutes = '0'+minutes
				            }
				            if(seconds<10){
				            	seconds = '0'+seconds
				            }
				            if(minutes<0){
				            	minutes = minutes
				            }
				            let msg = minutes+"分"+seconds+"秒后自动取消";     
				            //if(maxtime == 5*60) alert('注意，还有5分钟!');     
				            --maxtime;
				            document.getElementById('timer1').innerHTML = msg;
				            let tip = "<1分钟后自动取消"
				            if((minutes == '00')||minutes == '0-1'){
				            	
				             	document.getElementById('timer1').innerHTML = tip;
				            }
				            if(minutes == '0-1'&&seconds=='00' ){
//				            	console.log(maxtime)
				            	that.timeOverState=true;
								that.timeOver=false;
								that.timeOverDel=true;
//					        	console.log('可以执行吗？');
					        	//document.getElementById('timer1').innerHTML = '测试';
					            that.serverList();
				            }
				        }
				    }, 1000);  
				}
			   
			},
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1500);  
			},
			showMessage(){
				this.showCancle = true
			},
			closeMessage(){
				this.showCancle = false
			},
			serverList () {
				clearInterval( this.timer );
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page: this.page,
					rows: this.rows,
					orderState: 6,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data},{emulateJSON:true}).then( response => {
					this.order = response.body.rows;
					this.loadingClose()
					var that = this;
					let timeBox = [];
					for(let i in this.order){
						timeBox[i] = Number(that.order[i].remainderTime);
					}
					//console.log(timeBox)
					this.time = Number(timeBox[0]+60);
					if(this.order[0].orderState == 0){
						this.countDown();
					}
					
				})
			},
			
			overTime(){
				
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 8;
					this.serverList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page: this.page,
					rows: this.rows+8,
					orderState: 6,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data},{emulateJSON:true}).then( response => {
						if (this.rows >= response.body.rows.length) {
				          setTimeout(() => {
				            done(true)
				          }, 1500)
				          return;
				        }
						setTimeout(() => {
							this.order = response.body.rows;
							done();					
						}, 1500)
						this.rows+=8;
				})
			},
			//操作成功提示
			sucMake(){
				let time = setTimeout(()=>{
					if( this.sucShow ==  true){
                		this.sucShow = false;
                	} 
                },1000);  
			},
			clearStorage () {
				if( this.sure ==  true){
            		this.sure = false;
            	} 
            	if( this.isCancle ==  true){
            		this.isCancle = false;
            	}
			},
			clearReason(){
				if( this.reason ==  true){
            		this.reason = false;
            	}
			},
			//考虑一下
			close(){
				this.sure = false;
			},
			//弹出框
			open(orderId){
				this.sure = true;
				this.orderId = orderId;
			},
			//取消按钮点击事件
			cancle(orderId,serviceReservation){
				if( serviceReservation == 0 ){
					this.reason =true;
					this.orderId = orderId;
				}else {
					this.isCancle = true;
					this.orderId = orderId;
				}
			},
			cancleClose(){
				this.isCancle = false;
			},
			//删除订单
			delOrder(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					orderId: this.orderId,
					delState: 1,
				});
				let that = this;
				that.clearStorage();
				that.isLoading = true;
				
				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660091, jsonValue:data},{emulateJSON:true}).then( response => {
					that.loadingClose();
					that.sucShow = true;
					that.sucMessage = '删除成功'
					that.sucMake();
					
					that.serverList()
				})
			},
			isCancleOrder(){
				this.reason =true;
				this.clearStorage();
			},
			//取消订单
			cancleOrder(){
				let that = this;
				if(that.reasonSelf !=''){
					that.remark = that.reasonSelf;
				}
				if(that.remark !=''){
					let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
						orderId: that.orderId,
						remark:that.remark
					});
					console.log(data)
					
					that.clearStorage();
					that.clearReason();
					that.isLoading = true;
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data},{emulateJSON:true}).then( response => {
						that.loadingClose();
						that.sucShow = true;
						that.sucMessage = '取消成功'
						that.sucMake();
						that.serverList()
					})
				}
				
			},
			//选择取消原因
			choiceReason(index,item){
				if(index == 5){
					this.isActive = index;
					document.getElementsByTagName('input')[0].disabled = false;
					var oInput = document.getElementById("reasonSelf");
					oInput.focus();
				}else{
					this.reasonSelf = ''
					document.getElementsByTagName('input')[0].disabled = true;
					this.isActive = index;
					this.remark = item.txt;
				}
				console.log(this.remark)
			},
			closeReason(){
				this.reason = false
			},
			//点击发表评论按钮
			toAssess(item){
				this.$router.push({ name: 'assess', params: { docPic: item.docPhotosmall,docName:item.serviceDocName,docUserId:item.serviceDictId,orderId:item.orderId }})
			},
			goPay(){//支付
				
			}
		}
	}
</script>

<style scoped>
	.reason-mask{/*取消原因*/
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.cancle-reason{
		width: 100%;
		background: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		font-size: 0.26rem;
	}
	.reason-title{
		height: 0.7rem;
		line-height: 0.7rem;
		padding: 0 0.2rem;
		position: relative;
	}
	.reason-title-main{
		border-bottom: 1px solid #E6E6E6;
	}
	.reason-title-main span{
		color: #333;
		float: left;
	}
	.reason-title-main i{
		float: right;
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		top: 0.1rem;
		right: 0.2rem;
	}
	.reason-title-main i img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.reason-other{
		margin-left: 0.7rem;
		width: 5.5rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border: 1px solid #e6e6e6;
		background: #f2f2f2;
		text-indent: 0.1rem;
	}
	.reason-bottom{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #009983;
		margin-top: 0.2rem;
	}
	.reason-bottom p{
		text-align: center;
		color: #fff;
		font-size: 0.3rem;
	}
	.reason i{
		float:left;
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		background: url(../../../assets/image/server/pay-cancel.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	.blue i{
		float:left;
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		background: url(../../../assets/image/server/pay-sure.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	.rightreason{
		float:left;
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		background: url(../../../assets/image/server/pay-sure.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	/*取消须知*/
	.show-cancle-message{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99999;
		width: 100%;
		height: 100%;
	}
	.show-cancle-message-header{
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	.show-cancle-message-header b {
		text-align: center;
		width: 0.8rem;
		height:0.84rem;
		position: absolute;
		left: 0px;
		top: 0;
	}
	.show-cancle-message-header img {
		width: 60%;
		margin-top: 24%;
		height: 60%;
	}
	.show-cancle-message-header h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 18px;
		color: #fff;
	}
	.show-cancle-message-main img{
		display: block;
		width: 100%;
	}
	.O-container{
		width: 100%;
		position: relative;	
	}
	.li_box{
		border-bottom: 0.15rem solid #f5f5f5;
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
		font-size: 0.2rem;
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
		color: #666;
		float: left;
		font-size: 0.26rem;
		display: inline-block;
	}
	.order-title-type{
		float: right;
		width: 1rem;
		text-align: right;
		color: #ff5454;
	}
	.order-title-type i{
		display: inline-block;
		background: url(../../../assets/image/my/laji.png) no-repeat bottom right;
		background-size: 0.3rem;
		margin-top: 0.25rem;
		margin-right: 0.2rem;
		width: 0.3rem;
		height: 0.3rem;
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
		border-bottom: 1px solid #e6e6e6;
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
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.order-content dd{
		float: left;
	}
	.dd-p {
		
		line-height: 0.3rem;
		margin: 0.1rem 0;
		width: 5rem;
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
	    margin-bottom: 0.1rem;
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
		height: 0.8rem;
	}
	.order-bottom span{
		display: inline-block;
		margin-left: 0.2rem;
		font-size: 0.22rem;
		line-height: 0.6rem;
		color: #999;
	}
	.del-order p{
		background: #ff5454;
		border:none !important;
		color: #fff;
	}
	.del-order .buy-again{
		background: #ff5454;
		border:none !important;
		color: #fff;
	}
	.post-talk p{
		background: #009983;
		border:none !important;
		color: #fff;
	}
	.order-bottom p{
		float: right;
		margin-right: 0.1rem;
		padding: 0.1rem;
		width: 1.5rem;
		font-size: 0.24rem;
		border: 1px solid #999;
		border-radius: 3px;
		text-align: center;
	}
	.order-bottom .buy-again{
		float: right;
		margin-right: 0.1rem;
		padding: 0.1rem;
		width: 1.5rem;
		font-size: 0.24rem;
		border: 1px solid #999;
		border-radius: 3px;
		text-align: center;
	}
	.order-bottom .zixun{
		float: right;
		margin-right: 0.1rem;
		padding: 0.1rem;
		width: 1.5rem;
		font-size: 0.24rem;
		border: 1px solid #999;
		border-radius: 3px;
		text-align: center;
	}
	.starBox{
		width: 3.5rem;
		display: inline-block;
	}
	.starBox span{
		display: inline-block;
		font-size: 0.2rem;
		margin-left: 0.3rem;
		height: 0.6rem;
		line-height: 0.6rem;
		color: #999;
		margin-right: 0.2rem;
	}
	.starBox i{
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		margin-top: 0.18rem;
	}
	.starBox i img{
		width: 100%;
		height: 100%;
	}
	/*.nodata{
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
	}*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popupBox .popup{
		color: #666;
		width: 90%;
		height: 3.35rem;
		position: absolute;
		top:20%;
		left: 5%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupBox .popup2{
		color: #666;
		width: 90%;
		height: 5.2rem;
		position: absolute;
		top:20%;
		left: 5%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupBox .popup .imgBox{
		width: 0.65rem;
		height: 0.65rem;
		position: absolute;
		top:2%;
		left: 45%;
		margin-left: 45%;
		margin:0.5rem 0 0.4rem;
	}
	.popupBox .popup2 .imgBox{
		width: 0.65rem;
		height: 0.65rem;
		position: absolute;
		top:2%;
		left: 45%;
		margin-left: 45%;
		margin:0.5rem 0 0.4rem;
	}
	img{
		width: 100%;
		height: 100%;
	}
	.popupBox .popup p{
		padding: 0 0.5rem;
		margin-top: 1.65rem;
		text-align: center;
		line-height: 0.35rem;
		margin-bottom: 0.4rem;
	}
	.popupBox .popup2 p{
		padding: 0 0.5rem;
		margin-top: 1.65rem;
		text-align: center;
		line-height: 0.35rem;
		margin-bottom: 0.4rem;
	}
	.bottom_box{
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.bottom_box span{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #ff5454;
	}
	.bottom_box i{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box em{
		height: 0.5rem;
		width: 1px;
		background: #e6e6e6;
		position: absolute;
		top: 0.25rem;
		left: 50%;
	}
	.bottom_box2{
		border-top: 1px solid #e6e6e6;
	}
	.bottom_box2 span{
		display: block;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		border-bottom: 1px solid #e6e6e6;
	}
	.bottom_box2 .boxem{
		display: block;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		color: #666;
		border-bottom: 1px solid #e6e6e6;
	}
	.bottom_box2 i{
		display: block;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		color: #f59645;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>