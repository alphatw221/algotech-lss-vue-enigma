<template>


    <LoginRegisterTheme>
        <template v-slot:form>
            <h3 class="text-[1.8rem] text-center my-6 font-medium" >{{ $t('login.seller')}}{{ $t('login.login') }}</h3>
            <form class="w-full flex-col flex gap-5 z-10">
                <div class="relative"> 
                    <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                    <input type="email" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('login.email')" 
                        v-model="loginData.email" 
                        @keydown.enter.prevent="signIn()" />
                    
                    <template  v-for="err, i in (loginValidate?.email?.$errors||[])" :key="i">
                        <label class="text-danger text-[16px] leading-tight">
                            {{err?.$message||''}}
                        </label>
                    </template>
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
                    <template  v-for="err, i in (loginValidate?.password?.$errors||[])" :key="i">
                        <label class="text-danger text-[16px] leading-tight">
                            {{err?.$message||''}}
                        </label>
                    </template>

                    <div class="flex flex-row justify-between px-2 mt-2">
                        <div class="flex flex-row items-center">
                            <input type="checkbox" v-model="rememberMe" class="text-red-600 border-gray-300 focus:ring-red-500 mr-1" /><label class="text-[16px] ">Remember me</label>
                        </div>
                        <a class=" text-[16px] " @click="router.push({ name: 'password-forget' })">Forgot password?</a>
                    </div>
                </div>

                

                <button type="button" class="w-full h-[42px] text-lg text-white btn bg-red-500 mt-2" @click="signIn()" >{{ $t('login.sign_in') }}</button>
            </form>

           

            <div class="text-center mt-5">  
                <span class="text-[16px]">Need a Account?</span><a class="ml-[5px] text-[16px]" @click="router.push({ name: 'registration-page' })">Sign Up</a>
            </div>
        </template>
    </LoginRegisterTheme>
</template>

<script setup>
import LoginRegisterTheme from './LoginRegisterTheme.vue'

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


const showLoginPassword = ref(false)
const rememberMe = ref(cookies.get('me')?true:false)
const loginData = ref(
    {email:cookies.get('me')||'',password:''})

const loginRules = computed(()=> {
    return {
        email: { required },
        password: { required },
    }
});

const loginValidate = useVuelidate(loginRules, loginData);






const layoutStore = useLSSSellerLayoutStore()




const signIn = ()=>{ 
    loginValidate.value.$touch();
    if (loginValidate.value.$invalid) {
        console.log(loginValidate.value)
        toast.error("Invalid");
        return
    } 

    user_login(loginData.value).then(res=>{

        if(rememberMe.value){
            cookies.set('me', loginData.value.email)
        }
        console.log(res)
        cookies.set("user_access_token", res?.data?.user_access_token)
        toast.success("Login Success");
        layoutStore.isAuthenticated = true
        layoutStore.userInfo = res.data?.user
        router.push({name:'campaign-list'})
    })
}








</script>

<style scoped>

</style>
