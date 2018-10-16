<template>
<div id="myRegsiter">
	<!--头部-->
	<myRegsiterHead :title="regName"></myRegsiterHead>
	<!--loading-->
	<isLoading v-show="isLoading"></isLoading>
	
	<!--记录列表-->
	<scroller style="height: 100%;" :style="{ top:activeTop }"
	:on-refresh="refresh"
	:on-infinite="infinite"
	ref="scrollerReg"
	>
		<div class="regsiterList">
			<ul class="regsiterFew" v-for="(item, index) in myRegisterList.rows">
				<router-link :to="{path:'regsiterDetailed', query:{ userAppointId: item.userAppointId}}" >
					<li class="appointmentCode">预约编号&nbsp;
						<span>{{ item.code }}</span> 
						<span class="codeCancel" v-if="item.state == 0">已取消</span>
						<span class="codeCancel2" v-else>预约成功</span>
					</li>
					<li class="appointmentMsg"><span class="msgName">{{ item.name }}</span>(<span class="msgTal">{{ item.mobile }}</span>)</li>
					<li class="appointmentHospital">就诊医院<span class="hospitalName">{{ item.hospitalName }}</span></li>
					<li class="appointmentClass">门诊类型<span class="classNames">{{ item.typeName }}</span></li>
					<li class="appointmentDoctor">门诊医生<span class="doctorName">{{ item.docName }}</span>(<span class="doctorPosition">{{ item.proTitle }}</span>)</li>
					<li class="appointmentTime">
						门诊时间
						<span :class=" item.state == 1 ? 'dateTime2' : 'dateTime'" >{{ item.registerDate }} &#12288; {{ item.weekOfDate }}&#12288;{{ item.unitType == 1 ? "上午" : "下午"}}</span>
						<span :class="item.state == 1 ? 'cancelBtn' : 'cancelBtn2'" @click="cancelFn(item.state, $event, index)">取消预约</span>
					</li>
				</router-link>
			</ul>
			
		</div>
	</scroller>
	
	<!--无数据-->
	<div class="subscribe-manag-null" v-show="noDataIsShow">
		<i></i>
		<p>暂无数据</p>
	</div>
	
	<!--弹出框-->
	<cancelView :texts="cancelText" v-on:cancelBtns="cancelBtns($event)" v-on:cancelNo="cancelNo" v-show="cancelviewShow"></cancelView>
	
	<popCom :message="msgtext" v-show="poperrShow"></popCom>
	
	<popok v-show="popShow" :message="msgtext"></popok>
</div>
</template>

<script>
	import myRegsiterHead from '../common/head.vue'
	import isLoading from '../common/loading.vue'
	import popCom from '../common/error-popup.vue'
	import popok from '../common/qc-suc-popup.vue'
	import cancelView from '../common/cancelPup.vue'
	export default {
		data(){
			return {
				regName: "挂号记录",
				isLoading: false,
				activeTop: ".84rem",
				hasError:"",
				myRegisterList: "",
				noDataIsShow: false,
				cancelText: "您确认取消吗?",
				cancelviewShow: false,
				userAppointId: "",
				msgtext: "",
				popShow: false,
				poperrShow: false,
				
			}
		},
		methods:{
			cancelBtns(event, b){
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let data = JSON.stringify({
					uId: this.userAppointId
				});
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", { token: token, infoType: 660127, jsonValue: data}, {emulateJSON: true}).then(response => {
					//console.log(response)
					this.cancelviewShow = false;
					if(response.body.state == 'suc'){
						this.popShow = true;
						this.msgtext = "取消成功!";
					}else{
						this.poperrShow = true;
						this.msgtext = "取消失败!";
					}
					setTimeout(() =>{
						this.popShow = false;
						this.poperrShow = false;
					},800)
				})
			},
			cancelNo(){
				this.cancelviewShow = false;
			},
			cancelFn(a, event, b){
				if(a == 0){
					return;
				}
				event.preventDefault();
				this.userAppointId = this.myRegisterList.rows[b].userAppointId;
				this.cancelviewShow = true;
				
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			},
			
			//刷新
			refresh(done){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userid = userInfo.userId;
				let data = JSON.stringify({
					userId: userid
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660128, jsonValue:data},{emulateJSON:true}).then( response => {
					//console.log(response)
					response.body == "" ? this.noDataIsShow = true : this.myRegisterList = response.body;
			        setTimeout(() => {
			            done(true)
			          }, 1500)
			          
					
				
				})
			          
			},
			//订单记录接口    660128
			infinite(done){
				this.isLoading = true;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userid = userInfo.userId;
				let data = JSON.stringify({
					userId: userid
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660128, jsonValue:data},{emulateJSON:true}).then( response => {
					//console.log(response)
					response.body == "" ? this.noDataIsShow = true : this.myRegisterList = response.body;
			        setTimeout(() => {
			           this.$refs.scrollerReg.finishInfinite(2);
			           
			        })
			          
					setTimeout(()=>{
						this.isLoading = false;
					}, 500)
				
				})
			}
			
		},
		components: {
			myRegsiterHead,
			isLoading,
			cancelView,
			popCom,
			popok
		}
	}
</script>

<style >
	#myRegsiter{
		background: #f2f2f2;
		height: 100%;
	}
	#app,#my{
		height: 100%;
	}
	
	.regsiterFew{
		background: #fff;
		margin-top: 0.2rem;
	}
	.regsiterFew li{
		width: 94%;
		margin: 0 auto;
		font-size: 0.28rem;
	}
	.appointmentCode{
		height: 0.86rem;
		line-height: 0.86rem;
		color: #666;
		border-bottom: 1px solid #efefef;
	}
	.codeCancel{
		float: right;
	}
	.codeCancel2{
		color: #fe9600;
		float: right;
	}
	
	.appointmentMsg{
		color: #999;
		height: 0.86rem;
		line-height: 0.86rem;
	}
	.msgName{
		color: #333;
	}
	
	.appointmentHospital, .appointmentClass, .appointmentDoctor, .appointmentTime{
		font-size: 0.28rem;
		color: #999;
	}
	.hospitalName, .classNames, .doctorName, .dateTime{
		color: #666;
		margin-left: 0.2rem;
	}
	.dateTime2{
		color: #fe9600;
		margin-left: 0.2rem;
	}
	.appointmentTime{
		height: 0.86rem;
		line-height: 0.86rem;
		border-top: 1px solid #efefef;
	}
	.cancelBtn{
		display: inline-block;
		float: right;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		padding: 0 0.1rem 0 0.1rem;
		margin-top: 0.13rem;
		background: #009983;
		color: #fff;
	}
	.cancelBtn2{
		display: inline-block;
		float: right;
		border: 1px solid #999;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		padding: 0 0.1rem 0 0.1rem;
		margin-top: 0.13rem;
		
	}
	.appointmentHospital, .appointmentClass, .appointmentDoctor{
		margin: 0 auto 0.2rem auto !important;
	}
	
	/*无数据*/
	.subscribe-manag-null {
		padding-top: .84rem;
		width: 90%;
		margin: 1.25rem 5%;
		position: absolute;
	}
	.subscribe-manag-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.subscribe-manag-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
</style>