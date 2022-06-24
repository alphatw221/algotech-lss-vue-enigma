<template>

    <button 
        class="insta-default" 
        @click="login" >
        <span>Log in With Instagram</span> <v-icon>mdi-instagram </v-icon>
    </button>

    <!-- <div id="fb-root"></div>
    <div >
        <div class="fb-login-button" 
        data-width="" 
        data-size="large" 
        data-button-type="login_with" 
        data-layout="default" 
        data-auto-logout-link="false" 
        data-use-continue-as="false" 
        scope="public_profile,email,pages_read_engagement,pages_show_list,pages_read_user_content,pages_manage_engagement,pages_messaging,instagram_basic,instagram_manage_messages" 
        onlogin="checkLoginState()"></div>
    </div> -->
    
</template>

<script>
export default {
    props:{
        busName:String
    },
    setup(){
        window.FB.init({
            appId: import.meta.env.VITE_APP_FB_APP_ID,
            cookie: true,
            xfbml: true,
            version: "v13.0",
        });
    },
    mounted(){
        //facebook SDK use eval() at backend
        window.checkLoginState=()=>{
            console.log('checkloginstate')
            window.FB.getLoginStatus(response=>{
                if (response.status === 'connected') {
                    const payload = {'token':response.authResponse.accessToken}
                    this.eventBus.emit(this.busName,payload)
                } 
            });
        }
    },
    methods:{
        login(){
            console.log("login")
            window.FB.login(response => {
                console.log(response)
                if (response.status === 'connected') {
                    const payload = {'token':response.authResponse.accessToken}
                    this.eventBus.emit(this.busName,payload)
                } else {
                    alert('Login Fail')
                }
            },{scope: 'public_profile,email,pages_read_engagement,pages_show_list,pages_read_user_content,pages_manage_engagement,pages_messaging,instagram_basic,instagram_manage_messages'});
        }
    }
}
</script>

<style scoped>

.insta-default {
    width:228px;
    height:40px;
    font-size: 17px;
    background-color: #E33E5C;
    border: 1px solid #832f3fea;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    color: #FFF;
    border-radius: 4px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s;
    margin-left:10%; 
}

.insta-default:hover {
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
}
.insta-default span i {
    color: #FFF;
    font-size: 18px;
}
</style>
