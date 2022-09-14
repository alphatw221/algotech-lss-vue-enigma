<template>
	<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
		<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ $t('stock.stock') }}</h2>
	</div>
	<div class="flex flex-col p-2 sm:gap-5 box sm:px-8 h-fit lg:mx-20">
		<div class="flex flex-wrap justify-between gap-3 mx-0 mt-5"> 
			<div v-if="!store.plugins"
				class="switch-toggle">
				<input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
				<label for="on">{{ $t('stock.for_sale') }}</label>
				<input id="off" name="state-d" type="radio" @click="toggleTabs(2)" />
				<label for="off">{{ $t('stock.delisted') }}</label>
			</div>
			<div class="flex ml-auto">
				<EasyStoreExportProductButton />
				<OrdrStartrExportProductButton />
				<ShopifyExportProductButton />
				<button 
					v-if="!store.plugins"
					type="button"
					class="h-[35px] w-[35px] sm:w-40 mr-2 sm:mr-0 sm:h-[42px] text-white font-medium shadow-lg btn btn-warning rounded-full mb-5 border-[2px] border-slate-100" 
					@click="router.push({name: 'add-product'})"
					>
					<template class="hidden sm:block"><span class="mr-1 text-lg font-bold">+</span> {{ $t('stock.add_product') }} </template>
					<template class="block sm:hidden"> <PlusIcon class="w-8 h-8" /> </template>
				</button>
			</div>
			
		</div>
		<!-- BEGIN For Sale Tab -->
		<div class="flex flex-col gap-3 leading-relaxed"
			:class="{ hidden: openTab !== 1, block: openTab === 1 }"> 
			<SearchBar
				v-if="!store.plugins"
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
		<div class="flex flex-col gap-3 leading-relaxed sm:gap-5"
			:class="{ hidden: openTab !== 2, block: openTab === 2 }"> 
			<SearchBar
			v-if="!store.userInfo.user_subscription.user_plan?.plugins"
				:searchColumns="searchColumns"
				:productCategories="productCategories"
				:eventBusName="'searchDelistedTable'"
				:showCategoryFilter="true"
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
import { ref, onMounted, getCurrentInstance } from 'vue'
import { createAxiosWithBearer } from "@/libs/axiosClient";
import SearchBar from "./SearchBar.vue";
import DataTable from "./DataTable.vue";
import { useRoute, useRouter } from "vue-router"
import { list_product_category } from '@/api_v2/product';
import EasyStoreExportProductButton from '@/plugin/easy-store/views/ExportProductButton.vue'
import OrdrStartrExportProductButton from '@/plugin/ordr-startr/views/ExportProductButton.vue'
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import ShopifyExportProductButton from '@/plugin/shopify/views/ExportProductButton.vue'

const openTab = ref(1)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const route = useRoute()
const router = useRouter()
const store = useLSSSellerLayoutStore();


const searchColumns = ref([
	{ text: "name", value: "name" },
	// { text: "order_code", value: "order_code" },
	{ text: "description", value: "description" }
])

const tableColumns = ref([
    { name: "image", key: "image" },
	{ name: "name", key: "name" },
	// { name: "order_code", key: "order_code" },
	// { name: "type", key: "type" },
	{ name: "category", key: "category" },
	{ name: "description", key: "description" },
	{ name: "qty", key: "qty" },
	{ name: "price", key: "price" },
	{ name: "", key: "edit" },
])

const productCategories= ref([{text:"All", value:''}])
	
const toggleTabs = (tabNumber) =>{
	openTab.value = tabNumber
	eventBus.emit('toggleTab')
}

onMounted(() => {
	console.log(store.userInfo.user_subscription.user_plan.plugins)
	list_product_category().then(
		response => { 
			response.data.forEach(category => {
				productCategories.value.push({text: category, value: category})
			});
		}
	)
})
</script>
