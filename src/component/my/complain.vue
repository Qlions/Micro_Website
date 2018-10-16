<template>
	<div id="health-describe">
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<Heads :title="titleName"></heads>
		<div class="order-message">
			<div class="order-message-border">
	  			<div class="room_txt_left order-message-left">
	  				<span>工单类型:</span>
	  				<em>投诉建议</em>
	  			</div>
	  			<div class="room_txt_right order-message-right">
	  				<span>订单号:</span>
	  				<em>{{orderId}}</em>
	  			</div>
	  		</div>
  		</div>
		<div class="health-describe-content">
			<textarea
				v-on:focus="focusTxt"
				v-on:blur="blurTxt"
				class="health-describe-text" 
				v-model="values" 
				placeholder="问题描述">		
			</textarea>
		</div>
		 <div class='finish_room'>
  	
	  	   <div class='finish_room2'>
	       	   <div v-for='(item ,index ) in files' class='room_img'>
	       	   		<img :src="item.src">
	       	   		<span @click='remove(index)'><img src="../../assets/image/server/close_img.png"></span>
	       	   </div>
	           <div class='room_add_img' v-if="isShow">
	           	    <span><img src="../../assets/image/server/add_img.png"></span>
	           	    <input type="file" accept="image/*" @change="fileChanged" ref="file">
	           </div>
			   
	       </div>
	      <!-- <div class="health-bottom-border"></div>-->
	       <!--<p class="photo-upload-text">
	       		若有化验报告等影像资料请上传以便专家准确的分析附件图片共可上传9张
	       </p>-->
  		</div>
  		<div class="room_txt">
  			<span class="room_txt_left">上传图片(选填)</span>
  			<span class="room_txt_right">{{imgNum}}/3</span>
  		</div>
  		<div class="submit-health-info" :class="{isFocus:isFocus}">
  			<a href="javascript:;" @click="submitInfo">确定提交</a>
  		</div> 
  		<popup v-show="isPopup" :message="messInfo"></popup>
        <sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import popup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	import Loading from '../common/loading.vue'
	export default {
		data (){
			return {
				titleName : "提交工单",
				isLoading:false,
				files: [],
				fileArr: [],
				isShow:true,
				isPopup:false,
				sucShow:false,
				sucMessage:"",
				isFocus:false,
				imgCount: 0,
				values:"",
				messInfo:"",
				imgNum:"0",
				orderId:"525202544126554102",
				src:'/webapiProxy/webapi/picAppUpload.action'
			}
		},
		components:{
			Heads,
			popup,
			sucPopup,
			Loading
		},
		methods:{
			initText(){
//				if(this.$store.textInfo){
//					this.values = this.$store.textInfo;
//				}else {
//					this.values = '';					
//				}
				
				
				
//				if(this.$store.state.imgList.length > 0){
//					console.log("确实有图片");
//					let imgList = this.$store.state.imgList;
//					this.fileArr.length = imgList.length;
//					console.log("fileArr.length",this.fileArr.length);
//					console.log(imgList);
//					if(imgList.length > 2){
//						this.isShow = false;
//					}
//					this.files = imgList;
//				}else {
//					console.log("确实没有图片");
//				}
			},
		 	remove(index) {
                this.files.splice(index, 1);
                this.fileArr.splice(index,1);
                if(this.fileArr.length <= 2){
                	this.isShow = true;
                	console.log('小于3')
                }
                if(this.fileArr){//图片个数
					console.log(this.files)
					this.imgNum = this.fileArr.length;
				}
            },
	 	  	fileChanged() {
                const list = this.$refs.file.files;
                let l = this.fileArr.length;
                	for (var i = 0; i < list.length; i++) {
                		if(i > 2){
                			this.isPopup = true;
 	  						this.messInfo = '只能上传3张图片';
 	  						this.clearStorage();
                        	break;
                      }
                		if(i > (2-l)){
                			this.isPopup = true;
 	  						this.messInfo = '只能上传3张图片';
 	  						this.clearStorage();
                			break;
                		}
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item);   
                        this.fileArr.push(item.file);
                        this.files.push(item); 
	                }
                	
    
					console.log("this.fileArr",this.fileArr);
					console.log("this.files",this.files);
                	
                	if(this.fileArr.length > 2){
                		this.isShow = false;
                		
                	}
					if(this.fileArr){//图片个数
						console.log(this.files)
						this.imgNum = this.fileArr.length;
					}else{
						this.imgNum = '0';
					}
                	this.$refs.file.value = ''
            },
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
	 	  	submitInfo(){//点击确认按钮，提交投诉
	 	  		let list = [];
	 	  		let that = this;
	 	  		if(that.files.length > 0){
	 	  			for(var i = 0;i < that.files.length;i ++){
	 	  				list.push(that.files[i]);
	 	  			}
	 	  		}
	 	  		
	 	  		if(that.values.length < 15){
	 	  			that.isPopup = true;
	 	  			that.messInfo = '请输入不少于15个字';
	 	  			that.clearStorage();
	 	  			return false;
	 	  		}else{
					that.isLoading = true;
	 	  			let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
	 	  			let token = userInfo.token;
	 	  			let userId = userInfo.userId;//获取cookie中的用户id
	                let userCode = userInfo.userCode;//获取cookie中的用户code
	                let eaId = userInfo.eaId;//获取cookie中的用户eaId
					let data = JSON.stringify({
						orderId:that.orderId,
						question:that.values
					});
					that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660300, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						let dataState = response.body.state;
                		if(dataState == 'save_suc'){
                			that.sucShow = true;
                			that.sucMessage ="上传成功";
                			that.isLoading = false;
              				that.clearStorage()
                			let type = 'serviceComplain';
                			let moduletypeId = that.orderId;
                			
                			const formData = new FormData()
                			that.files.forEach((item) => {
			                    formData.append('picArrayFile', item.file)
			                    formData.append('userId', userId)
			                    formData.append('eaId', eaId)
			                    formData.append('userCode', userCode)
			                    formData.append('type', type)
			                    formData.append('moduletypeId', moduletypeId)
			                })
			                const xhr = new XMLHttpRequest()
//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
			                xhr.open('POST', that.src, true)
			                xhr.send(formData)
			                xhr.onload = () => {
			                    if (xhr.status === 200 || xhr.status === 304) {
			                       // this.status = 'finished'
			                        console.log('upload success!')
			                    } else {
			                        console.log(`error：error code ${xhr.status}`)
			                    }
			                }
                			
                		}else{
                			that.isLoading = false;
                			that.messInfo ="上传失败"
                			that.isPopup = true;
                			that.clearStorage()
                		}
					})
	 	  		}
	 	  		
	 	  		
	 	  		
//	 	  		this.$router.go(-1)
	 	  	},
	 	  	clearStorage () { //2s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                	if(this.sucShow ==  true){
                		this.sucShow =  false
                	}
                },1500);  
			},
			focusTxt(){
				this.isFocus = true
			},
			blurTxt(){
				this.isFocus = false
			}
		},
		mounted(){
			this.initText();
		}
	}
</script>
<style>
	#health-describe{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #f2f2f2;
	}
	#health-describe .health-describe-top{
		width: 100%;
		height: 0.7rem;
		background: #faf5e8;
		font-size: 0.24rem;
		color: #f59645;
		text-align: center;
		line-height: 0.7rem;
		
	}
	.order-message{
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
		padding: 0 0.3rem;
		font-size: 0.26rem;
		background: #fff;
	}
	.order-message-border{
		border-bottom: 1px solid #eee;
	}
	.order-message-left span{
		color: #333;
	}
	.order-message-left em{
		color: #f59645;
	}
	#health-describe .health-describe-content{
		width: 100%;
		height: 4.55rem;
		background: #fff;
	}
	#health-describe .health-describe-text{
		resize: none;
		border: 0 none;
		outline: none;
		display: block;
		width: 100%;
		height: 100%;
		padding: 0.22rem 0.64rem 0 0.3rem;
		color: #333;
		font-size: 0.26rem;
		overflow: hidden;
	}
	.finish_room{
		padding: 0 0.3rem;
		background: #fff;
	}

    .finish_room2{
   	 	width: 100%;
   	    height: auto;
   	 	align-items: center;
   }
    
   .finish_room2 .room_img{
   	 width: 1.57rem;
   	 height: 1.57rem;
   	 margin-right: 0.15rem;
   	 position: relative;
   	 overflow: hidden;
   	 float: left;
   	 margin-top: 0.15rem;
   	 border: 0.02rem solid #e6e6e6;
   }
   .finish_room2 .room_img img{
   	 
   	 width: 100%;
   	 height: 100%;
   }
   .finish_room2>.room_img span{
   	  position: absolute;
   	  width: 0.35rem;
   	  height: auto;
   	  right: 0;
   	  top: 0;
   }
 


   .room_add_img{
   	 width: 1.57rem; 
   	 height: 1.57rem;
   	 border:0.02rem solid #e6e6e6;
   	 position: relative;
   	 float: left;
   	 margin-top: 0.15rem;
   }
   .room_add_img >span:nth-child(1){
   	 margin-top: 0.48rem;
   	 margin-left: 0.48rem;
   	 display: block;
   	 width: 0.6rem;
   	 height: 0.6rem;
   	 overflow: hidden;
   }
   .room_add_img >span:nth-child(1) img{
   	display: block;
   	width: 100%;
   	height: 100%;
   }
   .room_add_img >span:nth-child(2){
   	  margin-bottom: 10px;
   }

  .room_add_img input{
  	  position: absolute;
  	  top: 0px;
  	  left: 0px;
  	  width: 100%;
  	  height: 100%;
  	  z-index: 99999;
  	  opacity: 0;
  }
  .room_txt{
  	width: 100%;
  	height: 1rem;
  	line-height: 1rem;
  	background: #fff;
  	font-size: 0.26rem;
  	padding: 0 0.3rem;
  	margin-bottom: 2rem;
  }
  .room_txt_left{
  	float: left;
  	color: #999;
  }
  .room_txt_right{
  	float: right;
  	color: #999;
  }
  .health-bottom-border{
  	width: 100%;
  	height: 0.19rem;
  	margin-top: 0.24rem;
  	background: #f3f3f3;
  }
  .photo-upload-text{
  	padding: 0.3rem;
  	font-size: 0.24rem;
  	color: #7f7f7f;
  	text-align: center;
  	letter-spacing: 0.01rem;
  	
  }
  #health-describe .submit-health-info{
  	padding: 0 0.3rem;
  	width: 100%;
  	position: fixed;
  	left: 0;
  	bottom: 0.23rem;
  }
    #health-describe .submit-health-info.isFocus{
  	/*padding: 0 0.3rem;
  	width: 100%;*/
  	position: static;
  	/*left: 0;
  	bottom: 0.23rem;*/
  }
  #health-describe .submit-health-info a{
  	display: block;
  	width: 100%;
  	height: 0.82rem;
  	border-radius: 6px;
  	background: #439685;
  	font-size: 0.33rem;
  	text-align: center;
  	line-height: 0.82rem;
  	color: #fff;
  }
  .loadTop {
	background: #fff !important;
 	z-index: 2;
  } 
</style>