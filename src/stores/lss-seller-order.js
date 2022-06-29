import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerOrderStore = defineStore("sellerOrder", {
	state: () => ({
        modify_price: ref({
			adjust_price:0,
			adjust_title:'',
			free_delivery:false
		}),
		modify_status: ref('+'),
		orderDetail: ref({}),

    
    })
});