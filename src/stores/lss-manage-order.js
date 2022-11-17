import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        carts: ref([]),
		cartsDict: ref({}),
		all_orders: ref([]),
		review_orders: ref([]),
		complete_orders: ref([]),

		data_count:ref({
			all:0,
			carts:0,
			review_orders:0,
			proceed_orders:0,
			complete_orders:0
		}),
		
		campaign:ref({}),
		showCartProductModal:ref(false),
		showOrderProductModal:ref(false),
		filterModal:ref({'All':false,'Review':false,'Proceed':false,'Complete':false}),
		filterTagArray:ref({
			'payment':{
				'Direct Payment':false,
				'stripe':false,
				'hitpay':false,
				'paypal':false
			},
			'delivery':{
				'shipping out':false,
				'to be shipping':false,
			},
			'platform':{
				'facebook':false,
				'youtube':false,
				'instagram':false
			}
		}),
		orderProductData:ref({})
		,order:ref({})
	}),
});
	