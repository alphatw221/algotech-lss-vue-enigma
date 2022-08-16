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
		registerInfo: ref({}), 
		vnBank: ref({
			bankName:'VP Bank',
			accountName:'Tieu Thuy Tien',
			accountNumber:'47953',
			note:'',
		}),
		g_cash:ref({
			bankName:'GCash',
			accountName:'GCash',
			accountNumber:'0917 158 1183',
			note:'',
		})
    })
}); 