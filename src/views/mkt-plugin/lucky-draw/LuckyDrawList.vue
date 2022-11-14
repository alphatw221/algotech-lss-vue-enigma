



<template>
    <div class="flex flex-col h-[100%] text-lg p-3 sm:px-10 sm:m-5 gap-3 sm:gap-0" v-if="ready">
        <div class="flex flex-col sm:flex-row justify-between sm:mx-5 gap-3"> 
            <h1  class="text-center sm:text-left text-xl sm:text-2xl font-medium my-auto"> {{ $t('lucky_draw.lucky_draw') }} </h1>

            <button
                class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 border-[2px] border-slate-100 shadow-lg"
                @click="routeToCreateLuckyDrawPage()" >
                <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('lucky_draw.draw_list.create') }}
            </button>
        </div>
        

        <div class="box sm:mx-5 sm:mt-3">
            <div class="m-3 sm:m-5">
                <LoadingIcon v-if="processing" icon="three-dots" color="black" class="loading z-50 fixed h-[70px] w-[70px] top-0 bottom-0 right-[40%] my-auto"/>
                
                <div class="flex justify-between flex-col xl:flex-row gap-5 mb-10">
                    <div class="flex justify-start font-medium">
                        <label class="form-label mr-10 my-auto">{{ $t('lucky_draw.draw_list.campaign_title') }}</label>
                        <h2 class="w-42 my-auto"> {{ campaignDetailStore.campaign?.title }} </h2>
                    </div>
                    <div class="flex justify-end">
                        <button class="btn btn-primary h-[35px] sm:h-[42px] my-auto mr-6 w-40" @click="toManageOrder()"> {{ $t(`campaign_live.incoming.manage_order` ) }} </button>
                        <button class="btn btn-primary w-32 mr-0 sm:mr-3 h-[35px] sm:h-[42px]" @click="eventBus.emit('showWinnersListModal')">
                            {{ $t('lucky_draw.draw_list.all_winner') }}
                        </button>
                    </div>
                </div>

                <div v-for="(luckydraw, index) in luckyDrawList" :key="index"
                    class="box bg-[#f1f1f1] relative text-left" >     
                    <div class="flex flex-row flex-wrap justify-start lg:justify-between m-[0.7rem] p-5 px-3 xl:p-5 lucky-set">
                        <div class="flex flex-col xl:flex-row justify-start w-[70px] md:w-[100px] lg:w-[200px] mr-5 md:mr-10 lg:mr-20 xl:mr-5 my-auto"> 
                            <img class="h-[120px] object-cover xl:mr-5" :src="luckydraw.prize?.image" />
                        </div>
                        <span class="h-auto w-40 break-words text-[16px] hidden 2xl:block">{{ luckydraw.prize?.name }}</span>
                        <div class="flex flex-col 2xl:flex-row flex-wrap justify-start xl:mt-5 w-[55%] xl:w-auto xl:ml-auto">  
                            <span class="mb-2 md:my-auto lg:-mt-2 lg:mb-2 2xl:hidden break-words w-full">{{ luckydraw.prize?.name }}</span>
                            
                            <div class="flex flex-col xl:flex-row flex-wrap" > 
                                <div class="xl:border-r-2 border-white flex flex-row xl:flex-col w-full xl:pr-5 xl:w-36 xl:w-44 text-sm xl:text-xl justify-between xl:justify-center text-right">
                                    <div> 
                                        <span v-if="luckydraw.type == DRAW_TYPE_LIKE" class="text-slate-500 whitespace-wrap mr-auto xl:mr-0"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }}</span>
                                        <span v-else-if="luckydraw.type == DRAW_TYPE_PURCHASE" class="text-slate-500 whitespace-nowrap mr-auto xl:mr-0"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }} </span>
                                        <span v-else class="text-slate-500 order-1 whitespace-nowrap mr-0 hidden md:block"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }} </span>
                                    </div>
                                    <div class=" mr-auto xl:mr-0 xl:my-1"> 
                                        <span class="text-[#E75F34]" v-if="luckydraw.type == DRAW_TYPE_PRODUCT"> ({{ luckydraw.campaign_product?.order_code }}) {{ luckydraw.campaign_product?.name }} </span>
                                        <span class="text-[#E75F34]" v-else-if="luckydraw.type == DRAW_TYPE_KEYWORD"> {{ luckydraw.comment }} </span>
                                    </div>
                                </div>
                                <div class="xl:border-r-2 border-white flex flex-row xl:flex-col w-full xl:px-5 xl:w-36 text-sm xl:text-xl justify-between xl:justify-center">
                                    <div class="text-slate-500 mr-3"> {{ $t('lucky_draw.draw_list.winners') }} </div>
                                    <span class="xl:my-1"> {{ luckydraw.num_of_winner }} </span>
                                </div>
                                <div class="flex flex-row xl:flex-col w-full xl:w-44 xl:px-5 text-sm xl:text-xl justify-between xl:justify-center">
                                    <span class="text-slate-500 mr-auto xl:mr-3 whitespace-nowrap"> {{ $t('lucky_draw.draw_list.winner_repeat') }} </span>
                                    <span v-if="luckydraw.repeatable === true" class="xl:order-1 xl:my-1"> {{ $t('lucky_draw.draw_list.yes') }} </span> 
                                    <span v-if="luckydraw.repeatable === false" class="xl:my-1 "> {{ $t('lucky_draw.draw_list.no') }} </span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 xl:mt-0 flex w-[100%] xl:w-fit ml-auto">
                            <button 
                                class="btn btn-primary w-full xl:w-32 mt-auto h-[35px] sm:h-[42px] ml-auto" 
                                @click="goDraw(luckydraw)"
                                
                                v-if=" campaignDetailStore.campaignProductDict[luckydraw.prize?.id.toString()]?.qty_sold + campaignDetailStore.campaignProductDict[luckydraw.prize?.id.toString()]?.qty_pending_payment + campaignDetailStore.campaignProductDict[luckydraw.prize?.id.toString()]?.qty_add_to_cart < campaignDetailStore.campaignProductDict[luckydraw.prize?.id.toString()]?.qty_for_sale "
                            >
                                {{ $t('lucky_draw.draw_list.start') }}
                            </button>
                            <button 
                                class="btn btn-secondary w-full xl:w-32 mt-auto h-[35px] sm:h-[42px] ml-auto" 
                                v-else
                                disabled
                            >
                                {{ $t('lucky_draw.draw_list.out_of_stock') }}
                            </button>
                        </div>
                    </div>
                    <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full whitespace-nowrap hover:bg-white p-1">
                        <DropdownToggle>
                            <MoreHorizontalIcon class="w-6 h-6" />
                        </DropdownToggle>
                        <DropdownMenu class="w-30">
                            <DropdownContent>
                                <DropdownItem @click="routeToEditLuckyDrawPage(luckydraw)" class="w-24 text-center whitespace-nowrap text-[14px]" >
                                    <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1" />  {{ $t('lucky_draw.draw_list.edit') }}</DropdownItem>
                                <DropdownItem @click="deleteLuckyDraw(luckydraw, index)" class="w-24 text-center text-danger whitespace-nowrap text-[14px]">
                                    <SimpleIcon icon="delete" color="#b91c1c" class="mr-1" /> 
                                    {{ $t('lucky_draw.draw_list.delete') }}
                                </DropdownItem> 
                            </DropdownContent>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                

            </div>
        </div>


    </div>

    <WinnersModal />

</template>



<script setup>
import { ref, onMounted, getCurrentInstance, onBeforeMount } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { delete_campaign_lucky_draw, list_campaign_lucky_draw_winners, draw_campaign_lucky_draw_check, list_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import WinnersModal from './WinnersModal.vue';
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import unbound from '/src/assets/images/lss-img/noname.png';
import i18n from "@/locales/i18n"
import { useCookies } from "vue3-cookies";
import SimpleIcon from '../../../global-components/lss-svg-icons/SimpleIcon.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

const campaignDetailStore = useCampaignDetailStore()
const luckyDrawList = ref([])
const ready = ref(false)
const route = useRoute();
const router = useRouter();
const {cookies} = useCookies()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const layoutStore = useLSSSellerLayoutStore();


const DRAW_TYPE_LIKE = 'like'
const DRAW_TYPE_PURCHASE = 'purchase'
const DRAW_TYPE_PRODUCT = 'product'
const DRAW_TYPE_KEYWORD = 'keyword'


const accessToken = cookies.get('access_token')
const processing = ref(false)

onBeforeMount(()=>{
    list_campaign_lucky_draw(route.params.campaign_id, layoutStore.alert).then(res => {
        luckyDrawList.value = res.data

        if(luckyDrawList.value.length>0){
            ready.value = true
        }else{
            routeToCreateLuckyDrawPage()
        }
        
    })
})

// onMounted(() => {
//     list_campaign_lucky_draw(route.params.campaign_id, layoutStore.alert).then(res => {
//         luckyDrawList.value = res.data
//         ready.value = true
//     })
// })

const routeToCreateLuckyDrawPage = ()=>{
    router.push({ name: 'create-lucky-draw', params: { campaign_id: route.params.campaign_id}})
}

const toManageOrder = ()=>{
    router.push({ name: 'manage-campaign-order', params: { campaign_id: route.params.campaign_id}})
}

const goDraw = (lucky_draw) => {
    let lucky_draw_id = lucky_draw.id
    draw_campaign_lucky_draw_check(lucky_draw_id, layoutStore.alert).then(res=>{
        openDrawPage(lucky_draw)
    })
    
}
const openDrawPage = (lucky_draw) => {
    let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: lucky_draw.id}, query: {language: i18n.global.locale.value} })
    window.open(routeData.href, '_blank')
}

const routeToEditLuckyDrawPage = (lucky_draw) => {
    hideDropDown()
    router.push({ name: 'edit-lucky-draw', params: { campaign_id: route.params.campaign_id, lucky_draw_id: lucky_draw.id}})
}

const deleteLuckyDraw = (lucky_draw, index) => {
    hideDropDown()
    let yes = confirm(`${i18n.global.t("lucky_draw.draw_list.confirm_delete")}`)
    if(yes){
        delete_campaign_lucky_draw(lucky_draw.id, layoutStore.alert).then(res => {
            luckyDrawList.value.splice(index,1)

        })
    }
}


const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

// const startWebSocketConnection = (lucky_draw_id)=> {
//     console.log("startWebSocketConnection")
//     const websocket = new WebSocket(
//         `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/lucky_draw/share_post/crawler/${lucky_draw_id}/?token=${accessToken}`
//     );
//     processing.value = true
//     websocket.onmessage = e =>{
//         const data = JSON.parse(e.data);

//         if(data.type==="success_data"){
//             console.log("success_data")
//             openDrawPage(lucky_draw_id)
//             console.log(data)
//             processing.value = false
//             websocket.close(1000)
//         } 
//         else if(data.type==="error_data"){
//             console.log(data)
//             layoutStore.alert.showMessageToast("something wrong")
//             processing.value = false
//             websocket.close(1000);
//         } 
//     };

//     websocket.onopen = e => {
//         websocket.send(JSON.stringify({"action": "start_crawler", "lucky_draw_id":lucky_draw_id}))
//         console.log('socket connected')
//     };

//     websocket.onclose = e => {
//         if(e.code!=1000){
//             startWebSocketConnection(lucky_draw_id)
//         }
//         console.error('socket closed');
//         processing.value = false
//     };

//     websocket.onerror = e => {
//         console.log(e)
//         console.error('Socket encountered error: ', e.message, 'Closing socket');
//         websocket.close(1000);
//     };
// }

</script>
