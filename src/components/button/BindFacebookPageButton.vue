<template>
    <Button type="button" @click="checkLoginState">Connect with Facebook</Button>
    
</template>

<script setup>
import loadScript from '@/libs/loadScript.js';
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
  busName: String,
});

onMounted(()=>{
    //facebook SDK use eval() at backend
    loadScript("https://connect.facebook.net/en_US/sdk.js",()=>{
        console.log("FB SDK loaded")
        window.fbAsyncInit = function() {
            FB.init({
                appId: import.meta.env.VITE_APP_FB_APP_ID, 
                cookie: true,
                xfbml: true,
                version: "v13.0",
            });
        }
    });
})

onUnmounted(()=>{
    window.checkLoginState = undefined
})
const login = () => {
    console.log("login")
    window.FB.login(response => {
        console.log(response)
        if (response.status === 'connected') {
            const payload = {'accessToken':response.authResponse.accessToken}
            eventBus.emit(props.busName, payload)
        } else {
            alert('Login Fail')
        }
    },{scope: 'public_profile,email,pages_read_engagement,pages_read_user_content,pages_manage_engagement,pages_messaging'});
}

const checkLoginState = () => {
    console.log('checkloginstate')
    window.FB.getLoginStatus(response=>{
        if (response.status === 'connected') {
            window.FB.logout(response=> {
                console.log("logout")
                login();
            });
        } else {
            login();
        }
    });
}
</script>
