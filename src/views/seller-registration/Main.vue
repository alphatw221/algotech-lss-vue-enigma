 <template>
    <div class="flex-col">
        <!-- BEGIN Tab List-->
        <ul class="flex-none flex flex-wrap ml-14 sm:ml-0 py-2 flex-row justify-around w-full">
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        :class="{
                            'text-neutral-600 bg-white': layout.registerTab !== 1,
                            'text-white bg-primary': layout.registerTab === 1 
                            }" 
                        class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <UserIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.registerTab !== 1,
                            'font-bold': layout.registerTab === 1,
                        }">
                        {{$t('register.tab.basic_info')}}  
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                   
                        :class="{
                        'text-neutral-600 bg-white': layout.registerTab !== 2,
                        'text-white bg-primary': layout.registerTab === 2,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CreditCardIcon :paymentInfo="paymentInfo"/>
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.registerTab !== 2,
                            'font-bold': layout.registerTab === 2,
                        }">
                        {{$t('register.tab.payment')}}
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button 
                        :class="{
                        'text-neutral-600 bg-white': layout.registerTab !== 3,
                        'text-white bg-primary': layout.registerTab === 3,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CheckIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.registerTab !== 3,
                            'font-bold': layout.registerTab === 3,
                        }">
                        {{$t('register.tab.confirm')}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- END Tab List-->

        <div class="box p-8 sm:px-20 lg:py-10 shadow-sm rounded-lg sm:mx-20 text-sm sm:text-lg">
            <div class="tab-content tab-space">
                <GetInfo />
                <Payment />
                <Confirm />
            </div>
        </div>
    </div>

    <Notification refKey="registerMessageNotification" :options="{duration: 3000,}" class="flex text-green-600 sm:flex-row">
      <CheckCircleIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="registerMessageAlert" :options="{duration: 3000,}" class="flex text-red-600 sm:flex-row">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, provide } from "vue";
import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"
import loadScript from '@/libs/loadScript.js';
import { useRoute, useRouter } from "vue-router";
import GetInfo from "./GetInfo.vue";
import Payment from "./Payment.vue";
import Confirm from "./Confirm.vue";
import useI18n from "@/locales/i18n"

const layout = useSellerRegistrationStore()
const route = useRoute();
const router = useRouter();

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0;')} ) 
onBeforeMount (()=>{useI18n.global.locale.value = route.query.language} )     
onMounted(()=>{
    layout.registerTab= 1
    loadScript("https://js.stripe.com/v3/",()=>{
    console.log("stripe SDK loaded") })
})

const toggleTabs = tabNumber => {
  layout.registerTab = tabNumber
  router.push({query:{tab:tabNumber}})
  }

provide("bind[registerMessageNotification]", (el) => {
  layout.notification = el;
  // el.showMessageToast('test notification')
});
provide("bind[registerMessageAlert]", (el) => {
  layout.alert = el;
  // el.showMessageToast('test alert')
});
</script>