<template>
    <LoadingIcon  v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle"/>
    <Button v-else-if="props.buttonName == 'edit'" 
        type="button" @click="handleAuthClick">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="google-login-btn shadow-lg" @click="check_bindable_or_upgrade">{{$t('settings.platform.connect_with_youtube')}}</Button>
    
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
 
import {loadScriptAsyncDefer} from '@/libs/loadScript.js';
import { check_activated_platform } from '@/api/user_subscription'
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const fetchingData = ref(false)

const props = defineProps({
  busName: String,
  buttonName: String
});


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
            'clientId':import.meta.env.VITE_GOOGLE_CLIENT_ID,
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
            eventBus.emit(props.busName ,resp)
        });
    }
}

const check_bindable_or_upgrade = () => {
    fetchingData.value = true
    check_activated_platform().then(res=>res.data).then(res=>{
        console.log(res)
        fetchingData.value = false
        if (res.can_bind) {
            handleAuthClick()
        } else {
            eventBus.emit("showUpgradeModal", {"activated_platform_amount": res.activated_platform_amount})
        }
    })
}
</script>

<style scoped>
.google-login-btn { 
    border: 1px solid rgb(119, 0, 0);
    background-color: #c90000;
    padding: auto;
    max-width: 300px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-size: 16px;
}

a {
    position: absolute;
    margin-top:6px;
} 

a:hover {
    color: black;
    text-decoration:none; 
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
