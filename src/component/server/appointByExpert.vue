<template>
	<div id="appoint_by_expert">
		<Loading v-if="isLoading"></Loading>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
		</div>
		<div v-if="dataHide == 1">
			<scroller style="width: 100%;position: absolute;top: 0;background: #fff;"
			:on-refresh="refresh"
			:on-infinite="infinite"	
			v-if='isLoading == false'
			>
				<div class="expert_appoint_list">
					<ul>
						<li v-for="item in list" @click="appointDetail(item)">
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
						</li>
					</ul>
				</div>
			</scroller>
		</div>
	</div>
</template>
<script>
	import Loading from '../common/loading.vue'
	export default {
		props:{
			title:String
		},
		data(){
			return {
				isLoading: true,
				dataHide: 1,
				page: 1,
				rows: 6,
				list: "",
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
			init(){
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
					docType: "",
					searchValue: "",
					orderType: "",
					serviceWay: "",
					ignoreLogin: 1,
					lat: vm.lat,
					lon: vm.lon,
					eaId: vm.eaId,
					depCode: vm.depCode,
					registerDate: "",
					dayOfWeek: ""
					
				})
				//专家列表
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660124, jsonValue:doctorData},{emulateJSON:true}).then( response => {
					console.log("660124",response);
					if(response.body == null || response.body.rows.length == 0){
						vm.dataHide = 0;
					}else {
						vm.dataHide = 1;
						vm.list = response.body.rows;
					}
					setTimeout(() => {
			            vm.isLoading = false;
			        }, 100)
				});
			},
			refresh(done){
				setTimeout(() => {
					this.rows = 6;
					this.init();
					done();
				}, 1000)
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
					registerDate: "",
					dayOfWeek: ""
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660124, jsonValue:doctorData},{emulateJSON:true}).then( response => {
					if(this.rows >= response.body.rows.length){
						setTimeout(() => {
				            done(true)
				        }, 400)
				      	return;
					}
					setTimeout(() => {
						this.list = response.body.rows;
						done();					
					}, 400)
					this.rows+=6
				});
			},
			appointDetail(item){//进入专家预约详情
				let vm = this;
				let doctorId = item.userId;
				let eaId = vm.$route.query.eaId;
				let depCode = vm.depCode;
				let docNum = vm.$route.query.docNum;
				let title = vm.title;
				vm.$router.push({path:"/serverConfirm/departmentDeta",query:{doctorId:doctorId,eaId:eaId,depCode:depCode,docNum:docNum,title:title}});
			}
		},
		created(){
			this.init();
		}
	}
</script>
<style>
	#appoint_by_expert{
		width: 100%;
	}
	#appoint_by_expert .server-data-null{
		width: 100%;
		border-top: 0.2rem solid #ebebeb;
	}
	#appoint_by_expert .server-data-null i{
		display: block;
		width: 3.5rem;
		height: 3.5rem;
		position: relative;
		top: 2.3rem;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center ;
		background-size: 3.5rem;
		margin: 0 auto;
	}
	.expert_appoint_list{
		background: #ebebeb;
	}
	.expert_appoint_list ul{
		width: 100%;
		background: #fff;
	}
	.expert_appoint_list li{
		width: 100%;
		padding: 0 0.3rem;
		background: #fff;
		border-top: 0.16rem solid #ebebeb;
	}
	.expert_appoint_list .expert_info{
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
	
	.expert_appoint_list .expert_info_bottom{
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
</style>