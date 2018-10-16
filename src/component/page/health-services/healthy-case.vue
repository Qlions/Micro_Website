<template>
	<section>
		<Heads :title="title"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<!-- <div class="listLoading" v-if="isLoading">
			<i></i>
			<span>努力加载中...</span>
		</div> -->
		<!-- 记录列表 -->
		<div class="healthy-case">
			<!-- 没有数据 -->
			<div class="healthy-case-null" v-if="dataHide == 0">
				<i></i>
				<p>暂无数据</p>
			</div>
			<!-- 数据展示 -->
			<div class="scroller-content" v-if="dataHide == 1">
				<scroller style="width:95%;margin:0 auto;top:.84rem;"
					:on-refresh="refresh"
					:on-infinite="infinite"
		    	>	
					<div class="healthy-case-list">
						<ul>
							<li class="clearfix" v-for="(item,index,key) in list">
								<div v-for="(item,medtime,index) in item" class="relative">
									<div class="healthy-case-list-title">
										<h2 class="medtime-data">{{ medtime | datefilter2 }}</h2>
										
									</div>	
									<div class="healthy-case-list-data clearfix" v-for="(mediItem,index) in item">
										<i></i>
										<div class="healthy-case-list-data-left">
											<h2>{{ mediItem.caseName }}</h2>
											<p class="put-data">
												{{ replace(mediItem.referralTime) | substring(10,15)}}</span>
											</p>
										</div>
										<div class="healthy-case-list-data-right">
											<p>
												<span class="modify" @click="remove(mediItem.caseManageId)">删除</span>
												<router-link :to="{ path: '/child/case/details',query:{ name:mediItem.caseManageId } }">
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
			<router-link :to="{ path: '/child/case/add/details' }">
				添加记录					
			</router-link>
		</div>
		<!--点击退出时的弹出框-->
		<div class="popupBox" v-if="isLoginOut">
			<div class="popupItem">
				<p>您确定要删除此次记录吗？</p>
				<div class="bottom_box">
					<span @click="close()">取消</span>
					<i @click="sureOut()">确定</i>
					<em></em>
				</div>
			</div>
		</div>
		<popup :message="message" v-show="show"></popup>
	</section>
</template>
<script>
	import Heads from '../../common/head.vue'
	import Loading from '../../common/loading.vue'
	import popup from '../../common/error-popup.vue'

	export default {
		data () {
			return {
				id:this.$route.query.id,
				isActive:false,
				title:"病历记录",
				dataHide:0,
				isLoading:true,
				prompt:"",
				data:"",
				isHide:-1,
				page:1, // 开始1条
				rows:20, // 结束10条
				list:[],
				message:"",
				show:false,
				isLoginOut:false,
				caseManageId:""
			}
		},
		components: {
			Heads,
			Loading,
			popup
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
						console.log(response)
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
			            	this.data = response.body.listInfo;
			            	for (var i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].referralTime.substring(0,10);
								mothArr.push(moth);	
							}
							newArr = Array.from(new Set(mothArr)); // 去重
							for(let j = 0; j < newArr.length; j ++){
								for (let i = 0; i < vm.data.length; i++) {
									let moth = vm.data[i].referralTime.substring(0,10);
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
			            console.log(this.list)   
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
					let vm = this;
					let mothArr = []; // 月
					let newArr = [];
					let dataArr = [];
					let mothObj = {};
					if (this.rows >= response.body.listInfo.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			        } 
			        if(response.body.total == '0'){
		            	this.dataHide = 0;
		            }else {
		            	this.dataHide = 1;
		            	this.data = response.body.listInfo;
		            	for (var i = 0; i < vm.data.length; i++) {
							let moth = vm.data[i].referralTime.substring(0,10);
							mothArr.push(moth);	
						}
						newArr = Array.from(new Set(mothArr)); // 去重
						for(let j = 0; j < newArr.length; j ++){
							for (let i = 0; i < vm.data.length; i++) {
								let moth = vm.data[i].referralTime.substring(0,10);
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
						done(true)				
					}, 1500)
					this.rows += 5;
					console.log(this.list)
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
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },10);  
			},
			remove (caseManageId) {
				this.isLoginOut = true;
				this.caseManageId = caseManageId;
			},
			close(){
				this.isLoginOut = false;
			},
			// 删除病历
			sureOut:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'caseManageIds':this.caseManageId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:530004, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					if (response.body.state == 'err_delCase_001') {
						this.show = true;
						this.message = '系统异常';
						this.clearStorage();
					}else if (response.body.state == 'err_delCase_002') {
						this.show = true;
						this.message = '参数异常';
						this.clearStorage();
					} else {
						this.isLoginOut = false;
						this.message = '删除成功';
						this.clearStorage();
						this.defaultAjax();					
					}	
				},response => {
					
				})
			},
		},
		mounted (){
			/* 情况vuex 数据 */
			this.$store.state.icdName = '';
			this.$store.state.icdId = "";
			this.$store.state.orgName = "";
			this.$store.state.orgCode = "";
			this.$store.state.createTime = "";
			this.$store.state.caseNum = "";

			this.defaultAjax();
			this.$store.state.caseDetails = [];
		},
		created (){
			
			//console.log(this.$route.query.id);
		}
	}
</script>
<style>
	.healthy-case-null {
		width: 90%;
		margin: 2.2rem 5%;
	}
	.healthy-case-null i {
		display: block;
		width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.healthy-case-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.healthy-case {
		width: 100%;
		height: 100%;
		position: fixed;
		padding-top: .84rem;
	}
	.healthy-case-list {
		width: 100%;
		padding: 0 0.26rem;
		background: #fff;
	}
	.healthy-case-list .relative {
		position: relative;
	}
	.healthy-case-list ul li {
		position: relative;
		font-size: 0.3rem;
	}
	.healthy-case-list ul li div.relative {
		border-bottom: 0.1rem solid  #e5e5e5;
		padding: .34rem 0;
	}
	.healthy-case-list-data {
		width: 100%;
		font-size: .32rem;
	}
	.healthy-case-list-title {
		width: 100%;
		font-size: .32rem;
	}
	.healthy-case-list-data-left {
		float: left;
		margin-left: .2rem;
	}
	.healthy-case-list-data i {
		width: .16rem;
		height: .16rem;
		background: #62b651;
		border-radius: .16rem;
		display: block;
		float: left;
		margin-top: .25rem;
	}
	.healthy-case-list-data-left p {
		color: #a1a1a1;
	}
	.healthy-case-list-data-left h2 {
		color: #333;
		margin-top: .1rem;
	}
	.healthy-case-list-data-right {
		text-align: right;
	}
	.healthy-case-list-data-right p {
		background: url(../../../assets/image/head-back-right.png) no-repeat right top .315rem;
		background-size: .6rem;
		display: block;
		padding-top: .4rem;
		padding-right: .5rem;
		color: #a1a1a1;
	}
	.healthy-case-list-data-right p span.modify {
		color: #62b651;
		margin-right: .2rem;
	}
	.healthy-case-list-data-right p span.browse {
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
	/*弹出框样式*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popupItem{
		color: #666;
		width: 80%;
		position: absolute;
		top:35%;
		left: 10%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupItem p{
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.bottom_box{
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.bottom_box span{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box i{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box em{
		height: 0.5rem;
		width: 1px;
		background: #e6e6e6;
		position: absolute;
		top: 0.25rem;
		left: 50%;
	}
</style>