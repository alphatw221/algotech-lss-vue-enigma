<template>
    <div class="m-3 sm:m-5">
        <div class="flex flex-col lg:flex-row justify-between mb-10">
            <div class="flex justify-start">
                <label class="form-label mr-10"> Campaign Title </label>
                <h2 class="w-42"> {{ props.campaignTitle }} </h2>
            </div>
            <button 
                class="btn btn-primary w-32 ml-auto h-[35px] sm:h-[42px]" 
                @click="goCreate()"
            > Create </button>
        </div>

        <div
            class="box bg-[#f1f1f1] text-left" 
            v-for="(quizgameBundle, index) in props.quizgameList" 
            :key="index"
        >
            <div class="flex flex-row flex-wrap m-[0.7rem] p-5">
                <div class="flex flex-col justify-start w-[55%] mr-5 my-auto"> 
                    <table>
                        <thead>
                            <tr>
                                <th class="whitespace-normal xl:whitespace-nowrap text-center text-[16px]">
                                    question
                                </th>
                                <th class="whitespace-normal xl:whitespace-nowrap text-center text-[16px]">
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr
                                v-for="(quizgame, index_i) in quizgameBundle.quiz_games"
                                :key="index_i"
                                class="intro-x"
                            >
                                <template v-for="(column, index_j) in tableColumns" :key="index_j"> 
                                    <td v-if="column.key === 'question'" class="w-full sm:w-fit" >
                                        <div class="">{{quizgame[column.key]}}</div> 
                                    </td>
                                    <td v-else-if="column.key === 'button'">
                                        <button 
                                            class="btn btn-primary w-full lg:w-24 h-[35px] ml-3 mt-1" 
                                            v-if="emptyArr.includes(quizgame.start_at)"
                                            @click="quizgameStart(quizgame.id)"
                                        > Start </button>
                                        <button 
                                            class="btn btn-seconday w-full lg:w-24 h-[35px] ml-3 mt-1" 
                                            v-else-if="emptyArr.includes(quizgame.end_at)"
                                            @click="quizgameStop(quizgame.id)"
                                        > Stop </button>
                                        <button 
                                            class="btn btn-seconday w-full lg:w-24 h-[35px] ml-3 mt-1" 
                                            v-else 
                                            disabled
                                        > Finish </button>
                                    </td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
 
                <div class="flex flex-col lg:flex-row md:mt-5 w-[20%] lg:w-auto lg:ml-auto">
                    <div class="lg:border-r-2 border-white flex flex-row lg:flex-col w-full lg:w-36 ">
                        <div class="text-slate-500 mr-3"> No. Of Winner </div>
                        <span class="lg:my-1"> {{ quizgameBundle.num_of_winner }} </span>
                    </div>
                </div>

                <div 
                    class="flex flex-col lg:flex-row w-[20%] lg:w-auto lg:mx-auto"
                    v-if="Array.isArray(quizgameBundle.winner_list) && quizgameBundle.winner_list.length == 0"
                >
                    <div class="flex flex-row lg:flex-col w-full lg:w-36 justify-center">
                        <button 
                            class="btn btn-primary w-full xl:w-32 h-[35px] sm:h-[42px]" 
                            @click="goResult(quizgameBundle.id)" 
                        > Result </button>
                    </div>
                </div>

                <div 
                    class="flex flex-col lg:flex-row w-[20%] lg:w-auto lg:mx-auto"
                    v-else-if="Array.isArray(quizgameBundle.winner_list) && quizgameBundle.winner_list.length != 0"
                >
                    <div class="flex flex-row lg:flex-col w-full lg:w-36">
                        <div class="text-slate-500 mr-3"> Winner List </div>

                        <div v-for="(winner, index) in quizgameBundle.winner_list" :key="index" class=" mb-3">
                            
                            <div class="flex lg:flex-row">
                                <div class="flex w-full justify-around">
                                    <div class="flex-0 w-12 h-12 zoom-in border-0">
                                        <Tippy v-if="[undefined, null, ''].includes(winner.customer_image)" tag="img" class="rounded-full border-0" :src="`${storageUrl}fake_head.jpeg`" />
                                        <Tippy v-else tag="img" class="rounded-full border-0" :src="winner.customer_image" />
                                        <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                            <img v-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                            <img v-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                            <img v-if="[undefined, null, ''].includes(winner.platform)" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                        </div>
                                    </div>
                                </div>
                                <label class="text-base"> {{ winner.customer_name }} </label>
                            </div>

                        </div>
                    </div>
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
                            <EditIcon class="w-[20px] h-[20px] mx-1"/> Edit
                        </DropdownItem>
                        <DropdownItem 
                            class="w-20 text-center text-danger whitespace-nowrap text-[14px]"
                            @click="goDelete(quizgameBundle.id)"
                        > 
                            <Trash2Icon class="w-[20px] h-[20px] mx-1"/> Delete
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
import unbound from '/src/assets/images/lss-img/noname.png';

const route = useRoute()
const router = useRouter()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const props = defineProps({
    campaignTitle: String,
    quizgameList: Object
})
const tableColumns = ref([
    { key: 'question' },
    { key: 'button' }
])
const emptyArr = ref(['', null, undefined])

onMounted(() => {
    console.log(props.quizgameList)
})


const quizgameStart = (id) => {
    start_campaign_quiz_game(id).then(res => { 
        props.quizgameList.forEach(quizgameBundle => {
            quizgameBundle.quiz_games.forEach(quizgame => {
                if (quizgame.id === parseInt(id)) quizgame.start_at = res.data.start_at
            })
        })
    })
}

const quizgameStop = (id) => {
    stop_campaign_quiz_game(id).then(res => { 
        props.quizgameList.forEach(quizgameBundle => {
            quizgameBundle.quiz_games.forEach(quizgame => {
                if (quizgame.id === parseInt(id)) quizgame.end_at = res.data.end_at
            })
        })
    })
}

const hideDropDown = ()=>{
    dom('.dropdown-menu').removeClass('show')
}

const goCreate = () => {
    eventBus.emit('changePage')
}

const goEdit = (id) => {
    eventBus.emit('changePage')
    eventBus.emit('editQuiz', { 'quizgameBundleId': id })
    hideDropDown()
}

const goDelete = (id) => {
    delete_campaign_quiz_game_bundle(id).then(res => {
        if (res.data.message === 'delete success') layoutStore.notification.showMessageToast('Delete success');
        eventBus.emit('listQuiz')
    })
    hideDropDown()
}

const goResult = (id) => {
    result_campaign_quiz_game(id).then(res => {
        eventBus.emit('listQuiz')
    })
}

</script>