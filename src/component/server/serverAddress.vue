<template>
	<div class="address">
		<Heads :title="title">
			<div class="keep" @click="keep">保存</div>
		</Heads>
		<div class="address-content">
			<div class="new-address-content">
				<h2>新地址</h2>
				<div class="address-content-form">
					<div class="this-address">
						<span>
							当前位置
						</span>
						<div class="this-address-input">
							<router-link :to="{ name: 'serverMap' }">
								<input type="text" placeholder="搜索选择小区街道或大厦" disabled="disabled" v-model="address">
							</router-link>
						</div>
						<i class="z_di">
							<img src="../../assets/image/server/z_di_05.png" alt="">
						</i>
					</div>
					<div class="this-doorplate">
						<input type="text" placeholder="请输入楼栋门牌号等，例：6号楼666" v-model="doorplate">
					</div>
				</div>
			</div>
			<div class="list-address-content">
				<h2>地址列表</h2>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {

		data () {
			return {
				title:"选择地址",
				doorplate:"",
				address:this.$store.state.addressInfo.addressName
			}
		},
		components: {
			Heads
		},
		mounted () {
			console.log(this.$store.state)
		},
		methods:{
			keep () {
				let address = this.address + this.doorplate;
				this.$store.state.address = address;
				console.log(this.$store.state.address);
				this.$router.back(-2);
			}
		}
	}
</script>
<style>
	.keep {
		display: block;
		text-align: center;
		width: .84rem;
		height: .84rem;
		position: absolute;
		right: 0;
		top: 0;
		line-height:.84rem;
		color: #fff;
		font-size: .32rem;
	}
	.address-content {
		width: 100%;
		margin-top: .84rem;
		font-size: .28rem;
	}
	.address-content h2 {
		padding: 0.25rem;
		background: #e5e5e5;
	}
	.address-content-form>div {
		padding: .25rem;
	}
	.this-address {
		border-bottom: 1px solid #e2e2e2;
	}
	.this-address span {
		float: left;
	}
	.this-address-input {
		float: left;
		margin-left: 0.15rem;
	}
	.this-address .z_di {
		float: right;
	}
	.this-address span {
		background: url(../../assets/image/server/icon_dist@3x.png) no-repeat center left;
		background-size: 24%;
		padding-left: 0.4rem;
	}
	.this-doorplate input {
		width: 100%;
	}
</style>