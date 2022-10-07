<template>
    <div class="m-3 md:m-5">
        <div class="flex flex-col md:flex-row justify-between mb-10">
            <div class="flex flex-wrap justify-start font-medium">
                <label class="form-label mr-10"> {{ $t('quiz_game.quiz_list.campaign_title') }} : </label>
                <h2 class="w-42"> {{ props.campaignTitle }} </h2>
            </div>
            <div class="flex md:justify-end manage_btn">
                <button class="btn btn-primary h-[35px] md:h-[42px] my-auto lg:mr-6 w-40" @click="toManageOrder()"> {{ $t(`campaign_live.incoming.manage_order` ) }} </button>
            </div>
        </div>

        <div
            class="box bg-[#f1f1f1] text-left" 
            v-for="(quizgameBundle, index) in props.quizgameList" 
            :key="index"
        >
            <div class="flex flex-row flex-wrap m-[0.7rem] p-5">
                
                <div class="flex-1 flex flex-col gap-4 md:w-full md:mx-2 qa_block">
                    <table class="table -mt-3 table-report responsive-table w-32">
                        <thead>
                            <tr>
                                <template v-for="(data, index) in tableColumns" :key="index">
                                    <th v-if="data.name" class="whitespace-nowrap text-center text-slate-500 text-[18px]">
                                        {{ $t(`quiz_game.quiz_list.${data.key}`) }}
                                    </th>
                                    <th v-else class="whitespace-nowrap text-center text-[16px]">
                                    </th>
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(quizgame, index) in quizgameBundle.quiz_games" :key="index">
                                <tr >
                                    <template v-for="(data, index) in tableColumns" :key="index">
                                        <td v-if="data.name" class="whitespace-norwrap text-center text-[16px]">
                                            <p class="title hidden">{{ $t(`quiz_game.quiz_list.${data.key}`) }}</p>
                                            <p>{{ quizgame[data.key] }}</p>
                                        </td>
                                        <td v-else class="whitespace-nowrap text-center text-[16px]">
                                            <button 
                                                class="btn btn-primary md:w-24 h-[35px] lil_btn" 
                                                v-if="emptyArr.includes(quizgame.start_at)"
                                                @click="quizgameStart(quizgame.id)"
                                            > {{ $t('quiz_game.quiz_list.start') }} </button>
                                            <button 
                                                class="btn btn-seconday md:w-24 h-[35px] lil_btn" 
                                                v-else-if="emptyArr.includes(quizgame.end_at)"
                                                @click="quizgameStop(quizgame.id)"
                                            > {{ $t('quiz_game.quiz_list.stop') }} </button>
                                            <button 
                                                class="btn btn-seconday md:w-24 h-[35px] lil_btn" 
                                                v-else 
                                                disabled
                                            > {{ $t('quiz_game.quiz_list.finish') }} </button>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <hr class="solid">

                <div class="flex-0 flex flex-row md:flex-col md:border-x-2 border-white md:ml-auto md:w-fit lil_block lil_border">
                    <div class="flex text-slate-500 md:mx-3" style="font-weight: 500;"> {{ $t('quiz_game.quiz_list.winners') }} </div>
                    <span class="flex md:m-auto ml-auto md:text-[35px]"> {{ quizgameBundle.num_of_winner }} </span>
                </div>

                <div class="flex-0  flex flex-row flex-wrap md:w-auto md:mx-2 md:w-fit lil_block">
                    <template v-if="Array.isArray(quizgameBundle.winner_list) && quizgameBundle.winner_list.length == 0">
                        <button 
                            class="btn btn-primary md:w-32 md:h-[50px] m-auto" 
                            @click="goResult(quizgameBundle.id)" 
                        > {{ $t('quiz_game.quiz_list.result') }} </button>
                    </template>
                    <template v-else-if="Array.isArray(quizgameBundle.winner_list) && quizgameBundle.winner_list.length != 0 && quizgameBundle.winner_list[0] != 'no winners'">
                        <!-- <div class="text-slate-500 md:m-auto"> Winner List </div> -->
                        <div v-for="(winner, index) in quizgameBundle.winner_list" :key="index" class="my-2">
                            <div class="flex flex-wrap mx-2 w-34">
                                <div class="flex-0 w-9 h-9 zoom-in border-0">
                                    <Tippy v-if="[undefined, null, ''].includes(winner.customer_image)" tag="img" class="rounded-full border-0" :src="`${storageUrl}fake_head.jpeg`" />
                                    <Tippy v-else tag="img" class="rounded-full border-0" :src="winner.customer_image" />
                                    <div class="w-4 h-4 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                        <img v-else-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                        <img v-else-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                        <img v-else-if="winner.platform == 'twitch'" class="rounded-full bg-[#6441a5]" :src="twitch_platform" >
										<img v-else-if="winner.platform == 'tiktok'" class="rounded-full bg-[#000000]" :src="tiktok_platform" >
                                        <img v-else-if="[undefined, null, ''].includes(winner.platform)" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                    </div>
                                </div>
                                <label class="text-base flex items-center ml-2"> {{ winner.customer_name }} </label>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="Array.isArray(quizgameBundle.winner_list) && quizgameBundle.winner_list.length != 0 && quizgameBundle.winner_list[0] == 'no winners'">
                        <div class="m-auto text-[1.5rem]" > {{ $t('quiz_game.quiz_list.no_winner') }} </div>
                    </template>
                </div>
            </div>  

            <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full whitespace-nowrap hover:bg-white p-1">
                <DropdownToggle>
                    <MoreHorizontalIcon class="w-6 h-6" />
                </DropdownToggle>
                <DropdownMenu class="w-30">
                    <DropdownContent>
                        <DropdownItem 
                            class="w-20 text-center whitespace-nowrap text-[14px]"
                            @click="goEdit(quizgameBundle.id)"
                        > 
                            <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1" /> {{ $t('quiz_game.quiz_list.edit') }}
                        </DropdownItem>
                        <DropdownItem 
                            class="w-20 text-center text-danger whitespace-nowrap text-[14px]"
                            @click="goDelete(quizgameBundle.id)"
                        > 
                            <SimpleIcon icon="delete" color="#b91c1c" class="mr-1" /> {{ $t('quiz_game.quiz_list.delete') }}
                        </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>   

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { start_campaign_quiz_game, stop_campaign_quiz_game, delete_campaign_quiz_game_bundle, result_campaign_quiz_game } from '@/api_v2/campaign_quiz_game';
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import tiktok_platform from '/src/assets/images/lss-img/tiktok_black_bg.png';
import twitch_platform from '/src/assets/images/lss-img/twitch.png';
import unbound from '/src/assets/images/lss-img/noname.png';

const tableColumns = ref([
    {"name": "Question", "key": "question"},
    {"name": "Answer", "key": "answer"},
    {"name":"", "key": "start"}
])
const route = useRoute()
const router = useRouter()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const props = defineProps({
    campaignTitle: String,
    quizgameList: Object
})
const emptyArr = ref(['', null, undefined])


const quizgameStart = (id) => {
    start_campaign_quiz_game(id, layoutStore.alert).then(res => { 
        props.quizgameList.forEach(quizgameBundle => {
            quizgameBundle.quiz_games.forEach(quizgame => {
                if (quizgame.id === parseInt(id)) quizgame.start_at = res.data.start_at
            })
        })
    })
}

const quizgameStop = (id) => {
    stop_campaign_quiz_game(id, layoutStore.alert).then(res => { 
        props.quizgameList.forEach(quizgameBundle => {
            quizgameBundle.quiz_games.forEach(quizgame => {
                if (quizgame.id === parseInt(id)) quizgame.end_at = res.data.end_at
            })
        })
    })
}

const toManageOrder = ()=>{
    router.push({ name: 'manage-order', params: { campaign_id: route.params.campaign_id}})
}

const hideDropDown = ()=>{
    dom('.dropdown-menu').removeClass('show')
}

const goEdit = (id) => {
    eventBus.emit('changePage')
    eventBus.emit('editQuiz', { 'quizgameBundleId': id })
    hideDropDown()
}

const goDelete = (id) => {
    delete_campaign_quiz_game_bundle(id, layoutStore.alert).then(res => {
        if (res.data.message === 'delete success') layoutStore.notification.showMessageToast('Delete success');
        eventBus.emit('listQuiz')
    })
    hideDropDown()
}

const goResult = (id) => {
    result_campaign_quiz_game(id, layoutStore.alert).then(res => {
        eventBus.emit('listQuiz')
    })
}

</script>

<style scope>
.table th {
    padding-top: 0;
}
td {
    word-break: break-all;
}
@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {
    .lil_block {
        padding-top: 20px;
        width: 100%;
    }

    .lil_border {
        padding-bottom: 20px;
        border-bottom: 2px solid #4F4F4F;
    }

    .qa_block {
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 2px solid #4F4F4F;
    }

    .lil_btn {
        width: 89px;
    }

    .manage_btn {
        margin-left: auto;
        margin-right: auto;
    }
}

@media (max-width: 450px) {
    .responsive-table {
        display: contents;
        width:100%;
    }
    .responsive-table thead {
        display: none;
    }
    .responsive-table tbody tr {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        width:100%;
    }
    .responsive-table tbody td {
        width:100%;
    }
    .responsive-table tbody td .title {
        display: unset;
        font-size: 17px;
        font-weight: bold;
    }
    .table-report:not(.table-report--bordered):not(.table-report--tabulator) td {
        box-shadow: none;
    }
}

</style>