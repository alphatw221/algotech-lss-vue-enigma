<template>
	<div class="h-full gap-5 mt-5 flex flex-col p-0">
		<span class="z-0 text-xl sm:text-2xl mx-auto sm:mx-0 font-medium leading-none">{{$t('edit_campaign_product.edit_campaign_product')}}</span>
		<div class="z-0 intro-y" >

			<div class="p-5 sm:p-5 box intro-y flex items-center justify-between">
				<SearchBar class="-mb-1" :eventBussName="'searchCampaignProduct'"/>
				<button 
					class="-mb-1 mt-auto w-fit sm:w-32 ml-auto shadow-md btn btn-primary h-[35px] sm:h-[42px]" 
					@click="showAddProductFromStockModal()"
				>
					{{$t('edit_campaign_product.add_product')}}
				</button>
			</div>

			<CampaignProductTable :eventBussName="'searchCampaignProduct'"/>
			<div class="z-10 flex justify-end box py-5">
				<button class="z-10 w-32 shadow-md btn btn-primary mr-5 -mt-3 h-[35px] sm:h-[42px]" @click="routeToCampaignLive()">
					{{$t('edit_campaign_product.continue')}}
				</button>
			</div>
		</div>
	</div>
	<AddProductFromStockModal/>
	<EditCampaignProductModal/>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchBar from "./SearchBar.vue";
import CampaignProductTable from "./CampaignProductTable.vue"

import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal_2.vue';
import EditCampaignProductModal from './EditCampaignProductModal.vue'
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
const route = useRoute();
const router = useRouter();

const campaignDetailStore = useCampaignDetailStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;


const routeToCampaignLive=()=>{
	router.push({ name: 'campaign-list'});
}

const showAddProductFromStockModal =()=>{
	campaignDetailStore.showAddProductFromStockModal = true
}
</script>