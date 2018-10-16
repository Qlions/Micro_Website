<template>
<section id="changePic">
	<Heads :title="titleName"></Heads>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<div class="CP-container">
		<div class="firstPage"  v-show="jiequShow == 0">
			<form class="my-content" method="post">						
				<img id="view" :src="userHeadImg" style="background-color: rgb(255,255,255)!important;"/>
			</form>
			<div class="btn-choice-pic" >
				
					<p @click="choicePic">选择图片</p>
					<input type="file" id="fileImg" ref = "myChangePic">
				
			</div>
		</div>
		
		<div class="jiequ"  v-show="jiequShow == 1">
			<div id="clipArea"></div>
			<div class="btn-jiequ-box">
				<button id="btn-back" @click="goBack()">取消</button>
				<button id="clipBtn">确定</button>
			</div>
		</div>
	</div>	
	
</section>
</template>
<script>
	import $ from 'jquery'
	import Heads from '../common/head.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
//	import  '../../assets/js/iscroll-zoom.js'
//	import   '../../assets/js/hammer.js'
//	import   '../../assets/js/lrz.all.bundle.js'
//	import   '../../assets/js/jquery.photoClip.min.js'
	export default {
		data () {
				return {
					userHeadImg:'',
					userInfo:{
						username: "王小明",
						userHeadImg: "../../assets/image/DefaultAvatar.png"
					},
					isShow:false,
					titleName:"设置头像",
					jiequShow:0,
					message:"",
					sucMessage:"",
					errShow:false,
					sucShow:false,
				}
		},
		computed:{
			
		},
		components:{
			Heads,errorPopup,sucPopup
		},
		methods: {
			//获取用户此时的头像
			initUserPhoto(){
				let str = this.$cookie.get('userInfo');
				let userInfo = JSON.parse(str);
				//根据昵称获取头像
				let token = userInfo.token;
				let res = JSON.stringify({userName:userInfo.userName,userType:1});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
					this.response = JSON.parse(response.body.state)[0];
					this.userHeadImg = this.response.photomiddle;
				})
			},
			goBack(){
				this.jiequShow = 0;
			},
			choicePic(){
				this.$refs.myChangePic.click()
			},
			clearStorage () { //2s弹出框消失
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}if( this.sucShow ==  true){
                		this.sucShow = false;
                	}  
                },2000);  
			},
		},
		mounted(){
			this.initUserPhoto();
			let that = this;
			var clipArea = new bjj.PhotoClip("#clipArea", {
				size: [250, 250],
				outputSize: [300, 300],
				file: "#fileImg",
				view: "#view",
				ok: "#clipBtn",
				loadStart: function() {
					
				},
				loadComplete: function() {
					that.jiequShow = 1;
				},
				clipFinish: function(dataURL) {
					that.userHeadImg=dataURL;
//					console.log(dataURL)
					that.jiequShow = 0;
					var imgArr = that.userHeadImg.split('.');
	                var type = imgArr[imgArr.length-1].toLowerCase();
//	                console.log(type)
	                if (type.indexOf('jpg') == -1 && type.indexOf('jpeg') == -1 && type.indexOf('png') == -1) {
						console.log('请上传格式为jpg/jpeg/png的图片');
	                }
			    	let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
							userPhoto: that.userHeadImg
					});
					that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111121, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if(response.body.state=="suc_photo"){
							that.sucShow = true;
							that.sucMessage = "修改成功";
							that.clearStorage()
						}else{
							that.errShow = true;
							that.message = "修改失败";
							that.clearStorage()
						}
					})
				}
			});
		}
	}
</script>
<style>
#changePic{
	padding-top: 2rem;
	position: absolute;
	width: 100%;
	height: 100%;
	/*background-color: rgba(0, 0, 0, 1);*/
}	
.photo-clip-mask-left,.photo-clip-mask-top,.photo-clip-mask-right,.photo-clip-mask-bottom{
	background-color:rgba(255,255,255,0)
}
#clipArea {
	margin-top: 1.6rem;
	height: 7rem;
}
#clipBtn {
	margin: 20px;
}
#fileImg{
	display: block;
	width: 0;
	height: 0;
}
.btn-jiequ-box{
	margin-top: 1rem;
	
	border: none;
}
#btn-back{
	width: 2rem;
	height: 0.8rem;
	line-height: 0.8rem;
	text-align: center;
	background: #009983;
	font-size: 0.3rem;
	border-radius: 3px;
	margin-left:1.2rem ;
	border: none;
	color: #fff;
}
#clipBtn{
	width: 2rem;
	height: 0.8rem;
	line-height: 0.8rem;
	text-align: center;
	background: #009983;
	font-size: 0.3rem;
	border-radius: 3px;
	margin-left:1rem ;
	border: none;
	color: #fff;
}
/*#view {
	margin: 0 auto;
	width: 200px;
	height: 200px;
}*/
.jiequ{
	position: absolute;
	top: 0;
	background-color: rgba(0, 0, 0, 1);
	width: 100%;
	height: 100%;
}
	.CP-container{
		margin-top: 0.84rem;
		overflow: hidden;
	}
	.firstPage{
		position: absolute;
		z-index: 1;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,1);
	}
	.my-content{
		height: 2.8rem;
		width: 2.8rem;
		border-radius: 1.4rem;
		-moz-border-radius: 1.4rem;
		-webkit-border-radius: 1.4rem;
		margin:3rem auto;
		overflow: hidden;
		border: 1px solid #eee;
		position: relative;
		top: 0;
		left: 0;
	}
	.my-content #view{
		display: block;
		width: 100%;
		height: 100%;
		background: rgb(255,255,255);
	}
	.btn-choice-pic{
		width: 100%;
	}
	.btn-choice-pic p{
		width: 80%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		background: #009983;
		color: #fff;
		border-radius: 3px;
		font-size: 0.3rem;
		margin: 2rem auto;
	}
</style>