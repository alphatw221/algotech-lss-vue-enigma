<template>
  <div class="overflow-x-auto overflow-y-auto h-[650px]">
    <table class="table table-report">
      <thead>
        <tr>
          <th class="text-center " v-for="column in tableColumns" :key="column.key">
            {{ column.name }}
          </th>
          <th v-if="status === 'ongoing' || status === 'scheduled'" ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) in store[tableName].campaigns" :key="index" class="intro-x">
          <td class="fan_page items-center w-12">
            <div class="flex w-full justify-around">
              <div class="flex-0 w-12 h-12  zoom-in border-0" v-if="campaign.facebook_page !== null">
                <Tippy tag="img" class="rounded-full border-0" :src="campaign.facebook_page.image"
                  :content="campaign.facebook_page.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/facebook.png' >
                  </div>
              </div>
              <div class="flex-0 w-12 h-12 zoom-in" v-if="campaign.instagram_profile !== null">
                <Tippy tag="img" class="rounded-full " :src="campaign.instagram_profile.image"
                  :content="campaign.instagram_profile.name" />
                <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/instagram.png' >
                  </div>
              </div>
              <div class="flex-0 w-12 h-12 zoom-in" v-if="campaign.youtube_channel !== null">
                <Tippy tag="img" class="rounded-full" :src="campaign.youtube_channel.image"
                  :content="campaign.youtube_channel.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/youtube.png' >
                  </div>
              </div>
            </div>
          </td>
          <td class="title text-center w-fit">
            {{ campaign.title }}
          </td>
          <td class="startDate w-5 text-center">
            <div class="w-28">{{ new Date(campaign.start_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short",
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="endDate w-5 text-center">
            <div class="w-28">{{ new Date(campaign.end_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short",
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="manage_order items-center w-fit">
            <a class="flex items-center justify-center" @click="manageOrder(campaign.id,campaign.meta.allow_checkout)">
              <font-awesome-icon icon="fa-solid fa-list-check" class="w-8 h-6 self-center"/>
            </a>
          </td>
          <td class="checkout items-center w-fit">
            <div  v-if="status === 'history'" 
              class="flex form-check form-switch justify-center">
              <input  id="selectCheckbox" class="form-check-input center" type="checkbox" disabled v-model="checkout" />
            </div>
            <div v-else
              class="flex form-check form-switch justify-center">
               <input @click="stop_checkout(campaign.id,$event.target.checked)" class="form-check-input mr-0 ml-3" type="checkbox" v-model="campaign.meta.allow_checkout"/>
            </div>
          </td>
          <td class="entry text-center w-fit">
            <button 
              v-if="status === 'history'"
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2" @click="clickEntry(campaign, index)">
              Histroy
            </button>
            <button 
              v-else
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2" @click="clickEntry(campaign, index)">
              Live On
            </button>
          </td>
          <td
            v-if="status === 'ongoing' || status === 'scheduled'" 
            class="edit table-report__action w-fit">
              <Dropdown placement="bottom-start">
                <DropdownToggle role="button" class="w-5 h-5 block" href="javascript:;">
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="pt-2 w-40">
                  <DropdownContent class="w-40 text-center">
                    <DropdownItem class="w-full whitespace-nowrap text-center" @click="this.$router.push({name:'edit-campaign', params: {'campaign_id':campaign.id}})"> Edit </DropdownItem>
                    <DropdownItem @click="copyURL(campaign.id)" class="w-full whitespace-nowrap"> Blank Cart </DropdownItem>
                    <!-- <DropdownItem @click="luckyDraw(campaign.id,campaign.title)" class="w-full whitespace-nowrap"> Lucky Draw</DropdownItem> -->
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <Page :total="dataCount" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
  </div>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { allow_checkout } from "@/api_v2/campaign"

export default {
  props: {
    requestUrl: String,
    tableColumns: Array,
    tableName: String,
    campaignStatus: String
  },
  data() {
    return {
      baseURL: import.meta.env.VITE_APP_ROOT_API,
      page: 1,
      totalPage: 1,
      page_size: 10,
      dataCount: 0,
      searchCcolumn: '',
      keyword: '',
      status: this.campaignStatus,
      checkout: true,
      order_by: "created_at",
      youtube_platform: "/src/assets/images/lss-img/youtube.png",
      facebook_platform: "/src/assets/images/lss-img/facebook.png",
      instagram_platform: "/src/assets/images/lss-img/instagram.png",
      unbound: "/src/assets/images/lss-img/noname.png",
      store: useLSSCampaignListStore(),
      layout: useLSSSellerLayoutStore(),
    };
  },
  mounted() {
    this.search();

    this.eventBus.on(this.tableName, (payload) => {
      this.page = 1;
      this.searchColumn = payload.searchColumn;
      this.keyword = payload.keyword;
      this.page_size = payload.pageSize;
      this.search();
    }),
    this.startFromToast();
  },
  unmounted() {
    this.eventBus.off(this.tableName);
  },
  methods: {
    get_url_param() {
      let param = "";
      [
        "page_size",
        "page",
        "searchColumn",
        "keyword",
        "status",
        "order_by",
      ].forEach((v) => {
        if (this[v]) param += `&${v}=${this[v]}`;
      });
      return param.substr(1, param.length);
    },
    search() {
      createAxiosWithBearer()
        .get(`${this.requestUrl}?${this.get_url_param()}`)
        .then((response) => {
          if (response.data.count != undefined) {
            this.dataCount = response.data.count;
            const totalPage = parseInt(response.data.count / this.pageSize);
            this.totalPage = totalPage == 0 ? 1 : totalPage;
          }
          this.store[this.tableName].campaigns = response.data.results
          // console.log(this.store[this.tableName].campaigns)
          for(let i = 0; i < this.store[this.tableName].campaigns.length; i++){
            this.store[this.tableName].campaigns[i].meta.allow_checkout = this.store[this.tableName].campaigns[i].meta.allow_checkout == 1 ? false : true 
          }
          // this.campaigns = response.data.results;
        })
    },
    changePage(page) {
      this.page = page;
      this.search();
    },
    changePageSize(pageSize) {
      this.page_size = pageSize;
      this.search();
    },

    clickEntry(campaign, index) {
      // this.$emit('showRemindModal',{'tableName':this.tableName,'campaign':campaign,'index':index})
      //   return
      console.log(campaign.facebook_campaign.post_id)
      console.log(campaign.instagram_campaign.live_media_id)
      console.log(campaign.youtube_campaign.live_video_id)
      if (campaign.facebook_campaign.post_id !== '' || campaign.instagram_campaign.live_media_id !== '' || campaign.youtube_campaign.live_video_id !== '') {
        this.$router.push({name:'campaign-live',params:{'campaign_id':campaign.id}})
        return
      }
      this.$emit('showRemindModal', { 'tableName': this.tableName, 'campaign': campaign, 'index': index })
    },
    stop_checkout(campaign_id,status){
      allow_checkout(campaign_id,status)
      this.layout.notification.showMessageToast('Update Successed');
    },
    manageOrder(campaign_id,status) {
      this.$router.push({name:'manage-order',params:{'campaign_id':campaign_id},query:{'checkout':status}})
    },
    copyURL(campaign_id) {
      var dummy = document.createElement('input'),
      text = `${this.baseURL}/buyer/recaptcha/blank/${campaign_id}`;
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand('copy');
      this.layout.notification.showMessageToast("copyed!")
      document.body.removeChild(dummy);
      console.log(this.store.searchScheduledCampaign.campaigns)
    },
    startFromToast(){
      if (this.$route.query.type && this.$route.query.type == 'startCampaign') {
		    console.log('Wait for info')
	    }
    },
    luckyDraw(id, title){
      this.store.campaign_id = id
      this.store.campaign_title = title
      this.$router.push({name:'lucky-draw',params:{'campaign_id':id}})
    }
  },
};
</script>


<style scoped>
.click-icon:hover {
  cursor: pointer;
}

td {
  min-height: 50px;
  border-collapse: collapse;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 99;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    font-size: 16px;
    padding: 0px !important;
  }

  .fan_page {
    height: 60px !important;
  }

  .platform {
    height: 60px !important;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 1px solid black;
    margin-top: 20px;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    display: flex;
    padding-left: 40% !important;
    text-align: center !important;
    box-shadow: none !important;
    align-items: center;
    justify-content: center;
    background-color: white !important;
    width: 100%;
  }

  .productName {
    padding-left: 15px;
  }

  td:before {
    position: absolute;
    left: 6px;
    width: 35%;
    white-space: nowrap;
    top: 25%;
    font-weight: bold;
    box-shadow: none !important;
    background-color: white !important;
    text-align: left !important;

  }

  .fan_page:before {
    content: "Fan Page";
    /* color: #0e9893; */
  }

  .platform:before {
    content: "Platform";
    /* color: #0e9893; */
  }

  .title:before {
    content: "Title";
    /* color: #0e9893; */
  }

  .startDate:before {
    content: "Start Time";
    /* color: #0e9893; */
  }
  .endDate:before {
    content: "End Time";
    /* color: #0e9893; */
  }

  .manage_order:before {
    content: "Manage Order";
    /* color: #0e9893; */
  }

  .checkout:before {
    content: "Stop Checkout";
    /* color: #0e9893; */
  }

  .copyLink:before {
    content: "Order Link";
  }
}
</style>