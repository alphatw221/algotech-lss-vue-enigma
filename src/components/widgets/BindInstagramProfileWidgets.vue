<template>
    <div v-if="showConnectButton" class="box border-2 rounded-lg p-5 min-h-[200px] mx-4 lg:mx-20 px-10 mb-3 flex flex-col justify-center">
        <BindInstagramProfileButton :busName="'addInstagramProfiles'" :buttonName="'Connect with Instagram'" class="w-52 sm:w-full mx-auto"/> 
    </div>
    <div v-else-if="showPages" class="box border-2 rounded-lg p-5 mx-4 lg:p-10 lg:mx-20 mb-3 flex flex-col">
        <div class="flex flex-wrap justify-between gap-3 mb-5 sm:mb-8">
            <h4 class="text-lg sm:text-xl font-medium leading-none my-auto">{{$t('settings.platform.instagram_profile')}}</h4>
            <BindInstagramProfileButton :busName="'addInstagramProfiles'" :buttonName="'edit'"/>
        </div>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5">
            <div v-for="instagramProfile,index in InstagramProfiles" :key="index" class="flex-col flex justify-center text-center relative my-3 w-24 h-auto lg:w-32">
                <img :src="instagramProfile.image" class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="leading-tight text-[13px] sm:text-[15px] w-20 lg:w-32 mx-auto">{{ instagramProfile.name.substring(0,24) }}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('settings.platform.unbind_page')" :options="{
                    theme: 'light',
                }"><XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeInstagramProfiles(instagramProfile)"/></Tippy>
            </div>
        </div>
    </div>
</template>

<script setup>

import BindInstagramProfileButton from '@/components/button/BindInstagramProfileButton.vue'
// import { get_user_subscription_instagram_profiles, bind_user_instagram_profiles, unbind_instagram_profile } from '@/api/user_subscription'

import { get_platform_instances, unbind_platform_instance, bind_platform_instances } from '@/api_v2/user_subscription'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const showConnectButton = ref(false)
const showPages = ref(false)
const InstagramProfiles = ref([])

onMounted(()=>{
    eventBus.on('addInstagramProfiles',payload=>{
        bind_instagram_profiles(payload.accessToken)
    })
    get_instagram_profiles()
})

onUnmounted(()=>{
    eventBus.off('addInstagramProfiles')
})
   
const get_instagram_profiles = () => {
    get_platform_instances('instagram').then(response=>{
        if (!response.data.length) {
            showConnectButton.value = true;
            return false
        }
        showPages.value = true
        InstagramProfiles.value = response.data
    })
    // get_user_subscription_instagram_profiles().then(response=>{
    //     if (!response.data.length) {
    //         showConnectButton.value = true;
    //         return false
    //     }
    //     showPages.value = true
    //     InstagramProfiles.value = response.data
    // }).catch(error=>{
    //     console.log(error)
    // })
}

const bind_instagram_profiles = (accessToken) => {
    
    bind_platform_instances('instagram',{'accessToken': accessToken}).then(response=>{
        if (!response.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        InstagramProfiles.value = response.data
    })


    // bind_user_instagram_profiles(payload).then(response=>{
    //     if (!response.data.length) {
    //         return false
    //     }
    //     showConnectButton.value = false;
    //     showPages.value = true;
    //     InstagramProfiles.value = response.data
    // }).then(response=>{
    //     eventBus.emit("check_activated_platform")
    // }).catch(error=>{
    //     console.log(error)
    // })
}

const removeInstagramProfiles = (instagramProfile) => {
    if (!instagramProfile) {
        return false
    }
    unbind_platform_instance('instagram', instagramProfile.id).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            // eventBus.emit("check_activated_platform")
            return false
        }
        InstagramProfiles.value = response.data
    })
    // unbind_instagram_profile(payload).then(response=> {
    //     if (!response.data.length) {
    //         showConnectButton.value = true;
    //         showPages.value = false;
    //         eventBus.emit("check_activated_platform")
    //         return false
    //     }
    //     InstagramProfiles.value = response.data
    // }).catch(error=>{
    //     console.log(error)
    // })
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