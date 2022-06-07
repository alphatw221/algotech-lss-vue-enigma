<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
          <input id="on" name="state-d" type="radio" checked="checked"/>
          <label for="on" @click="status_change('schedule')" style="width: 100px; font-size:14px;">Scheduled</label>
          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" @click="status_change('history')" style="width: 100px; font-size:14px;">History</label>
          <input id="off" name="state-d" type="radio" />
          <label for="off" @click="status_change('ongoing')" style="width: 100px; font-size:14px;">Ongoing</label>
        </div>
      </div>

      <div class="box">
        <div class="overflow-x-auto">
          <SearchBar :searchColumns="searchColumns" :page_type="'manage_order'"> </SearchBar>
          <CampaignListTable
            :requestUrl="'/api/v2/campaign/list_campaign/'"
            :columns="tableColumns"
            :routerParam="campaign_status"
            :page_type="'manage_order'"
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
        { name: "Title", key: "title" },
        { name: "Time", key: "start_at" },
        { name: " ", key: "entry" },
      ],
      campaign_status: "schedule",
    };
  },
  mounted() {
    
    this.eventBus.on("entryPoint", (payload) => {
      this.$router.push("manage-order");
    }) 
    this.eventBus.on("manageOrder", (payload) => {
      this.$router.push("manage-order");
    })
  },
  unmounted() {
    this.eventBus.off("entryPoint"),
    this.eventBus.off("manageOrder")
  },
  methods: {
    status_change(status){
        this.campaign_status = status
        this.eventBus.emit("campaignStatus", {status: this.campaign_status})
    },
  },
};
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