<template>
	<div id="a">
		<div class="header_box">
			<div class="input_box">
				<ul class="search_ul">
					<li>
						<img src="../../assets/image/doctor/small_search.png"/>
						<form action="" onsubmit="return false" id="searchSer">
							<input type="search" id="searchSer" @blur="blurFn()"  class="input_text" @input="closeShow_fn()" @keypress="searchFn" @focus="focusFn"  v-model="textValue"/>
							<img src="../../assets/image/doctor/search_close.png"  v-show="flag" @click="clear_fn" class="close_btn_H"/>
						</form>
						 
						
					</li>
					<li @click="headback"><p class="cancel">取消</p></li>
				</ul>
				
			</div>
			
			<!--历史纪录-->
			<div class="historyDiv" v-show="historyBox">
				<p class="historyLi">历史记录</p>
				<ul class="searchHistory" >
					
					<li class="history" v-for="item in localData" @click="clickLi(item)">{{ item }}</li>
				
				</ul>
				<span class="delSpan" @click="delSpan"><img src="../../assets/image/doctor/delete.png" alt="" />&nbsp;清空历史记录</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				active:"",
				textValue: '',
				flag: false,
				localData: '',
				historyBox: false
			}
		},
		created(){
			this.$store.searchValue = "";
		},
		methods: {
			
			//后退一步
			headback (){
				active:false;
				this.$router.go(-1);
			},
			//回车进行搜索
			searchFn(){
				
				let keycode = event.keyCode;
				if(keycode == 13){
					
					if(this.textValue != ''){
						let docVal = '';
						let localDocVal = localStorage.docSearchVal;
						if( localDocVal != undefined){
							let localArr = localDocVal.split(",");
							let flagSearch = false;
							for(let i = 0; i < localArr.length; i++ ){
								if(localArr[i] == this.textValue){
									flagSearch = true;
									
								}
							}
							if(!flagSearch){
								docVal = localDocVal + "," + this.textValue;
								localStorage.docSearchVal = docVal;
							}
							
						}else{
							localStorage.docSearchVal = this.textValue;
						}
						
						this.$store.searchValue = this.textValue;
						this.$router.push('/doctor/doctorSearch');
					}

				}else{
					return ;
				}
			},
			
			//点击关闭清除
			clear_fn (){
				this.textValue= '';
				this.flag = false;
			},
			//输入的时候close 显示以及失去焦点时候隐藏
			closeShow_fn (){
					
					if(this.textValue != ''){
						this.flag = true
					}else if(this.textValue == ''){
						this.flag = false
					}
			

			},
			blurFn(){
				if(this.textValue != ''){
						this.flag = true
					}else if(this.textValue == ''){
						this.flag = false
					}
			},
			
			//获取焦点时
			focusFn() {
				
				if(localStorage.docSearchVal != undefined){
					this.localData = localStorage.docSearchVal.split(",");
					this.historyBox = true;
				}else{
					this.historyBox = false;
					this.localData = '';
				}
			},
			
			//点击哪个
			clickLi (text){
				this.$store.searchValue = text;
				this.$router.push('/doctor/doctorSearch');
			},
			
			//清除数据
			delSpan(){
				localStorage.removeItem('docSearchVal');
				this.localData = '';
			}
			
			
		}
	}
</script>

<style scoped>
	#a{
		background: #F7F7F7;
		height: 100%;
	}
	#doctor{
		height: 100%;
	}
	.header_box{
		width: 100%;
		height: 0.84rem;
		background: #fff;
		border-bottom: 1px solid #eee;
		
	}
	.input_box{
		width: 94%;
		height: 100%;
		background: #fff;
		margin: 0 auto;
		
	}
	/*搜索框*/
	.search_ul li:first-of-type{
		width: 89%;
		border-radius: 1rem;
		-webkit-border-radius: 1rem;
		background: #EEEEEE;
		margin-top: 0.07rem;
		height: 0.6rem;
	}
	.search_ul li:first-of-type img{
		width: 0.5rem;
		position: relative;
		left: 0.2rem;
		top: 0.06rem;
	}
	.search_ul li:first-of-type img.close_btn_H{
		left: 0.8rem;
	}
	.input_text{
		width: 75%;
		background: #EEEEEE;
		height: 0.5rem;
		position: relative;
		left: 0.4rem;
    	top: -0.1rem;
    	
	}
	form{
		height: 100%;
		display: inline-block;
		width: 90%;
	}
	::-webkit-search-cancel-button{
		display: none;
	}
	/*取消按钮*/
	.search_ul li:nth-of-type(2){
		width: 11%;
	}
	.cancel{
		color: #999;
		line-height: 0.84rem;
		width: 100%;
		text-align: right;
	}
	.search_ul{
		width: 100%;
		
	}
	.search_ul li{
		float: left;
	}
	
	/*历史记录*/
	.searchHistory{
		width: 94%;
		margin: 0 auto;
		color: #333;
	}
	.historyLi{
		color: #999;
		font-size: 0.26rem;
		width: 94%;
		margin: 0 auto;
	}
	.searchHistory li{
		height: 0.7rem;
		line-height: 0.7rem;
	}
	.history{
		font-size: 0.28rem;
		border-bottom: 1px solid #eee;
	}
	.delSpan{
		text-align: center;
		display: inline-block;
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.26rem;
		color: #999;
	}
	.delSpan img{
		width: 4%;
		vertical-align: middle;
	}
	.historyDiv{
		background: #fff;
	}
</style>