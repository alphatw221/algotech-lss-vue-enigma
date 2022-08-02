<template>
    <Modal :show="campaignDetailStore.showEditCampaignProductModal" @hidden="hideModal()">
        <ModalHeader>
            <h2 class="font-medium text-base m-auto ">
                {{$t('edit_campaign_product.edit_product_modal.edit_campaign_product')}}
            </h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-3">
            <template v-for="(column, index) in tableColumns" :key="index">
                <div class="col-span-12">
                    <label for="modal-form-1" class="">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    
                    <template v-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
                        <input 
                            class="form-check-input w-[1.2rem] h-[1.2rem] ml-5"
                            type="checkbox" 
                            v-model="campaignProduct[column.key]" 
                        />
                    </template>

                    <template v-else-if="column.key === 'type'">

                        <select class="form-select" v-model="campaignProduct[column.key]" disabled>
                            <option v-for="(type, index) in typeSelection" :key="index" :value="type.value">
                                {{$t(`edit_campaign_product.edit_product_modal.types.${type.value}`)}}
                            </option>
                        </select> 
                    </template> 

                     <template  v-else-if="column.key === 'price'">
                        <input type="text" class="form-control" v-model="campaignProduct[column.key]" disabled/>
                    </template>

                    <template  v-else-if="column.key === 'order_code'">
                        <input type="text" class="form-control" v-model="campaignProduct[column.key]" disabled/>
                    </template>

                    <template v-else>
                        <input type="text" class="form-control" v-model="campaignProduct[column.key]" />
                        <template v-if="v[column.key]">
                            <label class="text-danger text-[12px] block" 
                                v-for="error,index in v[column.key].$errors"
                                :key="index"
                                >
                                {{ $t(`edit_campaign_product.edit_product_modal.errors.${error.$validator}`) }}
                            </label>
                        </template>
                    </template>
                </div>
            </template>
        </ModalBody>
        <ModalFooter>
            <button 
                class="btn btn-outline-secondary w-20 mr-1"
                type="button" 
                @click="hideModal()" > 
                {{$t(`edit_campaign_product.edit_product_modal.cancel`)}}
            </button>
            <button 
                class="btn btn-primary w-20"
                type="button" 
                @click="updateProduct()">
                {{$t(`edit_campaign_product.edit_product_modal.update`)}}
            </button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from 'vue';
import { seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue, maxValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"


const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore()
const route = useRoute()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const campaignProduct = ref({
    order_code:"",
    qty_for_sale:null,
    max_order_amount:null,
    price:null,
    type:null,

})



const campaignProductRules = computed(() => {
	return { 	
        order_code:{required},
        qty_for_sale:{required , integer, minValue:minValue(1)},
        max_order_amount:{integer, minValue:minValue(0), maxValue:maxValue(campaignProduct.value.qty_for_sale)},
        // price:{required, decimal, minValue:minValue(0) },
    }
})

const v = useVuelidate(campaignProductRules, campaignProduct);




const tableColumns = [
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Campaign", key: "qty_for_sale" },
    { name: "Max Qty / Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
    { name: "Type", key: "type" },
    { name: "Editable", key: "customer_editable" },
    { name: "Deletable", key: "customer_removable" },
]

const typeSelection = [
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
]

const payloadBuffer = ref({})
onMounted(() => {
    eventBus.on('editCampaignProduct', (payload) => {
        console.log(payload)
        payloadBuffer.value = payload
        campaignProduct.value = payload.campaignProduct
    })
})







onUnmounted(() => {
    eventBus.off('editCampaignProduct')
})

const updateProduct = () => {

    v.value.$touch()
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.invalid_data'))
        return
    }

    seller_update_campaign_product(campaignProduct.value.id, campaignProduct.value)
    .then(res => {
        console.log(res.data)
        campaignDetailStore.campaignProducts[payloadBuffer.value.index] = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
        hideModal()
    })
}

const hideModal = ()=>{
    campaignProduct.value = {}
    payloadBuffer.value = {}
    campaignDetailStore.showEditCampaignProductModal = false
}
</script>