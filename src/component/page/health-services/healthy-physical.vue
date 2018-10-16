<template>
	<section>
		<Heads :title="title"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- 记录列表 -->
		<div class="healthy-physical">
			<!-- 没有数据 -->
			<div class="healthy-physical-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<!-- 数据展示 -->
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="top:.84rem;width:95%;margin:0 auto;"
					:on-refresh="refresh"
					:on-infinite="infinite"
					:style="{ top:activeTop }"
					v-if='isLoading == false'
		    	>	
					<div class="healthy-physical-list">
						<ul>
							<li class="clearfix" v-for="(item,index,key) in data" @click="see(item.infoId)">
								<div class="healthy-physical-list-left">
									<h2>
										{{ item.createTime | datefilter2 }}创建体检档案
									</h2>
									<p>责任医生：{{ item.docName }}</p>
								</div>
								<div class="healthy-physical-list-right">
									<p>浏览</p>
								</div>
							</li>
						</ul>
					</div>
				</scroller>
			</div>			
		</div>
	</section>
</template>
<script>
	import Heads from '../../common/head.vue'
	import Loading from '../../common/loading.vue'
	export default {
		data () {
			return {
				id:this.$route.query.id,
				isActive:false,
				title:this.$route.query.title,
				dataHide:0,
				isLoading:true,
				prompt:"",
				data:"",
				isHide:-1,
				page:1, // 开始1条
				rows:10, // 结束10条
				list:[],
				listData:[],
				dataArr:[],
				allListArr:[],
				title:'体检档案',
				configUrl:"", // 配置Url
				activeTop:.84+"rem",
				hasError:""
			}
		},
		components: {
			Heads,
			Loading
		},
		computed:{
		    
		},
		methods:{
			// 默认显示列表
			defaultAjax () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let assessmentId = this.$route.query.id;
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
					.then(response => {
						if(response.body.total == '0'){
			            	this.dataHide = 0;
			            }else {
			            	this.dataHide = 1;
			            	this.data = response.body.rows;
			            	console.log(this.data)
			            }
						setTimeout(() => {
			               this.isLoading = false;
			            }, 1500);    
					})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {
					done();
				}, 1500)
			},
			infinite (done) { // 下拉加载每次
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let assessmentId = this.$route.query.id;
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows+5,
					'userId':userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
				.then(response => {
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        } 
			        if(response.body == null){
		            	this.dataHide = 0;
		            }else {
		            	this.dataHide = 1;
		            	this.data = response.body.rows;
		            }
					setTimeout(() => {	
						done();					
					}, 1500)
					this.rows += 5;
				})		
			},
			clickContent (index) {
				if( this.isHide == index){
					this.isHide = -1;
				}else {
					this.isHide = index;
				}
			},
			replace (val) {
				return val.replace('T','');
			},
			// 查看报告
			see (infoId) {
				window.location.href = ""+this.configUrl+'/website/mobile/healthClientReportForApp.action?infoId='+infoId+"";
			},
		},
		mounted (){
			
			this.defaultAjax();
			this.configUrl = configUrl(); // 调用配置url函数
			let myDate = new Date();
			let year = myDate.getFullYear(); 
			this.year = year+"-";
		},
		created (){
			
			//console.log(this.$route.query.id);
		}
	}
</script>
<style>
	.healthy-physical-list {
		width: 100%;
		padding: 0 0.26rem;
	}
	.healthy-physical-list ul li {
		padding: .25rem 0;
		border-bottom: .01rem solid #e6e6e6;
		font-size: 0.3rem;
	}
	.healthy-physical-list-left {
		float: left;
	}
	.healthy-physical-list-left h2 {
		color: #333;
	}
	.healthy-physical-list-left p {
		color: #a1a1a1;
		margin-top: 0.05rem;
		font-size: .28rem;
	}
	.healthy-physical-list-right {
		float: right;
		line-height: 100%;
	}
	.healthy-physical-list-right p {
		background: url(../../../assets/image/head-back-right.png) no-repeat center right;
		background-size: .6rem;
		display: block;
		margin-top: .4rem;
		padding-right: .5rem;
		color: #333;
		font-size: 0.3rem;
	}
	.healthy-physical-null {
		width: 90%;
		margin: 0 5%;
		padding-top: 2.2rem;
	}
	.healthy-physical-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-physical-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>