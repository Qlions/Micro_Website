<!-- 健康监测-》膳食组件 -->
<template>
	<div class="record-data">
		<Heads :title="titleName"></Heads>
		<div class="record-data-form">
			<modelTime :date="dates" :time="time"></modelTime>
			<div class="record-data-form-list">
				<ul class="input-box">
					<li>
						<label for="">
							<span>膳食：</span>
							<div class="reg-int">
								<input type="number" readonly="readonly" :placeholder="placeholder" @click="addRecordBtn">
							</div>
						</label>
					</li>
				</ul>
			</div>
			<div class="diet-content">
				<ul>
					<li v-for="(item,index) in this.listArr">
						<p class="diet-name" @click="modality(item.foodName,item.intakeNum,item.foodCode)">{{ item.foodName }}</p>
						<p class="diet-unit">{{ item.intakeNum }}<b>克</b><i class="diet-remove" @click="remove(index)"></i></p>	
					</li>
				</ul>
			</div>
			<presBtn @click.native="preservation"></presBtn> 
		</div>
		<popup :message="message" v-show="show"></popup>
		<div class="diet-modality" v-show="isModality">
			<div class="diet-modality-form">
				<div class="modality-content">
					<label for="">
						<span>{{ inerHTML }}</span>
						<div class="modality-content-input">
							<input type="text" value="50" v-model="newValueTxt">
							<b>g</b>
						</div>		
					</label>
				</div>
				<div class="modality-btn">
					<a href="javascript:void(0)" @click="cancel">取消</a>
					<a href="javascript:void(0)" @click="commit(inerHTML,newValueTxt,foodCode)">确定</a>
				</div>
			</div>
		</div>
		<loading v-if="isLading"></loading>
	</div>
</template>
<script>
	// 组件
	import Heads from '../../common/head.vue'
	import modelTime from '../../common/model-time.vue'
	import popup from '../../common/error-popup.vue'
	import presBtn from '../../common/preservation-btn.vue'
	import loading from '../../common/loading.vue'
	export default {
		data(){
			return {
				dates:'',
				time:'',
				newValueTxt:"",
				titleName:"膳食",
				message:"",
				inerHTML:"", // 膳食名称
				foodCode:"", // 膳食ID
				state:'', //修改默认值 
				isModality:false, // 输入尺度的
				imgIndex:"", // 图片
				listArr:"", // 空数组
				placeholder:'请添加膳食',
				show:false,
				isLading:false,
				id: this.$route.query.id,
				title: this.$route.query.title,
				diccode: this.$route.query.dicCode,
				measureTime: this.$route.query.measureTime,
				valueNumber: this.$route.query.valueNumber,
				type: this.$route.query.type,
				nurinfoId: this.$route.query.nurinfoId,
				newDateVal:"",
				newTimeVal:""
			}
		},
		components:{
			Heads,
			popup,
			modelTime,
			presBtn,
			loading
		},
		methods:{
			// 判断是否添加还是修改默认年限
			inptUpdate (){ // input默认时间
				let date = new Date();
				let	Y = date.getFullYear();
				let	m = date.getMonth() + 1;
				let	d = date.getDate();
				let	H = date.getHours();
				let	i = date.getMinutes();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				if (H < 10) {
					H = '0' + H;
				}
				if (i < 10) {
					i = '0' + i;
				}
				this.newDateVal = Y + '-' + m + '-' + d;
				this.newTimeVal = H + ':' + i;
				if( this.type == 2 ){
					let date = this.measureTime;
					this.dates = date.slice(0,10);
					this.time = date.slice(11,16);
					this.placeholder = '已添加膳食'
				}else {
					if( localStorage.date == '' && localStorage.time == '' ){
						this.dates = this.newDateVal;
						this.time = this.newTimeVal;
					}else {
						if( localStorage.date == '' ){
							this.dates = this.newDateVal;
						}else {
							this.dates =  localStorage.date;
						}
						if( localStorage.time == '' ){
							this.time = this.newTimeVal;
						}else {
							this.time =  localStorage.time;
						}		
					}
				}	
			},
			// ajax方法
			initAjax (data) {  //ajax函数
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111607, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					this.isLading = false;
					sessionStorage.removeItem('date');
					sessionStorage.removeItem('time');
					this.$router.back(-1);
				})
			},
			getDefault () { // 修改默认值
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'infoId':this.nurinfoId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111608, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					this.state = response.body;
					let setArr = this.$store.state.listArr;
					setArr.push.apply(setArr,this.state);
					if( setArr.length == 1 ){
						this.listArr = setArr;
					}else {
						var hash = {};
						setArr = setArr.reduce(function(item, next) {
							hash[next.foodName] ? '' : hash[next.foodName] = true && item.push(next);
							return item
						}, []);
						this.listArr = setArr;
					}
						
				})
			},
			preservation () { //提交记录
				if( this.type == 2 ){
					let modifyDateVal = this.measureTime.replace('T','');
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let userId = userInfo.userId;
					let strData = "";
					for (var i = 0; i < this.listArr.length; i++) {
						let val = this.listArr[i].intakeNum;
						let id = this.listArr[i].foodCode;
						strData += id+':'+val+';';
					}
					let data = JSON.stringify({
						'value':strData,
						'type':this.type,
						'source':3,
						'messTime':modifyDateVal,
						'infoId':this.nurinfoId,
						'dicCode':this.diccode,
						'userId':userId
					});
					if( strData == ''){
						this.message = '请添加膳食';
						this.show = true;
						this.clearStorage();
					}else {
						this.isLading = true;
						this.initAjax(data);
					}
				}else {
					let diccode = this.diccode.split(',');
					let strData = "";
					let yearVal = sessionStorage.getItem('date'); // 年与日
					let timeVal = sessionStorage.getItem('time'); // 时间
					//let messTime = yearVal+' '+timeVal+':'+'00';
					let localyearVal = localStorage.getItem('date'); // 年与日
					let localtimeVal = localStorage.getItem('time'); // 时间
					//let thisYearVal = Date.parse(this.dates); // 当前年月份
					//let thisTimeVal = Date.parse('2008/08/08 '+this.time);  // 当前时间
					//let onYearVal = Date.parse(yearVal);      // 选中年月份
					//let onTimeVal = Date.parse('2008/08/08 '+timeVal);   // 选中时间
					let messTime,onmessTime;
					if( localStorage.date == '' && localStorage.time == '' ){
						messTime = this.newDateVal+' '+this.newTimeVal+':'+'00';
						let onyearVal = this.newDateVal.replace(/-/g,'/');
						onmessTime = onyearVal+' '+this.newTimeVal+':'+'00';
					}else if( localyearVal == '' ){
						messTime = this.newDateVal+' '+localtimeVal+':'+'00';
						let onyearVal = this.newDateVal.replace(/-/g,'/');
						onmessTime = onyearVal+' '+localtimeVal+':'+'00';
					}else if( localtimeVal == '' ){
						let onyearVal = localyearVal.replace(/-/g,'/');
						onmessTime = onyearVal+' '+this.newTimeVal+':'+'00';
						messTime = localyearVal+' '+this.newTimeVal+':'+'00';
					}else {
						let onyearVal = localyearVal.replace(/-/g,'/');
						onmessTime = onyearVal+' '+localtimeVal+':'+'00';
						messTime = localyearVal+' '+localtimeVal+':'+'00';
						/*else {
							
						}
						if( localtimeVal == '' ){
							
						}else {

							let onyearVal = localyearVal.replace(/-/g,'/');
							onmessTime = onyearVal+' '+localtimeVal+':'+'00';
							messTime = this.newDateVal+' '+localtimeVal+':'+'00';
							console.log(messTime)
						}*/		
					}
					let thisStamp = Date.parse(new Date()); // 当前时间
					let onStamp = Date.parse(onmessTime); // 选中年月日时分
					console.log(onmessTime)
					for (var i = 0; i < this.$store.state.listArr.length; i++) {
						let val = this.$store.state.listArr[i].intakeNum;
						let id = this.$store.state.listArr[i].foodCode;
						strData += id+':'+val+';';
					}
					let data = JSON.stringify({
						'value':strData,
						'type':this.type,
						'messTime':messTime,
						'source':3,
						'dicCode':this.diccode,
						'infoId':this.infoId
					});
					if( strData == ''){
						this.message = '请添加膳食';
						this.show = true;
						this.clearStorage();
					}else if( onStamp > thisStamp ){
						this.show = true;
						this.message = '请输入正确的时间';
						this.clearStorage();
					}else {
						this.isLading = true;
						this.initAjax(data);
					}
				}		
			},
			clearStorage:function(){
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },3000);  
			},
			addRecordBtn () {
				this.$router.push({ name: 'deitClass',query: { classA:111609,classB:111611 } })
			},
			remove (index) {
				this.$store.state.listArr.splice(index, 1);
				this.listArr.splice(index, 1);
			},
			modality (name,val,code) {
				this.isModality = true;
				this.inerHTML = name;
				this.foodCode = code;
				this.newValueTxt = val;
			},
			cancel () {
				this.isModality = false;
			},
			commit (name,val,id) {
				let replacement = {
					foodName:name,
					foodCode:id,
					intakeNum:val
				}
				for (let i = 0, len = this.$store.state.listArr.length; i < len; i++) {
				    if ( this.$store.state.listArr[i].foodCode === replacement.foodCode ) {
				        this.$store.state.listArr[i] = replacement;
				    }
				}
				this.listArr = this.$store.state.listArr;
				this.isModality = false;
			}
		},
		mounted (){
			this.inptUpdate();
			this.getDefault();
		} 
	}
</script>
<style>
	.record-data {
		padding-top: .84rem;
	}
	.record-data-form h2 {
		font-size: 16px;
		padding: 0.25rem 0;
		color: #333;
		margin-left: 0.25rem;
	}
	.record-data-form-list ul {
		width: 90%;
		margin: 0 auto;
	}
	.record-data-form-list ul li {
		width: 100%;
		border-bottom:1px solid #f0f0f0;
		padding: 0.25rem 0;
		float: left;
	}
	.record-data-form-list ul li span {
		color: #333;
		font-size: 0.32rem;
		float: left;
	}
	.record-data-form-list .reg-int {
		float: right;
		font-size: 0.32rem;
	}
	.record-data-form-list .reg-int input {
		float: left;
		text-align: right;
		padding-right: 0.125rem;
	}
	.record-data-form-list .reg-int i {
		color: #999;
	}
	.record-data-form-btn a {
		display: block;
		width: 90%;
		height: 0.8rem;
		margin: 0.5rem auto;
		text-align: center;	
		line-height: 0.8rem;
		background: #009983;
		color: #fff;
		border-radius: 0.125rem;
		-moz-border-radius: 0.125rem;
		-webkit-border-radius: 0.125rem;
		font-size: 0.4rem;
	}
	.diet-modality {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.34);
		top: 0;
		bottom: 0;
		z-index: 9;
	}
	.diet-modality-form {
		width: 100%;
		height: 2.5rem;
		background: #fff;
		position: absolute;
		bottom: 0;
	}
	.diet-content {
		width: 90%;
		margin: 0 auto;
	}
	.diet-content ul li {
		overflow: hidden;
		padding-bottom: 0.2rem;	
		padding-top: 0.2rem;	
	}
	.diet-content ul li:first-child {
		padding-top: 0.2rem;
	}
	.diet-content ul li p {
		float: left;
		font-size: 0.3rem;
		color: #333;
	}
	.diet-content i {
		width: 0.33rem;
		height: 0.33rem;
		background: url(../../../assets/image/mon_del.png) no-repeat center right 0.08rem;
		background-size: 0.35rem;
		padding-right: 0.5rem;
	}
	.diet-content ul li p.diet-unit {
		float: right;
	}
	.modality-content {
		padding: 0.15rem;
		font-size: 0.35rem;
		border-bottom: 1px solid #f0f0f0;
	}
	.modality-content img {
		width: .9rem;
		height: .9rem;
		float: left;
	}
	.modality-content span {
		line-height: .9rem;
		margin-left: 0.25rem;
	}
	.modality-content-input {
		float: right;
		margin-top: 0.18rem;
	}
	.modality-content input {
		text-align: right;
		width: 2rem;
	}
	.modality-btn {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.modality-btn a {
		display: block;
		width: 50%;
		float: left;
		background: #009983;
		text-align: center;
		color: #fff;
		font-size: 14px;
		padding: 0.25rem 0;
	}
</style>