<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
          <input id="on" name="state-d" type="radio" checked="checked"/>
          <label for="on" @click="status_change('schedule')" style="width: 100px">Scheduled</label>

          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" @click="status_change('history')" style="width: 100px">History</label>

          <input id="off" name="state-d" type="radio" />
          <label for="off" @click="status_change('ongoing')" style="width: 100px">Ongoing</label>
        </div>
      </div>

      <div class="box">
        <div class="overflow-x-auto">
          <SearchBar :searchColumns="searchColumns"> </SearchBar>
          <CampaignListTable
            :requestUrl="'/api/v2/campaign/list_campaign/'"
            :columns="tableColumns"
            :routerParam="campaign_status"
          >
          </CampaignListTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/bar/SearchBar.vue";
import CampaignListTable from "@/components/table/CampaignListTable.vue";
export default {
  components: { 
		SearchBar,
		CampaignListTable
	},
  data() {
    return {
      searchColumns: {
        keywords: [
          { text: "Title", value: "title" },
          { text: "Time", value: "time" },
          { text: "Platform", value: "platform" },
        ],
      },
      tableColumns: [
        { name: "Fan Page", key: "page" },
        { name: "Platform", key: "platform" },
        { name: "Title", key: "title" },
        { name: "Time", key: "start_at" },
        { name: "Manage Order", key: "manager_order" },
        { name: "Stop Checkout", key: "stop" },
        { name: " ", key: "entry" },
        { name: " ", key: "edit" },
      ],
      campaign_status : 'schedule'
    };
  },
  mounted() {
		
		
	},
  methods: {
      status_change(status){
        this.campaign_status = status
        this.eventBus.emit("campaignStatus", {status: this.campaign_status})
      }
    
  },
};
</script>

<style scoped>
.switch-toggle {
  float: left;
  height: 42px;
  width: 300px;
  background: #363636ce;
  border-radius: 42px 42px;
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
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.switch-toggle input:checked + label {
  background: #055770;
  height: 42px;
  width: 100px;
  border-radius: 42px 42px;
}
</style>