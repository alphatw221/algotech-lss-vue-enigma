<template>
<div class="flex flex-col lg:mt-8 my-3 gap-5 h-fit sm:h-full">
  <h2 class="text-xl sm:text-2xl sm:px-20 mx-auto sm:mx-0 font-medium">
    {{ $t('buyers.page_title')}}
  </h2>
  <div class="flex flex-col px-3 sm:px-8 py-10 box h-full lg:mx-20">
    <BuyersSearchBar /> 
    <BuyersListTable
      :tableColumns="tableColumns"
    />
  </div>
</div>
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
    { name: "email", key: "email"},
    // { name: "type", key: "type" },
    { name: "order_history", key: "order_history"},
    { name: "points", key: "points"},
]);

onMounted(()=>{
  sellerStore.buyer = {}
})
</script>
