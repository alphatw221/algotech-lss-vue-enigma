<template>
    <div class="py-5 lg:p-10 2xl:p-10">

        <span class="text-2xl font-medium leading-none m-10">Delivery Settings</span>
        <div class="px-5 lg:p-10 2xl:p-10 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50">
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Delivery Charge</label>
            <input 
                class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4 text-base"
                type="text" 
                v-model="deliverySettings.delivery_charge"
            />
            <div class="2xl:col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    v-model="deliverySettings.is_free_delivery_for_order_above_price"
                />
                <label class="col-span-2 ml-5 text-base">Free delivery for order above USD</label>
            </div> 
            <input 
                class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4" 
                type="text" 
                v-model="deliverySettings.free_delivery_for_order_above_price"
            />
            <div class="2xl:col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2">
                <input 
                    class="form-check-input text-base" 
                    type="checkbox"
                    v-model="deliverySettings.is_free_delivery_for_how_many_order_minimum"
                />
                <label class="col-span-2 ml-5 text-base">Free delivery for minimum order Qty</label>
            </div> 
            <input 
                class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4"
                type="text"
                v-model="deliverySettings.free_delivery_for_how_many_order_minimum"
            />       
            
            <label for="regular-form-2" class="form-label col-start-1 col-span-12 font-bold mt-5 text-base">Delivery Charge Option</label>
            <div v-for="(option, index) in deliverySettings.additional_delivery_options" class="col-span-12" :key="index">
                <div class="grid grid-cols-12 gap-3 mt-3">
                    <input  
                        class="form-control-rounded col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
                        type="text" 
                        placeholder="express service name"
                        v-model="option.title"
                    />
                    <select 
                        class="form-select col-span-12 lg:col-span-3 2xl:col-span-3"
                        v-model="option.type"
                    >
                        <option value="+">On top of delivery charge</option>
                        <option value="=">Replace delivery charge</option>
                    </select>
                    <input  
                        class="form-control-rounded col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
                        type="text" 
                        placeholder="express charge"
                        v-model="option.price"
                    />
                    <button 
                        class="btn btn-danger w-24 inline-block text-base ml-5" 
                        @click="deleteDelivery(index)"
                    >
                    <!-- delete additional_delivery[index] -->
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
                @click="addDelivery()"
            >
                Add
            </button>
        </div>

        <span class="text-2xl font-medium leading-none m-10 ">Store Collection</span>
        <div class="box px-5 lg:p-10 2xl:p-10 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50">
            <div v-for="(option, index) in deliverySettings.pickup_options" class="col-span-12" :key="index">
                <div class="grid grid-cols-12 gap-3">
                    <label class="col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Store</label>
                    <input 
                        class="form-control-rounded col-span-12 lg:col-span-6 2xl:col-span-4 text-base"
                        type="text"
                        v-model="option.name" 
                    />
                    <label class="col-start-1 col-span-12 lg:col-span-3 lg:col-start-1 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Address</label>
                    <input 
                        class="form-control-rounded col-span-12 lg:col-span-6 2xl:col-span-6 text-base"
                        type="text" 
                        v-model="option.address"
                    />
                    <button 
                        class="btn btn-danger w-24 inline-block text-base ml-5" 
                        @click="deleteBranch(index)"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mt-3 mb-5"
                @click="addBranch()"
            >
                Add
            </button>

            <label class="form-label col-start-1 col-span-12 text-xl">Delivery
                Note</label>
            <textarea class="form-control col-start-1 col-span-10 h-32 p-3" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea>

            <button 
                class="btn btn-elevated-rounded-warning text-base w-36 col-start-4 mt-5"
                @click="discardDelivery"
            >
                Discard
            </button>
            <button 
                class="btn btn-elevated-rounded-success text-base w-36 col-start-6 mt-5"
                @click="updateDelivery"
            >
                {{ upsertButtonName }}
            </button>
            
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
    pickup_start_date : '',
    pickup_end_date : '',
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
    {key:"pickup_start_date", dataType:"string", default:''},
    {key:"pickup_end_date", dataType:"string", default:''},
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
        layoutStore.notification.showMessageToast("Update Success")
    })
}


</script>