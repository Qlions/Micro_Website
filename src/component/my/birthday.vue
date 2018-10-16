<template>
	<div class="model-time">
		<div class="model-time-content">
			<ul>
				<li>
					<label for="">
						<span>日期：</span>
						<div class="reg-int">
							<input type="text" name="appDate" id="appDate" value=""/>
						</div>
					</label>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import '../../assets/js/mobiscroll.core-2.5.2.js' 
	import '../../assets/js/mobiscroll.core-2.5.2-zh.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1.js'
	import '../../assets/js/mobiscroll.datetime-2.5.1-zh.js'
	import '../../assets/js/mobiscroll.android-ics-2.5.2.js'

	export default {
		data(){
			return {
				
			}
		},
		mounted(){	
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
					lang:'zh',
					dateFormat: 'yyyy-mm-dd',
			        startYear:currYear - 50, //开始年份
			        endYear:currYear + 0 //结束年份
				};

				$("#appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
			  	var optDateTime = $.extend(opt['datetime'], opt['default']);
			  	var optTime = $.extend(opt['time'], opt['default']);
			    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
			    $("#appTime").mobiscroll(optTime).time(optTime);
	        });
		}
	}
</script>
<style>
	.model-time-content {
		border-top:1px solid #f0f0f0;
	}
	.model-time-content ul {
		width: 90%;
		margin: 0 auto;
	}
	.model-time-content ul li {
		width: 100%;
		border-bottom:1px solid #f0f0f0;
		padding: 0.25rem 0;
		float: left;
	}
	.model-time-content ul li span {
		color: #666;
		font-size: 14px;
		width: 2rem;
		display: block;
		float: left;
		text-align: right;
	}
	.model-time-content .reg-int {
		float: right;
		font-size: 14px;
	}
	.model-time-content .reg-int input {
		text-align: right;
		padding-right: 0.125rem;
	}
</style>]=