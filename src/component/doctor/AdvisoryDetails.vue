<template>
	<div style="height: 100%;">
		<heads :title="title" id="heads">
			<span @click="advisory">提交</span>
		</heads>
		<loading v-if='isLoading'></loading>
		<div class="wrapDiv" id="footTalk" style="position: fixed;">
			<p class="headerWrap">
				<span >症状描述</span>
			</p>
			<div class="textareaDiv">
				<div>
					<textarea v-model="qContent" name="" rows="" cols="" placeholder="请详细描述您的问题，包括身体状况、疾病和症状等，我们将会尽快为您服务，并且保证您的隐私…" @focus="focus">
					
					</textarea>
				</div>
				
				
				<!--<div class="imgBoxDiv">
					<dl class="imgBoxDL">
						<dt v-for="item in imgsF" class="a" v-show="isShow" >
							<img v-bind:src="item" alt=""  />
							<img src="../../assets/image/doctor/act-closeBtn_03.png"  @click="closeBtn" style="position: absolute; top: 0; right: 0; width: 0.4rem !important;" alt="" />
						</dt>
						<dt v-if="imgsF.length < 3">
							<input type="file" name="" @change="add_imgZ" id="" value="" />
							<img src="../../assets/image/doctor/add-btn.png" alt="" />
						</dt>
						
						<dd v-if="imgsF.length < 1 ">
							<p>可添加图片</p>
							<p>症状部位，检查报告或其他病情资料</p>
						</dd>
					</dl>
				</div>-->
			</div>
			<uploader :src="'/webapiProxy/webapi/picAppUpload.action'" :maxNum="3" :btnType="btnType" :textarea="qContent"></uploader>
		</div>
		<err :message="errMsg" v-if="isErr"></err>
		<suc :sucMessage="sucMsg" v-if="isSuc"></suc>
	</div>
</template>

<script>
	import heads from "../common/head.vue"
	import Loading from "../common/loading.vue"
	import uploader from '../common/uploader.vue'
	import err from "../common/error-popup.vue"
	import suc from "../common/suc-popup.vue"
	export default {
		data(){
			return {
				title: "咨询详情",
				imgsF: [],
				isShow: true,
				qContent: '',
				qReceiverId: this.$route.query.teamId,
				qConditionValue: this.$route.query.teamId,
				isLoading: false,
				errMsg: '',
				isErr: false,
				isSuc: false,
				sucMsg: '',
				btnType:1
			}
		},
		components:{
			heads,
			Loading,
			err,
			suc,
			uploader
		},
		methods:{
			add_imgZ (event){	 	    
	 	  	    var reader = new FileReader();
	 	  	    var img1 = event.target.files[0];
                reader.readAsDataURL(img1);
                var that = this;
              
                reader.onloadend = function() {
               		that.imgsF.push(reader.result);
               		console.log(that.imgsF)
               		
            	}
             
              
	 	  	},
	 	  	closeBtn(){
	 	  		this.isShow = false;
	 	  		this.imgsF = [];
	 	  		console.log("a")
	 	  	},
	 	  	focus(){//input获取焦点后的处理
				let that = this;
				console.log('aaa')
				setTimeout(function(){
					console.log('bbb')
					let focus = document.getElementById("footTalk")
//					let focus = that.$refs.footTalk
					console.log(focus)
					focus.scrollIntoView(true);
					focus.scrollIntoViewIfNeeded();
					document.body.scrollTop = document.body.scrollHeight;
				},200)
			},
	 	  	//660004 咨询详情
	 	  	advisory(){
				this.isLoading = true;
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				let token = userInfo.token;
				let adviData = JSON.stringify({
					qContent: this.qContent,
					qReceiverId: this.qReceiverId,
					qConditionValue: this.qConditionValue,
					qId: '',
					qType: "groupDocConsult"
				});
				console.log(adviData);
				if(this.qContent != ""){

					this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660004, jsonValue: adviData}, { emulateJSON: true })

					.then( response => {
						console.log(response)
						let state = response.body.state;
						switch (state){
							case "suc":
								this.isSuc = true;
								this.sucMsg = "提交成功"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isSuc = false;
					            }, 500)
							break;
							
							case "err_consult_004":
								this.isErr = true;
								this.errMsg = "图片过大"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;
				            
				            case "err_consult_002":
					            this.isErr = true;
								this.errMsg = "有未完成的咨询"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;
				            case "err_consult_001":
					            this.isErr = true;
								this.errMsg = "系统异常"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
				            break;
				            
							default:
								this.isErr = true;
								this.errMsg = "图片过大"
								setTimeout(() => {
					               this.isLoading = false;
					               this.isErr = false;
					            }, 500);
							break;
						}
						
						
						
					})
				}else{
					this.isErr = true;
					this.errMsg = "发送消息不能为空",
					setTimeout(() => {
		               this.isErr = false;
		            }, 500)
				}
				
			},
		}
	}
</script>

<style>
	#heads{
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	#heads h2{
		color: #fff;
	}
	#heads span {
		color:  #fff;
		position: absolute;
		top: 0;
		z-index: 88;
		right:0.25rem ;
		line-height: 0.84rem;
		font-size: 0.28rem;
		width: 0.8rem;
		text-align: center;
	}
	.wrapDiv{
		/*position: fixed;
		top: 0.84rem;
		width: 100%;
		height: 100%;*/
		width: 100%;
		height: 100%;
		/*padding-top: 0.84rem;*/
	}
	.headerWrap{
		height: 0.84rem;
		line-height: 0.84rem;
		font-size: 0.3rem;
		color: #666;
		border-bottom: 1px solid #eee;
		width: 100%;
	}
	.headerWrap span{
		width: 94%;
		margin: 0 auto;
		display: block;
	}
	.textareaDiv{
		width: 100%;
		margin:  0 auto;
		height: 5rem;
		
	}
	.textareaDiv div{
		width: 94%;
		height: 100%;
		margin: 0 auto;
	}
	.textareaDiv textarea{
		width: 100%;
		height: 100%;
		padding-top: 0.2rem;
		border: none;
		resize:none;
		outline: none;
		color: #333;
		font-size: 0.24rem;
		
	}
	.imgBoxDL{
		width: 94%;
		margin: 0 auto;
		padding-top: 0.2rem;
	}
	.imgBoxDL dt{
		width: 2rem;
		height: 2rem;
		border: 1px dashed #eee;
		float: left;
	}
	.imgBoxDL dt input{
		height: 2rem;
		width: 2rem;
		position: absolute;
		opacity: 0;
	}
	.imgBoxDL dt img{
		text-align: center;
		width: 1.2rem;
		padding: 0.4rem 0 ;
		display: block;
		margin-left: 0.4rem;
	}
	.imgBoxDL dd{
		float: right;
		width: 65%;
		font-size: 0.28rem;
	}
	.imgBoxDL dd p{
		margin-top: 0.25rem;
	}
	.imgBoxDL dd p:first-of-type{
		color: #666;
		
	}
	.imgBoxDL dd p:last-of-type{
		color: #999;
		font-size: 0.26rem;
	}
	div.imgBoxDiv{
		border-top: 1px solid #eee !important;
		width: 100%;
		height: 2.6rem;
		position: fixed;
		bottom: 0;
	}
	
	.a{
		margin-right: 0.5rem;
		position: relative;
	}
	.a:last-of-type{
		margin: 0;
	}
	.a img {
		width: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}
</style>