<!-- 膳食添加分类组件 -->
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
					<div class="diet-list-content-title" @click="toggle(index,item.fcategoryId)">
						<dl>
							<dd class="cfName-icon">
								<img :src="`./src/assets/image/add_meal${ index }.png`" alt="">
							</dd>
							<dt class="cfName">
								<h2>{{ item.cfName }}</h2>
							</dt>
						</dl>
					</div>
					<ol v-if="current == index">
						<li v-for="name in foodName" @click="modality(name.foodName,name.foodCode)">
							{{ name.foodName }}
						</li>
					</ol>
				</li>
			</ul>
		</div>
		<div class="diet-modality" v-show="isModality">
			<div class="diet-modality-form">
				<div class="diet-modality-content">
					<label for="">
						<img :src="`./src/assets/image/add_meal${ imgIndex }.png`" alt="">
						<span :data-id="foodCode">{{ inerHTML }}</span>
						<div class="modality-content-input">
							<input type="text" placeholder="请输入值" v-model="valueTxt">
							<b>g</b>
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
				foodCode:"", // 膳食ID
				isModality:false,
				isPopup:false,
				message:"",
				valueTxt:10,
				current:-1,
				isNum:false,
				isAcrtive:-1,
				title:"添加膳食",
				imgIndex:"",
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
					this.items = response.body;
				})
			},
			//二级菜单
			twoClassify (fcategoryId) {
				this.foodName = '';
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let data = JSON.stringify({ 
					'fCode':fcategoryId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:this.classB,jsonValue:data },{emulateJSON:true})
				.then(response => {
					this.foodName = response.body;
				})
			},
			//展示隐藏
			toggle (index,fcategoryId) {
				this.imgIndex = index;
				if(this.current == index){
		            this.current = -1;
		            this.isAcrtive = -1;
		        }else{
		            this.current = index;
		            this.isAcrtive = index;
		        }
		        this.$store.state.fcategoryId.push(fcategoryId);
		        this.twoClassify(fcategoryId);
			},
			//添加膳食菜单
			modality (valName,valCode) {
				this.inerHTML = valName;
				this.foodCode = valCode;
				this.isModality = true;
				this.valueTxt = '';
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
			},
			// 保存用户添加膳食分类
			commit (name,id,val) {
				let valNum = parseFloat(val);
				if( val == '' ){
					this.isPopup = true;
					this.message = "请正确输入，不能为空";
					this.clearStorage();
				}else if( val<=0 ){
					this.isPopup = true;
					this.message = "请正确输入，值必须大于0";
					this.clearStorage();
				}else if ( Number.isInteger(valNum) == false ) {
					this.isPopup = true;
					this.message = "请正确输入，值必须为整数";
					this.clearStorage();
				}else {
					var obj = {
						foodName:name,
						foodCode:id,
						intakeNum:val
					}
					this.valueTxt = 0;
					this.$store.state.listArr.push(obj);		
					if( this.$store.state.listArr.length == 1 ){
						this.isNum = true;
						this.num = this.$store.state.listArr.length;
					}else {
						var hash = {};
						this.$store.state.listArr = this.$store.state.listArr.reduce(function(item, next) {
							hash[next.foodName] ? '' : hash[next.foodName] = true && item.push(next);
							return item
						}, []);
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
			var hash = {};
			this.$store.state.listArr = this.$store.state.listArr.reduce(function(item, next) {
				hash[next.foodName] ? '' : hash[next.foodName] = true && item.push(next);
				return item
			}, []);			
			if( this.$store.state.listArr.length == 0 ){
				this.isNum = false;
				this.num = "";
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
		left: 10px;
		top: 10px;
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
	.diet-modality-content {
		padding: 0.15rem;
		font-size: 0.35rem;
		border-bottom: 1px solid #f0f0f0;
	}
	.diet-modality-content img {
		width: .9rem;
		height: .9rem;
		float: left;
	}
	.diet-modality-content span {
		margin-left: 0.18rem;
		margin-top: .18rem;
		display: block;
		float: left;
		width: 3.65rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.modality-content-input {
		float: right;
		margin-top: 0.18rem;
	}
	.diet-modality-content input {
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
	}
	.cfName p {
		margin-top: .06rem;
		color: #999;
	}
</style>