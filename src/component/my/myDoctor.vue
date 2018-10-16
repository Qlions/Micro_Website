<template>
<section id="myDoctor">
	<Heads :title="titleName" v-on:child-say="listenToMyBoy"></Heads>
	<noBata v-if="doctors ==''" class="nodoc"></noBata>
	<Loading v-if="isLoading" :class="{loadTop:true}"></Loading>
	<scroller :style="{ top:activeTop }"
	:on-refresh="refresh"
	:on-infinite="infinite"
	v-if='doctors != false'
	>
		<div class="doctor_list">

			<ul class="lists mui-table-view" id="OA_task_2">
				<li class="item clearfix mui-table-view-cell mui-transitioning" v-for="(item,index) in doctors" >
						<!--数据授权-->
						<div v-if="!item.contractState && !item.contractTeamProtocolId && item.rfqId && item.applyId " class="mui-slider-right mui-disabled" style="margin-left: 1px;font-size: 0.24rem;line-height: 0.8rem;"><!--隐藏框-->
							<router-link :to=' {path: "/doctor/authorize", query: {docID: JSON.stringify(item)}}' class="mui-btn mui-btn-grey mui-icon mui-icon-person">修改授权</router-link>
							<router-link :to='{path: "/doctor/doctorConsult",query:{ docuserId: item.userId }}'
								 class="mui-btn mui-btn-yellow mui-icon mui-icon-phone">咨询</router-link>
							<a class="mui-btn mui-btn-red mui-icon mui-icon-email" @click="cancle(item.relationId,index)">删除</a>
						</div><!--签约医生-->
						<div v-if="!item.contractState && item.contractTeamProtocolId " class="mui-slider-right mui-disabled" style="margin-left: 1px;font-size: 0.24rem;line-height: 0.8rem;"><!--隐藏框-->
							<router-link :to='{path: "/doctor/hasSinged", 
								query:{familyContractTeamId: item.familyContractTeamId, userId: item.userId}}' 
								class="mui-btn mui-btn-grey mui-icon mui-icon-person" >查看协议</router-link>
							<router-link :to='{path: "/doctor/doctorConsult",query:{ docuserId: item.userId }}'
								 class="mui-btn mui-btn-yellow mui-icon mui-icon-phone">咨询</router-link>
						</div><!--健康专员-->
						<div v-if="!item.contractState && !item.contractTeamProtocolId && (!item.rfqId||item.rfqId && !item.applyId) " class="mui-slider-right mui-disabled" style="margin-left: 1px;font-size: 0.24rem;line-height: 0.8rem;"><!--隐藏框-->
							<router-link :to='{path: "/doctor/doctorConsult",query:{ docuserId: item.userId }}'
								 class="mui-btn mui-btn-yellow mui-icon mui-icon-phone">咨询</router-link>
						</div>
						<div class="mui-slider-handle" @click="goDocMsg(item.userId)" style="border-bottom: 1px solid #eee; padding-bottom: 0.2rem;"><!--显示区域-->
							<div class="mui-table-cell" style="width: 100%;">
								<div class="left"><img :src="item.photosmall"/></div>
								<div class="right">
									<p><span class="span_l">{{item.name}}</span></p>
									<p class="cont docLvl">
										<span v-if="item.department != ','&&item.department != ',,'&&item.department !=''" class="department" style="margin-right: 0.15rem;">{{item.department?item.department.split(",")[0]:""}}
										</span>{{item.proTitle?item.proTitle.split(",")[0]:""}}
										</p>
									<p class="cont docLvl">{{item.hospital?(item.hospital).split(",")[0]:""}}</p>
								</div>
								<div class="doc-type" v-if="!item.contractState && item.contractTeamProtocolId">
									<img src="../../assets/image/my/icon_healteh_experts_doctor.png"/><!--签约医生-->
								</div>
								<div class="doc-type" v-if="!item.contractState && !item.contractTeamProtocolId && item.rfqId && item.applyId ">
									<img src="../../assets/image/my/docType.png"/><!--数据授权-->
								</div>
								<div class="doc-type" v-if="item.contractState" style="line-height: 1.2rem; color: #666;font-size: 0.24rem;">
									等待签约
								</div>
								<div class="doc-type" v-if="!item.contractState && !item.contractTeamProtocolId && (!item.rfqId||item.rfqId && !item.applyId)">
									<img src="../../assets/image/my/icon_healteh_experts_one.png"/><!--健康专员-->
								</div>
							</div>
						</div>
					
				</li>
			</ul>
		</div>
	</scroller>
</section>
</template>

<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import noBata from '../common/noBata.vue'
	export default {
		data () {
			return {
				isLoading:true,
				doctors:[],
				page:1,
				rows:9,
				titleName:"家庭医生",
				hasError:"",
				activeTop: ".84rem",
			}
		},
		computed:{
			show:function(){
				if(this.doctors!=""){
					return false
				}else{
					return true
				}
			}
		},
		components:{
			Heads,
			Loading,
			noBata
		},
		methods: {
			initDoctorList:function(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page:this.page,
						rows:this.rows
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660034, jsonValue:data},{emulateJSON:true}).then( response => {
					this.doctors = response.body.rows;
					console.log(this.doctors)
					setTimeout(() => {
		               this.isLoading = false;
		            }, 500)
				})
			},
			refresh (done) {
				setTimeout(() => {
					this.rows = 9;
					this.initDoctorList();
					done();
				}, 1000)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						page:this.page,
						rows:this.rows+9
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660034, jsonValue:data},{emulateJSON:true}).then( response => {
					
					this.doctors = response.body.rows;
					if (this.rows >= response.body.rows.length) {
			          setTimeout(() => {
			            done(true)
			          }, 1500)
			          return;
			        }
					setTimeout(() => {
						this.doctors = response.body.rows; 
						done();					
					}, 1500)
					this.rows+=9
				})
			},
			cancle(id,index){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({
						relationId:id
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660035, jsonValue:data},{emulateJSON:true}).then( response => {
					
					if(response.state = "del_suc"){
						this.isLoading = true;
						this.doctors = [];
						setTimeout(() => {
			               this.isLoading = false;
			            }, 1000)
						this.initDoctorList();
					}
					
				})
			},
			goDocMsg(userId){//点击列表进入专家介绍
				this.$router.push({"path":'/doctor/doctorAuthorized',query:{docuserId:userId}});
			},
			listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
		},
		mounted:function(){
			this.initDoctorList();
			mui.init();
		},
	}
</script>


<style scoped>
	input{
		-webkit-appearance: none; -moz-appearance: none; -o-appearance: none; appearance: none;
		border: none;
		background: none;
		outline: none;
	}
	#myDoctor{
		
	}
	.lists{
		width: 100%;
	    margin: 0 auto;
	    padding-bottom: 0.2rem;
	    position: relative;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.item{
		overflow: hidden;
	    width: 100%;
	   /* border-bottom: 1px solid #eee;*/
	    padding: 0.3rem 0;
	    position: relative;
	    margin-bottom: -1px;
	}

	.left{
		margin-right: 0.2rem;
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
	}
	.right p{
		height: 0.3rem;
		line-height: 0.3rem;
	}
	.docLvl{
		font-size: 0.2rem;
		margin-top: 0.05rem;
	}
	.span1_l{
		float: left;
	}
	.span_r{
		float: right;
		color: #a0a0a0;
	}
	.cont{
		color: #a0a0a0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.doc-type{
		float: right;
		width: 1rem;
		margin-right: 0.2rem;
		/*margin-top: 0.3rem;*/
	}
	.doc-type img{
		width: 100%;
		height: 1rem;
	}
	.docLoading{
		z-index: 999999;
		background: #fff;
		top: 0.84rem;
	}
	.nodoc{
		position: absolute;
		top: 0.84rem;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	.loadTop {
		background: #fff !important;
		z-index: 2;
	}
	/*MUI样式*/
	.mui-table-view {
	    position: relative;
	    margin-top: 0;
	    margin-bottom: 0;
	    padding-left: 0;
	    list-style: none;
	    background-color: #fff;
	}
	.mui-table-view:before {
	    position: absolute;
	    right: 0;
	    left: 0;
	    height: 1px;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	    top: -1px;
	}
	.mui-table-view:after {
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    height: 1px;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
	.mui-table-view-cell {
	    position: relative;
	    overflow: hidden;
	    padding: 11px 15px 0;
	    -webkit-touch-callout: none;
	}
	.mui-table-view-cell>.mui-slider-right {
	    right: 0;
	    -webkit-transition: -webkit-transform 0ms ease;
	    transition: transform 0ms ease;
	    -webkit-transform: translateX(100%);
	    transform: translateX(100%);
	}
	.mui-table-view-cell>.mui-slider-left, .mui-table-view-cell>.mui-slider-right {
	    position: absolute;
	    top: 0;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    height: 100%;
	}
	/*.mui-table-view-cell>.mui-slider-left>.mui-btn.mui-icon, .mui-table-view-cell>.mui-slider-right>.mui-btn.mui-icon {
	    font-size: 30px;
	}*/
	.mui-table-view-cell.mui-transitioning>.mui-slider-handle, .mui-table-view-cell.mui-transitioning>.mui-slider-left .mui-btn, 	.mui-table-view-cell.mui-transitioning>.mui-slider-right .mui-btn {
	    -webkit-transition: -webkit-transform 300ms ease;
	    transition: transform 300ms ease;
	}
	.mui-table-view-cell>.mui-slider-left>.mui-btn, .mui-table-view-cell>.mui-slider-right>.mui-btn {
	    position: relative;
	    left: 0;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    padding: 0 0.2rem;
	    color: #fff;
	    border: 0;
	    border-radius: 0;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.mui-btn.mui-icon {
	    font-size: 14px;
	    line-height: 1.42;
	}
	.mui-icon {
	    font-family: Muiicons;
	    font-size: 24px;
	    font-weight: 400;
	    font-style: normal;
	    line-height: 1;
	    display: inline-block;
	    text-decoration: none;
	    -webkit-font-smoothing: antialiased;
	}
	.mui-btn-grey {
	    color: #fff;
	    border: 1px solid #c7c7cc;
	    background-color: #c7c7cc;
	}
	.mui-btn-warning, .mui-btn-yellow {
	    color: #fff;
	    border: 1px solid #f0ad4e;
	    background-color: #f0ad4e;
	}
	.mui-btn-danger, .mui-btn-negative, .mui-btn-red {
	    color: #fff;
	    border: 1px solid #dd524d;
	    background-color: #dd524d;
	}
	.mui-table-view-cell.mui-transitioning>.mui-slider-handle, .mui-table-view-cell.mui-transitioning>.mui-slider-left .mui-btn, 	.mui-table-view-cell.mui-transitioning>.mui-slider-right .mui-btn {
	    -webkit-transition: -webkit-transform 300ms ease;
	    transition: transform 300ms ease;
	}
	.mui-table-view-cell>.mui-slider-handle {
	    position: relative;
	    background-color: #fff;
	}
	.mui-table-cell {
	    position: relative;
	}
	/*.mui-table-view{position:relative;margin-top:0;margin-bottom:0;padding-left:0;list-style:none;background-color:#fff}.mui-table-view:after{position:absolute;right:0;bottom:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view:before{position:absolute;right:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc;top:-1px}.mui-table-view-icon .mui-table-view-cell .mui-navigate-right .mui-icon{font-size:20px;margin-top:-1px;margin-right:5px;margin-left:-5px}.mui-table-view-icon .mui-table-view-cell:after{left:40px}.mui-table-view-chevron .mui-table-view-cell{padding-right:65px}.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn){margin-right:-65px}.mui-table-view-radio .mui-table-view-cell{padding-right:65px}.mui-table-view-radio .mui-table-view-cell>a:not(.mui-btn){margin-right:-65px}.mui-table-view-radio .mui-table-view-cell .mui-navigate-right:after{font-size:30px;font-weight:600;right:9px;content:'';color:#007aff}.mui-table-view-radio .mui-table-view-cell.mui-selected .mui-navigate-right:after{content:'\e472'}.mui-table-view-inverted{color:#fff;background:#333}.mui-table-view-inverted:after{position:absolute;right:0;bottom:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#222}.mui-table-view-inverted:before{position:absolute;top:0;right:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#222}.mui-table-view-inverted .mui-table-view-cell:after{position:absolute;right:0;bottom:0;left:15px;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#222}.mui-table-view-inverted .mui-table-view-cell.mui-active,.mui-table-view-inverted .mui-table-view-cell>a:not(.mui-btn).mui-active{background-color:#242424}.mui-table-view-cell{position:relative;overflow:hidden;padding:11px 15px;-webkit-touch-callout:none}.mui-table-view-cell:after{position:absolute;right:0;bottom:0;left:15px;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view-cell.mui-checkbox input[type=checkbox],.mui-table-view-cell.mui-radio input[type=radio]{top:8px}.mui-table-view-cell.mui-checkbox.mui-left,.mui-table-view-cell.mui-radio.mui-left{padding-left:58px}.mui-table-view-cell.mui-active{background-color:#eee}.mui-table-view-cell:last-child:after,.mui-table-view-cell:last-child:before{height:0}.mui-table-view-cell>a:not(.mui-btn){position:relative;display:block;overflow:hidden;margin:-11px -15px;padding:inherit;white-space:nowrap;text-overflow:ellipsis;color:inherit}.mui-table-view-cell>a:not(.mui-btn).mui-active{background-color:#eee}.mui-table-view-cell p{margin-bottom:0}.mui-table-view-cell.mui-transitioning>.mui-slider-handle,.mui-table-view-cell.mui-transitioning>.mui-slider-left .mui-btn,.mui-table-view-cell.mui-transitioning>.mui-slider-right .mui-btn{-webkit-transition:-webkit-transform 300ms ease;transition:transform 300ms ease}.mui-table-view-cell.mui-active>.mui-slider-handle{background-color:#eee}.mui-table-view-cell>.mui-slider-handle{position:relative;background-color:#fff}.mui-table-view-cell>.mui-slider-handle .mui-navigate-right:after,.mui-table-view-cell>.mui-slider-handle.mui-navigate-right:after{right:0}.mui-table-view-cell>.mui-slider-handle,.mui-table-view-cell>.mui-slider-left .mui-btn,.mui-table-view-cell>.mui-slider-right .mui-btn{-webkit-transition:-webkit-transform 0ms ease;transition:transform 0ms ease}.mui-table-view-cell>.mui-slider-left,.mui-table-view-cell>.mui-slider-right{position:absolute;top:0;display:-webkit-box;display:-webkit-flex;display:flex;height:100%}.mui-table-view-cell>.mui-slider-left>.mui-btn,.mui-table-view-cell>.mui-slider-right>.mui-btn{position:relative;left:0;display:-webkit-box;display:-webkit-flex;display:flex;padding:0 30px;color:#fff;border:0;border-radius:0;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.mui-table-view-cell>.mui-slider-left>.mui-btn:after,.mui-table-view-cell>.mui-slider-right>.mui-btn:after{position:absolute;z-index:-1;top:0;width:600%;height:100%;content:'';background:inherit}.mui-table-view-cell>.mui-slider-left>.mui-btn.mui-icon,.mui-table-view-cell>.mui-slider-right>.mui-btn.mui-icon{font-size:30px}.mui-table-view-cell>.mui-slider-right{right:0;-webkit-transition:-webkit-transform 0ms ease;transition:transform 0ms ease;-webkit-transform:translateX(100%);transform:translateX(100%)}.mui-table-view-cell>.mui-slider-left{left:0;-webkit-transition:-webkit-transform 0ms ease;transition:transform 0ms ease;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.mui-table-view-cell>.mui-slider-left>.mui-btn:after{right:100%;margin-right:-1px}.mui-table-view-divider{font-weight:500;position:relative;margin-top:-1px;margin-left:0;padding-top:6px;padding-bottom:6px;padding-left:15px;color:#999;background-color:#fafafa}.mui-table-view-divider:after{position:absolute;right:0;bottom:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view-divider:before{position:absolute;top:0;right:0;left:0;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view .mui-media,.mui-table-view .mui-media-body{overflow:hidden}.mui-table-view .mui-media-large .mui-media-object{line-height:80px;max-width:80px;height:80px}.mui-table-view .mui-media .mui-subtitle{color:#000}.mui-table-view .mui-media-object{line-height:42px;max-width:42px;height:42px}.mui-table-view .mui-media-object.mui-pull-left{margin-right:10px}.mui-table-view .mui-media-object.mui-pull-right{margin-left:10px}.mui-table-view .mui-table-view-cell.mui-media-icon .mui-media-object{line-height:29px;max-width:29px;height:29px;margin:-4px 0}.mui-table-view .mui-table-view-cell.mui-media-icon .mui-media-object img{line-height:29px;max-width:29px;height:29px}.mui-table-view .mui-table-view-cell.mui-media-icon .mui-media-object.mui-pull-left{margin-right:10px}.mui-table-view .mui-table-view-cell.mui-media-icon .mui-media-object .mui-icon{font-size:29px}.mui-table-view .mui-table-view-cell.mui-media-icon .mui-media-body:after{position:absolute;right:0;bottom:0;left:55px;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view .mui-table-view-cell.mui-media-icon:after{height:0!important}.mui-table-view.mui-unfold .mui-table-view-cell.mui-collapse .mui-table-view{display:block}.mui-table-view.mui-unfold .mui-table-view-cell.mui-collapse .mui-table-view:after,.mui-table-view.mui-unfold .mui-table-view-cell.mui-collapse .mui-table-view:before{height:0!important}.mui-table-view.mui-unfold .mui-table-view-cell.mui-media-icon.mui-collapse .mui-media-body:after{position:absolute;right:0;bottom:0;left:70px;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view-cell>.mui-badge,.mui-table-view-cell>.mui-btn,.mui-table-view-cell>.mui-switch,.mui-table-view-cell>a>.mui-badge,.mui-table-view-cell>a>.mui-btn,.mui-table-view-cell>a>.mui-switch{position:absolute;top:50%;right:15px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.mui-table-view-cell .mui-navigate-right>.mui-badge,.mui-table-view-cell .mui-navigate-right>.mui-btn,.mui-table-view-cell .mui-navigate-right>.mui-switch,.mui-table-view-cell .mui-push-left>.mui-badge,.mui-table-view-cell .mui-push-left>.mui-btn,.mui-table-view-cell .mui-push-left>.mui-switch,.mui-table-view-cell .mui-push-right>.mui-badge,.mui-table-view-cell .mui-push-right>.mui-btn,.mui-table-view-cell .mui-push-right>.mui-switch,.mui-table-view-cell>a .mui-navigate-right>.mui-badge,.mui-table-view-cell>a .mui-navigate-right>.mui-btn,.mui-table-view-cell>a .mui-navigate-right>.mui-switch,.mui-table-view-cell>a .mui-push-left>.mui-badge,.mui-table-view-cell>a .mui-push-left>.mui-btn,.mui-table-view-cell>a .mui-push-left>.mui-switch,.mui-table-view-cell>a .mui-push-right>.mui-badge,.mui-table-view-cell>a .mui-push-right>.mui-btn,.mui-table-view-cell>a .mui-push-right>.mui-switch{right:35px}.mui-content>.mui-table-view:first-child{margin-top:15px}.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell:last-child:after,.mui-table-view-cell.mui-collapse .mui-table-view:after,.mui-table-view-cell.mui-collapse .mui-table-view:before{height:0}.mui-table-view-cell.mui-collapse>.mui-navigate-right:after,.mui-table-view-cell.mui-collapse>.mui-push-right:after{content:'\e581'}.mui-table-view-cell.mui-collapse.mui-active{margin-top:-1px}.mui-table-view-cell.mui-collapse.mui-active .mui-collapse-content,.mui-table-view-cell.mui-collapse.mui-active .mui-table-view{display:block}.mui-table-view-cell.mui-collapse.mui-active>.mui-navigate-right:after,.mui-table-view-cell.mui-collapse.mui-active>.mui-push-right:after{content:'\e580'}.mui-table-view-cell.mui-collapse.mui-active .mui-table-view-cell>a:not(.mui-btn).mui-active{margin-left:-31px;padding-left:47px}.mui-table-view-cell.mui-collapse .mui-collapse-content{position:relative;display:none;overflow:hidden;margin:11px -15px -11px;padding:8px 15px;-webkit-transition:height .35s ease;-o-transition:height .35s ease;transition:height .35s ease;background:#fff}.mui-table-view-cell.mui-collapse .mui-collapse-content>.mui-input-group,.mui-table-view-cell.mui-collapse .mui-collapse-content>.mui-slider{width:auto;height:auto;margin:-8px -15px}.mui-table-view-cell.mui-collapse .mui-collapse-content>.mui-slider{margin:-8px -16px}.mui-table-view-cell.mui-collapse .mui-table-view{display:none;margin-top:11px;margin-right:-15px;margin-bottom:-11px;margin-left:-15px;border:0}.mui-table-view-cell.mui-collapse .mui-table-view.mui-table-view-chevron{margin-right:-65px}.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell{padding-left:31px;background-position:31px 100%}.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell:after{position:absolute;right:0;bottom:0;left:30px;height:1px;content:'';-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.mui-table-view.mui-grid-view{font-size:0;display:block;width:100%;padding:0 10px 10px 0;white-space:normal}.mui-table-view.mui-grid-view .mui-table-view-cell{font-size:17px;display:inline-block;margin-right:-4px;padding:10px 0 0 14px;text-align:center;vertical-align:middle;background:0 0}.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object{width:100%;max-width:100%;height:auto}.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn){margin:-10px 0 0 -14px}.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn).mui-active,.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn):active{background:0 0}.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{font-size:15px;line-height:15px;display:block;width:100%;height:15px;margin-top:8px;text-overflow:ellipsis;color:#333}.mui-table-view.mui-grid-view .mui-table-view-cell:after,.mui-table-view.mui-grid-view .mui-table-view-cell:before{height:0}.mui-grid-view.mui-grid-9{margin:0;padding:0;border-top:1px solid #eee;border-left:1px solid #eee;background-color:#f2f2f2}.mui-grid-view.mui-grid-9:after,.mui-grid-view.mui-grid-9:before{display:table;content:' '}.mui-grid-view.mui-grid-9:after{clear:both;position:static}.mui-grid-view.mui-grid-9 .mui-table-view-cell{margin:0;padding:11px 15px;vertical-align:top;border-right:1px solid #eee;border-bottom:1px solid #eee}.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active{background-color:#eee}*/
</style>