<template>
	<div class="loading">
		<div class="loading-auto">
			<img src="../../assets/image/logo1.png" alt="">
			<img src="../../assets/image/logo2.png" class="round" alt="">
		</div>	
	</div>
</template>
<style>
	
	.loading {
		width: 100%;
		text-align: center;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 0.5);
		/*z-index: 999;*/
	}
	.nohead {
		width: 100%;
		text-align: center;
		height: 100%;
		position: fixed;
		top: 0.84rem;
		left: 0;
		background: rgba(255, 255, 255, 1);
		z-index: 999;
	}
	.nohead img {
		width: 30px;
		display: inline-block;
		position: absolute;
		top: 40%;
		left: 47%;
	}
	.nohead2{
		width: 100%;
		text-align: center;
		height: 100%;
		position: fixed;
		left: 0;
		top:1.64rem;
		background: rgba(255, 255, 255, 1);
		z-index: 999;
	}
	.loading img {
		width: 30px;
		display: inline-block;
		position: absolute;
		top: 30%;
		left: 47%;
	}
	@-webkit-keyframes rotation {
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
	}
	
	.loading .round {
	-webkit-transform: rotate(360deg);
	animation: rotation 700ms linear infinite;
	-moz-animation: rotation 700ms linear infinite;
	-webkit-animation: rotation 700ms linear infinite;
	-o-animation: rotation 700ms linear infinite;
	}
</style>