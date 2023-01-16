<template>

    <div class="box p-5 m-4 border-2 border-secondary grid grid-cols-6 gap-2 sm:gap-3 text-[14px] sm:text-[16px]">
        <div class="col-span-6 flex mb-4 dark:border-darkmode-400">
            <span class="text-lg"> {{$t('shopping_cart.payment.shipping_summary')}}</span>   
        </div>

        <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.name')}}</div>
        <div class="col-start-3 col-span-4">{{ store.order.shipping_first_name }}</div>

        <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>

        <div class="col-start-1 col-span-2">{{$t('shopping_cart.delivery_tab.email')}}</div>
        <div class="col-start-3 col-span-4">{{ store.order.shipping_email }}</div>

        <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>

        <div class="col-start-1 col-span-2">{{$t('shopping_cart.delivery_tab.cell_phone')}}</div>
        <div class="col-start-3 col-span-4">{{ store.order.shipping_cellphone }}</div>

        <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
        
        <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.method')}}</div>
        <div v-if="store.order.shipping_method === 'pickup'" class="col-start-3 col-span-4">{{$t('shopping_cart.payment.pickup')}}</div>
        <div v-else-if="store.order.shipping_method === 'delivery'" class="col-start-3 col-span-4">{{ store.order.shipping_option == '' ? $t('shopping_cart.delivery_tab.option.default') : store.order.shipping_option }}</div>
        <div v-else-if="store.order.shipping_method === 'ecpay'" class="col-start-3 col-span-4">
            <template v-if="store.order.shipping_option_data.logisticsType == 'CVS'"> {{ store.order.shipping_option_data.LogisticsSubType == 'UNIMARTC2C'? '7-11店到店':'全家店到店' }}</template>
            <template v-else>黑貓宅配</template>
        </div>
        <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
        
        <template v-if="store.order.shipping_method === 'pickup'">        
            <div class="col-start-1 col-span-2">{{store.order?.shipping_option}}</div>
            <div class="col-start-3 col-span-4">{{store.order?.pickup_address}}</div>

            <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>

            <template v-if="store.order?.shipping_date_time && store.order?.shipping_time_slot"> 

                <div class="col-start-1 col-span-2">{{$t('shopping_cart.payment.pickupTime')}}</div>
                <div class="col-start-3 col-span-4">
                    <p> {{new Date(store.order?.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}} <br/>
                        {{store.order?.shipping_time_slot}}
                    </p>
                </div>
            </template>
            <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
        </template>

        <template v-else-if="store.order.shipping_method === 'delivery'">
            <template v-if="store.order.shipping_option_data?.is_cvs">
                <div class="col-start-1 col-span-2">{{$t('shopping_cart.payment.address')}}</div>
                <div class="col-start-3 col-span-4">
                    <div>{{ store.order.shipping_option_data?.cvs_store_name }}</div>
                    <div>{{ store.order.shipping_option_data?.cvs_address }}</div>
                </div>
                <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
            </template>

            <template v-else>
                <div class="col-start-1 col-span-2">{{$t('shopping_cart.payment.address')}}</div>
                <div class="col-start-3 col-span-4">
                    {{store.order.shipping_postcode}} ,
                    {{store.order.shipping_address_1}} ,
                    {{store.order.shipping_region}} ,
                    {{store.order.shipping_location}} 
                    {{(store.order.shipping_property_type || '') }}
                </div>
                <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
            </template>

            <template v-if="store.order?.shipping_date_time && store.order?.shipping_time_slot && !store.order.shipping_option_data?.is_cvs"> 
                <div class="col-start-1 col-span-2">{{$t('shopping_cart.payment.deliveryTime')}}</div>
                <div class="col-start-3 col-span-4">
                    <p> {{new Date(store.order?.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}}, 
                        {{store.order?.shipping_time_slot}}
                    </p>
                </div>
                <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
            </template>

        </template>

        <template v-else-if="store.order.shipping_method === 'ecpay'"> 
            <template v-if="store.order.shipping_option_data.logisticsType === 'CVS'"> 
                <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.cvs')}}</div>
                <div class="col-start-3 col-span-4">
                    <div>{{ store.order.shipping_option_data?.cvs_store_name }}</div>
                    <div>{{ store.order.shipping_option_data?.cvs_address }}</div>
                </div>
                <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>

            </template>
            <template v-else> 
                <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.address')}}</div>
                <div class="col-start-3 col-span-4">
                    {{store.order.shipping_postcode}}
                    {{store.order.shipping_region}}, {{store.order.shipping_location}}, {{store.order.shipping_address_1}} {{ (store.order.shipping_property_type || '') }}
                </div>
                <div class="col-span-6 w-full border-t border-slate-200/60 dark:border-darkmode-400"></div>
            </template>
        </template> 
        
       
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const store = useLSSBuyerOrderStore(); 

onMounted(()=>{
})

</script>
