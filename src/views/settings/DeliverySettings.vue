<template>
    <div class="py-5 sm:p-8">
        <span class="mx-5 mb-3 text-2xl font-medium leading-none sm:m-10">Delivery Settings</span>
        <div class="grid grid-cols-12 gap-1 mx-5 text-base sm:m-10 intro-y sm:gap-3 -z-50">

            <div class="flex flex-col col-span-12 col-start-1 mt-2 text-[16px]"> 
                <label class="w-full mr-1 text-base whitespace-nowrap">Delivery Charge</label>
                <input 
                    class="w-5/6 form-control h-[42px]"
                    type="text" 
                    v-model="deliverySettings.delivery_charge"
                />
    
                <div class="flex col-span-12 col-start-1 mt-5"> 
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                        type="checkbox" 
                        v-model="deliverySettings.is_free_delivery_for_order_above_price"
                    />
                    <label class="w-full text-base">Free delivery for order above $</label>
                </div> 
                <input 
                class="w-5/6 form-control" 
                type="text" 
                v-model="deliverySettings.free_delivery_for_order_above_price"
                />
                
                <div class="flex col-span-12 col-start-1 mt-5"> 
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                        type="checkbox"
                        v-model="deliverySettings.is_free_delivery_for_how_many_order_minimum"
                    />
                    <label class="w-full text-base ">Free delivery for minimum order Qty</label>
                </div> 
                <input 
                class="w-5/6 form-control"
                type="text"
                v-model="deliverySettings.free_delivery_for_how_many_order_minimum"
                />       
            </div>
            
            <label for="regular-form-2" class="col-span-12 col-start-1 mt-5 text-base font-bold form-label">Delivery Option(s)</label>
            <div v-for="(option, index) in deliverySettings.additional_delivery_options" class="col-span-12" :key="index">
                <div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0">
                    <input  
                        class="flex-1 w-full text-base form-control sm:w-fit"
                        type="text" 
                        placeholder="express service name"
                        v-model="option.title"
                    />
                    <select 
                        class="flex-1 w-full rounded-lg form-select form-select-lg sm:w-fit"
                        v-model="option.type"
                    >
                        <option value="+">On top of delivery charge</option>
                        <option value="=">Replace delivery charge</option>
                    </select>
                    <input  
                        class="flex-1 w-full form-control flex-2 sm:w-fit"
                        type="text" 
                        placeholder="express charge"
                        v-model="option.price"
                    />
                    <button 
                        class="inline-block w-full h-10 ml-auto text-base rounded-full btn btn-danger sm:rounded-lg sm:w-24" 
                        @click="deleteDelivery(index)"
                    >
                    <!-- delete additional_delivery[index] -->
                        Delete
                    </button>
                </div>
            </div>
            <a 
                class="inline-block w-full col-end-9 my-3 text-base sm:col-end-11 whitespace-nowrap"
                @click="addDelivery()"
            >
               <u> + Add more option  </u> 
            </a>
        </div>

        <span class="mx-5 text-2xl font-medium leading-none sm:m-10">Store Pickup</span>
        <div class="grid grid-cols-12 gap-1 px-5 mt-5 text-base sm:mt-0 sm:p-10 intro-y sm:gap-5 -z-50">
            <div v-for="(option, index) in deliverySettings.pickup_options" class="col-span-12" :key="index">
                <div class="flex flex-col gap-3 sm:flex-row">
                    <div class="flex flex-col flex-1 gap-3">
                         <label class="text-base ">Pickup Store</label>
                        <input 
                            class="w-full h-10 -mt-2 text-base form-control sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />
                    </div>
                    <div class="flex flex-col flex-wrap gap-3 flex-grow-2">
                        <label class="text-base ">Pickup Address</label>
                        <input 
                            class="w-full h-10 mr-5 -mt-2 text-base form-control sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
                    </div>
                    <button 
                        class="inline-block w-full rounded-full btn btn-danger sm:ml-auto sm:rounded-lg sm:w-24 h-[42px] sm:mt-auto" 
                        @click="deleteBranch(index)"
                        >
                        Delete
                    </button>
                    
                </div>
            </div>
            <a 
                class="inline-block w-full col-end-9 my-3 text-base sm:col-end-11 whitespace-nowrap"
                @click="addBranch()"
            >
               <u> + Add more option  </u> 
            </a>

            <label class="col-span-12 col-start-1 text-xl form-label">Delivery
                Note</label>
            <textarea class="h-32 col-span-12 col-start-1 p-3 form-control" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea>

            <div class="flex col-span-12 mt-5 justify-evenly">
                <button 
                    class="w-32 btn dark:border-darkmode-400"
                    @click="discardDelivery"
                >
                    Discard
                </button>
                <button 
                    class="w-32 ml-5 shadow-md btn btn-primary"
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
    deliverySettings.value.additional_delivery_options.push( Object.assign({},additional_delivery_option) )
}

const deleteDelivery = index=>{ 
    deliverySettings.value.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    deliverySettings.value.pickup_options.push( Object.assign({},branch_option) )
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