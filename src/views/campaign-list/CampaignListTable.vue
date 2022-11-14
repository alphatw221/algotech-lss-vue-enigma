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
            <div v-else-if="column.key === 'title'" class="sm:w-[100px]"> {{ $t(`campaign_list.campaign_list_table.`+column.name) }} </div>
            <template v-else> 
              {{ $t(`campaign_list.campaign_list_table.`+column.name) }}
            </template>
          </th>
          <th v-if="campaignStatus === 'ongoing' || campaignStatus === 'scheduled'" ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="showCampaignLoding || numOfCampaigns==0" >
					<td v-if="showCampaignLoding"
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
								{{ $t('campaign_list.campaign_list_table.no_have_campaign.' +props.campaignStatus) }}
							</h1>
							<!-- <h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('campaign_list.campaign_list_table.click_create_notify') }}
							</h1> -->
              <button 
                class="flex w-60 h-[35px] text-lg sm:h-[42px] text-white btn btn-rounded mx-auto mt-5"
                      style="border: 2px solid #EF4444; color:#EF4444;"
                      @click="router.push({name:'platform'})" v-if="computedUserGotPlatform"> 
                {{$t('campaign_list.campaign_list_table.connect_platform')}}
              </button>
						</div>
					</td> 
				</tr>
        <tr v-for="(campaign, index) in campaigns" :key="index" class="intro-x">
          <td class="items-center min-w-12 fan_page">
            <div class="flex justify-center w-full">
              <div class="border-0 w-14 h-14 flex-0 zoom-in" v-if="campaign.facebook_page !== null">
                <Tippy tag="img" class="border-0 rounded-full" :src="campaign.facebook_page.image" @error="getFacebookPageProfilePicture(campaign.facebook_page)"
                  :content="campaign.facebook_page.name" />
                  <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                  </div>
              </div>
              <div class="w-14 h-14 flex-0 zoom-in" v-if="campaign.instagram_profile !== null">
                <Tippy tag="img" class="rounded-full " :src="campaign.instagram_profile.image" @error="getInstagramProfilePicture(campaign.instagram_profile)"
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
              <div class="w-14 h-14 flex-0 zoom-in" v-if="campaign.tiktok_campaign.username">
                <Tippy tag="img" class="rounded-full" :src="anonymous_profile"
                  :content="campaign.tiktok_campaign.username" />
                  <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                      <img class="rounded-full bg-[#0f0f0f]" :src="tiktok_platform" >
                  </div>
              </div>
            </div>
          </td>
          <td class="text-left title w-fit">
            {{ campaign.title }}
          </td>
          <td class="w-5 text-center startDate" :data-content="$t('campaign_list.campaign_list_table.start_at')">
            <div class="my-2 sm:my-0 sm:w-fit whitespace-nowrap">{{ new Date(campaign.start_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short", hour12: false,
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td> 
          <td class="w-5 text-center endDate" :data-content="$t('campaign_list.campaign_list_table.end_at')">
            <div class="my-2 sm:my-0 sm:w-fit whitespace-nowrap" >{{ new Date(campaign.end_at).toLocaleTimeString('en-us', {
                year: "numeric", month: "short", hour12: false,
                day: "numeric", hour: '2-digit', minute: '2-digit'
              })
            }}</div>
          </td>
          <td class="items-center manage_order w-fit" :data-content="$t('campaign_list.campaign_list_table.action')">
            <a v-if="layoutStore.userInfo.user_subscription.status === SANDBOX_MODE" class="flex items-center justify-center cursor-not-allowed">
              <span class="mr-3 sm:hidden"> {{$t('campaign_list.campaign_list_table.manage_order')}}</span>
              <Tippy  :content="$t('campaign_list.campaign_list_table.manage_order')" :options="{ theme: 'light' }">
                <!-- <font-awesome-icon icon="fa-solid fa-list-check" class="self-center w-8 h-[24px]"/>  -->
                <SimpleIcon icon="manage_order" color="#b3bbc4" width="30" height="32" />
              </Tippy> 
            </a>
            <a v-else class="flex items-center justify-center" @click="routeToManageOrder(campaign)">
              <span class="mr-3 sm:hidden"> {{$t('campaign_list.campaign_list_table.manage_order')}}</span>
              <Tippy  :content="$t('campaign_list.campaign_list_table.manage_order')" :options="{ theme: 'light' }">
                <!-- <font-awesome-icon icon="fa-solid fa-list-check" class="self-center w-8 h-[24px]"/>  -->
                <SimpleIcon icon="manage_order" color="#2d8cf0" width="30" height="32" />
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
                      <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
                      {{$t("campaign_list.campaign_list_table.edit_campaign")}} 
                    </DropdownItem>
                    <DropdownItem class="w-fit text-center whitespace-nowrap" 
                      @click="editCampaignProduct(campaign)"> 
                      <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
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
                        <div class="whitespace-nowrap flex"> 
                          <SimpleIcon icon="express_cart" color="#2d8cf0" class="mr-1"/>
                          {{$t("campaign_list.campaign_list_table.blank_cart")}}  </div> 
                      </Tippy> 
                    </DropdownItem>
                    <DropdownItem 
                      @click="goLuckyDraw(campaign)" class="w-fit whitespace-nowrap"> 
                      <SimpleIcon icon="lucky_draw" color="#2d8cf0" class="mr-1"/>
                      {{$t("campaign_list.campaign_list_table.lucky_draw")}}
                    </DropdownItem>
                    <DropdownItem 
                      @click="goQuizGame(campaign)" class="w-fit whitespace-nowrap"> 
                      <!-- <font-awesome-icon icon="fa-solid fa-gift" class="h-[20px] w-[20px] mr-1"/> -->
                      <SimpleIcon icon="quiz" color="#2d8cf0"/>
                      <div class="ml-1"> {{$t("campaign_list.campaign_list_table.quiz_game")}} </div> 
                    </DropdownItem>
                    <DropdownItem 
                      @click="deleteCampaign(campaign)" class="w-fit text-danger whitespace-nowrap">
                      <!-- <font-awesome-icon icon="fa-solid fa-trash-can" class="h-[20px] w-[20px] mr-1"/> -->
                      <SimpleIcon icon="delete" color="#b91c1c" class="mr-1"/>
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
      <Page class="mx-auto my-3" :total="dataCount" :page-size="page_size" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { toggle_stop_checkout, list_campaign, delete_campaign } from "@/api_v2/campaign"
import {defineProps, onMounted, onUnmounted, getCurrentInstance, ref, defineEmits, computed} from 'vue'
import { useRoute, useRouter } from "vue-router";
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"
import { get_fb_page_profile_picture } from '@/api_v2/facebook'
import { get_ig_profile_picture } from '@/api_v2/instagram'


import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import twitch_platform from "/src/assets/images/lss-img/twitch.png"
import tiktok_platform from "/src/assets/images/lss-img/tiktok_black_bg.png"
import anonymous_profile from "/src/assets/images/lss-img/noname.png"
import unbound from "/src/assets/images/lss-img/noname.png"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"
import SimpleIcon from "../../global-components/lss-svg-icons/SimpleIcon.vue";

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

const baseURL = import.meta.env.VITE_APP_WEB
const currentPage= ref(1)
const totalPage= ref(1)
const page_size= ref(20)
const dataCount= ref(0)
const searchColumn= ref('')
const keyword= ref('')
const order_by= ref("created_at")
const checkout= ref(true)
const layoutStore = useLSSSellerLayoutStore()
const showCampaignLoding = ref(true)

const SANDBOX_MODE = "test"

const campaigns=ref([])
const numOfCampaigns = computed(()=>Object.keys(campaigns.value).length)
onMounted(()=>{
  search()
  // checkPage()
  showCampaignLoding.value = true
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
    showCampaignLoding.value = true
    campaigns.value = []
    list_campaign(props.campaignStatus, searchColumn.value, keyword.value, order_by.value, currentPage.value, page_size.value, layoutStore.alert)
    .then((response) => {
        if (response.data.count != undefined) {
          dataCount.value = response.data.count;
        }
        campaigns.value = response.data.results
        showCampaignLoding.value = false
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
  // console.log(index)
  if(props.campaignStatus === 'history'){
    router.push({name:'campaign-live',params:{'campaign_id':campaign.id}, query:{'status':props.campaignStatus}})
    return
  }
  else if (campaign.facebook_campaign.post_id !== '' || campaign.instagram_campaign.live_media_id !== '' || campaign.youtube_campaign.live_video_id !== '' || campaign.twitch_campaign.channel_name !== '' || campaign.tiktok_campaign.username !== '') {
    router.push({name:'campaign-live',params:{'campaign_id':campaign.id}, query:{'status':props.campaignStatus}})
    return
  }
  eventBus.emit('showRemindEnterPostIDModal',{ 'tableName': props.tableName, 'campaign':campaign})
}

const stop_checkout = (index, campaign)=>{
      toggle_stop_checkout(campaign.id, layoutStore.alert).then(res=>{
        campaigns.value[index] = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('campaign_list.update_successed'));
      })
      
    }

const routeToManageOrder = (campaign)=>{ router.push({name:'manage-campaign-order',params:{'campaign_id':campaign.id}})}

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
      layoutStore.notification.showMessageToast(i18n.global.t("campaign_list.copied"))
  })
  hideDropDown()
}

const goLuckyDraw = (campaign) => {
  router.push({name:'lucky-draw-list',params:{'campaign_id':campaign.id}})
  hideDropDown()
}

const goQuizGame = (campaign) => {
  router.push({name:'quiz-game',params:{'campaign_id':campaign.id}})
  hideDropDown()
}

const computedUserGotPlatform = computed(()=>{
  if(layoutStore.userInfo?.user_subscription?.facebook_pages?.length||0 != 0) return false
  if(layoutStore.userInfo?.user_subscription?.youtube_channels?.length||0 != 0) return false
  if(layoutStore.userInfo?.user_subscription?.instagram_profiles?.length||0 != 0) return false
  // if(layoutStore.userInfo?.user_subscription?.twitch_channels?.length||0 != 0) return false
  // if(layoutStore.userInfo?.user_subscription?.tiktok_accounts?.length||0 != 0) return false
  return true
})
// const checkPage = ()=>{
//   get_user_subscription_facebook_pages(layoutStore.alert).then(res=>{
//     if(res.data.length !== 0) checkPagePonit.value = false
//     else get_user_subscription_instagram_profiles(layoutStore.alert).then(res=>{
//       if(res.data.length !== 0) checkPagePonit.value = false
//       else get_user_subscription_youtube_channels(layoutStore.alert).then(res=>{
//         if(res.data.length !== 0) checkPagePonit.value = false
//       })
//     })
//   })
// }

const deleteCampaign = (campaign)=>{
  let yes = confirm(`${i18n.global.t("campaign_list.campaign_list_table.confirm_delete")}`)
	if(yes) delete_campaign(campaign.id, layoutStore.alert).then(res => { search() })
  hideDropDown()
}

const getFacebookPageProfilePicture = (facebook_page) => {
    console.log("on error")
    get_fb_page_profile_picture(facebook_page.id).then(res=> {
        facebook_page.image = res.data;
    }).catch(err=> {
        facebook_page.image = null;
    })
}

const getInstagramProfilePicture = (instagram_profile) => {
    console.log("on error")
    get_ig_profile_picture(instagram_profile.id).then(res=> {
        instagram_profile.image = res.data;
    }).catch(err=> {
        instagram_profile.image = null;
    })
}
</script>


<style scoped>
.click-icon:hover {
  cursor: pointer;
}

a .dropdown-item{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
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