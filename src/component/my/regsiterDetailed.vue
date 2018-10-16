<template>
	<div id="regsiterDetailed">
		<!--头部-->
		<detailedHead :title="detailedTitle" v-on:child-say="listenToMyBoy"></detailedHead>
		<!--loading-->
		<isLoading v-show="detailedShow"></isLoading>
		<div class="detailedDiv">
			<ul class="regsiterFew">
				<li class="DetailedDoctor"> <span class="doctorImg" :style="doctorImgStyle"></span>&nbsp;<span class="doctorName">{{ msgListReg.doctorName }}</span> <span class="codeCancel">{{ msgListReg.proTitle }}</span></li>
				<li class="DetailedHospital">就诊医院<span class="hospitalNameD">{{ msgListReg.hospitalName }}</span></li>
				<li class="DetailedDepartment">就诊科室<span class="DepartmentlNameD">{{ msgListReg.department }}- {{ msgListReg.departmentInfo }}</span></li>
				<li class="DetailedClass">门诊类型<span class="classNamesD">{{ msgListReg.typeName }}</span></li>
				<li class="DetailedTime">
					门诊时间
					<span class="dateTimeD">{{ msgListReg.registerDate }}&#12288; {{ msgListReg.weekOfDate }}&#12288; {{ msgListReg.unitType }}</span>
				</li>
				<li class="DetailedMoney"><i>费&#12288;&#12288;用</i><span class="MoneyNumD">{{ money }}</span></li>
			</ul>
			<ul class="detailedManMsg">
				<li class="ManMsgName"><span>就诊人</span><span class="nameSpan">{{ msgListReg.name }}</span></li>
				<li class="ManMsgTal"><span>手机号</span><span class="talSpan">{{ msgListReg.mobile }}</span></li>
				<li class="ManMsgIDNum"><span>身份证</span><span class="IDNumSpan">{{ msgListReg.certNo }}</span></li>
			</ul>
		</div>
		<div :class="msgListReg.state == 1 ? 'cancelReg' : 'cancelReg2'"  @click="cancelFn(msgListReg.state, $event)">
			取消预约
		</div>
		
		<!--弹出框-->
	<cancelView :texts="cancelText" v-on:cancelBtns="cancelBtns($event)" v-on:cancelNo="cancelNo" v-show="cancelviewShow"></cancelView>
	
	<popCom :message="msgtext" v-show="poperrShow"></popCom>
	
	<popok v-show="popShow" :sucMessage="msgtextA"></popok>
	</div>
</template>

<script>
	import detailedHead from '../common/head.vue'
	import isLoading from '../common/loading.vue'
	import popCom from '../common/error-popup.vue'
	import popok from '../common/qc-suc-popup.vue'
	import cancelView from '../common/cancelPup.vue'
	export default {
		data(){
			return{
				detailedTitle: "预约详情",
				activeTop: "",
				hasError:"",
				detailedShow: false,
				doctorImgStyle:{
					backgroundImage: "",
					backgroundSize: "contain",
					backgroundRepeat:" no-repeat"
				},
				msgtext: "",
				msgtextA: "取消成功!",
				popShow: false,
				poperrShow: false,
				cancelviewShow: false,
				cancelText: "您确认取消吗?",
				msgListReg:"",
				money:''
			}
		},
		components:{
			detailedHead,
			isLoading,
			cancelView,
			popCom,
			popok
		},
		methods:{
			
			cancelBtns(event, b){
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let data = JSON.stringify({
					uId: this.$route.query.userAppointId
				});
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", { token: token, infoType: 660127, jsonValue: data}, {emulateJSON: true}).then(response => {
					//console.log(response)
					this.cancelviewShow = false;
					if(response.body.state == 'suc'){
						this.popShow = true;
						this.msgtextA = "取消成功!";
						setTimeout(() =>{
							this.$router.go(-1);
						},900)
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
				this.cancelviewShow = true;
				
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			},
			regsiterMsg(){
				this.detailedShow = true
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let data = JSON.stringify({
					userAppointId: this.$route.query.userAppointId,
					source: 2
				});
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", { token: token, infoType: 660125, jsonValue: data}, {emulateJSON: true}).then(response => {
					console.log(response)
					if(response.body != ""){
						this.msgListReg = response.body;
						console.log(this.msgListReg.costMoney)
						this.money = parseInt(this.msgListReg.costMoney).toFixed(1) + "(医师服务费)";
						if(!response.body.photosmall){
							this.doctorImgStyle.background = "url(../../src/assets/image/DefaultAvatar.png) no-repeat"
						}else {
							this.doctorImgStyle.backgroundImage = "url("+ response.body.photosmall + ")";
						}
						setTimeout(()=>{
							this.detailedShow = false;
						}, 500)
					}
					
				})
			},
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = .84+'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			this.regsiterMsg();
			//console.log("a")
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeTop = .84+'rem';
				}
			}
		},
	}
</script>

<style >
	#regsiterDetailed, #my{
		height: 100%;
	}
	.detailedDiv{
		background: #f2f2f2;
	}
	.regsiterFew, .detailedManMsg{
		background: #fff;
	}
	.detailedManMsg{
		margin-top: 0.2rem;
		color: #666;
	}
	.detailedManMsg li{
		width: 94%;
		margin: 0 auto;
	}
	.regsiterFew li{
		width: 94%;
		margin: 0 auto;
		font-size: 0.28rem;
	}
	.DetailedDoctor{
		line-height: 1.68rem;
		border-bottom: 1px solid #efefef;
	}
	
	.DetailedMsg{
		color: #999;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.msgName{
		color: #333;
	}
	
	.DetailedHospital, .DetailedClass, .DetailedDoctor, .DetailedTime, .DetailedDepartment, .DetailedMoney{
		font-size: 0.28rem;
		color: #999;
	}
	.ManMsgIDNum, .ManMsgName, .ManMsgTal{
		font-size: 0.28rem;
		color: #666;
		padding: 0.2rem 0;
		border-bottom:1px solid #efefef ;
	}
	.nameSpan, .IDNumSpan, .talSpan{
		float: right;
		color: #333;
	}
	.DetailedMoney{
		padding-bottom: 0.2rem;
	}
	.hospitalNameD, .classNamesD, .doctorNameD, .dateTimeD, .DepartmentlNameD, .MoneyNumD{
		color: #666;
		margin-left: 0.2rem;
	}
	.dateTimeD{
		color: #fe9600;
	}
	
	.DetailedHospital, .DetailedClass, .DetailedDepartment, .DetailedMoney, .DetailedTime{
		margin: 0 auto 0.2rem auto !important;
	}
	.DetailedHospital{
		margin: 0.2rem auto 0.2rem auto !important;
	}
	.DetailedDoctor{
		height: 1.68rem;
        align-items: center;
        display: -webkit-flex;
	}
	.DetailedDoctor span{
		display: block;
		float: left;
		line-height: 1.68rem;
		
	}
	.doctorImg{
		height: 1.28rem;
	    width: 1.28rem;
	    border-radius: 50%;
	    overflow: hidden;
	    display: inline-block;
	    line-height: 1.68rem;
	}
	.doctorName{
		margin: 0 5% 0 5%;
	}
	
	/*取消预约按钮*/
	.cancelReg{
		height: 0.94rem;
		background:#009983 ;
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #fff;
		font-size: 0.35rem;
		text-align: center;
		line-height: 0.94rem;
	}
	.cancelReg2{
		height: 0.94rem;
		background:#efefef ;
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #666;
		font-size: 0.35rem;
		text-align: center;
		line-height: 0.94rem;
	}
</style>