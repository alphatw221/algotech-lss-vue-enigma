<template>
    <LoadingIcon v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle"/>
    
    <Button v-else-if="props.buttonName == 'edit'" 
        type="button" @click="handleAuthClick">{{$t('settings.platform.edit')}}</Button>

    <Button v-else 
        type="button" class="twitch-login-btn shadow-lg" @click="bindPage">Connect with Twitch</Button>
    
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
    if (this_url.includes('scope=')) {
        let code = this_url.substring( this_url.indexOf("code=") + 5, this_url.lastIndexOf("&"))
        
        bind_platform_instances('twitch', {'code': code}).then(response=>{
            if (!response.data.length) {
                return false
            }
            eventBus.emit('getTwitchChannel')
            router.push({name: 'platform'})
        })
    }
})

const handleAuthClick = () => {
    const scope = 'chat:read+chat:edit+moderator:manage:announcements+user:manage:whispers+user:read:email+moderation:read'
    location.href = `${import.meta.env.VITE_TWITCH_OAUTH_URL}?response_type=code&client_id=${import.meta.env.VITE_TWITCH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_WEB}/seller/platform&scope=${scope}`
}

const bindPage = () => {
    handleAuthClick()
}



</script>

<style scoped>
.twitch-login-btn { 
    border: 1px solid rgb(63, 8, 126);
    background-color: #75349e;
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
