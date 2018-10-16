<template>
	<div class="mian-router">
		<!-- <div class="head_null" style="width:100%;height:50px;" v-if="isHead"></div>
		<div class="home_51_div" v-if="isHead">
			<div class="home_51_div-left">
				<div class="home_51_div_x" @click="head_x">
					<img src="../../assets/image/content_51_div_x.png" alt="">
				</div>
				<div class="home_51_div_box">
					<div class="home_51_div_box_logo">
						<img src="../../assets/image/content_51_div_logo.png" alt="">
					</div>
					<div class="home_51_div_box_txt">
						<p>使用中国健康云App有优惠</p>
					</div>
				</div>
			</div>
			<div class="home_51_div_btn">
				<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zgjky.app">下载</a>
			</div>
		</div> -->
		<Swiper></Swiper>
		<!-- <signDoctor></signDoctor> -->
		<ul class="main-router-link">
			<li v-for="(item,index) in tabSelect" @click="postData(item,index)">
				<dl>
					<dt class="jz_server" :style="{backgroundImage: 'url(' + item.imgPath + ')'}"></dt>
					<dd>{{ item.options }}</dd>
				</dl>
			</li>
		</ul>
		<div class="mian-router-info">
			<div class="mian-router-info-one">
				<ul >
					<li class="mian-router-info-one-bg-max">
						<router-link :to="{ name:'applyRouter' }">
							<h2>健康全管理</h2>
							<p>全龄化的健康私密服务</p>
						</router-link>
					</li>
					<li class="mian-router-info-one-bg-min">
						<router-link :to="{ name: 'healthy', query: {
							id: 111405,
							title: 'healthy',
							flag:300018
							}}">
							<h2>慢病风险评估</h2>
							<p>科学评估您的患病风险</p>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="mian-router-info-two">
				<ul>
					<li class="mian-router-info-two-bg-min">
						<router-link :to="{ name:'list' }">
							<h2>服务专家</h2>
							<p>给您最贴心的守护</p>
						</router-link>
					</li>
					<li class="mian-router-info-two-bg-max">
						<router-link :to="{ name:'applyRouterJc' }">
							<h2  style="">健康数据监测</h2>
							<p>实时动态监测健康数据</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="mian-tool">
			<h2 class="title_null"></h2>
			<h2 class="mian-tool-title">精品服务</h2>
			<ul class="boutique_server_content">
				<li v-for="item in BoutiqueList">
					<router-link :to="{ path:'/server/serverDetail',query:{
						id:item.serviceDictId,
						type:item.serviceDictReservation
					}}">
						<div class="boutique_server_content_img" :style="{backgroundImage:'url('+ imgIcon(item.imgUrl) +')'}"></div>
						<p>{{ item.serviceDictName }}</p>
					</router-link>
				</li>
			</ul>
			<div class="boutique_server_btn">
				<router-link to="/boutiqueServer">
					更多精品服务
				</router-link>
			</div>
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
		<myFooter id="footer"></myFooter>
	</div>
</template>
<script>
	import Swiper from './home-swiper.vue'
	import myFooter from '../common/footer.vue'
	import signDoctor from './home-sign-doctor.vue'
	import MinErrorPopup from '../common/error-min-popup.vue'
	export default {
		data () {
			return {
				isHide:false,
				message:"",
				showUp:false,
				name:"",
				id:"",
				judges:'',
				unReadNum:"",
				isHead:true,
				BoutiqueList:"",
				tabSelect: [
					{
						options: '慢病防控',
						txt: '慢病防控',
						index: 3,
						value: 'ST007',
						className: 'right',
						imgPath: './src/assets/image/server/service_slowDiseaseManagementNew@2x.png'
					},
					{
						options: '医护上门',
						txt: '医护上门',
						index: 3,
						value: 'ST001',
						className: 'right',
						imgPath: './src/assets/image/server/service_careToComeNew@2x.png'
					},
					{
						options: '就医陪诊',
						txt: '就医陪诊',
						index: 3,
						value: 'ST003',
						className: 'right',
						imgPath: './src/assets/image/server/service_doctorAccompanyingNew@2x.png'
					},
					{
						options: '中医调理',
						txt: '中医调理',
						index: 3,
						value: 'ST004',
						className: 'right',
						imgPath: './src/assets/image/server/service_edicalMassageNew@2x.png'
					},
					{
						options: '专家咨询',
						txt: '专家咨询',
						index: 3,
						value: 'ST010',
						className: 'right',
						imgPath: './src/assets/image/server/service_expertAdviceNew@2x.png'
					}
				],
				homeList:[
					{ 
						itemName:"健康档案",
						routerName:"healthyRecords",
						class:'main-NCD',
						uid:500003, 
						title:'archives'
					},
					{ 
						itemName:"健康评估", 
						routerName:"healthy", 
						class:"main-CHD", 
						uid:111405, 
						title:'healthy',
						flag:300018
					},
					{ 
						itemName:"用药记录",
						routerName:"healthyMedication",
						class:'main-waistline',
						uid:510004, 
						title:'medication'
					},
					{ 
						itemName:"压力评估", 
						routerName:"pressure", 
						class:"main-jihua", 
						uid:111503,
						typeData:6, 
						title:'pressure',
						flag:300021
					},
					/*{ 
						itemName:"健康计划", 
						routerName:"healthyPlan", 
						class:"main-chufang", 
						uid:540002, 
						title:'plan'
					},*/
					{ 
						itemName:"健康计划",
						routerName:"healthyPlan",
						class:'main-xinge',
						uid:540002, 
						title:'plan',
						judges:true
					},
					{ 
						itemName:"健康处方", 
						routerName:"healthyPrescription", 
						class:"main-BMI", 
						uid:300011, 
						title:'prescription' 
					},
					{ 
						itemName:"住院病史",
						routerName:"healthyHospitalization",
						class:'main-hospitalization',
						uid:520004, 
						title:'chil'
					},
					{ 
						itemName:"更多", 
						routerName:"applyRouter",
						class:"main-all", 
					}
					/*,
					{ 
						itemName:"腰围监测", 
						routerName:"chartContent", 
						class:"main-blood", 
						uid:111612, 
						title:'theWaist',
						dataType:'1',
						dicCode:"10010" 
					},
					{ 
						itemName:"血压监测", 
						routerName:"chartContent", 
						class:"main-NCD", 
						uid:111612, 
						title:'bloodPressure',
						dataType:'1',
						dicCode:"10018,10023"  
					},
					{ 
						itemName:"血糖监测", 
						routerName:"chartContent", 
						class:"sugar-main", 
						uid:111612, 
						title:'bloodsugar',
						dataType:'1',
						dicCode:"10144,10145,10142" 
					},
					{ 
						itemName:"膳食", 
						routerName:"chartContent", 
						class:"main-diet", 
						uid:111612, 
						dataType:'3',
						title:'diet',
						dicCode:"10769" 
					},
					{ 
						itemName:"运动", 
						routerName:"chartContent", 
						class:"main-sport", 
						uid:111612, 
						title:'motion',
						dataType:'4',
						dicCode:"10770" 
					}*/
				],
				healthMonitoring: [
					{ 
						itemName:"体重", 
						routerName:"chartContent", 
						class:"main-tizhong", 
						uid:111612, 
						title:'weight',
						dataType:'1',
						dicCode:"10003" 
					},
					{ 
						itemName:'腰围',
						class:'main-yaowei',
						routerName:"chartContent",
						title:'theWaist',
						uid:111612,
						dataType:'1',
						dicCode:"10010" 
					},
					{ 
						itemName:'血压',
						routerName:"chartContent",
						class:'main-xueya',
						title:'bloodPressure',
						uid:111612,
						dataType:'1',
						dicCode:"10018,10023"
					},
					{ 
						itemName:'血糖',
						routerName:"chartContent",
						class:'mian-xuetang',
						title:'bloodsugar',
						uid:111612,
						dataType:'1',
						dicCode:"10144,10145,10142"
					},
					/* - - - - - - */
					{ 
						itemName:'体重指数',
						class:'main-tishu',
						routerName:"chartContent",
						title:'weightIndex',
						uid:111612,
						dataType:'1',
						dicCode:"10004,10001,10003"
					},
					{ 
						itemName:'脉搏',
						class:'main-maibo',
						routerName:"chartContent",
						title:'pulse',
						uid:111612,
						dataType:'2',
						dicCode:"10013" 
					},
					/*{ 
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

					},*/
					{ 
						itemName:'运动',
						routerName:"chartContent",
						class:'main-yundong',
						title:'motion',
						uid:111612,
						dataType:'4',
						dicCode:"10770"
					},
					{ 
						itemName:"更多", 
						routerName:"applyRouter",
						class:"main-all", 
					}
				]
			}		
		},
		methods:{ 
			getData (e) {
				let name = e.target.getAttribute('id');
				if( name == 'main-CHD' || name == 'main-jihua'){
					this.isHide = true;
					document.body.style.overflow = "hidden";
				}
			},
			clearStorage () { //清楚定时器
				let time = setTimeout(()=>{
					if( this.showUp ==  true){
                		this.showUp = false;
                	} 
                },2000);  
			},
			hide () {
				this.isHide = false;
				document.body.style.overflow = "scroll";
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
						console.log(response)
						if(response.body.state == 'certficationd_suc'){
							this.showUp = true;
							this.message = "身份证认证成功";
							this.clearStorage();
							let time = setTimeout(()=>{
								this.getjudge();
								this.isHide = false;
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
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if( userInfo != null ){
					let data = JSON.stringify({
						"userName": userInfo.userName
					})
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:userInfo.token,infoType:600039,jsonValue:data},{emulateJSON:true}).then( response => {
						let data = response.body.state;
						let arr = JSON.parse(data);
						this.$cookie.set('userInfoNew', data, { expires: '2h' });
						let mobile = arr[0].identifyMobile; // 手机号
						let name = arr[0].name; // 姓名
						let userName = arr[0].userName; // userName
						let gender = arr[0].gender; // 性别
						let birthDate = arr[0].birthDate; // 出生日期
						if( birthDate == "" || gender == 0 ){
							this.homeList = [
								{ 
									itemName:"健康档案",
									routerName:"healthyRecords",
									class:'main-NCD',
									uid:500003, 
									title:'archives',
								},
								{ 
									itemName:"健康评估",
									class:"main-CHD",
									judge:"main-CHD"
								},
								{ 
									itemName:"用药记录",
									routerName:"healthyMedication",
									class:'main-waistline',
									uid:510004, 
									title:'medication'
								},
								{ 
									itemName:"压力评估", 
									class:"main-jihua", 
									judge:"main-jihua"
								},
								{ 
									itemName:"健康计划",
									routerName:"healthyPlan",
									class:'main-xinge',
									uid:540002, 
									title:'plan',
									judges:true
								},
								{ 
									itemName:"健康处方", 
									routerName:"healthyPrescription", 
									class:"main-BMI", 
									uid:300011, 
									title:'prescription' 
								},
								{ 
									itemName:"住院病史",
									routerName:"healthyHospitalization",
									class:'main-hospitalization',
									uid:520004, 
									title:'chil'
								},
								{ 
									itemName:"更多", 
									routerName:"applyRouter",
									class:"main-all", 
								}
							]
						}else {
							this.homeList = [
								{ 
									itemName:"健康档案",
									routerName:"healthyRecords",
									class:'main-NCD',
									uid:500003, 
									title:'archives',
								},
								{ 
									itemName:"健康评估", 
									routerName:"healthy", 
									class:"main-CHD", 
									uid:111405, 
									title:'healthy',
									flag:300018
								},
								{ 
									itemName:"用药记录",
									routerName:"healthyMedication",
									class:'main-waistline',
									uid:510004, 
									title:'medication'
								},
								{ 
									itemName:"压力评估", 
									routerName:"pressure", 
									class:"main-jihua", 
									uid:111503,
									typeData:6, 
									title:'pressure',
									flag:300021 
								},
								{ 
									itemName:"健康计划",
									routerName:"healthyPlan",
									class:'main-xinge',
									uid:540002, 
									title:'plan',
									judges:true
								},
								{ 
									itemName:"健康处方", 
									routerName:"healthyPrescription", 
									class:"main-BMI", 
									uid:300011, 
									title:'prescription' 
								},
								{ 
									itemName:"住院病史",
									routerName:"healthyHospitalization",
									class:'main-hospitalization',
									uid:520004, 
									title:'chil'
								},
								{ 
									itemName:"更多", 
									routerName:"applyRouter",
									class:"main-all", 
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
					let footer = document.getElementById("footer");
					footer.style.display="none"
//					let focus = that.$refs.footTalk
					/*footer.scrollIntoView(true);
					footer.scrollIntoViewIfNeeded();
					document.body.scrollTop = document.body.scrollHeight;*/
				},200)
			},
			blur () {
				let footer = document.getElementById("footer");
				footer.style.display="block"
			},
			// 判断健康计划是否有消息
			judge () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if( userInfo != null ){
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
			head_x () {
				sessionStorage.setItem('key_head',1);
				this.isHead = false;
				//console.log(1)
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
			//精选服务接口调用
			initBoutique () {
				var data = JSON.stringify({
					page: 1,
					rows: 4,
					platType:"2",
					boutiqueService:"1",
					ignoreLogin: 1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:'', infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.BoutiqueList = response.body.rows
					
				})
			},
			postData (item,index) {
				this.$store.state.home_item = item;
				this.$store.state.Home_index = index;
				this.$router.push({ name: 'serverRouter' });
			}
		},
		components: {
		  Swiper,
		  myFooter,
		  signDoctor,
		  MinErrorPopup
		},
		mounted () {
			// 精选服务接口调用
			this.initBoutique();
			if(sessionStorage.getItem('key_head') == 1){
				this.isHead = false;	
			}else {
				this.isHead = true;
			}
			this.getjudge();
			this.judge();
			var winHeight = $(window).height(); //获取当前页面高度  
			/*$(window).resize(function() {  
			  var thisHeight = $(this).height();  
			  if (winHeight - thisHeight > 50) {  
			      //当软键盘弹出，在这里面操作  
			      alert('aaa');  
			      $('body').css('height', winHeight + 'px');  
			  } else {  
			      alert('bbb');  
			      //当软键盘收起，在此处操作  
			      $('body').css('height', '100%');  
			  }  
			});*/ 
		}
	}
</script>

<style>
	.mian-router {
		background: #f5f5f5;
	}
	.mian-router .main-router-link {
		display: box;
		background: #fff;
		margin-top: -5px;
	}
	.mian-router .main-router-link li {
		width: 20%;
		float: left;
		height: 23.5%;
		text-align: center;
		padding: .3rem 0;
	}
	.mian-router .main-router-link li dl {
		width: 100%;
	    height: 100%;
	}
	.mian-router .main-router-link a {
	    display: inline-block;
	    height: 100%;
	    width: 100%;
	    font-size: 0.26rem;
	    color: #333;
	    position: relative;
	}
	.mian-router .main-router-link li dl dt {
		width: .84rem;
	    height: .75rem;
	    margin-top: .35rem;
	    margin: 0 auto;
	    
	}
	.mian-router .main-router-link li dl dd {
		margin-top: 0.2rem;
		font-size: .28rem;
	}
	.main-router-link li span {
		display: block;
		width: .16rem;
		height: .16rem;
		background: red;
		border-radius: .3rem;
		position: absolute;
		right: 0.3rem;
		top: 0;
	}
	.mian-router .main-router-link .main-NCD {
	   background: url(../../assets/image/index_img/a.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-CHD {
	    background: url(../../assets/image/index_img/b.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-xinge {
	   background: url(../../assets/image/index_img/c.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	/*.mian-router ul .main-PSTRI {
	    background: url(../../assets/image/index_img/d.png) no-repeat;
		background-size: contain;
		background-position: center;
	}*/
	.mian-router .main-router-link .main-jihua {
	    background: url(../../assets/image/index_img/d.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	/* -------111111 */
	.mian-router .main-router-link .main-hospitalization {
	    background: url(../../assets/image/index_img/f.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	/* .mian-router .main-router-link .main-chufang {
		background: url(../../assets/image/index_img/e.png) no-repeat;
		background-size: contain;
		background-position: center;
	}  */
	.mian-router .main-router-link .main-BMI {
		background: url(../../assets/image/index_img/chufang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-waistline {
		background: url(../../assets/image/index_img/g.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-all {
		background: url(../../assets/image/index_img/h.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.jz_server {
		background: url(../../assets/image/index_img/jz_server.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.health_monitor {
		background: url(../../assets/image/index_img/health_monitor.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.health_control {
		background: url(../../assets/image/index_img/health_control.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.server_doctor {
		background: url(../../assets/image/index_img/server_doctor.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	/*.mian-router ul .main-blood {
		background: url(../../assets/image/index_img/h.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.mian-router ul .sugar-main {
		background: url(../../assets/image/index_img/h.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router ul .main-diet {
		background: url(../../assets/image/index_img/h.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router ul .main-sport {
		background: url(../../assets/image/index_img/h.png) no-repeat;
		background-size: contain;
		background-position: center;
	}*/
	.mian-router .main-router-link .main-tizhong {
		background: url(../../assets/image/index_img/tizhong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-yaowei {
		background: url(../../assets/image/index_img/yaowei.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-xueya {
		background: url(../../assets/image/index_img/xueya.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .mian-xuetang {
		background: url(../../assets/image/index_img/xuetang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-tishu {
		background: url(../../assets/image/index_img/tishu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-maibo {
		background: url(../../assets/image/index_img/maibo.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.mian-router .main-router-link .main-yundong {
		background: url(../../assets/image/index_img/yundong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.title_null {
		width: 100%;
		height: .3rem;
	}
	.mian-tool-title {
		width: 3.77rem;
		height: 0.38rem;
		font-size: .32rem;
		color: #666;
		background: url(../../assets/image/icon_title_news.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		margin: 0 auto .3rem;
	}
	.mian-tool {
		width: 100%;
		background: #fff;
	}
	.footer-null {
		width: 100%;
		height: 1rem;
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

	.home_51_div {
	  	height: 50px;
	  	width: 100%;
	  	z-index: 9;
	  	line-height: 50px;
	  	background: #000;
		position: fixed;
		top: 0;
	}
	.home_51_div-left {
	  	width: 80%;
	  	float: left;
	}
	.home_51_div_x {
	  	width: 16px;
	  	height: 50px;
	  	line-height: 50px;
	  	display: inline-block;
	  	margin-left: 2.5%;
	  	float: left;
	}
	.home_51_div_x img {
	  	width: 100%;
	  	height: auto;
	  	vertical-align: middle;
	}
	.home_51_div_box {
	  	width: 80%;
	  	float: left;
	}
	.home_51_div_box_logo {
	  	width: 35px;
	  	height: 50px;
	  	line-height: 50px;
	  	margin-left: 5%;
	  	margin-right: 2.5%;
	  	float: left;
	}
	.home_51_div_box_logo img {
	  	width: 100%;
	    height: auto;
	    vertical-align: middle;
	}
	.home_51_div_box_txt {
		float: left;
		color: #fff;
		font-size: .28rem;
	}
	.home_51_div_btn {
		width: 20%;
		height: 50px;
		background: red;
		float: left;
	}
	.home_51_div_btn a {
		color: #fff;
		text-align: center;
		display: block;
	}
	.boutique_server_content {
		padding: 0 .3rem;
	}
	.boutique_server_content li {
		float: left;
		width: 49%;
		text-align: center;
	}
	.boutique_server_content li:nth-child(4), 
	.boutique_server_content li:nth-child(2) {
		margin-left: .1rem;
	}
	.boutique_server_content li p {
		font-size: .28rem;
		margin: .2rem 0;
		color: #333;
	    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.boutique_server_btn {
		padding: .3rem 0;
	}
	.boutique_server_btn a {
		width: 1.8rem;
		height: .6rem;
		text-align: center;
		display: block;
		border: .01rem solid #e6e6e6;
		color: #000;
		margin: 0 auto;
		line-height: .6rem;
		border-radius: 1rem;
	}
	.boutique_server_content_img {
		width: 100%;
		height: 2rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.mian-router-info {
		padding: .3rem;
	}
	.mian-router-info ul li {
		float: left;
		background: #fff;
	}
	.mian-router-info ul li h2 {
		color: #643431;
		font-size: 0.28rem;
		
	}
	.mian-router-info ul li p {
		color: #947a78;
		font-size: 0.24rem;
	}
	.mian-router-info-one ul li.mian-router-info-one-bg-max {
		width: 55%;
		height: 1.64rem;
		background: url(../../assets/image/index_img/bg-max-1.png) no-repeat;
		background-size: 100% 100%;
		padding: 0.4rem 0 0 0.4rem;
	}
	.mian-router-info-one ul li.mian-router-info-one-bg-min {
		width: 42%;
		height: 1.64rem;
		float: right;
		text-align: right;
		background: url(../../assets/image/index_img/bg-min-1.png) no-repeat;
		background-size: 100% 100%;
		padding: 0.4rem 0.4rem 0 0;
	}
	.mian-router-info-two {
		font-family:'dincond_regular';
		margin-top: .3rem;
	}
	.mian-router-info-two ul li.mian-router-info-two-bg-max {
		width: 55%;
		height: 1.64rem;
		background: url(../../assets/image/index_img/bg-max-2.png) no-repeat;
		background-size: 100% 100%;
		float: right;
		padding: 0.4rem 0 0 0.4rem;
	}
	.mian-router-info-two ul li.mian-router-info-two-bg-min {
		width: 42%;
		height: 1.64rem;
		background: url(../../assets/image/index_img/bg-min-2.png) no-repeat;
		background-size: 100% 100%;
		padding: 0.4rem 0 0 0.4rem;
	}
</style>