import { defineStore } from "pinia";
import { ref, reactive } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
	state: () => ({
		// preOrder:ref({}),
		openTab: ref(1),
		order: ref({
			subtotal:0,
			adjust_title:'',
			adjust_price:0,
			shipping_cost:0,
			total:0
		}),
		orderDetail: ref({}),
		// orderSummary:ref({}),
		contact_info: ref({
			shipping_first_name: "",
			shipping_last_name: "",
			shipping_email: "",
			shipping_phone: "",
		}),   
		campaignProducts:ref([]),
		cartProducts:ref([]) ,


		shipping_info: ref({
			shipping_option:"",
			shipping_method: "pickup",
			// shipping_first_name: "",
			// shipping_last_name: "",
			// shipping_email: "",
			// shipping_phone: "",
			// shipping_gender: "",
			// shipping_company: "",
			// shipping_postcode: "",
			// shipping_region: "",
			// shipping_location: "",
			// shipping_address_1: "",
			// shipping_address_2: "",
			// shipping_status: "",
			// shipping_details: "",
			// shipping_remark: "",
			// shipping_date: null,
			// shipping_time: null,
			// pickup_address:""
		})


	}),
});
