<template>
    <div>
        <div class="mt-3 flex justify-between">
            <div>
                <label for="update-profile-form-2" class="form-label mr-10">Campaign Title</label>
                <h2 style="display: inline-block;"> {{ props.campaignTitle }} </h2>
            </div>
            <div>
                <button class="btn btn-primary w-32 mt-auto mr-3" @click="listWinners()">
                    All Winners
                </button>
                <button class="btn btn-primary w-32 mt-auto" @click="existsDrawlist = eventBus.emit('changeDrawPage')">
                    Create
                </button>
            </div>
        </div>
        <div v-for="(luckydraw, index) in props.luckydrawList" :key="index">     
            <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
                <div class="flex content-evenly">
                    <img class="m-3 self-center" :src="storageUrl + luckydraw.animation" style="width:120px" />
                    <span class="mr-10 ml-5 inline-block align-middle self-center">{{ luckydraw.prize.name }}</span>

                    <div class="m-8 flex w-full justify-evenly">
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-60">
                            <span class="my-1" v-if="luckydraw.type == 'product'"> {{ luckydraw.campaign_product.name }} </span>
                            <span class="my-1" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                            <span class="my-4" v-else> </span>

                            <span class="text-lg text-slate-500 mr-5"> {{ drawTitleMap[luckydraw.type] }} </span>
                        </div>
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-40">
                            <span class="my-1"> {{ luckydraw.num_of_winner }} </span>
                            <div class="text-lg text-slate-500 mr-5"> Winners </div>
                        </div>
                        <div class="text-left flex flex-col w-40">
                            <span v-if="luckydraw.repeatable === true" class="my-1"> Yes </span>
                            <span v-if="luckydraw.repeatable === false" class="my-1"> No </span>
                            <span class="text-lg text-slate-500 mr-5"> Winner Repeat</span>
                        </div>
                        <div class="text-left flex flex-col w-40">
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

        <Modal size="modal-md" :slideOver="true" :show="winnerListPreview" @hidden="winnerListPreview = false">
            <ModalHeader class="p-5">
                <h2 class="font-medium text-base mr-auto">All Winners</h2>
            </ModalHeader>
            
            <ModalBody>
                <table class="box table table-report table-auto -mt-3" style="text-align: inherit;">
                    <thead>
                        <tr>
                            <th class="whitespace-normal xl:whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
                                {{ column.name }}
                            </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="winner in winnerList" :key="winner">
                            <template v-for="column in tableColumns" :key="column.key">
                                <td v-if="column.key == 'platform'">
                                    <div class="flex w-full justify-around">
                                        <div class="flex-0 w-12 h-12 zoom-in border-0">
                                            <Tippy v-if="winner.customer_image == '' || winner.customer_image == null" tag="img" class="rounded-full border-0" :src="`${storageUrl}fake_head.jpeg`"
                                                />
                                            <Tippy v-else tag="img" class="rounded-full border-0" :src="winner.customer_image"
                                                />
                                            <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                                <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                                <img v-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                                <img v-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                                <img v-if="winner.platform == null" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td v-else>
                                    {{ winner[column.key] }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </ModalBody>
        </Modal>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { delete_campaign_lucky_draw, list_campaign_lucky_draw_winners } from '@/api_v2/campaign_lucky_draw';
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
const winnerListPreview = ref(false)
const winnerList = ref([])
const tableColumns = ref([
    { key: 'platform', name: 'Platform' },
    { key: 'customer_name', name: 'Customer name' },
])


const goDraw = (lucky_draw_id) => {
    let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: lucky_draw_id} })
    window.open(routeData.href, '_blank')
}

const editDraw = (lucky_draw_id) => {
    eventBus.emit('editDraw', { lucky_draw_id: lucky_draw_id })
    eventBus.emit('changeDrawPage')
}

const listWinners = () => {
    list_campaign_lucky_draw_winners(route.params.campaign_id).then(res => {
        winnerList.value = res.data    
    })
    winnerListPreview.value = true
}

const deleteDraw = (lucky_draw_id) => {
    delete_campaign_lucky_draw(lucky_draw_id).then(res => {
        console.log(res.data)
        router.go()
    }).catch(err => {
        console.log(err)
    })
}

onMounted(() => {
    console.log(props.luckydrawList)
})

</script>