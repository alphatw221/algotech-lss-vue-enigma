import { defineStore } from "pinia";
import { ref } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
  state: () => ({

    preOrder:ref({}),
    openTab:ref(1),


    orderSummary:ref({}),
    delivery_info:ref({
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_email: "",
      shipping_phone: "",
      shipping_address_1: "",
      shipping_location: "",
      shipping_region: "",
      shipping_postcode: "",
      shipping_cost: 0.00,
      shipping_option: "",
      shipping_method: "",
      total: 0.00,
      shipping_remark: ""
    }),
     
  }),
});
