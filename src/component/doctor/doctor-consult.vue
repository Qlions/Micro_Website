<template>
  <div class="consult" :style="{top:consultTop}" >
      <div class="health-describe-content">
        <h2>健康现状描述</h2>
        <textarea name="" placeholder="请详细描述您的问题，包括身体状况、疾病和症状等，我们将会尽快为您服务，并且保证您的隐私安全" v-model="textarea"></textarea>
      </div>
      <uploader :src="'/webapiProxy/webapi/picAppUpload.action'" :textarea="textarea" :maxNum="3">

      </uploader>
  </div>
</template>
<script>
  import uploader from './doctor-uploader-img.vue'
  export default {
  	props: {
			hasError:""
		},
    data() {
      return {
        textarea:"",
        consultTop:""
      }
    },
    components: {
      uploader
    },
    methods:{
    	listenToMyBoy (somedata) {
				this.hasError = somedata;
			}
    	
    },   	
    mounted (){
				if(sessionStorage.getItem('key_head') == 1){
					this.consultTop = 0.8+'rem';
				}else {
					this.consultTop = 1.88+'rem';
				}
		},
		updated () {
			if(sessionStorage.getItem('key_head') == 1){
					this.consultTop = 0.8+'rem';
			}else {
				this.consultTop = 1.88+'rem';
			} 
		}
}
</script>
<style>
  .consult {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .health-describe-content {
    width: 100%;
    height: 4.55rem;
    background: #fff;
  }
  .health-describe-content h2 {
    font-size: .38rem;
    padding: 0.2rem 0.3rem;
    border-bottom: 0.01rem solid #f3f3f3;
    color: #999;
  }
  .health-describe-content textarea {
    resize: none;
    border: 0 none;
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.22rem 0.64rem 0 0.3rem;
    color: #333;
    font-size: 0.24rem;
    overflow: hidden;
  }
</style>