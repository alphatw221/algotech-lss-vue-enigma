<template>
    <div :class="{ hidden: shoppingCartStore.openTab !== 1, block: shoppingCartStore.openTab === 1 }">
        <h2 class="text-base font-medium">{{$t('shopping_cart.my_cart_tab.my_cart')}} <span class="ml-2"> #{{shoppingCartStore.cart.id}}</span>  </h2>
        
        <div class="grid grid-cols-12 gap-4">
        <div class="overflow-x-auto col-span-12 2xl:col-span-7 2xl:block lg:block sm:block lg:col-span-7">
            <ShoppingCartTable :cartLoading="props.cartLoading"/>
        </div>
        <div class="col-span-12 2xl:col-start-8 2xl:col-span-5 lg:col-start-8 lg:col-span-5">
            <OrderSummarySkeleton v-if="props.cartLoading"/>
            <OrderSummary v-else/> 
            <!-- <AddItemModal></AddItemModal> -->
        </div>
    </div>
    <div class="grid grid-cols-12 gap-4 ml-4 mr-4" v-if="props.cartLoading">
        <SpecialNotesSkeleton /> 
    </div>
    <div class="grid grid-cols-12 gap-4 ml-4 mr-4" v-if="shoppingCartStore.cart.campaign">
        <div class="overflow-x-auto col-start-1 lg:col-span-7 col-span-12" v-if="shoppingCartStore.cart?.campaign?.meta_payment?.special_note">
            <div><span class="text-lg">{{$t('shopping_cart.my_cart_tab.special_note')}}:</span></div>
            <div class="flex">
            <div class="mr-auto whitespace-pre-line">{{shoppingCartStore.cart?.campaign?.meta_payment?.special_note}}</div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import OrderSummary from "./OrderSummary.vue"; 
import OrderSummarySkeleton from "./skeleton/OrderSummarySkeleton.vue";

import ShoppingCartTable from "./ShoppingCartTable.vue";

import SpecialNotesSkeleton from "./skeleton/SpecialNotesSkeleton.vue";

// import AddItemModal from "./modals/AddItemModal.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";


import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const shoppingCartStore = useShoppingCartStore(); 

const props = defineProps({
    cartLoading: {
        type: Boolean,
        default: true,
  },
})

</script>
