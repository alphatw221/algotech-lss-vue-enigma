<template>
    <Button v-if="props.buttonName == 'edit'" 
        type="button" @click="checkLoginState">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="fbBtn" @click="checkLoginState">{{$t('settings.platform.connect_with_facebook')}}</Button>
    
</template>

<script setup>
import loadScript from '@/libs/loadScript.js';
import { conforms } from 'lodash';
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
  busName: String,
  buttonName: String
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
    eventBus.on("activate_facebook", (payload) => {
        is_activated_platform.value = payload
        console.log("activate_facebook")
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
    },{scope: 'public_profile,email,pages_read_engagement,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata'});
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

.fbBtn{
    background-color: #3c599b;
    padding: auto;
    width: 300px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 600;
}
</style>