<template>
	<section id="privateLetter">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading"></Loading>
		<div class="PLetter-container">
			<ul class="PLetter-list">
				<li class="PLetter-list-item" v-for="(item,index) in list">
					<div class="list-pic">
						<img :src="item.photosmall"/>
					</div>
					<div class="list-right">
						<div class="timeBox">
							<span class="list-right-t">{{item.createTime | substring(11,16)}}</span>
						</div>
						
						<div class="list-right-box" >
							<!--<span list-right-t>{{item.createTime | substring(11,16)}}</span>-->
							<span class="list-right-b" :class="{blue:item.userName != titleName}">{{item.conent}}</span>
						</div>
						
					</div>
				</li>
			</ul>
		</div>
		<div class="foot">
			<div class="messSend">
				<label>
					<input type="text" id="sendMessage" v-model="messageTxt"/>
				</label>
				<a @click="sendMessage()" >发送</a>
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
				titleName:this.$route.params.frUserName,
				frUserId:this.$route.params.frUserId,
				isLoading:true,
				list:[],
				messageTxt:""
			}
		},
		params:["frUserId"],
		components:{
			Heads,
			Loading
		},
		methods: {
			initPrivateLetter:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					userId:this.frUserId,
					page:1,
					rows:8
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211242, jsonValue:data},{emulateJSON:true}).then( response => {
					this.list = response.body.rowList
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
						
				})
			},
			sendMessage () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					ids: this.frUserId,
					privateLetter:'letter',
					contentLetter:this.messageTxt
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211240, jsonValue:data},{emulateJSON:true}).then( response => {
//					console.log(response)
					this.initPrivateLetter();
				})
			}	
		},
		mounted: function() {
			this.initPrivateLetter();
		}
		
	}
</script>

<style scoped>
	#privateLetter{
		padding-top: 50px;
	}
	.PLetter-list{
		width: 100%;
	    margin: 0.5rem auto;
	    padding: 0 0.3rem;
	    padding-bottom: 10px;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.PLetter-list-item{
		overflow: hidden;
		position: relative;
		margin-bottom: 0.6rem;
	}
	.PLetter-list-item .list-pic{
		margin-right: 0.2rem;
		width:0.8rem;
		height: 0.8rem;
		position: absolute;
		overflow: hidden;
		border-radius: 50%;
		border:1px solid #eee;
	}
	.PLetter-list-item .list-pic img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.list-right{
	    padding-left: 1.2rem;
		padding-right: 0.6rem;
	}
	.timeBox{
		
	}
	.list-right-t{
		margin: 0 auto;
		display:inline-block;
		line-height: 0.4rem;
		height: 0.4rem;
		color: gray;
		background: #f2f2f2;
		padding: 0 0.2rem;
		border-radius: 3px;
		margin-bottom: 0.3rem;
	}
	.list-right-b{
		display: inline-block;
		background: #f2f2f2;
		line-height: 0.4rem;
		color: gray;
		padding: 0.1rem 0.2rem;
		border-radius: 3px;
		white-space: normal;
	    word-break: break-all;
	}
	.foot{
		background: #eee;
	    height: 1rem;
	    width: 100%;
	    position: fixed;
	    left: 0;
	    right: 0;
	    text-align: center;
	    z-index: 1;
	    border-top: 1px solid #ddd;
	    bottom: 0;
	}
	.messSend{
		float: left;
	    width: 100%;
	    padding: 0 10px;
	    position: relative;
	    overflow: hidden;
	}
	.messSend label {
    	float: left;
	    width: 100%;
	    height: 0.6rem;
	    line-height: 34px;
	    padding-left: 0.2rem;
	    margin-top: 0.2rem;
	    background: #eee;
	    padding-right: 1.2rem;
	}
	.messSend label input{
		float: left;
	    width: 100%;
	    padding: 0 5px;
	    height: 0.6rem;
	    line-height: 34px;
	    border: 1px solid #dcdcdc;
	    background: #fff;
	    font-size: 14px;
	}
	.messSend a{
		position: absolute;
	    right: 10px;
	    top: 0;
	    width: 1rem;
	    height: 1rem;
	    line-height: 1rem;
	    text-align: center;
	    color: #333;
	    font-size: 14px;
	}
	.blue{
		background: lightblue;
	}
</style>