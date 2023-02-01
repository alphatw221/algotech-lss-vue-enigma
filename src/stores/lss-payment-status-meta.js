import { defineStore } from "pinia";
import { ref } from "vue"
export const usePaymentStatusStore = defineStore("paymentMetaStore", {
  state: () => ({

	awaiting_payment: {
		name: "Awaiting Payment",
		key:"awaiting_payment",
		allow_adjust:true,
		options:['awaiting_confirm', 'failed', 'expired', 'paid', 'awaiting_refund', 'refunded']
	},


	awaiting_confirm: {
		name: "Awaiting Confirm",
		key:"awaiting_confirm",
		allow_adjust:true,
		options:['awaiting_payment', 'failed', 'expired', 'paid', 'awaiting_refund', 'refunded']
	},

	failed: {
		name: "Failed",
		key:"failed",
		allow_adjust:true,
		options:['awaiting_confirm', 'awaiting_payment', 'expired', 'paid', 'awaiting_refund', 'refunded']
	},

	expired: {
		name: "Expired",
		key:"expired",
		allow_adjust:true,
		options:['awaiting_confirm', 'awaiting_payment', 'failed', 'paid', 'awaiting_refund', 'refunded']
	},

	paid: {
		name: "Paid",
		key:"paid",
		allow_adjust:true,
		options:['awaiting_confirm', 'awaiting_payment', 'failed', 'expired', 'awaiting_refund', 'refunded']
	},

	awaiting_refund: {
		name: "Awaiting Refund",
		key:"awaiting_refund",
		allow_adjust:true,
		options:['awaiting_confirm', 'awaiting_payment', 'failed', 'expired', 'paid', 'refunded']
	},

	refunded: {
		name: "refunded",
		allow_adjust:false,
		key:"refunded",
		options:['awaiting_confirm', 'awaiting_payment', 'failed', 'expired', 'paid', 'awaiting_refund']
	},

    
  }),
});
