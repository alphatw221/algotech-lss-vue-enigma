import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSCampaignListStore = defineStore("CampaignList", {
  state: () => ({
    campaignStatus:ref('scheduled'),
    showRemindEnterPostIDModal:ref(false),
    showEnterPostIDModal:ref(false),
    showInstantlyAddProductModal: ref(false), 
    showAddProductFromStockModal: ref(false), 
    campaign_id:ref(null),     
    
    searchScheduledCampaign:ref({
      campaigns:[]
    }),
    searchHistoryCampaign:ref({
      campaigns:[]
    }),
    searchOngoingCampaign:ref({
      campaigns:[]
    })

  }),
});
