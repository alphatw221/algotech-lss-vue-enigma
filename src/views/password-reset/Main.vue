<template> 
    <div class="outterContainer">
        <div  class="mx-2">
            <img :src="LSSLogo" class="mx-auto">
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
                    <label for="horizontal-form-1" class="w-48"> User Name</label>
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
                    <label for="horizontal-form-1" class="w-48">  New Password</label>
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
                    <template v-if="v.new_password.$error">
                        <label class="text-danger text-[14px]">
                            required
                        </label>
                    </template>
                </div>
                
                
                <div class="flex-col w-full my-5" >
                    <label for="horizontal-form-1" class="w-48">Confirm Password</label>
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
                    <template v-if="v.confirm_password.$error">
                        <label class="text-danger text-[14px]">
                            invalid
                        </label>
                    </template>
                </div>

                <div class=" flex items-center justify-between mt-10">
					<button type="button" class="btn btn-secondary inline-flex w-20 md:w-32 shadow-md ml-1 md:ml-5 whitespace-nowrap" @click="routeToHome()">Home</button>

					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="submitPassword()">Submit</button>
				</div> 

            </div>


            <div class="tab-content tab-space " v-show="showTab==2">
                
                <div class="bg-slate-300 rounded-lg py-5 px-4">
                     <div class="flex-col w-full my-5 " v-for="field_value,field_name ,index in confirmData" :key="index">
                        <label for="horizontal-form-1" class="w-48">{{field_name}}: </label>
                        <label for="horizontal-form-1" class="w-48">{{field_value}}</label>
                        
                    </div>
                </div>
               

                <div class=" flex items-center justify-between mt-10">
					<button type="button" class="btn btn-secondary inline-flex w-20 md:w-32 shadow-md ml-1 md:ml-5 whitespace-nowrap" @click="routeToHome()">Home</button>

					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="routeToLoginPage()">Login</button>
				</div> 
             

            </div>

        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import { seller_reset_password } from '@/api_v2/user.js';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators";
import { computed } from '@vue/runtime-core';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n";
import { useRoute, useRouter} from "vue-router"

import LSSLogo from "@/assets/images/lss-logo/LSS_logo_words.png"

const sellerStore = useLSSSellerLayoutStore()

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

const confirmData = ref({})

const passwordRules = computed(() => {
    return {
        new_password: { minLength: minLength(8), maxLength: maxLength(20) },
        confirm_password: { sameAs: sameAs(passwordData.value.new_password) }
    }
})
const v = useVuelidate(passwordRules, passwordData)

const routeToHome = ()=>{window.location.href = homePageUrl}

const routeToLoginPage=()=>{ router.push({name:"LoginPage"}) }

const submitPassword = () => {
    v.value.$touch()
	if (v.value.$invalid) {
        alert('invalid data') //temp TODO: tostify
		return
	}

    seller_reset_password(passwordData.value).then(res => {
        alert('password reset successfully') //temp TODO: tostify
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