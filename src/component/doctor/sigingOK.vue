<template>
	
	<div>
		<!--蒙版-->
		<div v-if="signMask" class="signMask"></div>
		<div v-if="PerIngfor" class="thisPerIngfor">
			<img src="../../assets/image/doctor/act-closeBtn_03.png" class="closePerBtn" @click="perMaskHide()"/>
			<p class="perTitle">完善个人信息</p>	
			<div class="singMaskPhone">手机号码
				<input  type="tel" placeholder="您的手机号码"  v-model="perMobile"/>
			</div>
			<div class="singCheckCode">验证码
				<input  type="tel" placeholder="请输入验证码"  v-model="signPhoneCode"/><span :class="{'reg-codetxt-no':isCalss}" @click="clickCodePer()">{{ codetxt }}</span>
			</div>
			<div class="subPerPhone" @click="subPerPhone()">
				确定
			</div>
		</div>
		<div v-if="hitBox" class="hitBox">
			<p class="hitTitle">提示</p>
			<p style="text-align: center;">专家同意签约后，实名信息不可修改，</p>
			<p style="text-align: center;">请确认您的身份信息准确无误</p>
			<div class="changeOrSign">
				<p class="changBtn" @click="changePerInf()">修改</p>
				<p class="sigBtn" @click="signUp ()">签约</p>
			</div>
			
			
		</div>
		<Loading v-if="isLoading" class="load"></Loading>
		<!--<heads :title="title"></heads>-->
		<heads :title="title" class="header">
			<b @click="backToIndex"><img src="../../assets/image/head-back.png" alt="返回图标"></b>
		</heads>
		
		<!--<div style="height: 0.84rem;"></div>-->
		<!--<div class="doctor-sign-top">
			<p class="doctor-sign-topText">
				提示:您即将与<span> 中国健康云  </span>签约<i>《中国健康云医生团队服务协议》</i>，在您签字完成并提交申请通过后，待家庭医生签字确认，此协议方可生效。
			</p>
		</div>-->
		<!--<div class="doctor-sign-contentA clearfix">
			<p class="sign-content-left sign-contentA">甲<span></span>方:</p>
			<p class="sign-content-right sign-contentA-value">中国健康云</p>
		</div>
		<div class="doctor-sign-contentB clearfix" @click="autograph()">
			<p class="sign-content-left sign-contentB">乙方(签字)</p>
			<!--<input type="text" v-model="canvasImg" class="sign-content-right sign-contentB-value" name="" id="" />-->
			<!--<div class="sign-content-right sign-contentB-value">
				<i style="width: 100%;height: 100%;display: inline-block;color: #999;padding-left: 5%;" v-if="canvasImg == ''">请签名</i>
				<img :src="canvasImg" alt="" v-else/>
			</div>
		</div>
		<div class="sign-mobile-content clearfix">
			<p class="sign-content-left sign-mobile">联系电话:</p>
			<input class="sign-content-right sign-mobile-value" type="tel" v-model="mobile" disabled="disabled"/>
		</div>
		<div class="sign-date-content clearfix">
			<p class="sign-content-left sign-date">签约时期:</p>
			<input class="sign-content-right sign-date-value" type="text" v-model="signDate" disabled="disabled"/>
		</div>
		
		<div class="submit_info" @click="signUp"><a href="javascript:void(0);">提交申请</a></div>-->
		
		
		
		
		<div >
			<p class="one_box">提示：您即将与
				<span>中国健康云</span>签约&nbsp;
				<span>《居民家庭医生签约协议》</span>
			</p>
			
			<div class="two_box"><p>基本信息</p></div>
			
			<div style="position: absolute; background: black; height: 3rem; width: 100%; opacity: 0; z-index: 999;" v-if="isAuth == '1'">
				
			</div>
			
			<ul class="up_img">
				<li  v-if="imgsZ == ''"><input type="file" ref="fileZ" @change="add_imgZ" accept="image/*" /><span>上传身份证正面照片</span></li>
				<li  v-else><span @click="removeicdF()" id="idCard_spanF" :style="{ top:closeImgTop }"><img src="../../assets/image/doctor/act-closeBtn_03.png" v-if="isAuth != '1'"/></span><img :src="imgsZ" alt="" /></li>
				<li  v-if="imgsF == ''"><input type="file" ref="fileF" @change="add_imgF" accept="image/*" /><span>上传身份证反面照片</span></li>
				<li  v-else><span @click="removeicdB()" id="idCard_spanB" :style="{ top:closeImgTop }"><img src="../../assets/image/doctor/act-closeBtn_03.png" v-if="isAuth != '1'"/></span><img :src="imgsF" alt="" /></li>
			</ul>
			
			
			<ul class="input_ul">
				<li v-if="isAuth != '1'"><div>真实姓名<input type="text" placeholder="请输入您的真实姓名" v-model="trueName"  @focus="hideSignBtn()" @blur="showSignBtn()"/></div></li>
				<li v-if="isAuth == '1'"><div>真实姓名<input type="text" placeholder="请输入您的真实姓名" v-model="trueName"  @focus="hideSignBtn()" @blur="showSignBtn()" disabled="disabled" style="color: #666;"/></div></li>
				<li v-if="isAuth != '1'"><div>身份证号<input type="text" placeholder="请填写您的身份证号" v-model="idCode"  @focus="hideSignBtn()" @blur="showSignBtn()"/></div></li>
				<li v-if="isAuth == '1'"><div>身份证号<input type="text" placeholder="请填写您的身份证号" v-model="idCode"  @focus="hideSignBtn()" @blur="showSignBtn()" disabled="disabled" style="color: #666;"/></div></li>
				<li v-if="isAuth != '1'"><div>户籍地址<input type="text" placeholder="请输入您的户籍地址" v-model="address"  @focus="hideSignBtn()" @blur="showSignBtn()"/></div></li>
				<li v-if="isAuth == '1'"><div>户籍地址<input type="text" placeholder="请输入您的户籍地址" v-model="address"  @focus="hideSignBtn()" @blur="showSignBtn()" disabled="disabled" style="color: #666;"/></div></li>
				<li><div>现居住地<input type="text" placeholder="请输入您的现居住地地址" v-model="addressNew"  @focus="hideSignBtn()" @blur="showSignBtn()" @click="addressJump()"/></div></li>
				<li @click="autograph()">
					<div >
						<span style="display: block;float: left;">您的签名</span>
						<i style="margin-left: 5%; display: inline-block;color: #999;" v-if="canvasImg == ''">请签名</i>
						<span style=" height: 100%;" v-else>
							<img v-bind:src="canvasImg" alt="" class="canvasImg" />
						</span>
					</div>
				</li>
				<li>
					<div>手机号码
						<input v-if="mobile == ''" type="tel" placeholder="您的手机号码"  v-model="mobile" @click="phoneChange()"  readonly="readonly"  @focus="hideSignBtn()" @blur="showSignBtn()"/>
						<input v-else  type="text" placeholder="您的手机号码"  disabled="disabled" v-model="mobile"/>
					</div>
				</li>
				
				<li><div>签署日期<input type="text" v-model="signDate" placeholder="您的签署日期" disabled="disabled"/></div></li>
			</ul>
			
			
		</div>
		<div style="height: 1.5rem;"></div>
		<div class="formBox" v-show="see">
			<div class="three_box"><p>签约表示同意<router-link :to='{path: "/doctor/signingNotice"}'><span>签约须知</span></router-link>期限为一年</p></div>
			<!--<div class="formBtn" @click="signUp">立即签约</div>-->
			<div class="formBtn" @click="makeSureSub()">立即签约</div>
		</div>
	
		<signature v-show="isShow" :isHides="isHides" v-on:listenToChildEvent="isBtn1"></signature>
		<sucPopup :sucMessage="sucMsg" v-if="isSuc"></sucPopup>
		<errPopup :message="errMsg" v-if="isErr"></errPopup>
	</div>
</template>


<script>
	import {formatDate} from '../../assets/js/dateFormat.js'
	import heads from '../common/head.vue'
	import signature from "../common/autograph.vue"
	import sucPopup from "../common/suc-popup.vue"
	import errPopup from "../common/error-popup.vue"
	import Loading from '../common/loading.vue'
	export default {
		data() {
			return {
				title: '签约确认',
				isShow: false,
				isSuc: false,
				isErr: false,
				isHides: '',
				sucMsg: '',
				errMsg: '',
				canvasImg: '',
				imgsZ: '',
				imgFile:[],
				imgsF: '',
				signDate:'',
				src:"",
				mobile: '',
				isAuth:'',
				img1:"",
				img2:'',
				address:"",
				birthDate:"",
				addressNew:"",
				message:'',
				trueName:'',
				idCode:"",
				isPopup:'',
				perMobile:"",
				signPhoneCode:"",
				signMask:false,
				PerIngfor:false,
				hitBox:false,
				isCalss:false,
				codetxt:"获取验证码",
				isLoading: false,
				see:true,
				closeImgTop:"",
				userId: this.$route.query.userId,
				Detailed_address: this.$route.query.Detailed_address,
				brand_address: this.$route.query.brand_address,
				adCode: this.$route.query.city,
				lat: this.$route.query.latitude,
				lon: this.$route.query.longitude,
				
			}
		},
		components:{
			heads,
			signature,
			sucPopup,
			Loading,
			errPopup
		},
		methods: {

			initData(){
				let time = new Date();
				this.signDate = formatDate(time,'yyyy-MM-dd');
				let userInfo = JSON.parse(this.$cookie.get('userInfo'));
				console.log(userInfo)
				this.mobile = userInfo.identifyMobile;
				var that = this;
				let token = userInfo.token;
				let res = JSON.stringify({userName:userInfo.userName,userType:1});
				var data = JSON.stringify({
						userId:userInfo.userId,
				});
				console.log(data)
//				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
//					
//					that.response = JSON.parse(response.body.state)[0];	
//					console.log(that.response);
//					
//					this.birthDate = that.response.birthDate;
//					
//					if (localStorage.saveCode) {
//							let datas = JSON.parse(localStorage.getItem("saveCode"))
//							this.trueName = datas.trueName;
//							this.idCode = datas.idCode;
//							this.address = datas.address;
//					}else{
//						this.trueName = that.response.name;//真实姓名
//						this.idCode = that.response.iscertNo//身份证号
//						this.address = that.response.registeredAddress;//地址
//					}
//					
//					
////					console.log(that.Detailed_address + that.brand_address);
////					this.addressNew = that.response.address;
//					if(that.Detailed_address != undefined){
//						this.addressNew = that.Detailed_address + that.brand_address;//现居住地
//					}else{
//						this.addressNew = that.response.address;
//					}
//					if(that.response.certNoFile != null){						
//						this.imgsZ = that.response.certNoFile;//身份证正面
//					}
//					if(that.response.certNoSideFile != null){
//						this.imgsF = that.response.certNoSideFile;//身份证背面	
//					}
//					this.canvasImg = that.response.userSignImg
//					
//					console.log(this.mobile)
//					this.mobile = that.response.identifyMobile;//电话	
//					
//					
//				})
				
				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111140, jsonValue:data},{emulateJSON:true}).then(response =>{
					console.log(response.body.returnMap);
					this.isAuth = response.body.returnMap.isAuth;
					if (localStorage.saveCode) {
							let datas = JSON.parse(localStorage.getItem("saveCode"))
							this.trueName = datas.trueName;
							this.idCode = datas.idCode;
							this.address = datas.address;
					}else{
						this.trueName = response.body.returnMap.name;//真实姓名
						this.idCode = response.body.returnMap.certNo//身份证号
						this.address = response.body.returnMap.registeredAddress;//地址
					}
				
					console.log(that.Detailed_address + that.brand_address);
					
					
					if(that.Detailed_address != undefined){
						this.addressNew = that.Detailed_address + that.brand_address;//现居住地
					}else{
						this.addressNew =response.body.returnMap.address;
					}
					if(response.body.returnMap.certNoFile != null){						
						this.imgsZ = response.body.returnMap.certNoFile;//身份证正面
					}
					if(response.body.returnMap.certNoSideFile != null){
						this.imgsF = response.body.returnMap.certNoSideFile;//身份证背面	
					}
//					this.canvasImg = response.body.returnMap.userSignImg
					
					console.log(this.mobile)
					this.mobile = response.body.returnMap.mobile;//电话	
					
					
				})
				
	
			},
			//签名
			autograph(){
				console.log("出现");
				this.isShow = true;
				this.isHides = true;
 			},
			
			//签名vue传过来的img
			isBtn1(data) {
				console.log(data)
				this.isShow = false;
				setTimeout(() => {
					this.canvasImg = sessionStorage.canvasImg;
				}, 1)
			},
			
			//添加图片转为
			 add_imgZ (){	 	    
	 	  	  	let reader = new FileReader()
				this.img1 = this.$refs.fileZ.files[0];
				reader.readAsDataURL(this.img1);
				let that = this;
				reader.onloadend = function () {
			        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
			        that.imgsZ = reader.result;
			        that.imgFile.push(reader.result)
			   	};
                
                
	 	  	},
	 	  	
	 	  	add_imgF (){	 	    
	 	  	   let reader = new FileReader()
				this.img2 = this.$refs.fileF.files[0];
				reader.readAsDataURL(this.img2);
				let that = this;
				reader.onloadend = function () {
			        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
			        that.imgsF = reader.result;
			        that.imgFile.push(reader.result)
			    };
	 	  	},
	 	  	removeicdF(){
	 	  		
	 	  		this.img1 = "";
	 	  		this.imgsZ = '';
	 	  	},
	 	  	removeicdB(){
	 	  		
	 	  		this.img2 = "";
	 	  		this.imgsF = '';
	 	  	},
	 	  	
	 	  	getBlobBydataURI(dataURI,type) { 
			  var binary = atob(dataURI.split(',')[1]); 
			  var array = []; 
			  for(var i = 0; i < binary.length; i++) { 
			    array.push(binary.charCodeAt(i)); 
			  } 
			  return new Blob([new Uint8Array(array)], {type:type }); 
			} ,
	 	  	phoneChange(){
	 	  		this.signMask = true;	 	  		
				this.PerIngfor = true;
	 	  	},
	 	  	perMaskHide(){
	 	  		this.signMask = false;	 	  		
				this.PerIngfor = false;
	 	  	},

	 	  	timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isCalss = true;
							vm.codetxt = sec + "秒" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isCalss = false;
							vm.codetxt = '获取验证码';
						}
					}, i * 1000)
			    }			
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isErr ==  true){
                		this.isErr = false;
                	} 
                },3000);  
			},
			hideSignBtn(){//聚焦的时候隐藏签约
				this.see = false;
				
			},
			showSignBtn(){//离开的时候显示
				this.see = true;
			},
			clickCodePer() { //获取手机验证码时间
				
				let vm = this; 
				
				if( vm.perMobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(vm.perMobile)) ){
					vm.isErr = true;
					vm.errMsg = "请输入正确手机号";
					vm.clearStorage();
					vm.perMobile = ""

				}else {
					
					let data = JSON.stringify({
						'mobile':this.perMobile,
						'tableName':'WtBaseUserinfo'
					})	
					// 获取一次性token
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					
					// 判断手机号号码是否存在

					vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111144,jsonValue:data},{emulateJSON:true}).then( response => {

						
						if( response.body.state == "true" ){
							console.log(13.5)
							vm.isErr = true;
							vm.errMsg = "手机信息已存在";
							console.log(vm.isPopup)						
							vm.clearStorage();
						} else if( response.body.state == "false" ){
							let data = JSON.stringify({
								'mobile':this.perMobile
							})
							// 如果手机号码不存在，执行验证码
							vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:222203,jsonValue:data},{emulateJSON:true}).then( response => {
								console.log(response.body.state)
								if( response.body.state == 'err-01' ){
									vm.isErr = true;
									vm.errMsg = "电话为空";
									vm.clearStorage();
								}else if( response.body.state == 'err-02' ){
									vm.isErr = true;
									vm.errMsg = "验证码每天不得超过5条";
									vm.clearStorage();
								}else if( response.body.state == 'err-04' ){
									vm.isErr = true;
									vm.errMsg = "验证码发送间隔不小于1分钟";
									vm.clearStorage();
								}else {
									console.log(15)
									vm.timer();
									
								
								}
							})
						}	
					})
				}	
			},
//蒙版完善信息提交			
	 	  	subPerPhone(){
	 	  		let vm = this; 
	 	  		//手机号
	 	  		if(this.perMobile == ""){
	 	  			this.isErr = true
	 	  			this.errMsg = "请填写手机号码"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
	 	  		}
	 	  		//验证码	 	  		
	 	  		if(this.signPhoneCode == ""){
	 	  			this.isErr = true
	 	  			this.errMsg = "请填写验证码"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
	 	  		}
	 	  		//绑定手机号
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					"type":"mobile",
					'mobile':this.perMobile,
					"userId":userInfo.userId,
					"userInfoId":userInfo.userInfoId,
					"mobileCode":this.signPhoneCode,
					"verfiedType":"0"
				})
				//判断状态

				vm.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token,infoType:111120,jsonValue:data},{emulateJSON:true}).then( response => {	

					console.log(response) 
					let mobileState = JSON.parse(response.body.state).state;
					if(mobileState == "1"){
						this.isErr = true
		 	  			this.errMsg = "验证错误"
		 	  			setTimeout(() => {
		 	  				this.isErr = false;
		 	  			},2000)
		 	  			this.signPhoneCode = "";
		 	  			return false;
					}else if(mobileState == 2){
						this.isErr = true
		 	  			this.errMsg = "验证发送超时"
		 	  			setTimeout(() => {
		 	  				this.isErr = false;
		 	  			},2000)
		 	  			return false;					
					}else if(mobileState == "3"){
						this.isErr = true
		 	  			this.errMsg = "手机号已存在"
		 	  			setTimeout(() => {
		 	  				this.isErr = false;
		 	  			},2000)
		 	  			this.perMobile = "";
		 	  			return false;
						
					}else if(mobileState == "up_suc"){
						
						this.mobile = this.perMobile;
			 	  		this.signMask = false;	 	  		
						this.PerIngfor = false;
					}
					if(mobileState == "err"){
						this.isErr = true
		 	  			this.errMsg = "修改失败"
		 	  			setTimeout(() => {
		 	  				this.isErr = false;
		 	  			},2000)
		 	  			this.perMobile = "";
		 	  			this.signPhoneCode = "";
		 	  			return false;
						
					}
				})
	 	  	},
//确认提交
			makeSureSub (){
				localStorage.removeItem("saveCode");
				this.signMask = true;
				this.hitBox = true;
				
			},
//修改			
			changePerInf(){
				this.signMask = false;
				this.hitBox = false;
				
			},
			created(){		
						if (localStorage.saveCode) {
							let datas = JSON.parse(localStorage.getItem("saveCode"))
							this.trueName = datas.trueName;
							this.idCode = datas.idCode;
							this.address = datas.address;
//							this.brand_address = datas.brand_address;
						}
				},
//现居住地跳转
			addressJump(){
//				if(this.trueName != "" && this.isCode != ""){				
					let saveCode = JSON.stringify({
							trueName : this.trueName,
							idCode : this.idCode,
							address : this.address,
					})
					window.localStorage.setItem("saveCode",saveCode);
//				}
				this.$router.push({path : '/serverConfirm/newAddress',query:{ type:1 }});
			},
			backToIndex(){
				localStorage.removeItem("saveCode");
				let vData = this.$store.signInfo;
				if(this.addressNew == ""){
					this.$router.go(-1);
				}else{
					this.$router.go(-3);
				}
				
//				this.$router.push({
//						'path': '/doctor/signing',
//						query:{
//							familyContractTeamId:'46861027989555200100001'
//						}
//				})
			},
//最后提交	   	
	 	  	signUp (){
           		if(this.imgsZ == "" ){
           			this.isErr = true
	 	  			this.errMsg = "请上传身份证正面"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
           		}
           		
           		if(this.imgsF == "" ){
           			this.isErr = true
	 	  			this.errMsg = "请上传身份证反面"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
           		}
           		if(this.trueName == "" ){
           			this.isErr = true
	 	  			this.errMsg = "请填写真实姓名"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
           		}
           		
 //验证身份证号码          		
//         		if(this.idCode == "" || !(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.idCode))){
//         			console.log(this.idCode.length)
//         			 debugger;      			
//         			this.isErr = true
//	 	  			this.errMsg = "请填写身份证号码"
//	 	  			setTimeout(() => {
//	 	  				this.isErr = false;
//	 	  			},2000)
//	 	  			this.idCode = "";
//	 	  			return false;
//	 	  			
//	 	  			
//	 	  			
//         		}
           		if(	this.address == "" ){
           			this.isErr = true
	 	  			this.errMsg = "您的户籍地址"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
           		}
           		if(	this.addressNew == "" ){
           			this.isErr = true
	 	  			this.errMsg = "您的现居住地地址"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false;
           		}
				
	 	  	    //判断签名
	 	  	
	 	  		if(this.canvasImg == ""){
	 	  			this.isErr = true
	 	  			this.errMsg = "未签名"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false
	 	  		}
	 	  		if(this.mobile == ""){
	 	  			this.isErr = true
	 	  			this.errMsg = "请填写手机号码"
	 	  			setTimeout(() => {
	 	  				this.isErr = false;
	 	  			},2000)
	 	  			return false
	 	  		}
	 	  		this.signMask = false;
				this.hitBox = false;
				
	 	  		var a = this.getBlobBydataURI(sessionStorage.canvasImg, "image/jpeg");//拿到图片
	 	  		this.isLoading = true;//loading开始
	 	  		var userInfo =  JSON.parse(this.$cookie.get('userInfo'));
	 	  		let vData = this.$store.signInfo;
	 	  		console.log(vData);
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
					signatureOfPartyBDate : this.signDate,
					familyContractTeamId : vData.teamId,
					flag : 'user',
					eaId : vData.eaId,
					doctorId : vData.doctorId,
					proFkId : vData.proFkId,
					adCode : this.adCode,
					lat: this.lat,
					lon: this.lon,
					address:this.addressNew
				});	
				console.log(data);
				
				//上传信息
				let perData = JSON.stringify({
					userId : userId,
					name : this.trueName,
					certNo : this.idCode,
					address: this.address,
//					addressNew:this.addressNew
				});
				console.log(perData);
				//上传修改个人信息

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660208, jsonValue:perData},{emulateJSON:true}).then( response => {

				console.log(response.body.state )
					if(response.body.state == 'certficationd_illegal'){//身份证不合法
						this.sucMsg = "身份证不合法";
						this.isLoading = false;
						 this.isSuc = true;
						setTimeout(() => {
							this.isSuc = false;
							
						},2000)
						this.idCode = "";
						return false;
					}
					else
					if(response.body.state == 'certficationd_repeat'){//身份证已存在
						this.sucMsg = "身份证已存在";
						 this.isSuc = true;
						 this.isLoading = false;
						setTimeout(() => {
							this.isSuc = false;
							
						},2000)
						this.idCode = "";
						return false;
					}
					else
					if (response.body.state == 'certficationd_err'){ // 信息错误
						this.sucMsg = "身份证已存在";
						 this.isSuc = true;
						 this.isLoading = false;
						setTimeout(() => {
							this.isSuc = false;
							
						},2000)
						this.idCode = "";
						return false;
					}
					else
					if(response.body.state == 'certficationd_suc'){
						console.log(1123)
				//传签约信息	

					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660201, jsonValue:data},{emulateJSON:true}).then( response => {

					let ctpid = response.body.contractTeamProtocolId;
					console.log(response.body.contractTeamProtocolId);
						let dataState = response.body.state;
						if(dataState == 'suc' || dataState == 'add_suc'){
								//上传正面
							console.log(this.canvasImg)
							const formData = new FormData()
		                    formData.append('picArrayFile', this.img1)
		                    formData.append('userId', userInfo.userId)
		                    formData.append('eaId', userInfo.eaId)
		                    formData.append('userCode', userInfo.userCode)
		                    formData.append('type', 'card1')
		                    formData.append('moduletypeId', userInfo.userId)
			                const xhr = new XMLHttpRequest()
	//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
			                xhr.open('POST', '/webapiProxy/webapi/picAppUpload.action', true)
			                xhr.send(formData)
			                xhr.onload = () => {
			                	console.log(xhr)
				                    this.uploading = false
				                    if (xhr.status === 200 || xhr.status === 304) {
//				                    	alert(1);
				                        this.status = 'finished'
				                        console.log('upload success!')
				                    } else {
				                        console.log(`error：error code ${xhr.status}`)
				                    }
			                }
				                //上传反面
				                const formData2 = new FormData()
			                    formData2.append('picArrayFile', this.img2)
			                    formData2.append('userId', userInfo.userId)
			                    formData2.append('eaId', userInfo.eaId)
			                    formData2.append('userCode', userInfo.userCode)
			                    formData2.append('type', 'card2')
			                    formData2.append('moduletypeId', userInfo.userId)
				                const xhr2 = new XMLHttpRequest()
	//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
				                xhr2.open('POST', '/webapiProxy/webapi/picAppUpload.action', true)
				                this.uploading = true
				                xhr2.send(formData2)
				                xhr2.onload = () => {
				                    this.uploading = false
				                    if (xhr2.status === 200 || xhr2.status === 304) {
				                        this.status = 'finished'
				                        console.log('upload success!')
//				                        this.isSuc = true
//										this.sucMsg = "提交申请成功"
//										setTimeout(() => {
//											this.isSuc = false
//										},2000)
										//签约成功跳转页面		
//				                        setTimeout(() => {
											//this.$router.push({path : '/doctor/doctorAuthorized?docuserId=' + vData.doctorId});
//										},2500)
				                    } else {
				                        console.log(`error：error code ${xhr2.status}`)
				                    }
				                }
				                //上传签名
				                const formData3 = new FormData()
			                    formData3.append('picArrayFile',a)
			                    formData3.append('userId', userInfo.userId)
			                    formData3.append('eaId', userInfo.eaId)
			                    formData3.append('userCode', userInfo.userCode)
			                    formData3.append('type', 'userFont')
			                    formData3.append('moduletypeId', ctpid)
				                const xhr3 = new XMLHttpRequest()
	//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
				                xhr3.open('POST', '/webapiProxy/webapi/picAppUpload.action', true)
				                this.uploading = true
				                xhr3.send(formData3)
				                xhr3.onload = () => {
				                    this.uploading = false
				                    if (xhr3.status === 200 || xhr3.status === 304) {
				                        this.status = 'finished'
				                        console.log('upload success!')
				                        this.isSuc = true
										this.sucMsg = "提交申请成功"
										setTimeout(() => {
											this.isSuc = false;
											this.isLoading = false;
										},2000)
										//签约成功跳转页面		
				                        setTimeout(() => {
											this.$router.push({path : '/doctor/doctorAuthorized?docuserId=' + vData.doctorId});
										},2500)
				                    } else {
				                        console.log(`error：error code ${xhr3.status}`)
				                    }
				                    console.log(sessionStorage.canvasFile)
				                }
							}
						})
					}
				})
				
	 	  	},
	 	  	
		},
		
		
		
		
		
		
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){
					//标题顶部没有下载
					this.closeImgTop = 2.8+'rem';
				}else {
					//标题顶部有下载
					this.closeImgTop =4.2+'rem';
				}
			this.initData();
			this.created();
		}
	}
	
</script>

<style>
	
	.one_box{
		/*height: 0.84rem;*/
		width: 100%;
		background: #FFF;
		/*text-align: center;*/
		/*line-height: 0.84rem;*/
		/*font-size: 0.3rem;*/
		color: #666;
		padding: 0.1rem 0.3rem;
	}
	.one_box span:first-of-type{
		text-decoration:underline;
		color: #333;
	}
	.one_box span{
		color: #333;
	}
	
	.two_box{
		height: .86rem;
		background: #eee;
		width: 100%;
		line-height: 0.86rem;
		font-size: 0.32rem;
	}
	.two_box p{
		width: 94%;
		margin:  0  auto;
		color: #666;
	}
	.three_box{
		height: .86rem;
		background: #eee;
		width: 100%;
		line-height: 0.86rem;
		font-size: 0.32rem;
		text-align: center;
	}
	.three_box p{
		width: 94%;
		margin:  0  auto;
		color: #666;
	}
	.three_box p span{
		color: #009983;
	}
	
	.up_img{
		width: 94%;
		margin: 0 auto;
		height: 2.5rem;
		margin-top: 0.25rem;
	}
	.up_img li{
		float: left;
		width: 48%;
		height: 100%;
		background: url(../../assets/image/doctor/upload_identity.png) no-repeat;
		background-position: center 30%;
		background-size: 30%;
		text-align: center;
		border-radius: 10px;
		border: 1px solid #666;
		
	}
	.up_img li:last-of-type{
		float: right;
	}
	.up_img li input{
		width:100%;
		height: 100%;
		opacity: 0;
	}
	.up_img li span{
		position:relative;
		top: -30%;
		font-size: .28rem;
		color: #666;
	}
	.up_img li img{
		width: 100%;
		height: 100%;
		
	}
	/*input框*/
	.input_ul{
		margin-top:0.25rem;
		
	}
	.input_ul li{
		width: 100%;
		border-top: 1px solid #eee;
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.3rem;
		color: #666;
	}
	.input_ul li div{
		width: 94%;
		margin:  0 auto;
		height: 100%;
	}
	.input_ul li div input{
		width: 75%;
		margin-left: 5%
	}
	.input_ul li div input::-webkit-input-placeholder{
		color: #999;
	}
	/*立即签约按钮*/
	.formBtn{
		height: 0.84rem;
		background: #009983;
		width: 100%;
		color: #fff;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.84rem;
	}
	.formBox{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	/*签名图片*/
	.canvasImg{
		width: 19%;
		margin-left: 5%;
	}
	
	.doctor-sign-top{
		
		width: 90%;
		margin: 0 auto;
		height: 2.7rem;
		background: #fff;
		border-bottom: 0.04rem solid #f4f4f4;
	}
	.doctor-sign-top .doctor-sign-topText {
		word-break: break-all;
		line-height: 0.35rem;
		font-size: 0.24rem;
		padding-left: 0.1rem;
		color: #2e2e2e;
		padding-top: 0.7rem;
	}
	.doctor-sign-top .doctor-sign-topText span{
		color: #000;
		text-decoration: underline;
		font-weight: bold;
	}
	.doctor-sign-top .doctor-sign-topText i{
		color: #000;
		font-style: normal;
		font-weight: bold;
	}
	
	.doctor-sign-contentA{
		padding: 1.06rem 0 0.66rem 0.44rem;
		font-size: 0.24rem;
		color: #000;
	}
	.sign-contentA{
		width: 1.46rem;
		text-align: left;
	}
	.sign-contentA span{
		display: inline-block;
		width: 0.68rem;
	}
	.sign-contentA-value{
		font-size: 0.27rem;
		color: #000;
		font-weight: bold;
	}
	.doctor-sign-contentB{
		padding: 0.3rem 0 0.35rem 0.44rem;
		line-height: 0.6rem;
	}
	.sign-contentB{
		font-size: 0.24rem;
		color: #000;
		width: 1.46rem;
		letter-spacing: 0.02rem;
		text-align: left;
	}
	.sign-contentB-value{
		display: block;
		border: 0 none;
		outline: none;
		height: 0.6rem;
		line-height: 0.6rem;
		width: 70%;
		border-bottom: 0.02rem solid #f0f0f0;
		font-size: 0.24rem;
	}
	.sign-contentB-value img{
		display: block;
		width: 19%;
		height: 100%;
		border: 0 none;
	}
	.sign-mobile-content{
		padding: 0.3rem 0 0.3rem 0.44rem;
		line-height: 0.78rem;
	}
	.sign-mobile{
		font-size: 0.24rem;
		color: #000;
		width: 1.46rem;
		letter-spacing: 0.05rem;
		text-align: left;
	}
	.sign-mobile-value{
		width: 70%;
		height: 0.77rem;
		border-bottom: 0.02rem solid #f0f0f0;
		font-size: 0.24rem;
	}
	
	.sign-content-left{
		float: left;
	}
	.sign-content-right{
		margin-left: 0.15rem;
		letter-spacing: 0.02rem;
		float: left;
	}
	
	.sign-date-content{
		padding: 0.3rem 0 0.3rem 0.44rem;
		line-height: 0.78rem;
	}
	.sign-date{
		font-size: 0.24rem;
		color: #000;
		width: 1.46rem;
		letter-spacing: 0.05rem;
		text-align: left;
	}
	.sign-date-value{
		width: 70%;
		height: 0.77rem;
		border-bottom: 0.02rem solid #f0f0f0;
		font-size: 0.24rem;
	}
	.submit_info{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 0.76rem;
		background: #009985;
		
	}
	.submit_info a{
		display: block;
		width: 100%;
		height: 100%;
		line-height: 0.76rem;
		color: #fff;
		font-size: 0.22rem;
		text-align: center;
	}
	#idCard_spanF{
		width: 0.5rem;
	    height: 0.5rem;
	    position: absolute;
	    top: 3rem;
	    right: 3.9rem;
	}
	#idCard_spanF img{
		width: 0.5rem;
	    height: 0.5rem;
	   
	}
	#idCard_spanB{
		width: 0.5rem;
	    height: 0.5rem;
	    position: absolute;
	    top: 3rem;
	    right: 0.2rem;
	}
	#idCard_spanB img{
		width: 0.5rem;
	    height: 0.5rem;
	   
	}
	.load{
		background: #fff !important;
		height: 100% !important;
		width: 100%;
		z-index: 1;
	}
	.signMask{
		position: fixed;
		width: 100%;
		height: 100%;
		margin-top: 11.2%;
		background:#000000 ;
		opacity: 0.5;
		z-index: 9;
	}
	.thisPerIngfor{
		position: fixed;
		width: 94%;
		height: 5rem;
		background: #FFF;
		margin-top: 3.2rem;
		margin-left: 3%;
		border-radius: 6px;
		z-index: 10;
	}
	.closePerBtn{
		position: absolute;
	    width: 0.6rem;
	    height: 0.6rem;
	    right: 0;
	}
	.perTitle{
		width: 80%;
		padding-bottom: 0.2rem;
		margin-left: 10%;
		margin-top: 0.3rem;
		text-align: center;
		font-size: 0.32rem;
		color: #666;
		border-bottom: 2px solid #999;
	}
	.singMaskPhone{
		width: 80%;
		height: 1rem;
		line-height: 1rem;
		margin-left: 10%;
		border-bottom: 1px solid #999;
	}
	.singMaskPhone input{
		width: 40%;
		margin-left: 5%;
	}
	.singCheckCode{
		width: 80%;
		height: 1rem;
		line-height: 1rem;
		margin-left: 10%;
		border-bottom: 1px solid #999;
	}
	.singCheckCode input{
		width: 40%;
		margin-left: 10%;
	}
	.singCheckCode span{
		border-left: 1px solid rgb(153,153,153);
		padding-left: 0.4rem;
	}
	.subPerPhone{
		width: 80%;	
		height: 1rem;
		background: #009983;
		line-height: 1rem;
		margin-left: 10%;
		text-align: center;
		border-radius: 6px;
		color: #fff;
		margin-top: 0.5rem;
		
	}
	.hitBox{
		position: absolute;
		width: 80%;
		height: 3rem;
		background: #fff;
		border-radius: 6px;
		margin-top: 4rem;
		left: 10%;
		z-index: 10;
	}
	.hitTitle{
		text-align: center;
		font-size: 0.38rem;
		margin-top: 0.24rem;
	}
	.changeOrSign{
		width: 100%;
		height:1rem;
		margin-top: 0.4rem;
		border-top: 1px solid #999;
		clear: both;
		
	}
	.changBtn{
		width: 50%;
		line-height: 1rem;
		text-align: center;
		border-right: 1px solid #999;
		float: left;
		font-size: 0.34rem;
		color: #00B0FF;
	}
	.sigBtn{
		width: 50%;
		line-height: 1rem;
		text-align: center;
		float: right;
		font-size: 0.34rem;
		color: #00B0FF;
	}
	
</style>