<template>
	<div id="timeList">
		<Heads :title="titleName"></Heads>
		<ul>
			<li v-for="item in appointList">
				<span class="timeDate">{{ transWeek(item.dayOfWeek) }}({{ getMonth(item.registerDate) }}月{{ getDate(item.registerDate) }}日)</span>
				<span class="timeDate_btn timeDate_mor" :class="{isFull: item.morningFull == 1 }" @click="appointTime(0,item)" v-if="item.morningFull != -1">{{ item.morningFull == 0 ? '预约上午': '上午约满'}}</span>
				<span class="timeDate_btn timeDate_after" :class="{isFull: item.morningFull == 1 }" @click="appointTime(1,item)" v-if="item.afternoonFull != -1">{{ item.afternoonFull == 0 ? '预约下午': '下午约满'}}</span>
			</li>
			
		</ul>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	export default {
		data() {
			return {
				titleName: '预约时间',
				appointList: ''
			}
		},
		components: {
			Heads
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				let vm = this;
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token;
				if(!userInfo){
					token = "";
				}else {
					token = userInfo.token;
				}
				let userId = this.$route.query.userId;
				let serviceDictId = this.$route.query.id;
				console.log(userId);
				console.log(serviceDictId);
				let data = JSON.stringify({
					doctorId: userId,
					serviceDictId: serviceDictId
				})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:660136, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response);
					if(response.body.rows.length){
						vm.appointList = response.body.rows;
					}
				})
			},
			dateFilter(dates){
				let y = dates.substring(0,4);
				let m = dates.substring(4,6);
				let d = dates.substring(6,8);
				return y+"-"+m+"-"+d
			},
			appointTime(state,item){
				if(state == 0){//预约上午
					if(item.morningFull == 0) {
						let timeInfo = {
							dates: this.dateFilter(item.registerDate),
							time: '上午'
						}
						this.$store.timeInfo = timeInfo;
						this.$router.go(-1);
					}
				}else {//预约下午
					if(item.afternoonFull == 0) {
						let timeInfo = {
							dates: this.dateFilter(item.registerDate),
							time: '下午'
						}
						this.$store.timeInfo = timeInfo;
						this.$router.go(-1);
					}
				}
			},
			transWeek(d){
				if(d == 0) return '周天'
				if(d == 1) return '周一'
				if(d == 2) return '周二'
				if(d == 3) return '周三'
				if(d == 4) return '周四'
				if(d == 5) return '周五'
				if(d == 6) return '周六'
			},
			getMonth(m){
				const month = m.substring(4,6);
				return month;
			},
			getDate(d){
				const date = d.substring(6,8);
				return date
			}
		}
	}
</script>
<style>
	#timeList{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	#timeList ul{
		padding: 0 0.3rem;
	}
	#timeList ul li{
		width: 100%;
		height: 1.1rem;
		position: relative;
		border-bottom: 0.01rem solid #ebebeb;
	} 
	#timeList ul li span{
		line-height: 1.1rem;
	}
	#timeList ul li .timeDate{
		font-size: 0.24rem;
		color: #333;
		letter-spacing: 1px;
	}
	#timeList ul li .timeDate_btn {
		display: inline-block;
		width: 1.4rem;
		height: 0.66rem;
		top: 50%;
		margin-top: -0.34rem;
		border: 0.02rem solid #009983;
		border-radius: 6px;
		position: absolute;
		line-height: 0.66rem;
		text-align: center;
		font-size: 0.24rem;
		color: #009983;
	}
	#timeList ul li .timeDate_mor{
		right: 2.25rem;
	}
	#timeList ul li .timeDate_mor.isFull{
		
	}
	#timeList ul li .timeDate_after{
		right: 0.3rem;
	}
	#timeList ul li .timeDate_after.isFull{
		
	}
</style>