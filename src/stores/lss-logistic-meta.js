import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSLogisticMetaStore = defineStore("logisticMeta", {
  state: () => ({
	own_delivery: {
		multiple:true,
		name: "Own Delivery",
		key:"own_delivery",
		icon:"https://storage.googleapis.com/lss_public_bucket/static/payment/stripe/icon.png",
		fields:[
			{key:"delivery_charge",dataType:"number", default:999999},
			{key:"is_free_delivery_for_order_above_price",dataType:"boolean", default:false},
			{key:"free_delivery_for_order_above_price",dataType:"number", default:999999},
			{key:"is_free_delivery_for_how_many_order_minimum",dataType:"boolean", default:false},
			{key:"free_delivery_for_how_many_order_minimum",dataType:"number", default:99},
			{key:"is_additional_delivery_charge",dataType:"boolean", default:true},
			{key:"additional_delivery_options", dataType:"object", default:[]},
		],
	},
	store_pickup: {
		multiple:true,
		name: "Store Pickup",
		key:"store_pickup",
		icon:"https://storage.googleapis.com/lss_public_bucket/static/payment/stripe/icon.png",
		fields:[
			{key:"pickup_options", dataType:"object", default:[]},
		],
	},
	ecpay:{
		multiple:false,
		name:"綠界",
		key:"ecpay",
		icon:"https://storage.googleapis.com/lss_public_bucket/static/payment/ecpay/icon.jpeg",
		fields:[
			{key:"merchant_id", type:"text", name:"Merchant ID", dataType:"string", default:''},
			{key:"hash_key", type:"text", name:"HashKey", dataType:"string", default:''},
			{key:"hash_iv", type:"text", name:"HashIV", dataType:"string", default:''},

			{key:"return_store_id", type:"text", name:"Store ID", dataType:"string", default:''},
			{key:"logistics_sub_type", name:"Shipping Methods", dataType:"object",   default:[], 
				options:[
					{key:"TCAT", type:"checkbox", name:"黑貓宅配", dataType:"boolean", default:false},
					{key:"FAMIC2C", type:"checkbox", name:"全家店到店", dataType:"boolean", default:false},
					{key:"UNINARTC2C", type:"checkbox", name:"7-11店到店", dataType:"boolean", default:false}
				]
			},
			{key:"sender_name", type:"text", name:"Sender Name", dataType:"string", default:''},
			{key:"sender_phone", type:"text", name:"Phone", dataType:"string", default:''},
			{key:"sender_zip_code", type:"text", name:"zipCode", dataType:"string", default:''},
			{key:"sender_address", type:"text", name:"address", dataType:"string", default:''},
		],
		// invoice:false,
		handle:{
			type:'submitForm',
			endpoint:'getEcpayCredential',
		}
	},
    SG : ['own_delivery', 'store_pickup'],
    
    ID :['own_delivery', 'store_pickup'],

    MY : ['own_delivery', 'store_pickup'],
    
    IN : ['own_delivery', 'store_pickup'],
    
    PH : ['own_delivery', 'store_pickup'],

    VN : ['own_delivery', 'store_pickup'],

    TW : ['own_delivery', 'store_pickup', 'ecpay'],

    CN : ['own_delivery', 'store_pickup'],

    KH : ['own_delivery', 'store_pickup'],

    AU : ['own_delivery', 'store_pickup'],

    HK : ['own_delivery', 'store_pickup'],

	logisticMap: {
		own_delivery: 'Own Delivery',
		store_pickup: 'Store Pickup',
		ecpay:'ECPay'
	}
    
  }),
});
