<template>
	<section class="sign-docton">
		<div v-if="doctor_seen && load_seen != true">
			<!-- :to="{ path:'/doctor/doctorAuthorized?docuserId='+docUserId+'' }" -->
			<!-- { name:'doctorConsult', query: { docUserId: docUserId } } -->
			<dl>
				<loading v-if="load_seen"></loading>
				<dt class="portrait">
					<img :src=" photomiddle " alt="">
				</dt>
				<dd class="details-link">
					<router-link :to="{ path:'/doctor/doctorAuthorized?docuserId='+docUserId+'' }">
						<h2><span class="doctor_name" >{{ name }}</span><span class="doctor_type" >家庭医生</span></h2>
						<span class="eaName_span">{{ eaName }}</span>
					</router-link>
					<span  class="details-link-right" @click="jump(docUserId)"><i>{{ proState }}</i></span>
				</dd>
			</dl>
		</div>
		<div v-else>
			<router-link :to="{ name:'familyDoctorList' }">
				<ul class="no_doctor">
					<li  class="no_qianyu_icon"><img src="../../assets/image/index_img/fragment_home_page_docuter_img.png" /></li>
					<li class="no_qianyue_btn">申请签约家庭医生</li>
					<li class="right_doctor_icon"><img src="../../assets/image/head-back-right.png" alt="" /></li>
				</ul>
			</router-link>
		</div>		
	</section>
</template>
<script>
	import Loading from '../common/loading.vue'
	export default {
		data (){
			return {
				//签约家庭医生信息
				doctor_seen: false,
				name: "",
				docUserId: "",
				eaName: "",
				photomiddle: "../../assets/image/index_img/fragment_home_page_docuter_img.png",
				proState: "",
				state_work: "",
				//获取家庭医生loading
				load_seen: true,
				urlID:""
			}
		},
		components:{
			Loading
		},
		mounted(){
			if(this.$cookie.get('userInfo') != "" && this.$cookie.get('userInfo') != undefined && this.$cookie.get('userInfo') != null){
				this.load_doctor();
			}
			
		},
		methods:{
			//获取该用户的家庭医生
			load_doctor (){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let data = JSON.stringify({
				"userId": userInfo.userId
				})
				/*
				 660207 获取该用户的签约医生    userId  
				 返回： name 医生名字     docUserId 医生Id  eaName 机构名称   photomiddle 头像地址     proState 签约状态   0表示未签约 1表示签约 3表示拒绝签约
				 */
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:userInfo.token,infoType:660207,jsonValue:data},{emulateJSON:true}).then( response => {
					if(response.body.name != "" && response.body.eaName != "" && response.body.photomiddle != ""){
						this.doctor_seen = true,
						this.load_seen = false,
						this.name = response.body.name,
						this.eaName = response.body.eaName,
						this.photomiddle = response.body.photomiddle;
						this.docUserId = response.body.docUserId;
						this.urlID = response.body.proState;
						if(response.body.proState == 0){
							this.proState = "等待签约";
						}else if (response.body.proState == 1){
							this.proState = "咨询";
						}else if(response.body.proState == 3){
							this.proState = "拒绝签约";
						}
					}
					
				})
			},
			jump (id) {
				if(this.urlID == 0 || this.urlID == 3){
					this.$router.push({ name: 'doctorAuthorized',query: { docuserId:id } })
				}else if(this.urlID == 1){
					this.$router.push({ name: 'doctorConsult',query: { docuserId:id } })
				}
			}
		}
		
	}
	
</script>
<style>
	/*未签约医生*/
	.no_doctor{
		width: 92%;
		margin: 0 auto;
	}
	.no_doctor li{
		float: left;
		line-height: 1.8rem;
		font-size: 0.34rem;
		color: #333;
	}
	.no_qianyu_icon,.right_doctor_icon{
		width: 10%;
	}
	.no_doctor li img {
		width: 100%;
		vertical-align: middle;
	}
	li img.no_qianyu_icon{
		width: 38%;
	}
	li.right_doctor_icon{
		float: right;
		
	}
	.right_doctor_icon img{
		margin-left: 0.3rem;
	}
	.no_qianyue_btn{
		margin-left: 0.3rem;
	}
	.sign-docton {
		width: 100%;
		background: #fff;
		position: relative;
		top: -5px;
		height: 1.8rem;
	}
	.sign-docton dl{
		width: 92%;
		margin: 0 auto;
	}
	.details-link{
		width: 74%;
   		float: right;
   		margin: 0.4rem 0 0 .2rem;
   		color: #333;
	}
	.doctor_type{
		background: #009983;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		color: #fff;
		display: inline-block;
		padding: 0.03rem 0.06rem;
		margin-left: 0.2rem;
		font-size: 0.2rem;
		position: relative;
		top: -.08rem;
	}
	.doctor_name{
		font-size: 0.4rem;
		color: #333;
		
	}
	.details-link-right{
		text-align: right;
		display: inline-block;
		float: right;
		position: relative;
		top: -0.3rem;
		background: url(../../assets/image/right.png) no-repeat;
		background-size:contain ;
		background-position-x: right;
		font-size: .32rem;
		color: #009983;
	}
	.details-link-right i{
		margin-right:0.4rem ;
		font-size: 0.28rem;
	}
	.portrait{
		border-radius : 50%;
		-webkit-border-radius:50%;
		overflow: hidden;
		width: 1.2rem;
		height: 1.2rem;
		float: left;
		margin-top: 0.3rem;
	}
	.portrait img{
		width: 100%;
	}
	.eaName_span{
		font-size: 0.28rem;
		color: #333;	
	}
</style>