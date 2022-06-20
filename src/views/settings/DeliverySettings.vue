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
                        @click="modifyDelivery('delete', index)"
                    >
                    <!-- delete additional_delivery[index] -->
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
                @click="modifyDelivery('add', index)"
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
                        @click="modifyBranch('delete', index)"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mt-3 mb-5"
                @click="modifyBranch('add', index)"
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
import { update_delivery_setting, list_delivery_setting } from '@/api_v2/campaign';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const layoutStore = useLSSSellerLayoutStore();
const additional_delivery = ref([])
const branch = ref([])
const deliverySettings = ref({
    delivery_charge : 0,
    is_free_delivery_for_order_above_price : true,
    free_delivery_for_order_above_price : 0,
    is_free_delivery_for_how_many_order_minimum : true,
    free_delivery_for_how_many_order_minimum : 0,
    is_additional_delivery_charge : true,
    additional_delivery_option: [],
    pickup_start_date : '',
    pickup_end_date : '',
    pickup_option: [],
    delivery_note : ''
})
const upsertButtonName = ref('Update')

onMounted(() => {
    list()
})

const list = () => {
    list_delivery_setting().then(
        response => {
            if (response.data && Object.keys(response.data).length === 0 && Object.getPrototypeOf(response.data) === Object.prototype) {
                upsertButtonName.value = 'Save'
                return
            } else {
                deliverySettings.value = response.data
                if (response.data.additional_delivery_option.length > 0) additional_delivery.value = response.data.additional_delivery_option
                if (response.data.pickup_option.length > 0) branch.value = response.data.pickup_option
            }
        }
    )    
}

const modifyDelivery = (type, index) => {
    if (type == 'add') {
        if (Object.entries(additional_delivery.value).length > 0) {
            additional_delivery.value[parseInt(Object.keys(additional_delivery.value).at(-1)) + 1] = { title: null, type: null, price: null }
        } else {
            additional_delivery.value[Object.entries(additional_delivery.value).length] = { title: null, type: null, price: null }
        }
    } else if (type == 'delete') {
        additional_delivery.value = additional_delivery.value.filter(value => value != additional_delivery.value[index])
    }
}

const modifyBranch = (type, index) => {
    console.log(type)
    if (type == 'add') {
        if (Object.entries(branch.value).length > 0) {
            branch.value[parseInt(Object.keys(branch.value).at(-1)) + 1] = { name: null, address: null }
        } else {
            branch.value[Object.entries(branch.value).length] = { name: null, address: null }
        }
    } else if (type == 'delete') {
        branch.value = branch.value.filter(value => value != branch.value[index])
    }
}

const updateDelivery = () => {
    deliverySettings.value.additional_delivery_option = additional_delivery.value
    deliverySettings.value.pickup_option = branch.value

    update_delivery_setting(deliverySettings).then(response => {
        layoutStore.notification.showMessageToast("Update Success")
    })
}

const discardDelivery = () => {
    list()
}

</script>