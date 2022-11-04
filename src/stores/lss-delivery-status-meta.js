import { defineStore } from "pinia";
import { ref } from "vue"
export const useDeliveryStatusStore = defineStore("deliveryStatusStore", {
  state: () => ({
	
	awaiting_fulfillment: {
		name: "Awaiting Fulfillment",
		key:"awaiting_fulfillment",
		allow_adjust:true,
		options:['awaiting_fulfillment', 'awaiting_shipment','awaiting_pickup','partially_shipped','shipped']
	},


	awaiting_shipment: {
		name: "Awaiting Shipment",
		key:"awaiting_shipment",
		allow_adjust:true,
		options:['awaiting_shipment', 'partially_shipped', 'shipped']
	},

	awaiting_pickup: {
		name: "Awaiting Pickup",
		key:"awaiting_pickup",
		allow_adjust:true,
		options:['awaiting_pickup', 'collected']
	},

	partially_shipped: {
		name: "Partially Shipped",
		key:"partially_shipped",
		allow_adjust:true,
		options:['partially_shipped','shipped']
	},

	shipped: {
		name: "Shipped",
		key:"shipped",
		allow_adjust:true,
		options:['shipped', 'collected']
	},

	collected: {
		name: "Collected",
		key:"collected",
		allow_adjust:true,
		options:['collected', 'awaiting_return']
	},

	awaiting_return: {
		name: "Awaiting Return",
		allow_adjust:true,
		key:"awaiting_return",
		options:['awaiting_return','returned']
	},

	returned: {
		name: "Returned",
		allow_adjust:false,
		key:"returned",
		options:[]
	},






  }),
});
