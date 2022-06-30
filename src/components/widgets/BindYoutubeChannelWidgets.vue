<template>
    <div v-show="showPages" class="border-2 rounded-lg p-5 mx-4 lg:mx-8 mb-8 flex flex-col">
        <h4 class="text-lg">Youtube Fan Page</h4>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5">
            <div v-for="channel in youtubeChannels" :key="channel.id" class="flex-col flex text-center relative my-3 w-16 h-auto lg:w-28">
                <img :src="channel.image"  class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="whitespace-auto text-center w-16 lg:w-28">{{ channel.name.substring(0,24) }}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" content="Unbind page" :options="{
                    theme: 'light',
                }"><XCircleIcon class="absolute right-0 top-0 z-50 click-icon text-danger" @click="removeYoutubeChannels(channel)"/></Tippy>
            </div>
        </div>
    </div>
    <div v-show="showConnectButton">
        <BindYoutubeChannelButton :busName="'addYoutubeChannels'"/>
    </div>
</template>
<script setup>

import BindYoutubeChannelButton from '@/components/button/BindYoutubeChannelButton.vue'
import { get_user_subscription_youtube_channels, bind_user_youtube_channels, unbind_youtube_channel } from '@/api/user_subscription'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const showConnectButton = ref(false)
const showPages = ref(false)
const youtubeChannels = ref([])

onMounted(() => {
    eventBus.on('addYoutubeChannels',payload=>{
        bind_youtube_channels(payload)
    })
    get_youtube_channels()
})

onUnmounted(() => {
    eventBus.off('addYoutubeChannels')
})

const get_youtube_channels = () => {
    get_user_subscription_youtube_channels().then(response=>{
        if (!response.data.length) {
            showConnectButton.value = true;
            return false
        }
        showPages.value = true;
        youtubeChannels.value = response.data

    }).catch(error=>{
        console.log(error)
    })
}

const bind_youtube_channels = (payload) => {
    bind_user_youtube_channels(payload).then(response=>{
        console.log("bind youtube channels")
        console.log(response.data)
        if (!response.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        youtubeChannels.value = response.data
    }).then(response=>{
        eventBus.emit("check_activated_platform")
    }).catch(error=>{
        console.log(error)
    })
}

const removeYoutubeChannels = (payload) => {
    if (!payload) {
        return false
    }
    unbind_youtube_channel(payload).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            eventBus.emit("check_activated_platform")
            return false
        }
        youtubeChannels.value = response.data
    }).catch(error=>{
        console.log(error)
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