<template>
<LoginRegisterTheme>
        <template v-slot:form>
            <h3 class="text-[1.8rem] text-center my-6 font-medium" >Seller Register</h3>
            <form class="w-full flex-col flex gap-5 z-10">


                <div class="flex flex-row justify-between gap-3">

                    <div>
                        <label class="ml-2 text-base form_label text-left"> First Name</label>

                        <div class="relative"> 
                            <UserIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                            <input type="text" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"

                                v-model="registerData.first_name" />
                            
                            <template  v-for="err, i in (registerValidate?.first_name?.$errors||[])" :key="i">
                                <label class="text-danger text-[16px] leading-tight">
                                    {{err?.$message||''}}
                                </label>
                            </template>
                        </div>
                    </div>
                  
                    <div>
                        <label class="ml-2 text-base form_label text-left"> Last Name</label>
                        <div class="relative"> 
                            <UserIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                            <input type="text" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"

                                v-model="registerData.last_name" />
                            
                            <template  v-for="err, i in (registerValidate?.last_name?.$errors||[])" :key="i">
                                <label class="text-danger text-[16px] leading-tight">
                                    {{err?.$message||''}}
                                </label>
                            </template>
                        </div>
                    </div>
                   
                </div>
               
                <div>
                    <label class="ml-2 text-base form_label text-left"> Organization</label>
                    <div class="relative"> 
                        <BuildingIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                        <input type="text" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                            v-model="registerData.organization_name" />
                        
                        <template  v-for="err, i in (registerValidate?.organization_name?.$errors||[])" :key="i">
                            <label class="text-danger text-[16px] leading-tight">
                                {{err?.$message||''}}
                            </label>
                        </template>
                    </div>
                </div>
               

                <div>
                    <label class="ml-2 text-base form_label text-left"> Email</label>
                    <div class="relative"> 
                        <MailIcon class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"/>
                        <input type="email" class="h-[45px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                            :placeholder="'example@mail.com'" 
                            v-model="registerData.email" 
                            @keydown.enter.prevent="signIn()" />
                        
                        <template  v-for="err, i in (registerValidate?.email?.$errors||[])" :key="i">
                            <label class="text-danger text-[16px] leading-tight">
                                {{err?.$message||''}}
                            </label>
                        </template>
                    </div>
                </div>
              

                <div class="flex flex-row justify-between gap-3">

                    <div>
                        <label class="ml-2 text-base form_label text-left"> Password</label>
                        <div class="relative"> 
                            <input class="h-[45px] pr-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                                :placeholder="'8-20 digits'" 
                                v-model="registerData.password"
                                :type="showRegisterPassword ? 'text' : 'password'" 
                                />
                            <EyeOffIcon v-if="showRegisterPassword"
                                @click="showRegisterPassword = !showRegisterPassword" 
                                class="absolute w-6 h-6 top-3 right-3 z-10 text-slate-400 cursor-pointer" /> 
                            <EyeIcon v-else
                                @click="showRegisterPassword = !showRegisterPassword"
                                class="absolute w-6 h-6 top-3 right-3 z-10 text-slate-400 cursor-pointer"
                                />
                            <template  v-for="err, i in (registerValidate?.password?.$errors||[])" :key="i">
                                <label class="text-danger text-[16px] leading-tight">
                                    {{err?.$message||''}}
                                </label>
                            </template>
                        </div>
                    </div>
                   
                    <div>
                        <label class="ml-2 text-base form_label text-left"> Confirm Password</label>
                        <div class="relative"> 
                            <input class="h-[45px]  pr-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                                v-model="registerData.confirm_password"
                                :type="showConfirmRegisterPassword ? 'text' : 'password'" 
                                />
                            <EyeOffIcon v-if="showConfirmRegisterPassword"
                                @click="showConfirmRegisterPassword = !showConfirmRegisterPassword" 
                                class="absolute w-6 h-6 top-3 right-3 z-10 text-slate-400 cursor-pointer" /> 
                            <EyeIcon v-else
                                @click="showConfirmRegisterPassword = !showConfirmRegisterPassword"
                                class="absolute w-6 h-6 top-3 right-3 z-10 text-slate-400 cursor-pointer"
                                />
                            <template  v-for="err, i in (registerValidate?.confirm_password?.$errors||[])" :key="i">
                                <label class="text-danger text-[16px] leading-tight">
                                    {{err?.$message||''}}
                                </label>
                            </template>
                        </div>
                    </div>
                  

                </div>
            

                
                <!-- <div class="flex flex-row items-center"> 

                    <input type="checkbox" v-model="registerData.accept_tnc" class="text-red-600 border-gray-300 focus:ring-red-500 mr-1" /><label class="text-[16px] ">Remember me</label>

                    <label :class="{ 'text-danger font-blod': validate.privacy_policy.$error }" > 
                        {{$t('register.basic_info.policy.accept')}} 
                        <a :class="{ 'text-danger font-blod': validate.privacy_policy.$error }" 
                            :href="registerationStore.terms" >{{$t('register.basic_info.policy.terms')}} 
                            </a> {{$t('register.basic_info.policy.&')}}
                        <a :class="{ 'text-danger font-blod': validate.privacy_policy.$error }"
                            :href="registerationStore.policy" >{{$t('register.basic_info.policy.conditions')}}</a> 
                    </label>
                </div> -->


                <button type="button" class="w-full h-[42px] text-lg text-white btn bg-red-500 mt-2" @click="submitRegisterData()" >Register</button>
            </form>

           

            <div class="text-center mt-5">  
                <a class="ml-[5px] text-[16px]" @click="router.push({ name: 'login-page' })">Back to Login Page</a>
            </div>

        </template>
    </LoginRegisterTheme>
</template>

<script setup>

import {  user_register } from '@/api_v3/user'

import { useLSSSellerLayoutStore } from '../../stores/lss-seller-layout';
import {ref, onMounted, computed, getCurrentInstance } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useVuelidate } from "@vuelidate/core";
import { required,integer, sameAs } from "@vuelidate/validators"

import LoginRegisterTheme from './LoginRegisterTheme.vue'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { useToast } from "vue-toastification";
const toast = useToast();
  


const route = useRoute()
const router = useRouter()

const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
// const currentUrl = ref(window.location.href)
// const showReminder = ref(false)


const showRegisterPassword = ref(false)
const showConfirmRegisterPassword = ref(false)
const registerData = ref({
    first_name: "",
    last_name: "",
    organization_name:"",
    email: "",
    password:"",
    confirm_password:"",
})


const layoutStore = useLSSSellerLayoutStore()










// const registerationStore = useSellerRegistrationStore()


const registerRules = computed(()=> {
    return {
        first_name: { required },
        last_name: { required },
        organization_name: {required },
        email: { required },
        password: { required },
        confirm_password: { required, sameAs: sameAs(registerData.value.password)  },
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


        layoutStore.isAuthenticated = true
        layoutStore.userInfo = res.data?.user
        router.push({name:'campaign-list'})
        
    })
    
}





</script>

<style scoped>


</style>
