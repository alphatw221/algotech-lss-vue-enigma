<template>

    <div >
        <div >
                <input 
                    class="form-check-input ml-3 " 
                    style="width: 1.5rem; height:1.5rem;"
                    type="checkbox" 
                    v-model="paymentData.enabled"
                />
                <label class="form-label ml-3">Enabled</label>
        </div>


        <div 
            class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" 
            v-for="(field, index) in props.payment.fields" 
            :key="index"
        >
            <template v-if="field.type === 'text' || field.type === 'password'">
                <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                <input 
                    class="form-control-rounded col-span-9 "
                    type="text" 
                    v-model="paymentData[field.key]"
                />
            </template>
            <template v-else-if="field.type === 'select'">
                <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                <select 
                    id="tabulator-html-filter-field"
                    class="form-select"
                    style="width: 100px;" 
                    v-model="paymentData[field.key]"
                >
                    <option v-for="option in field.options" :key="option">{{ option }}</option>
                </select>
            </template>
        </div>

        <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" >
            <button 
                class="btn btn-elevated-rounded-success text-base w-48 col-start-5 mt-2"
                @click="updatePayment()"
            > 
                Update
            </button>
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
        sellerStore.notification.showMessageToast("Update Success")
    })
}

</script>
