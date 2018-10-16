<template>
<section id="assess">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading"></Loading>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<div class="A-container">
		<div class="assess-pic-box">
			<div class="docPic"><img :src="docPic"/> </div>
			<p class="docName">{{docName}}</p>
			<ul>
				<li class="grayStar" v-for="(item,index) in items" @click="starNum(item.code)" :class="{'redStar':isActive>index}"></li>
			</ul>
			<p class="">为专家服务评分</p>
		</div>
		<div class="assess-txt-box" ref = 'bodyText'>
			<textarea  class="assess-txt" placeholder="记录服务中印象深刻的感受和建议，给予帮助更多用户" v-model="commentContent" @focus="focus()"></textarea>
		</div>
		<div class="assess-bottom" ref='btnPost' @click="postAssess">
			<p>提交评价</p>
		</div>
	</div>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				isLoading:false,
				isActive:'',
				message:"",
				sucMessage:"",
				errShow:false,
				sucShow:false,
				titleName:"评价",
				docPic:this.$route.params.docPic,
				docName:this.$route.params.docName,
				orderId:this.$route.params.orderId,
				docUserId:this.$route.params.docUserId,
				commentScore:"",
				commentContent:"",
				items: [
　　　　　　　　 		{code:1},
					{code:2},
					{code:3}, 
					{code:4},
					{code:5}
　　　　　　　　 	],
			}
		},
		computed:{
			
		},
		components:{
			Heads,
			Loading,
			errorPopup,
			sucPopup
		},
		methods: {
			//星星选择
			starNum(index){
				this.isActive = index;
				this.commentScore = 75+index*5;
			},
			//错误提示框
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.errShow ==  true){
                		this.errShow = false;
                	}
                },1500);  
			},
			postAssess(){
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
						orderId: this.orderId,
						docUserId:this.docUserId,
						commentScore:this.commentScore,
						commentContent:this.commentContent,
					});
					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660087, jsonValue:data},{emulateJSON:true}).then( response => {
						this.$router.go(-1)
					})
				}
			},
			focus(){
				let that = this;
				console.log('aaa')
				setTimeout(function(){
					console.log('bbb')
//					let focus = document.getElementById("footTalk")
					let focus = that.$refs.bodyText;
					let btnPost = that.$refs.btnPost;
					focus.style.position = fixed;
					btnPost.style.position = absolute;
//					focus.scrollIntoView(true);
//					focus.scrollIntoViewIfNeeded();
//					document.body.scrollTop = document.body.scrollHeight;
				},200)
			}
		},
		mounted(){
			console.log(this.$route.params.docPic)
		}
	}
</script>

<style scoped>
	#assess{
		width: 100%;
		height: 100%;
		background: #f2f2f2;
		position: absolute;
		font-size: 0.26rem;
	}
	.assess-bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 0.84rem;
		line-height: 0.84rem;
		background: #009983;
		font-size: 0.28rem;
	}
	.assess-bottom p{
		text-align: center;
		color: #fff;
	}
	.assess-pic-box{
		background: #fff;
		padding-top: 0.8rem;
		padding-bottom: 0.3rem;
	}
	.docPic{
		margin: 0 auto;
		margin-bottom: 0.3rem;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		border: 1px solid #666;
		overflow: hidden;
	}
	img{
		width: 100%;
		height: 100%;
	}
	.docName{
		width: 100%;
		text-align: center;
		color: #333;
	}
	ul{
		width: 3.75rem;
		margin: 0.3rem auto;
	}
	.grayStar{
		float: left;
		width: 0.35rem;
		height: 0.35rem;
		margin-right: 0.5rem;
		background: url(../../assets/image/my/gray_star.png) no-repeat;
		background-size: 0.35rem 0.35rem;
	}
	.redStar{
		background: url(../../assets/image/my/red_star.png) no-repeat;
		background-size: 0.35rem 0.35rem;
	}
	li:last-child{
		margin-right: 0;
	}
	p{
		color: #999999;
		text-align: center;
	}
	.assess-txt-box{
		background: #fff;
		margin: 0 auto;
		margin-top: 0.25rem;
		width: 94%;
		height: 6.4rem;
		border-radius: 3px;
	}
	.assess-txt-box .assess-txt{
		border: none;
		width: 100%;
		padding: 0.2rem;
		line-height: 0.5rem;
		min-height: 3rem;
		color: #333;
		resize: none;
		outline: none;
	}
</style>