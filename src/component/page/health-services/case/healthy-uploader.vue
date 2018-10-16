<template>
    <div class="consult-uploader">
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">   
                <div class="case-details-record-img">
                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
                </div>
                <span class="file-remove" @click="remove(index)">
                    <img src="../../../../assets/image/server/close_img.png">
                </span>  
            </section>
            <section v-if="status != maxNum" class="file-item">
                <div @click="add" class="add">
                    <span>
                        <img src="../../../../assets/image/doctor/add-btn.png">
                    </span>
                </div>
            </section>
            <section class="file-text" v-if="showText">
            	<p>上传图片</p>
            	<p>图片最多上传五张</p>
            </section>
        </div>
        <slot></slot>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
        <popup v-show="isPopup" :message="messInfo"></popup>
        <sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
    </div>
</template>
<script>
    import popup from '../../../common/error-popup.vue'
    import sucPopup from '../../../common/suc-popup.vue'
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            imgArr:Array,
            textarea:String,
            maxNum:Number,
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
            }
        },
        mounted () {
            
        },
        methods: {
            add() {
                this.$refs.file.click();
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
                            if(this.files.length == this.maxNum){
                                this.isPopup = true;
                                this.messInfo = '最多上传5张图片';
                                this.clearStorage();
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files.push(item);
                                this.$store.state.filesArr.push(item);
                            }     
                            
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
                    } 
                },2000);  
            }
        },
        components:{
            popup,
            sucPopup,
        },
        watch:{
            imgArr:function () {
                this.imgArr = this.imgArr;
            }
        }
    }
</script>
<style>
    header i {
    	display: block;
    	text-align: center;
    	line-height: .84rem;
    	color: #fff;
    	font-size: .32rem;
    	width: .84rem;
    	height: .84rem;
    	position: absolute;
    	right: 0;
    	top: 0;
    }
    .consult-uploader {
       width: 100%;
    }
    .consult-uploader .file-list {
        padding-bottom: 0.3rem;
        border-top: 0.01rem solid #f3f3f3;
        border-bottom: 0.01rem solid #f3f3f3;
    }
    .consult-uploader .file-list:after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
        font-size: 0;
    }
    .consult-uploader .file-list .file-item {
        width: 1.5rem;
        height:1.5rem;
        margin-right: 0.15rem;
        position: relative;
        overflow: hidden;
        float: left;
        margin-top: 0.2rem;
        border: 0.02rem dashed #e6e6e6;
    }
    .consult-uploader .file-list .file-text {
    	float: left;
    	width: 45%;
    	font-size: 0.28rem;
        padding-left: .1rem;
    }
    .consult-uploader .file-list .file-text p:first-of-type{
    	color: #666;
    	margin-top: 0.45rem;
        padding: 0;
    }
    .consult-uploader .file-list .file-text p:last-of-type{
    	color: #999;
    	font-size: 0.26rem;
        margin-top: 0.2rem;
        padding: 0;
    }
    .consult-uploader .file-list .file-item img {
        width: 100%;
    }
    .file-remove {
        position: absolute;
        width: 0.35rem;
        height: auto;
        right: 0;
        top: 0;
    }
    .consult-uploader .add span {
        margin-top: 0.2rem;
        margin-left: 0.2rem;
        display: block;
        width: 1rem;
        height: 1rem;
        overflow: hidden;
    }
    .consult-uploader .add span img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .consult-uploader .upload-func {
        padding: 0 0.3rem;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0.2rem;
    }
    .consult-uploader .upload-func .progress-bar {
        flex-grow: 1;
    }
    .consult-uploader .upload-func .operation-box button {
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
    .consult-uploader > input[type="file"] {
        display: none;
    }
    .preservation {
        width: 100%;
        height: 1rem;
        background-color: #009983;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: .32rem;
        text-align: center;
        line-height: 1rem;
    }
    .preservation a {
        color: #fff;
    }
    .server-topBar{
        position: absolute;
        width: 100%;
        left: 0;
        height: 44px;
        background: #000;
        background: url(../../../../assets/image/head-back.png) no-repeat #000 left 0.1rem center;
        background-size: 7%;
        text-align: center;
        line-height: 44px;
        color: #fff;
        font-size: 18px;
    }
    .mui-preview-image.mui-fullscreen {
        position: fixed;
        z-index: 20;
        background-color: #000;
    }
    .mui-preview-header,
    .mui-preview-footer {
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 10;
    }
    .mui-preview-header {
        height: 44px;
        bottom: 50px;
    }
    .mui-preview-footer {
        height: 50px;
        bottom: 0px;
    }
    .mui-preview-header .mui-preview-indicator {
        display: block;
        line-height: 25px;
        color: #fff;
        text-align: center;
        margin: 15px auto 0;
        width: 70px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 12px;
        font-size: 16px;
    }
            
    .mui-preview-image {
        display: none;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .mui-preview-image.mui-preview-in {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
    .mui-preview-image.mui-preview-out {
        background: none;
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }
    .mui-preview-image.mui-preview-out .mui-preview-header,
    .mui-preview-image.mui-preview-out .mui-preview-footer {
        display: none;
    }
    .mui-zoom-scroller {
        position: absolute;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        -webkit-backface-visibility: hidden;
    }
    .mui-zoom {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
    }
    .mui-slider .mui-slider-group .mui-slider-item img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
        width: 100%;
    }
    .mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
        display: inline-table;
    }
    .mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
        display: table-cell;
        vertical-align: middle;
    }
    .mui-preview-loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: none;
    }
    .mui-preview-loading.mui-active {
        display: block;
    }
    .mui-preview-loading .mui-spinner-white {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -25px;
        margin-top: -25px;
        height: 50px;
        width: 50px;
    }
    .mui-preview-image img.mui-transitioning {
        -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }
    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @-webkit-keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .mui-fullscreen {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .mui-slider {
        position: relative;
        z-index: 1;
        overflow: hidden;
        width: 100%;
    }
    .mui-fullscreen.mui-slider .mui-slider-group {
        height: 100%;
    }
    .mui-slider .mui-slider-group {
        font-size: 0;
        position: relative;
        -webkit-transition: all 0s linear;
        transition: all 0s linear;
        white-space: nowrap;
    }
    .mui-hidden {
        display: none!important;
    }
    .mui-slider .mui-slider-group .mui-slider-item {
        font-size: 14px;
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
        white-space: normal;
    }
    .mui-slider .mui-slider-group .mui-slider-item img {
        width: 100%;
    }
</style>