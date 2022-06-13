<template>
    <div class="box py-5 lg:p-10 2xl:p-10">

        <span class="text-2xl font-medium leading-none m-10">Delivery Settings</span>
        <div class="box px-5 lg:p-10 2xl:p-10 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50">
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
            <div v-for="(value, index) in additional_delivery" class="col-span-12" :key="index">
                <div class="grid grid-cols-12 gap-3 mt-3">
                    <input  
                        class="form-control-rounded col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
                        type="text" 
                        placeholder="express service name"
                        v-model="additional_delivery[index].title"
                    />
                    <select 
                        class="form-select col-span-12 lg:col-span-3 2xl:col-span-3"
                        v-model="additional_delivery[index].type"
                    >
                        <option value="+">On top of delivery charge</option>
                        <option value="=">Replace delivery charge</option>
                    </select>
                    <input  
                        class="form-control-rounded col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
                        type="text" 
                        placeholder="express charge"
                        v-model="additional_delivery[index].price"
                    />
                    <button 
                        class="btn btn-danger w-24 inline-block text-base ml-5" 
                        @click="delete additional_delivery[index]"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
                @click="additional_delivery[Object.entries(additional_delivery).length] = { title: null, type: null, price: null }"
            >
                Add
            </button>
        </div>

        <span class="text-2xl font-medium leading-none m-10 ">Store Collection</span>
        <div class="box px-5 lg:p-10 2xl:p-10 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50">
            <div v-for="(value, index) in branch" class="col-span-12" :key="index">
                <div class="grid grid-cols-12 gap-3">
                    <label class="col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Store</label>
                    <input 
                        class="form-control-rounded col-span-12 lg:col-span-6 2xl:col-span-4 text-base"
                        type="text"
                        v-model="branch[index].name" 
                    />
                    <label class="col-start-1 col-span-12 lg:col-span-3 lg:col-start-1 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Address</label>
                    <input 
                        class="form-control-rounded col-span-12 lg:col-span-8 2xl:col-span-8 text-base"
                        type="text" 
                        v-model="branch[index].address"
                    />
                    <button 
                        class="btn btn-danger w-24 inline-block text-base ml-5 col-start-1" 
                        @click="delete branch[index]"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mt-3 mb-5"
                @click="branch[Object.entries(branch).length] = { name: null, address: null }"
            >
                Add
            </button>

            <label class="form-label col-start-1 col-span-12 text-xl">Delivery
                Note</label>
            <textarea class="form-control col-start-1 col-span-10 h-32 p-3" placeholder="Address" v-model="deliverySettings.delivery_note">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore
            </textarea>

            <button 
                class="btn btn-elevated-rounded-success text-base w-48 col-start-5 mt-5"
                @click="updateDelivery"
            >
                Update
            </button>
            
        </div>        
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { update_delivery_setting, list_delivery_setting } from '@/api_v2/campaign';

const additional_delivery = reactive({})
const branch = reactive({})
const deliverySettings = ref({
    delivery_charge : 0,
    is_free_delivery_for_order_above_price : true,
    free_delivery_for_order_above_price : 0,
    is_free_delivery_for_how_many_order_minimum : true,
    free_delivery_for_how_many_order_minimum : 0,
    is_additional_delivery_charge : true,
    additional_delivery_charge_title : [],
    additional_delivery_charge_type : [],
    additional_delivery_charge_price : [],
    pickup_start_date : '',
    pickup_end_date : '',
    branch_name : [],
    branch_address : [],
    delivery_note : ''
})


onMounted(() => {
    list_delivery_setting().then(
        response => {
            // check if meta_logistic is empty
            if (response.data && Object.keys(response.data).length === 0 && Object.getPrototypeOf(response.data) === Object.prototype) {
                return
            } else {
                for (let [key, value] of Object.entries(response.data)) {
                    if (key === 'is_free_delivery_for_order_above_price' || key === 'is_free_delivery_for_how_many_order_minimum' || key === 'is_additional_delivery_charge') {
                        if (response.data.key === 1) deliverySettings.value[key] = true
                        else if (response.data.key === 0) deliverySettings.value[key] = false
                    } else {
                        deliverySettings.value[key] = value
                    }
                }

                if (deliverySettings.value.additional_delivery_charge_title.length > 0) {
                    for (let i = 0; i < deliverySettings.value.additional_delivery_charge_title.length; i ++) {
                        let obj = {
                            'title': deliverySettings.value.additional_delivery_charge_title[i],
                            'type': deliverySettings.value.additional_delivery_charge_type[i],
                            'price': deliverySettings.value.additional_delivery_charge_price[i]
                        }
                        additional_delivery[i] = obj
                    }
                }
                
                if (deliverySettings.value.branch_name.length > 0) {
                    for (let i = 0; i < deliverySettings.value.branch_name.length; i ++) {
                        let obj = {
                            'name': deliverySettings.value.branch_name[i],
                            'address': deliverySettings.value.branch_address[i]
                        }
                        branch[i] = obj
                    }
                }
            }
        }
    )
})


const updateDelivery = () => {
    for (let key in additional_delivery) {
        for (let subkey in additional_delivery[key]) {
            if (subkey == 'title' && !deliverySettings.value.additional_delivery_charge_title.includes(additional_delivery[key][subkey])) {
                deliverySettings.value.additional_delivery_charge_title.push(additional_delivery[key]['title'])
                deliverySettings.value.additional_delivery_charge_type.push(additional_delivery[key]['type'])
                deliverySettings.value.additional_delivery_charge_price.push(additional_delivery[key]['price'])
            }
        }
    }

    for (let key in branch) {
        for (let subkey in branch[key]) {
            if (subkey == 'name' && !deliverySettings.value.branch_name.includes(branch[key][subkey])) {
                deliverySettings.value.branch_name.push(branch[key]['name'])
                deliverySettings.value.branch_address.push(branch[key]['address'])
            } 
        }
    }

    update_delivery_setting(deliverySettings).then(
        response => {
            console.log(response)
        }
    )
}

</script>