import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        manageOrder: ref({}),
		orderDetail: ref({}),
		modify_price: ref({
			adjust_price:0,
			adjust_title:'',
			free_delivery:false
		}),
		modify_status: ref('+')
	}),
});
	