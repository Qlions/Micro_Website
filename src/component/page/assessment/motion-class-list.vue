<!-- 运动分类组件 -->
<template>
	<section class="diet-list">
		<Heads :title="title">
			<i @click="backBtn">
				<img src="../../../assets/image/add_sport_right.png" alt="">
				<b v-show="isNum">{{ num }}</b>
			</i>
		</Heads>
		<div class="diet-list-content">
			<ul>
				<li v-for="(item,index) in items" :class="{ arctive:isAcrtive == index }">
					<div class="diet-list-content-title" @click="toggle(index,item.ssortId)">
						<dl>
							<dd class="cfName-icon">
								<img :src="`./src/assets/image/sport_tpye${ index+1 }.png`" alt="">
							</dd>
							<dt class="cfName">
								<h2>{{ item.sortName }}</h2>
							</dt>
						</dl>
					</div>
					<ol v-if="current == index">
						<li v-for="name in foodName" @click="modality(name.sportName,name.kcalId)">
							{{ name.sportName }}
						</li>
					</ol>
				</li>
			</ul>
		</div>
		<div class="diet-modality" v-show="isModality">
			<div class="diet-modality-form">
				<div class="motion-modality-content">
					<label for="">
						<img :src="`./src/assets/image/sport_tpye${ imgIndex+1 }.png`" alt="">
						<span>{{ inerHTML }}</span>
						<div class="modality-content-input">
							<input type="number" v-model="valueTxt" placeholder="请输入值">
							<b>分</b>
						</div>		
					</label>
				</div>
				<div class="modality-btn">
					<a href="javascript:void(0)" @click="cancel">取消</a>
					<a href="javascript:void(0)" @click="commit(inerHTML,foodCode,valueTxt)">确定</a>
				</div>
			</div>
		</div>
		<Popup v-show="isPopup" :message="message"></Popup>
	</section>
</template>
<script>
	import Heads from '../../common/head.vue'
	import Popup from '../../common/error-popup.vue'
	export default {
		data () {
			return {
				items:'',
				num:'',
				foodName:"",
				inerHTML:"", // 膳食名称
				valueTxt:"", // 输入框值
				foodCode:"", // 膳食ID
				imgIndex:"", // 图片默认index
				message:"",
				isModality:false,
				isPopup:false,
				current:-1,
				isAcrtive:-1,
				isNum:false,
				title:"添加运动",
				classA: this.$route.query.classA,
				classB: this.$route.query.classB,
			}
		},
		components:{
			Heads,
			Popup
		},
		methods: {
			//返回上一页
			backBtn () {
				this.$router.go(-1);
			},
			//一级菜单
			oneClassify () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:this.classA },{emulateJSON:true})
				.then(response => {
					response.body.splice(1,1);
					this.items = response.body;
				})
			},
			//二级菜单
			twoClassify (sortId) {
				this.foodName = '';
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({ 
					'sortId':sortId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:this.classB,jsonValue:data },{emulateJSON:true})
				.then(response => {
					this.foodName = response.body;
				})
			},
			//展示隐藏
			toggle (index,sortId) {
				this.imgIndex = index;
				if(this.current == index){
		            this.current = -1;
		            this.isAcrtive = -1;
		        }else{
		            this.current = index;
		            this.isAcrtive = index;
		        }
		        this.$store.state.fcategoryId.push(sortId);
		        this.twoClassify(sortId);
			},
			//添加膳食菜单
			modality (valName,valCode,imgIndex) {
				this.inerHTML = valName;
				this.foodCode = valCode;
				this.isModality = true;
				this.valueTxt = '';
				document.body.style.overflow = "hidden";
				if( this.$store.state.listArr.length >= 8 ){
					this.isModality = false;
					this.isNum = true;
					this.num = 8;
					this.isPopup = true;
					this.message = "最多添加8条";
					setTimeout(()=>{
						if( this.isPopup ==  true){
	                		this.isPopup = false;
	                	} 
	                },1500);
				}
			},
			cancel () {
				this.isModality = false;
				document.body.style.overflow = "scroll";
			},
			// 保存用户添加膳食分类
			commit (name,id,val) {
				let valNum = parseFloat(val);
				if( val == '' ){
					this.isPopup = true;
					this.message = "请正确输入，不能为空";
					this.clearStorage();
				}else if( val <= 0 ){
					this.isPopup = true;
					this.message = "请正确输入，值必须大于0";
					this.clearStorage();
				}else if( Number.isInteger(valNum) == false ){
					this.isPopup = true;
					this.message = "请正确输入，值必须为整数";
					this.clearStorage();
				}else {
					var obj = {
						sportName:name,
						kcalId:id,
						minuteSum:val,
					}
					this.$store.state.listArr.push(obj);
					if( this.$store.state.listArr.length == 1 ){
						this.num = this.$store.state.listArr.length;
						this.isNum = true;
					}else {
						var hash = {};
						this.$store.state.listArr = this.$store.state.listArr.reduce(function(item, next) {
							hash[next.kcalId] ? '' : hash[next.kcalId] = true && item.push(next);
							return item
						}, [])
						this.isNum = true;
						this.num = this.$store.state.listArr.length;
					}
					this.isModality = false;
				}			
			},
			clearStorage:function(){
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },1500);  
			}
		},
		mounted () {
			// 判断添加数量
			let hash = {};
			this.$store.state.listArr = this.$store.state.listArr.reduce(function(item, next) {
				hash[next.kcalId] ? '' : hash[next.kcalId] = true && item.push(next);
				return item
			}, [])
			if( this.$store.state.listArr.length == 0 ){
				this.num = "";
				this.isNum = false;
			}else {
				this.isNum = true;
				this.num = this.$store.state.listArr.length;
			} 
			this.oneClassify();
			
	}
	}
</script>
<style>
	header i {
		display: block;
		text-align: center;
		width: .84rem;
		height: .84rem;
		position: absolute;
		right: 0;
		top: 0;
	}
	header i b {
		display: block;
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 0.25rem;
		background: #f33232;
		text-align: center;
		line-height: 0.25rem;
		position: absolute;
		left: 0.1rem;
		top: 0.1rem;
		color: #fff;
	}
	.diet-list {
		padding-top: .84rem;
	}
	.diet-list-content {
		width: 100%;
	}
	.diet-list-content ul li {
		padding: 0.25rem;
		font-size:0.3rem;
		border-bottom: 1px solid #f0f0f0;
	}
	.diet-list-content ul li ol li:last-child {
		border-bottom: none;
	}
	.diet-modality {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.34);
		top: 0;
		bottom: 0;
		z-index: 9;
	}
	.diet-modality-form {
		width: 100%;
		height: 2.5rem;
		background: #fff;
		position: absolute;
		bottom: 0;
	}
	.motion-modality-content {
		padding: 0.15rem;
		font-size: 0.35rem;
		border-bottom: 1px solid #f0f0f0;
	}
	.motion-modality-content span {
		margin-left: 0.18rem;
		margin-top: .18rem;
		display: block;
		float: left;
		width: 3.4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.motion-modality-content img {
		width: .9rem;
		height: .9rem;
		float: left;
	}
	.modality-content-input {
		float: right;
		margin-top: 0.18rem;
	}
	.motion-modality-content input {
		text-align: right;
		width: 2rem;
	}
	.modality-btn {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.modality-btn a {
		display: block;
		width: 50%;
		float: left;
		background: #009983;
		text-align: center;
		color: #fff;
		font-size: 14px;
		padding: 0.25rem 0;
	}
	.cfName-icon {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 0.05rem;
		float: left;
	}
	.cfName-icon img {
		width: 100%;
	}
	.cfName {
		float: left;
		margin-left: 0.25rem;
		line-height: 1rem;
		font-size: .32rem;
	}
	.cfName p {
		margin-top: .06rem;
		color: #999;
	}
	.diet-list-content>ul>li {
		position: relative;
	}
	.diet-list-content>ul>li:after{
		content: "";
		width: .24rem;
		height: .24rem;
		border-left: 1px solid #666;
		border-bottom: 1px solid #666;
		transform: rotate(314deg);
		-webkit-transform: rotate(314deg);
		position: absolute;
		right: .3rem;
		top: .6rem;
	}
	.diet-list-content>ul>li.arctive:after {
		transform: rotate(134deg);
		-webkit-transform: rotate(134deg);
	}
</style>