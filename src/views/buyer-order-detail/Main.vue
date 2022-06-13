<template>
    <div class="w-full h-full">
        <div class="text-2xl text-base text-center my-5"> Order Details </div>

        <div class="grid grid-cols-12 gap-4">

            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium mr-5">
                            Order No. # {{ store.order.id }} 
                            <span class="btn rounded-full bg-secondary h-8 ml-3 cursor-auto">
                                {{ store.order.status }}
                            </span> 
                            <button 
                                class="btn btn-rounded-pending h-8 ml-3"
                                v-if="store.order.status !== 'complete'"
                                @click="router.push(`/buyer/order/${route.params.order_id}/payment`)"
                            >
                                proceed to pay
                            </button>
                        </h2>
                    </div>
                    <div class="flex mb-2">
                        <!-- <span class="font-medium mr-5"> Order Date : {{ store.order.created_at }} </span> -->
                        <span class="font-medium mr-5"> Order Date : {{ new Date(store.order.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }} </span>
                        
                    </div>
                </div>
                <div class="box p-6 m-3 border-2 border-secondary ">
                    <div class="flex">
                        <div class="mr-10">Name</div>
                        <div>{{ store.order.shipping_last_name }} {{ store.order.shipping_first_name }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">Phone</div>
                        <div>{{ store.order.shipping_phone }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">Email</div>
                        <div>{{ store.order.shipping_email }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-7">Remark</div>
                        <div>{{ store.order.shipping_remark }}</div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="box p-6 m-3 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg"> Order Information</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">Payment Method</div>
                        <div class="col-start-3 col-span-3 py-2">{{ store.order.payment_method }}</div>
                        <template v-if="store.order.payment_method">
                            <div class="col-start-1 col-span-2 py-3">Last Five Digit</div>
                            <div class="col-start-3 col-span-3 py-3">{{store.order.meta.last_five_digit}}</div>
                            <div class="w-20 h-20 image-fit zoom-in absolute top-30 right-10">
                                <Tippy
                                    tag="img"
                                    data-action="zoom"
                                    class="rounded-lg"
                                    :src="store.order.meta.receipt_image"
                                />
                            </div>
                        </template>
                        
                        <template v-if="store.order.shipping_method === 'pickup'">
                            <div class="col-start-1 col-span-2 py-2">Delivery Information</div>
                            <div class="col-start-3 col-span-3 py-2">In-store pickup</div>

                            <div class="col-start-1 col-span-2 py-2">Pickup Store</div>
                            <div class="col-start-3 col-span-3 py-2">{{store.order.meta.pick_up_store}}</div>

                            <div class="col-start-1 col-span-2 py-2">Pickup Address</div>
                            <div class="col-start-3 col-span-3 py-2">{{store.order.meta.pick_up_store_address}}</div>
                        </template>
                        <template v-else-if="store.order.shipping_method === 'delivery'">
                            <div class="col-start-1 col-span-2 py-3">Delivery Information</div>
                            <div class="col-start-3 col-span-3 py-3">Delivery</div>

                            <div class="col-start-1 col-span-2 py-3">Delivery Address</div>
                            <div class="col-start-3 col-span-3 py-3">
                                {{store.order.shipping_location}} ,
                                {{store.order.shipping_region}} ,
                                {{store.order.shipping_postcode}} ,
                                {{store.order.shipping_address_1}}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>   
        <div class="w-full overflow-x-auto">
            <OrderDetailTable />
        </div>
        <div class="grid grid-cols-12 gap-2">
            <div class="box col-start-1 col-span-12 lg:col-start-9 2xl:col-start-9">
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Total</div>
                        <div class="mr-20">$ {{store.order.subtotal}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Delivery Charge</div>
                        <div class="mr-20">{{store.order.shipping_cost}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Discount {{store.order.adjust_title ?? ''}}</div>
                        <div class="mr-20">$ {{store.order.adjust_price}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Grand Total</div>
                        <div class="mr-20">$ {{parseFloat(store.order.total).toFixed(2)}}</div>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script setup>
import OrderDetailTable from "./OrderDetailTable.vue";
// import OrderSummary from "@/components/box/OrderSummary.vue";
import OrderSummary from "@/views/buyer-order-payment/OrderSummary.vue";

import { computed, onMounted, ref, watch } from "vue";
import { buyer_retrieve_order } from "@/api_v2/order";
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const route = useRoute();
const router = useRouter();

const store = useLSSBuyerOrderStore(); 

onMounted(() => {
    buyer_retrieve_order(route.params.order_id)
    .then(
        res => { 
            store.order = res.data 
            console.log(res.data)
        }
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