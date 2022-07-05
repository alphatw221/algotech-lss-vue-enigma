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
        class="btn btn-warning btn-rounded w-24 h-10 text-white sm:mx-2 flex ml-auto"
              @click="router.push({name:'create-campaign'})" > 
        <span class="font-bold mr-1 text-lg">+</span> Create
      </button>
    </div>
    <div class="flex-auto" v-show="campaignStatus=='scheduled'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'searchScheduledCampaign'"
        /> 
        <CampaignListTable
          :requestUrl="'/api/v2/campaign/list/'"
          :tableColumns="tableColumns"
          :tableName="'searchScheduledCampaign'"
          :campaignStatus="'scheduled'"
          @showRemindModal="handleShowRemindModal"
        />
    </div>

    <div class="flex-auto" v-show="campaignStatus=='history'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'searchHistoryCampaign'"
        /> 
        <CampaignListTable
          :requestUrl="'/api/v2/campaign/list/'"
          :tableColumns="tableColumns"
          :tableName="'searchHistoryCampaign'"
          :campaignStatus="'history'"
          @showRemindModal="handleShowRemindModal"
        />
    </div>

    <div class="flex-auto" v-show="campaignStatus=='ongoing'">
        <SearchBar 
          :searchColumns="searchColumns" 
          :eventBusName="'searchOngoingCampaign'"
        /> 
        <CampaignListTable
          :requestUrl="'/api/v2/campaign/list/'"
          :tableColumns="tableColumns"
          :tableName="'searchOngoingCampaign'"
          :campaignStatus="'ongoing'"
          @showRemindModal="handleShowRemindModal"
        />
    </div>
    
    <!-- END: commit box -->



    <!-- BEGIN Remind Enter Post ID Modal -->
      <RemindEnterPostIDModal :show="showRemindEnterPostIDModal" @hide="showRemindEnterPostIDModal=false" @comfirm="()=>{showRemindEnterPostIDModal=false;showEnterPostIDModal=true}"/>
    <!-- END Remind Enter Post ID Modal -->



    <!-- BEGIN Enter Post ID Modal -->
      <EnterPostIDModal :show="showEnterPostIDModal" @hide="showEnterPostIDModal=false" :targetCampaign="targetCampaign"/>
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

const targetCampaign = ref({})

const searchColumns = ref([
  { text: "Title", value: "title" },
])

const tableColumns =ref( [
  { name: "Fan Page", key: "page" },
  { name: "Platform", key: "platform" },
  { name: "Title", key: "title" },
  { name: "Start Time", key: "start_at" },
  { name: "End Time", key: "end_at" },
  { name: "Manage Order", key: "manager_order" },
  { name: "Stop Checkout", key: "stop" },
  // { name: "Order Link", key:"link" },
  { name: " ", key: "entry" },
])

const showRemindEnterPostIDModal = ref(false)
const showEnterPostIDModal = ref(false)

const handleShowRemindModal = (payload)=>{
  targetCampaign.value = payload
  // targetCampaign.value = campaign
  console.log(payload)
  showRemindEnterPostIDModal.value = true
}

</script>