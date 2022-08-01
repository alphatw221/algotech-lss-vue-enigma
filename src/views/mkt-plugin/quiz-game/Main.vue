<template>
    <div class="flex flex-col h-[100%] text-lg py-3 sm:px-5" v-if="ready">
        <h1 class="text-center sm:text-left text-xl sm:text-2xl font-medium"> Quiz Game </h1>
        <div class="box p-3 sm:p-10 sm:m-5">
            <div v-show="!showQuizList">
                <QuizCreate />
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
import QuizList from './QuizList.vue'
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
        if (Object.entries(res.data).length > 0) {
            quizgameList.value = res.data
            showQuizList.value = true
        }
        ready.value = true
    })
}

</script>
    
