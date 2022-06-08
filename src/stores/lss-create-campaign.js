import { defineStore } from "pinia";
import { ref } from "vue"
export const useCampaignProductsStore = defineStore("sellerCampaignProducts", {
	state: () => ({
		campaignPeriod: ref({}),
		campaignTitle: ref(''),
        assignedProducts: ref([])
	}),
});
