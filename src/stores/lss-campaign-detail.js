import { defineStore } from "pinia";
import { ref } from "vue"

export const useCampaignDetailStore = defineStore("CampaignDetail", {
	state: () => ({
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
