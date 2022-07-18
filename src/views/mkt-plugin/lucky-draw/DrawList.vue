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
            class="box bg-secondary relative hover:border-2 border-slate-500/50 text-left" >     
            <div class="flex flex-col xl:flex-row justify-between m-[0.7rem] p-5 lg:p-8 lucky-set">
                <div class="shrink flex w-fit flex-row justify-start"> 
                    <img class="shrink w-[75px] sm:w-[120px] object-cover mr-5" :src="storageUrl + luckydraw.animation" />
                    <div class="flex flex-col justify-start"> 
                        <span class="my-auto h-auto break-all">{{ luckydraw.prize.name }}</span>
                        <div class="text-slate-500 lg:hidden text-sm lg:text-lg"> 
                            {{ drawTitleMap[luckydraw.type] }} 
                            <span class="ml-3 text-slate-800" v-if="luckydraw.type == 'product'"> {{ luckydraw.campaign_product.name }} </span>
                            <span class="ml-3 text-slate-800" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap justify-start mt-5">  
                    <div class="border-r-2 border-slate-700 lg:flex flex-col justify-start lg:w-36 hidden pr-5">
                        <span class="my-1" v-if="luckydraw.type == 'product'"> {{ luckydraw.campaign_product.name }} </span>
                        <span class="my-1" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                        <span class="h-[28px] my-1" v-else> </span>
                        <span class="text-slate-500"> {{ drawTitleMap[luckydraw.type] }} </span>
                    </div>
                    <div class="shrink lg:border-r-2 border-slate-700 flex flex-row lg:flex-col w-[75px] sm:px-5 lg:w-36 text-sm lg:text-lg">
                        <span class="order-2 lg:order-1 lg:my-1"> {{ luckydraw.num_of_winner }} </span>
                        <div class="text-slate-500 mr-3 order-1 lg:order-2"> Winner(s) </div>
                    </div>
                    <div class="flex flex-row lg:flex-col flex-row lg:flex-col px-5 lg:w-44 text-sm lg:text-lg">
                        <span v-if="luckydraw.repeatable === true" class="order-2 lg:order-1 sm:my-1"> Yes </span> 
                        <span v-if="luckydraw.repeatable === false" class="order-2 lg:order-1 sm:my-1 "> No </span>
                        <span class="text-slate-500 mr-3 order-1 lg:order-2 whitespace-nowrap"> Winner Repeat</span>
                    </div>
                    <div class="mt-5 mx-auto">
                        <button class="btn btn-primary w-32 mt-auto h-[35px] sm:h-[42px] ml-auto" @click="goDraw(luckydraw.id)">
                            Start
                        </button>
                    </div>
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
    eventBus.emit('editDraw', { lucky_draw_id: lucky_draw_id })
    eventBus.emit('changeDrawPage')
}

const deleteDraw = (lucky_draw_id) => {
    delete_campaign_lucky_draw(lucky_draw_id).then(res => {
        router.go()
    }).catch(err => {
        console.log(err)
    })
}

</script>

<style scoped>

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

    /* .lucky-set {
        display: table !important;
        margin: 0.7rem !important;
    } */

    /* .lucky-td {
        border-right-width: 0px !important;
        width: 100%;
        display: inline-block;
        white-space: nowrap; 
    } */

    .lucky-button {
        margin: auto;
        margin-top: 5px;
    }
}

</style>