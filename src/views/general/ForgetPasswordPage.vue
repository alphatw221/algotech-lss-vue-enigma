<template>
    <ForgotPasswordTheme>
        <template v-slot:form>
            <h3 class="text-[1.8rem] mx-auto my-10 font-medium" >{{ $t('forgot_password.title') }}</h3>
            <div class="w-full flex-col flex gap-5 z-10">
                <!-- :placeholder="$t('campaign_list.search_bar.search')+'...'" -->
                <div class="relative"> 
                    <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                    <input type="email" class="h-[45px] pl-12 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('forgot_password.enter_your_email')" 
                        v-model="email" />
                </div>
                <button class="resend_btn btn rounded-xl" @click="sendResetLink()">{{ $t('forgot_password.send_password_reset_link') }}</button>
                <h6 class="align-center text-center text-[16px]">
                    <a class="m-auto font-medium"  @click=" router.push({name:'login-page'});" >{{ $t('forgot_password.Back_to_login_page') }}</a>
                </h6>
            </div>
        </template>
    </ForgotPasswordTheme>
</template>

<script setup >

import ForgotPasswordTheme from './ForgotPasswordTheme.vue'
import { user_forget_password } from '@/api_v3/user'

import { useRoute, useRouter } from "vue-router";
import {ref, onMounted, onBeforeMount } from 'vue'
import { usePublicLayoutStore } from "@/stores/lss-public-layout"
import i18n from "@/locales/i18n";
import { useToast } from "vue-toastification";
const toast = useToast();

const publicLayout = usePublicLayoutStore()
const route = useRoute()
const router = useRouter()
const email = ref('')
const sendResetLink=()=>{
    user_forget_password(email.value)
    .then(res=>{

        console.log(res.data)
    })
}

</script>

<style scoped>

</style>