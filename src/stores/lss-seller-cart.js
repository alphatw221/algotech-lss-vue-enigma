import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerCartStore = defineStore("sellerCart", {
	state: () => ({
		showAddItemModal:ref(false),
		cart:ref({})
    })
});