<template>
<div :class="{ hidden: store.openTab !== 1, block: store.openTab === 1 }">
    <div>My Cart</div>
    <div class="box grid grid-cols-12 gap-4">
    <div class="overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7">
        <ShoppingCartTable />
    </div>
    <div class="col-span-12 2xl:col-start-8 2xl:col-span-5 lg:col-start-8 lg:col-span-5">
        <OrderSummary /> 
        <AddItemModal/>
    </div>
    </div>
    <div class="box grid grid-cols-12 gap-4 ml-4 mr-4">
    <div class="overflow-x-auto col-start-1 col-span-7">
        <div><span class="text-[16px]">Special Note:</span></div>
        <div class="flex">
        <div class="mr-auto">Special Note!!!!!!!!!!!!!!!!!!!!</div>
        </div>
    </div>
    </div>
</div>

</template>

<script setup>
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShoppingCartTable from "@/components/shopping-cart/ShoppingCartTable.vue";
import AddItemModal from "@/components/modal/AddItemModal.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_retrieve_pre_order } from "@/api_v2/pre_order";

import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"

const layoutStore = useLSSBuyerLayoutStore();
const route = useRoute();
const store = useShoppingCartStore(); 


onMounted(()=>{
    buyer_retrieve_pre_order(route.params.pre_order_id, layoutStore.alert)
    .then(
        res => { store.order = res.data }
    )
})
</script>
