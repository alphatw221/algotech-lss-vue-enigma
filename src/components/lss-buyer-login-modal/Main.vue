<template>

    <Modal
      size="modal-xl"
      :show="layoutStore.showLoginModal"
      @hidden="layoutStore.showLoginModal=false"
    >
      <!-- <ModalHeader class="bg-primary h-10 rounded-t-md">
        <div></div>
      </ModalHeader> -->
      <ModalBody class="px-1 flex flex-wrap relative lg:flex-nowrap h-fit">
        <a @click="layoutStore.showLoginModal=false" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-10 h-10 text-slate-400" />
        </a>
        <div class=" w-full flex flex-col items-center text-center
         lg:w-1/2 lg:px-2 lg:border-secondary lg:border-r-2 lg:border-dotted h-[300px]" >
            <h1 class="mt-20 mb-12">Continue as a Guest</h1>
            <div class=" w-full">
              <button class="btn btn-secondary w-[310px] text-[18px]" @click="continueAsGuest()">Continue</button>
            </div>
            <div class="w-full flex justify-center border-t border-slate-200/60 dark:border-darkmode-400 mt-12 lg:invisible">
              <div class="bg-white px-5 -mt-3 text-slate-500 text-[16px]"> or </div>
            </div>
        </div>

        <div class=" w-full flex flex-col items-center text-center
          lg:mt-20 lg:w-1/2 lg:px-2 lg:border-none h-[200px]">
          <h1 class=" mx-5"> Social Login</h1>
          <div class="flex flex-col items-center mt-10" v-if="!showReminder">
              <FacebookLoginButton block role='buyer'/>
              <GoogleLoginButton block role='buyer'/>
          </div>
          <div v-if="showReminder">
            <p class="text-danger text-center mt-5 md:mt-5 text-sm lg:text-lg mr-4 ml-4">
              Oops! your browser is not supported, please open the Shopping Cart Link below on Safari or Chrome</p>
          </div>
          <div v-if="showReminder" class="mt-4 block text-center" style="word-wrap:break-word" >
              <a class="text-center mx-4 break-all" @click="copyLink()">{{currentUrl}}</a>
              <a class=" text-black  "  @click="copyLink()">
                  <div class="text-center items-center  md:ml-2">
                      <CopyIcon class="inline w-4 h-4"/>
                      <p class="text-xs">copy</p>
                  </div>
              </a>
          </div>
        </div>

      </ModalBody>
      
     
      <!-- <ModalFooter>
        <div></div>
      </ModalFooter> -->
    </Modal>

</template>



<script setup>

import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';

import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
const layoutStore = useLSSBuyerLayoutStore();
const showReminder = ref(false)
const currentUrl = ref(window.location.href)

const continueAsGuest = ()=>{
  layoutStore.refuseToLogin = true
  layoutStore.showLoginModal=false
}

onMounted(()=>{
    // console.log(navigator.userAgent.toLowerCase())
    if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && navigator.userAgent.toLowerCase().indexOf('safari') < 0 ) {
        showReminder.value=true
    }
})
const copyLink = ()=>{
    navigator.clipboard.writeText(currentUrl.value).then(()=>{
        alert('copied!')
    })}
</script>
