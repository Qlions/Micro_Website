<template>
<section id="myMessage">
	<Heads :title="titleName" :class = "[noBack]">
		<router-link :to='{ path:"/home/main"}'>
			<div class="home_mian_1"></div>
		</router-link>
	</Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<div class="MM-container">
		<div class="messageClassify">
			<router-link to="/news/myMessage/sysNotice" class="lis">
				<span class="systemMessage-img">
					<newMessage v-if="s_cloudCount != 0 && s_cloudCount != null"></newMessage>
				</span>
				<p class="tatle">系统通知</p>
				<p class="tip">{{isNewSysMessage==''?"暂无未读消息":isNewSysMessage}}</p>
				<span class="message-time">{{ newSysMessageTime }}</span>
			</router-link>
			<router-link to = "/news/myMessage/exMessage" class="lis">
				<span class="interactMessage-img">
					<newMessage v-if="cloudCount != 0 && cloudCount != null"></newMessage>
				</span>
				<p class="tatle">互动消息</p>
				<p class="tip">{{isNewExMessage==''?"暂无未读消息":isNewExMessage}}</p>
				<span class="message-time">{{ newExMessageTime }}</span>
			</router-link>
		</div>
		<!--<div class="subscribe_number_list">
			<ul>
				<li>
					<router-link to="">
						<div class="subscribe_number_item_img">
							<img src="" alt="">
						</div>
						<div class="subscribe_number_item_txt">
							<p class="tatle">平台健康云</p>
							<p class="tip">周进男性健康</p>
							<span class="message-time">2017-11-13</span>
						</div>
					</router-link>
				</li>
			</ul>
			
		</div>-->
		<div>
			<ul>
				<li v-if="service != null">
					<router-link :to='{path:"/my/myservice"}' >
						<dl class="Subscribe_dl">
							<dt class="Subscribe_dt">
								<img src="../../assets/image/new/icon_news_serviec.png">
								<i class="img_title icon_service" v-if="service.isReaded != 0">{{ service.isReaded }}</i>
							</dt>
							<dd class="Subscribe_dd">
								<p class="Subscribe_dd_p1">

									<span class="Subscribe_dd_p1_txt" style="-webkit-box-orient: vertical;">客服中心</span><span class="date">{{ service.woInputTime | substring(0,10) }} &#12288;  {{ service.woInputTime | substring(11,20)  }}</span>

									<!--<span class="Subscribe_dd_p1_txt">客服中心</span><span class="date">{{ service.woInputTime | substring(0,10) }} &#12288; {{ service.woInputTime | substring(11,20)  }}</span>-->

								</p>
								<p class="Subscribe_dd_p2" style="-webkit-box-orient: vertical">{{ service.QContent }}</p>
							</dd>
						</dl>

					</router-link>
				</li>
				<li v-for="item in subList">
					<router-link :to='{path:"/news/myMessage/subscribeDeta", query:{eaId : item.eaId , shopName : item.shopName}}' >
					<dl class="Subscribe_dl">
						<dt class="Subscribe_dt">
							<img :src="item.logoImg">
							<i class="img_title" v-if="item.newArticleNum != 0"></i>
						</dt>
						<dd class="Subscribe_dd">
							<p class="Subscribe_dd_p1">
								<span class="Subscribe_dd_p1_txt" style="-webkit-box-orient: vertical;">{{ item.shopName }}</span><span class="date">{{ item.createTime | substring(0,11) }} &#12288; {{ item.createTime | substring(11,20)  }}</span>
							</p>
							<p class="Subscribe_dd_p2" style="-webkit-box-orient: vertical">{{ item.content }}</p>
						</dd>
					</dl>
					</router-link>
				</li>
				<li style="height:1.2rem;"></li>
			</ul>
		</div>
	</div>	
	<myFooter></myFooter>
</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import Talk from "./talk.vue"
	import newMessage from "../common/newMessage.vue"
	import Loading from '../common/loading.vue'
	import myFooter from '../common/footer.vue'
	export default {
		data () {
			return {
				titleName:"我的消息",
				isLoading:true,
				nohead:"nohead",
				noBack:'noBack',
				isNewSysMessage:"",
				newSysMessageTime:"",
				isNewExMessage:"",
				newExMessageTime:"",
				s_cloudCount:"",
				cloudCount:"",
				page:1,
				rows:8,
				subList:[],
				service:"" // 客服消息
			}
		},
		components:{
			Talk,Heads,newMessage,Loading,myFooter
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			initMessageNum(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						messageType: "custom",
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111202, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
				    this.isNewSysMessage = response.body.messageWayRows[0].systemConent;
				    this.newSysMessageTime = response.body.messageWayRows[0].systemCreateTime;
				    this.isNewExMessage = response.body.messageWayRows[1].allConent;
				    this.newExMessageTime = response.body.messageWayRows[1].allCreateTime;
				    // 系统通知判断红点是否存在
				    this.s_cloudCount = response.body.messageWayRows[0].s_cloudCount;
				    // 互动消息判断红点是否存在	
				    this.cloudCount = response.body.messageWayRows[1].cloudCount;

				    this.loadingClose()
				})
			},
			Subscribe(){			
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: this.page,
						rows: this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560002, jsonValue:data},{emulateJSON:true}).then( response => {
				    console.log(response);
				    this.service = response.body.messageWork; // 客服消息
				    this.subList = response.body.rows; // 平台列表
				    console.log(this.subList);
				})
			
			}		
		},
		mounted(){
			this.initMessageNum();
			this.Subscribe();
		}
	}
</script>

<style scoped>
	#myMessage{
		padding-top: .84rem;
	}
	.messageClassify{
		width: 100%;
		padding: 0 0.2rem;
		border-bottom: 10px solid #eee;
		margin-bottom: -1px;
	}	
	.messageClassify .lis{
		width: 100%;
		height: 1.28rem;
		display: block;
		padding: 0.2rem 0;
		line-height: 0.88rem;
		position: relative;
		padding-left: 1.08rem;
		font-size: 0.28rem;
		color: #333;
		border-bottom: 1px solid #eee;
	}
	.message-time{
		position: absolute;
		top: 0rem;
		right: 0.2rem;
		font-size: 0.22rem;
		color: #A0A0A0;
	}
	.message-time span{
		margin-right: 0.1rem;
	}
	.systemMessage-img{
		display: inline-block;
		width: 0.88rem;
		height: 0.88rem;
		background: url(../../assets/image/my/my-mess-icon.png) no-repeat;
		background-size: 0.88rem 1.76rem;
		background-position: center 0;
		background-color: #ff9903;
		position: absolute;
		top: 0.2rem;
		left: 0;
	}
	.interactMessage-img{
		display: inline-block;
		width: 0.88rem;
		height: 0.88rem;
		background: url(../../assets/image/my/my-mess-icon.png) no-repeat;
		background-size: 0.88rem 1.76rem;
		background-position: center -0.88rem;
		background-color: #51ccb7;
		position: absolute;
		top: 0.2rem;
		left: 0;
	}
	.tatle{
		font-weight: 600;
		line-height: 0.5rem;
		height: 0.5rem;
	}
	.tip{
		font-size: 0.22rem;
		line-height: 0.5rem;
		height: 0.5rem;
		color: #A0A0A0;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	/*订阅样式*/
	.Subscribe_dl{
		height: 1.2rem;
		width: 94%;
		margin: 0.2rem auto;
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		border-bottom: 1px solid #f7f7f7;
 		color: #666;
	}
	.Subscribe_dt{
		height: 0.88rem;
		width: 0.88rem;
		position: relative;
	}
	.Subscribe_dt img{
		height: 100%;
		width: 100%;
	}
	.Subscribe_dd{
		margin-left: 0.2rem;
		width: 82%;
	}
	.Subscribe_dd span{
		float: right;
		font-size: 0.22rem;
		color: #cdcdce;
	}
	.Subscribe_dd_p2{
		color: #9c9d9d;
		margin-top: 0.1rem;
		 overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    /*-webkit-box-orient: vertical;*/
	    word-break: break-all;
	}
	.img_title{
		display: block;
	    width: 8px;
	    height: 8px;
	    background: red;
	    border-radius: 50%;
	    position: absolute;
	    top: -0.05rem;
	    right: -0.05rem;
	}
	.icon_service {
		width: 12px;
    	height: 12px;
		font-size: 10px;
		color: #fff;
		text-align: center;
		line-height: 12px;
	}
	.Subscribe_dd_p1 {
		overflow: hidden;
	}
	.Subscribe_dd_p1 .date {
		/*float: left;*/
		/*margin-left: .2rem;*/
		/*color:red;*/
	}
	.Subscribe_dd_p1 .time {
		/*float: right;*/
	}
	.Subscribe_dd_p1_txt {
		width: 42%;
		font-weight: 600;
		color: #000 !important;
		font-size: .28rem!important ;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		/*-webkit-box-orient: vertical;*/
		word-break: break-all;
		float: left !important;
	}

	.home_mian_1 {
		background: url(../../assets/image/footer/Tabbar_Home_Normal@3x.png) no-repeat;
		width: 0.5rem;
		height: 100%;
		background-size: contain;
		position: relative;
		left: 90.5%;
		background-position-y: center;
	}
</style>