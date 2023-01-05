<template>

    <div v-if="ready" class="flex flex-col justify-center py-5 sm:p-5">
        <div class="flex flex-row justify-start mt-5 lg:mb-5 lg:mt-0">
            <input 
                class="form-check-input w-[1.5rem] h-[1.5rem] my-auto" 
                type="checkbox" 
                v-model="logisticData.enabled"
            />
            <label class="ml-3 form-label my-auto">{{ $t('settings.delivery_form.enabled') }}</label>
        </div>

        <div class="my-5 lg:my-0 p-5 rounded-md border-2 border-slate text-[16px] ">
            <div v-if="props.logistic.fields==''"> 
                Add your {{props.logistic.key}} account
            </div>
            <div 
                class="flex-col flex gap-2 my-2 intro-y w-full" 
                v-for="(field, index) in props.logistic.fields" 
                :key="index"
            >   
                <template v-if="field.dataType === 'object'">
                    <label class="mt-3 form-label">{{ $t(`settings.delivery_form.${props.logistic.key}.shipping_way`) }}</label>
                    <div class="flex flex-row flex-wrap gap-5 justify-between mb-5 lg:w-5/6">
                        <template  v-for="(option_fields, option_key, option_index) in field.options" :key="option_index">
                            <div class="flex-row flex-wrap col-span-3 md:col-span-1">
                                <template v-for="(option_field, option_field_index) in option_fields" :key="option_field_index">
                                    <input
                                        v-if="option_field.type === 'checkbox'"
                                        class="form-check-input w-[1.5rem] h-[1.5rem]" 
                                        :type="option_field.type"
                                        v-model="logisticData[field.key][option_key][option_field.key]"
                                        />
                                    <label v-if="option_field.type === 'text'" class="ml-2">
                                        {{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}.${option_key}`) }}
                                    </label>
                                    
                                    <div v-if="option_field.type === 'number'">
                                        <span class=" ml-auto my-auto">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}.${option_field.key}`) }}</span>
                                        <!-- <span class=" ml-auto my-auto">{{ option_field.name }}</span> -->
                                        <input :type="option_field.type" :min="option_field.default" class="text-center w-20 h-[33px] form-control px-1 ml-1" 
                                        v-model="logisticData[field.key][option_key][option_field.key]"
                                        :readonly="logisticData[field.key][option_key].enabled == false"
                                        />
                                    </div>
                                    
                                </template>
                            </div>
                        </template>
                    </div>
                    <div class="flex"> 
                        <input 
                            class="form-check-input w-[1.5rem] h-[1.5rem]" 
                            type="checkbox"
                            v-model="logisticData.allow_pickup_pay"
                            :disabled="disablePickupPay"
                        />
                        <label class="ml-3 form-label">{{ $t(`settings.delivery_form.ecpay.pickup_pay`)  }}</label>
                    </div>
                </template>

                <template  v-else> 
                    <template v-if="field.type === 'text' || field.type === 'password'">
                        <label class="mt-5 lg:mt-0">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}`)  }}</label>
                        <input 
                            class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
                            type="text" 
                            v-model="logisticData[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'checkbox'">
                        <div class="flex mt-5 lg:mb-5 lg:mt-0">
                            <input 
                                class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                                type="checkbox" 
                                v-model="logisticData[field.key]"
                            />
                            <label class="ml-3 form-label">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}`)  }}</label>
                        </div>
                    </template>
                    <template v-else-if="field.type === 'select'">
                        <label class="mt-5 lg:mt-0">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}`)  }}</label>
                        <TomSelect 
                            class="w-full sm:w-[300px]"
                            v-model="logisticData[field.key]"
                        >
                            <option v-for="secondary_field, secondary_index in field.fields" :key="secondary_index" :value="secondary_field.vlaue">{{ secondary_field.name }}</option>
                        </TomSelect>
                    </template>
                </template>
                
            </div>
        </div>
    
        <div class="flex text-[14px]">
             <button 
                class="btn btn-primary w-36 shadow-md ml-auto mt-7 "
                @click="updateDeliveryMethod()"
            > 
                {{ $t('settings.delivery_form.delivery_method_settings_update') }} 
            </button>
        </div>
       
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
// import {paymentEndPoints} from "@/api_v2/payment";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_delivery } from '@/api_v2/user_subscription'
import i18n from "@/locales/i18n"

const sellerStore = useLSSSellerLayoutStore()
const props = defineProps({
    logistic: Object,
});

const route = useRoute();
const router = useRouter();

const logisticData = ref({
    enabled:false,
    allow_pickup_pay:false,
    logistics_sub_type:{}
})
const ready = ref(false)
const disablePickupPay = ref(true)

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    if(sellerStore.userInfo.user_subscription.meta_logistic[props.logistic.key]){
        logisticData.value = sellerStore.userInfo.user_subscription.meta_logistic[props.logistic.key]
    }
    if(typeof logisticData.value['enabled'] != 'boolean')logisticData.value['enabled']=false
    props.logistic.fields.forEach(field => {
        if(typeof logisticData.value[field.key] != field.dataType) logisticData.value[field.key] = field.default
        if (field.dataType == "object") {
            Object.entries(field.options).forEach(([option_key, option_fields]) => {
                if (!logisticData.value[field.key][option_key]) {
                    logisticData.value[field.key][option_key] = {}
                }
                option_fields.forEach(option_field => {
                    if (!logisticData.value[field.key][option_key][option_field.key]) {
                        logisticData.value[field.key][option_key][option_field.key] = option_field.default
                    }
                })
            })
        }
    });
    // console.log('logisticData',logisticData.value)
    ready.value = true
})


const updateDeliveryMethod = () => {
    console.log('ecPay')
    console.log('log',logisticData.value)
    seller_update_delivery({'ecpay':logisticData.value}, sellerStore.alert).then(res=>{
        sellerStore.userInfo.user_subscription.meta_logistic = res.data.user_subscription.meta_logistic
        sellerStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

const checkDisablePickupPay = () => {
    disablePickupPay.value = true
    let has_cvs_enable = false
    Object.entries(logisticData.value.logistics_sub_type).forEach(([key, value]) => {
        if(key !== 'TCAT' && value.enabled == true) {
            disablePickupPay.value = false
            has_cvs_enable = true
            return false
        }
    })
    if (!has_cvs_enable) {
        logisticData.value.allow_pickup_pay = false
    }
}
watch(computed(()=>logisticData.value),()=>{
    // console.log(logisticData.value)
    checkDisablePickupPay()
},{deep:true})



</script>
