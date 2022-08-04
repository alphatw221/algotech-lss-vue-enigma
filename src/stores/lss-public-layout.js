import { defineStore } from "pinia";
import { ref } from "vue"
export const usePublicLayoutStore = defineStore("publicLayout", {
	state: () => ({
		notification: ref(), 
		alert: ref(), 
    })
}); 