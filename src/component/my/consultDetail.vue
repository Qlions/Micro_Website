<template>
	<section id="consultDetail">
		<Heads :title="titleName"></Heads>
		<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
		<errorPopup v-if="errShow==true" :message="message"></errorPopup>
		<div class="consultD-container">
			<p class="consultD-tip" :style="{ top:activeTop }">医生回复仅为建议，具体诊疗请前往医院进行</p>
			<scroller ref="ball"
			:on-refresh="refresh"
			v-if='isLoading == false'
			:style="{ top:1+'rem' }"
			>
				<ul class="consultD-list">
					<li class="consultD-list-item" v-for="(count,index) in arrList">
						<!--用户资询模块-->
						<div v-if="count.source==0"><!--问答模块-->
							<div class="one-message" v-if="count.QId!=''">
								<div class="list-left">
									<img :src="count.userPhotosmall"/>
								</div>
								<div class="list-right">
									<div class="list-right-box">
										<div class="list-right-t">
											<span class="consultTime">{{count.createTime?count.createTime.substring(0,10):""}}<span id="blank"></span>{{count.createTime?count.createTime.substring(11,19):""}}</span>			
											<div style="float:right;margin-right: 0.2rem;height: 0.4rem;">
												<div style="float: left;color: blue;">{{count.userName}}</div>
												<div style="float: left;">咨询:</div>
											</div>
										</div>
										<div class="triangle-topleft"></div>
										<div class="list-right-b">{{ count.QContent }}
											<div class="userConsultImg" v-if="count.fileUrl != null">
												<span v-for="fileItem in count.fileUrl.split(',')">
													<img :src="fileItem" alt="" data-preview-src="" data-preview-group="1"/>
												</span>
											</div>
										</div>
									</div>
									
								</div>			
							</div>
							<!--医生回复模块-->
							<div class="other-message" v-if="count.AId != null &&count.AId!=''">
								<div class="null" v-if="count.AcreateTime">
									<div class="list-left doc-pic">
										<img :src="count.docPhotosmall"/>
									</div>
									<div class="list-right">
										<div class="list-right-box">
											<div class="list-right-t">
												<div style="float: left;font-size: 0.22rem;">
													<div style="float: left;color: blue;">{{count.docName}}</div>
													<div style="float: left;">回复:</div>
												</div>
												<span class="consultTime" v-if="count.AcreateTime" style="float: right;">{{ count.AcreateTime?count.AcreateTime.substring(0,10):""}}
													<span style="display: inline-block;width:0.1rem;"></span>
													{{ count.AcreateTime?count.AcreateTime.substring(11,19):""}}
												</span>
											</div>
											<div class="list-right-b">{{count.AContent}}
												<div class="userConsultImg" v-if="count.docFileUrl != null">
													<span v-for="docFileItem in count.docFileUrl.split(',')">
														<img :src="docFileItem" alt="" data-preview-src="" data-preview-group="1"/>
													</span>
												</div>
											</div>
											<div class="triangle-topleft"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="sysMessage" v-if="count.source==1"><!--系统消息模块-->
							{{count.createTime?count.createTime.substring(0,10):""}}<span id="blank"></span>{{count.createTime?count.createTime.substring(11,19):""}}
							<span id="blank"></span>{{ count.QContent }}
						</div>
					</li>
				</ul>
				<div id="msgend" style="height:1rem; overflow:hidden;" ref="divGenres"></div>
			</scroller>
			<div class="foot" id="footTalk" v-if="this.$route.query.wtState != 4">
				<div class="service_evaluate" v-if="evaluatePoVal == 1" @click="Getvaluate">
					<span>如果问题已解决请评价</span>
				</div>
				<div class="messSend">
					<div class="messSend-pic">
						<img src="../../assets/image/my/choicePic.png" @click="add"/>
						<input type="file" @change="fileChanged" ref="file1" name="" accept="image/*" id="consult-img" />
					</div>
					<textarea id="sendMessage" :style="{height: height + 'rem'}" placeholder="咨询" ref="footTalk" v-model="messageTxt" @focus="focus" spellcheck="false"/>
					<a @click="sendMessage()" >发送</a>
				</div>
				<!--图片显示区域-->
				<div class="fileImgBox" v-if="files!=''">
					<div v-for="(file, index) of files">
						<img :src="file.src" alt="" ondragstart="return false;">
					</div>
					<span class="fileRemove" @click="remove">
	                    <img src="../../assets/image/server/close_img.png" />
	                </span>
	            </div>     
			</div>
			<div class="foot_evaluate" v-if="this.$route.query.wtState == 4" @click="completePo">
				<span>服务评价</span>
			</div>
		</div>

		
		<!-- 客服评价弹出框 -->
		<div class="evaluate_popup" v-if="evaluatePoPage">
			<div class="evaluate_popup_box" @click="codePopu"></div>
			<div class="evaluate_popup_content">
				<h2 @click="codePopu">请评价本次服务</h2>
				<div class="evaluate_popup_content_text">
					<ul>
						<li v-for="(item,index) in items" :class="{ starArctive:starIndex>=index }" @click='addStar(index,item.code)'></li>
					</ul>
					<textarea v-model="commentContent" placeholder="这里面可以说点话…">
						
					</textarea>
				</div>
				<a href="javascript:void(0)" @click="postAssess">提交评价</a>
			</div>
		</div>

		<!-- 查看评价弹出框 -->
		<div class="evaluate_popup" v-if="SeeEvaluatePoPage">
			<div class="evaluate_popup_box" @click="SeecodePopu"></div>
			<div class="see_evaluate_popup_content">
				<h2 @click="SeecodePopu">评论</h2>
				<div class="see_evaluate_popup_content_text">
					<div class="see_evaluate_popup_content_xx">
						<ul>
							<li v-for="(item,index) in items" :class="{ starArctive:assessData.commentValue>=item.code }"></li>
						</ul>
					</div>
					<textarea v-model="assessData.commentContent" readonly="readonly" placeholder="这里面可以说点话…">
						
					</textarea>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				isLoading:true,
				QId:this.$route.query.id,
				wocode:this.$route.query.wocode,
				list:[],
				message:'',
				messageTxt:"",
				qReceiverId:"",
				qConditionValue:"",
				titleName:"咨询详情",
				dataArr:[],
				mothObj:{},
				arrList:[],
				nohead:"nohead",
				status: 0,
                files: [],
                point: {},
                uploading: false,
                showText: true,
                percent: 0,
                isPopup:false,
                messInfo:"",
                listLength:"",
                maxNum:3,
                height:0.7,
                flag:false,
                errShow:false,
                QType:"",
                activeTop:.84+'rem',//iscoll，
                hasError:"",
                starIndex:-1,
                items: [
　　　　　　　　 	{code:80},
					{code:85},
					{code:90}, 
					{code:95},
					{code:100}
　　　　　　　　],
				assessData:"", //评论内容
				commentScore:"", // 星星数
				commentContent:"",// 文本内容
				evaluatePoVal:"", // 判断评价弹出框
				evaluatePoPage:false, // 判断评价弹出框
				SeeEvaluatePoPage:false, // 查看评价
			}
		},
		components:{
			Heads,
			Loading,
			errorPopup
		},
		watch:{
			messageTxt(){
				if(this.flag == false){
					this.height =Math.min( Math.max(0.7,  this.$el.querySelector('#sendMessage').scrollHeight /50),  1.5);
					console.log(this.height)
				}else{
					this.height=0.7
				}
//				var docEl = document.documentElement;
//				var clientWidth = docEl.clientWidth;
			}
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			add() {
                this.$refs.file1.click();
            },
            remove(){
            	this.files = [];
            },
			finished() {
                this.files = []
                this.status = 'ready'
            },
			fileChanged() {//添加图片
                const list = this.$refs.file1.files;
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
                console.log(this.files)
                this.status = this.files.length;
                this.$refs.file1.value = ''
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
            
			consultDetail:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					qId:this.QId,
					userType:1
				});
				this.arrList = [];
				let QContentList=[];
				let AContentList = [];
				let newArr;
				let newArr1;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660132, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.assessData = response.body.rows[0];
					this.evaluatePoVal = response.body.map.isReply;
					this.list = response.body.rows;
					this.QType = response.body.rows[0].QType;
					this.loadingClose()
					this.qReceiverId = this.list[0].QReceiverId;
					this.qConditionValue = this.list[0].QConditionValue;

					for (var i = 0; i < this.list.length; i++) {
						let QContent = this.list[i].QContent;
						QContentList.push(QContent);	
						let source = this.list[i].source;
						let Qid = this.list[i].QId;
						let Acontent = this.list[i].Acontent;
						let Aid = this.list[i].AId;
						if(i == 0){
							//系统消息
							this.arrList.push( this.list[i] );
						}else if(source == 1){
							this.arrList.push( this.list[i] );
						}else if(source == 0){
							if( this.list[i-1].QId != Qid  ){
								this.arrList.push( this.list[i] );
							}else if(this.list[i-1].QId == Qid && Aid !=''&& Aid != null){
								this.arrList.push( this.list[i] );
								this.arrList[i].QId = '';
							}
						}
					}
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.consultDetail();
					done();
				}, 1000)
			},
			focus(){//input获取焦点后的处理
				let that = this;
				console.log('aaa')
				setTimeout(function(){
					let focus = document.getElementById("footTalk")
//					let focus = that.$refs.footTalk
					focus.scrollIntoView(true);
					focus.scrollIntoViewIfNeeded();
				},200)
			},
			sendMessage(){
				this.arrList = [];
				if(this.messageTxt!=''){
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let userId = userInfo.userId;
					let eaId = userInfo.eaId;
					let userCode = userInfo.userCode;
					let token = userInfo.token;
					let data = JSON.stringify({
						qid:this.QId,
						content:this.messageTxt,
						type:1,
						wocode:this.wocode,
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660503, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if( response.body.state == 'suc' ){
							this.messageTxt = "";
							this.flag = true;
							//上传图片
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
			                
			                xhr.open('POST', '/webapiProxy/webapi/picAppUpload.action', true)
			                
			                this.uploading = true
			                xhr.send(formData)
			                this.files = [];
			                xhr.onload = () => {
		                    this.uploading = false
			                    if (xhr.status === 200 || xhr.status === 304) {
			                       // this.status = 'finished'
			                        this.consultDetail();
			                        this.$store.textInfo = this.textarea;
			                        this.status = this.maxNum;
			                        this.files = [];
			                    } else {
			                        console.log(`error：error code ${xhr.status}`)
			                        this.files = [];
			                    }
			                }
						}	
					})
				}
				this.height = 0.7;
			},
			// 选择星星
			addStar (index,code) {
				this.starIndex = index;
				this.commentScore = code;
			},
			//错误提示框
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}
                },1500);  
			},

			Getvaluate () {
				this.evaluatePoPage = true;
			},
			// 提交评价
			postAssess () {
				if(this.commentScore<80){
					this.errShow = true;
					this.message = "请选择评分星级"
					this.clearStorage()
				}else if(this.commentContent ==''){
					this.errShow = true;
					this.message = "请输入评价内容"
					this.clearStorage()
				}else{
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
						content: this.commentContent,
						contentValue:this.commentScore,
						qid:this.QId,
						type:2,
						wocode:this.wocode
				
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660505, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						if(response.body.state == 'suc'){
							this.errShow = true;
							this.message = "评论成功"
							this.clearStorage();
							setTimeout(function(){
								this.$router.go(-1)
							},1500);
							
						}else {
							this.errShow = true;
							this.message = "评价失败"
							this.clearStorage()
						}
					})
				}
			},

			// 查看评论
			completePo () {
				this.SeeEvaluatePoPage = true;
			},

			codePopu () {
				this.evaluatePoPage = false;
			},

			SeecodePopu () {
				this.SeeEvaluatePoPage = false;
			}
		},
		
		mounted() {
			this.consultDetail()
			mui.previewImage();
//			console.log(this.$refs.ball)
//			this.$el.querySelector('#msgend').scrollIntoView(true)
//			console.log(this.$el.querySelector('#msgend').scrollHeight)
		}
		
	}
</script>

<style>
	/*图片显示区域样式*/
	.fileImgBox{
		position: absolute;
		margin-bottom:1px ;
		top: -1rem;
		left: 0;
		box-sizing: content-box;
		background: #fff;
		text-align: left;
		z-index: 9;
		height: 1rem;
		border: 1px solid #eee;
	}
	.fileRemove{
		position: absolute;
	    width: 0.3rem;
	    height:0.3rem;
	    right: 0;
	    top: 0;
	    z-index: 9;
	}
	.fileRemove img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.fileImgBox div{
		display: inline-block;
		width: 1rem;
		height: 1rem;
	}
	.fileImgBox div img{
		display: inline-block;
		width: 1rem;
		height: 1rem;
	}
	#consultDetail{
		/*padding-top: 0.84rem;
		padding-bottom: 3rem;*/
		height: 100%;
		width: 100%;
		position: absolute;
	}
	.consultD-container{
		/*height: 100%;*/
		width: 100%;
	}
	#consult-img{
		display: block;
		width: 0;
		height: 0;
	}
	.consultD-tip{
		position: fixed;
		top: 0.84rem;
		left: 0;
		z-index: 9;
		width:100%;
		height: 0.5rem;
		line-height: 0.5rem;
		margin: 0rem auto;
		background: #faf5e8;
		text-align: center;
		border-radius: 3px;
		color: #f59645;
	}
	.consultD-list{
		width: 100%;
	    margin: 0.2rem auto;
	    padding: 0 0.3rem;
	    padding-bottom: 10px;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.consultD-list-item{
		overflow: hidden;
		position: relative;
	}
	.one-message,.other-message{
		margin-top: 0.3rem;
	}
	.one-message .list-left{
		margin-right: 0.2rem;
		width:0.8rem;
		height: 0.8rem;
		position: absolute;
		right: -0.2rem;
		overflow: hidden;
		border-radius: 50%;
		border:1px solid #eee;
	}
	.one-message .list-left img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.one-message .list-right{
		width: 100%;
		position: relative;
		box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    padding-left: 0.6rem;
		padding-right: 1.2rem;
	}
	.one-message .list-right .list-right-box{
		background: #f2f2f2;
		border-radius: 3px;
		padding: 0.2rem 0.2rem;
	}
	/*三角形*/
	.one-message .triangle-topleft{
		width: 0;
	    height: 0;
	    border-top: 0.5rem solid #f2f2f2;
	    border-right: 0.3rem solid transparent;
	    position: absolute;
	    top: 0.3rem;
	    right: 0.9rem;
	}
	.one-message .list-right-t{
		line-height: 0.4rem;
		height: 0.4rem;
		color: gray;
	}
	.one-message .list-right-t>span{
		float: left;
	}
	.one-message .list-right-t p{
		float: right;
	}
	.one-message .list-right-t p i{
		color: blue;
	}
	.one-message .list-right-t p span{
		display: inline-block;
	}
	.one-message .list-right-b{
		line-height: 0.4rem;
	    white-space: normal;
	    word-break: break-all;
	}
	.userConsultImg span img{
		border: 1px solid #999;
		display: inline-block;
		width: 1rem;
		height: 1rem;
		margin-right: 0.2rem;
	}
	/*医生部分*/
	.other-message .list-left{
		margin-right: 0.2rem;
		width:0.8rem;
		height: 0.8rem;
		position: absolute;
		left: 0rem;
		overflow: hidden;
		border-radius: 50%;
		border:1px solid #eee;
	}
	.other-message .list-left img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.other-message .list-right{
		width: 100%;
		position: relative;
	    padding-left: 1.2rem;
		padding-right: 0.6rem;
	}
	.other-message .list-right .list-right-box{
		background: lightblue;
		border-radius: 3px;
		padding: 0.1rem 0.2rem;
	}
	/*三角形*/
	.other-message .triangle-topleft{
		width: 0;
	    height: 0;
	    border-top: 0.5rem solid lightblue;
	    border-left: 0.3rem solid transparent;
	    position: absolute;
	    top: 0.3rem;
	    left: 0.9rem;
	}
	.other-message .list-right-t{
		line-height: 0.4rem;
		height: 0.4rem;
		color: gray;
		overflow: hidden;
	}
	.other-message .list-right-t>span{
		float: right;
	}
	.other-message .list-right-t p{
		float: left;
	}
	.other-message .list-right-t p i{
		color: blue;
	}
	.other-message .list-right-b{
		line-height: 0.4rem;
	    white-space: normal;
	    word-break: break-all;
	}
	.foot{
		background: #eee;
	    width: 100%;
	    position: fixed;
	    left: 0;
	    right: 0;
	    text-align: center;
	    z-index: 1;
	    bottom: 0;
	}
	.messSend{
		float: left;
	    width: 100%;
	    padding: 0 0.2rem 0.1rem;
	    position: relative;
	    overflow: hidden;
	}
	.messSend-pic{
		float: left;
		margin-top: 0.2rem;
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.15rem;
	}
	.messSend-pic img{
		width: 100%;
		height: 100%;
		display: block;
	}
	/*.messSend label {
    	float: left;
	    width: 100%;
	    height: 0.6rem;
	    line-height: 34px;
	    padding-left: 0.2rem;
	    margin-top: 0.2rem;
	    background: #eee;
	    padding-right: 1.2rem;
	}*/
	/*.sendMessageBox{
		float: left;
		text-align: left;
	    width: 5.2rem;
	    margin-top: 0.15rem;
	    line-height: 0.3rem;
	    border: 1px solid #dcdcdc;
	    background: #fff;
	    font-size: 0.28rem;
		white-space: normal;
	    word-break: break-all;
	    outline: none;
		height:auto!important;
		
		min-height: 0.7rem;
		
	}*/
	#sendMessage{
		float: left;
	    width: 5.2rem;
	    padding: 0.2rem 0.1rem;
	    margin-top: 0.15rem;
	    line-height: 0.3rem;
	    border: 1px solid #dcdcdc;
	    background: #fff;
	    font-size: 0.28rem;
		resize: none;
		/*white-space: normal;
	    word-break: break-all;*/
	    outline: none;
	    overflow: hidden;
	    /*position: relative;*/
	}
	.messSend a{
		position: absolute;
	    right: 0.1rem;
	    top: 0.25rem;
	    width: 1rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    text-align: center;
	    color: #fff;
	    border-radius:3px ;
	    font-size: 0.26rem;
	    background: #009983;
	}
	.blue{
		background: lightblue;
	}
	.healthy-consult{
		position: fixed;
		bottom: 0;
		z-index: 1;
		width: 100%;
		color: #666;
		background: rgba(255,255,255,1);
	}
	.healthy-consult-line{
		height: 0.15rem;
		background: #F2F2F2;
	}
	.healthy-consult-container{
		padding: 0.1rem 0.3rem;
	}
	.healthy-consult-floor1{
		padding: 0 0 0.1rem 0;
	}
	.healthy-consult-star{
		float: left;
	}
	.healthy-consult-star .starBox i{
		display: inline-block;
		width: 0.2rem;
		height: 0.2rem;
	}
	.healthy-consult-star .starBox i img{
		width: 100%;
		height: 100%;
	}
	.healthy-consult-time{
		float: right;
	}
	.healthy-consult-floor2{
		line-height: 0.6rem;
		height: 0.6rem;
	}
	.healthy-consult-floor3 p{
		background: #e6e6e6;
		text-align: center;
		line-height: 0.6rem;
		height: 0.6rem;
		border-radius: 3px;
	}
	#blank{
		display: inline-block;
		width: 0.1rem;
	}
	.list-right-t .consultTime{
		font-size: 0.2rem;
	}
	/*系统消息样式*/
	.sysMessage{
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		margin-top: 0.2rem;
		background: #ccc;
		border-radius: 5px;
		color: #fff;
		font-size: 0.24rem;
	}
	
	
	/*mui样式*/
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
		bottom: 1rem;
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
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	.evaluate_popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}
	.evaluate_popup_box {
		width: 100%;
		height: 100%;
		background: #00000052;
	}
	.see_evaluate_popup_content,
	.evaluate_popup_content {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
	}
	.see_evaluate_popup_content_text {
		padding: 0 .3rem;
	}
	.evaluate_popup_content_text {
		padding: .3rem;
	}
	.see_evaluate_popup_content h2 {
		color: #000;
		font-size: 14px;
		padding: .3rem;
		background: url(../../assets/image/my/close_icon.png) no-repeat center left .15rem;
		background-size: .5rem;
		padding-left: 1rem;
	}
	.evaluate_popup_content h2 {
		color: #000;
		font-size: 14px;
		margin-top: .3rem;
		text-align: center;
		background: url(../../assets/image/my/close_icon.png) no-repeat center left .15rem;
		background-size: .5rem;
	}
	.see_evaluate_popup_content_xx {
		padding: .3rem 0;
		border-bottom: 1px solid #e6e6e6;
		border-top: 1px solid #e6e6e6;
	}
	.see_evaluate_popup_content ul {
		width: fit-content;
		width: -moz-fit-content;
		width: -webket-fit-content;
		margin: 0 auto;
	}
	.evaluate_popup_content ul {
		width: fit-content;
		width: -moz-fit-content;
		width: -webket-fit-content;
		margin: 0 auto .3rem;
	}
	.see_evaluate_popup_content ul li,
	.evaluate_popup_content ul li {
		width: .40rem;
		height: .40rem;
		background: url(../../assets/image/my/gray_star.png) no-repeat;
		float: left;
		margin-right: .5rem;
		background-size: contain;
	}
	.see_evaluate_popup_content ul li.starArctive,
	.evaluate_popup_content ul li.starArctive {
		background: url(../../assets/image/my/red_star.png) no-repeat;
		background-size: contain;
	}
	.see_evaluate_popup_content ul li:last-child,
	.evaluate_popup_content ul li:last-child {
		margin-right: 0;
	}
	.evaluate_popup_content a {
		display: block;
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		background: #009983;
		font-size: 16px;
		color: #fff;
	}
	.see_evaluate_popup_content textarea {
		width: 100%;
		padding: .3rem 0;
		border: none;
	    resize: none;
	    height: auto!important;
	    font-size: 14px;
	    white-space: normal;
	    word-break: break-all;
	    outline: none;
	}
	.evaluate_popup_content textarea {
	    border: none;
	    resize: none;
		border:.01rem solid #e6e6e6;
		border-radius: .1rem;
		padding: .3rem;
	    width: 100%;
	    min-height: 3rem;
	    height: auto!important;
	    height: 4rem;
	    font-size: 14px;
	    white-space: normal;
	    word-break: break-all;
	    outline: none;
	}
	.service_evaluate {
	    background: #fff;
	    padding: .3rem;
	    width: 100%;
	    /* position: fixed; */
	    left: 0;
	    text-align: center;
	    z-index: 1;
	    /* bottom: 1rem; */
	}
	.service_evaluate span {
		padding: .1rem .3rem;
		border-radius: .3rem;
		background: #ebebeb;
		display: inline-block;
		font-size: 12px;
		color: #999;
		box-shadow: 0px 1px 2px #999;
	}
	.foot_evaluate {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		color: #999;
		position: fixed;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 1;
		bottom: 0;
		background: #eee;
		font-size: 16px;
		
	}
	.foot_evaluate span {
		background: url(../../assets/image/head-back-right.png) no-repeat center right;
		background-size: .7rem;
   		padding-right: .5rem;
	}
</style>