<!-- 健康监测-》请添加体重监测组件 -->
<template>
	<div class="record-data">
		<Heads :title="titleName"></Heads>
		<div class="record-data-form">
			<modelTime :date="dates" :time="time"></modelTime>
			<div class="record-data-form-list">
				<ul class="input-box">
					<li>
						<label for="">
							<span>体重：</span>
							<div class="reg-int">
								<input type="number" placeholder="请输入体重指" v-model="valueTxt">
								<i>kg</i>
							</div>
						</label>
					</li>
				</ul>
			</div>
			<presBtn v-on:click.native="preservation"></presBtn> 
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
				dates:'',
				time:'',
				valueTxt:'',
				titleName:"体重监测",
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
					let val = this.valueNumber.split(';');
					this.valueTxt = val[0];	
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
			// AJax 方法
			initAjax (data) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				if( this.valueTxt < 25 || this.valueTxt > 150 ){
					this.isLading = false;
					this.valueTxt = '';
					this.show = true;
					this.message = '数值范围应在25~150kg之间。';
					this.clearStorage();

				}else if( this.valueTxt%1 !== 0 ){
					if(this.valueTxt.toString().split(".")[1].length > 1){
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
						},response => {
							this.message = '数值范围应在25~150kg之间。';
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
						this.message = '数值范围应在25~150kg之间。';
					})
				}
			},
			preservation () { //提交记录
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				if( this.type == 2 ){
					let modifyDateVal = sessionStorage.getItem('modifyDateVal');
					let diccode = this.diccode.split(',');
					let data = JSON.stringify({
						'value':this.valueTxt,
						'type':this.type,
						'userId':userId,
						'source':3,
						'messTime':modifyDateVal,
						'infoId':this.infoId,
						'dicCode':diccode[0]
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
						'value':this.valueTxt,
						'type':this.type,
						'messTime':messTime,
						'source':3,
						'dicCode':this.diccode,
						'infoId':this.infoId,
						'userId':userId
					});
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
                },1500);  
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
		font-size: 16px;
	}
</style>