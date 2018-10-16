<template>
	<div class="mail-address">
		<heads :title="titleName"></heads>
		<popup v-show="isPopup" :message="messInfo"></popup>
		<h2>邮寄地址</h2>
		<ul>
			<li @click="select_address">
				<p>小区/大厦/学校:</p>
				<img src="../../assets/image/server/mail_address_icon.png" alt="" />
				<!--<span @click="select_address">点击选择</span>-->
				<input type="text" placeholder="点击选择" v-model="address"/>
			</li>
			<li>
				<p>楼号-门牌号:</p>
				<input class="areaInput" v-model="numbers" type="text" placeholder="例16号楼201室"/>
			</li>
		</ul>
		<div class="save_address" @click="save_address">确定保存</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import popup from '../common/error-popup.vue'
	export default {
		name: '',
		data() {
			return {
				titleName: '邮寄地址',
				isPopup: false,
				address: "",
				numbers: "",
				messInfo: ""
			}
		},
		components: {
			Heads,
			popup
		},
		methods: {
			select_address(){
				this.$router.push({name:'serverMap',query:{lat:"",lon:""}})
			},
			save_address(){
				if(this.address == ""){
					this.isPopup = true;
					this.messInfo = "当前地址为空";
					this.clearStorage();
					return false;
				}
				if(this.numbers == ""){
					this.isPopup = true;
					this.messInfo = "请补全啊楼栋门牌号";
					this.clearStorage();
					return false;
				}
				let mailInfo = this.address + this.numbers;
				this.$store.state.mailInfo = mailInfo;
				this.$router.back(-2);
			},
			clearStorage () { //5s报错弹出框消失
				let time = setTimeout(()=>{
					if( this.isPopup ==  true){
                		this.isPopup = false;
                	} 
                },1000);  
			}
		},
		mounted(){
			let areaInfo = JSON.parse(window.localStorage.getItem('areaLoca'));
			console.log(areaInfo);
			if(!areaInfo){//areaInfo为空
				this.address = "";
				this.numbers = "";
			}else {
				this.address = areaInfo.addressName;
			}
		}
	}
</script>
<style scoped>
	.mail-address{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
		background-color: #eee;
	}
	.mail-address h2{
		height: 0.93rem;
		line-height: 0.93rem;
		color: #444;
		padding-left: 0.32rem;
		font-size: 0.24rem;
	}
	.mail-address ul{
		padding: 0 0.3rem;
		background: #fff;
	}
	.mail-address ul li{
		height: 0.88rem;
		line-height: 0.88rem;
	}
	.mail-address ul li:first-child{
		border-bottom: 0.01rem solid #eee;
	}
	.mail-address li p{
		display: inline-block;
		width: 1.96rem;
		color: #333;
		font-size: 0.24rem;
	}
	.mail-address li img{
		vertical-align: middle;
		height: 0.3rem;
	}
	.mail-address li span{
		font-size: 0.24rem;
		color: #999;
		padding-left: 0.1rem;
		display: inline-block;
		height: 100%;
		width: 3rem;
	}
	.mail-address li input{
		height: 100%;
		border: 0 none;
		outline: none;
		font-size: 0.24rem;
		padding-left: 0.1rem;
	}
	.save_address{
		width: 100%;
		height: 1rem;
		font-size: 0.32rem;
		color: #fff;
		text-align: center;
		line-height: 1rem;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #009983;
	}
</style>