import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerStockStore = defineStore("sellerStock", {
	state: () => ({
		showBulkEditModal:ref(false),
		productCategoryDict:ref({}),
		selectedProductIDList:ref([])
    })
});