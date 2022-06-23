import { defineStore } from "pinia";
import { ref } from "vue"

export const useCreateCampaignStore = defineStore("sellerCampaignProducts", {
	state: () => ({
		campaignPeriod: ref({}),
		campaignTitle: ref(''),
        assignedProducts: ref([]),
		deliverySettings: ref({}),
		paymentSettings: ref({
			'directPayment': {
				enabled: true,
				button_title: 'Direct Payment',
				accounts: []
			},
			'stripe': {}
		}),
		imageDirectPayment: ref({}),
		notes: ref({
			delivery_note: '',
			special_note: '',
			confirmation_note: ''
		})
	}),
});
