import { defineStore } from "pinia";
import { ref } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
	state: () => ({
		// preOrder:ref({}),
		openTab: ref(1),
		order: ref({}),
		orderDetail: ref({}),
		order_type:ref('pre_order'),
		// orderSummary:ref({}),
		contact_info: ref({
			shipping_first_name: "",
			shipping_last_name: "",
			shipping_email: "",
			shipping_phone: "",
		}),
		shipping_info: ref({
			method: "delivery",
			shipping_option: "",
			shipping_remark: "",
			delivery_info: {
				shipping_address_1: "",
				shipping_location: "",
				shipping_region: "",
				shipping_postcode: "",  
			},
			pickup_info: {
			},
		}),      
	}),
});
