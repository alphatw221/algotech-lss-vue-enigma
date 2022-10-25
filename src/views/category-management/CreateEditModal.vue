<template>
    <Modal :show="categoryManagementStore.showCreateEditModal" @hidden="hideModal()" backdrop="static">
            <ModalBody class="p-10 text-center">
                <div class="mt-1">

                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;" v-if="props.modalType==='create'">{{ $t(`stock.category_manage.create`) }}</label>
                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;" v-else-if="props.modalType==='edit'">{{ $t(`stock.category_manage.edit`) }}</label>


                    <input id="regular-form-2" type="text"
                        class="mt-3 form-control" placeholder="Category Name" 
                        v-model="productCategory.name" />

                    <!-- <input id="regular-form-2" type="text" class="mt-3 form-control"
                        :placeholder="$t('stock.category_manage.input_holder')" v-model="categoryName" />
                    <div class="text-danger whitespace-nowrap " v-if="duplicateName">{{ $t('stock.category_manage.modal.warning_duplicate') }}</div> -->
                </div>
                <div class="flex justify-between">
                    <button class="w-32 btn dark:border-darkmode-400 mt-7" @click="hideModal()">{{ $t('stock.category_manage.modal.cancel') }}</button>

                    <button v-if="props.modalType==='create'" class="w-32 shadow-md btn btn-primary mt-7" @click="createProductCategory()">{{ $t('stock.category_manage.modal.save') }}</button>
                    <button v-if="props.modalType==='edit'" class="w-32 shadow-md btn btn-primary mt-7" @click="updateProductCategory()">{{ $t('stock.category_manage.modal.save') }}</button>
                </div>
            </ModalBody>
        </Modal>
</template>
<script setup>
import {create_product_category, update_product_category} from '@/api_v2/product_category'
import { onMounted, ref, computed, onUnmounted, defineProps, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSCategoryManagementStore } from "@/stores/lss-category-management"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const categoryManagementStore = useLSSCategoryManagementStore()
const productCategory = ref({
    name:"",
    description:"",
    meta_logistic:{},
    meta:{},
})
const payloadBuffer = ref({})

const props = defineProps({
  modalType: String,
});

onMounted(() => {
    eventBus.on('editProductCategory', (payload) => {
        payloadBuffer.value = JSON.parse(JSON.stringify(payload))
        productCategory.value = payloadBuffer.value.product_category
    })
})

onUnmounted(() => {
    eventBus.off('editCampaignProduct')
})

const createProductCategory = ()=>{
    create_product_category(productCategory.value, layoutStore.alert).then(res=>{
            layoutStore.userInfo.user_subscription.product_categories.unshift(res.data)
            layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
            hideModal()
        })
}

const updateProductCategory = () => {

    update_product_category(productCategory.value.id, productCategory.value, layoutStore.alert)
        .then(res => {
            // console.log(res.data)
            layoutStore.userInfo.user_subscription.product_categories[payloadBuffer.value.index] = res.data
            layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
            hideModal()
        })
    
}


const hideModal = ()=>{
    productCategory.value = {}
    payloadBuffer.value = {}
    categoryManagementStore.showCreateEditModal = false
}




</script>