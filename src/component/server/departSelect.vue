<template>
	<div id="depart_Select">
		<Heads :title="titleName"></Heads>
		<div class="classList" v-for="(item,index) in classroomList">
			<div class="classList_one" :class="{active: active == index}" @click="secondaryList(index,item)">
				<div class="classList_l">{{ item.depName }}<span>({{ item.docNum }}人)</span></div>
				<div class="classList_c"></div>
				<div class="classList_r" v-if="item.depSecond != ''"><img src="../../assets/image/bottom.png"  :class="{ activeClass:active1 == index }"></div>		
			</div>
			<!--二级列表-->
			<div class="classList_two" v-show="active == index" v-for="sec in item.depSecond" v-if="isShow" @click="expertAppoint(sec)">
				<div class="classList_l" style="margin-left: 0.3rem;">{{ sec.depName }}<span>({{ sec.docNum }}人)</span></div>
				<div class="classList_c"></div>
				<div class="classList_r"></div>		
			</div>
		</div>
		
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: '选择科室',
				relationEaId:this.$route.query.relationEaId,
				classroomList:[],
				isShow:false,
//				classA:'activeClass',
				active:-1,
				active1:-1,
				eaId:'',
				depCode:'',
				depFirst:'',
				depSecond:'',
				docNum:'',
				
			}
		},
		components:{
			Heads
		},
		methods:{
			init(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				var token = userInfo.token;
				var data = JSON.stringify({
					page:this.page,
					rows:this.rows,
					relationEaId:this.relationEaId,
				});
				console.log(data);
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 200100, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					this.classroomList = response.body.rows;
				})
			},
			secondaryList(index,item){
				this.active = index;
				this.active1 = index;
				console.log(this.active);
				console.log(this.active1);
				console.log(this.isShow);
//				this.isShow = !this.isShow;
				if(this.isShow == true){
					this.isShow = false;
				}else if(this.isShow == false){
					this.isShow = true;
				}
				
//				this.classA = false;
				
				let eaId = this.$route.query.relationEaId;
				let depCode = item.depCode;
				let docNum = item.docNum;
				this.depFirst = item.depName;
				let depName = this.depFirst;
				console.log("一级",depName);
				if(item.depSecond == ""){
					this.$router.push({path:"/serverConfirm/expertAppoint",query:{eaId:eaId,depCode:depCode,depName:depName,docNum:docNum}});
				}else{
					
					return false;
				}
			},
			expertAppoint(sec){
				let eaId = this.$route.query.relationEaId;
				let depCode = sec.depCode;
				let docNum = sec.docNum;
				this.depSecond = sec.depName;
				console.log(depCode);
				console.log(eaId);
				console.log(depName);
				let depName = this.depFirst + "-" + this.depSecond;
				console.log("二级",depName);
				this.$router.push({path:"/serverConfirm/expertAppoint",query:{eaId:eaId,depCode:depCode,depName:depName,docNum:docNum}});
			}
		},
		mounted (){
			this.init();	
		},
	}
</script>
<style>
	#depart_Select{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.classList{
		
	}
	.classList_one{
		height: 0.9rem;
		width: 90%;
		margin: 0 auto;
		font-size: 0.28rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #e6e6e6;	
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
	}
	.classList_c{
		-webkit-box-flex: 1;
	}
	.classList_r img{
		width: 0.32rem;
	}
	.classList_l span{
		color: #a9a9a9;
		margin-left: 0.1rem;
	}
	
	.classList_two{
		height: 0.9rem;
		width: 90%;
		margin: 0 auto;
		font-size: 0.28rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #e6e6e6;	
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
	}
	.activeClass{
		transform:rotate(180deg);
	}
</style>