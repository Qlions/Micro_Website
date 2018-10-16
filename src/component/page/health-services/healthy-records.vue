<template>
	<section>
		<Heads :title="title"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- <div class="listLoading" v-if="isLoading">
			<i></i>
			<span>努力加载中...</span>
		</div> -->
		<!-- 记录列表 -->
		<div class="healthy-records">
			<!-- 没有数据 -->
			<div class="healthy-records-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<!-- 数据展示 -->
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="width:95%;margin:0 auto;"
					:on-refresh="refresh"
					:on-infinite="infinite"
					:style="{ top:activeTop }"
		    	>	
					<div class="healthy-records-list">
						<ul>
							<li class="clearfix" v-for="(item,index,key) in data" @click="see(item.healthId)">
								<div class="healthy-records-list-left">
									<h2>
										{{ item.inputTime | datefilter2 }}
									</h2>
									<p>责任医生：{{ item.docName }}</p>
								</div>
								<div class="healthy-records-list-right">
									<p>预览</p>
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
				id:this.$route .query.id,
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
				mothObj:{}, //储存过滤完Json
				title:'健康档案',
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
					'rows':this.rows,
					'userId':userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
					.then(response => {
						/*let vm = this;
						let mothArr = []; // 月
						let newArr = [];
						let yearArr = [];
						let AllDataArr = [];
						let AllObj = {};*/
						if(response.body.total == '0'){
			            	this.dataHide = 0;
			            }else {
			            	this.dataHide = 1;
			            	this.data = response.body.rows[0].person;
			            	console.log(this.data)
			            	// 分割数据
			            	/*for (var i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].inputTime.substring(0,10);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].inputTime.substring(0,10);
									
									if(newArr[j] == moth){
										vm.dataArr.push(vm.data[i]);
									}
								}
								this.mothObj[newArr[j]] = vm.dataArr;
								vm.dataArr = [];
							}
							this.listData.push(this.mothObj);
							for (var i = 0; i < vm.data.length; i++) {
								let year = vm.data[i].inputTime.substring(0,5);
								yearArr.push(year);
							}
							var newyearArr = Array.from(new Set(yearArr)); // 去重
							var test = [];
							this.listData.forEach(function(item, key, index){
								test.push(item)
							})
							for(var x = 0 ; x < newyearArr.length; x ++) {
								for(var i=0,l=test.length;i<l;i++){
									for(var key in test[i]){
										let keySub = key.substring(0,5);
										if(newyearArr[x] == keySub){
											let testaaa = {};
											testaaa[key] = test[i][key];
											AllDataArr.push(testaaa);
										}
									}
								}
								AllObj[newyearArr[x]] = AllDataArr;	
								AllDataArr = [];
							}*/
			            }
						setTimeout(() => {
			               this.isLoading = false;
			               //this.list.push(AllObj); 
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
					/*let vm = this;
					let mothArr = []; // 月
					let newArr = [];
					let dataArr = [];
					let mothObj = {};
					let yearArr = [];
					let AllDataArr = [];
					let AllObj = {};*/
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
		            	this.data = response.body.rows[0].person;

		            	// 分割数据
						/*for (var i = 0; i < vm.data.length; i++) {
							let moth = vm.data[i].inputTime.substring(0,10);
							mothArr.push(moth);	
						}
						newArr = Array.from(new Set(mothArr)); // 去重
						for(let j = 0; j < newArr.length; j ++){
							for (let i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].inputTime.substring(0,10);
								
								if(newArr[j] == moth){
									vm.dataArr.push(vm.data[i]);
								}
							}
							this.mothObj[newArr[j]] = vm.dataArr;
							vm.dataArr = [];
						}
						this.listData.push(this.mothObj);
						for (var i = 0; i < vm.data.length; i++) {
							let year = vm.data[i].inputTime.substring(0,5);
							yearArr.push(year);
						}
						var newyearArr = Array.from(new Set(yearArr)); // 去重
						var test = [];
						this.listData.forEach(function(item, key, index){
							test.push(item)
						})
						for(var x = 0 ; x < newyearArr.length; x ++) {
							for(var i=0,l=test.length;i<l;i++){
								for(var key in test[i]){
									let keySub = key.substring(0,5);
									if(newyearArr[x] == keySub){
										let testaaa = {};
										testaaa[key] = test[i][key];
										AllDataArr.push(testaaa);
									}
								}
							}
							AllObj[newyearArr[x]] = AllDataArr;	
							AllDataArr = [];
						}*/

		            }
					setTimeout(() => {	
						//this.list.push(AllObj);
						done();					
					}, 1500)
					this.rows += 5;
					//this.list = [];
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
			see (healthId) {
				window.location.href = ""+this.configUrl+'/website/mobile/healthClientMobile.action?healthId='+healthId+"";
			}
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
	.healthy-records-list {
		width: 100%;
		padding: 0 0.26rem;
	}
	.healthy-records-null {
		width: 90%;
		margin: 0 5%;
		padding-top: 2.2rem;
	}
	.healthy-records-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-records-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.healthy-records-list ul li {
		padding: .2rem 0;
		border-bottom: .01rem solid #e6e6e6;
		font-size: 0.3rem;
	}
	.healthy-records-list-left {
		float: left;
	}
	.healthy-records-list-left h2 {
		color: #333;
		font-size: .32rem;
	}
	.healthy-records-list-left p {
		color: #a1a1a1;
		margin-top: 0.05rem;
		font-size: .28rem;
	}
	.healthy-records-list-right {
		float: right;
		line-height: 100%;
	}
	.healthy-records-list-right p {
		background: url(../../../assets/image/head-back-right.png) no-repeat center right;
		background-size: .6rem;
		display: block;
		margin-top: .4rem;
		padding-right: .5rem;
		color: #a1a1a1;
		font-size: .3rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>