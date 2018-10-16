<template>
<section id="myConcern">
	<Heads :title="titleName"></Heads>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<!--<div class="zApp-Csut zApp-Follow-w" id="havaDataId">
		<ul class="zApp-CsutList zApp-Follow-list clear" id="productDiv">
			<li>
				<div class="zApp-CsuPic clear">
					<a href="javascript:void(0)" onclick="goGoods('8151172345006080100001')">
						<span>
							<img src="../../assets/image/add_meal0.png">
						</span><div class="zApp-CsuName"><h2 style="padding:0px;">男性套餐</h2><b>￥7761.89</b></div>
					</a>
				</div>
				<div class="zApp-Follow-Del">
					<a href="javascript:void(0);" onclick="cancalProduct('39151839106598912100001')">
						<i></i>
						<em>取消关注</em>
					</a>
				</div>
			</li>
		</ul>
	</div>
	
	<div class="nodata" v-if="nodata == false">
		<img class="nodataImg" src="../../assets/image/my/no_data_icon.png">
		<p class="nodataC">您还没有关注的商品</p>
		<div class="goC">
		<a class="go">去逛逛</a>
		</div>
	</div>-->
	<noBata v-if="doctors ==''"></noBata>
	<sucPopup v-if="sucShow==true" :sucMessage="sucMessage"></sucPopup>
	<errorPopup v-if="errShow==true" :message="message"></errorPopup>
	<div class="popup-container" v-if="sure" @touchmove.prevent>
		<div class="popupMBox" @click="close()">
			
		</div>
		<div class="popupM">
			<div class="imgBox">
				<img src="../../assets/image/my/red-gantanhao.png"/>
			</div>
			<p>确认取消<span class="redtxt">{{docName}}</span>的关注</p>
			<div class="bottom_box">
				<span @click="delConcern()">确定</span>
				<i @click="close()">取消</i>
				<em></em>
			</div>
		</div>
	</div>
	<div class="doctor_list">
		<ul class="lists">
			<div class="item" v-for="(item,index) in doctors" key="index">
				<!--点击取消关注时的弹出框-->
				<div class="docDetail clearfix">
					<router-link :to='{path:"/doctor/doctorAuthorized", query:{docuserId : item.userId }}' >
						<div class="left"><img :src="item.photosmall"/></div>
						<div class="right">
							<p><span class="span_l">{{item.name}}</span><!--<span class="span2">{{item.proTitle.split(',')[0]}}</span>--></p>
							<!--<p class="cont">{{item.department?(item.department).split(",")[0]:""}}<span class="docLvl">{{item.proTitle?item.proTitle.split(",")[0]:""}}</span></p>-->
							<p class="cont">{{item.hospital?(item.hospital).split(",")[0]:""}}</p>
							<p class="cont">擅长:{{item.docSpecialty?item.docSpecialty:"暂无介绍"}}</p>
						</div>
					</router-link>
					<div class="del-concern">
						<a href="javascript:void(0);" @click="del(item)">
							<i></i>
							<em>取消关注</em>
						</a>
					</div>
				</div>
			</div>
		</ul>
	</div>
</section>
</template>

<script>
	import noBata from '../common/noBata.vue'
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import sucPopup from '../common/suc-popup.vue'
	import errorPopup from '../common/error-popup.vue'
	export default {
		data () {
			return {
				isLoading:true,
				nohead:"nohead",
				titleName:"健康专家",
				doctors:"",
				sure:false,
				docName:"",
				attentionId:"",
				sucShow:false,
				errShow:false,
				message:'',
				sucMessage:""
//				nodata:true
			}
		},
		components:{
			Heads,Loading,noBata,sucPopup
		},
		methods: {
			loadingClose(){
				let time = setTimeout(()=>{
					if( this.isLoading ==  true){
                		this.isLoading = false;
                	} 
                },1000);  
			},
			//操作成功或失败提示
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.sucShow ==  true){
                		this.sucShow = false;
                	}
					if(this.errShow ==  true){
						this.errShow = false;
					}
                },1500);  
			},
			initDoctorList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111127, jsonValue:""},{emulateJSON:true}).then( response => {
					this.doctors = response.body.rows;
					console.log(this.doctors)
					this.loadingClose()
				})
			},
			del(item){
				this.sure = true;
				this.docName = item.name;
				this.attentionId = item.attentionId
			},
			delConcern(){
				let that = this;
				let userInfo =  JSON.parse(that.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
					id : that.attentionId
				});
				that.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111126, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					if(response.body.state == 'del_suc'){
						that.sure = false;
						that.sucShow = true;
						console.log(that.sucShow)
						that.sucMessage = "取消关注成功";
						that.initDoctorList()
						that.clearStorage()
					}else{
						that.sure = false;
						that.errShow = true;
						console.log(that.sucShow)
						that.message = "取消关注失败";
						that.clearStorage()
					}
					
				},response=>{
					console.log(response)
				})
			},
			close(){
				this.sure = false
			}
		},
		mounted(){
			this.initDoctorList()
		}
	}
</script>

<style scoped>
	#myConcern{
		padding-top: .84rem;
	}
	.lists{
		width: 100%;
	    margin: 0 auto;
	    padding: 0 0.2rem;
	    padding-bottom: 0.2rem;
	    position: relative;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.item{
		display: block;
		overflow: hidden;
		position: relative;
	    width: 100%;
	    border-bottom: 1px solid #eee;
	    padding: 0.3rem 0;
	    position: relative;
	    margin-bottom: -1px;
	}
	.left{
		margin-right: 0.3rem;
		width:1rem;
		height: 1rem;
		overflow: hidden;
		float: left;
		border-radius: 50%;
		border:1px solid #eee;
	}
	.left img{
		display: block;
		width: 100%;
		height: 100%;
		
	}
	.right{
		float: left;
		width: 60%;
		padding-right: 0.2rem;
		border-right: 1px solid #eee;
	}
	.right p{
		font-size: 0.24rem;
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.docLvl{
		display: inline-block;
		margin-left: 0.1rem;
	}
	.span_l{
		float: left;
		margin-right: 0.15rem;
	}
	.span2{
		color: #a0a0a0;
	}
	.span_r{
		float: right;
		color: #a0a0a0;
	}
	.right .cont{
		color: #a0a0a0;
		height: 0.3rem;
		line-height: 0.3rem;
		font-size: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.del-concern{
	    position: absolute;
	    top: 0.3rem;
	    right: 0.2rem;
	    width: 1.4rem;
	    height: 1.2rem;
	    font-size: 0.24rem;
	}
	.del-concern a {
	    float: left;
	    width:1.4rem;
	    height: 1.2rem;
	    padding-left: 0.2rem;
	}
	.del-concern a i {
	    float: left;
	    width: 0.4rem;
	    height: 0.4rem;
	    background: url(../../assets/image/my/follow_icon.png) no-repeat left center;
	    background-size: 0.8rem 0.4rem;
	    margin: 0.2rem 0.4rem 0;
	}
	.del-concern a em {
	    float: left;
	    width: 1.2rem;
	    height: 0.6rem;
	    line-height: 0.6rem;
	    text-align: center;
	    color: #a0a0a0;
	}
	/*弹出框样式*/
	.popup-container{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
	}
	.popupMBox{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.1);
	}
	.popupM{
		color: #666;
		width: 90%;
		height: 3.35rem;
		position: absolute;
		top:30%;
		left: 5%;
		z-index: 9999;
		background: #fff;
		border-radius: 5px;
		font-size: 0.28rem;
	}
	.popupM .imgBox{
		width: 0.65rem;
		height: 0.65rem;
		position: absolute;
		top:2%;
		left: 45%;
		margin-left: 45%;
		margin:0.5rem 0 0.4rem;
	}
	.popupM .imgBox img{
		width: 100%;
		height: 100%;
		display: inline-block;
	}
	.popupM p{
		padding: 0 0.1rem;
		line-height: 0.32rem;
		margin-top: 1.65rem;
		text-align: center;
		
		line-height: 0.35rem;
		margin-bottom: 0.4rem;
	}
	.redtxt{
		display: inline-block;
		padding: 0 0.1rem;
		font-size:0.35rem;
		color: #ff5454;
		max-width: 2.5rem;
		overflow: hidden;
		height: 0.35rem;
		text-overflow:ellipsis;
		white-space: nowrap;
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
		color: #ff5454;
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
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	/*input{
		-webkit-appearance: none; -moz-appearance: none; -o-appearance: none; appearance: none;
		border: none;
		background: none;
		outline: none;
	}
	.nodataImg{
		display: block;
		height: 3rem;
		margin: 0.6rem auto 0.3rem;
	}
	.nodataC{
		color: #A0A0A0;
		text-align: center;
	}
	.goC{
		text-align: center;
		margin-top: 0.2rem;
	}
	.go{
		display: inline-block;
		height: 0.6rem;
		line-height: 0.6rem;
		background: #6bae3d;
		color: #fff;
		text-align: center;
		padding: 0 0.5rem;
		margin: 0 auto;
		font-size: 0.28rem;
	}
	.zApp-Follow-w {
	    width: 100%;
	    margin: 10px auto;
	    margin-top: 50px;
	    border-top: 1px solid #dedede;
	    border-bottom: 1px solid #dedede;
	    background: #fff;
	    padding: 0 10px;
	    overflow: hidden;
	}
	.zApp-CsutList {
	    width: 100%;
	    margin: 10px auto;
	    margin-bottom: 0;
	    overflow: hidden;
	}
	.zApp-CsutList li {
	    float: left;
	    width: 100%;
	    background: #fff;
	    padding: 0 10px;
	    margin-bottom: 10px;
	    border-bottom: 1px solid #dedede;
	    border-top: 1px solid #dedede;
	}
	.zApp-Follow-list .zApp-CsuPic {
	    border-bottom: none;
	    float: left;
	    width: 100%;
	    padding-right: 70px;
	}
	.zApp-CsuPic a {
	    float: left;
	    width: 100%;
	}
	.zApp-CsuPic a span {
	    float: left;
	    width: 60px;
	    height: 60px;
	    border: 1px solid #f0f0f0;
	    padding: 5px;
	}
	.zApp-CsuPic a span img {
	    max-width: 50px;
	    max-height: 50px;
	}
	.zApp-CsuPic .zApp-CsuName {
	    margin-left: 70px;
	}
	.zApp-CsuPic .zApp-CsuName h2 {
	    font-size: 12px;
	    color: #595959;
	    height: 40px;
	    overflow: hidden;
	}
	.zApp-CsuPic .zApp-CsuName b {
	    color: #ff5454;
	}
	
	.zApp-Follow-list .zApp-Follow-Del {
	    position: absolute;
	    right: 10px;
	    width: 70px;
	    height: 60px;
	    margin: 10px auto;
	}
	.zApp-Follow-list .zApp-Follow-Del a {
	    float: left;
	    width: 70px;
	    height: 60px;
	    padding-left: 10px;
	    border-left: 1px solid #f0f0f0;
	}
	.zApp-Follow-list .zApp-Follow-Del a i {
	    float: left;
	    width: 20px;
	    height: 20px;
	    background: url(../../assets/image/my/follow_icon.png) no-repeat left center;
	    background-size: 40px 20px;
	    margin: 10px 20px 0;
	}
	.zApp-Follow-list .zApp-Follow-Del a em {
	    float: left;
	    width: 60px;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    color: #a0a0a0;
	}*/
</style>