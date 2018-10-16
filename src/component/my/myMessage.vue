<template>
<section id="myMessage">
	<Heads :title="titleName"></Heads>
	<div class="MM-container">
		<div class="messageClassify">
			<ul>
				<router-link to="/my/myMessage/sysNotice" class="lis">
					<span class="systemMessage-img"></span>
					<p class="tatle">系统通知</p>
					<p class="tip">{{isNewSysMessage}}</p>
				</router-link>
				<router-link to = "/my/myMessage/exMessage" class="lis">
					<span class="interactMessage-img"></span>
					<p class="tatle">互动消息</p>
					<p class="tip">{{isNewExMessage}}</p>
				</router-link>
			</ul>
		</div>
		<Talk></Talk>
	</div>	
</section>
</template>
<script>
	import Heads from '../common/head.vue'
	import Talk from "./talk.vue"
	export default {
		data () {
			return {
				titleName:"我的消息",
				isNewSysMessage:"暂无未读消息",
				isNewExMessage:"暂无未读消息"
			}
		},
		components:{
			Talk,Heads
		},
		methods: {
		
		}
	}
</script>

<style scoped>
	.messageClassify{
		width: 100%;
		padding: 0 0.2rem;
		border-bottom: 10px solid #eee;
		margin-bottom: -1px;
		margin-top:50px;
	}	
	
	.messageClassify .lis{
		width: 100%;
		height: 64px;
		display: block;
		padding: 10px 0;
		line-height: 44px;
		position: relative;
		padding-left: 54px;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		margin-bottom: -1px;
	}
	.systemMessage-img{
		display: inline-block;
		width: 44px;
		height: 44px;
		background: url(../../assets/image/my/my-mess-icon.png) no-repeat;
		background-size: 44px 88px;
		background-position: center 0px;
		background-color: #ff9903;
		position: absolute;
		top: 10px;
		left: 0;
	}
	.interactMessage-img{
		display: inline-block;
		width: 44px;
		height: 44px;
		background: url(../../assets/image/my/my-mess-icon.png) no-repeat;
		background-size: 44px 88px;
		background-position: center -44px;
		background-color: #51ccb7;
		position: absolute;
		top: 10px;
		left: 0;
	}
	.tatle{
		font-weight: 600;
		line-height: 0.5rem;
		height: 0.5rem;
	}
	.tip{
		font-size: 12px;
		line-height: 0.5rem;
		height: 0.5rem;
		color: #A0A0A0;
	}
</style>