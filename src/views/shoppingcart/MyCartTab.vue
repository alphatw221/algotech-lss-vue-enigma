<template>
    <div :class="{ hidden: store.openTab !== 1, block: store.openTab === 1 }">
        <h2 class="text-base font-medium">{{$t('shopping_cart.my_cart_tab.my_cart')}} <span class="ml-2"> #{{store.order.id}}</span>  </h2>
        
    <div class="grid grid-cols-12 gap-4">
    <div class="overflow-x-auto col-span-12 2xl:col-span-7 2xl:block lg:block sm:block lg:col-span-7">
        <ShoppingCartTable />
    </div>
    <!-- <div class="block overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7 2xl:hidden lg:hidden sm:hidden">
        <ShoppingCartTable_mobile />
    </div>  -->
    <div class="col-span-12 2xl:col-start-8 2xl:col-span-5 lg:col-start-8 lg:col-span-5">
        <OrderSummary /> 
        <AddItemModal></AddItemModal>
    </div>
    </div>
    <div class="grid grid-cols-12 gap-4 ml-4 mr-4" v-if="store.order.campaign">
        <div class="overflow-x-auto col-start-1 col-span-7" v-if="store.order.campaign.meta_payment.special_note">
            <div><span class="text-lg">{{$t('shopping_cart.my_cart_tab.special_note')}}:</span></div>
            <div class="flex">
            <div class="mr-auto">{{store.order.campaign.meta_payment.special_note}}</div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import OrderSummary from "./OrderSummary.vue"; 
import ShoppingCartTable from "./ShoppingCartTable.vue";
// import ShoppingCartTable_mobile from "./ShoppingCartTable-mobile.vue";
import AddItemModal from "./modals/AddItemModal.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";


import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useShoppingCartStore(); 

</script>
