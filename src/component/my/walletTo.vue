<template>
<section id="myWallet">
	<Heads :title="titleName"></Heads>
	<errorPopup v-if="errShow" :message="message"></errorPopup>
	<div class="WD-container">
		<p class="walletTo-cont-gray">红包余额转出到</p>
		<div class="walletTo-cont">
			<p>
				<span class="weixin">微信零钱</span><i @click="wChoice()" :class="wChoicedType"></i>
			</p>
			<p>
				<span class="bao">支付宝余额</span><i @click="bChoice()" :class="bChoicedType"></i>
			</p>
			<p v-if="toType==2">
				<em>支付宝账号</em><input type="text" placeholder="请输入您的支付宝账号或手机号" v-model="baoNum"/>
			</p>
			<p v-if="toType==2">
				<em>真实姓名</em><input class="input-name" type="text" placeholder="请输入收款人真实姓名" v-model="realName" />
			</p>
		</div>
		<div class="walletTo-tip">因账号输入错误造成资金损失须自行承担，请确认</div>
		<div class="record-data-form-btn" @click="postMoney()">
			<a href="javascript:void(0);">确定</a>
		</div>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				titleName:"红包转出",
				baoToggle:false,
				weixinToggle:true,
				message:"",
				errShow:false,
				baoNum:"",
				realName:"",
				toType:1
			}
		},
		computed:{
			wChoicedType(){
				if(this.weixinToggle){
					return 'weixinChoiced'
				}else{
					return ''
				}
			},
			bChoicedType(){
				if(this.baoToggle){
					return 'baoChoiced'
				}else{
					return ''
				}
			}
		},
		components:{
			Heads,errorPopup
		},
		methods: {
			wChoice(){
				this.weixinToggle = true;
				if(this.weixinToggle){
					if(this.baoToggle){
						this.baoToggle = false;
						this.toType = 1
					}
				}
			},
			bChoice(){
				this.baoToggle = true;
				if(this.baoToggle){
					if(this.weixinToggle){
						this.weixinToggle = false;
						this.toType = 2
					}
				}
			},
			//错误提示框
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}
                },1500);  
			},
			postMoney(){
				if(this.weixinToggle){
					this.errShow = true;
					this.message = "微信零钱尚未开通"
					this.clearStorage()
				}else if(this.baoNum ==''){
					this.errShow = true;
					this.message = "请输入支付宝账号或手机号"
					this.clearStorage()
				}else if(this.realName ==''){
					this.errShow = true;
					this.message = "请输入真实姓名"
					this.clearStorage()
				}else{
					this.$router.push({'path':'/my/walletOut',query:{num:this.baoNum,name:this.realName}})
				}
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style scoped>
#myWallet{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #F2F2F2;
	color: #333;
}
.walletTo-cont-gray{
	padding: 0 0.3rem;
	height: 0.8rem;
	line-height: 0.8rem;
}
.walletTo-cont{
	background: #fff;
	padding: 0 0.3rem;
	font-size: 0.24rem;
}
.walletTo-cont p{
	
	border-top: 1px solid #e6e6e6;
	height: 0.8rem;
	line-height: 0.8rem;
}
.walletTo-cont p:first-child{
	border-top: none;
}
.walletTo-cont p span{
	float: left;
	padding-left: 0.5rem;
}
.weixin{
	background: url(../../assets/image/my/weixin.png) no-repeat left center;
	background-size: 0.35rem;
}
.bao{
	background: url(../../assets/image/my/bao.png) no-repeat left center;
	background-size: 0.35rem;
}
.walletTo-cont p i{
	float: right;
	width: 0.4rem;
	height: 0.4rem;
	margin-top: 0.2rem;
	background: url(../../assets/image/my/noChoice.png) no-repeat center;
	background-size: 0.4rem;
}
.walletTo-cont p .weixinChoiced{
	background: url(../../assets/image/my/choice.png) no-repeat center;
	background-size: 0.4rem;
}
.walletTo-cont p .baoChoiced{
	background: url(../../assets/image/my/choice.png) no-repeat center;
	background-size: 0.4rem;
}
.walletTo-cont p em{
	float: left;
}
.walletTo-cont p input{
	float: right;
	height: 100%;
	width: 5rem;
	text-align: right;
}
.walletTo-tip{
	text-align: center;
	font-size: 0.2rem;
	color: #666;
	line-height: 0.8rem;
}
.record-data-form-btn a {
	display: block;
	width: 90%;
	height: 0.8rem;
	margin: 0 auto;
	text-align: center;	
	line-height: 0.8rem;
	background: #009983;
	color: #fff;
	border-radius: 0.125rem;
	-moz-border-radius: 0.125rem;
	-webkit-border-radius: 0.125rem;
	font-size: 16px;
}
</style>