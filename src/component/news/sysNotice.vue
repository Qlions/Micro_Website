<template>
<div id="sysNotice">
	<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<noBata v-if="messages ==''"></noBata>
	<scroller
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if="messages != ''"
	style = 'background: #f2f2f2;'
	:style="{ top:activeTop }"
	>
		<div class="content">
			<dl v-for="item in messages">
				<dt>{{item.createTime | substring(0,10)}}</dt>
				<dd>
					<div>
						<p>{{item.messageConent}}</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_add_friends'">好友通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_doctor_user'">专家通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_pfmg_cricle'">团队通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_incentiveFund'">系统通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_push_to_app_custom'">系统通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_doctor_user_pro'">系统通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_professional_check'">系统通知</p>
						<p class="message_type" v-if="item.messageParticipateStatus=='s_pfmg_action'">系统通知</p>
						
					</div>
				</dd>
			</dl>
		</div>
	</scroller>
</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import noBata from '../common/noBata.vue'
	export default {
		data () {
			return {
				title:"中国健康云",
				titleName:"系统消息",
				messages:[],
				isLoading:true,
				nohead:"nohead",
				page:1,
				rows:6,
				hasError:"",
				activeTop:"",//iscroll
			}
		},
		components:{
			Heads,
			Loading,
			noBata
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
			//loading图
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
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
//				    console.log(this.messages)
					this.loadingClose()
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
			listenToMyBoy (somedata) {//监听头部叉号点击事件
				this.hasError = somedata;
			}
		},
		mounted:function(){
			if(sessionStorage.getItem('key_head') == 1){//iscroll
				this.activeTop = .84+'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			this.initSysNoticeList()
		},
		watch:{
			hasError:function(val){//iscroll
				if(val == true){
					this.activeTop = .84+'rem';
				}
			}
		}
	}
</script>


<style scoped>
	#sysNotice{
		background: #f2f2f2;
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
		font-size: 0.2rem;
		color: gray;
		background: url(../../assets/image/new/sys-icon.png) no-repeat;
		background-size:0.24rem 0.24rem;
		background-position: 0.1rem 0.02rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>