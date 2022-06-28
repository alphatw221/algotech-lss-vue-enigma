<template>
    <Button type="button" @click="checkLoginState">Connect with Instagram</Button>
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed, defineProps } from "vue";
import loadScript from '@/libs/loadScript.js';
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
  busName: String
});

const is_activated_platform = ref(false)

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
    eventBus.on("activate_instagram", (payload) => {
        is_activated_platform.value = payload
        console.log("activate_instagram")
        console.log(is_activated_platform.value)
    })
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
        }
    },{scope: 'public_profile,email,pages_read_engagement,pages_read_user_content,pages_manage_engagement,pages_messaging,instagram_basic,instagram_manage_messages'});
}

const checkLoginState = () => {
    console.log('checkloginstate')
    if (is_activated_platform.value) {
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
    } else {
        eventBus.emit("showUpgradeModal", true)
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
