<template>
    <Modal backdrop="static" :show="editCampaignProduct" @hidden="editCampaignProduct = false">
        <ModalHeader>
            <h2 class="font-medium text-base m-auto ">
                {{ $t('assign_product.modal.edit_title') }}
            </h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <template v-for="(column, index) in tableColumns" :key="index">
                <div class="col-span-12">
                    <label for="modal-form-1" class="form-label">{{ $t(`assign_product.table_column.${column.key}`)  }}</label>
                    
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
                                {{ type.name }}
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
                @click="editCampaignProduct = false; eventBus.emit('search');" 
            > {{ $t('assign_product.modal.cancel') }} </button>
            <button 
                class="btn btn-primary w-20"
                type="button" 
                @click="updateProduct(campaignProduct['id'])"
            > {{ $t('assign_product.modal.update') }} </button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';


const route = useRoute()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const editCampaignProduct = ref(false)
const campaignProduct = ref({})
const tableColumns = ref([
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Campaign", key: "qty" },
    { name: "Max Qty / Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
    { name: "Type", key: "type" },
    { name: "Editable", key: "customer_editable" },
    { name: "Deletable", key: "customer_removable" },
])
const typeSelection = ref([
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
])


onMounted(() => {
    eventBus.on('editCampaignProduct', (payload) => {
        editCampaignProduct.value = payload.editCampaignProduct
        campaignProduct.value = payload.product
    })
})

onUnmounted(() => {
    eventBus.off('editCampaignProduct')
})

const updateProduct = (id) => {
    seller_update_campaign_product(route.params.campaign_id, id, campaignProduct.value)
    .then(response => {
        console.log(response.data)
        editCampaignProduct.value = false;
        eventBus.emit('search')
    })
}

</script>