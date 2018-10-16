<template>
<section id="myWallet">
	<Heads :title="titleName" :class="[leftTitle]" v-on:child-say="listenToMyBoy"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<!--<noBata v-if="redWallet ==''"></noBata>-->
	<scroller :style="{ top:activeTop }"
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if='isLoading == false'
	>
		<div class="WD-container">
			<ul class="walletLists">
				<li class="walletItem clearfix" v-for="(item,index) in redWallet" :key="index">
					<div class="walletItemType clearfix" v-if="item.qiang ==4">
						<div class="wallet-left">
							<p class="wallet-type"><span class="green">{{item.USERNAME}}</span>鼓励我</p>
							<p class="wallet-time"><span class="list-date">{{item.CTIME | substring(0,10)}}</span><span class="list-hour">{{item.CTIME | substring(11,16)}}</span></p>
						</div>
						<div class="wallet-right">
							<span class="moneyNum green">+{{item.MONEY | doubleZero}}</span>元
						</div>
					</div>
					<div class="walletItemType clearfix" v-if="item.qiang ==0 &&item.TYPE1 =='红包'">
						<div class="wallet-left">
							<p class="wallet-type">领取红包</p>
							<p class="wallet-time"><span class="list-date">{{item.CTIME | substring(0,10)}}</span><span class="list-hour">{{item.CTIME | substring(11,16)}}</span></p>
						</div>
						<div class="wallet-right">
							<span class="moneyNum black">+{{item.MONEY | doubleZero}}</span>元
						</div>
					</div>
					<div class="walletItemType clearfix" v-if="item.qiang ==0 &&item.TYPE1 =='提现'">
						<div class="wallet-left">
							<p class="wallet-type">提现</p>
							<p class="wallet-time"><span class="list-date">{{item.CTIME | substring(0,10)}}</span><span class="list-hour">{{item.CTIME | substring(11,16)}}</span></p>
						</div>
						<div class="wallet-right">
							<span class="moneyNum red">-{{item.MONEY | doubleZero}}</span>元
						</div>
					</div>
					<div class="walletItemType clearfix" v-if="item.qiang ==1 && item.TYPE1 =='红包'">
						<div class="wallet-left">
							<p class="wallet-type">收取<span class="green">{{item.USERNAME}}</span>的红包</p>
							<p class="wallet-time"><span class="list-date">{{item.CTIME | substring(0,10)}}</span><span class="list-hour">{{item.CTIME | substring(11,16)}}</span></p>
						</div>
						<div class="wallet-right">
							<span class="moneyNum green">+{{item.MONEY | doubleZero}}</span>元
						</div>
					</div>
				</li>
			</ul>
		</div>
	</scroller>
</section>
</template>

<script>
	import noBata from '../common/noBata.vue'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				isLoading:true,
				titleName:"红包明细",
				leftTitle:"leftTitle",
				redWallet:[],
				nohead:"nohead",
				rows:20,
				hasError:"",
				activeTop:""//iscroll
			}
		},
		computed:{

		},
		components:{
			Heads,
			Loading,
			noBata
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			initDetailList(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					userId: userId,
					rows:this.rows,
					page:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771016, jsonValue:data},{emulateJSON:true}).then( response => {
					this.redWallet = response.body.ROWS
					this.loadingClose()
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 20;
					this.initDetailList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId
				let data = JSON.stringify({
					userId: userId,
					rows:this.rows+20,
					page:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771016, jsonValue:data},{emulateJSON:true}).then( response => {
//						this.redWallet = response.body.ROWS;
//						console.log(this.messages)
						if (this.rows >= response.body.ROWS.length) {
				          setTimeout(() => {
				            done(true)
				          }, 1500)
				          return;
				        }
						setTimeout(() => {
							this.redWallet = response.body.ROWS;
							done();					
						}, 1500)
						this.rows+=20;
				})
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
		},
		mounted:function(){
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = .84+'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			this.initDetailList()
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeTop = .84+'rem';
				}
			}
		}
	}
</script>

<style scoped>
#myWallet{
	width: 100%;
	padding-top: 0.84rem;
}
.walletLists{
	padding: 0 0.3rem;	
}
.walletItem{
	border-bottom: 1px solid #E6E6E6;
	padding: 0.15rem 0;
	height: 1.1rem;
}
.wallet-left{
	display: inline-block;
	float: left;
	font-size: 0.24rem;
}
.wallet-type{
	margin-bottom: 0.15rem;
	font-weight: 600;
	color: #333;
}
.wallet-time{
	color: #999;
	font-size: 0.2rem;
}
.wallet-time span{
	margin-right: 0.1rem;
}
.wallet-right{
	display: inline-block;
	float: right;
	font-size: 0.20rem;
	color: #999;
	line-height: 0.8rem;
}
.moneyNum{
	font-size: 0.28rem;
	font-weight: 600;
	margin-right: 0.1rem;
}
.red{
	color: #E95453;
	
}
.green{
	color: #10B361;
	
}
.black{
	color: #333;
	
}
.loadTop {
	background: #fff !important;
	z-index: 2;
}
</style>