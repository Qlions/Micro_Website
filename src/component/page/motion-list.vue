<!-- 
	tab-record.vue 健康监测各模块的列表展示
 -->
<template>
	<div class="record">
		<Heads :title="albumName"></Heads>
		<div class="record-content-null" v-if="dataHide == 0">
			<i></i>
			<p>暂无数据</p>
		</div>
		<div v-if="dataHide == 1">
			<scroller
				:on-refresh="refresh"
				:on-infinite="infinite"
				:style="{ top:activeTop }"
	    	>
				<div class="home-record-value">
					<ul ref="tabItem">
						<li v-for="(itemData,key,index) in allListArr">
							<div class="home-record-value-list-content" v-for="(item,key,index) in itemData">
								<h2 class="year-line" v-if="key != year">
									<span>{{ key | substring(0,4) }}</span>
								</h2>
								<div v-for="(lists,key,index) in item">
									<div v-for="(content,key,index) in lists">
										<h2 class="date">{{ key | substring(5,10)}}</h2>
										<div class="key" v-for="(listsNxt,key,index) in content">
											<div v-for="dataText in listsNxt.childList">
												<router-link :key="listsNxt.infoId" :to="{ name:assessmentTitle,query:{
													id: assessmentId,
													dicCode: assessmentDicCode,
													title: assessmentTitle,
													measureTime:listsNxt.measureTime,
													valueNumber:listsNxt.valueNumber,
													type:2,
													dicName:listsNxt.dicName,
													infoId:listsNxt.infoId,
													nurinfoId:listsNxt.nurinfoId,
													sportinfoId:listsNxt.sportinfoId
												}}">
													<div class="up">
														<i></i>
														<p class="up_info">
															<font class="up_info_num">{{ judgeTime(dataText.measureTime) }}</font>
															<font>{{ dataText.bmiStr }}</font>
															<span>
																<em>{{ dataText.sportKcal }}</em>
																<b v-if="assessmentTitle != 'weightIndex'">{{ listsNxt.dicUnit }}</b>
															</span>
														</p>
														<p v-if="assessmentTitle != 'motion'">
															<font>{{ dataText.description }}</font>
														</p>
														<p class="motion-name" v-if="assessmentId == 111612">
															<font v-if="assessmentTitle == 'motion'" class="distance">{{ fixedNum(dataText.distance) }}<em v-if="dataText.distance !=null">Km</em></font>
															<font>{{ fixedText(dataText.sportName) }}</font>
															<span v-if="assessmentTitle == 'motion'">
																<em v-if="dataText.readonly == 2">
																	{{ formatSecondsFen(dataText.minuteSum) }}
																</em>
																<em v-else>{{ formatSeconds(dataText.minuteSum) }}</em>
															</span>
															<span v-else>{{ dataText.minuteSum }}</span>
														</p>
													</div>
												</router-link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</scroller>
		</div>
		<addBtn :uid='assessmentId' :diccode='assessmentDicCode' :title='assessmentTitle' v-if="assessmentTitle!='zfhlInfo' && assessmentTitle!='spo2Info' && assessmentTitle!='electrocardiogram'"></addBtn>
		<Loading v-if="isLoading" :class="{loadTop:isClass}"></Loading>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import addBtn from '../common/add-btn.vue'
	import Loading from '../common/loading.vue'
	export default {
		props: {
			hasError:""
		},
		data(){
			return {
				albumName:"运动监测",
				item:[],
				lists:[],
				dateList:[],
				newDateList:[],
				dataHide:2,
				isClass:true,
				isLoading:true,
				mothObj:{}, //储存过滤完Json
				listData:[],
				dataArr:[],
				allListArr:[],
				page:1, // 开始1条
				rows:20, // 结束10条
				left:0.125,
				assessmentId: this.$route.query.id,
				assessmentTitle: this.$route.query.title,
				assessmentDicCode: this.$route.query.dicCode,
				assessmentDataType: this.$route.query.dataType,
				activeTop:.84+"rem"
			}
		},
		components:{
			addBtn,  // 提交按钮组件
			Loading,  // loading组件
			Heads
		},
		mounted (){		
			this.$store.state.listArr = [];	
			this.initDataList();
			localStorage.date = '';
			localStorage.time = '';
			let myDate = new Date();
			let year = myDate.getFullYear(); 
			this.year = year+"-";
		},
		methods: {
			initDataList () { // 默认显示10条数据
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let dateYearArr = [];
				let newArr = [];
				let json = {};
				let jsonArr = [];
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows,
					'dataType':this.assessmentDataType,
					'dicCode':this.assessmentDicCode,
					'usid':"53475793548904449100001",
					'operType':"2000"
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111612, jsonValue:data },{emulateJSON:true})
				.then(response => {
					console.log(response)
					let vm = this;
					
					setTimeout(() => {
						vm.allListArr = [];
						this.listData = [];
						vm.isLoading = false;
						let mothArr = []; // 月
						let yearArr = [];
						let newArr = [];
						let AllDataArr = [];
						let AllObj = {};
						vm.data = response.body.rows;
						if( vm.data == "" || vm.data == undefined ){
							this.dataHide = 0;
						}else {
							this.dataHide = 1;
							for (var i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].measureTime.substring(0,10);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].measureTime.substring(0,10);
									
									if(newArr[j] == moth){
										vm.dataArr.push(vm.data[i]);
									}
								}
								this.mothObj[newArr[j]] = vm.dataArr;
								vm.dataArr = [];
							}
							this.listData.push(this.mothObj);
							for (var i = 0; i < vm.data.length; i++) {
								let year = vm.data[i].measureTime.substring(0,5);
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
							}
						}
						this.allListArr.push(AllObj);
		            }, 1500);
				})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {	
					this.rows = 10;

					this.initDataList();
					done();
				}, 1500)
			},
			infinite (done) { // 下拉加载每次
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({ 
					'page':this.page,
					'rows':this.rows+5,
					'dataType':this.assessmentDataType,
					'dicCode':this.assessmentDicCode,
					'usid':"53475793548904449100001",
					'operType':"2000"
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:this.assessmentId, jsonValue:data },{emulateJSON:true})
				.then(response => {	
					console.log(response)
					let vm = this;
					setTimeout(() => {		
						this.allListArr = [];
						this.listData = [];
						vm.isLoading = false;
						let mothArr = []; // 月
						let yearArr = [];
						let newArr = [];
						let AllDataArr = [];
						let AllObj = {};
						vm.data = response.body.rows;
						if( vm.data == "" || vm.data == undefined ){
							this.dataHide = 0;
						}else {
							this.dataHide = 1;
							for (var i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].measureTime.substring(0,10);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].measureTime.substring(0,10);
									
									if(newArr[j] == moth){
										vm.dataArr.push(vm.data[i]);
									}
								}
								this.mothObj[newArr[j]] = vm.dataArr;
								vm.dataArr = [];
							}
							this.listData.push(this.mothObj);
							for (var i = 0; i < vm.data.length; i++) {
								let year = vm.data[i].measureTime.substring(0,5);
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
							}
						}
						this.allListArr.push(AllObj);
						this.rows+=5;
					}, 1500)
					setTimeout(() => {	
						
						done(true);

					}, 1500)
					
				})			
			},
			split (val) {
				return val.split(';')[0];
			},
			tofixed (val) {
				return parseFloat(val).toFixed(1);
			},
			judgeTime (val){
				if(val.substring(11,19) == '23:59:59'){
					return "24:00";
					console.log(1)
				}else {
					return val.substring(11,16);
				}
			},
			formatSeconds(value) {
	            var theTime = parseInt(value);// 秒
	            var theTime1 = 0;// 分
	            // alert(theTime);
	            if(theTime > 60) {
	                theTime1 = parseInt(theTime/60);
	                theTime = parseInt(theTime%60);
	                // alert(theTime1+"-"+theTime);
	                if(theTime1 > 60) {
	                    theTime1 = parseInt(theTime1%60);
	                }
	            }
	            if(theTime < 10){
	            	var result = ""+0+parseInt(theTime)+"";
	            }else {
	            	var result = ""+parseInt(theTime)+"";
	            }
	            
	            if(theTime1 > 0) {
	                result = ""+parseInt(theTime1)+"'"+result+""+'"'+"";
	            }else {
	            	 result = ""+0+"'"+result+""+'"'+"";
	            }
	            return result;
	        },
	        formatSecondsFen(value){
	        	var result = ""+value+"'"+'00'+""+'"'+"";
	        	return result;
	        },
	        // 四舍五入
	        fixedNum(val) {
	        	if(val != null){
	        		let num = val;
					let fixNum = new Number(num+1).toFixed(2);
					let fixedNum = new Number(fixNum - 1).toFixed(2);  
					return fixedNum;
	        	}
	        },
	        // 文字转换
	        fixedText (val) {
	        	if(val == '步行'){
	        		return '计步';
	        	}else {
	        		return val;
	        	}
	        }
		}
	}
</script>
<style>
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
	    top: -0.25rem;
	    padding: 0 0.2rem;
	    background: #fff;
	    color: #000;
	    font-weight: bold;
	    font-size: 16px;
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
	.home-record-value {
		width: 95%;
		margin: 0 auto;
		font-size: 14px;
	}
	.loading-layer {
		padding-bottom: 3.5rem !important;
	}
	.home-record-value ul li .date {
    	width: 100%;
    	font-size: 16px;
    	color: #333;
    	padding: 0.125rem 0;
    	text-indent: 1em;
    	font-weight: bold;
    	font-family: "dincond-regular";
	}
	.home-record-value ul li .up {
    	width: 100%;
    	position: relative;
    	background: url(../../assets/image/dot_line.png) repeat-y 0.63rem top;
    	padding: 0.125rem 0 0.125rem 0.95rem;
    	color: #999;
    	font-size: 14px;
	}
	.home-record-value ul li .up font {
		font-size: 12px;
		color: #6d6d6d;
	}
	.home-record-value ul li .up .up_info {
		padding-bottom: .15rem;
	}
	.up_info_num {
		width: .75rem;
		display: inline-block;
	}
	.home-record-value ul li .up i {
	    float: left;
	    width: 0.16rem;
	    height: 0.16rem;
		position: absolute;
		top: 0.28rem;
		left: 0.56rem;
	    background: url(../../assets/image/data_icon_time.png) no-repeat center;
	    background-size: 0.16rem;
	}
	.home-record-value ul li .up b {
		margin-left: 0.125rem;
	}
	.home-record-value ul li .up span {
		color: #6AAC34;
		font-weight: bold;
		float: right;
		display: block;
		font-family: "dincond_regular";
	}
	.home-record-value ul li .up span em {
		font-weight: bold;
		float: left;
		font-family:"dincond-regular";

	}
	.home-record-value ul li .up span em.emcol {
		color: red;
	}
	.home-record-value ul li .up span b {
		color: #605e59;
		margin-left: 0;
		font-size: 12px;
		-webkit-transform-origin-x: 0;
		-webkit-transform: scale(0.90);
	}
	.new-record-btn {
		background: #eee;
	    height: 1.25rem;
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
	.new-record-btn a {
	    display: inline-block;
	    width: 95%;
	    height: 0.75rem;
	    line-height: 0.75rem;
	    margin-top: 0.2rem;
	    background: #6aac34;
	    color: #fff;
	    font-size: 14px;
	    text-align: center;
	}
	.new-record-btn a i {
	    width: 0.4rem;
	    height: 0.4rem;
	    display: inline-block;
	    margin-right: 0.25rem;
	    position: relative;
	}
	.new-record-btn a i img {
	    display: block;
	    position: absolute;
	    width: 0.45rem;
	    height: 0.45rem;
	    top: 1px;
	}
	.listLoading {
		text-align: center;
	}
	.listLoading i {
		width: 0.315rem;
		height: 0.315rem;
		display: inline-block;
		background: url(../../assets/image/icons.png) no-repeat -6.356rem -0.38rem;
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
		font-family: "dincond-regular";
	}
	.motion-name font.distance em {
		margin-right: .1rem;
		font-family: "dincond-regular";
	}
	.motion-name font.distance {
		color: #6AAC34 !important;
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
		z-index: 2;
		background: #fff !important;
	}
</style>