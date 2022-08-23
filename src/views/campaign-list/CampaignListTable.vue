<template>
  <div class="overflow-x-hidden sm:overflow-auto sm:h-[62vh] mt-4">
    <table class="table -mt-3 table-report">
      <thead>
        <tr>
          <th class="text-center whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
            <template v-if="column.key === 'stop'"> 
              <div class="flex align-middle"> 
                <span class="my-auto"> {{ $t(`campaign_list.campaign_list_table.`+column.name) }} </span> 
                <Tippy 
                  class="rounded-full w-fit whitespace-wrap ml-1 my-auto" 
                  data-tippy-allowHTML="true" 
                  data-tippy-placement="right" 
                  :content="$t('tooltips.campaign_list.stop_checkout')" 
                > 
                  <HelpCircleIcon class="w-5 tippy-icon" />
                </Tippy> 
              </div>
            </template>
            <template v-else> 
              {{ $t(`campaign_list.campaign_list_table.`+column.name) }}
            </template>
          </th>
          <th v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="showCommentLoding || numOfCampaigns==0" >
					<td v-if="showCommentLoding"
						class="h-[300px] items-center relative tdDot"
						:colspan="tableColumns.length +1" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
          <td v-else-if="keyword != '' && numOfCampaigns==0" :colspan="tableColumns.length +1" class="alert border-0 "> 
						<div class="mt-5 text-center md:mt-10 w-full" >
							<h1 class="text-slate-500 text-center text-sm md:text-lg h-[300px] pt-20">
								{{$t('campaign_list.campaign_list_table.no_result')}}
							</h1>
						</div>
					</td> 
					<td v-else-if="numOfCampaigns==0" :colspan="tableColumns.length +1" class="alert border-0 "> 
						<div class="mt-5 text-center md:mt-40 w-full" >
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('campaign_list.campaign_list_table.no_have_campaign') }}
							</h1>
							<h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('campaign_list.campaign_list_table.click_create_notify') }}
							</h1>
              <button 
                class="flex w-60 h-[35px] text-lg sm:h-[42px] text-white btn btn-rounded mx-auto mt-5"
                      style="border: 2px solid #EF4444; color:#EF4444;"
                      @click="router.push({name:'platform'})" v-if="checkPagePonit"> 
                {{$t('campaign_list.campaign_list_table.connect_platform')}}
              </button>
						</div>
					</td> 
				</tr>
        <tr v-for="(campaign, index) in campaigns" :key="index" class="intro-x">
          <td class="items-center min-w-12 fan_page">
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
              <div class="w-14 h-14 flex-0 zoom-in" v-if="campaign.twitch_channel !== null">
                <Tippy tag="img" class="rounded-full" :src="campaign.twitch_channel.image"
                  :content="campaign.twitch_channel.name" />
                  <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#f70000]" :src="twitch_platform" >
                  </div>
              </div>
            </div>
          </td>
          <td class="text-left title w-fit">
            {{ campaign.title }}
          </td>
          <td class="w-5 text-center startDate" :data-content="$t('campaign_list.campaign_list_table.start_at')">
            <div class="my-2 sm:my-0 sm:w-40">{{ new Date(campaign.start_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short", hour12: false,
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="w-5 text-center endDate" :data-content="$t('campaign_list.campaign_list_table.end_at')">
            <div class="my-2 sm:my-0 sm:w-40">{{ new Date(campaign.end_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short", hour12: false,
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="items-center manage_order w-fit" :data-content="$t('campaign_list.campaign_list_table.action')">
            <a class="flex items-center justify-center" @click="routeToManageOrder(campaign)">
              <span class="mr-3 sm:hidden"> {{$t('campaign_list.campaign_list_table.manage_order')}}</span>
              <Tippy  :content="$t('campaign_list.campaign_list_table.manage_order')" :options="{ theme: 'light' }">
                <font-awesome-icon icon="fa-solid fa-list-check" class="self-center w-8 h-[24px]"/> 
              </Tippy> 
                  
            </a>
          </td>
          <td class="items-center checkout w-fit" :data-content="$t('campaign_list.campaign_list_table.stop')">
            <Tippy 
              class="rounded-full w-fit whitespace-wrap ml-1 my-auto md:hidden tippy-mobile" 
              data-tippy-allowHTML="true" 
              data-tippy-placement="right" 
              :content="$t('tooltips.campaign_list.stop_checkout')" 
            > 
              <HelpCircleIcon class="w-5 tippy-icon md:hidden tippy-mobile" />
            </Tippy> 
            <div  v-if="campaignStatus === 'history'" 
              class="flex flex-col justify-center form-check form-switch">
              <input  id="selectCheckbox" class="form-check-input center" type="checkbox" disabled v-model="checkout" />
            </div>
            <div v-else
              class="flex flex-col justify-center form-check form-switch">
               <input @click="stop_checkout(index, campaign)" class="mr-0 form-check-input" type="checkbox" v-model="campaign.stop_checkout"/>
            </div>
          </td>
          <td class="justify-center text-center entry w-fit">
            <button 
              v-if="campaignStatus === 'history'"
              class="w-full sm:w-24 mr-1 btn btn-elevated-rounded-pending h-[42px]" @click="clickEntry(index)">
              {{$t('campaign_list.campaign_list_table.history')}}
            </button>
            <button 
              v-else
              class="w-full sm:w-24 mr-1 btn btn-elevated-rounded-pending h-[42px]" @click="clickEntry(index)">
              {{$t('campaign_list.campaign_list_table.live_on')}}
            </button>
          </td>
          <td
            v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" 
            class="text-center moreTools w-fit">
            <Tippy  :content="$t('campaign_list.campaign_list_table.more')" :options="{ theme: 'light' }">
              <Dropdown placement="bottom-start">
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="max-w-60 pt-2">
                  <DropdownContent class="w-44 text-center">
                    <DropdownItem class="w-fit text-center whitespace-nowrap" 
                      @click="editCampaign(campaign)"> 
                      <EditIcon class="h-[20px] w-[20px] mr-1" />
                      {{$t("campaign_list.campaign_list_table.edit_campaign")}} 
                    </DropdownItem>
                    <DropdownItem class="w-fit text-center whitespace-nowrap" 
                      @click="editCampaignProduct(campaign)"> 
                      <EditIcon class="h-[20px] w-[20px] mr-1" />
                      {{$t("campaign_list.campaign_list_table.edit_campaign_product")}}  
                    </DropdownItem>
                    <DropdownItem 
                      @click="copyURL(campaign)" class="w-fit whitespace-nowrap"> 
                      <Tippy 
                        class="whitespace-nowrap w-full" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        :content="$t('tooltips.campaign_list.instant_cart')" 
                        > 
                        <div class="whitespace-nowrap flex"> <ShoppingCartIcon class="h-[20px] w-[18px] mr-1" />  {{$t("campaign_list.campaign_list_table.blank_cart")}}  </div> 
                      </Tippy> 
                    </DropdownItem>
                    <DropdownItem 
                      @click="goLuckyDraw(campaign)" class="w-fit whitespace-nowrap"> 
                      <font-awesome-icon icon="fa-solid fa-gift" class="h-[20px] w-[20px] mr-1"/>
                      {{$t("campaign_list.campaign_list_table.lucky_draw")}}
                    </DropdownItem>
                    <DropdownItem 
                      @click="goQuizGame(campaign)" class="w-fit whitespace-nowrap"> 
                      <!-- <font-awesome-icon icon="fa-solid fa-gift" class="h-[20px] w-[20px] mr-1"/> -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#2d8cf0">
                          <path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 
                              1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 
                              10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 
                              4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm1.024 13.975c0 .566-.458 1.025-1.024 1.025-.565
                              0-1.024-.459-1.024-1.025 0-.565.459-1.024 1.024-1.024.566 0 1.024.459 1.024 1.024zm1.141-8.192c-.498-.505-1.241-.783-2.09-.783-1.786
                                0-2.941 1.271-2.941 3.237h1.647c0-1.217.68-1.649 1.261-1.649.519 0 1.07.345 1.117 1.004.052.694-.319 1.046-.788 1.493-1.157 1.1-1.179
                                1.633-1.173 2.842h1.643c-.01-.544.025-.986.766-1.785.555-.598 1.245-1.342 1.259-2.477.008-.758-.233-1.409-.701-1.882z"/>
                      </svg>
                      <div class="ml-1"> {{$t("campaign_list.campaign_list_table.quiz_game")}} </div> 
                    </DropdownItem>
                    <DropdownItem 
                      @click="deleteCampaign(campaign)" class="w-fit text-danger whitespace-nowrap ">
                      <font-awesome-icon icon="fa-solid fa-trash-can" class="h-[20px] w-[20px] mr-1"/>
                      {{$t("campaign_list.campaign_list_table.delete")}}
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown> 
              </Tippy> 
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap mb-10">
      <Page class="mx-auto my-3" :total="totalPage" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { toggle_stop_checkout, list_campaign, delete_campaign } from "@/api_v2/campaign"
import {defineProps, onMounted, onUnmounted, getCurrentInstance, ref, defineEmits, computed} from 'vue'
import { useRoute, useRouter } from "vue-router";
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import twitch_platform from "/src/assets/images/lss-img/twitch.png"
import unbound from "/src/assets/images/lss-img/noname.png"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"

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
const page_size= ref(100)
const dataCount= ref(0)
const searchColumn= ref('')
const keyword= ref('')
const order_by= ref("created_at")
const checkout= ref(true)
const layoutStore = useLSSSellerLayoutStore()
const showCommentLoding = ref(true)
const checkPagePonit = ref(true)

const campaigns=ref([])
const numOfCampaigns = computed(()=>Object.keys(campaigns.value).length)
onMounted(()=>{
  search();
  showCommentLoding.value = true
  eventBus.on(props.tableName, (payload) => {
    currentPage.value = 1; 
    searchColumn.value = payload.searchColumn;
    keyword.value = payload.keyword;
    page_size.value = payload.pageSize;
    // order_by.value = payload.order_by;
    search();
  })
  // startFromToast();
  
})

onUnmounted(()=>{
  eventBus.off(props.tableName);
})


const search =()=>{
    showCommentLoding.value = true
    campaigns.value = []
    list_campaign(props.campaignStatus,searchColumn.value,keyword.value,order_by.value,currentPage.value,'100')
    .then((response) => {
        if (response.data.count != undefined) {
          dataCount.value = response.data.count;
          const _totalPage = parseInt(response.data.count / page_size.value);
          totalPage.value = _totalPage == 0 ? 1 : _totalPage;
        }
        campaigns.value = response.data.results
        showCommentLoding.value = false

        if (!campaigns.value) checkPage();
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
  console.log(index)
  if(props.campaignStatus === 'history'){
    router.push({name:'campaign-live',params:{'campaign_id':campaign.id}, query:{'status':props.campaignStatus}})
    return
  }
  else if (campaign.facebook_campaign.post_id !== '' || campaign.instagram_campaign.live_media_id !== '' || campaign.youtube_campaign.live_video_id !== '') {
    router.push({name:'campaign-live',params:{'campaign_id':campaign.id}, query:{'status':props.campaignStatus}})
    return
  }
  eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': props.tableName, 'campaign':campaign})
}

const stop_checkout = (index, campaign)=>{
      toggle_stop_checkout(campaign.id).then(res=>{
        campaigns.value[index] = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('campaign_list.update_successed'));
      })
      
    }

const routeToManageOrder = (campaign)=>{ router.push({name:'manage-order',params:{'campaign_id':campaign.id}})}

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const editCampaign = (campaign)=>{
  router.push({name:'edit-campaign', params: {'campaign_id':campaign.id}})
  hideDropDown()
}
const editCampaignProduct = campaign=>{
  router.push({name:'edit-campaign-product', params: {'campaign_id':campaign.id}})
  hideDropDown()

}
const copyURL = (campaign)=>{
  text = `${baseURL}/buyer/recaptcha/blank/${campaign.id}`;
  navigator.clipboard.writeText(text).then(()=>{
      alert('copied!')
  })
  hideDropDown()
}

const goLuckyDraw = (campaign) => {
  router.push({name:'lucky-draw',params:{'campaign_id':campaign.id}})
  hideDropDown()
}

const goQuizGame = (campaign) => {
  router.push({name:'quiz-game',params:{'campaign_id':campaign.id}})
  hideDropDown()
}

const checkPage = ()=>{
  get_user_subscription_facebook_pages().then(res=>{
    if(res.data.length !== 0) checkPagePonit.value = false
    else get_user_subscription_instagram_profiles().then(res=>{
      if(res.data.length !== 0) checkPagePonit.value = false
      else get_user_subscription_youtube_channels().then(res=>{
        if(res.data.length !== 0) checkPagePonit.value = false
      })
    })
  })
}

const deleteCampaign = (campaign)=>{
  let yes = confirm(`${i18n.global.t("campaign_list.campaign_list_table.confirm_delete")}`)
	if(yes) delete_campaign(campaign.id).then(res => { search() })
  hideDropDown()
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
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.tdDot{
	box-shadow: none !important;
}

.alert{
  box-shadow: none !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

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
    border-bottom: 2px solid #dddddd; 
    margin-top: 25px;
    padding-bottom: 10px !important;
    position: relative;
  }

  td {
    position: relative;
    display: flex;
    text-align: center;
    box-shadow: none !important;
    align-items: center;
    justify-content:flex-end;
    background-color: white !important;
    min-height: 35px;
    border: none;
		padding-left: 50% !important;
    width: 100%;
    padding-right: 10px; 
  }

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
    padding-right: 10px;
		white-space: nowrap;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
    text-align:left;
	}

  .fan_page{
    display: inline-block;
    padding-left: 0px !important;

  }
  .fan_page:before{
    display:none;
  }

  .title:before{
    display:none;
  }
  .title {
    width:100%;
    display: inline-block;
    font-weight:600;
    color:theme("colors.primary");
    min-height: 35px !important;
    padding-left: 0px !important;
  }
  .startDate:before {
    content: attr(data-content); 
  }
  
  .endDate:before {
    content: attr(data-content); 
  }

  .manage_order:before{
    content:"Action"; 
  }
  .checkout:before{
    content: attr(data-content); 
  }
  .entry:before{
		display: none;
	}
  .entry{
		display: inline-block;
    padding-left: 0px !important;
	}
  .moreTools{
    display: inline-block;
    position: absolute !important;
    padding-left: 0px !important;
    top:0;
    right:0;
    width:30px !important;
  }
  .moreTools:before{
    display:none;
  }

  .dotTr{
    border: none;
  }
  .alert:before{
    display: none;
  }
  .alert{
    width: 100%;
    padding-left: 0px !important;
    box-shadow: none;
  }

  .tippy-mobile{
		position: absolute;
		left:53px; 
		top:2.5px;
	}
}
</style>