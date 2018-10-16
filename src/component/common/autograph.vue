<template>
	<div id="autograph"   v-show="isHidess" @click.self="hideBar">
		<div class="autograph-box">
			<div class="autograph-title">请书写横向签名</div>
			<div class="canvasDiv">
		        <div id="editing_area">
		            <canvas  height="200" id="canvasEdit"></canvas>
		        </div>
		    </div>
		    <div class="autograph-btn">
		        <a id="sign_clear" class="clearBtn">重写</a>
		        <a id="sign_ok" class="okBtn" @click="isBtn">确认</a>
		    </div>
	    </div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import '../../assets/js/esign.js'
	export default {
		props: ['isHides'],
		data(){
			return {
				isHidess: this.isHides,
				
			}
		},
		mounted(){
			$(function(){
		        //初始化动作，根据DOM的ID不同进行自定义，如果不写则内部默认取这四个
		        $().esign("canvasEdit", "sign_show", "sign_clear", "sign_ok");
		        
//		        $("#sign_ok").click(function (){
//		        	$("#autograph").hide();
//		        })
		    });
		},
		methods:{
			isBtn (){
				this.isHidess = false;
				this.$emit('listenToChildEvent', this.isHidess);
			},
			hideBar(){
				console.log("消失");
				this.isHidess = false;
				this.$emit('listenToChildEvent', this.isHidess);
			}
			
		},
		watch:{
			isHide (){
				this.isHidess = false;
				console.log("a")
			}
		}
	}
</script>
<style>
	#autograph {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.50);
		z-index:2;
	}
	.autograph-title{
		width: 100%;
		padding: 0 0.3rem;
		border-bottom: 0.02rem solid #e1e1e1;
		height: 0.75rem;
		font-size: 0.28rem;
		line-height: 0.75rem;
		text-align: center;
		color: #98989a;
		background: #fff;
	}
	.autograph-box {
		width: 100%;
		background: #fff;
		position: absolute;
		bottom: 0;
	}
	/*.autograph-title {
		font-size: .38rem;
		text-align: center;
		color: #98989a;
		padding: 0.2rem 0;
		border-bottom: 1px solid #e1e1e1;
	}*/
	.canvasDiv{
	    width: 100%;
	    height: 200px;
	}
	.autograph-btn a {
		width: 50%;
		height: .84rem;
		text-align: center;
		line-height: .84rem;
		display: block;
		float: left;
		font-size: .32rem;
		color: #fff;
	}
	#sign_clear {
		background: #fe9601;
	}
	#sign_ok {
		background: #009985;
	}
	#canvasEdit{
		width: 100%;
		
	}
	.autograph-btn{
		position: relative;
    	z-index: 1;
	}
</style>