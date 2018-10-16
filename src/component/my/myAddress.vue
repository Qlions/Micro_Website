<template>
<div id="myAddress">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class = "[nohead]"></Loading>
	<noBata v-if="messages ==''"></noBata>
	<!--点击默认时的弹出框-->
	<div class="popupBox" v-if="sure">
		<div class="popupItem">
			<p>是否将该地址设为默认地址</p>
			<div class="bottom_box">
				<span @click="close()">否</span>
				<i @click="defaultAdd()">是</i>
				<em></em>
			</div>
		</div>
	</div>
	<!--点击删除时的弹出框-->
	<div class="popupBox" v-if="isShow">
		<div class="popupItem">
			<p>是否删除该地址</p>
			<div class="bottom_box">
				<span @click="close()">否</span>
				<i @click="delAddress()">是</i>
				<em></em>
			</div>
		</div>
	</div>
	<div class="MA-container">
		<ul class="addressList">
			<li class="address" v-for="(item,index) in messages">
				<div class="mainF">
					<p class="mainF-left">
						<i></i><span>{{item.name}}</span>
					</p>
					<p class="right">
						<i></i><span>{{item.tel.substring(0,3)+"****"+item.tel.substring(7,11)}}</span>
					</p>
				</div>
				<p class="mainS">{{ item.provinceName }}{{ item.cityName }}{{ item.areaName }}{{ item.nodeName }}({{ item.address }})</p>
				
				<div class="mainT">
					<p class="mainT-left" v-if="item.state==1"><i class="default"></i><span>默认</span></p>
					<p class="mainT-left" v-if="item.state==0" @click="isDefault(item.id)"><i class="not-default" v-if="item.state==0"></i><span>设为默认</span></p>
					<div id="set_up">
						<router-link :to='{path: "myAddress/reviseAddress/", query:{ msg:item}}' id="rework"></router-link>
						<i id="delete" @click="isDel(item.id)"></i>
					</div>
				</div>
			</li>
		</ul>
		<router-link to="myAddress/newAddress" class="Btn-container">
		   <div class="addAddress">新增地址</div>
		</router-link>
	</div>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import noBata from '../common/noBata.vue'
	import Loading from '../common/loading.vue'
	import errorPopup from '../common/error-popup.vue'
	import sucPopup from '../common/suc-popup.vue'
	export default {
		data () {
			return {
				isLoading:true,
				nohead:"nohead",
				message:"",
				sucMessage:"",
				messages:[],
				errShow:false,
				sucShow:false,
				townContent:"",
				townTitle:"",
				townList:[],
				titleName:"地址管理",
				test:[],
				sure:false,
				isShow:false,
				id:""
			}
		},
		components:{
			errorPopup,
			sucPopup,
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
			initAddressList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:112000, jsonValue:""},{emulateJSON:true}).then( response => {
					this.messages = response.body.addressAll;
					console.log(this.messages)
					this.loadingClose()
				//遍历列表获取里面的
//					for(let i in this.messages){
//						this.townTitle = this.messages[i].areaCode;
//						let data = JSON.stringify({
//							'nodeParent':this.townTitle
//						});
//						this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
//							token:token, 
//							infoType:111114, 
//							jsonValue:data 
//						},{emulateJSON:true}).then( response =>{					
//							this.townList = response.body.dictAreaCacheList;					
//							for(let j in this.townList){
//								if(this.townList[j].nodeCode == this.messages[i].town){
//									this.townContent = this.townList[j].nodeName
//									this.test.push(this.townContent)
//								}
//							}
//							
//						})
//					}
				})
			},
			close(){
				this.sure = false;
				this.isShow = false;
			},
			isDefault(id){
				this.sure = true;
				this.id = id;
			},
			//设置默认地址
			defaultAdd () {
				this.sure = false;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					deliveryId: this.id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:112013, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					this.sucShow = true;
					this.sucMessage = "设置成功"
					setTimeout(() => {
						this.sucShow = false	
					}, 1000)
					this.initAddressList()
				},response =>{
					this.errShow = true;
					this.message = "删除失败";
					setTimeout(() => {
						this.errShow = false	
					}, 1000)
				})				
			},
			isDel(id){
				this.isShow = true;
				this.id = id;
			},
			//删除地址
			delAddress:function(){
				this.isShow = false;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					deliveryId: this.id
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:112014, 
					jsonValue:data 
				},{emulateJSON:true}).then( response =>{
					this.sucShow = true;
					this.sucMessage = "删除成功"
					setTimeout(() => {
						this.sucShow = false	
					}, 1000)
					this.initAddressList()					
				},response =>{
					this.errShow = true;
					this.message = "删除失败";
					setTimeout(() => {
						this.errShow = false	
					}, 1000)
				})
			}
		},
		mounted:function(){
			this.initAddressList()
		}
		
	}
</script>

<style scoped>
	#myAddress{
		padding-top: 0.84rem;
		width: 100%;
		height: 100%;
		position: absolute;
		background: #f2f2f2;
	}
	.MA-container{
		padding-bottom: 1.3rem;
	}
	.addressList{
		margin-bottom: 0.3rem;
		color: #333;
	}
	.address{
		width: 100%;
	    background: #fff;
	    padding: 0 0.3rem;
	    border-top: 1px solid #dedede;
	    border-bottom: 1px solid #dedede;
	    margin-top: 0.3rem;
	}
	.mainF{
		height: 0.8rem;
    	line-height: 0.8rem;
	}
	.mainF .mainF-left{
		float: left;
		overflow: hidden;
	}
	.mainF .mainF-left i{
		float: left;
	    width: 20px;
	    height: 20px;
	    margin-top: 10px;
	    background: url(../../assets/image/my/add_icon.png) no-repeat 0 center;
	    background-size: 80px 20px;
	}
	.mainF .mainF-left span{
		float: left;
	    margin-left: 0.15rem;
	    color: #595959;
	}
	.mainF .right{
		float: right;
		overflow: hidden;
	}
	.mainF .right i{
		background-position: -20px center;
		float: left;
	    width: 20px;
	    height: 20px;
	    margin-top: 10px;
	    background: url(../../assets/image/my/add_icon.png) no-repeat -20px center;
	    background-size: 80px 20px;
	}
	.mainF .right span{
		float: left;
	    margin-left: 0.15rem;
	    color: #595959;
	}
	.mainS{
		width: 100%;
	    color: #a0a0a0;
	    padding-bottom: 10px;
	}
	.mainT{
		height: 0.8rem;
	    line-height: 0.8rem;
	    border-top: 1px solid #f0f0f0;
	    overflow: hidden;
	}
	
	.mainT .mainT-left{
		float: left;
		overflow: hidden;
	}
	.mainT .mainT-left i{
		float: left;
		background: url(../../assets/image/rad_icon.png) no-repeat center 0px;
	    width: 15px;
	    height: 15px;
	    margin-top: 0.25rem;
	    background-size: 15px 30px;
	}
	.mainT .mainT-left .not-default{
		background: url(../../assets/image/rad_icon.png) no-repeat center -15px;
		background-size: 15px 30px;
	}
	.mainT .mainT-left span{
		float: left;
	    margin-left: 0.15rem;
	    color: #595959;
	}
	#set_up {
		float: right;
		overflow: hidden;
	}
	#rework{
		float: left;
		width: 20px;
	    height: 20px;
	    margin-top: 0.25rem;
	    background: url(../../assets/image/my/add_icon.png) no-repeat -40px center;
	    background-size: 80px 20px;
	}
	#delete{
		float: left;
		width: 20px;
	    height: 20px;
	    margin-top: 0.25rem;
	    margin-left: 0.25rem;
	    background: url(../../assets/image/my/add_icon.png) no-repeat -60px center;
	    background-size: 80px 20px;
	}
	
	.nodataImg{
		display: block;
		width: auto;
		height: 3rem;
		margin: 0.6rem auto 0.3rem;
	}
	.nodataC{
		color: #A0A0A0;
		text-align: center;
	}
	.addAddress{
		position: absolute;
		bottom: 0.2rem;
		left: 5%;
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #009983;
		font-size: 0.28rem;
		text-align: center;
		margin: 0 auto;
		color: #fff;
		
	}
	.Btn-container{
		display: block;
		width: 100%;
		height: 1.3rem;
		background: #f2f2f2;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	/*弹出框样式*/
	.popupBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	.popupItem{
		color: #666;
		width: 80%;
		position: absolute;
		top:35%;
		left: 10%;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupItem p{
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.bottom_box{
		border-top: 1px solid #e6e6e6;
		height: 1rem;
		line-height: 1rem;
		position: relative;
		bottom: 0;
	}
	.bottom_box span{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box i{
		float: left;
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #666;
	}
	.bottom_box em{
		height: 0.5rem;
		width: 1px;
		background: #e6e6e6;
		position: absolute;
		top: 0.25rem;
		left: 50%;
	}
</style>