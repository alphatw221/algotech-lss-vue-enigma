<template> 
    <div class="outterContainer">
        <div  class="mx-2 my-10 sm:mt-20">
            <img :src="LSSLogo" class="mx-auto w-[250px] sm:w-[300px]">
        </div>

        <!-- BEGIN Tab List-->
        <div class="relative">
            

            <ul class="flex-none flex flex-wrap ml-14 sm:ml-0 py-2 flex-row justify-around w-full">
                <li class="flex-1 text-center">
                    <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                        <div
                            :class="{
                                'text-neutral-600 bg-white': showTab !== 1,
                                'text-white bg-primary': showTab === 1 
                                }" 
                            class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                            <UserIcon />
                        </div>
                        <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                            :class="{
                                'text-neutral-600': showTab !== 1,
                                'font-bold': showTab === 1,
                            }">
                        </div>
                    </div>
                </li>
                <li class="flex-1 text-center">
                    <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                        <div
                            :class="{
                            'text-neutral-600 bg-white': showTab !== 2,
                            'text-white bg-primary': showTab === 2,
                        }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                            <StarIcon />
                        </div>
                        <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                            :class="{
                                'text-neutral-600': showTab !== 2,
                                'font-bold': showTab === 2,
                            }">
                        </div>
                    </div>
                </li>
            </ul>

            <hr class="border-1 border-slate absolute z-index:2 left-0 w-full top-8">
        </div>
        <!-- END Tab List-->

        <div class="p-8 sm:px-20 lg:py-10 rounded-lg sm:mx-20 text-sm sm:text-lg">

            <div class="tab-content tab-space" v-show="showTab==1">
                

                <div class="flex-col w-full my-5" >
                    <label for="horizontal-form-1" class="w-48"> {{ $t("reset_password.user_name") }}</label>
                    <div class="input-group"> 
                         <input 
                            id="horizontal-form-1" 
                            class="form-control input_text" 
                            type="text"

                            v-model="route.query.username"
                            disabled
                        />
                    </div>
                </div>

                <div class="flex-col w-full my-5" >
                    <label for="horizontal-form-1" class="w-48">  {{ $t("reset_password.new_password") }}</label>
                    <div class="input-group"> 
                    <input 
                        id="horizontal-form-1" 
                        class="form-control input_text" 
                        :class="{ 'border-danger': v.new_password.$error }"
                        :type="showPassword ? 'text' : 'password'" 
                        v-model.trim="v.new_password.$model"
                    />
                    <button v-if="showPassword" 
                        @click="showPassword = !showPassword"
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeOffIcon /> </button> 
                    <button v-else
                        @click="showPassword = !showPassword"
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeIcon /> </button> 
                    </div>
                    <template v-for="error in v.new_password.$errors" :key="error.$uid">
                        <p class="text-danger text-[14px]">
                            {{ error.$message }}
                        </p>
                    </template>
                </div>
                
                
                <div class="flex-col w-full my-5" >
                    <label for="horizontal-form-1" class="w-48">{{ $t("reset_password.confirm_password") }}</label>
                    <div class="input-group"> 
                        <input 
                            id="horizontal-form-1" 
                            class="form-control input_text"  
                            :class=" { 'border-danger': v.new_password.$error } "
                            :type="showConfirmPassword ? 'text' : 'password'"
                            v-model.trim="v.confirm_password.$model"
                        />
                        <button v-if="showConfirmPassword" 
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeOffIcon /> 
                        </button> 
                        <button v-else
                            @click="showConfirmPassword= !showConfirmPassword"
                            class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeIcon /> 
                        </button> 
                    </div>
                    <template v-for="error in v.confirm_password.$errors" :key="error.$uid">
                        <p class="text-danger text-[14px]">
                            {{ error.$message }}
                        </p>
                    </template>
                </div>

                <div class=" flex items-center justify-between mt-10">
					<button type="button" class="btn btn-secondary inline-flex w-20 md:w-32 shadow-md ml-1 md:ml-5 whitespace-nowrap" @click="routeToHome()">{{ $t("reset_password.home") }}</button>

					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="submitPassword()">{{ $t("reset_password.submit") }}</button>
				</div> 

            </div>


            <div class="tab-content tab-space " v-show="showTab==2">
                
                <div class="bg-slate-300 rounded-lg py-5 px-4">
                     <div class="flex-col w-full my-5 " v-for="field_value,field_name ,index in confirmData" :key="index">
                        <label for="horizontal-form-1" class="w-48">{{ $t(`reset_password.${field_name}`) }}: </label>
                        <label for="horizontal-form-1" class="w-48">{{field_value}}</label>
                        
                    </div>
                </div>
               

                <div class=" flex items-center justify-between mt-10">
					<button type="button" class="btn btn-secondary inline-flex w-20 md:w-32 shadow-md ml-1 md:ml-5 whitespace-nowrap" @click="routeToHome()">{{ $t("reset_password.home") }}</button>

					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="routeToLoginPage()">{{ $t("reset_password.login") }}</button>
				</div> 
             

            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { seller_reset_password } from '@/api_v2/user.js';
import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'
const { createI18nMessage } = validators
import { computed } from '@vue/runtime-core';

import i18n from "@/locales/i18n";




import { useRoute, useRouter} from "vue-router"

import LSSLogo from "@/assets/images/lss-logo/LSS_logo_words.png"
import { usePublicLayoutStore } from "@/stores/lss-public-layout"

const publicLayout = usePublicLayoutStore()


const route = useRoute()
const router = useRouter()

const showTab = ref(1)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const homePageUrl = import.meta.env.VITE_LSS_HOME_PAGE_URL

const passwordData = ref({
    code:route.query.code,
    new_password: '',
    confirm_password: ''
})

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'overflow: hidden; height:100vh;')} )
const confirmData = ref({})

const messagePath = ({ $validator }) => `messages.${$validator}`
// Create your i18n message instance. Used for vue-i18n@9
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })
const required = withI18nMessage(validators.required, { messagePath: () => 'reset_password.error_messages.required' })
const minLength = withI18nMessage(validators.minLength, { withArguments: true, messagePath: () => 'reset_password.error_messages.minLength' })
const maxLength = withI18nMessage(validators.maxLength, { withArguments: true, messagePath: () => 'reset_password.error_messages.maxLength' })
const sameAs = withI18nMessage(validators.sameAs, { withArguments: true, messagePath: () => 'reset_password.error_messages.sameAs' })


const passwordRules = computed(() => {
    return {
        new_password: { required, minLength: minLength(8), maxLength: maxLength(20) },
        confirm_password: { sameAs: sameAs(passwordData.value.new_password) }
    }
})
const v = useVuelidate(passwordRules, passwordData)


const routeToHome = ()=>{window.location.href = homePageUrl}

const routeToLoginPage=()=>{ router.push({name:"LoginPage"}) }

const submitPassword = () => {
    v.value.$touch()
	if (v.value.$invalid) {
        publicLayout.alert.showMessageToast(i18n.global.t('reset_password.invalid_data'))
		return
	}

    seller_reset_password(passwordData.value).then(res => {
        publicLayout.notification.showMessageToast(i18n.global.t('reset_password.password_reset_successfully'))
        confirmData.value = res.data; 
        showTab.value = 2;
        })
}


</script>
<style scoped>
    /* temp   TODO: create a new page layout  */
    .outterContainer{
        height: 100vh; 
    }
</style>