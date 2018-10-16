<template>
	<div id="appoint_by_date">
		<ul class="server_date_ul">
			<li v-for="(item,index) in dateList" :class="{active:index==isActive}" @click="selectDate(index,item)">
				<p class="server_week">{{ item.dayOfWeekName }}</p>
				<p class="server_date">{{ item.monthDate }}</p>
			</li>
		</ul>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
		</div>
		<div class="server_expert_list" :style="{top:filterTop(topValue)}">
			<Loading v-if="isLoading"></Loading>
			<div v-if="dataHide == 1">
				<scroller style="width: 100%;position: absolute;top: 0;background: #fff;"
				:on-refresh="refresh"	
				:on-infinite="infinite"	
				v-if='isLoading == false'
				>
					<div class="date_appoint_list">
						<ul>
							<li v-for="item in expertList" @click="appointDetail(item)">
								<div class="expert_info">
									<div class="expert_pic">
										<img :src="item.photosmall" alt="" />
									</div>
									<div class="expert_content">
										<div class="expert_name">
											{{ item.name }}
											<p class="expert-focus-icon" v-if="item.attentionCount == '1'">已关注</p>
										</div>
										<p class="expert_work"><span>{{ item.department.split(',')[0] }} </span><span> {{ item.proTitle?item.proTitle.split(',')[0]:''}}</span></p>
										<p class="expert_place">{{ item.hospital?item.hospital.split(',')[0]:''}}</p>
										<p class="expert_distance" v-if="item.distance != '-1' && item.distance != null">
											{{ item.distance | getDistance}}
											<img src="../../assets/image/server/location_icon.png">
										</p>
										<div class="expert_appoint_btn">预约</div>
									</div>
								</div>
								<div class="expert_info_bottom">
									<div class="expert_feedback">
										<p class="expert_server_num">服务<span>0</span>人</p>
									</div>
								</div>
								<div class="expert_appoint_time">
									<p v-if="item.morningFull != '-1'" class="expert_appoint_morning" :class="{isFull:item.morningFull == '1'}" @click="appointTime_mor(item)">{{ item.morningFull == '1'?'上午约满':'预约上午' }}</p>
									<p v-if="item.afternoonFull != '-1'" class="expert_appoint_after" :class="{isFull:item.afternoonFull == '1'}" @click="appointTime_after(item)">{{ item.afternoonFull == '1'?'下午约满':'预约下午' }}</p>
									<span class="expert_special_name">{{ specialName(item) }}</span>
								</div>
							</li>
						</ul>
					</div>
				</scroller>
			</div>
		</div>
	</div>
</template>
<script>
	import Loading from '../common/loading.vue'
	export default {
		props:{
			title:String,
			topValue:String
		},
		data(){
			return {
				isActive: 0,
				dataHide: 1,
				page: 1,
				rows: 6,
				isLoading: false,
				dateList: "",
				expertList: "",
				registerDate: "",
				dayOfWeek: "",
				lat: "",
				lon: "",
				eaId: "",
				depCode: ""
			}
		},
		components:{
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
			initDateBar(){
				let vm = this;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let localInfo = JSON.parse(sessionStorage.getItem("localInfo"));
				vm.lat = localInfo.lat;
				vm.lon = localInfo.lon;
				vm.eaId = vm.$route.query.eaId;
				vm.depCode = vm.$route.query.depCode;
				let dateInfo = JSON.stringify({
					eaId: vm.eaId
				})
				//预约时日列表接口
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660123, jsonValue:dateInfo},{emulateJSON:true}).then( response => {
					console.log(response);
					vm.dateList = response.body.rows;
					vm.initExpert(0,vm.dateList[0]);
				});
			},
			initExpert(index,data){
				console.log(data);
				let vm = this;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				vm.dayOfWeek = data.dayOfWeek;
				vm.registerDate = data.date;
				console.log(vm.dayOfWeek);
				console.log(vm.registerDate);
				let doctorInfo = JSON.stringify({
					page: 1,
					rows: 6,
					docType: "",
					searchValue: "",
					orderType: "",
					serviceWay: "",
					ignoreLogin: 1,
					lat: vm.lat,
					lon: vm.lon,
					eaId: vm.eaId,
					depCode: vm.depCode,
					registerDate: data.date,
					dayOfWeek: data.dayOfWeek
				})
				
				console.log(JSON.parse(doctorInfo));
				//按医院和预约日期查询可约医生
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660124, jsonValue:doctorInfo},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body == null || response.body.rows.length == 0){
						vm.dataHide = 0;
					}else {
						vm.dataHide = 1;
						vm.expertList = response.body.rows;
					}
					setTimeout(() => {
			            vm.isLoading = false;
			        }, 100)
				});
			},
			refresh(done){
				let vm = this;
				let data = {
					dayOfWeek: vm.dayOfWeek,
					date: vm.registerDate
				}
				console.log(data);
				console.log(vm.isActive);
				setTimeout(() => {
					vm.rows = 6;
					vm.initExpert(vm.isActive,data);
					done();
				}, 300)
			},
			infinite(done){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let vm = this;
				let doctorData = JSON.stringify({
					page: vm.page,
					rows: vm.rows,
					docType: "",
					searchValue: "",
					orderType: "",
					serviceWay: "",
					ignoreLogin: 1,
					lat: vm.lat,
					lon: vm.lon,
					eaId: vm.eaId,
					depCode: vm.depCode,
					registerDate: vm.registerDate,
					dayOfWeek: vm.dayOfWeek
				})
				//按医院和预约日期查询可约医生
				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660124, jsonValue:doctorData},{emulateJSON:true}).then( response => {
					if(vm.rows >= response.body.rows.length){
						setTimeout(() => {
				            done(true)
				        }, 400)
				      	return;
					}
					setTimeout(() => {
						vm.expertList = response.body.rows;
						done();					
					}, 400)
					vm.rows+=6
				});
			},
			selectDate(index,data){
				let vm = this;
				vm.isActive = index;
				vm.isLoading = true;
				vm.initExpert(index,data);
			},
			appointTime_mor(item){
				if(item.morningFull == "1"){
					return false;
				}else {
					let vm = this;
					let appointInfo = {
						name: item.name,
						userId: item.userId,
						timeSlot: '上午',
						registerDate: vm.registerDate,
						dayOfWeek: vm.dayOfWeek,
						title: item.departmentInfo,
						doctorSchedualId: item.doctorSchedualId,
						department: item.department,
						proTitle: item.proTitle,
						eaId: vm.eaId,
						depCode: vm.depCode,
						costMoney: item.morningCostMoney,
						hospitalServiceMoney: item.morningHospitalServiceMoney
					}
					vm.$store.state.appointInfo = JSON.stringify(appointInfo)
					vm.$router.go(-2);
				}
				console.log(item);
				
			},
			appointTime_after(item){
				if(item.afternoonFull == "1"){
					return false;
				}else {
					let vm = this;
					let appointInfo = {
						name: item.name,
						userId: item.userId,
						timeSlot: '下午',
						registerDate: vm.registerDate,
						dayOfWeek: vm.dayOfWeek,
						title: item.departmentInfo,
						doctorSchedualId: item.doctorSchedualId,
						department: item.department,
						proTitle: item.proTitle,
						eaId: vm.eaId,
						depCode: vm.depCode,
						costMoney: item.afternoonCostMoney,
						hospitalServiceMoney: item.afternoonHospitalServiceMoney
					}
					vm.$store.state.appointInfo = JSON.stringify(appointInfo)
					vm.$router.go(-2);
				}
				console.log(item);
			},
			appointDetail(item){
				let vm = this;
				let doctorId = item.userId;
				let eaId = vm.$route.query.eaId;
				let depCode = vm.depCode;
				let docNum = vm.$route.query.docNum;
				let title = vm.title;
				vm.$router.push({path:"/serverConfirm/departmentDeta",query:{doctorId:doctorId,eaId:eaId,depCode:depCode,docNum:docNum,title:title}});
			},
			specialName(t){
				if(!t.morningTypeName){
					return t.afternoonTypeName;
				}else {
					return t.morningTypeName;
				}
			},
			filterTop(t){
				let _top = parseFloat(t)+1.28;
				return _top + "rem"
			}
		},
		created(){
			this.initDateBar()
		}
	}
</script>
<style>
	#appoint_by_date{
		width: 100%;
		height: 100%;
	}
	::-webkit-scrollbar{
		display: none;
	}
	#appoint_by_date .server-data-null{
		width: 100%;
		height: 100%;
	}
	#appoint_by_date .server-data-null i{
		display: block;
		width: 3.5rem;
		height: 3.5rem;
		position: relative;
		top: 2.5rem;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center ;
		background-size: 3.5rem;
		margin: 0 auto;
	}
	#appoint_by_date .server_date_ul{
		width: 100%;
		float: left;
		overflow-x: auto;
		white-space: nowrap;
		border-top: 0.01rem solid #e6e6e6;
		border-bottom: 0.2rem solid #ebebeb;
	}
	#appoint_by_date .server_date_ul li{
		display: inline-block;
		width: 1.08rem;
		height: 0.88rem;
		border-right: 0.01rem solid #e6e6e6;
	}
	#appoint_by_date .server_date_ul li.active{
		background: #009983;
	}
	#appoint_by_date .server_date_ul li.active p{
		color: #fff;
	}
	#appoint_by_date .server_date_ul li:last-child{
		border: 0 none;
	}
	#appoint_by_date .server_date_ul p{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.server_date_ul .server_week{
		font-size: 0.25rem;
		color: #666;
		margin-top: 0.12rem;
	}
	.server_date_ul .server_date{
		font-size: 0.18rem;
		color: #666;
	}
	.server_expert_list{
		width: 100%;
		position: fixed;
		top: 3.25rem;
		bottom: 0;
	}
	.date_appoint_list{

	}
	.date_appoint_list ul{
		width: 100%;
		background: #fff;
	}
	.date_appoint_list li{
		width: 100%;
		padding: 0 0.3rem;
		background: #fff;
		border-bottom: 0.16rem solid #ebebeb;
	}
	.date_appoint_list li:last-child{
		border: 0 none;
	}
	.date_appoint_list .expert_info{
		width: 100%;
		padding: 0.3rem 0;
		position: relative;
	}
	.expert_info .expert_pic{
		width: 1.2rem;
    	height: 1.2rem;
    	float: left;
	}
	.expert_info .expert_pic img{
		display: block;
	    width: 100%;
	    height: 100%;
	    border: 0 none;
	    border-radius: 100%;
	}
	.expert_info .expert_content{
		float: left;
    	padding-left: 0.3rem;
    	width: 80%;
    	position: relative;
	}
	.expert_content .expert_name{
		font-size: 0.28rem;
	    color: #333;
	    letter-spacing: 0.02rem;
	    margin-top: 0.1rem;
	    position: relative;
	    display: inline-block;
	}
	.expert_content .expert_work span{
		color: #666;
		font-size: 0.23rem;
	}
	.expert_content .expert_place{
		color: #808080;
		font-size: 0.23rem;
	}
	.expert_content .expert_distance{
		position: absolute;
	    top: 0.15rem;
	    right: 0;
	    color: #7a7a7a;
	    font-size: 0.24rem;
	    line-height: 0.24rem;
	}
	.expert_content .expert_distance img{
		border: 0 none;
    	height: 0.24rem;
    	vertical-position: middle;
   		margin-left: 0.1rem;
	}
	.expert_content .expert_appoint_btn{
		position: absolute;
		height: 0.45rem;
		width: 0.9rem;
		border-radius: 0.5rem;
		background: #009983;
		font-size: 0.23rem;
		color: #fff;
		text-align: center;
		line-height: 0.45rem;
		top: 0.6rem;
		right: 0;
	}
	.expert_content .expert-focus-icon{
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
	
	.date_appoint_list .expert_info_bottom{
		margin-left: 1.6rem;
    	width: 76%;
    	height: 0.75rem;
    	border-top: 0.01rem solid #f3f3f3;
	}
	.expert_info_bottom .expert_feedback{
		height: 0.75rem;
    	border-top: 0.01rem solid #f3f3f3;
	}
	.expert_info_bottom .expert_server_num{
		color: #7a7a7a;
	    font-size: 0.24rem;
	    float: left;
	    line-height: 0.75rem;
	}
	.expert_info_bottom .expert_server_num span{
		color: #555;
		margin: 0 0.05rem;
	}
	.date_appoint_list .expert_appoint_time{
		position: relative;
		margin-left: 1.6rem;
    	width: 76%;
    	padding: 0.2rem 0;
    	border-top: 0.01rem solid #f3f3f3;
	}
	.expert_appoint_time p{
		width: 1.4rem;
		height: 0.5rem;
		background: #009983;
		font-size: 0.25rem;
		display: inline-block;
		text-align: center;
		line-height: 0.5rem;
		color: #fff;
		margin-right: 0.2rem;
		border-radius: 5px;
	}
	.expert_appoint_time .expert_special_name{
		color: #009983;
		font-size: 0.25rem;
		position: absolute;
		right: 0;
		top: 0.28rem;
	}
	.expert_appoint_morning.isFull{
		background: #f5f5f5;
		color: #999;
	}
	.expert_appoint_after.isFull{
		background: #f5f5f5;
		color: #999;
	}
</style>