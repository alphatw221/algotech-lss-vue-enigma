<template>
	<div class="box p-5 m-3 border-2 border-secondary">
		<div>
		<div class="flex mb-4 dark:border-darkmode-400">
			<span class="text-lg">Order Summary</span>
		</div>
		
		<div class="flex">
			<div class="mr-auto">Subtotal</div>
			<div class="font-medium">$ {{ orderSummary.subtotal }}</div>
		</div>
		<div class="flex mt-4">
			<div class="mr-auto">Discount</div>
			<div class="font-medium text-danger">$ {{ orderSummary.adjustPrice }}</div>
		</div>
		<div class="flex mt-4">
			<div class="mr-auto">Delivery Charge</div>
			<div class="font-medium">$ {{ orderSummary.deliveryCharge }}</div>
		</div>
		<div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
			<div class="mr-auto font-medium text-base">Total Charge</div>
			<div class="font-medium text-base">$ {{ orderSummary.total }}</div>
		</div>
		</div>
		<div class="flex mt-5" v-if="page_type === 'step1'">
		<button
			class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
			@click="addItem"
		>
			+ Add more items
		</button>
		<button class="btn btn-primary w-32 shadow-md ml-auto">Checkout</button>
		</div>
	</div>
</template>
<script>
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

export default {
	props: {
        page_type: String,
    },
    data() {
		return {
			orderSummary: {}
		}
    },
	setup() {
		
	},
    mounted() {
        const store = useShoppingCartStore(); 
		this.orderSummary = {
			'subtotal': store.preOrder.subtotal,
			'total': store.preOrder.total,
			'deliveryCharge': store.preOrder.shipping_cost,
			'adjustPrice': store.preOrder.adjust_price,
		}
    },
    methods: {
        addItem() {
            this.eventBus.emit("addPoint", {'pre_order_id': this.$route.params.pre_order_id});
        },
    },
};
</script>
 