import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSBuyerOrderStore = defineStore("buyerOrder", {
  state: () => ({

    order: ref({}),
    
     
  }),
});
