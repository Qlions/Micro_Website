<template>
	<div class="healthy-case-add-details">
		<Heads :title="title"></Heads>
		<div class="healthy-case-add-details-content">
			<div class="case-details-time">
				<ul>
					<li>
						<router-link :to="{ name:'healthyCaseAddDetailsName' }">
							<span>病历名称</span>
							<input type="text" v-model="icdName" placeholder="请选择" class="right" readonly="readonly">
						</router-link>
					</li>
					<li>
						<span>就诊时间</span>
						<input placeholder="请选择" readonly="readonly" name="appDateTime" id="appDateTime" type="text" v-model="createTime" class="right">
					</li>
					<li>
						<span>门诊/病历号</span>
						<input type="text" v-model="caseNum" placeholder="请输入" class="right">
					</li>
					<li>
						<router-link :to="{ name:'healthyCaseAddDetailsHospital' }">
							<span>所属医院</span>
							<input type="text" v-model="orgName" placeholder="请选择" class="right" readonly="readonly">
						</router-link>
					</li>
				</ul>
			</div>
			<div class="case-details-record">
				<ul>
					<li>
						<div class="case-details-record-title">
							<span>现病史</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入现病史描述'" v-model="addDetails[0].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[0].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove1(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files1" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile1(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status1 < maxNum" class="file-item">
						                <div @click="add1" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						            <section class="file-text" v-if="showText1">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged1" ref="file1" multiple="multiple">
						    </div>
						</div>
					</li>
					<li>
						<div class="case-details-record-title">
							<span>临床表现</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入临床表现描述'" v-model="addDetails[1].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[1].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove2(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files2" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile2(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status2 < maxNum" class="file-item">
						                <div @click="add2" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText2">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged2" ref="file2" multiple="multiple">
						    </div>
						</div>
					</li>
					<li>
						<div class="case-details-record-title">
							<span>辅助检查</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入辅助检查描述'" v-model="addDetails[2].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[2].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove3(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files3" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile3(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status3 < maxNum" class="file-item">
						                <div @click="add3" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText3">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged3" ref="file3" multiple="multiple">
						    </div>
						</div>
					</li>
					<li>
						<div class="case-details-record-title">
							<span>特殊检查</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入特殊检查描述'" v-model="addDetails[3].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[3].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove4(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files4" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile4(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status4 < maxNum" class="file-item">
						                <div @click="add4" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText4">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged4" ref="file4" multiple="multiple">
						    </div>
						</div>
					</li>
					<li>
						<div class="case-details-record-title">
							<span>诊断</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入诊断描述'" v-model="addDetails[4].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[4].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove5(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files5" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile5(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status5 < maxNum" class="file-item">
						                <div @click="add5" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText5">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged5" ref="file5" multiple="multiple">
						    </div>
						</div>
					</li>
					<li>
						<div class="case-details-record-title">
							<span>治疗</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入治疗描述'" v-model="addDetails[5].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[5].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove6(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files6" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile6(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status6 < maxNum" class="file-item">
						                <div @click="add6" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText6">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged6" ref="file6" multiple="multiple">
						    </div>
						</div>
						<li>
						<div class="case-details-record-title">
							<span>手术</span>
						</div>
						<div class="case-details-record-content">
							<textarea :placeholder="'请输入手术描述'" v-model="addDetails[6].textarea" @focus="focus" @blur="blur"></textarea>
							<div class="consult-uploader-img" v-for="(src,index) in addDetails[6].img">
								<div class="file-list">
									<section class="file-item draggable-item">   
						                <div class="case-details-record-img" >
						                     <img :src="src.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="remove7(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
					            </div>
				            </div>
							<div class="consult-uploader">
						        <div class="file-list">
						            <section v-for="(file, index) of files7" class="file-item draggable-item">   
						                <div class="case-details-record-img">
						                     <img :src="file.src" alt="" data-preview-src="" data-preview-group="1" ondragstart="return false;">
						                </div>
						                <span class="file-remove" @click="removeFile7(index)">
						                    <img src="../../../../assets/image/server/close_img.png">
						                </span>  
						            </section>
						            <section v-if="status7 < maxNum" class="file-item">
						                <div @click="add7" class="add">
						                    <span>
						                        <img src="../../../../assets/image/doctor/add-btn.png">
						                    </span>
						                </div>
						            </section>
						             <section class="file-text" v-if="showText7">
						            	<p>上传图片</p>
						            	<p>图片最多上传五张</p>
						            </section>
						        </div>
						        <slot></slot>
						        <input type="file" accept="image/*" @change="fileChanged7" ref="file7" multiple="multiple">
						    </div>
						</div>
					</li>
				</ul>
			</div>	
		</div>
		<div class="preservation" id="footer" @click="submit">
            <a href="javascript:void(0)">
                保存
            </a>
        </div>
		<div style="width:100%;height:1rem;background: #fff;"></div>
		<popup :message="message" v-show="show"></popup>
	</div>
</template>
<script>
	import $ from 'jquery'
	import '../../../../assets/js/mobiscroll.core-2.5.2.js' 
	import '../../../../assets/js/mobiscroll.core-2.5.2-zh.js'
	import '../../../../assets/js/mobiscroll.datetime-2.5.1.js'
	import '../../../../assets/js/mobiscroll.datetime-2.5.1-zh.js'
	import '../../../../assets/js/mobiscroll.android-ics-2.5.2.js'

	import Heads from '../../../common/head.vue'
	import uploader from './healthy-uploader.vue'
	import popup from '../../../common/error-popup.vue'
	export default {
		data () {
			return {
				src:'/webapiProxy/webapi/picAppUpload.action',
				list:this.$store.state.caseDetails,
				icdName:"",
				caseNum:"",
				maxNum:5,
				files: [],
				status: 0,
				title:'修改病历',
				createTime:"",
				orgName:"",

				orgCode:"",
				icdId:"",

				isIndex:-1,
				message:"",
				show:false,
				filesArr:'',
				textarea1:'',
				textarea2:'',
				textarea3:'',
				textarea4:'',
				textarea5:'',
				textarea6:'',
				textarea7:'',
           		maxNum:5,
           		showText1:true,
           		showText2:true,
           		showText3:true,
           		showText4:true,
           		showText5:true,
           		showText6:true,
           		showText7:true,
           		status1: 0,
           		status2: 0,
           		status3: 0,
           		status4: 0,
           		status5: 0,
           		status6: 0,
           		status7: 0,
                files1: [],
                files2: [],
                files3: [],
                files4: [],
                files5: [],
                files6: [],
                files7: [],
				dictCodeArr:"",
				caseManageId:"",
				addDetails:[
					{name:"现病史",textarea:"",img:[]},
					{name:"临床表现",textarea:"",img:[]},
					{name:"辅助检查",textarea:"",img:[]},
					{name:"特殊检查",textarea:"",img:[]},
					{name:"诊断",textarea:"",img:[]},
					{name:"治疗",textarea:"",img:[]},
					{name:"手术",textarea:"",img:[]}
				],
				imgArr:[],
			}
		},
		mounted () {
			if( this.$store.state.orgCode == '' ){
				this.orgCode =  this.list.hospitalCode;
			}else{
				this.orgCode = this.$store.state.orgCode;
			}
			if( this.$store.state.icdId == '' ){
				this.icdId =  this.list.icdId;
			}else{
				this.icdId = this.$store.state.icdId;
			}
			if( this.$store.state.caseNum == '' ){
				this.caseNum =  this.list.outpatientNum;
			}else{
				this.caseNum = this.$store.state.caseNum;
			}
			$('.case-details-record-title').on('click',function(){
				$(this).siblings().toggle();
			})
			this.dictCode(); // 获取对应字典编码信息
			let vm = this; 
			let imgData = this.$store.state.filesArr;
			for (var i = 0; i < this.list.dictInfo.length; i++) {
				for (var k = 0; k < this.list.dictInfo[i].caseDetail.length; k++) {
					if(this.list.dictInfo[i].caseDetail[k].imageUrl != ''){

						let obj = {
							src:this.list.dictInfo[i].caseDetail[k].imageUrl,
							caseInfoId:this.list.dictInfo[i].caseDetail[k].caseInfoValue
						}
						this.addDetails[i].img.push(obj);
					}
					if(this.list.dictInfo[i].caseDetail[k].caseInfoType != 2 && this.list.dictInfo[i].caseDetail[k].caseInfoValue != null){
						this.addDetails[i].textarea = this.list.dictInfo[i].caseDetail[k].caseInfoValue;
					}
				}
				if(this.addDetails[i].img != ''){
					this.filesArr = imgData.concat(this.addDetails[i].img);
				}		
			}
			if(this.addDetails[0].img.length == this.maxNum){
				this.status1 = 5;	
			}
			if(this.addDetails[1].img.length == this.maxNum){
				this.status2 = 5;
			}
			if(this.addDetails[2].img.length == this.maxNum){
				this.status3 = 5;	
			}
			if(this.addDetails[3].img.length == this.maxNum){
				this.status4 = 5;	
			}
			if(this.addDetails[4].img.length == this.maxNum){
				this.status5 = 5;	
			}
			if(this.addDetails[5].img.length == this.maxNum){
				this.status6 = 5;	
			}
			if(this.addDetails[6].img.length == this.maxNum){
				this.status7 = 5;	
			}
			if(this.addDetails[0].img.length > 0){
				this.showText1 = false;	
			}
			if(this.addDetails[1].img.length > 0){
				this.showText2 = false;	
			}
			if(this.addDetails[2].img.length > 0){
				this.showText3 = false;	
			}
			if(this.addDetails[3].img.length > 0){
				this.showText4 = false;	
			}
			if(this.addDetails[4].img.length > 0){
				this.showText5 = false;	
			}
			if(this.addDetails[5].img.length > 0){
				this.showText6 = false;	
			}
			if(this.addDetails[6].img.length > 0){
				this.showText7 = false;	
			}
			// 默认值
			console.log(this.list)
			this.createTime = this.list.createTime.replace('T',' ');
			this.icdName = this.list.caseName;
			this.caseManageId = this.list.caseManageId;
			this.orgName = this.list.orgName;
			$(function () {
				var currYear = (new Date()).getFullYear();	
				var opt={};
				opt.date = {preset : 'date'};
				opt.datetime = {preset : 'datetime'};
				opt.time = {preset : 'time'};
				opt.default = {
					theme: 'android-ics light', //皮肤样式
			        display: 'modal', //显示方式 
			        mode: 'scroller', //日期选择模式
					dateFormat: 'yyyy-mm-dd',
					lang: 'zh',
			        startYear: currYear - 10, //开始年份
			        endYear: currYear + 10, //结束年份
			        onSelect:function(valueText,inst){
			        	var thisStamp = Date.parse(new Date()); // 当前时间
			        	var valueTextNum = Date.parse(valueText.replace(/-/g,'/'));
			        	if(valueTextNum>thisStamp){
			        		vm.show = true;
							vm.message = '就诊时间不能大于当前时间';
							vm.clearStorage();
							 $("#appDateTime").val("");
			        	}else {
			        		vm.createTime = valueText;
			        		vm.$store.state.createTime = valueText;
			        	}
				    }
				};
			  	var optDateTime = $.extend(opt['datetime'], opt['default']);
			    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
	        });
			mui.previewImage();
		},
		methods:{
            remove1(index) {  //删除图片
                this.addDetails[0].img.splice(index, 1);
				if(this.addDetails[0].img.length == this.maxNum){
					this.status1 = 5;	
				}else {
					this.status1 = 0;
				}
				if(this.addDetails[0].img.length == 0){
					this.showText1 = true;	
				}
				this.filesArr = [];
            },
            remove2(index) {  //删除图片
                this.addDetails[1].img.splice(index, 1);
				if(this.addDetails[1].img.length == this.maxNum){
					this.status2 = 5;	
				}else {
					this.status2 = 0;
				}
				if(this.addDetails[1].img.length == 0){
					this.showText2 = true;	
				}
            },
            remove3(index) {  //删除图片
                this.addDetails[2].img.splice(index, 1);
				if(this.addDetails[2].img.length == this.maxNum){
					this.status3 = 5;	
				}else {
					this.status3 = 0;
				}
				if(this.addDetails[2].img.length == 0){
					this.showText3 = true;	
				}
            },
            remove4(index) {  //删除图片
                this.addDetails[3].img.splice(index, 1);
				if(this.addDetails[3].img.length == this.maxNum){
					this.status4 = 5;	
				}else {
					this.status4 = 0;
				}
				if(this.addDetails[3].img.length == 0){
					this.showText4 = true;	
				}
            },
            remove5(index) {  //删除图片
                this.addDetails[4].img.splice(index, 1);
				if(this.addDetails[4].img.length == this.maxNum){
					this.status5 = 5;	
				}else {
					this.status5 = 0;
				}
				if(this.addDetails[4].img.length == 0){
					this.showText5 = true;	
				}
            },
            remove6(index) {  //删除图片
                this.addDetails[5].img.splice(index, 1);
				if(this.addDetails[5].img.length == this.maxNum){
					this.status6 = 5;	
				}else {
					this.status6 = 0;
				}
				if(this.addDetails[5].img.length == 0){
					this.showText6 = true;	
				}
            },
            remove7(index) {  //删除图片
                this.addDetails[6].img.splice(index, 1);
				if(this.addDetails[6].img.length == this.maxNum){
					this.status7 = 5;	
				}else {
					this.status7 = 0;
				}
				if(this.addDetails[6].img.length == 0){
					this.showText7 = true;	
				}
            },
            clearStorage () { //2s报错弹出框消失
                let time = setTimeout(()=>{
                    if( this.isPopup ==  true){
                        this.isPopup = false;
                    } 
                    if( this.sucShow ==  true){
                        this.sucShow = false;
                    } 
                },2000);  
            },
			toggle (index) {
				if( this.isIndex == index ){
					this.isIndex = -1;
				} else {
					this.isIndex = index;
				}
			},
			focus(){//input获取焦点后的处理
				let that = this;
				setTimeout(function(){
					let footer = document.getElementById("footer");
					footer.style.display="none"
//					let focus = that.$refs.footTalk
					/*footer.scrollIntoView(true);
					footer.scrollIntoViewIfNeeded();
					document.body.scrollTop = document.body.scrollHeight;*/
				},200)
			},
			blur () {
				let footer = document.getElementById("footer");
				footer.style.display="block"
			},
			clearStorage () {
				let time = setTimeout(()=>{
					if( this.show ==  true){
                		this.show = false;
                	} 
                },3000);  
			},
			dictCode () { // 获取对应字典编码信息
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                let userId = userInfo.userId;
                let token = userInfo.token;
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:530005, 
					jsonValue:''
				},{emulateJSON:true})
				.then(response => {
					this.dictCodeArr = response.body.listInfo;
				})
			},
			add1() {
                this.$refs.file1.click();
            },
            add2() {
                this.$refs.file2.click();
            },
            add3() {
                this.$refs.file3.click();
            },
            add4() {
                this.$refs.file4.click();
            },
            add5() {
                this.$refs.file5.click();
            },
            add6() {
                this.$refs.file6.click();
            },
            add7() {
                this.$refs.file7.click();
            },
            finished() {
                this.files1 = []
                this.files2 = []
                this.status = 'ready'
            },
            removeFile1(index) {
                this.files1.splice(index, 1);
                this.status1 = this.files1.length;
                if(this.files1.length < 1){
                    this.showText1 = true;
                }
            },
            removeFile2(index) {
                this.files2.splice(index, 1);
                this.status2 = this.files2.length;
                if(this.files2.length < 1){
                    this.showText2 = true;
                }
            },
            removeFile3(index) {
                this.files3.splice(index, 1);
                this.status3 = this.files3.length;
                if(this.files3.length < 1){
                    this.showText3 = true;
                }
            },
            removeFile4(index) {
                this.files4.splice(index, 1);
                this.status4 = this.files4.length;
                if(this.files4.length < 1){
                    this.showText4 = true;
                }
            },
            removeFile5(index) {
                this.files5.splice(index, 1);
                this.status5 = this.files5.length;
                if(this.files5.length < 1){
                    this.showText5 = true;
                }
            },
            removeFile6(index) {
                this.files6.splice(index, 1);
                this.status6 = this.files6.length;
                if(this.files6.length < 1){
                    this.showText6 = true;
                }
            },
            removeFile7(index) {
                this.files7.splice(index, 1);
                this.status7 = this.files7.length;
                if(this.files7.length < 1){
                    this.showText7 = true;
                }
            },
            fileChanged1() {
                const list = this.$refs.file1.files;
                let imgLength = this.addDetails[0].img.length;
               	let test = this.files1.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files1.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText1 = false;
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files1.push(item);
                            }
                        }
                    }   
                }
                this.status1 = this.files1.length+imgLength;
                this.$refs.file1.value = ''
                if(this.status1 > 0){
                	this.showText1 = false;
                }
            },
            fileChanged2() {
                const list = this.$refs.file2.files;
                let imgLength = this.addDetails[1].img.length;
               	let test = this.files2.length;
               	if(test > 0){
               		this.showText1 = false;
               	}
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files2.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText2 = false;
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files2.push(item);
                            }
                        }
                    }   
                }
                this.status2 = this.files2.length+imgLength;
                this.$refs.file2.value = ''
                if(this.status2 > 0){
                	this.showText2 = false;
                }
            },
            fileChanged3() {
                const list = this.$refs.file3.files;
                let imgLength = this.addDetails[2].img.length;
               	let test = this.files3.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files3.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText3 = false;
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files3.push(item);
                            }
                        }
                    }   
                }
                this.status3 = this.files3.length+imgLength;
                this.$refs.file3.value = ''
                if(this.status3 > 0){
                	this.showText3 = false;
                }
            },
            fileChanged4() {
                const list = this.$refs.file4.files;
                let imgLength = this.addDetails[3].img.length;
               	let test = this.files4.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files4.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText4 = false;	
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files4.push(item);
                            }
                        }
                    }   
                }
                this.status4 = this.files4.length+imgLength;
                this.$refs.file4.value = ''
                if(this.status4 > 0){
                	this.showText4 = false;
                }
            },
            fileChanged5() {
                const list = this.$refs.file5.files;
                let imgLength = this.addDetails[4].img.length;
               	let test = this.files5.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files5.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText5 = false;	
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files5.push(item);
                            }
                        }
                    }   
                }
                this.status5 = this.files5.length+imgLength;
                this.$refs.file5.value = ''
                if(this.status5 > 0){
                	this.showText5 = false;
                }
            },
            fileChanged6() {
                const list = this.$refs.file6.files;
                let imgLength = this.addDetails[5].img.length;
               	let test = this.files6.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files6.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                 this.showText6 = false;	
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files6.push(item);
                            }
                        }
                    }   
                }
                this.status6 = this.files6.length+imgLength;
                this.$refs.file6.value = ''
                if(this.status6 > 0){
                	this.showText6 = false;
                }
            },
            fileChanged7() {
                const list = this.$refs.file7.files;
                let imgLength = this.addDetails[6].img.length;
               	let test = this.files7.length;
                if(test <= this.maxNum){
                    for (let i = 0; i < list.length; i++) {
                        if (!this.isContain1(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                file: list[i]
                            }
                            if(this.files7.length == (this.maxNum-imgLength)){
                                this.show = true;
                                this.message = '最多上传5张图片';
                                this.clearStorage();
                                this.showText7 = false;	
                            } else {
                                this.html5Reader(list[i], item); 
                                this.files7.push(item);
                            }
                        }
                    }   
                }
                this.status7 = this.files7.length+imgLength;
                this.$refs.file7.value = ''
                if(this.status7 > 0){
                	this.showText7 = false;
                }
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain1(file) {
                this.files1.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            isContain2(file) {
                this.files2.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
             isContain3(file) {
                this.files3.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            isContain4(file) {
                this.files4.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            isContain5(file) {
                this.files5.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            isContain6(file) {
                this.files6.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            isContain7(file) {
                this.files7.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            },
			submit() {
                /*if(this.textarea.length < 15){
                    this.isPopup = true;
                    this.messInfo = '请输入不少于15个字';
                    this.clearStorage();
                    return false;
                }*/

                let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                let userId = userInfo.userId;
                let token = userInfo.token;
                let userCode = userInfo.userCode;
                let eaId = userInfo.eaId;
            	let TeamData = JSON.stringify({
            		'userId' : userId,
            		'outpatientNum' : this.caseNum,
            		'referralTime' : this.createTime,
            		'caseName':this.icdName,
            		'fromSource':2,
            		'caseManageId':this.caseManageId,
            		'hospitalCode':this.orgCode,
            		'icdId':this.icdId,
            	})    	
            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{token:token, infoType:530001, jsonValue:TeamData},{emulateJSON:true}).then(response =>{
            		console.log(response)
            		if(response.body.state == 'suc'){
            			for (var i = 0; i < this.dictCodeArr.length; i++) {
            				if(this.dictCodeArr[i].dictName == '现病史'){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files1.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[0].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[0].img[j].caseInfoId+",";
		                            		console.log(caseInfoId)
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394445686704128100001",
						            		'textArea':this.addDetails[0].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				}else if(this.dictCodeArr[i].dictName == "临床表现"){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files2.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[1].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[1].img[j].caseInfoId+",";
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394481571072000100001",
						            		'textArea':this.addDetails[1].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				}else if(this.dictCodeArr[i].dictName == "辅助检查"){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files3.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[2].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[2].img[j].caseInfoId+",";
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394515479922688100001",
						            		'textArea':this.addDetails[2].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				}else if(this.dictCodeArr[i].dictName == "特殊检查"){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files4.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[3].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[3].img[j].caseInfoId+",";
		                            		console.log(caseInfoId)
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394530066663424100001",
						            		'textArea':this.addDetails[3].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				}else if(this.dictCodeArr[i].dictName == "诊断"){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files5.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[4].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[4].img[j].caseInfoId+",";
		                            		console.log(caseInfoId)
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394543755823104100001",
						            		'textArea':this.addDetails[4].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				}else if(this.dictCodeArr[i].dictName == "治疗"){
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files6.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[5].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[5].img[j].caseInfoId+",";
		                            		console.log(caseInfoId)
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394557386262528100001",
						            		'textArea':this.addDetails[5].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
											console.log(response)
										},response => {
											
										})
										    	    
		                            }else {
		                                this.sucMessage ="添加失败"
		                                this.sucShow = true;
		                                this.clearStorage();
		                                this.uploading = false;
		                            }
				                }
            				} else {
            					let type = response.body.casePicType;
		            			let moduletypeId = response.body.caseManageId;		
		            			const formData = new FormData();
		            			this.files7.forEach((item) => {
				                    formData.append('picArrayFile', item.file);
				                    formData.append('userId', userId);
				                    formData.append('eaId', eaId);
				                    formData.append('userCode', userCode);
				                    formData.append('type', type);
				                    formData.append('moduletypeId', moduletypeId);
				                })
				                const xhr = new XMLHttpRequest();
				                xhr.upload.addEventListener('progress', this.uploadProgress, false);
				                xhr.open('POST', this.src, true);
				                this.uploading = true;
				                xhr.send(formData);
				                xhr.onload = () => {
		                            let judge = xhr.response;
		                            let jsoObj = JSON.parse(judge);
		                            let vm = this;
		                            let fileIds = jsoObj.fileIds;
		                            let caseInfoValue = '';
		                            if(jsoObj.picUploadState = 'add_suc'){
		                            	let strSplit = jsoObj.fileIds;
		                            	for (var j = 0; j < vm.addDetails[6].img.length; j++) {
		                            		let caseInfoId = vm.addDetails[6].img[j].caseInfoId+",";
		                            		console.log(caseInfoId)
		                            		caseInfoValue += caseInfoId;
		                            	}
		                            	caseInfoValue+=strSplit
		                            	let data = JSON.stringify({
						            		'fileIds' : caseInfoValue,
						            		'dictCode' : "1394572228855808100001",
						            		'textArea':this.addDetails[6].textarea,
						            		'flagInfo':'up',
						            		'caseManageId':moduletypeId
						            	})
						            	this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
											token:token, 
											infoType:530002, 
											jsonValue:data 
										},{emulateJSON:true})
										.then(response => {
											if (response.body.state == 'err_saveCaseThi_001') {
												this.show = true;
												this.message = '系统异常';
												this.clearStorage();
											}else if (response.body.state == 'err_saveCaseThi_002') {
												this.show = true;
												this.message = '参数异常';
												this.clearStorage();
											} else {
												this.isLoginOut = false;
												this.show = true;
												this.message = '修改成功';
												this.clearStorage();
												this.$store.state.icdName = '';
												this.$store.state.icdId = "";
												this.$store.state.orgName = "";
												this.$store.state.orgCode = "";
												let time = setTimeout(()=>{		
													this.$router.go(-1);
									            },1500);
												
											}
										},response => {
											
										})
										    	    
		                            }
				                }
            				}			
							
						}		
            		}
            	})

            }
		},
		watch:{
			filesArr:function () {
				this.filesArr = this.filesArr;
			},
			icdName:function () {
				if( this.$store.state.icdName == '' ){
					this.icdName = this.list.caseName;
				}else{
					this.icdName = this.$store.state.icdName;
				}
			},
			createTime:function () {
				if( this.$store.state.createTime == '' ){
					this.createTime = this.list.createTime.replace('T',' ');
				}else{
					this.createTime = this.$store.state.createTime;
				}
			},
			caseNum:function () {
				this.$store.state.caseNum = this.caseNum;
			},
			orgName:function () {
				if( this.$store.state.orgName == '' ){
					this.orgName = this.list.orgName;
				}else{
					this.orgName = this.$store.state.orgName;
				}
			},

		},
		components: {
			Heads,
			popup,
			uploader
		}
	}
</script>
<style>
	.healthy-case-add-details {
		font-size: .28rem;
		padding-top: .84rem;
	}
	.healthy-case-add-details-content {
		width: 100%;
		height: 100%;
		position: relative;
		background: #f3f3f3;
	}
	.healthy-case-add-details-content .right {
		float: right;
	}
	.healthy-case-add-details-content input {
		text-align: right;
		font-size: .28rem;
	}
	.case-details-time {
		padding: 0.15rem;
		background: #fff;
	}
	.case-details-time ul li {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.case-details-time ul li:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.case-details-time ul li p {
		padding-bottom: .2rem;
	}
	.case-details-record-content textarea {
	    resize: none;
	    border: 0 none;
	    outline: none;
	    display: block;
	    width: 100%;
	    height: 1.2rem;
	    color: #333;
	    font-size: 0.24rem;
	    overflow: hidden;
	    background: #f3f3f3;
	    font-size: .28rem;
	    border-radius: 0;	
	    padding: .1rem; 
	}
	.case-details-record {
		padding: 0 0.15rem;
		background: #fff;
		margin-top: .2rem;
	}
	.case-details-record-title {
		padding: .2rem 0;
		border-bottom: .01rem solid #f0f0f0;
	}
	.case-details-record-content p {
		padding: .2rem 0;
	}
	.case-details-record-img {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
		border: .01rem dashed #f0f0f0;
	}
	.case-details-record-img img {
		width: 100%;
		height: 100%;
	}
	.caseInfoValue {
		width: 100%;
		height: 0.8rem;
		line-height: .9rem;
		color: #999;
	}
	/* 
   图片预览CSS
	*/
	.server-topBar{
		position: absolute;
		width: 100%;
		left: 0;
		height: 44px;
		background: #000;
		background: url(../../../../assets/image/head-back.png) no-repeat #000 left 0.1rem center;
		background-size: 7%;
		text-align: center;
		line-height: 44px;
		color: #fff;
		font-size: 18px;
	}
	.mui-preview-image.mui-fullscreen {
		position: fixed;
		z-index: 20;
		background-color: #000;
	}
	.mui-preview-header,
	.mui-preview-footer {
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 10;
	}
	.mui-preview-header {
		height: 44px;
		bottom: 50px;
	}
	.mui-preview-footer {
		height: 50px;
		bottom: 0px;
	}
	.case-details-time ul li a {
		color: #333;
	}
	.mui-preview-header .mui-preview-indicator {
		display: block;
		line-height: 25px;
		color: #fff;
		text-align: center;
		margin: 15px auto 0;
		width: 70px;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 12px;
		font-size: 16px;
	}
			
	.mui-preview-image {
		display: none;
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	.mui-preview-image.mui-preview-in {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}
	.mui-preview-image.mui-preview-out {
		background: none;
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}
	.mui-preview-image.mui-preview-out .mui-preview-header,
	.mui-preview-image.mui-preview-out .mui-preview-footer {
		display: none;
	}
	.mui-zoom-scroller {
		position: absolute;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		-webkit-backface-visibility: hidden;
	}
	.mui-zoom {
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}
	.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
		width: 100%;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
		display: inline-table;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
		display: table-cell;
		vertical-align: middle;
	}
	.mui-preview-loading {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: none;
	}
	.mui-preview-loading.mui-active {
		display: block;
	}
	.mui-preview-loading .mui-spinner-white {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -25px;
		margin-top: -25px;
		height: 50px;
		width: 50px;
	}
	.mui-preview-image img.mui-transitioning {
		-webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
		transition: transform 0.5s ease, opacity 0.5s ease;
	}
	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.mui-fullscreen {
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	}
	.mui-slider {
	    position: relative;
	    z-index: 1;
	    overflow: hidden;
	    width: 100%;
	}
	.mui-fullscreen.mui-slider .mui-slider-group {
		height: 100%;
	}
	.mui-slider .mui-slider-group {
	    font-size: 0;
	    position: relative;
	    -webkit-transition: all 0s linear;
	    transition: all 0s linear;
	    white-space: nowrap;
	}
	.mui-hidden {
	    display: none!important;
	}
	.mui-slider .mui-slider-group .mui-slider-item {
	    font-size: 14px;
	    position: relative;
	    display: inline-block;
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	    white-space: normal;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
	    width: 100%;
	}
	.preservation {
		width: 100%;
		height: 1rem;
		background-color: #009983;
		position: fixed;
		bottom: 0;
		font-size: .32rem;
		text-align: center;
		line-height: 1rem;
	}
	.preservation a {
		color: #fff;
	}
	.consult-uploader-img {
       float: left;
       margin-right: .1rem;
    }
    .consult-uploader-img .file-list {
        padding-bottom: 0.3rem;
        border-top: 0.01rem solid #f3f3f3;
        border-bottom: 0.01rem solid #f3f3f3;
    }
    .consult-uploader-img .file-list:after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
        font-size: 0;
    }
    .consult-uploader-img .file-list .file-item {
        width: 1.3rem;
        height:1.3rem;
        position: relative;
        overflow: hidden;
        float: left;
        margin-top: 0.2rem;
        border: 0.02rem dashed #e6e6e6;
    }
    .consult-uploader-img .file-list .file-text {
    	float: left;
    	width: 65%;
    	font-size: 0.28rem;
        padding-left: .1rem;
    }
    .consult-uploader-img .file-list .file-text p:first-of-type{
    	color: #666;
    	margin-top: 0.45rem;
        padding: 0;
    }
   .consult-uploader-img .file-list .file-text p:last-of-type{
    	color: #999;
    	font-size: 0.26rem;
        margin-top: 0.2rem;
        padding: 0;
    }
    .consult-uploader-img .file-list .file-item img {
        width: 100%;
	}

	.consult-uploader {
       width: 100%;
    }
    .consult-uploader .file-list {
        padding-bottom: 0.3rem;
        border-top: 0.01rem solid #f3f3f3;
        border-bottom: 0.01rem solid #f3f3f3;
    }
    .consult-uploader .file-list:after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
        font-size: 0;
    }
    .consult-uploader .file-list .file-item {
        width: 1.3rem;
        height:1.3rem;
        margin-right: 0.15rem;
        position: relative;
        overflow: hidden;
        float: left;
        margin-top: 0.2rem;
        border: 0.02rem dashed #e6e6e6;
    }
    .consult-uploader .file-list .file-text {
    	float: left;
    	width: 45%;
    	font-size: 0.28rem;
        padding-left: .1rem;
    }
    .consult-uploader .file-list .file-text p:first-of-type{
    	color: #666;
    	margin-top: 0.45rem;
        padding: 0;
    }
    .consult-uploader .file-list .file-text p:last-of-type{
    	color: #999;
    	font-size: 0.26rem;
        margin-top: 0.2rem;
        padding: 0;
    }
    .consult-uploader .file-list .file-item img {
        width: 100%;
    }
    .file-remove {
        position: absolute;
        width: 0.35rem;
        height: auto;
        right: 0;
        top: 0;
    }
    .consult-uploader .add span {
        margin-top: 0.1rem;
        margin-left: 0.1rem;
        display: block;
        width: 1rem;
        height: 1rem;
        overflow: hidden;
    }
    .consult-uploader .add span img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .consult-uploader .upload-func {
        padding: 0 0.3rem;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0.2rem;
    }
    .consult-uploader .upload-func .progress-bar {
        flex-grow: 1;
    }
    .consult-uploader .upload-func .operation-box button {
        display: block;
        width: 100%;
        height: 0.82rem;
        border-radius: 6px;
        background: #439685;
        font-size: 0.33rem;
        text-align: center;
        line-height: 0.82rem;
        border: 0 none;
        outline: none;
        color: #fff;
        border: none;
    }
    .consult-uploader > input[type="file"] {
        display: none;
    }
    .case-details-record-content {
    	display: none;
    }
</style>