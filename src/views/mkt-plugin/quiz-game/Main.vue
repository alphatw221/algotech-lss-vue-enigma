<template>
    <div class="flex flex-col h-[100%] text-lg py-3 sm:px-5" v-if="ready">
        <h1 class="text-center sm:text-left text-xl sm:text-2xl font-medium"> {{ $t('lucky_draw.lucky_draw') }} </h1>

        <div class="box p-3 sm:p-10 sm:m-5">
            <div v-show="!showQuizlist"> 
            <QuizCreate 
                :campaignTitle="campaignTitle"
            />
            </div>
            <div v-show="showQuizlist">
                <QuizList 
                    :luckydrawList="luckydrawList" 
                    :campaignTitle="campaignTitle"
                /> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import { list_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import { retrieve_campaign } from '@/api_v2/campaign'
import QuizCreate from "./QuizCreate.vue";
import QuizList from "./QuizList.vue";

const route = useRoute()
const router = useRouter()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const store = useLSSCampaignListStore()
const showQuizlist = ref(false)
const luckydrawList = ref([])
const ready = ref(false)
const campaignTitle = ref('')


onMounted(() => {
    retrieve_campaign(route.params.campaign_id).then(res => {
        campaignTitle.value = res.data.title
        console.log(res.data)
    })
    list_campaign_lucky_draw(route.params.campaign_id).then(res => {
        if (Object.entries(res.data).length > 0) {
            showQuizlist.value = true
            luckydrawList.value = res.data
            console.log(luckydrawList.value)
        }
        ready.value = true
    })
    eventBus.on('changeQuizPage', () => { 
        showQuizlist.value = !showQuizlist.value 
    })
})

onUnmounted(() => {
    eventBus.off('changeQuizPage')
})


</script>