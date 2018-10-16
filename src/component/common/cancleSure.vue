<template>
	<div class="popupBox">
		<div class="popup">
			<div class="imgBox">
				<img src="../../assets/image/my/red-gantanhao.png"/>
			</div>
			<p>{{txt}}</p>
			<div class="bottom_box">
				<span @click="noDo">考虑一下</span>
				<i @click="yesDo">确定</i>
				<em></em>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['txt'],
		data () {
			return {
				isSure:""
			}
		},
		methods:{
			noDo(){
				
				this.isSure = false;
			},
			yesDo(){
				this.isSure = true;
			}
		}
	}
</script>
<style scoped>
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 99;
		background: rgba(166, 166, 166, 0.5);
	}
	.popup{
		color: #666;
		width: 90%;
		height: 3.2rem;
		position: absolute;
		top:10%;
		left: 5%;
		background: #fff;
		border-radius: 5px;
	}
	.imgBox{
		width: 0.65rem;
		height: 0.65rem;
		position: absolute;
		top:2%;
		left: 45%;
		margin-left: 45%;
		margin:0.5rem 0 0.4rem;
	}
	img{
		width: 100%;
		height: 100%;
	}
	p{
		margin-top: 1.65rem;
		text-align: center;
		font-size: 0.24rem;
		line-height: 0.24rem;
		margin-bottom: 0.4rem;
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
		color: #ff5454;
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