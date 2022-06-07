import { defineStore } from "pinia"

export const useAlertStore = defineStore("alert", {
    state: () => ({
        notSaveAlert: ref(),
    }),
    getters: {
        notSaveAlertToggle: (state)=>{
            provide("bind[basicNonStickyNotification]", (el) => {
                // Binding
                basicNonStickyNotification.value = el;
                createModal.value = false;
            }),
            state.notSaveAlert.showToast()
        },
        
    },
});