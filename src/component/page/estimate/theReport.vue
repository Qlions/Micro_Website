<template>
	<div class="theReport">
		<iframe :src="TabContent" id="theReport-iframe" frameborder="no"></iframe>
		<div class="clickSee" @click="seeClick()"><img src="../../../assets/image/heanlth_write.png"></div>
		<!--<img src="../../../assets/image/heanlth_write.png">-->
	</div>
</template>
<script>
	export default {
		data(){
			return {
				configUrl:"", // 配置url  报告
				questionnairegUrl:"", // 问卷配置url  问卷
				TabContent:'',
				userdataId: this.$route.query.userdataId,
				userId: this.$route.query.userId,
				questType: this.$route.query.questType,
				token:'',
				gender:'',
			}
		},
		components:{
		
		},
		methods:{
			seeClick(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let userInfoNew =  JSON.parse(this.$cookie.get('userInfoNew'));
				this.gender = userInfoNew[0].gender;
				this.token = userInfo.token;
				console.log(this.questType);
				console.log(this.token);
				console.log(this.gender);
				console.log(this.userId);
				if(this.questType == "RISK001"){
					window.location.href = ""+this.questionnairegUrl+"/newReport/mxb/new_mxb.html?riskId=&gender="+this.gender+"&userId="+this.userId+"&token="+this.token+"";	
				}else if(this.questType == "RISK004"){
					window.location.href = ""+this.questionnairegUrl+"/newReport/mxb/index_mxb.html?riskId=&gender="+this.gender+"&userId="+this.userId+"&token="+this.token+"";	
				}
			},
		},
		mounted(){
			this.questionnairegUrl = questionnairegUrl(); // 调用配置url函数
			this.configUrl = configUrl(); // 调用配置url函数
			this.TabContent = ""+this.configUrl+"/website/mobile/riskResultMobile.action?userdataId="+this.userdataId+"&userId="+this.userId+"";
		}
	}
</script>
<style>
.theReport{
		word-break: break-word;
		background: #fff;
	}
	.theReport iframe{
		width: 100%;
		/*height: 100%;*/
		height: 13.4rem;
		border: 0 none;
		display: block;
	}
	.clickSee{
		position: absolute; 
		z-index: 9999; 
		width: 1rem; 
		height: 1rem; 
		line-height: 1.5rem;
		opacity: 0.5;
		border-radius: 50px;
		text-align: center;
		top: 7.5rem;
		right: 0.1rem;
	}
	.clickSee img{
		height: 100%;
		width: 100%;
	}
</style>