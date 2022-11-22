import { defineStore } from "pinia";
import { ref } from "vue"

export const useCampaignDetailStore = defineStore("CampaignDetail", {
	state: () => ({

		campaignProductCampaignID:ref(null),//indecate campaign_id of campaign_products
		campaignProducts:ref([]),
		campaignProductDict:ref({}),

		campaignStatisticsCampaignID:ref(null),
		campaignStatistics:ref({
			"cart_count":0,
            "order_complete_count":0,
            "order_proceed_count":0,
            "comment_count":0,
            "complete_sales":0,
            "proceed_sales": 0,

            "previous_cart_count":0,
            "previous_order_complete_count":0,
            "previous_order_proceed_count":0,
            "previous_comment_count":0,
            "previous_complete_sales":0,
            "previous_proceed_sales": 0,
			}),

		showInstantlyAddProductModal:ref(false),
		showAddProductFromStockModal:ref(false),
		showEditCampaignProductModal:ref(false),
		
		incomingOrders:ref([]),
		incomingOrdersDict:ref({}),
		campaign:ref({})

	}),
});
