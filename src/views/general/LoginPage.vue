<template>
<div class="board bg-white"> 
    <div class="round hidden sm:block"> 
        <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
        <img src="/src/assets/images/login-page/robot.svg"  class="robot" />    
    </div>
    <div class="container w-[100%] sm:w-[480px] m-0 sm:mr-[10%] bg-red-500/25 sm:bg-transparent float-center sm:float-right"> 
        <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 top-2" />
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 left-20 z-10 -translate-y-1/3 -rotate-3" />    
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 right-20 z-10 -translate-y-1/3 rotate-3" />    
        <div class="flex relative flex-col items-center p-10 text-center z-0 center w-full h-3/4 sm:h-fit sm:w-[375px] right-50 top-1/4 sm:top-0 sm:translate-y-1/3 abosolute bg-white sm:opacity-95">
            <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
            <h3 class="text-[1.8rem] mx-auto my-10 font-medium" >{{ $t('login.login') }}</h3>
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

            <a class="mx-auto item-center text-[16px] mt-8 font-medium" @click="router.push({ name: 'password-forgot' })">{{ $t('login.forgot_password') }}</a>

            <div class="flex flex-col items-center mt-3 font-medium">
                <div class="text-[16px]">{{ $t('login.no_account') }}<a href="https://share.hsforms.com/1sclKwJe_QCaqxyzSgbk6kAd0w75" class="ml-1">{{ $t('login.create_one') }}</a></div>
            </div>
            <!-- <div class="flex flex-col items-center my-5">
                <FacebookLoginButton />
                <GoogleLoginButton /> 
            </div> -->
        </div>
    </div>
    
</div>
    
</template>

<script setup>
import { seller_general_login } from '@/api_v2/user';
import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import { useLSSSellerLayoutStore } from '../../stores/lss-seller-layout';
import {ref, onMounted, onBeforeMount, computed, getCurrentInstance } from 'vue'
import {useRoute, useRouter} from 'vue-router'

// import { useVuelidate } from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

onBeforeMount (()=>{
    document.querySelector('body').setAttribute('style', 'padding-left: 0; padding-right: 0; overflow: hidden; height:100vh;')
})
  
onMounted(()=>{
    
    if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && navigator.userAgent.toLowerCase().indexOf('safari') < 0 ) {
        showReminder.value=true
    }
})

const route = useRoute()
const router = useRouter()
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const currentUrl = ref(window.location.href)
const showReminder = ref(false)
const showPassword = ref(false)
const loginData = ref(
    {email:'',password:''})

const copyLink = ()=>{
    navigator.clipboard.writeText(currentUrl.value).then(()=>{
        alert('copied!')
    })
}

const layoutStore = useLSSSellerLayoutStore()

// const rules = computed(()=> {
//     return {
//         email: { required, email },
//         password: { required},
//     }
// })
// const validate = useVuelidate(rules, loginData);

const signIn = ()=>{ 
    // validate.value.$touch();
    // if (validate.value.$invalid) {
    //     alert('Input info is invalid')
    //     return
    // } 
    // console.log('signIn')  response.data.access
    console.log(layoutStore)
    seller_general_login(loginData.value).then(response=>{
        cookies.set("access_token", response.data.access)
        cookies.set("login_with", 'general')
        router.push({name:'campaign-list'})
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
.container{
    height: 100vh;
    position: relative;
}
</style>
