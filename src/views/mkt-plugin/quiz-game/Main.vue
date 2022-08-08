<template>
    <div class="flex flex-col h-[100%] text-lg p-3 sm:px-10 sm:m-5 gap-3 sm:gap-0" v-if="ready">
        <div class="flex flex-col sm:flex-row justify-between sm:mx-5 gap-3"> 
            <h1 class="text-center sm:text-left text-xl sm:text-2xl font-medium my-auto"> {{ $t('quiz_game.title') }} </h1>
            <button 
                v-show="showQuizList"
                class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 border-[2px] border-slate-100 shadow-lg" 
                @click="eventBus.emit('changePage')"
            > <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('quiz_game.create_btn') }}
            </button>
        </div>
        <div class="box sm:mx-5 sm:mt-3">

            <div v-show="!showQuizList">
                <QuizCreate 
                    :campaignTitle="campaignTitle"
                />
            </div>
            <div v-show="showQuizList">
                <QuizList 
                    :campaignTitle="campaignTitle"
                    :quizgameList="quizgameList"
                />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import QuizCreate from './QuizCreate.vue';
import QuizList from './QuizList.vue';
import { list_campaign_quiz_game } from '@/api_v2/campaign_quiz_game';
import { retrieve_campaign } from '@/api_v2/campaign';

const route = useRoute()
const router = useRouter()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const ready = ref(false)
const showQuizList = ref(false)
const quizgameList = ref([])
const campaignTitle = ref('')


onMounted(() => {
    retrieve_campaign(route.params.campaign_id).then(res => { campaignTitle.value = res.data.title })
    listQuizGame()

    eventBus.on('changePage', () => { showQuizList.value = !showQuizList.value })
    eventBus.on('listQuiz', () => { listQuizGame() })
})

onUnmounted(() => {
    eventBus.off('changePage')
    eventBus.off('listQuiz')
})

const listQuizGame = () => {
    list_campaign_quiz_game(route.params.campaign_id).then(res => {
        console.log(res.data)
        if (Object.entries(res.data).length > 0) {
            quizgameList.value = res.data
            showQuizList.value = true
        }
        ready.value = true
    })
}

</script>