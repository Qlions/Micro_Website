<template>
	<div style="overflow: hidden;" v-bind:class="{marTop:margIsActice}">
		<!--头部-->
		<!--{{this.teamMsg}}-->
		<heads :title="title" class="teamMsgHeader" v-for="(teamMsgItem, index) in this.teamMsg" key="index" style="position: absolute;  top: 0;"  v-on:child-say="listenToMyBoy">
			<span class="seeSpan"   @click="attenFn">{{ isatten }}</span>
			<!--<span class="seeSpan"   @click="attenFn" v-if="teamMsg.eaId != ''">{{ isatten }}</span>-->
			<!--<span class="seeSpan" @click="attenFn"  v-else >取消关注</span>-->
		</heads>
		<div style="height: 0.84rem; width: 1px;"></div>
		<loading v-show="isLoading" class="loads"></loading>
		<ul class="teamList" style=""  v-for="teamMsgItem in this.teamMsg" >
					
					<!--医联体团队-->
						<li class="teamListUl" v-if="type == 1">
							<dl>
								<dt class="headerImg">
									<img src="../../assets/image/DefaultAvatar.png" alt="" v-if="teamMsgItem.circleThemeFile == '' || teamMsgItem.circleThemeFile == null"/>
									<img v-bind:src=" teamMsgItem.circleThemeFile " alt="" v-if="teamMsgItem.circleThemeFile != 'unknown'"/>
									
								</dt>
								<dd>
									<ul class="msgUL">
										<li class="teamNameLi">{{ teamMsgItem.circleName }}</li>
										<li class="titleLi"><span class="BelongsSpan1">医联体团队</span><span class="nameSpan">{{ teamMsgItem.name }}</span>（<span class="positionSpan">{{ teamMsgItem.docTypeName.split(',')[0] }}</span>）</li>
										<li class="eaNameLi">
											始于
											<span class="yearSpan">{{ teamMsgItem.createTime.split("-")[0] }}</span>
											年
											<span class="mouthSpan">{{ teamMsgItem.createTime.split("-")[1] }}</span>
											月
											<span>{{ teamMsgItem.createTime.split("-")[2].split("T")[0] }}</span>
											日
										</li>
									</ul>
									<!--<ul class="peopleUl">
										<li><p class="numP">成员<span class="numSpan">{{ teamMsgItem.docCount }}</span>人</p></li>
									</ul>-->
								</dd>
							</dl>
							<div class="serverBox1" v-bind:class="{ clamp: isClamp }" style="width: 100%;word-wrap:break-word;padding: 0; -webkit-box-orient: vertical;"><span  v-show="allBtnShow1">简介:</span>{{ teamMsgItem.circleRemark }}</div>
							<div class="allBtn" @click="allBtn" v-show="allBtnShow">{{ allWord }}</div>
							
						</li>
					
					<!--家庭医生团队-->
						<li class="teamListUl" v-if="type == 2">
							<dl>
								<dt class="headerImg">
									<img v-bind:src=" teamMsgItem.circleThemeFile " alt="" v-if="teamMsgItem.circleThemeFile != ''"/>
									<img src="../../assets/image/DefaultAvatar.png" alt="" v-if="teamMsgItem.circleThemeFile == '' || teamMsgItem.circleThemeFile == null"/>
								</dt>
								<dd>
									<ul class="msgUL">
										<li class="teamNameLi">{{ teamMsgItem.circleName }}</li>
										<li class="titleLi"><span class="BelongsSpan">家庭医生团队</span><span class="nameSpan">{{ teamMsgItem.conTeamManager }}</span>（<span class="positionSpan">队长</span>）</li>
										<li class="eaNameLi">{{ teamMsgItem.eaName }}</li>
									</ul>
									<!--<ul class="peopleUl">
										<li><p class="numP">成员<span class="numSpan">{{ teamMsgItem.conTeamNum }}</span>人</p></li>
									</ul>-->
								</dd>
							</dl>
							<div class="serverBox">服务区域：<span>{{ teamMsgItem.kilometerManage }}</span></div>
							
						</li>
						
					<div style="height: 0.2rem; width: 107%; background: #eee;margin-left: -3.2%;"></div>
				</ul>
				
				<div class="teamCountDiv" v-for="teamMsgItem in this.teamMsg">
					<ul class="teamCountUl">
						<li>
							<dl @click="new_team">
								<dt>{{ tnum }}</dt>
								<dd>团队成员</dd>
							</dl>
						</li>
						<li>
							<dl @click="new_Num">
								<dt>{{ teamMsgItem.adviceCount }}</dt>
								<dd>咨询次数</dd>
							</dl>
						</li>
						<li>
							<dl @click="new_eva">
								<dt v-if="teamMsgItem.circleScore != ''">{{ teamMsgItem.circleScore }}%</dt>
								<dt v-if="teamMsgItem.circleScore == ''">--</dt>
								<dd>好评率</dd>
							</dl>
						</li>
					</ul>
					<div class="appraisediv">
						<div @click="atten"  :class="{'actives':isA,'active':isB}">团队成员({{tnum}})</div>
						<div @click="attenT" :class="{'active':isA,'actives':isB}">团队服务({{serverNum}})</div>
					</div>
					<!--<ul class="appraiseUl">
						<li class="flowerLi"><img src="../../assets/image/doctor/z_title_im_03.png"/>服务评价</li>
						
							
							<router-link :to='{path:"/doctor/evaluation" , query:{docRelationId: docRelationId,type:"2"}}' >
								<li class="appraiseli" >
									<img src="../../assets/image/doctor/pingjiaxingxing.png" v-for="start in teamMsgItem.star"/>
									<img src="../../assets/image/doctor/unShineStar.png" v-for="start in 5-teamMsgItem.star"/>
									<i><span>{{ teamMsgItem.commentCount }}</span>人评价</i>
								</li>
								<li class="rightLi">
									<img src="../../assets/image/head-back-right.png"/>
								</li>
							</router-link>
					</ul>-->
					
				</div>
				<div style="height: 0.2rem; width: 107%; background: #eee;margin-left: -3.2%;"></div>
				
				<err :message="err" v-if="isShow">{{ err }}</err>
				
				
				
				
				<!--团队成员-->
				<div :class="{'teamNumList':isS,'teamNumList1':isH}">
					<!--<ul class="teamPeopleUL">
						<li>团队成员</li>
						<li>(<span>{{ docTypeName != '' ? teamCount : teamNum }}</span>人)</li>
					</ul>-->
					<div class="doctorSection" v-for="item in teamPeoplo">
					<router-link :to='{path:"/doctor/doctorAuthorized", query:{docuserId : item.userId}}' >
						<dl class="doctorDl_list" >
							
							<!--没有头像的时候显示占位图-->
							<dt><img src="../../assets/image/index_img/serve_no_img.png" v-if="item.photosmall == '' || item.photosmall == null" class="doctorDtimg">
								<!--有头像的时候占位图消失-->
								<img v-bind:src="item.photosmall" class="doctorDtimg" v-else>
								<!--<i class="isattention1"  style="width: 0.8rem; margin-left: 0.6rem;" v-if="createUser == item.userId">创建人</i>-->
								<!--<i class="isattention2"  style="width: 0.8rem; margin-left: 0.6rem;" v-if="conTeamManagerId == item.userId">队长</i>-->
							</dt>
							<dd>
								<div class="doctorDdlist1">
									<p id="doctor_name_list" v-if="createUser != item.userId && conTeamManagerId != item.userId" >{{ item.name }}<span>&nbsp;&nbsp;
											<i class="isattention" v-if="item.attentionId != '' && item.attentionId != null">已关注</i>
										</span>
									<p id="doctor_name_list" class="aa" v-if="createUser == item.userId || conTeamManagerId == item.userId">{{ item.name }}
										<span v-if="createUser == item.userId">(创建人)</span>
										<i class="isattention2" v-if="conTeamManagerId == item.userId">(队长)</i>
										<span>&nbsp;&nbsp;
											<i class="isattention" v-if="item.attentionId != '' && item.attentionId != null">已关注</i>
										</span>
										
									</p>
									
									<p class="hidePOne"> 
										<span class="docter_famliy" v-if="item.familyContractTeamId != null">家庭医生</span>
										<span style="margin-left: 0.1rem;">{{ item.department.split(",")[0] }}</span>
										<span  v-if=" item.department != ',,' && item.department != ',' && item.department != '' ">&nbsp;</span>
										<span>{{ item.proTitle.split(",")[0] }}</span>
									</p>
									<p> {{item.hospital.split(",")[0] }}</p>
								</div>
								<p class="doctorLastp">服务
									<span>{{ item.userCount }}</span>次
									<span class="doctorRight" v-if="item.serviceScore != '' && item.serviceScore != null && item.serviceScore != 0">
										<span>{{ item.serviceScore != '' && item.serviceScore != null && item.serviceScore != 0 ? item.serviceScore.toFixed(0) : '--' }}</span>
										%好评
									</span></p>
							</dd>
						</dl>
					</router-link>
					</div>
					
					
				</div>
				
				<!--团队服务-->
				<div :class="{'gzh-addedHealth':iniA,'gzh-addedHealthH':iniB}">
					<ul>
						<li class="clearfix" v-for="list in addedHealthList">
							<a @click.stop="toDetail(list)">
								<!--<img :src="list.imgUrl" class="listImg" alt="" />-->
								<div class="listImg" :style="{backgroundImage:'url('+ imgIcon(list.imgUrl) +')'}"></div>
								<div class="listContent listContent_added">
									<p class="server-name">{{list.serviceDictName}}</p>
									<p class="server-source">由 <span class="server-point">{{list.eaName}}</span> 提供服务</p>
									<div class="server-method clearfix">
										<p class="server-way">
											<img src="../../assets/image/server/server_method.png" alt="" />
											{{list.serviceDictComponent !== null ? list.serviceDictComponent : list.serviceDictWay}}
										</p>
										<p class="server-time" v-if="list.serviceDictTime != null && list.serviceDictTime != ''">
											<img src="../../assets/image/server/server_time.png" alt="" />
											{{list.serviceDictTime}}分钟
										</p>
									</div>
									<p class="server-price"><span v-html="serviceMoney(list)"></span></p>
									<p class="server-buy" 
										@click.stop="toConform(list)" 
										>
										<img src="../../assets/image/server/buy_icon.png"/></p>
									<!--<p class="server-appiont" 
										@click.stop="toConform(list)" 
										v-if='list.serviceDictReservation == "1"'>
										预约<img src="../../assets/image/server/yuyuepic.png"/></p>
									<p class="server-posi" v-if="list.distance != '-1' && list.distance != null">{{ list.distance | getDistance}}<img src="../../assets/image/server/posi_icon.png"/></p>	-->
								</div>
							</a>
						</li>
					</ul>
				</div>
				
				
				<!--团队咨询-->
				<div class="groupTit" @click="groupCou">
					<div class="groupTit_text">团队咨询<span>({{adviceCount}}次)</span></div>
					<div class="groupTit_img"><img src="../../assets/image/expert_info_right@3x.png"></div>
				</div>
				
				<!--咨询列表-->
					<div :class="{'Q-containerB':inA,'Q-containerN':inB}">
			<router-link :to="{ path:'/my/myConsult/consultDetail',query:{ id:item.QId,wocode:item.orderCode,wtState:item.QState }}" class="Q-main" v-for="item in messages" :key="item.createTime" >
			
				<p class="Q-date" v-if="item.QType=='serviceOrderConsult' && (item.serviceType=='2' || item.serviceType==null)">{{item.createTime?item.createTime.substring(0,10):""}}
					<span id="blank"></span>
					{{item.createTime?item.createTime.substring(11,19):""}}
					<i v-if="item.commentValue!=''">完成</i>
					<i v-if="item.commentValue=='' && item.orderState==1">待抢单</i>
					<i v-if="item.commentValue=='' && item.QState==1&&(item.orderState==4||item.orderState==null)">待回复</i>
					<i v-if="item.commentValue=='' && item.QState==2">已回复</i>
				</p>
				<div class="Q-doc-message" v-if="(item.QType=='serviceOrderConsult' && item.serviceType=='1') || 
					item.QType =='groupDocConsult' || item.QType == 'privateDocConsult'">
					<div class="Q-doc-photo Q-doc-item" v-if="item.docName !=null">
						<img :src="item.docPhotosmall"/>
					</div>
					<div class="Q-doc-photo Q-doc-item" v-if="item.circleName !=null">
						<img :src="item.circleThemeFile"/>
					</div>
					<div class="Q-doc-name Q-doc-item" style="height: auto;">
						<!--<p class="Q-docName" v-if="item.docName !=null">{{item.docName?item.docName:null}}</p>-->
						<p class="Q-docName" v-if="item.circleName !=null">{{item.userName.substring(0,1)+"**"+item.userName.substring(item.userName.length-1,item.userName.length)}}</p>
						<p class="Q-docTime">{{item.createTime?item.createTime.substring(0,10):""}}
							<span id="blank"></span>
							{{item.createTime?item.createTime.substring(11,19):""}}
						</p>
					</div>
					<!--<div class="Q-type-state Q-doc-item">
						<i class="Q-state-suc" v-if="item.commentValue!=''">完成</i>
						<i v-if="item.commentValue=='' && item.QState ==1">待回复</i>
						<i v-if="item.commentValue== '' && item.QState ==2">已回复</i>
					</div>-->
				</div>
				<p class="Q-cont">问：{{item.QContent}}</p>
				<div class="Q-pay">
					<!--<span  v-if="item.QType=='serviceOrderConsult' && (item.serviceType=='2'|| item.serviceType==null)&&(item.payMoney ==0||item.payMoney ==null)">免费</span>
					<span v-if="item.QType=='groupDocConsult'">团队咨询</span>
					<span v-if="item.QType=='privateDocConsult'">家庭医生咨询</span>
					<span  v-if="item.QType=='serviceOrderConsult'&& item.serviceType=='1'">医生咨询</span>-->
					<!--评级-->
					<!--<div v-if="item.startLevel == 4" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
			
					<div v-if="item.startLevel == 1" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 2" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 3" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 5" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
					</div>-->
				</div>
			</router-link>
		</div>
				
				<div style="height: 0.84rem; width: 1px;"></div>
				<router-link :to="{path:'/doctor/AdvisoryDetails', query:{docId: this.$route.query.teamId}}">
					<div class="consulting">咨询团队</div>
				</router-link>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	import Loading from "../common/loading.vue"
	import err from '../common/error-popup.vue'
	export default {
		 mounted:function(){
		      this.$nextTick(function(){
		       this.initMsg();
		       })
		     
   		},
		props: {
			hasError:""
		},
	
		data(){
			return{
				title: "团队详情",
				docRelationId: this.$route.query.teamId,
				type: this.$route.query.type,
				teamType: this.$route.query.teamType,
				userinfoId: this.$route.query.userinfoId,
				isLoading: true,
				teamMsg: '',
				page: 1,
				rows: 8,
				isClamp: true,
				allWord: '查看全部简介',
				//660100
				docType: this.$route.query.docType,
				//团队成员
				teamPeoplo: '',
				teamCount: '',
				createUser: '',
				conTeamManagerId:'',
				attentionState: '',
				isatten: "+关注",
				docTypeName: '',
				teamNum: '',
				isShow1:false,
				isShow2:false,
				cuerid: [],
				err: '',
				isShow: false,
				margIsActice:false,
				isA:true,
				isB:false,
				isH:false,
				isS:true,
				groupS:false,
				groupH:true,
				allBtnShow:true,
				allBtnShow1:true,
				qIds:'',
				messages:'',
				inB:true,
				inA:false,
				tnum:'',
				adviceCount:'',
				addedHealthList:'',
				iniA:false,
				iniB:true,
				serverNum:'',

			}
		},
		components:{
			heads,
			Loading,
			err
		},
		methods:{
			ini(){
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				
				if(userInfo == "" || userInfo == null){
					var token = "";
				}else{
					var token = userInfo.token;
				}

				var vm = this;
				let teamData = JSON.stringify({
					page: "1",
					rows: "30",
					platType:"2",
					ignoreLogin:'1',
					docRelationId: this.docRelationId,
				
				});

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:111180, jsonValue: teamData}, { emulateJSON: true })

				.then( response => {
					console.log(response)
					this.addedHealthList = response.body.rows;
					this.serverNum = response.body.rows.length;
//					this.teamPeoplo = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			initMsg(){
				
				console.log(this.userinfoId);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
////				let token = userInfo.token;
//				let token = "";
//				let teamListData = JSON.stringify({
//					docRelationId: this.docRelationId,
//					"ignoreLogin" : "1" 
//				});
				
				if(userInfo == "" || userInfo == null){
					var token = "";
					var teamListData = JSON.stringify({
						docRelationId : this.docRelationId,
						"ignoreLogin" : "1" 
					})
				}else{
					var token = userInfo.token;
					var teamListData = JSON.stringify({
						docRelationId : this.docRelationId
					})
				}

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660220, jsonValue: teamListData}, { emulateJSON: true })

				.then( response => {
					console.log(response.body.rows)
					this.teamNum = response.body.rows[0].conTeamNum;
					this.teamMsg = response.body.rows;
					this.teamCount = response.body.rows[0].docCount;
					this.docType = response.body.rows[0].docType;
					this.createUser = response.body.rows[0].createUser; 
					console.log(this.createUser);
					this.docRelationId = response.body.rows[0].docRelationId;
					this.attentionId = response.body.rows[0].attentionState;
					console.log(this.attentionId);
					this.docTypeName =  response.body.rows[0].docTypeName;
					this.conTeamManagerId =  response.body.rows[0].conTeamManagerId;
					this.qIds =  response.body.rows[0].qIds;
					this.adviceCount =  response.body.rows[0].adviceCount;
					console.log(this.qIds);
//					console.log("长度",response.body.rows[0].circleRemark.length);
					if(response.body.rows[0].circleRemark == null || response.body.rows[0].circleRemark.length < 43){
						this.allBtnShow = false;
						this.allBtnShow1 = false;
					}
					
					
					
					
					if(this.attentionId == '' || this.attentionId == null){
						this.isatten = "+关注"
					}else{
						this.isatten = "取消关注"	
					}
					
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
				
				
				/*
				 660100  该团队下的成员
				 * */
				var vm = this;
				let teamData = JSON.stringify({
					docRelationId: vm.docRelationId,
					teamType: this.teamType,
					"ignoreLogin" : "1"
				
				});

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660100, jsonValue: teamData}, { emulateJSON: true })

				.then( response => {
					console.log(response);
					this.cuerid = response.body.rows[0].userId;
					this.tnum = response.body.rows.length;

					this.teamPeoplo = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
						console.log(this.cuerid);
						console.log(this.createUser);
				})
			
				
			},
			toConform(item){
				const isSign = item.reservationValid;
				const signState = this.signState;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(!userInfo){//用户未登录
					this.$router.push({path: '/login'});
				}else {
					if(isSign.includes('yyyz6')){
						if(signState == '0') {//未签约
							this.isSign = true;
							return false;
						}
						if(signState == '3'){//等待审核
							this.isWait = true;
							return false;
						}
					}
				}
				let id = item.serviceDictId;
				let type = item.serviceDictReservation;
				let money = item.serviceDictMoney;
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				sessionStorage.setItem("server_relationEaId",relationEaId)
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.itemsList = "";
				this.$store.state.mailInfo = "";
				window.localStorage.removeItem("passValue");
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type,money:money}});
				
			},
			//关注
			attenFn() {
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				if(userInfo == null){
					this.$router.push({path: '/login'});
					return false;
				}
				let token = userInfo.token;
				if(this.isatten == '+关注'){
					let userInfo = JSON.parse(this.$cookie.get("userInfo"));
					let token = userInfo.token;
					let attenData = JSON.stringify({
						attentionId: this.docRelationId,
					});
					console.log(attenData)

					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:111132, jsonValue: attenData}, { emulateJSON: true })

					.then( response => {
						console.log(response.body)
						if(response.body.state == "add_suc"){
							this.isatten = "取消关注";
							this.err = '关注成功';
							this.isShow = true;
							setTimeout( () => {
								this.isShow = false;
							},1000);
						}
				
						
					})
				}else if(this.isatten == "取消关注") {
					let attenData = JSON.stringify({

						id: this.attentionState,

						id: this.docRelationId,

					});
					console.log(attenData);

					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:111126, jsonValue: attenData}, { emulateJSON: true })

					.then( response => {
						console.log(response.body)
						if(response.body.state == "del_suc"){
							this.isatten = '+关注';
								this.err = '取关成功';
								this.isShow = true;
								setTimeout( () => {
									this.isShow = false;
								},1000);
						}
					})
				}
				
				
				
			},
			new_eva(){
				this.$router.push({
					path: "/serverDetail/serverEva",
					query:{exId:this.docRelationId}
				});
			},
			new_team(){
				this.$router.push({
					path: "/doctor/teamNum",
					query:{docRelationId:this.docRelationId,teamType:this.teamType,createUser:this.createUser,conTeamManagerId:this.conTeamManagerId}
				});
			},
			new_Num(){
				this.$router.push({
					path: "/doctor/consultingNum",
					query:{docRelationId:this.docRelationId,qIds:this.qIds}
				});
			},
			atten(){
				this.isB = false;
				this.isA = true;
				this.isH = false;
				this.isS = true;
				this.iniA = false;
				this.iniB = true;


			},
			attenT(){
				this.isB = true;
				this.isA = false;
				this.isH = true;
				this.isS = false;
				this.iniA = true;
				this.iniB = false;
				

			},
			serviceMoney(obj){
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				let isHaveItems= obj.isHaveItems;
				if(min == max){
					if(isHaveItems == '1'){
						return "<i>¥</i>" + min.toFixed(2) + "<em>+</em>";
					}else {
						return "<i>¥</i>" + min.toFixed(2);					
					}
				}else {
					return "<i>¥</i>" + min.toFixed(2) + "<em>+</em>";
				}
			},
			groupCou(){
				console.log(1);
				
				if(this.inA == true){
					this.inB = true;
					this.inA = false;
				}else{
					this.inB = false;
					this.inA = true;
				}
				
				console.log(this.userinfoId);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				
				if(userInfo == "" || userInfo == null){
					var token = "";
				}else{
					var token = userInfo.token;
				}

				var vm = this;
				let teamData = JSON.stringify({
					page: this.page,
					rows: this.rows,
					type:"2",
					qIds:this.qIds,
					docRelationId: this.docRelationId,
				
				});

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660221, jsonValue: teamData}, { emulateJSON: true })

				.then( response => {
					console.log(response)
					this.messages = response.body.rows;

//					this.teamPeoplo = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			
				
			
			},
			
			
			
			//简介
			allBtn() {
				if(this.isClamp){
					this.isClamp = false;
					this.allWord = "收起"
				}else if(!this.isClamp){
					this.isClamp = true;
					this.allWord = '查看全部简介'
				}
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
		},
		
		updated () {
			if(sessionStorage.getItem('key_head') == 1){
				this.margIsActice = false;
			}else {
				this.margIsActice = true;
			}
		},
		mounted() {
			if(sessionStorage.getItem('key_head') == 1){
				//没有头部下载
					this.margIsActice = false;
				}else {
				//有头部下载
					this.margIsActice = true;
				}
			this.initMsg();
			this.ini();
		},
		
		watch:{
			hasError:function(val){
				if(val == true){
					this.margIsActice = false;
				}
			}
		}
	}
</script>

<style>
	
	
	.teamMsgHeader{
		background: #fff;
		border-bottom: 1px solid #eee;
		position: relative;
		z-index: 1;
	}
	.teamMsgHeader h2{
		color: #fff;
	}
	.loads {
		background: #FFFFFF !important;
	}
	.seeSpan{
		position: absolute;
		top: 0;
		z-index: 2;
		right: 0.25rem;
		line-height: 0.84rem;
		color: #fff;
		font-size: 0.26rem;
	}
	
	
	/*团队列表*/
	.teamList{
		width: 94%;
		margin: 0 auto;
		font-size: 0.3rem;
		
	}
	.teamList li.teamListUl dl dt{
		width: 25%;
		float: left;
	}
	.teamList li.teamListUl dl{
		border-bottom: 1px solid #eee;
		padding-bottom: 0.25rem;
	}
	.titleLi, .eaNameLi, .peopleUl{
		font-size: 0.26rem;
	}
	.titleLi{
		
		margin-top: 0.15rem;
		color: #666;
	}
	.teamList li.teamListUl{
		margin-top: 0.25rem;
	}
	.teamList li.teamListUl dl dd{
		width: 75%;
		float: left;
	}
	.peopleUl{
		width: 20%;
		float: right;
	}
	.msgUL{
		width: 100%;
		float: left;
	}
	.BelongsSpan{
		border: 1px solid #009983;
		border-radius: 4px;
		padding: 0.05rem 0.1rem;
		-webkit-border-radius: 4px;
		color: #009983;
		
	}
	.BelongsSpan1{
		border: 1px solid #0098FE;
		border-radius: 4px;
		padding: 0.05rem 0.1rem;
		-webkit-border-radius: 4px;
		color: #0098FE;
		
	}
	.nameSpan{
		margin-left: .15rem;
		color: #666;
	}
	
	.positionSpan{
		color: #666;
	}
	.eaNameLi{
		margin-top: 0.15rem;
		color: #666;
	}
	
	
	.teamNameLi{
		color: #333;
	}
	.numP{
		color: #666;
	}
	
	.numSpan{
		color: #333;
		margin: 0 0.05rem 0 0.05rem;
	}
	.headerImg{
		width: 1.4rem;
		height: 1.4rem;
		/*overflow: hidden;*/
	}
	.headerImg img{
		width: 90%;
		height: 90%;
	}
	.serverBox1{
		color: #666;
		/*padding: 0.2rem 0 0.2rem 0;*/
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		-webkit-box-orient: vertical;
	}
	.allBtn{
		height: 0.84rem;
		width: 100%;
		border-top: 1px solid #eee;
		line-height: 0.84rem;
		text-align: center;
		color: #666;
	}
	.clamp{
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.appraisediv{
		width: 100%;
		height: 0.9rem;
		display: -webkit-box;
  		-webkit-box-orient: horizontal;
  		text-align: center;
  		line-height: 0.9rem;
  		font-size: 0.32rem;
	}
	.appraisediv div{
		width: 50%;
	}
	.actives{
		color: #439685;
		border-bottom: 0.04rem solid #439685;
	}
	.teamCountUl{
		width: 94%;
		margin: 0 auto;
		height: 1.4rem;
		padding-top: 0.2rem;
		font-size: 0.3rem;
		border-bottom: 1px solid #eee;
	}
	.teamCountUl li{
		width: 33.33%;
		float: left;
		text-align: center;
		
	}
	.teamCountUl li dd{
		color: #666;
		
	}
	.teamCountDiv{
		height: 2.3rem;
	}
	.appraiseUl li{
		float: left;
	}
	.appraiseUl{
		margin: 0 auto;
		width: 94%;
		height: 0.9rem;
	}
	.flowerLi img{
		vertical-align: middle;
		width: 22%;
		margin-right: 0.25rem;
	}
	.flowerLi{
		line-height:0.9rem ;
		font-size: 0.3rem;
		color: #666;
	}
	.appraiseli{
		line-height: 0.9rem;
		font-size: 0.3rem;
		color: #666;
		width: 60%;
	}
	.appraiseli i{
		float: right;
		position: relative;
		left: 0.2rem;
		z-index: -1;
	}
	.appraiseli img{
		vertical-align: middle;
		margin-left:0.1rem ;
		width: 8%;
		margin-top: -0.1rem;
	}
	.appraiseli img:first-of-type{
		margin-left: 0.25rem;
	}
	.rightLi img{
		width: 0.8rem;
		float: right;
		position: relative;
		left: 6.42rem;
		vertical-align: center;
		z-index: -1;
	}
	.rightLi{
		float: right !important;	
		position: absolute;
	}
	.teamPeopleUL{
		width: 94%;
		margin: 0 auto;
		height: 0.8rem;
		border-bottom: 1px solid #eee;
		clear: both;
	}
	.teamPeopleUL li{
		float: left;
		/*width: 50%;*/
		line-height: 0.8rem;
		color: rgb(102,102,102);
		font-size: 0.28rem;
	}
	.teamPeopleUL li:last-of-type span{
		color: #333;
		margin: 0 0.1rem 0 0.1rem;
	}
	/*.teamPeopleUL li:last-of-type{
		text-align: right;
	}*/
	.doctorDtimg{
		height: 1.28rem;
		width: 1.28rem;
		border-radius: 50px;
	}
	.doctorDl_list{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		height: 2.3rem;
 		font-size: .26rem;
 		border-bottom: 0.15rem solid #eee;
 		clear: both;
	}
	.doctorDl_list dd p{
		height: .38rem;
		line-height: .38rem;
		color: #999;
	}
	.doctorDl_list dd p:first-child{
		height: .38rem;
		line-height: .38rem;
		color: #666;
		margin-top: .3rem;
	}
	.doctorDdlist1{
		height: 1.3rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		color: red;
	}
	.doctorDl_list dt{
		height: 2.1rem;
		width: 2rem;
	}
	.doctorDl_list dd{
		height: 2.1rem;
		width: 70%;
	}
	.doctorDl_list dt img{
		margin-left: .3rem;
		margin-top: .3rem;
	}
	.doctorRight{
		display: block;
		float: right;
	}
	.doctorLastp{
		margin-top: .1rem;
	}
	/*已关注*/
	.isattention{
		width: 0.8rem;
		text-align: center;
		height: 0.3rem;
		display: inline-block;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		line-height: 0.3rem;
	}
	.isattention1{
		height: 0.3rem;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		padding: 0.0125rem 0.225rem;
		position: relative;
		top:-0.05rem;
		left: -0.2rem;
		z-index: 1;
		letter-spacing:1px;
	}
	.isattention2{
		/*height: 1rem;*/
		/*letter-spacing:1px;
		height: 0.3rem;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		padding: 0.0135rem 0.225rem;
		position: relative;
		left: -0.1rem;
		top:-0.05rem;
		z-index: 1;*/
	}
	
	.consulting{
		height: 0.84rem;
		background: #009983;
		width: 100%;
		position: fixed;
		bottom: 0;
		text-align: center;
		color: #fff;
		font-size: 0.32rem;
		line-height: 0.84rem;
		z-index: 9;
	}
	.docter_famliy{
		border: 1px solid green;
		border-radius: 4px;
		padding: -0.95rem 0.1rem;
		-webkit-border-radius: 4px;
		color: green;
	}
	.aa{
		color: #009983 !important;
	}
	.marTop{
		/*margin-top: 1.4rem;*/
	}
	.teamNumList{
		display: block;
	}
	.teamNumList1{
		display: none;
	}
	.groupTit{
		display: block;
		height: 0.9rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	.groupTit1{
		display: none;
		height: 0.9rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	.groupTit_text{
		margin-left: 0.3rem;
	}
	.groupTit_text span{
		color: #009983;
		font-size: 0.28rem;
	}
	.server-right{
		/*position: absolute;
		right: 0.3rem;
		width: 0.14rem;
		top: 0;*/
	}
	.groupTit_img{
		position: absolute;
		top: 0;
		right: 0.3rem;
		width: 0.14rem;
	}
	.groupTit_img img{
		width: 100%;
		height: 100%;
	}
	.Q-containerB{
		width: 100%;
		display: block;
	}
	.Q-containerN{
		width: 100%;
		display: none;
	}
	.Q-main{
		display: block;
		width: 100%;
	}
	.Q-date{
		color: #999;
		line-height: 0.5rem;
		height: 0.5rem;
		padding: 0.1rem 0.3rem;
	}
	.Q-date i{
		float: right;
		font-size: 0.24rem;
		color: #f59645;
	}
	.Q-doc-message{
		margin-top: 0.2rem;
		padding: 0 0.3rem;
	}
	.Q-doc-item{
		float: left;
		height: 0.7rem;
	}
	.Q-doc-photo{
		height: 0.7rem;
		width: 0.7rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.2rem;
	}
	.Q-doc-photo img{
		width: 100%;
		height: 100%;
	}
	.Q-docName{
		/*height: 0.4rem;*/
		line-height: 0.4rem;
		width: 5rem;
		color:#333;
		font-size: 0.24rem;
	}
	.Q-docTime{
		color: #999999;
		font-size: 0.2rem;
	}
	.Q-type-state{
		float: right;
	}
	.Q-type-state i{
		font-size: 0.24rem;
		color: #f59645;
		display: inline-block;
		height: 0.7rem;
		line-height: 0.7rem;
	}
	.Q-type-state .Q-state-suc{
		color: gray;
	}
	.Q-cont{
		width: 100%;
		line-height: 0.4rem;
		font-size: 0.24rem;
	    color: #666;
	    white-space: normal;
	    word-break: break-all;
	    border-bottom: 1px solid #eee;
	    padding: 0.1rem 0.3rem;
	    display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.Q-pay{
		color: #999;
		overflow: hidden;
		line-height: 0.6rem;
		padding: 0 0.3rem;
	}
	.Q-pay span{
		float: left;
		line-height: 0.6rem;
		width: 2rem;
		margin-top: 0;
	}
	.starBox{
		float: right;
		height: 0.6rem;
	}
	.starBox i{
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
	}
	.starBox i img{
		width: 100%;
		height: 100%;
	}
	.bot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #009983 ;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.36rem;
		color: #fff;
	}
	#blank{
		display: inline-block;
		width: 0.1rem;
	}
	.noConsult{
		position: absolute;
		top: 0.84rem;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	.loadingPage{
		z-index: 999999;
		background: #fff;
		top: 0.84rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	.gzh-addedHealth{
		width: 100%;
		display: block;
	}
	.gzh-addedHealthH{
		width: 100%;
		display: none;
	}
	.gzh-addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh-addedHealth li:last-child{
		border: 0 none;
	}
	.gzh-addedHealth li .listImg{
		width: 2rem;
		height: 2rem;
		float: left;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.gzh-addedHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
		text-decoration: none;
	}
	.gzh-addedHealth li .listContent_added{
		float: left;
		padding-left: 0.3rem;
		width: 70%;
		position: relative;
	}
	.listContent_added .server-posi{
		position: absolute;
		right: 0;
		top: 0.4rem;
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	}
	.listContent_added .server-posi img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.listContent_added .server-name{
		font-size: 0.28rem;
		color: #333;
	}
	.listContent_added .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source .server-point{
		color: #494949;
	}
	.listContent_added .server-method{
		margin-top: 0.02rem;
	}
	.server-method .server-way{
		float: left;
		color: #999;
	}
	.server-method .server-way img{
		width: 0.32rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	} 
	.server-method .server-time{
		float: left;
		color: #999;
	}
	.server-method .server-time img{
		width: 0.32rem;
		vertical-align: middle;
		margin-left: 0.15rem;
		margin-right: 0.08rem;
	}
	.listContent_added .server-price{
		margin-top: 0.08rem;
		color: #ff5454;
		font-size: 0.2rem;
	}
	.listContent_added .server-price span{
		font-size: 0.3rem;
		font-weight: bold;
		margin-left: 0.06rem;
	}
	.listContent_added .server-price i{
		font-style: normal;
		font-size: 0.2rem;
		margin-right: 0.06rem;
	}
	.listContent_added .server-price em{
		font-size: 0.24rem;
	}
	.listContent_added .server-buy{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-buy img{
		width: 0.4rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.listContent_added .server-appiont{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-appiont img{
		width: 0.38rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.hidePOne{
		display: inline-flex;
													width: 270px;
													overflow: hidden;
												    text-overflow: ellipsis;
												    white-space: nowrap;
	}
</style>