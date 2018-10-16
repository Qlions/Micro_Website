<template>
	<div>
		<!-- <footer>
			<ul>
				<li>
					<router-link to="/home">
						<dl>
							<dt class="footer_icon footer_home"></dt>
							<dd class="footer_name">首页</dd>
						</dl>
					</router-link>
				</li>
				<li>
					<router-link to="/server">
						<dl>
							<dt class="footer_icon footer_server"></dt>
							<dd class="footer_name">服务</dd>
						</dl>
					</router-link>
				</li>
				<li>
					<router-link to="/doctor">
						<dl>
							<dt class="footer_icon footer_doctor"></dt>
							<dd class="footer_name">医生</dd>
						</dl>
					</router-link>
				</li>
				<li>
					<router-link to="/news" class="homeMessage">
						<newMessage v-if="cloudCount != 0 || s_cloudCount != 0" :class="[home]"></newMessage>
						<dl>
							<dt class="footer_icon footer_news"></dt>
							<dd class="footer_name">消息</dd>
						</dl>
					</router-link>
				</li>
				<li>
					<router-link to="/my" class="homeOrder">
						<newMessage v-if="newOrder1!=''||newOrder2!=''||newOrder3!=''" :class="[home]"></newMessage>
						<dl>
							<dt class="footer_icon footer_my"></dt>
							<dd class="footer_name">我的</dd>
						</dl>
					</router-link>
				</li>
			</ul>
		</footer> -->
		<div class="head_content_box" v-if="isHide">
			<div class="content_51_div">
				<div class="content_51_div-left">
					<div class="content_51_div_x" @click="head_x">
						<img src="../../assets/image/content_51_div_x.png" alt="">
					</div>
					<div class="content_51_div_box">
						<div class="content_51_div_box_logo">
							<img src="../../assets/image/content_51_div_logo.png" alt="">
						</div>
						<div class="content_51_div_box_txt">
							<p>使用中国健康云App有优惠</p>
						</div>
					</div>
				</div>
				<div class="content_51_div_btn">
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app">下载</a>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import newMessage from "./newMessage.vue"
	export default {
		data () {
		  return {
		  	isHide:true,
		    isNewSysMessage:"",
		    isNewExMessage:'',
		    friendCount:"",
		    home:"homeRed",
		    newOrder1:"",
		    newOrder2:"",
		    newOrder3:"",
		    s_cloudCount:"",
		    cloudCount:""
		  }
		},
		components:{
			newMessage
		},
		mounted:function(){
			if( sessionStorage.getItem('content_51_div') == 1 ){
				this.isHide = false;
			}
			this.isToken()
		},
		methods:{
			//判断是否有token
			head_x () {
				this.isHide = false;
				sessionStorage.setItem('content_51_div', 1);
			},
			isToken(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(userInfo){
					this.initMessageNum()
					this.isNoDellOrder()
				}
			},

			//判断是否有新消息
			initMessageNum(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						messageType: "custom",
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111202, jsonValue:data},{emulateJSON:true}).then( response => {		   
				   // 系统通知判断红点是否存在
				    this.s_cloudCount = response.body.messageWayRows[0].s_cloudCount;
				    // 互动消息判断红点是否存在	
				    this.cloudCount = response.body.messageWayRows[1].cloudCount;
				    
				},response => {
					console.log(response)
				})
			},
			//判断是否有未处理订单
			isNoDellOrder(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data1 = JSON.stringify({
					page: 1,
					rows: 1,
					orderState: 0,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data1},{emulateJSON:true}).then( response => {
					this.newOrder1 = response.body.rows
//					console.log(this.newOrder1)
				},response => {
					console.log(response)
				})
				let data2 = JSON.stringify({
					
					page: 1,
					rows: 1,
					orderState: 4,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data2},{emulateJSON:true}).then( response => {
					this.newOrder2 = response.body.rows
//					console.log(this.newOrder2)
				},response => {
					console.log(response)
				})
				let data3 = JSON.stringify({
					page: 1,
					rows: 1,
					orderState: 3,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660086, jsonValue:data3},{emulateJSON:true}).then( response => {
					this.newOrder3 = response.body.rows
//					console.log(this.newOrder3)
				},response => {
					console.log(response)
				})
			}
		}
	}
</script>
<style>
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #55575f;
		padding-top: 0.15rem !important;
		padding-bottom: .05rem !important;
		z-index: 1000;
	}
	footer li {
		width: 20%;
		float: left;
	}
	footer li a {
		display: inline-block;
		width: 100%;
		color: #fff;
	}
	footer dl {
		width: 100%;
	    height: 0.9rem;
	}
	footer dl dt {
	    text-align: center;
	    width: 100%;
	    height: 50%;
	    margin: 0 auto;
	}
	footer dl dd {
		text-align: center;
		font-size: 0.24rem;
		line-height: 0.3rem;
		margin-top: 0.1rem;
	}
	.footer_home {
		background: url('../../assets/image/footer/Tabbar_Home_Normal@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.footer_server {
		background: url('../../assets/image/footer/Tabbar_Service_Normal@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.footer_doctor {
		background: url('../../assets/image/footer/Tabbar_Doctor_Normal@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.footer_news {
		background: url('../../assets/image/footer/Tabbar_Messsage_Normal@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.footer_my {
		background: url('../../assets/image/footer/Tabbar_Mine_Normal@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.router-link-active .footer_home {
		background: url('../../assets/image/footer/Tabbar_Home_Select@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	    
	}
	.router-link-active .footer_server {
		background: url('../../assets/image/footer/Tabbar_Service_Select@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.router-link-active .footer_doctor {
		background: url('../../assets/image/footer/Tabbar_Doctor_Select@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.router-link-active .footer_news {
		background: url('../../assets/image/footer/Tabbar_Messsage_Select@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.router-link-active .footer_my {
		background: url('../../assets/image/footer/Tabbar_Mine_Select@3x.png') no-repeat;
	    background-size: contain;
	    background-position-x: center;
	}
	.router-link-active{
		color: #fff;
	}
	.homeMessage,.homeOrder{
		position: relative;
	}
	.content_51_div {
	  	height: 1.16rem;
	  	width: 100%;
	  	line-height: 1.16rem;
	  	background: #000;
		position: fixed;
		bottom: 0;
		opacity: .8;
	}
	.content_51_div-left {
	  	width: 80%;
	  	float: left;
	}
	.content_51_div_x {
	  	width: 16px;
	  	height: 1.16rem;
	  	line-height: 1.16rem;
	  	display: inline-block;
	  	margin-left: 2.5%;
	  	float: left;
	}
	.content_51_div_x img {
	  	width: 100%;
	  	height: auto;
	  	vertical-align: middle;
	}
	.content_51_div_box {
	  	width: 80%;
	  	float: left;
	}
	.content_51_div_box_logo {
	  	width: 35px;
	  	height: 1.16rem;
	  	line-height: 1.16rem;
	  	margin-left: 5%;
	  	margin-right: 2.5%;
	  	float: left;
	}
	.content_51_div_box_logo img {
	  	width: 100%;
	    height: auto;
	    vertical-align: middle;
	}
	.content_51_div_box_txt {
		float: left;
		color: #fff;
		font-size: .28rem;
	}
	.content_51_div_btn {
		width: 20%;
		height: 1.16rem;
		background: red;
		float: left;
	}
	.content_51_div_btn a {
		color: #fff;
		text-align: center;
		display: block;
		font-size: .28rem;
	}
</style>