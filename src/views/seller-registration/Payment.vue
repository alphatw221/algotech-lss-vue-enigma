<template>
    <div 
      :class="{ hidden: layout.registerTab !== 2, block: layout.registerTab === 2 }"
      class="flex-col">
    
    <!-- Details -->
      <div class="p-3 pt-5 pb-5 text-sm sm:text-lg flex-col"> 
          <div> 
              {{$t('register.payment.selected_plan')}} :
              <span class="ml-3 font-medium text-[#660000]"> {{ $t(`register.plan.` + layout.registerInfo.plan)}}</span> 
          </div> 
          <div> 
              {{$t('register.payment.payment_total')}} : <span class="ml-3 font-medium text-[#660000]">
                {{ `${comfirmInfo.currency} ${parseFloat(comfirmInfo.payment_amount).toFixed(2)}`}} </span>   
          </div>
          <div> 
              {{$t('register.payment.period')}} : <span class="ml-3 font-medium text-[#660000]"> {{ $t(`register.payment.` + layout.registerInfo.period)}}</span>   
          </div>
      </div>
        <img src="@/assets/images/lss-img/secured_tag.jpeg" class="flex  w-[100px] lg:w-[200px]" />

        <div class="my-5 lg:my-10">
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

    <!-- Process Button -->
        <div class="flex justify-between mt-10 text-sm lg:text-lg">
            <button
                class="w-32 btn dark:border-darkmode-400"
                @click="layout.registerTab = 1"
                >
                {{$t('register.payment.privious')}}
            </button>

            <button
            v-if="paymentMethod == 0"
            v-show="comfirmPayment == true"
            class="w-fit ml-5 shadow-md btn btn-primary"
            @click="signUp"
                >
                {{$t('register.payment.confirm_payment')}}
            </button>

            <button 
                v-else-if="paymentMethod == 1"
                type="button"
                class="w-fit ml-5 shadow-md btn btn-primary"
                @click="uploadReceipt()">{{$t('shopping_cart.payment.direct.complete_order')}}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, getCurrentInstance, provide, reactive, toRefs   } from "vue";
import { useRoute, useRouter } from "vue-router";
import { seller_validate_register } from '@/api/user_subscription'
import { seller_register } from '@/api_v2/user'
import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"
import {
    minLength,
    maxLength,
    integer,
    required
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"

const layout = useSellerRegistrationStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const route = useRoute();
const router = useRouter();

const planSelected = ref(false)
const comfirmPayment = ref(false)

const paymentMethod = ref(0)
const comfirmInfo = ref({
  user_plan: '', 
  period:'',
})

const toggleTabs = tabNumber => {
  paymentMethod.value = tabNumber
}

onMounted(()=>{
  // console.log(props.payment)
  if(layout.registerTab == 2){
    seller_validate_register(layout.registerInfo.countryCode,layout.registerInfo).then(res=>{
      comfirmInfo.value = res.data
    //   layout.registerInfo.append(res.data)
      console.log(comfirmInfo.value)

      layout.registerInfo.intentSecret = res.data.client_secret
        console.log(layout.registerInfo)
      renderStripeElement(res.data.client_secret )
    }).catch( err=>{
        layout.registerTab = 1
    })
  }
})



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
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            stripe.retrievePaymentIntent(intentSecret).then(({ paymentIntent }) => {
                const message = document.querySelector('#message')
                message.innerText = '';
                // Inspect the PaymentIntent `status` to indicate the status of the payment
                // to your customer.
                //
                // Some payment methods will [immediately succeed or fail][0] upon
                // confirmation, while others will first enter a `processing` state.
                //
                // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
                switch (paymentIntent.status) {
                    case 'succeeded':
                        seller_register(paymentInfo.value.countryCode,paymentInfo.value).then(res => {
                            console.log(res.data)
                            eventBus.emit("comfirmRegister", res.data)
                        }).catch(err => {
                            alert(err)
                        })
                        message.innerText = i18n.global.t('register.payment.stripe_success') ;
                        break;

                    case 'processing':
                        message.innerText = i18n.global.t('register.payment.stripe_process') ;
                        break;

                    case 'requires_payment_method':
                        message.innerText = i18n.global.t('register.payment.stripe_failed') ;
                        // Redirect your user back to your payment page to attempt collecting
                        // payment again
                        break;

                    default:
                        message.innerText = i18n.global.t('register.payment.stripe_err') ;
                        break;
                }
            })
        }
    })
}
const signUp=()=>{
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
    
    if(receiptImage =='' || receiptImage == undefined ) {
            layout.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_data')) 
            return }

    // const account = Object.values(meta_payment.direct_payment.v2_accounts)[selectAccountIndex.value]
    if([undefined,null,''].includes(receiptImage) && account.require_customer_return) {
        uploadValidate.value.$touch();
        if (uploadValidate.value.$invalid) {
            layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_data'))
            return
        }
    }
    let formData = new FormData()
    formData.append('last_five_digit', data.fiveDigits)
    formData.append('image', receiptImage || '')
    formData.append('account_name', account.name)
    formData.append('account_mode', account.mode)

    const upload_receipt = isAnonymousUser?guest_upload_receipt:buyer_upload_receipt
    upload_receipt(route.params.order_oid, formData)
        .then(
            res => {

                store.order = res.data
                router.push(`/buyer/order/${route.params.order_oid}/confirmation`)
            }
        )
    
}

</script>

<style scoped>

.dropzone-border{
    border-color: theme('colors.danger') !important;
    color: theme('colors.danger') !important;
}

.redText{
    color: theme('colors.danger') !important;
}
</style>