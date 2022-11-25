<template>
    <LoadingIcon icon="three-dots" color="1a202c" class="absolute body-middle" v-if="fetchingData"/>

    <Button v-else-if="props.buttonName == 'edit'" 
          @click="bindPage">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
          class="fbBtn shadow-lg " @click="bindPage">{{$t('settings.platform.connect_with_facebook')}}</Button>

    
</template>

<script setup>
import loadScript from '@/libs/loadScript.js';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { conforms } from 'lodash';
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { checkReachChannelLimit } from "@/libs/utils/planLimitController"
import i18n from "@/locales/i18n"

const internalInstance = getCurrentInstance()
const layoutStore = useLSSSellerLayoutStore()
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
        if (response.status === 'connected') {
            const payload = {'accessToken':response.authResponse.accessToken}
            eventBus.emit(props.busName, payload)
        }
    },{scope: 'public_profile,email,pages_read_engagement,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata'});
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

const bindPage = () => {
    let result = checkReachChannelLimit(layoutStore, 'facebook')
    console.log(result)
    if (result) {
        layoutStore.alert.showMessageToast(i18n.global.t('settings.platform.reach_channel_limt_message'))
        return false
    }
    checkLoginState()
}
</script>


<style scoped>

.fbBtn{
    background-color: #3c599b;
    padding: auto;
    max-width: 300px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 600;
}
.body-middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 60px;
    height: 60px;
}
</style>