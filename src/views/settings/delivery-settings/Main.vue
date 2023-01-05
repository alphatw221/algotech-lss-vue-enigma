<template>
    <div class="p-2 2xl:p-10 mx-5">
        <div class="mb-3 text-lg sm:text-xl font-medium leading-none">{{ $t('settings.delivery.free_delivery_settings') }}</div>
        <div class="flex mt-5"> 
            <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                type="checkbox" 
                v-model="v.is_free_delivery_for_order_above_price.$model"
                @blur="v.is_free_delivery_for_order_above_price.$touch"
            />
            <label class="w-full text-base">{{ $t('settings.delivery.order_above') }}</label>
        </div> 
        <input 
            class="w-full form-control" 
            type="number" 
            v-model="v.free_delivery_for_order_above_price.$model"
            @blur="v.free_delivery_for_order_above_price.$touch"
        />
        <label class="block text-danger text-[12px]" 
                    v-for="error, index in v.free_delivery_for_order_above_price.$errors"
                    :key="index">
                    {{ $t(`settings.delivery.errors.${error.$validator}`) }}
        </label>

        <div class="flex  mt-5"> 
            <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                type="checkbox"
                v-model="v.is_free_delivery_for_how_many_order_minimum.$model"
                @blur="v.is_free_delivery_for_how_many_order_minimum.$touch"
            />
            <label class="w-full text-base ">{{ $t('settings.delivery.minimum') }}</label>
        </div> 
        <input 
            class="w-full form-control"
            type="number"
            v-model="v.free_delivery_for_how_many_order_minimum.$model"
            @blur="v.free_delivery_for_how_many_order_minimum.$touch"
        />       
        <label class="block text-danger text-[12px]" 
                    v-for="error, index in v.free_delivery_for_how_many_order_minimum.$errors"
                    :key="index">
                    {{ $t(`settings.delivery.errors.${error.$validator}`) }}
        </label>
        <div class="flex text-[14px]">
            <button 
                class="btn btn-primary w-32 shadow-md ml-auto mt-7"
                @click="updateDelivery()"
            >
                {{ $t('settings.delivery_form.free_delivery_settings_update') }}
            </button>
        </div>
    </div>
    <div class="p-2 2xl:p-10 mx-5">
        <div class="mb-3 text-lg sm:text-xl font-medium leading-none">{{ $t('settings.delivery.delivery_method_settings') }}</div>
        <TabGroup v-if="logisticReady">
            <TabList class="flex flex-wrap items-center justify-end gap-1 sm:gap-3 nav-boxed-tabs sm:px-10">
                
                <Tab
                    class="h-20 mx-auto border-[#131c34] w-[100%] max-w-[180px] text-center" 
                    tag="button"
                    v-for="logistic,index in logistics" :key="index"
                >   
                    <div v-if="logistic.name === 'Own Delivery'" class="inline-flex items-center my-auto grow w-full">
                        <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="hidden sm:block h-6 mr-1"/>
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.delivery_form.delivery_titles.${logistic.key}`) }}</span>
                    </div>
                    <div v-else class="inline-flex items-center my-auto grow w-full mx-auto">
                        <font-awesome-icon icon="fa-regular fa-credit-card" class="hidden sm:block h-6 mr-1" />
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.delivery_form.delivery_titles.${logistic.key}`) }}</span>
                    </div>
                </Tab>
            </TabList>
            <div class="mt-0 lg:mt-5 lg:px-10 xl:mx-10">  
                <TabPanels>
                    <TabPanel class="leading-relaxed" v-for="logistic, index in logistics" :key="index">

                            <OwnDelivery :logistic ="logistic" v-if="logistic.key=='own_delivery'"/>

                            <StorePickup :logistic ="logistic" v-else-if="logistic.key=='store_pickup'"/>

                            <DeliveryMethod  :logistic="logistic" v-else /> 
                        
                            <!-- <PaymentMethod :payment="payment" v-else/> -->

                    </TabPanel>  
                </TabPanels>
            </div>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { helpers, required, requiredIf, numeric, integer, decimal,minValue } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import i18n from '@/locales/i18n';
import { seller_update_delivery } from '@/api_v2/user_subscription'
import { useLSSLogisticMetaStore } from '@/stores/lss-logistic-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import OwnDelivery from './OwnDelivery.vue'
import StorePickup from './StorePickup.vue'
import DeliveryMethod from './DeliveryMethod.vue'

const logisticStore = useLSSLogisticMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const logistics = ref([])
const logisticReady = ref(false)




onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    const meta_country = sellerStore.userInfo.user_subscription.meta_country
    const meta_logistic = sellerStore.userInfo.user_subscription.meta_logistic
    const logisticKeySet = new Set()
    meta_country.activated_country.forEach( country => { logisticStore[country].forEach( key => logisticKeySet.add(key) ) } )
    logisticKeySet.forEach(key => {
        logistics.value.push(logisticStore[key])
    });
    Object.entries(freeDeliverySettingsData.value).forEach(([key, value])=>{
        freeDeliverySettingsData.value[key] = meta_logistic[key]
    })
   
    // don't let kol use ecpay, temporarily remove it
    if (sellerStore.userInfo.user_subscription.type == 'kol') {
        logistics.value = logistics.value.filter(v=>v.key !== "ecpay")
    }
    logisticReady.value=true
})
const freeDeliverySettingsData = ref({
    is_free_delivery_for_order_above_price : true,
    free_delivery_for_order_above_price : 0.00,
    is_free_delivery_for_how_many_order_minimum : true,
    free_delivery_for_how_many_order_minimum : 0.00,
})
const freeDeliverySettingsRules = {
    is_free_delivery_for_order_above_price:{},
    is_free_delivery_for_how_many_order_minimum:{},
    free_delivery_for_order_above_price:{
        required:requiredIf(()=>{ 
            return freeDeliverySettingsData.value.is_free_delivery_for_order_above_price==true 
        }), 
        numeric, 
    },
    free_delivery_for_how_many_order_minimum:{
        required:requiredIf(()=>{ return freeDeliverySettingsData.value.is_free_delivery_for_how_many_order_minimum==true }), 
        numeric
    }
}
const v = useVuelidate(freeDeliverySettingsRules, freeDeliverySettingsData.value)
const updateDelivery = () => {
    // console.log('top',freeDeliverySettingsData.value)
    v.value.$touch()
    // return
    if(v.value.$invalid){
        sellerStore.alert.showMessageToast("Invalid data")
        return
    }
    seller_update_delivery(freeDeliverySettingsData.value, sellerStore.alert).then(res=>{
        sellerStore.userInfo.user_subscription.meta_logistic = res.data.user_subscription.meta_logistic
        sellerStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

</script>