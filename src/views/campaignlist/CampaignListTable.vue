<template>
  <div class="overflow-x-auto overflow-y-auto h-[650px]">
    <table class="table table-report">
      <thead>
        <tr>
          <th class="text-center " v-for="column in tableColumns" :key="column.key">
            {{ column.name }}
          </th>
          <th v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) in campaigns" :key="index" class="intro-x">
          <td class="fan_page items-center w-12">
            <div class="flex w-full justify-around">
              <div class="flex-0 w-12 h-12  zoom-in border-0" v-if="campaign.facebook_page !== null">
                <Tippy tag="img" class="rounded-full border-0" :src="campaign.facebook_page.image"
                  :content="campaign.facebook_page.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" :src="facebook_platform" >
                  </div>
              </div>
              <div class="flex-0 w-12 h-12 zoom-in" v-if="campaign.instagram_profile !== null">
                <Tippy tag="img" class="rounded-full " :src="campaign.instagram_profile.image"
                  :content="campaign.instagram_profile.name" />
                <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" :src="instagram_platform" >
                  </div>
              </div>
              <div class="flex-0 w-12 h-12 zoom-in" v-if="campaign.youtube_channel !== null">
                <Tippy tag="img" class="rounded-full" :src="campaign.youtube_channel.image"
                  :content="campaign.youtube_channel.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-cover" :src="youtube_platform" >
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
              v-if="campaignStatus === 'history'"
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2" @click="clickEntry(index)">
              Histroy
            </button>
            <button 
              v-else
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2" @click="clickEntry(index)">
              Live On
            </button>
          </td>
          <td
            v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" 
            class="edit table-report__action w-fit">
              <Dropdown placement="bottom-start">
                <DropdownToggle role="button" class="w-5 h-5 block" href="javascript:;">
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="pt-2 w-40">
                  <DropdownContent class="w-40 text-center">
                    <DropdownItem class="w-full whitespace-nowrap text-center" @click="router.push({name:'edit-campaign', params: {'campaign_id':campaign.id}})"> Edit </DropdownItem>
                    <DropdownItem @click="copyURL(campaign.id)" class="w-full whitespace-nowrap"> Blank Cart </DropdownItem>
                    <DropdownItem @click="luckyDraw(campaign.id,campaign.title)" class="w-full whitespace-nowrap"> Lucky Draw</DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown> 
          </td>
        </tr>
      </tbody>
    </table>

    <!-- BEGIN Empty Cart Text -->
			<div class=" text-center mt-5 md:mt-10" v-if="numOfCampaigns==0">
				<h1 class="text-slate-500 text-sm md:text-lg">
					Your Have No {{props.tableName}} Campaign
				</h1>
			</div>
	<!-- END Empty Cart Text -->

    <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <Page class="mx-auto my-3" :total="dataCount" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
  </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { allow_checkout, list_campaign } from "@/api_v2/campaign"
import {defineProps, onMounted, onUnmounted, getCurrentInstance, ref, defineEmits, computed} from 'vue'

import { useRoute, useRouter } from "vue-router";

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import unbound from "/src/assets/images/lss-img/noname.png"

const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const emits = defineEmits(['showRemindModal',])

const props = defineProps({
    tableColumns: Array,
    tableName: String,
    campaignStatus: String
});

const baseURL = import.meta.env.VITE_APP_ROOT_API
const currentPage= ref(1)
const totalPage= ref(1)
const page_size= ref(10)
const dataCount= ref(0)
const searchColumn= ref('')
const keyword= ref('')
const order_by= ref("created_at")

const layoutStore = useLSSSellerLayoutStore()

const campaigns=ref([])
const numOfCampaigns = computed(()=>Object.keys(campaigns.value).length)
onMounted(()=>{
  search();

  eventBus.on(props.tableName, (payload) => {
    currentPage.value = 1;
    searchColumn.value = payload.searchColumn;
    keyword.value = payload.keyword;
    page_size.value = payload.pageSize;
    // order_by.value = payload.order_by;
    search();
  }),
  startFromToast();
})

onUnmounted(()=>{
  eventBus.off(props.tableName);
})


const search =()=>{
      list_campaign(props.campaignStatus,searchColumn.value,keyword.value,order_by.value,currentPage.value,page_size.value)
      .then((response) => {
          if (response.data.count != undefined) {
            dataCount.value = response.data.count;
            const _totalPage = parseInt(response.data.count / page_size.value);
            totalPage.value = _totalPage == 0 ? 1 : _totalPage;
          }
          campaigns.value = response.data.results
        })
    }

const changePage = (page)=>{
      currentPage.value = page;
      search();
    }

const changePageSize = (pageSize)=>{
      page_size.value = pageSize;
      search();
    }

const clickEntry = (index)=>{
      const campaign = campaigns.value[index]
      if (campaign.facebook_campaign.post_id !== '' || campaign.instagram_campaign.live_media_id !== '' || campaign.youtube_campaign.live_video_id !== '') {
        router.push({name:'campaign-live',params:{'campaign_id':campaign.id}})
        return
      }
      eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': props.tableName, 'campaign_index': index , 'campaignsRef': campaigns})
    }

const stop_checkout = (campaign_id,status)=>{
      allow_checkout(campaign_id,status)
      layoutStore.notification.showMessageToast('Update Successed');
    }

const manageOrder = (campaign_id,status)=>{
      router.push({name:'manage-order',params:{'campaign_id':campaign_id},query:{'checkout':status}})
    }

const copyURL = (campaign_id)=>{
      text = `${baseURL}/buyer/recaptcha/blank/${campaign_id}`;
      navigator.clipboard.writeText(text).then(()=>{
          alert('copied!')
      })
    }

const startFromToast=()=>{
      if (route.query.type && route.query.type == 'startCampaign') {
		    console.log('Wait for info')
	    }
    }

const luckyDraw=(campaign_id)=>{
      router.push({name:'lucky-draw',params:{'campaign_id':campaign_id}})
    }

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