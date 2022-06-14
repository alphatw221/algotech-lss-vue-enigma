import { defineStore } from "pinia";
import { ref, reactive } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
	state: () => ({
		// preOrder:ref({}),
		openTab: ref(1),
		order: ref({}),
		orderDetail: ref({}),
		// orderSummary:ref({}),
		contact_info: ref({
			shipping_first_name: "",
			shipping_last_name: "",
			shipping_email: "",
			shipping_phone: "",
		}),
		// shipping_info: ref({
		// 	method: "delivery",
		// 	shipping_option: "",
		// 	shipping_remark: "",
		// 	delivery_info: {
		// 		shipping_address_1: "",
		// 		shipping_location: "",
		// 		shipping_region: "",
		// 		shipping_postcode: "",  
		// 	},
		// 	pickup_info: {
		// 	},
		// }),     
		campaignProducts:ref([]),
		cartProducts:ref([]) ,


		shipping_info: reactive({
			
			shipping_option:"",
			
			shipping_method: "pickup",
			shipping_first_name: "",
			shipping_last_name: "",
			shipping_email: "",
			shipping_phone: "",
			shipping_gender: "",
			shipping_company: "",
			shipping_postcode: "",
			shipping_region: "",
			shipping_location: "",
			shipping_address_1: "",
			shipping_address_2: "",
			shipping_status: "",
			shipping_details: "",
			shipping_remark: "",
			shipping_date: null,
			shipping_time: null
		})
	}),
});
