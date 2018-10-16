<template>
<section id="myMessage">
	<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
	<noBata v-if="messages ==''" class="noConsult"></noBata>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<scroller :style="{ top:activeTop }"
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if="messages !=''"
	>
		<div class="Q-container">
			<router-link :to="{ path:'/my/myConsult/consultDetail',query:{ id:item.QId,wocode:item.orderCode,wtState:item.QState }}" class="Q-main" v-for="item in messages" :key="item.createTime" >
				<div class="Q-line">
					
				</div>
				<p class="Q-date" v-if="item.QType=='serviceOrderConsult' && (item.serviceType=='2' || item.serviceType==null)">{{item.createTime?item.createTime.substring(0,10):""}}
					<span id="blank"></span>
					{{item.createTime?item.createTime.substring(11,19):""}}
					<i v-if="item.commentValue!=''">完成</i>
					<i v-if="item.commentValue=='' && item.orderState==1">待抢单</i>
					<i v-if="item.commentValue=='' && item.QState==1&&(item.orderState==4||item.orderState==null)">待回复</i>
					<i v-if="item.commentValue=='' && item.QState==2">已回复</i>
				</p>
				<div class="Q-doc-message" v-if="(item.QType=='serviceOrderConsult' && item.serviceType=='1') || 
					item.QType =='groupDocConsult' || item.QType == 'privateDocConsult'">
					<div class="Q-doc-photo Q-doc-item" v-if="item.docName !=null">
						<img :src="item.docPhotosmall"/>
					</div>
					<div class="Q-doc-photo Q-doc-item" v-if="item.circleName !=null">
						<img :src="item.circleThemeFile"/>
					</div>
					<div class="Q-doc-name Q-doc-item" style="height: auto;">
						<p class="Q-docName" v-if="item.docName !=null">{{item.docName?item.docName:null}}</p>
						<p class="Q-docName" v-if="item.circleName !=null">{{item.circleName?item.circleName:null}}</p>
						<p class="Q-docTime">{{item.createTime?item.createTime.substring(0,10):""}}
							<span id="blank"></span>
							{{item.createTime?item.createTime.substring(11,19):""}}
						</p>
					</div>
					<div class="Q-type-state Q-doc-item">
						<i class="Q-state-suc" v-if="item.commentValue!=''">完成</i>
						<i v-if="item.commentValue=='' && item.QState ==1">待回复</i>
						<i v-if="item.commentValue== '' && item.QState ==2">已回复</i>
					</div>
				</div>
				<p class="Q-cont">问：{{item.QContent}}</p>
				<div class="Q-pay">
					<span  v-if="item.QType=='serviceOrderConsult' && (item.serviceType=='2'|| item.serviceType==null)&&(item.payMoney ==0||item.payMoney ==null)">免费</span>
					<span v-if="item.QType=='groupDocConsult'">团队咨询</span>
					<span v-if="item.QType=='privateDocConsult'">家庭医生咨询</span>
					<span  v-if="item.QType=='serviceOrderConsult'&& item.serviceType=='1'">医生咨询</span>
					<!--评级-->
					<div v-if="item.startLevel == 4" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
			
					<div v-if="item.startLevel == 1" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 2" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 3" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/gray_star.png"/>
						</i>
					</div>
					<div v-if="item.startLevel == 5" class="starBox">
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
						<i>
							<img src="../../assets/image/my/red_star.png"/>
						</i>
					</div>
				</div>
			</router-link>
		</div>
	</scroller>
	<router-link to="myConsult/quickConsult" class="bot">
		快速咨询
	</router-link>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import noBata from '../common/noBata.vue'
	export default {
		data () {
			return {
				messages:[],
				QId:"",
				isLoading:true,
				titleName:"健康咨询",
				page:1,
				rows:10,
				activeTop: ".84rem",
				hasError:"",
			}
		},
		components:{
			Heads,
			Loading,
			noBata
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			initConsultList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let id = userInfo.userId;
				let data = JSON.stringify({
					page:this.page,
					rows:this.rows,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660011, jsonValue:data},{emulateJSON:true}).then( response => {
					this.messages = response.body.rows;
					console.log(this.messages)
					this.loadingClose()
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 10;
					this.initConsultList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page:this.page,
					rows:this.rows+10,
					userType:1
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660011, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						this.messages = response.body.rows;
						done();					
					}, 1500)
					this.rows+=10;
				})
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
			
		},
		mounted:function(){
			this.initConsultList()
			mui.previewImage().close();
		},
	}
</script>

<style scoped>
	#myMessage{
		background: #e6e6e6;
	}
	.Q-line{
		background: #e6e6e6;
		height: 0.2rem;
	}
	.Q-container{
		width: 100%;
	}
	.Q-main{
		display: block;
		width: 100%;
	}
	.Q-date{
		color: #999;
		line-height: 0.5rem;
		height: 0.5rem;
		padding: 0.1rem 0.3rem;
	}
	.Q-date i{
		float: right;
		font-size: 0.24rem;
		color: #f59645;
	}
	.Q-doc-message{
		margin-top: 0.2rem;
		padding: 0 0.3rem;
	}
	.Q-doc-item{
		float: left;
		height: 0.7rem;
	}
	.Q-doc-photo{
		height: 0.7rem;
		width: 0.7rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.2rem;
	}
	.Q-doc-photo img{
		width: 100%;
		height: 100%;
	}
	.Q-docName{
		/*height: 0.4rem;*/
		line-height: 0.4rem;
		width: 5rem;
		color:#333;
		font-size: 0.24rem;
	}
	.Q-docTime{
		color: #999999;
		font-size: 0.2rem;
	}
	.Q-type-state{
		float: right;
	}
	.Q-type-state i{
		font-size: 0.24rem;
		color: #f59645;
		display: inline-block;
		height: 0.7rem;
		line-height: 0.7rem;
	}
	.Q-type-state .Q-state-suc{
		color: gray;
	}
	.Q-cont{
		width: 100%;
		line-height: 0.4rem;
		font-size: 0.24rem;
	    color: #666;
	    white-space: normal;
	    word-break: break-all;
	    border-bottom: 1px solid #eee;
	    padding: 0.1rem 0.3rem;
	    display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.Q-pay{
		color: #999;
		overflow: hidden;
		line-height: 0.6rem;
		padding: 0 0.3rem;
	}
	.Q-pay span{
		float: left;
		line-height: 0.6rem;
		width: 2rem;
		margin-top: 0;
	}
	.starBox{
		float: right;
		height: 0.6rem;
	}
	.starBox i{
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
	}
	.starBox i img{
		width: 100%;
		height: 100%;
	}
	.bot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #009983 ;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.36rem;
		color: #fff;
	}
	#blank{
		display: inline-block;
		width: 0.1rem;
	}
	.noConsult{
		position: absolute;
		top: 0.84rem;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	.loadingPage{
		z-index: 999999;
		background: #fff;
		top: 0.84rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>