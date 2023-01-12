<template>
    <div :class="{ hidden: layout.changePlanTab !== 1, block: layout.changePlanTab === 1 }">

        <UserInfo /> 
        
        <form>
            <div class="p-3 pt-5 flex-col flex gap-5"> 
                <div class="flex-col">
                    <label for="" class="subLabel">{{$t('change_plan.step_1.choose_plan')}}</label><span class="text-danger"> *</span>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.plan.$error }" 
                        v-model="validate.plan.$model"
                    >
                        <template v-if="originalPlan==='admin'" :value="plan.value" class="w-40"> 
                            <template v-for="(item, key, index) in getPrice.plans" :key="index">
                                <option  :value="key" class="w-40"> 
                                    {{ $t(`register.basic_info.plan_options.${key}`, {price: `${getPrice.currency} ${(item.price.month).toLocaleString('en-GB')}`}) }}
                                </option>
                            </template>
                        </template>

                        <template v-if="originalPlan==='lite'|| originalPlan === 'standard'" :value="plan.value" class="w-40"> 
                            <template v-for="(item, key, index) in getPrice.plans" :key="index">
                                <option  v-if="['trial','kol'].includes(key) == false" :value="key" class="w-40"> 
                                    {{ $t(`register.basic_info.plan_options.${key}`, {price: `${getPrice.currency} ${(item.price.month).toLocaleString('en-GB')}`}) }}
                                </option>
                            </template>
                        </template>

                        <template v-if="originalPlan==='premium'" :value="plan.value" class="w-40"> 
                            <template v-for="(item, key, index) in getPrice.plans" :key="index">
                                <option  v-if="['trial','standard','kol'].includes(key) == false" :value="key" class="w-40"> 
                                    {{ $t(`register.basic_info.plan_options.${key}`, {price: `${getPrice.currency} ${(item.price.month).toLocaleString('en-GB')}`}) }}
                                </option>
                            </template>
                        </template>

                        <template v-if="originalPlan==='trial' || originalPlan==='dealer'" :value="plan.value" class="w-40"> 
                            <template v-for="(item, key, index) in getPrice.plans" :key="index">
                                <option  v-if="['trial','kol'].includes(key) == false" :value="key" class="w-40"> 
                                    {{ $t(`register.basic_info.plan_options.${key}`, {price: `${getPrice.currency} ${(item.price.month).toLocaleString('en-GB')}`}) }}
                                </option>
                            </template>
                        </template>
                    </select>
                    <template v-if="validate.plan.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            {{$t('change_plan.step_1.required_field')}}
                        </label>
                    </template>
                </div>

                <div class="flex-col">
                    <label for="" class="subLabel" >{{$t('change_plan.step_1.choose_period')}}</label><span class="text-danger"> *</span>
                        <select 
                            id="prizeSelect"
                            class="w-full form-select sm:form-select-lg rounded-lg" 
                            :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                            v-model="validate.period.$model"
                        >
                        <option v-if=" dayLeft < 31" 
                            :value="periodOptions[0].value" class="w-40"> 
                            {{ $t(`change_plan.step_1.period_options.month`) }} 
                        </option>
                        <option
                            v-if="layout.userInfo.user_subscription.country == 'TW'" 
                            :value="periodOptions[1].value" class="w-40"> 
                            {{ $t(`register.basic_info.period_options.` + 'year_tw') }} 
                        </option>
                        <option
                            v-else
                            :value="periodOptions[1].value" class="w-40"> 
                            {{ $t(`register.basic_info.period_options.year`) }} 
                        </option>
                    </select>
                    <template v-if="validate.period.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            {{$t('change_plan.step_1.required_field')}}
                        </label>
                    </template>
                </div>
                
                <div class="flex" v-if="layout.userInfo.meta.is_welcome_gift_used != undefined && layout.userInfo.meta.is_welcome_gift_used === false">
                    <label for="" class="subLabel text-danger">{{$t('change_plan.step_1.welcome_gift')}}</label>
                </div>

                <div class="flex" v-if="selectedPlan.plan=='standard' || selectedPlan.plan=='premium'">
                    <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto" type="checkbox" v-model="havePromoCode" />
                    <label>{{$t('change_plan.step_1.promocode_question')}}</label>
                </div >

                <div class="flex-col" v-if="(selectedPlan.plan=='standard' || selectedPlan.plan=='premium') && havePromoCode" >
                    <label class="w-fit whitespace-nowrap">{{$t('change_plan.step_1.promocode')}}</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="selectedPlan.promoCode"
                    />
                </div>
                <p v-if="!havePromoCode">
                    {{selectedPlan.promoCode=""}}
                </p> 
                <div class="flex-col">
                    <div class="flex"> 
                        <input type="checkbox" v-model="validate.privacyPolicy.$model"
                            class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto"
                            />
                        <label :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" > 
                            {{$t('change_plan.step_1.policy.accept')}} 
                            <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" 
                                :href="termsUrl">{{$t('change_plan.step_1.policy.terms')}} 
                                </a> {{$t('change_plan.step_1.policy.&')}}
                            <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }"
                                :href="privacyPolicyUrl">{{$t('change_plan.step_1.policy.conditions')}}</a> 
                        </label>
                    </div>
                    <!-- <template v-if="validate.privacyPolicy.$error">
                        <label class="text-danger text-[16px] leading-tight">
                            please Accept Terms & Conditions
                        </label>
                    </template> -->
                </div>
            </div>
        </form>

        <div class="flex justify-between my-10">
            <!-- <button class="w-32 btn dark:border-darkmode-400" @click="this.$router.back()">
                {{$t('change_plan.step_1.back')}}
            </button> -->
            <button 
                class="w-32 ml-auto shadow-md btn btn-primary"
                @click="submitBasicInfo()">
                {{$t('change_plan.step_1.next')}}
            </button>
        </div>
        
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import UserInfo from "./UserInfo.vue";
import { get_subscription_plan } from '@/api_v2/business_policy'
import { seller_changePlan_payment } from '@/api_v2/user_subscription'
import i18n from "@/locales/i18n"

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
// const props = defineProps({
//     payment: Object, 
// })

const route = useRoute()
const router = useRouter()
const layout = useLSSSellerLayoutStore()

const originalPlan = layout.userInfo.user_subscription.type
const planOptions = ref([{ value: "lite" },{ value: "standard" },{ value: "premium" }])
const periodOptions = ref([{ value: "month" },{ value: "year" }])
const secured = ref({ src: "@/assets/images/lss-img/secured_tag.jpeg"})
const havePromoCode = ref(false)

const termsUrl = import.meta.env.VITE_TERMS_OF_SERVICE_URL
const privacyPolicyUrl = import.meta.env.VITE_PRIVACY_POLICY_URL

const dayLeft = ref('')
const expDate = new Date(layout.userInfo.user_subscription.expired_at)
const getPrice = ref({})
onMounted(()=>{
    get_subscription_plan(layout.userInfo.user_subscription.country, layout.alert).then(res=>{
        console.log(res.data)
        getPrice.value = res.data
        console.log(getPrice.value.plans)
    })
    
    const today = new Date();
    
    dayLeft.value = Math.round(( expDate.getTime() - today.getTime() )/86400000)
})

const selectedPlan = ref({
    plan: "",
    period: "",
    promoCode:"",
    intentSecret:"",
    privacyPolicy:"",
    is_welcome_gift_used: null,
    email: layout.userInfo.email,
    timezone:Intl.DateTimeFormat().resolvedOptions().timeZone
})

const rules = computed(()=> {
    return {
        plan: { required },
        period: { required },
        privacyPolicy: { required }
    }
});

const validate = useVuelidate(rules, selectedPlan);

const submitBasicInfo=()=>{
    validate.value.$touch();
    if (validate.value.$invalid) {
        layout.alert.showMessageToast(i18n.global.t('profile.invalid_data'))
        return
    }
    console.log(selectedPlan.value)
    seller_changePlan_payment(selectedPlan.value).then(res=>{
        eventBus.emit("PaymentTab", {'basicInfo':selectedPlan.value, 'confirmInfo':res.data} )
    }).catch( err=>{ 
        console.log(err)
        layout.registerTab = 1})
}
</script>