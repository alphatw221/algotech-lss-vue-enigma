<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
      <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">
          Transactions
      </h2>
  </div>
  <div class="flex flex-col p-3 box p-2 lg:gap-3 sm:px-8 lg:mx-20 layout">
      <!-- BEGIN: commit box -->
      <div class="flex flex-row flex-wrap justify-center sm:justify-between mt-5 mx-0 gap-3 sm:gap-5">
          <button class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mr-5 border-[1px] border-slate-100 shadow-lg"
          >
              <span class="font-bold mr-1 text-[16px]">+</span> Purchase Licenses
          </button>
      </div>
      <TransactionsTable />
  </div>
  <!-- END OUTTER BOX -->
</template>

<script setup>
import { ref, watch, computed, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import TransactionsTable from "./table/TransactionsTable.vue";

</script>

<style scoped>
.layout {
  height: fit-content;
}
</style>

