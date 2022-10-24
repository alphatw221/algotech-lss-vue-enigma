<template>
    <Modal :show="stockStore.showBulkEditModal" @hidden="hide()" backdrop="static">
			<ModalBody class="p-10 ">
				<div class="mt-1">
					<label for="regular-form-2" class="form-label w-full text-center font-medium" style="font-size: 1.2rem;">Bulk Edit</label>
					
					<label for="crud-form-2" class="form-label text-base mt-2 font-medium">Category</label>
					<TomSelect
						id="crud-form-2"
						multiple
						placeholder="Select categories to update..."
						v-model="categories"
					>
						<option v-for="productCategory, index in layoutStore.userInfo.user_subscription?.product_categories" :key="index" :value="productCategory.id">{{ productCategory.name }}</option>
					</TomSelect>
					
					<label class="form-label text-base mt-5 font-medium">Status</label>
					<div class="flex">
						<div class="ml-3" v-for="status in statusRadio" :key="status.key">
							<input 
								type="radio" 
								v-model="productStatus"
								:value="status.key"
								:checked="productStatus == status.key"
								style="color:black;"
							/>
							<label class="form-check-label text-base" >
								{{ $t(`stock.${status.text}`) }}
							</label>
						</div>
					</div>

				</div>
				<div class="flex justify-between">
					<button class="w-32 shadow-md btn btn-secondary mt-7" @click="hide()">Cancel</button>
					<button class="w-32 shadow-md btn btn-primary mt-7" @click="bulkUpdateStock()">Save</button>
				</div>
			</ModalBody>
		</Modal>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

import { ref, onMounted, onUnmounted, defineProps, getCurrentInstance, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n";
import { bulk_update_product } from "@/api_v2/product"
import { useSellerStockStore } from "@/stores/lss-seller-stock"

const stockStore = useSellerStockStore();
const route = useRoute()
const router = useRouter()

// const props = defineProps({
// 	productStatus: String,
// })


const statusRadio = ref([
	{text: 'for_sale', key: 'enabled'},
	{text: 'delisted', key: 'disabled'},
])

const categories = ref([])
const productStatus = ref('enabled')



const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const layoutStore = useLSSSellerLayoutStore()

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;



const hide = () => {
    stockStore.showBulkEditModal = false
    categories.value = []
    productStatus.value = 'enabled'
}

const bulkUpdateStock = () => {
	bulk_update_product(
        {'categories':categories.value, 'status':productStatus.value, 'stock_id_list':stockStore.selectedProductIDList}, layoutStore.alert)
        .then(res => {
            stockStore.selectedProductIDList = []
            eventBus.emit('refreshStockTable')
            hide()
	})
}


</script>