<template>
	<div id="serverEva">
		<Heads :title="titleName"></Heads>	
		<Loading v-if="isLoading"></Loading>
		<div class="wuList" v-if="this.evaList <= 0">
			<img src="../../assets/image/server/noInfo.png" />
			<p>暂无相关数据</p>
		</div>
		<div class="server_Eva" v-for="item in evaList">
			<div class="evaName">
				<span class="evaName_one">
					<img :src="item.photosmall" alt="" class="eva_img"/>										
					<span class="evaName_span" v-if="item.userName.length <= 2 ">{{item.userName.substring(0,1)+"*"}}</span>
					<span class="evaName_span" v-else="item.userName.length >= 2 ">{{item.userName.substring(0,1)+"**"+item.userName.substring(item.userName.length-1,item.userName.length)}}</span>
				</span>
				<span class="evaName_two">
					<img src="../../assets/image/doctor/pingjiaxingxing.png" alt="" v-for="item in item.star"/>
					<img src="../../assets/image/doctor/unShineStar.png" alt="" v-for="item in 5-item.star"/>
				</span>
			</div>
			<div class="serve_cent">
				{{item.commentContent}}
			</div>
			<div class="evaTime">
				{{item.createTime.substring(0,10)+" "+item.createTime.substring(11,20)}}
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import AMap from 'AMap'
	import Loading from '../common/loading.vue'
	export default {
		data() {
			return {
				titleName: "服务评价",
				evaList:[],
				serviceDictId: this.$route.query.id,
				commentEx1: this.$route.query.exId,
				isLoading: true,
			}
		},
		components: {
			Loading,
			Heads,
		},
		methods: {
			init(){
				//登录基本数据
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				console.log(this.serviceDictId)
				if(this.serviceDictId == undefined){
					let data = JSON.stringify({
//					serviceDictId: this.serviceDictId,
					commentEx1: this.commentEx1,
					module: 'group_comment',
					});
					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {
						token: token,
						infoType: 660010,
						jsonValue: data
					}, {
						emulateJSON: true
					}).then(response => {
						console.log(response);
						this.evaList = response.body.rows;
						
						setTimeout(() => {
							this.isLoading = false;
						}, 500)
					})
				}else{
					
					let data = JSON.stringify({
						serviceDictId: this.serviceDictId,
					});
					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {
						token: token,
						infoType: 660010,
						jsonValue: data
					}, {
						emulateJSON: true
					}).then(response => {
						console.log(response);
						this.evaList = response.body.rows;
						
						setTimeout(() => {
							this.isLoading = false;
						}, 500)
					})
				
				}
				
			},
		},
		mounted() {
			this.init();
		},

	}
</script>

<style>
	#serverEva{
		padding-top: 0.84rem;
	}
	.serve_cent{
		display: inline-block;
		height: 0.2rem;
		font-size: 0.28rem;
		margin-top: 0.2rem;
		height: 0.7rem;
	}
	.server_Eva{
		/*height: 2.4rem;*/
		border-bottom: 1px solid #999;
		padding: 0.3rem 0;
		margin-left: 4%;
		width: 92%;
	}
	.evaName_one{
		float: left;
	}
	.evaName_two{
		float: right;
	}
	.evaName_two img{
		height: 0.28rem;
		width: 0.28rem;
		margin-right: 0.05rem;
	}
	.evaTime{
		color: #999;
		font-size: 0.24rem;
		margin-top: 0.3rem;
	}
	.eva_img{
		height: 0.56rem;
	    width: 0.56rem;
	    border-radius: 50%;
	    overflow: hidden;
	}
	.evaName_span{
		margin-left: 0.2rem;
	}
	.wuList{
		position: fixed;
	}
	.wuList img{
		height: 100%;
		width: 100%;
		margin-top: 50%;
	}
	.wuList p{
		text-align: center;
		color: #666;
	}
</style>