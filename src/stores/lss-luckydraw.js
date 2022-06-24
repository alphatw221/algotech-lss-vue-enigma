import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSLuckyDrawStore = defineStore("LuckyDraw", {
  state: () => ({
    campaign_id:ref(null),
    campaign_title:ref(null),      

  }),
});
