<template>
<section id="orderDetail">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<div class="OD-container">
		<!--点击删除时的弹出框-->
		<div class="popupBox" v-if="sure">
			<div class="popup">
				<div class="imgBox">
					<img src="../../assets/image/my/red-gantanhao.png"/>
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
					<img src="../../assets/image/my/red-gantanhao.png"/>
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
					<img src="../../assets/image/head-back.png" alt="返回图标">
				</b>
				<h2>服务须知与保障</h2>
			</div>
			<div class="show-cancle-message-main">
				<img src="../../assets/image/my/1.png" />
				<img src="../../assets/image/my/2.png" />
				<img src="../../assets/image/my/3.png" />
				<img src="../../assets/image/my/4.png" />
			</div>
		</div>
		<!--退款金额的页面-->
		<div class="show-cancle-message" style="background: #eee;" v-if="showBackMoney">
			<div class="show-cancle-message-header">
				<b @click="closeMessage">
					<img src="../../assets/image/head-back.png" alt="返回图标">
				</b>
				<h2>取消订单</h2>
			</div>
			<div class="show-cancle-message-main" style="background: #fff;">
				<div class="order-pay">
					<p class="order-pay-title"><!--根据<span style="color: #f59645;">退款规则</span>，-->本次为您退款</p>
					<h2 class="order-pay-price">¥<span>{{backMoney}}</span><em style="font-size: 0.22rem;">元</em></h2>
				</div>
				<div class="back-gray">请选择您的退款账号</div>
				<div class="order-pay-method">
					<div class="pay-method clearfix" :class="[{isClick:isClick == index},list.className]" @click="tabMthods(index)"  v-for="(list,index) in lists">
						<p>{{ list.name }}</p>
						<span></span>
					</div>
					<div class="pay-method-aPay" v-if="aPay">
						<div class="aPay-num">
							<span>支付宝账号</span>
							<input type="text" placeholder="请输入收款人的支付宝账号" v-model="accoutName"/>
						</div>
						<div class="aPay-name">
							<span>真实姓名</span>
							<input type="text" placeholder="请输入收款人真实姓名" v-model="aPayUserName"/>
						</div>
					</div>
				</div>
				<div class="back-gray" style="text-align: center;color: #999;">因账号输入错误造成资金损失需自行承担，请确认</div>
				<div class="pay-sure" @click="backPayMoney()">
					<a href="javascript:;">确认</a>
				</div>
			</div>
		</div>
		<!--确定取消原因的弹出框-->
		<div class="reason-mask" v-if="reason" @touchmove.prevent>
			<div class="cancle-reason">
				<div class="reason-title">
					<div class="reason-title-main">
						<span>请选择取消原因(必选)</span>
						<i @click="closeReason"><img src="../../assets/image/server/close_img.png"/></i>
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
		<!--主页面内容-->
		<div class="order-title white">
			<!--<p class="order-title-num">
				<span class="txt">订单单号:&nbsp;</span>
				<span class="num">{{order.orderCode}}</span>
			</p>-->
			<i class="laji" v-if="order.orderState==2" @click="open(order.orderId)" :style="{ top:activeTop }"></i>
			<router-link :to="'/my/orderCode/' + order.orderId +'/'+order.orderCode + '/' +order.orderState" class="codeDetail">订单状态
				<span v-if="order.orderState==2">已完成</span>
				<span v-if="order.orderState==6">已取消</span>
				<span v-if="order.orderState==0&&timeOverState==false">待付款</span>
				<span v-if="order.orderState==4">待服务</span>
				<span v-if="order.orderState==3">待接单</span>
				<span v-if="order.orderState==7">待确认</span>
			</router-link>
		</div>
		<div class="custom white" style="line-height: 0.4rem;">
			<p>
				<span class="txt">订单编号</span>
				<span class="num">{{order.orderCode}}</span>
			</p>
			<p>
				<span class="txt">下单时间</span>
				<span class="num">{{order.createTime?(order.createTime.substring(0,10)):''}}
					&nbsp;{{order.createTime?(order.createTime.substring(11,16)):''}}</span>
			</p>
			<p v-if="order.reservationMode == 3">
				<span class="txt">预约时间</span>
				<span class="num" style="color: #ff5454!important;">{{order.timeScopeStr?(order.timeScopeStr.substring(0,4)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(5,7)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(8,10)):''}}
					&nbsp;{{order.timeScope == "08:00" ? '上午' : '下午' }}</span>
			</p>
			<p v-else-if=" order.reservationMode == 1 ">
				<span class="txt">预约时间</span>
				<span class="num" style="color: #ff5454!important;">{{order.timeScopeStr?(order.timeScopeStr.substring(0,4)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(5,7)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(8,10)):''}}
					&nbsp;{{order.timeScope}}</span>
			</p>
			<p v-else-if="order.timeScopeStr" >
				<span class="txt">预约时间</span>
				<span class="num" style="color: #ff5454!important;">{{order.timeScopeStr?(order.timeScopeStr.substring(0,4)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(5,7)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(8,10)):''}}
					&nbsp;{{order.timeScope > "12:00" ? "下午" : "上午"}}</span>
			</p>
			
			<p v-if="order.serviceWay =='上门服务'">
				<span class="txt">服务地址</span>
				<span class="num">{{order.customerAddress}}</span>
			</p>
			<p>
				<span class="txt">联系方式</span>
				<span style="margin-right: 0.2rem;">{{order.customerName}}</span><i>{{order.customerMobile}}</i>
				<span style="margin-right: 0.2rem;" v-if="order.customerMaritalState == 1 && order.customerMaritalState">未婚</span>
				<span style="margin-right: 0.2rem;" v-else-if="order.customerMaritalState == 2 && order.customerMaritalState">已婚</span>
				<span style="margin-right: 0.2rem;"v-else-if="order.customerMaritalState == 3 && order.customerMaritalState">丧偶</span>
				<span style="margin-right: 0.2rem;" v-else-if="order.customerMaritalState == 4 && order.customerMaritalState">离婚</span>
				<span style="margin-right: 0.2rem;" v-else-if="order.customerMaritalState == 5 && order.customerMaritalState">其他</span>
			</p>
			<p v-if="order.customerCartNo">
				<span class="txt">身份证号</span>
				<span style="margin-right: 0.2rem;">{{order.customerCartNo}}</span>
			</p>
			
			<p v-if="order.customerMailAddress">
				<span class="txt">报告领取</span>
				<span style="margin-right: 0.2rem;">{{order.customerMailAddress}}</span>
			</p>
			
		</div>
		<div class="order-content white">
			<dl @click="goServerDetail(order.serviceDictId,order.serviceReservation)">
				<dt :style="{backgroundImage:'url('+ order.imgUrl +')'}"><!--<img :src="item.imgUrl"/>--></dt>
				<dd>
					<p class="dd-p dd-p1">{{order.serviceName}}</p>
					<p class="dd-p dd-p2">由<span>{{order.eaName}}</span>提供服务</p>
					<div class="dd-p dd-p3">
						<p class="dd-p3-left">
							<i class="serviceWay-img">
								<img src="../../assets/image/my/serviceWay.png"/>
							</i>
							<span class="serviceWay-txt">{{order.serviceComponent?order.serviceComponent:order.serviceWay}}</span>
						</p>
						<p class="dd-p3-left" v-if="order.serviceTime">
							<i class="serviceTime-img">
								<img src="../../assets/image/my/serviceTime.png"/>
							</i>
							<span>{{order.serviceTime}}分钟</span>
						</p>
						<p class="dd-p3-right"><span>￥{{order.servicePayMoney?(Number(order.servicePayMoney).toFixed(2)):"0.00"}}</span></p>
					</div>
				</dd>
			</dl>
			<div class="order-cost" v-if="order.serviceItemList != ''">
				<ul>
					<li v-if="order.serviceMoney">
						<span class="order-cost-name">基础服务费</span>
						<span class="order-cost-line" style='border-bottom: 1px dashed #333;-webkit-box-flex:500 !important;'></span>
						<span class="order-cost-money">￥{{ order.serviceMoney | LegalNumber }}</span>
					</li>
					<li v-for="cost in order.serviceItemList">
						<span class="order-cost-name">{{ cost.serviceDictItemName }}</span>
						<span class="order-cost-line" style='border-bottom: 1px dashed #333;-webkit-box-flex:500 !important;'></span>
						<span class="order-cost-money">￥{{ cost.serviceItemMoney | LegalNumber }}</span>
					</li>
					</li>
				</ul>
			</div>
			<div class="doc-content">
				<!--<p class="serverDocs">
					<span>服务专家</span><i>{{order.serviceDocName}}</i><em>{{order.proTitle?order.proTitle.split(",")[0]:""}}</em>
				</p>-->
				<!-- <p class="serverAddress" v-if="order.serviceDocName == null">
					<span class="timeTxt">预约专家</span>
					<i class="timeTxt">
						<b style="color: #ff5454!important;">{{order.additionDocName}}</b>
						<b>{{order.additionDepartment}}</b>
						<b>{{order.additionProTitle}}</b>
					</i>
					<em>{{order.proTitle?order.proTitle.split(",")[0]:""}}</em>
				</p> -->
				<p class="serverAddress" v-if="order.reservationMode == 2">
					<span class="timeTxt" style='width:100%; color:#ff5454 !important;'>预约{{ order.reserveInfo }}</span>
					<!--<i class="timeTxt" style="color: #ff5454!important;">
						{{order.additionDocName}}
					</i>
					<em>{{order.additionDepartment}}</em>
					<em>{{order.additionProTitle}}</em>-->
				</p>
				<p class="serverAddress" v-if="!isServer">
					<span class="timeTxt">服务人员</span>
					<i class="timeTxt" style="color: #ff5454!important;">
						{{order.serviceDocName}}
					</i>
					<em>{{order.proTitle?order.proTitle.split(",")[0]:""}}</em>
				</p>
				<p class="serverAddress" v-if="isServer" @click="goDoc(order.serviceUserId)">
					<span class="timeTxt">服务专家</span>
					<i class="timeTxt" style="color: #ff5454!important;">
						{{order.serviceDocName}}
					</i>
					<em>{{order.proTitle?order.proTitle.split(",")[0]:""}}</em>
				</p>
				<!--<p class="serverTime" v-if="order.timeScopeStr">
					<span class="timeTxt">服务时间</span>
					<i class="timeNum">
						{{order.timeScopeStr?(order.timeScopeStr.substring(0,4)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(5,7)):''}}-{{order.timeScopeStr?(order.timeScopeStr.substring(8,10)):''}}
						&nbsp;{{order.timeScope}}
					</i>
				</p>-->
				<p class="serverdizhi" v-if="order.serviceWay =='门诊(店)服务' || order.serviceWay =='综合服务'" @click="goMap">
					<span class="timeTxt" style="float: left;">服务地址</span>
					<i class="timeTxt" style="text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 5rem;">
						{{order.address}}
					</i>
				</p>
				<p class="serverTime miaoshuBox"  v-if="order.contentStr" @click="toHealthy(order)">
					<span class="timeTxt miaoshu1" v-if="order.serviceComponent =='图文服务'">健康现状描述</span>
					<span class="timeTxt miaoshu1" v-else style="">备注</span>
					<em class="miaoshu2" v-if="order.serviceComponent =='图文服务'" style="width: 5rem;">{{order.contentStr}}</em>
					<em class="miaoshu2" v-else style="width: 5.6rem;">{{order.contentStr}}</em>
				</p>
			</div>
			
		</div>
		<div class="payType" style="background:#fff;">
			<p style="border-bottom: 1px solid #e6e6e6;">
				<span>支付方式</span><em>{{order.inOutType==0?"在线支付":"线下支付"}}</em>
			</p>
		</div>
		<div class="payMoney">
			<div class="payMoney-line">
				<div>
					<span>服务总额</span>          
					<span class="order_ly">订单<span class="orderMoney_ly">￥<span>{{order.totalServiceMoney?Number(order.totalServiceMoney).toFixed(2):"0.00" }}</span></span>
					</span>
				</div>
				<div v-if="Number(order.eaCouponMoney) + Number(order.platCouponMoney) != 0">
					<span>优惠卷</span>          
					<span class="order_ly"><span class="orderMoney_ly">-￥<span>{{(Number(order.eaCouponMoney) + Number(order.platCouponMoney)).toFixed(2)}}</span></span>
					</span>
				</div>
				<div v-if="order.deductAmountUseBean != 0">
					<span>健康豆</span>          
					<span class="order_ly"><span class="orderMoney_ly">-￥<span>{{Number(order.deductAmountUseBean).toFixed(2) }}</span></span>
					</span>
				</div>
	        </div>
			 
	        <p class="truePay_ly trueMoney_ly">实付：<span style="font-weight:bold;">￥{{order.payMoney?Number(order.payMoney).toFixed(2):"0.00"}}</span></p>
			   
            <!--<p class="orderTime_ly">下单时间：
            	<span id="service_detail_orderTime">{{order.createTime?(order.createTime.replace('T',' ')):""}}
            		<span style="margin-left:0.1rem;"></span>
            	</span>-->
            </p>
        	
		</div>
		<div class="pinlvBox" v-show="order.orderState == 3" style="margin-top: 0.15rem;">
			<span class="quxiao" @click="cancle(order.orderId,order.eaId,order.serviceReservation)">取消服务</span>
		</div>
		<div class="pinlvBox" v-show="order.orderState == 4&&order.startTime ==''&&order.serviceComponent !='图文服务'" style="margin-top: 0.15rem;">
			<span class="quxiao" @click="cancle(order.orderId,order.eaId,order.serviceReservation)">取消服务</span>
		</div>
		<div class="white-black" v-if="order.orderState == 4&&order.serviceComponent !='图文服务'&&order.startTime !=''" style="height: 0.2rem; width: 100%;border-top: 1px solid #e6e6e6;background: #fff;">
		</div>
		<div class="order-bottom" v-show="order.orderState == 4&&order.serviceComponent == '图文服务'" style="height: 0.8rem;">
			<router-link :to="'/my/myConsult/consultDetail/' +order.QId" class="zixun" style="background: #009983;color: #fff;border: none;">立即咨询</router-link>
		</div>
		
		<div class="shanchu" v-show="order.orderState == 6" @click="open(order.orderId)">
			<router-link v-if="(order.orderState == 6||order.orderState == 2)&&!order.startLevel" class="buy-again" style="position: relative; z-index: 1;" :to='({path:"/my/myServerDetail",query:{id:order.serviceDictId,type:(order.serviceReservation==true?"1":"0"),docuserId:order.serviceUserId,serviceId:(order.serviceId == null ? order.serviceDictId : order.serviceId),money:Number(order.payMoney).toFixed(2)}})'>再次购买</router-link>
			<p>删除</p>
		</div>	
		<div class="pingjia shanchu" v-show="order.orderState == 2&&order.startLevel==''" @click="toAssess(order)">
			<router-link v-if="(order.orderState == 6||order.orderState == 2)&&!order.startLevel" class="beforeAss-buy-again" style="position: relative; z-index: 1;" :to='({path:"/my/myServerDetail",query:{id:order.serviceDictId,type:(order.serviceReservation==true?"1":"0"),docuserId:order.serviceUserId,serviceId:(order.serviceId == null ? order.serviceDictId : order.serviceId),money:Number(order.payMoney).toFixed(2)}})'>再次购买</router-link>
			<p>发表评价</p>
		</div>	
		<div class="order-bottom" v-if="order.orderState == 0&&timeOver" style="width: 100%;margin: 0 auto;">
			<i v-if="timeOver" style="font-size:0.24rem;display: inline-block;height: 0.8rem; line-height: 0.8rem;margin-top: -0.1rem;color: #ff5454;" id="timer1">
				<!--{{ countDown(time) }} -->
			 </i>
			<p v-if="timeOver" @click="" style="background: #ff5454;border: 1px solid #ff5454;color: #fff;margin-left: 0.1rem">支付</p>
			<p v-if="timeOver" @click="cancle(order.orderId,order.eaId,order.serviceReservation)">取消服务</p>
		</div>
		
		<div class="pinlvBox zixunBox" v-show="order.orderState == 2&&order.startLevel!=''">
			<router-link class="fin-buy-again" style="position: relative; z-index: 1;top: -0.3rem;right: 1.4rem;" :to='({path:"/my/myServerDetail",query:{id:order.serviceDictId,type:(order.serviceReservation==true?"1":"0"),docuserId:order.serviceUserId,serviceId:(order.serviceId == null ? order.serviceDictId : order.serviceId),money:Number(order.payMoney).toFixed(2)}})'>再次购买</router-link>
			<router-link :to="'/my/myConsult/consultDetail/' +order.QId" class="zixun" v-if = "order.QId">咨询详情</router-link>
			<div v-if="order.startLevel == 4" class="starBox">
				<span>已评价</span>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
			</div>
	
			<div v-if="order.startLevel == 1" class="starBox">
				<span>已评价</span>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
			</div>
			<div v-if="order.startLevel == 2" class="starBox">
				<span>已评价</span>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
			</div>
			<div v-if="order.startLevel == 3" class="starBox">
				<span>已评价</span>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/gray_star.png"/>
				</i>
			</div>
			<div v-if="order.startLevel == 5" class="starBox">
				<span>已评价</span>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
				<i>
					<img src="../../assets/image/my/red_star.png"/>
				</i>
			</div>
		</div>
		
					
        <!--<div class="order-bottom">
			<p>取消服务</p>
		</div>	-->
		
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				titleName:"订单详情",
				isServer:false,
				showBackMoney:false, //退款页面显隐
				backMoney:0.01,//退款金额
				isLoading:true,
				orderType:"",
				order: "",
				nohead:"nohead",
				white:"white",
				orderId:this.$route.params.orderId,
				eaId:'',
				sure:false,
				isCancle:false,
				detailObj:'',
				timeOver:true,
				time:"",
				timer:"",
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				timeOverState:false,
				showCancle:false,
				reason:false,
				showCancle:false,
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
				isClick:'',
				lists:[
					{
						name:"微信零钱",
						imgUrl:"./src/assets/image/server/pay-cancel.png",
						className:"pay-weixin"
					},
					{
						name:"支付宝余额",
						imgUrl:"./src/assets/image/server/pay-cancel.png",
						className:"pay-zhifubao"
					}
				],
				aPay:false,
				accoutName:'',
				aPayUserName:'',
				hasError:"",
				activeTop:""//iscroll
			}
		},
		mounted: function() {
			this.initOrderDetail()
			mui.previewImage().close();
		},
		watch:{
			
		},
		destroyed(){
			clearInterval( this.timer );
		},
		components:{
			Heads,Loading,errorPopup,sucPopup,
		},
		methods: {
			countDown () {     //倒计时
				var that = this;
				var maxtime = that.time;
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
				            let msg = minutes+"分"+seconds+"秒后订单自动取消";     
				            //if(maxtime == 5*60) alert('注意，还有5分钟!');     
				            --maxtime;
				            document.getElementById('timer1').innerHTML = msg;
				            let tip = "<1分钟后订单自动取消"
				            if((minutes == '00')||minutes == '0-1'){
				            	
				             	document.getElementById('timer1').innerHTML = tip;
				            }
				            if(minutes == '0-1'&&seconds=='00' ){
//				            	console.log(maxtime)
								that.timeOver=false;
								that.timeOverState=true;
//					        	console.log('可以执行吗？');
					        	//document.getElementById('timer1').innerHTML = '测试';
					            that.initOrderDetail();
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
                	if(this.errShow == true){
                		this.errShow = false;
                	}
                },1000);  
			},
			//操作成功提示
			sucMake(){
				let time = setTimeout(()=>{
					if( this.sucShow ==  true){
                		this.sucShow = false;
                	} 
                },1000);  
			},
			showMessage(){
				this.showCancle = true
			},
			closeMessage(){
				this.showCancle = false;
				this.showBackMoney = false;
				this.reason = false;
				this.remark = "";
				this.reasonSelf = "";
				this.isActive = 9;
				this.initOrderDetail();
			},
			isCancleOrder(){
				this.reason =true;
				this.isCancle = false;
				this.sure = false;
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
					let str = JSON.stringify({
						orderId: that.orderId
					});
					let data = JSON.stringify({
						orderId: that.orderId,
						remark:that.remark,
						refundSource: "WxPay",
						thirdSource: "az_1"
					});
					let data2 = JSON.stringify({
						orderId: that.orderId,
						remark:that.remark
					});
					that.clearStorage();
					that.clearReason();
					that.isLoading = true; //加载时的遮罩
					if(that.eaId == 0){//通过微信或支付宝付款
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660120, jsonValue:str},{emulateJSON:true}).then( response => {
							console.log(response);
							console.log(that.eaId)
							that.backMoney = response.body.refundMoney;
							if(response.body.refundType ==1){//全部退款
								that.isLoading = true;//加载时的遮罩
								that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data2},{emulateJSON:true}).then( response => {
									console.log(response)
									if(response.body.state == "suc" || response.body.state == "err_09"){
										that.sucMessage = '取消成功';
										that.loadingClose();
										that.sucShow = true;
										that.sucMake();
										that.initOrderDetail();
										that.remark = "";
										that.reasonSelf = "";
										that.isActive = 9;
									}else if(response.body.state == "err_04" ){
										that.errShow = true;
										that.message = "该订单不存在！";
										that.loadingClose();
									}else if( response.body.state == "err_-1" ){
										that.errShow = true;
										that.message = "该订单已取消！";
										that.loadingClose();
									}else if( response.body.state == "err_06" ){
										that.errShow = true;
										that.message = "订单编号不能为空！";
										that.loadingClose();
									}else if( response.body.state == "err_08" ){
										that.errShow = true;
										that.message = "登陆超时，请重新登陆！";
										that.loadingClose();
									}else if( response.body.state == "err_09" ){
										that.errShow = true;
										that.message = "系统操作异常！";
										that.loadingClose();
									}else{
										that.errShow = true;
										that.message = "取消订单失败！";
										that.loadingClose();
									}
								})
							}else{//部分退款
								that.isLoading = true;//加载时的遮罩
								that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data2},{emulateJSON:true}).then( response => {
									console.log(response)
									if(response.body.state == "suc" || response.body.state == "err_09"){
										that.sucMessage = '取消成功';
										that.loadingClose();
										that.sucShow = true;
										that.sucMake();
										that.initOrderDetail();
										that.remark = "";
										that.reasonSelf = "";
										that.isActive = 9;
									}else if(response.body.state == "err_04" ){
										that.errShow = true;
										that.message = "该订单不存在！";
										that.loadingClose();
									}else if( response.body.state == "err_-1" ){
										that.errShow = true;
										that.message = "该订单已取消！";
										that.loadingClose();
									}else if( response.body.state == "err_06" ){
										that.errShow = true;
										that.message = "订单编号不能为空！";
										that.loadingClose();
									}else if( response.body.state == "err_08" ){
										that.errShow = true;
										that.message = "登陆超时，请重新登陆！";
										that.loadingClose();
									}else if( response.body.state == "err_09" ){
										that.errShow = true;
										that.message = "系统操作异常！";
										that.loadingClose();
									}else{
										that.errShow = true;
										that.message = "取消订单失败！";
										that.loadingClose();
									}
								})
							}
						},response=> {
							console.log(response)
						})
					}else{ //付款时通过盛付通支付
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660120, jsonValue:str},{emulateJSON:true}).then( response => {
							console.log(response);
							console.log(that.eaId)
							that.backMoney = response.body.refundMoney;
							that.isLoading = true; //加载时的遮罩
							if(response.body.refundType ==1){ //盛付通全部退款
								that.isLoading = true; //加载时的遮罩
								that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data2},{emulateJSON:true}).then( response => {
									console.log(response)
									if(response.body.state == "suc" || response.body.state == "err_09"){
										that.sucMessage = '取消成功';
										that.sucShow = true;
										that.sucMake();
										that.initOrderDetail();
										that.remark = "";
										that.reasonSelf = "";
										that.isActive = 9;
										that.loadingClose();
									}else if(response.body.state == "err_04" ){
										that.errShow = true;
										that.message = "该订单不存在！";
										that.loadingClose();
									}else if( response.body.state == "err_-1" ){
										that.errShow = true;
										that.message = "该订单已取消！";
										that.loadingClose();
									}else if( response.body.state == "err_06" ){
										that.errShow = true;
										that.message = "订单编号不能为空！";
										that.loadingClose();
									}else if( response.body.state == "err_08" ){
										that.errShow = true;
										that.message = "登陆超时，请重新登陆！";
										that.loadingClose();
									}else if( response.body.state == "err_09" ){
										that.errShow = true;
										that.message = "系统操作异常！";
										that.loadingClose();
									}else{
										that.errShow = true;
										that.message = "取消订单失败！";
										that.loadingClose();
									}
								})
							}else{ //盛付通部分退款
								that.showBackMoney = true;
								that.loadingClose();
							}
						},response=> {
							console.log(response)
						})
					}
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
			tabMthods(index){//选择退款方式
				this.isClick = index;
				if(index == 1){
					this.aPay =true;
					console.log(this.isClick)
				}else{
					this.aPay = false;
					console.log(this.isClick)
				}
			},
			backPayMoney(money){//点击退款确定按钮
				let that = this;
				let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
				let token = userInfo.token;
				let telReg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/;
				let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				that.isLoading = true;//加载时的遮罩
				if(that.isClick == 0){//选择微信退款
					console.log('微信')
					let data = JSON.stringify({
						orderId: that.orderId,
						remark:that.remark,
						refundSource: "WxPay",
						thirdSource: "az_1"
					});
					that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if(response.body.state == "suc" || response.body.state == "err_09"){
							console.log('cheng功')
							that.sucMessage = '取消成功';
							that.sucShow = true;
							that.sucMake();
							that.showBackMoney = false;
							that.serverList();
							that.remark = "";
							that.reasonSelf = "";
							that.isActive = 9;
							that.loadingClose();
						}else if(response.body.state == "err_04" ){
							that.errShow = true;
							that.message = "该订单不存在！";
							that.loadingClose();
						}else if( response.body.state == "err_-1" ){
							that.errShow = true;
							that.message = "该订单已取消！";
							that.loadingClose();
						}else if( response.body.state == "err_06" ){
							that.errShow = true;
							that.message = "订单编号不能为空！";
							that.loadingClose();
						}else if( response.body.state == "err_08" ){
							that.errShow = true;
							that.message = "登陆超时，请重新登陆！";
							that.loadingClose();
						}else if( response.body.state == "err_09" ){
							that.errShow = true;
							that.message = "系统操作异常！";
							that.loadingClose();
						}else{
							that.errShow = true;
							that.message = "取消订单失败！";
							that.loadingClose();
						}
						
					})
				}else if(that.isClick == 1){//选择支付宝退款
					console.log(that.accoutName)
					if(that.accoutName == ''){
						that.errShow = true;
						that.message = '请输入正确的支付宝账号';
						that.loadingClose();
					}else if(that.aPayUserName == ''){
					 	that.errShow = true;
						that.message = '请输入真实姓名'
						that.loadingClose();
					}else if((telReg||emailReg).test(that.accoutName)&&that.aPayUserName != ''){
				 		let data = JSON.stringify({
							orderId: that.orderId,
							remark:that.remark,
							refundSource: "AliPay",
							thirdSource: "az_1",
							accoutName:that.accoutName,
							userName:that.aPayUserName
						});
						that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660090, jsonValue:data},{emulateJSON:true}).then( response => {
							console.log(response)
							if(response.body.state == "suc" || response.body.state == "err_09"){
							console.log('支付宝成功')
							that.sucMessage = '取消成功';
							that.sucShow = true;
							that.sucMake();
							that.showBackMoney = false;
							that.initOrderDetail();
							that.remark = "";
							that.reasonSelf = "";
							that.isActive = 9;
							that.loadingClose();
						}else if(response.body.state == "err_04" ){
							that.errShow = true;
							that.message = "该订单不存在！";
							that.loadingClose();
						}else if( response.body.state == "err_-1" ){
							that.errShow = true;
							that.message = "该订单已取消！";
							that.loadingClose();
						}else if( response.body.state == "err_06" ){
							that.errShow = true;
							that.message = "订单编号不能为空！";
							that.loadingClose();
						}else if( response.body.state == "err_08" ){
							that.errShow = true;
							that.message = "登陆超时，请重新登陆！";
							that.loadingClose();
						}else if( response.body.state == "err_09" ){
							that.errShow = true;
							that.message = "系统操作异常！";
							that.loadingClose();
						}else{
							that.errShow = true;
							that.message = "取消订单失败！";
							that.loadingClose();
						}
						})
						
					}
				}
			},
			closeReason(){//点击取消原因页面的红叉
				this.reason = false;
				this.remark = "";
				this.reasonSelf = "";
				this.isActive = 9;
			},
	　　　　//根据订单ID获取详情
			initOrderDetail(){
				this.$store.order = "";//清空Vuex中的数据
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					orderId: this.orderId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660088, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.order = response.body;
					//console.log( this.order.hospitalStr)
					if( this.order.hospitalStr != null ){
						let waiter = this.order.hospitalStr.split(':')[0];
						if(waiter == 'DOC000' || this.order.docRemoved == 1 ){
							this.isServer = false;
						}else{
							this.isServer = true;
						}
					}
					this.time = Number(this.order.remainderTime+60);
					this.loadingClose();
					this.$store.order = this.order;
					this.countDown();
				})
			},
			//点击进入健康描述页
			toHealthy(order){
				this.$router.push({ name: 'myhealthy', params: { order: order }})
			},
			//点击进入咨询详情页
			toConsultDetail(){
//				this.$router.push({ name: 'consultDetail', params: { id: order.QId,order:order}})
			},
			//操作成功提示
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.sure ==  true){
                		this.sure = false;
                	} 
                	if( this.isCancle ==  true){
                		this.isCancle = false;
                	} 
                },1500);  
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
			cancle(orderId,eaId,serviceReservation,reservationMode){
				if( serviceReservation == 0 || reservationMode == 1){
					this.reason =true;
					this.orderId = orderId;
					this.eaId = eaId;
				}else {
					this.isCancle = true;
					this.orderId = orderId;
					this.eaId = eaId;
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
				this.clearStorage();
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660091, jsonValue:data},{emulateJSON:true}).then( response => {
					this.$router.push({path:'/my/myOrders'})
				})
			},
			clearReason(){
				if( this.reason ==  true){
            		this.reason = false;
            	}
			},
			//点击发表评论按钮
			toAssess(item){
				this.$router.push({ name: 'assess', params: { docPic: item.docPhotosmall,docName:item.serviceDocName,docUserId:item.serviceDictId,orderId:item.orderId }})
			},
			goMap(){//点击地址
				let data = this.order;
	 			let lat = data.latitude;
	 			let lon = data.longitude;
	 			let address = data.serviceDictAddress;
	 			let	serviceName = data.eaName
	 			let bell = data.eaTel;
	 			let addressInfo = {
	 				serviceName : serviceName,
	 				lat : lat,
	 				lon : lon,
	 				address : address,
	 				bell : bell
	 			}
	 			console.log(addressInfo);
	 			this.$store.state.serverAddress = addressInfo;
				this.$router.push({ name: 'serverPlace',query: {shopId: this.order.eaId,id:this.order.serviceDictId} })
			},
			goServerDetail(id,type){//点击服务介绍区域跳转到服务详情页
				this.$router.push({path:"/my/myServerDetail",query:{id:id,type:(type==true?"1":"0")}})
			},
			goDoc(id){//点击医生进入医生介绍页
				this.$router.push({path:"/doctor/doctorAuthorized",query:{docuserId :id,doc_distance:'-1'}})
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
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
		background: url(../../assets/image/server/pay-cancel.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	.blue i{
		float:left;
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		background: url(../../assets/image/server/pay-sure.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	.rightreason{
		float:left;
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		background: url(../../assets/image/server/pay-sure.png) no-repeat;
		background-size: 0.3rem 0.3rem;
	}
	/*取消须知*/
	.show-cancle-message{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
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
	/*主页面样式*/
	#orderDetail{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #f2f2f2;
		font-size: 0.2rem;
		color: #333;
		padding-top: .84rem;
	}
	.laji{
		display: block;
		position: fixed;
		top: 0rem;
		right: 0.3rem;
		z-index: 9999;
		background: url(../../assets/image/my/service_order_delete_white@3x.png) no-repeat bottom right;
		background-size: 0.3rem 0.35rem;
		margin-top: 0.2rem;
		margin-right: 0.2rem;
		width: 0.3rem;
		height: 0.4rem;
	}
	.line{
		padding: 0 0.3rem;
	}
	.line p{
		height:0.15rem;
		background: #f2f2f2;
	} 
	.codeDetail{
		display: block;
	}
	.order-title{
		margin-bottom: 0.15rem;
		padding: 0 0.3rem;
		line-height: 0.8rem;
	}
	.order-title-num{
		border-bottom: 1px solid #e6e6e6;
		height: 0.8rem;
	}
	.codeDetail{
		height: 0.8rem;
		color: #333;
		background: url(../../assets/image/head-back-right.png) no-repeat center right ;
		background-size: 0.4rem 0.4rem;
	}
	.codeDetail span{
		display: block;
		float: right;
		margin-right: 0.4rem;
		color: #ff5454;
	}
	.custom{
		padding: 0.3rem 0.3rem;
		margin-bottom: 0.15rem;
	}
	.custom p span{
		display: inline-block;
		margin-right: 0.4rem;
	}
	/*订单内容区*/
	.order-content{
		font-size: 0.2rem;
	}
	.order-content dl{
		margin: 0 auto;
		padding: 0.28rem 0.3rem;
		position: relative;
		overflow: hidden;
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
		font-size: 0.2rem;
	}
	.order-content dd .dd-p2{
		color: #999;
	}
	.order-content dd .dd-p2 span{
		color: #333;
	}
	.order-content dd div span{
		color: #999;
	}
	.order-content dd .dd-p3{
		overflow: hidden;
	}
	.dd-p3-left{
		float: left;
		position: relative;
		margin-right: 0.15rem;
	}
	.dd-p3-left .serviceWay-img{
		display: inline-block;
		position: absolute;
		height: 0.25rem;
		width: 0.3rem;
	    top: 0;		
	}
	.dd-p3-left .serviceTime-img{
		display: inline-block;
		position: absolute;
		height: 0.25rem;
		width: 0.25rem;
	    top: 0;		
	}
	.dd-p3-left img{
		width: 100%;
		height: 100%;
	}
	.dd-p3-left span{
		margin-left: 0.3rem;
	}
	.dd-p3-left .serviceWay-txt{
		margin-left: 0.35rem;
	}
	.dd-p3-right{
		position: absolute;
		right: 0.4rem;
		bottom: 0.3rem;
		color: #333
	}
	.dd-p .dd-p3-right span{
		color: #333;
	}
	.doc-content{
		padding: 0 0.3rem;
		line-height: 0.5rem;
		font-size: 0.2rem;
		
		color: #ff5454;
	}
	.serverDocs i{
		
	}
	.doc-content p{
		overflow: hidden;
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.doc-content p:last-child{
		border-bottom: none;
		
	}
	.doc-content p span{
		display: inline-block;
		margin-right: 0.3rem;
	}
	.doc-content p i{
		display: inline-block;
		margin-right: 0.05rem;
	}
	.timeTxt{
		color: #333 !important;
	}
	.timeNum{
		color: #333 !important;
	}
	.doc-content em{
		color:#999;
	}
	.miaoshuBox{
		background: url(../../assets/image/head-back-right.png) no-repeat center right;
    	background-size: 0.4rem 0.4rem;
	}
	.serverdizhi{
		background: url(../../assets/image/head-back-right.png) no-repeat  right 0.18rem;
    	background-size: 0.4rem 0.4rem;
		padding: 0.1rem 0 0.1rem 0 !important;

	}
	.miaoshu1{
		float: left;
	}
	.miaoshu2{
		float: left;
		display: inline-block;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 4rem;
	}
	.payType{
		margin-top: 0.15rem;
		line-height: 0.8rem;
		height: 0.8rem;
		padding: 0 0.3rem;
	}
	.payType em{
		float: right;
	}
	.order_ly {
		float: right;
	}
	.payMoney{
		padding: 0 0.2rem 0.3rem 0.3rem;
		background: #fff;
	}
	.payMoney p{
		margin-top: 0.2rem;
		text-align: right;
		font-size: 0.2rem;
	}
	.order_ly span{
		color: #ff5454;
	}
	.payMoney .truePay_ly{
		font-size: 0.3rem;
	}
	.truePay_ly {
		color: #ff5454;
	}
	.pinlvBox{
		background: #fff;
		padding-left:0.3rem ;
		height: 0.8rem;
		line-height: 0.8rem;
		margin-top: 0.3rem;
		color: #999;
	}
	.quxiao{
		float: right;
		margin: 0.1rem;
		height: 0.6rem;
		line-height: 0.6rem;
		width: 1.5rem;
		font-size: 0.20rem;
		border: 1px solid #666;
		color: #666;
		border-radius: 3px;
		text-align: center;
	}
	.order-bottom{
		width: 100%;
		padding: 0.1rem 0.3rem;
		background: #fff;
		border-bottom: 0.15rem solid #f5f5f5;
		position: relative;
	}
	.del-order p{
		background: #ff5454;
		color: #fff;
	}
	.order-bottom p{
		float: right;
		padding: 0.1rem;
		width: 1.5rem;
		font-size: 0.23rem;
		border: 1px solid #999;
		border-radius: 3px;
		text-align: center;
	}
	.buy-again{
		background: #ff5454;
		border:none !important;
		color: #fff;
	}
	.buy-again{
		float: right;
		margin-right: 1.9rem;
		width: 1.5rem;
		font-size: 0.24rem;
		border: 1px solid #999;
		line-height: 0.6rem;
		height: 0.6rem;
		border-radius: 3px;
		text-align: center;
		margin-top: 0rem;
		z-index: 1!important;
	}
	.fin-buy-again{
		background: #ff5454;
		border:none !important;
		color: #fff;
	}
	.fin-buy-again{
		float: right;
		margin-right: 0.1rem;
		width: 1.5rem;
		font-size: 0.24rem;
		border: 1px solid #999;
		line-height: 0.6rem;
		border-radius: 3px;
		text-align: center;
		margin-top: 0.4rem;
		z-index: 1!important;
	}
	.beforeAss-buy-again{
		display: block;
		height: 0.6rem;
		width: 1.5rem;
		line-height: 0.6rem;
		background: #ff5454;
		color: #fff;
		float: right;
		border-radius: 3px;
		margin-right: 2rem;
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
	/*弹出框样式*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popup{
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
	.popup .imgBox{
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
	.popup p{
		padding: 0 0.1rem;
		line-height: 0.32rem;
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
	.shanchu{
		position: relative;
		margin-top: 0.4rem;
		height: 0.9rem;
		font-size: 0.24rem;text-align: center;
		color: #fff;
		line-height: 0.6rem;
		width: 100%;
		background: #fff;
		padding: 0.15rem 0;
	}
	.shanchu p{
		background: #ff5454;
		width: 1.5rem;
		height: 0.6rem;
		border-radius: 3px;
		position: absolute;
		top: 0.15rem;
		right: 0.3rem;
	}
	.pingjia{
		position: relative;
		margin-top: 0.4rem;
		height: 0.9rem;
		font-size: 0.24rem;text-align: center;
		color: #fff;
		line-height: 0.6rem;
		width: 100%;
		background: #fff;
		padding: 0.15rem 0;
	}
	.pingjia p{
		background: #009983;
		width: 1.5rem;
		height: 0.6rem;
		border-radius: 3px;
		position: absolute;
		top: 0.15rem;
		right: 0.3rem;
	}
	.starBox{
		line-height: 0.5rem;
		width: 3.5rem;
		float: left;
		display: inline-block;
	}
	.starBox span{
		display: inline-block;
		font-size: 0.2rem;
		height: 0.4rem;
		line-height: 0.4rem;
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
	.zixunBox{
		position: relative;
	}
	.zixun{
		position: absolute;
		top: 0.1rem;
		right: 0.1rem;
		border: 1px solid #666;
		border-radius: 3px;
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.2rem;
		color: #666;
	}
	/*弹出框新样式*/
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
	/*退款页面样式*/
	.order-pay{
		width: 100%;
	}
	.order-pay .order-pay-title{
		width: 90%;
		margin: 0 auto;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.26rem;
		color: #666;
		border-bottom: 1px solid #eee;
		text-align: center;
	}
	.order-pay .order-pay-price{
		font-size: 0.42rem;
		text-align: center;
		color: #f59645;
		margin-top: 0.15rem;
		font-weight: bold;
		margin-bottom: 0.15rem;
	}
	.order-pay .order-pay-price span{
		margin-left: 0.15rem;
		font-weight: bold;
	}
	.order-pay-method{
		width: 100%;
		padding: 0 0.3rem;
		border-top: 0.02rem solid #ddd;
		border-bottom: 0.02rem solid #ddd;
	}
	.order-pay-method .pay-method{
		width: 100%;
		height: 0.92rem;
	}
	.order-pay-method .pay-method:first-child{
		border-bottom: 0.02rem solid #efefef;
	}
	.pay-method.pay-weixin{
		background: url(../../assets/image/server/pay-weixin.png) no-repeat left center;
		background-size: 6%;
	}
	.pay-method.pay-zhifubao{
		background: url(../../assets/image/server/pay-zhifubao.png) no-repeat left center;
		background-size: 6%;
	}
	.pay-method p{
		color: #545654;
		font-size: 0.27rem;
		line-height: 0.92rem;
		padding-left: 0.66rem;
		float: left;
	}
	.pay-method span{
		display: block;
		float: right;
		height: 100%;
		width: 10%;
		background: url(../../assets/image/server/pay-cancel.png) no-repeat right center;
		background-size: 55%;
	}
	.pay-method.isClick span{
		height: 100%;
		width: 10%;
		background: url(../../assets/image/server/pay-sure.png) no-repeat right center;
		background-size: 55%;
	}
	.pay-method img{
		display: block;
		height: 100%;
		width: auto;
	}
	.pay-sure{
		padding: 0 0.3rem;
		background: #eee;
	}
	.pay-sure a{
		width: 100%;
		height: 0.82rem;
		display: block;
		background: #439685;
		font-size: 0.34rem;
		color: #fff;
		line-height: 0.82rem;
		text-align: center;
		border-radius: 5px;
		
	}
	.back-gray{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #eee;
		color: #666;
		padding-left: 0.3rem;
	}
	.aPay-num,.aPay-name{
		width: 100%;
		height: 0.92rem;
		line-break: 0.92rem;
		border-top: 1px solid #efefef;
		font-size: 0.26rem;
	}
	.aPay-num span,.aPay-name span{
		float: left;
		height: 0.92rem;
		line-height: 0.92rem;
	}
	.aPay-num input,.aPay-name input{
		float: right;
		height: 0.92rem;
		line-height: 0.92rem;
		width: 5rem;
		text-align: right;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	.order-cost  {
		padding: 0 0.3rem;
	}
	.order-cost ul li {
		overflow: hidden;
		padding-bottom: 0.2rem;
		display:box;display:-webkit-box;display:-moz-box;display:-moz-box;
	}
	.order-cost ul li span {
		display: block;
		-webkit-box-flex:1;box-flex:1;-moz-box-flex:1;
	}
	.order-cost ul li:last-child {
		border-bottom: 1px solid #f2f2f2;
	}
	.order-cost-line {
		border-bottom: 1px dashed #333;
		height: 14px;
		margin-left: 0.1rem;
		-webkit-box-flex:500 !important;
		box-flex:500 !important;
		-moz-box-flex:500 !important;
	}
	.payMoney-line {
		padding-bottom: .2rem;
		border-bottom: 1px solid #e6e6e6;
		border-top: 1px solid #e6e6e6;
		padding-top: .2rem;
	}
</style>