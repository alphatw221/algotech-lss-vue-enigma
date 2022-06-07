import { defineStore } from "pinia";
import { ref } from "vue"
export const useCampaignProductsStore = defineStore("sellerCampaignProducts", {
	state: () => ({
        campaign_products: ref({
            product_select:"",
            product_image:"",
            product_name:"",
            product_order_code:"",
            product_qty_camp:"",
            product_qty_order:"",
            product_category:"",
            product_price:"",
            product_editable:"",
            product_deletable:"",
            product_type:""}),
	}),
});
