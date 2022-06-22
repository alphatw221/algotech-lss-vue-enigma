<template>

    <Modal
      size="modal-xl"
      :show="layoutStore.showLoginModal"
      @hidden="layoutStore.showLoginModal=false"
    >
      <ModalHeader class="bg-primary h-10 rounded-t-md">
        <div></div>
      </ModalHeader>
      <ModalBody class="px-1 flex flex-wrap lg:flex-nowrap">


        <div class=" w-full
         lg:w-1/2 lg:px-2 lg:border-primary lg:border-r-2" style="height:35vh">
          <Card class="center
            w-full
            h-full
          ">
            <div class="text-center mt-5">
              <h1 class="">Login as a Guest</h1>
            </div>
            <div class="items-center text-center mt-16 md:mt-20">
              <button class="btn btn-secondary" @click="layoutStore.showLoginModal=false">Continue</button>
            </div>
          </Card>
        </div>


        <div class="
        w-full mt-2
        lg:mt-0 lg:w-1/2 lg:px-2  
        " style="height:35vh">
          <Card class="center w-full h-full ">

              <div class="text-center mt-5">
                <h1>Login</h1>
              </div>
              <div class="mt-10 flex flex-col items-center" v-if="!showReminder">
                  <FacebookLoginButton block role='buyer'/>
                  <GoogleLoginButton block role='buyer'/>
              </div>
              <Row v-if="showReminder">
                <p class="text-danger text-center mt-5 md:mt-10 text-sm lg:text-lg mr-4 ml-4">
                  Oops! your browser is not supported, please open the Shopping Cart Link below on Safari or Chrome</p></Row>


              <div v-if="showReminder" class="mt-4 block text-center" style="word-wrap:break-word" >
                  <a class="text-center mx-4" @click="copyLink()">{{currentUrl}}</a>
                  <a class=" text-black  "  @click="copyLink()">
                      <div class="text-center items-center  md:ml-2">
                          <CopyIcon class="inline w-4 h-4"/>
                          <p class="text-xs">copy</p>
                      </div>
                  </a>
              </div>
          </Card>
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
