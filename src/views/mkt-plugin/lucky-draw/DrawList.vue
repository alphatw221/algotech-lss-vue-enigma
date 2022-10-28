<template>
    
    <div class="m-3 sm:m-5">
        <LoadingIcon v-if="processing" icon="three-dots" color="black" class="loading z-50 fixed h-[70px] w-[70px] top-0 bottom-0 right-[40%] my-auto"/>
        <div class="flex justify-between flex-col xl:flex-row gap-5 mb-10">
            <div class="flex justify-start font-medium">
                <label class="form-label mr-10 my-auto">{{ $t('lucky_draw.draw_list.campaign_title') }}</label>
                <h2 class="w-42 my-auto"> {{ props.campaignTitle }} </h2>
            </div>
            <div class="flex justify-end">
                <button class="btn btn-primary h-[35px] sm:h-[42px] my-auto mr-6 w-40" @click="toManageOrder()"> {{ $t(`campaign_live.incoming.manage_order` ) }} </button>
                <button class="btn btn-primary w-32 mr-0 sm:mr-3 h-[35px] sm:h-[42px]" @click="eventBus.emit('showWinnersList')">
                    {{ $t('lucky_draw.draw_list.all_winner') }}
                </button>
            </div>
        </div>
        <div v-for="(luckydraw, index) in props.luckydrawList" :key="index"
            class="box bg-[#f1f1f1] relative text-left" >     
            <div class="flex flex-row flex-wrap justify-start lg:justify-between m-[0.7rem] p-5 px-3 xl:p-5 lucky-set">
                <div class="flex flex-col xl:flex-row justify-start w-[70px] md:w-[100px] lg:w-[200px] mr-5 md:mr-10 lg:mr-20 xl:mr-5 my-auto"> 
                    <img class="h-[120px] object-cover xl:mr-5" :src="luckydraw.prize.image" />
                </div>
                <span class="h-auto w-40 break-words text-[16px] hidden 2xl:block">{{ luckydraw.prize.name }}</span>
                <div class="flex flex-col 2xl:flex-row flex-wrap justify-start xl:mt-5 w-[55%] xl:w-auto xl:ml-auto">  
                    <span class="mb-2 md:my-auto lg:-mt-2 lg:mb-2 2xl:hidden break-words w-full">{{ luckydraw.prize.name }}</span>
                    
                    <div class="flex flex-col xl:flex-row flex-wrap" > 
                        <div class="xl:border-r-2 border-white flex flex-row xl:flex-col w-full xl:pr-5 xl:w-36 xl:w-44 text-sm xl:text-xl justify-between xl:justify-center text-right">
                            <div> 
                                <span v-if="drawTitleMap[luckydraw.type] == 'Draw Like'" class="text-slate-500 whitespace-wrap mr-auto xl:mr-0"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }}</span>
                                <span v-else-if="drawTitleMap[luckydraw.type] == 'Draw Purchased'" class="text-slate-500 whitespace-nowrap mr-auto xl:mr-0"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }} </span>
                                <span v-else class="text-slate-500 order-1 whitespace-nowrap mr-0 hidden md:block"> {{ $t(`lucky_draw.draw_list.${luckydraw.type}`) }} </span>
                            </div>
                            <div class=" mr-auto xl:mr-0 xl:my-1"> 
                                <span class="text-[#E75F34]" v-if="luckydraw.type == 'product'"> ({{ luckydraw.campaign_product.order_code }}) {{ luckydraw.campaign_product.name }} </span>
                                <span class="text-[#E75F34]" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
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
                        v-if="props.luckyPrizeObj[luckydraw.prize.id] > 0"
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
                        <DropdownItem @click="editDraw(luckydraw.id)" class="w-24 text-center whitespace-nowrap text-[14px]" >
                            <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1" />  {{ $t('lucky_draw.draw_list.edit') }}</DropdownItem>
                        <DropdownItem @click="deleteDraw(luckydraw.id)" class="w-24 text-center text-danger whitespace-nowrap text-[14px]">
                            <SimpleIcon icon="delete" color="#b91c1c" class="mr-1" /> 
                            {{ $t('lucky_draw.draw_list.delete') }}
                        </DropdownItem> 
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>

        <!-- BEGIN: Winners Modal -->
        <WinnersModal />
        <!-- END: Winners Modal -->
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { delete_campaign_lucky_draw, list_campaign_lucky_draw_winners, draw_campaign_lucky_draw_check } from '@/api_v2/campaign_lucky_draw';
import WinnersModal from './WinnersModal.vue';
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import unbound from '/src/assets/images/lss-img/noname.png';
import i18n from "@/locales/i18n"
import { useCookies } from "vue3-cookies";
import SimpleIcon from '../../../global-components/lss-svg-icons/SimpleIcon.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const props = defineProps({
    luckydrawList: Object,
    campaignTitle: String,
    luckyPrizeObj: Object
})
const route = useRoute();
const router = useRouter();
const {cookies} = useCookies()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const layoutStore = useLSSSellerLayoutStore();
const drawTitleMap = ref({
    like: "Draw Like",
    purchase: "Draw Purchased",
    product: "Draw Product",
    keyword: "Draw Keyword" 
})
const accessToken = cookies.get('access_token')
const processing = ref(false)

onMounted(() => {
    console.log(props.luckyPrizeObj)
})

const toManageOrder = ()=>{
    router.push({ name: 'manage-order', params: { campaign_id: route.params.campaign_id}})
}

const goDraw = (lucky_draw) => {
    // need fix
    let lucky_draw_id = lucky_draw.id
    draw_campaign_lucky_draw_check(lucky_draw_id, layoutStore.alert).then(res=>{
        if (lucky_draw.type === "sharedpost") return startWebSocketConnection(lucky_draw_id)
        openDrawPage(lucky_draw_id)
        
    })
    
}
const openDrawPage = (lucky_draw_id) => {
    let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: lucky_draw_id}, query: {language: i18n.global.locale.value} })
    window.open(routeData.href, '_blank')
}

const editDraw = (lucky_draw_id) => {
    hideDropDown()
    eventBus.emit('editDraw', { lucky_draw_id: lucky_draw_id })
    eventBus.emit('changeDrawPage')
}

const deleteDraw = (lucky_draw_id) => {
    hideDropDown()
    let yes = confirm(`${i18n.global.t("lucky_draw.draw_list.confirm_delete")}`)
    if(yes){
        delete_campaign_lucky_draw(lucky_draw_id, layoutStore.alert).then(res => {
        router.go()
        }).catch(err => {
            console.log(err)
        })
    }
}


const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const startWebSocketConnection = (lucky_draw_id)=> {
    console.log("startWebSocketConnection")
    const websocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/lucky-draw/share-post/crawler/${lucky_draw_id}/?token=${accessToken}`
    );
    processing.value = true
    websocket.onmessage = e =>{
        const data = JSON.parse(e.data);

        if(data.type==="success_data"){
            console.log("success_data")
            openDrawPage(lucky_draw_id)
            console.log(data)
            processing.value = false
            websocket.close(1000)
        } 
        else if(data.type==="error_data"){
            console.log(data)
            layoutStore.alert.showMessageToast("something wrong")
            processing.value = false
            websocket.close(1000);
        } 
    };

    websocket.onopen = e => {
        websocket.send(JSON.stringify({"action": "start_crawler", "lucky_draw_id":lucky_draw_id}))
        console.log('socket connected')
    };

    websocket.onclose = e => {
        if(e.code!=1000){
            startWebSocketConnection(lucky_draw_id)
        }
        console.error('socket closed');
        processing.value = false
    };

    websocket.onerror = e => {
        console.log(e)
        console.error('Socket encountered error: ', e.message, 'Closing socket');
        websocket.close(1000);
    };
}

</script>
