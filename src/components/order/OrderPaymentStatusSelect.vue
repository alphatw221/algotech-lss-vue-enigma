<template>
    <template v-if="paymentStatusStore[props.order.payment_status]?.allow_adjust">
        <select v-model="props.order.payment_status" class="w-full" :class="selecterClass" @change="updateOrderPaymentStatus()">
            <option :value="option" v-for="(option,index) in paymentStatusStore[props.order.payment_status].options" :key="index">
                {{$t(`order.payment_status_options.${option}`)}}</option>
        </select>
    </template>
    <template v-else>
        {{$t(`order.payment_status_options.${props.order.payment_status}`)}}
    </template>
</template>


<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance, defineProps} from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { usePaymentStatusStore } from "@/stores/lss-payment-status-meta"
import {  seller_update_payment_status } from "@/api_v2/order"

const paymentStatusStore = usePaymentStatusStore()
const layoutStore = useLSSSellerLayoutStore()
const selecterClass = ref('form-select-sm')

const props = defineProps({
    order: Object,
});

onMounted(()=>{
    handleResize()
    window.addEventListener('resize', handleResize())
})
onUnmounted(()=>{
    window.removeEventListener('resize', handleResize())
})


const handleResize =()=>{
    selecterClass.value = window.matchMedia('(max-width: 600px)').matches ? 'form-select-sm' : 'form-select-md'
    //change selecter size (only works when refresh) 
}

const updateOrderPaymentStatus = ()=>{
    seller_update_payment_status(props.order.id, props.order.payment_status, layoutStore.alert).then(res=>{

        Object.entries(res.data).forEach(([key,value]) => {
            props.order[key]=value                       //proxy object only got setter
        });

    })
    // .catch(err=>{
    //     deliveryStatus.value = props.order.payment_status
    // })
}

</script>