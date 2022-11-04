import { defineStore } from "pinia";
import { ref } from "vue"
export const usePaymentStatusStore = defineStore("paymentMetaStore", {
  state: () => ({

	awaiting_payment: {
		name: "Awaiting Payment",
		key:"awaiting_payment",
		allow_adjust:false,
		options:[]
	},


	awaiting_confirm: {
		name: "Awaiting Confirm",
		key:"awaiting_confirm",
		allow_adjust:true,
		options:['awaiting_confirm', 'awaiting_payment', 'failed', 'paid']
	},

	failed: {
		name: "Failed",
		key:"failed",
		allow_adjust:false,
		options:[]
	},

	expired: {
		name: "Expired",
		key:"expired",
		allow_adjust:false,
		options:[]
	},

	paid: {
		name: "Paid",
		key:"paid",
		allow_adjust:false,
		options:[]
	},

	awaiting_refund: {
		name: "Awaiting Refund",
		key:"awaiting_refund",
		allow_adjust:true,
		options:['awaiting_refund', 'refunded']
	},

	refunded: {
		name: "refunded",
		allow_adjust:false,
		key:"refunded",
		options:[]
	},

    
  }),
});
