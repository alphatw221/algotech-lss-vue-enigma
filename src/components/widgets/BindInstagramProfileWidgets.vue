<template>
    <div v-show="showPages" class="border-2 rounded-md">
        <div class="grid grid-cols-12">
            <h4 class="ma-5 col-span-12">Instagram Fan Page</h4>
        </div>
        <div class="grid grid-cols-12">
            <div v-for="page in InstagramProfiles" :key="page.id">
                <div class="relative mt-3">
                    <img :src="page.image" alt="">
                    <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" content="Unbind page" :options="{
                        theme: 'light',
                    }"><XCircleIcon class="absolute right-0 top-0 click-icon" @click="removeInstagramProfiles(page)"/></Tippy>
                    
                </div>
                <span>{{ page.name }}</span>
            </div>
        </div>
    </div>
    <div v-show="showConnectButton">
        <BindInstagramProfileButton :busName="'addInstagramProfiles'"/>
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