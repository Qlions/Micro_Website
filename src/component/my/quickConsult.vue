<template>
	<section id="quickConsult">
		<Heads :title="titleName"></Heads>
		<div class="show-money" v-if="isMoney">
			<div class="show-money-header">
				<b @click="closeMoney">
					<img src="../../assets/image/head-back.png" alt="返回图标">
				</b>
				<h2>悬赏</h2>
			</div>
			<div class="show-money-main">
				<p>请选择悬赏值:</p>
				<ul >
					<li><input @click="selectedPay1()" :class="isChecked1" type="text" id="" value="" v-model="money1" readonly="readonly"/></li>
					<li><input @click="selectedPay2()" :class="isChecked2" type="text" id="" value="" v-model="money2" readonly="readonly"/></li>
					<li><input @click="selectedPay3()" :class="isChecked3" type="text" id="" value="" v-model="money3" readonly="readonly"/></li>
					<li><input @click="selectedPay4()" :class="isChecked4" type="text" id="" value="" v-model="money4" readonly="readonly"/></li>
					<li><input @click="selectedPay5()" :class="isChecked5" type="text" id="" value="" v-model="money5" readonly="readonly"/></li>
					<li><input @click="selectedPay6()" :class="isChecked6" type="text" id="" value="" v-model="money6" readonly="readonly"/></li>
					<!--<li v-for="(index,item) in money">
						<input @click="selectedPay()" :class="isChecked" type="text" id="" value="" v-model="item" readonly="readonly"/>
					</li>-->
					<li><input @click="selectedPay7()" :class="isChecked7" type="number" placeholder="自定义" value="" v-model="money7" /></li>
				</ul>
				<!--<div class="selfMoneyBox">
					<input class="selfMoney" type="number"  value="" />
				</div>-->
			</div>
			<div class="record-data-form-btn">
				<a href="javascript:void(0);" @click="sure">确认</a>
			</div>
		</div>
		<div class="Qc-container">
			<div class="question-content">
				<textarea id="qctxt" v-on:focus="changeCount" v-model="QContent" placeholder="请尽可能详细描述您要咨询的状况，以便医生准确诊断。" class="question-main" ref="txt"></textarea>
			</div>
			<uploader :src="'/webapiProxy/webapi/picAppUpload.action'" :maxNum="3" :btnType="btnType" :textarea="QContent">
				
			</uploader>
			<div class="bhMoney">
				<div class="bhMoney-picBox">
					<img v-if="payNum == 0" class="bhMoney-pic" @click="toMoney" src="../../assets/image/my/BH.png"/>
					<p v-if="payNum != 0">￥{{payNum}}元</p>
				</div>
				<div v-if="payNum == 0" class="bhMoney-txt">加悬赏，更容易吸引医生为你解答</div>
				<div v-if="payNum != 0" class="bhMoney-txt">赏金高悬--寻医生解答</div>
			</div>
		</div>
		<errorPopup v-if="show==true" :message="message"></errorPopup>
	</section>
</template>

<script>
	import $ from 'jquery'
	import Heads from '../common/head.vue'
	import uploader from '../common/uploader.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				titleName:"快速咨询",
				QContent:"",
				picArr:'',
				rewardMoney:"",
				show: false,
				message:"咨询内容不得少于15个字",
				picShow:false,
				btnType:2,
				flag:false,
				isMoney:false,
				payNum:0,
				isChecked1:"",
				isChecked2:"",
				isChecked3:"",
				isChecked4:"",
				isChecked5:"",
				isChecked6:"",
				isChecked7:"",
				money:['免费','5元','10元','20元','30元','50元'],
				money1:'免费',
				money2:'5元',
				money3:'10元',
				money4:'20元',
				money5:'30元',
				money6:'50元',
				money7:''
			}
		},
		components:{
			errorPopup,Heads,uploader
		},
		methods: {
			closeMoney(){
				this.isMoney = false
			},
			selectedPay1(){
//				var event = event || window.event;
//    			var target = event.target || event.srcElement;
//				$(target).toggleClass('red').siblings().removeAttr("class","red");
				this.isChecked1 = 'red';
				this.isChecked2 = '';
				this.isChecked3 = '';
				this.isChecked4 = '';
				this.isChecked5 = '';
				this.isChecked6 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 0
			},
			selectedPay2(){
				this.isChecked2 = 'red';
				this.isChecked1 = '';
				this.isChecked3 = '';
				this.isChecked4 = '';
				this.isChecked5 = '';
				this.isChecked6 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 5
			},
			selectedPay3(){
				this.isChecked3 = 'red';
				this.isChecked1 = '';
				this.isChecked2 = '';
				this.isChecked4 = '';
				this.isChecked5 = '';
				this.isChecked6 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 10
			},
			selectedPay4(){
				this.isChecked4 = 'red';
				this.isChecked1 = '';
				this.isChecked2 = '';
				this.isChecked3 = '';
				this.isChecked5 = '';
				this.isChecked6 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 20
			},
			selectedPay5(){
				this.isChecked5 = 'red';
				this.isChecked1 = '';
				this.isChecked2 = '';
				this.isChecked3 = '';
				this.isChecked4 = '';
				this.isChecked6 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 30
			},
			selectedPay6(){
				this.isChecked6 = 'red';
				this.isChecked1 = '';
				this.isChecked2 = '';
				this.isChecked3 = '';
				this.isChecked4 = '';
				this.isChecked5 = '';
				this.isChecked7 = '';
				this.money7 = '';
				this.payNum = 50
			},
			selectedPay7(){
				this.isChecked7 = 'red';
				this.isChecked1 = '';
				this.isChecked2 = '';
				this.isChecked3 = '';
				this.isChecked4 = '';
				this.isChecked5 = '';
				this.isChecked6 = '';
			},
			sure(){
				if(this.money7!=''){
					this.payNum = this.money7;
				}
				this.isMoney = false;
			},
			readImg:function(){
				this.picShow = true;
				var fileObj = document.getElementById('upLoadImg').files[0];
//				console.log(fileObj)
				var reader = new FileReader();
				reader.readAsDataURL(fileObj);
				reader.onload = function() {
					document.getElementById('show_img').setAttribute('src', this.result);
				}
			},
			delPic:function(){
				this.picShow = false
			},
			postQuickConsult:function(){
				if(this.QContent.length<=15){
					this.show = true;
					var that = this;
					setTimeout(() => {
						that.show = false	
					}, 1500)
				}else{
					this.rewardMoney = $('.red').text()
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
						content:this.QContent,
						payMoney:0
//						picArr:this.picArr,
//						rewardMoney:0,


//						departmentBig:'DT015',
//						departmentSmall:'288080'
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660096, jsonValue:data},{emulateJSON:true}).then( response => {
//						console.log(response)
						this.$router.go(-1);
					})
				}	
			},
			changeCount(){
				var u = navigator.userAgent;
		        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
		            this.flag = true;
		            window.onresize = function(){
						if(this.flag){//如果flag为true，键盘弹起，改变底部按钮的position，同时将flag改为false
							this.$refs.btn.style.position="initial";
							this.flag = false;
						}else{
							this.$refs.btn.style.position="absolute";
							if(document.activeElement.id == "qctxt"){
								flag = true;
							};
	                	}
		        	}
		        }
			},
			toMoney(){
//				this.isMoney = true;
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style scoped>
	/*悬赏*/
	.show-money{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99999;
		width: 100%;
		height: 100%;
		background: #fff;
		font-size: 0.32rem;
		color: #666;
		
	}
	.show-money-header{
		width: 100%;
		height: 0.84rem;
		background-color: #009983;
	}
	.show-money-header b {
		text-align: center;
		width: 0.8rem;
		height:0.84rem;
		position: absolute;
		left: 0.2rem;
		top: 0;
	}
	.show-money-header img {
		display: block;
		width: 60%;
		margin-top: 24%;
		height: 60%;
	}
	.show-money-header h2 {
		float: left;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		line-height: 0.84rem;
		font-size: 0.36rem;
		color: #fff;
	}
	.show-money-main{
		border-bottom:1px solid #999 ;
	}
	.show-money-main p{
		width: 100%;
		margin: 0.25rem 0;
		padding-left: 7%;
	}
	.show-money-main ul{
		width: 100%;
		padding-left: 7%;
		font-size: 0.28rem;
	}
	.show-money-main ul li input{
		width: 24%;
		height: 0.6rem;
		line-height: 0.6rem;
		margin-right: 7%;
		margin-bottom: 0.3rem;
		text-align: center;
		float: left;
		border: 1px solid #999;
	}
	.red{
		border: 1px solid #ff5454!important;
		background: url(../../assets/image/my/selet_dot.png) no-repeat right bottom;
		background-size: 10px 10px;
	}
	
	.selfMoneyBox{
		width: 100%;
		padding-left: 7%;
	}
	.selfMoney{
		width: 24%;
		height: 0.6rem;
		line-height: 0.6rem;
		margin-bottom: 0.3rem;
		text-align: center;
		border: 1px solid #999;
	}
	.record-data-form-btn a {
		display: block;
		width: 80%;
		height: 0.8rem;
		margin: 0.8rem auto;
		text-align: center;	
		line-height: 0.8rem;
		background: #009983;
		color: #fff;
		font-size: 0.32rem;
	}
	#quickConsult{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		padding-top: .84rem;
	}
	.Qc-container{
		width: 100%;
	}
	.question-content{
		width: 100%;
		margin-bottom: 0.2rem;
	}
	.question-main{
		border: none;
		resize: none;
		padding: 0.2rem;
		width: 100%;
		min-height:4rem; 
		height:auto!important; 
		height:4rem;
		font-size: 14px;
		white-space: normal;
	    word-break: break-all;
	    outline: none;
	}
	.question-pic{
		width: 100%;
		padding: 0.2rem;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
	.post-pic{
		float: left;
		width: 1.5rem;
		height:1.5rem;
    	margin-right: 2%;
		border: 1px dashed #eee;
		background: url(../../assets/image/my/camera.png) no-repeat center;
		background-size: 1rem 1rem;
		position: relative;
		z-index: 999;
	}
	.post-pic input{
		width: 100%;
		filter: alpha(opacity=65);
		-moz-opacity: 0;
		-khtml-opacity: 0;
		opacity: 0;
	}
	.post-pic-point{
		float: left;
		margin-top: 0.5rem;
		
	}
	.post-pic-point p{
		line-height: 0.4rem;
		height: 0.4rem;
	}
	.gray{
		color: #999;
	}
	.question-pay{
		width: 100%;
		padding: 0.2rem;
	}
	.question-pay ul{
		overflow: hidden;
		width: 100%;
		margin-top: 0.4rem;
	}
	.question-pay p{
		width: 100%;
	    text-align: center;
	    line-height: 0.4rem;
	    color: #999;
	    padding-bottom: 0.1rem;
	    padding-top: 0.1rem;
	}
	.question-pay ul li{
		float: left;
		border: 1px solid #eee;
		width: 15%;
		height: 0.5rem;
		margin:0 2.5%;
		line-height: 0.5rem;
		text-align: center;
	}
	.question-pay ul .red{
		border: 1px solid #ff5454;
		background: url(../../assets/image/my/selet_dot.png) no-repeat right bottom;
		background-size: 10px 10px;	
	}
	.question-pay ul li input{
		width: 100%;
		height: 100%;
		line-height: 100%;
		color: #666;
		text-align: center;
	}
	.record-data-form-btn{
		width: 100%;
	}
	.record-data-form-btn .post-btn {
		display: block;
		width: 93%;
		height: 0.8rem;
		margin: 0 auto;
		text-align: center;	
		vertical-align: middle;
		line-height: 0.8rem;
		background: #009983;
		color: #fff;
		font-size: 16px;
	}
	.img-box{
		overflow: hidden;
	}
	.img-first{
		position:relative;
		overflow: hidden;
		float: left;
	}
	#show_img{
		width: 2rem;
		height: 1.5rem;
		display: block
	}
	.img-first i{
		width: 0.4rem;
	    height: 0.4rem;
	    position: absolute;
	    right: 1px;
	    top: 1px;
	    background: #ff5454 url(../../assets/image/my/del-icon.png) no-repeat center;
	    background-size: 50%;
	}
	.bhMoney{
		margin-top: 0.2rem;
		width: 100%;
	}
	.bhMoney-picBox{
		width: 100%;
		height: 1rem;
		margin-bottom: 0.25rem;
	}
	.bhMoney-picBox p{
		width: 100%;
		line-height: 1rem;
		font-size: 0.4rem;
		text-align: center;
		color: #f59645;
	}
	.bhMoney-pic{
		display: block;
		width: 1rem;
		height: 1rem;
		margin: 0 auto;
	}
	.bhMoney-txt{
		width: 100%;
		line-height: 0.3rem;
		text-align: center;
		font-size: 0.26rem;
		color: #666;
	}
</style>