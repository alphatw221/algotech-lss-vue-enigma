<template>
    <div 
      :class="{ hidden: layout.changePlanTab !== 2, block: layout.changePlanTab === 2 }"
      class="flex-col">

      <div class="p-3 pt-5 pb-5 text-sm sm:text-lg flex-col"> 
          <div> 
              {{$t('change_plan.step_2.selected_plan')}} :
              <span class="ml-3 font-medium text-[#660000]"> {{ $t(`change_plan.plan.` + confirmInfo.user_plan)}}</span> 
          </div> 
          <div v-if="confirmInfo.adjust_amount !== 0"> 
              {{$t('change_plan.step_2.proration')}} : <span class="ml-3 font-medium text-[#660000]"> 
              {{`${confirmInfo.currency} -${confirmInfo.adjust_amount}`}} </span>   
          </div>
          <div v-if="confirmInfo.payment_amount"> 
              {{$t('change_plan.step_2.payment_total')}} : <span class="ml-3 font-medium text-[#660000]">
                {{ `${confirmInfo.currency} ${(confirmInfo.payment_amount).toLocaleString('en-GB')}`}} </span>   
          </div>
          <div> 
              {{$t('change_plan.step_2.period')}} : <span class="ml-3 font-medium text-[#660000]"> {{ $t(`change_plan.step_2.` + confirmInfo.period)}}</span>   
          </div>
      </div>
      <div class="flex">
        <img src="@/assets/images/lss-img/secured_tag.jpeg" class="flex  w-[100px] lg:w-[200px]" />
      </div>
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
      <div class="flex justify-between mt-10 text-sm lg:text-lg">
        <button
            class="w-32 btn dark:border-darkmode-400"
            @click="layout.changePlanTab = 1"
            >
            {{$t('change_plan.step_2.privious')}}
        </button>

        <button
        class="w-fit ml-5 shadow-md btn btn-primary"
        flat
        @click="signUp"
            >
            {{$t('change_plan.step_2.confirm_payment')}}
        </button>  
      </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import { seller_upgrade } from '@/api_v2/user_subscription'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const route = useRoute();
const router = useRouter();
const layout = useLSSSellerLayoutStore()

const planSelected = ref(false)

const toggleTabs = tabNumber => {
  layout.changePlanTab = tabNumber
  }

const confirmInfo = ref({
  user_plan: '', 
  period:'',
})

const paymentInfo = ref()

// onMounted(()=>{
//   eventBus.on("paymentInfo", (payload) => {
//     paymentInfo.value = payload

//     seller_changePlan_payment(payload).then(res=>{
//       confirmInfo.value = res.data
//       console.log(confirmInfo.value)

//       paymentInfo.value.intentSecret = res.data.client_secret
//       renderStripeElement(confirmInfo.value.client_secret)
//         }).catch( err=>{
//             layout.changePlanTab = 1
//             alert(err)
//         })
//     layout.changePlanTab = 2
//   })
// }) 

onMounted(()=>{

  eventBus.on("PaymentTab", (payload) => {
    let basicInfo = payload.basicInfo
    confirmInfo.value = payload.confirmInfo
    basicInfo.intentSecret =  confirmInfo.value.client_secret
    layout.changePlanTab = 2
    renderStripeElement(confirmInfo.value.client_secret)
  })

})

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
                        seller_upgrade(paymentInfo.value).then(res => {
                            console.log(res.data)
                            eventBus.emit("confirmInfo", res.data)
                        }).catch(err => {
                            alert(err)
                        })
                        message.innerText = 'Success! Payment received.';
                        break;

                    case 'processing':
                        message.innerText = "Payment processing. Please do not refresh the page and wait while we are processing your payment.";
                        break;

                    case 'requires_payment_method':
                        message.innerText = 'Payment failed. Please try another payment method.';
                        // Redirect your user back to your payment page to attempt collecting
                        // payment again
                        break;

                    default:
                        message.innerText = 'Something went wrong.';
                        break;
                }
            })
        }
    })
}

const signUp=()=>{
  document.getElementById('submit').click()
}
</script>