<template>
	<div class="box p-5 flex flex-col gap-5">
		<div class="flex mt-4 mx-0 sm:mx-8 gap-5 flex-wrap justify-between"> 
			<div class="switch-toggle">
				<input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
				<label for="on"> For Sale</label>
				<input id="off" name="state-d" type="radio" @click="toggleTabs(2)" />
				<label for="off"> Delisted</label>
			</div>
			<button 
            type="button"
            class="btn btn-primary h-10 self-end" 
            @click="router.push({name: 'add-product'})"
            >
                Add Product
            </button>
		</div>
		<!-- BEGIN For Sale Tab -->
		<div class="leading-relaxed flex flex-col gap-5"
			:class="{ hidden: openTab !== 1, block: openTab === 1 }"> 
			<SearchBar
				:searchColumns="searchColumns"
				:productCategories="productCategories"
				:eventBusName="'searchForSaleTable'"
				:showCategoryFilter="true"
				
			>
			</SearchBar>	
			<DataTable
				class="overflow-x-auto"
				:requestUrl="'/api/v2/product/search'"
				:columns="tableColumns"
				:product_status="'enabled'"
				:eventBusName="'searchForSaleTable'"
			>
			</DataTable>
		</div>
		<!-- END For Sale Tab -->

		<!-- BEGIN Delisted Tab -->
		<div class="leading-relaxed flex flex-col gap-5"
			:class="{ hidden: openTab !== 2, block: openTab === 2 }"> 
			<SearchBar
				:searchColumns="searchColumns"
				:eventBusName="'searchDelistedTable'"
				:showCategoryFilter="false"
			>
			</SearchBar>	
			<DataTable
				:requestUrl="'/api/v2/product/search'"
				:columns="tableColumns"
				:product_status="'disabled'"
				:eventBusName="'searchDelistedTable'"
			>
			</DataTable>
		</div>
			<!-- END Delisted Tab -->

			<!-- <TabPanel class="leading-relaxed"> Sold. </TabPanel>
			<TabPanel class="leading-relaxed"> Delete. </TabPanel> -->
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createAxiosWithBearer } from "@/libs/axiosClient";
import SearchBar from "./SearchBar.vue";
import DataTable from "./DataTable.vue";
import { useRoute, useRouter } from "vue-router"
import { list_product_category } from '@/api_v2/product';

const openTab = ref(1)

const route = useRoute()
const router = useRouter()

const searchColumns = ref([
	{ text: "Name", value: "name" },
	{ text: "Order Code", value: "order_code" },
	{ text: "Description", value: "description" }
])

const tableColumns = ref([
    { name: "Image", key: "image" },
	{ name: "Product Name", key: "name" },
	{ name: "Order Code", key: "order_code" },
	{ name: "Type", key: "type" },
	{ name: "Category", key: "category" },
	{ name: "Description", key: "description" },
	{ name: "Quantity", key: "qty" },
	{ name: "Price", key: "price" },
])

const productCategories= ref([{text:"All", value:''}])
	
const toggleTabs = (tabNumber) =>{
	openTab.value = tabNumber
}

onMounted(() => {
	list_product_category().then(
		response => { 
			response.data.forEach(category => {
				productCategories.value.push({text: category, value: category})
			});
		}
	)
})
</script>
