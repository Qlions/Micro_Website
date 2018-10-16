import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);


const  store = new Vuex.Store({
    state:{
        home_item:"",// 首页传递数据
        Home_index:"",// 首页传递数据
        user_name:"",
      	listArr:[],
        fcategoryId:[],
        imgArr:[],
        authorize:false,
        serverAddress:"",
        imgList:[],
        serviceType: "",
        textInfo:"",
        timeInfo:"",
        orderInfo:"",
        signInfo:"",
        marryInfo: "",
        addressInfo:"",
        appointInfo: "",
        mailInfo: "",
        address:"",
        order:"",
        consult:"",
        medication:"",
        userPhoto:"",
        orderObj:"",
        mobile:"",
        idCard: "",
        caseDetails:"",
        filesArr:[],
        itemsList: "",
        icdName: '', // 病例记录病例名称
        icdId: '', // 病例记录病例id
        orgName: '', // 病例记录医院名称
        orgCode: '', // 病例记录医院id
        createTime: '',// 病例记录时间
        caseNum: '',// 病例记录病号
    },
    // 展示内容
    getters:{
        
    },
    // 同步
    mutations:{
        showUserName(state){
            console.log(state.user_name);
        }
    },
     // actions 可异步
    actions: {
        acDecremen:({commit}, asyncNum) => {
            setTimeout(() => {
                 // asyncNum 对象可以是静态值
                 commit('decrement', asyncNum.num);
                }, 1000);
        }
    }
})


export default store;