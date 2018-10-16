<template>
	<section id="apply-router">
		<backBtn :title='applyTitle' :eid='eid'></backBtn>
		<div class="apply-mian">
			<!-- 健康监测 -->
			<div class="gzh-applist-jc clear">
				<ul>
					<li>
						<router-link :to="{ name: 'applyMotion', query: {
							id: healthMonitoring[0].uid, 
							typeData:healthMonitoring[0].typeData, 
							title:healthMonitoring[0].title,
							dicCode:healthMonitoring[0].dicCode,
							dataType:healthMonitoring[0].dataType 
							}}">
							<i :class="healthMonitoring[0].class"></i>
							<div class="gzh-applist-right">
								<h2 :class="{ active: jcData.sportInfo.measureTime=='' }">{{ healthMonitoring[0].itemName }}</h2>
								<p>{{ jcData.sportInfo.measureTime | substring(0,10) }}<b v-if="jcData.sportInfo.measureTime!=''"></b>{{ jcData.sportInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span v-if="jcData.sportInfo.totalKcal == ''">0</span><span v-else>{{ jcData.sportInfo.totalKcal }}</span><b>Kcal</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[1].routerName, query: {
							id: healthMonitoring[1].uid, 
							typeData:healthMonitoring[1].typeData, 
							title:healthMonitoring[1].title,
							dicCode:healthMonitoring[1].dicCode,
							dataType:healthMonitoring[1].dataType 
							}}">
							<i :class="healthMonitoring[1].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.dietInfo.measureTime=='' }">{{ healthMonitoring[1].itemName }}</h2>
								<p>{{ jcData.dietInfo.measureTime | substring(0,10) }}<b v-if="jcData.dietInfo.measureTime!=''"></b>{{ jcData.dietInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.dietInfo.value }}</span><b v-if="jcData.dietInfo.value !=''">{{ jcData.dietInfo.dicUnit }}</b>
							</div> 
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[2].routerName, query: {
							id: healthMonitoring[2].uid, 
							typeData:healthMonitoring[2].typeData, 
							title:healthMonitoring[2].title,
							dicCode:healthMonitoring[2].dicCode,
							dataType:healthMonitoring[2].dataType 
							}}">
							<i :class="healthMonitoring[2].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bmiInfo.measureTime=='' }">{{ healthMonitoring[2].itemName }}</h2>
								<p>{{ jcData.bmiInfo.measureTime | substring(0,10) }}<b v-if="jcData.bmiInfo.measureTime!=''"></b>{{ jcData.bmiInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bmiInfo.value }}</span><b v-if="jcData.bmiInfo.value !=''">{{ jcData.bmiInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[4].routerName, query: {
							id: healthMonitoring[4].uid, 
							typeData:healthMonitoring[4].typeData, 
							title:healthMonitoring[4].title,
							dicCode:healthMonitoring[4].dicCode,
							dataType:healthMonitoring[4].dataType 
							}}">
							<i :class="healthMonitoring[4].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.waistInfo.measureTime=='' }">{{ healthMonitoring[4].itemName }}</h2>
								<p>{{ jcData.waistInfo.measureTime | substring(0,10) }}<b v-if="jcData.waistInfo.measureTime!=''"></b>{{ jcData.waistInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.waistInfo.value }}</span><b v-if="jcData.waistInfo.value !=''">{{ jcData.waistInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[5].routerName, query: {
							id: healthMonitoring[5].uid, 
							typeData:healthMonitoring[5].typeData, 
							title:healthMonitoring[5].title,
							dicCode:healthMonitoring[5].dicCode,
							dataType:healthMonitoring[5].dataType 
							}}">
							<i :class="healthMonitoring[5].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.pulseInfo.measureTime=='' }">{{ healthMonitoring[5].itemName }}</h2>
								<p>{{ jcData.pulseInfo.measureTime | substring(0,10) }}<b v-if="jcData.pulseInfo.measureTime!=''"></b>{{ jcData.pulseInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.pulseInfo.value }}</span><b v-if="jcData.pulseInfo.value !=''">{{ jcData.pulseInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[6].routerName, query: {
							id: healthMonitoring[6].uid, 
							typeData:healthMonitoring[6].typeData, 
							title:healthMonitoring[6].title,
							dicCode:healthMonitoring[6].dicCode,
							dataType:healthMonitoring[6].dataType 
							}}">
							<i :class="healthMonitoring[6].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodPressureInfo[0].measureTime=='' }">{{ healthMonitoring[6].itemName }}</h2>
								<p>{{ jcData.bloodPressureInfo[0].measureTime | substring(0,10) }}<b v-if="jcData.bloodPressureInfo[0].measureTime!=''"></b>{{ jcData.bloodPressureInfo[0].measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span v-if="jcData.bloodPressureInfo[0].value !=''">{{ jcData.bloodPressureInfo[0].value }}/{{ jcData.bloodPressureInfo[1].value }}</span><b v-if="jcData.bloodPressureInfo[0].value !=''">{{ jcData.bloodPressureInfo[0].dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[7].routerName, query: {
							id: healthMonitoring[7].uid, 
							typeData:healthMonitoring[7].typeData, 
							title:healthMonitoring[7].title,
							dicCode:healthMonitoring[7].dicCode,
							dataType:healthMonitoring[7].dataType 
							}}">
							<i :class="healthMonitoring[7].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodPressureInfo[0].measureTime=='' }">{{ healthMonitoring[7].itemName }}</h2>
								<p>{{ jcData.bloodGlu.measureTime | substring(0,10) }}<b v-if="jcData.bloodGlu.measureTime!=''"></b>{{ jcData.bloodGlu.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bloodGlu.value }}</span><b v-if="jcData.bloodGlu.value !=''">{{ jcData.bloodGlu.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[8].routerName, query: {
							id: healthMonitoring[8].uid, 
							typeData:healthMonitoring[8].typeData, 
							title:healthMonitoring[8].title,
							dicCode:healthMonitoring[8].dicCode,
							dataType:healthMonitoring[8].dataType 
							}}">
							<i :class="healthMonitoring[8].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.temperatureInfo.measureTime=='' }">{{ healthMonitoring[8].itemName }}</h2>
								<p>{{ jcData.temperatureInfo.measureTime | substring(0,10) }}<b v-if="jcData.temperatureInfo.measureTime!=''"></b>{{ jcData.temperatureInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.temperatureInfo.value }}</span><b v-if="jcData.temperatureInfo.value !=''">{{ jcData.temperatureInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[9].routerName, query: {
							id: healthMonitoring[9].uid, 
							typeData:healthMonitoring[9].typeData, 
							title:healthMonitoring[9].title,
							dicCode:healthMonitoring[9].dicCode,
							dataType:healthMonitoring[9].dataType 
							}}">
							<i :class="healthMonitoring[9].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodFat[1].measureTime=='' }">{{ healthMonitoring[9].itemName }}</h2>
								<p>{{ jcData.bloodFat[1].measureTime | substring(0,10) }}<b v-if="jcData.bloodFat[1].measureTime!=''"></b>{{ jcData.bloodFat[1].measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bloodFat[1].value }}</span><b v-if="jcData.bloodFat[1].value !=''">{{ jcData.bloodFat[1].dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[10].routerName, query: {
							id: healthMonitoring[10].uid, 
							typeData:healthMonitoring[10].typeData, 
							title:healthMonitoring[10].title,
							dicCode:healthMonitoring[10].dicCode,
							dataType:healthMonitoring[10].dataType 
							}}">
							<i :class="healthMonitoring[10].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodFat[0].measureTime=='' }">{{ healthMonitoring[10].itemName }}</h2>
								<p>{{ jcData.bloodFat[0].measureTime | substring(0,10) }}<b v-if="jcData.bloodFat[0].measureTime!=''"></b>{{ jcData.bloodFat[0].measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bloodFat[0].value }}</span><b v-if="jcData.bloodFat[0].value !=''">{{ jcData.bloodFat[0].dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[11].routerName, query: {
							id: healthMonitoring[11].uid, 
							typeData:healthMonitoring[11].typeData, 
							title:healthMonitoring[11].title,
							dicCode:healthMonitoring[11].dicCode,
							dataType:healthMonitoring[11].dataType 
							}}">
							<i :class="healthMonitoring[11].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodFat[3].measureTime=='' }">{{ healthMonitoring[11].itemName }}</h2>
								<p>{{ jcData.bloodFat[3].measureTime | substring(0,10) }}<b v-if="jcData.bloodFat[3].measureTime!=''"></b>{{ jcData.bloodFat[3].measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bloodFat[3].value }}</span><b v-if="jcData.bloodFat[3].value !=''">{{ jcData.bloodFat[3].dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[12].routerName, query: {
							id: healthMonitoring[12].uid, 
							typeData:healthMonitoring[12].typeData, 
							title:healthMonitoring[12].title,
							dicCode:healthMonitoring[12].dicCode,
							dataType:healthMonitoring[12].dataType 
							}}">
							<i :class="healthMonitoring[12].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.bloodFat[2].measureTime=='' }">{{ healthMonitoring[12].itemName }}</h2>
								<p>{{ jcData.bloodFat[2].measureTime | substring(0,10) }}<b v-if="jcData.bloodFat[2].measureTime!=''"></b>{{ jcData.bloodFat[2].measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.bloodFat[2].value }}</span><b v-if="jcData.bloodFat[2].value !=''">{{ jcData.bloodFat[2].dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[13].routerName, query: {
							id: healthMonitoring[13].uid, 
							typeData:healthMonitoring[13].typeData, 
							title:healthMonitoring[13].title,
							dicCode:healthMonitoring[13].dicCode,
							dataType:healthMonitoring[13].dataType 
							}}">
							<i :class="healthMonitoring[13].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.heartRate.measureTime=='' }">{{ healthMonitoring[13].itemName }}</h2>
								<p>{{ jcData.heartRate.measureTime | substring(0,10) }}<b v-if="jcData.heartRate.measureTime!=''"></b>{{ jcData.heartRate.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.heartRate.value }}</span><b v-if="jcData.heartRate.value !=''">{{ jcData.heartRate.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[14].routerName, query: {
							id: healthMonitoring[14].uid, 
							typeData:healthMonitoring[14].typeData, 
							title:healthMonitoring[14].title,
							dicCode:healthMonitoring[14].dicCode,
							dataType:healthMonitoring[14].dataType 
							}}">
							<i :class="healthMonitoring[14].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.spo2Info.measureTime=='' }">{{ healthMonitoring[14].itemName }}</h2>
								<p>{{ jcData.spo2Info.measureTime | substring(0,10) }}<b v-if="jcData.spo2Info.measureTime!=''"></b>{{ jcData.spo2Info.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.spo2Info.value }}</span><b v-if="jcData.spo2Info.value !=''">{{ jcData.spo2Info.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: healthMonitoring[15].routerName, query: {
							id: healthMonitoring[15].uid, 
							typeData:healthMonitoring[15].typeData, 
							title:healthMonitoring[15].title,
							dicCode:healthMonitoring[15].dicCode,
							dataType:healthMonitoring[15].dataType 
							}}">
							<i :class="healthMonitoring[15].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.zfhlInfo.measureTime=='' }">{{ healthMonitoring[15].itemName }}</h2>
								<p>{{ jcData.zfhlInfo.measureTime | substring(0,10) }}<b v-if="jcData.zfhlInfo.measureTime!=''"></b>{{ jcData.zfhlInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.zfhlInfo.value }}</span><b v-if="jcData.zfhlInfo.value !=''">{{ jcData.zfhlInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li>
					<!-- <li>
						<router-link :to="{ name: healthMonitoring[15].routerName, query: {
							id: healthMonitoring[15].uid, 
							typeData:healthMonitoring[15].typeData, 
							title:healthMonitoring[15].title,
							dicCode:healthMonitoring[15].dicCode,
							dataType:healthMonitoring[15].dataType 
							}}">
							<i :class="healthMonitoring[15].class"></i>
							<div class="gzh-applist-right" >
								<h2 :class="{ active: jcData.smokeInfo.measureTime=='' }">{{ healthMonitoring[15].itemName }}</h2>
								<p>{{ jcData.smokeInfo.measureTime | substring(0,10) }}<b v-if="jcData.smokeInfo.measureTime!=''"></b>{{ jcData.smokeInfo.measureTime | substring(11,20) }}</p>
							</div>
							<div class="gzh-applist-right-val">
								<span>{{ jcData.smokeInfo.value }}</span><b v-if="jcData.smokeInfo.value !=''">{{ jcData.smokeInfo.dicUnit }}</b>
							</div>
						</router-link>
					</li> -->
				</ul>	
			</div>
		</div>
	</section>
</template>
<script>
	import backBtn from '../apply/apply-head.vue'
	import MinErrorPopup from '../common/error-min-popup.vue'
	export default{
		data () {
			return {
				eid:"", //判断返回按钮
				applyTitle:"健康数据监测",
				isClass:'',
				judges:'',
				isHide:false,
				message:"",
				showUp:false,
				name:"",
				id:"",
				unReadNum:"", // 健康技术判断消息信息
				healthMonitoring: [
					{ 
						itemName:'运动',
						routerName:"chartContent",
						class:'appicon30',
						title:'motion',
						uid:111612,
						dataType:'4',
						dicCode:"10770"
					},
					{ 
						itemName:'膳食',
						routerName:"chartContent",
						class:'appicon27',
						title:"diet",
						uid:111612,
						dataType:'3',
						dicCode:"10769" 
					},
					{ 
						itemName:'体重指数',
						class:'appicon16',
						routerName:"chartContent",
						title:'weightIndex',
						uid:111612,
						dataType:'1',
						dicCode:"10004, 10001, 10003"
					},
					{ 
						itemName:"体重", 
						routerName:"chartContent", 
						class:"appicon15", 
						uid:111612, 
						title:'weight',
						dataType:'1',
						dicCode:"10003" 
					},
					
					{ 
						itemName:'腰围',
						class:'appicon17',
						routerName:"chartContent",
						title:'theWaist',
						uid:111612,
						dataType:'1',
						dicCode:"10010" 
					},
					{ 
						itemName:'脉搏',
						class:'appicon18',
						routerName:"chartContent",
						title:'pulse',
						uid:111612,
						dataType:'2',
						dicCode:"10013" 
					},
					{ 
						itemName:'血压',
						routerName:"chartContent",
						class:'appicon21',
						title:'bloodPressure',
						uid:111612,
						dataType:'1',
						dicCode:"10018,10023"
					},
					{ 
						itemName:'血糖',
						routerName:"chartContent",
						class:'appicon22',
						title:'bloodsugar',
						uid:111612,
						dataType:'1',
						dicCode:"10144,10145,10142"
					},
					{ 
						itemName:'体温',
						routerName:"chartContent",
						class:'appicon20',
						title:'temperature',
						uid:111612,
						dataType:'1',
						dicCode:"10002"
					},
					{ 
						itemName:'总胆固醇',
						routerName:"chartContent",
						class:'appicon26',
						title:"totalCholesterol",
						uid:111612,
						dataType:'1',
						dicCode:"10151" 
					},
					{ 
						itemName:'甘油三酯',
						routerName:"chartContent",
						class:'appicon23',
						title:'triglyceride',
						uid:111612,
						dataType:'1',
						dicCode:"10147"
					},
					{ 
						itemName:'高密度脂蛋白胆固醇',
						routerName:"chartContent",
						class:'appicon25',
						title:"HDLC",
						uid:111612,
						dataType:'1',
						dicCode:"10149"
					},
					{ 
						itemName:'低密度脂蛋白胆固醇',
						routerName:"chartContent",
						class:'appicon24',
						title:"LDLC",
						uid:111612,
						dataType:'1',
						dicCode:"10148"
					},
					{ 
						itemName:'心电图',
						routerName:"chartContent",
						class:'appicon19',
						title:'electrocardiogram',
						uid:111612,
						dataType:'5',
						dicCode:"10244"
					},
					{ 
						itemName:'血氧饱和度',
						routerName:"chartContent",
						class:'spo2Info',
						title:'spo2Info',
						uid:111612,
						dataType:'1',
						dicCode:"11141"
					},
					{ 
						itemName:'脂肪含量',
						routerName:"chartContent",
						class:'zfhlInfo',
						title:'zfhlInfo',
						uid:111612,
						dataType:'1',
						dicCode:"11143"
					},				
					{ 
						itemName:'饮酒',
						routerName:"chartContent",
						class:'appicon28',
						title:"drinkWine",
						uid:111612,
						dataType:'1',
						dicCode:"10767,10768"
					},
					{ 
						itemName:'吸烟',
						routerName:"chartContent",
						class:'appicon29',
						title:'smoke',
						uid:111612,
						dataType:'1',
						dicCode:"10766"

					}
				],
				jcData:"",
			}
		},
		components: {
			backBtn,
			MinErrorPopup
		},
		mounted () {
			this.getData();
			if(this.$route.query.eaId){
				this.eid = false;
				sessionStorage.setItem('eid',this.$route.query.eaId);
			}
		},
		methods:{
			clearStorage () { //清楚定时器
				let time = setTimeout(()=>{
					if( this.showUp ==  true){
                		this.showUp = false;
                	} 
                },2000);  
			},
			getData () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
				let token = userInfo.token;
				let userId = userInfo.userId;
				let data = JSON.stringify({
						userId : userId
				});
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:771034, jsonValue:data},{emulateJSON:true}).then( response => {
						console.log(response)
						this.jcData = response.body;
				})
			},
			show () {
				this.isHide = true;
			},
			hide () {
				this.isHide = false;
			},
			isHealthyApp(){//微网站直接进入健康应用页的后退跳转问题
					let ojj = {'flag':4}
					ojj = JSON.stringify(ojj);
					localStorage.setItem("temp", ojj);
			}
		}
	}
</script>
<style>
	.apply-mian {
		padding-top: .84rem;
	}
	.gzh-applist-jc {
	    width: 100%;
	    margin: 0 auto;
	    padding: 0 .2rem;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.gzh-applist-right {
		float: left;
		margin-left: 0.2rem;

	}
	.gzh-applist-right h2 {
	   	color: #333;
	   	font-size: 14px;
	   	margin-top: .05rem;
	}
	.gzh-applist-right p {
	   	color: #999;
	   	font-size: 12px;
	}
	.gzh-applist-jc li {
		position: relative;
	    display: block;
	    padding-bottom: .2rem;
	    padding-top: .3rem;
	    border-bottom: 1px solid #e6e6e6;
	}
	.gzh-applist-right-val {
		float: right;
		line-height: .88rem;
	}
	.gzh-applist-right-val span {
		color: #009983;
		font-weight: bold;
		font-family: "dincond-regular";
	}
	.gzh-applist-jc a {
		display: inline-block;
		height: .84rem;
		width: 100%;
		font-size: 0.26rem;
		color: #333;
		background: url(../../assets/image/server/ARROW.png) no-repeat center right;
		background-size: .3rem;
		padding-right: .3rem;
	}
	.gzh-applist-jc a i {
		width: .84rem;
		height: .84rem;
		display: block;
		float: left;
	}
	.gzh-applist-jc a b {
	    font-size: 10px;
	    margin-left: 0.05rem;
	}
	.gzh-applist-jc .appicon1 {
		background: url(../../assets/image/index_img/b.png) no-repeat;
		background-size: contain;
	}
	.gzh-applist-jc .appicon2 {
	    background: url(../../assets/image/index_img/zhongyao.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon3 {
	    background: url(../../assets/image/index_img/xingge.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon4 {
	    background: url(../../assets/image/index_img/d.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon5 {
	    background: url(../../assets/image/index_img/a.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon6 {
	    background-position: -.62rem 0;
	}
	.gzh-applist-jc .appicon9 {
	    background: url(../../assets/image/index_img/a.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc.appicon10 {
	    background: url(../../assets/image/index_img/g.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon11 {
	    background: url(../../assets/image/index_img/bingli.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon12 {
		background: url(../../assets/image/index_img/f.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon13 {
	    background: url(../../assets/image/index_img/c.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon14 {
	   background: url(../../assets/image/index_img/chufang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .physical {
	   background: url(../../assets/image/index_img/tijian.png) no-repeat;
		background-size: contain;
		background-position: center;
	} 
	.gzh-applist-jc .appicon15 {
		background: url(../../assets/image/index_img/tizhong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon16 {
	    background: url(../../assets/image/index_img/tishu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon17 {
	    background: url(../../assets/image/index_img/yaowei.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon18 {
	    background: url(../../assets/image/index_img/maibo.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon19 {
	    background: url(../../assets/image/index_img/xindiantu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon20 {
	    background: url(../../assets/image/index_img/tiwen.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon21 {
	    background: url(../../assets/image/index_img/xueya.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon22 {
	    background: url(../../assets/image/index_img/xuetang.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon23 {
	    background: url(../../assets/image/index_img/gysz.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon24 {
	    background: url(../../assets/image/index_img/LDL.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon25 {
	    background: url(../../assets/image/index_img/hDL.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon26 {
	    background: url(../../assets/image/index_img/zdgc.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon27 {
	    background: url(../../assets/image/index_img/shanshi.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon28 {
	    background: url(../../assets/image/index_img/yinjiu.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon29 {
	    background: url(../../assets/image/index_img/xiyan.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon30 {
	    background: url(../../assets/image/index_img/yundong.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .spo2Info {
	    background: url(../../assets/image/index_img/spo2Info.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .zfhlInfo {
	    background: url(../../assets/image/index_img/zfhlInfo.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.gzh-applist-jc .appicon31 {
	    background-position: 0 -3rem;
	}
	/* 认证身份证弹出框 */
	.binding-model {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.22);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.binding-model-content {
		position: relative;
	}
	.binding-model-content i img {
		position: absolute;
		width: 0.5rem;
		top: -0.8rem;
		right: 0.1rem; 
	}
	.binding-model-content {
		width: 7rem;
		height: 6.15rem;
		background: #fff;
		border-radius: .1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -3rem 0 0 -3.5rem;
	}
	.binding-model-content-title {
		text-align: center;
		font-size: .38rem;
		padding: .3rem 0;
	}
	.binding-model-content-prompt {
		padding-bottom: .3rem;
		border-bottom: .08rem solid #e6e6e6;
		margin: 0px 0.3rem;
	}
	.binding-model-content-prompt p {
		color: red;
		font-size: .28rem;
		text-align: center;
	}
	.binding-model-content-form {
		padding: 0 .3rem;
	}
	.binding-model-content-form ul li {
		border-bottom: 0.01rem solid #e6e6e6;
	}
	.binding-model-content-form ul li input {
		width: 100%;
		height: 1rem;
		font-size: .28rem;
	}
	.binding-model-content-form a {
		width: 100%;
		height: 1rem;
		background: #009983;
		display: block;
		text-align: center;
		line-height: 1rem;
		font-size: .36rem;
		color: #fff;
		border-radius: .1rem;
		margin-top: .3rem;
	}
	.active {
		line-height: .84rem;
	}
</style>