<template>
	<div>
		<heads :title="title" class="teamListHeader"></heads>
		<!--团队成员列表-->
		<div style="margin-top: 0.8rem">
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
									<p id="doctor_name_list" v-if="createUser != item.userId && conTeamManagerId != item.userId" >{{ item.name }}
										
										<!--<span>&nbsp;&nbsp;
											<i class="isattention" v-if="item.attentionId != '' && item.attentionId != null">已关注</i>
										</span>-->
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
									<span>{{ item.userCount }}</span>人
									<span class="doctorRight" v-if="item.serviceScore != '' && item.serviceScore != null && item.serviceScore != 0">
										<span>{{ item.serviceScore != '' && item.serviceScore != null && item.serviceScore != 0 ? item.serviceScore.toFixed(0) : '--' }}</span>
										%好评
									</span></p>
							</dd>
						</dl>
					</router-link>
					</div>
					<div style="height: 0.84rem; width: 1px;"></div>
				</div>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	export default {
		data() {
			return {
				docRelationId:this.$route.query.docRelationId,
				teamType:this.$route.query.teamType,
				title: "团队成员",
				teamPeoplo:"",
				docTypeName:"",
				teamNum:"",
				createUser: this.$route.query.createUser,
				conTeamManagerId:this.$route.query.conTeamManagerId,
			}
		},
		components:{
			heads,
		},
		methods:{
			initMsg(){
				
				console.log(this.userinfoId);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				
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
					console.log(response)
					this.cuerid = response.body.rows[0].userId;

					this.teamPeoplo = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
						console.log(this.cuerid);
						console.log(this.createUser);
				})
			
				
			},
		},
		mounted() {
			this.initMsg();
		},
	}
</script>

<style>
.teamListHeader{
		background: #fff;
		border-bottom: 1px solid #eee;
	}
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
		width: 85%;
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
	.headerImg img{
		width: 90%;
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
	.hidePOne{
		display: inline-flex;
													width: 270px;
													overflow: hidden;
												    text-overflow: ellipsis;
												    white-space: nowrap;
	}
</style>	