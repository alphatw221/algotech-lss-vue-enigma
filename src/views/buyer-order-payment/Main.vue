<template>
    <div class="box grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <ShippingSummary />
        </div>
        <div class="col-span-12 lg:col-span-5 2xl:col-span-5">
            <OrderSummary />
        </div>
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <PaymentMethods />
        </div>
    </div>
</template>
              
<script setup>

import OrderSummary from "./OrderSummary.vue";
import PaymentMethods from "./payment-methods/Main.vue";
import ShippingSummary from "./ShippingSummary.vue";

import { computed, onMounted, onBeforeMount, ref, watch, getCurrentInstance } from "vue";
import { buyer_retrieve_order_with_user_subscription } from "@/api_v2/order";
import { useCookies } from 'vue3-cookies'
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const store = useLSSBuyerOrderStore(); 
const layoutStore = useLSSBuyerLayoutStore();
const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();


const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n

onMounted(()=>{
    buyer_retrieve_order_with_user_subscription(route.params.order_oid, layoutStore.alert)
    .then(
        res => {
            store.order = res.data
            i18n.locale = res.data.campaign.lang
            // console.log(res.data)
            if (store.order.campaign.user_subscription.status === "test") router.back()
        }
    )
})


</script>