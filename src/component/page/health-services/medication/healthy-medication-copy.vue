<template>
	<div class="healthy-medication-add-details">
		<Heads :title="title"></Heads>
		<div class="healthy-medication-add-details-content">
			<div class="healthy-medication-details-content-list" v-for="(item,index) in domList">
				<div class="details">
					<ul>
						<li>
							<div class="details-drugs-data-txt">
								<input placeholder="输入药品名称" v-model="domList[index].medicineName_1">
							</div>
						</li>
						<li>
							<div class="medication-drugs-title">用药日期</div>
							<div class="details-drugs-date-num">
								<input placeholder="选择用药日期" class="" readonly="readonly" name="appDateTime" :id="'appDateTime'+index" type="text" v-model="item.medicineTime_1" onfocus="this.blur()">
							</div>
						</li>
						<li>
							<div class="medication-drugs-title">
								用法
							</div>
							<div class="details-data-drugs-usage">
								<input type="text" @click="togglePop(index)" readonly="readonly" placeholder="药品用法" v-model="domList[index].usageType_1" onfocus="this.blur()">
								<!-- <p class="togglePop" @click="togglePop">{{ drugUsageName }}</p> -->
								<div class="details-data-drugs-usage-pop" v-if="index == isIndex">
								
									<div class="details-data-drugs-usage-pop-content">
										<h2>请选择药品用法</h2>
										<ol class="drugUsage">
											<li v-for='(item,index) in drugUsage'>
												<label :for="item.name" @click="isname1(index)" :class="{'on':item.name == isName1 }">
													<input type="radio" name="radio" readonly="readonly" :value="item.name" v-model="drugUsageNameNew"/>
													{{ item.name }}
												</label>
											</li>
										</ol>
										
										<a href="javascript:void(0)" class="post_mine" @click="post_usage(index)">确定</a>
										<div class="close-drugs" @click="closePop(index)">
											<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
										</div>
									</div>
								</div>
							</div>
							<div class="details-data-drugs-date">
								<input type="text" @click="togglePop_date(index)" readonly="readonly" placeholder="用药时间" v-model="domList[index].usageTime_1" onfocus="this.blur()">
								<div class="details-data-drugs-usage-pop" v-if="index == isIndex1">
									<div class="details-data-drugs-usage-pop-content">
										<h2>请选择用药时间</h2>
										<ol class="medicationDate">
											<li v-for="(item,index) in medicationDate">
												<label :for="item.name" @click="isname2(index)" :class="{'on':item.name == isName2 }">
													<input type="radio" name="radio" readonly="readonly" :value="item.name" v-model="medicationDateNameNew"/>
													{{ item.name }}
												</label>
											</li>
										</ol>
										<a href="javascript:void(0)" class="post_mine" @click="post_medication">确定</a>
										<div class="close-drugs" @click="closePop">
											<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="medication-drugs-title">
								频率
							</div>
							<div class="details-data-drugs-usage">
								<input type="text" @click="togglePop_cons(index)" readonly="readonly" placeholder="药品用量" v-model="domList[index].timesType_1" onfocus="this.blur()">
								<div class="details-data-drugs-usage-pop" v-if="index == isIndex2">
									<div class="details-data-drugs-usage-pop-content">
										<h2>请选择用量</h2>
										<ol class="drugUsage">
											<li v-for="(item,index) in consumption">
												<label :for="item.name" @click="isname3(index)" :class="{'on':item.name == isName3 }">
													<input type="radio" name="radio" readonly="readonly" :value="item.name" v-model="consumptionNameNew"/>
													{{ item.name }}
												</label>
											</li>
										</ol>
										<a href="javascript:void(0)" @click="post_consumption">确定</a>
										<div class="close-drugs" @click="closePop">
											<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
										</div>
									</div>
								</div>
							</div>
							<div class="details-data-drugs-date">
								<input type="text" @click="togglePop_frequency(index)" readonly="readonly" placeholder="用药次数" v-model="domList[index].timesDay_1" onfocus="this.blur()">
								<div class="details-data-drugs-usage-pop" v-if="index == isIndex3">
									<div class="details-data-drugs-usage-pop-content">
										<h2>请选择次数</h2>
										<div class="details-data-drugs-usage-pop-content-num">
											<ol class="medicationDate">
												<li v-for="(item,index) in frequency">
													<label :for="item.name" @click="isname4(index)" :class="{'on':item.name == isName4 }">
														<input type="radio" name="radio" readonly="readonly" :value="item.name" v-model="frequencyNameNew"/>
														{{ item.name }}
													</label>
												</li>
											</ol>
										</div>
										<a href="javascript:void(0)" @click="post_frequency">确定</a>
										<div class="close-drugs" @click="closePop">
											<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="medication-drugs-title">剂量</div>
							<div class="details-data-drugs-usage down">
								<input type="text" @focus="focus" @blur="blur" placeholder="每次剂量" v-model="item.dosage_1">
							</div>
							<div class="details-data-drugs-date">
								<input type="text" @click="togglePop_company(index)" readonly="readonly" placeholder="剂量单位" v-model="domList[index].unit_1" onfocus="this.blur()">
								<div class="details-data-drugs-usage-pop" v-if="index == isIndex4">
									<div class="details-data-drugs-usage-pop-content">
										<h2>请选择单位</h2>
										<ol class="dosage-content medicationDate">
											<li v-for="(item,index) in company" :class="item.class">
												<label :for="item.name" @click="isname5(index)" :class="{'on':item.name == isName5 }">
													<input type="radio" name="radio" readonly="readonly" :value="item.name" v-model="companyNameNew"/>
													{{ item.name }}
												</label>
											</li>
										</ol>
										<a href="javascript:void(0)" @click="post_company">确定</a>
										<div class="close-drugs" @click="closePop">
											<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="close-drugs" @click="removeList(index)" v-if="isShow">
					<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
				</div>
			</div>
			<div class="increase" v-if="isBtn">
				<a href="javascript:void(0)" @click="increase">
					+增加药品
				</a>
			</div>
			<div style="width:100%;height:1rem;background: #f5f5f5;"></div>
		</div>
		<div class="preservation" @click="submit" id="footer">
			<a href="javascript:void(0)">
				保存
			</a>
		</div>
		<!--点击退出时的弹出框-->
		<div class="popupBox" v-if="isLoginOut">
			<div class="popupItem">
				<p>您确定要删除此次记录吗？</p>
				<div class="bottom_box">
					<span @click="close()">取消</span>
					<i @click="sureOut(listIndex)">确定</i>
					<em></em>
				</div>
			</div>
		</div>
		<popup :message="message" v-show="show"></popup>
	</div>
</template>
<script>
	import $ from 'jquery'
	import '../../../../assets/js/mobiscroll.core-2.5.2.js' 
	import '../../../../assets/js/mobiscroll.core-2.5.2-zh.js'
	import '../../../../assets/js/mobiscroll.datetime-2.5.1.js'
	import '../../../../assets/js/mobiscroll.datetime-2.5.1-zh.js'
	import '../../../../assets/js/mobiscroll.android-ics-2.5.2.js'

	import Heads from '../../../common/head.vue'
	import popup from '../../../common/error-popup.vue'
	export default {
		data () {
			return {
				domList:[
					{
						medicineName_1:"", // 药品名称
						medicineTime_1:"",  //用药时间
						usageType_1:"",
						usageTime_1:"",
						timesType_1:"",
						timesDay_1:"",
						dosage_1:"",
						unit_1:"",
					}
				],
				isLoginOut:false,
				listIndex:"",
				message:"",
				show:false,
				isName1:"",
				isName2:"",
				isName3:"",
				isName4:"",
				isName5:"",
				list:this.$store.state.medication,
				name:this.$route.query.name,
				isIndex:-1,
				isIndex1:-1,
				isIndex2:-1,
				isIndex3:-1,
				isIndex4:-1,
				title:'用药记录',
				medicineTime:"",
				timesDay:"",
				isShow:true,
				isBtn:true,
				isUsagePop:false,  // 药品用法
				isMedicationDate:false,  // 用药时间
				isConsumption:false,  // 药品用量
				isFrequency:false,  // 用药次数
				isCompany:false,  // 用药剂量
				drugUsageName:"药品用法",
				medicationDateName:"用药时间",
				consumptionName:"药品用量",
				frequencyName:"用药次数",
				companyName:"剂量单位",
				drugUsageNameNew:"",
				medicationDateNameNew:"",
				consumptionNameNew:"",
				frequencyNameNew:"",
				companyNameNew:"",

				drugUsage:[  // 用法
					{ name:"口服",val:"1" },
					{ name:"外用",val:"2" },
					{ name:"吸入",val:"3" },
					{ name:"肌肉注射",val:"4" },
					{ name:"静脉点滴",val:"5" }
				],  
				medicationDate:[  // 时间
					{ name:"饭前",val:"1" },
					{ name:"饭后",val:"2" },
					{ name:"饭时",val:"3" },
					{ name:"晨起",val:"4" },
					{ name:"睡前",val:"5" },
				],
				consumption:[  // 用量
					{ name:"每日",val:"1" },
					{ name:"每2小时",val:"2" },
					{ name:"每4小时",val:"3" },
					{ name:"每晨",val:"4" },
					{ name:"每晚",val:"5" },
				],
				frequency:[   // 次数
					{ name:"1" },
					{ name:"2" },
					{ name:"3" },
					{ name:"4"  },
					{ name:"5" },
					{ name:"6" },
					{ name:"7" },
					{ name:"8" },
					{ name:"9" },
					{ name:"10" },
				],
				company:[   // 单位
					{ name:"毫克",val:"1" },
					{ name:"毫升",val:"2" },
					{ name:"克",val:"3" }
				]
			}
		},
		mounted () {
			let data = this.list.body.rows;
			let date = new Date();
			let	Y = date.getFullYear();
			let	m = date.getMonth() + 1;
			let	d = date.getDate();
			let	H = date.getHours();
			let	min = date.getMinutes();
			if (m < 10) {
				m = '0' + m;
			}
			if (d < 10) {
				d = '0' + d;
			}
			if (H < 10) {
				H = '0' + H;
			}
			if (min < 10) {
				min = '0' + min;
			}
			let thisDate= Y + '-' + m + '-' + d + ' ' + H + ':' + min;	
			for (var i = 0; i < data.length; i++) {
				this.details = data[i];
				if( this.name == data[i].medicineName ){
					if(this.details.usageType == '外用' || this.details.usageType == '静脉点滴'){
						this.domList[0].usageTime_1 = '---';
					}else {
						this.domList[0].usageTime_1 = this.details.usageTime;
					}
					this.domList[0].medicineTime_1 = thisDate;
					this.domList[0].timesDay_1 = this.details.timesDay;
					this.domList[0].medicineName_1 = this.details.medicineName;
					this.domList[0].unit_1 = this.details.unit;
					this.domList[0].dosage_1 = this.details.dosage;
					this.domList[0].timesType_1 = this.details.timesType;
					this.domList[0].usageType_1 = this.details.usageType;
					this.marId = this.details.marId;
				}	
			}
			if(this.domList.length == 1){
				this.isShow = false;
			}

			let num = this.domList.length-1;
			let _this = this;
			var currYear = (new Date()).getFullYear();	
			var opt={};
			opt.date = {preset : 'date'};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'scroller', //日期选择模式
				dateFormat: 'yy-mm-dd',
				lang: 'zh',
		        startYear: currYear - 10, //开始年份
		        endYear: currYear + 10, //结束年份
		        onSelect:function(valueText,inst){
		        	var thisStamp = Date.parse(new Date()); // 当前时间
		        	var valueTextNum = Date.parse(valueText.replace(/-/g,'/'));
		        	if(valueTextNum>thisStamp){
		        		_this.show = true;
						_this.message = '用药日期不能大于当前时间';
						_this.clearStorage();
						$("#appDateTime"+num).val("");
		        	}else {
		        		_this.domList[num].medicineTime_1 = valueText;
		        	}
			    }
			};
			var optDateTime = $.extend(opt['datetime'], opt['default']);
			$("#appDateTime0").mobiscroll(optDateTime).datetime(optDateTime);
		},
		methods:{
			isname1 (index) {
				this.isName1 = this.drugUsage[index].name;
			},
			isname2 (index) {
				this.isName2 = this.medicationDate[index].name;
			},
			isname3 (index) {
				this.isName3 = this.consumption[index].name;

			},
			isname4 (index) {
				this.isName4 = this.frequency[index].name;
			},
			isname5 (index) {
				this.isName5 = this.company[index].name;
			},

			increase () {
				const obj = {
					medicineName_1:"", // 药品名称
					medicineTime_1:"",  //用药时间
					usageType_1:"",
					usageTime_1:"",
					timesType_1:"",
					timesDay_1:"",
					dosage_1:"",
					unit_1:"",
				}
				this.domList.push(obj);
			},
			// 删除列表
			removeList (index) {
				this.isLoginOut = true;
				this.listIndex = index;
			},
			close(){
				this.isLoginOut = false;
			},
			sureOut(index){
				this.isLoginOut = false;
				this.domList.splice(index,1);
			},
			// 药品用法》》方法
			togglePop (index) {
				this.isIndex = index;
				if(this.domList[this.isIndex].usageType_1 != ""){
					this.isName1 = this.domList[this.isIndex].usageType_1;
				}
			},
			post_usage () {
				if(this.drugUsageNameNew != ''){
					this.domList[this.isIndex].usageType_1 = this.drugUsageNameNew;
					
				}
				if(this.drugUsageNameNew == '外用' || this.drugUsageNameNew == '静脉点滴'){
					this.domList[this.isIndex].usageTime_1 = '---';
				}else {
					this.domList[this.isIndex].usageTime_1 = '';
				}
				this.isIndex = -1;
			},
			// 用药时间-》》方法
			togglePop_date (index) {
				if( this.domList[index].usageType_1 == '口服' || this.domList[index].usageType_1 == '吸入' || this.domList[index].usageType_1 == '肌肉注射'){
					this.isIndex1 = index;
					if( this.domList[index].usageTime_1 != '' && this.domList[index].usageTime_1 != '---'){
						this.isName2 = this.domList[this.isIndex1].usageTime_1;
					}
				}
			},
			post_medication () {
				if(this.medicationDateNameNew != ''){
					this.domList[this.isIndex1].usageTime_1 = this.medicationDateNameNew;
					this.isIndex1 = -1;	
				}	
			},
			// 药品用量-》》方法
			togglePop_cons (index) {
				this.isIndex2 = index;
				if( this.domList[index].timesType_1 != ''){
					this.isName3 = this.domList[this.isIndex2].timesType_1;
				}
			},
			post_consumption () {
				this.isConsumption = false;
				if(this.consumptionNameNew != ''){
					this.domList[this.isIndex2].timesType_1 = this.consumptionNameNew;			
				}
				if(this.consumptionNameNew != '每日'){
					this.domList[this.isIndex2].timesDay_1 = 1;
				}else {
					this.domList[this.isIndex2].timesDay_1 = "";
				}
				this.isIndex2 = -1;	
			},
			// 用药次数-》》方法
			togglePop_frequency (index) {
				if( this.domList[index].timesType_1 == '每日'){
					this.isIndex3 = index;
				}else {
					this.isIndex3 = -1;
				}
			},
			post_frequency () {
				this.isFrequency = false;
				if(this.frequencyNameNew != ''){
					this.domList[this.isIndex3].timesDay_1 = this.frequencyNameNew;
					this.isIndex3 = -1;		
				}
			},
			// 剂量单位-》》方法
			togglePop_company (index) {
				this.isIndex4 = index;
				if( this.domList[index].unit_1 != ''){
					this.isName5 = this.domList[this.isIndex4].unit_1;
				}
			},
			post_company () {
				if(this.companyNameNew != ''){
					this.domList[this.isIndex4].unit_1 = this.companyNameNew;
					this.isIndex4 = -1;			
				}
			},
			// 关闭弹出框
			closePop (index) {
				this.isIndex = -1;
				this.isIndex1 = -1;
				this.isIndex2 = -1;
				this.isIndex3 = -1;
				this.isIndex4 = -1;
				this.isMedicationDate = false;
				this.isConsumption = false;
				this.isFrequency = false;
				this.isCompany = false;
			},
			focus(){//input获取焦点后的处理
				let that = this;
				setTimeout(function(){
					let focus = document.getElementById("footTalk");
					let footer = document.getElementById("footer");
					footer.style.display="none"
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
			submit () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let newdomList = this.domList;
				let postData = {};
				for (var i = 0; i < this.domList.length; i++) {
					for (var p1 in this.domList[i]) {
				        var tr = p1.split("_");
				       	if(newdomList[i][p1] == ''){
				        	this.show = true;
							this.message = '请把信息补充完整';
							this.clearStorage();
							return;
				        }
				        if(newdomList[i][p1] === '---'){
				       		newdomList[i][p1] = '';
				       		postData[tr[0]+'_'+(i+1)] = newdomList[i][p1];
				       	}
				       	if( newdomList[i][p1] == '口服' || newdomList[i][p1] == '每日' || newdomList[i][p1] == '毫克' || newdomList[i][p1] == '饭前'){
				       		let a = newdomList[i][p1];
				       		a = 1;
				       		postData[tr[0]+'_'+(i+1)] = a;

				       	}else if( newdomList[i][p1] == '外用' || newdomList[i][p1] == '毫升' || newdomList[i][p1] == '每2小时' || newdomList[i][p1] == '饭后' ){
				       		let b =newdomList[i][p1];
				       		b = 2;
				       		postData[tr[0]+'_'+(i+1)] = b;

				       	}else if( newdomList[i][p1] == '吸入' || newdomList[i][p1] == '克' || newdomList[i][p1] == '饭时' || newdomList[i][p1] == '每4小时'){
				       		let c = newdomList[i][p1];
				       		c = 3;
				       		postData[tr[0]+'_'+(i+1)] = c;

				       	}else if( newdomList[i][p1] == '肌肉注射' || newdomList[i][p1] == '晨起' || newdomList[i][p1] == '每晨') {
				       		let d = newdomList[i][p1];
				       		d = 4;
				       		postData[tr[0]+'_'+(i+1)] = d;

				       	}else if( newdomList[i][p1] == '静脉点滴' || newdomList[i][p1] == '睡前' || newdomList[i][p1] == '每晚') {
				       		let e = newdomList[i][p1];
				       		e = 5;
				       		postData[tr[0]+'_'+(i+1)] = e;

				       	}else {
				       		postData[tr[0]+'_'+(i+1)] = newdomList[i][p1];
				       	}      
				    }
				}
				postData['divindex'] = this.domList.length;
				let data = JSON.stringify(postData);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:510001, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					if (response.body.state == 'err_upmedicine_001') {
						this.show = true;
						this.message = '系统异常';
						this.clearStorage();
					}else if (response.body.state == 'err_upmedicine_003') {
						this.show = true;
						this.message = '数据库操作失败';
						this.clearStorage();
					} else {
						this.show = true;
						this.message = '修改成功';
						this.clearStorage();
						let time = setTimeout(()=>{		
							this.$router.go(-1);
			            },1500);
			        } 
				},response => {
					
				})
			},
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },1500);  
			},
		},
		updated () {
			if(this.domList.length == 1){
				this.isShow = false;
			}else {
				this.isShow = true;
			}
			if(this.domList.length == 10){
				this.isBtn = false;
			}else {
				this.isBtn = true;
			}
			let num = this.domList.length-1;
			let _this = this;
			var currYear = (new Date()).getFullYear();	
			var opt={};
			opt.date = {preset : 'date'};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'scroller', //日期选择模式
				dateFormat: 'yy-mm-dd',
				lang: 'zh',
		        startYear: currYear - 10, //开始年份
		        endYear: currYear + 10, //结束年份
		        onSelect:function(valueText,inst){
		        	var thisStamp = Date.parse(new Date()); // 当前时间
		        	var valueTextNum = Date.parse(valueText.replace(/-/g,'/'));
		        	if(valueTextNum>thisStamp){
		        		_this.show = true;
						_this.message = '用药日期不能大于当前时间';
						_this.clearStorage();
						$("#appDateTime"+num).val("");
		        	}else {
		        		_this.domList[num].medicineTime_1 = valueText;
		        	}
			    }
			};
			var optDateTime = $.extend(opt['datetime'], opt['default']);
			$("#appDateTime"+num).mobiscroll(optDateTime).datetime(optDateTime);
		},
		components: {
			Heads,
			popup
		}
	}
</script>
<style>
	.details-drugs-date-num {
		float: right !important;
		width: 50% !important;
		background: url('../../../../assets/image/expert_info_right@3x.png') no-repeat right !important;
		background-size: .15rem !important;
		padding-right: .3rem !important;
	}
	.details-drugs-date-num input {
		text-align: right;
	}
	#tc-wrapper1 {
		height: 4.3rem;
		overflow: scroll;
		position: relative;
	}
	#tc-wrapper1 ol {
		padding: 0;
	}
	#tc-wrapper1 ol li {
		text-align: center;
		margin-left: 0;
	}
	.details-data-drugs-usage-pop-content-num {
		position: relative;
		height: 4.3rem;
		overflow: scroll;
		position: relative;
	}
	.ui-line {
		border-top: .01rem solid #D6DDE7;
		border-bottom: .01rem solid #D6DDE7;
		width: 100%;
		height: .8rem;
		position: absolute;
    	top: 1.6rem;
	}
	.healthy-medication-add-details {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: absolute;
		padding-top: .84rem;
	}
	.healthy-medication-add-details-content {
		background: #f5f5f5;
	}
	.healthy-medication-details-content-list {
		background: #fff;
		padding:0 0.3rem;
		position: relative;
		margin-bottom: .2rem;
	}
	.healthy-medication-add-details-content .drugs {
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 0.3rem;
		margin-top: .3rem;
	}
	.healthy-medication-add-details-content .details>ul>li {
		border-bottom: 1px solid #f3f3f3;
		width: 100%;
		height: .9rem;
	}
	.details-data-usage {
		float: right;
	}
	.details-data-usage div {
		float: left;
		line-height: 0.9rem;
		font-size: 0.28rem;
	}
	.details-data-drugs-date p,
	.details-data-drugs-date input {
		text-align: right;
	}
	.details-data-drugs-usage p,
	.details-data-drugs-usage input {
		text-align: right;
	}
	.down {
		background: url('../../../../assets/image/expert_info_right@3x.png') no-repeat right !important;
		background-size: .15rem !important;
	    padding-right: .3rem !important;
	}
	.details-data-drugs-usage {
		width: 1.5rem !important;
		margin-left: .2rem;
		background: url('../../../../assets/image/expert_info_down@3x.png') no-repeat right;
		background-size: .25rem;
		padding-right: .3rem;
	}
	.details-data-drugs-date {
		float: right !important;
		background: url('../../../../assets/image/expert_info_down@3x.png') no-repeat right !important;
		background-size: .25rem !important;
	    padding-right: .3rem !important;
	}
	.healthy-medication-add-details-content .details>ul>li>div {
		width: 33.3%;
		float: left;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #333;
	}
	.details-drugs-data-txt {
		width: 100% !important;
	}
	.details-drugs-date {
		float: right !important;
		
	}
	.details-drugs-date input {
		text-align: right;
	}
	.healthy-medication-add-details-content .details>ul>li>div>input {
		width: 100%;
		height: 0.54rem;
		border: 1px solid #f3f3f3;
		font-size: 0.28rem;
		-webkit-appearance: none;
		border-radius: 0;
		border: none;
		margin-top: .18rem;
	}
	.increase a {
		text-align: center;
		display: block;
		font-size: .28rem;
		padding-bottom: .2rem;
	}

	.details-data-drugs-usage-pop-content ol li label {
		cursor: pointer;
		text-align: center;
		background: url(../../../../assets/image/commit_coupons_noSelect@3x.png) no-repeat left .01rem;
		background-size: .32rem;
	}
	.details-data-drugs-usage-pop-content ol li label.on {
		cursor: pointer;
		text-align: center;
		background: url(../../../../assets/image/purse_paybuttonimage_selected@3x.png) no-repeat left .01rem;
		background-size: .32rem;
	}
	.details-data-drugs-usage-pop-content ol li input {
		margin-right: .15rem;
		opacity: 0;
		cursor: pointer;
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		filter: alpha(opacity=0);
	}
	.preservation {
		width: 100%;
		height: 1rem;
		background-color: #009983;
		position: fixed;
		bottom: 0;
		font-size: .32rem;
		text-align: center;
		line-height: 1rem;
	}
	.preservation a {
		color: #fff;
	}
	.close-drugs img {
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: .25rem;
		right: 0.3rem;
	}
	.model-usageType-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.49);
		top: 0;
		left: 0;
		z-index: 9;
	}
	.model-usageType-mask-content {
		width: 5rem;
		height: 6rem;
		background: #fff;
		margin: -2.5rem -3rem; 

	}
	.details-data-drugs-usage-pop {
		width: 100% !important;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 9999;
	}
	.details-data-drugs-usage-pop-content {
		width: 7rem;
		height: 6.5rem;
		background: #fff;
		position: relative;
		top: 50%;
		left: 50%;
		margin: -3.25rem 0 0 -3.5rem;
		border-radius: .1rem;
		padding: 0 .3rem;
	}
	.details-data-drugs-usage-pop-content h2 {
		text-align: center;
		font-size: .32rem;
		border-bottom: .05rem solid #e6e6e6;
	}
	.drugUsage li {
		width: 1.8rem;
		margin: 0 auto;
	}
	.medicationDate li{
		width: 1.5rem;
		margin: 0 auto;
		padding-left: 0.2rem;
	}
	.details-data-drugs-usage-pop-content ol {
		padding: .1rem 0;
		height: 4.3rem;
	}
	.dosage-content li:first-child {
		margin-top: 0.8rem;
	}
	.details-data-drugs-usage-pop-content ol li {
		line-height: .8rem;
		height: .8rem;
		font-size: .3rem;
	}
	.details-data-drugs-usage-pop-content ol li.last {
		height: 1.1rem;
	}
	.details-data-drugs-usage-pop-content ol li input {
		margin-right: .15rem;
	}
	.details-data-drugs-usage-pop-content a {
		width: 100%;
		height: .84rem;
		display: block;
		background: #64b551;
		text-align: center;
		border-radius: .1rem;
		color: #fff;
		font-size: .32rem;
	}
</style>