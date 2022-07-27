<template>
    <Button v-if="props.buttonName == 'edit'" 
        type="button" @click="checkLoginState">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="insta-default" @click="check_bindable_or_upgrade">{{$t('settings.platform.connect_with_instagram')}}</Button>
    <LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle" v-show="fetchingData"/>
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed, defineProps } from "vue";
import loadScript from '@/libs/loadScript.js';
import { check_activated_platform } from '@/api/user_subscription'
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const fetchingData = ref(false)

const props = defineProps({
  busName: String,
  buttonName: String
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
        }
    },{scope: 'public_profile,email,pages_read_engagement,pages_read_user_content,pages_manage_engagement,pages_messaging,instagram_basic,instagram_manage_messages,pages_manage_metadata'});
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

const check_bindable_or_upgrade = () => {
    fetchingData.value = true
    check_activated_platform().then(res=>res.data).then(res=>{
        console.log(res)
        fetchingData.value = false
        if (res.can_bind) {
            checkLoginState()
        } else {
            eventBus.emit("showUpgradeModal", {"activated_platform_amount": res.activated_platform_amount})
        }
    })
}

</script>

<style scoped>

.insta-default {
    width:300px;
    height:42px;
    font-size: 17px;
    background-color: #E33E5C;
    border: 1px solid #832f3fea;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    color: #FFF;
    border-radius: 42px 42px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
}

.insta-default:hover {
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
}
.insta-default span i {
    color: #FFF;
    font-size: 18px;
}
.body-middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}
</style>
