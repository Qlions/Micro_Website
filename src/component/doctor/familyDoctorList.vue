<template>
	<div class="test">			
		
		<heads :title="title">
			<router-link :to='{path:"/doctor/search"}'><div class="search_btn" ></div></router-link>
		</heads>
		<Loading v-if="isLoading"></Loading>
		<scroller style="width:100%;margin:0 auto;background: #fff;position: fixed;top: 0.84rem;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			:on-snapping="true"
			v-if='isLoading == false'
			ref="a"
			>
			<!--<div class="doctor_top"></div>-->
			<div class="doctorSection" v-for="item in doctorList" >
				<router-link :to='{path:"/doctor/doctorAuthorized", query:{docuserId : item.userId }}' >
					<dl class="doctorDl_list" >	
						<!--没有头像的时候显示占位图-->
						<dt><img src="../../assets/image/index_img/serve_no_img.png" v-if="item.photosmall == '' || item.photosmall == null" class="doctorDtimg">
							<!--有头像的时候占位图消失-->
							<img :src="item.photosmall" v-else class="doctorDtimg">
						</dt>
						<dd>
							<div class="doctorDdlist1">
								<p id="doctor_name_list" v-if="item.name != '' && item.name != null">{{ item.name }}<span>&nbsp;&nbsp;<i class="isattention" v-if="item.attentionId != ''">已关注</i></span></p>
								<p><span class="family-tagging">家庭医生</span><span v-if="item.department != '' && item.department != ',,' && item.department != ','">{{ item.proTitle.split(',')[0] }}</span></p>
								<p>{{ item.hospital.split(',')[0] }}</p>
							</div>
							<p class="doctorLastp">服务<span>	{{ item.userCount }}</span>人<span class="doctorRight" v-if="item.serviceScore != 0">{{ item.serviceScore.toFixed(0) }}%好评</span></p>
						</dd>
					</dl>
				</router-link>
			</div>
		</scroller>
	</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import seach from "./search.vue"
	export default {
		name: 'familyDoctorList',
		data (){
			return {
				title: "家庭医生",
				page: 1,
				rows: 8,
				isLoading: true,
				doctorList: [],
				doctorMsg: [],
			}
		},
		components:{
			Heads,
			Loading
		},
		methods:{
			initHealthList(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					page: this.page,
					rows: this.rows,
					doctorName:'',
					familyContractTeam:1
				})
				this.$http.post('/webserviceProxy/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)		
					this.doctorList = response.body.rows;
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)	
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 8;
					this.initHealthList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page:this.page,
						rows:this.rows+8,
						doctorName:'',
						familyContractTeam:1
				});
				this.$http.post('/webserviceProxy/wtWebApiH/GetServerData',{token:token, infoType:660100, jsonValue:data},{emulateJSON:true}).then( response => {
					setTimeout(() => {
						this.doctorList = response.body.rows;
							done(true)			
					}, 1500)
					this.rows+=8;			
				})
				this.$refs.a.finishPullToRefresh();
			}		
		},
		mounted (){
			this.initHealthList();
		}
	}
</script>

<style>
	/*搜索按钮*/
	.search_btn{
		background: url(../../assets/image/doctor/sear.png) no-repeat;
		width: 0.5rem;
		height: 100%;
		background-size: contain;
		position: relative;
		left: 90.5%;
		background-position-y: center;
	}
	div.doctorDdlist1 p#doctor_name_list{
		color: #333;
		font-size: 0.24rem;
	}
	.doctor_top{
		height: .9rem;
	}
	.doctor_little{
		position: fixed;
		z-index: 999;
		color: #fff;
		font-size: .38rem;
		top: .2rem;
		left: 3rem;
	}
	.doctorHeader{
		position: fixed;
		width: 100%;
		top: 0;
		background: #009983;
		height: .9rem;
		text-align: center;
		line-height: .9rem;
		font-size: .28rem;
		color: #fff;

	}
	.doctorDtimg{
		height: 1.28rem;
		width: 1.28rem;
		border-radius: 50px;
	}
	.family-tagging {
		border: .01rem solid #009983;
		color: #009983;
		border-radius: .06rem;
		padding: .02rem .06rem;
		margin-right: .1rem;
	}
	.doctorDl_list{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		height: 2.3rem;
 		font-size: .22rem;
 		border-bottom: 0.15rem solid #eee;
	}
	.doctorDl_list dd p{
		height: .38rem;
		line-height: .38rem;
		color: #999;
	}
	.doctorDl_list dd p:first-child{
		height: .38rem;
		line-height: .38rem;
		color: #666;
		margin-top: .3rem;
	}
	.doctorDdlist1{
		height: 1.3rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		color: red;
	}
	.doctorDl_list dt{
		height: 2.1rem;
		width: 2rem;
	}
	.doctorDl_list dd{
		height: 2.1rem;
		width: 70%;
	}
	.doctorDl_list dt img{
		margin-left: .3rem;
		margin-top: .3rem;
	}
	.doctorRight{
		display: block;
		float: right;
	}
	.doctorLastp{
		margin-top: .1rem;
	}
	/*已关注*/
	.isattention{
		width: 13%;
		text-align: center;
		height: 0.25rem;
		display: inline-block;
		background: #009983;
		color: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		font-size: smaller;
		line-height: 0.25rem;
	}
</style>