<template>
	<div class="mt-3">
		<div class="grid grid-cols-12 gap-4">
			<div class="col-start-1 ml-5">
				<div class="switch-toggle switch-3 switch-candy col-start-1 m-2 align-middle">
					<input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
					<label for="on" style="width: 100px; font-size:14px;" class="align-middle">For Sale</label>
					<input id="off" name="state-d" type="radio" @click="toggleTabs(2)" />
					<label for="off" style="width: 100px; font-size:14px;" class="align-middle">Delisted</label>
				</div>
			</div>
			<div class="col-start-1 w-full lg:col-start-10 lg:ml-5 2xl:col-start-10 2xl:ml-5">
				<button id="tabulator-html-filter-go" 
					type="button" 
					class="btn btn-primary shadow-md w-48 lg:w-36 2xl:w-48" 
					@click="this.$router.push({ path: '/seller/category/management'})">
					Category Management
				</button>
			</div>
			<div class="p-1 col-span-12 lg:p-5 2xl:p-5">
				<div class="mt-0 lg:mt-5 2xl:mt-5">
					<!-- BEGIN For Sale Tab -->
					<div class="leading-relaxed "
						:class="{ hidden: openTab !== 1, block: openTab === 1 }"> 
						<div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
							<SearchBar
								:searchColumns="searchColumns"
								:productCategories="productCategories"
								:eventBusName="'searchForSaleTable'"
								:showAddProductBtn="true"
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
					</div>
					<!-- END For Sale Tab -->

					<!-- BEGIN Delisted Tab -->
					<div class="leading-relaxed"
						:class="{ hidden: openTab !== 2, block: openTab === 2 }"> 
						<div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
							<SearchBar
								:searchColumns="searchColumns"
								:eventBusName="'searchDelistedTable'"
								:showAddProductBtn="false"
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
					</div>
					<!-- END Delisted Tab -->

					<!-- <TabPanel class="leading-relaxed"> Sold. </TabPanel>
					<TabPanel class="leading-relaxed"> Delete. </TabPanel> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createAxiosWithBearer } from "@/libs/axiosClient";
import SearchBar from "./SearchBar.vue";
import DataTable from "./DataTable.vue";
import { list_product_category } from '@/api_v2/product';

const openTab = ref(1)

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
				productCategories.value.push({text:category,value:category})
			});

		}
	)
})
</script>


<style scoped>
.switch-toggle {
    overflow: visible;
    float: left;
    height: 42px;
    width: 200px;
    background: theme("colors.secondary");
    border-radius: 42px 42px;
    letter-spacing: 0.7px;
    box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.185),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
}

.dark .switch-toggle {
    box-shadow: inset -4px -4px 8px rgba(22, 22, 22, 0.596),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
    --color-secondary: theme("colors.rgb.blueGray.800");
}

.switch-toggle input {
    position: absolute;
    opacity: 0;
}

.switch-toggle input+label {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    text-align: center;
    color: rgb(56, 56, 56);
    cursor: pointer;
}

.dark .switch-toggle input+label {
    color: rgb(255, 255, 255);
}

.switch-toggle input:checked+label {
    background: theme("colors.primary");
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
    font-weight: 500;
    color: aliceblue;
}
</style> 