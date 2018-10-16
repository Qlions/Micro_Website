<template>
	<section id="my">
		<div v-show="isShow1" class="wodeApp">
			<!--点击退出时的弹出框-->
			<div class="popupBox" v-if="isLoginOut">
				<div class="popupItem">
					<p>您确定要退出吗</p>
					<div class="bottom_box">
						<span @click="close()">取消</span>
						<i @click="sureOut()">确定</i>
						<em></em>
					</div>
				</div>
			</div>
			<Heads :title="titleName" :class = "[noBack]">
				<router-link :to='{ path:"/home/main"}'>
					<div class="home_mian_1"></div>
				</router-link>
			</Heads>
			<router-link to="/my/myData" class="wode-user white list4" v-on:click="myDetailsToggleShow">
				<div class="wode-user-headerImg"><img :src="userInfo.userHeadImg"/>	</div>
				<div class="wode-user-name">
					<div class="username">{{userInfoVal.userName}}</div>
					<div class="userid">UID: {{userInfoVal.userCode}}</div>
				</div>
				<div class="goto gotoImg"></div>
			</router-link>
			<!--<div class="my-line"></div>-->
			<div class="list1 white">
				<!--<router-link to="/my/myMessage" class="lis"><span class="Myicon1"></span>消息</router-link>-->
				<router-link to="/my/myRegister" class="lis gotoImg"><span class="myRegsiter"></span>预约挂号</router-link>
				<router-link to="/my/myConsult" class="lis gotoImg"><span class="Myicon2"></span>健康咨询</router-link>
				<router-link to="/my/myDoctor" class="lis gotoImg"><span class="Myicon3"></span>家庭医生</router-link>
				<router-link to="/my/myOrders" class="lis gotoImg">
					<span class="Myicon4">
						<newMessage v-if="newOrder1!=''||newOrder2!=''||newOrder3!=''"></newMessage>
					</span>服务订单
				</router-link>
				<!--<router-link to="/my/mySquare" class="lis"><span class="Myicon7"></span>健康广场</router-link>-->
				<router-link to="myConsult/subscribe" class="lis gotoImg"><span class="Myicon_manag"></span>订阅管理</router-link>
				<router-link to="/my/myWallet" class="lis gotoImg"><span class="MyWalletIcon"></span>钱包</router-link>
				
			</div>
			<div class="list2 white">
				<!--<router-link to="/my/myFriends" class="lis"><span class="Myicon5"></span>好友</router-link>-->
				<router-link to="/my/myConcern" class="lis gotoImg"><span class="Myicon6"></span>关注</router-link>
				<router-link to="/serverConfirm/addrManage" class="lis gotoImg"><span class="Myicon8"></span>地址</router-link>
				<router-link to="/my/myServiceOrder" class="lis gotoImg"><span class="serveic"></span>客服中心</router-link>
			</div>
			<!--注销账号-->
			<ul class="list3 white" @click='logOut'>
				<li class="liss"><span class="Myicon9"></span>注销我的账号</li>
			</ul>
			<div class="exit-container white">
				<div class="exit" @click="isOut">退出</div>
			</div>
			<myFooter></myFooter>
			<cancelUser style='position: fixed; top: 0; z-index:20;' v-show="iscacelUser" @nolog='logOutNo' @logOutUser="logOutUser" ></cancelUser>
		</div>

		<!--<div v-show="isShow2" class="myDetails">
			<div class="myDetails-header">
					<p class="myDetails-title">账户管理</p>
					<span v-on:click="myDetailsToggleShow" class="myDetails-close"></span>
			</div>
			<div class="myDetails-wrap">
				<router-link to="/my/myIndex/changePic" class="myDetails-headerImg">
					<img :src="userInfo.userHeadImg"/>
				</router-link>				
				<p class="myDetails-username">{{userInfoVal.userName}}</p>
				<p class="myDetails-telphone">ID:{{userInfoVal.userCode}}</p>
			</div>
			<div>
				<ul>
					<router-link to="/my/basicData">
					<li class="myDetailsList">
						<span class="myDetailsList-img1"></span>
						基本资料
					</li>
					</router-link>
					<router-link to="/my/changePwd">
					<li class="myDetailsList">
						<span class="myDetailsList-img2"></span>
						修改密码
					</li>
					</router-link>
				</ul>
			</div>
		</div>-->
	</section>

	
</template>
<script>
	import Heads from '../common/head.vue'
	import myFooter from '../common/footer.vue'
	import newMessage from "../common/newMessage.vue"
	import cancelUser from "./cancelUser.vue"
	export default {
		data () {
			return {
				userInfo:{
					username: "",
					userId: "",
					userHeadImg: "../src/assets/image/DefaultAvatar.png",
					telphone: "",
				},
				userInfoVal:"",
				isShow1:true,
				isShow2:false,
				titleName:"我的",
				newOrder1:"",
				newOrder2:"",
				newOrder3:"",
				noBack:"noBack",
				isLoginOut:false,
				iscacelUser: false
			}
		},
		methods:{
			initUserInfo: function(){
				let str = this.$cookie.get('userInfo');
				if(str){
					this.userInfoVal = JSON.parse(str);
					let userInfo = JSON.parse(str);
					//根据昵称获取头像
					let token = userInfo.token;
					let res = JSON.stringify({userName:userInfo.userName,userType:1});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
						this.response = JSON.parse(response.body.state)[0];
						this.userInfo.userHeadImg = this.response.photomiddle;
					})
				}
			},
			myDetailsToggleShow: function(){
				if(this.isShow2==true){
				this.isShow2=false;
				this.isShow1=true;
				}else{
				this.isShow2=true;
				this.isShow1=false;
				}

			},
			goback: function(){
				this.$router.go(-1);
			},
			isOut(){
				this.isLoginOut = true;
			},
			close(){
				this.isLoginOut = false;
			},
			sureOut:function(){
				this.$cookie.delete('userInfo');
				this.$router.push({ path: '/home/main' }) 
			},
			isNewMessage:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo)
				if(userInfo){
					let token = userInfo.token;
					let data = JSON.stringify({
							messageType:'custom'
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111202, jsonValue:data},{emulateJSON:true}).then( response => {
				
					})
				}
			},
			//判断是否有未处理订单
			isNoDellOrder(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(userInfo){
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
					})
				}
			},
			isFirstLoading(){
				if(!this.$cookie.get('userInfo')){
					console.log('b')
					let ojj = {'flag':3}
					ojj = JSON.stringify(ojj);
					localStorage.setItem("temp", ojj);
					console.log(localStorage.getItem("temp"))
					this.$router.push({"path":'/login'});
				}else{
					this.initUserInfo();
					this.isNewMessage()
					this.isNoDellOrder()
				}
			},
			// 注销账号
			logOut(){
				this.iscacelUser = true;
			},
			logOutNo(){
				this.iscacelUser = false;
			},
			logOutUser(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					userId: userId
				});
				let vm = this;
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType: 200005,jsonValue: data }, {emulateJSON: true}).then( response =>{
					if(response.body.state == "suc"){
						vm.$cookie.delete('userInfo');
						vm.$router.push({ "path": "/home/main"})
					}
					
				})
			}
		},
		created (){
			
		},
		mounted (){
			let that = this;
			setTimeout(function(){
				that.isFirstLoading()
			},100)
		},
		components: {
			myFooter,Heads,newMessage,cancelUser
		}
	}
</script>
<style scoped>
#my{
	width: 100%;
	height: 115%;
	padding-top: .84rem;
	position: absolute;
	background: #f2f2f2;
}
.white{
	background: #fff;
}
.myDetails-header{
	position: relative;
	width: 100%;
	height: 1rem;
	background: #464646;
	clear: both;
	z-index: 99;
	border-bottom: 1px solid #d7ebf0;
}
.myDetails-title{
	position: absolute;
	width: 100%;
	float: left;
	text-align: left;
	line-height: 1rem;
	color: #fff;
	font-size: 0.36rem;
	padding-left: 0.2rem;
}
.myDetails-close{
	display: inline-block;
	width: 0.48rem;
	height: 0.48rem;
	background: url(../../assets/image/my/close_icon.png) no-repeat center center;
	background-size: 150%;
	position: absolute;
	right: 0.3rem;
	top: 0.2rem;
}
.wodeApp{
	width:100%;
	font-family: "微软雅黑", "arial";
}
.wode-user{
    display:flex;
/*    justify-content:center;*/
    align-items:center;
	width: 100%;
	height: 1.68rem;
	padding: 0 0.4rem 0 0.2rem;
	position: relative;
}
.my-line{
	width: 100%;
	height: 0.2rem;
	background-color: #f2f2f2;
}
.wode-user-headerImg{
	height: 1.28rem;
	width: 1.28rem;
	border-radius: 50%;
	overflow: hidden;
}
.wode-user-headerImg img{
	height: 100%;
	width: 100%;
}
.myDetails-headerImg{
	display: block;
	height: 1.28rem;
	width: 1.28rem;
	border-radius: 0.64rem;
	margin: 0.1rem auto;
	overflow: hidden;
}
.myDetails-headerImg img{
	display: block;
	width: 100%;
	height: 100%;
}

.wode-user-name{
	display: inline-block;
	margin-left: 0.4rem;
}
.wode-user-name .username{
	font-size: 0.32rem;
	line-height: 0.48rem;
	color: #333;
}
.wode-user-name .userid{
	font-size: 0.24rem;
	line-height: 0.48rem;
	color: #999;
}
.list1,.list2,.list3,.list4{
	padding: 0 0.2rem;
	margin-bottom: 0.2rem;
}
.lis{
	display: block;
	height: 0.88rem;
	line-height: 0.88rem;
	border-bottom: 1px solid #eee;
	color: #333;
	font-size: 14px;
	position: relative;
	padding-left: 0.6rem;
}
.lis .Myicon_manag {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../assets/image/my/Person_account_Rubscribe@3x.png) no-repeat;
	background-size: 0.4rem .4rem;
	position: absolute;
	left: 0;
	top: 0.22rem;
}
.lis .myRegsiter {
	display: inline-block;
	width: 0.4rem;
	/*height: 0.4rem;*/
	background: url(../../assets/image/my/regsiterpic.png) no-repeat;
	background-size: contain;
	position: absolute;
	left: 0;
	top: 0.22rem;
}
.lis .serveic{
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../assets/image/my/icon_service.png) no-repeat;
	background-size: 100%;
	position: absolute;
	left: 0;
	top: 0.22rem;
}
.lis span{
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../assets/image/my/My-user-icon.png) no-repeat;
	background-size: 0.4rem 4rem;
	position: absolute;
	left: 0;
	top: 0.22rem;
}
.liss{
	display: block;
	height: 0.88rem;
	line-height: 0.88rem;
	color: #333;
	font-size: 14px;
	position: relative;
	padding-left: 0.6rem;
}
.liss span{
	display: inline-block;
	width: 0.38rem;
	height: 0.38rem;
	background: url(../../assets/image/my/cancel.png) no-repeat;
	background-size: cover;
	position: absolute;
	left: 0;
	top: 0.22rem;
}

.Myicon1{
	background-position: 0px 0px !important;
}
.Myicon2{
	background-position: 0px -0.8rem !important;
}
.Myicon3{
	background-position: 0px -1.2rem !important;
}
.Myicon4{
	background-position: 0px -1.6rem !important;
}
.Myicon5{
	background-position: 0px -2rem !important;
}
.Myicon6{
	background-position: 0px -2.4rem !important;
}
.Myicon7{
	background-position: 0px -2.4rem !important;
}
.Myicon8{
	background-position: 0px -2.8rem !important;
}

.lis .MyWalletIcon{
	background: url(../../assets/image/my/my_red_packet.png) no-repeat;
	background-size: 0.35rem 0.35rem;
}
.exit{
	width:100%;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	color: #ff5454;
	font-size: 0.28rem;
}
/*.myDetails-wrap{
	width: 100%;
	height: 2.8rem;
	background: url(../../assets/image/my/user-contral-bg.png) no-repeat;
	background-size: 100% 100%;
	text-align: center;
	padding: 0.2rem 0;
}
.myDetails-username{
	margin-top: 0.1rem;
	font-size: 0.28rem;
}
.myDetails-telphone{
	font-size: 0.24rem;
}
.myDetailsList{
	display: block;
	width: 100%;
	height: 1rem;
	padding-left: 1.2rem;
	border-bottom: 1px solid #eee;
	line-height: 1rem;
	font-size: 0.28rem;
	color: #666;
	position: relative;
}*/
/*.myDetailsList-img1{
	display: inline-block;
	background: url(../../assets/image/my/index_login_icon_01-gray.png) no-repeat center center;
	background-size: 100%;
	width: 0.48rem;
	height: 0.48rem;
	position: absolute;
	left: 0.4rem;
	top: 0.25rem;
}
.myDetailsList-img2{
	display: inline-block;
	background: url(../../assets/image/my/index_login_icon_03-gray.png) no-repeat center center;
	background-size: 100%;
	width: 0.48rem;
	height: 0.48rem;
	position: absolute;
	left: 0.4rem;
	top: 0.25rem;
}*/
.goto{
	position: absolute;
	width: 0.7rem;
	height: 0.7rem;
	top: 0.49rem;
	right: 0.2rem;
}
.gotoImg{
	background: url(../../assets/image/head-back-right.png) no-repeat center right ;
	background-size: 0.7rem;
}
/*弹出框样式*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popupItem{
		color: #666;
		width: 80%;
		position: absolute;
		top:35%;
		left: 10%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupItem p{
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
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
		color: #666;
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