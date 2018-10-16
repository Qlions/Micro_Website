<template>
	<div class="articles">
		<Heads :title="title" v-on:child-say="listenToMyBoy"></Heads>
		<!-- :on-refresh="refresh" :on-infinite="infinite"  -->
		<!-- <scroller :style="{ top:activeTop }" :on-refresh="refresh" :on-infinite="infinite"> -->
			<div class="article">
				<div class="article_content">
					<div class="article_content_txt" ref="article" id="scrollee">
						<iframe :src="serverTabContent" id="external-frame" frameborder="no"></iframe>
					</div>
					<div class="core_reply_tail">
						<span class="read">阅读 <b>{{ tail.readCount }}</b></span>
						<span class="give_right">
							<b :class="[ {give_0:tail.thumbsUpOrDown == 0},{give_1:tail.thumbsUpOrDown == 1} ]" @click="give">{{ tail.thumbsUpCount }}</b>
							<b class="conment">{{ tail.commentCount }}</b>
						</span>
					</div>
				</div>
				<div class="article_reviews">
					<ul>
						<li class="article_reviews_list" v-for="item in reviewsList">
							<div class="article_reviews_list_img">
								<img :src="item.commentUserPhoto" alt="">
							</div>
							<div class="article_reviews_list_content">
								<p class="article_reviews_name">{{ item.commentUserName }}</p>
								<p class="article_reviews_date">{{ item.commentTime }}</p>
								<p class="article_reviews_txt">{{ item.commentContent }}</p>
								 <div class="reviews_reply" v-if="item.adviceContent">
								 	
									<p class="reviews_reply_title">{{ item.adviceUserName }}回复</p>
									<p class="reviews_reply_txt">{{ item.adviceContent }}</p>
									<p class="reviews_reply_date">{{ item.adviceTime }}</p>
								</div> 
							</div>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" @click="more" class="more" v-if="clickTxt != 1">查看更多评论</a>
				<a href="javascript:void(0)" class="more" v-else>没有更多评论</a>	
			</div>
		<!-- </scroller> -->
		<div class="article_reviews_data">
			<textarea placeholder="说点啥吧..." maxlength="50" id="txtarea_id" v-model="comment" @keyup="keyUp"></textarea>
			<!-- <div contenteditable="true" placeholder="说点啥吧..." class="test" @keyup="keyUp($event)">{{ comment }}</div>  -->
			<!-- <input type="text" placeholder="说点啥吧..." ref="aaa" id="iput" v-model="comment" @keyup="keyUp"> -->
			<a href="javascript:void(0)" @click="getComment">发送</a>
		</div>
		<popup :message="message" v-if="isPop"></popup>
	</div>
</template>
<script>
	import Heads from '../../common/head.vue'
	import popup from '../../common/error-min-popup.vue'
	export default {
		data(){
			return {
				show:false,
				isPop:false,
				message:"123",
				tail:"", //评论数、阅读数、点赞的数据
				title:'',
				reviewsList:"", //评论的列表
				knowId: this.$route.query.knowId,//文章ID
				comment:"",// input的值
				give1:"",
				hasError:"",
				serverTabContent:"",
				userId:"",
				activeTop:"",//iscroll
				rows:5,
				total:"",//评论数
				clickTxt:0, // 按钮文字
				articleUrl:"",//文章url
			}
		},
		components:{
			popup,
			Heads
		},
		mounted (){
			 
			// 解决title文字
			if( this.$route.query.knowName.length > 10 ){
			  	this.title = this.$route.query.knowName.substring(0,10)+"...";
			}else {
				this.title = this.$route.query.knowName;
			}
			//setInterval
			var that = this;
			document.getElementById("external-frame").onload = function() {
				that.setIframeHeight(document.getElementById("external-frame"))
			}			
			$(".conment").click(function (){
				$("#iput").focus()
			})
			// 判断头部添加的下载按钮
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = .84+'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			// 测试环境，上线需要修改assets-js-config-url.js 配置
			this.serverTabContent = "/iframeProxy/website/dict/knowledgeInfoMsgWord.action?knowId="+this.knowId;
			
			jQuery.fn.extend({
                autoHeight: function(){
                    return this.each(function(){
                        var $this = jQuery(this);
                        if( !$this.attr('_initAdjustHeight') ){
                            $this.attr('_initAdjustHeight', $this.outerHeight());
                        }
                        _adjustH(this).on('input', function(){
                            _adjustH(this);
                        });
                    });

                    function _adjustH(elem){
                    	var $obj = jQuery(elem);
                        return $obj.css({height: $obj.attr('_initAdjustHeight'),'overflow-y': 'hidden'})
                                .height( elem.scrollHeight );
                    }
                }
            });
            // 使用
            $(function(){
                $('textarea').autoHeight();
            });
			this.toil_number();//评论数、阅读数、点赞的数据
			this.reviews_list();//评论列表
			
		},
		methods: {
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			},
			keyUp () {
				if(this.comment.length == 50){
					this.isPop = true;
					this.message = '最多只能输入50字';
					this.clearStorage();
				}
			},
			//点赞
			give () {
				if(this.give1 == 1){
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = userInfo.userId;
					let data = JSON.stringify({
						beSupId:this.knowId,
						supState:"-1",
						suppoutType:"knowledge_praise",
						userId:userId
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771027, jsonValue:data },{emulateJSON:true})
					.then(response => {
						if(response.body.state == 'suc'){
							this.toil_number();
							this.isPop = true;
							this.message = '取消点赞成功';
							this.clearStorage();
						}
					})
				}else {
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let userId = userInfo.userId;
					let data = JSON.stringify({
						beSupId:this.knowId,
						supState:"1",
						suppoutType:"knowledge_praise",
						userId:userId
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771027, jsonValue:data },{emulateJSON:true})
					.then(response => {
						this.toil_number();
						if(response.body.state == 'suc'){
							this.toil_number();
							this.isPop = true;
							this.message = '点赞成功';
							this.clearStorage();
						}
					})
				}
				
				
			},
			//评论数、阅读数、点赞的数据
			toil_number () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					knowId:this.knowId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:560007, jsonValue:data },{emulateJSON:true})
				.then(response => {
					this.tail = response.body;
					this.give1 = this.tail.thumbsUpOrDown;
				})
			},
			//评论列表
			reviews_list () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
//					page:1, // 开始1条
//					rows:this.rows,
					knowId:this.knowId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211299, jsonValue:data },{emulateJSON:true})
				.then(response => {
					console.log(response)
					if(this.rows >= response.body.total){
						this.clickTxt = 1;
					}
					this.reviewsList = response.body.row
				})
			},
			setIframeHeight(iframe) {
				let iframeImg = document.getElementById('external-frame').contentWindow.document.body.getElementsByTagName("img");
				for(let i = 0; i < iframeImg.length; i++) {

					iframeImg[i].src = "/iframeProxy/upload" + iframeImg[i].src.split("/upload")[1];
				}	
				let time = setTimeout(function(){
					let h = document.getElementById('external-frame').contentWindow.document.body.offsetHeight;
					console.log(h);
					iframe.height = h;	
				},1000)
				
			},
			// 添加评论
			getComment () {
				if(this.comment == ''){
					this.isPop = true;
					this.message = '请先输入评论内容';
					this.clearStorage();
				}else {
					let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
					let token = userInfo.token;
					let data = JSON.stringify({
						comment:this.comment,
						knowId:this.knowId
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211298, jsonValue:data },{emulateJSON:true})
					.then(response => {
						if(response.body.status == 'suc'){
							this.reviews_list();
							this.toil_number();
							this.comment = '';
							this.isPop = true;
							this.message = '评论成功';
							this.clearStorage();
						}else {
							this.isPop = true;
							this.comment = '';
							this.message = '评论失败';
							this.clearStorage();
						}
					})
				}
				
			},
			more (){
				this.rows+=5;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page:1, // 开始1条
					rows:this.rows,
					knowId:this.knowId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211299, jsonValue:data },{emulateJSON:true})
				.then(response => {
					this.total  = response.body.total;
					this.reviewsList = response.body.row;	
				})
			},
			/*initDataList () { // 默认显示10条数据
				
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {	
					//this.initDataList();
					done();
				}, 1500)
			},
			more (done) { // 下拉加载每次
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					knowId:this.knowId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:211299, jsonValue:data },{emulateJSON:true})
				.then(response => {
					setTimeout(() => {	
						
						this.reviewsList = response.body.row
						done(true);
					}, 1500)
					
				})			
			},*/
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.isPop ==  true){
                		this.isPop = false;
                	} 
                },1500);  
			}
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.activeTop = .84+'rem';
				}
			},
			rows:function () {
				var _this = this;
				setTimeout(function(){
					if(_this.rows >= _this.total){
						_this.clickTxt = 1;
					}
				},500)
			}
		}
	}
</script>
<style>
	.articles {
		width: 100%;
		height: 600px;
		background: #ebebeb;
	}
	/* 文章内容区 */
	.article_content {
		background: #fff;
		padding: 0 .2rem;
	}
	.core_reply_tail {
		padding-top: .8rem;
		padding-bottom: .2rem;
		color: #A0A0A0;
		font-size: .28rem;
	}
	.core_reply_tail .give_right {
		float: right;
	}
	.give_right .give_0 {
		background: url(../../../assets/image/new/give_0.png) no-repeat left;
		background-size:.3rem;
		padding-left: .45rem;
		margin-right: .2rem;
	}
	.give_right .give_1 {
		background: url(../../../assets/image/new/give_1.png) no-repeat left;
		background-size:.3rem;
		padding-left: .45rem;
		margin-right: .2rem;
	}
	.give_right .conment {
		background: url(../../../assets/image/new/commentCount.png) no-repeat left;
		background-size:.3rem;
		padding-left: .45rem;
	}
	/* 评论区 */
	.article_reviews {
		background: #fff;
		padding: 0 .2rem;
		font-size: .28rem;
		border-top: .2rem solid #ebebeb;
	}
	.article_reviews ul li {
		padding: 0.2rem 0;
		overflow: hidden;
		border-bottom:.01rem solid #e6e6e6;
	}
	.article_reviews_list_img {
		float: left;
		width: 1rem;
		height: 1rem;
		border-radius: 1rem;
	}
	.article_reviews_list_img img {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
	}
	.article_reviews_list_content {
		width: 80%;
		float: left;
		margin-left: 0.3rem;
	}
	.article_reviews_name {
		color: #333;
	}
	.article_reviews_date {
		padding-bottom: .2rem;
		color: #A0A0A0;
	}
	.article_reviews_txt {
		color: #333;
		padding-bottom: .2rem;
	}
	.reviews_reply {
		width: 100%;
		font-size: .28rem;
		padding-top: .2rem;
		border-top: .01rem solid #e6e6e6;
	}
	.reviews_reply_title {
		font-size: .28rem;
		color: #009983;
		position: relative;
		padding-left: .3rem;
	}
	.reviews_reply_title:after {
		display: block;
		content: "";
		width: .12rem;
		height: .4rem;
		background: #009983;
		position: absolute;
		left: 0;
		top: 0;
	}
	.reviews_reply_txt {
		padding: .1rem 0 .1rem .4rem;

	}
	.reviews_reply_date {
		color:#A0A0A0; 
		padding-left: .4rem;
	}
	.article_reviews_data {
		width: 100%;
		background: #e6e6e6;
		position: fixed;
		bottom: 0;
		padding: .2rem;
		border-top: .01rem solid #e6e6e6;
	}
	.article_reviews_data textarea {
		width: 75%;
		height: 5px;
		border:.01rem solid #e6e6e6;
		background: #fff;
		float: left;
		border-radius: .2rem;
		-webkit-appearance:none;
		outline: 0;
		border: none;
		resize: none;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-appearance: none!important;
		-moz-appearance: none!important;
		padding-top: .26rem;
		padding-left: .2rem;
	}
	.article_reviews_data a {
		width: 20%;
		height: 40px;
		background: #009983;
		display: block;
		float: right;  
		text-align: center;
		line-height: 40px;
		color: #fff;
		font-size: .32rem;
		border-radius: .2rem;
	}
	.more {
		display: block;
		width: 100%;
		text-align: center;
		height: 2rem;
		font-size: .32rem;
		color: #9c9d9d;
		margin-top: .2rem;
	}
	.article_content_txt {
		-webkit-overflow-scrolling: touch;  
		overflow-y: scroll;  
	} 
	.article_content_txt iframe {
		width: 100%;
		border: 0 none;
		display: block;
	}
	textarea::-webkit-input-placeholder {
		padding: 0rem;
	}
	textarea:-moz-placeholder{padding: 0rem;}
</style>