<template>
	<div class="healthy-hospitalization-details">
		<Heads :title="title"></Heads>
		<div class="healthy-hospitalization-details-content-list">
			<div class="healthy-hospitalization-details-content">
				<div class="hospitalization-details-time styname">
					<ul>
						<li>
							<p class="close-drugs-update">
								机构名称
								<span class="right" @click="remove">
									<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
								</span>
							</p>
							<textarea v-model="hosName"></textarea>
						</li>
						<li>
							<p>入院原因</p>
							<textarea v-model="reason"></textarea>
						</li>
					</ul>
				</div>
				<div class="hospitalization-details-time">
					<ul>
						<li>
							<span>入院时间</span>
							<input :value="admissionDate" class="right" readonly="readonly" name="appDateTime" id="appDateTime" type="text">
						</li>
						<li>
							<span>出院时间</span>
							<input value="" class="right" readonly="readonly" name="appDateTime" id="appDateTime1" type="text" v-model="dischargeDate">
						</li>
						<li>
							<span>病案号码</span>
							<input type="text" v-model="recordNo" class="right">
						</li>
					</ul>
				</div>
			</div>
		</div>	
		<div class="preservation" id="footer" @click="submit">
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
					<i @click="sureOut()">确定</i>
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
				list:this.$store.state.medication,
				name:this.$route.query.name,
				details:"",
				title:'住院病史',
				admissionDate:"", // 住院时间
				dischargeDate:"",  // 出院时间
				admissionDateNew:"", // 住院时间
				dischargeDateNew:"",  // 出院时间
				thisDate:"",// 当前时间
				message:"",
				show:false,
				hrecordId:"",
				hosName:"",
				reason:"",
				recordNo:"",
				isLoginOut:false
			}
		},
		mounted () {
			// 获取对象ID的详情数据
			let data = this.list.body.rows;
			let _this = this;
			for (var i = 0; i < data.length; i++) {
				if( this.name == data[i].hosName ){
					this.details = data[i];
					this.admissionDate = this.details.admissionDate.replace('T',' ').substring(0,16);
					this.dischargeDate = this.details.dischargeDate.replace('T',' ').substring(0,16);
					this.hosName = this.details.hosName;
					this.reason = this.details.reason;
					this.hrecordId = this.details.hrecordId;
					this.recordNo = this.details.recordNo;
				}
			}
			mui.previewImage();
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
						_this.message = '入院时间不能大于当前时间';
						_this.clearStorage();
						$("#appDateTime").val("");
		        	}else {
		        		_this.admissionDate = valueText;
		        	}
		        	
			    }
			};
			var optDateTime = $.extend(opt['datetime'], opt['default']);
			$("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
	        $(function () {
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
				    	_this.dischargeDate = valueText;
				    }
				};
			   var optDateTime = $.extend(opt['datetime'], opt['default']);
				$("#appDateTime1").mobiscroll(optDateTime).datetime(optDateTime);
	        });
	        this.getDate (); // 获取当前时间
		},
		methods:{
			//当前时间
			getDate () {
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
				this.thisDate = Y + '-' + m + '-' + d;
			},
			/*compareDate () {
				
			},*/
			clearStorage:function(){
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },1500);  
			},
			// 提交修改
			submit () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'hrecordId':this.hrecordId,
					'reason_1':this.reason,
					'dischargeDate_1':this.dischargeDateNew,
					'admissionDate_1':this.admissionDateNew,
					'hosName_1':this.hosName,
					'recordNo_1':this.recordNo
				});
				if(this.admissionDateNew >= this.dischargeDateNew){
		    		this.show = true;
					this.message = '出院时间不能小于入院时间';
					this.clearStorage();
		    	}else if(this.hrecordId == '' || this.reason == '' || this.dischargeDateNew == '' || this.admissionDateNew == '' || this.hosName == '' || this.recordNo == ''){
		    		this.show = true;
					this.message = '请把信息补充完整';
					this.clearStorage();
		    	}else {
		    		this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
						token:token, 
						infoType:520002, 
						jsonValue:data 
					},{emulateJSON:true})
					.then(response => {
						if (response.body.state == 'err_uphospital_003') {
							this.show = true;
							this.message = '数据库操作失败';
							this.clearStorage();
						}else if (response.body.state == 'err_uphospital_001') {
							this.show = true;
							this.message = '系统异常';
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
		    	}				
			},
			remove () {
				this.isLoginOut = true;
			},
			close(){
				this.isLoginOut = false;
			},
			// 删除
			sureOut:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					'hrecordId':this.hrecordId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:520003, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					this.isLoginOut = false;
					this.show = true;
					this.message = '删除成功';
					this.clearStorage();
					let time = setTimeout(()=>{		
						this.$router.go(-1);
		            },1500);
				},response => {
					
				})
			},
		},
		watch: {
		    admissionDate: function (val, oldVal) {
		    	this.admissionDateNew = val;
		    },
		    dischargeDate: function (val, oldVal) {
		      	this.dischargeDateNew = val;
		    }
		},
		components: {
			Heads,
			popup
		}
	}
</script>
<style>
	.healthy-hospitalization-details {
		width: 100%;
		height: 100%;
		font-size: .28rem;
		background: #f3f3f3;
		position: relative;
		padding-top: .84rem;
	}
	.healthy-hospitalization-details-content {
		border-top: .3rem solid #f3f3f3;
	}
	.healthy-hospitalization-details-content .right {
		float: right;
	}
	.healthy-hospitalization-details-content input {
		text-align: right;
		font-size: .28rem;
	}
	.hospitalization-details-time {
		padding: 0 0.15rem;
		background: #fff;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-time ul li {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-time ul li:last-child {
		border-bottom: none;
	}
	.hospitalization-details-time ul li p {
		padding-bottom: .2rem;
		position: relative;
	}
	.hospitalization-details-time textarea {
	    resize: none;
	    border: 0 none;
	    outline: none;
	    display: block;
	    width: 100%;
	    height: 1.65rem;
	    color: #333;
	    font-size: 0.24rem;
	    overflow: hidden;
	    background: #f3f3f3;
	    font-size: .28rem;
	    border-radius: 0;
		
	}
	.hospitalization-details-record {
		padding: 0.15rem;
		background: #fff;
	}
	.hospitalization-details-record-title {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.hospitalization-details-record-content p {
		padding: .2rem 0;
	}
	.hospitalization-details-record-img {
		width: 1.6rem;
		height: 1.6rem;
		float: left;
		margin-left: 0.1rem;
	}
	.hospitalization-details-record-img img {
		width: 100%;
		height: 100%;
	}
	.caseInfoValue {
		width: 100%;
		height: 0.8rem;
		line-height: .9rem;
		color: #999;
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
	.close-drugs-update img {
		width: 0.4rem;
		height: 0.4rem;
		display: block;
	}
	/*弹出框样式*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popupItem{
		color: #666;
		width: 80%;
		position: absolute;
		top:35%;
		left: 10%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupItem p{
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.bottom_box{
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.bottom_box span{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box i{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box em{
		height: 0.5rem;
		width: 1px;
		background: #e6e6e6;
		position: absolute;
		top: 0.25rem;
		left: 50%;
	}
	
</style>