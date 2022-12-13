<template>

    <div class="flex flex-col justify-center text-[16px]">
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
                    <div class="grid grid-cols-3 mb-5">
                        <div  v-for="option in field.options" :key="option" class="flex flex-row">
                            <!-- <template v-if="option.details"> 
                                <div  v-for="detail in option.details" :key="detail">
                                    <div class="flex"> 
                                        <input
                                            v-if="detail.type == 'checkbox'"
                                            class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                                            type="checkbox" 
                                            @click="shippingMethod()"
                                            />
                                        <label v-else-if="detail.key == 'title'" class="ml-3 form-label">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}.${option.key}`) }}</label>
                                    </div>
                                    <div v-if="ofield.key == 'price'" class="flex flex-row"> 
                                        <div>運費</div>
                                        <input :type="ofield.dataType" class="w-20 h-[35px] form-control" v-model="logisticData[field.key][option.key]"/> 
                                    </div>
                                </div>
                            </template> -->
                            
                            {{option.key}}
                            <input
                                class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                                type="checkbox" 
                                :value="option.key"
                                v-model="logistics_sub_type_index_computed"
                            />
                            <label class="ml-3 form-label">{{ $t(`settings.delivery_form.${props.logistic.key}.${field.key}.${option.key}`) }}</label>
                            
                        </div>
                    </div> 
                    <div v-if="logisticData[field.key]?.includes('FAMIC2C','UNINARTC2C')" class="flex"> 
                        <input 
                            class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
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
const logistics_sub_type_index = ref([])

const logisticData = ref({
    enabled:false,
    allow_pickup_pay:false,
    logistics_sub_type:[]
})

const shippingMethod = { title: null, type: null, price: null }

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

    // if(logisticData.value.logistics_type.includes('TCAT'))"FAMIC2C","UNINARTC2C"
    console.log('x',logisticData.value)

})


const updateDelivery = () => {
    if( !logisticData.value.logistics_sub_type.includes('FAMIC2C','UNINARTC2C')){logisticData.value.allow_pickup_pay = false}
    console.log(logistics_sub_type_index.value)
    console.log('log',logisticData.value)
    // seller_update_delivery({'ecpay':logisticData.value}, sellerStore.alert).then(res=>{
    //     sellerStore.userInfo = res.data
    //     sellerStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    // })
}

const logistics_sub_type_index_computed = computed({
  get:()=>{
    return logistics_sub_type_index.value
  },set:method=>{
    let method_array = {[method]:shippingMethod}
    console.log(method)
    Object.keys(logisticData.value.logistics_sub_type).forEach(key => {
        if(logisticData.value.logistics_sub_type[key] == method) logisticData.value.logistics_sub_type.pop(method)

        console.log(Object.keys(logisticData.value.logistics_sub_type))
     })
    // if(logisticData.value.logistics_sub_type.includes(method)) logisticData.value.logistics_sub_type[method].enabled=false
    logisticData.value.logistics_sub_type.unshift( Object.assign({},shippingMethod))
    // logisticData.value.logistics_sub_type.push(method_array)
  }})

const addMethods = () =>{
    logisticData.value.logistics_sub_type.unshift( Object.assign({},shippingMethod) )
}

</script>
