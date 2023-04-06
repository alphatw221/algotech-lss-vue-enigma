<template>

    <div class="flex flex-row items-center justify-start">
        <span class="text-lg">Delivery Information</span>
        <button class="btn btn-primary ml-auto" v-if="editDeliveryInfo" @click="clickCancelEditDeliveryInfo()">Cancel</button>
        <button class="btn btn-primary ml-auto" v-else @click="clickEditDeliveryInfo()">Edit</button>

    </div>
    

    <!-- <div class="grid grid-cols-2">
        <label class="text-base col-start-1">{{$t('order.shipping_first_name')}}:</label>
        <input class="form-control col-start-2" type="text" v-model="orderData.shipping_first_name" v-if="editDeliveryInfo">
        <span class="text-base col-start-2" v-else>{{sellerOrderDetail.order.shipping_first_name }} </span>


    </div> -->


    <div class="flex flex-row flex-wrap items-center ">
        <label class="text-base w-1/3">{{$t('order.shipping_name')}}:</label>
        <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_first_name" v-if="editDeliveryInfo">
        <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_first_name }} </span>
    </div>


    <div class="flex flex-row flex-wrap items-center ">
        <label class="text-base w-1/3">{{$t('order.shipping_email')}}:</label>
        <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_email" v-if="editDeliveryInfo">
        <span class="text-base ml-1" v-else>{{props?.store?.order.shipping_email }} </span>
    </div>


    <div class="flex flex-row flex-wrap items-center ">
        <label class="text-base w-1/3">{{$t('order.shipping_cellphone')}}:</label>
        <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_cellphone" v-if="editDeliveryInfo">
        <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_cellphone }} </span>
    </div>


    <template v-if="props?.store?.order.shipping_method === 'pickup'">

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order_detail.delivery.pickup_store')}}:</label>
            <span class="text-base ml-1">{{props?.store?.order?.shipping_option_data?.name||''}}</span> 
        </div>

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order_detail.delivery.pickup_address')}}:</label>
            <span class="text-base ml-1">{{props?.store?.order?.shipping_option_data?.address||''}}</span> 
        </div>


        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order_detail.delivery.deliveryTime')}}:</label>
            <span class="text-base ml-1">
                {{new Date(props?.store?.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}} 
                <br/>
                {{(props?.store?.order.shipping_time_slot || '')}}
            </span> 
        </div>

    </template>

    <template v-else-if="props?.store?.order?.shipping_method === 'delivery'">

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_option')}}:</label>
            <span class="text-base ml-1">{{ props?.store?.order?.shipping_option?.name|| $t('order_detail.delivery.default') }}</span> 
        </div>

        <!-- <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_region')}}:</label>
            <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_region" v-if="editDeliveryInfo">
            <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_region }} </span>
        </div> -->

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_postcode')}}:</label>
            <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_postcode" v-if="editDeliveryInfo">
            <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_postcode }} </span>
        </div>

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_region')}}:</label>
            <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_region" v-if="editDeliveryInfo">
            <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_region }} </span>
        </div>


        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_location')}}:</label>
            <input class="form-control w-1/2 ml-1" type="text" v-model="orderData.shipping_location" v-if="editDeliveryInfo">
            <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_location }} </span>
        </div>

       

        <div class="flex flex-row flex-wrap items-center ">
            <label class="text-base w-1/3">{{$t('order.shipping_property_type')}}:</label>

            <select class="form-select w-1/2 ml-1" v-model="orderData.shipping_property_type" v-if="editDeliveryInfo">
                <option :value="null"></option>
                <option value="HDB">HDB</option>
                <option value="Condo/Apartment">Condo/Apartment</option>
                <option value="Landed">Landed</option>
                <option value="Office">Office</option>

            </select>

            <span class="text-base ml-1" v-else>{{props?.store?.order?.shipping_property_type }} </span>

        </div>



        <div class="flex flex-row flex-wrap items-center " v-if="props?.store?.order.shipping_date_time && props?.store?.order.shipping_time_slot">
            <label class="text-base w-1/3">{{$t('order.shipping_date_time')}}:</label>
            <span class="text-base ml-1">
                {{new Date(props?.store?.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}} 
                <br/>
                {{(props?.store?.order.shipping_time_slot || '')}}
            </span>
        </div>

    </template>




    <div class="flex flex-row justify-center mt-3">
        <button class="btn btn-primary" v-if="editDeliveryInfo" @click="updateRecevierInfo()">Update</button>
    </div>

</template>

<script setup>
import { computed, onMounted, onBeforeMount, ref, watch, onUnmounted, getCurrentInstance, defineProps } from "vue";



import { seller_update_shipping_info } from "@/api_v2/order";

import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";


import i18n from "@/locales/i18n";

const props = defineProps({
  store:{
    type: Object,
    default:{}
  },
  layout_store:{
    type:Object,
    default:{}
  },
  role:{
    type:String,
    default:'customer'
  }
})

const editDeliveryInfo = ref(false)
const orderData = ref({})

const route = useRoute()
const router = useRouter()
const sellerOrderDetail = useSellerOrderStore()
const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus



// onMounted(()=>{
//    orderData.value = JSON.parse(JSON.stringify(props?.store?.order||{}))
// })

const clickEditDeliveryInfo = ()=>{
    
    orderData.value = JSON.parse(JSON.stringify(props?.store?.order||{}))
    editDeliveryInfo.value = true
}

const clickCancelEditDeliveryInfo = ()=>{
    editDeliveryInfo.value = false
}

const updateRecevierInfo = ()=>{
    seller_update_shipping_info(route.params.order_id, orderData.value, props?.layout_store?.alert).then(res=>{
        console.log(res.data)
        props.store.order = res.data
        editDeliveryInfo.value = false
    })
}

</script>

