<template>
    <div class="py-5 sm:p-10 sm:py-5">
        <span class="mb-3 text-lg sm:text-xl font-medium leading-none">{{ $t('settings.delivery.delivery_setting') }}</span>
        
        <div class="flex flex-col gap-1 text-base my-5 intro-y sm:gap-3 -z-50">

            <div class="flex flex-col mt-2 text-[16px]"> 
                <label class="w-full mr-1 text-base whitespace-nowrap">{{ $t('settings.delivery.charge') }}</label>
                <input 
                    class="w-full form-control h-[35px] sm:h-[42px]"
                    type="number" 
                    v-model="deliverySettings.delivery_charge"
                    @blur="v.delivery_charge.$touch()"
                />
                <label class="block text-danger text-[12px]" 
                            v-for="error, index in v.delivery_charge.$errors"
                            :key="index">
                            {{ $t(`settings.delivery.errors.${error.$validator}`) }}
                </label>

                <div class="flex mt-5"> 
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                        type="checkbox" 
                        v-model="deliverySettings.is_free_delivery_for_order_above_price"
                    />
                    <label class="w-full text-base">{{ $t('settings.delivery.order_above') }} $</label>
                </div> 
                <input 
                    class="w-full form-control" 
                    type="number" 
                    v-model="deliverySettings.free_delivery_for_order_above_price"
                    @blur="v.free_delivery_for_order_above_price.$touch()"
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
                        v-model="deliverySettings.is_free_delivery_for_how_many_order_minimum"
                    />
                    <label class="w-full text-base ">{{ $t('settings.delivery.minimum') }}</label>
                </div> 
                <input 
                    class="w-full form-control"
                    type="number"
                    v-model="deliverySettings.free_delivery_for_how_many_order_minimum"
                    @blur="v.free_delivery_for_how_many_order_minimum.$touch()"
                />       
                <label class="block text-danger text-[12px]" 
                            v-for="error, index in v.free_delivery_for_how_many_order_minimum.$errors"
                            :key="index">
                            {{ $t(`settings.delivery.errors.${error.$validator}`) }}
                </label>
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
                    class="flex-1 w-full text-base form-control sm:w-fit"
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
                        class="flex-1 w-full form-control flex-2 sm:w-fit"
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
             <div class="flex flex-wrap justify-between mt-5"> 
                <label for="regular-form-2" class="text-base font-bold form-label my-auto w-fit">{{ $t('settings.delivery.store.collection') }}</label>
                <!-- <a 
                    class="whitespace-nowrap"
                    @click="addBranch()"
                > <u> + {{ $t('settings.delivery_form.add_more_pickup_option') }}  </u> 
                </a> -->
                <button 
                    class="inline-block rounded-lg btn btn-primary sm:ml-auto w-fit text-sm sm:text-[16px]" 
                    @click="addBranch()"
                >
                    {{ $t('settings.delivery_form.add_more_pickup_option') }}
                </button>
            </div>
            <div v-for="(option, index) in deliverySettings.pickup_options" class="text-sm sm:text-[16px] " :key="index">
                <div class="flex flex-col flex-wrap gap-3 sm:flex-row">
                    <div class="flex flex-col flex-1 ">
                         <label class="text-base whitespace-nowrap">{{ $t('settings.delivery.store.pickup_store') }}</label> 
                        <input 
                            class="w-full h-[42px] text-base form-control sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />
                        <label class="block text-danger text-[12px]" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].name"
                            :key="index"
                            >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                    </div>
                    <div class="flex flex-col flex-wrap flex-grow-2">
                        <label class="text-base ">{{ $t('settings.delivery.store.pickup_address') }}</label>
                        <input 
                            class="w-full h-[42px] mr-5 text-base form-control sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
                        <label class="block text-danger text-[12px]" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].address"
                            :key="index"
                            >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                    </div>
                    <button 
                        class="inline-block w-full btn btn-danger sm:ml-auto sm:rounded-lg sm:w-24 h-[42px] sm:mt-auto" 
                        @click="deleteBranch(index)"
                        >
                        {{ $t('settings.delivery_form.delete') }}
                    </button>
                </div>
            </div>
            <!-- <template v-if="layoutStore.userInfo.user_subscription.country=='TW'">
                <div class="flex flex-col justify-center text-[16px]">
                    <div class="flex mt-5 lg:mb-5 lg:mt-0">
                        <input 
                            class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                            type="checkbox"
                            v-model="deliverySettings.ecpay_delivery_enable"
                        />
                        <label class="ml-3 form-label">啟用綠界物流</label>
                    </div>
                    <div class="my-5 lg:my-0 p-5 rounded-md border-2 border-slate">
                        <div 
                        class="flex-col flex gap-2 my-2 intro-y w-full" 
                        >
                        <label class="mt-5 lg:mt-0">商店代號</label>
                            <input 
                                class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
                                type="text"
                                v-model="deliverySettings.ecpay_merchant_id"
                            />
                        <label class="mt-5 lg:mt-0">物流 Hash Key</label>
                            <input 
                                class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
                                type="text"
                                v-model="deliverySettings.ecpay_delivery_hash_key"
                            />
                        <label class="mt-5 lg:mt-0">物流 Hash IV</label>
                            <input 
                                class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
                                type="text" 
                                v-model="deliverySettings.ecpay_delivery_hash_iv"
                            />
                        </div>
                    </div>
                </div>
            </template> -->

            <!-- <label class=" text-xl form-label">{{ $t('settings.notes.delivery_note') }}</label>
            <textarea class="h-32  p-3 form-control" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea> -->
        <div class="flex mt-5 float-right text-[14px]">
            <!-- <button 
                class="w-32 btn dark:border-darkmode-400 float-right"
                @click="discardDelivery"
            >
                {{ $t('settings.notes.discard') }}
            </button> -->
            <button 
                class="w-32 ml-5 shadow-md btn btn-primary float-right"
                @click="updateDelivery"
            >
                {{ $t('settings.notes.update') }}
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
    is_free_delivery_for_order_above_price : true,
    free_delivery_for_order_above_price : 0,
    is_free_delivery_for_how_many_order_minimum : true,
    free_delivery_for_how_many_order_minimum : 0,
    is_additional_delivery_charge : true,
    additional_delivery_options: [],
    // pickup_start_date : '',
    // pickup_end_date : '',
    pickup_options: [],
    delivery_note : '',
    ecpay_delivery_enable : false,
    ecpay_merchant_id:'',
    ecpay_delivery_hash_key : '',
    ecpay_delivery_hash_iv : ''
})



const deliverySettingsRules = {
    delivery_charge:{required, decimal, minValue:minValue(0)},
    free_delivery_for_order_above_price:{required:requiredIf(()=>{ return deliverySettings.is_free_delivery_for_order_above_price==true }), decimal, minValue:minValue(0.01)},
    free_delivery_for_how_many_order_minimum:{required:requiredIf(()=>{ return deliverySettings.is_free_delivery_for_how_many_order_minimum==true }), integer, minValue:minValue(1)},

      additional_delivery_options: {
        $each: helpers.forEach({
            title:{required},
            type: {required},
            price:{required, numeric}
        })
      },
      pickup_options: {
        $each: helpers.forEach({
            name:{required},
            address: {required},
        })
      },
    }

const v = useVuelidate(deliverySettingsRules, deliverySettings)

const fields = [
    {key:"delivery_charge",dataType:"number", default:999999},
    {key:"is_free_delivery_for_order_above_price",dataType:"boolean", default:false},
    {key:"free_delivery_for_order_above_price",dataType:"number", default:999999},
    {key:"is_free_delivery_for_how_many_order_minimum",dataType:"boolean", default:false},
    {key:"free_delivery_for_how_many_order_minimum",dataType:"number", default:99},
    {key:"is_additional_delivery_charge",dataType:"boolean", default:true},
    {key:"additional_delivery_options", dataType:"object", default:[]},
    // {key:"pickup_start_date", dataType:"string", default:''},
    // {key:"pickup_end_date", dataType:"string", default:''},
    {key:"pickup_options", dataType:"object", default:[]},
    {key:"delivery_note", dataType:"string", default:''},
    {key:"ecpay_delivery_enable",dataType:"boolean", default:false},
    {key:"ecpay_delivery_hash_key", dataType:"string", default:''},
    {key:"ecpay_delivery_hash_iv", dataType:"string", default:''},
    {key:"ecpay_merchant_id", dataType:"string", default:''},
]
const upsertButtonName = ref('Update')


const additional_delivery_option = { title: null, type: null, price: null }
const branch_option = { name: null, address: null }

onMounted(() => {
    if(!layoutStore.userInfo.user_subscription)return

    Object.assign(deliverySettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))
    // deliverySettings = JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic))
    fields.forEach(field => {
        if(typeof deliverySettings[field.key]!=field.dataType) deliverySettings[field.key]=field.default
    });

})



const addDelivery = () =>{
    deliverySettings.additional_delivery_options.unshift( Object.assign({},additional_delivery_option) )
}

const deleteDelivery = index=>{ 
    deliverySettings.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    deliverySettings.pickup_options.unshift( Object.assign({},branch_option) )
}
const deleteBranch = index=>{
    deliverySettings.pickup_options.splice(index,1)
}


const updateDelivery = () => {
    v.value.$touch()
    // return
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast("Invalid data")
        return
    }
    seller_update_delivery(deliverySettings).then(res=>{
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