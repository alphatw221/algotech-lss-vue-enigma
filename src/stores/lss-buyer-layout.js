import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSBuyerLayoutStore = defineStore("buyerLayout", {
  state: () => ({
    menu: [
      {
        icon: "ShoppingBagIcon",
        pageName: "buyer-order-history-page",
        title: "Order History",
      },
    ],
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    loginWith: ref(null),
    userInfo: ref({})
     
  }),
});
