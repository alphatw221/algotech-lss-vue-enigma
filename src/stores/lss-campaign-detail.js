import { defineStore } from "pinia";
import { ref } from "vue"

export const useCampaignDetailStore = defineStore("CampaignDetail", {
	state: () => ({
		campaignProducts:ref([]),
		showInstantlyAddProductModal:ref(false),
		showAddProductFromStockModal:ref(false),
		showEditCampaignProductModal:ref(false),
		incomingOrders:ref([]),

		campaign:ref({})

	}),
});
