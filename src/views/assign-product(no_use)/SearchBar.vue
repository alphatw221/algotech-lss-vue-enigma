<template>
    <div class="p-5 sm:p-5 box intro-y">
        <div class="flex-col flex-wrap flex sm:flex-row content-end justify-start gap-3">
            <label class="mr-2 w-14 my-auto">
                {{ $t('assign_product.search_bar.category') }}
            </label>
            <select class="form-select sm:mr-4 h-[42px] flex-1 sm:flex-none sm:w-40"
                v-model="filterColumn" @change="search">
                <option value=''> All </option>
                <option v-for="category in categorySelection" :key="category">{{ category }}</option>
            </select>
            <button 
                class="w-32 ml-auto shadow-md btn btn-primary" 
                v-show="route.name === 'edit-campaign-product'"
                @click="store.showAddProductFromStockModal = true"
            >
                {{ $t('assign_product.search_bar.add_product') }}
            </button>
        </div>

        <AddProductFromStockModal />
        
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { list_product_category } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal.vue';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"


const layoutStore = useLSSSellerLayoutStore()
const route = useRoute();
const router = useRouter();
const store = useCampaignDetailStore()
const page = ref(1)
const pageSize = ref(10)
const searchColumn = ref('name')
const filterColumn = ref(undefined)
const categorySelection = ref([])
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

onMounted(() => {
   list_product_category(layoutStore.alert).then(response => {
        categorySelection.value = response.data
    }) 
})

const search = () => {
    eventBus.emit("addProducts")
    eventBus.emit("assignTable", { filterColumn: filterColumn.value })
}



</script>