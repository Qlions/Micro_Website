<template>
	<div>
		<heads :title="title" class="teamListHeader"></heads>
		<!--专家团队列表-->
		<Loading v-if="isLoading"></Loading>
		<div>
		<scroller style="width:100%;margin:0 auto;background: #fff;position: fixed;top: 0.84rem;"
					:on-refresh="refreshs"
					:on-infinite="infinites"
					v-if='isLoading == false'
					>	
				<ul class="teamList" style=""  v-for="item in teamList">
					
					<!--医联体团队-->
					<router-link :to="{path:'/doctor/teamMsg', query:{teamId: item.docRelationId, type: 1, docType: item.docType, teamType: item.teamType }}">
						<li class="teamListUl" v-if="item.teamType == 1">
							<dl style="border-bottom: 1px solid #eee;">
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
							<div class="serverBox">{{ item.circleRemark }}</div>
							<div style="height: 0.2rem; width: 107%; background: #eee;margin-left: -3.2%;"></div>
						</li>
					</router-link>
					
					<!--家庭医生团队-->
					<router-link :to="{path:'/doctor/teamMsg', query:{teamId: item.docRelationId, type: 2, docType: item.docType, teamType: item.teamType }}">
						<li class="teamListUl" v-if="item.teamType == 2">
							<dl style="border-bottom: 1px solid #eee;">
								<dt class="headerImg">
									<img v-bind:src=" item.circleThemeFile " alt="" v-if="item.circleThemeFile != ''"/>
									<img src="../../assets/image/DefaultAvatar.png" alt="" v-if="item.circleThemeFile == '' || item.circleThemeFile == null"/>
								</dt>
								<dd>
									<ul class="msgUL">
										<li class="teamNameLi">{{ item.circleName }}</li>
										<li class="titleLi"><span class="BelongsSpan">家庭医生团队</span><span class="nameSpan">{{ item.conTeamManager }}</span>（<span class="positionSpan" v-if="item.docTypeName == ''">队长</span>）</li>
										<li class="eaNameLi">{{ item.eaName }}</li>
									</ul>
									<ul class="peopleUl">
										<li><p class="numP">成员<span class="numSpan">{{ item.conTeamNum }}</span>人</p></li>
									</ul>
								</dd>
							</dl>
							<div class="serverBox">服务区域：<span>{{ item.kilometerManage }}</span></div>
							<div style="height: 0.2rem; width: 107%; background: #eee;margin-left: -3.2%;"></div>
						</li>
					</router-link>
					
					
					
				
				</ul>
			</scroller>	
		</div>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	import Loading from '../common/loading.vue'
	export default {
		data() {
			return {
				title: "所属团队",
				teamDocId: this.$route.query.msg,
				isLoading: true,
				page: 1,
				rows: 8,
				teamList: ''
			}
		},
		components:{
			heads,
			Loading
		},
		methods:{
			init(){
				console.log(this.teamDocId)
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				console.log(userInfo);
				let token = userInfo.token;
				let teamListData = JSON.stringify({
					docId: this.teamDocId,
					page: this.page,
					rows: this.rows,
				});
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660220, jsonValue: teamListData}, { emulateJSON: true })

				.then( response => {
					console.log(response.body.rows)
					this.teamList = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			
			//下拉
			refreshs (done) {
				setTimeout(() => {
					this.rows = 8;
					this.init();
					done();
				}, 1000)
			},
			infinites (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let teamListData = JSON.stringify({
					docId: this.teamDocId,
					page:this.page,
					rows:this.rows+8
				});

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660220, jsonValue: teamListData}, { emulateJSON: true })

				.then( response => {
					console.log(response)
					
			      	if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						done();					
					}, 1500)
					this.rows+=8
				})
				
			},
		},
		mounted() {
			this.init();
		}
	}
</script>

<style>
	/*头部*/
	.teamListHeader{
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	.teamListHeader h2{
		color:#009983 !important;
	}
	
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
		width: 90%;
		margin-left: 5%;
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
		height: 100%;
		width: 100%;
		
	}
	.teamList li.teamListUl dl dt{
		width: 1.5rem;
		height: 1.5rem;
		float: left;
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
</style>	