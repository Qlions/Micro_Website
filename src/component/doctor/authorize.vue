<template>
	<div class="box_authorization">
		<!--header-->
		<Heads :title="titleHead" class="head_div"></Heads>
		<!--<div style="height: 0.84rem; width: 1px;"></div>-->
		<!--头像-->
		<div class="top_box_ul">
			<div>
				<!--用户-->
				<ul>
					<li class="header_img"><img v-bind:src="JSON.parse(this.$cookie.get('userInfo')).photomiddle"/></li>
					<li class="header_name">{{ JSON.parse(this.$cookie.get('userInfo')).userName }}</li>
					<li class="header_id">UID: <span>{{ JSON.parse(this.$cookie.get('userInfo')).userCode }}</span></li>
				</ul>
				
				<!--授-->
				<ul>
					<li class="header_center"><img src="../../assets/image/doctor/sever_shouquan.png"/></li>
					
				</ul>
				
				<!--医生-->
				<ul>
					<li class="header_img"><img v-bind:src="JSON.parse(doctorId).photosmall"/></li>
					<li class="header_name">{{ JSON.parse(doctorId).name }} </li>
					<li class="header_id"><span>{{ JSON.parse(doctorId).proTitle.split(',')[0] }}</span></li>
				</ul>
			</div>
			
			<p class="information_p">授权[<span>{{ JSON.parse(doctorId).name }}</span>]浏览我下列信息</p>
			
		</div>
		<div style="height: 0.15rem; width: 100%; background: #eee; margin: 0 auto;"></div>
		
		<!--选择框-->
		<div class="select_box">
			
			<ul>
				<li  :class="{ 'b_img_checked': isAll}" @click="onlyClick()" class="b_img_uncheck">全部信息<b  ></b></li>
				<li v-for="item in selectData" @click="allClick(item)" :class="{ 'b_img_checked': item.isC}" class="b_img_uncheck">
					<span>{{ item.name }}</span>
					<b   ></b>
				</li>
				<li style="height: 0.8rem"></li>
			</ul>
		</div>
		
	<!--确认授权按钮-->
		<div class="ok_authorization_btn" @click="authorizationBtn()">确认授权</div>
		
		<!--提示信息-->
		<err :message="err" v-if="isShow">{{ err }}</err>
	</div>
</template>

<script>
	import Heads from '../common/head.vue'
	import err from '../common/error-popup.vue'
	export default {
		data (){
			return {
				titleHead: "授权",
				allSrc: 'src/assets/image/doctor/accredit_uncheck.png',
				selectData: [
						{
							name: '手机号/固定电话',
							isC: false,
							remark: 'UA001'
						},
						{
							name: '电子邮件地址',
							isC: false,
							remark: 'UA002'
						},
						{
							name: '工作单位',
							isC: false,
							remark: 'UA003'
						},
						{
							name: '联系地址',
							isC: false,
							remark: 'UA004'
						},
						{
							name: '健康评估数据',
							isC: false,
							remark: 'UA005'
						},
						{
							name: '心理评估数据',
							isC: false,
							remark: 'UA006'
						},
						{
							name: '中医体质辨识数据',
							isC: false,
							remark: 'UA007'
						},
						{
							name: '健康档案数据',
							isC: false,
							remark: 'UA008'
						},
						{
							name: '健康监测数据',
							isC: false,
							remark: 'UA009'
						},
					],
				isAll: false,
				authorizationJSON: '',
				//docID
				doctorId: this.$route.query.docID,
				err: '',
				isShow: false
			}
		},
		components:{
			Heads,
			err
		},
		
		methods:{
			//全选
			allClick(item){
				item.isC = !item.isC;
			},
			//单选
			onlyClick() {
 				this.isAll = !this.isAll;
 				for(let i = 0; i < this.selectData.length; i++){
 					this.selectData[i].isC = this.isAll;
 				}
			},
			
			
			init(){	
				//660036
				
				let userinfo = JSON.parse(this.$cookie.get("userInfo"));
					let token = userinfo.token;
					let data = JSON.stringify({
//						docId : this.docUserid,
					docId: JSON.parse(this.doctorId).userId,
				})
					console.log(data)
						
				this.$http.post("/webserviceProxy/webservice/wtWebApiH/GetServerData",{token: token,infoType:660036,jsonValue: data},{emulateJSON: true}).then( response =>{
					
					console.log(response + '==========');
					console.log(response.body.remark);
					let res = response.body.remark;
					let arr = res.split(',');
					console.log(arr);	
					for(let i = 0; i < arr[i].length; i++){
//						item.isC = !item.isC;
 						this.selectData[i].isC = !this.selectData[i].isC;
 					}
					
				})

				
			},
			
			
			//授权
			authorizationBtn() {
				for(let i = 0; i < this.selectData.length; i ++){
					if(this.selectData[i].isC){
						this.authorizationJSON += this.selectData[i].remark + '_';
					}
				}
				console.log(this.authorizationJSON)
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				
				
				
				if(this.authorizationJSON != ''){
					

					/**
					 签约    660037
					 */
					let  authorizationJSON = JSON.stringify({
						docId: JSON.parse(this.doctorId).userId,
						type: 1,
						attention: this.authorizationJSON
					});

					this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660037, jsonValue:authorizationJSON},{emulateJSON:true}).then( response => {

					console.log(response);
					let stateAdd = response.body.state;
					console.log(stateAdd);
					switch (stateAdd){
						case "add_suc":
							this.err = '授权成功，请等待确认';
							this.isShow = true;
							setTimeout( () => {
								this.$router.go(-1);
							},500)
							break;
						case 'add_full':
							this.err = '医生授权客户已满';
							this.isShow = true;
							setTimeout( () => {
								this.isShow = false;
							},1000)
							break;
						default:
							this.err = '系统异常';
							this.isShow = true;
							setTimeout( () => {
								this.isShow = false;
							},1000)
							break;
						}
					});
				}else{
					this.err = '请选择授权信息';
					this.isShow = true;
					setTimeout( () => {
						this.isShow = false;
					},1000)
				}
			}
			
		},
		mounted: function (){
			this.init()
		}
		
	}
</script>

<style>
	.head_div{
		background: #fff !important;
		border-bottom: 1px solid #eee;
	}
	.head_div h2{
		color: #fff !important;
	}
	
	/*大盒子*/
	.box_authorization{
		width: 100%;
		height: 100%;
	}
	
	/*确认授权按钮*/
	.ok_authorization_btn{
		background: #009983;
		height: .84rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		color: #fff;
		font-size: 0.36rem;
		text-align: center;
		line-height: 0.84rem;
	}
	
	/*头像的大盒子*/
	.top_box_ul{
		width: 94%;
		margin:  0.3rem auto 0 auto;
		
	}
	.top_box_ul ul{
		width: 33.33%;
		height: 40%;
		float: left;
	}
	.top_box_ul ul li{
		text-align: center;
	}
	.top_box_ul ul li.header_img{
		width: 100%;
		height: 1.5rem;
		text-align: center;
	}
	.top_box_ul ul li.header_img img{
		width: 1.5rem;
		height: 1.5rem;
	}
	.header_name{
		font-size: 0.3rem;
		color: #333;
		line-height: 0.5rem;
		margin-top: 0.15rem;
	}
	.header_id{
		font-size: .3rem;
		color: #999;
		
	}
	.header_center img{
		width: 25%;
		margin-top: 25%;
	}
	.information_p{
		color: #999;
		font-size: 0.32rem;
		text-align: center;
		height: 0.8rem;
		line-height: 0.8rem;
		border-top: 1px solid #eee;
		-webkit-border-top: 1px solid #eee;
		margin-top:0.2rem;
	}
	.information_p span{
		color: #009983;
	}
	/*选择框*/
	.select_box{
		width: 94%;
		
		margin:  0 auto;
		
	}
	.select_box ul li{
		font-size: 0.32rem;
		color: #999;
		line-height: 0.8rem;
		height: .8rem;
		border-bottom: 1px solid #eee;
	}
	.select_box ul li i{
		float: right;
		text-align: right;
		vertical-align: middle;
		
	}
	.select_box li img{
		width: 35%;
		margin-top: 0.2rem;
	}
	
	
	.b_img_uncheck b{
		background: url(../../assets/image/doctor/accredit_uncheck.png) no-repeat;
		width: 0.3rem;
		height: 100%;
		display: block;
		background-size: contain;
		float: right;
		background-position: center center;
	}
	.select_box ul li.b_img_checked b{
		background: url(../../assets/image/doctor/accredit_checked.png) no-repeat;
		width: 0.3rem;
		height: 100%;
		display: block;
		background-size: contain;
		float: right;
		background-position: center center;
	}
	.select_box ul li.b_img_checked{
		color: #333;
	}
</style>