<template>
    <Modal size="modal-xl" class="text-center" :slideOver="true" :show="store.showAddProductFromStockModal"
        @hidden="store.showAddProductFromStockModal = false">
        <a @click="store.showAddProductFromStockModal = false" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center text-base p-5">
            <h2 class="font-medium w-full">
                Add Product From Stock
            </h2>
        </ModalHeader>
        <ModalBody>
            <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <div class="flex flex-col sm:items-end xl:items-start">
                    <form id="tabulator-html-filter-form" class="mr-auto">
                        <label class="w-14 flex-none mr-2">Category</label>
                        <select 
                            id="tabulator-html-filter-field"
                            class="form-select w-32"
                            v-model="selectedCategory"
                            @change="search"
                        >
                            <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                        </select>
                    </form>
                </div>
                <!-- <EditableDataTable
                    class="overflow-x-auto"
                >
                </EditableDataTable> -->
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { list_product_category } from '@/api_v2/product';
import EditableDataTable from "../table/EditableDataTable.vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const store = useCampaignDetailStore(); 


const selectedCategory = ref('')
const productCategories= ref([{text:"All", value:''}])

onMounted(() => {
    console.log('modal mounted')
	list_product_category().then(
		response => { 
			response.data.forEach(category => {
				productCategories.value.push({text:category,value:category})
			});

		}
	)
})

const search = () => {
    console.log(selectedCategory.value)
    eventBus.emit("searchTable", {filterColumn: selectedCategory.value})
}

</script>
