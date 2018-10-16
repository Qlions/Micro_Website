<template>
    <div class="vue-uploader">
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <span class="file-remove" @click="remove(index)">
                    <img src="../../assets/image/server/close_img.png">
                </span>
            </section>
            <section v-if="status != maxNum" class="file-item">
                <div @click="add" class="add">
                    <span>
                        <img src="../../assets/image/doctor/add-btn.png">
                    </span>
                </div>
            </section>
            <section class="file-text" v-if="showText">
            	<p>可添加图片</p>
            	<p>症状部位，检查报告或其他病情资料</p>
            </section>
        </div>
        <slot></slot>
        <input type="file" accept="image/*" @change="fileChanged" ref="file">
        <section class="upload-func" ref="btn">
            <div class="operation-box">
                <button @click="submit">确定提交</button>
            </div>
        </section>
       <popup v-show="isPopup" :message="messInfo"></popup>
       <sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
       <Loading v-if="isLoading" class = "loadingPage"></Loading>
    </div>
</template>
<script>
    import popup from './error-popup.vue'
    import sucPopup from './qc-suc-popup.vue'
    import Loading from '../common/loading.vue'
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            textarea:String,
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
                if(this.textarea.length < 15){
                    this.isPopup = true;
                    this.messInfo = '请输入不少于15个字';
                    this.clearStorage();
                    return false;
                }
//              if (this.files.length === 0) {
//                  console.warn('no file!');
//                  return
//              }
                
                let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                console.log(userInfo);
                let userId = userInfo.userId;
                let token = userInfo.token;
                let userCode = userInfo.userCode;
                let eaId = userInfo.eaId;
                
                if(this.btnType == 1){
                	//团队咨询详情
                	let TeamData = JSON.stringify({
                		qContent : this.textarea,
                		qReceiverId : this.$route.query.docId,
                		qConditionValue : this.$route.query.docId,
                		qType : 'groupDocConsult'
                	})
                	console.log('团队信息',JSON.parse(TeamData));
                	
                	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660004, jsonValue:TeamData},{emulateJSON:true}).then(response =>{
                		console.log(response);
                		let dataState = response.body.state;
                		console.log(dataState);
                		if(dataState == 'suc'){
                			this.sucMessage ="上传成功"
                			this.sucShow = true;
                			this.clearStorage()
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
			                        this.status = 'finished'
			                        console.log('upload success!')
			                        this.$store.textInfo = this.textarea;
			                        this.status = this.maxNum;
			                    } else {
			                        console.log(`error：error code ${xhr.status}`)
			                    }
			                }
                			
                		}else{
                			this.messInfo ="上传失败"
                			this.isPopup = true;
                			this.clearStorage()
                		}
                	})
                }else {
                	//快速咨询详情
                	let data = JSON.stringify({
                		content : this.textarea,
                		payMoney: 0,
                		useBalance: 0
                	})
                	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660096, jsonValue:data},{emulateJSON:true}).then( response => {
						let dataState = response.body.state;
						this.isLoading = true;
                		if(dataState == 'suc'){
                			this.sucMessage ="上传成功";
                			this.isLoading = false;
                			this.sucShow = true;
                			this.clearStorage()
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
			                       // this.status = 'finished'
			                        console.log('upload success!')
			                        this.$store.textInfo = this.textarea;
			                        this.status = this.maxNum;
			                    } else {
			                        console.log(`error：error code ${xhr.status}`)
			                    }
			                }
                			
                		}else if(dataState == 'more_than_three_times'){
                			this.isLoading = false;
                			this.messInfo ="每天只能免费咨询3次"
                			this.isPopup = true;
                			this.clearStorage()
                		}else{
                			this.isLoading = false;
                			this.messInfo ="上传失败"
                			this.isPopup = true;
                			this.clearStorage()
                		}
					})
                }

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
.vue-uploader {
   width: 100%;
}
.vue-uploader .file-list {
    padding: 0 0.3rem;
    padding-bottom: 0.3rem;
    border-top: 0.01rem solid #f3f3f3;
    border-bottom: 0.01rem solid #f3f3f3;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    width: 2rem;
    height:2rem;
    margin-right: 0.15rem;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top: 0.2rem;
    border: 0.02rem dashed #e6e6e6;
}
.vue-uploader .file-list .file-text {
	float: left;
	width: 65%;
	font-size: 0.28rem;
	padding-left: 0.3rem;
	
}
.vue-uploader .file-list .file-text p:first-of-type{
	color: #666;
	margin-top: 0.5rem;
}
.vue-uploader .file-list .file-text p:last-of-type{
	color: #999;
	font-size: 0.26rem;
	margin-top: 0.25rem;
}
.vue-uploader .file-list .file-item img {
    width: 100%;
}
.file-remove {
    position: absolute;
    width: 0.35rem;
    height: auto;
    right: 0;
    top: 0;
}
.vue-uploader .add span {
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    overflow: hidden;
}
.vue-uploader .add span img {
    display: block;
    width: 100%;
    height: 100%;
}
.vue-uploader .upload-func {
    padding: 0 0.3rem;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0.2rem;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .operation-box button {
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
.vue-uploader > input[type="file"] {
    display: none;
}
.loadingPage{
	z-index: 999999;
	background: #fff;
	top: 0.84rem;
}
</style>