<template>
<div class="board bg-white">
    <div class="flex flex-col sm:flex-row justify-between">
        <div class="redSide relative w-screen h-[30vh] sm:h-screen sm:w-[45vw]"> 
            <img src="/src/assets/images/login-page/forgot_robot.svg"  class="robot max-h-full sm:max-h-[480px]" />    
        </div>
        <div class="relative w-[100vw] sm:w-[400px] h-[70vh] sm:h-screen mx-auto container"> 
            <div class="flex flex-col items-center p-10 text-center center w-full sm:w-[375px] top-2 sm:top-[29%] translate-x-1/2">
                <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
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
                        <a class="m-auto font-medium"  @click=" router.push({name:'LoginPage'});" >{{ $t('forgot_password.Back_to_login_page') }}</a>
                    </h6>
                </div>
            </div>
        </div>
    </div> 
</div>
</template>

<script setup >
// import { forgot_password } from '@/api/user'
import { seller_forgot_password } from '@/api_v2/user'
import { useRoute, useRouter } from "vue-router";
import {ref, onMounted, onBeforeMount } from 'vue'
import { usePublicLayoutStore } from "@/stores/lss-public-layout"
import i18n from "@/locales/i18n";

const publicLayout = usePublicLayoutStore()
const route = useRoute()
const router = useRouter()
const email = ref('')
const sendResetLink=()=>{
    seller_forgot_password({email: email.value})
    .then(res=>{
        publicLayout.notification.showMessageToast(i18n.global.t('forgot_password.success_message'))
    })
}

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0; padding-right: 0; overflow: hidden; height:100vh;')} )
</script>

<style scoped>
.resend_btn {
    background-color:  rgba(255, 0, 0, 0.795); 
    color: white; 
    font-size: 16px;
    height: 45px;
}
.board{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    z-index: 0;
}

.center {
    position: relative;
    background:rgba(255, 255, 255, 0.95);
    right: 50%;
    height: 100%;
}

.redSide{
    background-color: rgba(255, 0, 0, 0.651);
    z-index: 5;
}
.robot{
    z-index: 0;
    top: 50%;
    right: 43%;
    transform: translate(50%, -50%);
    position: absolute;

}
.container{
    z-index: 1;
}
</style>