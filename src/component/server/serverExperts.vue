<template>
	<div id="server-experts">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading"></Loading>
		<scroller style="top: 0.84rem;width:100%;margin:0 auto;background: #fff;position: absolute;"
		:on-refresh="refresh"
		:on-infinite="infinite"
		v-if='isLoading == false'
		>
		<div class="server-expert" v-for="list in expertList">
			<!--<router-link :to='({path:"/serverDetail/serverConfirm",query:{id:serviceDictId,type:type,userId:list.userId}})'>-->
			<a @click="showExpert(list)">	
				<div class="server-expert-info">
					<div class="server-expert-pic">
						<img :src="iconCheck(list.photosmall)"/>
					</div>
					<div class="server-expert-content">
						<div class="server-expert-name">
							{{ list.name }}
							<p class="server-focus-icon" v-if="list.attentionCount == '1'">已关注</p>
						</div>
						<p class="server-expert-work"><i v-if="list.familyContractTeamId != ''&& list.familyContractTeamId != null">家庭医生</i><span>{{ list.department.split(',')[0] }} </span><span> {{ list.proTitle?list.proTitle.split(',')[0]:''}}</span></p>
						<p class="server-expert-place">{{ list.hospital?list.hospital.split(',')[0]:''}}</p>
						<p class="server-expert-distance" v-if="list.distance != '-1'">{{ list.distance | getDistance}}<img src="../../assets/image/server/location_icon.png"></p>
					</div>
					
				</div>
				<div class="server-expert-bottom">
					<div class="server-feedback">
						<p class="server-num">服务 <span>{{ list.serverCount }}</span> 人</p>
						<p class="server-score" v-if="list.serviceScore != null">{{ Number(list.serviceScore).toFixed(0) }}%好评</p>
					</div>
				</div>
			</a>	
			<!--</router-link>-->
		</div>
		</scroller>
		<div class="expert-intro" v-if="isShow" @touchmove.prevent @click="hidePanel">
			<div class="expert-intro-panel" style="-webkit-box-orient: vertical;">
				<h2>{{ expertName }}</h2>
				<div class="expert-intro-content">
					<p class="expert-intro-good">擅长：{{ skill }}</p>
					<p class="expert-intro-profile">简介：{{ profile }}</p>
				</div>
				<div class="expert-intro-opera">
					<a>取消</a>
					<a @click.prevent="chooseExpert">选择</a>
				</div>
				<div class="intro-panel-close"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		name : "serverExperts",
		data (){
			return {
				titleName : "选择专家",
				serviceDictId : this.$route.query.id,
				userId: "",
				money:"",
				type:this.$route.query.type,
				expertList : [],
				isLoading:true,
				isShow: false,
				page:1,
				rows:6,
				skill: "",
				profile: "",
				expertName: ""
			}
		},
		components : {
			Heads,
			Loading
		},
		filters:{
			getDistance(val){
				let dis = Number(val);
				if(dis >= 1000){
					return (dis/1000).toFixed(1) + "公里";
				}else {
					return dis.toFixed(0) + "米";
				}
			}
		},
		methods:{
			initExpertsList(){
				//专家列表详情
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let lat = this.$route.query.lat;
				let lon = this.$route.query.lon;
				if(!this.$store.timeInfo){ //无预约时间
					console.log("无预约时间")
					if(lat!=""&&lon!=""){
						var doctorData = JSON.stringify({
							serviceDictId : this.serviceDictId,
							page : this.page,
							rows : this.rows,
							lat : lat,
							lon : lon
						});
					}else {
						var doctorData = JSON.stringify({
							serviceDictId : this.serviceDictId,
							page : this.page,
							rows : this.rows
						});
					}
				}else { //有预约时间
					console.log("有预约时间")
					let datesArr = this.$store.timeInfo.dates.split("-");
					let time = this.$store.timeInfo.time;
					let dates = "";
					for(var i in datesArr){
						dates += datesArr[i];
					}
					if(lat!=""&&lon!=""){
						var doctorData = JSON.stringify({
							serviceDictId : this.$route.query.id,
							page : 1,
							pointOfTime : time,
							pointOfDay : dates,
							rows : 6,
							lat : lat,
							lon : lon
						});
					}else {
						var doctorData = JSON.stringify({
							serviceDictId : this.$route.query.id,
							page : 1,
							rows : 6,
							pointOfTime : time,
							pointOfDay : dates
						});
					}

				}
				
				console.log("专家数据请求参数",JSON.parse(doctorData))
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111183, jsonValue:doctorData},{emulateJSON:true}).then( response => {
						let list = [];
						let uId = this.$route.query.userId;
						for(var i = 0;i < response.body.rows.length;i ++){
							if(uId == response.body.rows[i].userId){
								continue;
							}else {
								list.push(response.body.rows[i]);
							}
						}
						this.expertList =  list;
						console.log(list)
						setTimeout(() => {
		               		this.isLoading = false;
		            	}, 500)
					});
				
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 6;
					this.initExpertsList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let lat = this.$route.query.lat;
				let lon = this.$route.query.lon;
				if(!this.$store.timeInfo){ //无预约时间
					if(lat!=""&&lon!=""){
						var doctorData = JSON.stringify({
							serviceDictId : this.serviceDictId,
							page : this.page,
							rows : this.rows+6,
							lat : lat,
							lon : lon
						});
					}else {
						var doctorData = JSON.stringify({
							serviceDictId : this.serviceDictId,
							page : this.page,
							rows : this.rows+6
						});
					}
					var portNum = 111183;
				}else { //有预约时间
					let datesArr = this.$store.timeInfo.dates.split("-");
					let time = this.$store.timeInfo.time;
					let dates = "";
					for(var i in datesArr){
						dates += datesArr[i];
					}
					if(lat!=""&&lon!=""){
						var doctorData = JSON.stringify({
							serviceDictId : this.$route.query.id,
							page : this.page,
							pointOfTime : time,
							pointOfDay : dates,
							rows : this.rows+6,
							lat : lat,
							lon : lon
						});
					}else {
						var doctorData = JSON.stringify({
							serviceDictId : this.$route.query.id,
							page : this.page,
							rows : this.rows+6,
							pointOfTime : time,
							pointOfDay : dates
						});
					}
					var portNum = 111199;
					
				}
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:portNum, jsonValue:doctorData},{emulateJSON:true}).then( response => {
						let list = [];
						let uId = this.$route.query.userId;
						for(var i = 0;i < response.body.rows.length;i ++){
							if(uId == response.body.rows[i].userId){
								continue;
							}else {
								list.push(response.body.rows[i]);
							}
						}
						this.expertList =  list;
						console.log("this.rows",this.rows);
						console.log("list.length",list.length)
						console.log("response.body.rows.length",response.body.rows.length);
						if (list.length >= response.body.rows.length - 1) {
			          		setTimeout(() => {
			            		done(true)
			          		}, 1500)
			          		return;
			        	}
						setTimeout(() => {
		               		this.isLoading = false;
		            	}, 500)
						this.rows+=6
					});
		
			},
			showExpert(data){
				let vm = this;
				vm.userId = data.userId;
				vm.expertName = data.name;
				if(data.docSpecialty == "" || data.docSpecialty == null){
					vm.skill = '暂无擅长';
				}else {
					vm.skill = data.docSpecialty;
				}
				if(data.docResume == "" || data.docResume == null){
					vm.profile = '暂无简介';
				}else {
					vm.profile = data.docResume;
				}
				vm.isShow = true;
				
			},
			hidePanel(){
				this.isShow = false;
			},
			chooseExpert(){
				let id = this.serviceDictId;
				let type = this.type;
				let userId = this.userId;
				let list = this.expertList;
				for(var i = 0;i < list.length;i ++){
					if(userId == list[i].userId){
						let money = list[i].serviceMoney;
						this.$router.push({path:"/serverDetail/serverConfirm",query:{id:id,type:type,userId:userId,money:money}});
						break;
					}
				}
			},
			iconCheck(path){
				if(!path){
					return './src/assets/image/DefaultAvatar.png'
				}
				return path;
			}
		},
		mounted(){
			this.initExpertsList()
		}
	}
</script>
<style>
	#server-experts{
		width: 100%;
		height: 100%;
		background: #fff;
		padding-top: 0.84rem;
	}
	#server-experts .server-expert{
		padding: 0 0.3rem;
		background: #fff;
		border-bottom: 0.15rem solid #e2e2e2;
	}
	#server-experts .server-expert a{
		display: block;
		width: 100%;
		height: 100%;
	}
	#server-experts .server-expert-info{
		width: 100%;
		padding: 0.3rem 0;
		position: relative;
	}
	#server-experts .server-expert-pic{
		width: 1.3rem;
		height: 1.3rem;
		float: left;
	}
	#server-experts .server-expert-pic img{
		display: block;
    	width: 100%;
    	height: 100%;
    	border: 0 none;
    	border-radius: 100%;
	}
	#server-experts .server-expert-content{
	 	float: left;
	    padding-left: 0.3rem;
	    width: 80%;
	    position: relative;
	 }
	#server-experts .server-focus-icon{
	 	width: 0.85rem;
	 	height: 0.26rem;
	 	background: #009983;
	 	border-radius: 4px;
	 	position: absolute;
	 	left: 105%;
	 	top: 0.05rem;
	 	text-align: center;
	 	line-height: 0.26rem;
	 	color: #fff;
	 	font-size: smaller;
	 }
	 #server-experts .server-expert-name{
	 	font-size: 0.28rem;
	    color: #000;
	    letter-spacing: 0.02rem;
	    margin-top: 0.1rem;
	    position: relative;
	    display: inline-block;
	 }
	 #server-experts .server-expert-work{
	 	font-size: 0.24rem;
	    margin-top: 0.08rem;
	    color: #777777;
	 }
	 #server-experts .server-expert-work i{
	 	font-style: normal;
	 	width: 1.1rem;
	 	text-align: center;
	 	height: 0.36rem;
	 	line-height: 0.36rem;
	 	display: inline-block;
	 	margin-right: 0.2rem;
	 	border-radius: 4px;
	 	border: 0.01rem solid green;
	 	color: green;
	 	font-size: smaller;
	 }
	 #server-experts .server-expert-place{
	 	font-size: 0.24rem;
    	color: #858585;
	 }
	 #server-experts .server-expert-distance{
	 	position: absolute;
	    top: 0.3rem;
	    right: 0;
	    color: #7a7a7a;
	    font-size: 0.24rem;
	    line-height: 0.24rem;
	 }
	 #server-experts .server-expert-distance img{
	 	border: 0 none;
    	height: 0.24rem;
    	vertical-position: middle;
   		margin-left: 0.1rem;
	 }
	 #server-experts .server-expert-bottom{
	    margin-left: 1.6rem;
	    width: 76%;
	    height: 0.75rem;
	    border-top: 0.01rem solid #f3f3f3;
	 }
	#server-experts .server-feedback{
		height: 0.75rem;
		border-top: 0.01rem solid #f3f3f3;
	}
	#server-experts .server-feedback .server-num {
	    color: #7a7a7a;
	    font-size: 0.24rem;
	    float: left;
	    line-height: 0.75rem;
	}
	#server-experts .server-feedback .server-num span{
		color: #555;
	}
	#server-experts .server-feedback .server-score{
		float: right;
	    line-height: 0.75rem;
	    color: #858585;
	    font-size: 0.24rem;
	}
	#server-experts .expert-intro{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.3);
		z-index: 99;
	}
	.expert-intro .expert-intro-panel{
		width: 90%;
		height: 7.32rem;
		position: relative;
		margin-left: 5%;
		top: 50%;
		margin-top: -3.66rem;
		border-radius: 6px 6px 0 0;
		background: #fff;
		display: -webkit-box;
 		-webkit-box-orient: vertical;

	}
	.expert-intro-panel .intro-panel-close{
		position: absolute;
		width: 0.4rem;
		height: 0.8rem;
		right: 0.2rem;
		top: -0.8rem;
		background: url(../../assets/image/server/closePro.png) no-repeat center center;
    	background-size: 100%;
	}
	.expert-intro .expert-intro-panel h2{
		width: 100%;
		height: 1.08rem;
		font-size: 0.33rem;
		color: #009984;
		border-bottom: 0.02rem solid #f3f3f3;
		text-align: center;
		line-height: 1.08rem;
	}
	.expert-intro-panel .expert-intro-content{
		width: 100%;
		-webkit-box-flex: 1;
		overflow-y: scroll;
		padding: 0.25rem 0.18rem 0;
		font-size: 0.2rem;
		background: #fff;
	}
	.expert-intro-good{
		/*line-height: 0.32rem;
		margin-top: 0.4rem;*/
	}
	.expert-intro-panel .expert-intro-profile{
		line-height: 0.32rem;
		margin-top: 0.4rem;
	}
	.expert-intro-opera{
		width: 100%;
		height: 0.94rem;
	}
	.expert-intro-opera a{
		width: 50%;
		height: 100%;
		float: left;
		color: #fff;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.94rem;
	}
	.expert-intro-opera a:first-child{
		background: #e6e6e6;
	}
	.expert-intro-opera a:last-child{
		background: #009984;
	}
</style>