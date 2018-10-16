<template>
    <div class="service-uploader" id="service-uploader">

    	<div class="service-uploader-img">
    		<div class="service-uploader-img-top">
				<div class="service-uploader-img-title">
					<b class="lines"></b>
					<i>如有图片请上传，限3张 <span v-if="status != maxNum" @click="add">上传图片</span></i>
				</div>
				<div class="service-uploader-img-box">
		            <div v-for="(file, index) of files" class="file-item draggable-item">
		                <img :src="file.src" alt="" ondragstart="return false;">
		                <span class="file-remove" @click="remove(index)">
		                    <img src="../../assets/image/server/close_img.png">
		                </span>
		            </div>
	            </div>
            </div>

           	<div class="service-uploader-img-butt">
           		<a href="javascript:void(0)" @click="submit">提交</a>
           	</div>  
        </div>

        <input type="file" accept="image/*" @change="fileChanged" ref="file">

        <!-- 组件 -->
		<popup v-show="isPopup" :message="messInfo"></popup>
		<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
		<Loading v-if="isLoading" class = "loadingPage"></Loading>
    </div>
</template>
<script>
    import popup from '../common/error-popup.vue'
    import sucPopup from '../common/qc-suc-popup.vue'
    import Loading from '../common/loading.vue'
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            textarea:'',
            maxNum:Number,
            btnType:Number
        },
        data() {
            return {
                status: 0,
                files: [],
                point: {},
                uploading: false,
                showText: true,
                percent: 0,
                isPopup:false,
                messInfo:"",
                listLength:"",
                sucShow:false,
                sucMessage:"",
                isLoading:false
            }
        },
        methods: {
            add() {
                this.$refs.file.click();
            },
            submit() {
            	console.log(this.textarea);
                if(this.textarea.length < 15){
                    this.isPopup = true;
                    this.messInfo = '请输入不少于15个字!';
                    this.clearStorage();
                    return false;
                }
                
                let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                console.log(userInfo);
                let userId = userInfo.userId;
                let token = userInfo.token;
                let userCode = userInfo.userCode;
                let eaId = userInfo.eaId;
                
            	let TeamData = JSON.stringify({
            		question : this.textarea,
            		typeId : this.$route.query.typeId,
            		type : this.$route.query.type
            	})
            	
            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660300, jsonValue:TeamData},{emulateJSON:true}).then(response =>{
            		console.log(response);
            		let dataState = response.body.state;
            		if(dataState == 'save_suc'){
            			let type = response.body.QType;
            			let moduletypeId = response.body.QId;	
            			const formData = new FormData()
            			this.files.forEach((item) => {
		                    console.log(item.file)
		                    formData.append('picArrayFile', item.file)
		                    formData.append('userId', userId)
		                    formData.append('eaId', eaId)
		                    formData.append('userCode', userCode)
		                    formData.append('type', type)
		                    formData.append('moduletypeId', moduletypeId)
		                })
		                const xhr = new XMLHttpRequest()
		                xhr.upload.addEventListener('progress', this.uploadProgress, false)
		                xhr.open('POST', this.src, true)
		                this.uploading = true
		                xhr.send(formData)
		                xhr.onload = () => {
		                    this.uploading = false
		                    if (xhr.status === 200 || xhr.status === 304) {
                                this.sucMessage ="提交成功"
                                this.sucShow = true;
                                this.clearStorage()
		                        this.status = 'finished'
		                        this.$store.textInfo = this.textarea;
		                        this.status = this.maxNum;
		                    } else {
		                        console.log(`error：error code ${xhr.status}`)
		                    }
		                }
            			
            		}else{
            			this.messInfo ="提交失败"
            			this.isPopup = true;
            			this.clearStorage()
            		}
            	})

            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1);
                this.status = this.files.length;
                if(this.files.length < 1){
                	this.showText = true;
                }
            },
            fileChanged() {
                const list = this.$refs.file.files;
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
	                        if(this.files.length > 0){
	                        	this.showText = false;
	                        }
	                    }
	                }	
                }
                this.status = this.files.length;
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
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
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            },
            clearStorage () { //2s报错弹出框消失
                let time = setTimeout(()=>{
                    if( this.isPopup ==  true){
                        this.isPopup = false;
                    } 
                    if( this.sucShow ==  true){
                        this.sucShow = false;
                		this.$router.go(-1);
                    } 
                },2000);  
            }
        },
        components:{
            popup,sucPopup,Loading
        }
    }
</script>
<style>
.service-uploader {
   width: 100%;
   position: fixed;
   left: 0;
   bottom: 0;
}
.service-uploader-img-title {
	text-align: center;
	height: .5rem
}
.service-uploader-img-title b {
	border-top:.011rem solid #e6e6e6;
	display: block;
	width: 100%;
}
.service-uploader-img-title i {
	padding: .3rem;
	background: #fff;
	position: relative;
    top: -.26rem;
    font-size: 14px;
    color: #999;
}
.service-uploader-img-title i span {
	padding: .14rem .3rem;
	background: #ff9700;
	border-radius: .3rem;
	color: #fff;
	font-size: 14px;
}
.service-uploader-img-title {
	position: relative;
}
.service-uploader-img-box {
	width: fit-content;
	width: -moz-fit-content;
	width: -webket-fit-content;
	margin: 0 auto .3rem;
}
.service-uploader-img-butt {
	width: 100%;
}
.service-uploader-img-butt a {
	display: block;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	font-size: 16px;
	color: #fff;
	background: #009983;
}
.service-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.service-uploader-img-top {
	padding: 0 .3rem;
}
.service-uploader-img-top .file-item {
    width: 2rem;
    height:2rem;
    margin-right: 0.15rem;
    position: relative;
    overflow: hidden;
    float: left;
}
.service-uploader-img-top .file-item img {
	width: 100%;
}
.service-uploader .file-list .file-text {
	float: left;
	width: 65%;
	font-size: 0.28rem;
	padding-left: 0.3rem;
	
}
.service-uploader .file-list .file-text p:first-of-type{
	color: #666;
	margin-top: 0.5rem;
}
.service-uploader .file-list .file-text p:last-of-type{
	color: #999;
	font-size: 0.26rem;
	margin-top: 0.25rem;
}
.service-uploader .file-list .file-item img {
    width: 100%;
}
.file-remove {
    position: absolute;
    width: 0.35rem;
    height: auto;
    right: 0;
    top: 0;
}
.service-uploader .add span {
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    overflow: hidden;
}
.service-uploader .add span img {
    display: block;
    width: 100%;
    height: 100%;
}
.service-uploader .upload-func {
    padding: 0 0.3rem;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0.2rem;
}
.service-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.service-uploader .upload-func .operation-box button {
    display: block;
    width: 100%;
    height: 0.82rem;
    border-radius: 6px;
    background: #439685;
    font-size: 0.33rem;
    text-align: center;
    line-height: 0.82rem;
    border: 0 none;
    outline: none;
    color: #fff;
    border: none;
}
.service-uploader > input[type="file"] {
    display: none;
}
.loadingPage{
	z-index: 999999;
	background: #fff;
	top: 0.84rem;
}
</style>