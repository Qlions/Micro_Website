import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由配置文件，配置路由
import store from './store/store' // 路由配置文件，配置路由
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import ToggleButton from 'vue-js-toggle-button'
import VueScroller from 'vue-scroller'
import VueCropper from 'vue-cropper'

import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);
//alert(ToggleButton);
Vue.use(ToggleButton);
Vue.use(VueResource); // 使用vue封装的ajax
Vue.use(VueCookie);
Vue.use(VueScroller);
Vue.use(VueCropper);
/*-------------------- 自定义指令 ----------------------------*/
// 字符串截取过滤器
Vue.filter('substring', function(val, start, stop) {
	if (val != null) {
		return val.substring(start, stop);
	}

})
// 字符串截取;前面的
Vue.filter('split', function(val, index) {
	if (!isNaN(val)) {
		return val;
	} else {
		return val.split(';')[index];
	}
})
// 替换时间T为空
Vue.filter('replace', function(val, ment, empty) {
	return val.replace(ment, empty);
})
// 价格合法化，避免出现NaN
Vue.filter('LegalNumber', function(val) {

	if (isNaN(val)) {
		return '0.00';
	} else {
		return Number(val).toFixed(2);
	}
})
// 整数后加 .00
Vue.filter('doubleZero', function(val) {
	return val.toFixed(2)
})

//日期文字变-
Vue.filter('dataType', function(val) {
	return val.replace(/'年'/g, "-").replace(/'月'/g, "-").replace(/'日'/g, "-")
})

//日期变-文字
Vue.filter('datefilter2', function(value) {
	let year = value.substring(0, 4);
	let month = value.substring(5, 7);
	let day = value.substring(8, 10);
	if (month.charAt(0) === '0') {
		let months = month.replace(/\b(0+)/gi, "");
		return year + "年" + months + "月" + day + "日";
	} else {
		return year + "年" + month + "月" + day + "日";
	}
})

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
})
var bus = new Vue()