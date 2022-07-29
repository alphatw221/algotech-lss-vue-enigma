<template>
  <!-- BEGIN OUTTER BOX -->
  <div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
    <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">
      {{ $t("campaign_list.campaign_list") }}
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
        flex flex-row flex-wrap
        justify-center
        sm:justify-between
        mt-5
        mx-0
        gap-3
        sm:gap-5
      "
    >
      <div class="flex-none switch-toggle mx-auto sm:mx-0">
        <input id="off" name="state-d" type="radio" />
        <label for="off" @click="show_campaign('ongoing')">{{
          $t("campaign_list.tabs.ongoing")
        }}</label>
        <input id="on" name="state-d" type="radio" checked="checked" />
        <label for="on" @click="show_campaign('scheduled')">{{
          $t("campaign_list.tabs.scheduled")
        }}</label>
        <input id="na" name="state-d" type="radio" class="my-0" />
        <label for="na" @click="show_campaign('history')">{{
          $t("campaign_list.tabs.history")
        }}</label>
      </div>
      <button
        class="
          flex
          w-32
          h-[35px]
          sm:h-[42px]
          ml-auto
          text-white
          btn btn-warning btn-rounded
          mx-auto
          mb-5
          sm:mx-0
        "
        @click="router.push({ name: 'create-campaign' })"
      >
        <span class="mr-1 text-lg font-bold">+</span>
        {{ $t("campaign_list.create_campaign") }}
      </button>
    </div>
    <div class="flex-auto" v-show="campaignStatus == 'scheduled'">
      <SearchBar :searchColumns="searchColumns" :eventBusName="'Scheduled'" />
      <CampaignListTable
        :tableColumns="tableColumns"
        :tableName="'Scheduled'"
        :campaignStatus="'scheduled'"
      />
    </div>

    <div class="flex-auto" v-show="campaignStatus == 'history'">
      <SearchBar :searchColumns="searchColumns" :eventBusName="'History'" />
      <CampaignListTable
        :tableColumns="tableColumns"
        :tableName="'History'"
        :campaignStatus="'history'"
      />
    </div>

    <div class="flex-auto" v-show="campaignStatus == 'ongoing'">
      <SearchBar :searchColumns="searchColumns" :eventBusName="'Ongoing'" />
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
import RemindEnterPostIDModal from "./RemindEnterPostIDModal.vue";
import EnterPostIDModal from "./enter-post-id-modal/Main.vue";
import { ref, watch, computed, getCurrentInstance, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { retrieve_campaign } from "@/api_v2/campaign"

const store = useLSSCampaignListStore();
const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus; 

const openCampaign = ref()
const campaignStatus = ref("scheduled");
const show_campaign = (status) => {
  campaignStatus.value = status;
};

const searchColumns = ref([{ text: "title", value: "title" }]);

const tableColumns = ref([
  { name: "fan_page", key: "page" },
  // { name: "Platform", key: "platform" },
  { name: "title", key: "title" },
  { name: "start_at", key: "start_at" },
  { name: "end_at", key: "end_at" },
  { name: "manage_order", key: "manage_order" },
  { name: "stop", key: "stop" },
  // { name: "Order Link", key:"link" },
  { name: "null", key: "entry" },
]);

onMounted(()=>{
  if(route.query.type){
    if (route.query.type == 'startCampaign' && route.query.campaign != '' && route.query.campaign != undefined ) {
      retrieve_campaign(route.query.campaign).then((res) => {
        openCampaign.value = res.data
        console.log(openCampaign.value)
        if (openCampaign.value.facebook_campaign.post_id !== '' || openCampaign.value.instagram_campaign.live_media_id !== '' || openCampaign.value.youtube_campaign.live_video_id !== '') {
          router.push({name:'campaign-live',params:{'campaign_id':openCampaign.value.id}, query:{'status':"schaduled"}})
          return
        }
        eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': "schaduled", 'campaign':openCampaign})
      })
    
    }
  } 
})

watch(computed(()=>route.query.type), () => {
  if(route.query.type){
    if (route.query.type == 'startCampaign') {
      retrieve_campaign(route.query.campaign).then((res) => {
        openCampaign.value = res.data
        console.log(openCampaign.value)
        if (openCampaign.value.facebook_campaign.post_id !== '' || openCampaign.value.instagram_campaign.live_media_id !== '' || openCampaign.value.youtube_campaign.live_video_id !== '') {
          router.push({name:'campaign-live',params:{'campaign_id':openCampaign.value.id}, query:{'status':"schaduled"}})
          return
        }
        eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': "schaduled", 'campaign':openCampaign})
      })}
  }
})
</script>