<template>
    <div class="text-2xl text-base text-center my-5"> Order Details </div>

    <div class="grid grid-cols-12 gap-4 h-fit">
        <div class="col-span-12 lg:col-span-6 2xl:col-span-6 h-fit">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium"> Order No. #{{store.orderDetail.id}} <span class="btn btn-rounded-pending cursor-auto h-8 ml-3">
                                {{store.orderDetail.status }}</span> </h2>
                    </div>
                    <div class="flex mb-2">
                        <span class="font-medium mr-5"> Order Date : {{new Date(store.orderDetail.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
                    </div>
                </div>
            <div class="w-full">
                <OrderDetailTable :order_type="route.query.type" :key="refreshKey"/>
            </div>
            <div class="box p-5 border-2 border-secondary mt-5"> 
                <div class="flex mb-4 dark:border-darkmode-400">
                    <span class="text-lg">Delivery Information</span>   
                </div>
                <div class="grid grid-cols-6 gap-2" v-show="store.orderDetail.shipping_method">

                    <template v-if="store.orderDetail.shipping_method === 'in_store'">
                        <div class="col-start-1 col-span-2 py-2">Delivery Information</div>
                        <div class="col-start-3 col-span-3 py-2">In-store pickup</div>

                        <div class="col-start-1 col-span-2 py-2">Pickup Store</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.pick_up_store}}</div>

                        <div class="col-start-1 col-span-2 py-2">Pickup Address</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.pick_up_store_address}}</div>
                    </template>
                    <template v-if="store.orderDetail.shipping_method === 'delivery'">
                        <div class="col-start-1 col-span-2 py-3">Delivery Information</div>
                        <div class="col-start-3 col-span-3 py-3">Delivery</div>

                        <div class="col-start-1 col-span-2 py-3">Delivery Address</div>
                        <div class="col-start-3 col-span-3 py-3">
                            {{store.orderDetail.shipping_location}} ,
                            {{store.orderDetail.shipping_region}} ,
                            {{store.orderDetail.shipping_postcode}} ,
                            {{store.orderDetail.shipping_address_1}}
                        </div>
                    </template>
                </div>
            </div>
            <div class="box p-5 border-2 border-secondary" v-show="store.orderDetail.shipping_remark">
                <span class="text-lg">Remark</span>
                <div>
                    {{store.orderDetail.shipping_remark}}
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6">
            <div>
                <PriceSummary :order_type="route.query.type" :key="refreshKey"/>
            </div>
            <div class="box p-5 border-2 border-secondary mt-5"> 
                <div class="flex mb-4 dark:border-darkmode-400">
                    <span class="text-lg"> Payment Information</span>   
                </div>
                <div class="grid grid-cols-6 gap-2" v-if="store.orderDetail.payment_method">
                    <template v-if="store.orderDetail.payment_method">
                        <div class="col-start-1 col-span-2 py-2">Payment Method</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.payment_method}}</div>
                    </template>

                    <template v-if="store.orderDetail.meta.last_five_digit">
                        <div class="col-start-1 col-span-2 py-2">Last Five Digits</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.last_five_digit}}</div>
                    </template>

                    <template v-if="store.orderDetail.meta.receipt_image">
                        <div class="col-start-1 col-span-2 py-2">Record</div>
                        <div class="col-start-3 col-span-3 py-2">
                                <Tippy tag="img" :src="store.orderDetail.meta.receipt_image" />
                            
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>    
    
</template>
<script setup>
import OrderDetailTable from "./OrderDetailTable.vue";
import PriceSummary from "./PriceSummary.vue"
import OrderSummary from "@/components/box/OrderSummary.vue";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { seller_retrieve_pre_order } from "@/api_v2/pre_order";
import { seller_retrieve_order } from "@/api_v2/order";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const store = useManageOrderStore();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

let refreshKey = 0


onMounted(()=>{
    // console.log(route.query.type)
    get_order()
    eventBus.on("getNewPrice", (payload) => {
		get_order()
        refreshKey+=1
	})
})
onUnmounted(()=>{
    eventBus.off("getNewPrice")
})

function get_order(){
    if (route.query.type === 'pre_order'){
        seller_retrieve_pre_order(route.params.order_id)
        .then(
            res => { store.orderDetail = res.data 
                console.log(store.orderDetail)}
        )
    }else{
        seller_retrieve_order(route.params.order_id)
        .then(
            res => { store.orderDetail = res.data 
            console.log(store.orderDetail)}
        )
    }
}
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>