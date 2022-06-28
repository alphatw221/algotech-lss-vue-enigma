<template>
    <div v-show="showPages" class="border-2 rounded-md">
        <div class="grid grid-cols-12">
            <h4 class="ma-5 col-span-12">Youtube Fan Page</h4>
        </div>
        <div class="grid grid-cols-12">
            <div v-for="channel in youtubeChannels" :key="channel.id">
                <div class="relative mt-3">
                    <img :src="channel.image" alt="">
                    <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" content="Unbind page" :options="{
                        theme: 'light',
                    }"><XCircleIcon class="absolute right-0 top-0 click-icon" @click="removeYoutubeChannels(channel)"/></Tippy>
                    
                </div>
                <span>{{ channel.name }}</span>
            </div>
        </div>
    </div>
    <div v-show="showConnectButton">
        <BindYoutubeChannelButton />
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
        console.log(response)
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