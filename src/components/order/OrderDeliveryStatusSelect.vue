<template>
    <template v-if="deliveryStatusStore[props.order.delivery_status]?.allow_adjust">
        <select v-model="props.order.delivery_status" class="w-full" :class="selecterClass" @change="updateOrderDeliveryStatus()">
            <option :value="option" v-for="(option,index) in deliveryStatusStore[props.order.delivery_status].options" :key="index">
                {{$t(`order.delivery_status_options.${option}`)}}</option>
        </select>
    </template>
    <template v-else>
        {{$t(`order.delivery_status_options.${props.order.delivery_status}`)}}
    </template> 
</template>


<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance, defineProps} from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useDeliveryStatusStore } from "@/stores/lss-delivery-status-meta"
import { seller_update_deliver_status } from "@/api_v2/order"

const deliveryStatusStore = useDeliveryStatusStore()
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

const updateOrderDeliveryStatus = ()=>{
    seller_update_deliver_status(props.order.id, props.order.delivery_status, layoutStore.alert).then(res=>{

        Object.entries(res.data).forEach(([key,value]) => {
            props.order[key]=value                       //proxy object only got setter
        });

    })
    // .catch(err=>{
    //     deliveryStatus.value = props.order.delivery_status
    // })
}

</script>