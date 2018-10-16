<template>
    <div class='cancelDiv'>
        <div class='cancelMsg'>
            <div class='warning'>
                <img src='../../assets/image/my/red-gantanhao.png'/>
                警告
                <p class='hint'>{{ hint }}</p>
                <p class='hint'>{{ hint2 }}</p>
            </div>
            <div class='cancelBtnDiv'>
                <div class='logout' @click='logOutUser'>
                    果断注销
                </div>
                <div style='height: 0.6rem; width:1px; background:#e6e6e6; margin-top:0.15rem'></div>
                <div class='noLogout'  @click="noLogout">
                    考虑一下
                </div>
            </div>
        </div>
         <div style='opacity: 0.5; height:100%; width: 100%;background: #000; position: fixed; top: 0;z-index: 0;' @touchmove.prevent></div> 
    </div>  
   
</template>
<script>
    export default {
        data(){
            return {
                hint: "注销账号会清除账号下的所有数据!",
                hint2: "您确认要注销吗？"
                
            }
        },
        methods:{
            noLogout(){
                this.$emit("nolog")
            },
            logOutUser(){
                this.$emit("logOutUser")
            }
        }
        
    }

</script>
<style>
#app,#my{
    width:100%;
    height: 100%;
}
    .cancelDiv{
        width: 100%;
        height: 100%;
        padding:.1px;
    }
    .cancelMsg{
        width: 94%;
        height: 3rem;
        background: #fff;
        margin: 60% auto 0 auto;
        border-radius: 10px;
        color: #ff5454;
        z-index: 1;
        position: relative;
        
    }
    .warning{
        text-align: center;
        padding:0.2rem 0 0 0;
        font-size: .4rem;
        border-bottom: 1px solid #e6e6e6;
        font-weight: bold;
    }
    .warning img{
       width:6%;
       vertical-align: middle;
    }
    .hint{
        margin: 0.1rem 0 0.15rem 0;
        font-size:0.30rem;
        font-weight:normal;
    }
    .cancelBtnDiv{
          display: flex;
    }
    .logout, .noLogout{
       width: 49%;
       text-align: center;
       font-size:0.3rem;
       line-height: 0.9rem;
       height: 0.9rem;
    }
    .noLogout{
        color:#010101;
    }
    .logout{
        color: #999;
    }

    
</style>