<template>
    <Modal :show="showModal" @hidden="hideModal()" backdrop="static" >
        <ModalHeader>
            <h2 class="mr-auto text-base font-medium"> Authentication Required </h2>
            <a @click="showModal = false" class="absolute top-0 right-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-500" />
            </a>
        </ModalHeader>
        <ModalBody class="flex flex-col p-10 text-center border-2 gap-5">
            <div class="text-medium"> Enter verification code from your email, tap close button if you don't want to login: </div>
            <otp :digit-count="4" @update:otp="otpValue = $event"></otp>
                <!-- Sorry, you've entered wrong details. You can try 4 more time(s). -->
            <a v-if="resendTime ==0" @click="getCode()" class="w-fit dark:border-darkmode-400 ml-auto "> Resent </a>
            <a v-else class="ml-auto font-medium"> OTP not received? resend again in {{resendTime}} seconds</a>
            
            <button type="button" @click="codeSubmit()" class="w-full shadow-md btn btn-primary">
                submit
            </button>
        </ModalBody>
    </Modal>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed, getCurrentInstance, watch } from 'vue'
import otp from "./OTP.vue";
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout"
import {useRoute, useRouter} from 'vue-router'
import { useCookies } from "vue3-cookies";

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layoutStore = useLSSDealerLayoutStore();
const passcode = ref()
const showModal = ref(false)
const token = ref()
const otpValue = ref('')
const resendTime = ref(0)
let timeout = null
onMounted(()=>{
     eventBus.on("showTwoFAModal", (payload) => {
        showModal.value = true
        token.value = payload
        resendTime.value = 30
    });
})

onUnmounted(()=>{
    clearTimeout(timeout);
    eventBus.off("showTwoFAModal")
})

const getCode =()=>{
    resendTime.value = 30
}

const codeSubmit = () =>{
    cookies.set("access_token", token.value)
    cookies.set("login_with", 'dealer')
    showModal.value = false
    router.push({name:'dashboard'})
}

const hideModal = ()=>{
    showModal.value = false
    clearTimeout(timeout)
    timeout = null
}

watch(
  computed(() => resendTime.value),
  () => {
    if (resendTime.value > 0) {
        timeout = setTimeout(() => { resendTime.value-=1}, 1000);
    }
  }, { immediate: true }
  
);

</script>