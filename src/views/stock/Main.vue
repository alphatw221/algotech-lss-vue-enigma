<template>
	<div>
		<div class="mt-10">
			
			<TabGroup class="grid grid-cols-12 gap-4">
				<div class="col-start-1 ml-5">
					<TabList class="nav-boxed-tabs flex w-full">
						<Tab class="w-full py-2 flex-1 w-24" tag="button">For Sale</Tab>
						<Tab class="w-full py-2 flex-1 w-24" tag="button">Delisted</Tab>
						<!-- <Tab class="w-full py-2 flex-1 w-24" tag="button">Sold out</Tab>
						<Tab class="w-full py-2 flex-1 w-24" tag="button">Delete</Tab> -->
					</TabList>
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
					<div>
						<TabPanels class="mt-0 lg:mt-5 2xl:mt-5">


							<!-- BEGIN For Sale Tab -->
							<TabPanel class="leading-relaxed"> 
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
							</TabPanel>
							<!-- END For Sale Tab -->

							<!-- BEGIN Delisted Tab -->
							<TabPanel class="leading-relaxed"> 
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
							</TabPanel>
							<!-- END Delisted Tab -->

							<!-- <TabPanel class="leading-relaxed"> Sold. </TabPanel>
							<TabPanel class="leading-relaxed"> Delete. </TabPanel> -->
						</TabPanels>
					</div>
				</div>
				
			</TabGroup>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createAxiosWithBearer } from "@/libs/axiosClient";
import SearchBar from "./SearchBar.vue";
import DataTable from "./DataTable.vue";
import { list_product_category } from '@/api_v2/product';

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

