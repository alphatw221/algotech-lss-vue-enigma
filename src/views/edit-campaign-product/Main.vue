<template>
	<div class="h-full gap-5 mt-5 flex flex-col p-0">
		<span class="z-0 text-xl sm:text-2xl mx-auto sm:mx-0 font-medium leading-none">{{$t('edit_campaign_product.edit_campaign_product')}}</span>
		<div class="z-0 intro-y" >

			<div class="p-5 sm:p-5 box intro-y flex items-center justify-between">
				<SearchBar class="-mb-2" :eventBussName="'searchCampaignProduct'"/>
				


				<button 
					class="w-25 sm:w-32 ml-auto shadow-md btn btn-primary" 
					@click="showAddProductFromStockModal()"
				>
					{{$t('edit_campaign_product.add_product')}}
				</button>
			</div>

			


			<CampaignProductTable :eventBussName="'searchCampaignProduct'"/>
			<div class="z-10 flex justify-end -mt-3 box">
				<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="routeToCampaignLive()">
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

import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal.vue';
import EditCampaignProductModal from './EditCampaignProductModal.vue'
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
const route = useRoute();
const router = useRouter();

const campaignDetailStore = useCampaignDetailStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;


const routeToCampaignLive=()=>{
	router.push({ name: 'campaign-live',params:{'campaign_id':route.params.campaign_id} });
}

const showAddProductFromStockModal =()=>{
	campaignDetailStore.showAddProductFromStockModal = true
}
</script>