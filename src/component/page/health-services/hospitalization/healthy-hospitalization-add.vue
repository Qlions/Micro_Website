<template>
	<div class="healthy-hospitalization-details">
		<Heads :title="title">
			<div class="search_btn" @click="getAdd">
				<img src="../../../../assets/image/saveOld@2x.png" alt="">
			</div>
		</Heads>
		<div class="healthy-hospitalization-details-content-list">
			<div class="healthy-hospitalization-details-content" v-for="(item,index) in domList">
				<div class="hospitalization-details-time styname">
					<ul>
						<li>
							<p>
								机构名称
							</p>
							<textarea v-model="item.hosName_1"></textarea>
						</li>
						<li>
							<p>入院原因</p>
							<textarea v-model="item.reason_1"></textarea>
						</li>
					</ul>
				</div>
				<div class="hospitalization-details-time">
					<ul>
						<li>
							<span>入院时间</span>
							<input :value="item.admissionDate_1" class="" readonly="readonly" name="appDateTime" :id="'appDateTime'+index" type="text" class="right" placeholder="请选择">
						</li>
						<li>
							<span>出院时间</span>
							<input :value="item.dischargeDate_1" class="" readonly="readonly" name="appDateTime" :id="'appDateTimes'+index" type="text" class="right" placeholder="请选择">
						</li>
						<li>
							<span>病案号码</span>
							<input type="text" v-model="item.recordNo_1" class="right" placeholder="请输入">
						</li>
					</ul>
				</div>
				<div class="close-drugs" @click="remove(index)" v-if="isShow">
					<img src="../../../../assets/image/doctor/act-closeBtn_03.png" alt="">
				</div>
			</div>
		</div>
		
		<div style="width:100%;height:1rem;"></div>
		<div class="preservation" id="footer" @click="increase" v-if="isBtn">
			<a href="javascript:void(0)">
				+增加记录
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
				title:'住院病史',
				message:"",
				show:false,
				thisDate:"",
				isShow:true,
				isBtn:true,
				isLoginOut:false,
				listIndex:"",
				domList:[
					{
						admissionDate_1:"", // 住院时间
						dischargeDate_1:"", // 出院时间
						hosName_1:"",
						reason_1:"", 
						recordNo_1:""
					}
				],
				domListNew:{}	 
			}
		},
		mounted () {
			if(this.domList.length == 1){
				this.isShow = false;
			}
			let _this = this;
			$(function () {
				// 住院
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
							$("#appDateTime0").val("");
			        	}else {
			        		for (var i = 0; i < _this.domList.length; i++) {
				        		_this.domList[i].admissionDate_1 = valueText;
				        	}
			        	}	
				    }
				};
				var optDateTime = $.extend(opt['datetime'], opt['default']);
			    $("#appDateTime0").mobiscroll(optDateTime).datetime(optDateTime);
			    // 出院
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
							_this.message = '出院时间不能大于当前时间';
							_this.clearStorage();
							$("#appDateTimes0").val("");
			        	}else {
			        		for (var i = 0; i < _this.domList.length; i++) {
				        		_this.domList[i].dischargeDate_1 = valueText;
				        	}
			        	}     		
				    }
				};
				var optDateTime = $.extend(opt['datetime'], opt['default']);
			    $("#appDateTimes0").mobiscroll(optDateTime).datetime(optDateTime);
	        });
		},
		methods:{
			// 删除列表
			remove (index) {
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
			getDate () { // 当前时间
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
			increase () {  // 增加处理数据
				const obj = {
						admissionDate_1:"", // 住院时间
						dischargeDate_1:"", // 出院时间
						hosName_1:"",
						reason_1:"", 
						recordNo_1:""
					}
				this.domList.push(obj);
			},
			getAdd () {  // 提交
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let postData = {};
				let postDataJu = {};
				let judge;
				console.log(this.domList)
				for (var i = 0; i < this.domList.length; i++) {
					if(Date.parse(this.domList[i].admissionDate_1) >= Date.parse(this.domList[i].dischargeDate_1)){
						this.show = true;
						this.message = '出院时间不能小于住院时间';
						this.clearStorage();
						return;
					}
					for (var p1 in this.domList[i]) {
						if(this.domList[i][p1] == ''){
				        	this.show = true;
							this.message = '请把信息补充完整';
							this.clearStorage();
							return;
				        }
				        if (this.domList[i].hasOwnProperty(p1))
				            var tr = p1.split("_");
				            postData[tr[0]+'_'+(i+1)] = this.domList[i][p1];
				            judge = this.domList[i][p1];
				    }
				}
				postData['divindex'] = this.domList.length;
				let data = JSON.stringify(postData);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:520001, 
					jsonValue:data 
				},{emulateJSON:true})
				.then(response => {
					if(response.body.state == 'suc'){
						this.show = true;
						this.message = '保存成功';
						this.clearStorage();
						let time = setTimeout(()=>{		
							this.$router.go(-1);
			            },1500);
					}else {
						this.show = true;
						this.message = '保存失败';
						this.clearStorage();
					}
					
				},response => {
					
				})
			},
			clearStorage:function(){
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },3000);  
			}
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
						_this.message = '入院时间不能大于当前时间';
						_this.clearStorage();
						$("#appDateTime"+num).val("");
		        	}else {
		        		_this.domList[num].admissionDate_1 = valueText;
		        	}	
			    }
			};
		    var optDateTime = $.extend(opt['datetime'], opt['default']);
			$("#appDateTime"+num).mobiscroll(optDateTime).datetime(optDateTime);
		    // 出院
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
						_this.message = '出院时间不能大于当前时间';
						_this.clearStorage();
						$("#appDateTimes"+num).val("");
		        	}else {
		        		_this.domList[num].dischargeDate_1 = valueText;
		        	}
		        		
			    	
			    }
			};
			var optDateTime = $.extend(opt['datetime'], opt['default']);
			$("#appDateTimes"+num).mobiscroll(optDateTime).datetime(optDateTime);
		   
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
		position: relative;
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
	.close-drugs img {
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: .25rem;
		right: 0.3rem;
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
	.search_btn{
		text-align: center;
	    width: 0.8rem;
	    height: 100%;
	    position: absolute;
	    right: 0px;
	    top: 0;
	    background: none;
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
	.remove_btn{
		text-align: center;
	    width: 0.8rem;
	    height: 100%;
	    position: absolute;
	    right: 0px;
	    top: 0;
	    line-height: .8rem;
	    color: #fff;
	    font-size: .32rem;
	}
	.mask-all {
		position: fixed !important;
	}
</style>