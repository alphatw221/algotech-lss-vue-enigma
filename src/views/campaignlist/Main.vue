<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="flex flex-col gap-5 p-3 box sm:p-8">
    <!-- BEGIN: commit box -->
    <div class="flex flex-row flex-wrap justify-between mt-4 sm:px-2">
      <div class="flex-none mx-auto mb-2 switch-toggle sm:mx-2">
        <input id="off" name="state-d" type="radio" />
        <label for="off" @click="show_campaign('ongoing')">Ongoing</label>
        <input id="on" name="state-d" type="radio" checked="checked"/>
        <label for="on" @click="show_campaign('scheduled')">Scheduled</label>
        <input id="na" name="state-d" type="radio" class="my-0" />
        <label for="na" @click="show_campaign('history')">History</label>
      </div>
      <button 
        class="flex w-40 h-10 ml-auto text-white btn btn-warning btn-rounded sm:mx-2"
              @click="router.push({name:'create-campaign'})" > 
        <span class="mr-1 text-lg font-bold">+</span> Create
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
  { name: "Manage Orders", key: "manager_order" },
  { name: "Stop Checkout", key: "stop" },
  // { name: "Order Link", key:"link" },
  { name: " ", key: "entry" },
])




</script>