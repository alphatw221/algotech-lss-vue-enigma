import { defineStore } from "pinia";
import { ref } from "vue"

export const useCreateCampaignStore = defineStore("sellerCreateCampaign", {
	state: () => ({
		campaignTitle: ref(''),
		campaignPeriod: ref({}),
		assignedProducts: ref([]),
	}),
});
