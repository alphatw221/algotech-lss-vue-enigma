import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSBuyerLayoutStore = defineStore("buyerLayout", {
  state: () => ({
    menu: [
      {
        icon: "ShoppingBagIcon",
        pageName: "side-menu-test3",
        title: "Order History",
      },
      
    ],
    showMobileMenu:ref(true)
     
  }),
});
