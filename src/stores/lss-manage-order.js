import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        All: ref([]),
		Cart: ref([]),
		Review: ref([]),
		Complete: ref([]),

		data_count:ref({
			All:0,
			Cart:0,
			Review:0,
			Proceed:0,
			Complete:0
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
	