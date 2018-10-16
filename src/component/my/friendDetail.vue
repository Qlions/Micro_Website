<template>
	<section id="myFriends">
		<Loading v-if="isLoading"></Loading>
		<div class="my-header">
			<div class="goback">
				<img v-on:click="goback" class="my-goback" src="../../assets/image/head-back.png"/>
			</div>
			<p class="my-title">详细资料</p>
			<span class="del-friend set-friend" @click="delFriend()">删除</span>
		</div>
		<div class="FD-container">
			<div class="FD-main">
				<div class="FD-info">
					<div class="FD-infoPic">
						<img :src="photosmall"/>
					</div>
					<div class="FD-infoName">
						<p>{{userName}}</p>
					</div>
				</div>
			</div>
			<div class="FD-infoTxt">
				<p class="FD-infoNickName"><span class="nickName info-left">昵称</span><span class="nickNameTxt info-right">{{userName}}</span></p>
				<p class="FD-infoUID"><span class="UID info-left">UID</span><span class="UIDTxt info-right">{{userCode}}</span></p>
			</div>
			<router-link :to="'/privateLetter/' + userName + '/' + frUserId" class="record-data-form-btn">
				<a class="post-btn" href="javascript:void(0);" @click="">发送消息</a>
			</router-link> 
		</div>
		<popup :message="message" v-show="errShow"></popup>
	</section>
</template>

<script>
	import Loading from '../common/loading.vue'
	import popup from'../common/error-popup.vue'
	export default {
		data () {
			return {
				isLoading:true,
				friendInfo:"",
				frUserId:this.$route.params.id,
				photosmall:"",
				userName:"",
				userCode:"",
				message:"",
				errShow:false
			}
		},
		components:{
			Loading,popup
		},
		methods:{
			goback () {
				this.$router.go(-1)
			},
			//好友信息
			initFriendInfo () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						userId:this.frUserId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211283, jsonValue:data},{emulateJSON:true}).then( response => {
					this.photosmall = response.body.photosmall;
					this.userName = response.body.userName;
					this.userCode = response.body.userCode;
//					console.log(response)
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			//删除好友
			delFriend () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					userId:userId,
					frUserId:this.frUserId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211206, jsonValue:data},{emulateJSON:true}).then( response => {		
					setTimeout(() => {
		                this.errShow = true;
						this.message = "删除好友成功"
		            }, 500)
				})
			}
		},
		mounted () {
			this.initFriendInfo()
		}
	}
</script>

<style scoped>
	.my-header{
		position: relative;
		width: 100%;
		height: 50px;
		background: #6aac34;
		clear: both;
		z-index: 99;
		border-bottom: 1px solid #f3f3f3;
	}
	.my-title{
		position: absolute;
		width: 100%;
		float: left;
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 0.36rem;
		font-size: 18px;
	}
	.goback{
		text-align: center;
		width: 50px;
		height: 50px;
		position: absolute;
		left: 0px;
		top: 0;
		display: block;
		z-index: 10;
	}
	.my-goback{
		width: 60%;
		margin-top: 10px;
	}
	.set-friend{
		position: relative;
		display: block;
		float: right;
		height: 1rem;
		width: 1rem;
		line-height: 1rem;
		text-align: right;
		right: 0.2rem;
		font-size: 14px;
		color: #666;
	}
	.FD-container{
		margin-top: 50px;
	}
	.FD-info{
		width: 93%;
		margin:0 auto;
		padding-top:0.4rem ;
		border-bottom:1px solid #eee;
		font-size: 14px;
		color: #333;
	}
	.FD-infoPic{
		width: 1.8rem;
		height: 1.8rem;
		margin: 0 auto;
		
	}
	.FD-infoPic img{
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
	}
	.FD-infoName{
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
	.FD-infoTxt{
		width: 93%;
		margin: 0 auto;
		padding: 0.3rem 0;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 0.2rem;
	}
	.FD-infoNickName{
		height: 0.4rem;
		line-height: 0.4rem;
		overflow: hidden;
	}
	.info-left{
		float: left;
		color: #999;
	}
	.info-right{
		float: right;
	}
	.record-data-form-btn{
		width: 100%;
		display: block;
	}
	.record-data-form-btn .post-btn {
		display: block;
		width: 93%;
		height: 0.8rem;
		margin: 0 auto;
		text-align: center;	
		vertical-align: middle;
		line-height: 0.8rem;
		background: #6aac34;
		color: #fff;
		font-size: 16px;
	}
</style>