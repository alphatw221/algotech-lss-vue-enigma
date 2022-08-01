<template>

    <div class="flex flex-col justify-center text-[16px]">
        <div class="flex mt-5 lg:mb-5 lg:mt-0">
            <input 
                class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="paymentData.enabled"
            />
            <label class="ml-3 form-label">{{ $t('settings.payment_form.enabled') }}</label>
        </div>

        <div class="my-5 lg:my-0 p-5 rounded-md border-2 border-slate">
            <div v-if="props.payment.fields==''"> 
                Add your ${props.payment.key} account
            </div>
            <div 
                class="flex-col flex gap-2 my-2 intro-y w-full" 
                v-for="(field, index) in props.payment.fields" 
                :key="index"
            >
                <template v-if="field.type === 'text' || field.type === 'password'">
                    <label class="mt-5 lg:mt-0">{{ $t(`settings.payment_form.${props.payment.key}.${field.key}`)  }}</label>
                    <input 
                        class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
                        type="text" 
                        v-model="paymentData[field.key]"
                    />
                </template>
                <template v-else-if="field.type === 'select'">
                    <label class="mt-5 lg:mt-0">{{ $t(`settings.payment_form.${props.payment.key}.${field.key}`)  }}</label>
                    <TomSelect 
                        class="w-full sm:w-[300px]"
                        v-model="paymentData[field.key]"
                    >
                        <option v-for="option in field.options" :key="option">{{ option }}</option>
                    </TomSelect>
                </template>
            </div>
        </div>
    
        <div class="flex">
             <button 
                class="btn btn-primary w-32 shadow-md ml-auto mt-7 "
                @click="updatePayment()"
            > 
                {{ $t('settings.payment_form.update') }} 
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
import i18n from "@/locales/i18n"

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
        sellerStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

</script>
