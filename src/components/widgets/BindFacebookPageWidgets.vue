<template>
    <div v-if="showPages" class="box border-2 rounded-lg p-5 mx-4 lg:mx-20 px-10 mb-3 flex flex-col">
        <div class="flex justify-between">
            <h4 class="text-xl font-medium leading-none mb-8">Facebook Fan Page</h4>
            <BindFacebookPageButton :busName="'addFacebookPages'" :buttonName="'Edit'"/>
        </div>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5">
            <div v-for="page in facebookPages" :key="page.id" class="flex-col flex text-center relative my-3 w-16 h-auto lg:w-28">
                <img :src="page.image" class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="whitespace-auto text-center w-16 lg:w-28">{{ page.name.substring(0,24)}}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" content="Unbind page" :options="{
                    theme: 'light',
                }">
                <XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeFacebookPages(page)"/></Tippy>
            </div>
        </div>
    </div>
    <div v-if="showConnectButton">
        <BindFacebookPageButton :busName="'addFacebookPages'" :buttonName="'Connect with Facebook'"/>
    </div>
</template>

<script setup>

import BindFacebookPageButton from '@/components/button/BindFacebookPageButton.vue'
import { get_user_subscription_facebook_pages, bind_user_facebook_pages, unbind_facebook_page } from '@/api/user_subscription'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;


const showConnectButton = ref(false)
const showPages = ref(false)
const facebookPages = ref([])

onMounted(()=>{
    //facebook SDK use eval() at backend
    eventBus.on('addFacebookPages',payload=>{
        bind_facebook_pages(payload)
    })
    get_facebook_pages()
})

onUnmounted(()=>{
    eventBus.off('addFacebookPages')
})

const get_facebook_pages = () => {
    get_user_subscription_facebook_pages().then(response=>{
        if (!response.data.length) {
            showConnectButton.value = true;
            return false
        }
        showPages.value = true;
        facebookPages.value = response.data
    }).catch(error=>{
        console.log(error)
    })
}

const bind_facebook_pages = (payload) => {
    bind_user_facebook_pages(payload).then(response=>{
        console.log("bind facebook pages")
        console.log(response.data)
        if (!response.data.length) {
            return false
        }
        showConnectButton.value = false;
        showPages.value = true;
        facebookPages.value = response.data
    }).then(response=>{
        eventBus.emit("check_activated_platform")
    }).catch(error=>{
        console.log(error)
    })
}

const removeFacebookPages = (payload) => {
    if (!payload) {
        return false
    }
    unbind_facebook_page(payload).then(response=> {
        if (!response.data.length) {
            showConnectButton.value = true;
            showPages.value = false;
            eventBus.emit("check_activated_platform")
            return false
        }
        facebookPages.value = response.data
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