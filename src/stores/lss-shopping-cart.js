import { defineStore } from "pinia";
import { ref } from "vue"
export const useShoppingCartStore = defineStore("buyerShoppingCart", {
  state: () => ({

    preOrder:ref({}),
    openTab:ref(1),


    orderSummary:ref({}),
    delivery_info:ref({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      remark: "",
      method: "delivery",
      delivery_info: {
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_email: "",
        shipping_phone: "",
        shipping_remark: "",
        shipping_address_1: "",
        shipping_location: "",
        shipping_region: "",
        shipping_postcode: "",  
        shipping_option: "",
        shipping_cost: 0.00,
      },
      pickup_info: {
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_email: "",
        shipping_phone: "",
        shipping_remark: "",
        shipping_option: "",
        shipping_cost: 0.00,
      },
    }
  ),     
  }),
});
