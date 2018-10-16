<template>
	<div class="talk_list">
		<div class="listLoading" v-if="isLoading">
			<i>努力加载中...</i>
			<span></span>
		</div>
		<scroller style="top:188px;width:95%;margin:0 auto;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			v-if='isLoading == false'
    	>
			<ul class="lists">
				<router-link :to="'/privateLetter/' + userName + '/' + frUserId" class="talkList" v-for="(item,index) in talk" :key="index">
					<label>
						<div class="left"><img :src="item.PHOTOSMALL"/></div>
						<div class="right">
							<p><span class="span_l">{{item.senduserName}}</span><span class="span_r">{{item.createTime?item.createTime.substring(0,10):""}}</span></p>
							<p class="cont">{{item.content}}</p>
						</div>
					</label>
				</router-link>
			</ul>
		</scroller>
	</div>
</template>

<script>
	
	export default {
		data () {
			return {
				talk:[],
				isLoading:true,
				page:1,
				rows:8,
				userName:[],
				frUserId:[]
			}
		},
		methods:{
			initTalkList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: this.page,
						rows: this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211241, jsonValue:data},{emulateJSON:true}).then( response => {
						this.talk = response.body.rowList;
						console.log(this.talk)
						for(let i in this.talk){
							let talkName = this.talk[i].senduserName
						};
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.initTalkList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page: this.page,
						rows: this.rows+8
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211241, jsonValue:data},{emulateJSON:true}).then( response => {
					this.talk = response.body.rowList;
					if (this.rows >= response.body.rowList.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						this.lists = response.body.rowList;
						done();					
					}, 1500)
					this.rows+=8;
				})
				
			}
			
		},
		mounted:function(){
			this.initTalkList()
		}
	}
</script>

<style scoped>
	.lists{
		width: 100%;
	    margin: 0 auto;
	    padding: 0 0.2rem;
	    padding-bottom: 0.2rem;
	    position: relative;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.talkList{
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
		float: left;
		color: #a0a0a0;
	}
	.span_r{
		float: right;
		color: #a0a0a0;
	}
	.cont{
		color: #a0a0a0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.listLoading {
		text-align: center;
		width: 100%;
	}
	.listLoading i {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: 14px;
		color: #A0A0A0;
		display: inline-block;
	}
	/*@-webkit-keyframes loading {
	0% {
		-webkit-transform:rotate(0deg);
		transform:rotate(0deg)
	}
	100% {
		-webkit-transform:rotate(360deg);
		transform:rotate(360deg)
	}
	}
	@keyframes loading {
	0% {
		transform:rotate(0deg)
	}
	100% {
		transform:rotate(360deg)
	}
	}*/
</style>