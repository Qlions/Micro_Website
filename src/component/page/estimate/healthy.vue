<!-- 健康评估列表  -->
<template>
	<section>
		<Heads :title="albumName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- 记录列表 -->
		<div class="home-content-record">
			<!-- 没有数据 -->
			<div class="home-content-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller
					:on-refresh="refresh"
					:on-infinite="infinite"
					:style="{ top:activeTop }"
					v-if='isLoading == false'
		    	>
					<div class="home-content-value">
						<ul>
							<li v-for="(item,index,val) in lists">
								<div v-for="(data,val,index) in item">
									<h2 class="year-line" v-if="val != year">
										<span>{{ val | substring(0,4) }}</span>
									</h2>
									<div class="home-content-value-auto" v-for="(healthy,val,index) in data">
										<div v-if="healthy.flag == 0" @click="temporary()">
											<h2 class="date">{{ healthy.createTime | substring(5,10) }}</h2>
											<p class="up flagtp">
												<i></i>
												<font>{{ healthy.createTime | substring(11,16) }}</font>
												<b>暂存</b>
												<span>一次健康风险评估</span>
											</p>
										</div>
										<div v-if="healthy.flag == 1" @click="complete(healthy.userdataId,healthy.userId,healthy.questType)">
											<h2 class="date">{{ healthy.riskTime | substring(5,10) }}</h2>
											<p class="up flagcp">
												<i></i>
												<font>{{ healthy.riskTime | substring(11,16) }}</font>
												<b>完成</b>
												<span>一次健康风险评估</span>
											</p>
										</div>
									</div>	
								</div>					
							</li>
						</ul>
					</div>
				</scroller>
				<!--<div class="theReport">
					<iframe :src="serverTabContent" id="theReport-iframe" frameborder="no"></iframe>
				</div>-->
			</div>
			
		</div>
		<div class="new-risk-btn">
			<div class="new-risk-add" :class="{'new-risk-no':isCalss}" @click="build()">
				<a href="javascript:void(0)">
					<i>
						+
					</i>
					新建评估
				</a>
			</div>
		</div>
		<ErrorPopup :message="message" v-if="showUp"></ErrorPopup>
	</section>
</template>
<script>
	import Heads from '../../common/head.vue'
	import Loading from '../../common/loading.vue'
	import ErrorPopup from '../../common/error-popup.vue'
	export default {
		data () {
			return {
				list:[],
				lists:[],
				id:this.$route.query.id,
				isActive:false,
				title:this.$route.query.title,
				dataHide:0,
				isLoading:true,
				isCalss:false,
				prompt:"",
				data:"",
				page:1, // 开始1条
				rows:10, // 结束10条
				mothObj:{}, //储存过滤完Json
				yearArr:[], //存放年份数组
				newYearArr:[], // 去重完毕的数组
				dataArr:[],
				startDate:"", //当前时间
				url:"javascript:void(0)",
				showUp:false,
				message:"",
				token:"",
				userId:"",
				serverTabContent:"",
				gender:"",
				configUrl:"", // 配置url
				questionnairegUrl:"", // 问卷配置url
				year:"",
				hasError:"",
				activeTop:.84+"rem",
			}
		},
		components: {
			Heads,
			Loading,
			ErrorPopup
		},
		computed:{
			// 判断页面标题
			albumName () {
				var mapAlbum = {
					healthy: "健康评估",
					medicine: "中医体质辨识",
					character: "性格评估",
					pressure: "压力评估"
				}
				return mapAlbum[this.title]
		    },
		     // 配置url
		    albumUrl () {
		    	var mapAlbum = {
					healthy: ""+this.questionnairegUrl+"/newReport/mxb/index_mxb.html?riskId=&gender="+this.gender+"&userId="+this.userId+"&token="+this.token+""
				}
				return mapAlbum[this.title]
		    }    
		},
		methods:{
			// 默认列表展示
			defaultAjax () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let userInfoNew =  JSON.parse(this.$cookie.get('userInfoNew'));
				let token = userInfo.token;	
				let assessmentId = this.$route.query.id;
				let assessmentTypeData = this.$route.query.typeData;
				this.token =  userInfo.token;
				this.userId = userInfo.userId;
				this.gender = userInfoNew[0].gender;
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows,
					'typeData':assessmentTypeData 
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
					.then(response => {
						console.log(response)
						let vm = this;
						setTimeout(() => {
							this.lists = [];
							let mothArr = []; // 月
							let yearArr = []; // 年
							let newArr = [];
							let yearNewArr = [];
							vm.isLoading = false; 
							vm.list = response.body.rows;
							if(  vm.list == "" || vm.list == undefined ){
								vm.dataHide = 0;
							}else {
								vm.dataHide = 1;
								for (var i = 0; i < vm.list.length; i++) {
									if( vm.list[i].flag == 1 ){
										let moth = vm.list[i].riskTime.substring(0,5);
										mothArr.push(moth);	
									}else {
										let moth = vm.list[i].createTime.substring(0,5);
										mothArr.push(moth);	
									}	
								}
								newArr = Array.from(new Set(mothArr)); // 去重
								for(let j = 0; j < newArr.length; j ++){
									for (let i = 0; i < vm.list.length; i++) {
										if( vm.list[i].flag == 1 ){
											let moth = vm.list[i].riskTime.substring(0,5);
											if(newArr[j] == moth){
												vm.dataArr.push(vm.list[i]);
											}
										}else {
											let moth = vm.list[i].createTime.substring(0,5);
											if(newArr[j] == moth){
												vm.dataArr.push(vm.list[i]);
											}
										}		
									}
									this.mothObj[newArr[j]] = vm.dataArr;
									vm.dataArr = [];
								}
								this.lists.push(this.mothObj);	
								
							}  
			            }, 1500)		
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
				let assessmentId = this.$route.query.id;
				let assessmentTypeData = this.$route.query.typeData;
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows+5,
					'typeData':assessmentTypeData 
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:assessmentId, jsonValue:data },{emulateJSON:true})
				.then(response => {
					let vm = this;
					setTimeout(() => {		
						this.mothObj = {};
						this.lists = [];
						vm.list = response.body.rows;
						let mothArr = []; // 月
						let newArr = [];
						if( this.list == "" || this.list == undefined ){
							this.dataHide = 0;
						}else {
							this.dataHide = 1;
							for (var i = 0; i < vm.list.length; i++) {
								if( vm.list[i].flag == 1 ){
									let moth = vm.list[i].riskTime.substring(0,5);
									mothArr.push(moth);	
								}else {
									let moth = vm.list[i].createTime.substring(0,5);
									mothArr.push(moth);	
								}	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.list.length; i++) {
									if( vm.list[i].flag == 1 ){
										let moth = vm.list[i].riskTime.substring(0,5);
										if(newArr[j] == moth){
											vm.dataArr.push(vm.list[i]);
										}
									}else {
										let moth = vm.list[i].createTime.substring(0,5);
										if(newArr[j] == moth){
											vm.dataArr.push(vm.list[i]);
										}
									}
									
								}
								this.mothObj[newArr[j]] = vm.dataArr;
								vm.dataArr = [];
							}
							this.lists.push(this.mothObj);
							this.rows+=5;
						}
					}, 1500)
					setTimeout(() => {		
						done(true);								
					}, 1500)
					/*let vm = this;
					//vm.mothObj = {};
					let mothArr = []; // 月
					let newArr = [];
					setTimeout(() => {
		               vm.isLoading = false;
		              	
		            }, 1500)
					vm.list = response.body.rows;
					if( this.list == "" || this.list == undefined ){
						this.dataHide = 0;
					}else {
						this.dataHide = 1;
						for (var i = 0; i < vm.list.length; i++) {
							let moth = vm.list[i].createTime.substring(5,10);
							mothArr.push(moth);	
						}
						newArr = Array.from(new Set(mothArr)); // 去重
						for(let j = 0; j < newArr.length; j ++){
							for (let i = 0; i < vm.list.length; i++) {
								let moth = vm.list[i].createTime.substring(5,10);
								if(newArr[j] == moth){
									vm.dataArr.push(vm.list[i]);
								}
							}
							this.mothObj[newArr[j]] = vm.dataArr;
							vm.dataArr = [];
						}
						setTimeout(() => {
							this.lists = [];
							this.lists.push(this.mothObj);
						}, 1500)
					}

					this.rows += 5;*/
					
				})		
			},
			// 定时器30天后
			timer () {
				// 获取问卷时间
				let startDate = this.startDate.replace(/-/g, '/');
				let now = Date.parse(new Date(startDate));
	            // 设置截止时间
	            let endDate = new Date();
	            let end = endDate.getTime(); 
	            // 时间差  
	            let leftTime = end - now;
	            // 定义变量 d 保存倒计时的时间  
	            let d = Math.floor(leftTime/1000/60/60/24);
	            let overdue = 30-d;
				//console.log(new Date(leftTime).toLocaleString())      
	            if ( d <= 30 ) {
	               	this.showUp = true;
					this.message = "距离下次问卷还有"+overdue+"天";
					this.clearStorage();
	            }else {
	            	this.$router.push({ path: '/mxbquestion' });
	            	//window.location.href  = this.albumUrl;
	            }
			},
			// 30天内不能再次填写
			build (){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let flag = this.$route.query.flag;
				let title = this.$route.query.title;
				let typeData = this.$route.query.typeData;
				let data = JSON.stringify({ 
					'userId':userId,
					'typeData':typeData
				});
				if ( title == 'healthy' ) {
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:flag, jsonValue:data },{emulateJSON:true})
					.then(response => {
						console.log(response)
						if( response.body.flag == 1 ){
							this.startDate = response.body.riskTime;
				            setTimeout(this.timer(),1000);
						}else {
							this.$router.push({ path: '/mxbquestion' });
							//window.location.href  = this.albumUrl;
						}
					})
				}
			},
			// 问卷的路径
			temporary () {
				this.$router.push({ path: '/mxbquestion' });
				//window.location.href = ""+this.questionnairegUrl+"/newReport/mxb/index_mxb.html?riskId=&gender="+this.gender+"&userId="+this.userId+"&token="+this.token+"";
			},
			// 报告的路径
			complete(userdataId,userId,questType) {
//				window.location.href = ""+this.configUrl+"/website/mobile/riskResultMobile.action?userdataId="+userdataId+"&userId="+userId+"";

//				this.serverTabContent = ""+this.configUrl+"/website/mobile/riskResultMobile.action?userdataId="+userdataId+"&userId="+userId+"";
//				document.getElementById("theReport-iframe").onload = function() {
//					alert(1)
//					this.setIframeHeight(document.getElementById("theReport-iframe"))
//				}
				this.$router.push({
						path: "/child/estimate/reportPop",
						query: {
							userdataId: userdataId,
							userId: userId,
							questType: questType,
						}
				})
			},
			clearStorage () { //清楚定时器
				let time = setTimeout(()=>{
					if( this.showUp ==  true){
                		this.showUp = false;
                	} 
                },2000);  
			},
		},
		mounted (){
			this.defaultAjax();
			this.configUrl = configUrl(); // 调用配置url函数
			this.questionnairegUrl = questionnairegUrl(); // 调用配置url函数
			let myDate = new Date();
			let year = myDate.getFullYear(); 
			this.year = year+"-";
		},
		created (){	
			//console.log(this.$route.query.id);
		},
	}
</script>
<style>
	.home-content-null {
		padding-top: .84rem;
		width: 90%;
		margin: 1.25rem 5%;
		position: absolute;
	}
	.home-content-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.home-content-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	} 
	.home-content-value h2.date {
		width: 100%;
		font-size: .32rem;
		color: #333;
		padding: 0.1rem 0;
		font-weight: bold;
		text-indent: 1em;
	}
	.home-content-value ul li a {
		display: block;
		cursor: pointer;
	}
	.home-content-value ul li p.up {
		width: 100%;
		position: relative;
		background: url(../../../assets/image/dot_line.png) repeat-y 0.63rem top;
		padding: 0.125rem 0 0.125rem 0.95rem;
		color: #999;
		font-size: 0.28rem;
	}
	.home-content-value ul li {
		width: 100%;
	}
	.home-content-value ul li p.up i {
	    background: url(../../../assets/image/data_icon_time.png) no-repeat center;
	    background-size: 0.2rem;
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		top: 0.245rem;
		left: 0.58rem;
		margin-left: -0.04rem;
	}
	.home-content-value ul li p.up font {
		color: #666;
		text-indent: 1rem;
	}
	.home-content-value ul li p.up b {
	    padding: 0 0.2rem;
	}
	.flagtp b{
		color: #ff8200;
	}
	.flagcp b{
		color: #009983;
	}
	.flagtp i {
		background: url(../../../assets/image/data_icon_time_hc.png) no-repeat center !important;
		background-size: 0.2rem !important;
	}	    
	.home-content-value ul li p.up:after {
		content: "";
		position: absolute;
		top: 0.04rem;
		right: 0;
		width: 0.6rem;
		height: 0.6rem;
		background: url(../../../assets/image/head-back-right.png) no-repeat center;
		background-size: 0.6rem;	
	}
	.new-risk-btn {
	    background: #eee;
	    height: 60px;
	    width: 100%;
	    position: fixed;
	    left: 0;
	    right: 0;
	    text-align: center;
	    z-index: 1;
	    border-top: 1px solid #ddd;
	    bottom: 0;
	    border-top: 1px solid #eee;
	    background-color: #f6f6f6;
	}
	.new-risk-add {
	    margin-top: 8px;
	}
	.new-risk-add a {
	    display: inline-block;
	    width: 95%;
	    height: 40px;
	    line-height: 40px;
	    margin-top: 0;
	    background: #009983;
	    color: #fff;
	    font-size: 14px;
	    text-align: center;
	}
	.new-risk-add a i {
	    width: 0.1rem;
	    height: 0.1rem;
	    font-size: 0.4rem;
	    position: relative;
	}
	.new-risk-no a {
		background-color: #ccc;
	}
	.year-line {
		float: left;
		width: 100%;
		height: 0.375rem;
		text-align: center;
		border-top: 1px solid #f0f0f0;
		margin-top: 0.5rem;
	}
	.year-line span {
		position: relative;
		top: -0.2rem;
		padding: 0 0.5rem;
		background: #fff;
		color: #c8c8c8;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	.home-content-value-auto {
		width: 95%;
		margin: 0 auto;
	}
	.theReport{
		/*padding-left: 4%;*/
		/*padding-right: 4%;*/
		/*padding-top: 0.3rem;*/
		/*padding-bottom: 0.95rem;*/
		word-break: break-word;
		background: #fff;
	}
	.theReport iframe{
		width: 100%;
		/*height: 100%;*/
		height: 12rem;
		border: 0 none;
		display: block;
	}
</style>