import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSPaymentMetaStore = defineStore("paymentMeta", {
  state: () => ({
	direct_payment: {
		multiple:true,
		name: "Direct Payment",
		key:"direct_payment",
		icon:"static/payment/stripe/icon.png",
		fields:[
			{key:"mode", name:"Name of Bank / Payment Mode", type:"text", dataType:"string", default:''},
			{key:"name", name:"Account Name", type:"text", dataType:"string", default:''},
			{key:"number", name:"Account Number", type:"text", dataType:"string", default:''},
			{key:"note", name:"Note", type:"textarea", dataType:"string", default:''},
			{key:"require_customer_return", name:"Require Customer’s Payment Record", type:"checkbox", dataType:"boolean", default:true},
			{key:"image", name:null, type:"file", dataType:"string", default:null}
		],
		// handle:{
		// 	type:'upload',
		// 	url:"api/v2/payment/receipt/upload/",
		// 	fields:[
		// 	{key:"order_id", type:"hidden", r:0, c:1, w:4},
		// 	{key:"receipt_image", name:"Receipt Image", type:"image", r:0, c:0, w:4},
		// 	{key:"last_five_digits", name:"Account Number", type:"text", r:0, c:2, w:4},
		// 	]
		// }
	},
	stripe: {
		multiple:false,
		name:"Stripe",
		key:"stripe",
		icon:"static/payment/stripe/icon.png",
		fields:[
			{key:"secret", type:"password", name: "Secret Key",dataType:"string", default:''},
			{key:"currency", type:"select", name: "Currency", options:[
			'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD',
			'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF',
			'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB',
			'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK',
			'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW',
			'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT',
			'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR',
			'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF',
			'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS',
			'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF',
			'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW'], dataType:"string", default:'USD'
			},
		],
		handle:{
			type:'gateway',
			endpoint:'getStripeGateway',
		}
	},
	hitpay:{
		multiple:false,
		name:"Hitpay",
		key:"hitpay",
		icon:"static/payment/hitpay/icon.png",
		fields:[
                // {key:"button_title", type:"text", name:"Button Title", dataType:"string", default:''},
                {key:"currency", type:"select", name: "Currency", options:['SGD', 'AUD', 'USD', 'NTD'], dataType:"string", default:'USD'},
                {key:"api_key", type:"text", name:"API Key", dataType:"string", default:''},
                {key:"salt", type:"text", name:"Salt", dataType:"string", default:''}
            ],
		handle:{
			type:'gateway',
			endpoint:'getHitpayGateway',
		}
	},
	// first_data : {
	// 	multiple:false,
	// 	name:"First Data IPG (Credit Card)",
	// 	key:"first_data",
	// 	fields:[
	// 		{key:"store_id", name:"Store ID", type:"text", dataType:"string", default:''},
	// 		{key:"shared_secret", name:"Shared Secret", type:"password", dataType:"string", default:''},
	// 		{key:"currency", name:"Currency", type:"select", options:['702', '703'], dataType:"string", default:'702'},
	// 		{key:"timezone", name:"Time Zone", type:"select", options:['Asia/Singapore'], dataType:"string", default:'Asia/Singapore'}
	// 	],
	// 	handle:{
	// 		type:'submitForm',
	// 		endpoint:'getFirstDataCredential',
	// 	}
	// },


    SG : ['direct_payment', 'stripe', 'hitpay'],
    
    ID :['direct_payment', 'stripe', 'hitpay'],

    MY : ['direct_payment', 'stripe', 'hitpay'],
    
    IN : ['direct_payment', 'stripe', 'hitpay'],
    
    PH : ['direct_payment', 'stripe', 'hitpay'],

    VN : ['direct_payment', 'stripe', 'hitpay'],

    TW : ['direct_payment', 'stripe', 'hitpay'],

    CN : ['direct_payment', 'stripe'],

    KH : ['direct_payment', 'stripe'],

    AU : ['direct_payment', 'stripe'],

    HK : ['direct_payment', 'stripe'],

	paymentMap: {
		direct_payment: 'Direct Payment',
		stripe: 'Stripe',
		first_data: 'First Data'
	}
    
  }),
});
