import { defineStore } from "pinia";
import { ref, reactive } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
	state: () => ({

		openTab: ref(1),
		order: ref({
			subtotal:0,
			adjust_title:'',
			adjust_price:0,
			shipping_cost:0,
			total:0
		}),
		orderDetail: ref({}),
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
			shipping_option_index:null,
			shipping_method: "delivery",
		})
		

	}),
});
