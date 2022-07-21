<template>
    <div class="m-3 sm:m-5">
        <div class="flex justify-between flex-col lg:flex-row gap-5 mb-10">
            <div class="flex justify-start">
                <label class="form-label mr-10">Campaign Title</label>
                <h2 class="w-42"> {{ props.campaignTitle }} </h2>
            </div>
            <div class="flex justify-between">
                <button class="btn btn-primary w-32 mr-0 sm:mr-3 h-[35px] sm:h-[42px]" @click="eventBus.emit('showWinnersList')">
                    All Winners
                </button>
                <button class="btn btn-primary w-32 ml-auto h-[35px] sm:h-[42px]" @click="existsDrawlist = eventBus.emit('changeDrawPage')">
                    Create
                </button>
            </div>
        </div>
        <div v-for="(luckydraw, index) in props.luckydrawList" :key="index"
            class="box bg-[#f1f1f1] relative text-left" >     
            <div class="flex flex-row flex-wrap justify-start lg:justify-between m-[0.7rem] p-5 px-3 lg:p-5 lucky-set">
                <div class="flex flex-col xl:flex-row justify-start w-[70px] lg:w-[120px] mr-5 my-auto"> 
                    <img class="h-[120px] object-cover lg:mr-5" :src="storageUrl + luckydraw.animation" />
                    <span class="h-auto w-40 break-words text-[16px] hidden lg:block">{{ luckydraw.prize.name }}</span>
                </div>
                <div class="flex flex-col lg:flex-row flex-wrap justify-start md:mt-5 w-[55%] lg:w-auto lg:ml-auto">  
                    <span class="my-auto lg:hidden break-words w-full">{{ luckydraw.prize.name }}</span>

                    <div class="lg:border-r-2 border-white flex flex-row lg:flex-col w-full lg:pr-5 lg:w-36 xl:w-44 text-sm lg:text-lg justify-between lg:justify-center text-right">
                        <div> 
                            <span v-if="drawTitleMap[luckydraw.type] == 'Draw Like'" class="text-slate-500 whitespace-nowrap mr-auto lg:mr-0"> {{ drawTitleMap[luckydraw.type] }} </span>
                            <span v-else-if="drawTitleMap[luckydraw.type] == 'Draw Purchased'" class="text-slate-500 whitespace-nowrap mr-auto lg:mr-0"> {{ drawTitleMap[luckydraw.type] }} </span>
                            <span v-else class="text-slate-500 order-1 whitespace-nowrap mr-auto lg:mr-0 hidden md:block"> {{ drawTitleMap[luckydraw.type] }} </span>
                        </div>
                        <div class="h-[22px] lg:h-[28px] lg:my-1"> 
                            <span class="text-[#E75F34]" v-if="luckydraw.type == 'product'"> ({{ luckydraw.campaign_product.order_code }}) {{ luckydraw.campaign_product.name }} </span>
                            <span class="text-[#E75F34]" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                        </div>
                    </div>
                    <div class="lg:border-r-2 border-white flex flex-row lg:flex-col w-full lg:px-5 lg:w-36 text-sm lg:text-lg justify-between lg:justify-center">
                        <div class="text-slate-500 mr-3"> Winner(s) </div>
                        <span class="lg:my-1"> {{ luckydraw.num_of_winner }} </span>
                    </div>
                    <div class="flex flex-row lg:flex-col w-full lg:w-44 lg:px-5 text-sm lg:text-lg justify-between lg:justify-center">
                        <span class="text-slate-500 mr-auto lg:mr-3 whitespace-nowrap"> Winner Repeat</span>
                        <span v-if="luckydraw.repeatable === true" class="lg:order-1 lg:my-1"> Yes </span> 
                        <span v-if="luckydraw.repeatable === false" class="lg:my-1 "> No </span>
                    </div>
                </div>
                <div class="mt-5 xl:m-0 flex w-[100%] 2xl:w-fit justify-end">
                    <button class="btn btn-primary w-full lg:w-32 mt-auto h-[35px] sm:h-[42px] ml-auto" @click="goDraw(luckydraw.id)">
                        Start
                    </button>
                </div>
            </div>
            <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full hover:bg-white p-1">
                <DropdownToggle>
                    <MoreHorizontalIcon class="w-6 h-6" />
                </DropdownToggle>
                <DropdownMenu class="w-30">
                    <DropdownContent>
                        <DropdownItem @click="editDraw(luckydraw.id)">Edit</DropdownItem>
                        <DropdownItem @click="deleteDraw(luckydraw.id)">Delete</DropdownItem>
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
import { delete_campaign_lucky_draw, list_campaign_lucky_draw_winners } from '@/api_v2/campaign_lucky_draw';
import WinnersModal from './WinnersModal.vue';
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import unbound from '/src/assets/images/lss-img/noname.png';

const props = defineProps({
    luckydrawList: Object,
    campaignTitle: String
})
const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const drawTitleMap = ref({
    like: "Draw Like",
    purchase: "Draw Purchased",
    product: "Draw Product",
    keyword: "Draw Keyword" 
})


const goDraw = (lucky_draw_id) => {
    let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: lucky_draw_id} })
    window.open(routeData.href, '_blank')
}

const editDraw = (lucky_draw_id) => {
    hideDropDown()
    eventBus.emit('editDraw', { lucky_draw_id: lucky_draw_id })
    eventBus.emit('changeDrawPage')
}

const deleteDraw = (lucky_draw_id) => {
    hideDropDown()
    delete_campaign_lucky_draw(lucky_draw_id).then(res => {
        router.go()
    }).catch(err => {
        console.log(err)
    })
}
const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

</script>
