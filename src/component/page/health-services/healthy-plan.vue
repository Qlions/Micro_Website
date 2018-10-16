<template>
	<section>
		<Heads :title="albumName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- <div class="listLoading" v-if="isLoading">
			<i></i>
			<span>努力加载中...</span>
		</div> -->	
		<div class="healthy-plan">
			<!-- 没有数据 -->
			<div class="healthy-plan-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="width:95%;margin:0 auto;"
					:on-refresh="refresh"
					:on-infinite="infinite"
					:style="{ top:activeTop }"
					v-if='isLoading == false'
		    	>
					<!-- 数据展示 -->
					<div class="healthy-plan-list">
						<div class="healthy-plan-item" v-for="(item,index) in list">
							<!-- {{ item }} -->
							<!-- <h2>{{ datefilter(item.rq) }}</h2> -->
							<div class="healthy-plan-item-content" v-for="(item,plantime,index) in item">
								<div class="plantime">
									<h2>{{ datefilter(plantime) }}</h2>
								</div>
								<ul v-for="(planItem,index) in item" @click="planClick(planItem.ids)">
									<li class="clearfix">
										<div class="healthy-plan-list-date">
											<div class="healthy-plan-list-date-left">
												<p class="month">{{ planItem.rq | substring(8,10) }}</p>
												<p class="week">{{ getDay(planItem.rq) }}</p>
											</div>
											<!-- <div class="healthy-plan-list-date-right" v-if="planItem.otherdone > 0">
												<p class="complete">已完成{{ planItem.otherdone}}个健康计划任务</p>
											</div> -->
											<div class="healthy-plan-list-date-right" :class="{planAcrtive:isClass == planItem.ids}" >
												<p v-if="planItem.othernd > 0">
													{{ planItem.othernd }}件事情待处理
													<span v-if="planItem.ndexpird == 0">(已过期)</span>
												</p>
												<p v-if="planItem.messagedone > 0">
													有{{ planItem.messagedone }}条消息
												</p>
											</div>
										</div>
										<ol class="healthy-plan-list-content" v-if="isHide == planItem.ids">
											<li v-for="(content,index) in response" v-if="content.type == 2" class="news" @click="contentClick(content.content,planItem.rq,index)">{{ content.content }}</li>
											<li v-for="(content,index) in response" v-if="content.type == 1" :class="[ { 'wait': content.ndexpird == 1 },{ 'overdue': content.taskState == 1 },{ 'thegreen': content.taskState == 2 }]" @click="contentClick(content.content,planItem.rq,index)">{{ content.content }}</li>
											<!-- <li v-for="(content,index) in response" v-if="content.taskState == 2" :class="[ { 'thegreen': content.taskState == 2 } ]" @click="contentClick(content.content,planItem.rq,index)">{{ content.content }}</li> -->
												
										</ol>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</scroller>
			</div>
		</div>
		<div class="y-healthMask" v-if="healthMask">
			<div class="y-yourHealthWaring">
				<img src="../../../assets/image/closePro.png" alt="" @click="healthAlertClose">
				<h2>{{ datefilter2(rq) }} {{ getDay(rq) }} 健康计划</h2>
				<p>{{ content }}</p>
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
				response:"",
				page:1, // 开始1条
				rows:10, // 结束10条
				healthMask:false,
				isClass:-1,
				content:"",
				rq:"",
				list:[],
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
					plan: "健康计划"
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
						console.log(response)
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
								let moth = vm.data[i].rq.substring(0,7);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].rq.substring(0,7);
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
			// 二级菜单
			planClick (id,index) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({ 
					'taskIds':id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:540003, jsonValue:data },{emulateJSON:true})
				.then(response => {
					console.log(response)
					this.response = response.body.result;			   
				})
				if( this.isHide == id ){
					this.isHide = -1;
					this.isClass = -1;
				}else {
					this.response = '';
					this.isHide = id;
					this.isClass = id;
				}

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
					console.log(response)
					let vm = this;
					let mothArr = []; // 月
					let newArr = [];
					let dataArr = [];
					let mothObj = {};
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
		            	for (var i = 0; i < vm.data.length; i++) {
							let moth = vm.data[i].rq.substring(0,7);
							mothArr.push(moth);	
						}
						newArr = Array.from(new Set(mothArr)); // 去重
						for(let j = 0; j < newArr.length; j ++){
							for (let i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].rq.substring(0,7);
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
			datefilter (value) { // 时间过滤器
				let year = value.substring(0,4);
				let month = value.substring(5,7);
				if(month.charAt(0) === '0'){
					let months = month.replace(/\b(0+)/gi,"");
					return year+"年"+months+"月"
				}else {
					return year+"年"+month+"月"
				}	
			},
			datefilter2 (value) { // 时间过滤器
				let year = value.substring(0,4);
				let month = value.substring(5,7);
				let day = value.substring(8,10);
				if(month.charAt(0) === '0'){
					let months = month.replace(/\b(0+)/gi,"");
					return year+"年"+months+"月"+day+"日";
				}else {
					return year+"年"+month+"月"+day+"日";
				}	
			},
			getDay (value) { // 数字转换
				let num = new Date(value).getDay();
				if(num == 0){
					return '周日'
				}else if(num == 1){
					return '周一'
				}else if(num == 2){
					return '周二'
				}else if(num == 3){
					return '周三'
				}else if(num == 4){
					return '周四'
				}else if(num == 5){
					return '周五'
				}else {
					return '周六'
				}
			},
			// 赋值
			contentClick (content,rq,index) {
				this.content = content;
				this.rq = rq;
				this.index = index;
				this.healthMask = true;
				document.body.style.overflow = "hidden";
			},
			healthAlertClose () {
				this.healthMask = false;
				document.body.style.overflow = "scroll";
			}
		},
		mounted () {
			this.defaultAjax();		
		},
		created (){
			
			//console.log(this.$route.query.id);
		}
	}
</script>
<style>
	.healthy-plan {
		width: 100%;
		height: 100%;
	}
	.scroller-content {
		width: 100%;
		height: 100%;
	}
	.healthy-plan-null {
		width: 90%;
		margin: 0 5%;
		padding-top: 2.2rem;
	}
	.healthy-plan-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-plan-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.healthy-plan-list {
		width: 100%;
	}
	.healthy-plan-list>ul>li {
		width: 100%;
	}
	.healthy-plan-item>ul>li {
		position: relative;
		
	}
	.healthy-plan-list-date {
		width: 100%;
		padding: .1rem 0.25rem;
		background: #fff;
		border-bottom: 1px solid #e6e6e6;
		overflow: hidden;
	}
	.healthy-plan-list-date-left {
		float: left;
	}
	.healthy-plan-list-date-left .month {
		font-size: 0.4rem;
		font-weight: bold;
	}
	.healthy-plan-list-date-left .week {
		font-size: 0.2rem;
		color: #999;
	}
	.healthy-plan-list-date-right {
		float: right;
		margin-top:0.25rem;
		font-size: 0.3rem;
	}
	.healthy-plan-list-date-right {
		background: url(../../../assets/image/bottom.png) no-repeat right;
		background-size: .3rem;
		padding-right: .4rem;
		text-align: right;
	}
	.planAcrtive {
		background: url(../../../assets/image/top1.png) no-repeat right;
		background-size: .3rem;
	}
	.healthy-plan-list-date-right p {
		text-align: right;
	}
	.healthy-plan-list-date-right p span {
		color: red;
	}
	.complete {
		color: #009983;
	}
	.healthy-plan-list-content {
		width: 100%;
		background: #fff;
		padding: .2rem 0.25rem;
		border-bottom: 0.01rem solid #e6e6e6;
	}
	.healthy-plan-list-content li {
		margin-bottom: .25rem;
		font-size: 0.24rem;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		color: #8f8f94;
		padding-left: 0.45rem;
	}
	.healthy-plan-list-content li.thegreen {
		background: url(../../../assets/image/theGreen.png) no-repeat !important;
		background-size: 0.32rem !important;
	}
	.healthy-plan-list-content li.overdue {
		background: url(../../../assets/image/thsRed.png) no-repeat;
		background-size: 0.32rem;
	}
	.healthy-plan-list-content li.wait {
		background: url(../../../assets/image/home_planState_unfinished_gray@3x.png) no-repeat;
		background-size: 0.32rem;
	}
	.healthy-plan-list-content li.news {
		background: url(../../../assets/image/home_planState_message@3x.png) no-repeat;
		background-size: 0.32rem;
	}
	.otherdone {
		background: url(../../../assets/image/theGreen.png) no-repeat left .12rem !important;
		background-size: 0.32rem !important;
	}
	.healthy-plan-list-content li:last-child {
		margin-bottom: 0;
	}
	.healthy-plan-list h2 {
		width: 100%;
		height: 1rem;
		background: #f5f5f5;
		padding: 0 0.3rem;
		line-height: 1rem;
		font-size: 0.32rem;
		font-family: "PingFangSC";
	}
	.y-healthMask {
		width: 100%;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
	}
	.y-yourHealthWaring {
		width: 92%;
		margin-left: 4%;
		height: 8rem;
		background: #FFFFFF;
		margin-top: 30%;
		border-radius: 6px;
		z-index: 100;
		position: relative;
	}
	.y-yourHealthWaring img {
		position: absolute;
		width: 0.5rem;
		top: -0.8rem;
		right: 0.4rem;
	}
	.y-yourHealthWaring h2 {
		color: #64B450;
		font-size: 0.34rem;
		letter-spacing: 0.03rem;
		border-bottom: 1px solid #e6e6e6;
		padding: 0.3rem;
		text-align: center;
	}
	.y-yourHealthWaring p {
		overflow: scroll;
		height: 6.5rem;
		padding: .2rem;
	    font-family: "PingFangSC";
	    color: #333333;
	    font-size: 0.24rem;
	    margin-left: 0.16rem;
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
</style>