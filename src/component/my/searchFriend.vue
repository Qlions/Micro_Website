<template>
<section id="searchFriend">
	<Heads :title="titleName"></Heads>
	<div class="searchContainer">
		<input class="my-search" type="text" autofocus="autofocus" placeholder="健康云ID号/昵称/手机号" v-model="searchValue" @change="searchFriendList">
	</div>
	<ul class="lists">
		<router-link :to="'myFriends/friendDetail/' + item.userId" class="item" v-for="(item,index) in searchFriends" key = "item.name">
			<label>
				<div class="left"><img :src="item.photosmall"/></div>
				<div class="right">
					<p class="cont">{{item.name}}</p>
					<p><span class="span_l">健康云：</span><span class="span_r">{{item.userName}}</span></p>						
				</div>
			</label>
			<div class="addFriend" v-if="item.isFriend == 4">加好友</div>
			<router-link :to=" '/privateLetter/' + item.userName + '/' + item.userCode " class="addFriend" v-if="item.isFriend == 2">私信</router-link>
		</router-link>
	</ul>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				searchFriends:[],
				titleName:"查找好友",
				searchValue:""
			}
		},
		components:{
			Heads
		},
		methods:{
			searchFriendList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page:1,
					rows:20,
					searchValue:this.searchValue
				});
				console.log(data)
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211207, jsonValue:data},{emulateJSON:true}).then( response => {
					
					this.searchFriends = response.body.rowList;
					
				})
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style scoped>
	#searchFriend{
		padding-top: 50px;
	}
	.searchContainer{
		width: 100%;
		padding: 0.2rem 0.4rem;
	}
	.my-search{
		width: 100%;
		overflow: hidden;
		padding: 0.12rem 0.2rem 0.12rem 0.52rem;
		border: 1px solid #eee;
	}
	.lists{
		width: 100%;
	    margin: 0 auto;
	    padding: 0 0.2rem;
	    padding-bottom: 0.2rem;
	    position: relative;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.item{
		display: block;
		overflow: hidden;
	    width: 100%;
	    border-bottom: 1px solid #eee;
	    padding: 0.3rem 0;
	    position: relative;
	    margin-bottom: -1px;
	}
	.left{
		margin-right: 0.2rem;
		width:0.8rem;
		height: 0.8rem;
		overflow: hidden;
		float: left;
		border: 1px solid #eee;
		border-radius: 50%;
	}
	.left img{
		width: 100%;
		height: 100%;
	}
	.right{
		float: right;
		width: 85%;
	}
	.right p{
		height: 0.5rem;
		line-height: 0.5rem;
		
	}
	.span_l{
		display: block;
		float: left;
		color: #a0a0a0;
	}
	.span_r{
		display: block;
		float: left;
		color: #a0a0a0;
	}
	.cont{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #000;
	}
	.addFriend{
		position: absolute;
		background: #6aac34;
		right: 0;
		bottom: 0.5rem;
		color: #fff;
		padding: 0.1rem 0.15rem;
		border-radius: 3px;
	}
</style>