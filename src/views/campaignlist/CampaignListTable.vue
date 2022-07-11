<template>
  <div class="overflow-auto h-[650px]">
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
          <td class="items-center w-12 fan_page">
            <div class="flex justify-center w-full">
              <div class="border-0 w-14 h-14 flex-0 zoom-in" v-if="campaign.facebook_page !== null">
                <Tippy tag="img" class="border-0 rounded-full" :src="campaign.facebook_page.image"
                  :content="campaign.facebook_page.name" />
                  <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                  </div>
              </div>
              <div class="w-14 h-14 flex-0 zoom-in" v-if="campaign.instagram_profile !== null">
                <Tippy tag="img" class="rounded-full " :src="campaign.instagram_profile.image"
                  :content="campaign.instagram_profile.name" />
                <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                  </div>
              </div>
              <div class="w-14 h-14 flex-0 zoom-in" v-if="campaign.youtube_channel !== null">
                <Tippy tag="img" class="rounded-full" :src="campaign.youtube_channel.image"
                  :content="campaign.youtube_channel.name" />
                  <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                  </div>
              </div>
            </div>
          </td>
          <td class="text-center title w-fit">
            {{ campaign.title }}
          </td>
          <td class="w-5 text-center startDate">
            <div class="sm:hidden text-[14px] text-left text-[#616161]">Start Time:</div>
            <div class="sm:w-28">{{ new Date(campaign.start_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short",
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="w-5 text-center endDate">
            <div class="sm:hidden text-[14px] text-left text-[#616161]">End Time:</div>
            <div class="sm:w-28">{{ new Date(campaign.end_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short",
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="items-center manage_order w-fit">
            <a class="flex items-center justify-center" @click="manageOrder(campaign.id,campaign.meta.allow_checkout)">
              <font-awesome-icon icon="fa-solid fa-list-check" class="self-center w-8 h-6"/>
            </a>
            <div class="text-[12px] sm:hidden"> Manage Orders</div>
          </td>
          <td class="items-center checkout w-fit">
            <div  v-if="campaignStatus === 'history'" 
              class="flex flex-col justify-center form-check form-switch">
              <input  id="selectCheckbox" class="mt-[3px] form-check-input center" type="checkbox" disabled v-model="checkout" />
              <div class="text-[12px] sm:hidden"> Stop Checkout</div>
            </div>
            <div v-else
              class="flex flex-col justify-center form-check form-switch">
               <input @click="stop_checkout(campaign.id,$event.target.checked)" class="mt-[3px] mr-0 form-check-input" type="checkbox" v-model="campaign.meta.allow_checkout"/>
               <div class="text-[12px] sm:hidden"> Stop Checkout</div>
            </div>
          </td>
          <td class="justify-center text-center entry w-fit">
            <button 
              v-if="campaignStatus === 'history'"
              class="w-24 mr-1 btn btn-elevated-rounded-pending" @click="clickEntry(index)">
              Histroy
            </button>
            <button 
              v-else
              class="w-24 mr-1 btn btn-elevated-rounded-pending" @click="clickEntry(index)">
              Live On
            </button>
          </td>
          <td
            v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" 
            class="text-center moreTools w-fit">
              <Dropdown placement="bottom-start">
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="w-40 pt-2">
                  <DropdownContent class="w-40 text-center">
                    <DropdownItem class="w-full text-center whitespace-nowrap" @click="router.push({name:'edit-campaign', params: {'campaign_id':campaign.id}})"> Edit </DropdownItem>
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
			<div class="mt-5 text-center md:mt-10" v-if="numOfCampaigns==0">
				<h1 class="text-sm text-slate-500 md:text-lg">
					You Have No {{props.tableName}} Campaign
				</h1>
			</div>
	<!-- END Empty Cart Text -->

    <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap">
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
const checkout= ref(true)
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
      eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': props.tableName, 'campaign':campaign})
    }

const stop_checkout = (campaign_id,status)=>{
      allow_checkout(campaign_id,status)
      layoutStore.notification.showMessageToast('Update Successed');
    }

const manageOrder = (campaign_id,status)=>{

      window.open(router.resolve({ 
        name: 'manage-order',
        params:{'campaign_id':campaign_id},query:{'checkout':status},
      }).href)
      // router.push({name:'manage-order',params:{'campaign_id':campaign_id},query:{'checkout':status}})
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

const luckyDraw = (campaign_id) => {
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
    font-size: 14px;
    padding: 0px !important;
  }

  .fan_page {
    height: 65px !important;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 3px solid rgba(61, 61, 61, 0.7);
    margin-top: 20px;
    padding-bottom: 10px !important;
    position: relative;
  }

  td {
    position: relative;
    display: flex;
    text-align: center !important;
    box-shadow: none !important;
    align-items: center;
    justify-content: center;
    background-color: white !important;
    width: 100%;
  }
  .fan_page{
    display: inline-block;
  }
  .title {
    width:100%;
    display: inline-block;
    font-weight:600;
    color:theme("colors.primary");
  }
  .startDate {
    display: inline-block;
    width:50%;
    height:60px;
  }
  
  .endDate {
    display: inline-block;
    width:50%;
    height:60px;
  }
  .manage_order{
    display: inline-block;
    padding-left: 0% !important;
    width: 33%;
    height:60px;
  }
  .checkout{
    display: inline-block;
    padding-left: 0% !important;
    width: 33%;
    height:60px;
  }
  .entry{
		display: inline-block;
    padding-left: 0% !important;
    width: 33%;
    height:60px;
	}
  .moreTools{
    display: inline-block;
    position: absolute !important;
    top:0;
    right:0;
    width:30px !important;
  }
}
</style>