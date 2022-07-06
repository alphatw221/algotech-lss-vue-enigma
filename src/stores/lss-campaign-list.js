import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSCampaignListStore = defineStore("CampaignList", {
  state: () => ({
    campaignStatus:ref('scheduled'),
    showInstantlyAddProductModal: ref(false), 
    showAddProductFromStockModal: ref(false), 
    campaign_id: ref(),
    campaign_title:ref(),
  }),
});
