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
			// {key:"delivery_note", dataType:"string", default:''},
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
