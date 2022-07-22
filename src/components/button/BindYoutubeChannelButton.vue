<template>
    <Button v-if="props.buttonName == 'edit'" 
        type="button" @click="checkLoginState">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="google-login-btn" @click="checkLoginState">{{ props.buttonName }}</Button>
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
 
import {loadScriptAsyncDefer} from '@/libs/loadScript.js';
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
  busName: String,
  buttonName: String
});

const is_activated_platform = ref(false)

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
    eventBus.on("activate_youtube", (payload) => {
        is_activated_platform.value = payload
        console.log("activate_youtube")
        console.log(is_activated_platform.value)
    })
})





const handleAuthClick = () => {
    if (is_activated_platform.value) {
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
    } else {
        eventBus.emit("showUpgradeModal", true)
    }
    
}
</script>

<style scoped>
.google-login-btn { 
    border: 1px solid rgb(119, 0, 0);
    background-color: #c90000;
    padding: auto;
    width: 300px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 600;
}

a{
    position: absolute;
    margin-top:6px;
} a:hover{
    color: black;
    text-decoration:none; 
}
</style>
