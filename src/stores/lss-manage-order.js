import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        All: ref({}),
		Review: ref({}),
		Complete: ref({}),
		data_count:ref([]),
		manageOrder:ref({}),
		orderProductModal:ref(false),
		filterModal:ref(false),
		filterTagArray:ref({
			'payment':{
				'Direct Payment':false,
				'Stripe':false,
			},
			'delivery':{
				'Shipping out':false,
				'To be shipping':false,
			},
			'platform':{
				'facebook':false,
				'youtube':false,
				'instagram':false
			}
		}),
		orderProductData:ref({})
	}),
});
	