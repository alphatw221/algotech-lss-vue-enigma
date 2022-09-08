import { defineStore } from "pinia";
import { ref } from "vue"
export const useSellerRegistrationStore = defineStore("sellerRegistration", {
	state: () => ({
		registerTab: ref(1),
		country: ref(),
		home:ref(import.meta.env.VITE_HOME_URL),
		terms:ref(import.meta.env.VITE_TERMS_OF_SERVICE_URL),
		policy:ref(import.meta.env.VITE_PRIVACY_POLICY_URL),
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