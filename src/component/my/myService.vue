<template>
	<div class="service">
		<Head :title="title"></Head>
		<div class="record-content-null" v-if="reviewsList.length == 0">
			<i></i>
			<p>暂无数据</p>
		</div>
		<div class="service-content" v-else>
			<scroller
				:on-refresh="refresh"
				:on-infinite="infinite"
				:style="{ top:activeTop }"
	    	>
				<ul>
					<li v-for="item in reviewsList">
						<router-link :to="{ path:'/my/myService/myservicedetail',query:{ id:item.QId,wocode:item.wocode,wtState:item.wtState }}">
							<h3 class="service-content-date">
								{{ textSubstring(item.woInputTime,0,10) }}<span>{{ textSubstring(item.woInputTime,11,16) }}</span>
							</h3>
							
							
							<div class="service-content-info">
								<h3>工单编号：{{ item.wocode }}
									<span v-if="item.wtState == 1">等待处理</span>
									<span v-if="item.wtState == 2">已回复</span>
									<span v-if="item.wtState == 3">已完成</span>
									<span v-if="item.wtState == 4">已完成</span>
									<span v-if="item.wtState == 5">已关闭</span>
									<span v-if="item.wtState == 7">正在处理</span>
								</h3>
								<p>{{ item.QContent }}</p>
							</div>
							<i class="service-red" v-if="item.aIsReaded != 0"></i>
						</router-link>
					</li>
				</ul>
			</scroller>
		</div>
	</div>
</template>
<script>
	import Head from '../common/head.vue'
	export default {
		data () {
			return {
				activeTop:.84+"rem",
				title:"客服中心",
				reviewsList:'',
				rows:10
			}
		},
		components:{
			Head
		},
		mounted  () {
			this.initDataList();
		},
		methods:{
			initDataList () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					page:1, // 开始1条
					rows:this.rows,
					userId:userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660501, jsonValue:data },{emulateJSON:true})
				.then(response => {
					console.log(response)
					this.reviewsList = response.body.rows;
				})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {
					this.rows = 10;
					this.initDataList();
					done();
				}, 1000)
			},
			infinite (done) { // 下拉加载每次
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					page:1, // 开始1条
					rows:this.rows+8,
					userId:userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660501, jsonValue:data },{emulateJSON:true})
				.then(response => {	
					console.log(response)
					setTimeout(() => {
						this.reviewsList = response.body.rows;		
						this.rows+=8;		
					}, 1000)
					setTimeout(() => {
						done(true);		
					}, 1000)	
				})			
			},
			// 判断是否为今天
			/*timestampToTime (val) {
				let date = new Date(val);
				let time1 = date.getTime();
				if (new Date(time1).toDateString() === new Date().toDateString()) {
        			return val.substring(11,16);
			    } else if (new Date(time1) < new Date()){
			        //之前
			        //return val.substring(0,10);
			        this.timestamp = 1;
			    }
			}*/
			// 截取
			textSubstring (val,start,end) {
				return val.substring(start,end);
			}
		}
	}
</script>
<style>
	.service {
		width: 100%;
		height: 100%;
		padding-top: .84rem;
		background: #f5f5f5;
		position: absolute;
	}
	.service-content  ul {
		padding: 0 .3rem;
	}
	.service-content  ul li {
		position: relative;
	}
	.service-content-date {
		text-align: center;
		font-size: 14px;
		color: #999;
		padding: .3rem 0;
	}
	.service-content-date span {
		margin-left: .1rem;
	}
	.service-content-info {
		border:.01rem solid #e6e6e6;
		padding: .3rem;
		border-radius: .1rem;
		background: #fff;
		font-size: 14px;
		color: #333;
	}
	.service-content-info  h3 {
		padding-bottom: .3rem;
		color: #666;
		font-size: 12px;
	}
	.service-content-info  h3 span {
		color: #ff5554;
		float: right;
	}
	.service-content-info p {
		overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	.service-red {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: red;
		border-radius: 8px;
		position: absolute;
		top: .95rem;
		left: 0;
	}

	.record-content-null {
		width: 90%;
		margin: 1.5rem 5%;
	}
	.record-content-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.record-content-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
</style>