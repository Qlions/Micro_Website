<template>
	<div class="subscribe-manag">
		<Heads :title="title"></Heads>
		<div class="subscribe-manag-null" v-if="dataHide == 0">
			<i></i>
			<p>暂无数据</p>
		</div>
		<div class="subscribe-manag-data" v-if="dataHide == 1">
			<scroller :style="{ top:activeTop }" :on-refresh="refresh" :on-infinite="infinite">
				<div class="subscribe-manag-list">
					<ul>
						<li class="subscribe-manag-item" v-for="item in subList">
							<router-link :to='{ path:"/news/myMessage/subscribeDeta", query:{eaId : item.eaId , shopName : item.eaName }}'>
								<div class="subscribe-manag-item-img">
									<img :src="item.logoImg" alt="">
								</div>
								<div class="subscribe-manag-item-content">
									<div class="subscribe-manag-item-content-top">
										<h2>{{ item.eaName }}</h2>
									</div>
									<div class="subscribe-manag-item-content-bottom">
										<p>{{ item.shopInfo }}</p>
									</div>
								</div>
							</router-link>
							<span @click="GetSubscribe(item.eaId)" class="getSubscribe">订阅</span>
						</li>
					</ul>
				</div>
			</scroller>
		</div>
		<popup :message="message" v-if="isPop"></popup>
	</div>
</template>
<style>
	.subscribe-manag {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #e6e6e6;
	}
	.subscribe-manag-list {
		margin-top: .2rem;
	}
	.subscribe-manag-item {
		width: 100%;
		height: 2.2rem;
		padding: .2rem;
		overflow: hidden;
		background: #fff;
	}
	.subscribe-manag-item-img {
		height: 0.88rem;
		width: 0.88rem;
		float: left;
		margin-right: .2rem;
	}
	.subscribe-manag-item-img img {
		width: 100%;
	}
	.subscribe-manag-item-content {
		float: left;
		width: 84%;
	}
	.subscribe-manag-item-content-top {
		width: 100%;
		height: .7rem;
	}
	.subscribe-manag-item-content-top h2 {
		width: 60%;
		font-size: .32rem;
		float: left;
		line-height: .7rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color: #000;
	}
	.getSubscribe {
		float: right;
		display: block;
		width: 1.2rem;
		height: .7rem;
		text-align: center;
		line-height: .7rem;
		color: #fff;
		background: #009983;
		border-radius: .1rem;
		position: absolute;
    	right: .2rem;
    	font-size: .28rem;
	}
	.subscribe-manag-item-content-bottom {
		color: #666;
		font-size: 0.24rem;
		margin-top: .2rem;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}
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
<script>
	import Heads from '../common/head.vue'
	import popup from '../common/error-min-popup.vue'
	export default {
		data () {
			return {
				activeTop: ".84rem",
				hasError:"",
				title:"订阅管理",
				dataHide:0,
				page:1,
				rows:10,
				subList:'',
				isPop:false,
			}
		},
		mounted () {
			// 判断头部添加的下载按钮
			// 管理订阅列表
			this.managList();
		},
		methods:{
			// 管理订阅列表函数
			managList () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: this.page,
						rows: this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560005, jsonValue:data},{emulateJSON:true}).then( response => {
					if(response.body.total == 0){
						this.dataHide = 0;
					}else {
						this.dataHide = 1;
						this.subList = response.body.rowList;
					}
				    
				})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {	
					this.managList();
					done();
				}, 1500)
			},
			infinite (done) { // 下拉加载每次
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: this.page,
						rows: this.rows+5
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560005, jsonValue:data},{emulateJSON:true}).then( response => {				    
				    setTimeout(() => {	
						this.subList = response.body.rowList;
						done(true);
						this.rows+=5;
					}, 1500)
				})
						
			},
			// 订阅函数
			GetSubscribe (eaId) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						eaId:eaId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560004, jsonValue:data},{emulateJSON:true}).then( response => {
				    if(response.body.state == 'suc'){
				    	this.managList();
				    	this.isPop = true;
						this.message = '订阅成功';
						this.clearStorage();
				    }
				    //this.subList = response.body.rowList;
				})
			},
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.isPop ==  true){
                		this.isPop = false;
                	} 
                },1500);  
			}
			
		},
		components:{
			Heads,
			popup
		}
	}
</script>