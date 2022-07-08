<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="box p-5 flex flex-col gap-5">
    <!-- BEGIN: commit box -->
    <div class="flex flex-row mt-4 sm:p-2 flex-wrap justify-between">
      <div class="switch-toggle sm:mx-2 flex-none mb-2">
        <input id="off" name="state-d" type="radio" />
        <label for="off" @click="show_campaign('ongoing')">Ongoing</label>
        <input id="on" name="state-d" type="radio" checked="checked"/>
        <label for="on" @click="show_campaign('scheduled')">Scheduled</label>
        <input id="na" name="state-d" type="radio" class="my-0" />
        <label for="na" @click="show_campaign('history')">History</label>
      </div>
      <button 
        class="btn btn-warning btn-rounded w-40 h-10 text-white sm:mx-2 flex ml-auto"
              @click="router.push({name:'create-campaign'})" > 
        <span class="font-bold mr-1 text-lg">+</span> Create
      </button>
    </div>
    <div class="flex-auto" v-show="campaignStatus=='scheduled'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'Scheduled'"
        /> 
        <CampaignListTable
          :tableColumns="tableColumns"
          :tableName="'Scheduled'"
          :campaignStatus="'scheduled'"
        />
    </div>

    <div class="flex-auto" v-show="campaignStatus=='history'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'History'"
        /> 
        <CampaignListTable
          :tableColumns="tableColumns"
          :tableName="'History'"
          :campaignStatus="'history'"
        />
    </div>

    <div class="flex-auto" v-show="campaignStatus=='ongoing'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'Ongoing'"
        /> 
        <CampaignListTable
          :tableColumns="tableColumns"
          :tableName="'Ongoing'"
          :campaignStatus="'ongoing'"
        />
    </div>
    
    <!-- END: commit box -->



    <!-- BEGIN Remind Enter Post ID Modal -->
      <RemindEnterPostIDModal />
    <!-- END Remind Enter Post ID Modal -->



    <!-- BEGIN Enter Post ID Modal -->
      <EnterPostIDModal />
    <!-- END Enter Post ID Modal -->

  </div>
  <!-- END OUTTER BOX -->
</template>

<script setup>
import SearchBar from "./SearchBar.vue";
import CampaignListTable from "./CampaignListTable.vue";
import RemindEnterPostIDModal from "./RemindEnterPostIDModal.vue"
import EnterPostIDModal from "./enter-post-id-modal/Main.vue"

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"



const store = useLSSCampaignListStore()


const route = useRoute()
const router = useRouter()

const campaignStatus = ref('scheduled')
const show_campaign = status=>{
  campaignStatus.value=status
}


const searchColumns = ref([
  { text: "Title", value: "title" },
])

const tableColumns =ref( [
  { name: "Fan Page", key: "page" },
  // { name: "Platform", key: "platform" },
  { name: "Title", key: "title" },
  { name: "Start Time", key: "start_at" },
  { name: "End Time", key: "end_at" },
  { name: "Manage Order", key: "manager_order" },
  { name: "Stop Checkout", key: "stop" },
  // { name: "Order Link", key:"link" },
  { name: " ", key: "entry" },
])




</script>