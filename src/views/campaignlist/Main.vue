<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">


    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-2 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 col-span-12 m-2 lg:col-span-8 2xl:col-span-8">
          <input id="off" name="state-d" type="radio" />
          <label for="off" @click="show_campaign('ongoing')" style="width: 100px; font-size:14px;">Ongoing</label>
          <input id="on" name="state-d" type="radio" checked="checked"/>
          <label for="on" @click="show_campaign('scheduled')" style="width: 100px; font-size:14px;">Scheduled</label>
          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" @click="show_campaign('history')" style="width: 100px; font-size:14px;">History</label>
        </div>
        <button 
          class="col-start-1 btn btn-warning btn-rounded w-24 h-10 text-white
            lg:col-start-11 lg:m-2 
              2xl:col-start-11 2xl:m-2"
                @click="router.push('/seller/campaign/create')" > 
          <span class="font-bold mr-1 text-lg">+</span> Create</button>
      </div>

      <div class="box mt-3" v-show="campaignStatus=='scheduled'">
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

      <div class="box mt-3" v-show="campaignStatus=='history'">
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

      <div class="box mt-3" v-show="campaignStatus=='ongoing'">
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
  { name: " ", key: "edit" },
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

<style scoped>
.switch-toggle {
  overflow: visible;
  float: left;
  height: 42px;
  width: 300px;
  background: theme("colors.secondary");
  border-radius: 42px 42px;
  letter-spacing: 0.7px;
  box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.185),
    inset 8px 8px 16px rgba(0, 0, 0, 0.1);
}
.dark .switch-toggle {
  box-shadow: inset -4px -4px 8px rgba(22, 22, 22, 0.596),
    inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  --color-secondary: theme("colors.rgb.blueGray.800");
}

.switch-toggle input {
  position: absolute;
  opacity: 0;
}

.switch-toggle input + label {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  text-align: center;
  font-size: 16px;
  color: rgb(56, 56, 56);
  cursor: pointer;
}
.dark .switch-toggle input + label {
  color: rgb(255, 255, 255);
}

.switch-toggle input:checked + label {
  background: theme("colors.primary");
  height: 42px;
  width: 100px;
  border-radius: 42px 42px;
  font-weight: 500;
  color: aliceblue;
}
</style>