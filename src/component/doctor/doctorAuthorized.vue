<template>
	<div style="padding-top: 0.84rem;">
		<heads :title="title" class="header">
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
			<router-link :to=' {path: "/doctor/authorize", query: {docID: JSON.stringify(this.doctor_msg)}}' v-if="doctor_msg.contractTeamProtocolId != '1'"> 
				<p class="authorizedHead_right" @click="get_authorizationBtn()">{{ shCkoo }}</p>
			</router-link>
			<p v-if="doctor_msg.contractTeamProtocolId == '0'" class="authorizedHead_right" @click="changeX()">签发授权</p>
			
			<!--<p class="authorizedHead_right" v-else>修改授权</p>-->
		</heads>

		
		<div class="authorizedHead"></div>
		<Loading v-if="isLoading" class="load"></Loading>
			<dl class="doctorDl">
				<dt>
					<div><img v-bind:src="doctor_msg.photosmall" class="doctorDtimg"></div>
					<div class="guanzhu_box">
						<span class="guanzhu_li" @click="attention">{{ state }}</span>
						<!--<span class="guanzhu_li" @click="noAttention"  v-else>已关注</span>-->
					</div>
				</dt>
				<p class="distance_min" v-if="isLocation">{{ distance | getDistance }}<img src="../../assets/image/server/posi_icon.png"/></p>
				<dd>
					<!--<div class="doctorDdlist">-->
						<p class="myName">{{ doctor_msg.name }}</p>					
						<!--<p style="color: #999;" class="clampSearch1">{{ hospital.split(",")[0] }}</p>
						<p style="color: #999;"><span v-if=" this.department != ',,' && this.department != ','  && this.department != '' && this.department != ',,,,' ">{{ this.department.split(",")[0] }}&nbsp;</span>{{ proTitle.split(",")[0] }}<span @click="doctorRig" v-if=" hospital.split(',')[1] != '' && this.department.split(',')[1] != '' && proTitle.split(',')[1] != '' "><img src="../../assets/image/head-back-right.png" class="lssued_right1" style="vertical-align: middle;"></span></p>-->
					<!--</div>-->
					<div style="height: 1rem; 	 border-bottom: 1px solid #eee;">
						<p style="color: #999;">{{ hospital[0] }}</p>
						<p style="color: #999;"  class="myNameList">
							<span  v-if="department[0] != '' && department[0] != null">{{ department[0] }} &nbsp;&nbsp;</span>
							<span>{{ proTitle[0] }}</span>
							<span @click="doctorRig" v-if = "num > 	1"><img src="../../assets/image/head-back-right.png" class="lssued_right1" style="vertical-align: middle;"></span>
						</p>
					</div>
					
					<div v-if="isShow1" style="height: 1rem; border-bottom: 1px solid #eee;" v-for = "(x, index) in num">
						<p style="color: #999;">{{ hospital[index+1] }}</p>
						<p style="color: #999;" ><span v-if = "index < 0">{{ department[index+1] }} &nbsp;&nbsp;</span><span >{{ proTitle[index+1] }}</span></p>
					</div>
					
					<div class="assess_box">
<!--				<router-link :to="{path: '../doctor/doctorAuthorized' }">-->
					
				<!--</router-link>-->
				<ul>
					<li>
						<span >服务<span class="width_space"></span><span class="server_span">{{ doctor_cishu.serverUserCount }}</span>
						<span class="width_space"></span>人</span>
						<router-link :to='{path:"/doctor/evaluation" , query:{docRelationId: docUserid,type:"1"}}' class="star_span">
							<img src="../../assets/image/doctor/unShineStar.png" alt="" v-for="item in 5-starNum"/>
							<img src="../../assets/image/doctor/pingjiaxingxing.png" alt="" v-for="item in doctor_cishu.star"/>
						</router-link>
					</li>
					<li>
						<span>粉丝<span class="width_space"></span><span class="server_span">{{ doctor_cishu.attenCount }}</span>
						<span class="width_space"></span>人</span>
						<span class="star_span"><span class="width_space"></span><i>{{ doctor_cishu.commentCount }}</i><span class="width_space"></span>次评价</span>
					</li>
					
				</ul>
			</div>
				</dd>
			</dl>
			<div style="height: 1px;background:rgb(238, 238, 238) ; width: 94%;margin: 0 auto;" v-if="doctor_msg.docSpecialty != '' || doctor_msg.teamCount >= 1"></div>
			<!--<div style="height: 1px;background:rgb(238, 238, 238) ; width: 94%;margin: 0 auto;" v-if="doctor_msg.docSpecialty != '' || doctor_msg.teamCount >= 1"></div>
			border-top: 1px solid #eee;-->
			<!--<div style="height: 1rem; width: 75%; margin-left: 25%; border-bottom: 1px solid #eee;" v-if="isShow1">
				<p style="color: #999;">{{ hospital.split(",")[1] }}</p>
				<p style="color: #999;">{{ this.department.split(",")[1] }}&nbsp;&nbsp;<span>{{ proTitle.split(",")[1] }}</span></p>
			</div>
			<div style="height: 1rem; width: 75%; margin-left: 25%; border-bottom: 1px solid #eee;" v-if="isShow1">
				<p style="color: #999;">{{ hospital.split(",")[2] }}</p>
				<p style="color: #999;">{{ this.department.split(",")[2] }}<span>{{ proTitle.split(",")[2] }}</span></p>
			</div>-->
			
			
			<!--专家简介-->
			<div class="lssued_litte" @click="doctorMsg" v-if="doctor_msg.docSpecialty != ''">
				专家简介
				<img src="../../assets/image/head-back-right.png" class="lssued_right">
			</div>
			<dl class="doctorDl1" v-if="isShow5">
				<ul class="doc_ul" v-if="doctor_msg.docSpecialty!=''">
					<li class="doc_li_H">
						<!--<p class="doc_long">擅<span class="space_span"></span>长</p>-->
						<p class="doc_word2"  v-if="doctor_msg.docSpecialty == '' || doctor_msg.docSpecialty == null">无</p>
						<p class="doc_word2">{{ doctor_msg.docSpecialty }}</p>
					</li>
					<p style="height: 0.2rem;"></p>
					<li class="doc_li_H">
						<!--<p class="doc_long">简<span class="space_span"></span>介</p>-->
						<p class="doc_word2" v-if="doctor_msg.docResume == '' || doctor_msg.docResume == null" >无</p>
						<p class="doc_word2" >{{ doctor_msg.docResume }}</p>
					</li>
				</ul>
			</dl>
			<!--所属团队-->
			<!--<router-link :to=' {path: "/doctor/teamList", query:{ msg: doctor_msg.userId}}' v-if='doctor_msg.teamCount >= 1'>--> 
				<div style="height: 1px;background:rgb(238, 238, 238) ; width: 94%;margin: 0 auto;" v-if="doctor_msg.docSpecialty != '' && doctor_msg.teamCount >= 1"></div>
				<div class="lssued_litte2" style="" @click="doctorMsg1" v-if="doctor_msg.teamCount >= 1">
					所属团队
					<span style=" text-align: right;"><b style="position: relative;left: 0%;"><i>({{ doctor_msg.teamCount }}个团队)</i></b><img src="../../assets/image/head-back-right.png" class="lssued_right2"></span>
				</div>
			<!--</router-link>-->
			
			<div style="height: auto;" v-if="isShow6">
				<div style="height: 1px; background: rgb(238, 238, 238);"></div>
				<ul class="teamList" style=""  v-for="item in teamList">
					
					<!--医联体团队-->
					<router-link :to="{path:'/doctor/teamMsg', query:{teamId: item.docRelationId, type: 1, docType: item.docType, teamType: item.teamType, userinfoId: userinfoId }}">
						<li class="teamListUl" v-if="item.teamType == 1">
							<!--<div style="height: 0.2rem; width: 100%; background: #eee;"></div>-->
							<dl>
								<dt class="headerImg">
									<img v-bind:src=" item.circleThemeFile " alt="" v-if="item.circleThemeFile != ''"/>
									<img src="../../assets/image/DefaultAvatar.png" alt="" v-if="item.circleThemeFile == '' || item.circleThemeFile == null"/>
								</dt>
								<dd>
									<ul class="msgUL">
										<li class="teamNameLi">{{ item.circleName }}</li>
										<li class="titleLi"><span class="BelongsSpan1">医联体团队</span><span class="nameSpan">{{ item.name }}</span>（<span class="positionSpan">{{ item.docTypeName.split(',')[0] }}</span>）</li>
										<li class="eaNameLi">
											始于
											<span class="yearSpan">{{ item.createTime.split("-")[0] }}</span>
											年
											<span class="mouthSpan">{{ item.createTime.split("-")[1] }}</span>
											月
											<span>{{ item.createTime.split("-")[2].split("T")[0] }}</span>
											日
										</li>
									</ul>
									<ul class="peopleUl">
										<li><p class="numP">成员<span class="numSpan">{{ item.docCount }}</span>人</p></li>
									</ul>
								</dd>
							</dl>
							<!--<div class="serverBox">{{ item.circleRemark }}</div>-->
							<div class="line" style=""></div>
						</li>
					</router-link>
					
					<!--家庭医生团队-->
					<router-link :to="{path:'/doctor/teamMsg', query:{teamId: item.docRelationId, type: 2, docType: item.docType, teamType: item.teamType }}">
						<li class="teamListUl" v-if="item.teamType == 2">
							<dl >
								<dt class="headerImg">
									<img v-bind:src=" item.circleThemeFile " alt="" v-if="item.circleThemeFile != ''"/>
									<img src="../../assets/image/DefaultAvatar.png" alt="" v-if="item.circleThemeFile == '' || item.circleThemeFile == null"/>
								</dt>
								<dd>
									<ul class="msgUL">
										<li class="teamNameLi">{{ item.circleName }}</li>
										<li class="titleLi"><span class="BelongsSpan">家庭医生团队</span><span class="nameSpan">{{ item.conTeamManager }}</span>（<span class="positionSpan">队长</span>）</li>
										<li class="eaNameLi">{{ item.eaName }}</li>
									</ul>
									<ul class="peopleUl">
										<li><p class="numP">成员<span class="numSpan">{{ item.conTeamNum }}</span>人</p></li>
									</ul>
								</dd>
							</dl>
							<!--<div class="serverBox">服务区域：<span>{{ item.kilometerManage }}</span></div>-->
							<div class="line" style=""></div>
						</li>
					</router-link>
					
					
					
				
				</ul>
			</div>
			
			<div style="border-bottom: 5px solid #eee;"></div>
			
			<!--签约-->
			<!--<router-link :to='{path: "/doctor/signing", query:{familyContractTeamId: doctor_msg.familyContractTeamId, userId: doctor_msg.userId}}'>
				<div class="signing_box" v-if="isShowBtn">
					<img src="../../assets/image/doctor/sign_doctor1.png" alt="" />
					签约家庭医生
				</div>
			</router-link>-->
			<!--服务项目列表-->
			<div v-if="docServerList.length > 0">
				<div class="lssued_litteT">
					<div class="lssued_litteT_left">服务项目</div>
					<div class="lssued_litteT_right">共<span>{{ docServerList.length }}</span>项服务</div>
				
				</div>
			
			
			<!--医生服务列表-->
				<div class="server_list_H">
					<!--loading-->
					
					<Loading v-if="isLoading2" class="load_2"></Loading>
					<router-link  v-for="item in docServerList" :key="item.eaName" :to="{path: '../server/serverDetail', query:{id: item.serviceDictId, type: Number(item.serviceReservation), docuserId:docUserid,serviceId:item.serviceId,money:Number(item.serviceMoney).toFixed(2)}}">
					<a @click.stop="toDetail(item)">
					<dl class="lssuedDl">
						
						<dt :style="{backgroundImage:'url('+ imgIcon(item.imgUrl) +')'}">
							<!--<img v-bind:src="item.imgUrl">-->
						</dt>
						<dd class="lssuedDd" >
							<p class="lssuedDl_one">{{ item.serviceName }}</p>
							<p class="server_eaname_box">由<span class="server_eaname">{{ item.eaName }}</span>提供服务</p>
							<p class="server_mode">
								<span class="server_mode_icon">
									<img src="../../assets/image/doctor/server_method.png"/>
								</span>
								<span class="server_box">{{ item.serviceComponent == 'F003'?'电话服务': item.serviceWay }}</span>
								<span v-if="item.serviceTime != '' && item.serviceTime != null">
									<span class="server_mode_icon-2">
										<img src="../../assets/image/my/serviceTime.png"/>
									</span>
									<span class="server_box" >{{ item.serviceTime }}</span>分钟
								</span>
							</p>
							<p class="server_money_box">¥&nbsp;<span class="server_money" style="font-size: 0.32rem;">{{ item.serviceMoney.toFixed(2).split(".")[0] }}</span>.<span class="server_money">{{ item.serviceMoney.toFixed(2).split(".")[1] }}</span></p>
							
							<p @click.prevent="toConfirm(item,item.serviceDictId,item.serviceReservation,docUserid,item.serviceId,item.serviceMoney)" class="server-appiont" v-if="item.serviceReservation">预约<img src="../../assets/image/server/yuyuepic.png"/></p>
							<p @click.prevent="toConfirm(item,item.serviceDictId,item.serviceReservation,docUserid,item.serviceId,item.serviceMoney)" class="server-buy" v-else>购买<img src="../../assets/image/server/buy_icon.png"/></p>
						</dd>
						
					</dl>
					</a>
					</router-link>
				</div>
			</div>

			<err :message="err" v-if="isShow">{{ err }}</err>

			<div style="height: 0.89rem;"></div>
			<div class="doctorIntroduceSign" v-show="isBtnEsignShow" ><!--v-if="isShowBtn"-->
				<router-link :to='{path: "/doctor/doctorConsult",query:{ docuserId: doctor_msg.userId }}' >
					<div class="docConsult">咨询</div>
				</router-link>
				<!--<router-link :to='{path: "/login/main"}' >-->
				<div class="docSign" :class="{docSignActive:docSignActive}" v-if="prostate == '0'">等待签约</div><!--等待签约-->
				<!--</router-link>-->
				<router-link :to='{path: "/doctor/hasSinged", query:{familyContractTeamId: doctor_msg.familyContractTeamId, userId: doctor_msg.userId}}' v-else-if="prostate == '1'"><!--双方都签约-->
					<div class="hasSigned" >查看协议</div>
				</router-link>
				<router-link :to='{path: "/doctor/signing", query:{familyContractTeamId: doctor_msg.familyContractTeamId, userId: doctor_msg.userId}}' v-else><!--点击签约-->
					<div class="docSign">签约</div>
				</router-link>	
			</div>	
			<div  class="doctorIntroduceSign1" v-show="doctorIntroduceSign1">
				<router-link :to='{path: "/doctor/doctorConsult",query:{ docuserId: doctor_msg.userId }}' >
					<div class="docConsult1">咨询</div>
				</router-link>
			</div>
		
		<div id="iCenter"></div>
		<signMask v-on:sign-event="signEvent" v-if="isSign"></signMask>
		<wait-audit v-on:wait-event="waitEvent" v-if="isWait"></wait-audit>
		<team-sign v-on:team-event="teamEvent" v-if="isTeam"></team-sign>
	</div>
</template>

<script>
	import AMap from 'AMap'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import signMask from '../common/serviceSignTip.vue'
	import waitAudit from '../common/waitAudit.vue'
	import teamSign from '../common/teamSign.vue'
	import err from '../common/error-popup.vue'
	export default {
		props: {
//			title:String
		},
		data () {
			return {
				active:"",
				title: "专家介绍",
				state: '',
				//上一个页面带过来的信息
				docUserid: this.$route.query.docuserId,
				doc_distance: this.$route.query.doc_distance,
				isLoading: true,
				isSign: false,
				isWait: false,
				isTeam: false,
				isLoading2: true,
				isShow: false,
				isLocation: true,
				isShow1: false,
				isShow5: false,
				isShow6: false,
				signState: '',
				err : '',
				contractTeamProtocolId:'',
				doctor_cishu:'',
				doctor_msg: '',
				proTitle: '',
				signDate:'',
				lat: "",
				lon: "",
				hospital : '',
				starNum: '',
				department: '',
				distance:'',
				userinfoId:'',
				//该医生下的服务
				docServerList: "",
				//是否显示签约按钮
				isShowBtn: '',
				shCkoo: '',
				docSignActive:"",
				attentionId: '',
				teamList: '',
				prostate:"",
				doctorId: this.$route.query.docID,
				authorizationJSON: '',

				prostate:"",
				isBtnEsignShow: false,
				doctorIntroduceSign1: false,
				num : ''
			}
		},
		components:{
			Heads,
			Loading,
			err,
			signMask,
			waitAudit,
			teamSign
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
			
			headback: function(){
				active:true;
				this.$router.go(-1);
			},
			
					/*
					 * 660036 获取授权信息
					 */
					get_authorizationBtn(){
						let userinfo = JSON.parse(this.$cookie.get("userInfo"));
						if(userinfo == "" || userinfo == null){
//							var token = "";
//					
//	//						let token = "";
//							var data = JSON.stringify({
//								docId : this.docUserid,
//								"ignoreLogin" : "1" 
//							})
							return false;
						}else{
							var token = userinfo.token;
					
	//						let token = "";
							var data = JSON.stringify({
								docId : this.docUserid,
							})
							
							console.log(data)
						
						this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:660036,jsonValue: data},{emulateJSON: true}).then( response =>{
							

							console.log(response + '==========');
//							console.log(response.body.remark);

							

							if(response.body != "" && response.body != null){
								if(response.body.remark == null){
									this.shCkoo = '签发授权';
	//								$(".doctorIntroduceSign1").hide();
									this.doctorIntroduceSign1 = false;
	//								return false;
								}else{
									this.shCkoo = '修改授权';
	//								this.isBtnEsignShow = true;
									this.doctorIntroduceSign1 = true;	
	//								return false;
								}

							}

						})
					}
						
						
						
				},
					
				
					
			init (){
								
				let userinfo = JSON.parse(this.$cookie.get("userInfo"));
//				let token = userinfo.token;
				if(userinfo == "" || userinfo == null){
					var token = "";
					var data = JSON.stringify({
						userId : this.docUserid,
						lat:this.lat,
						lon:this.lon,
						"ignoreLogin" : "1" 
						
					})
				}else{
					var token = userinfo.token;
					var data = JSON.stringify({
						userId : this.docUserid,
						lat:this.lat,
						lon:this.lon
					})
					
				}
				console.log(data);
				/*
				 * 660102
				 专家星级、 评价
				 */
				console.log(this.doc_distance);

				if(this.doc_distance == "-1" || this.doc_distance == undefined){
					this.isLocation = false;
				}else{
					this.isLocation = true;
				}

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:660102,jsonValue: data},{emulateJSON: true}).then( response =>{
					console.log(response.body)
					if(response.body == null || response.body == undefined){
						this.isShow = true;
						this.err = "获取信息失败";
						setTimeout( () => {
							this.isShow = false;
							this.isLoading = false;
						}, 500)
						return ;
					}
					this.doctor_cishu = response.body;

					console.log(this.doctor_cishu.state);
					if(this.doctor_cishu.state == "err_userDoctor_001"){
						return false;
					}else{
						this.starNum = this.doctor_cishu.star;
					}
					

					
				})
				/*
				 * 660101
				 专家信息
				 */

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:660101,jsonValue: data},{emulateJSON: true}).then( response =>{
					console.log(response)
					
					
						
					if(response.body.returnState == 'err_userDoctor_001' || response.body == undefined){
						console.log(response.body)
						this.isShow = true;
						this.err = "获取信息失败";
						setTimeout( () => {
							this.isShow = false;
							this.isLoading = false;
						}, 500)
						return;
					}
					console.log(response.body)
					this.doctor_msg = response.body;
					this.userinfoId = this.doctor_msg.userId;
					this.doc = this.doctor_msg.rfqId;
					this.distance = this.doctor_msg.distance;
					console.log(this.distance);
					if(this.distance == "-1"){
						this.isLocation = false;
					}else{
						this.isLocation = true;
					}
					console.log(this.userinfoId);
					
					this.attentionId = this.doctor_msg.attentionId;
					this.contractTeamProtocolId = this.doctor_msg.contractTeamProtocolId;
					
					
					/*切割数据*/
					this.proTitle = this.doctor_msg.proTitle.split(",");
					this.hospital = this.doctor_msg.hospital.split(",");
					this.department = this.doctor_msg.department.split(",");
					if(this.proTitle.length <= this.department.length){
						this.num = this.department.length-1;
					}else{
						this.num = this.proTitle.length-1;
					}
					console.log(this.proTitle)
					console.log(this.department)
					if(this.doctor_msg.attentionId == '' || this.doctor_msg.attentionId ==  null){
						this.state = "+关注"
					}else{
						this.state = "已关注"
					}
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)

					console.log(this.doctor_msg.authorizeId);
					
					

					console.log(this.doctor_msg)
					console.log(this.doctor_msg.authorizeId)

					
					 
//判断是否为0，为零置灰,不能跳转	
					
//					console.log(vData)
					
					
					
					this.prostate = this.doctor_msg.prostate;
				    if (this.doctor_msg.prostate == "0"  ) {
				    	this.docSignActive = true;
//				    	this.isShowBtn = false;
				    }
				    
				    
//				    
//				    	console.log(this.doctor_msg.prostate)
//				    	console.log(1111)
//				    	 if (this.doctor_msg.contractTeamProtocolId != "" && this.doctor_msg.contractTeamProtocolId != null) {
//					        if (this.doctor_msg.contractTeamProtocolId == 0) {
//					         	return this.isShowBtn = true;
//					        } else	 {
//					            return this.isShowBtn = false;
//					        }
//					    }
//					    if ((this.doctor_msg.isproId == "" || this.doctor_msg.isproId == null)  && (this.doctor_msg.familyContractTeamId == "" || this.doctor_msg.familyContractTeamId == null )) {
//					       return this.isShowBtn = false;
//					    } else if (this.doctor_msg.isproId != "" && this.doctor_msg.isproId != null ) {
//					        return this.isShowBtn = false;
//					    } else {
//					        if (this.doctor_msg.prostate == 3 || (this.doctor_msg.prostate == null || this.doctor_msg.prostate == "")) {
//					            return this.isShowBtn = true;
//					        } else {
//					            return this.isShowBtn = false;
//					        }
//					    }
//	
				   
				    //
				    let msgDoc = this.doctor_msg;
				     this.isBtnEsignShow = false;
					if (msgDoc.contractTeamProtocolId == "0"
				        || msgDoc.contractTeamProtocolId == "1") {
				        this.isBtnEsignShow = true;
				        return false;
				    }
				    
				    if (msgDoc.isproId === '' && msgDoc.familyContractTeamId === '') {
				        this.isBtnEsignShow = false;
				    }else if (msgDoc.isproId != ''){
				       this.isBtnEsignShow = false;
				    }else{
				        
				        if (msgDoc.prostate == 3 ||   msgDoc.prostate === '' ) {
				            this.isBtnEsignShow = true;
				             return false;
				        }else{
				            
				            this.isBtnEsignShow = false;
				             return false;
				        }
				    }
				    
				    
				})
				
				
				/*
				   服务列表
				 111182 该专家下的服务列表
				 */
				let data_three = JSON.stringify({
					serviceUserId: this.docUserid,
					isDel:"1"
				})

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:111182,jsonValue: data_three},{emulateJSON: true}).then( response =>{

					console.log(response)
					this.docServerList = response.body.rows;
					this.signState = response.body.signState;
					setTimeout(() => {
		               this.isLoading2 = false;
		            }, 500)
					console.log(this.docServerList)
				})
				
				
				
			},
			getPositionq(){
//				获取定位信息
				let vm = this;
				var mapObj = new AMap.Map('iCenter');
				mapObj.plugin('AMap.Geolocation', function () {
				    var geolocation = new AMap.Geolocation({
				        enableHighAccuracy: true,//是否使用高精度定位，默认:true
				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				    });
				    mapObj.addControl(geolocation);
				    geolocation.getCurrentPosition();
				    AMap.event.addListener(geolocation, 'complete', function(res){
				    	console.log(res);
				    	vm.lat = res.position.lat;
						vm.lon = res.position.lng;
						let localInfo = JSON.stringify({
							lat : vm.lat,
							lon : vm.lon
						})
						window.localStorage.setItem("localInfo",localInfo);
						vm.init();
				    });//返回定位信息
				    AMap.event.addListener(geolocation, 'error', function(err){
				    	console.log(err)
				    	vm.init();
				    });      //返回定位出错信息
				});
			},
			doctorRig(){
				if(!this.isShow1){
					this.isShow1 = true;
					$(".lssued_right1").addClass("tranFrom");
				}else{
					this.isShow1 = false;
					$(".lssued_right1").removeClass("tranFrom");
				}
			},
			backToIndex(){
				 if(this.$route.query.doc_distance){
				 	this.$router.go(-1);
				 }else{
				 	this.$router.push({
						'path': '/doctor'
					})
				 }
			},
			signEvent(data){
				this.isSign = data;
			},
			waitEvent(data){
				this.isWait = data;
			},
			teamEvent(data) {
				this.isTeam = data;
			},
			doctorMsg(item){
//				this.isShow5 = true;
				if(!this.isShow5){
					this.isShow5 = true;
					$(".lssued_right").addClass("tranFrom");
				}else{
					this.isShow5 = false;
					$(".lssued_right").removeClass("tranFrom");
				}
			},
			changeX(){
				this.err = '已申请签发授权，请等待医生确认';
							this.isShow = true;
							setTimeout( () => {
								this.isShow = false;
							},1000);
			},
			doctorMsg1(){
				if(!this.isShow6){
					this.isShow6 = true;
					$(".lssued_right2").addClass("tranFrom");
				}else{
					this.isShow6 = false;
					$(".lssued_right2").removeClass("tranFrom");
				}
				
//				alert("团队介绍");
				console.log(this.userinfoId);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				console.log(userInfo);
//				let token = userInfo.token;
				let token = "";
				let teamListData = JSON.stringify({
					docId: this.userinfoId,
					page: this.page,
					rows: this.rows,
					"ignoreLogin" : "1" 
				});
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660220, jsonValue: teamListData}, { emulateJSON: true })
			
				.then( response => {
					console.log(response.body)
					this.teamList = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			//关注    111125关注医生    suc成功   err失败    取消关注
			attention () {		
				
				let userinfo = JSON.parse(this.$cookie.get('userInfo'));
				console.log(userinfo);
				if(userinfo == null){
//					alert(1);
						this.$router.push({path: '/login'});
						return false;
				}
				let num = this.doctor_cishu.attenCount;
				let token = userinfo.token;
//				let token = "";

				if(this.state == '+关注'){
//					alert(1);
					//被关注者主键
					let data = JSON.stringify({
						 attentionId: this.docUserid,
						 "ignoreLogin" : "1" 
					})
					console.log(data);

					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token: token,infoType: 111125, jsonValue: data},{emulateJSON: true}).then( response =>{
						console.log(JSON.parse(response.body.state))
						let state = JSON.parse(response.body.state).state;
						if(state == "add_suc" || state == "add_err"){
//							console.log(token);
							this.state = "已关注";
							this.err = '关注成功';
							this.isShow = true;
							this.doctor_cishu.attenCount = num +1;
							setTimeout( () => {
								this.isShow = false;
							},1000);
						}
					})
				}else{
					
					console.log(token)
					//被关注者主键
					let data2 = JSON.stringify({
						 id: this.attentionId,
					})

					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token: token,infoType: 111126, jsonValue: data2},{emulateJSON: true}).then( response =>{

					let state = response.body.state;
					console.log(state);
						if(state == "del_suc"){
							this.state = "+关注";
							this.err = '取关成功';
							this.isShow = true;
							setTimeout( () => {
								this.isShow = false;
							},1000);
							this.doctor_cishu.attenCount = num - 1;
							
						}
					})
					
				}
			},
			toDetail(item){
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				console.log(relationEaId);
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.marryInfo = "";
				this.$store.state.idCard = "";
				this.$store.state.itemsList = "";
				sessionStorage.setItem("server_relationEaId",relationEaId);
			},
			toConfirm(item,ids,types,docId,serId,moneys){
				const isSign = item.reservationValid;
				const signState = this.signState;
				console.log(signState);
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(!userInfo){//用户未登录
					this.$router.push({path: '/login'});
				}else {
					if(isSign.includes('yyyz6')){
						if(signState == '0') {//未签约
							this.isSign = true;
							return false;
						}
						if(signState == '1') {//未签约
							this.isTeam = true;
							return false;
						}
						if(signState == '3'){//等待审核
							this.isWait = true;
							return false;
						}
						
					}
				}
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				console.log(relationEaId);
				sessionStorage.setItem("server_relationEaId",relationEaId);
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.marryInfo = "";
				this.$store.state.idCard = "";
				this.$store.state.itemsList = "";
				window.localStorage.removeItem("passValue");
				let id = ids;
				let type = types?'1':'0';//1是预约，0是购买
				let docuserId = docId;
				let serviceId = serId;
				let money = Number(moneys).toFixed(2);
				console.log(id);
				console.log(type);
				console.log(docuserId);
				console.log(serviceId);
				console.log(money);
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type,docuserId:docuserId,serviceId:serviceId,money:money}})
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			}
		},
		mounted: function (){
			this.getPositionq();
			this.get_authorizationBtn();
		}
	}
</script>

<style>
	/*头部背景颜色*/
	.header{
		background:#009983 !important;
		border-bottom: 1px solid #eee !important;
	}
	.load{
		background: #fff !important;
		height: 100% !important;
		width: 100%;
		z-index: 1;
	}
	.load_2{
		height: 20% !important;
		position: fixed !important;
		top: 40% !important;
	}
	.header h2{
		color: #fff !important;
	}
	.doctorDtimg{
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		
	}
	.doctorDl{
		width: 94%;
		margin: 0 auto;
		/*height: 1.5rem;*/
	}
	.doctorDl dt{
		width: 25%;
		float: left;
		height: 100%;
		padding-top: 0.11rem;
		
	}
	.doctorDl dd{
		width: 75%;
		float: right;
		height: 100%;
		padding-top: 0.11rem;
		/*border-bottom: 1px solid #eee;*/
	}
	/*评价box*/
	.assess_box{
		/*width: 94%;*/
		margin: 0 auto;
		height: 1rem;
		/*border-bottom: 1px solid #eee;*/
	}
	.server_span{
		color: #333;
	}
	.star_span{
		float: right;
		display: inline-block;
		height: 100%;
	}
	.star_span img{
		width: 10%;
		float: right;
		margin-top: 2%;
		vertical-align: middle;
		margin-left: 2%;
	}
	.guanzhu_box{
		width: 25%;
		height: 100%;
		float: left;
		/*padding-top: 0rem;*/	
	}
	.assess_box ul{
		width: 100%;
		float: right;
		height: 100%;
	}
	.assess_box ul li{
		color: #999;
		height: 50%;
	}
	..assess_box ul li span{
		display: inline-block;
		line-height: 50%;
	}
	
	.guanzhu_li{
		width: 1.28rem;
		height: 0.4rem;
		text-align: center;
		line-height:0.4rem;
		color: #fff;
		background: #009983;
		border-radius: 10px;
		-webkit-border-radius: 10px;
		display: inline-block;
		
	}
	/*空格*/
	.width_space{
		width: 0.05rem; 
		display: inline-block;
	}
	.lssued_litteT{
		height: .9rem;
		line-height: .9rem;
		font-size: .28rem;
		color: #666;
		width: 94%;
		border-bottom: 1px solid #eee;
		margin-left: 3%;
	}
	.lssued_litteT_left{
		float: left;
	}
	.lssued_litteT_right{
		float: right;
	}
	.lssued_left{
		float: left;
		color: #666;
	}
	.lssued_right{
		float: right;
	}
	.lssued_right2{
		width: 10%;
		vertical-align: middle;
		float: right;
		position: relative;
		left: 0.2rem;
	}
	.lssued_right{
		width: 10%;
		vertical-align: middle;
		float: right;
		position: relative;
		left: 0.2rem;
	}
	.lssued_right1{
		float: right;
		width: 10%;
		vertical-align: middle;
		float: right;
		position: relative;
		left: 0.2rem;
	}
	.lssued_litte{
		height: .8rem;
		line-height: .8rem;
		font-size: .3rem;
		color: #666 !important;
		width: 94%;
		margin-left: 3%;
		/*border-bottom: 1px solid #eee;*/
	}
	.lssued_litte2{
		margin: 0 auto;
		height: .8rem;
		line-height: .8rem;
		font-size: .3rem;
		color: #666 !important;
		width: 94%;
	}
	.authorizedHead{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
		/*height: .9rem;*/
		font-size: .38rem;
		line-height: .9rem; 
		color: #8F8F94;
	}
	.authorizedHead_center{
		 -webkit-box-flex: 1;
		text-align: center;		
	}
	.authorizedHead_right{
		font-size: 0.3rem;
		color: #fff;
		position: absolute;
		right: 0.3rem;
		height: 100%;
		line-height: 0.84rem;
		
	}
	.authorizedHead_left img{
		width: 60%;
	}
	/*服务项目*/
	.lssuedDl{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		width: 94%;
 		margin-left: 3%;
 		margin-top: 3%;
 		padding-bottom: 0.2rem;
  		border-bottom: 1px solid #eee;  
	}
	.lssuedDl:last-of-type{
		border: none;
	}
	.lssuedDl dt{
		width: 2rem;
		height: 2rem;
		background-position: center;
		background-size: cover;
	}
	.lssuedDl dt img{
		width: 100%;
	}
	.lssuedDl_one{
		height: .6rem;
		line-height: .6rem;
		font-size: .3rem;
		color: #333;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.lssuedDd{
		margin-left: .3rem;
		position: relative;
		width: 67%;
	}
	.server_mode{
		width: 100%;
		font-size: 0.24rem;
		color: #999;
	}
	.server_mode_icon{
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
	}.server_mode_icon img{
		width: 100%;
		vertical-align: middle;
	}
	.server_mode_icon-2{
		display: inline-block;
		width: 0.35rem;
		height: 0.35rem;
	}
	.server_mode_icon-2 img{
		width: 100%;
		vertical-align: middle;
	}
	.server_box{
		/*padding-left: 0.15rem;*/
	}
	.server_money_box{
		font-size: 0.24rem;
		color: red;
		margin-top:0.1rem ;
	}
	.server_money{
		font-size: 0.3rem;
	}
	.server_eaname_box{
		font-size: 0.2rem;
		color: #999;
	}
	.server_eaname{
		color: #666;
	}
	.server-buy{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.server-buy img{
		width: 0.4rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.server-appiont{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.server-appiont img{
		width: 0.38rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}	
	
	/*签约*/
	.signing_box{
		background: #ff6d65;
		height: 0.7rem;
		color: #fff;
		line-height: 0.7rem;
		text-align: center;
	}
	.signing_box img{
		width: 5%;
		vertical-align: middle;
		margin-right: 0.1rem;
	}
	.doctorIntroduceSign{
		width: 100%;
		position: fixed;
		bottom: 0;
		clear: both;
		z-index: 999;
		
	}
	.doctorIntroduceSign1{
		width: 100%;
		position: fixed;
		z-index: 0;
		bottom: 0;
		clear: both;
	}
	.docConsult1{
		width: 100%;
		height: 0.89rem;
		line-height: 0.89rem;
		float: left;
		text-align: center;
		color: #fff;
		background: #277fbf;
	}
	.docConsult{
		width: 50%;
		height: 0.89rem;
		line-height: 0.89rem;
		float: left;
		text-align: center;
		color: #fff;
		background: #277fbf;
	}
	.docSign{
		width: 50%;
		height: 0.89rem;
		line-height: 0.89rem;
		float: right;
		text-align: center;
		color: #fff;
		background: #009983;
	}
	.docSignActive{
		background: #999999;
	}
	.otherDocAsk{
		background: #FF0000;
	}
	.hasSigned{
		width: 50%;
		height: 0.89rem;
		line-height: 0.89rem;
		float: right;
		text-align: center;
		color: #fff;
		background: #009983;
	}
	.clampSearch1{
		 overflow:hidden;
	    white-space:nowrap;
	    text-overflow:ellipsis;
	}
	/*
	 * 新  医生简介
	 */
	.doctorDl1{
		width: 94%;
		margin: 0 auto;
		/*height: 2.5rem;*/
		height: auto;
	}
	.doctorDl1 dt{
		width: 25%;
		float: left;
		height: 100%;
		padding-top: 0.11rem;
		
	}
	.doctorDl1 dd{
		width: 75%;
		float: right;
		height: 100%;
		padding-top: 0.11rem;
		/*border-bottom: 1px solid #eee;*/
	}
	
	.doctorDdlist_1{
		color: #333;
	}
	.doctorDtimg1{
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		
	}
	.tranFrom{
		transform:rotate(90deg);
	}
	/*
	 * 团队css
	 */
	/*团队列表*/
	.teamList{
		width: 94%;
		margin: 0 auto;
		font-size: 0.3rem;
	}
	/*.teamList li.teamListUl dl dt{
		width: 25%;
		float: left;
	}*/
	.teamList li.teamListUl dl{
		/*border-bottom: 1px solid #eee;*/
		padding-bottom: 0.25rem;
	}
	.titleLi, .eaNameLi, .peopleUl{
		font-size: 0.28rem;
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
		width: 90%;
		margin-left: 5%;
		float: left;
	}
	.BelongsSpan{
		border: 1px solid #009983;
		border-radius: 4px;
		padding:  -0.95rem 0.1rem;
		-webkit-border-radius: 4px;
		color: #009983;
		
	}
	.BelongsSpan1{
		border: 1px solid #0098FE;
		border-radius: 4px;
		padding: -0.95rem 0.1rem;
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
		width: 1.2rem;
		/*margin-right: 1rem;*/
		color: #666;
	}
	
	.numSpan{
		color: #333;
		margin: 0 0.05rem 0 0.05rem;
	}
	.headerImg img{
		height: 100%;
		width: 100%;
		
	}
	.teamList li.teamListUl dl dt{
		width: 1.5rem;
		height: 1.5rem;
		float: left;
	}
	/*li.teamListUl:last-of-type .line{
		border: 0px !important;
	}*/
	.teamListUl .line{
		border-bottom:5px solid #eee; 
		width: 107%; 
		margin-left: -3.2%;
	}
	.serverBox{
		color: #666;
		padding: 0.2rem 0 0 0;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}	
	/*
	 * 新 简介 样式
	 */
	.doc_ul{
		width: 94%;
		margin: 0 auto;
		
	}
	.doc_long{
		color: #333;
		margin-top:0.2rem ;
		
	}
	.doc_word2{
		color: #999;
		padding-top: 0.1rem;
	}
	.space_span{
		display: inline-block;
		width: 0.25rem;
		
	}
	.clampSearch2{
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis
	}
	/*
	 * 详情 距离
	 */
	.distance_min{
		position: absolute;
	 	z-index: 1;
	 	right: 0.3rem;
	 	margin-top: 0.3rem;
	 	font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	}
	 .distance_min img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.myName{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    width: 80%;
	}
	.myNameList{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
</style>