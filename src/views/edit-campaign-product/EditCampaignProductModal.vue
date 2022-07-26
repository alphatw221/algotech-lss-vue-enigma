<template>
    <Modal :show="campaignDetailStore.showEditCampaignProductModal" @hidden="hideModal()">
        <ModalHeader>
            <h2 class="font-medium text-base m-auto ">
                {{$t('edit_campaign_product.edit_product_modal.edit_campaign_product')}}
            </h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <template v-for="(column, index) in tableColumns" :key="index">
                <div class="col-span-12">
                    <label for="modal-form-1" class="form-label">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    
                    <template v-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
                        <input 
                            class="form-check-input w-[1.2rem] h-[1.2rem] ml-5"
                            type="checkbox" 
                            v-model="campaignProduct[column.key]" 
                        />
                    </template>
                    <template v-else-if="column.key === 'type'">
                        <select class="form-select" v-model="campaignProduct[column.key]">
                            <option v-for="(type, index) in typeSelection" :key="index" :value="type.value">
                                {{$t(`edit_campaign_product.edit_product_modal.types.${type.value}`)}}
                            </option>
                        </select> 
                    </template> 
                    <template v-else>
                        <input type="text" class="form-control" v-model="campaignProduct[column.key]" />
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
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore()
const route = useRoute()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const campaignProduct = ref({})

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
    seller_update_campaign_product(campaignProduct.value.id, campaignProduct.value)
    .then(res => {
        console.log(res.data)
        campaignDetailStore.campaignProducts[payloadBuffer.value.index] = res.data
        layoutStore.notification.showMessageToast("Update Successfully")
        hideModal()
    })
}

const hideModal = ()=>{
    campaignProduct.value = {}
    payloadBuffer.value = {}
    campaignDetailStore.showEditCampaignProductModal = false
}
</script>