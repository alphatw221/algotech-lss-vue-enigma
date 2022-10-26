import { defineStore } from "pinia";
import { ref } from "vue"

export const useCampaignDetailStore = defineStore("CampaignDetail", {
	state: () => ({

		campaignProductCampaignID:ref(null),//indecate campaign_id of campaign_products
		campaignProducts:ref([]),
		campaignProductDict:ref({}),

		showInstantlyAddProductModal:ref(false),
		showAddProductFromStockModal:ref(false),
		showEditCampaignProductModal:ref(false),
		
		incomingOrders:ref([]),
		incomingOrdersDict:ref({}),
		campaign:ref({})

	}),
});
