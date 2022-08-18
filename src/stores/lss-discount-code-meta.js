import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSDiscountCodeMetaStore = defineStore("discountCodeMeta", {
  state: () => ({


	types:{
		percent_off:{
			key:"percent_off",
			name:"percent_off",
			fields:[
				{key:"discount_rate", type:"text", name:"Discount Rate", dataType:"number", default:1},
			]
		},
	},
	limitations:{
		specific_campaign:{
			key:"specific_campaign",
			name:"specific_campaign",
			fields:[
				{key:"campaign_id", type:"api_select", endpoint:"getCampaigns", optionName:"title", optionValue:"id", name:"Campaign", dataType:"number", default:null},
			]
		},
		subtotal_over_specific_amount:{
			key:"subtotal_over_specific_amount",
			name:"subtotal_over_specific_amount",
			fields:[
				{key:"amount", type:"text", name:"Order Subtotal", dataType:"number", default:9999},
			]
		},
		product_over_specific_number:{
			key:"product_over_specific_number",
			name:"product_over_specific_number",
			fields:[
				{key:"number", type:"text", name:"Product Number", dataType:"number", default:0},
			]
		},
	},

    
  }),
});
