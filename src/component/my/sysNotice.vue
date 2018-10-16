<template>
<div id="sysNotice">
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
					<div>
						<p>{{item.messageConent}}</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_add_friends'">好友消息</p>
					</div>
				</dd>
			</dl>
		</div>
		<div class="nodata" v-if="show">
			<img class="nodataImg" src="../../assets/image/my/nodata_icon.png">
			<div>暂无通知</div>
		</div>
	</scroller>
</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data () {
			return {
				title:"中国健康云",
				titleName:"系统消息",
				messages:[],
				isLoading:true,
				page:1,
				rows:6
			}
		},
		components:{
			Heads,
			Loading
		},
		computed:{
			show:function(){
				if(this.messages!=[]){
					return false
				}else{
					return true
				}
			},
			messageType:function(){
				
			}
		},
		methods: {
			initSysNoticeList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						type: 'system',
						joinType:1,
						page:this.page,
						rows:this.rows
					});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111203, jsonValue:data},{emulateJSON:true}).then( response => {
				    this.messages =response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 6;
					this.initSysNoticeList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						type: 'system',
						joinType:1,
						page:this.page,
						rows:this.rows+6
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111203, jsonValue:data},{emulateJSON:true}).then( response => {
						this.messages = response.body.rows;
						if (this.rows >= response.body.rows.length) {
				          setTimeout(() => {
				            done(true)
				          }, 1500)
				          return;
				        }
						setTimeout(() => {
							this.lists = response.body.rows;
							done();					
						}, 1500)
						this.rows+=6;
				})
			}
		},
		mounted:function(){
			this.initSysNoticeList()
		}
	}
</script>


<style scoped>
	#sysNotice{
		width: 100%;
	}
	.content{
		background: #f2f2f2;
		overflow: hidden;
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
	dd{
		width: 100%;
		background: #fff;
		padding:0.2rem 0.15rem;
		border-radius: 0.2rem;
		color: #A6A6A6;
	}
	.message_type{
		margin-top: 0.3rem;
		text-indent: 0.5rem;
		color: gray;
	}
	.nodata{
		width: 100%;
		text-align: center;
		margin-top: 0.4rem;
		color: #999;
		font-size: 0.28rem;
	}
	.nodataImg{
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		margin: 0 auto;
	}
</style>