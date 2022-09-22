import { defineStore } from "pinia";
import { ref } from "vue"

export const useCreateCampaignStore = defineStore("sellerCampaignProducts", {
	state: () => ({
		campaign:{
			title:'',
			start:new Date(),
			end:new Date(),
			meta_delivery:{
				delivery_charge : 0,
				is_free_delivery_for_order_above_price : true,
				free_delivery_for_order_above_price : 0,
				is_free_delivery_for_how_many_order_minimum : true,
				free_delivery_for_how_many_order_minimum : 0,
				is_additional_delivery_charge : true,
				additional_delivery_option: [],
				pickup_start_date : '',
				pickup_end_date : '',
				pickup_options: [],
				delivery_note : ''
			},
			meta_payment:{}
		}
		,
		campaignPeriod: ref({
			start: new Date(),
			end: new Date(),
		}),
		campaignTitle: ref({ title: '' }),
        assignedProducts: ref([]),
		deliverySettings: ref({
			delivery_charge : 0,
			is_free_delivery_for_order_above_price : true,
			free_delivery_for_order_above_price : 0,
			is_free_delivery_for_how_many_order_minimum : true,
			free_delivery_for_how_many_order_minimum : 0,
			is_additional_delivery_charge : true,
			additional_delivery_option: [],
			pickup_start_date : '',
			pickup_end_date : '',
			pickup_options: [],
			delivery_note : ''
		}),
		paymentSettings: ref({
			'direct_payment': {
				enabled: true,
				button_title: 'Direct Payment',
				accounts: []
			},
			'stripe': {
				enabled: true,
				secret: '',
				currency: ''
			},
			'first_data': {
				enabled: true
			},
			confirmation_note: '',
			special_note: ''
		}),
		imageDirectPayment: ref({}),
		notes: ref({
			delivery_note: '',
			special_note: '',
			confirmation_note: ''
		})
	}),
});
