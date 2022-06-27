<template>
    <div v-show="showPages" class="border-2 rounded-md">
        <div class="grid grid-cols-12">
            <div class="col-span-6">
                <h4 class="ma-5">Instagram Fan Page</h4>
            </div>
            <div class="col-span-6">
                <button type="button" class="border-2">edit</button>
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-6" v-for="page in InstagramProfiles" :key="page.id">
                <v-avatar class="ml-5">
                    <img :src="page.image" alt="">
                </v-avatar>
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
import { get_user_subscription_instagram_profiles, bind_user_instagram_profiles } from '@/api/user_subscription'
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
        console.log(response)
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
        console.log("bind instagram profiles")
        console.log(response.data)
        if (!response.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        InstagramProfiles.value = response.data
    }).catch(error=>{
        console.log(error)
    })
}
</script>

<style scoped>

</style>