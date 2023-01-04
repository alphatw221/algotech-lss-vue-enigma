<template>
    <div class="py-5 sm:p-5">
        <div class="flex flex-row justify-start">
            <input 
                class="form-check-input w-[1.5rem] h-[1.5rem] my-auto" 
                type="checkbox" 
                v-model="deliverySettings.is_self_delivery_enabled"
            />
            <label class="ml-3 form-label my-auto">{{ $t('settings.delivery_form.enabled') }}</label>
        </div>
        <div class="flex flex-col gap-1 text-base my-5 intro-y sm:gap-3 -z-50">
            <div class="flex flex-col mt-2 text-[16px] gap-2"> 
                <label class="w-fit text-base whitespace-nowrap">{{ $t('settings.delivery.charge') }}</label>
                <div class="flex flex-row gap-5">
                    <div class="flex flex-col"> 
                        <label class="w-fit text-base whitespace-nowrap">{{ $t('settings.delivery.title') }}</label>
                        <input 
                            class="w-32 form-control h-[35px] sm:h-[42px]"
                            type="text" 
                            v-model="deliverySettings.title"
                        />
                    </div>
                    <div class="flex flex-col"> 
                        <label class="w-fit text-base whitespace-nowrap">{{ $t('settings.delivery.price') }}</label>
                        <input 
                            class="w-full form-control h-[35px] sm:h-[42px]"
                            type="number" 
                            v-model="deliverySettings.delivery_charge"
                            @blur="v.delivery_charge.$touch()"
                        />
                    </div>
                </div>
                
            </div>
            <!-- <div class="flex flex-row flex-wrap gap-5 justify-between mb-5 lg:w-5/6">
                <template  v-for="(option, option_index) in csvOptions" :key="option_index">
                    <div v-for="(column, index) in cvsOptionColums" class="flex-row flex-wrap col-span-3 md:col-span-1" :key="index">
                        <input v-if="column.type =='checkbox'"
                            class="form-check-input w-[1.5rem] h-[1.5rem]" 
                            type="checkbox"
                            v-model="csvData[option.key][colum.key]"
                            />
                        <label class="ml-2" v-if="column.type == 'text'">
                            {{ option.name }}
                        </label>
                        
                        <div v-if="column.type=='number'">
                            <span class=" ml-auto my-auto">{{ $t(`setting.delivery.${column.key}`) }}</span>
                            <input :type="number" :min="0" style="border:solid 1px gray" class="text-center w-20 h-[33px] form-control px-1 ml-1" 
                            v-model="csvData[option.key][colum.key]"
                            />
                        </div>
                        <div v-if="column.type=='select'">
                            <select 
                                class="flex-1 w-full rounded-lg form-select sm:form-select-lg sm:w-fit"
                                v-model="csvData[option.key][colum.key]"
                            >
                                <option value="+">{{ $t('settings.delivery.on_top_of_charge') }}</option>
                                <option value="=">{{ $t('settings.delivery.replace_charge') }}</option>
                            </select>
                        </div>
                            
                    </div>
                </template>
            </div> -->
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
            <div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 items-center"
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
                
                <div>
                    <input  
                        class="form-control w-[1.5rem] h-[1.5rem]"
                        type="checkbox" 
                        v-model="option.is_cvs"
                    />
                    <label class="text-[16px] ml-2" 
                        >{{ $t("settings.delivery.own_delivery.is_cvs") }}
                    </label>                    
                </div>
                <div>
                    <select 
                        :disabled="option.is_cvs !== true"
                        class="flex-1 w-full rounded-lg form-select sm:form-select-lg sm:w-fit"
                        v-model="option.cvs_key"
                    >   
                        <option :value="undefined">{{ $t('settings.delivery.own_delivery.turn_on_cvs_map') }}</option>
                        <template v-for="(cvs_option, option_index) in csvOptions" :key="option_index">
                            <option :value="cvs_option.key">{{ $t('settings.delivery.own_delivery.cvs_map')+":"+cvs_option.name }}</option>
                        </template>
                    </select>
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
                @click="updateOwnDelivery()"
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
import { faLess } from '@fortawesome/free-brands-svg-icons';

const layoutStore = useLSSSellerLayoutStore();
const csvOptions = ref([
    {
        "key": "FAMIC2C", "name": "全家店到店"
    },
    {
        "key": "UNIMARTC2C", "name": "7-11店到店"
    },
    {
        "key":"HILIFEC2C", "name":"萊爾富店到店"

    },
    {
        "key":"OKMARTC2C", "name":"OK店到店"
    }
])
const cvsOptionColums = ref([
    {"key": "is_enabled", "type":"checkbox", "default": false},
    {"key": "title", "type": "text", "default": ""},
    {"key": "type", "type": "select", "default": "="},
    {"key": "price", "name": "", "type": "number", "default": 0}
])

const csvData = ref({})

const deliverySettings = reactive({
    delivery_charge : 0,
    title: '',
    is_self_delivery_enabled: false,
    is_additional_delivery_charge : true,
    additional_delivery_options: [],
    // cvs_delivery_options: []
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
    // cvs_delivery_options: {
    //     $each: helpers.forEach({
    //         title:{required},
    //         type: {required},
    //         price:{required, numeric}
    //     })
    // },
}

const v = useVuelidate(deliverySettingsRules, deliverySettings)

const additional_delivery_option = { title: null, type: null, price: null, is_cvs: false}

onMounted(() => {
    if(!layoutStore.userInfo.user_subscription)return
    Object.entries(deliverySettings).forEach(([key])=>{
        deliverySettings[key] = layoutStore.userInfo.user_subscription.meta_logistic[key]
    })
    // Object.assign(deliverySettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))
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

const updateOwnDelivery = () => {
    console.log('OWN')
    v.value.$touch()
    // return
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast("Invalid data")
        return
    }
    console.log(deliverySettings)
    seller_update_delivery(deliverySettings, layoutStore.alert).then(res=>{
        layoutStore.userInfo.user_subscription.meta_logistic = res.data.user_subscription.meta_logistic
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}

// const discardDelivery = () =>{

//     if(!layoutStore.userInfo.user_subscription) return
//     Object.assign(deliverySettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))

//     fields.forEach(field => {
//         if(typeof deliverySettings[field.key]!=field.dataType) deliverySettings[field.key]=field.default
//     });
// }
</script>