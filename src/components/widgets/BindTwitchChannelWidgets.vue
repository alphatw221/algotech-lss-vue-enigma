<template>
    <div v-if="showConnectButton" class="box border-2 rounded-lg p-5 min-h-[200px] mx-4 lg:mx-20 px-10 mb-3 flex flex-col justify-center">
        <BindTwitchChannelButton :busName="'addTwitchChannels'" :buttonName="'Connect with Twitch'" class="w-52 sm:w-full mx-auto"/>
    </div>

    <div v-else-if="showPages" class="box border-2 rounded-lg p-5 mx-4 lg:p-10 lg:mx-20 mb-3 flex flex-col">
        <div class="flex flex-wrap justify-between gap-3 mb-5 sm:mb-8">
            <h4 class="text-lg sm:text-xl font-medium leading-none my-auto">{{$t('settings.platform.twitch_channel')}}</h4>
            <!-- <BindTwitchChannelButton :busName="'addTwitchChannels'" :buttonName="'edit'"/> -->
        </div>
        <LoadingIcon icon="three-dots" color="1a202c" class="flex flex-wrap w-20 h-20 mx-auto" v-if="fetchingData"/>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5" v-else>
            <div v-for="channel in twitchChannels" :key="channel.id" class="flex-col flex justify-center text-center relative my-3 w-24 h-auto lg:w-32">
                <img :src="channel.image"  class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="leading-tight text-[13px] sm:text-[15px] w-20 lg:w-32 mx-auto">{{ channel.channel_name }}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('settings.platform.unbind_page')" :options="{
                    theme: 'light',
                }"><XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeTwitchChannel(channel)"/></Tippy>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { get_platform_instances, unbind_platform_instance } from '@/api_v2/user_subscription'
import BindTwitchChannelButton from '@/components/button/BindTwitchChannelButton.vue'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const showConnectButton = ref(false)
const showPages = ref(false)
const twitchChannels = ref([])
const channelName = ref('')


onMounted(() => {
    getTwitchChannel()

    eventBus.on('getTwitchChannel', () => {
        getTwitchChannel()
    })
})

onUnmounted(() => {
    eventBus.off('getTwitchChannel')
})

const getTwitchChannel = () => {
    get_platform_instances('twitch').then(response=>{
        if (!response.data.length) {
            showConnectButton.value = true;
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        twitchChannels.value = response.data
    })
}

const removeTwitchChannel = (channel) => {
    if (!channel) {
        return false
    }
    unbind_platform_instance('twitch', channel.id).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            return false
        }
        twitchChannels.value = response.data
    })
}

</script>

<style scoped>
.click-icon:hover {
  cursor: pointer;
  
}
.click-icon {
    margin: -10px -11px 0px 0px;
}
</style>