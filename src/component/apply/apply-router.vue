<template>
	<section id="apply-router">
		<backBtn :title='applyTitle' :eid='eid'></backBtn>
		<div class="apply-mian">
			<!-- 健康服务 -->
			<div class="gzh-applist gzh-appbot clear">
				<ul>
					<li v-for='val in questionnaire' v-if="isClass == true" @click="show">
						<router-link :to="{ name: val.routerName, query: {
							id: val.uid,
							title: val.title,
							typeData: val.typeData,
							flag:val.flag
							}}">
							<i :class="val.class"></i>
							<div class="gzh-applist-right">
								<h2>{{ val.itemName }}</h2>
								<p>{{ val.itemTxt }}</p>
							</div>
							
						</router-link>
					</li>
					<li v-for='val in questionnaire' v-if="isClass == false">
						<router-link :to="{ name: val.routerName, query: {
							id: val.uid,
							title: val.title,
							typeData: val.typeData,
							flag:val.flag
							}}">
							<i :class="val.class"></i>
							<div class="gzh-applist-right">
								<h2>{{ val.itemName }}</h2>
								<p>{{ val.itemTxt }}</p>
							</div>
						</router-link>
					</li>
				</ul>
				<ul>
					<li v-for='val in healthySever'>
						<router-link :to="{ name: val.routerName, query: {
							id: val.uid,
							title: val.title,
							typeData: val.typeData,
							flag:val.flag
							}}">
							<i :class="val.class"></i>
							<div class="gzh-applist-right">
								<h2>{{ val.itemName }}</h2>
								<p>{{ val.itemTxt }}</p>
								<span v-if="val.judges" v-show="unReadNum > 0"></span>
							</div>							
						</router-link>
					</li>
				</ul>
			</div>
			<!-- 健康监测 -->
			<!-- <div class="gzh-applist clear" id="aaa">
				<h2>健康监测</h2>
				<ul>
					<li v-for='val in healthMonitoring'>
						<router-link :to="{ name: val.routerName, query: {
							id: val.uid, 
							typeData:val.typeData, 
							title:val.title,
							dicCode:val.dicCode,
							dataType:val.dataType 
							}}">
							<i :class="val.class"></i>
							<b>{{ val.itemName }}</b>
						</router-link>
					</li>
				</ul>	
			</div> -->
			<!--
			第三方
			<div class="gzh-applist clear">
				<h2>第三方服务</h2>
				<ul>
					<li v-for='val in threeServer'>
						<router-link :to="{ name: 'applyContent', query: {id: val.uid}}">
							<i :class="val.class"></i>
							<b>{{ val.name }}</b>
						</router-link>
					</li>
				</ul>	
			</div> -->
		</div>
		<!--  认证身份证弹出框  -->
		<div class="binding-model" v-if="isHide" id="footTalk">
			<div class="binding-model-content">
				<i @click="hide()"><img src="../../assets/image/closePro.png" alt=""></i>
				<h2 class="binding-model-content-title">
					实名认证
				</h2>
				<div class="binding-model-content-prompt">
					<p>以下信息是您在健康管理过程中的重要参数</p>
					<p>请务必正确填写，写入后不可修改</p>
				</div>
				<div class="binding-model-content-form">
					<ul>
						<li>
							<input type="text" placeholder="真实姓名" @focus="focus" @blur="blur" v-model="name">
						</li>
						<li>
							<input type="text" placeholder="身份证号" @focus="focus" @blur="blur" v-model="id">
						</li>
					</ul>
					<a href="javascript:void(0)" @click="binding">确认提交</a>
				</div>
			</div>
		</div>
		<MinErrorPopup :message="message" v-if="showUp"></MinErrorPopup>
	</section>
</template>
<script>
	import backBtn from '../apply/apply-head.vue'
	import MinErrorPopup from '../common/error-min-popup.vue'
	export default{
		data () {
			return {
				eid:"", //判断返回按钮
				applyTitle:"健康全管理",
				isClass:'',
				judges:'',
				isHide:false,
				message:"",
				showUp:false,
				name:"",
				id:"",
				unReadNum:"", // 健康技术判断消息信息
				questionnaire:[
					{ 
						itemName:"慢病风险评估", 
						routerName:"healthy", 
						class:"appicon1", 
						uid:111405,
						flag:300018, 
						title:'healthy',
						itemTxt:"科学评估您患慢性病的风险"
					},
					{ 
						itemName:"中医体质辨识", 
						routerName:"medicine", 
						class:"appicon2", 
						uid:300028, 
						flag:300020,
						title:'medicine',
						itemTxt:"通过中医方法评估您的体质" 
					},
					{ 
						itemName:"A性格评估", 
						routerName:"character", 
						class:"appicon3", 
						uid:111503,
						flag:300021,
						typeData:5, 
						title:'character',
						itemTxt:"为您出具详细的评估报告" 
					},
					{ 
						itemName:"PSTIR压力评估", 
						routerName:"pressure", 
						class:"appicon4", 
						uid:111503,
						flag:300021,
						typeData:6, 
						title:'pressure',
						itemTxt:"为您出具详细的心里压力评估报告" 
					}
				],
				healthySever: [
					{ 
						itemName:"健康档案",
						routerName:"healthyRecords",
						class:'appicon9',
						uid:500003, 
						title:'archives',
						itemTxt:"查阅医生为您建立的健康档案"
					},
					{ 
						itemName:"体检档案",
						routerName:"healthyPhysical",
						class:'physical',
						uid: 500010, 
						title:'physical',
						itemTxt:"医生建立和自己上传的相关体检和医疗检查档案"
					},	
					{ 
						itemName:"用药记录",
						routerName:"healthyMedication",
						class:'appicon10',
						uid:510004, 
						title:'medication',
						itemTxt:"详细记录自己的日常用药情况"
					},
					{ 
						itemName:"病历记录",
						routerName:"healthyCase",
						class:'appicon11',
						uid:530000, 
						title:'case',
						itemTxt:"医生建立或自行上传的病例记录"
					},
					{ 
						itemName:"住院病史",
						routerName:"healthyHospitalization",
						class:'appicon12',
						uid:520004, 
						title:'chil',
						itemTxt:"医生建立和自己创建的相关病史"
					},
					{ 
						itemName:"健康计划",
						routerName:"healthyPlan",
						class:'appicon13',
						uid:540002, 
						title:'plan',
						judges:true,
						itemTxt:"专业人员为您制定的个性化健康计划"
					},
					{ 
						itemName:"健康处方",
						routerName:"healthyPrescription",
						class:'appicon14',
						uid: 300011, 
						title:'prescription',
						itemTxt:"专业人员为您制定的个性化健康改善处方"
					}
				],
				/*healthMonitoring: [
					{ 
						itemName:"体重", 
						routerName:"chartContent", 
						class:"appicon15", 
						uid:111612, 
						title:'weight',
						dataType:'1',
						dicCode:"10003" 
					},
					{ 
						itemName:'体重指数',
						class:'appicon16',
						routerName:"chartContent",
						title:'weightIndex',
						uid:111612,
						dataType:'1',
						dicCode:"10004, 10001, 10003"
					},
					{ 
						itemName:'腰围',
						class:'appicon17',
						routerName:"chartContent",
						title:'theWaist',
						uid:111612,
						dataType:'1',
						dicCode:"10010" 
					},
					{ 
						itemName:'脉搏',
						class:'appicon18',
						routerName:"chartContent",
						title:'pulse',
						uid:111612,
						dataType:'2',
						dicCode:"10013" 
					},
					{ 
						itemName:'心电图',
						routerName:"chartContent",
						class:'appicon19',
						title:'electrocardiogram',
						uid:111612,
						dataType:'5',
						dicCode:"10244"
					},
					{ 
						itemName:'体温',
						routerName:"chartContent",
						class:'appicon20',
						title:'temperature',
						uid:111612,
						dataType:'1',
						dicCode:"10002"
					},
					{ 
						itemName:'血压',
						routerName:"chartContent",
						class:'appicon21',
						title:'bloodPressure',
						uid:111612,
						dataType:'1',
						dicCode:"10018,10023"
					},
					{ 
						itemName:'血糖',
						routerName:"chartContent",
						class:'appicon22',
						title:'bloodsugar',
						uid:111612,
						dataType:'1',
						dicCode:"10144,10145,10142"
					},
					{ 
						itemName:'甘油三酯',
						routerName:"chartContent",
						class:'appicon23',
						title:'triglyceride',
						uid:111612,
						dataType:'1',
						dicCode:"10147"
					},
					{ 
						itemName:'LDL-C',
						routerName:"chartContent",
						class:'appicon24',
						title:"LDLC",
						uid:111612,
						dataType:'1',
						dicCode:"10148"
					},
					{ 
						itemName:'HDL-C',
						routerName:"chartContent",
						class:'appicon25',
						title:"HDLC",
						uid:111612,
						dataType:'1',
						dicCode:"10149"
					},
					{ 
						itemName:'总胆固醇',
						routerName:"chartContent",
						class:'appicon26',
						title:"totalCholesterol",
						uid:111612,
						dataType:'1',
						dicCode:"10151" 
					},
					{ 
						itemName:'膳食',
						routerName:"chartContent",
						class:'appicon27',
						title:"diet",
						uid:111612,
						dataType:'3',
						dicCode:"10769" 
					},
					{ 
						itemName:'饮酒',
						routerName:"chartContent",
						class:'appicon28',
						title:"drinkWine",
						uid:111612,
						dataType:'1',
						dicCode:"10767,10768"
					},
					{ 
						itemName:'吸烟',
						routerName:"chartContent",
						class:'appicon29',
						title:'smoke',
						uid:111612,
						dataType:'1',
						dicCode:"10766"

					},
					{ 
						itemName:'运动',
						routerName:"chartContent",
						class:'appicon30',
						title:'motion',
						uid:111612,
						dataType:'4',
						dicCode:"10770"
					}
				],*/
				/*threeServer: [
					{ 'name':'健康尚品','class':'appicon31',uid:12313123 }
				]*/
			}
		},
		components: {
			backBtn,
			MinErrorPopup
		},
		mounted () {
			if(this.$route.query.eaId){
				this.eid = false;
				sessionStorage.setItem('eid',this.$route.query.eaId);
			}
			this.getjudge();
			this.judge();
			this.isHealthyApp();
		},
		methods:{
			clearStorage () { //清楚定时器
				let time = setTimeout(()=>{
					if( this.showUp ==  true){
                		this.showUp = false;
                	} 
                },2000);  
			},
			show () {
				this.isHide = true;
			},
			hide () {
				this.isHide = false;
			},
			binding () {
				let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				if( this.name == "" ){
					this.showUp = true;
					this.message = "请输入真实姓名";
					this.clearStorage();
				}else if( this.id == ""){
					this.showUp = true;
					this.message = "请输入身份证号";
					this.clearStorage();
				}else if( reg.test(this.id) == false ){
					this.showUp = true;
					this.message = "正确输入身份证号";
					this.clearStorage();
				}else {
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = userInfo.userId;
					let data = JSON.stringify({
							userId : userId,
							name : this.name,
							certNo : this.id
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660208, jsonValue:data},{emulateJSON:true}).then( response => {
						if(response.body.state == 'certficationd_suc'){
							this.showUp = true;
							this.message = "身份证认证成功";
							this.clearStorage();
							let time = setTimeout(()=>{	
								this.isHide = false; 	
								this.getjudge();
			                },1500);
						}else if(response.body.state == 'certficationd_illegal'){
							this.showUp = true;
							this.message = "身份证输入不合法";
							this.clearStorage();
						}else if(response.body.state == 'certficationd_repeat'){
							this.showUp = true;
							this.message = "身份证已存在";
							this.clearStorage();
						}else{
							this.showUp = true;
							this.message = "认证失败";
							this.clearStorage();
						}
					})
				}
			},
			getjudge () {
				if(this.$cookie.get('userInfo')){
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let data = JSON.stringify({
						"userName": userInfo.userName
					})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:userInfo.token,infoType:600039,jsonValue:data},{emulateJSON:true}).then( response => {
						let data = response.body.state;
						this.$cookie.set('userInfoNew', data, { expires: '2h' });
						let arr = JSON.parse(data);
						let gender = arr[0].gender; // 性别
						let birthDate = arr[0].birthDate; // 性别
						if( birthDate == "" || gender == 0 ){
							this.isClass = true;
							this.questionnaire = [
								{ 
									itemName:"慢病风险评估", 
									class:"appicon1", 
									itemTxt:"科学评估您患慢性病的风险"
								},
								{ 
									itemName:"中医体质辨识", 
									class:"appicon2", 
									itemTxt:"通过中医方法评估您的体质" 
								},
								{ 
									itemName:"A性格评估", 
									class:"appicon3", 
									itemTxt:"为您出具详细的评估报告" 
								},
								{ 
									itemName:"PSTIR压力评估",  
									class:"appicon4", 
									itemTxt:"为您出具详细的心里压力评估报告" 
								}
							],
							this.healthySever = [
								{ 
									itemName:"健康档案",
									routerName:"healthyRecords",
									class:'appicon9',
									uid:500003, 
									title:'archives',
									itemTxt:"查阅医生为您建立的健康档案"
								},
								{ 
									itemName:"体检档案",
									routerName:"healthyPhysical",
									class:'physical',
									uid: 500010, 
									title:'physical',
									itemTxt:"医生建立和自己上传的相关体检和医疗检查档案"
								},	
								{ 
									itemName:"用药记录",
									routerName:"healthyMedication",
									class:'appicon10',
									uid:510004, 
									title:'medication',
									itemTxt:"详细记录自己的日常用药情况"
								},
								{ 
									itemName:"病历记录",
									routerName:"healthyCase",
									class:'appicon11',
									uid:530000, 
									title:'case',
									itemTxt:"医生建立或自行上传的病例记录"
								},
								{ 
									itemName:"住院病史",
									routerName:"healthyHospitalization",
									class:'appicon12',
									uid:520004, 
									title:'chil',
									itemTxt:"医生建立和自己创建的相关病史"
								},
								{ 
									itemName:"健康计划",
									routerName:"healthyPlan",
									class:'appicon13',
									uid:540002, 
									title:'plan',
									judges:true,
									itemTxt:"专业人员为您制定的个性化健康计划"
								},
								{ 
									itemName:"健康处方",
									routerName:"healthyPrescription",
									class:'appicon14',
									uid: 300011, 
									title:'prescription',
									itemTxt:"专业人员为您制定的个性化健康改善处方"
								}
								
							]
						}else {
							this.isClass = false;
							this.questionnaire = [
								{ 
									itemName:"慢病风险评估", 
									routerName:"healthy", 
									class:"appicon1", 
									uid:111405,
									flag:300018, 
									title:'healthy',
									itemTxt:"科学评估您患慢性病的风险"
								},
								{ 
									itemName:"中医体质辨识", 
									routerName:"medicine", 
									class:"appicon2", 
									uid:300028, 
									flag:300020,
									title:'medicine',
									itemTxt:"通过中医方法评估您的体质" 
								},
								{ 
									itemName:"A性格评估", 
									routerName:"character", 
									class:"appicon3", 
									uid:111503,
									flag:300021,
									typeData:5, 
									title:'character',
									itemTxt:"为您出具详细的评估报告" 
								},
								{ 
									itemName:"PSTIR压力评估", 
									routerName:"pressure", 
									class:"appicon4", 
									uid:111503,
									flag:300021,
									typeData:6, 
									title:'pressure',
									itemTxt:"为您出具详细的心里压力评估报告" 
								}
							],
							this.healthySever = [
								{ 
									itemName:"健康档案",
									routerName:"healthyRecords",
									class:'appicon9',
									uid:500003, 
									title:'archives',
									itemTxt:"查阅医生为您建立的健康档案"
								},
								{ 
									itemName:"体检档案",
									routerName:"healthyPhysical",
									class:'physical',
									uid: 500010, 
									title:'physical',
									itemTxt:"医生建立和自己上传的相关体检和医疗检查档案"
								},	
								{ 
									itemName:"用药记录",
									routerName:"healthyMedication",
									class:'appicon10',
									uid:510004, 
									title:'medication',
									itemTxt:"详细记录自己的日常用药情况"
								},
								{ 
									itemName:"病历记录",
									routerName:"healthyCase",
									class:'appicon11',
									uid:530000, 
									title:'case',
									itemTxt:"医生建立或自行上传的病例记录"
								},
								{ 
									itemName:"住院病史",
									routerName:"healthyHospitalization",
									class:'appicon12',
									uid:520004, 
									title:'chil',
									itemTxt:"医生建立和自己创建的相关病史"
								},
								{ 
									itemName:"健康计划",
									routerName:"healthyPlan",
									class:'appicon13',
									uid:540002, 
									title:'plan',
									judges:true,
									itemTxt:"专业人员为您制定的个性化健康计划"
								},
								{ 
									itemName:"健康处方",
									routerName:"healthyPrescription",
									class:'appicon14',
									uid: 300011, 
									title:'prescription',
									itemTxt:"专业人员为您制定的个性化健康改善处方"
								}
							]
						}
					})
				}	
			},
			focus(){//input获取焦点后的处理
				let that = this;
				setTimeout(function(){
					let focus = document.getElementById("footTalk");
//					let focus = that.$refs.footTalk
					/*focus.scrollIntoView(true);
					focus.scrollIntoViewIfNeeded();
					document.body.scrollTop = document.body.scrollHeight;*/
				},200)
			},
			blur () {
				let footer = document.getElementById("footer");
				footer.style.display="block"
			},
			// 判断健康计划是否有消息
			judge () {
				if(this.$cookie.get('userInfo')){
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = userInfo.userId;
					let data = JSON.stringify({
							userId : userId
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:540000, jsonValue:data},{emulateJSON:true}).then( response => {
						this.unReadNum = response.body.unReadNum;
					})
				}
				
			},	
			isHealthyApp(){//微网站直接进入健康应用页的后退跳转问题
					let ojj = {'flag':4}
					ojj = JSON.stringify(ojj);
					localStorage.setItem("temp", ojj);
			}
		}
	}
</script>
<style>
	.apply-mian {
		padding-top: .84rem;
	}
	.gzh-applist {
	    width: 100%;
	    margin: 0 auto;
	    padding: 0 .2rem;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.gzh-applist-right {
		float: left;
		margin-left: 0.2rem;

	}
	.gzh-applist-right h2 {
	   	color: #333;
	   	font-size: 14px;
	}
	.gzh-applist-right p {
	   	color: #999;
	   	font-size: 12px;
	}
	.gzh-applist li {
		position: relative;
	    display: block;
	    padding: .2rem 0;
	    border-bottom: 1px solid #e6e6e6;
	}
	.gzh-applist ul li span {
		display: block;
		width: .16rem;
		height: .16rem;
		background: red;
		border-radius: .16rem;
		position: absolute;
		right: 0.3rem;
		top: 0;
	}
	.gzh-applist a {
		display: inline-block;
		height: 100%;
		width: 100%;
		font-size: 0.26rem;
		color: #333;
	}
	.gzh-applist a i {
		width: .84rem;
		height: .75rem;
		display: block;
		float: left;
	}
	.gzh-applist a b {
	    padding: 0.02rem 0;
	    font-size: .28rem;
	    color: #333;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    margin-top: 0.2rem;
	}
	.gzh-applist .appicon1 {
		background: url(../../assets/image/index_img/b.png) no-repeat;
		background-size: contain;
	}
	.gzh-applist .appicon2 {
	    background: url(../../assets/image/index_img/zhongyao.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon3 {
	    background: url(../../assets/image/index_img/xingge.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon4 {
	    background: url(../../assets/image/index_img/d.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon5 {
	    background: url(../../assets/image/index_img/a.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon6 {
	    background-position: -.62rem 0;
	}
	.gzh-applist .appicon9 {
	    background: url(../../assets/image/index_img/a.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon10 {
	    background: url(../../assets/image/index_img/g.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon11 {
	    background: url(../../assets/image/index_img/bingli.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon12 {
		background: url(../../assets/image/index_img/f.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon13 {
	    background: url(../../assets/image/index_img/c.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon14 {
	   background: url(../../assets/image/index_img/chufang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .physical {
	   background: url(../../assets/image/index_img/tijian.png) no-repeat;
		background-size: contain;
		background-position: center;
	} 
	.gzh-applist .appicon15 {
		background: url(../../assets/image/index_img/tizhong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon16 {
	    background: url(../../assets/image/index_img/tishu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon17 {
	    background: url(../../assets/image/index_img/yaowei.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon18 {
	    background: url(../../assets/image/index_img/maibo.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon19 {
	    background: url(../../assets/image/index_img/xindiantu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon20 {
	    background: url(../../assets/image/index_img/tiwen.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon21 {
	    background: url(../../assets/image/index_img/xueya.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon22 {
	    background: url(../../assets/image/index_img/xuetang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon23 {
	    background: url(../../assets/image/index_img/gysz.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon24 {
	    background: url(../../assets/image/index_img/LDL.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon25 {
	    background: url(../../assets/image/index_img/hDL.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon26 {
	    background: url(../../assets/image/index_img/zdgc.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon27 {
	    background: url(../../assets/image/index_img/shanshi.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon28 {
	    background: url(../../assets/image/index_img/yinjiu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon29 {
	    background: url(../../assets/image/index_img/xiyan.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon30 {
	    background: url(../../assets/image/index_img/yundong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist .appicon31 {
	    background-position: 0 -3rem;
	}
	/* 认证身份证弹出框 */
	.binding-model {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.22);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.binding-model-content {
		position: relative;
	}
	.binding-model-content i img {
		position: absolute;
		width: 0.5rem;
		top: -0.8rem;
		right: 0.1rem; 
	}
	.binding-model-content {
		width: 7rem;
		height: 6.15rem;
		background: #fff;
		border-radius: .1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -3rem 0 0 -3.5rem;
	}
	.binding-model-content-title {
		text-align: center;
		font-size: .38rem;
		padding: .3rem 0;
	}
	.binding-model-content-prompt {
		padding-bottom: .3rem;
		border-bottom: .08rem solid #e6e6e6;
		margin: 0px 0.3rem;
	}
	.binding-model-content-prompt p {
		color: red;
		font-size: .28rem;
		text-align: center;
	}
	.binding-model-content-form {
		padding: 0 .3rem;
	}
	.binding-model-content-form ul li {
		border-bottom: 0.01rem solid #e6e6e6;
	}
	.binding-model-content-form ul li input {
		width: 100%;
		height: 1rem;
		font-size: .28rem;
	}
	.binding-model-content-form a {
		width: 100%;
		height: 1rem;
		background: #009983;
		display: block;
		text-align: center;
		line-height: 1rem;
		font-size: .36rem;
		color: #fff;
		border-radius: .1rem;
		margin-top: .3rem;
	}
</style>