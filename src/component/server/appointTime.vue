<template>
	<div id="appoint-time">
		<Heads :title="titleName"></Heads>
		<!--<Loading v-if="isLoading"></Loading>-->
		<div class="appoint-noInfo" v-if="dataHide == 1">
			<img src="../../assets/image/server/noInfo.png"/>
		</div>
		<div class="appoint-time-content" v-if="dataHide == 0">
			<div class="date-bar">
				<div class="date-left-btn" @click="toLeft"></div>
				<ul class="date-ul clearfix" ref="myBox">
					<li v-for="(list,index) in dateList" @click="tabDate(index,list.dataDay)" :class="{active : index == isActive}">
						<p class="date-month">{{ transDates(list.dataDay).substring(5,10) }}</p>
						<p class="date-week">{{ transToWeek(transDates(list.dataDay)) }}</p>
					</li>
				</ul>
				<div class="date-right-btn" @click="toRight"></div>
			</div>
			<ul class="date-content">
				<!--<li v-for="(list,index) in timeList" :class="[{'active' : index == lists[index] },{'choose' : index == activeIndex}]" @click="chooseTime(list,index)">{{ list }}</li>-->
				<li v-for="(list,index) in timeList" :class="{'active' : list.count > nowCount}" @click="chooseTime(list.time,list.count,list.isFull)">
					<p v-if="list.isFull">不可约</p>
					<p>{{ list.time }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Heads from '../common/head.vue'
	import Loading from '../common/loading.vue'
	import {formatDate} from '../../assets/js/dateFormat.js'
	
	export default {
		data (){
			return {
				titleName:"预约时间",
				dataHide: -1,
				nowCount: -1,
				activeIndex: -1,
				isLoading: true,
				dayInfo: "",
				dateList: [],
				timeList: [],
				timeScope: "",
				lists: [],
				isActive: 0
			}
		},
		components:{
			Heads,
			Loading
		},
		methods:{
			initData(){
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = this.$route.query.userId;
				let data = JSON.stringify({
//					wChatType: 1,
					serviceDictId : this.$route.query.id
				});
				if(this.$store.timeInfo){
					this.activeIndex = this.$store.timeInfo.index;
				}
			
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:111188, jsonValue:data},{emulateJSON:true}).then( response => {
					console.log(response)
					this.dateList = response.body.rows
					console.log(response.body.rows);
					if(this.dateList.length > 0){
						this.dataHide = 0;
						const d = new Date();
						let nowTime = formatDate(d,'yyyy-MM-dd')
						let nowHours = d.getHours();
						let nowMinutes = d.getMinutes();
						
						if(nowMinutes > 30){
							nowMinutes = 1
						}else {
							nowMinutes = 0
						}
						
						
						let appointDate = this.transDates(this.dateList[0].dataDay)
						//赋值当前日期
						this.timeScope = appointDate
						
						if(appointDate == nowTime){
							this.nowCount = nowHours*2 + nowMinutes
						}else {
							this.nowCount = -1
						}
						
						let timeDate = "";
						if(this.dateList[0].timeScopeCan.timeScopeOk != ""){
							timeDate += this.dateList[0].timeScopeCan.timeScopeOk;
						}
						if(this.dateList[0].timeScopeCan.timeScopeOut != "" && this.dateList[0].timeScopeCan.timeScopeOk == ""){
							timeDate += this.dateList[0].timeScopeCan.timeScopeOut;
						}
						if(this.dateList[0].timeScopeCan.timeScopeOut != "" && this.dateList[0].timeScopeCan.timeScopeOk != ""){
							timeDate += (","+this.dateList[0].timeScopeCan.timeScopeOut);
						}
						console.log(timeDate);
						//全部时间
						let time = timeDate.split(',');
						let timeCan = this.dateList[0].timeScopeCan.timeScopeOk.split(',');
						let len = timeCan.length;
						let list = [];
						for(var i = 0;i < time.length; i++){
							var num = 0;
							for(var j = 0;j < timeCan.length;j ++){
								if(time[i] == timeCan[j]){
									let timeJson = {};
									//时间段
									timeJson.time = time[i];
									//是否可约
									let hours = time[i].substring(0,2)
									let minutes = time[i].substring(3,5);
									if(minutes == "00"){
										minutes = 0
									}else {
										minutes = 1
									}
									let flag = hours*2 + minutes;
									timeJson.count = flag;
									//是否约满
									timeJson.isFull = false;
									list.push(timeJson);
									break;
								}else {
									num ++;
								}
							}
							if(num == len){
								let timeJson = {};
								//时间段
								timeJson.time = time[i];
								//是否可约
								let hours = time[i].substring(0,2)
								let minutes = time[i].substring(3,5);
								if(minutes == "00"){
									minutes = 0
								}else {
									minutes = 1
								}
								let flag = hours*2 + minutes;
								timeJson.count = flag
								//是否约满
								timeJson.isFull = true;
								list.push(timeJson);
								
							}
						}
						this.timeList = list.sort(this.compare('count'));
					}else {
						this.dataHide = 1;
					}
					
				})
			},
			transDates(value){
				let year = value.substring(0,4);
				let month = value.substring(4,6);
				let day = value.substring(6,8);
					return year + '-' + month + '-' + day;
				
			},
			transToWeek(val){
				var myDate = new Date(val);
				var week;
					if(myDate.getDay()==0) week="周日"
					if(myDate.getDay()==1) week="周一"
					if(myDate.getDay()==2) week="周二"
					if(myDate.getDay()==3) week="周三"
					if(myDate.getDay()==4) week="周四"
					if(myDate.getDay()==5) week="周五"
					if(myDate.getDay()==6) week="周六"
				return week;
			},
			tabDate(index,dataDay){//日期切换
				console.log(this.dateList);
				this.timeList = []
				const d = new Date()
				this.isActive = index
				//获取时间列表
				let timeDate = "";
				if(this.dateList[index].timeScopeCan.timeScopeOk != ""){
					timeDate += this.dateList[index].timeScopeCan.timeScopeOk;
				}
				if(this.dateList[index].timeScopeCan.timeScopeOut != ""){
					timeDate += (","+this.dateList[index].timeScopeCan.timeScopeOut);
				}
				//预约时间
				let appointDate = this.transDates(this.dateList[index].dataDay)
				//赋值当前日期
				this.timeScope = appointDate
				//当前时间
				let nowTime = formatDate(d,'yyyy-MM-dd')
				let nowHours = d.getHours()
				let nowMinutes = d.getMinutes()
				
				if(nowMinutes > 30){
					nowMinutes = 1
				}else {
					nowMinutes = 0
				}
				
				if(appointDate == nowTime){
					this.nowCount = nowHours*2 + nowMinutes
				}else {
					this.nowCount = -1
				}
				
				//全部时间
				let time = timeDate.split(',')
				let timeCan = this.dateList[index].timeScopeCan.timeScopeOk.split(',');
				let len = timeCan.length;
				let list = [];
				for(var i = 0;i < time.length;i ++){
					var num = 0;
					for(var j = 0;j < timeCan.length;j ++){
						if(time[i] == timeCan[j]){
							let timeJson = {};
							//时间段
							timeJson.time = time[i];
							//是否可约
							let hours = time[i].substring(0,2)
							let minutes = time[i].substring(3,5);
							if(minutes == "00"){
								minutes = 0
							}else {
								minutes = 1
							}
							let flag = hours*2 + minutes;
							timeJson.count = flag;
							//是否约满
							timeJson.isFull = false;
							list.push(timeJson);
							break;
						}else {
							num ++;
						}
					}
					if(num == len){
						let timeJson = {};
						//时间段
						timeJson.time = time[i];
						//是否可约
						let hours = time[i].substring(0,2)
						let minutes = time[i].substring(3,5);
						if(minutes == "00"){
							minutes = 0
						}else {
							minutes = 1
						}
						let flag = hours*2 + minutes;
						timeJson.count = flag
						//是否约满
						timeJson.isFull = true;
						list.push(timeJson);
					}
				}
				this.timeList = list.sort(this.compare('count'));
			},
			chooseTime(time,count,isFull){//选择服务时间段
				if(!isFull){
					if(count > this.nowCount){
						let timeInfo = {
							dates : this.timeScope,
							time : time
						}
						this.$store.timeInfo = timeInfo;
						this.$router.go(-1);
					}
				}
			},
			compare(property){
				return function(a,b){
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2
				}
			},
			toLeft(){
				document.querySelector('.date-ul').scrollLeft += 50
			},
			toRight(){
				document.querySelector('.date-ul').scrollLeft -= 50
			}
		},
		mounted (){
			this.initData();
		}
	}
</script>
<style>
	#appoint-time{
		width: 100%;
		height: 100%;
		padding-top: 0.84rem;
	}
	::-webkit-scrollbar{
		display: none;
	}
	#appoint-time .appoint-noInfo{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	#appoint-time .appoint-noInfo img{
		display: block;
		width: 100%;
		border: 0 none;
		margin-top: 3rem;
	}
	#appoint-time .date-bar{
		width: 100%;
		height: 1.05rem;
		background: #f5f5f5;
	}
	.date-bar .date-left-btn{
		width: 9.5%;
		height: 100%;
		float: left;
		background: url(../../assets/image/server/left-btn.png) no-repeat center center;
		background-size: 48%;
	}
	.date-bar .date-ul{
		height: 100%;
		width: 81%;
		float: left;
		overflow-x: auto;
		white-space: nowrap;
	}
	.date-bar .date-ul li{
		display: inline-block;
		height: 100%;
		width: 1rem;
	}
	.date-bar .date-ul li.active .date-week{
		color: #009984;
	}
	.date-bar .date-ul li.active .date-month{
		color: #009984;
	}
	 
	.date-bar .date-ul li .date-week{
		color: #4a4c4a;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.25rem;
		text-align: center;
		
	}
	.date-bar .date-ul li .date-month{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.22rem;
		color: #4a4c4a;
		text-align: center;
		margin-top: 0.12rem;
	}
	.date-bar .date-right-btn{
		width: 9.5%;
		height: 100%;
		float: right;
		background: url(../../assets/image/server/right-btn.png) no-repeat center center;
		background-size: 48%;
	}
	#appoint-time .date-content{
		padding: 0.2rem 0.35rem 0;
	}
	#appoint-time .date-content li{
		height: 0.68rem;
		width: 1.58rem;
		color: #4d504d;
		font-size: 0.21rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #f5f5f5;
		float: left;
		border-radius: 5px;
		margin-right: 0.16rem;
		margin-bottom: 0.16rem;
		border: 0.02rem solid #b6b6b6;
	}
	#appoint-time .date-content li.active{
		background: #fff;
	}
	#appoint-time .date-content li.choose{
		background: #009983;
	}
	#appoint-time .date-content li:nth-child(4n){
		margin-right: 0;
	}
</style>