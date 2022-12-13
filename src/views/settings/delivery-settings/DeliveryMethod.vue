<template>

    <div class="flex flex-col justify-center text-[16px] px-5">
        <div class="flex mt-5 lg:mb-5 lg:mt-0">
            <input 
                class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="logisticData.enabled"
            />
            <label class="ml-3 form-label">{{ $t('settings.delivery_form.enabled') }}</label>
        </div>

        <div class="my-5 lg:my-0 p-5 rounded-md border-2 border-slate">
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
                        <div  v-for="(option, option_index) in field.options" :key="option_index" class="flex flex-row">
                            <div class="col-span-3 md:col-span-1 " v-if="logisticData[field.key][option_index]">
                                <div class="flex gap-2"> 
                                    <input
                                        class="form-check-input w-[1.5rem] h-[1.5rem]" 
                                        type="checkbox"
                                        v-model="logisticData[field.key][option_index].enabled"
                                        />
                                    <label class="form-label">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}.${option.key}`) }}</label>
                                </div>
                                <div v-if="logisticData[field.key][option_index].enabled == true" class="flex flex-row gap-3"> 
                                    <span class=" ml-auto my-auto">運費</span>
                                    <input type="number" :min="0" class="text-center w-14 h-[35px] form-control px-1" v-model="logisticData[field.key][option_index].price"/> 
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div v-if="show_pickup_pay" class="flex"> 
                        <input 
                            class="form-check-input w-[1.5rem] h-[1.5rem]" 
                            type="checkbox"
                            v-model="logisticData.allow_pickup_pay"
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
                            <option v-for="option in field.options" :key="option">{{ option }}</option>
                        </TomSelect>
                    </template>
                </template>
                
            </div>
        </div>
    
        <div class="flex">
             <button 
                class="btn btn-primary w-32 shadow-md ml-auto mt-7 "
                @click="updateDelivery()"
            > 
                {{ $t('settings.delivery_form.update') }} 
            </button>
        </div>
       
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
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
    logistics_sub_type:[]
})

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    if(sellerStore.userInfo.user_subscription.meta_logistic[props.logistic.key]){
        logisticData.value = sellerStore.userInfo.user_subscription.meta_logistic[props.logistic.key]
        console.log('a',logisticData.value)
    }

    props.logistic.fields.forEach(field => {
        if(typeof logisticData.value[field.key] != field.dataType)logisticData.value[field.key]=field.default
    });

    if(typeof logisticData.value['enabled'] != 'boolean')logisticData.value['enabled']=false

    var shippingMethods = ['TCAT','FAMIC2C','UNINARTC2C']
    for(var index in shippingMethods){
        var fields = {title: shippingMethods[index],type: '=',price: 0,enabled:false}
        if(!logisticData.value.logistics_sub_type?.includes(shippingMethods[index])) logisticData.value.logistics_sub_type.push(fields)
    }
})


const updateDelivery = () => {
    // console.log('log',logisticData.value)
    seller_update_delivery({'ecpay':logisticData.value}, sellerStore.alert).then(res=>{
        sellerStore.userInfo = res.data
        sellerStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

const show_pickup_pay = ref(false)

const enabled_pickup_pay = ()=>{
    show_pickup_pay.value = false
    logisticData.value.logistics_sub_type.forEach( type=>{
        if(type.title !='TCAT' && type.enabled == true) show_pickup_pay.value = true 
    })
    if(show_pickup_pay.value == false) logisticData.value.allow_pickup_pay = false
}
watch(computed(()=>logisticData.value),()=>{
    enabled_pickup_pay()}
    , {deep:true})



</script>
