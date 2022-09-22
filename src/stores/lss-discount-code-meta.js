import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSDiscountCodeMetaStore = defineStore("discountCodeMeta", {
  state: () => ({

	types:{
		general:{
			key:"general",
			name:"general",
			fields:[]
		},
		cart_referal:{
			key:"cart_referal",
			name:"cart_referal",
			fields:[
				// {key:"seperator", type:"select", name:"seperator", options:['-','/','_'],dataType:"string", default:'-'},
			]
		},
		
	},
	discount_types:{
		percent_off:{
			key:"percent_off",
			name:"percent_off",
			fields:[
				{key:"discount_rate", type:"input", name:"Discount Rate", dataType:"number", default:1},
			]
		},
		deduct:{
			key:"deduct",
			name:"deduct",
			fields:[
				{key:"deduct_amount", type:"input", name:"Deduct Amount", dataType:"number", default:0},
			]
		},
	},
	limitations:{
		
		specific_campaign:{
			key:"specific_campaign",
			name:"specific_campaign",
			fields:[
				{key:"campaign_id", type:"api_select", endpoint:"getCampaigns", optionName:"title", optionValue:"id", name:"campaign", dataType:"number", default:null},
			]
		},

		subtotal_over_specific_amount:{
			key:"subtotal_over_specific_amount",
			name:"subtotal_over_specific_amount",
			fields:[
				{key:"amount", type:"input", name:"Order Subtotal", dataType:"number", default:9999},
			]
		},
		product_over_specific_number:{
			key:"product_over_specific_number",
			name:"product_over_specific_number",
			fields:[
				{key:"number", type:"input", name:"Product Number", dataType:"number", default:0},
			]
		},
		discount_code_usable_time: {
			key: "discount_code_usable_time",
			name: "discount_code_usable_time",
			fields: [
				{key: "times", type: "input", name: "Usable Times", dataType: "number", default: 9999}
			]
		}
	},

    
  }),
});
