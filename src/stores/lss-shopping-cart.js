import { defineStore } from "pinia";
import { ref } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
  state: () => ({

    // preOrder:ref({}),
    openTab:ref(1),
    order:ref({}),

    // orderSummary:ref({}),
    contact_info:ref({
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_email: "",
      shipping_phone: "",
    }),

    shipping_info:ref({
      shipping_remark: "",
      method: "delivery",
      delivery_info: {
        shipping_address_1: "",
        shipping_location: "",
        shipping_region: "",
        shipping_postcode: "",  
        shipping_option: "",
        shipping_cost: 0.00,
      },
      pickup_info: {
        shipping_option: "",
        shipping_cost: 0.00,
      },
    }
  ),     
  }),
});
