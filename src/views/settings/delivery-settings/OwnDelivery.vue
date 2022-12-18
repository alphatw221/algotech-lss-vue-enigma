<template>
    <div class="py-5 sm:p-10 sm:py-5">
        <div>
            <input 
                class="form-check-input w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="deliverySettings.is_self_delivery_enabled"
            />
            <label class="ml-3 form-label">{{ $t('settings.delivery_form.enabled') }}</label>
        </div>
        <div class="flex flex-col gap-1 text-base my-5 intro-y sm:gap-3 -z-50">
            <div class="flex flex-col mt-2 text-[16px]"> 
                <label class="w-full mr-1 text-base whitespace-nowrap">{{ $t('settings.delivery.charge') }}</label>
                <input 
                    class="w-full form-control h-[35px] sm:h-[42px]"
                    type="number" 
                    v-model="deliverySettings.delivery_charge"
                    @blur="v.delivery_charge.$touch()"
                />
                
            </div>
            <div class="flex flex-wrap justify-between mt-5"> 
                <label for="regular-form-2" class="text-base font-bold form-label my-auto">{{ $t('settings.delivery.charge_option') }}</label>
                <!-- <a 
                    class="whitespace-nowrap"
                    @click="addDelivery()"
                > <u> + {{ $t('settings.delivery.add_more_delivery_option') }}  </u> 
                </a> -->
                <button 
                    class="inline-block rounded-lg btn btn-primary ml-auto w-fit text-sm sm:text-[16px]" 
                    @click="addDelivery()"
                >
                    {{ $t('settings.delivery.add_more_delivery_option') }}
                </button>
		    </div>
            <div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0"
                v-for="(option, index) in deliverySettings.additional_delivery_options" :key="index">
                <div class="flex flex-col justify-between">
                    <input  
                    class="w-full form-control flex-2 sm:w-fit"
                    type="text" 
                    :placeholder="$t('settings.delivery_form.express_service_name')"
                    v-model="option.title"
                    />
                    <label class="block text-danger text-[12px]" 
                        v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].title"
                        :key="index"
                        >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                    <!-- <label class="block text-danger text-[12px]" v-if="v.additional_delivery_options.$each.$response.$errors[index].title.length">required</label> -->
                </div>
                <div>
                        <select 
                        class="flex-1 w-full rounded-lg form-select sm:form-select-lg sm:w-fit"
                        v-model="option.type"
                    >
                        <option value="+">{{ $t('settings.delivery.on_top_of_charge') }}</option>
                        <option value="=">{{ $t('settings.delivery.replace_charge') }}</option>
                    </select>
                    <label class="block text-danger text-[12px]" 
                        v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].type"
                        :key="index"
                        >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                </div>
                
                <div>
                    <input  
                        class="w-full form-control flex-2 sm:w-fit"
                        type="text" 
                        :placeholder="$t('settings.delivery_form.express_charge')"
                        v-model="option.price"
                    />
                    <label class="block text-danger text-[12px]" 
                        v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].price"
                        :key="index"
                        >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>                    
                </div>
                
                <button 
                    class="inline-block w-full h-[42px] ml-auto text-base btn btn-danger sm:rounded-lg sm:w-24" 
                    @click="deleteDelivery(index)"
                >
                <!-- delete additional_delivery[index] -->
                    {{ $t('settings.delivery_form.delete') }}
                </button>
            </div>
        </div>
        <div class="flex mt-5 float-right text-[14px]">
            <!-- <button 
                class="w-32 btn dark:border-darkmode-400 float-right"
                @click="discardDelivery"
            >
                {{ $t('settings.notes.discard') }}
            </button> -->
            <button 
                class="w-36 ml-5 shadow-md btn btn-primary float-right"
                @click="updateDelivery"
            >
                {{ $t('settings.delivery_form.delivery_method_settings_update') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { seller_update_delivery } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from '@/locales/i18n';

import { helpers, required, requiredIf, numeric, integer, decimal,minValue } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const layoutStore = useLSSSellerLayoutStore();

const deliverySettings = reactive({
    delivery_charge : 0,
    is_self_delivery_enabled: false,
    is_additional_delivery_charge : true,
    additional_delivery_options: [],
})

const props = defineProps({
    logistic: Object,
});

const deliverySettingsRules = {
    delivery_charge:{decimal, minValue:minValue(0)},
    additional_delivery_options: {
        $each: helpers.forEach({
            title:{required},
            type: {required},
            price:{required, numeric}
        })
    },
}

const v = useVuelidate(deliverySettingsRules, deliverySettings)

const additional_delivery_option = { title: null, type: null, price: null }

onMounted(() => {
    if(!layoutStore.userInfo.user_subscription)return

    Object.assign(deliverySettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))
    // deliverySettings = JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic))
    props.logistic.fields.forEach(field => {
        if(typeof deliverySettings[field.key]!=field.dataType) deliverySettings[field.key]=field.default
    });

})

const addDelivery = () =>{
    deliverySettings.additional_delivery_options.unshift( Object.assign({},additional_delivery_option) )
}

const deleteDelivery = index=>{ 
    deliverySettings.additional_delivery_options.splice(index,1)
}

const updateDelivery = () => {
    v.value.$touch()
    // return
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast("Invalid data")
        return
    }
    seller_update_delivery(deliverySettings, layoutStore.alert).then(res=>{
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

const discardDelivery = () =>{

    // console.log(layoutStore.userInfo.user_subscription.meta_logistic)
    // return
    if(!layoutStore.userInfo.user_subscription) return

    // console.log(layoutStore.userInfo.user_subscription.meta_logistic)
    // deliverySettings = JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic))
    Object.assign(deliverySettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))

    fields.forEach(field => {
        if(typeof deliverySettings[field.key]!=field.dataType) deliverySettings[field.key]=field.default
    });
}
</script>