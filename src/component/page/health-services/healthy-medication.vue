<template>
	<section>
		<Heads :title="albumName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- <div class="listLoading" v-if="isLoading">
			<i></i>
			<span>努力加载中...</span>
		</div> -->
		<!-- 记录列表 -->
		<div class="healthy-medication">
			<!-- 没有数据 -->
			<div class="healthy-medication-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<!-- 数据展示 -->
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="width:95%;margin:0 auto;top:.84rem;"
					:on-refresh="refresh"
					:on-infinite="infinite"
					v-if='isLoading == false'
		    	>	
					<div class="healthy-medication-list">
						<ul>
							<li class="clearfix" v-for="(item,index,key) in list">
								<div v-for="(item,medtime,index) in item" class="relative">
									<div class="healthy-medication-list-title">
										<h2 class="medtime-data">{{ medtime | datefilter2 }}</h2>
									</div>	
									<div class="healthy-medication-list-data clearfix" v-for="(mediItem,index) in item">
										<i></i>
										<div class="healthy-medication-list-data-left">
											<h2>
												{{ mediItem.medicineName }}
											</h2>
											<p class="put-data">
												{{ replace(mediItem.medicineTime) | substring(10,15)}}</span>
											</p>	
										</div>
										<div class="healthy-medication-list-data-right">
												<p>
													<router-link :to="{ path: '/child/medication/copy/details',query:{ name:mediItem.medicineName } }">
														<span class="modify">复制</span>
													</router-link>
													<router-link :to="{ path: '/child/medication/update/details',query:{ name:mediItem.medicineName } }">
														<span class="modify">修改</span>
													</router-link>
													<router-link :to="{ path: '/child/medication/details',query:{ name:mediItem.medicineName } }">
														<span class="browse">浏览</span>
													</router-link>
												</p>	
											<!-- <a href="javascript:void(0)" @click="clickContent(index)"></a> -->
										</div>
									</div>
								</div>			
							</li>
						</ul>
					</div>
				</scroller>
			</div>			
		</div>
		<div class="add-record">
			<router-link :to="{ path: '/child/medication/add/details' }">
				添加记录					
			</router-link>
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
				list:[]
			}
		},
		components: {
			Heads,
			Loading
		},
		computed:{
			albumName(){
				var mapAlbum = {
					medication: "用药记录"	
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
					'userId':userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
					.then(response => {
						this.list = [];
						this.$store.state.medication = response;
						let vm = this;
						let mothArr = []; // 月
						let newArr = [];
						let dataArr = [];
						let mothObj = {};
						if(response.body.total == '0'){
			            	this.dataHide = 0;
			            }else {
			            	this.dataHide = 1;
			            	this.data = response.body.rows;
			            	for (var i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].medicineTime.substring(0,10);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].medicineTime.substring(0,10);
									if(newArr[j] == moth){
										dataArr.push(vm.data[i]);
									}
								}
								mothObj[newArr[j]] = dataArr;
								dataArr = [];
							}
			            }
						setTimeout(() => {
			               this.isLoading = false;
			               this.list.push(mothObj); 
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
					this.$store.state.medication = response;
					let vm = this;
					let mothArr = []; // 月
					let newArr = [];
					let dataArr = [];
					let mothObj = {};
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			        } 
			        if(response.body == null){
		            	this.dataHide = 0;
		            }else {
		            	this.dataHide = 1;
		            	this.data = response.body.rows;
		            	for (var i = 0; i < vm.data.length; i++) {
							let moth = vm.data[i].medicineTime.substring(0,10);
							mothArr.push(moth);	
						}
						newArr = Array.from(new Set(mothArr)); // 去重
						for(let j = 0; j < newArr.length; j ++){
							for (let i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].medicineTime.substring(0,10);
								if(newArr[j] == moth){
									dataArr.push(vm.data[i]);
								}
							}
							mothObj[newArr[j]] = dataArr;
							dataArr = [];
						}
		            }
					setTimeout(() => {	
						this.list = [];
						this.list.push(mothObj);				
					}, 1500)
					setTimeout(() => {
		            	done(true)	
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
			}
		},
		mounted (){
			this.defaultAjax();
		},
		created (){
			
			//console.log(this.$route.query.id);
		}
	}
</script>
<style>
	.healthy-medication-null {
		width: 90%;
		margin: 2.2rem 5%;
	}
	.healthy-medication-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-medication-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.healthy-medication {
		width: 100%;
		height: 100%;
		position: fixed;
		padding-top: .84rem;
	}
	.healthy-medication-list {
		width: 100%;
		padding: 0 0.26rem;
		background: #fff;
	}
	.healthy-medication-list .relative {
		position: relative;
	}
	.healthy-medication-list ul li {
		position: relative;
		font-size: 0.3rem;
	}
	.healthy-medication-list ul li div.relative {
		border-bottom: 0.1rem solid  #e5e5e5;
		padding: .34rem 0;
	}
	.healthy-medication-list-data {
		width: 100%;
		font-size: .32rem;
	}
	.healthy-medication-list-title {
		width: 100%;
		font-size: .32rem;
	}
	.healthy-medication-list-data-left {
		float: left;
		margin-left: .2rem;
	}
	.healthy-medication-list-data i {
		width: .16rem;
		height: .16rem;
		background: #62b651;
		border-radius: .16rem;
		display: block;
		float: left;
		margin-top: .25rem;
	}
	.healthy-medication-list-data-left p {
		color: #a1a1a1;
	}
	.healthy-medication-list-data-left h2 {
		color: #333;
		margin-top: .1rem;
	}
	.healthy-medication-list-data-right {
		text-align: right;
	}
	.healthy-medication-list-data-right p {
		background: url(../../../assets/image/head-back-right.png) no-repeat right top .315rem;
		background-size: .6rem;
		display: block;
		padding-top: .4rem;
		padding-right: .5rem;
		color: #a1a1a1;
	}
	.healthy-medication-list-data-right p span.modify {
		color: #62b651;
		margin-right: .2rem;
	}
	.healthy-medication-list-data-right p span.browse {
		color: #a1a1a1;
	}
	.zPlan-pcont {
		width: 100%;
		font-size: 0.25rem;
	}
	.zPlan-pcon-top {
		padding: 0.2rem 0;
		border-bottom: 1px dotted #f0f0f0;
	}
	.zPlan-pcon-bottom {
		padding-top: 0.2rem;
		overflow: hidden;
	}
	.pcont-name {
		float: right;
		color: #6aac34;
	}
	.pcon-date {
		display: block;
		color: #999;
		padding-bottom: 0.125rem;
		float: left;
	}
	.pcon-number {
		float: right;
		display: block;
		color: #999;
	}
	.listLoading {
		text-align: center;
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
	.add-record {
		width: 100%;
		height: .84rem;
		background-color: #009983;
		position: fixed;
		bottom: 0;
		font-size: .32rem;
		text-align: center;
		line-height: .84rem;
		color: #fff;
	}
	.add-record a {
		color: #fff;
	}
</style>