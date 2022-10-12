<template>
    <div v-if="showConnectButton" class="box border-2 rounded-lg p-5 min-h-[200px] mx-4 lg:mx-20 px-10 mb-3 flex flex-col justify-center">
        <BindFacebookPageButton :busName="'addFacebookPages'" :buttonName="'Connect with Facebook'" class="w-52 sm:w-full mx-auto"/>
    </div>
    <div v-else-if="showPages" class="box border-2 rounded-lg p-5 mx-4 lg:p-10 lg:mx-20 mb-3 flex flex-col">
        <div class="flex flex-wrap justify-between gap-3 mb-5 sm:mb-8">
            <h4 class="text-lg sm:text-xl font-medium leading-none my-auto">{{$t('settings.platform.facebook_fan_page')}}</h4>
            <BindFacebookPageButton :busName="'addFacebookPages'" :buttonName="'edit'" class="ml-auto" />
        </div>
        <LoadingIcon icon="three-dots" color="1a202c" class="flex flex-wrap w-20 h-20 mx-auto" v-if="fetchingData"/>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5" v-else>
            <div v-for="facebookPage, index in facebookPages" :key="index" class="flex-col flex justify-center text-center relative my-3 w-24 h-auto lg:w-32">
                <img :src="facebookPage.image" @error="get_profile_picture(facebookPage)" class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="leading-tight text-[13px] sm:text-[15px] w-20 lg:w-32 mx-auto">{{ facebookPage.name.substring(0,24)}}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('settings.platform.unbind_page')" :options="{
                    theme: 'light',
                }">
                <XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeFacebookPage(facebookPage)"/></Tippy>
            </div>
        </div>
    </div>
</template>

<script setup>

import BindFacebookPageButton from '@/components/button/BindFacebookPageButton.vue'


import { get_platform_instances, unbind_platform_instance, bind_platform_instances } from '@/api_v2/user_subscription'
import { get_fb_page_profile_picture } from '@/api_v2/facebook'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';


const layoutStore = useLSSSellerLayoutStore();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;


const showConnectButton = ref(false)
const showPages = ref(false)
const facebookPages = ref([])
const fetchingData = ref(false)
onMounted(()=>{
    //facebook SDK use eval() at backend
    eventBus.on('addFacebookPages',payload=>{
        bind_facebook_pages(payload.accessToken)
    })
    get_facebook_pages()
})

onUnmounted(()=>{
    eventBus.off('addFacebookPages')
})

const get_facebook_pages = () => {
    get_platform_instances('facebook', layoutStore.alert).then(res=>{
         if (!res.data.length) {
            showConnectButton.value = true;
            return false
        }
        showPages.value = true;
        facebookPages.value = res.data
    })
    // get_user_subscription_facebook_pages().then(response=>{
    //     if (!response.data.length) {
    //         showConnectButton.value = true;
    //         return false
    //     }
    //     showPages.value = true;
    //     facebookPages.value = response.data
    // }).catch(error=>{
    //     console.log(error)
    // })
}

const bind_facebook_pages = (accessToken) => {
    fetchingData.value = true
    bind_platform_instances('facebook', {'accessToken': accessToken}, layoutStore.alert).then(res=>{
         if (!res.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        facebookPages.value = res.data
        fetchingData.value = false
    })


    // bind_user_facebook_pages(payload).then(response=>{
    //     if (!response.data.length) {
    //         return false
    //     }
    //     showConnectButton.value = false;
    //     showPages.value = true;
    //     facebookPages.value = response.data
    // }).then(response=>{
    //     eventBus.emit("check_activated_platform")
    // })
}

const removeFacebookPage = (facebookPage) => {
    if (!facebookPage) {
        return false
    }
    unbind_platform_instance('facebook', facebookPage.id, layoutStore.alert).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            // eventBus.emit("check_activated_platform")
            return false
        }
        facebookPages.value = response.data
    })
}

const get_profile_picture = (facebook_page) => {
    console.log("on error")
    get_fb_page_profile_picture(facebook_page.id).then(res=> {
        if (res.data?.error_response) {
            facebook_page.image = null;
        } else {
            facebook_page.image = res.data;
        }
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