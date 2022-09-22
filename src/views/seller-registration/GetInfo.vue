<template> 
    <div :class="{ hidden: registerationStore.registerTab !== 1, block: registerationStore.registerTab === 1 }">
        <form class="flex-col flex gap-8" >
        
            <div class="flex-col">
                <label for="" class="subLabel">{{$t('register.basic_info.plan')}}</label><span class="text-danger"> *</span>
                <select 
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.plan.$error }" 
                    v-model="validate.plan.$model"
                >
                <template v-for="(plan, key) in getPrice.plans" :key="key" >
                    <option v-if="plan.text != 'Free Trial'" :value="plan.value" class="w-40"> 
                    {{ $t(`register.basic_info.plan_options.` + plan.value, {price: `${getPrice.currency} ${(plan.price.month).toLocaleString('en-GB')}`}) }}
                    </option>
                </template>
                </select>
                <template v-if="validate.plan.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('register.basic_info.required_field')}}
                    </label>
                </template>
            </div>

            <div class="flex-col">
                <label for="" class="subLabel" >{{$t('register.basic_info.period')}}</label><span class="text-danger"> *</span> 
                    <select 
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                        v-model="validate.period.$model"
                    >
                    <template v-for="(period, key) in periodOptions" :key="key">  
                        <option
                            v-if=" period.value == 'year' && route.query.country == 'TW'" 
                            :value="period.value" class="w-40"> 
                            {{ $t(`register.basic_info.period_options.` + 'year_tw') }} 
                        </option>
                        <option
                            v-else
                            :value="period.value" class="w-40"> 
                            {{ $t(`register.basic_info.period_options.` + period.value) }} 
                        </option>
                    </template>
                    
                </select>
                <template v-if="validate.period.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('register.basic_info.required_field')}}
                    </label>
                </template>
            </div>

            <div class="flex flex-row gap-8">
                <div class="flex-col w-1/2">
                    <label for="firstName">{{$t('register.basic_info.first_name')}} </label><span class="text-danger"> *</span>
                    <input class="form-control" v-model="validate.firstName.$model" />
                </div>
                <div class="flex-col w-1/2">
                    <label for="lastName">{{$t('register.basic_info.last_name')}}</label><span class="text-danger"> *</span>
                    <input class="form-control" v-model="validate.lastName.$model" />
                </div>
            </div>

            <div class="flex flex-row gap-8"> 
                <div class="flex-col w-1/3">
                    <div class="whitespace-nowrap"><label for="" class="subLabel" >{{$t('register.basic_info.country_code')}}</label><span class="text-danger"> *</span></div> 
                        <select 
                            class="w-full form-select sm:form-select-lg rounded-lg" 
                            :class="{ 'border-danger text-danger border-2': validate.countryCode.$error }" 
                            v-model="validate.countryCode.$model"
                        >
                            <option :value="route.query.country" class="w-40">
                                {{ $t(`register.basic_info.code_Options.` + route.query.country) }}
                            </option>
                            <!-- <option v-for="(code, key) in countryCodeOptions" :key="key" :value="code.value" class="w-40">
                                    {{ $t(`register.basic_info.code_Options.` + code.value) }}
                            </option> -->
                        </select>
                    <template v-if="validate.countryCode.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            {{$t('register.basic_info.required_field')}}
                        </label>
                    </template>
                </div>
                <div class="flex-col w-2/3">
                    <label for="" class="subLabel" >{{$t('register.basic_info.number')}}</label><span class="text-danger"> *</span>
                    <input class="form-control" v-model="validate.contactNumber.$model"/> 
                    <template v-if="validate.contactNumber.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            {{$t('register.basic_info.required_field')}}
                        </label>
                    </template>
                </div>
            </div>

            <div class="flex-col">
                <label class="subLabel" >{{$t('register.basic_info.email')}}</label><span class="text-danger"> *</span>
                    <div class="relative"> 
                        <MailIcon class="absolute w-6 h-6 top-2.5 left-3 z-10 text-slate-400"/>
                        <input type="email" class="iconInput form-control"
                            placeholder="Enter your e-mail" 
                            v-model="validate.email.$model" />
                    </div>
                    <template v-if="validate.email.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            {{$t('register.basic_info.required_field')}}
                        </label>
                    </template>
            </div>

            <div class="flex-col">
                <label for="" class="subLabel" >{{$t('register.basic_info.password')}}</label><span class="text-danger"> *</span>
                <div class="relative">  
                    <input class="iconInput form-control"
                        v-model="validate.password.$model"
                        :type="showPassword ? 'text' : 'password'" />
                    <EyeOffIcon v-if="showPassword"
                        @click="showPassword = !showPassword" 
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400" /> 
                    <EyeIcon v-else
                        @click="showPassword = !showPassword"
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"
                        />
                </div>
                <template v-if="validate.password.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('register.password_length')}}
                    </label>
                </template>
            </div>
            
            <div class="flex-col">
                <label for="" class="subLabel" >{{$t('register.basic_info.confirm_password')}}</label><span class="text-danger"> *</span>
                <div class="relative">  
                    <input class="iconInput form-control"
                        v-model="validate.confirmPassword.$model"
                        :type="showConfirmPassword ? 'text' : 'password'" />
                    <EyeOffIcon v-if="showConfirmPassword"
                        @click="showConfirmPassword = !showConfirmPassword" 
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400" /> 
                    <EyeIcon v-else
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"
                        />
                </div>
                <template v-if="validate.confirmPassword.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('register.basic_info.password_err')}}
                    </label>
                </template>
            </div>

            <div class="flex-col">
                <label for="" class="subLabel" >{{$t('register.basic_info.target_country')}}</label><span class="text-danger"> *</span>
                <select 
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.country.$error }" 
                    v-model="validate.country.$model"
                >
                <template v-if="route.query.country=='VN'">
                    <option  :value="route.query.country" class="w-40"> 
                    {{ $t(`register.basic_info.country_Options.Vietnam`) }} 
                    </option>
                </template>
                <template v-else>
                    <option v-for="(country, key) in countryOptions" :key="key" :value="country.value" class="w-40"> 
                    {{ $t(`register.basic_info.country_Options.` + country.value) }} 
                    </option>
                </template>
                    
                </select>
                <template v-if="validate.country.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('register.basic_info.required_field')}}
                    </label>
                </template>
            </div>
            
            <label for="" class="subLabel text-danger">{{$t('register.basic_info.welcome_gift')}}</label>

            <div class="flex" v-if="basicInfo.plan=='standard' || basicInfo.plan=='premium'">
                <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto" type="checkbox" v-model="havePromoCode" />
                <label>{{$t('register.basic_info.promocode_question')}}</label>
            </div >

            <div class="flex-col" v-if="(basicInfo.plan=='standard' || basicInfo.plan=='premium') && havePromoCode" >
                <label class="w-fit whitespace-nowrap">{{$t('register.basic_info.promocode')}}</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="basicInfo.promoCode"
                />
            </div>
            <p v-if="!havePromoCode">
                {{basicInfo.promoCode=""}}
            </p> 
            
            <div class="flex"> 
                <input type="checkbox" v-model="validate.privacyPolicy.$model"
                    class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto"
                    />
                <label :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" > 
                    {{$t('register.basic_info.policy.accept')}} 
                    <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" 
                        :href="registerationStore.terms" >{{$t('register.basic_info.policy.terms')}} 
                        </a> {{$t('register.basic_info.policy.&')}}
                    <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }"
                        :href="registerationStore.policy" >{{$t('register.basic_info.policy.conditions')}}</a> 
                </label>
            </div>
        </form>
        <div class="flex justify-between my-10">
            <a class="text-center btn btn-secondary" :href="registerationStore.home" >
                {{$t('register.basic_info.home')}}
            </a> 
            <button class="btn btn-primary"
                @click="submitBasicInfo()"
                > {{$t('register.basic_info.next')}}
            </button>
        </div> 
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance, onBeforeMount } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required,integer, sameAs } from "@vuelidate/validators"
import { seller_validate_register } from '@/api_v2/user'
import { get_subscription_plan } from '@/api_v2/business_policy'

import i18n from "@/locales/i18n"
import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"
import { usePublicLayoutStore } from "@/stores/lss-public-layout"

const layoutStore = usePublicLayoutStore()
const registerationStore = useSellerRegistrationStore()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
// const props = defineProps({
//     payment: Object, 
// })



onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0;')} )

const getPrice = ref({
    plans:"",
    price: ""
})
onBeforeMount(()=>{
    get_subscription_plan(route.query.country).then(res=>{
        getPrice.value = res.data
        // console.log(getPrice.value)
    })
})

const route = useRoute()
const router = useRouter()

const planOptions = [{ value: "lite" },{ value: "standard" },{ value: "premium" }]
const periodOptions = [{ value: "month" },{ value: "year" }]
const countryCodeOptions = [{ value: "MY" },{ value: "ID" },{ value: "PH" },{ value: "SG" },{ value: "TW" }]
const countryOptions = [{ value: "Australia" },{ value: "Cambodia" },{ value: "Canada" },{ value: "Hong Kong" },{ value: "Indonesia" },{ value: "Korea" }
,{ value: "Malaysia" },{ value: "Philippines" },{ value: "Singapore" },{ value: "Taiwan" },{ value: "Thailand" },{ value: "United States" },{ value: "Vietnam" }]

// const secured = ref({ src: "@/assets/images/lss-img/secured_tag.jpeg"})

const havePromoCode = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const basicInfo = ref({
    firstName: "",
    lastName: "",
    plan:"", 
    period:"",
    countryCode:"",
    contactNumber:"",
    email: "",
    password:"",
    confirmPassword:"",
    country:"",
    promoCode:"",
    intentSecret:"",
    privacyPolicy:"",
    is_welcome_gift_used: null,
    timezone:Intl.DateTimeFormat().resolvedOptions().timeZone
})

const rules = computed(()=> {
    return {
        firstName: { required },
        lastName: { required },
        plan: { required },
        period: { required },
        countryCode: { required },
        contactNumber: { required,integer },
        email: { required },
        password: { required },
        confirmPassword: { required, sameAs: sameAs(basicInfo.value.password)  },
        country: { required },
        privacyPolicy: { required }
    }
});

const validate = useVuelidate(rules, basicInfo);

const submitBasicInfo=()=>{
    validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('profile.invalid_data'))
        return
    }
    // console.log(basicInfo.value)
    seller_validate_register(route.query.country, basicInfo.value).then(res=>{
        eventBus.emit("showPaymentTab", {'basicInfo':basicInfo.value, 'confirmInfo':res.data} )
    }).catch( err=>{registerationStore.registerTab = 1})
    
}

</script>

<style scoped>
    input{
        border: 1.5px solid #c5cad1;
        padding: 10px;
        height: 45px;
    }
    select{
        border: 1.5px solid #c5cad1;
        height: 45px;
    }

    .form-check-input{
        border: 2px solid #c5cad1;
    }

    .iconInput{
        padding-left: 44px;
        height: 45px;
    }
    .form-check-input{
        height: 1.2rem; 
        width: 1.2rem; 
    }
</style>