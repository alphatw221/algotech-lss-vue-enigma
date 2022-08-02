<template> 
    <div class="basicInfo">
        <form v-model="formValid" ref="form1" lazy-validation>
        
        <div class="flex-col">
            <label for="" class="subLabel">{{$t('change_plan.step_1.choose_plan')}}</label><span class="text-danger"> *</span>
            <select 
                id="prizeSelect"
                class="w-full form-select sm:form-select-lg rounded-lg" 
                :class="{ 'border-danger text-danger border-2': validate.plan.$error }" 
                v-model="validate.plan.$model"
            >
                <template v-if="originalPlan==='trial' || originalPlan==='lite' || originalPlan==='dealer'" > 
                    <option v-for="(plan, key) in planOptions" :key="key" :value="plan.value" class="w-40"> 
                        {{ $t(`change_plan.step_1.plan_options.` + plan.value) }}  </option>
                </template>
                <template v-else-if="originalPlan==='standard'"> 
                    <option v-for="(plan, key) in planOptions.slice(1)" :key="key" :value="plan.value" class="w-40"> 
                        {{ $t(`change_plan.step_1.plan_options.` + plan.value) }}
                        </option>
                </template>
                <template v-else-if="originalPlan==='premium'"> 
                    <option v-for="(plan, key) in planOptions.slice(2)" :key="key" :value="plan.value" class="w-40"> 
                        {{ $t(`change_plan.step_1.plan_options.` + plan.value) }}
                        </option>
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
                <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                </option>
            </select>
            <template v-if="validate.period.$error">
                <label class="text-danger text-[16px] leading-tight">
                    {{$t('change_plan.step_1.required_field')}}
                </label>
            </template>
        </div>

        <div>
            <div class="mb-n3">
                <label for="firstName">First Name</label><span class="star"> *</span>
                <v-text-field  v-model="basicInfo.firstName" :rules="generalRules" 
                bg-color="null"
                single-line
                clearable
                required

                ></v-text-field>
            </div>

            <div class="mb-n3">
                <label for="lastName">Last Name</label><span class="star"> *</span>
                <v-text-field v-model="basicInfo.lastName" :rules="generalRules" 
                    bg-color="null"
                    single-line
                    clearable
                    required

                ></v-text-field>
            </div>
        </div>

        <div class="flex-row"> 
            <div class="flex-col">
                <label for="" class="subLabel" >First Name</label><span class="text-danger"> *</span>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                        v-model="validate.period.$model"
                    >
                    <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                    {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                    </option>
                </select>
                <template v-if="validate.period.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('change_plan.step_1.required_field')}}
                    </label>
                </template>
            </div>
            <div class="flex-col">
                <label for="" class="subLabel" >last Name</label><span class="text-danger"> *</span>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                        v-model="validate.period.$model"
                    >
                    <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                    {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                    </option>
                </select>
                <template v-if="validate.period.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('change_plan.step_1.required_field')}}
                    </label>
                </template>
            </div>
        </div>
        

        <div class="flex-row"> 
            <div class="flex-col">
                <label for="" class="subLabel" >Country code</label><span class="text-danger"> *</span>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                        v-model="validate.period.$model"
                    >
                    <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                    {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                    </option>
                </select>
                <template v-if="validate.period.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('change_plan.step_1.required_field')}}
                    </label>
                </template>
            </div>
            <div class="flex-col">
                <label for="" class="subLabel" >Contact Number</label><span class="text-danger"> *</span>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                        v-model="validate.period.$model"
                    >
                    <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                    {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                    </option>
                </select>
                <template v-if="validate.period.$error">
                    <label class="text-danger text-[16px] leading-tight">
                        {{$t('change_plan.step_1.required_field')}}
                    </label>
                </template>
            </div>
        </div>

        <div class="flex-col">
            <label for="" class="subLabel" >Email</label><span class="text-danger"> *</span>
                <select 
                    id="prizeSelect"
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                    v-model="validate.period.$model"
                >
                <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                </option>
            </select>
            <template v-if="validate.period.$error">
                <label class="text-danger text-[16px] leading-tight">
                    {{$t('change_plan.step_1.required_field')}}
                </label>
            </template>
        </div>

        <div class="flex-col">
            <label for="" class="subLabel" >Password</label><span class="text-danger"> *</span>
                <select 
                    id="prizeSelect"
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                    v-model="validate.period.$model"
                >
                <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                </option>
            </select>
            <template v-if="validate.period.$error">
                <label class="text-danger text-[16px] leading-tight">
                    {{$t('change_plan.step_1.required_field')}}
                </label>
            </template>
        </div>
        
        <div class="flex-col">
            <label for="" class="subLabel" >Confirm Password</label><span class="text-danger"> *</span>
                <select 
                    id="prizeSelect"
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                    v-model="validate.period.$model"
                >
                <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
                </option>
            </select>
            <template v-if="validate.period.$error">
                <label class="text-danger text-[16px] leading-tight">
                    {{$t('change_plan.step_1.required_field')}}
                </label>
            </template>
        </div>

        <div class="flex-col">
            <label for="" class="subLabel" >Target Country</label><span class="text-danger"> *</span>
                <select 
                    id="prizeSelect"
                    class="w-full form-select sm:form-select-lg rounded-lg" 
                    :class="{ 'border-danger text-danger border-2': validate.period.$error }" 
                    v-model="validate.period.$model"
                >
                <option v-for="(period, key) in periodOptions" :key="key" :value="period.value" class="w-40"> 
                {{ $t(`change_plan.step_1.period_options.` + period.value) }} 
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
        
        <div class="flex"> 
            <input type="checkbox" v-model="validate.privacyPolicy.$model"
                class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto"
                />
            <label :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" > 
                {{$t('change_plan.step_1.policy.accept')}} 
                <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }" 
                    href="https://liveshowseller.com/terms-of-service/">{{$t('change_plan.step_1.policy.terms')}} 
                    </a> {{$t('change_plan.step_1.policy.&')}}
                <a :class="{ 'text-danger font-blod': validate.privacyPolicy.$error }"
                    href="https://liveshowseller.com/privacy-policy/">{{$t('change_plan.step_1.policy.conditions')}}</a> 
            </label>
        </div>

        <div class="flex justify-between">
            <div class="mt-5" style="text-align: left;">
                    <a class="text-center lbtn pt-4" href="https://liveshowseller.com/">
                        Home
                    </a> 
            </div>
            <div style="text-align: right;">
                    <button
                    class="rbtn"
                    type="button"
                    flat
                    @click="submitBasicInfo(this)"
                        >
                        Next
                    </button>
            </div>
        </div> 
        </form>

    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import UserInfo from "./UserInfo.vue";
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
const periodOptions = ref([{ value: "quarter" },{ value: "year" }])
const countryCodeOptions = ref([{ value: "my" },{ value: "id" },{ value: "ph" },{ value: "sg" },{ value: "tw" }])
const countryOptions = ref([{ value: "australia" },{ value: "cambodia" },{ value: "canada" },{ value: "hong_kong" },{ value: "indonesia" },{ value: "korea" }
,{ value: "malaysia" },{ value: "philippines" },{ value: "singapore" },{ value: "taiwan" },{ value: "thai" },{ value: "US" },{ value: "vietnam" }])
const secured = ref({ src: "@/assets/images/lss-img/secured_tag.jpeg"})
const havePromoCode = ref(false)

const basicInfo = ref({
    firstName: "",
    lastName: "",
    plan:"", 
    period:"",
    countryCode:"",
    phone:"",
    email: "",
    password:"",
    confirmPassword:"",
    targetCountry:"",
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
        phone: { required },
        email: { required },
        password: { required },
        confirmPassword: { required },
        targetCountry: { required },
        promoCode: { required },
        privacyPolicy: { required },
    }
});

const validate = useVuelidate(rules, selectedPlan);

const submitBasicInfo=()=>{
    validate.value.$touch();
    if (validate.value.$invalid) {
        layout.alert.showMessageToast(i18n.global.t('profile.invalid_data'))
        return
    }
    // console.log(selectedPlan.value)
    eventBus.emit("paymentInfo", selectedPlan.value)
}
</script>