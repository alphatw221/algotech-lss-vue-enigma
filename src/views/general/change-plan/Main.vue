<template>
    <div class="flex flex-wrap">
        <!-- BEGIN Tab List-->
        <ul class="flex flex-wrap ml-14 sm:ml-0 py-2 flex-row justify-around w-full">
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        :class="{
                            'text-neutral-600 bg-white': layout.changePlanTab !== 1,
                            'text-white bg-primary': layout.changePlanTab === 1 
                            }" 
                        class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <UserIcon />
                    </button>
                    <div class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.changePlanTab !== 1,
                            'font-bold': layout.changePlanTab === 1,
                        }">
                        {{$t('change_plan.tab.select_plan')}}
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        :class="{
                        'text-neutral-600 bg-white': layout.changePlanTab !== 2,
                        'text-white bg-primary': layout.changePlanTab === 2,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CreditCardIcon :paymentInfo="paymentInfo"/>
                    </button>
                    <div class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.changePlanTab !== 2,
                            'font-bold': layout.changePlanTab === 2,
                        }">
                        {{$t('change_plan.tab.payment')}}
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button :class="{
                        'text-neutral-600 bg-white': layout.changePlanTab !== 3,
                        'text-white bg-primary': layout.changePlanTab === 3,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CheckIcon />
                    </button>
                    <div class="w-0 invisible lg:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.changePlanTab !== 3,
                            'font-bold': layout.changePlanTab === 3,
                        }">
                        {{$t('change_plan.tab.confirm')}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- END Tab List-->

        <div class="flex flex-col box w-full p-8 lg:px-20 lg:py-10 shadow-sm rounded-lg lg:mx-20 text-sm sm:text-lg">
            <div class="tab-content tab-space">
                <SelectPlan/>
                <Payment />
                <Comfirm />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import loadScript from '@/libs/loadScript.js';
import SelectPlan from "./select-plan/Main.vue";
import Payment from "./Payment.vue";
import Comfirm from "./Comfirm.vue";

const layout = useLSSSellerLayoutStore()

const toggleTabs = tabNumber => {
    layout.changePlanTab = tabNumber
}

onMounted(()=>{
    loadScript("https://js.stripe.com/v3/",()=>{
    console.log("stripe SDK loaded")
  })
})
</script>