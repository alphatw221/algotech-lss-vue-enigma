<template>
    <div v-show="showPages" class="border-2 rounded-md">
        <div class="grid grid-cols-12">
            <div class="col-span-6">
                <h4 class="ma-5">Youtube Fan Page</h4>
            </div>
            <div class="col-span-6">
                <button type="button" class="border-2">edit</button>
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-6" v-for="channel in youtubeChannels" :key="channel.id">
                <v-avatar class="ml-5">
                    <img :src="channel.image" alt="">
                </v-avatar>
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
import { get_user_subscription_youtube_channels, bind_user_youtube_channels } from '@/api/user_subscription'
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
</script>

<style scoped>

</style>