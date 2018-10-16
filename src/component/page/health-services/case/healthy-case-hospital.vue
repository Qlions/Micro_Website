<template>
	<div class="case-name-list">
		<div class="case-name-list-head">
			<div class="case-name-list-head-seach">
				<img src="../../../../assets/image/server/fangdajing.png"/>
				<input type="text" placeholder="请输入所属医院" v-model="SearchCaseName" id="submit">
			</div>
			<div class="case-name-list-head-cancel" @click="cancel">
				取消
			</div>
		</div>
		<scroller style="width:95%;top:.84rem;"
			:on-refresh="refresh"
			:on-infinite="infinite"
    	>
			<div class="case-name-list-content">
				<ul>
					<li class="case-name-list-content-item" v-for="item in listData" @click="postData(item.orgName,item.orgCode)">
						{{ item.orgName }}
					</li>
				</ul> 
			</div>
		</scroller>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				SearchCaseName: "",
				listData: "",
				listDataNo: true,
				page:1,
				rows:20			
			}
		},
		methods : {
			submit () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                let userId = userInfo.userId;
                let token = userInfo.token;
                let data = JSON.stringify({
                	'page':1,
                	'rows':20,
            		'orgName' : this.SearchCaseName,
            	})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111128, 
					jsonValue:data
				},{emulateJSON:true})
				.then(response => {
					if( response.body.length > 0 ){
						this.listData = response.body;		
					}else {
						this.listData = [];
					}
					//this.dictCodeArr = response.body.listInfo;
				})
				
			},
			getList () {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                let userId = userInfo.userId;
                let token = userInfo.token;
                let data = JSON.stringify({
                	'page':this.page,
                	'rows':this.rows,
            		'orgName' : this.SearchCaseName,
            	})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111128, 
					jsonValue:data
				},{emulateJSON:true})
				.then(response => {
					this.listData = response.body;
					//this.dictCodeArr = response.body.listInfo;
				})
			},
			refresh (done) {  // 上拉刷新
				setTimeout(() => {
					done();
				}, 500)
			},
			infinite (done) {
				let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
                let userId = userInfo.userId;
                let token = userInfo.token;
                let data = JSON.stringify({
                	'page':this.page,
                	'rows':this.rows+30,
            		'orgName' : this.SearchCaseName,
            	})
				this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
					token:token, 
					infoType:111128, 
					jsonValue:data
				},{emulateJSON:true})
				.then(response => {
					setTimeout(() => {	
						this.listData = [];
						this.listData = response.body;
						done(true)				
					}, 500)
					this.rows += 30;
					//this.dictCodeArr = response.body.listInfo;
				})
			},
			postData (orgName,orgCode) {
				this.$router.go(-1);
				this.$store.state.orgName = orgName;
				this.$store.state.orgCode = orgCode;
			},
			cancel () {
				this.$router.go(-1);
			}
		},
		mounted () {
			this.getList ();
			let vm  = this;
			document.getElementById('submit').addEventListener('input', function(e){ 
				vm.submit ();
			}); 
		}
	}
</script>
<style>
	.case-name-list {
		width: 100%;
	}
	.case-name-list-head {
		width: 100%;
		height: .84rem;
		background: #009983;
		padding: 0 0.32rem;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.case-name-list-head-seach {
		background: #fff;
		width: 87%;
		height: 0.58rem;
		float: left;
		margin-top: 0.125rem;
		line-height: .58rem;
		font-size: 14px;
	}
	.case-name-list-head-seach img {
		width: .3rem;
		height: 0.3rem;
		margin: 0 0.1rem;
		float: left;
		margin-top: .13rem;
	}
	.case-name-list-head-cancel {
		width: 13%;
		text-align: right;
		float: left;
		font-size: 14px;
		color: #fff;
		line-height: .84rem;
	}
	.case-name-list-content {
		padding: 0 0.32rem;
	}
	.case-name-list-content-item {
		padding:0.30rem 0;
		font-size: 14px; 
		border-bottom: 1px solid #eaeaea;
		border-top: 1px solid #eaeaea;
	}
	.case-name-list-content-no {
		text-align: center;
	}
	.case-name-list-content-no img {
		width: 5rem;
		margin-top: 1rem;
	}
</style>