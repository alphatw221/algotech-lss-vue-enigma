import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerRegistrationStore = defineStore("sellerOrder", {
	state: () => ({
		registerTab: ref(1),
		notification: ref(false), 
		alert: ref(false), 

    })
});