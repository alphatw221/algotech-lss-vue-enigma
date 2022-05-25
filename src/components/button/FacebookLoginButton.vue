<template>

    <!-- <button @click="login">
        Login with Facebook
    </button> -->

    <!-- <div id="fb-root"></div> -->
    <div id="spinner">
        <div class="fb-login-button" 
            data-width="310px"
            data-size="large" 
            data-button-type="login_with" 
            data-layout="default" 
            data-auto-logout-link="false" 
            data-use-continue-as="true" 
            scope="public_profile,email" 
            onlogin="checkLoginState()">
        </div>
    </div>
    
</template>

<script>
export default {
    props:{
        busName: String
    },
    setup(){
        window.fbAsyncInit = function() {
            FB.init({
                // appId: process.env.VUE_APP_FB_APP_ID,  
                appId: "967598017063136", 
                cookie: true,
                xfbml: true,
                version: "v13.0",
            });
        }

        // window.FB.init({
        //     // appId: process.env.VUE_APP_FB_APP_ID,  
        //     appId: "967598017063136", 
        //     cookie: true,
        //     xfbml: true,
        //     version: "v13.0",
        // });
    },
    mounted(){
        //facebook SDK use eval() at backend
        window.checkLoginState=() => {
            console.log('checkloginstate')
            window.FB.getLoginStatus(response => {
                if (response.status === 'connected') {
                    const payload = {'accessToken': response.authResponse.accessToken}
                    this.eventBus.emit(this.busName, payload)
                } 
            });
        }
        // var finished_rendering = function() {
        // console.log("finished rendering plugins");
        // var spinner = document.getElementById("spinner");
        // spinner.removeAttribute("style");
        // spinner.removeChild(spinner.childNodes[0]);
        // }
        // FB.Event.subscribe('xfbml.render', finished_rendering);
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
