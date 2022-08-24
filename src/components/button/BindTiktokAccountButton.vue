<template>
    <LoadingIcon v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle"/>
    
    <Button v-else-if="props.buttonName == 'edit'" 
        type="button" @click="handleAuthClick">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="tiktok-login-btn shadow-lg" @click="bindPage">Connect with TikTok</Button>
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch, computed, onUpdated } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { bind_platform_instances } from '@/api_v2/user_subscription';

const props = defineProps({ 
    busName: String,
    buttonName: String
});
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const fetchingData = ref(false)
const router = useRouter()


onMounted(() => {
    let this_url = location.href
    if (this_url.includes('state=tiktok')) {
        let important_substring = this_url.split("&")[0]
        let code = important_substring.substring(important_substring.indexOf("auth_code=") + 10)
        eventBus.emit(props.busName, {"authCode": code})
        router.push({name: 'platform'})
    }
})

const handleAuthClick = () => {
    let state = 'tiktok'
    let redirect_uri = `${import.meta.env.VITE_APP_WEB}/seller/platform`
    location.href = `${import.meta.env.VITE_TIKTOK_OAUTH_URL}?app_id=${import.meta.env.VITE_TIKTOK_APP_ID}&state=${state}&redirect_uri=${redirect_uri}&rid=a83sicoc4k`
}
const bindPage = () => {
    handleAuthClick()
}



</script>

<style scoped>
.tiktok-login-btn { 
    border: 1px solid rgb(5, 0, 10);
    background-color: #020003;
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
