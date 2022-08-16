<template>
    <div class="board bg-white"> 
        <div class="redSide hidden sm:block"> 
            <img src="/src/assets/images/login-page/forgot_robot.svg"  class="robot hidden sm:block" />    
        </div>
    </div>
    <div class="container w-[100%] sm:w-[480px] m-0 sm:mr-[10%] float-center sm:float-right"> 
        <div class="flex flex-col items-center p-10 text-center center w-[375px]">
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


</script>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background:rgba(255, 255, 255, 0.95);
}

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
    position: absolute;
    z-index: 0;
}

.center {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background:rgba(255, 255, 255, 0.95);
}

.redSide{
    height: 100vh;
    width: 45vw;
    background-color: rgba(255, 0, 0, 0.651);
    position: absolute;
    z-index: -99;
    left:0;
}
.robot{
    z-index: 0;
    width: 480px;
    top: 50%;
    right: 47%;
    transform: translate(50%, -50%);
    position: absolute;
}
.container{
    height: 100vh;
    position: relative;
}
</style>