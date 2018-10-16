<template>
<section id="checkName">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<div class="CN-container" v-if="jiequShow == 0">
		<!--<dl>
			<dt>身份认证</dt>
			<dd>仅支持中国居民身份证进行实名认证</dd>
		</dl>-->
		<ul class="basicData-content clearfix">
			<label>
				<li>
					<span>真实姓名</span>
					<input type="text" placeholder="请输入您的真实姓名" v-model="name">
				</li>
			</label>
			<label>
				<li>
					<span>身份证号</span>
					<input type="text" placeholder="请输入您的身份证号" v-model="cerNo">
				</li>
			</label>
			<label>
				<li>
					<span>户籍地址</span>
					<input type="text" placeholder="请输入您的户籍地址" v-model="address">
				</li>
			</label>
			<div class="idBox">
				<div class="idLeftBox idLine">
					
						<div class="idPicBox" @click="add">
							<img src="../../assets/image/doctor/upload_identity.png"/>
						</div>
						<p class="idTxt">上传身份证正面照片</p>
						<input v-if="imgZ ==''" type="file" accept="image/*"  @change="fileChanged" id="idImgZ" ref="fileZ">
						<!--<input v-if="imgZ ==''"  type="file" id="idImgZ" ref="fileZ">-->
						<img v-if="imgZ" id="viewZ" class="idImg-left" :src="imgZ"/>
					
					<span class="img-remove" @click="removeZ()" v-if="imgZ">
	                    <img src="../../assets/image/server/close_img.png">
	                </span>
				</div>
				<div class="idRightBox">
					<label>
						<div class="idPicBox"> <!--@click="addF"-->
							<img src="../../assets/image/doctor/upload_identity.png"/>
						</div>
						<p class="idTxt">上传身份证背面照片</p>
						<input v-if="imgF ==''" type="file" @change="sendPicF" accept="image/*" id="idImgF" ref="fileF">
						<img v-if="imgF" id="viewF" class="idImg-right" :src="imgF" />
					</label>
					<span class="img-remove" @click="removeF()" v-if="imgF">
	                    <img src="../../assets/image/server/close_img.png">
	                </span>
				</div>
			</div>
		</ul>
		<div class="submitBtn" :class="{'gray':isFinish}" @click="postNameChecked">提交审核</div>
	</div>
	<div class="jiequ"  v-show="jiequShow == 1">
		<!--<div id="clipArea"></div>
		<div class="btn-jiequ-box">
			<button id="btn-back" @click="goBack()">取消</button>
			<button id="clipBtn">确定</button>
		</div>-->
		
		<div id="clipArea1"></div>
		<div class="btn-jiequ-box">
			<button id="btn-back" @click="goBack()">取消</button>
			<button id="clipBtn">确定</button>
		</div>
	</div>
	
</section>
</template>

<script>
	import $ from 'jquery'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				isLoading:false,
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				name:"",
				cerNo:"",
				titleName:"实名认证",
				address:"",
				imgZ:"",
				imgF:"",
				imgFile:[],
				userId:"",
				eaId:"",
				userCode:"",
				img1:"",
				img2:'',
				jiequShow:0,
				files:[],
				maxNum:1
			}
		},
		computed:{
			isFinish(){
				let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				if(this.name ==""||reg.test(this.cerNo) ==false||this.address ==""||this.imgZ==""||this.imgF==""){
					return true
				}else{
					return false
				}
			}
		},
		components:{
			Heads,
			Loading,
			errorPopup,
			sucPopup
		},
		methods: {
			add(){
				this.$refs.fileZ.click();
			},
			addF(){
				this.$refs.fileF.click();
			},
			fileChanged() {
                const list = this.$refs.fileZ.files;
                this.img1=this.$refs.fileZ.files[0]
                console.log(this.files)
                if(this.files.length < this.maxNum){
                	for (let i = 0; i < list.length; i++) {
	                    if (!this.isContain(list[i])) {
	                        const item = {
	                            name: list[i].name,
	                            size: list[i].size,
	                            file: list[i]
	                        }
	                        this.html5Reader(list[i], item);         
	                        this.files.push(item);
	                    }
	                }	
                }
                this.status = this.files.length;
                this.$refs.fileZ.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
//                  this.$set(item, 'src', e.target.result)
                    this.imgZ = e.target.result
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
//			choicePicZ(){
//				let that = this;
//				that.jiequShow = 0;
//				let clipArea = new bjj.PhotoClip("#clipArea1", {
//					size: [250, 250],
//					outputSize: [300, 300],
//					file: "#idImgZ",
//					view: "#viewZ",
//					ok: "#clipBtn",
//					loadStart: function() {
//						
//					},
//					loadComplete: function() {
//						that.jiequShow = 1;
//						console.log(1)
//					},
//					clipFinish: function(dataURL) {
////						that.userHeadImg=dataURL;
//						that.imgZ =  dataURL;
//						that.img1 = dataURL;
////						console.log(dataURL)
//						that.jiequShow = 0;
////						var imgArr = that.userHeadImg.split('.');
//					}
//				})
//			},
//			choicePicF(){
//				let that = this;
//				let clipArea = new bjj.PhotoClip("#clipArea", {
//					size: [250, 250],
//					outputSize: [300, 300],
//					file: "#idImgF",
//					view: "#viewF",
//					ok: "#clipBtn",
//					loadStart: function() {
//						
//					},
//					loadComplete: function() {
//						that.jiequShow = 1;
//					},
//					clipFinish: function(dataURL) {
////						that.userHeadImg=dataURL;
//						that.imgF =  dataURL;
//						that.img2 = dataURL;
////						console.log(dataURL)
//						that.jiequShow = 0;
////						var imgArr = that.userHeadImg.split('.');
//					}
//				})
//			},
//			sendPicZ(){//正面
//				let reader = new FileReader()
//				this.img1 = this.$refs.fileZ.files[0];
//				reader.readAsDataURL(this.img1);
//				let that = this;
//				reader.onloadend = function () {
//			        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
//			        that.imgZ = reader.result;
//			        that.imgFile.push(reader.result)
//			   	};
//			    // 读出 base64
//			},
			sendPicF(){//反面
				let reader = new FileReader()
				this.img2 = this.$refs.fileF.files[0];
				reader.readAsDataURL(this.img2);
				let that = this;
				reader.onloadend = function () {
			        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
			        that.imgF = reader.result;
			        that.imgFile.push(reader.result)
			    };
			},
			removeZ(){
				this.imgZ = "";
				this.img1 = "";
				this.files =[]
			},
			removeF(){
				this.imgF = "";
				this.img2 = "";
			},
			goBack(){
				this.jiequShow = 0;
			},
			postNameChecked(){
				let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				if(this.name !=""&&reg.test(this.cerNo) ==true){
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = userInfo.userId;
					let data = JSON.stringify({
							userId : userId,
							name : this.name,
							certNo : this.cerNo,
							address: this.address
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660208, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if(response.body.state == 'certficationd_suc'){
							this.sucShow = true;
							this.sucMessage = "认证成功";
							this.clearStorage();
							//上传正面
							const formData = new FormData()
		                    formData.append('picArrayFile', this.img1)
		                    formData.append('userId', this.userId)
		                    formData.append('eaId', this.eaId)
		                    formData.append('userCode', this.userCode)
		                    formData.append('type', 'card1')
		                    formData.append('moduletypeId', this.userId)
			                const xhr = new XMLHttpRequest()
//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
			                xhr.open('POST', '/webserviceProxy/webapi/picAppUpload.action', true)
			                xhr.send(formData)
			                xhr.onload = () => {
			                	console.log(xhr)
			                    this.uploading = false
			                    if (xhr.status === 200 || xhr.status === 304) {
			                        this.status = 'finished'
			                        console.log('upload success!')
			                    } else {
			                        console.log(`error：error code ${xhr.status}`)
			                    }
			                }
			                //上传反面
			                const formData2 = new FormData()
		                    formData2.append('picArrayFile', this.img2)
		                    formData2.append('userId', this.userId)
		                    formData2.append('eaId', this.eaId)
		                    formData2.append('userCode', this.userCode)
		                    formData2.append('type', 'card2')
		                    formData2.append('moduletypeId', this.userId)
			                const xhr2 = new XMLHttpRequest()
//			                xhr.upload.addEventListener('progress', this.uploadProgress, false)
			                xhr2.open('POST', '/webserviceProxy/webapi/picAppUpload.action', true)
			                this.uploading = true
			                xhr2.send(formData2)
			                xhr2.onload = () => {
			                    this.uploading = false
			                    if (xhr2.status === 200 || xhr2.status === 304) {
			                        this.status = 'finished'
			                        console.log('upload success!')
			                    } else {
			                        console.log(`error：error code ${xhr2.status}`)
			                    }
			                }
						}else if(response.body.state == 'certficationd_illegal'){
							this.errShow = true;
							this.message = "身份证输入不合法";
							this.clearStorage()
						}else if(response.body.state == 'certficationd_repeat'){
							this.errShow = true;
							this.message = "身份证已存在";
							this.clearStorage()
						}else{
							this.errShow = true;
							this.message = "认证失败";
							this.clearStorage()
						}
					})
				}
				
			},
			clearStorage () { //2s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	} 
                	if(this.sucShow == true){
                		this.sucShow = false
                		this.$router.go(-1);
                	}
                },2000);  
			},
			initUser(){
				let str = this.$cookie.get('userInfo');
				let userInfo = JSON.parse(str);
				let token = userInfo.token;
				let res = JSON.stringify({userName:userInfo.userName,userType:1});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:600039, jsonValue:res},{emulateJSON:true}).then(response =>{
					this.response = JSON.parse(response.body.state)[0];
					this.userId = this.response.userId;
					this.eaId = this.response.eaId;
					this.userCode = this.response.userCode;
				})
			}
			
		},
		mounted(){
			this.initUser()
//			this.choicePicZ()
//			this.choicePicF()
		}
	}
</script>

<style scoped>
	.idBox{
		margin-top: 0.3rem;
		width: 100%;
	}
	.idLeftBox,.idRightBox{
		display: inline-block;
		position: relative;
		width: 3.2rem;
		height: 2.5rem;
		border: 1px solid #F0F0F0;
		border-radius: 3px;
	}
	.idLeftBox{
		float: left;
	}
	.idRightBox{
		float: right;
	}
	.idLeftBox label{
		
	}
	.idPicBox{
		width: 1rem;
		height: 0.8rem;
		margin: 0.5rem auto;
	}
	.idPicBox img{
		display: inline-block;
		height: 100%;
		width: 100%;
	}
	.idTxt{
		width: 100%;
		font-size: 0.24rem;
		text-align: center;
		
	}
	#idImgZ,#idImgF{
		display: block;
		height: 0;
		width: 0;
	}
	.idImg-left,.idImg-right{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 9;
	}
	.img-remove {
	    position: absolute;
	    width: 0.35rem;
	    height: auto;
	    right: 0;
	    top: 0;
	    z-index: 99;
	}
	.img-remove img{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	#checkName{
		width: 100%;
		height: 100%;
		background: #f2f2f2;
		position: absolute;
	}
	.basicData-content{
		width: 100%;
		padding: 0.3rem 0.3rem;
		font-size: 0.24rem;
		margin-top: 0.4rem;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
		background: #fff;
	}
	.basicData-content li{
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.basicData-content .border-no{
		border: none;
	}
	.basicData-content li span{
		display: inline-block;
		width: 1.5rem;
		color: #000;
		margin-right: 0.3rem;
	}
	input{
		display: inline-block;
		color: #333;
	}
	.submitBtn{
		width: 90%;
		margin: 0.4rem auto 0.8rem;
		height: 0.8rem;
		background: #009983;
		border-radius: 5px;
		color: #fff;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.8rem;
	}
	.gray{
		background: darkgray;
	}
	/*截取部分样式*/
	.jiequ{
		position: absolute;
		top: 0;
		background-color: rgba(0, 0, 0, 1);
		width: 100%;
		height: 100%;
	}
	.photo-clip-mask-left,.photo-clip-mask-top,.photo-clip-mask-right,.photo-clip-mask-bottom{
		background-color:rgba(255,255,255,0)
	}
	#clipArea {
		margin-top: 0.84rem;
		height: 7rem;
	}
	#clipBtn {
		margin: 20px;
	}
	.btn-jiequ-box{
		margin-top: 0.8rem;
		
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
</style>