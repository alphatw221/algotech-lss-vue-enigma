<template>

    <div class="flex flex-col justify-center text-[16px]">
        <div class="flex mt-5 lg:mb-5 lg:mt-0">
            <input 
                class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="paymentData.enabled"
            />
            <label class="form-label ml-3">Enabled</label>
        </div>

        <div class="my-5 lg:my-0 lg:mx-5 lg:p-5">
            <div 
                class="intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5" 
                v-for="(field, index) in props.payment.fields" 
                :key="index"
            >
                <template v-if="field.type === 'text' || field.type === 'password'">
                    <label class="form-label col-start-1 col-span-12 lg:col-span-2 mt-5 lg:mt-0">{{ field.name }}</label>
                    <input 
                        class="form-control form-control-rounded col-span-12 -mt-3 lg:mt-0 lg:col-span-9 lg:w-5/6" 
                        type="text" 
                        v-model="paymentData[field.key]"
                    />
                </template>
                <template v-else-if="field.type === 'select'">
                    <label class="form-label col-start-1 col-span-12 lg:col-span-2 mt-5 lg:mt-0">{{ field.name }}</label>
                    <select 
                        id="tabulator-html-filter-field"
                        class="form-select-lg form-select rounded-full col-span-12 -mt-3 lg:mt-0 lg:col-span-9 lg:w-5/6"
                        v-model="paymentData[field.key]"
                    >
                        <option v-for="option in field.options" :key="option">{{ option }}</option>
                    </select>
                </template>
            </div>
        </div>
    
        <button 
            class="btn btn-elevated-rounded-primary text-base w-48 mt-2"
            @click="updatePayment()"
        > 
            Update
        </button>
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
});

const route = useRoute();
const router = useRouter();

const paymentData = ref({
    enabled:false,

})

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    if(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]){
        paymentData.value = sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]
    }
    props.payment.fields.forEach(field => {
        if(typeof paymentData.value[field.key] != field.dataType)paymentData.value[field.key]=field.default
    });
    if(typeof paymentData.value['enabled'] != 'boolean')paymentData.value['enabled']=false
})

const updatePayment = () => {
    seller_update_payment(props.payment.key,paymentData.value).then(res=>{
        console.log(res.data)
        sellerStore.userInfo = res.data
        sellerStore.notification.showMessageToast("Update Successfully")
    })
}

</script>
