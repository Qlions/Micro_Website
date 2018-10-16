<template>
	<!--点击退出时的弹出框-->
			<div class="popupBox">
				<div class="popupItem">
					<p > {{ texts }}</p>
					<div class="bottom_box">
						<span v-on:click="close()">取消</span>
						<i @click="sureOut()">确定</i>
						<em></em>
					</div>
				</div>
			</div>
</template>

<script>
	export default {
		data(){
			return{
			}
		},
		props: {
			texts: String
		},
		methods:{
			sureOut(){
				this.$emit("cancelBtns", "");
			},
			close(){
				this.$emit("cancelNo", "")
			}
		}
		
	}
</script>

<style>
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