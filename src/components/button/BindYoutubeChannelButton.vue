<template>
    <LoadingIcon  v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle"/>
    <Button v-else-if="props.buttonName == 'edit'" 
        type="button" @click="bindPage">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="google-login-btn shadow-lg" @click="bindPage">{{$t('settings.platform.connect_with_youtube')}}</Button>
    
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
 
import {googleLoadScriptAsyncDefer} from '@/libs/loadScript.js';

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const fetchingData = ref(false)

const props = defineProps({
  busName: String,
  buttonName: String
});


var client;
var SCOPE = 'https://www.googleapis.com/auth/youtube';

onMounted(()=>{
    googleLoadScriptAsyncDefer('https://accounts.google.com/gsi/client', initClient)
})

const initClient = ()=> {
    console.log("google initClient")
    client = google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: SCOPE,
      ux_mode: 'popup',
      callback: (response) => {
        eventBus.emit(props.busName ,response)
      },
    });
}

const bindPage = () => {
    client.requestCode();
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
