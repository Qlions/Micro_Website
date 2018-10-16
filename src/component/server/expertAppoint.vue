<template>
	<div id="expert_Appoint">
		<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
		<div class="server-tab-header">
			<ul class="server-tab-ul clearfix">
				<li v-for="(item,index) in tabViews" :class="{'active':isActive == index}" @click="toggleTabs(index,item)">{{ item.info }}</li>
			</ul>
		</div>
		<div class="server-content-view" :style="{ top:activeTop }">
			<keep-alive>
				<component :is="currentView" :title="titleName" :topValue="activeTop"></component>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import appoint_by_expert from './appointByExpert.vue'
	import appoint_by_date from './appointByDate.vue'
	export default {
		data(){
			return {
				titleName: "",
				activeTop: "",
				hasError: "",
				tabViews: [
					{
						info: "按专家预约",
						tabView: 'appoint_by_expert'
					},
					{
						info: "按时间预约",
						tabView: 'appoint_by_date'
					}
				],
				isActive: 0,
				currentView: 'appoint_by_expert'
			}
		},
		components:{
			Heads,
			appoint_by_expert,
			appoint_by_date
		},
		created(){
			if(sessionStorage.getItem('key_head') == 1){//没有下载头部
				this.activeTop = 2.14 + "rem";
			}else {//有下载头部
				this.activeTop = 2.14 + 'rem';
			}
			this.init();
		},
		watch:{
			hasError:function(val){
				console.log(val)
				if(val == true){
					this.activeTop = 2.14 + "rem";
				}
			}
		},
		methods:{
			init(){
				let vm = this;
				let title = vm.$route.query.depName;
				vm.titleName = title;
			},
			toggleTabs(index,item){//预约方式切换
				this.isActive = index;
				this.currentView = item.tabView;
			},
			listenToMyBoy(somedata){
				this.hasError = somedata;
			}
		}
	}
</script>
<style>
	#expert_Appoint{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	#expert_Appoint .server-tab-header{
		width: 100%;
		background: #fff;
		padding: 0.3rem 1.5rem;
		position: fixed;
		left: 0;
	}
	#expert_Appoint .server-tab-ul{
		width: 100%;
	}
	#expert_Appoint .server-tab-ul li{
		width: 50%;
		float: left;
		height: 0.7rem;
		font-size: 0.24rem;
		color: #009983;
		border: 0.01rem solid #e6e6e6;
		text-align: center;
		line-height: 0.7rem;
		background: #fff;
	}
	#expert_Appoint .server-tab-ul li.active{
		background: #009983;
		color: #fff;
		border-color: #009983;
	}
	#expert_Appoint .server-tab-ul li:first-child{
		border-radius: 4px 0 0 4px;
	}
	#expert_Appoint .server-tab-ul li:last-child{
		border-radius: 0 4px 4px 0;
	}
	.server-content-view{
		width: 100%;
		position: fixed;
		left: 0;
		top: 2.14rem;
		bottom: 0;
	}
</style>