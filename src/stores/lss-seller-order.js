import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerOrderStore = defineStore("sellerOrder", {
	state: () => ({
		modify_status: ref('+'),
		orderDetail: ref({}),
		showAddItemModal:ref(false),
		campaignProducts:ref([]),
		order:ref({})
    })
});