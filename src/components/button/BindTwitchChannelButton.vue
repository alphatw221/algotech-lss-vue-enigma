<template>
    <LoadingIcon v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle"/>
    
    <div v-else-if="props.buttonName == 'edit'" class="flex">
        <Button class="flex" @click="toTwitch">
            <span class="inline-block mt-1">{{ $t('settings.platform.switch_account') }} </span>
            <Tippy 
            class="rounded-full w-50" 
            data-tippy-allowHTML="true" 
            data-tippy-placement="right" 
            :content="$t('settings.platform.twitch_helper_info')" 
            theme='light'
        > 
            <HelpCircleIcon class="inline-block w-5 ml-1 -mt-1 tippy-icon" />
        </Tippy> 
        </Button>
        
        <Button class="ml-2" @click="bindPage">{{ $t('settings.platform.edit') }}</Button>
    </div>

    <Button v-else class="twitch-login-btn shadow-lg" @click="bindPage">{{ $t('settings.platform.connect_with_twitch') }}</Button>
    
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch, computed, onUpdated } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useRoute, useRouter } from 'vue-router';
import { bind_platform_instances } from '@/api_v2/user_subscription';
import { checkReachChannelLimit } from "@/libs/utils/planLimitController"
import i18n from "@/locales/i18n"

const layoutStore = useLSSSellerLayoutStore();
const props = defineProps({ 
    busName: String,
    buttonName: String
});
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const fetchingData = ref(false)
const router = useRouter()
const scope = 'chat:read+chat:edit+moderator:manage:announcements+user:manage:whispers+user:read:email+moderation:read'

const channelName = ref('')


const handleAuthClick = () => {
    location.href = `${import.meta.env.VITE_TWITCH_OAUTH_URL}?response_type=code&client_id=${import.meta.env.VITE_TWITCH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_WEB}/seller/platform&scope=${scope}`
}

const toTwitch = () => {
    window.open('https://www.twitch.tv/', '_blank');
}

const bindPage = () => {
    let result = checkReachChannelLimit(layoutStore, 'twitch')
    console.log(result)
    if (result) {
        layoutStore.alert.showMessageToast(i18n.global.t('settings.platform.reach_channel_limt_message'))
        return false
    }
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
