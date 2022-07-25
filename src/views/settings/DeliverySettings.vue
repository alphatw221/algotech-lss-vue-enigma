<template>
    <div class="py-5 sm:p-8 sm:py-5">
        <span class="mx-2 mb-3 text-lg sm:text-xl font-medium leading-none sm:m-5">{{ $t('settings.delivery.delivery_setting') }}</span>
        <div class="grid grid-cols-12 gap-1 lg:mx-2 text-base sm:m-5 intro-y sm:gap-3 -z-50">

            <div class="flex flex-col col-span-12 col-start-1 mt-2 text-[16px]"> 
                <label class="w-full mr-1 text-base whitespace-nowrap">{{ $t('settings.delivery.charge') }}</label>
                <input 
                    class="w-full form-control h-[35px] sm:h-[42px]"
                    type="number" 
                    v-model="deliverySettings.delivery_charge"
                />
    
                <div class="flex col-span-12 col-start-1 mt-5"> 
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
                />
                
                <div class="flex col-span-12 col-start-1 mt-5"> 
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
                />       
            </div>
            <div class="flex justify-between col-span-12 col-start-1 mt-5"> 
                <label for="regular-form-2" class="text-base font-bold form-label my-auto">{{ $t('settings.delivery.charge_option') }}</label>
                <!-- <a 
                    class="whitespace-nowrap"
                    @click="addDelivery()"
                > <u> + {{ $t('settings.delivery.add_more_delivery_option') }}  </u> 
                </a> -->
                <button 
                    class="inline-block rounded-lg btn btn-primary sm:ml-auto sm:w-24 lg:w-48 2xl:w-48 sm:mt-auto" 
                    @click="addDelivery()"
                >
                    {{ $t('settings.delivery.add_more_delivery_option') }}
                </button>
		    </div>
            <div v-for="(option, index) in deliverySettings.additional_delivery_options" class="col-span-12" :key="index">
                <div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0">
                    <div>
                        <input  
                        class="flex-1 w-full text-base form-control sm:w-fit"
                        type="text" 
                        :placeholder="$t('settings.delivery_form.express_service_name')"
                        v-model="option.title"
                        />
                        <label class="block text-danger font-[8px] font-light" 
                            v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].title"
                            :key="index"
                            >{{error.$message}}</label>
                        <!-- <label class="block text-danger font-[8px] font-light" v-if="v.additional_delivery_options.$each.$response.$errors[index].title.length">required</label> -->
                    </div>
                    <div>
                         <select 
                            class="flex-1 w-full rounded-lg form-select form-select-lg sm:w-fit"
                            v-model="option.type"
                        >
                            <option value="+">{{ $t('settings.delivery.on_top_of_charge') }}</option>
                            <option value="=">{{ $t('settings.delivery.replace_charge') }}</option>
                        </select>
                        <label class="block text-danger font-[8px] font-light" 
                            v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].type"
                            :key="index"
                            >{{error.$message}}</label>
                    </div>
                   
                    <div>
                        <input  
                            class="flex-1 w-full form-control flex-2 sm:w-fit"
                            type="text" 
                            :placeholder="$t('settings.delivery_form.express_charge')"
                            v-model="option.price"
                        />
                        <label class="block text-danger font-[8px] font-light" 
                            v-for="error, index in v.additional_delivery_options.$each.$response.$errors[index].price"
                            :key="index"
                            >{{error.$message}}</label>                    
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
        </div>
        <div class="grid grid-cols-12 gap-1 lg:mx-2 text-base intro-y sm:gap-5 -z-50">
             <div class="flex justify-between col-span-12 col-start-1 mt-5"> 
                <label for="regular-form-2" class="text-base font-bold form-label my-auto">{{ $t('settings.delivery.store.collection') }}</label>
                <!-- <a 
                    class="whitespace-nowrap"
                    @click="addBranch()"
                > <u> + {{ $t('settings.delivery_form.add_more_pickup_option') }}  </u> 
                </a> -->
                <button 
                    class="inline-block rounded-lg btn btn-primary sm:ml-auto sm:w-24 lg:w-48 2xl:w-48 sm:mt-auto" 
                    @click="addBranch()"
                >
                    {{ $t('settings.delivery_form.add_more_pickup_option') }}
                </button>
            </div>
            <div v-for="(option, index) in deliverySettings.pickup_options" class="col-span-12" :key="index">
                <div class="flex flex-col flex-wrap gap-3 sm:flex-row">
                    <div class="flex flex-col flex-1 ">
                         <label class="text-base whitespace-nowrap">{{ $t('settings.delivery.store.pickup_store') }}</label> 
                        <input 
                            class="w-full h-[42px] text-base form-control sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />
                        <label class="block text-danger font-[8px] font-light" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].name"
                            :key="index"
                            >{{error.$message}}</label>
                    </div>
                    <div class="flex flex-col flex-wrap flex-grow-2">
                        <label class="text-base ">{{ $t('settings.delivery.store.pickup_address') }}</label>
                        <input 
                            class="w-full h-[42px] mr-5 text-base form-control sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
                        <label class="block text-danger font-[8px] font-light" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].address"
                            :key="index"
                            >{{error.$message}}</label>
                    </div>
                    <button 
                        class="inline-block w-full btn btn-danger sm:ml-auto sm:rounded-lg sm:w-24 h-[42px] sm:mt-auto" 
                        @click="deleteBranch(index)"
                        >
                        {{ $t('settings.delivery_form.delete') }}
                    </button>
                </div>
            </div>

            <label class="col-span-12 col-start-1 text-xl form-label">{{ $t('settings.notes.delivery_note') }}</label>
            <textarea class="h-32 col-span-12 col-start-1 p-3 form-control" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea>
        </div> 
        <div class="flex col-span-12 mt-5 float-right text-[14px] lg:mr-2">
                <button 
                    class="w-32 btn dark:border-darkmode-400 float-right"
                    @click="discardDelivery"
                >
                    {{ $t('settings.notes.discard') }}
                </button>
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

import { helpers, required, numeric } from '@vuelidate/validators'
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
    delivery_note : ''
})



const deliverySettingsRules = {
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
]
const upsertButtonName = ref('Update')


const additional_delivery_option = { title: null, type: null, price: null }
const branch_option = { name: null, address: null }

onMounted(() => {
    if(!layoutStore.userInfo.user_subscription)return
    console.log(layoutStore.userInfo.user_subscription.meta_logistic)

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
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast("Invalid data")
        return
    }
    seller_update_delivery(deliverySettings).then(res=>{
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast("Update Successfully")
    })
}

const discardDelivery = () =>{

    // console.log(layoutStore.userInfo.user_subscription.meta_logistic)
    // return
    if(!layoutStore.userInfo.user_subscription) return

    console.log(layoutStore.userInfo.user_subscription.meta_logistic)
    deliverySettings = JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic))
    
    fields.forEach(field => {
        if(typeof deliverySettings[field.key]!=field.dataType) deliverySettings[field.key]=field.default
    });
}
</script>