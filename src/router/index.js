import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [{
		path: '/',
		redirect: '/home/main'
	}, {
		path: '/home',
		meta: {
			title: '主页'
		},
		component: resolve => require(['../component/home.vue'], resolve),
		children: [
			// 首页内容-路径
			{
				path: '/',
				redirect: '/home/main'
			}, {
				path: '/home/main',
				name: 'homeRouter',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/home/home-router.vue'], resolve)
			}, {
				path: '/boutiqueServer',
				name: 'boutiqueServer',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/home/boutique-server.vue'], resolve)
			},
			// 健康评估
			{
				path: '/child/estimate/healthy',
				name: 'healthy',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/estimate/healthy.vue'], resolve)
			},
			// 评估报告
			{
				path: '/child/estimate/theReport',
				name: 'theReport',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/estimate/theReport.vue'], resolve)
			},
			// 风险评估报告
			{
				path: '/child/estimate/reportPop',
				name: 'reportPop',
				component: resolve => require(['../component/page/estimate/reportPop.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			},
			// 中医评估
			{
				path: '/child/estimate/medicine',
				name: 'medicine',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/estimate/medicine.vue'], resolve)
			},
			// 性格评估
			{
				path: '/child/estimate/character',
				name: 'character',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/estimate/character.vue'], resolve)
			},
			// 压力评估
			{
				path: '/child/estimate/pressure',
				name: 'pressure',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/estimate/pressure.vue'], resolve)
			},
			// 健康档案
			{
				path: '/child/records',
				name: 'healthyRecords',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-records.vue'], resolve)
			},
			// 用药记录
			{
				path: '/child/medication',
				name: 'healthyMedication',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-medication.vue'], resolve)
			},
			// 用药记录详情
			{
				path: '/child/medication/details',
				name: 'healthyMedicationDetails',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/medication/healthy-medication-details.vue'], resolve),
			},
			// 复制用药记录详情
			{
				path: '/child/medication/copy/details',
				name: 'healthyMedicationCopy',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/medication/healthy-medication-copy.vue'], resolve),
			},
			// 添加用药记录详情
			{
				path: '/child/medication/add/details',
				name: 'healthyMedicationAdd',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/medication/healthy-medication-add.vue'], resolve),
			},
			// 修改用药记录详情
			{
				path: '/child/medication/update/details',
				name: 'healthyMedicationAdd',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/medication/healthy-medication-update.vue'], resolve),
			},
			// 病例记录
			{
				path: '/child/case',
				name: 'healthyCase',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-case.vue'], resolve)
			},
			// 病例记录详情
			{
				path: '/child/case/details',
				name: 'healthyCaseDetails',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/case/healthy-case-details.vue'], resolve),
			},
			// 病例记录添加
			{
				path: '/child/case/add/details',
				name: 'healthyCaseAddDetails',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/case/healthy-case-add.vue'], resolve),
			},
			// 病例记录添加
			{
				path: '/child/case/add/details/name',
				name: 'healthyCaseAddDetailsName',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/case/healthy-case-name.vue'], resolve),
			},
			// 病例记录添加
			{
				path: '/child/case/add/details/hospital',
				name: 'healthyCaseAddDetailsHospital',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/case/healthy-case-hospital.vue'], resolve),
			},
			// 病例记录修改
			{
				path: '/child/case/update/details',
				name: 'healthyCaseUpdateDetails',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/case/healthy-case-update.vue'], resolve),
			},
			// 住院记录
			{
				path: '/child/hospitalization',
				name: 'healthyHospitalization',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-hospitalization.vue'], resolve)
			},
			// 住院记录修改
			{
				path: '/child/hospitalization/update/details',
				name: 'healthyHospitalizationUpdate',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/hospitalization/healthy-hospitalization-update.vue'], resolve)
			},
			// 住院记录修改
			{
				path: '/child/hospitalization/add/details',
				name: 'healthyHospitalizationAdd',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/hospitalization/healthy-hospitalization-add.vue'], resolve)
			}, {
				path: '/child/hospitalization/details',
				name: 'healthyHospitalizationDetails',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/hospitalization/healthy-hospitalization-details.vue'], resolve),
			},
			// 健康计划
			{
				path: '/child/plan',
				name: 'healthyPlan',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-plan.vue'], resolve)
			},
			// 健康处方
			{
				path: '/child/prescription',
				name: 'healthyPrescription',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-prescription.vue'], resolve)
			},
			// 健康体检
			{
				path: '/child/physical',
				name: 'healthyPhysical',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/health-services/healthy-physical.vue'], resolve)
			},
			// 健康监测路由-》tab切换主页面
			{
				path: '/child/chart',
				name: 'chartContent',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/page/child-chart-content.vue'], resolve)
			}
		]
	},
	// 重定向
	{
		path: '/server',
		meta: {
			title: '服务'
		},
		component: resolve => require(['../component/server.vue'], resolve),
		children: [
			// 重定向
			{
				path: '',
				redirect: '/server/main'
			},
			// 健康服务
			{
				path: '/server/main',
				name: 'serverRouter',
				component: resolve => require(['../component/server/serverIndex.vue'], resolve),
				meta: {
					title: '中国健康云',
					keepAlive: true
				}
			}, {
				path: '/server/serverSearch',
				name: 'serverSearch',
				meta: {
					title: '服务搜索'
				},
				component: resolve => require(['../component/server/serverSearch.vue'], resolve)
			}, {
				path: '/server/serverList',
				name: 'serverList',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverList.vue'], resolve)
			}, {
				path: '/server/addressPoint',
				name: 'addressPoint',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/addressPoint.vue'], resolve)
			}, {
				path: "/server/serverDetail",
				name: 'serverDetail',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverDetail.vue'], resolve)
			}, {
				path: "/server/serverNotice",
				name: 'serverNotice',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverNotice.vue'], resolve)
			}, {
				path: "/server/serverPlace",
				name: 'serverPlace',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverPlace.vue'], resolve)
			}, {
				path: "/serverDetail/serverConfirm",
				name: 'serverConfirm',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverConfirm.vue'], resolve)
			}, {
				path: "/serverDetail/serverEva",
				name: 'serverEva',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverEva.vue'], resolve)
			}, {
				path: "/serverConfirm/addrManage",
				name: 'addrManage',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/addrManage.vue'], resolve)
			}, {
				path: "/serverConfirm/newAddress",
				name: 'newAddress',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/newAddress.vue'], resolve)
			}, {
				path: "/serverConfirm/departSelect",
				name: 'departSelect',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/departSelect.vue'], resolve)
			}, {
				path: "/serverConfirm/serverMarriage",
				name: 'serverMarriage',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverMarriage.vue'], resolve)
			}, {
				path: "/serverConfirm/expertAppoint",
				name: 'expertAppoint',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/expertAppoint.vue'], resolve)
			}, {
				path: "/serverConfirm/departmentDeta",
				name: 'departmentDeta',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/departmentDeta.vue'], resolve)
			}, {
				path: "/serverConfirm/serverExperts",
				name: 'serverExperts',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/serverExperts.vue'], resolve)
			}, {
				path: "/serverConfirm/healthDescribe",
				name: 'healthDescribe',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/healthDescribe.vue'], resolve)
			}, {
				path: "/serverConfirm/serverAddress",
				name: 'serverAddress',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/serverAddress.vue'], resolve)
			}, {
				path: '/serverConfirm/newAddress/map',
				name: "serverMap",
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/serverMap.vue'], resolve)
			}, {
				path: '/serverConfirm/mailAddress',
				name: "mailAddress",
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/server/mailAddress.vue'], resolve)
			}, {
				path: "/serverConfirm/appointTime",
				name: 'appointTime',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/appointTime.vue'], resolve)
			}, {
				path: "/serverConfirm/appointTimeDoc",
				name: 'appointTimeDoc',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/appointTimeDoc.vue'], resolve)
			}, {
				path: "/serverConfirm/appointTimeList",
				name: 'appointTimeList',
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/appointTimeList.vue'], resolve)
			}, {
				path: "/serverConfirm/serverOrder",
				name: "serverOrder",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/serverOrder.vue'], resolve)
			}, {
				path: "/serverOrder/selectPayMethod",
				name: "selectPayMethod",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/selectPayMethod.vue'], resolve)
			}, {
				path: "/serverConfirm/serverOrder/orderPayment",
				name: "orderPayment",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/orderPayment.vue'], resolve)
			}, {
				path: "/serverConfirm/serverOrder/orderPayH5",
				name: "orderPayH5",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/orderPayH5.vue'], resolve)
			}, {
				path: "/orderPayment/paySuccess",
				name: "paySuccess",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/pay-suc.vue'], resolve)
			}, {
				path: "/orderPayment/payFail",
				name: "payFail",
				meta: {
					title: "中国健康云"
				},
				component: resolve => require(['../component/server/pay-fail.vue'], resolve)
			}
		]
	}, {
		path: '/apply',
		component: resolve => require(['../component/apply.vue'], resolve),
		children: [
			// 重定向
			{
				path: '',
				redirect: '/apply/main'
			},
			// 应用首页
			{
				path: 'main',
				name: 'applyRouter',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/apply/apply-router.vue'], resolve)
			},
			// 应用首页
			{
				path: 'main/motion',
				name: 'applyMotion',
				meta: {
					title: '中国健康云'
				},
				meta: {
					requiresAuth: true,
					title: '健康数据监测'
				},
				component: resolve => require(['../component/page/motion-list.vue'], resolve)
			}, {
				path: 'main/jc',
				name: 'applyRouterJc',
				meta: {
					title: '中国健康云'
				},
				meta: {
					requiresAuth: true,
					title: '健康数据监测'
				},
				component: resolve => require(['../component/apply/app-router-jc.vue'], resolve)
			}, {
				path: '/child/add/weight',
				name: "weight",
				meta: {
					requiresAuth: true,
					title: '体重监测'
				},
				component: resolve => require(['../component/page/assessment/add-weight.vue'], resolve)
			}, {
				path: '/child/add/weightIndex',
				name: "weightIndex",
				meta: {
					requiresAuth: true,
					title: '体重指数监测'
				},
				component: resolve => require(['../component/page/assessment/add-weightIndex.vue'], resolve)
			}, {
				path: '/child/add/theWaist',
				name: "theWaist",
				meta: {
					requiresAuth: true,
					title: '腰围监测'
				},
				component: resolve => require(['../component/page/assessment/add-theWaist.vue'], resolve)
			}, {
				path: '/child/add/pulse',
				name: "pulse",
				meta: {
					requiresAuth: true,
					title: '脉搏监测'
				},
				component: resolve => require(['../component/page/assessment/add-pulse.vue'], resolve)
			}, {
				path: '/child/add/electrocardiogram',
				name: "electrocardiogram",
				meta: {
					requiresAuth: true,
					title: '心电图监测'
				},
				component: resolve => require(['../component/page/assessment/add-electrocardiogram.vue'], resolve)
			}, {
				path: '/child/add/temperature',
				name: "temperature",
				meta: {
					requiresAuth: true,
					title: '体温监测'
				},
				component: resolve => require(['../component/page/assessment/add-temperature.vue'], resolve)
			}, {
				path: '/child/add/bloodPressure',
				name: "bloodPressure",
				meta: {
					requiresAuth: true,
					title: '血压监测'
				},
				component: resolve => require(['../component/page/assessment/add-bloodPressure.vue'], resolve)
			}, {
				path: '/child/add/bloodsugar',
				name: "bloodsugar",
				meta: {
					requiresAuth: true,
					title: '血糖监测'
				},
				component: resolve => require(['../component/page/assessment/add-bloodsugar.vue'], resolve)
			}, {
				path: '/child/add/triglyceride',
				name: "triglyceride",
				meta: {
					requiresAuth: true,
					title: '甘油三酯监测'
				},
				component: resolve => require(['../component/page/assessment/add-triglyceride.vue'], resolve)
			}, {
				path: '/child/add/ldlc',
				name: "LDLC",
				meta: {
					requiresAuth: true,
					title: '低密度脂蛋白胆固醇监测'
				},
				component: resolve => require(['../component/page/assessment/add-ldlc.vue'], resolve)
			}, {
				path: '/child/add/hdlc',
				name: "HDLC",
				meta: {
					requiresAuth: true,
					title: '高密度脂蛋白胆固醇监测'
				},
				component: resolve => require(['../component/page/assessment/add-hdlc.vue'], resolve)
			}, {
				path: '/child/add/totalCholesterol',
				name: "totalCholesterol",
				meta: {
					requiresAuth: true,
					title: '总胆固醇监测'
				},
				component: resolve => require(['../component/page/assessment/add-totalCholesterol.vue'], resolve)
			}, {
				path: '/child/add/diet',
				name: "diet",
				meta: {
					requiresAuth: true,
					title: '膳食监测'
				},
				component: resolve => require(['../component/page/assessment/add-diet.vue'], resolve)
			}, {
				path: '/child/add/deit/class',
				name: "deitClass",
				meta: {
					requiresAuth: true,
					title: '膳食监测'
				},
				component: resolve => require(['../component/page/assessment/diet-class-list.vue'], resolve)
			}, {
				path: '/child/add/drinkWine',
				name: "drinkWine",
				meta: {
					requiresAuth: true,
					title: '饮酒监测'
				},
				component: resolve => require(['../component/page/assessment/add-drinkWine.vue'], resolve)
			}, {
				path: '/child/add/smoke',
				name: "smoke",
				meta: {
					requiresAuth: true,
					title: '吸烟监测'
				},
				component: resolve => require(['../component/page/assessment/add-smoke.vue'], resolve)
			}, {
				path: '/child/add/motion',
				name: "motion",
				meta: {
					requiresAuth: true,
					title: '运动监测'
				},
				component: resolve => require(['../component/page/assessment/add-motion.vue'], resolve)
			}, {
				path: '/child/add/motion/class',
				name: "motionClass",
				meta: {
					requiresAuth: true,
					title: '运动监测'
				},
				component: resolve => require(['../component/page/assessment/motion-class-list.vue'], resolve)
			}
		]
	}, {
		path: '/my',
		component: resolve => require(['../component/my.vue'], resolve),
		meta: {
			title: '中国健康云'
		},
		children: [{
				path: '',
				redirect: '/my/main'
			}, {
				path: '/my/main',
				name: 'myIndex',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/my/myIndex.vue'], resolve)
			}, {
				path: 'myData',
				name: 'myData',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/my/myData.vue'], resolve)
			}, {
				path: 'myIndex/changePic',
				name: 'changePic',
				component: resolve => require(['../component/my/changePic.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'basicData',
				name: 'basicData',
				component: resolve => require(['../component/my/basicData.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'basicDataNew',
				name: 'basicDataNew',
				component: resolve => require(['../component/my/basicDataNew.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'checkTel',
				name: 'checkTel',
				component: resolve => require(['../component/my/checkTel.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'checkEmail',
				name: 'checkEmail',
				component: resolve => require(['../component/my/checkEmail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'checkName',
				name: 'checkName',
				component: resolve => require(['../component/my/checkName.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'checkedName',
				name: 'checkedName',
				component: resolve => require(['../component/my/checkedName.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myConsult',
				name: 'myConsult',
				component: resolve => require(['../component/my/myConsult.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			},
			//预约挂号
			{
				path: 'myRegister',
				name: 'myRegister',
				component: resolve => require(['../component/my/myRegister.vue'], resolve),
				meta: {
					title: '中国健康云'
				},

			},
			//  注销登录
			// {
			// 	path: "cancelUser",
			// 	name: "cancelUser",
			// 	component: resolve => require( ["../component/my/cancelUser.vue"], resolve),

			// 	meta: {
			// 		title: "中国健康云"
			// 	}
			// },
			{
				path: 'regsiterDetailed',
				name: 'regsiterDetailed',
				component: resolve => require(['../component/my/regsiterDetailed.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: '/my/myservice',
				name: 'myService',
				component: resolve => require(['../component/my/myService.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: '/my/feedback',
				name: 'myFeedback',
				component: resolve => require(['../component/my/myFeedback.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myOrders',
				name: 'myOrders',
				component: resolve => require(['../component/my/myOrders.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			},
			//			{ 
			//				path: 'complain',
			//				name: 'complain',
			//				component: resolve => require(['../component/my/complain.vue'], resolve),
			//				meta:{ title: '中国健康云' }
			//			},
			{
				path: 'cancleTitle',
				name: 'cancleTitle',
				component: resolve => require(['../component/my/cancleTitle.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'orderDetail/:orderId',
				name: 'orderDetail',
				component: resolve => require(['../component/my/orderDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			},
			//			推送时的订单详情
			{
				path: 'myOrderDetail',
				name: 'myOrderDetail',
				component: resolve => require(['../component/my/myOrderDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myServiceOrder',
				name: 'myServiceOrder',
				component: resolve => require(['../component/my/myServiceOrder.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'healthy',
				name: 'myhealthy',
				component: resolve => require(['../component/my/healthy.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'assess',
				name: 'assess',
				component: resolve => require(['../component/my/assess.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'orderCode/:orderId/:orderCode/:orderState',
				name: 'orderCode',
				component: resolve => require(['../component/my/orderCode.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: "myServerDetail",
				name: 'myServerDetail',
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
				component: resolve => require(['../component/my/myServerDetail.vue'], resolve)
			}, {
				path: 'myWallet',
				name: 'myWallet',
				component: resolve => require(['../component/my/myWallet.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'walletRest/:myMoney',
				name: 'walletRest',
				component: resolve => require(['../component/my/walletRest.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'walletDetail',
				name: 'walletDetail',
				component: resolve => require(['../component/my/walletDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'walletOut',
				name: 'walletOut',
				component: resolve => require(['../component/my/walletOut.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'walletTo',
				name: 'walletTo',
				component: resolve => require(['../component/my/walletTo.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'changePwd',
				name: 'changePwd',
				component: resolve => require(['../component/my/changePwd.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myConcern',
				name: 'myConcern',
				component: resolve => require(['../component/my/myConcern.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myAddress',
				name: 'myAddress',
				component: resolve => require(['../component/my/myAddress.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myAddress/newAddress',
				name: 'newAddress',
				component: resolve => require(['../component/my/newAddress.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myAddress/reviseAddress',
				name: 'reviseAddress',
				component: resolve => require(['../component/my/reviseAddress.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myDoctor',
				name: 'myDoctor',
				component: resolve => require(['../component/my/myDoctor.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'mySquare',
				name: 'mySquare',
				component: resolve => require(['../component/my/mySquare.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myFriends',
				name: 'myFriends',
				component: resolve => require(['../component/my/myFriends.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myFriends/friendDetail/:id',
				name: 'friendDetail',
				component: resolve => require(['../component/my/friendDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myFriends/searchFriend',
				name: 'searchFriend',
				component: resolve => require(['../component/my/searchFriend.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: '/privateLetter/:frUserName/:frUserId',
				name: 'privateLetter',
				component: resolve => require(['../component/my/privateLetter.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myConsult/consultDetail/',
				name: 'consultDetail',
				component: resolve => require(['../component/my/consultDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myService/myservicedetail/',
				name: 'myServiceDetail',
				component: resolve => require(['../component/my/myServiceDetail.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myConsult/quickConsult',
				name: 'quickConsult',
				component: resolve => require(['../component/my/quickConsult.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: 'myConsult/subscribe',
				name: 'subscribe',
				component: resolve => require(['../component/my/subscribe-manag.vue'], resolve),
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}
		]
	}, {
		path: '/news',
		component: resolve => require(['../component/news.vue'], resolve),
		meta: {
			requiresAuth: true,
			title: '消息'
		},
		children: [{
			path: '',
			redirect: '/news/myMessage'
		}, {
			path: '/news/myMessage',
			name: 'myMessage',
			component: resolve => require(['../component/news/myMessage.vue'], resolve),
			meta: {
				requiresAuth: true,
				title: '中国健康云'
			}
		}, {
			path: 'myMessage/sysNotice',
			name: 'sysNotice',
			component: resolve => require(['../component/news/sysNotice.vue'], resolve),
			meta: {
				requiresAuth: true,
				title: '中国健康云'
			}
		}, {
			path: 'myMessage/exMessage',
			name: 'exMessage',
			component: resolve => require(['../component/news/exMessage.vue'], resolve),
			meta: {
				requiresAuth: true,
				title: '中国健康云'
			}
		}, {
			path: 'myMessage/subscribeDeta',
			name: 'subscribeDeta',
			component: resolve => require(['../component/news/subscribeDeta.vue'], resolve),
			meta: {
				requiresAuth: true,
				title: '中国健康云'
			}
		}, {
			path: '/news/article/reviews',
			name: 'article',
			component: resolve => require(['../component/news/subscribe/article-reviews.vue'], resolve),
			meta: {
				requiresAuth: true,
				title: '中国健康云'
			}
		}]
	}, {
		path: '/code',
		component: resolve => require(['../component/org.vue'], resolve),
		meta: {
			title: '机构'
		},
		children: [{
			path: '/',
			redirect: '/code/ogList'
		}, {
			path: '/code/orgDetail',
			name: 'orgDetail',
			component: resolve => require(['../component/code/orgDetail.vue'], resolve),
			meta: {
				title: '中国健康云'
			}
		},  {
			path: '/code/ogssDetail',
			name: 'ogssDetail',
			component: resolve => require(['../component/code/ogssDetail.vue'], resolve),
			meta: {
				title: '中国健康云'
			}
		},{
			path: '/code/orgList',
			name: 'orgList',
			component: resolve => require(['../component/code/orgList.vue'], resolve),
			meta: {
				title: '中国健康云'
			}
		}]
	}, {
		path: '/code',
		component: resolve => require(['../component/code/ogDetail.vue'], resolve),
		meta: {
			title: '机构'
		},
		children: [
			//			{
			//				path: '',
			//				redirect:'/code/ogDetail'
			//			},
			{
				path: '/code/ogDetail',
				name: 'ogDetail',
				component: resolve => require(['../component/code/ogDetail.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			}
		]
	}, {
		path: '/doctor',
		component: resolve => require(['../component/doctor.vue'], resolve),
		//		meta: { requiresAuth: true,title: '中国健康云' },
		children: [{
				path: '/',

				redirect: '/doctor/main'

			}, {
				path: '/doctor/main',
				name: 'list',
				component: resolve => require(['../component/doctor/doctorList.vue'], resolve),
				meta: {
					title: '中国健康云',
					keepAlive: true
				}
			}, {
				path: '/doctor/doctorSearch',
				name: 'doctorSearch',
				component: resolve => require(['../component/doctor/doctorSearch.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			}, {
				path: '/doctor/doctorAuthorized',
				name: 'doctorAuthorized',
				component: resolve => require(['../component/doctor/doctorAuthorized.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			}, {
				path: '/doctor/doctorLocate',
				name: 'doctorLocate',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/doctor/doctorLocate.vue'], resolve)
			}, {
				path: '/doctor/search',
				name: 'search',
				component: resolve => require(['../component/doctor/search.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			}, {
				path: '/doctor/synopsis',
				name: 'synopsis',
				component: resolve => require(['../component/doctor/synopsis.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			}, {
				path: '/doctor/authorize',
				name: 'authorize',
				component: resolve => require(['../component/doctor/authorize.vue'], resolve),
				//				meta: {title: '中国健康云'}
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
			}, {
				path: '/doctor/signing',
				name: 'signing',
				component: resolve => require(['../component/doctor/signing.vue'], resolve),
				//				meta: {title: '中国健康云'}
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				}
			}, {
				path: '/doctor/sigingOK',
				name: 'sigingOK',
				component: resolve => require(['../component/doctor/sigingOK.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			}, {
				path: '/doctor/signingNotice',
				name: 'signingNotice',
				component: resolve => require(['../component/doctor/signingNotice.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			},  {
				path: '/doctor/teamNum',
				name: 'teamNum',
				component: resolve => require(['../component/doctor/teamNum.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			}, {
				path: '/doctor/consultingNum',
				name: 'consultingNum',
				component: resolve => require(['../component/doctor/consultingNum.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			},{
				path: '/doctor/teamList',
				name: 'teamList',
				component: resolve => require(['../component/doctor/teamList.vue'], resolve),
				meta: {
					title: '中国健康云'
				}
			}, {
				path: '/doctor/teamMsg',
				name: 'teamMsg',
				component: resolve => require(['../component/doctor/teamMsg.vue'], resolve),
				meta: {
					title: "中国健康云"
				},

			}, {
				path: "/doctor/evaluation",
				name: 'evaluation',
				component: resolve => require(['../component/doctor/evaluation.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
				//				meta: { requiresAuth: true,title: '中国健康云' },
			}, {
				path: '/doctor/AdvisoryDetails',
				name: "AdvisoryDetails",
				component: resolve => require(['../component/doctor/AdvisoryDetails.vue'], resolve),
				//				meta: { title: "中国健康云" }
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
			}, {
				path: '/doctor/familyDoctorList',
				name: "familyDoctorList",
				component: resolve => require(['../component/doctor/familyDoctorList.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			}, {
				path: '/doctor/doctorConsult',
				name: "doctorConsult",
				component: resolve => require(['../component/doctor/doctor-consult.vue'], resolve),
				//				meta: { title: "中国健康云" }
				meta: {
					requiresAuth: true,
					title: '中国健康云'
				},
			},
			//协议书
			{
				path: '/doctor/protocolSign',
				name: "signing",
				component: resolve => require(['../component/doctor/signing.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			},
			//已签约
			{
				path: '/doctor/hasSinged',
				name: "hasSinged",
				component: resolve => require(['../component/doctor/hasSinged.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			},
			//咨询
			{
				path: '/doctor/doctor-consult',
				name: "doctor-consult",
				component: resolve => require(['../component/doctor/doctor-consult.vue'], resolve),
				meta: {
					title: "中国健康云"
				}
			}, {
				path: "/doctor/codeServerDetail",
				name: 'codeServerDetail',
				meta: {
					title: '中国健康云'
				},
				component: resolve => require(['../component/code/codeServerDetail.vue'], resolve)
			},

		]
	}, {
		path: '/login',
		component: resolve => require(['../component/login.vue'], resolve),
		children: [{
				path: '/',
				redirect: '/login/main'
			},
			// 登录
			{
				path: "/login/main",
				component: resolve => require(['../component/login/login-main.vue'], resolve),
				meta: {
					title: '登录中国健康云'
				}
			},
			// 注册
			{
				path: "/login/main/register",
				component: resolve => require(['../component/login/register.vue'], resolve),
				meta: {
					title: '开启我的健康之旅'
				}
			},
			// 忘记密码
			{
				path: "/login/main/passRetrieval",
				component: resolve => require(['../component/login/passRetrieval.vue'], resolve),
				meta: {
					title: '忘记密码'
				}
			},
			// 忘记密码
			{
				path: "/login/main/passRetrievalMobile",
				component: resolve => require(['../component/login/forget-pass-mobile.vue'], resolve),
				meta: {
					title: '忘记密码'
				}
			},
			// 忘记密码
			{
				path: "/login/main/confirmPass",
				name: "confirmPass",
				meta: {
					title: '忘记密码'
				},
				component: resolve => require(['../component/login/confirm-pass.vue'], resolve)
			}
		]
	},
	// 活动以及 下载页
	{
		path: "/activities",
		component: resolve => require(['../component/activities.vue'], resolve),
		children: [{
			path: '',
			redirect: '/activities/main'
		}, {
			path: '/activities/main',
			name: 'activitiesRouter',
			component: resolve => require(['../component/activities/downLoad/downLoad.vue'], resolve),
			meta: {
				title: '中国健康云',
				keepAlive: true
			}
		}, {
			path: '/activities/doctorDon',
			name: 'activitiesdoctorDon',
			component: resolve => require(['../component/activities/downLoad/activitiesdoctorDon.vue'], resolve),
			meta: {
				title: '中国健康云',
				keepAlive: true
			}
		}, {
			path: '/activities/activitiesPage/main',
			name: "activitiesfirst",
			component: resolve => require(["../component/activities/activitiesPage/activitiesIndex.vue"], resolve),
			meta: {
				title: "中国健康云",
				keepAlive: true
			}
		}, {
			path: '/activities/activitiesPage/activitiesGet',
			name: "activitiessecond",
			component: resolve => require(["../component/activities/activitiesPage/activitiesGet.vue"], resolve),
			meta: {
				title: "中国健康云",
				keepAlive: true
			}
		}, {
			path: '/activities/activitiesPage/getSuc',
			name: "activitiesgetSuc",
			component: resolve => require(["../component/activities/activitiesPage/getSuc.vue"], resolve),
			meta: {
				title: "中国健康云",
				keepAlive: true
			}
		}, {
			path: '/activities/share',
			name: "activitiesShare",
			component: resolve => require(["../component/activities/sharePage/share.vue"], resolve),
			meta: {
				title: "中国健康云,为您和家人的健康负责",
				keepAlive: true
			}
		}, {
			path: '/activities/share2',
			name: "activitiesShare2",
			component: resolve => require(["../component/activities/sharePage/share_2.vue"], resolve),
			meta: {
				title: "中国健康云,为您和家人的健康负责",
				keepAlive: true
			}
		}, {
			path: "/activities/shareVideo",
			name: "shareVideo",
			meta: {
				title: '视频分享'
			},
			component: resolve => require(['../component/activities/shareVideo/shareVideo.vue'], resolve)
		}]
	},
	// 问卷
	{
		path: "/mxbquestion",
		component: resolve => require(["../component/question/mxb-question.vue"], resolve),
		meta: {
			title: '慢性病问卷'
		},
	},
	//扫码登陆
	{
		path: "scanQRCode",
		component: resolve => require(["../component/scanQRCode.vue"], resolve),
		children: [{
			path: "",
			redirect: "/scanQRCode/main"
		}, {
			path: "/scanQRCode/main",
			name: "scanQRCodeRouter",
			component: resolve => require(["../component/scanQRCode/QRCode.vue"], resolve),
			meta: {
				title: "中国健康云",
				keepAlive: true
			}
		}, {
			path: "/scanQRCode/MakeSureLoginCode",
			name: "MakeSureLoginCode",
			component: resolve => require(["../component/scanQRCode/MakeSureLoginCode.vue"], resolve),
			meta: {
				title: "中国健康云",
				keepAlive: true
			}
		}]
	}
]

const router = new VueRouter({
	routes // （缩写）相当于 routes: routes
})

// 判断是否登录
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		var search = 'userInfo' + "=" //查询检索的值
		var returnvalue = ""; //返回值
		if (document.cookie.length > 0) {
			var sd = document.cookie.indexOf(search);
			if (sd != -1) {
				sd += search.length;
				var end = document.cookie.indexOf(";", sd);
				if (end == -1)
					end = document.cookie.length;
				//unescape() 函数可对通过 escape() 编码的字符串进行解码。
				returnvalue = unescape(document.cookie.substring(sd, end))
			}
		}
		if (returnvalue !== '') {
			next();
		} else {
			next({
				path: '/login',
				//query: { redirect: to.fullPath }
			})
		}
	} else {
		next();
	}
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	next()
})

export default router;