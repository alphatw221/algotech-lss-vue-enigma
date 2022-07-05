<template>
    <div class="py-5 sm:p-8">
        <span class="text-2xl font-medium leading-none mx-5 mb-3 sm:m-10">Delivery Settings</span>
        <div class="px-5 sm:p-10  intro-y grid grid-cols-12 gap-1 sm:gap-5 -z-50 text-base">
            <div class="col-start-1 col-span-12 mt-2 flex flex-wrap"> 
                <label class="text-base whitespace-nowrap my-auto w-[18.2rem] mr-1">Delivery Charge</label>
                <input 
                    class="form-control form-control-rounded h-10 w-fit flex-1"
                    type="text" 
                    v-model="deliverySettings.delivery_charge"
                />
            </div>
            <div class="sm:col-start-1 col-span-12 mt-2 flex flex-wrap">
                <input 
                    class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1 my-auto" 
                    type="checkbox" 
                    v-model="deliverySettings.is_free_delivery_for_order_above_price"
                />
                <label class="my-auto w-[17rem] text-base">Free delivery for order above $</label>
                <input 
                class="form-control form-control-rounded w-fit flex-1 h-10" 
                type="text" 
                v-model="deliverySettings.free_delivery_for_order_above_price"
            />
            </div> 
            
            <div class="sm:col-start-1 col-span-12 mt-2 flex flex-wrap">
                <input 
                    class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1 my-auto" 
                    type="checkbox"
                    v-model="deliverySettings.is_free_delivery_for_how_many_order_minimum"
                />
                <label class="my-auto w-[17rem] text-base">Free delivery for minimum order Qty</label>
                <input 
                class="form-control form-control-rounded w-fit flex-1 h-10"
                type="text"
                v-model="deliverySettings.free_delivery_for_how_many_order_minimum"
            />       
            </div> 
            
            <label for="regular-form-2" class="form-label col-start-1 col-span-12 font-bold mt-5 text-base">Delivery Option(s)</label>
            <div v-for="(option, index) in deliverySettings.additional_delivery_options" class="col-span-12" :key="index">
                <div class="flex flex-col flex-wrap sm:flex-row gap-3 mt-5 sm:mt-0">
                    <input  
                        class="form-control form-control-rounded text-base w-full flex-1 sm:w-fit h-10"
                        type="text" 
                        placeholder="express service name"
                        v-model="option.title"
                    />
                    <select 
                        class="form-select form-select-lg rounded-full w-full flex-1 sm:w-fit h-10"
                        v-model="option.type"
                    >
                        <option value="+">On top of delivery charge</option>
                        <option value="=">Replace delivery charge</option>
                    </select>
                    <input  
                        class="form-control form-control-rounded w-full flex-2 sm:w-fit h-10"
                        type="text" 
                        placeholder="express charge"
                        v-model="option.price"
                    />
                    <button 
                        class="btn btn-danger inline-block text-base w-full rounded-full sm:rounded-lg  sm:w-24 h-10 ml-auto" 
                        @click="deleteDelivery(index)"
                    >
                    <!-- delete additional_delivery[index] -->
                        Delete
                    </button>
                </div>
            </div>
            <a 
                class=" w-full inline-block text-base my-3 col-end-9 sm:col-end-11 whitespace-nowrap"
                @click="addDelivery()"
            >
               <u> + Add more option  </u> 
            </a>
        </div>

        <span class="text-2xl font-medium leading-none mx-5 sm:m-10">Store Collection</span>
        <div class="px-5 mt-5 sm:mt-0 sm:p-10 intro-y grid grid-cols-12 gap-1 sm:gap-5 -z-50 text-base">
            <div v-for="(option, index) in deliverySettings.pickup_options" class="col-span-12" :key="index">
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col sm:flex-row gap-3">
                         <label class="text-base w-[8rem] lg:w-[12rem] my-auto">Pickup Store</label>
                        <input 
                            class="form-control form-control-rounded text-base w-full sm:w-[12rem] h-10 -mt-2 sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />
                    </div>
                    <div class="flex flex-col sm:flex-row flex-wrap gap-3">
                        <label class="text-base w-[8rem] lg:w-[12rem] my-auto">Pickup Address</label>
                        <input 
                            class="form-control form-control-rounded text-base h-10 w-full flex-1 sm:max-w-[28rem] mr-5 -mt-2 sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
                        <button 
                        class="btn btn-danger inline-block sm:ml-auto w-full rounded-full sm:rounded-lg sm:w-24" 
                        @click="deleteBranch(index)"
                        >
                        Delete
                        </button>
                    </div>
                    
                </div>
            </div>
            <a 
                class="w-full inline-block text-base my-3 col-end-9 sm:col-end-11 whitespace-nowrap"
                @click="addBranch()"
            >
               <u> + Add more option  </u> 
            </a>

            <label class="form-label col-start-1 col-span-12 text-xl">Delivery
                Note</label>
            <textarea class="form-control col-start-1 col-span-12 sm:col-span-10 h-32 p-3" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea>

        <div class="col-span-12 flex justify-evenly">
            <button 
                class="btn btn-elevated-rounded-secondary text-base w-28 col-start-4 mt-5"
                @click="discardDelivery"
            >
                Discard
            </button>
            <button 
                class="btn btn-elevated-rounded-primary text-base w-28 col-start-6 mt-5"
                @click="updateDelivery"
            >
                {{ upsertButtonName }}
            </button>
        </div>
        </div>        
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { seller_update_delivery } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const layoutStore = useLSSSellerLayoutStore();

const deliverySettings = ref({
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
    deliverySettings.value = layoutStore.userInfo.user_subscription.meta_logistic
    fields.forEach(field => {
        if(typeof deliverySettings.value[field.key]!=field.dataType) deliverySettings.value[field.key]=field.default
    });

})



const addDelivery = () =>{
    deliverySettings.value.additional_delivery_options.push(additional_delivery_option)
}

const deleteDelivery = index=>{ 
    deliverySettings.value.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    deliverySettings.value.pickup_options.push(branch_option)
}
const deleteBranch = index=>{
    deliverySettings.value.pickup_options.splice(index,1)
}


const updateDelivery = () => {
    seller_update_delivery(deliverySettings.value).then(res=>{
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast("Update Successfully")
    })
}

const discardDelivery = () =>{
    if(!layoutStore.userInfo.user_subscription)return
    deliverySettings.value = layoutStore.userInfo.user_subscription.meta_logistic
    fields.forEach(field => {
        if(typeof deliverySettings.value[field.key]!=field.dataType) deliverySettings.value[field.key]=field.default
    });
}
</script>