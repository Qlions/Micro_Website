<template>
	
	<div class="Q-container">
		<heads :title="title" class="teamListHeader"></heads>
		<div class="wuList" v-if="this.messages <= 0">
			<img src="../../assets/image/server/noInfo.png" />
			<p>暂无相关数据</p>
		</div>
			<router-link :to="{ path:'/my/myConsult/consultDetail',query:{ id:item.QId,wocode:item.orderCode,wtState:item.QState }}" class="Q-main" v-for="item in messages" :key="item.createTime" >
			
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
						<!--<p class="Q-docName" v-if="item.docName !=null">{{item.docName?item.docName:null}}</p>-->
						<p class="Q-docName" v-if="item.circleName !=null">{{item.userName.substring(0,1)+"**"+item.userName.substring(item.userName.length-1,item.userName.length)}}</p>
						<p class="Q-docTime">{{item.createTime?item.createTime.substring(0,10):""}}
							<span id="blank"></span>
							{{item.createTime?item.createTime.substring(11,19):""}}
						</p>
					</div>
					<!--<div class="Q-type-state Q-doc-item">
						<i class="Q-state-suc" v-if="item.commentValue!=''">完成</i>
						<i v-if="item.commentValue=='' && item.QState ==1">待回复</i>
						<i v-if="item.commentValue== '' && item.QState ==2">已回复</i>
					</div>-->
				</div>
				<p class="Q-cont">问：{{item.QContent}}</p>

			</router-link>
		</div>
</template>

<script>
	import heads from "../common/head.vue"
	import Loading from "../common/loading.vue"
	import err from '../common/error-popup.vue'
	export default {
		 mounted:function(){
		      this.$nextTick(function(){
		       this.initMsg();
		       })
		     
   		},
		props: {
			hasError:""
		},
	
		data(){
			return{
				title: "团队咨询",
				docRelationId: this.$route.query.docRelationId,
				isLoading: true,
				page: 1,
				rows: 8,
				isClamp: true,
				cuerid: [],
				err: '',
				qIds:this.$route.query.qIds,
				messages:'',


			}
		},
		components:{
			heads,
			Loading,
			err
		},
		methods:{
			initMsg(){				
				console.log(1);
				
				console.log(this.userinfoId);
				let userInfo = JSON.parse(this.$cookie.get("userInfo"));
				
				if(userInfo == "" || userInfo == null){
					var token = "";
				}else{
					var token = userInfo.token;
				}

				var vm = this;
				let teamData = JSON.stringify({
					page: this.page,
					rows: this.rows,
					type:"2",
					qIds:this.qIds,
					docRelationId: this.docRelationId,
				
				});

				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData", {token: token, infoType:660221, jsonValue: teamData}, { emulateJSON: true })

				.then( response => {
					console.log(response)
					this.messages = response.body.rows;

//					this.teamPeoplo = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
						console.log(this.cuerid);
						console.log(this.createUser);
				})
			
				
			
			
			},

		},
		mounted() {
			if(sessionStorage.getItem('key_head') == 1){
				//没有头部下载
					this.margIsActice = false;
				}else {
				//有头部下载
					this.margIsActice = true;
				}
			this.initMsg();
		},
		
		watch:{
			hasError:function(val){
				if(val == true){
					this.margIsActice = false;
				}
			}
		}
	}
</script>

<style>
	.Q-container{
		width: 100%;
		margin-top: 0.9rem;
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
	.wuList{
		position: fixed;
	}
	.wuList img{
		height: 100%;
		width: 100%;
		margin-top: 50%;
	}
	.wuList p{
		text-align: center;
		color: #666;
	}
</style>