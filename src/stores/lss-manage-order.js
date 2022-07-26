import { defineStore } from "pinia";
import { ref } from "vue"
export const useManageOrderStore = defineStore("sellerManageOrder", {
	state: () => ({
		order_type:ref('pre_order'),        
        All: ref({}),
		Review: ref({}),
		Complete: ref({}),
		data_count:ref([]),
		manageOrderStatus:ref({
			'campaign_sales_raise': 0,
			'cart_qty': 0,
			'close_rate': 0,
			'close_rate_raise': 0,
			'comment_count': 0,
			'comment_count_raise': 0,
			'complete_sales': 0,
			'order_qty': 0,
			'uncheckout_rate': 0,
			'uncheckout_rate_raise':0,
		}),
		orderProductModal:ref(false),
		filterModal:ref({'All':false,'Review':false,'Complete':false}),
		filterTagArray:ref({
			'payment':{
				'Direct Payment':false,
				'stripe':false,
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
	}),
});
	