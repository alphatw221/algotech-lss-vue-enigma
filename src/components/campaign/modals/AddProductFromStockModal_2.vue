<template>
    <Modal size="modal-2xl" class="text-center" backdrop="static" :slideOver="true" :show="campaignDetailStore.showAddProductFromStockModal"
        @hidden="hideModal()" @show="showAssignProductView()"> 
        <a @click="hideModal()" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <!-- <ModalHeader class="text-center text-base p-5">
            <div></div>
        </ModalHeader> -->
        <ModalBody>
            <AssignCampaignProductView :templateInModal="true" />
        </ModalBody>
    </Modal>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance, defineProps } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import AssignCampaignProductView from "@/views/assign-campaign-product/Main.vue"

import i18n from "@/locales/i18n"

const campaignDetailStore = useCampaignDetailStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const showAssignProductView = ()=>{eventBus.emit('show_assign_product_view')}

const hideAssignProductView = ()=>{eventBus.emit('hide_assign_product_view')}

const hideModal=()=>{
    hideAssignProductView()
    campaignDetailStore.showAddProductFromStockModal = false
}

</script>
