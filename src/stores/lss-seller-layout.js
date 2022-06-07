import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSSellerLayoutStore = defineStore("sellerLayout", {
    state: () => ({
        showMobileMenu: ref(false),
        isAuthenticated: ref(false),
        loginWith: ref(null),
        userInfo: ref({}),
    }),
});
