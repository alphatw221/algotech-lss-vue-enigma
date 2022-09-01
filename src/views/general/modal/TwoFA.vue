<template>
    <Modal :show="showModal" @hidden="hideModal()" backdrop="static" >
        <ModalHeader>
            <h2 class="mr-auto text-base font-medium"> {{$t('login.2FAModal.title')}} </h2>
            <a @click="showModal = false" class="absolute top-0 right-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-500" />
            </a>
        </ModalHeader>
        <ModalBody class="flex flex-col p-10 text-center border-2 gap-5">
            <div class="text-medium"> {{$t('login.2FAModal.subTitle')}} </div>
            <otp :digit-count="4" @update:otp="otpValue = $event"></otp>
                <!-- Sorry, you've entered wrong details. You can try 4 more time(s). -->
            <a v-if="resendTime ==0" @click="getCode()" class="w-fit dark:border-darkmode-400 ml-auto "> {{$t('login.2FAModal.resend')}}</a>
            <a v-else class="ml-auto font-medium">{{$t('login.2FAModal.resend_again', { sec : resendTime })}}</a>
            
            <button type="button" @click="codeSubmit()" class="w-full shadow-md btn btn-primary">
                {{$t('login.2FAModal.submit')}}
            </button>
        </ModalBody>
    </Modal>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed, getCurrentInstance, watch } from 'vue'
import otp from "./OTP.vue";
import { usePublicLayoutStore } from "@/stores/lss-public-layout";
import {useRoute, useRouter} from 'vue-router'
import { useCookies } from "vue3-cookies";
import {dealer_verify_code} from '@/api_v2/user';
import i18n from "@/locales/i18n"

const { cookies } = useCookies();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const router = useRouter()
const layoutStore = usePublicLayoutStore();
const showModal = ref(false)
const token = ref()
const code = ref()
const otpValue = ref('')
const resendTime = ref(0)
let timeout = null
onMounted(()=>{
     eventBus.on("showTwoFAModal", (payload) => {
        showModal.value = true
        token.value = payload.token
        code.value = payload.verify_code
        resendTime.value = 30
    });
})

onUnmounted(()=>{
    clearTimeout(timeout);
    eventBus.off("showTwoFAModal")
})

const getCode =()=>{
    console.log(token.value)
    dealer_verify_code(token.value).then(res=>{
        code.value = res.data
        resendTime.value = 30
    })
}

const codeSubmit = () =>{
    if(code.value == otpValue.value){
        cookies.set("access_token", token.value.access)
        cookies.set("login_with", 'dealer')
        showModal.value = false
        router.push({name:'dashboard'})
    }
    else{
        layoutStore.alert.showMessageToast(i18n.global.t('login.codeInvalid'))
    }
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