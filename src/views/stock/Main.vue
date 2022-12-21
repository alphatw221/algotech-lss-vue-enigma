<template>
	<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
		<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ $t('stock.stock') }}</h2>
	</div>
	<div class="flex flex-col p-2 sm:gap-5 box sm:px-8 h-fit lg:mx-20">
		<div class="flex flex-wrap justify-between gap-3 mx-0 mt-5"> 
			<div 
				v-if="!layoutStore?.userInfo?.user_subscription?.user_plan?.hide?.stock_table_tabs"
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
				<FileUploadButton 
					v-if="layoutStore?.userInfo?.user_subscription?.user_plan?.display?.import_product_button"
					class="text-sm h-[35px] w-[40px] sm:w-40 mr-2 sm:mr-2 sm:h-[42px] text-[#ff9505] bg-[#fefce8] font-medium shadow-lg btn color-[#f59e0b] border-[#fcd34d] hover:bg-[#fef6e8] rounded-full mb-5 border-[2px] border-slate-100" 
					button_id="import_product"
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					:multiple="false"
					:uploadFunction = "importProducts"
				>
					<template class="hidden sm:block"><span class="mr-1 text-lg font-bold text-[#ff9505] inline-block align-middle"><ArrowDownIcon class="" /></span> {{ $t('stock.import_product') }}  </template>
					<template class="block sm:hidden"> <ArrowDownIcon class="w-8 h-8" /> </template>
				</FileUploadButton>

				<button 
					v-if="!layoutStore?.userInfo?.user_subscription?.user_plan?.hide?.add_product_button"
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
			v-if="openTab == 1 " > 
			<SearchBar
				:searchEventBusName="'searchForSaleTable'"
				:showCategoryFilter="true"
			>
			</SearchBar>	
			<DataTable
				class="overflow-x-auto"
				:product_status="'enabled'"
				:searchEventBusName="'searchForSaleTable'"

			>
			</DataTable>
		</div>
		<!-- END For Sale Tab -->

		<!-- BEGIN Delisted Tab -->
		<div class="flex flex-col gap-3 leading-relaxed sm:gap-5"
			v-if="openTab == 2"> 
			<SearchBar
				:searchEventBusName="'searchDelistedTable'"
				:showCategoryFilter="true"
			>
			</SearchBar>	
			<DataTable
				:product_status="'disabled'"
				:searchEventBusName="'searchDelistedTable'"

			>
			</DataTable>
		</div>
			<!-- END Delisted Tab -->
			<!-- <TabPanel class="leading-relaxed"> Sold. </TabPanel>
			<TabPanel class="leading-relaxed"> Delete. </TabPanel> -->
  </div>

  <BulkEditModal />
  <WishlistModal />
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";

import SearchBar from "./SearchBar.vue";
import DataTable from "./DataTable.vue";
import BulkEditModal from "./BulkEditModal.vue";
import { useRoute, useRouter } from "vue-router";

import EasyStoreExportProductButton from "@/plugin/easy-store/views/ExportProductButton.vue";
import OrdrStartrExportProductButton from "@/plugin/ordr-startr/views/ExportProductButton.vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useSellerStockStore } from "@/stores/lss-seller-stock";
import ShopifyExportProductButton from "@/plugin/shopify/views/ExportProductButton.vue";
import WishlistModal from "./WishlistModal.vue";
import { import_product } from "@/api_v2/product.js";
import FileUploadButton from "@/components/file-upload-button/Main.vue";

const openTab = ref(1);
const eventBus =
  getCurrentInstance().appContext.config.globalProperties.eventBus;
const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore();
const stockStore = useSellerStockStore();

onMounted(() => {
  clearStore();
  createProductCategoryDict();
});

onUnmounted(() => {
  eventBus.off("refreshStockTable");
});

const clearStore = () => {
  stockStore.productCategoryDict = {};
  stockStore.selectedProductIDList = [];
};
const createProductCategoryDict = () => {
  layoutStore.userInfo.user_subscription?.product_categories?.forEach(
    (productCategory) => {
      stockStore.productCategoryDict[productCategory.id.toString()] =
        productCategory;
    }
  );
};

const toggleTabs = (tabNumber) => {
  openTab.value = tabNumber;
  // eventBus.emit('toggleTab')
};

const importProducts = (file) => {
  let formData = new FormData();
  formData.append("file", file);
  import_product(formData, layoutStore.alert).then((res) => {
	layoutStore.userInfo = res.data
	clearStore();
  	createProductCategoryDict();
    eventBus.emit("refreshStockTable");
  });
};
</script>
