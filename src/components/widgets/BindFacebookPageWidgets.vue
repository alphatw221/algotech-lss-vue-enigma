<template>
    <div v-show="showPages" class="border-2 rounded-md">
        <div class="grid grid-cols-12">
            <h4 class="ma-5 col-span-12">Facebook Fan Page</h4>
        </div>
        <div class="grid grid-cols-12">
            <div v-for="page in facebookPages" :key="page.id">
                <div class="relative mt-3">
                    <img :src="page.image" alt="">
                    <Tippy tag="a" href="javascript:;" class="tooltip" content="Unbind page" :options="{
                        theme: 'light',
                    }"><XCircleIcon class="absolute right-0 top-0 click-icon" @click="unbindPage(page)"/></Tippy>
                    
                </div>
                <span>{{ page.name }}</span>
            </div>
        </div>
    </div>
    <div v-show="showConnectButton">
        <BindFacebookPageButton :busName="'addFacebookPages'"/>
    </div>
</template>

<script setup>

import BindFacebookPageButton from '@/components/button/BindFacebookPageButton.vue'
import { get_user_subscription_facebook_pages, bind_user_facebook_pages } from '@/api/user_subscription'
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
        console.log(response)
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
    }).catch(error=>{
        console.log(error)
    })
}

const unbindPage = (page) => {
    eventBus.emit("unbindPage", page)
}
</script>

<style scoped>
.click-icon:hover {
  cursor: pointer;
  margin: -10px -11px 0px 0px;
}
</style>