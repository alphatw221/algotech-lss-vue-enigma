<template>
    <Button type="button" @click="handleAuthClick">Connect with YouTube</Button>
    
    
</template>

<!-- <script>
export default {
    data(){
        return {
            scopes:[
                "https://www.googleapis.com/auth/youtube"+"%20",
                "https://www.googleapis.com/auth/userinfo.email"+"%20",
                "https://www.googleapis.com/auth/userinfo.profile"
            ],
            callback_uri:"http://localhost:8000/api/user-subscription/bind_youtube_channels_callback",
            redirect_uri:"https://localhost:8080/",
            redirect_route:"test_page1",
            response_type:"code",
            client_id:"536277208137-okgj3vg6tskek5eg6r62jis5didrhfc3.apps.googleusercontent.com",
            access_type:"offline",
        }
    },
    computed:{
        googleLoginHyperReference(){
            let href=`https://accounts.google.com/o/oauth2/v2/auth?`
            href+=`redirect_uri=${this.callback_uri}&`
            href+=`response_type=${this.response_type}&`
            href+=`client_id=${this.client_id}&`
            href+=`access_type=${this.access_type}&`
            href+=`state=${JSON.stringify({
                redirect_uri:this.redirect_uri,
                redirect_route:this.redirect_route,
                callback_uri:this.callback_uri,
                user_subscription_id:1,
                })}&`

            href+=`scope=`
            this.scopes.forEach(value=>{
                href+=value
            })
            return href
        }
    },
}

</script> -->
<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
 
import {loadScriptAsyncDefer} from '@/libs/loadScript.js';
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube';

onMounted(()=>{
    window.handleClientLoad = ()=> {
        // Load the API's client and auth2 modules.
        // Call the initClient function after the modules load.
        gapi.load('client:auth2', initClient);
    }
    loadScriptAsyncDefer('https://apis.google.com/js/api.js?onload=handleClientLoad')
    const initClient = () => {
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.auth2.init({
            'clientId':import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
        });
    }
})





const handleAuthClick = () => {
    
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();

    } else {
        // User is not signed in. Start Google auth flow.
        // GoogleAuth.signIn();
        GoogleAuth.grantOfflineAccess().then(function(resp) {
            eventBus.emit('addYoutubeChannels',resp)
        });
    }
}
</script>

<style scoped>
.google-login-btn {
    font-family: sans-serif;
    background-color: rgb(255, 255, 255);
    width:228px;
    height:40px;
    font-weight: 500; 
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid rgb(95, 95, 95);
}

a{
    position: absolute;
    margin-top:6px;
} a:hover{
    color: black;
    text-decoration:none; 
}
</style>
