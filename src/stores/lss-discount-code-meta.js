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
		
		specific_buyer_name:{
			key:"specific_buyer_name",
			name:"specific_buyer_name",
			fields:[
				{key:"names", type:"input", inputType:"text", name:"Specific Buyer Name", dataType:"string", default:''},
			]
		},

		specific_buyer_email:{
			key:"specific_buyer_email",
			name:"specific_buyer_email",
			fields:[
				{key:"emails", type:"input", inputType:"text", name:"Specific Buyer Email", dataType:"string", default:''},
			]
		},

		subtotal_over_specific_amount:{
			key:"subtotal_over_specific_amount",
			name:"subtotal_over_specific_amount",
			fields:[
				{key:"amount", type:"input", inputType:"number", name:"Order Subtotal", dataType:"number", default:9999},
			]
		},

		product_over_specific_number:{
			key:"product_over_specific_number",
			name:"product_over_specific_number",
			fields:[
				{key:"number", type:"input", inputType:"number", name:"Product Number", dataType:"number", default:0},
			]
		},

		discount_code_usable_time: {
			key: "discount_code_usable_time",
			name: "discount_code_usable_time",
			fields: [
				{key: "times", type: "input", inputType:"number", name: "Usable Times", dataType: "number", default: 9999}
			]
		},

		new_buyer_only: {
			key: "new_buyer_only",
			name: "new_buyer_only",
			fields: []
		},

		buyer_usage_times: {
			key: "buyer_usage_times",
			name: "buyer_usage_times",
			fields: [
				{key: "times", type: "input", inputType:"number", name: "Buyer Usage Times", dataType: "number", default: 1}
			]
		}
	},

    
  }),
});
