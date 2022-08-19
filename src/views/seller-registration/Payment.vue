<template>
    <div 
      :class="{ hidden: registerationStore.registerTab !== 2, block: registerationStore.registerTab === 2 }"
      class="flex-col">
    
    <!-- Details -->
      <div class="p-3 mb-5 text-sm sm:text-lg flex-col"> 
          <div> 
              {{$t('register.payment.selected_plan')}} :
              <span class="ml-3 font-medium text-[#660000]"> {{ $t(`register.plan.` + confirmInfo.user_plan)}}</span> 
          </div> 
          <div> 
              {{$t('register.payment.payment_total')}} : <span class="ml-3 font-medium text-[#660000]">
                {{ `${confirmInfo.currency} ${confirmInfo.payment_amount}`}} </span>   
          </div>
          <div> 
              {{$t('register.payment.period')}} : <span class="ml-3 font-medium text-[#660000]"> {{ $t(`register.payment.` + confirmInfo.period)}}</span>   
          </div>
      </div>
        <img src="@/assets/images/lss-img/secured_tag.jpeg" class="flex  w-[100px] lg:w-[200px] mb-5" />

    <!-- BEGIN Tab List-->
        <ul class="flex-none flex flex-wrap py-2 flex-row justify-around w-full" v-if="route.query.country=='VN'">
            <li class="flex-1 text-center">
                <button
                    @click="togglePaymentTabs(0)"
                    :class="{
                        'text-neutral-600 bg-white': paymentMethodTabNumber !== 0,
                        'text-white bg-primary': paymentMethodTabNumber === 0 
                        }" 
                    class="sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full" >
                    <font-awesome-icon icon="fa-regular fa-credit-card" class="h-6 mr-5"/> {{$t('register.payment.payment_method.card')}}
                </button>
            </li>
            <li 
                class="flex-1 text-center">
                <button
                    @click="togglePaymentTabs(1)"
                    :class="{
                        'text-neutral-600 bg-white': paymentMethodTabNumber !== 1,
                        'text-white bg-primary': paymentMethodTabNumber === 1 
                        }" 
                    class="sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full" >
                    <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="h-7 mr-5" /> {{$t('register.payment.payment_method.direct')}}
                </button>
            </li>
        </ul>
        <ul class="flex-none flex flex-wrap py-2 flex-row justify-around w-full" v-if="route.query.country=='PH'">
            <li class="flex-1 text-center">
                <button
                    @click="togglePaymentTabs(0)"
                    :class="{
                        'text-neutral-600 bg-white': paymentMethodTabNumber !== 0,
                        'text-white bg-primary': paymentMethodTabNumber === 0 
                        }" 
                    class="sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full" >
                    <font-awesome-icon icon="fa-regular fa-credit-card" class="h-6 mr-5"/> {{$t('register.payment.payment_method.card')}}
                </button>
            </li>
            <li 
                class="flex-1 text-center">
                <button
                    @click="togglePaymentTabs(2)"
                    :class="{
                        'text-neutral-600 bg-white': paymentMethodTabNumber !== 2,
                        'text-white bg-primary': paymentMethodTabNumber === 2 
                        }" 
                    class="sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full" >
                    <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="h-7 mr-5" /> {{$t('register.payment.payment_method.direct')}}
                </button>
            </li>
        </ul>
        <!--  Stripe  -->
            <div class="tab-content tab-space py-10">
                <div :class="{ hidden: paymentMethodTabNumber !== 0, block: paymentMethodTabNumber === 0 }" 
                    class="my-5 lg:my-10">
                    <form id="payment-form">
                        <div id="payment-element">
                            <!-- Elements will create form elements here -->
                        </div>
                        <div id="message">
                            <!-- Display error message to your customers here -->
                        </div>

                        <div id="error-message">
                            <!-- Display error message to your customers here -->
                        </div>
                        <button id="submit" style="display:hidden"></button>       
                    </form>
                </div>

        <!--  Direct  -->
                <div class="flex flex-col gap-3" 
                    :class="{ hidden: paymentMethodTabNumber !== 1, block: paymentMethodTabNumber === 1 }" > 

                    <span class="mx-auto text-xl font-medium"> {{$t('register.payment.direct.payment_info')}} </span>
                    <table class="mx-auto w-fit w-1/3 max-w-1/2"> 
                        <tr> <td class="whitespace-nowrap align-top text-slate-500">{{$t('register.payment.direct.bank_name')}} </td> <td class="text-right pl-10"> {{registerationStore.vnBank.bankName}} </td> </tr>
                        <tr> <td class="whitespace-nowrap text-slate-500"> {{$t('register.payment.direct.account_name')}} </td> <td class="text-right pl-5"> {{registerationStore.vnBank.accountName}} </td> </tr>
                        <tr> <td class="whitespace-nowrap text-slate-500"> {{$t('register.payment.direct.account_number')}} </td> <td class="text-right pl-10"> {{registerationStore.vnBank.accountNumber}}  </td> </tr>
                        <!-- <tr> <td class="whitespace-nowrap align-top text-slate-500">{{$t('register.payment.direct.note')}} </td> <td class="text-right pl-10"> {{registerationStore.vnBank.note}} </td> </tr> -->
                    </table>
                    <img  data-action="zoom" class="w-60 mx-auto" :src="bank_img" />  
                    <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                        method: 'put',
                        url: 'url',
                        uploadMultiple: false,
                        maxFilesize: 10,
                        addRemoveLinks: true,
                        autoProcessQueue: false,
                        resizeQuality: 0.5,
                        clickable: true,
                        acceptedFiles: 'image/*',
                    }" class="dropzone h-fit rounded-xl">

                        <div class="text-lg font-medium">
                        {{$t('register.payment.direct.upload_img')}}
                 </div>
                        <div class="text-gray-600">
                            <br>{{$t('register.payment.direct.accepted_types')}}: jpeg, png, jpg
                        </div>
                        <div class="text-gray-600">{{$t('register.payment.direct.max_size')}} : 10MB</div>  
                    </Dropzone>
                    <div class="flex flex-col my-3">

                        <label for="regular-form-2" class="form-label">{{$t('register.payment.direct.last_five_digits')}}</label>
                        <input id="regular-form-2" type="number" class="form-control"
                            :class="{ 'border-danger': uploadValidate.fiveDigits.$error }"
                            v-model.trim="uploadValidate.fiveDigits.$model" />
                        <template v-if="uploadValidate.fiveDigits.$error">
                            <div class="form-help" :class="{ 'text-danger': uploadValidate.fiveDigits.$error }">
                                {{$t('register.payment.direct.digits_message')}}
                            </div>
                        </template>
                    </div>
                </div>
        </div>
        <!-- GCASH -->
        <div class="flex flex-col gap-3" 
                    :class="{ hidden: paymentMethodTabNumber !== 2, block: paymentMethodTabNumber === 2 }" > 

                    <span class="mx-auto text-xl font-medium"> {{$t('register.payment.direct.payment_info')}} </span>
                    <table class="mx-auto w-fit w-1/3 max-w-1/2"> 
                        <tr> <td class="whitespace-nowrap align-top text-slate-500">{{$t('register.payment.direct.bank_name')}} </td> <td class="text-right pl-10"> {{registerationStore.g_cash.bankName}} </td> </tr>
                        <tr> <td class="whitespace-nowrap text-slate-500"> {{$t('register.payment.direct.account_name')}} </td> <td class="text-right pl-5"> {{registerationStore.g_cash.accountName}} </td> </tr>
                        <tr> <td class="whitespace-nowrap text-slate-500"> {{$t('register.payment.direct.account_number')}} </td> <td class="text-right pl-10"> {{registerationStore.g_cash.accountNumber}}  </td> </tr>
                        <!-- <tr> <td class="whitespace-nowrap align-top text-slate-500">{{$t('register.payment.direct.note')}} </td> <td class="text-right pl-10"> {{registerationStore.g_cash.note}} </td> </tr> -->
                    </table>
                    <!-- <img  data-action="zoom" class="w-60 mx-auto" :src="bank_img" />   -->
                    <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                        method: 'put',
                        url: 'url',
                        uploadMultiple: false,
                        maxFilesize: 10,
                        addRemoveLinks: true,
                        autoProcessQueue: false,
                        resizeQuality: 0.5,
                        clickable: true,
                        acceptedFiles: 'image/*',
                    }" class="dropzone h-fit rounded-xl">

                        <div class="text-lg font-medium">
                            {{$t('register.payment.direct.upload_img')}}
                        </div>
                        <div class="text-gray-600">
                            <br>{{$t('register.payment.direct.accepted_types')}}: jpeg, png, jpg
                        </div>
                        <div class="text-gray-600">{{$t('register.payment.direct.max_size')}} : 10MB</div>  
                    </Dropzone>
                    <div class="flex flex-col my-3">

                        <label for="regular-form-2" class="form-label">{{$t('register.payment.direct.last_five_digits')}}</label>
                        <input id="regular-form-2" type="number" class="form-control"
                            :class="{ 'border-danger': uploadValidate.fiveDigits.$error }"
                            v-model.trim="uploadValidate.fiveDigits.$model" />
                        <template v-if="uploadValidate.fiveDigits.$error">
                            <div class="form-help" :class="{ 'text-danger': uploadValidate.fiveDigits.$error }">
                                {{$t('register.payment.direct.digits_message')}}
                            </div>
                        </template>
                    </div>
                </div>
        
        <!-- ECpay -->
        <div class="flex flex-col gap-3" 
                    :class="{ hidden: paymentMethodTabNumber !== 3, block: paymentMethodTabNumber === 3 }" >
            <img class="w-60 mx-auto" :src="ecpay_img" /> 
        </div>

    <!-- Process Button -->
        <div class="flex justify-between mt-10 text-sm lg:text-lg">
            <button
                class="w-32 btn dark:border-darkmode-400"
                @click="registerationStore.registerTab = 1"
                >
                {{$t('register.payment.privious')}}
            </button>

            <button
            v-if="paymentMethodTabNumber == 0 && showSubmitButton"
            v-show="comfirmPayment == true"
            class="w-fit ml-5 shadow-md btn btn-primary"
            @click="submitCreditCardInfo()"
                >
                {{$t('register.payment.confirm_payment')}}
            </button>

            <button 
                v-else-if="paymentMethodTabNumber == 1 || paymentMethodTabNumber == 2"
                type="button"
                class="w-fit ml-5 shadow-md btn btn-primary"
                @click="uploadReceipt()">{{$t('register.payment.direct.complete_order')}}
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, getCurrentInstance, provide, reactive, toRefs   } from "vue";
import { useRoute, useRouter } from "vue-router";
import { seller_validate_register } from '@/api_v2/user'
import { seller_register_stripe, user_register_with_bank_transfer } from '@/api_v2/user'

import bank_img from "/src/assets/images/lss-bank/vn_bank.png"
import ecpay_img from "/src/assets/images/lss-bank/ecpay.png"
import {
    minLength,
    maxLength,
    integer,
    required
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"


import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"
import { usePublicLayoutStore } from "@/stores/lss-public-layout"

const layoutStore = usePublicLayoutStore()
const registerationStore = useSellerRegistrationStore()


const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const route = useRoute();
const router = useRouter();

const planSelected = ref(false)
const comfirmPayment = ref(false)

const paymentMethodTabNumber = ref(0)

const basicInfo = ref({})
const confirmInfo = ref({
  user_plan: '', 
  period:'',
  payment_amount:''
})

const showSubmitButton = ref(true)

const togglePaymentTabs = tabNumber => {
  paymentMethodTabNumber.value = tabNumber
}



onMounted(()=>{

  eventBus.on("showPaymentTab", (payload) => {
    basicInfo.value = payload.basicInfo
    confirmInfo.value = payload.confirmInfo
    basicInfo.value.intentSecret =  confirmInfo.value.client_secret
    registerationStore.registerTab = 2
    renderStripeElement(confirmInfo.value.client_secret)
  })

//   if(route.query.country=='TW'){
//       paymentMethodTabNumber.value = 3
//   }
})

onUnmounted(()=>{
    eventBus.off("showPaymentTab")
})

const handleStripePaymentSuccess = ()=>{
    showSubmitButton.value=false
     seller_register_stripe(route.query.country,basicInfo.value).then(res => {
        showSubmitButton.value=true
        eventBus.emit("showComfirmRegisterTab", res.data)
    }).catch(err => {
        showSubmitButton.value=true
        alert(err)
    })
}

// STRIPE 
const renderStripeElement=(intentSecret)=>{
    // const stripe = window.Stripe('pk_test_51J2aFmF3j9D00CA0eWhxHiswrqFUfn5yNKDizVeCNA4cZBoH4TV3kRGoChos2MWNKb6kUs8w8cA2u5SheHGSeWIf00z9xRe0QZ');
    const stripe = window.Stripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
    const options = {
        clientSecret: intentSecret,
        // Fully customizable with appearance API.
        appearance: { theme: 'stripe' },
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
    const elements = stripe.elements(options);

    // Create and mount the Payment Element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    const form = document.getElementById('payment-form');
    comfirmPayment.value = true;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            redirect: 'if_required'
        });

        if (error) {
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
        } else {
            stripe.retrievePaymentIntent(intentSecret).then(({ paymentIntent }) => {
                const message = document.querySelector('#message')
                message.innerText = '';
                switch (paymentIntent.status) {
                    case 'succeeded':
                        handleStripePaymentSuccess()
                        message.innerText = i18n.global.t('register.payment.stripe.stripe_success') ;
                        break;

                    case 'processing':
                        message.innerText = i18n.global.t('register.payment.stripe.stripe_process') ;
                        break;

                    case 'requires_payment_method':
                        message.innerText = i18n.global.t('register.payment.stripe.stripe_failed') ;
                        break;

                    default:
                        message.innerText = i18n.global.t('register.payment.stripe.stripe_err') ;
                        break;
                }
            })
        }
    })
}
const submitCreditCardInfo=()=>{
  document.getElementById('submit').click()
}

// Direct Payment
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL.slice(0, -1);
const receiptUploadDropzoneRef = ref();
const data = reactive({ fiveDigits: "" });
const dataRules = {
    fiveDigits: {
        required, integer, minLength: minLength(5), maxLength: maxLength(5),
    },

};
const uploadValidate = useVuelidate(dataRules, toRefs(data));

provide("bind[receiptUploadDropzoneRef]", (el) => {
    receiptUploadDropzoneRef.value = el;

    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        if (files.length > 0) el.dropzone.removeFile(files[0])
    })
});

const uploadReceipt = () => {
    
    let receiptImage = receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0]

    const account = ref()
    if([undefined,null,''].includes(receiptImage)) {
        uploadValidate.value.$touch();
        if (uploadValidate.value.$invalid) {
            layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_data'))
            return
        }
        layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_data'))
        return
    }
    let formData = new FormData()

    for ( var key in basicInfo.value ) {
        formData.append(key, basicInfo.value[key]);
    }
    formData.append('last_five_digit', data.fiveDigits)
    formData.append('image', receiptImage || '')

    if(paymentMethodTabNumber.value === 1){ //VN
        formData.append('account_name', registerationStore.vnBank.accountName)
        formData.append('bank_name', registerationStore.vnBank.bankName)
    }else if(paymentMethodTabNumber.value === 2){ //PH
        formData.append('account_name', registerationStore.g_cash.accountName)
        formData.append('bank_name', registerationStore.g_cash.bankName)
    }

    showSubmitButton.value=false
    user_register_with_bank_transfer(route.query.country, formData)
        .then(res => {
            showSubmitButton.value=true
            eventBus.emit("showComfirmRegisterTab", res.data)
        }).catch(()=>{showSubmitButton.value=true})
}

</script>
