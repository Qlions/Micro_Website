<template>
	<div id="health-describe">
		<Heads :title="titleName"></heads>
		<p class="health-describe-top">建议您提供病症部分，检查报告或其他病情资料</p>
		<div class="health-describe-content">
			<textarea
				v-on:focus="focusTxt"
				v-on:blur="blurTxt"
				class="health-describe-text" 
				v-model="values" 
				placeholder="请您尽可能详细描述您要咨询的状况，以便医生准确诊断">		
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
	           	    <input @change="fileChanged" accept="image/*" multiple="multiple" type="file" ref="file">
	           </div>
	
	       </div>
	       <div class="health-bottom-border"></div>
	       <p class="photo-upload-text">
	       		若有化验报告等影像资料请上传以便专家准确的分析附件图片共可上传9张
	       </p>
  		</div>
  		<div class="submit-health-info" :class="{isFocus:isFocus}">
  			<a href="javascript:;" @click="submitInfo">确定提交</a>
  		</div> 
  		<popup v-show="isPopup" :message="messInfo"></popup>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import popup from '../common/error-popup.vue'
	export default {
		data (){
			return {
				titleName : "",
				files: [],
				fileArr: [],
				isShow:true,
				isPopup:false,
				isFocus:false,
				imgCount: 0,
				values:"",
				messInfo:""
			}
		},
		components:{
			Heads,
			popup
		},
		methods:{
			initText(){
				
				if(this.$route.query.serviceType == '1'){
					this.titleName = '备注';
				}else {
					this.titleName = '健康现状描述';
				}
				
				if(this.$store.textInfo){
					this.values = this.$store.textInfo;
				}else {
					this.values = '';					
				}
				
				if(this.$store.state.imgList.length > 0){
					console.log("确实有图片");
					let imgList = this.$store.state.imgList;
					this.fileArr.length = imgList.length;
					console.log("fileArr.length",this.fileArr.length);
					console.log(imgList);
					if(imgList.length > 8){
						this.isShow = false;
					}
					this.files = imgList;
				}else {
					console.log("确实没有图片");
				}
			},
		 	remove(index) {
                this.files.splice(index, 1);
                this.fileArr.splice(index,1);
                if(this.fileArr.length <= 9){
                	this.isShow = true;
                }
            },
	 	  	fileChanged() {
                const list = this.$refs.file.files;
                let l = this.fileArr.length;
                	for (var i = 0; i < list.length; i++) {
                		if(i > 8){
                			this.isPopup = true;
 	  						this.messInfo = '只能上传9张图片';
 	  						this.clearStorage();
                        	break;
                      }
                		if(i > (8-l)){
                			this.isPopup = true;
 	  						this.messInfo = '只能上传9张图片';
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
                	
                	if(this.fileArr.length > 8){
                		this.isShow = false;
                		
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
	 	  	submitInfo(){
	 	  		let list = [];
	 	  		if(this.files.length > 0){
	 	  			for(var i = 0;i < this.files.length;i ++){
	 	  				list.push(this.files[i]);
	 	  			}
	 	  			this.$store.state.imgList = list;
	 	  			console.log("存起来的imgList",this.$store.state.imgList)
	 	  		}
	 	  		
	 	  		if(this.values.length < 15){
	 	  			this.isPopup = true;
	 	  			this.messInfo = '请输入不少于15个字';
	 	  			this.clearStorage();
	 	  			return false;
	 	  		}
	 	  		
	 	  		let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
	 	  		
	 	  		this.$store.textInfo = this.values;

	 	  		this.$router.go(-1)
	 	  	},
	 	  	clearStorage () { //2s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },2000);  
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
<style scoped>
	#health-describe{
		width: 100%;
		height: 100%;
		background: #fff;
		padding-top: 0.84rem;
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
		font-size: 0.24rem;
		overflow: hidden;
	}
	.finish_room{
		padding: 0 0.3rem;
		padding-bottom: 1.5rem;
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
</style>