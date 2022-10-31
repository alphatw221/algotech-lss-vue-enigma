import { defineStore } from "pinia";
import { ref } from "vue"

export const useCampaignDetailStore = defineStore("CampaignDetail", {
	state: () => ({

		campaignProductCampaignID:ref(null),//indecate campaign_id of campaign_products
		campaignProducts:ref([]),
		campaignProductDict:ref({}),

		campaignStatisticsCampaignID:ref(null),
		campaignStatistics:ref({
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

		showInstantlyAddProductModal:ref(false),
		showAddProductFromStockModal:ref(false),
		showEditCampaignProductModal:ref(false),
		
		incomingOrders:ref([]),
		incomingOrdersDict:ref({}),
		campaign:ref({})

	}),
});
