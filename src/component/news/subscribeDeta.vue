<template>
	<div id="sub_Select" v-on:child-say="listenToMyBoy">
		<Heads :title="titleName"></Heads>
		<p class="SubscribeTo" v-if="subscribe == true" @click="subscribeClick()" :style="{ top:titleTop }">取消订阅</p>
		<p class="SubscribeTo" v-if="subscribe == false" @click="subscribeClick1()" :style="{ top:titleTop }">订阅</p>
		<scroller :style="{ top:activeTop }" ref="aaa">
		<div class="subscribe_box" v-for="item in subListdeta">
			<div style="height: 0.5rem;"></div>
			<p class="subscribe_time">{{ item.knowPublicTime }}</p>
			<router-link :to="{ name:'article',query:{knowId:item.knowId,knowName:titleName}}">
				<div class="subscribe_text">
					<p class="subText1">{{ item.knowName}}</p>
					<p class="subText2">{{ item.completeKnowPublicTime }}</p>
					<div class="subText3">
						<img :src="item.knowContextImg">
					</div>
					<div class="subText4">
						{{ item.knowContextText }}
					</div>
					<div class="subText5">
						阅读全文
					</div>
				</div>
			</router-link>
		</div>
		<err :message="errMsg" v-if="isErr"></err>
		<suc :sucMessage="sucMsg" v-if="isSuc"></suc>
		</scroller>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import err from "../common/error-popup.vue"
	import suc from "../common/suc-popup.vue"
	export default {
		data(){
			return {
				titleName: this.$route.query.shopName,
			    eaId: this.$route.query.eaId,
			    subListdeta:[],
			    subscribe:false,
			    hasError: "",
			    activeTop:"",
				activeSearchTop:"",
				errMsg:'',
				sucMsg:'',
				isErr:false,
				isSuc:false,
				titleTop:'',
				 
			}
		},
		components:{
			Heads,
			err,
			suc,
		},
		methods:{
			init(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: 1,
						rows: 100,
						eaId: this.eaId,
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560001, jsonValue:data},{emulateJSON:true}).then( response => {
				    console.log(response);
				    this.subListdeta = response.body.rows.reverse();

				    console.log(this.subListdeta);
				})
			},
			clickSub(){
				
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						eaId: this.eaId,
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560006, jsonValue:data},{emulateJSON:true}).then( response => {
				    console.log('560006',response);
				    this.subscribe = response.body.shopInfoMap.subscribe;
				    console.log(this.subscribe);
				})
			
			},
			subscribeClick(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						eaId: this.eaId,
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560003, jsonValue:data},{emulateJSON:true}).then( response => {
				    console.log('560003',response);
				    this.subscribe = false;
				    this.isSuc = true;
					this.sucMsg = "取消订阅成功"
					setTimeout(() => {
						 this.isLoading = false;
						 this.isSuc = false;
					}, 500);
				})
			},
			subscribeClick1(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						eaId: this.eaId,
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560004, jsonValue:data},{emulateJSON:true}).then( response => {
				    console.log('560004',response);
				    this.subscribe = true;
				    this.isSuc = true;
					this.sucMsg = "订阅成功"
					setTimeout(() => {
						 this.isLoading = false;
						 this.isSuc = false;
					}, 500);
				})
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
		},
		mounted(){
			
			
			if( this.$route.query.shopName.length > 10 ){
			  	this.titleName = this.$route.query.shopName.substring(0,10)+"...";
			}else {
				this.titleName = this.$route.query.shopName;
			}
			this.init();
			this.clickSub();
		},
		beforeUpdate () {
			let vm = this;
			let tiem = setTimeout(function(){
			  	vm.$refs.aaa.scrollTo(0,100000000,true);
			}, 10);
		}
	}
</script>
<style>
	#sub_Select{
		width: 100%;
		height: 100%;
		background: #F5F5F5;
		position: absolute;
/*		padding-top: 0.84rem;*/
	}
	.subscribe_box{
		/*height: 7.5rem;*/
		height: 100%;
	}
	.subscribe_box:last-child  {
		padding-bottom: 2rem;
	}
	.subscribe_time{
		background: #e1e1e1;
		width: 2rem;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		margin: 0 auto;
		border-radius: 0.1rem;
		color: #fff;
	}
	.subscribe_text{
		border-radius: 0.1rem;
		background: #fff;
		width: 90%;
		margin: 0.5rem auto;
		color: #333;
	}
	.subText1{
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		margin: 0 auto;
		font-size: 0.34rem;
		font-weight: bold;
		 overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	    word-break: break-all;
	}
	.subText2{
		width: 90%;
		height: 0.4rem;
		line-height: 0.4rem;
		margin: 0 auto;
		font-size: 0.22rem;
		color: #999;
	}
	.subText3{
		width: 6.2rem;
		height: 3rem;
		margin: 0.2rem auto;
	}
	.subText3 img{
		width: 100%;
		height: 100%;
	}
	.subText4{
		font-size: 0.24rem;
		width: 90%;
		margin: 0.2rem auto;
	 	 overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    word-break: break-all;
	}
	.subText5{
		border-top: 1px solid #EEEEEE;
		width: 90%;
		height: 1rem;
		margin: 0 auto;
		font-size: 0.34rem;
		line-height: 1rem;
	}
	.SubscribeTo{
		position: absolute;
		top: 0.2rem;
		z-index: 999;
		font-size: 0.28rem;
		color: #fff;
		right: 0.2rem;
	}
</style>