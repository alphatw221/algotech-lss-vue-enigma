import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        manageAllOrder: ref({}),
		manageReviewOrder: ref([]),
		manageCompleteOrder: ref([]),
		orderDetail: ref({}),
		modify_price: ref({
			adjust_price:0,
			adjust_title:'',
			free_delivery:false
		}),
		modify_status: ref('+'),
		manageOrder:ref({}),
		orderProductModal:ref(false),
		filterModal:ref(false),
		filterTagArray:ref({
			'Direct Payment':false,
			'Stripe':false,
			'Shipping out':false,
			'To be shipping':false,
			'Facebook':false,
			'Youtube':false,
			'Instagram':false
		}),
		orderProductData:ref({})
	}),
});
	