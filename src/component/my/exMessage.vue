<template>
<div id="exMessage">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading"></Loading>
	<scroller style="top:50px;width:100%;margin:0 auto;background: #f2f2f2;"
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if='isLoading == false'
	>
		<div class="content">
			<dl v-for="item in messages">
				<dt>{{item.createTime | substring(0,10)}}</dt>
				<dd>
					<div class="box">
						<div class="main">
							<p>{{item.messageConent}}</p>
							<p class="message_type" v-if="item.messageParticipateStatus=='pfmg_action'">活动消息</p>
							<p class="message_type" v-if="item.messageParticipateStatus=='pfmg_cricle'">广场消息</p>
							<p class="message_type" v-if="item.messageParticipateStatus=='add_friends'">好友消息</p>
						</div>
						<div class="is_agree" v-if="item.messageTitle==1&&item.messageLookStatus==5">
							已同意
						</div>
						<div class="is_agree" v-if="item.messageTitle==2">
							已拒绝
						</div>
						<div class="is_agree chance" v-if="(item.messageTitle==null&&item.messageLookStatus==3)||(item.messageTitle==null&&item.messageLookStatus==5)">
							<span class="black" @click="agree(item.userMessageId)">同意</span>
							<span class="red" @click="disagree(item.userMessageId)">拒绝</span>
						</div>
					</div>
				</dd>
				
			</dl>
		</div>
	</scroller>
	<popup :message="message" v-show="errShow"></popup>
</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import popup from'../common/error-popup.vue'
	export default {
		data () {
			return {
				title:"中国健康云",
				titleName:"互动消息",
				isLoading:true,
				messages:[],
				errShow:false,
				state:"",
				isLoading:true,
				page:1,
				rows:6
			}
		},
		computed:{
			show:function(){
				if(this.messages!=[]){
					return false
				}else{
					return true
				}
			},
			message:function(){
				if(this.state="2"){
					return "活动人数满员"
				}else if(this.state="4"){
					return "已经加入活动"
				}else if(this.state="5"){
					return "报名日期已截止"
				}else if(this.state="6"){
					return "该活动已经取消"
				}else if(this.state="7"){
					return "活动已结束"
				}else if(this.state="8"){
					return "团队已经被解散"
				}else if(this.state="9"){
					return "团队已经被删除"
				}else if(this.state="10"){
					return "已经是团队成员"
				}
			}
		},
		components:{
			popup,
			Heads,
			Loading
		},
		methods: {
			initExMessageList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						type: 'all',
						joinType:1,
						page:this.page,
						rows:this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111203, jsonValue:data},{emulateJSON:true}).then( response => {
					this.messages = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 6;
					this.initExMessageList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						type: 'all',
						joinType:1,
						page:this.page,
						rows:this.rows+6
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111203, jsonValue:data},{emulateJSON:true}).then( response => {					
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						this.messages = response.body.rows;
						done();					
					}, 1500)
					this.rows+=6;
				})
			},
			//同意请求
			agree:function(id){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						mark:1,
						userMessageId:id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211228, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.state = response.body.state;
					this.clearStorage ()
				})
			},
			//拒绝请求
			disagree:function(id){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						mark:2,
						userMessageId:id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211228, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.state = response.body.state;
					this.clearStorage ()
				})
			},
			//显示蒙版
			clearStorage () {
				if(this.state != 1){
					this.errShow = true
				}else{
					this.errShow = false
				}
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	} 
                },2000);  
			}
		},
		mounted:function(){
			this.initExMessageList()
		}
	}
</script>


<style scoped>
	#exMessage{
		width: 100%;
	}
	.content{
		background: #f2f2f2;
		overflow: hidden;
		padding-bottom: 0.5rem;
		
	}
	dl{
		background: #f2f2f2;
		width: 90%;
		margin: 0 auto;
		overflow: hidden;
	}
	dt{
		width: 100%;
		text-align: center;
		height: 0.8rem;
		line-height: 0.8rem;
		color: #a0a0a0;	
	}
	.box{
		background: #fff;
		width: 100%;
		padding-bottom: 0;
		border-radius: 5px;
		color: #A6A6A6;
		overflow: hidden;
	}
	.main{
		width: 100%;
		padding:0.2rem 0.15rem;
	}
	.message_type{
		margin-top: 0.3rem;
		text-indent: 0.5rem;
		font-size: 10px;
		color: gray;
	}
	.is_agree{
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		text-align: center;
		border-top: 1px solid #eee;
		width: 100%;
	}
	.chance{
		display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		-webkit-flex-direction: row;
    	flex-direction: row;
	}
	.chance span{
		display: inline-block;
		width: 50%;
		color: #fff;
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.chance .black{
		background: gray;
		border-right: 1px solid #fff;
	}
	.chance .red{
		background: #CF2D28;
	}
</style>