<template>
	<div id="adddr-manage">
		<Heads :title="titleName"></Heads>
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
	<div class="popupBox" v-if="isDel">
		<div class="popupItem">
			<p>是否删除该地址</p>
			<div class="bottom_box">
				<span @click="close()">否</span>
				<i @click="delAddress()">是</i>
				<em></em>
			</div>
		</div>
	</div>
<!--<scroller style="width:100%;margin:0 auto;background: #fff;position: fixed;top: 1.34rem;">-->
<div class="aa">
		<div class="ul_manage" v-for="(item,index) in addressList">
			<div @click="passValue(item.id,item)">
				<div class="Top_manage">
					<p class="Top_manage_a"><img src="../../assets/image/server/mine_adderss_name.png">{{ item.name }}</p>
					<p class="Top_manage_v"></p>
					<p class="Top_manage_b"><img src="../../assets/image/server/mine_adderss_phone.png">{{ item.tel.substring(0,3)+"****"+item.tel.substring(7,11) }}</p>
				</div>
				<div class="Center_manage">
					{{ item.address }} {{ item.addressInfo }}
				</div>
			</div>
			<div class="Bottom_manage">
				<p class="Bottom_manage_a">
					<span v-if="item.state == '1'"><img src="../../assets/image/purse_paybuttonimage_selected@3x.png" v-if="isShow1"><img src="../../assets/image/server/pay-cancel.png" v-if="isShowFalse"></span>
					<span v-if="item.state != '1'"><img src="../../assets/image/server/pay-cancel.png" v-if="isShow"  @click="manageBtn1(item.id,index)"><img src="../../assets/image/purse_paybuttonimage_selected@3x.png" v-if="isShow1False"></span>
					<span v-if="item.state == '1'" class="moSpan">默认</span>
					<span v-if="item.state != '1'" class="moSpan">设为默认</span>
				</p>
				<p class="Bottom_manage_v"></p>
				<p class="Bottom_manage_b">
					<router-link :to='{path:"/serverConfirm/newAddress",query:{userId : item.id, state : item.state, isId : 1} }'>
						<img src="../../assets/image/server/mine_adderss_edit.png">
					</router-link>
					&nbsp;&nbsp;
					<img src="../../assets/image/server/mine_adderss_delegate.png" @click="btn_del(item.id)">
				</p>
			</div>
		</div>
		
		<div style="height: 1rem;">
			
		</div>
</div>
<!--</scroller>-->	
		<router-link :to='{path:"/serverConfirm/newAddress", query:{ isId : 2} }'>
			<div class="Btn_manage" v-if="isArticle">
				新增地址
			</div>
		</router-link>
		
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data(){
			return {
				titleName: '地址管理',
				isShow: true,
				isShow1: true,
				page: 1,
				rows: 8,
				eaId:'',
				item:'',
				sure:false,
				isArticle:true,
				isDel:false,
				isShowFalse:false,
				isShow1False:false,
				addressList: [],
			}
		},
		components:{
			Heads
		},
		methods:{
			init(){
//				alert(1);
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
//				console.log(userInfo);
				var token = userInfo.token;
				var data = JSON.stringify({
					page:this.page,
					rows:this.rows,
					addressType:"2",
					state:""
				});
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:112000, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(response);
					this.addressList = response.body.addressAll;
					console.log(this.addressList);
					if(this.addressList.length > 9){						
						this.isArticle = false;
					}else{
						this.isArticle = true;
					}
//					this.addressList[0].state = 1;
				})
				
			},
//			clearMuth(){
//				localStorage.removeItem("saveMessDate");
//			},
			btn_del(id){
				this.isDel = true;
				this.id = id;
				
			},
			close(){
				this.sure = false;
				this.isDel = false;
			},
			passValue(id,item){
//				alert(item);
				console.log(item);
				console.log("保存当前数据");
				let passValue = JSON.stringify({
						id:id,
						address:item.address,
						addressInfo:item.addressInfo,
						addressType:item.addressType,
						areaCode:item.areaCode,
						areaName:item.areaName,
						cityCode:item.cityCode,
						cityName:item.cityName,
						email:item.email,
						latitude:item.latitude,
						longitude:item.longitude,
						name:item.name,
						nodeName:item.nodeName,
						nodeRemark:item.nodeRemark,
						phone:item.phone,
						province:item.province,
						provinceName:item.provinceName,
						state:item.state,
						tel:item.tel,
						town:item.town,
					})
				console.log(passValue);
				window.localStorage.setItem("passValue",passValue);
				
				if(this.$route.query.type == 1){
					this.$router.back(-3);
				}
//				this.$router.push({path:"/serverDetail/serverConfirm"});
			},
			delAddress(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				var token = userInfo.token;
				var data = JSON.stringify({
					deliveryId:this.id,
				});
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 112014, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(response);
					console.log(response.body.state);
					this.isDel = false;
					this.init();
				})
			},
			defaultAdd(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				var token = userInfo.token;
				var data = JSON.stringify({
					deliveryId:this.id,
				});
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType: 112013, jsonValue:data},{emulateJSON:true}).then( response => {

					console.log(response);
					console.log(response.body.state);
					this.sure = false;
					this.init();
				})
			},
			manageBtn1(id,index){
				this.sure = true;
				this.id = id;
				
			}
		},
		mounted (){
			localStorage.removeItem("areaLoca");
			localStorage.removeItem("saveMessDate");
			this.init();
			
		},
	}
</script>
<style>
	#adddr-manage{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	.aa{
		height: 100%;
	}
	.ul_manage{
		/*height: 2.3rem;*/
		/*border-top: solid #f5f5f5 0.2rem;*/
		border-top: solid #f5f5f5 0.2rem;
		
	}
	.Top_manage{
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		width: 90%;
 		height: 0.8rem;
 		line-height: 0.8rem;
 		font-size: 0.25rem;
 		margin: 0 auto;
 		color: #333;
	}
	.Top_manage_v{
		-webkit-box-flex: 1;
	}
	.Top_manage_a img{
		vertical-align: middle;
		margin-right: 0.15rem;
		width: auto;
		height: 0.45rem;
	}
	.Top_manage_b img{
		vertical-align: middle;
		margin-right: 0.15rem;
		width: auto;
		height: 0.45rem;
	}
	.Center_manage{
		/*height: 0.7rem;*/
		/*line-height: 0.7rem;*/
		word-break:break-all;
		font-size: 0.25rem;
		width: 90%;
		margin: 0 auto;
		color: #333;
		border-bottom: 1px solid #e6e6e6;
	}
	.Bottom_manage{
		height: 0.8rem;
		line-height: 0.8rem;
		display: -webkit-box;
 		-webkit-box-orient: horizontal;
 		width: 90%;
 		font-size: 0.25rem;
 		color: #333;
 		margin: 0 auto;
	}
	.Bottom_manage_v{
		-webkit-box-flex: 1;
	}
	.Bottom_manage_a img{
		vertical-align: middle;
		width: 0.45rem;
		height: auto;
	}
	.moSpan{
		margin-left: 0.15rem;
	}
	.Bottom_manage_b img{
		vertical-align: middle;
		height: 0.45rem;
		width: auto;
	}
	.Btn_manage{
		width: 100%;
		height: 0.95rem;
		text-align: center;
		line-height: 0.95rem;
		font-size: 0.35rem;
		color: #fff;
		background: #009983;
		position: absolute;
		bottom: 0;
		position: fixed;
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