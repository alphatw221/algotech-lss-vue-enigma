<template>
    <div>
        <div class="mt-5 flex justify-between">
            <div>
                <label class="form-label mr-10">Campaign Title</label>
                <h2 style="display: inline-block;"> {{ props.campaignTitle }} </h2>
            </div>
            <div>
                <button class="btn btn-primary w-32 mt-auto mr-3" @click="eventBus.emit('showWinnersList')">
                    All Winners
                </button>
                <button class="btn btn-primary w-32 mt-auto lucky-create" @click="existsDrawlist = eventBus.emit('changeDrawPage')">
                    Create
                </button>
            </div>
        </div>
        <div v-for="(luckydraw, index) in props.luckydrawList" :key="index">     
            <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
                <div class="flex content-evenly lucky-set">
                    <img class="m-3 self-center lucky-image" :src="storageUrl + luckydraw.animation" style="width:120px" />
                    <span class="mr-10 ml-5 inline-block align-middle self-center lucky-span">{{ luckydraw.prize.name }}</span>

                    <div class="m-8 flex w-full justify-evenly lucky-set">
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-60 lucky-td">
                            <span class="my-1" v-if="luckydraw.type == 'product'"> {{ luckydraw.campaign_product.name }} </span>
                            <span class="my-1" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                            <span class="my-4" v-else> </span>

                            <span class="text-lg text-slate-500 mr-5 "> {{ drawTitleMap[luckydraw.type] }} </span>
                        </div>
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-40 lucky-td">
                            <span class="my-1"> {{ luckydraw.num_of_winner }} </span>
                            <div class="text-lg text-slate-500 mr-5"> Winners </div>
                        </div>
                        <div class="text-left flex flex-col w-40 lucky-td">
                            <span v-if="luckydraw.repeatable === true" class="my-1"> Yes </span>
                            <span v-if="luckydraw.repeatable === false" class="my-1"> No </span>
                            <span class="text-lg text-slate-500 mr-5"> Winner Repeat</span>
                        </div>
                        <div class="text-left flex flex-col w-40 lucky-button">
                            <button class="btn btn-primary w-32 mt-auto" @click="goDraw(luckydraw.id)">
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white p-1 ">
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

    .lucky-set {
        display: table !important;
        margin: 0.7rem !important;
    }

    .lucky-td {
        border-right-width: 0px !important;
        position: relative;
        /* display: inline-block;
        white-space: nowrap; */
    }

    .lucky-image {
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
    }

    .lucky-span {
        display: table !important;
        margin: 0 auto !important;
    }

    .lucky-button {
        margin: auto;
        margin-top: 5px;
    }

	.lucky-create {
        margin-top: 5px;
    }
}

</style>