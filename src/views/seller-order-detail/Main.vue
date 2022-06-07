<template>
    <div class="w-full h-full">
        <div class="text-2xl text-base text-center my-5"> Order Details </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                    <div class="w-full mx-2 ">
                        <div class="flex mb-2">
                            <h2 class="font-medium mr-5"> Order No. #{{store.orderDetail.id}} <span class="btn btn-rounded-pending h-8">
                                    {{store.orderDetail.status}}</span> </h2>
                        </div>
                        <div class="flex mb-2">
                            <span class="font-medium mr-5"> Order Date : {{store.orderDetail.created_at}} </span>
                        </div>
                    </div>
                <div class="w-full overflow-x-auto">
                    <OrderDetailTable />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div>
                    <PriceSummary />
                </div>
                <div class="box p-6 m-3 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg"> Payment Information</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">Payment Method</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.payment_method}}</div>

                        <div class="col-start-1 col-span-2 py-2">Last Five Digits</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.payment_method}}</div>

                        <div class="col-start-1 col-span-2 py-2">Record</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.payment_method}}</div>
                    </div>
                </div>
                <div class="box p-6 m-3 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg"> Delivery Information</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">Payment Method</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.payment_method}}</div>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>
<script setup>
import OrderDetailTable from "./OrderDetailTable.vue";
import PriceSummary from "./PriceSummary.vue"
import OrderSummary from "@/components/box/OrderSummary.vue";
import { computed, onMounted, ref, watch } from "vue";
import { buyer_retrieve_order } from "@/api_v2/order";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const store = useShoppingCartStore(); 

onMounted(()=>{
    buyer_retrieve_order(route.params.order_id)
    .then(
        res => { store.orderDetail = res.data 
        console.log(store.orderDetail)}
    )
})
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>