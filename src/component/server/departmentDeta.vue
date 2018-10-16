<template>
	<div id="expert_Deta">
		<Heads :title="titleName"></Heads>		
		<div>
			<div style="overflow-y:scroll; height: 11.5rem; ">
			<div class="headDetails">
				{{ depName1 }}<span v-if="depName2 != ''"> - </span>{{ depName2 }} <span v-if="docNum != undefined">({{ docNum }}人 )</span>
			</div>
			<div style="height: 2.57rem;">
				<dl class="courseList">
					<dt>
						<!--<img src="../../assets/image/index_img/serve_no_img.png" class="courseList_head">-->
						<img :src="photosmall" alt="" class="courseList_head"/>
					</dt>
					<dd>
						<div class="courseList_text">
							<p>{{ titleName }}</p>
							<p><span>{{ depName1.split(",")[0] }}-{{ proTitle.split(",")[0] }}</span></p>
							<p class="clampSearch1">{{ eaName }}</p>
						</div>
						<p>服务<span>0</span>人</p>
					</dd>
					<!--<p class="distanceDepar">{{ item.distance | getDistance}}<span><img src="../../assets/image/server/posi_icon.png"/></span></p>-->
				</dl>
			</div>
			<div class="visitTime">
				出诊时间
			</div>
			
				<div class="visitTimeList" v-for="(item,index) in mentdateList">
					<p>{{ item.dayOfWeekName }}({{ item.registerDate.substring(4,6) }}月<span v-model="registerDate">{{ item.registerDate.substring(6,8) }}</span>日)</p>
					<!--<p class="timeApp_full" style="margin-left: 0.8rem;" v-if="item.morningFull == -1">上午约满</p>-->
					<p class="timeApp_make" style="margin-left: 0.8rem;" @click="morning(item,index)" :class="{ timeApp_elect:active == index }" v-if="item.morningFull == 0">预约上午</p>
					<!--<p class="timeApp_elect" style="margin-left: 0.8rem;" v-if="item.morningFull == 1">预约上午</p>-->
					<!--<p class="timeApp_full" style="margin-left: 0.8rem;" v-if="item.afternoonFull == -1">下午约满</p>-->
					<p class="timeApp_make" style="margin-left: 0.8rem;" @click="afternoon(item,index)" :class="{ timeApp_elect:active1 == index }" v-if="item.afternoonFull == 0">预约下午</p>
					<!--<p class="timeApp_elect" style="margin-left: 0.8rem;" v-if="item.afternoonFull == 1">预约下午</p>-->
				</div>
			</div>
		</div>
		<div class="butClass" @click="butOnclick()">提交预约</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: '',
				mentdateList:[],
				page:1,
				rows:8,
				eaId:this.$route.query.eaId,
				doctorId:this.$route.query.doctorId,
				msgAll:'',
				morningFull:'',
				list:[],
				depCode:this.$route.query.depCode,
				docNum:this.$route.query.docNum,
				title:this.$route.query.title,
				registerDate:"",
				userId:'',
				timeName:'',
				depName1:'',
				depName2:'',
				depNum:'',
				active:-1,
				active1:-1,
				doctorSchedualId:'',
				costMoney: '',
				hospitalServiceMoney: '',
				proTitle:'',
				eaName:'',
				photosmall:'',
			}
		},
		components:{
			Heads
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
			init(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				var token = userInfo.token;
				var data = JSON.stringify({
					page:this.page,
					rows:this.rows,
					eaId:this.eaId,
					doctorId:this.doctorId,
					showValid:'1',
				});
				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 660122, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log("660122",response);
					this.mentdateList = response.body.rows;
					this.msgAll = response.body.rows;
//					this.depName1 = response.body.depInfo.depName1;
//					this.depName2 = response.body.depInfo.depName2;
//					this.depNum = response.body.depInfo.depNum;			
					
				})
			},
			
			listHead(){
				
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let localInfo = JSON.parse(sessionStorage.getItem("localInfo"));
				let vm = this;
				vm.lat = localInfo.lat;
				vm.lon = localInfo.lon;
				vm.eaId = vm.$route.query.eaId;
				vm.depCode = vm.$route.query.depCode;
				console.log("纬度",vm.lat);
				console.log("经度",vm.lon);
				let doctorData = JSON.stringify({
					page: 1,
					rows: 6,
					userId : this.doctorId,
					ignoreLogin: 1,
					lat: vm.lat,
					lon: vm.lon,		
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660101, jsonValue:doctorData},{emulateJSON:true}).then( response => {
//					console.log("660124",response);
					console.log("660101",response);
//					let res = response.body;
//					this.list = res;
					this.userId = response.body.userId;
					console.log(this.userId);
					this.eaName = response.body.eaName;
					this.proTitle = response.body.proTitle;
					this.depName1 = response.body.department;
					this.depName2 = response.body.departmentInfo;
					this.depNum = response.body.teamCount;
					this.titleName = response.body.name;
					this.photosmall = response.body.photosmall;
				});
			
			},
			
			morning(item,index){
				this.active = index;
				console.log(index);
				this.timeName = "上午";
				console.log(item);
				console.log(this.morningFull);
				this.active1 = -1;
				
//				点击存值
				this.dayOfWeek = item.dayOfWeek;
				this.doctorSchedualId = item.doctorSchedualId;
				this.registerDate = item.registerDate;
			 	this.costMoney = item.morningCostMoney;
			 	this.hospitalServiceMoney = item.morningHospitalServiceMoney;
				console.log(item.registerDate.substring(0,4)+'-'+item.registerDate.substring(4,6)+'-'+item.registerDate.substring(6,8))
				
				
			},
			afternoon(item,index){
				this.active1 = index;
				console.log(index);
				this.timeName = "下午";
				console.log(item);
				this.active = -1;

//				点击存值
				this.dayOfWeek = item.dayOfWeek;
				this.doctorSchedualId = item.doctorSchedualId;
				this.registerDate = item.registerDate;
				this.costMoney = item.afternoonCostMoney;
			 	this.hospitalServiceMoney = item.afternoonHospitalServiceMoney;
				console.log(item.registerDate.substring(0,4)+'-'+item.registerDate.substring(4,6)+'-'+item.registerDate.substring(6,8))

			},
			butOnclick(){
				let keys = sessionStorage.getItem("isServer");
				let appointInfo
				console.log(this.depCode);
				if(this.timeName == ""){
					return false;
				}
				let vm = this;
				let timeSlot;
				if(vm.timeName == '上午'){
					timeSlot = 1;
				}else {
					timeSlot = 2;
				}
				if(!keys){//keys为空，预约挂号进入
					appointInfo = {
						name: vm.titleName,
						userId: vm.$route.query.doctorId,
						timeSlot: timeSlot,
						registerDate: vm.registerDate.substring(0,4)+'-'+vm.registerDate.substring(4,6)+'-'+vm.registerDate.substring(6,8),
						dayOfWeek: vm.dayOfWeek,
						doctorSchedualId: vm.doctorSchedualId,
						costMoney: this.costMoney,
						hospitalServiceMoney: this.hospitalServiceMoney
					}
					console.log(appointInfo);
					vm.$router.push({path:"/serverConfirm/appointInfo",query:appointInfo});
				}else {
					appointInfo = {
						name: vm.titleName,
						userId: vm.userId,
						timeSlot: vm.timeName,
						registerDate: vm.registerDate.substring(0,4)+'-'+vm.registerDate.substring(4,6)+'-'+vm.registerDate.substring(6,8),
						dayOfWeek: vm.dayOfWeek,
						title: vm.depName2,
						eaId:vm.$route.query.eaId,
						depCode:vm.$route.query.depCode,
						doctorSchedualId:vm.doctorSchedualId,
						costMoney: this.costMoney,
						hospitalServiceMoney: this.hospitalServiceMoney
					}
					console.log(appointInfo);
					vm.$store.state.appointInfo = JSON.stringify(appointInfo);
					if(vm.depCode == undefined){
						vm.$router.go(-1);
					}else{
						vm.$router.go(-3);
					}
					
					
				}
				
			}
		},
		mounted (){
			this.init();
			this.listHead();
		},
	}
</script>
<style>
	#expert_Deta{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.headDetails{
		height: 1rem;
		font-size: 0.28rem;
		line-height: 1rem;
		text-align: center;
		color: #333333;
		border-bottom: 0.2rem solid #ebebeb;
	}
	.visitTime{
		height: 0.9rem;
		background: #DEDEDE;
		font-size: 0.28rem;
		line-height: 0.9rem;
		text-indent: 0.2rem;
		color: #333;
	}
	.courseList{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		height: 2.3rem;
 		font-size: .22rem;
 		border-bottom: 0.15rem solid #eee;
 		background: #fff;
	}
	.courseList dd p{
		height: .38rem;
		line-height: .38rem;
		color: #999;
	}
	.courseList dd p:first-child{
		height: .38rem;
		line-height: .38rem;
		color: #666;
		margin-top: .3rem;
	}
	.courseList_head{
		height: 1.28rem;
		width: 1.28rem;
		border-radius: 50px;
	}
	.courseList_text{
		height: 1.3rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		color: red;
	}
	.courseList dt{
		height: 2.1rem;
		width: 2rem;
	}
	.courseList dd{
		height: 2.1rem;
		width: 70%;
	}
	.courseList dt img{
		margin-left: .3rem;
		margin-top: .3rem;
	}
	.distanceDepar{
	 	position: absolute;
	 	z-index: 9999;
	 	right: 0.3rem;
	 	margin-top: 0.3rem;
	 	font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	 }
	 .distanceDepar img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.deparEval{
		display: block;
		float: right;
	}
	.visitTimeList{
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		height: 1.1rem;
		line-height: 1.1rem;
		font-size: 0.25rem;
		color: #333;
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #e6e6e6;
	}
	/*
	 * 已满
	 */
	.timeApp_full{
		width: 1.5rem;
		height: 0.7rem;
		text-align: center;
		line-height: 0.7rem;
		background: #f5f5f5;
		color: #999999;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
		border: 1px solid #F5F5F5;
	}
	/*
	 * 未预约
	 */
	.timeApp_make{
		width: 1.5rem;
		height: 0.7rem;
		text-align: center;
		line-height: 0.7rem;
		color: #64b451;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
		border: 1px solid #64b451;
	}
	/*
	 * 选中
	 */
	.timeApp_elect{
		width: 1.5rem;
		height: 0.7rem;
		text-align: center;
		line-height: 0.7rem;
		background: #64b451;
		color: #fff;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
		border: 1px solid #64b451;
	}
	.butClass{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		font-size: 0.28rem;
		color: #fff;
		background: #009983;
	}
	::-webkit-scrollbar{
	  display:none;
	}
</style>