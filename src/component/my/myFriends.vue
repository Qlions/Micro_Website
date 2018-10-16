<template>
<section id="myFriends">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading"></Loading>
	<div class="MF-container">
		<div class="searchContainer">
			<input class="my-search" type="text" placeholder="健康云ID号/昵称/手机号" v-model="inValue" @click="search">
		</div>
		<ul class="lists">
			<router-link :to="'myFriends/friendDetail/' + item.frUserId" class="item" v-for="item in friends" key = "item.nickName">
				<label>
					<div class="left"><img :src="item.photosmall"/></div>
					<div class="right">
						<p class="cont">{{item.aliasName?item.aliasName:item.name}}</p>
						<p><span class="span_l">健康云：</span><span class="span_r">{{item.nickName}}</span></p>						
					</div>
				</label>
			</router-link>
		</ul>
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
				inValue:"",
				friends:[],
				titleName:"我的好友"
			}
		},
		components:{
			Heads,
			Loading
		},
		methods: {
			initFriendList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let date=new Date;
				let year=date.getFullYear(); 
				let month=date.getMonth()+1;
				let data = JSON.stringify({
					page:1,
					rows:200,
					status:'all',
					healthYear:year,
					healthMonth:month,
					isApp:'app'
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211205, jsonValue:data},{emulateJSON:true}).then( response => {
					this.friends = response.body.rowList;
//					console.log(response)
					this.isLoading = false
					
				})
			},
			search:function(){
				this.$router.push({path:'myFriends/searchFriend'})
			},
			addFriend:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				
			}
		},
		mounted:function(){
			this.initFriendList()
		}
	}
</script>

<style scoped>
	input{
		-webkit-appearance: none; -moz-appearance: none; -o-appearance: none; appearance: none;
		border: none;
		background: none;
		outline: none;
	}
	.MF-container{
		margin-top: 50px;
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
	.right .cont{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #000;
	}
</style>