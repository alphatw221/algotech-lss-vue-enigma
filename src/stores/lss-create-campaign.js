import { defineStore } from "pinia";
import { ref } from "vue"

export const useCreateCampaignStore = defineStore("sellerCampaignProducts", {
	state: () => ({
		campaignPeriod: ref({}),
		campaignTitle: ref(''),
        assignedProducts: ref([])
	}),
});
