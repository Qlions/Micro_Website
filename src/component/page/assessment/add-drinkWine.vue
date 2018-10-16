<!-- 健康监测-》饮酒监测组件 -->
<template>
	<div class="record-data">
		<Heads :title="titleName"></Heads>
		<div class="record-data-form">
			<modelTime :date="dates" :time="time"></modelTime>
			<div class="record-data-form-list">
				<ul class="input-box">
					<li>
						<label for="">
							<span>白酒：</span>
							<div class="reg-int">
								<input type="number" placeholder="请输入白酒值" v-model="liquor">
								<i>两</i>
							</div>
						</label>
					</li>
					<li>
						<label for="">
							<span>啤酒：</span>
							<div class="reg-int">
								<input type="number" placeholder="请输入啤酒值" v-model="beer">
								<i>两</i>
							</div>
						</label>
					</li>
					<li>
						<label for="">
							<span>红酒：</span>
							<div class="reg-int">
								<input type="number" placeholder="请输入红酒值" v-model="redWine">
								<i>两</i>
							</div>
						</label>
					</li>
					<li>
						<label for="">
							<span>黄酒：</span>
							<div class="reg-int">
								<input type="number" placeholder="请输入黄酒值" v-model="yellowWine">
								<i>两</i>
							</div>
						</label>
					</li>
				</ul>
			</div>
			<presBtn @click.native="preservation"></presBtn>  
		</div>
		<popup :message="message" v-show="show"></popup>
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
				liquor:'',
				beer:'',
				redWine:'',
				yellowWine:'',
				dates:'',
				time:'',
				valueTxt:'',
				titleName:"饮酒监测",
				message:"",
				show:false,
				isLading:false,
				id: this.$route.query.id,
				title: this.$route.query.title,
				diccode: this.$route.query.dicCode,
				measureTime: this.$route.query.measureTime,
				valueNumber: this.$route.query.valueNumber,
				type: this.$route.query.type,
				infoId: this.$route.query.infoId
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
			inptUpdate (){
				if( this.type == 2 ){
					let date = this.measureTime;
					let val = this.valueNumber.split(',');
					let valNull = val[0].split(';');
					this.liquor = valNull[1];
					this.beer = val[1];
					this.redWine = val[2];
					this.yellowWine = val[3];
					this.dates = date.slice(0,10);
					this.time = date.slice(11,16);
				}else {
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
					let dateVal = Y + '-' + m + '-' + d;
					let timeVal = H + ':' + i;
					this.dates = dateVal;
					this.time = timeVal;
				}
			},
			// ajax方法
			initAjax (data) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				if( this.liquor > 50 || this.beer > 50 || this.redWine > 50 || this.yellowWine > 50){
					this.isLading = false;
					this.valueTxt = '';
					this.show = true;
					this.message = '数值范围应在0~50之间。';
					this.clearStorage();
				}else if( this.liquor%1 !== 0){
					if(this.liquor.toString().split(".")[1].length > 1 ){
						this.isLading = false;
						this.show = true;
						this.message = '数值范围小数点最多保留1位数';
						this.clearStorage();
					}else{
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111604, 
							jsonValue:data 
						},{emulateJSON:true})
						.then(response => {
							this.isLading = false;
							sessionStorage.removeItem('date');
							sessionStorage.removeItem('time');
							this.$router.back(-1);
						})
					}	
				}else if( this.beer%1 !== 0){
					if(this.beer.toString().split(".")[1].length > 1 ){
						this.isLading = false;
						this.show = true;
						this.message = '数值范围小数点最多保留1位数';
						this.clearStorage();
					}else{
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111604, 
							jsonValue:data 
						},{emulateJSON:true})
						.then(response => {
							this.isLading = false;
							sessionStorage.removeItem('date');
							sessionStorage.removeItem('time');
							this.$router.back(-1);
						})
					}	
				}else if( this.redWine%1 !== 0){
					if(this.redWine.toString().split(".")[1].length > 1 ){
						this.isLading = false;
						this.show = true;
						this.message = '数值范围小数点最多保留1位数';
						this.clearStorage();
					}else{
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111604, 
							jsonValue:data 
						},{emulateJSON:true})
						.then(response => {
							this.isLading = false;
							sessionStorage.removeItem('date');
							sessionStorage.removeItem('time');
							this.$router.back(-1);
						})
					}	
				}else if( this.yellowWine%1 !== 0){
					if(this.yellowWine.toString().split(".")[1].length > 1 ){
						this.isLading = false;
						this.show = true;
						this.message = '数值范围小数点最多保留1位数';
						this.clearStorage();
					}else{
						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:111604, 
							jsonValue:data 
						},{emulateJSON:true})
						.then(response => {
							this.isLading = false;
							sessionStorage.removeItem('date');
							sessionStorage.removeItem('time');
							this.$router.back(-1);
						})
					}	
				}else {
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
						token:token, 
						infoType:111604, 
						jsonValue:data 
					},{emulateJSON:true})
					.then(response => {
						this.isLading = false;
						sessionStorage.removeItem('date');
						sessionStorage.removeItem('time');
						this.$router.back(-1);
					},response => {
						this.message = '数值范围应在0~50之间。';
					})
				}
			},
			preservation () { //提交记录
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;

				let liquor = parseFloat(this.liquor).toFixed(1); 
				let Numliquors = parseFloat(liquor)
				
				let beer = parseFloat(this.beer).toFixed(1); 
				let Numbeer = parseFloat(beer)

				let redWine = parseFloat(this.redWine).toFixed(1); 
				let NumredWine = parseFloat(redWine)

				let yellowWine = parseFloat(this.yellowWine).toFixed(1); 
				let NumyellowWine = parseFloat(yellowWine)
				
				if( this.liquor == '' ){
					Numliquors = 0;
				}
				if(this.beer == ''){
					Numbeer = 0;
				}
				if(this.redWine == ''){
					NumredWine = 0;
				}
				if(this.yellowWine == ''){
					NumyellowWine = 0;
				}
				let val = Numliquors + Numbeer + NumredWine + NumyellowWine;

				let freq = Numliquors+','+Numbeer+','+NumredWine+','+NumyellowWine;
				
				if( this.type == 2 ){
					let modifyDateVal = sessionStorage.getItem('modifyDateVal');
					let diccode = this.diccode.split(',');
					let data = JSON.stringify({
						'value':val,
						'freq':freq,
						'type':this.type,
						'messTime':modifyDateVal,
						'infoId':this.infoId,
						'dicCode':10767,
						'userId':userId,
						'source':3
					});
					this.isLading = true;	
					this.initAjax(data);
				}else {
					let diccode = this.diccode.split(',');
					let yearVal = sessionStorage.getItem('date'); // 年与日
					let timeVal = sessionStorage.getItem('time'); // 时间
					let messTime = yearVal+' '+timeVal+':'+'00';
					/*let thisYearVal = Date.parse(this.dates); // 当前年月份
					let thisTimeVal = Date.parse('2008/08/08 '+this.time);  // 当前时间
					let onYearVal = Date.parse(yearVal);      // 选中年月份
					let onTimeVal = Date.parse('2008/08/08 '+timeVal);   // 选中时间*/
					let onyearVal = yearVal.replace(/-/g,'/');
					let onmessTime = onyearVal+' '+timeVal+':'+'00';
					let thisStamp = Date.parse(new Date()); // 当前时间
					let onStamp = Date.parse(onmessTime); // 选中年月日时分
					let data = JSON.stringify({
						'value':val,
						'freq':freq,
						'type':this.type,
						'messTime':messTime,
						'source':3,
						'dicCode':10767,
						'infoId':this.infoId,
						'userId':userId
					})	
					if( onStamp > thisStamp ){
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
			}
		},
		created (){
			this.inptUpdate();
			
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
	.record-data-form-list {
		border-bottom:1px solid #f0f0f0;
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
	.input-box li:last-child {
		border-bottom: none;
	}
	.record-data-form-list ul li span {
		color: #666;
		font-size: .32rem;
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
		font-size: 16px;
	}
</style>