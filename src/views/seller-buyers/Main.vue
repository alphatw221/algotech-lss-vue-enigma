<template>
<!-- BEGIN OUTTER BOX -->
<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
    <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">
        {{ $t('buyers.page_title')}}
    </h2>
</div>
<div
    class="
      flex flex-col
      p-3
      box
      sm:h-[95%]
      p-2
      lg:gap-3
      sm:px-8
      h-fit
      lg:mx-20
    "
  >
    <!-- BEGIN: commit box -->
    <div
      class="
        flex flex-row flex-wrap justify-center
        sm:justify-between mt-5 mx-0 gap-3 sm:gap-5
      "
    >
    </div>
    <div class="flex-auto">
      <BuyersSearchBar />
      <BuyersListTable
        :tableColumns="tableColumns"
      />
    </div>

    <!-- END: commit box -->
  </div>
  <!-- END OUTTER BOX -->
</template>

<script setup>
import BuyersSearchBar from "@/views/seller-buyers/BuyersSearchBar.vue";
import BuyersListTable from "@/views/seller-buyers/BuyersListTable.vue";
import { ref, watch, computed, getCurrentInstance, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { retrieve_campaign } from "@/api_v2/campaign"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const sellerStore = useLSSSellerLayoutStore();
const store = useLSSCampaignListStore();
const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus; 

const searchColumns = ref([{ text: "name", value: "name" }]);

const tableColumns = ref([
    { name: null, key: "customer_img" },
    { name: "customer_name", key: "customer_name" },
    // { name: "type", key: "type" },
    { name: "order_history", key: "order_history"},
    { name: "points", key: "points"},
]);

onMounted(()=>{
  sellerStore.buyer = {}
})
</script>
