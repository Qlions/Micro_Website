<template>
	<section>
		<Heads :title="albumName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- <div class="listLoading" v-if="isLoading">
			<i></i>
			<span>努力加载中...</span>
		</div> -->
		<!-- 记录列表 -->
		<div class="healthy-prescription">
			<!-- 没有数据 -->
			<div class="healthy-prescription-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<!-- 数据展示 -->
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="width:95%;margin:0 auto;"
					:on-refresh="refresh"
					:on-infinite="infinite"
					:style="{ top:activeTop }"
					v-if='isLoading == false'
		    	>	
					<div class="healthy-prescription-list">
						<ul>
							<li class="clearfix" v-for="prescription in data" @click="see(prescription.prescId,prescription.userId,prescription.finishTime)">
								<div class="healthy-prescription-list-data clearfix">
									<div class="healthy-prescription-list-data-left">
										<h2>执行日期</h2>
										<p class="put-data">{{ replace(prescription.execTime) | substring(0,10) }}</p>
									</div> 
									<div class="healthy-prescription-list-data-bttom">
										<p>
											<!--  -->
											<span class="release-state">状态：<b v-if="
												prescription.prescState == 5
											">未执行</b><b v-else>已执行</b></span>
										</p>
										<p>
											<span class="release-name">管理医生：<b>{{ prescription.docName }}</b></span>
											<span class="release-moteh">发布日期：{{ replace(prescription.releaseTime) | substring(0,10)}}<b>{{ prescription.releaseTime | substring(11,20)}}</b></span>
										</p>
										<!-- http://weixin.zgjky.cn:80/wbchat/prescription_show.jsp?preId=39614371025946624100001&userId=145206&zxtime=2017-05-16 -->
									</div>
								</div>
								<!-- <a :href="[configUrl+'/website/mobile/userPrescriptionShowReport.action?'+'preId='+prescription.prescId+'&'+'userId='+prescription.userId+'&'+'zxtime='+dateSub(prescription.finishTime)+'&'+'flagInfo='+1+'&'+'httpUrl='+'https://www.zgjky.cn']">
										
								</a> -->
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
				page:1, // 开始1条
				rows:10, // 结束10条，
				execTime:"",
				releaseTime:"",
				configUrl:"", // 配置路径
				activeTop:.84+"rem",
				hasError:""
			}
		},
		components: {
			Heads,
			Loading
		},
		computed:{
			albumName(){
				var mapAlbum = {
					prescription: "健康处方"
				}
				return mapAlbum[this.title]
		    }
		    
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
					'rows':this.rows,
					'userId':userId,
					'prescState':1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
					.then(response => {
						setTimeout(() => {
			               this.isLoading = false;
			            }, 1500);
			            if( response.body.total == 0 ){
			            	this.dataHide = 0;
			            }else {
			            	this.dataHide = 1;
			            	this.data = response.body.rows;
			            }				
					})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {
					this.rows = 10;
					this.defaultAjax();
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
					'userId':userId,
					'prescState':1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
				.then(response => {
					if( response.body.state == 'err' ){
						this.dataHide = 0;
					}else {
						this.dataHide = 1;
						setTimeout(() => {
							this.data = response.body.rows;
							done(true)			
						}, 1500)
						this.rows += 5;
					}
				})		
			},
			dateSub (val) {
				return val.substring(0,10);
			},
			replace (val){
				let data = Date.parse(val);
				let da = new Date(data);
				var year = da.getFullYear()+'年';
    			var month = da.getMonth()+1+'月';
    			var date = da.getDate()+'日';
    			return year+month+date;
			},
			// 查看报告
			see (prescId,userId,finishTime) {
				window.location.href = ""+this.configUrl+'/website/mobile/userPrescriptionShowReport.action?preId='+prescId+'&'+'userId='+userId+'&'+'zxtime='+this.dateSub(finishTime)+'&'+'flagInfo='+1+'&'+'httpUrl='+'http://192.168.19.187'+"";
			}
		},
		mounted (){
			this.defaultAjax();
			this.configUrl = configUrl(); // 调用配置url函数
		},
		created (){
			
			//console.log(this.$route.query.id);
		}
	}
</script>
<style>
	.healthy-prescription-null {
		width: 90%;
		margin: 2.2rem 5%;
	}
	.healthy-prescription-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-prescription-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.healthy-prescription {
		padding-top: 0.84rem;
	}
	.healthy-prescription-list {
		width: 100%;
		margin: 0 auto;
	}
	.healthy-prescription-list ul {
	    width: 100%;
	}
	.healthy-prescription-list ul li {
		position: relative;
		font-size: 0.2rem;
		border-bottom: .01rem solid #f0f0f0;
		padding: .2rem;
	}
	.healthy-prescription-list i {
		position: absolute;
		left: 0;
		width: 0.6rem;
		height: 0.6rem;
		background: url(../../../assets/image/plan_title_icon.png) no-repeat center 0;
		background-size: 0.6rem;
		margin-left: 0.25rem;
	}
	.healthy-prescription-list-data-left {
		width: 100%;
	}
	.healthy-prescription-list-data-left p {
		margin-top: 0.125rem;
		font-size: .28rem;
		color: #333;
	}	
	.healthy-prescription-list-data-left h2 {
		color: #333;
		font-size: .28rem;
		float: left;
		margin-right: .1rem;
	}
	.healthy-prescription-list-data-right a {
		float: right;
		width: 1.8rem;
		height: 0.65rem;
		line-height: 0.65rem;
		background: #6aac34;
		color: #fff;
		text-align: center;
		font-size: 0.3rem;
		border-radius: 0.125rem;
		-moz-border-radius: 0.125rem;
		-webkit-border-radius: 0.125rem;
		margin-top: 0.3rem;
	}
	.healthy-prescription-list-data-bttom {
		width: 100%;
		color: #333;
		font-size: .2rem;
		overflow:hidden;
		text-overflow:ellipsis;
		-o-text-overflow:ellipsis;
		-webkit-text-overflow:ellipsis;
		white-space:nowrap;
	}
	.healthy-prescription-list-data-bttom p {
		margin-top: 0.125rem;
		font-size: .28rem;
	}
	.release-state b {
		color: #fb870d;
	}
	.release-name {
		border-right: .1px solid #f0f0f0;
		padding-right: .1rem;
		float: left;	
		font-size: smaller;
	}
	.release-moteh {
		padding-left: .1rem;
		overflow:hidden;
		text-overflow:ellipsis;
		-o-text-overflow:ellipsis;
		-webkit-text-overflow:ellipsis;
		white-space:nowrap;
		display: block;
		float: left;
		font-size: smaller;
	}
	.release-moteh b {
		margin-left: .1rem;
	}
	.listLoading i {
		width: 0.315rem;
		height: 0.315rem;
		display: inline-block;
		background: url(../../../assets/image/icons.png) no-repeat -6.356rem -0.38rem;
		background-size: 11rem 11rem;
		margin-right: 0.05rem;
		vertical-align: middle;
		-webkit-animation: loading 1s infinite linear;
		-ms-animation: loading 1s infinite linear;
		-o-animation: loading 1s infinite linear;
		-moz-animation: loading 1s infinite linear;
		animation: loading 1s infinite linear;
	}
	.motion-name {
		margin-top: .1rem;
	}
	@-webkit-keyframes loading {
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
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>