import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerRegistrationStore = defineStore("sellerRegistration", {
	state: () => ({
		registerTab: ref(1),
		country: ref(),
		home:ref('https://liveshowseller.com/'),
		terms:ref('https://liveshowseller.com/terms-of-service/'),
		policy:ref('https://liveshowseller.com/privacy-policy/'),
		notification: ref(false), 
		alert: ref(false), 
		registerInfo: ref({})







		// layout.home = 'https://liveshowseller.com.tw/'
        // layout.terms = 'https://liveshowseller.com.tw/terms-of-service/'
        // layout.policy = 'https://liveshowseller.com.tw/privacy-policy/'

    })
}); 