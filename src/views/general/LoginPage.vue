<template>
<div class="board bg-white"> 
    <div class="round"> 
        <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
        <img src="/src/assets/images/login-page/robot.svg"  class="robot hidden sm:block" />    
    </div>
</div>
<div class="container w-[100%] sm:w-[480px] m-0 sm:mr-[10%] float-center sm:float-right"> 
    <div class="flex flex-col items-center p-10 text-center center w-[375px]">
        <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
        <h3 class="text-[1.8rem] mx-auto my-10 font-medium" >Login</h3>
        <form class="w-full flex-col flex gap-5 z-10">
            <div class="relative"> 
                <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                <input type="email" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                    placeholder="Email" 
                    v-model="loginData.email" 
                    @keydown.enter.prevent="signIn()" />
            </div>
            <div class="relative"> 
                <input class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                    placeholder="Password" 
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
            <button type="button" class="w-full h-[42px] text-lg text-white btn bg-red-500" @click="signIn()" >Sign in</button>
        </form>

        <a class="mx-auto item-center text-[16px] mt-8 font-medium" @click="router.push({ name: 'PasswordForgot' })">forgot password ?</a>

        <div class="flex flex-col items-center mt-3 font-medium">
            <div class="text-[16px]">No Account ? <a @click="router.push({ name: 'register' })" >Create one !</a></div>
        </div>
        <!-- <div class="flex flex-col items-center my-5">
            <FacebookLoginButton />
            <GoogleLoginButton /> 
        </div> -->
    </div>
</div>
    
</template>

<script setup>
import { seller_general_login } from '@/api_v2/user';
import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';

import {ref, onMounted, onBeforeMount, computed } from 'vue'
import {useRoute, useRouter} from 'vue-router'

// import { useVuelidate } from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0;')} )
  
onMounted(()=>{
    // console.log(navigator.userAgent.toLowerCase())
    
    if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && navigator.userAgent.toLowerCase().indexOf('safari') < 0 ) {
        showReminder.value=true
    }
})

const route = useRoute()
const router = useRouter()
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
    seller_general_login(loginData.value).then(response=>{
        cookies.set("access_token", response.data.access)
        cookies.set("login_with", 'general')
        router.push({name:'campaign-list'})
    }).catch(err=>{
        console.log('123')
        console.log(err)
    })
}


</script>

<style scoped>

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