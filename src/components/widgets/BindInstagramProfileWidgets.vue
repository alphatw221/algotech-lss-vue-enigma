<template>
    <div v-if="showPages" class="border-2 rounded-lg p-5 mx-4 lg:mx-8 mb-8 flex flex-col">
        <div class="flex justify-between">
            <h4 class="text-lg">Instagram Fan Page</h4>
            <BindInstagramProfileButton :busName="'addInstagramProfiles'" :buttonName="'Edit'"/>
        </div>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5">
            <div v-for="page in InstagramProfiles" :key="page.id" class="flex-col flex text-center relative my-3 w-16 h-auto lg:w-28">
                <img :src="page.image" class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="whitespace-auto text-center w-16 lg:w-28">{{ page.name.substring(0,24) }}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" content="Unbind page" :options="{
                    theme: 'light',
                }"><XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeInstagramProfiles(page)"/></Tippy>
            </div>
        </div>
    </div>
    <div v-if="showConnectButton">
        <BindInstagramProfileButton :busName="'addInstagramProfiles'" :buttonName="'Connect with Instagram'"/>
    </div>
</template>

<script setup>

import BindInstagramProfileButton from '@/components/button/BindInstagramProfileButton.vue'
import { get_user_subscription_instagram_profiles, bind_user_instagram_profiles, unbind_instagram_profile } from '@/api/user_subscription'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const showConnectButton = ref(false)
const showPages = ref(false)
const InstagramProfiles = ref([])

onMounted(()=>{
    eventBus.on('addInstagramProfiles',payload=>{
        bind_instagram_profiles(payload)
    })
    get_instagram_profiles()
})

onUnmounted(()=>{
    eventBus.off('addInstagramProfiles')
})
   
const get_instagram_profiles = () => {
    get_user_subscription_instagram_profiles().then(response=>{
        if (!response.data.length) {
            showConnectButton.value = true;
            return false
        }
        showPages.value = true
        InstagramProfiles.value = response.data
    }).catch(error=>{
        console.log(error)
    })
}

const bind_instagram_profiles = (payload) => {
    bind_user_instagram_profiles(payload).then(response=>{
        if (!response.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        InstagramProfiles.value = response.data
    }).then(response=>{
        eventBus.emit("check_activated_platform")
    }).catch(error=>{
        console.log(error)
    })
}

const removeInstagramProfiles = (payload) => {
    if (!payload) {
        return false
    }
    unbind_instagram_profile(payload).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            eventBus.emit("check_activated_platform")
            return false
        }
        InstagramProfiles.value = response.data
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