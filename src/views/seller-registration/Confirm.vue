<template>
    <div class="confirmation" :class="{ hidden: layout.registerTab !== 3, block: layout.registerTab === 3 }">

      <span class="px-3 text-xl font-medium"> {{$t('register.confirm.succeeded')}} </span> 
      <div class="p-3 py-5 text-sm lg:text-lg flex-col"> 
        <div class="flex-row"  
            v-for="(value,key) in confirmationInfo" v-bind:key="key">
            <div v-if=" key !== 'Receipt'">
                <label> {{$t(`register.confirm.` +  key) }} : <span class="ml-3 font-medium text-[#660000]"> {{value}}</span> </label>
            </div>
            <div v-if=" key === 'Receipt'" class="mt-10">
                <button class="btn btn-warning text-white" @click="openReceiptDownloadPage"> {{$t('register.confirm.download')}} </button>
            </div>
        </div>
        <div class="flex flex-col font-medium text-center mt-10">
            <div> {{$t('register.confirm.thankyou')}}</div>
            <!-- <div style="color:red; font-style:bold;">Please wait, the page is being redirected...</div> -->
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"

import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies"

const route = useRoute();
const router = useRouter();
const layout = useSellerRegistrationStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;


const confirmationInfo= ref({
  "Customer": "",
  "Email": "",
  "Your Plan": "",
  "Subscription Period": "",
  "Subscription End Date": "",
})

onMounted(()=>{
  eventBus.on("comfirmRegister", (payload) => {
    confirmationInfo.value = payload
    console.log(confirmationInfo.value)
    layout.registerTab = 3
    setTimeout(() => (window.location = 'https://liveshowseller.com/thank-you/'), 10000);
    })
})

const openReceiptDownloadPage=()=>{
  window.open(confirmationInfo.value.Receipt)
}
</script>