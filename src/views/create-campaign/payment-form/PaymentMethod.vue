<template>

    <div class="gap-5 justify-center flex-col flex text-[16px] pt-1 p-5"> 

        <div class="flex flex-wrap sm:mx-5">
            <input 
                class="form-control form-check-input my-auto mr-3 w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model="props.campaign.meta_payment[props.payment.key].enabled"
            />
            <label class="flex flex-wrap font-medium my-3">Enabled</label>
        </div>

        <div 
            class="flex flex-col sm:mx-5" 
            v-for="(field, index) in props.payment.fields" :key="index"
        >
            <template v-if="field.type === 'text' || field.type === 'password'">
                <label class="form-label text-base">{{ field.name }}</label>
                <input 
                    class="w-full form-control"
                    type="text" 
                    v-model="props.campaign.meta_payment[props.payment.key][field.key]"
                />
            </template>
            <template v-else-if="field.type === 'select'">
                <label  
                    class="form-label text-base">
                    {{ field.name }}</label>
                <TomSelect 
                    class="w-full sm:w-[300px]"
                    v-model="props.campaign.meta_payment[props.payment.key][field.key]"
                >
                    <option v-for="option in field.options" :key="option">{{ option }}</option>
                </TomSelect>
            </template>
        </div>
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";
import {paymentEndPoints} from "@/api_v2/payment";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_payment } from '@/api_v2/user_subscription'
const sellerStore = useLSSSellerLayoutStore()
const props = defineProps({
    payment: Object,
    campaign: Object
});

const route = useRoute();
const router = useRouter();

const ready = ref(false)

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    // if(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]){
    //     paymentData.value = sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]
    // }
    // props.payment.fields.forEach(field => {
    //     if(typeof paymentData.value[field.key] != field.dataType)paymentData.value[field.key]=field.default
    // });
    // if(typeof paymentData.value['enabled'] != 'boolean')paymentData.value['enabled']=false
    ready.value=true
})


</script>
