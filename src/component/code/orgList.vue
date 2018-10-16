<template>
	<div class="server-list">
		<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
		<Loading v-if="isLoading" class="loading" :class="{loadTop:true}"></Loading>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
			<p class="noDataP" style="position: relative;top: 2.3rem;">暂无相关服务</p>
		</div>
		<div v-if="dataHide == 1">
			<scroller style="width:100%;background: #fff;position: absolute;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			v-if='isLoading == false'
			:style="{ top:activeTop }"
			>			
				<div class="gzh-addedHealth">
					<ul>
						<li class="clearfix" v-for="list in addedHealthList">
							<router-link :to='({path:"/org/orgDetail",query:{eaId:list.eaId,type:"Eadetil"}})'>
								<div class="listImg" :style="{backgroundImage:'url(https://localtest.zgjky.cn'+ imgIcon(list.logoImg) +')'}"></div>
								<div class="listContent listContent_added">
									<p class="server-name">{{list.eaName}}</p>
									<p class="server-source">
										
									</p>
									<div class="server_method clearfix">
										<p class="server-way">
											<img src="../../assets/image/server/server-address.png" alt="" />											
											<span style="float:left;width: 4rem;">{{ list.eaAddress }}</span>
										</p>
									</div>
									<div class="server_method clearfix" style="margin-top: 0.2rem;">
										<p class="server-time">
											<img src="../../assets/image/server/bell_icon.png" alt="" />
											<span>{{list.eaTel}}</span>
										</p>
									</div>
									<p class="server-posi" v-if=" list.distance != '-1'&& list.distance != null">{{ list.distance | getDistance}}<img src="../../assets/image/server/posi_icon.png"/></p>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</scroller>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	export default {
		data (){
			return {
				titleName : "机构列表",
				isLoading: true,
				dataHide: 1,
				page: 1,
				rows: 8,
				searchVal: "",
				filterDatas: "",
				addedHealthList: [] ,
				hasError:"",
				activeTop:"",//iscroll
			}
		},
		components:{
			Heads,
			Loading
		},
		created(){
			this.searchVal = this.$store.searchValue;
			if($.isEmptyObject(this.$route.query)){
				this.filterDatas = "";
			}else {
				this.filterDatas = this.$route.query;
			}
		},
		filters:{
			getDistance(val){
				let dis = Number(val);
				if(dis >= 1000){
					return (dis/1000).toFixed(1) + "公里";
				}else {
					return dis.toFixed(0) + "米";
				}
			}
		},
		methods :{
			initHealthList(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = "";
				let data;
				if(this.filterDatas == ""){
					data = JSON.stringify({
						page: this.page,
						rows: this.rows,
						searchValue: this.searchVal
					})
				}else {
					this.filterDatas.searchValue = this.searchVal;
					data = JSON.stringify(this.filterDatas);
				}
				console.log("筛选条件",JSON.parse(data));
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111222, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body == null || response.body.rows == ""){
						this.dataHide = 0;
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
					}else {
						this.dataHide = 1;
						this.addedHealthList = response.body.rows;
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
	
					}
					
				})
			},
			refresh (done) {
				setTimeout(() => {
					if(this.filterDatas == ""){
						this.rows = 8;
					}else {
						this.filterDatas.rows = 8;
					}
					this.initHealthList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				//let token = userInfo.token;
				let token = "";
				let data;
				if(this.filterDatas == ""){
					data = JSON.stringify({
						page:this.page,
						rows:this.rows+8,
						searchValue: this.searchVal
					});
				}else {
					this.filterDatas.rows = this.rows+8;
					data = JSON.stringify(this.filterDatas);
				}
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111222, jsonValue:data},{emulateJSON:true}).then( response => {
					this.addedHealthList = response.body.rows;
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						this.addedHealthList = response.body.rows;
						done();					
					}, 1500)
					this.rows+=8
				})
			},
			toDetail(item){
				let id = item.serviceDictId;
				let type = item.serviceDictReservation;
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				console.log(relationEaId);
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appoingInfo = "";
				this.$store.state.imgList = "";
				sessionStorage.setItem("server_relationEaId",relationEaId);
				this.$router.push({path:"/server/serverDetail",query:{id:id,type:type}});
			},
			toConform(item){
				let id = item.serviceDictId;
				let type = item.serviceDictReservation;
				let money = item.serviceDictMoney;
				let relationEaId;
				if(item.reservationMode == 2){
					relationEaId = item.relationEaId
				}else {
					relationEaId = item.eaId;
				}
				sessionStorage.setItem("server_relationEaId",relationEaId)
				this.$store.textInfo = "";
				this.$store.timeInfo = "";
				this.$store.state.appoingInfo = "";
				this.$store.state.imgList = "";
				window.localStorage.removeItem("passValue");
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type,money:money}});
				
			},
			serviceMoney(obj){
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				if(min == max){
					return "¥" + obj.serviceDictMoney.toFixed(2);
				}else {
					let serviceMoney = "¥" + min.toFixed(2) + "~ ¥" + max.toFixed(2);
					return serviceMoney;
				}
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
			listenToMyBoy (somedata) {//监听头部叉号点击事件
				this.hasError = somedata;
			}
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){//iscroll
				this.activeTop = .84+'rem';
			}else {
				this.activeTop = 2+'rem'
			}
			this.initHealthList();
		},
		watch:{
			hasError:function(val){//iscroll
				if(val == true){
					this.activeTop = .84+'rem';
				}
			}
		}
	}
</script>
<style>
	/*暂无相关服务*/
	.noDataP{
		text-align: center;
		font-size: 0.32rem;
		color: #666;
		
	}
	.loading{
		background: #fff !important;
	}
	.search_btn{
		background: url(../../assets/image/doctor/sear.png) no-repeat;
		width: 0.5rem;
		height: 100%;
		background-size: contain;
		position: relative;
		left: 90.5%;
		background-position-y: center;
	}
	.server-list .server-data-null{
		width: 90%;
		margin: 0.84rem 5%;
	}
	.server-list .server-data-null i {
		display: block;
		width: 3.5rem;
		height: 3.5rem;
		position: relative;
		top: 2.5rem;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center ;
		background-size: 3.5rem;
		margin: 0 auto;
	}
	.server-list .server-data-null p{
		float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.35rem;
	}

	 
	.server-list .gzh-basicHealth-title {
		font-size: 0.28rem;
		color: #009985;
		width: 100%;
		height: 0.9rem;
		background: #f5f5f5;
		line-height: 0.9rem;
		text-indent: 0.32rem;
	}
	.gzh-basicHealth{
		width: 100%;
	}
	.gzh-basicHealth li{
		padding: 0.3rem;
		
	}
	.gzh-basicHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
	}
	.gzh-basicHealth li .listImg{
		width: 2rem;
		height: 2rem;
		vertical-align: top;
		border: 0 none;
		display: inline-block;
		float: left;
	}
	.gzh-basicHealth li .listContent_basic{
		float: left;
		padding-left: 0.3rem;
	}
	.listContent_basic .server-name{
		font-size: 0.28rem;
		color: #333;
		margin-top: 0.28rem;
	}
	.listContent_basic .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.1rem;
	}
	.listContent_basic .server-source .server-point{
		color: #494949;
	}
	.listContent_basic .server-place{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.1rem;
	}
	.listContent_basic .server-place img{
		width: 0.3rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	
	.gzh-addedHealth{
		width: 100%;
	}
	.gzh-addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh-addedHealth li:last-child{
		border: 0 none;
	}
	.gzh-addedHealth li .listImg{
		width: 2rem;
		height: 2rem;
		float: left;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.gzh-addedHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
		text-decoration: none;
	}
	.gzh-addedHealth li .listContent_added{
		float: left;
		padding-left: 0.3rem;
		width: 70%;
		position: relative;
	}
	.listContent_added .server-posi{
		position: absolute;
		right: 0;
		top: 0.4rem;
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	}
	.listContent_added .server-posi img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.listContent_added .server-name{
		font-size: 0.28rem;
		color: #333;
	}
	.listContent_added .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source .server-point{
		color: #494949;
	}
	.listContent_added .server-method{
		margin-top: 0.02rem;
	}
	.server-method .server-way{
		float: left;
		color: #999;
	}
	.server-method .server-way img{
		width: 0.32rem;
		vertical-align: middle;
		margin-right: 0.08rem;
	} 
	.server-method .server-time{
		float: left;
		color: #999;
	}
	.server-method .server-time img{
		width: 0.32rem;
		vertical-align: middle;
		margin-left: 0.15rem;
		margin-right: 0.08rem;
	}
	.listContent_added .server-price{
		margin-top: 0.08rem;
		color: #ff5454;
		font-size: 0.2rem;
	}
	.listContent_added .server-price span{
		font-size: 0.3rem;
		font-weight: bold;
		margin-left: 0.1rem;
	}
	.listContent_added .server-buy{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-buy img{
		width: 0.4rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.listContent_added .server-appiont{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-appiont img{
		width: 0.38rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.gzh_addedHealth{
		width: 100%;
		/*padding-top: 0.8rem;*/
	}
	.gzh_addedHealth ul{
		padding-bottom: 0.5rem;
	}
	.gzh_addedHealth li{
		padding: 0.3rem 0;
		width: 92%;
		margin-left: 4%;
		border-bottom: 0.01rem solid #eee;
		
	}
	.gzh_addedHealth li:last-child{
		border: 0 none;
	}
	.gzh_addedHealth li .listImg{
		width: 2rem;
		height: 2rem;
		float: left;
		border-radius: 5px;
		background-repeat: no-repeat;
		background-size: cover;	
		background-position: center;
	}
	.gzh_addedHealth li a{
		display: block;
		width: 100%;
		height: 2rem;
		text-decoration: none;
	}
	.gzh_addedHealth li .listContent_added{
		float: left;
		padding-left: 0.3rem;
		width: 70%;
		position: relative;
	}
	.listContent_added .server-name{
		font-size: 0.28rem;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source{
		font-size: 0.23rem;
		color: #a1a1a1;
		margin-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listContent_added .server-source .server-point{
		color: #494949;
	}
	.listContent_added .server_method{
		margin-top: 0.02rem;
	}
	.server-list .server_method .server-way{
		float: left;
		color: #999;
	}
	.server_method .server-way img{
		width: 0.32rem;
		float: left;
		vertical-align: middle;
		margin-right: 0.08rem;
	} 
	.server_method .server-time{
		float: left;
		color: #999;
	}
	.server_method .server-time img{
		width: 0.32rem;
		float: left;
		vertical-align: middle;
		margin-right: 0.08rem;
	}
	.listContent_added .server-price{
		margin-top: 0.08rem;	
		color: #ff5454;
		font-size: 0.2rem;
	}
	.listContent_added .server-price span{
		font-size: 0.3rem;
		font-weight: bold;
		margin-left: 0.1rem;
	}
	.listContent_added .server-price i{
		font-style: normal;
		font-size: 0.2rem;
		margin-right: 0.06rem;
	}
	.listContent_added .server-buy{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-buy img{
		width: 0.4rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.listContent_added .server-posi{
		position: absolute;
		right: 0;
		bottom: 0.02rem;
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: #737373;
	}
	.listContent_added .server-posi img{
		height: 0.24rem;
		margin-left: 0.06rem;
		vertical-align: middle;
	}
	.listContent_added .server-appiont{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.3rem;
		color: #777;
	}
	.listContent_added .server-appiont img{
		width: 0.38rem;
		vertical-align: middle;
		margin-left: 0.06rem;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
</style>