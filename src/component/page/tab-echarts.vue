<!-- 
	tab-echarts.vue 图形组件
 -->
<template>
	<div class="echarts-chart">
		<Loading v-if="isLoading" :class="{loadTop:isClass}"></Loading>
		<div class="echarts-chart-null" v-if="isNull">
			<i></i>
			<p>暂无数据</p>
		</div>
		<div :class="{'echarts-chart-main':isBorder}">
			<div id="main" :style="{width:'100%',height:'300px'}"></div>
		</div>	
	</div>
</template>
<script>
	import Loading from '../common/loading.vue'

	export default {
		name:"chart",
		data () {
			return {
				// 默认数据
				title:this.$route.query.title,
				lists:"",
				isLoading:true,
				isClass:true,
				isNull:false,
				color:"",
				isBorder:false
			}
		},
		components:{
			Loading
		},
		mounted() {
			this.$store.state.listArr = []; //清空state 数据
			let myChart = echarts.init(document.getElementById('main'));
			let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
			let token = userInfo.token;
			let assessmentId = this.$route.query.id;
			let assessmentDicCode = this.$route.query.dicCode;
			let assessmentTitle = this.$route.query.title;
			let assessmentDataType = this.$route.query.dataType;
			let data;
			if(this.title == 'weightIndex'){
				data = JSON.stringify({ 
					'page':'1',
					'rows':'10',
					'dataType':assessmentDataType,
					'dicCode':10004 
				});
			}else {
				data = JSON.stringify({ 
					'page':'1',
					'rows':'10',
					'dataType':assessmentDataType,
					'dicCode':assessmentDicCode 
				});
			}
			let xAxisData = [];// 储存X轴数据
			let seriesData = [];// 储存series数据
			let seriesData1 = [];
			let weightData = [];
			let arrSeries;
			this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
				token:token, 
				infoType:assessmentId, 
				jsonValue:data 
			},{emulateJSON:true})
			.then(response => {
				setTimeout(() => {
	               this.isLoading = false;
	            }, 1500);
	            this.data = response.body.rows;
	            if( this.data == "" || this.data == undefined ){
	            	this.isNull = true;
	            }else {
	            	this.isBorder = true;
	            	for(var i = 0; i<this.data.length; i++){
		        		let x = this.data[i].measureTime.substring(5,10);
		        		xAxisData.push(x);
		        	}
		        	for(var i = 0; i<this.data.length; i++){
		        		if( assessmentTitle == "motion" ){
		        			let series = this.data[i].sportKcal;	
			        		if( isNaN(series) == true ){
			        			arrSeries = series.replace(/[\/\;]/g,',').split(',');
				        		seriesData.push(arrSeries[0]);
				        		seriesData1.push(arrSeries[1]);
			        		}else {
			        			arrSeries = series.toString();
				        		seriesData.push(arrSeries);
			        		}
		        		}else {
		        			let series = this.data[i].valueNumber;
		        			if( isNaN(series) == true ){
			        			arrSeries = series.replace(/[\/\;]/g,',').split(',');
				        		seriesData.push(arrSeries[0]);
				        		seriesData1.push(arrSeries[1]);
			        		}else {
			        			arrSeries = series.toString();
				        		seriesData.push(arrSeries);
			        		}
		        		}	
		        	}
		        	let seriesDataSlice = seriesData.slice(0,7);
		        	let seriesDataSlice1 = seriesData1.slice(0,7);
		        	let xAxisDataSlice = xAxisData.slice(0,7);
		        	if( assessmentTitle == 'bloodPressure' ){
		        		myChart.setOption({      //加载数据图表
		        			title: {
							    text: this.data[0].dicUnit,
							    textStyle:{
							        color:'#ccc',
							        fontStyle:'normal',
							        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
							        fontWeight:'100',
							        //字体系列
							        fontFamily:'sans-serif',
							        //字体大小
							　　　　fontSize:12
							    }
							},
							tooltip : {
						        trigger: 'axis'
						    },
						    grid: {
								x:10,
								x2:15,
								y:25,
								y2:15,
						        containLabel: true
						    },
	                        xAxis : [
						        {
						            type : 'category',
						            boundaryGap : false,
						            splitLine:{  
			                            show:true  
			                        },
						            data: xAxisDataSlice.reverse()
						        }
						    ],
	                        yAxis:[
						        {
						            type : 'value'
						        }
							],
	                        series: [
	                        	{
			                        name:'收缩压',
						            type:'line',
						            areaStyle: {normal: {}},
						            itemStyle:{
						            	normal:{
						            		color: "#e1966e",
											borderColor: "#e1966e",
						            		label:{
						            			show: true,
						            			textStyle:{
							            			color:'#e1966e'
							            		}
						            		},
						            		lineStyle:{
						            			color:'#e1966e'
						            		},
						            		areaStyle:{
						            			color:'#f4f8f4'
						            		}
						            	}
						            },
						            data:seriesDataSlice.reverse()
					        	},
					        	{
			                        name:'舒张压',
						            type:'line',
						            areaStyle: {normal: {}},
						            itemStyle:{
						            	normal:{
											color:"#78d2be",
											borderColor: "#78d2be",
						            		label:{
						            			show: true,
						            			textStyle:{
							            			color:'#78d2be'
							            		}
						            		},
						            		lineStyle:{
						            			color:'#78d2be'
						            		},
						            		areaStyle:{
						            			color:'#f4f8f4'
						            		}
						            	}
						            },
						            data:seriesDataSlice1.reverse()
					        	}

	                        ]
	                	})
		        	}else if( assessmentTitle == 'bloodsugar' ){
                    	let arr = [];
                    	for (var i = 0; i < this.data.length; i++) {
			            	let obj = {};
							obj.name=this.data[i].dicName
							obj.value=this.data[i].valueNumber
							arr.push(obj);
						}
						let arr2 = arr.slice(0,7);
                    	myChart.setOption({
		        			tooltip : {
						        trigger: 'axis',
						        formatter: function (params) {
						            params = params[0];
						            //params.data.name
						            return params.name+'<br>'+params.marker+params.data.name+':'+params.data.value;
						        },
						    },
						    grid: {
								x:10,
								x2:15,
								y:25,
								y2:15,
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            boundaryGap : false,
						            splitLine:{  
			                            show:true  
			                        },
						            data: xAxisDataSlice.reverse()
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value'
						        }
						    ],
	                        series: [
	                        	{
			                        name:this.data[0].dicName,
						            type:'line',
						            areaStyle: {normal: {}},
						            itemStyle:{
						            	normal:{
											//color: "#78d2be",
											color:function(params){
												if( params.data.name == '空腹血糖' ){
													return "#78d2be"
												}else if(params.data.name == '餐后血糖'){
													return "#e7adad"
												}else if( params.data.name == '随机血糖' ){
													return "#91b82b"
												}
											},
						            		label:{
						            			show: true,
						            			textStyle:{
							            			color:'#78d2be'
							            		}
						            		},
						            		lineStyle:{
						            			color:'#78d2be'
						            		},
						            		areaStyle:{
						            			color:'#f4f8f4'
						            		}
						            	}
						            },
						            data:arr2.reverse()
					        	}
	                        ]
	                    });
                    }else if( assessmentTitle == 'weight' ){
		        		let data = JSON.stringify({ 
							'page':'1',
							'rows':'10',
							'dataType':assessmentDataType,
							'dicCode':10004 
						});
		        		this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
							token:token, 
							infoType:assessmentId, 
							jsonValue:data 
						},{emulateJSON:true})
						.then(response => {
							this.weightData = response.body.rows;
							for(var i = 0; i<this.weightData.length; i++){
			        			let weight = this.weightData[i].valueNumber;
			        			let arrWeight = weight.toString(); 
					        	weightData.push(arrWeight);
				        	}
				        	myChart.setOption({
			        			tooltip : {
							        trigger: 'axis'
							    },
							    grid: {
									x:10,
									x2:15,
									y:25,
									y2:15,
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            boundaryGap : false,
							            splitLine:{  
				                            show:true  
				                        },
							            data: xAxisDataSlice.reverse()
							        }
							    ],
							    yAxis : [
							        {
							            type : 'value'
							        }
							    ],        //加载数据图表
		                        series: [
		                        	{
				                        name:this.data[0].dicName,
							            type:'line',
							            areaStyle: {normal: {}},
							            itemStyle:{
							            	/*normal:{
												color: "#e1966e",
												borderColor: "#e1966e",
							            		label:{
							            			show: true,
							            			textStyle:{
								            			color:'#e1966e'
								            		}
							            		},
							            		lineStyle:{
							            			color:'#e1966e'
							            		},
							            		areaStyle:{
							            			color:'#f4f8f4'
							            		}
							            	}*/
							            	normal:{
												color: "#78d2be",
												borderColor: "#78d2be",
							            		label:{
							            			show: true,
							            			textStyle:{
								            			color:'#78d2be'
								            		}
							            		},
							            		lineStyle:{
							            			color:'#78d2be'
							            		},
							            		areaStyle:{
							            			color:'#f4f8f4'
							            		}
							            	}
							            },
							            data:seriesDataSlice.reverse()
						        	}/*,
						        	{
				                        name:this.weightData[0].dicName,
							            type:'line',
							            areaStyle: {normal: {}},
							            itemStyle:{
							            	normal:{
												color: "#78d2be",
												borderColor: "#78d2be",
							            		label:{
							            			show: true,
							            			textStyle:{
								            			color:'#78d2be'
								            		}
							            		},
							            		lineStyle:{
							            			color:'#78d2be'
							            		},
							            		areaStyle:{
							            			color:'#f4f8f4'
							            		}
							            	}
							            },
							            data:weightData
						        	}*/
		                        ]
		                    });
						})
		        	}else {
		        		myChart.setOption({
		        			tooltip : {
						        trigger: 'axis'
						    },
						    grid: {
								x:10,
								x2:15,
								y:25,
								y2:15,
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            boundaryGap : false,
						            splitLine:{  
			                            show:true  
			                        },
						            data: xAxisDataSlice.reverse()
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value'
						        }
						    ],        //加载数据图表
	                        series: [
	                        	{
			                        name:this.data[0].dicName,
						            type:'line',
						            areaStyle: {normal: {}},
						            itemStyle:{
						            	normal:{
											color: "#78d2be",
											borderColor: "#78d2be",
						            		label:{
						            			show: true,
						            			textStyle:{
							            			color:'#78d2be'
							            		}
						            		},
						            		lineStyle:{
						            			color:'#78d2be'
						            		},
						            		areaStyle:{
						            			color:'#f4f8f4'
						            		}
						            	}
						            },
						            data:seriesDataSlice.reverse()
					        	}
	                        ]
	                    });
			        }

	            }			
			})
            
    	},
    	methods:{
			
		}
	}
</script>
<style>
	.echarts-chart {
		width: 95%;
		margin: 0.25rem auto;
	}
	.echarts-chart-main {
		border: 1px solid #c3c3c3;
	}
	.echarts-chart-null {
		width: 90%;
		margin: 1.25rem 5%;
		position: absolute;
	}
	.echarts-chart-null i {
		display: block;
	    width: 4rem;
		height: 4rem;
		position: relative;
		background: url(../../assets/image/doctor/no_data_img.png) no-repeat center;
		background-size: 4rem;
		margin: 0 auto;
	}
	.echarts-chart-null p {
	    float: left;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    height: 0.8rem;
	    color: #999;
	    font-size: 0.32rem;
	}
	.echarts-chart .loadTop {
		background: #fff;
		z-index: 2;
	}
</style>
