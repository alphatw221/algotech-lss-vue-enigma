<template>
<div class="board bg-white"> 
    <div class="round hidden sm:block"> 
        <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
        <img src="/src/assets/images/login-page/robot.svg"  class="robot" />    
    </div>
    <div class="loginContainer w-[100%] sm:w-[480px] m-0 sm:mr-[10%] bg-red-500/25 sm:bg-transparent float-center sm:float-right"> 
        <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 top-2" />
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 left-20 z-10 -translate-y-1/3 -rotate-3" />    
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 right-20 z-10 -translate-y-1/3 rotate-3" />    
        <div class="flex relative flex-col items-center p-10 text-center z-0 center w-full h-3/4 sm:h-fit sm:w-[375px] right-50 top-1/4 sm:top-0 sm:translate-y-1/3 abosolute bg-white sm:opacity-95">
            <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
            <h3 class="text-[1.8rem] mx-auto my-10 font-medium" >Admin{{ $t('login.login') }}</h3>
            <form class="w-full flex-col flex gap-5 z-10">
                <div class="relative"> 
                    <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                    <input type="email" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('login.email')" 
                        v-model="loginData.email" 
                        @keydown.enter.prevent="signIn()" />
                </div>
                <div class="relative"> 
                    <input class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('login.password')" 
                        v-model="loginData.password"
                        :type="showPassword ? 'text' : 'password'" 
                        @keydown.enter.prevent="signIn()" />
                    <EyeOffIcon v-if="showPassword"
                        @click="showPassword = !showPassword" 
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400" /> 
                    <EyeIcon v-else
                        @click="showPassword = !showPassword"
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"
                        />
                </div>
                <button type="button" class="w-full h-[42px] text-lg text-white btn bg-red-500" @click="signIn()" >{{ $t('login.sign_in') }}</button>
            </form>


        </div>
    </div>
    
</div>
    
</template>

<script setup>
import { admin_login } from '@/api_v2/user';
import { useLSSAdminLayoutStore } from "@/stores/lss-admin-layout";
import {ref, onMounted, onBeforeMount, computed, getCurrentInstance } from 'vue'
import {useRoute, useRouter} from 'vue-router'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

onBeforeMount (()=>{
    document.querySelector('body').setAttribute('style', 'padding-left: 0; padding-right: 0; overflow: hidden; height:100vh;')
})
  

const route = useRoute()
const router = useRouter()
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const currentUrl = ref(window.location.href)
const showReminder = ref(false)
const showPassword = ref(false)
const loginData = ref(
    {email:'',password:''})

const signIn = ()=>{ 
    admin_login(loginData.value).then(response=>{
        cookies.set("access_token", response.data.access)
        router.push({name:'account-import'})
    })
}


</script>

<style scoped>

.board{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    z-index: 0;
}
.round{
    height: 150vh;
    width: 150vh;
    background-color: rgba(255, 0, 0, 0.651);
    position: absolute;
    right: 55%;
    bottom: -25%;
    z-index: -99;
    border-radius: 100vh;
}
.whiteCircle{
    z-index: 0;
    height: 100vh;
    width: 100vh;
    top: 58%;
    left: -3%;
    transform: translate(50%, -50%);
    position: absolute;
}
.robot{
    z-index: 0;
    width: 480px;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    position: absolute;
}
.loginContainer{
    height: 100vh;
    position: relative;
}
</style>
