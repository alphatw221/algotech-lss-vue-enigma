<template>

    <div class="gap-5 justify-center flex-col flex p-5"> 

        <!-- <div class="flex mt-5 sm:mt-0 mt-5 sm:mx-5 sm:mt-0">
            <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model="props.campaign.meta_payment[props.payment.key].enabled"
            />
            <label class="ml-3 form-label text-base font-medium">{{$t(`create_campaign.payment_form.enabled`)}}</label>

        </div> -->

        <div 
            class="flex flex-col sm:mx-5" 
            v-for="(field, index) in props.payment.fields" :key="index"
        >
            <template v-if="field.type === 'text' || field.type === 'password'">
                <label class="form-label text-base font-medium">{{$t(`create_campaign.payment_form.${props.payment.key}.${field.key}`)}}</label>
                <input 
                    class="w-full form-control"
                    type="text" 
                    v-model="props.campaign.meta_payment[props.payment.key][field.key]"
                />
            </template>
            <template v-if="field.type === 'checkbox'">
                <div class="flex mt-5 lg:mb-5 lg:mt-0">
                    <input 
                        class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                        type="checkbox" 
                        v-model="props.campaign.meta_payment[props.payment.key][field.key]"
                    />
                    <label class="ml-3 form-label">{{ $t(`settings.payment_form.${props.payment.key}.${field.key}`) }}</label>
                </div>
            </template>
            <template v-else-if="field.type === 'select'">
                <label  
                    class="form-label text-base mt-2 font-medium">
                    {{$t(`create_campaign.payment_form.${props.payment.key}.${field.key}`)}}</label>
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
