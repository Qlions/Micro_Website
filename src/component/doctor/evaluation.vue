<template>
	<div>
		<heads :title="title" class="serverHeads" v-on:child-say="listenToMyBoy"></heads>
		
		<div>
			<Loading v-if="isLoadings"></Loading>
			<scroller style="width:100%;margin:0 auto;background: #fff;position: fixed; top: 0.84rem;"
				:on-refresh="refreshs"
				:on-infinite="infinites"
				v-if='isLoadings == false'
				>
				<div class="appoint_log" v-if="evalMSg == ''" :style="{top:noDataImg}">
					<img src="../../assets/image/server/noInfo.png"/>
					<p>暂无相关数据</p>
				</div>
				<ul class="evalUl"  v-bind:class="{ evaPadding: isActive }">
					<li v-for="item in evalMSg" >
						<div class="evalList">
							<span class="headerImgSpan">
							<img src="../../assets/image/index_img/serve_no_img.png" v-if="item.photosmall == '' || item.photosmall == null">
							<img v-else v-bind:src="item.photosmall" >
							</span>
							<span class="headerName">{{ item.userName }}</span>
							<span class="headerStar">
								<img src="../../assets/image/doctor/pingjiaxingxing.png" v-for="i in item.star" /><img src="../../assets/image/doctor/unShineStar.png"  v-for="i in 5-item.star" />
								
								
							</span>
							<p class="contentP">{{ item.commentContent }}</p>
							<!--<p><span><i>2017</i>- <i>08</i> - <i>03</i> &nbsp; <i>22</i> : </span></p>-->
							<p class="TimeP" v-if="item.afterServiceTime ==''"><span>{{ item.createTime | substring(0, 10) }}</span><span style="margin-left: 0.2rem;">{{ item.createTime | substring(11, 20) }}</span></p>
							<p class="TimeP" v-if="item.afterServiceTime !=''"><span>{{ item.createTime | substring(0, 10) }}</span><span style="margin-left: 0.2rem;">{{ item.createTime | substring(11, 30) }}</span>(服务后<i>{{ item.afterServiceTime }}</i>)</p>
						</div>
					</li>
					
				</ul>
				
			</scroller>
		</div>
	</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from "../common/loading.vue"
	export default {
		props: {
			hasError:""
		},
		data (){
			return {
				title: "服务评价",
				page: 1,
				rows: 8,
				isLoadings: true,
				docRelationId: this.$route.query.docRelationId,
				evalMSg: '',
				noDataImg:"",
				isActive:false
			}
		},
		components:{
			Heads,	
			Loading
		},
		methods:{
			initeval(){
				let type = this.$route.query.type;
				console.log(type);
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
//				let token = userInfo.token;
				let token = "";
				let dataEval = JSON.stringify({
					page: this.page,
					rows: this.rows,
					commentEx1: this.docRelationId,
					module: "doctor",
					"ignoreLogin" : "1" 
				
				})

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660010, jsonValue:dataEval},{emulateJSON:true}).then( response => {

					
					this.evalMSg = response.body.rows;
					console.log(this.evalMSg)
					setTimeout(() => {
		               this.isLoadings = false;
		            }, 500)
					
				})
			},
				
				
			refreshs (done) {
				console.log(111)
				this.a += 5
				setTimeout(() => {
					this.rows = 8;
					this.initeval();
					done();
				}, 1000)
			},
			
			infinites (done) {
				let type = this.$route.query.type;
				console.log(type);
//				if(type == 1){
//					return false;
//				}
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let dataEval = JSON.stringify({
						page:this.page,
						rows:this.rows+8,
						commentEx1: this.docRelationId,
						module: "group_comment"
				});
				

				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660010, jsonValue:dataEval},{emulateJSON:true}).then( response => {

					this.evalMSg = response.body.rows;
					console.log(response.body);
					  
					setTimeout(() => {
			          done(true)
			          }, 1500)
					this.rows+=8
			         
				})
			
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
			
		},
		updated () {
			if(sessionStorage.getItem('key_head') == 1){
				this.isActive = false;
				this.noDataImg = 1.8+'rem';
			}else {
				this.isActive = true;
				this.noDataImg = 3+'rem';
			}
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){
				//没有
					this.isActive = false;
					this.noDataImg = 1.8+'rem';
				}else {
					//有
					this.isActive = true;
					this.noDataImg = 3+'rem';
				}
			this.initeval();
		},
		watch:{
			hasError:function(val){
				if(val == true){
					this.isActive = false;
					this.noDataImg = 1.8+'rem';
				}
			}
		}
	}
</script>

<style>
	.serverHeads{
		background: #fff !important;
		border-bottom: 1px solid #eee;
	}
	.serverHeads h2{
		color: #fff !important;
	}
	.headerImgSpan{
		width: 0.8rem;
		display: inline-block;
		height: 0.8rem;
		border-radius: 0.4rem;
		-webkit-border-radius: 0.4rem;
	}
	.headerImgSpan img{
		width: 100%;
		height: 100%;
		vertical-align: middle;
		border-radius: 0.4rem;
		-webkit-border-radius: 0.4rem;
	}
	.evalUl{
		width: 94%;
		margin: 0 auto;
	}
	.evalUl li{
		border-bottom: 1px solid #eee;
		padding-bottom: 0.15rem;
	}
	.headerName{
		margin-left:0.25rem ;
		color: #009983;
		font-size: 0.28rem;
	}
	.headerStar img{
		width: 0.3rem;
		vertical-align: middle;
		display: inline-block;
	}
	.headerStar{
		float: right;
		/*clear: both;*/
		/*margin-left: 3rem;*/
		/*position: absolute;*/
		/*left: 5.rem;*/
	}
	.evalList{
		padding-top: 0.15rem;
	}
	.contentP{
		font-size: 0.28rem;
		color: #666;
		margin-top: 0.15rem;
	}
	.TimeP{
		color: #666;
		font-size: 0.2rem;
		margin-top: 0.15rem;
	}
	.appoint_log{
		position: absolute;
		z-index: 999;
	}
	.appoint_log img{
		width: 100%;
	}
	.appoint_log p{
		font-size: 0.28rem;
		width: 100%;
		text-align: center;
		color: #666;
	}
	.evaPadding{
		padding-top: 1.46rem;
	}
</style>