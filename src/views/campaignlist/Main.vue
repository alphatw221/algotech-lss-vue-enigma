<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="flex flex-col gap-5 p-3 box sm:p-8">
    <!-- BEGIN: commit box -->
    <div class="flex flex-row flex-wrap justify-between mt-8 sm:mt-0 mx-0 gap-3">
      <div class="flex-none switch-toggle mx-auto sm:mx-0">
        <input id="off" name="state-d" type="radio" />
        <label for="off" @click="show_campaign('ongoing')">{{$t('campaign.list.ongoing')}}</label>
        <input id="on" name="state-d" type="radio" checked="checked"/>
        <label for="on" @click="show_campaign('scheduled')">{{$t('campaign.list.scheduled')}}</label>
        <input id="na" name="state-d" type="radio" class="my-0" />
        <label for="na" @click="show_campaign('history')">{{$t('campaign.list.history')}}</label>
      </div>
      <button 
        class="flex w-32 h-[35px] sm:h-[42px] ml-auto text-white btn btn-warning btn-rounded"
              @click="router.push({name:'create-campaign'})" > 
        <span class="mr-1 text-lg font-bold">+</span> {{$t('components.word.create')}}
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
  { text: "title", value: "title" },
])

const tableColumns =ref( [
  { name: "fan_page", key: "page" },
  // { name: "Platform", key: "platform" },
  { name: "title", key: "title" },
  { name: "start_at", key: "start_at" },
  { name: "end_at", key: "end_at" },
  { name: "manage_order", key: "manage_order" },
  { name: "stop", key: "stop" },
  // { name: "Order Link", key:"link" },
  { name: "null", key: "entry" },
])




</script>