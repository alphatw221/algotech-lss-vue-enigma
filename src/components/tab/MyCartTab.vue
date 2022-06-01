<template>
<div :class="{ hidden: store.openTab !== 1, block: store.openTab === 1 }">
    <div>My Cart</div>
    <div class="box grid grid-cols-12 gap-4">
    <div class="overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7">
        <ShoppingCartTable :requestUrl="'.'" :columns="tableColumns" :product="store.products">
        </ShoppingCartTable>
    </div>
    <div class="col-span-12 2xl:col-start-8 2xl:col-span-5 lg:col-start-8 lg:col-span-5">
        <OrderSummary :page_type="'step1'"> </OrderSummary>
        <AddItemModal :product="store.products"></AddItemModal>
    </div>
    </div>
    <div class="box grid grid-cols-12 gap-4 ml-4 mr-4">
    <div class="overflow-x-auto col-start-1 col-span-7">
        <div><span class="text-lg">Special Note:</span></div>
        <div class="flex">
        <div class="mr-auto">Special Note!!!!!!!!!!!!!!!!!!!!</div>
        </div>
    </div>
    </div>
</div>

</template>

<script setup>
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShoppingCartTable from "@/components/table/ShoppingCartTable.vue";
import AddItemModal from "@/components/modal/AddItemModal.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { retrieve_pre_order } from "@/api_v2/pre_order"

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore(); 

const tableColumns = ref( [
    { name: " ", key: "image" },
    { name: "Product", key: "product" },
    { name: "Q'TY", key: "qty" },
    { name: "Price", key: "price" },
    { name: "Subtotal", key: "subtotal" },
    { name: " ", key: "remove" },
])

onMounted(()=>{
    retrieve_pre_order(route.params.pre_order_id)
      .then(
        res => {
            console.log(res.data)
            for (const [key, value] of Object.entries(res.data.products)) {
                value.image = import.meta.env.VITE_APP_IMG_URL + value.image
                store.products.push(value)
            }
            store.orderSummary = {
                'subtotal': res.data.subtotal,
                'total': res.data.total,
                'deliveryCharge': res.data.shipping_cost,
                'adjustPrice': res.data.adjust_price,
            }
        }
      )
})
</script>
