<template>
<div class="board bg-white"> 
    <div class="round hidden sm:block"> 
        <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
        <img src="/src/assets/images/login-page/robot.svg"  class="robot" />    
    </div>
    <div class="loginContainer w-full sm:w-[480px] m-0 sm:mr-[10%] bg-red-500/25 sm:bg-transparent float-center sm:float-right"> 
        <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 top-2" />
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 left-20 z-10 -translate-y-1/3 -rotate-3" />    
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 right-20 z-10 -translate-y-1/3 rotate-3" />    
        <div class="flex relative flex-col items-center p-10 text-center z-0 center w-full h-3/4 sm:h-fit sm:w-[375px] right-50 top-1/4 sm:top-0 sm:translate-y-1/3 abosolute bg-white sm:opacity-95">
            <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />

            <template v-if="true">

                <h3 class="text-[1.8rem] mx-auto my-6 font-medium" >{{ $t('login.seller')}}{{ $t('login.login') }}</h3>
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
                            :type="showLoginPassword ? 'text' : 'password'" 
                            @keydown.enter.prevent="signIn()" />
                        <EyeOffIcon v-if="showLoginPassword"
                            @click="showLoginPassword = !showLoginPassword" 
                            class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400" /> 
                        <EyeIcon v-else
                            @click="showLoginPassword = !showLoginPassword"
                            class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"
                            />
                    </div>
                    <button type="button" class="w-full h-[42px] text-lg text-white btn bg-red-500" @click="signIn()" >{{ $t('login.sign_in') }}</button>
                </form>

            <a class="mx-auto item-center text-[16px] mt-8 font-medium" @click="router.push({ name: 'password-forget' })">{{ $t('login.forgot_password') }}</a>


            </template>
            <template v-else>


                <h3 class="text-[1.8rem] mx-auto my-6 font-medium" >Seller Register</h3>
                <form class="w-full flex-col flex gap-5 z-10">
                    <div class="relative"> 
                        <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                        <input type="email" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                            :placeholder="$t('login.email')" 
                            v-model="registerData.email" 
                        />
                    </div>
                    <div class="relative"> 
                        <input class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                            :placeholder="$t('login.password')" 
                            v-model="registerData.password"
                            :type="showRegisterPassword ? 'text' : 'password'" 
                            />
                        <EyeOffIcon v-if="showRegisterPassword"
                            @click="showRegisterPassword = !showRegisterPassword" 
                            class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400" /> 
                        <EyeIcon v-else
                            @click="showRegisterPassword = !showRegisterPassword"
                            class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"
                            />
                    </div>

                </form>


            </template>

     
        </div>
    </div>
    
</div>
    
</template>

<script setup>

import { user_login, user_register } from '@/api_v3/user'

import { useLSSSellerLayoutStore } from '../../stores/lss-seller-layout';
import {ref, onMounted, computed, getCurrentInstance } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useVuelidate } from "@vuelidate/core";
import { required,integer, sameAs } from "@vuelidate/validators"

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { useToast } from "vue-toastification";
const toast = useToast();
  


const route = useRoute()
const router = useRouter()
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
// const currentUrl = ref(window.location.href)
// const showReminder = ref(false)
const showLoginPassword = ref(false)
const loginData = ref(
    {email:'',password:''})


const showRegisterPassword = ref(false)
const registerData = ref({
    first_name: "",
    last_name: "",
    organization_name:"",
    // plan:"", 
    // period:"",
    // countryCode:"",
    // contactNumber:"",
    email: "",
    password:"",
    confirm_password:"",
    // country:"",
    // promoCode:"",
    // intentSecret:"",
    privacy_policy:"",
    // is_welcome_gift_used: null,
    // timezone:Intl.DateTimeFormat().resolvedOptions().timeZone
})


const layoutStore = useLSSSellerLayoutStore()




const signIn = ()=>{ 
    // validate.value.$touch();
    // if (validate.value.$invalid) {
    //     alert('Input info is invalid')
    //     return
    // } 
    // console.log('signIn')  response.data.access
    user_login(loginData.value).then(res=>{

        console.log(res)
        cookies.set("user_access_token", res?.data?.user_access_token)
        toast.success("Login Success");
        layoutStore.isAuthenticated = true
        layoutStore.userInfo = res.data?.user
        router.push({name:'campaign-list'})
    })
}






// const registerationStore = useSellerRegistrationStore()


const registerRules = computed(()=> {
    return {
        first_name: { required },
        last_name: { required },
        organization_name: {required },
        // plan: { required },
        // period: { required },
        // countryCode: { required },
        // contactNumber: { required,integer },
        email: { required },
        password: { required },
        confirm_password: { required, sameAs: sameAs(registerData.value.password)  },
        // country: { required },
        privacy_policy: { required }
    }
});

const registerValidate = useVuelidate(registerRules, registerData);

const submitRegisterData=()=>{
    registerValidate.value.$touch();
    if (registerValidate.value.$invalid) {
        toast.error(i18n.global.t('profile.invalid_data'));
        return
    }
    console.log(registerData.value)
    user_register(registerData.value).then(res=>{
        // console.log(res?.data)
        cookies.set("user_access_token", res?.data?.user_access_token)
        toast.success("Registration Success");

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
