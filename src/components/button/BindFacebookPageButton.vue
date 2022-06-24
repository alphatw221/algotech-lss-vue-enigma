<template>

    <!-- <button @click="login">
        Login with Facebook
    </button> -->

    <div id="fb-root"></div>
    <div class="ma-5">
        <div class="fb-login-button" 
        data-width="" 
        data-size="large" 
        data-button-type="login_with" 
        data-layout="default" 
        data-auto-logout-link="false" 
        data-use-continue-as="false" 
        scope="public_profile,email,pages_read_engagement,pages_show_list,pages_read_user_content,pages_manage_engagement,pages_messaging,instagram_basic,instagram_manage_messages" 
        onlogin="checkLoginState()"></div>
    </div>
    
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
                    const payload = {'accessToken':response.authResponse.accessToken}
                    this.eventBus.emit(this.busName,payload)
                } 
            });
        }
    },
    unmounted(){
        window.checkLoginState = undefined
    },
    methods:{
        // login(){
        //     console.log("login")
        //     // window.FB.init({
        //     //     appId: process.env.VUE_APP_FB_APP_ID,   
        //     //     cookie: true,
        //     //     xfbml: true,
        //     //     version: "v13.0",
        //     // });
        //     window.FB.login(response => {
        //         console.log(response)
        //         // if (response.status === 'connected') {
        //         //     const payload = {'token':response.authResponse.accessToken}
        //         //     this.eventBus.emit(this.busName,payload)
        //         // } else {
        //         //     // The person is not logged into your webpage or we are unable to tell. 
        //         // }
        //         window.FB.logout();
        //     },{scope: 'public_profile,email'});
        // }
    }
}
</script>
