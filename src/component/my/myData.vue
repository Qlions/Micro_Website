<template>
<section id="myData">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<div class="MD-container">
		<div class="myDetails-wrap clearfix">
			<div class="userPic">头像</div>
			<router-link to="/my/myIndex/changePic" class="myDetails-headerImg">
				<img :src="userInfo.userHeadImg"/>
			</router-link>		
			<div class="goto gotoImg"></div>
		</div>
		<div class="my-line"></div>
		<div>
			<ul>
				<router-link to="/my/basicData" class="dataList ">
					<li class="myDetailsList gotoImg">
						基本资料
					</li>
				</router-link>
				<div class="my-line"></div>
				<router-link to="/my/changePwd" class="dataList">
					<li class="myDetailsList gotoImg">
						修改密码
					</li>
				</router-link>
				<router-link to="/my/checkTel" class="dataList">
					<li class="myDetailsList gotoImg" v-if="mobile ==''">
						认证手机
					</li>
					<li class="myDetailsList gotoImg" v-if="mobile !=''">
						更换手机
					</li>
				</router-link>
				<router-link to="/my/checkEmail" class="dataList">
					<li class="myDetailsList gotoImg" v-if="email ==''">
						认证邮箱
					</li>
					<li class="myDetailsList gotoImg" v-if="email !=''">
						更换邮箱
					</li>
				</router-link>
				<div class="my-line"></div>
				<router-link to="/my/checkName" class="dataList" v-if="cerNo ==''">
					<li class="myDetailsList gotoImg">
						实名认证
						<span class="isName">未认证</span>
					</li>
				</router-link>
				<router-link :to='{path: "/my/checkedName", query:{ item:item}}' class="dataList" v-if="cerNo !=''">
					<li class="myDetailsList gotoImg">
						实名认证
						<span class="isName">已认证</span>
					</li>
				</router-link>
				<div class="my-line"></div>
			</ul>
		</div>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				isLoading:true,
				item:{},
				doctors:[],
				page:1,
				rows:9,
				titleName:"个人资料",
				userInfo:{
					userHeadImg: "../src/assets/image/DefaultAvatar.png"
				},
				mobile:"",
				email:"",
				name:"",
				cerNo:""
			}
		},
		computed:{

		},
		components:{
			Heads,
			Loading
		},
		methods: {
			initPhoto(){
				let str = this.$cookie.get('userInfo');
				let userInfo = JSON.parse(str);
				//根据昵称获取头像
				let token = userInfo.token;
				console.log(userInfo)
				let res = JSON.stringify({userName:userInfo.userName,userType:1});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
					console.log(response)
					this.response = JSON.parse(response.body.state)[0];
					this.item = JSON.stringify(this.response);
					this.userInfo.userHeadImg = this.response.photomiddle;
					this.name = this.response.name;
					this.cerNo = this.response.iscertNo;
					let that = this;
					setTimeout(function(){
						if(that.isLoading){
							that.isLoading = false
						}
					},1000)
				})
			}
		},
		mounted:function(){
			console.log(1)
			let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
			console.log(2)
			this.mobile = userInfo.identifyMobile;
			this.email = userInfo.identifyEmail;
			this.initPhoto()
		}
	}
</script>

<style scoped>
#myData{
	background: #f2f2f2;
	width: 100%;
	height: 100%;
	position: absolute;
	padding-top: .84rem;
}
#myDataLoading{
	z-index: 999;
	top: 0.84rem;
}
.myDetails-wrap{
	position: relative;
	width: 100%;
	height: 1.6rem;
	text-align: center;
	padding: 0.2rem 1.2rem 0.2rem 0.3rem;
	background: #fff;
	font-size: 0.28rem;
	color: #666;
}
.userPic{
	float: left;
	line-height: 1.4rem;
}
.myDetails-headerImg{
	display: block;
	float: right;
	height: 1.28rem;
	width: 1.28rem;
	border:2px solid #gray;
	border-radius: 0.64rem;
	margin: 0 auto;
	overflow: hidden;
}
.myDetails-headerImg img{
	display: block;
	width: 100%;
	height: 100%;
}
.dataList{
	background-color: #fff;
	display: block;
	padding: 0 0.3rem;
	
}
.myDetailsList{
	display: block;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	font-size: 0.28rem;
	border-bottom: 1px solid #eee;
	color: #666;
	position: relative;
}
.goto{
	position: absolute;
	width: 0.7rem;
	height: 0.7rem;
	top: 0.49rem;
	right: 0.3rem;
}
.gotoImg{
	background: url(../../assets/image/head-back-right.png) no-repeat center right ;
	background-size: 0.7rem;
}
.my-line{
	width: 100%;
	height: 0.2rem;
	background-color: #f2f2f2;
}
.isName{
	float: right;
	color: #ff5454;
	margin-right: 0.6rem;
}
.loadTop {
	background: #fff !important;
	z-index: 2;
}
</style>