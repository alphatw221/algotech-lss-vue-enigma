<template>
        <Modal size="modal-xl" class="text-center" :slideOver="true" :show="store.showAddProductFromStockModal"
        @hidden="store.showAddProductFromStockModal = false">
        <a @click="store.showAddProductFromStockModal = !store.showAddProductFromStockModal" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center p-5">
            <h2 class="font-medium text-base text-center">
                Add Product From Stock
            </h2>
        </ModalHeader>
        <ModalBody>
            <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
                    <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto sm:flex items-center">
                        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Category</label>
                        <select 
                            id="tabulator-html-filter-field"
                            class="form-select w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto"
                            v-model="selectedCategory"
                            @change="search"
                        >
                            <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                        </select>
                    </form>
                </div>
                <EditableDataTable
                    class="overflow-x-auto"
                    :requestUrl="'/api/v2/product/search'"
                    :columns="tableColumns"
                    :status="'enabled'"
                >
                </EditableDataTable>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { list_product_category } from '@/api_v2/product';
import EditableDataTable from "@/components/table/EditableDataTable.vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const store = useLSSCampaignListStore(); 
const props = defineProps({
    currentProductList: Object, 
});
const tableColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
	{ name: "QTY for Campaign", key: "qty" },
	{ name: "Max QTY/Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
	{ name: "Editable", key: "customer_editable" },
	{ name: "Deletable", key: "customer_removable" },
	{ name: "Category", key: "category" },
	{ name: "Type", key: "type" },
])
const selectedCategory = ref('')
const productCategories= ref([{text:"All", value:''}])
onMounted(() => {
	list_product_category().then(
		response => { 
			response.data.forEach(category => {
				productCategories.value.push({text:category,value:category})
			});

		}
	)
    eventBus.on("passCampaignProduct", (payload) => {
        eventBus.emit("passCampaignProduct", payload)
    });
})

onUnmounted(() => {
    eventBus.off("passCampaignProduct");
})
const search = () => {
    console.log(selectedCategory.value)
    eventBus.emit("searchTable", {filterColumn: selectedCategory.value})
}

</script>
