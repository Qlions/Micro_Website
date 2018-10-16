<template>
	<div class="server-list">
		<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
		<Loading v-if="isLoading" class="loading"></Loading>
		<div class="server-data-null" v-if="dataHide == 0">
			<i></i>
			<p class="noDataP" style="position: relative;top: 2.3rem;">暂无相关服务</p>
		</div>
		<signMask v-on:sign-event="signEvent" v-if="isSign"></signMask>
		<wait-audit v-on:wait-event="waitEvent" v-if="isWait"></wait-audit>
		<div v-if="dataHide == 1">
			<scroller style="width:100%;margin-bottom:0.84rem auto;background: #fff;position: absolute;padding-top: 0.84rem;"
			:on-refresh="refresh"
			:on-infinite="infinite"
			v-if='isLoading == false'
			:style="{ top:activeTop }"
			>			
				<div class="gzh-addedHealth">
					<ul>
						<li class="clearfix" v-for="list in addedHealthList">
							<a @click.stop="toDetail(list)">
								<!--<img :src="list.imgUrl" class="listImg" alt="" />-->
								<div class="listImg" :style="{backgroundImage:'url('+ imgIcon(list.imgUrl) +')'}"></div>
								<div class="listContent listContent_added">
									<p class="server-name">{{list.serviceDictName}}</p>
									<p class="server-source">由 <span class="server-point">{{list.eaName}}</span> 提供服务</p>
									<div class="server-method clearfix">
										<p class="server-way">
											<img src="../../assets/image/server/server_method.png" alt="" />
											{{list.serviceDictComponent !== null ? list.serviceDictComponent : list.serviceDictWay}}
										</p>
										<p class="server-time" v-if="list.serviceDictTime != null && list.serviceDictTime != ''">
											<img src="../../assets/image/server/server_time.png" alt="" />
											{{list.serviceDictTime}}分钟
										</p>
									</div>
									<p class="server-price"><span v-html="serviceMoney(list)"></span></p>
									<p class="server-buy" 
										@click.stop="toConform(list)" 
										v-if='list.serviceDictReservation == "0"'>
										购买<img src="../../assets/image/server/buy_icon.png"/></p>
									<p class="server-appiont" 
										@click.stop="toConform(list)" 
										v-if='list.serviceDictReservation == "1"'>
										预约<img src="../../assets/image/server/yuyuepic.png"/></p>
									<p class="server-posi" v-if="list.distance != '-1' && list.distance != null">{{ list.distance | getDistance}}<img src="../../assets/image/server/posi_icon.png"/></p>	
								</div>
							</a>
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
	import signMask from '../common/serviceSignTip.vue'
	import waitAudit from '../common/waitAudit.vue'
	export default {
		data (){
			return {
				titleName : "服务列表",
				isLoading: true,
				isSign: false,
				isWait: false,
				dataHide: 1,
				page: 1,
				rows: 8,
				signState: '',
				searchVal: "",
				filterDatas: "",
				activeTop: "",
				hasError: "",
				addedHealthList: [] 
				
			}
		},
		components:{
			Heads,
			Loading,
			signMask,
			waitAudit
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
				let token;
				let data;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				if(this.filterDatas == ""){
					data = JSON.stringify({
						page: this.page,
						rows: this.rows,
						platType:"2",
						searchValue: this.searchVal
					})
				}else {
					this.filterDatas.searchValue = this.searchVal;
					data = JSON.stringify(this.filterDatas);
				}
				console.log("筛选条件",JSON.parse(data));
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body == null || response.body.rows == ""){
						this.dataHide = 0;
						setTimeout(() => {
			               this.isLoading = false;
			            }, 500)
					}else {
						this.dataHide = 1;
						this.addedHealthList = response.body.rows;
						this.signState = response.body.signState;
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
				let token;
				let data;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				if(this.filterDatas == ""){
					data = JSON.stringify({
						page:this.page,
						rows:this.rows+8,
						platType:"2",
						searchValue: this.searchVal
					});
				}else {
					this.filterDatas.rows = this.rows+8;
					data = JSON.stringify(this.filterDatas);
				}
				
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111180, jsonValue:data},{emulateJSON:true}).then( response => {
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
				this.$store.state.itemsList = "";
				sessionStorage.setItem("server_relationEaId",relationEaId);
				this.$store.state.mailInfo = "";
				this.$router.push({path:"/server/serverDetail",query:{id:id,type:type}});
			},
			toConform(item){
				const isSign = item.reservationValid;
				const signState = this.signState;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				if(!userInfo){//用户未登录
					this.$router.push({path: '/login'});
				}else {
					if(isSign.includes('yyyz6')){
						if(signState == '0') {//未签约
							this.isSign = true;
							return false;
						}
						if(signState == '3'){//等待审核
							this.isWait = true;
							return false;
						}
					}
				}
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
				this.$store.state.appointInfo = "";
				this.$store.state.imgList = "";
				this.$store.state.itemsList = "";
				this.$store.state.mailInfo = "";
				window.localStorage.removeItem("passValue");
				this.$router.push({"path":'/serverDetail/serverConfirm',query:{id:id,type:type,money:money}});
				
			},
			serviceMoney(obj){
				let min = obj.serviceMoneyMin;
				let max = obj.serviceMoneyMax;
				let isHaveItems= obj.isHaveItems;
				if(min == max){
					if(isHaveItems == '1'){
						return "<i>¥</i>" + min.toFixed(2) + "<em>+</em>";
					}else {
						return "<i>¥</i>" + min.toFixed(2);					
					}
				}else {
					return "<i>¥</i>" + min.toFixed(2) + "<em>+</em>";
				}
			},
			imgIcon(str){
				let list = String(str).split(",");
				return list[0];
			},
			listenToMyBoy(somedata){
				this.hasError = somedata;
			},
			signEvent(data){
				this.isSign = data;
			},
			waitEvent(data){
				this.isWait = data;
			}
		},
		watch:{
			hasError:function(val){
				console.log(val)
				if(val == true){
					this.activeTop = 0;
				}
			}
		},
		mounted(){
			if(sessionStorage.getItem('key_head') == 1){
				this.activeTop = 0;
			}else {
				this.activeTop = 0+'rem';
			}
			sessionStorage.removeItem("isDetail");
			this.initHealthList();
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
		margin-left: 0.06rem;
	}
	.listContent_added .server-price i{
		font-style: normal;
		font-size: 0.2rem;
		margin-right: 0.06rem;
	}
	.listContent_added .server-price em{
		font-size: 0.24rem;
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
</style>